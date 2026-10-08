from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.models import Threat, Campaign, Case, Evidence, Brand, Notification
from app.services.safety_score_service import get_personal_safety_score
from app.ai.forecast_engine import generate_threat_forecast
from app.services.brand_service import get_brand_protection_data
from app.services.complaint_generator import generate_official_complaint_packet
from app.schemas.schemas import ComplaintGenerateRequest, ComplaintReportResponse

router = APIRouter(tags=["Dashboards & Intelligence"])

@router.get("/dashboard/customer")
def get_customer_dashboard(db: Session = Depends(get_db)):
    threats = db.query(Threat).all()
    cases = db.query(Case).all()
    evidence = db.query(Evidence).all()
    safety = get_personal_safety_score()

    return {
        "greeting": "Good morning.",
        "subtitle": "Your digital safety overview",
        "safety_score": safety,
        "metrics": {
            "active_threats": len(threats),
            "protected_accounts": 5,
            "investigations": 3,
            "evidence_items": len(evidence)
        },
        "intelligence_highlights": {
            "high_risk_signals": 2,
            "suspicious_indicators": 4,
            "potential_impersonations": 1,
            "headline": "XEDO AI has detected 2 high-risk signals and 1 potential impersonation",
            "recommended_action": "Review the flagged Instagram lookalike account and preserve profile link."
        },
        "recent_threats": threats[:4]
    }

@router.get("/dashboard/analyst")
def get_analyst_dashboard(db: Session = Depends(get_db)):
    threats = db.query(Threat).all()
    critical_threats = [t for t in threats if t.risk_level in ["critical", "high"]]
    campaigns = db.query(Campaign).all()
    cases = db.query(Case).all()
    evidence = db.query(Evidence).all()
    brands = db.query(Brand).all()
    forecast = generate_threat_forecast()

    # Geo threat clusters (simulated for demonstration)
    geo_clusters = [
        {"city": "Chennai", "lat": 13.0827, "lng": 80.2707, "threat_count": 38, "top_vector": "Banking Smishing", "status": "Active Spike"},
        {"city": "Bengaluru", "lat": 12.9716, "lng": 77.5946, "threat_count": 45, "top_vector": "Brand Support Impersonation", "status": "Elevated"},
        {"city": "Hyderabad", "lat": 17.3850, "lng": 78.4867, "threat_count": 29, "top_vector": "Deceptive APK Downloads", "status": "Moderate"},
        {"city": "Mumbai", "lat": 19.0760, "lng": 72.8777, "threat_count": 52, "top_vector": "Financial Portal Spoofing", "status": "Critical"},
        {"city": "Delhi", "lat": 28.6139, "lng": 77.2090, "threat_count": 48, "top_vector": "Utility Bill Cutoff Fraud", "status": "High"}
    ]

    return {
        "header": "XEDO Security Command Center",
        "metrics": {
            "active_threats": len(threats) or 24,
            "critical_threats": len(critical_threats) or 8,
            "potential_campaigns": len(campaigns) or 3,
            "investigations": 14,
            "evidence_items": len(evidence) or 32,
            "brands_protected": len(brands) or 6
        },
        "threat_queue": threats,
        "forecast": forecast,
        "geo_clusters": geo_clusters,
        "geo_disclaimer": "Simulated intelligence for demonstration purposes."
    }

@router.get("/forecast")
def get_forecast():
    return generate_threat_forecast()

@router.get("/brands")
def get_brand_protection():
    return get_brand_protection_data()

@router.get("/safety-score")
def get_safety_score():
    return get_personal_safety_score()

@router.post("/reports/complaint", response_model=ComplaintReportResponse)
def generate_complaint(req: ComplaintGenerateRequest):
    return generate_official_complaint_packet(
        threat_entity=req.suspect_contact_or_url or "@sbi_supportt",
        incident_description=req.incident_description,
        financial_loss=req.financial_loss,
        transaction_reference=req.transaction_reference or "",
        victim_name=req.victim_name or "Priya Sharma",
        victim_contact=req.victim_contact or "+91 98765 43210"
    )

@router.get("/notifications")
def get_notifications(db: Session = Depends(get_db)):
    return db.query(Notification).order_by(Notification.created_at.desc()).all()
