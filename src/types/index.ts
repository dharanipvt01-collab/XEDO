export type UserRole = 'citizen' | 'analyst' | 'admin';

export interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  role: UserRole;
  safety_score: number;
}

export interface ThreatSignal {
  signal_type: string;
  name: string;
  score: number;
  weight: number;
  details: string;
  is_high_risk: boolean;
}

export interface RiskBreakdown {
  brand_similarity: number;
  username_similarity: number;
  url_similarity: number;
  content_risk: number;
  identity_signals: number;
}

export interface Threat {
  id: number;
  threat_id: string;
  entity: string;
  type: 'social_profile' | 'website' | 'mobile_app' | 'message' | 'email' | 'phone' | 'username' | string;
  risk_score: number;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  status: string;
  description: string;
  why_risky: string;
  recommended_action: string;
  breakdown?: RiskBreakdown;
  signals: ThreatSignal[];
  campaign_id?: number | null;
  brand_id?: number | null;
  created_at: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: string;
  risk_score: number;
  risk_level: string;
  timestamp: string;
  evidence_count: number;
  details?: Record<string, any>;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  relationship_type: string;
  confidence: number;
}

export interface ThreatGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  total_nodes: number;
  total_edges: number;
  threat_summary: string;
}

export interface Campaign {
  id: number;
  campaign_id: string;
  name: string;
  confidence: number;
  status: string;
  threat_count: number;
  pattern_title?: string;
  entity_breakdown?: {
    suspicious_profiles: number;
    suspicious_domains: number;
    scam_messages: number;
    mobile_applications: number;
  };
  shared_indicators: Array<{ indicator?: string; type?: string; detail: string }>;
  description: string;
  potential_next_vector: string;
  disclaimer: string;
}

export interface Case {
  id: number;
  case_id: string;
  title: string;
  threat_id?: number | null;
  status: 'new' | 'investigating' | 'evidence_collected' | 'ready_to_report' | 'closed' | string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  notes: string;
  financial_loss: number;
  created_at: string;
  updated_at: string;
}

export interface EvidenceItem {
  id: number;
  evidence_id: string;
  title: string;
  type: 'screenshot' | 'message' | 'url' | 'profile' | 'document' | 'apk_analysis' | string;
  source: string;
  content_or_path: string;
  hash_sha256: string;
  integrity_status: string;
  threat_id?: number | null;
  case_id?: number | null;
  created_at: string;
}

export interface SafetyScore {
  overall_score: number;
  grade: string;
  account_security: number;
  link_safety: number;
  scam_exposure: number;
  privacy_exposure: number;
  identity_protection: number;
  strongest_area: string;
  improvement_opportunity: string;
  strongest_description: string;
  improvement_description: string;
  recommended_steps: string[];
  disclaimer: string;
}

export interface ThreatForecast {
  headline: string;
  summary: string;
  current_risk: string;
  predicted_trend: string;
  potential_next_vector: string;
  confidence: number;
  disclaimer: string;
  timeline: Array<{ stage: string; state: string; detail: string }>;
  emerging_indicators: string[];
}

export interface DigitalDNA {
  entity_name: string;
  overall_match_score: number;
  risk_classification: string;
  trusted_identity: Record<string, string>;
  suspicious_identity: Record<string, string>;
  matching_signals: Array<{ signal: string; match: string; assessment: string }>;
  disclaimer: string;
}

export interface ThreatTwin {
  threat_id: string;
  entity: string;
  threat_type: string;
  risk_score: number;
  risk_level: string;
  ecosystem_summary: string;
  identity_nodes: Array<{ id: string; label: string; value: string; status: string }>;
  evidence_nodes: Array<{ id: string; label: string; type: string; hash: string }>;
  signal_nodes: Array<{ name: string; value: string; risk: string }>;
  relationship_edges: Array<{ source: string; target: string; relation: string }>;
  timeline_milestones: Array<{ time: string; title: string; desc: string }>;
}

export interface InvestigationResult {
  investigation_id: string;
  threat_id: string;
  priority: string;
  status: string;
  signals_analyzed_count: number;
  related_entities_count: number;
  high_risk_indicators_count: number;
  campaign_detected: boolean;
  evidence_items_count: number;
  summary: string;
  recommended_action: string;
  timeline_events: Array<{ step: string; detail: string }>;
  threat_twin_ready: boolean;
}

export interface ComplaintPacket {
  incident_reference_code: string;
  generated_at: string;
  threat_type: string;
  suspected_indicators: string[];
  evidence_summary: Array<{ item: string; name: string; hash: string }>;
  financial_loss_recorded: number;
  transaction_reference: string;
  victim_name: string;
  victim_contact: string;
  complaint_narrative_text: string;
  ncrp_recommended_categories: string[];
  recommended_attachments: string[];
  helpline_info: string;
  official_portal_url: string;
  legal_disclaimer: string;
}

// Runtime object fallbacks so that browser ESM dev server never throws missing export errors
export const UserRole = {} as any;
export const User = {} as any;
export const ThreatSignal = {} as any;
export const RiskBreakdown = {} as any;
export const Threat = {} as any;
export const GraphNode = {} as any;
export const GraphEdge = {} as any;
export const ThreatGraphData = {} as any;
export const Campaign = {} as any;
export const Case = {} as any;
export const EvidenceItem = {} as any;
export const SafetyScore = {} as any;
export const ThreatForecast = {} as any;
export const DigitalDNA = {} as any;
export const ThreatTwin = {} as any;
export const InvestigationResult = {} as any;
export const ComplaintPacket = {} as any;

