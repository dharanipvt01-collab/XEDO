from fastapi import APIRouter
from typing import Dict, Any, List

router = APIRouter(prefix="/demo", tags=["Demo Mode & Scenarios"])

DEMO_SCENARIOS = [
    {
        "id": "scenario-1",
        "title": "Fake Bank Support Profile",
        "entity": "@sbi_supportt",
        "type": "social_profile",
        "description": "Instagram profile impersonating State Bank of India support team, asking victims for PAN and KYC updates.",
        "risk_score": 91,
        "risk_level": "critical",
        "platform": "Instagram",
        "context": "Bio link redirects to external form asking for banking credentials."
    },
    {
        "id": "scenario-2",
        "title": "Lookalike Phishing Website",
        "entity": "https://sbi-kyc-verification.top/auth",
        "type": "website",
        "description": "Credential harvesting portal replicating official net-banking login UI with spoofed Let's Encrypt SSL.",
        "risk_score": 96,
        "risk_level": "critical",
        "platform": "Web",
        "context": "Hosted on .top TLD using private proxy DNS."
    },
    {
        "id": "scenario-3",
        "title": "Urgent Scam SMS (Smishing)",
        "entity": "Dear Customer, Your SBI account will be blocked today. Update PAN: http://sbi-kyc-verification.top",
        "type": "message",
        "description": "Urgent SMS claiming imminent account block within 24 hours to induce panic.",
        "risk_score": 88,
        "risk_level": "high",
        "platform": "SMS (Sender: AD-SBIN0T)",
        "context": "Broadcasted via unauthorized bulk gateway."
    },
    {
        "id": "scenario-4",
        "title": "Suspicious Android Application",
        "entity": "SBI_Secure_v4.2.apk",
        "type": "mobile_app",
        "description": "Off-store trojanized Android app distributed via Telegram links requesting SMS interception permissions.",
        "risk_score": 94,
        "risk_level": "critical",
        "platform": "Android APK",
        "context": "Requests RECEIVE_SMS and ACCESSIBILITY_SERVICE."
    },
    {
        "id": "scenario-5",
        "title": "Coordinated Impersonation Campaign",
        "entity": "Campaign CMP-2026-04 (Apex-Lure)",
        "type": "campaign",
        "description": "Multi-channel coordinated attack ring linking 6 profiles, 3 domains, and 1 mobile payload.",
        "risk_score": 93,
        "risk_level": "critical",
        "platform": "Cross-Platform",
        "context": "Shared infrastructure across social, web, and mobile vectors."
    },
    {
        "id": "scenario-6",
        "title": "Enterprise Brand Protection Sweep",
        "entity": "State Bank of India Corporate Identity",
        "type": "brand",
        "description": "Complete digital risk audit of brand presence detecting 14 fake profiles and 8 lookalike domains.",
        "risk_score": 74,
        "risk_level": "high",
        "platform": "Global Brand Registry",
        "context": "Enterprise exposure monitoring."
    }
]

@router.get("/scenarios")
def get_scenarios() -> List[Dict[str, Any]]:
    return DEMO_SCENARIOS

@router.get("/scenarios/{scenario_id}")
def get_scenario(scenario_id: str) -> Dict[str, Any]:
    for s in DEMO_SCENARIOS:
        if s["id"] == scenario_id:
            return s
    return DEMO_SCENARIOS[0]
