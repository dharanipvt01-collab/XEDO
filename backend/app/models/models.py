from sqlalchemy import Column, Integer, String, Float, Boolean, Text, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.session import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), default="")
    role = Column(String(50), default="citizen")  # "citizen", "analyst", "admin"
    safety_score = Column(Integer, default=82)  # Personal Cyber Safety Score
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    cases = relationship("Case", back_populates="user")
    evidence_items = relationship("Evidence", back_populates="user")


class Brand(Base):
    __tablename__ = "brands"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, index=True, nullable=False)
    official_domain = Column(String(255), nullable=False)
    official_socials = Column(JSON, default=list)
    logo_signature = Column(String(255), default="")
    trusted_dna = Column(JSON, default=dict)
    risk_score = Column(Integer, default=12)  # 0-100 brand exposure risk
    detected_fakes_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    threats = relationship("Threat", back_populates="brand")


class Campaign(Base):
    __tablename__ = "campaigns"

    id = Column(Integer, primary_key=True, index=True)
    campaign_id = Column(String(100), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    confidence = Column(Float, default=0.85)
    status = Column(String(50), default="active")  # "active", "monitoring", "neutralized"
    threat_count = Column(Integer, default=0)
    shared_indicators = Column(JSON, default=list)
    description = Column(Text, default="")
    potential_next_vector = Column(String(255), default="")
    created_at = Column(DateTime, default=datetime.utcnow)

    threats = relationship("Threat", back_populates="campaign")


class Threat(Base):
    __tablename__ = "threats"

    id = Column(Integer, primary_key=True, index=True)
    threat_id = Column(String(50), unique=True, index=True, nullable=False)
    entity = Column(String(255), nullable=False)
    type = Column(String(50), nullable=False)  # "social_profile", "website", "mobile_app", "message", "email", "phone", "username"
    risk_score = Column(Integer, default=0)  # 0-100
    risk_level = Column(String(50), default="low")  # "low", "medium", "high", "critical"
    confidence = Column(Float, default=0.90)
    status = Column(String(50), default="new")  # "new", "investigating", "confirmed_suspicious", "mitigated"
    description = Column(Text, default="")
    why_risky = Column(Text, default="")
    recommended_action = Column(Text, default="")
    campaign_id = Column(Integer, ForeignKey("campaigns.id"), nullable=True)
    brand_id = Column(Integer, ForeignKey("brands.id"), nullable=True)
    metadata_json = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    brand = relationship("Brand", back_populates="threats")
    campaign = relationship("Campaign", back_populates="threats")
    signals = relationship("ThreatSignal", back_populates="threat", cascade="all, delete-orphan")
    evidence_items = relationship("Evidence", back_populates="threat")
    cases = relationship("Case", back_populates="threat")
    investigations = relationship("Investigation", back_populates="threat")


class ThreatSignal(Base):
    __tablename__ = "threat_signals"

    id = Column(Integer, primary_key=True, index=True)
    threat_id = Column(Integer, ForeignKey("threats.id"), nullable=False)
    signal_type = Column(String(100), nullable=False)
    name = Column(String(255), nullable=False)
    score = Column(Integer, default=50)
    weight = Column(Float, default=1.0)
    details = Column(Text, default="")
    is_high_risk = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    threat = relationship("Threat", back_populates="signals")


class ThreatRelationship(Base):
    __tablename__ = "threat_relationships"

    id = Column(Integer, primary_key=True, index=True)
    source_threat_id = Column(Integer, ForeignKey("threats.id"), nullable=False)
    target_threat_id = Column(Integer, ForeignKey("threats.id"), nullable=False)
    relationship_type = Column(String(100), nullable=False)  # "similar_brand", "shared_domain", "cross_channel_lure", "campaign_nexus"
    confidence = Column(Float, default=0.85)
    details = Column(String(255), default="")
    created_at = Column(DateTime, default=datetime.utcnow)


class Case(Base):
    __tablename__ = "cases"

    id = Column(Integer, primary_key=True, index=True)
    case_id = Column(String(50), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    threat_id = Column(Integer, ForeignKey("threats.id"), nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    status = Column(String(50), default="new")  # "new", "investigating", "evidence_collected", "ready_to_report", "closed"
    priority = Column(String(50), default="high")  # "low", "medium", "high", "critical"
    description = Column(Text, default="")
    notes = Column(Text, default="")
    financial_loss = Column(Float, default=0.0)
    incident_date = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    threat = relationship("Threat", back_populates="cases")
    user = relationship("User", back_populates="cases")
    evidence_items = relationship("Evidence", back_populates="case")


class Evidence(Base):
    __tablename__ = "evidence"

    id = Column(Integer, primary_key=True, index=True)
    evidence_id = Column(String(50), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    type = Column(String(50), nullable=False)  # "screenshot", "message", "url", "profile", "document", "apk_analysis"
    source = Column(String(255), default="")
    content_or_path = Column(Text, default="")
    hash_sha256 = Column(String(64), default="")
    integrity_status = Column(String(50), default="verified")  # "verified", "pending", "flagged"
    threat_id = Column(Integer, ForeignKey("threats.id"), nullable=True)
    case_id = Column(Integer, ForeignKey("cases.id"), nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    threat = relationship("Threat", back_populates="evidence_items")
    case = relationship("Case", back_populates="evidence_items")
    user = relationship("User", back_populates="evidence_items")


class Investigation(Base):
    __tablename__ = "investigations"

    id = Column(Integer, primary_key=True, index=True)
    investigation_id = Column(String(50), unique=True, index=True, nullable=False)
    threat_id = Column(Integer, ForeignKey("threats.id"), nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    priority = Column(String(50), default="high")
    status = Column(String(50), default="completed")
    signals_analyzed_count = Column(Integer, default=17)
    related_entities_count = Column(Integer, default=6)
    high_risk_indicators_count = Column(Integer, default=3)
    campaign_detected = Column(Boolean, default=True)
    evidence_items_count = Column(Integer, default=8)
    summary = Column(Text, default="")
    recommended_action = Column(Text, default="")
    timeline_events = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)

    threat = relationship("Threat", back_populates="investigations")


class AIConversation(Base):
    __tablename__ = "ai_conversations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    threat_id = Column(Integer, ForeignKey("threats.id"), nullable=True)
    title = Column(String(255), default="Investigation Session")
    messages = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    type = Column(String(50), default="alert")  # "alert", "threat", "campaign", "system", "score"
    read = Column(Boolean, default=False)
    link = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    username = Column(String(100), default="system")
    action = Column(String(255), nullable=False)
    resource = Column(String(255), nullable=False)
    details = Column(Text, default="")
    ip_address = Column(String(100), default="127.0.0.1")
    timestamp = Column(DateTime, default=datetime.utcnow)
