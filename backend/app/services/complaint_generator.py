from datetime import datetime
from typing import Dict, Any, List

def generate_official_complaint_packet(
    threat_entity: str = "@sbi_supportt",
    incident_description: str = "Received deceptive Instagram support prompt directing me to input banking credentials.",
    financial_loss: float = 0.0,
    transaction_reference: str = "",
    victim_name: str = "Anonymous Citizen",
    victim_contact: str = "+91 98765 43210"
) -> Dict[str, Any]:
    """
    Synthesizes a structured incident documentation packet formatted according to
    National Cyber Crime Reporting Portal (NCRP) guidelines and Helpline 1930 protocols.
    """
    ref_code = f"XEDO-NCRP-PREP-{datetime.utcnow().strftime('%Y%m%d%H%M%S')}"

    return {
        "incident_reference_code": ref_code,
        "generated_at": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC"),
        "threat_type": "Social Media Impersonation / Phishing & Banking Fraud Attempt",
        "suspected_indicators": [
            f"Adversarial Target: {threat_entity}",
            "Deceptive URL: https://sbi-kyc-verification.top/auth",
            "Urgency Trigger: Threat of bank account freeze within 24 hours",
            "Sideloaded Trojanized Payload: SBI_Secure_v4.2.apk"
        ],
        "evidence_summary": [
            {"item": "EV-5501", "name": "Instagram Profile Full Bio Screenshot", "hash": "a9f82d41b072c014..."},
            {"item": "EV-5502", "name": "Deceptive Phishing Landing Page HTML Archive", "hash": "37be10c9a721e892..."},
            {"item": "EV-5503", "name": "SMS Smishing Broadcast Message Header Log", "hash": "f10c4d8b2e319a21..."},
            {"item": "EV-5504", "name": "Off-Store Android Application APK Static Signature", "hash": "84d2a93b481fb441..."}
        ],
        "financial_loss_recorded": financial_loss,
        "transaction_reference": transaction_reference if transaction_reference else "N/A (Loss prevented or unrecorded)",
        "victim_name": victim_name,
        "victim_contact": victim_contact,
        "complaint_narrative_text": (
            f"COMPLAINT DETAILS FOR NATIONAL CYBER CRIME REPORTING PORTAL (NCRP):\n\n"
            f"1. INCIDENT OVERVIEW:\n"
            f"On {datetime.utcnow().strftime('%d %B %Y')}, the complainant encountered a fraudulent online entity "
            f"'{threat_entity}' masquerading as an authorized customer grievance channel of State Bank of India.\n\n"
            f"2. MODUS OPERANDI:\n"
            f"The suspect entity disseminated high-urgency notifications coercing the complainant to verify account credentials "
            f"via an unauthorized website (sbi-kyc-verification.top). Technical inspection by XEDO verified this domain is registered "
            f"under an unverified private proxy on a known abuse TLD.\n\n"
            f"3. FINANCIAL IMPACT:\n"
            f"Reported financial loss: INR {financial_loss:,.2f}. Transaction Reference: {transaction_reference or 'None'}.\n\n"
            f"4. USER STATEMENT:\n"
            f"\"{incident_description}\"\n\n"
            f"5. CRYPTOGRAPHIC INTEGRITY:\n"
            f"Digital artifacts have been recorded with SHA-256 integrity hashes to preserve forensic chain of custody."
        ),
        "ncrp_recommended_categories": [
            "Online Financial Fraud",
            "Impersonation / Fake Social Media Profile",
            "Phishing / Vishing / Smishing Attack"
        ],
        "recommended_attachments": [
            "Screenshots of fraudulent profile & messages showing timestamp and phone/handle",
            "Bank account statement highlighting contested debit (if loss occurred)",
            "Copy of SMS header indicating alphanumeric sender ID",
            "Proof of initial grievance registration with bank/card issuer"
        ],
        "helpline_info": "National Cyber Crime Helpline: 1930 (Immediate 24/7 Financial Fraud Reporting)",
        "official_portal_url": "https://www.cybercrime.gov.in/",
        "legal_disclaimer": (
            "IMPORTANT: XEDO is an independent cybersecurity risk intelligence platform and is NOT a government website. "
            "XEDO is not affiliated with the Indian Cybercrime Coordination Centre (I4C), National Cyber Crime Reporting Portal (NCRP), "
            "state police authorities, or any government agency. Submitting or generating this summary does NOT constitute official filing. "
            "Please copy this summary and continue to the official portal at cybercrime.gov.in or call 1930."
        )
    }
