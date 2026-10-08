from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.schemas.schemas import CopilotRequest, CopilotResponse
from app.ai.llm_client import llm_client
from app.models.models import Threat

router = APIRouter(prefix="/copilot", tags=["AI Investigation Copilot"])

@router.post("", response_model=CopilotResponse)
def query_copilot(req: CopilotRequest, db: Session = Depends(get_db)):
    context_data = {}
    if req.context_threat_id:
        threat = db.query(Threat).filter(Threat.threat_id == req.context_threat_id).first()
        if threat:
            context_data = {
                "entity": threat.entity,
                "risk_score": threat.risk_score,
                "type": threat.type
            }

    res = llm_client.copilot_query(req.message, context_data)
    return res
