from typing import Dict, Any, List

def build_threat_graph(threat_id: str = "XD-1024", filter_type: str = "all") -> Dict[str, Any]:
    """
    Constructs a topological network graph connecting official brand, lookalike profiles,
    suspicious URLs, scam messages, mobile apps, and preserved evidence.
    """
    all_nodes = [
        {
            "id": "node-brand",
            "label": "State Bank of India (Official)",
            "type": "brand",
            "risk_score": 0,
            "risk_level": "low",
            "timestamp": "Verified Baseline",
            "evidence_count": 4,
            "details": {
                "official_domain": "onlinesbi.sbi",
                "verified_handle": "@theofficialsbi",
                "status": "Legitimate Entity (Target of Impersonation)",
                "why_it_matters": "Authentic sovereign public banking institution serving 450M+ customers.",
                "recommended_action": "Proactive brand protection sweep and continuous registry monitoring."
            }
        },
        {
            "id": "node-profile",
            "label": "@sbi_supportt (Instagram)",
            "type": "social_profile",
            "risk_score": 91,
            "risk_level": "critical",
            "timestamp": "Today, 09:14 AM",
            "evidence_count": 3,
            "details": {
                "entity": "@sbi_supportt",
                "platform": "Instagram",
                "why_it_matters": "Typosquatted handle actively soliciting user account complaints and PAN card numbers.",
                "recommended_action": "Submit official impersonation report to Meta Trust & Safety with cryptographic evidence hashes."
            }
        },
        {
            "id": "node-url",
            "label": "sbi-kyc-verification.top",
            "type": "website",
            "risk_score": 96,
            "risk_level": "critical",
            "timestamp": "Today, 09:21 AM",
            "evidence_count": 2,
            "details": {
                "entity": "https://sbi-kyc-verification.top/auth",
                "registrar": "NameCheap (Privacy Protected)",
                "why_it_matters": "Credential harvesting landing page replicating SBI YONO login portals.",
                "recommended_action": "Issue automated domain takedown request to registrar and APWG."
            }
        },
        {
            "id": "node-message",
            "label": "SMS: SBI Alert - Account Blocked",
            "type": "message",
            "risk_score": 88,
            "risk_level": "high",
            "timestamp": "Today, 09:25 AM",
            "evidence_count": 2,
            "details": {
                "sender_header": "AD-SBIN0T",
                "content": "Dear Customer, Your SBI YONO Account will be blocked today. Please update PAN immediately at http://sbi-kyc-verification.top",
                "why_it_matters": "High-urgency smishing lure designed to create panic and bypass critical user scrutiny.",
                "recommended_action": "Report smishing sender header to telecom regulator (TRAI/1930 Chakshu)."
            }
        },
        {
            "id": "node-app",
            "label": "SBI_Secure_v4.2.apk",
            "type": "mobile_app",
            "risk_score": 94,
            "risk_level": "critical",
            "timestamp": "Today, 09:27 AM",
            "evidence_count": 1,
            "details": {
                "package_name": "com.sbi.banking.secure.auth",
                "permissions": ["READ_SMS", "RECEIVE_SMS", "ACCESSIBILITY_SERVICE"],
                "why_it_matters": "Trojanized APK designed to intercept two-factor OTP authentication SMS messages.",
                "recommended_action": "Submit package hash to Google Play Protect and CERT-In."
            }
        },
        {
            "id": "node-evidence",
            "label": "Vault: 8 Preserved Evidence Items",
            "type": "evidence",
            "risk_score": 10,
            "risk_level": "low",
            "timestamp": "Today, 09:31 AM",
            "evidence_count": 8,
            "details": {
                "integrity_algorithm": "SHA-256 Cryptographic Digest",
                "custody_chain": "XEDO Evidence Vault Immutable Log",
                "why_it_matters": "Legally admissible evidentiary packet ready for NCRP filing and police investigation.",
                "recommended_action": "Generate official complaint export."
            }
        }
    ]

    all_edges = [
        {"id": "e1", "source": "node-brand", "target": "node-profile", "label": "Target of Impersonation", "relationship_type": "spoof_target", "confidence": 0.94},
        {"id": "e2", "source": "node-profile", "target": "node-url", "label": "Bio Link Redirection", "relationship_type": "traffic_route", "confidence": 0.98},
        {"id": "e3", "source": "node-message", "target": "node-url", "label": "Smishing Click Reference", "relationship_type": "lure_reference", "confidence": 0.99},
        {"id": "e4", "source": "node-url", "target": "node-app", "label": "Malicious Download Drop", "relationship_type": "payload_delivery", "confidence": 0.92},
        {"id": "e5", "source": "node-profile", "target": "node-evidence", "label": "Documented Artifact", "relationship_type": "evidence_anchor", "confidence": 1.0},
        {"id": "e6", "source": "node-url", "target": "node-evidence", "label": "Documented Artifact", "relationship_type": "evidence_anchor", "confidence": 1.0},
        {"id": "e7", "source": "node-app", "target": "node-evidence", "label": "Documented Artifact", "relationship_type": "evidence_anchor", "confidence": 1.0}
    ]

    filtered_nodes = all_nodes
    if filter_type != "all":
        type_mapping = {
            "profiles": ["social_profile"],
            "urls": ["website"],
            "apps": ["mobile_app"],
            "messages": ["message"],
            "brands": ["brand"],
            "evidence": ["evidence"]
        }
        allowed = type_mapping.get(filter_type, [])
        filtered_nodes = [n for n in all_nodes if n["type"] in allowed or n["type"] == "brand"]

    allowed_ids = {n["id"] for n in filtered_nodes}
    filtered_edges = [e for e in all_edges if e["source"] in allowed_ids and e["target"] in allowed_ids]

    return {
        "nodes": filtered_nodes,
        "edges": filtered_edges,
        "total_nodes": len(filtered_nodes),
        "total_edges": len(filtered_edges),
        "threat_summary": "6 correlated threat nodes connected across 5 operational vectors under Campaign CMP-2026-04."
    }
