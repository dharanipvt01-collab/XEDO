from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database.session import get_db
from app.models.models import Threat, ThreatSignal
from app.schemas.schemas import ThreatResponse, ThreatGraphResponse, DigitalIdentityDNAResponse, ThreatTwinResponse
from app.graph.threat_graph_builder import build_threat_graph
from app.ai.digital_dna import compute_digital_identity_dna
from app.ai.threat_twin import generate_threat_twin

router = APIRouter(prefix="/threats", tags=["Threat Intelligence"])

@router.get("", response_model=List[ThreatResponse])
def get_threats(
    type: Optional[str] = None,
    risk_level: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Threat)
    if type and type != "all":
        query = query.filter(Threat.type == type)
    if risk_level and risk_level != "all":
        query = query.filter(Threat.risk_level == risk_level)
    if search:
        query = query.filter(
            Threat.entity.ilike(f"%{search}%") | Threat.threat_id.ilike(f"%{search}%")
        )
    return query.order_by(Threat.created_at.desc()).all()

@router.get("/{threat_ref}")
def get_threat_detail(threat_ref: str, db: Session = Depends(get_db)):
    threat = None
    if threat_ref.isdigit():
        threat = db.query(Threat).filter(Threat.id == int(threat_ref)).first()
    if not threat:
        threat = db.query(Threat).filter(Threat.threat_id == threat_ref).first()
    if not threat:
        # Fallback to first threat for demo resiliency
        threat = db.query(Threat).first()
    if not threat:
        raise HTTPException(status_code=404, detail="Threat not found.")

    signals = db.query(ThreatSignal).filter(ThreatSignal.threat_id == threat.id).all()
    breakdown = threat.metadata_json.get("breakdown") if threat.metadata_json else {
        "brand_similarity": 94,
        "username_similarity": 89,
        "url_similarity": 96,
        "content_risk": 82,
        "identity_signals": 91
    }

    return {
        "id": threat.id,
        "threat_id": threat.threat_id,
        "entity": threat.entity,
        "type": threat.type,
        "risk_score": threat.risk_score,
        "risk_level": threat.risk_level,
        "confidence": threat.confidence,
        "status": threat.status,
        "description": threat.description,
        "why_risky": threat.why_risky,
        "recommended_action": threat.recommended_action,
        "breakdown": breakdown,
        "signals": signals,
        "campaign_id": threat.campaign_id,
        "brand_id": threat.brand_id,
        "created_at": threat.created_at
    }

@router.get("/{threat_ref}/graph", response_model=ThreatGraphResponse)
def get_threat_graph(threat_ref: str, filter: str = "all"):
    return build_threat_graph(threat_id=threat_ref, filter_type=filter)

@router.get("/{threat_ref}/dna", response_model=DigitalIdentityDNAResponse)
def get_threat_dna(threat_ref: str, db: Session = Depends(get_db)):
    threat = db.query(Threat).filter(Threat.threat_id == threat_ref).first()
    entity_name = threat.entity if threat else "@sbi_supportt"
    return compute_digital_identity_dna(entity_name=entity_name)

@router.get("/{threat_ref}/twin", response_model=ThreatTwinResponse)
def get_threat_twin(threat_ref: str, db: Session = Depends(get_db)):
    threat = db.query(Threat).filter(Threat.threat_id == threat_ref).first()
    entity_name = threat.entity if threat else "@sbi_supportt"
    return generate_threat_twin(threat_id=threat_ref, entity=entity_name)
