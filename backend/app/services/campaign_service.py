from typing import Dict, Any, List

def get_demo_campaigns() -> List[Dict[str, Any]]:
    return [
        {
            "id": 1,
            "campaign_id": "CMP-2026-04",
            "name": "Banking Support Impersonation Cluster (Apex-Lure)",
            "confidence": 0.87,
            "status": "active",
            "threat_count": 12,
            "pattern_title": "Potential Coordinated Threat Pattern",
            "entity_breakdown": {
                "suspicious_profiles": 6,
                "suspicious_domains": 3,
                "scam_messages": 2,
                "mobile_applications": 1
            },
            "shared_indicators": [
                {"indicator": "Branding Typo", "detail": "Identical Pantone 293C SBI emblem alterations"},
                {"indicator": "Domain Naming", "detail": "Shared registrar & '.top' / '.xyz' hosting pattern"},
                {"indicator": "Phishing Language", "detail": "Synchronized urgency pretext regarding 'PAN card KYC freeze'"},
                {"indicator": "Payload Infrastructure", "detail": "Common C2 redirect to APK download drop"}
            ],
            "description": (
                "XEDO identified a potential coordinated campaign linking 6 lookalike social profiles, "
                "3 typosquatted domains, and 1 mobile application through correlated digital infrastructure signals."
            ),
            "potential_next_vector": "Evolving towards automated WhatsApp grievance chat bots and voice phishing lures.",
            "disclaimer": "XEDO identifies potential coordinated activity based on observable technical commonalities. Entities are not confirmed as single-actor controlled until verified by law enforcement."
        },
        {
            "id": 2,
            "campaign_id": "CMP-2026-02",
            "name": "Utility Power Cut Threat Ring",
            "confidence": 0.81,
            "status": "monitoring",
            "threat_count": 8,
            "pattern_title": "Potential Coordinated Threat Pattern",
            "entity_breakdown": {
                "suspicious_profiles": 2,
                "suspicious_domains": 2,
                "scam_messages": 4,
                "mobile_applications": 0
            },
            "shared_indicators": [
                {"indicator": "Electricity Board Spoofing", "detail": "Deceptive claims of immediate 9:30 PM power cutoff"},
                {"indicator": "Rotational Virtual Numbers", "detail": "Coordinated VoIP helpline numbers"}
            ],
            "description": "Cross-state SMS campaign spoofing state electricity distribution companies to solicit remote-access app downloads.",
            "potential_next_vector": "Shifting targeting towards commercial small-business utility meters.",
            "disclaimer": "Potential coordinated campaign. Not a confirmed single attacker network."
        }
    ]
