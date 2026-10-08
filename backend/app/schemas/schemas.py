from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

# Auth Schemas
class UserBase(BaseModel):
    username: str
    email: EmailStr
    full_name: Optional[str] = ""
    role: str = "citizen"

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Dict[str, Any]

class UserResponse(UserBase):
    id: int
    safety_score: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

# Threat Schemas
class ThreatSignalSchema(BaseModel):
    signal_type: str
    name: str
    score: int
    weight: float = 1.0
    details: str
    is_high_risk: bool = False

class ThreatAnalysisRequest(BaseModel):
    entity: str
    type: Optional[str] = "auto"  # "social_profile", "website", "mobile_app", "message", "email", "phone", "username", "auto"
    context: Optional[str] = ""

class ThreatRiskBreakdown(BaseModel):
    brand_similarity: int
    username_similarity: int
    url_similarity: int
    content_risk: int
    identity_signals: int

class ThreatResponse(BaseModel):
    id: int
    threat_id: str
    entity: str
    type: str
    risk_score: int
    risk_level: str  # "low", "medium", "high", "critical"
    confidence: float
    status: str
    description: str
    why_risky: str
    recommended_action: str
    breakdown: Optional[ThreatRiskBreakdown] = None
    signals: List[ThreatSignalSchema] = []
    campaign_id: Optional[int] = None
    brand_id: Optional[int] = None
    created_at: datetime

    class Config:
        from_attributes = True

# Digital Identity DNA Schemas
class DNAFingerprint(BaseModel):
    username_pattern: str
    domain_pattern: str
    visual_signature: str
    language_pattern: str
    support_channel_pattern: str
    brand_naming_pattern: str

class DigitalIdentityDNAResponse(BaseModel):
    entity_name: str
    overall_match_score: int  # e.g. 93% match to trusted brand
    risk_classification: str
    trusted_identity: DNAFingerprint
    suspicious_identity: DNAFingerprint
    matching_signals: List[Dict[str, Any]]
    disclaimer: str = "Identity DNA is XEDO's proprietary risk concept and not an official industry certification."

# Threat Twin Schemas
class ThreatTwinResponse(BaseModel):
    threat_id: str
    entity: str
    threat_type: str
    risk_score: int
    risk_level: str
    ecosystem_summary: str
    identity_nodes: List[Dict[str, Any]]
    evidence_nodes: List[Dict[str, Any]]
    signal_nodes: List[Dict[str, Any]]
    relationship_edges: List[Dict[str, Any]]
    timeline_milestones: List[Dict[str, Any]]

# Graph Schemas
class GraphNode(BaseModel):
    id: str
    label: str
    type: str  # "brand", "social_profile", "website", "mobile_app", "message", "evidence"
    risk_score: int
    risk_level: str
    timestamp: str
    evidence_count: int
    details: Dict[str, Any] = {}

class GraphEdge(BaseModel):
    id: str
    source: str
    target: str
    label: str
    relationship_type: str
    confidence: float

class ThreatGraphResponse(BaseModel):
    nodes: List[GraphNode]
    edges: List[GraphEdge]
    total_nodes: int
    total_edges: int
    threat_summary: str

# Threat Forecast Schemas
class ThreatForecastResponse(BaseModel):
    headline: str
    current_risk: str
    predicted_trend: str
    potential_next_vector: str
    confidence: int
    disclaimer: str
    timeline: List[Dict[str, Any]]
    emerging_indicators: List[str]

# Autonomous Investigation Schemas
class InvestigationRequest(BaseModel):
    threat_id: Optional[str] = None
    entity: Optional[str] = None

class InvestigationResponse(BaseModel):
    investigation_id: str
    threat_id: str
    priority: str
    status: str
    signals_analyzed_count: int
    related_entities_count: int
    high_risk_indicators_count: int
    campaign_detected: bool
    evidence_items_count: int
    summary: str
    recommended_action: str
    timeline_events: List[Dict[str, Any]]
    threat_twin_ready: bool = True

# Copilot Schemas
class CopilotRequest(BaseModel):
    message: str
    context_threat_id: Optional[str] = None
    role: Optional[str] = "analyst"

class CopilotResponse(BaseModel):
    reply: str
    intent: str
    suggested_actions: List[str] = []
    related_indicators: List[str] = []
    confidence: float

# Case Schemas
class CaseCreate(BaseModel):
    title: str
    threat_id: Optional[int] = None
    priority: str = "high"
    description: Optional[str] = ""
    notes: Optional[str] = ""
    financial_loss: Optional[float] = 0.0

class CaseResponse(BaseModel):
    id: int
    case_id: str
    title: str
    threat_id: Optional[int] = None
    status: str
    priority: str
    description: str
    notes: str
    financial_loss: float
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Evidence Schemas
class EvidenceCreate(BaseModel):
    title: str
    type: str  # "screenshot", "message", "url", "profile", "document", "apk_analysis"
    source: Optional[str] = ""
    content_or_path: Optional[str] = ""
    threat_id: Optional[int] = None
    case_id: Optional[int] = None

class EvidenceResponse(BaseModel):
    id: int
    evidence_id: str
    title: str
    type: str
    source: str
    content_or_path: str
    hash_sha256: str
    integrity_status: str
    threat_id: Optional[int] = None
    case_id: Optional[int] = None
    created_at: datetime

    class Config:
        from_attributes = True

# Campaign Schemas
class CampaignResponse(BaseModel):
    id: int
    campaign_id: str
    name: str
    confidence: float
    status: str
    threat_count: int
    shared_indicators: List[Dict[str, Any]]
    description: str
    potential_next_vector: str
    created_at: datetime

    class Config:
        from_attributes = True

# Brand Protection Schemas
class BrandResponse(BaseModel):
    id: int
    name: str
    official_domain: str
    official_socials: List[str]
    risk_score: int
    detected_fakes_count: int
    trusted_dna: Dict[str, Any]
    created_at: datetime

    class Config:
        from_attributes = True

# Safety Score Schemas
class SafetyScoreBreakdown(BaseModel):
    overall_score: int
    grade: str  # "Excellent", "Good", "Fair", "Needs Attention"
    account_security: int
    link_safety: int
    scam_exposure: int
    privacy_exposure: int
    identity_protection: int
    strongest_area: str
    improvement_opportunity: str
    recommended_steps: List[str]
    disclaimer: str

# Complaint Preparation Schemas
class ComplaintGenerateRequest(BaseModel):
    threat_id: Optional[str] = None
    incident_description: str
    financial_loss: float = 0.0
    transaction_reference: Optional[str] = ""
    suspect_contact_or_url: Optional[str] = ""
    victim_name: Optional[str] = ""
    victim_contact: Optional[str] = ""

class ComplaintReportResponse(BaseModel):
    incident_reference_code: str
    generated_at: str
    threat_type: str
    suspected_indicators: List[str]
    evidence_summary: List[Dict[str, Any]]
    financial_loss_recorded: float
    complaint_narrative_text: str
    ncrp_recommended_categories: List[str]
    recommended_attachments: List[str]
    helpline_info: str
    official_portal_url: str
    legal_disclaimer: str
