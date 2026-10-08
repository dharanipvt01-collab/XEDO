from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.models import Threat, ThreatSignal
from app.schemas.schemas import ThreatAnalysisRequest, ThreatResponse
from app.risk.risk_engine import evaluate_threat_risk
from app.ai.llm_client import llm_client
from datetime import datetime
import uuid

router = APIRouter(prefix="/analyze", tags=["Universal Threat Analyzer"])

def process_analysis(req: ThreatAnalysisRequest, specific_type: str, db: Session):
    entity_clean = req.entity.strip()
    if not entity_clean:
        raise HTTPException(status_code=400, detail="Entity cannot be empty.")

    target_type = specific_type if specific_type != "auto" else req.type
    eval_result = evaluate_threat_risk(entity_clean, target_type, req.context or "")

    # LLM or deterministic explanation
    explanation = llm_client.generate_explanation(
        entity_clean, eval_result["risk_score"], eval_result["signals"]
    )
    if explanation:
        eval_result["why_risky"] = explanation

    # Check if threat already exists or create new
    existing = db.query(Threat).filter(Threat.entity == entity_clean).first()
    if existing:
        threat_obj = existing
        threat_obj.risk_score = eval_result["risk_score"]
        threat_obj.risk_level = eval_result["risk_level"]
        threat_obj.why_risky = eval_result["why_risky"]
        threat_obj.recommended_action = eval_result["recommended_action"]
        threat_obj.updated_at = datetime.utcnow()
    else:
        new_id = f"XD-{uuid.uuid4().hex[:4].upper()}"
        threat_obj = Threat(
            threat_id=new_id,
            entity=entity_clean,
            type=eval_result["type"],
            risk_score=eval_result["risk_score"],
            risk_level=eval_result["risk_level"],
            confidence=eval_result["confidence"],
            status="new",
            description=f"Analyzed {eval_result['type']} via XEDO Universal Threat Engine.",
            why_risky=eval_result["why_risky"],
            recommended_action=eval_result["recommended_action"],
            metadata_json={"breakdown": eval_result["breakdown"]}
        )
        db.add(threat_obj)
        db.commit()
        db.refresh(threat_obj)

        for sig in eval_result["signals"]:
            db_sig = ThreatSignal(
                threat_id=threat_obj.id,
                signal_type=sig["signal_type"],
                name=sig["name"],
                score=sig["score"],
                weight=sig["weight"],
                details=sig["details"],
                is_high_risk=sig["is_high_risk"]
            )
            db.add(db_sig)
        db.commit()

    return {
        "id": threat_obj.id,
        "threat_id": threat_obj.threat_id,
        "entity": threat_obj.entity,
        "type": threat_obj.type,
        "risk_score": threat_obj.risk_score,
        "risk_level": threat_obj.risk_level,
        "confidence": threat_obj.confidence,
        "status": threat_obj.status,
        "description": threat_obj.description,
        "why_risky": threat_obj.why_risky,
        "recommended_action": threat_obj.recommended_action,
        "breakdown": eval_result["breakdown"],
        "signals": eval_result["signals"],
        "campaign_id": threat_obj.campaign_id,
        "brand_id": threat_obj.brand_id,
        "created_at": threat_obj.created_at
    }

@router.post("", response_model=ThreatResponse)
def analyze_universal(req: ThreatAnalysisRequest, db: Session = Depends(get_db)):
    return process_analysis(req, req.type or "auto", db)

@router.post("/profile", response_model=ThreatResponse)
def analyze_profile(req: ThreatAnalysisRequest, db: Session = Depends(get_db)):
    return process_analysis(req, "social_profile", db)

@router.post("/url", response_model=ThreatResponse)
def analyze_url(req: ThreatAnalysisRequest, db: Session = Depends(get_db)):
    return process_analysis(req, "website", db)

@router.post("/message", response_model=ThreatResponse)
def analyze_message(req: ThreatAnalysisRequest, db: Session = Depends(get_db)):
    return process_analysis(req, "message", db)

@router.post("/app", response_model=ThreatResponse)
def analyze_app(req: ThreatAnalysisRequest, db: Session = Depends(get_db)):
    return process_analysis(req, "mobile_app", db)

@router.post("/email", response_model=ThreatResponse)
def analyze_email(req: ThreatAnalysisRequest, db: Session = Depends(get_db)):
    return process_analysis(req, "email", db)

@router.post("/phone", response_model=ThreatResponse)
def analyze_phone(req: ThreatAnalysisRequest, db: Session = Depends(get_db)):
    return process_analysis(req, "phone", db)
