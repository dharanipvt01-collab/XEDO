from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database.session import get_db
from app.models.models import Evidence
from app.schemas.schemas import EvidenceCreate, EvidenceResponse
import hashlib
import uuid

router = APIRouter(prefix="/evidence", tags=["Evidence Vault"])

@router.get("", response_model=List[EvidenceResponse])
def get_evidence_list(db: Session = Depends(get_db)):
    return db.query(Evidence).order_by(Evidence.created_at.desc()).all()

@router.post("", response_model=EvidenceResponse)
def add_evidence(ev_in: EvidenceCreate, db: Session = Depends(get_db)):
    ev_id = f"EV-{uuid.uuid4().hex[:4].upper()}"
    raw_content = ev_in.content_or_path or ev_in.title
    computed_hash = hashlib.sha256(raw_content.encode("utf-8")).hexdigest()

    item = Evidence(
        evidence_id=ev_id,
        title=ev_in.title,
        type=ev_in.type,
        source=ev_in.source or "Manual Ingest",
        content_or_path=ev_in.content_or_path or "",
        hash_sha256=computed_hash,
        integrity_status="verified",
        threat_id=ev_in.threat_id,
        case_id=ev_in.case_id
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.get("/{ev_ref}", response_model=EvidenceResponse)
def get_evidence_item(ev_ref: str, db: Session = Depends(get_db)):
    item = None
    if ev_ref.isdigit():
        item = db.query(Evidence).filter(Evidence.id == int(ev_ref)).first()
    if not item:
        item = db.query(Evidence).filter(Evidence.evidence_id == ev_ref).first()
    if not item:
        item = db.query(Evidence).first()
    if not item:
        raise HTTPException(status_code=404, detail="Evidence item not found")
    return item
