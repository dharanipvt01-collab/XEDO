import hashlib
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.models.models import (
    User, Brand, Campaign, Threat, ThreatSignal, ThreatRelationship,
    Case, Evidence, Investigation, Notification, AuditLog
)

def get_hash(password: str) -> str:
    # Deterministic SHA-256 with salt for demo reliability
    return hashlib.sha256(f"xedo_salt_{password}".encode("utf-8")).hexdigest()

def seed_database(db: Session):
    # Check if already seeded
    if db.query(User).first():
        return

    # 1. Create Users
    citizen = User(
        username="citizen",
        email="citizen@xedo.ai",
        hashed_password=get_hash("password123"),
        full_name="Priya Sharma",
        role="citizen",
        safety_score=82
    )
    analyst = User(
        username="analyst",
        email="analyst@xedo.ai",
        hashed_password=get_hash("password123"),
        full_name="Vikram Malhotra",
        role="analyst",
        safety_score=94
    )
    admin = User(
        username="admin",
        email="admin@xedo.ai",
        hashed_password=get_hash("password123"),
        full_name="Dr. Ananya Roy",
        role="admin",
        safety_score=98
    )
    db.add_all([citizen, analyst, admin])
    db.commit()
    db.refresh(citizen)
    db.refresh(analyst)
    db.refresh(admin)

    # 2. Create Brand
    sbi_brand = Brand(
        name="State Bank of India",
        official_domain="onlinesbi.sbi",
        official_socials=["@theofficialsbi", "@statebankofindia"],
        logo_signature="SBI_SOVEREIGN_BLUE_2026",
        trusted_dna={
            "domain_root": "sbi",
            "tld": ".sbi",
            "support_channel": "Toll Free 1800 1234"
        },
        risk_score=74,
        detected_fakes_count=14
    )
    db.add(sbi_brand)
    db.commit()
    db.refresh(sbi_brand)

    # 3. Create Campaign
    campaign_1 = Campaign(
        campaign_id="CMP-2026-04",
        name="Banking Support Impersonation Cluster (Apex-Lure)",
        confidence=0.87,
        status="active",
        threat_count=12,
        shared_indicators=[
            {"type": "Typo Pattern", "detail": "@sbi_supportt + lookalike customer care"},
            {"type": "Deceptive TLD", "detail": "sbi-kyc-verification.top"},
            {"type": "Smishing Broadcaster", "detail": "AD-SBIN0T header"},
            {"type": "Trojanized APK", "detail": "SBI_Secure_v4.2.apk"}
        ],
        description="Coordinated multi-vector campaign targeting retail banking customers using urgent account freeze pretexts.",
        potential_next_vector="Automated WhatsApp support chatbots requesting UPI PIN inputs."
    )
    db.add(campaign_1)
    db.commit()
    db.refresh(campaign_1)

    # 4. Create Interconnected Threats
    threat_1 = Threat(
        threat_id="XD-1024",
        entity="@sbi_supportt",
        type="social_profile",
        risk_score=91,
        risk_level="critical",
        confidence=0.92,
        status="investigating",
        description="Instagram profile masquerading as State Bank of India customer service resolution hub.",
        why_risky="This social profile closely resembles verified patterns of State Bank of India while operating from unauthorized external channels. Multiple signals indicate potential impersonation and credential capture.",
        recommended_action="Do not share credentials or OTP. Preserve evidence screenshots and register complaint on NCRP.",
        campaign_id=campaign_1.id,
        brand_id=sbi_brand.id,
        metadata_json={
            "platform": "Instagram",
            "followers": 1420,
            "bio_link": "http://sbi-kyc-verification.top/auth"
        }
    )

    threat_2 = Threat(
        threat_id="XD-1025",
        entity="https://sbi-kyc-verification.top/auth",
        type="website",
        risk_score=96,
        risk_level="critical",
        confidence=0.96,
        status="investigating",
        description="Phishing website replicating official YONO banking login page with credential harvest forms.",
        why_risky="Deceptive top-level domain (.top) hosting unauthorized clone of online banking interface with active data capture scripts.",
        recommended_action="Block domain at perimeter DNS, preserve HTML snapshot, and request registrar suspension.",
        campaign_id=campaign_1.id,
        brand_id=sbi_brand.id,
        metadata_json={
            "registrar": "NameCheap Inc.",
            "ip": "185.220.101.5",
            "ssl_issuer": "Let's Encrypt Authority X3"
        }
    )

    threat_3 = Threat(
        threat_id="XD-1026",
        entity="SMS: 'Dear Customer, SBI YONO account blocked...'",
        type="message",
        risk_score=88,
        risk_level="high",
        confidence=0.89,
        status="confirmed_suspicious",
        description="Urgent SMS message threatening bank account suspension within 24 hours.",
        why_risky="Contains classic urgency and panic triggers with unsolicited phishing link to harvest net banking login details.",
        recommended_action="Do not click link. Forward SMS to 1930 / TRAI Chakshu portal and block sender.",
        campaign_id=campaign_1.id,
        brand_id=sbi_brand.id,
        metadata_json={
            "sender_id": "AD-SBIN0T",
            "channel": "GSM SMS Broadcast"
        }
    )

    threat_4 = Threat(
        threat_id="XD-1027",
        entity="SBI_Secure_v4.2.apk",
        type="mobile_app",
        risk_score=94,
        risk_level="critical",
        confidence=0.95,
        status="investigating",
        description="Trojanized Android installation package purporting to be an urgent SBI security update.",
        why_risky="Sideloaded off-store application requesting invasive SMS reading and accessibility service permissions to intercept OTPs.",
        recommended_action="Do not install. Submit package hash to CERT-In and remove any downloaded files.",
        campaign_id=campaign_1.id,
        brand_id=sbi_brand.id,
        metadata_json={
            "package_name": "com.sbi.banking.secure.auth",
            "sha256": "84d2a93b481fb441c098e918237b672a9810f274a123689b02a9401738210342"
        }
    )

    db.add_all([threat_1, threat_2, threat_3, threat_4])
    db.commit()
    db.refresh(threat_1)
    db.refresh(threat_2)
    db.refresh(threat_3)
    db.refresh(threat_4)

    # 5. Signals for Threat 1
    sig1 = ThreatSignal(
        threat_id=threat_1.id,
        signal_type="BRAND_SIMILARITY",
        name="Brand Mark & Name Mimicry",
        score=94,
        weight=1.4,
        details="Profile username '@sbi_supportt' exhibits 94% lexical similarity with official SBI handles.",
        is_high_risk=True
    )
    sig2 = ThreatSignal(
        threat_id=threat_1.id,
        signal_type="SUSPICIOUS_LINK",
        name="Deceptive External Redirection",
        score=96,
        weight=1.3,
        details="Profile bio routes users to unverified non-banking TLD 'sbi-kyc-verification.top'.",
        is_high_risk=True
    )
    sig3 = ThreatSignal(
        threat_id=threat_1.id,
        signal_type="UNVERIFIED_STATUS",
        name="Lack of Institutional Verification",
        score=82,
        weight=1.0,
        details="Account lacks verified enterprise credentials and was created within the last 14 days.",
        is_high_risk=False
    )
    db.add_all([sig1, sig2, sig3])

    # 6. Threat Relationships (Building the connected graph)
    rel1 = ThreatRelationship(
        source_threat_id=threat_1.id,
        target_threat_id=threat_2.id,
        relationship_type="bio_link_redirection",
        confidence=0.98,
        details="Direct hyperlink in profile bio pointing to credential phishing landing page"
    )
    rel2 = ThreatRelationship(
        source_threat_id=threat_3.id,
        target_threat_id=threat_2.id,
        relationship_type="smishing_click_reference",
        confidence=0.99,
        details="SMS text explicitly directs recipient to the identical phishing URL"
    )
    rel3 = ThreatRelationship(
        source_threat_id=threat_2.id,
        target_threat_id=threat_4.id,
        relationship_type="malicious_payload_drop",
        confidence=0.92,
        details="Phishing portal prompts user to download Trojanized APK for verification"
    )
    db.add_all([rel1, rel2, rel3])

    # 7. Create Case
    case_1 = Case(
        case_id="CASE-8941",
        title="Impersonation & Phishing Attempt on SBI Customer Support Channel",
        threat_id=threat_1.id,
        user_id=citizen.id,
        status="evidence_collected",
        priority="high",
        description="Suspicious Instagram profile soliciting PAN and KYC update under pretext of account freeze.",
        notes="Citizen contacted before entering sensitive OTP. Evidence successfully captured and hashed in vault.",
        financial_loss=0.0
    )
    db.add(case_1)
    db.commit()
    db.refresh(case_1)

    # 8. Create Evidence Items in Evidence Vault
    ev1 = Evidence(
        evidence_id="EV-5501",
        title="Instagram Profile Bio & Header Capture",
        type="screenshot",
        source="Instagram (@sbi_supportt)",
        content_or_path="https://xedo-vault.storage/captures/sbi_profile_bio_2026.png",
        hash_sha256="a9f82d41b072c01476d05f32a819b109e414c9973216890f543167b091823761",
        integrity_status="verified",
        threat_id=threat_1.id,
        case_id=case_1.id,
        user_id=citizen.id
    )
    ev2 = Evidence(
        evidence_id="EV-5502",
        title="Phishing Portal Full DOM Snapshot",
        type="url",
        source="sbi-kyc-verification.top/auth",
        content_or_path="https://xedo-vault.storage/snapshots/dom_sbi_top_2026.html",
        hash_sha256="37be10c9a721e892c908126745198abf9801267584126790b127419827361829",
        integrity_status="verified",
        threat_id=threat_2.id,
        case_id=case_1.id,
        user_id=citizen.id
    )
    ev3 = Evidence(
        evidence_id="EV-5503",
        title="SMS Smishing Header & Content Transcript",
        type="message",
        source="SMS Gateway AD-SBIN0T",
        content_or_path="Dear Customer, Your SBI account will be blocked today. Update PAN immediately: http://sbi-kyc-verification.top",
        hash_sha256="f10c4d8b2e319a21098471264817293817293817289371289371289371289371",
        integrity_status="verified",
        threat_id=threat_3.id,
        case_id=case_1.id,
        user_id=citizen.id
    )
    ev4 = Evidence(
        evidence_id="EV-5504",
        title="Off-Store Android APK Binary Analysis Report",
        type="apk_analysis",
        source="Telegram Channel Drop / Sideload Link",
        content_or_path="Package com.sbi.banking.secure.auth - Extracted SMS interception listeners",
        hash_sha256="84d2a93b481fb441c098e918237b672a9810f274a123689b02a9401738210342",
        integrity_status="verified",
        threat_id=threat_4.id,
        case_id=case_1.id,
        user_id=citizen.id
    )
    db.add_all([ev1, ev2, ev3, ev4])

    # 9. Create Autonomous Investigation record
    inv_1 = Investigation(
        investigation_id="INV-9021",
        threat_id=threat_1.id,
        user_id=analyst.id,
        priority="high",
        status="completed",
        signals_analyzed_count=17,
        related_entities_count=6,
        high_risk_indicators_count=3,
        campaign_detected=True,
        evidence_items_count=8,
        summary="Autonomous investigation verified high-fidelity brand impersonation and multi-vector infrastructure nexus coordinated under Campaign CMP-2026-04.",
        recommended_action="Preserve evidence package in Vault, issue domain takedown notice, and prepare NCRP cybercrime complaint.",
        timeline_events=[
            {"step": "Telemetry Ingest", "detail": "Analyzed suspicious handle @sbi_supportt and extracted profile indicators"},
            {"step": "Identity DNA Matching", "detail": "Discovered 94% lexical overlap with State Bank of India sovereign trademarks"},
            {"step": "Graph Correlation", "detail": "Expanded network to 3 lookalike domains, 2 SMS lures, and 1 APK drops"},
            {"step": "Campaign Nexus", "detail": "Clustered into Campaign CMP-2026-04 with 87% campaign confidence"},
            {"step": "Forensic Packaging", "detail": "Sealed 8 evidence items with SHA-256 integrity verification"}
        ]
    )
    db.add(inv_1)

    # 10. Intelligent Notifications
    n1 = Notification(
        user_id=citizen.id,
        title="High-risk profile detected",
        message="XEDO AI identified a high-risk impersonation profile '@sbi_supportt' mimicking your bank.",
        type="threat",
        read=False,
        link="/threats/XD-1024"
    )
    n2 = Notification(
        user_id=citizen.id,
        title="Possible connection discovered",
        message="XEDO connected Case #CASE-8941 with known Campaign CMP-2026-04 (Apex-Lure).",
        type="campaign",
        read=False,
        link="/campaigns"
    )
    n3 = Notification(
        user_id=citizen.id,
        title="Digital safety score improved",
        message="Your safety score increased to 82/100 after reviewing suspicious links.",
        type="score",
        read=True,
        link="/dashboard"
    )
    db.add_all([n1, n2, n3])

    # 11. Audit Log
    audit_1 = AuditLog(
        user_id=analyst.id,
        username="analyst",
        action="REVIEW_THREAT",
        resource="Threat XD-1024",
        details="Analyst Vikram Malhotra reviewed autonomous investigation findings and confirmed High Risk status.",
        ip_address="127.0.0.1"
    )
    db.add(audit_1)

    db.commit()
