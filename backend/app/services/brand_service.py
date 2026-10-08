from typing import Dict, Any, List

def get_brand_protection_data() -> Dict[str, Any]:
    return {
        "brand_name": "State Bank of India",
        "official_identity": {
            "name": "State Bank of India",
            "legal_entity": "State Bank of India Corporate Centre, Mumbai",
            "primary_domain": "onlinesbi.sbi",
            "authorized_domains": ["onlinesbi.sbi", "sbi.co.in", "sbicard.com"],
            "official_social_accounts": ["@theofficialsbi", "@statebankofindia", "@sbi_global"],
            "verified_phone": "1800 1234 / 1800 2100",
            "verified_status": "Enterprise Sovereign Entity"
        },
        "brand_risk_score": 74,
        "brand_risk_classification": "Elevated Exposure",
        "brand_risk_summary": "Intense adversarial mimicry targeting consumer banking portal and mobile banking services.",
        "detected_infringements": {
            "fake_profiles_count": 14,
            "lookalike_domains_count": 8,
            "suspicious_apps_count": 3,
            "scam_messages_count": 27
        },
        "recent_infringements": [
            {"entity": "@sbi_supportt", "type": "Social Profile", "risk": "Critical (91/100)", "status": "Under Investigation", "platform": "Instagram"},
            {"entity": "sbi-kyc-verification.top", "type": "Domain", "risk": "Critical (96/100)", "status": "Takedown Pending", "platform": "NameCheap"},
            {"entity": "SBI_Secure_v4.2.apk", "type": "Mobile App", "risk": "Critical (94/100)", "status": "CERT-In Flagged", "platform": "Telegram Drop"},
            {"entity": "@axis_sbi_refund", "type": "Social Profile", "risk": "High (78/100)", "status": "Monitoring", "platform": "X (Twitter)"}
        ],
        "identity_dna_status": "Synchronized (Fingerprint v4.2 Active)"
    }
