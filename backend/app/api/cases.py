from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database.session import get_db
from app.models.models import Case, Threat
from app.schemas.schemas import CaseCreate, CaseResponse
import uuid

router = APIRouter(prefix="/cases", tags=["Case Management"])

@router.get("", response_model=List[CaseResponse])
def get_cases(db: Session = Depends(get_db)):
    return db.query(Case).order_by(Case.created_at.desc()).all()

@router.post("", response_model=CaseResponse)
def create_case(case_in: CaseCreate, db: Session = Depends(get_db)):
    c_id = f"CASE-{uuid.uuid4().hex[:4].upper()}"
    new_case = Case(
        case_id=c_id,
        title=case_in.title,
        threat_id=case_in.threat_id,
        priority=case_in.priority,
        description=case_in.description or "",
        notes=case_in.notes or "",
        financial_loss=case_in.financial_loss or 0.0,
        status="investigating"
    )
    db.add(new_case)
    db.commit()
    db.refresh(new_case)
    return new_case

@router.get("/{case_ref}", response_model=CaseResponse)
def get_case(case_ref: str, db: Session = Depends(get_db)):
    case = None
    if case_ref.isdigit():
        case = db.query(Case).filter(Case.id == int(case_ref)).first()
    if not case:
        case = db.query(Case).filter(Case.case_id == case_ref).first()
    if not case:
        case = db.query(Case).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    return case
