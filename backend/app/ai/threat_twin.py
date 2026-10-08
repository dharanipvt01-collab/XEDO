from typing import Dict, Any, List

def generate_threat_twin(threat_id: str = "XD-1024", entity: str = "@sbi_supportt") -> Dict[str, Any]:
    """
    Constructs the XEDO Digital Threat Twin:
    A holistic cybernetic reflection synthesizing an adversarial threat ecosystem.
    Combines Identity, Profiles, URLs, Apps, Messages, Evidence, Risk, Timeline, and Relationships.
    """
    return {
        "threat_id": threat_id,
        "entity": entity,
        "threat_type": "Social Impersonation Nexus",
        "risk_score": 91,
        "risk_level": "critical",
        "ecosystem_summary": (
            "Multi-vector threat ecosystem operating under Campaign CMP-2026-04. "
            "Leverages lookalike social identities to route victims to phishing infrastructure and unauthorized APK binaries."
        ),
        "identity_nodes": [
            {"id": "id-1", "label": "Spoofed Handle", "value": "@sbi_supportt", "status": "active"},
            {"id": "id-2", "label": "Target Authority", "value": "State Bank of India", "status": "authentic_victim"},
            {"id": "id-3", "label": "Registrar Profile", "value": "NameCheap Inc. (Privacy Protected)", "status": "cloaked"}
        ],
        "evidence_nodes": [
            {"id": "ev-1", "label": "Profile Bio Capture", "type": "screenshot", "hash": "a9f82...c014"},
            {"id": "ev-2", "label": "Phishing HTML Snapshot", "type": "snapshot", "hash": "37be1...e892"},
            {"id": "ev-3", "label": "SMS Smishing Excerpt", "type": "message", "hash": "f10c4...9a21"},
            {"id": "ev-4", "label": "Malicious APK Binary", "type": "binary", "hash": "84d2a...b441"}
        ],
        "signal_nodes": [
            {"name": "Lexical Distance", "value": "94% similarity", "risk": "critical"},
            {"name": "Deceptive TLD (.top)", "value": "High Abuse Rate", "risk": "high"},
            {"name": "Social Engineering", "value": "Urgent Suspension Lure", "risk": "critical"},
            {"name": "Off-Store Distribution", "value": "Direct APK Download", "risk": "critical"}
        ],
        "relationship_edges": [
            {"source": "Profile: @sbi_supportt", "target": "URL: sbi-kyc-verification.top", "relation": "Routes Victims To"},
            {"source": "URL: sbi-kyc-verification.top", "target": "App: SBI_Secure_v4.2.apk", "relation": "Prompts Download"},
            {"source": "SMS: AX-SBIALERT", "target": "URL: sbi-kyc-verification.top", "relation": "Direct Link Reference"},
            {"source": "Campaign CMP-2026-04", "target": "Profile: @sbi_supportt", "relation": "Coordinates Infrastructure"}
        ],
        "timeline_milestones": [
            {"time": "09:14 AM", "title": "Suspicious Profile Detected", "desc": "Initial ingest of @sbi_supportt via real-time social telemetry"},
            {"time": "09:17 AM", "title": "Brand Similarity Identified", "desc": "94% lexical pattern match with State Bank of India registered trademarks"},
            {"time": "09:21 AM", "title": "Deceptive URL Discovered", "desc": "Bio link expansion revealed unverified landing domain sbi-kyc-verification.top"},
            {"time": "09:25 AM", "title": "Related Scam Message Correlated", "desc": "Synchronized SMS lure broadcast matching identical destination domain"},
            {"time": "09:28 AM", "title": "Threat Campaign Nexus Formed", "desc": "Clustered into Campaign CMP-2026-04 with 6 correlated multi-vector nodes"},
            {"time": "09:31 AM", "title": "Evidence Package Cryptographically Preserved", "desc": "Evidence Vault sealed with SHA-256 tamper-evident digital custody receipt"}
        ]
    }
