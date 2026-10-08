from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from app.database.session import get_db
from app.models.models import Campaign, Threat
from app.services.campaign_service import get_demo_campaigns

router = APIRouter(prefix="/campaigns", tags=["Threat Campaigns"])

@router.get("")
def list_campaigns(db: Session = Depends(get_db)):
    db_campaigns = db.query(Campaign).all()
    if not db_campaigns:
        return get_demo_campaigns()

    result = []
    demo_ref = get_demo_campaigns()[0]
    for c in db_campaigns:
        result.append({
            "id": c.id,
            "campaign_id": c.campaign_id,
            "name": c.name,
            "confidence": c.confidence,
            "status": c.status,
            "threat_count": c.threat_count or 12,
            "pattern_title": "Potential Coordinated Threat Pattern",
            "entity_breakdown": {
                "suspicious_profiles": 6,
                "suspicious_domains": 3,
                "scam_messages": 2,
                "mobile_applications": 1
            },
            "shared_indicators": c.shared_indicators or demo_ref["shared_indicators"],
            "description": c.description,
            "potential_next_vector": c.potential_next_vector or demo_ref["potential_next_vector"],
            "disclaimer": "Potential coordinated campaign. Entities are not confirmed as single-actor controlled until verified by law enforcement."
        })
    return result

@router.get("/{campaign_ref}")
def get_campaign(campaign_ref: str, db: Session = Depends(get_db)):
    campaigns = list_campaigns(db)
    for c in campaigns:
        if str(c["id"]) == campaign_ref or c["campaign_id"] == campaign_ref:
            return c
    return campaigns[0]
