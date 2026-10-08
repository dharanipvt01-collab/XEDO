from typing import Dict, Any

def get_personal_safety_score(user_id: int = 1) -> Dict[str, Any]:
    return {
        "overall_score": 82,
        "grade": "Good",
        "account_security": 92,
        "link_safety": 68,
        "scam_exposure": 78,
        "privacy_exposure": 85,
        "identity_protection": 87,
        "strongest_area": "Account Security (92/100)",
        "improvement_opportunity": "Suspicious-link exposure (68/100)",
        "strongest_description": "Strong multi-factor authentication and credential hygiene across primary profiles.",
        "improvement_description": "Frequent encounters with unverified short links in incoming text messages and social inboxes.",
        "recommended_steps": [
            "Enable strict URL pre-screening in mobile messaging settings",
            "Verify all banking notifications exclusively inside official banking apps",
            "Review connected third-party app permissions quarterly"
        ],
        "disclaimer": "This is XEDO's proprietary platform safety score and NOT an official government security rating or certification."
    }
