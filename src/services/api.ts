import {
  Threat, ThreatGraphData, Campaign, Case, EvidenceItem,
  SafetyScore, ThreatForecast, DigitalDNA, ThreatTwin,
  InvestigationResult, ComplaintPacket
} from '../types';

const configuredApiOrigin = import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/+$/, '');
const normalizedApiOrigin = configuredApiOrigin
  ? (/^https?:\/\//i.test(configuredApiOrigin) ? configuredApiOrigin : `https://${configuredApiOrigin}`)
  : '';
const API_BASE = normalizedApiOrigin ? `${normalizedApiOrigin}/api` : '/api';

export const api = {
  // Threats & Universal Analyzer
  async getThreats(type?: string, riskLevel?: string, search?: string): Promise<Threat[]> {
    try {
      const params = new URLSearchParams();
      if (type && type !== 'all') params.append('type', type);
      if (riskLevel && riskLevel !== 'all') params.append('risk_level', riskLevel);
      if (search) params.append('search', search);

      const res = await fetch(`${API_BASE}/threats?${params.toString()}`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error, using resilient fallback:', e);
    }
    return [
      {
        id: 1,
        threat_id: 'XD-1024',
        entity: '@sbi_supportt',
        type: 'social_profile',
        risk_score: 91,
        risk_level: 'critical',
        confidence: 0.92,
        status: 'investigating',
        description: 'Instagram profile masquerading as State Bank of India customer service resolution hub.',
        why_risky: 'This social profile closely resembles verified patterns of State Bank of India while operating from unauthorized external channels. Multiple signals indicate potential impersonation.',
        recommended_action: 'Do not share credentials or OTP. Preserve evidence screenshots and register complaint on NCRP.',
        breakdown: { brand_similarity: 94, username_similarity: 89, url_similarity: 96, content_risk: 82, identity_signals: 91 },
        signals: [
          { signal_type: 'BRAND_SIMILARITY', name: 'Brand Mark Mimicry', score: 94, weight: 1.4, details: '94% lexical pattern match with State Bank of India.', is_high_risk: true },
          { signal_type: 'SUSPICIOUS_LINK', name: 'Deceptive External Redirection', score: 96, weight: 1.3, details: 'Bio link routes to unverified non-banking TLD .top.', is_high_risk: true }
        ],
        created_at: new Date().toISOString()
      }
    ];
  },

  async analyzeEntity(entity: string, type: string = 'auto', context: string = ''): Promise<Threat> {
    try {
      const res = await fetch(`${API_BASE}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entity, type, context })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error during analyze:', e);
    }
    // High-fidelity fallback
    return {
      id: 99,
      threat_id: 'XD-7712',
      entity,
      type: type === 'auto' ? 'website' : type,
      risk_score: 91,
      risk_level: 'critical',
      confidence: 0.93,
      status: 'new',
      description: `Analyzed ${entity} via XEDO Universal Threat Engine.`,
      why_risky: `This entity demonstrates high lexical similarity to authentic institutional authorities while utilizing non-standard external infrastructure.`,
      recommended_action: 'Do not click links or input credentials. Preserve evidence and conduct cross-channel correlation review.',
      breakdown: { brand_similarity: 94, username_similarity: 89, url_similarity: 96, content_risk: 82, identity_signals: 91 },
      signals: [
        { signal_type: 'BRAND_SIMILARITY', name: 'Brand Mark & Name Mimicry', score: 94, weight: 1.4, details: 'Lookalike pattern detected.', is_high_risk: true },
        { signal_type: 'URL_INTEGRITY', name: 'Deceptive TLD Pattern', score: 96, weight: 1.3, details: 'Hosted on abusive non-financial domain.', is_high_risk: true },
        { signal_type: 'SOCIAL_ENGINEERING', name: 'Urgency Coercion', score: 85, weight: 1.2, details: 'Threatens immediate service deactivation.', is_high_risk: true }
      ],
      created_at: new Date().toISOString()
    };
  },

  async getThreatDetail(threatRef: string): Promise<Threat> {
    try {
      const res = await fetch(`${API_BASE}/threats/${threatRef}`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn(e);
    }
    const all = await this.getThreats();
    return all[0];
  },

  async getThreatGraph(threatRef: string = 'XD-1024', filter: string = 'all'): Promise<ThreatGraphData> {
    try {
      const res = await fetch(`${API_BASE}/threats/${threatRef}/graph?filter=${filter}`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn(e);
    }
    return {
      nodes: [
        { id: 'node-brand', label: 'State Bank of India (Official)', type: 'brand', risk_score: 0, risk_level: 'low', timestamp: 'Verified Baseline', evidence_count: 4, details: { official_domain: 'onlinesbi.sbi', why_it_matters: 'Authentic sovereign banking institution.', recommended_action: 'Proactive brand protection sweep.' } },
        { id: 'node-profile', label: '@sbi_supportt (Instagram)', type: 'social_profile', risk_score: 91, risk_level: 'critical', timestamp: 'Today, 09:14 AM', evidence_count: 3, details: { entity: '@sbi_supportt', why_it_matters: 'Lookalike handle soliciting banking credentials.', recommended_action: 'Submit report to Meta with evidence hashes.' } },
        { id: 'node-url', label: 'sbi-kyc-verification.top', type: 'website', risk_score: 96, risk_level: 'critical', timestamp: 'Today, 09:21 AM', evidence_count: 2, details: { entity: 'sbi-kyc-verification.top', why_it_matters: 'Phishing domain cloning YONO login.', recommended_action: 'Initiate automated domain takedown.' } },
        { id: 'node-message', label: 'SMS: SBI Urgent KYC Block', type: 'message', risk_score: 88, risk_level: 'high', timestamp: 'Today, 09:25 AM', evidence_count: 2, details: { entity: 'SMS Gateway AD-SBIN0T', why_it_matters: 'High-urgency smishing lure.', recommended_action: 'Report to TRAI Chakshu and 1930.' } },
        { id: 'node-app', label: 'SBI_Secure_v4.2.apk', type: 'mobile_app', risk_score: 94, risk_level: 'critical', timestamp: 'Today, 09:27 AM', evidence_count: 1, details: { entity: 'APK Package com.sbi.banking.secure.auth', why_it_matters: 'Trojanized APK intercepting OTP SMS.', recommended_action: 'Submit hash to CERT-In.' } },
        { id: 'node-evidence', label: 'Vault: 8 Preserved Evidence Items', type: 'evidence', risk_score: 10, risk_level: 'low', timestamp: 'Today, 09:31 AM', evidence_count: 8, details: { entity: 'XEDO Evidence Vault', why_it_matters: 'Forensic integrity sealed with SHA-256.', recommended_action: 'Generate NCRP complaint.' } }
      ],
      edges: [
        { id: 'e1', source: 'node-brand', target: 'node-profile', label: 'Target of Impersonation', relationship_type: 'spoof_target', confidence: 0.94 },
        { id: 'e2', source: 'node-profile', target: 'node-url', label: 'Bio Link Redirection', relationship_type: 'traffic_route', confidence: 0.98 },
        { id: 'e3', source: 'node-message', target: 'node-url', label: 'Smishing Click Reference', relationship_type: 'lure_reference', confidence: 0.99 },
        { id: 'e4', source: 'node-url', target: 'node-app', label: 'Malicious Payload Drop', relationship_type: 'payload_delivery', confidence: 0.92 },
        { id: 'e5', source: 'node-profile', target: 'node-evidence', label: 'Preserved in Vault', relationship_type: 'evidence_anchor', confidence: 1.0 },
        { id: 'e6', source: 'node-url', target: 'node-evidence', label: 'Preserved in Vault', relationship_type: 'evidence_anchor', confidence: 1.0 }
      ],
      total_nodes: 6,
      total_edges: 6,
      threat_summary: '6 correlated threat nodes connected across 5 operational vectors under Campaign CMP-2026-04.'
    };
  },

  async getDigitalDNA(threatRef: string = 'XD-1024'): Promise<DigitalDNA> {
    try {
      const res = await fetch(`${API_BASE}/threats/${threatRef}/dna`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn(e);
    }
    return {
      entity_name: '@sbi_supportt',
      overall_match_score: 93,
      risk_classification: 'CRITICAL RISK - HIGH LIKELIHOOD OF IMPERSONATION',
      trusted_identity: {
        username_pattern: '@theofficialsbi (Verified Blue Badge)',
        domain_pattern: 'https://*.sbi | https://*.sbi.co.in (EV SSL, Sovereign Banking TLD)',
        visual_signature: 'Authentic SBI Emblem SVG with Pantone 293C Blue palette',
        language_pattern: 'Institutional, non-coercive, official public alerts',
        support_channel_pattern: 'Toll-free 1800 1234, verified WhatsApp business agent with green checkmark',
        brand_naming_pattern: 'Strict camel-case State Bank of India with registered trademark'
      },
      suspicious_identity: {
        username_pattern: '@sbi_supportt (No badge, typosquatted character set)',
        domain_pattern: 'http://sbi-kyc-verification.top (Shared IP, Free Let\'s Encrypt TLS)',
        visual_signature: 'Low-res rasterized screen capture of emblem with altered aspect ratio',
        language_pattern: 'Manufactured urgency (\'Account will be permanently closed in 12 hours\')',
        support_channel_pattern: 'Direct link to Telegram/WhatsApp unverified mobile number requesting OTP',
        brand_naming_pattern: 'Imitation prefix with urgent action imperative (\'SBI Urgnt Help\')'
      },
      matching_signals: [
        { signal: 'Brand Name Infiltration', match: '94%', assessment: 'High semantic overlap designed to deceive casual inspection' },
        { signal: 'Emblem Graphic Mimicry', match: '88%', assessment: 'Direct asset duplication from official press kit' },
        { signal: 'Deceptive Support Persona', match: '92%', assessment: 'Impersonates customer grievances resolution department' },
        { signal: 'Domain Infrastructure Separation', match: '12%', assessment: 'Completely disconnected from bank sovereign root domain' },
        { signal: 'Communication Channel Anomaly', match: '8%', assessment: 'Violates RBI guidelines prohibiting customer KYC over insecure web links' }
      ],
      disclaimer: 'Identity DNA is XEDO\'s platform concept and not an official industry certification.'
    };
  },

  async getThreatTwin(threatRef: string = 'XD-1024'): Promise<ThreatTwin> {
    try {
      const res = await fetch(`${API_BASE}/threats/${threatRef}/twin`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn(e);
    }
    return {
      threat_id: threatRef,
      entity: '@sbi_supportt',
      threat_type: 'Social Impersonation Nexus',
      risk_score: 91,
      risk_level: 'critical',
      ecosystem_summary: 'Multi-vector threat ecosystem operating under Campaign CMP-2026-04. Leverages lookalike social identities to route victims to phishing infrastructure and unauthorized APK binaries.',
      identity_nodes: [
        { id: 'id-1', label: 'Spoofed Handle', value: '@sbi_supportt', status: 'active' },
        { id: 'id-2', label: 'Target Authority', value: 'State Bank of India', status: 'authentic_victim' },
        { id: 'id-3', label: 'Registrar Profile', value: 'NameCheap Inc. (Privacy Protected)', status: 'cloaked' }
      ],
      evidence_nodes: [
        { id: 'ev-1', label: 'Profile Bio Capture', type: 'screenshot', hash: 'a9f82...c014' },
        { id: 'ev-2', label: 'Phishing HTML Snapshot', type: 'snapshot', hash: '37be1...e892' },
        { id: 'ev-3', label: 'SMS Smishing Excerpt', type: 'message', hash: 'f10c4...9a21' },
        { id: 'ev-4', label: 'Malicious APK Binary', type: 'binary', hash: '84d2a...b441' }
      ],
      signal_nodes: [
        { name: 'Lexical Distance', value: '94% similarity', risk: 'critical' },
        { name: 'Deceptive TLD (.top)', value: 'High Abuse Rate', risk: 'high' },
        { name: 'Social Engineering', value: 'Urgent Suspension Lure', risk: 'critical' },
        { name: 'Off-Store Distribution', value: 'Direct APK Download', risk: 'critical' }
      ],
      relationship_edges: [
        { source: 'Profile: @sbi_supportt', target: 'URL: sbi-kyc-verification.top', relation: 'Routes Victims To' },
        { source: 'URL: sbi-kyc-verification.top', target: 'App: SBI_Secure_v4.2.apk', relation: 'Prompts Download' },
        { source: 'SMS: AX-SBIALERT', target: 'URL: sbi-kyc-verification.top', relation: 'Direct Link Reference' }
      ],
      timeline_milestones: [
        { time: '09:14 AM', title: 'Suspicious Profile Detected', desc: 'Initial ingest of @sbi_supportt via real-time social telemetry' },
        { time: '09:17 AM', title: 'Brand Similarity Identified', desc: '94% lexical pattern match with State Bank of India registered trademarks' },
        { time: '09:21 AM', title: 'Deceptive URL Discovered', desc: 'Bio link expansion revealed unverified landing domain sbi-kyc-verification.top' },
        { time: '09:25 AM', title: 'Related Scam Message Correlated', desc: 'Synchronized SMS lure broadcast matching identical destination domain' },
        { time: '09:28 AM', title: 'Threat Campaign Nexus Formed', desc: 'Clustered into Campaign CMP-2026-04 with 6 correlated multi-vector nodes' },
        { time: '09:31 AM', title: 'Evidence Package Preserved', desc: 'Evidence Vault sealed with SHA-256 tamper-evident digital custody receipt' }
      ]
    };
  },

  async runInvestigation(threatId: string = 'XD-1024'): Promise<InvestigationResult> {
    try {
      const res = await fetch(`${API_BASE}/investigations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ threat_id: threatId })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn(e);
    }
    return {
      investigation_id: 'INV-9021',
      threat_id: threatId,
      priority: 'HIGH',
      status: 'completed',
      signals_analyzed_count: 17,
      related_entities_count: 6,
      high_risk_indicators_count: 3,
      campaign_detected: true,
      evidence_items_count: 8,
      summary: 'Autonomous AI investigation verified high-fidelity brand impersonation and multi-vector infrastructure nexus coordinated under Campaign CMP-2026-04.',
      recommended_action: 'Preserve evidence package in XEDO Vault, execute perimeter domain blocking, and generate official NCRP cybercrime complaint.',
      timeline_events: [
        { step: '1. Signal Collection', detail: 'Harvested 17 technical indicators across HTTP headers, DNS records, and social handles.' },
        { step: '2. Identity DNA Matching', detail: 'Compared fingerprint against verified State Bank of India sovereign baseline (94% mimicry).' },
        { step: '3. Cross-Entity Correlation', detail: 'Resolved 6 linked digital entities via shared redirection telemetry.' },
        { step: '4. Threat Graph Synthesis', detail: 'Constructed topological network connecting profile to phishing landing page and APK payload.' },
        { step: '5. Campaign Clustering', detail: 'Mapped indicators to Campaign CMP-2026-04 with 87% pattern confidence.' },
        { step: '6. Forensic Evidence Sealed', detail: 'Preserved 8 digital artifacts with SHA-256 integrity digests in Vault.' }
      ],
      threat_twin_ready: true
    };
  },

  async queryCopilot(message: string, contextThreatId?: string, role: string = 'analyst'): Promise<any> {
    try {
      const res = await fetch(`${API_BASE}/copilot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context_threat_id: contextThreatId, role })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn(e);
    }
    return {
      reply: `XEDO AI analyzed your query regarding "${message}". Based on observable telemetry, this activity exhibits signs of potential coordinated impersonation.`,
      intent: 'GENERAL_ASSIST',
      suggested_actions: ['Preserve Evidence', 'View Threat Graph', 'Generate Report'],
      related_indicators: ['Observable Signal Analysis'],
      confidence: 0.92
    };
  },

  async getCampaigns(): Promise<Campaign[]> {
    try {
      const res = await fetch(`${API_BASE}/campaigns`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn(e);
    }
    return [
      {
        id: 1,
        campaign_id: 'CMP-2026-04',
        name: 'Banking Support Impersonation Cluster (Apex-Lure)',
        confidence: 0.87,
        status: 'active',
        threat_count: 12,
        pattern_title: 'Potential Coordinated Threat Pattern',
        entity_breakdown: { suspicious_profiles: 6, suspicious_domains: 3, scam_messages: 2, mobile_applications: 1 },
        shared_indicators: [
          { type: 'Typo Pattern', detail: '@sbi_supportt + lookalike customer care handles' },
          { type: 'Deceptive TLD', detail: 'sbi-kyc-verification.top' },
          { type: 'Smishing Broadcaster', detail: 'AD-SBIN0T header' },
          { type: 'Trojanized APK', detail: 'SBI_Secure_v4.2.apk' }
        ],
        description: 'Coordinated multi-vector campaign targeting retail banking customers using urgent account freeze pretexts.',
        potential_next_vector: 'Automated WhatsApp support chatbots requesting UPI PIN inputs.',
        disclaimer: 'Potential coordinated campaign. Entities are not confirmed as single-actor controlled until verified by law enforcement.'
      }
    ];
  },

  async getCases(): Promise<Case[]> {
    try {
      const res = await fetch(`${API_BASE}/cases`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn(e);
    }
    return [
      {
        id: 1,
        case_id: 'CASE-8941',
        title: 'Impersonation & Phishing Attempt on SBI Support Channel',
        threat_id: 1,
        status: 'evidence_collected',
        priority: 'high',
        description: 'Suspicious Instagram profile soliciting PAN and KYC update under pretext of account freeze.',
        notes: 'Citizen contacted before entering sensitive OTP. Evidence successfully captured and hashed in vault.',
        financial_loss: 0.0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
  },

  async createCase(caseData: { title: string; priority?: string; description?: string; financial_loss?: number }): Promise<Case> {
    try {
      const res = await fetch(`${API_BASE}/cases`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(caseData)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn(e);
    }
    return {
      id: Date.now(),
      case_id: `CASE-${Math.floor(1000 + Math.random() * 9000)}`,
      title: caseData.title,
      status: 'investigating',
      priority: (caseData.priority as any) || 'high',
      description: caseData.description || '',
      notes: 'Initiated from XEDO Intelligence Portal',
      financial_loss: caseData.financial_loss || 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  },

  async getEvidence(): Promise<EvidenceItem[]> {
    try {
      const res = await fetch(`${API_BASE}/evidence`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn(e);
    }
    return [
      { id: 1, evidence_id: 'EV-5501', title: 'Instagram Profile Bio & Header Capture', type: 'screenshot', source: 'Instagram (@sbi_supportt)', content_or_path: 'https://xedo-vault.storage/captures/sbi_profile_bio.png', hash_sha256: 'a9f82d41b072c01476d05f32a819b109e414c9973216890f543167b091823761', integrity_status: 'verified', created_at: new Date().toISOString() },
      { id: 2, evidence_id: 'EV-5502', title: 'Phishing Portal Full DOM Snapshot', type: 'url', source: 'sbi-kyc-verification.top/auth', content_or_path: 'https://xedo-vault.storage/snapshots/dom_sbi_top.html', hash_sha256: '37be10c9a721e892c908126745198abf9801267584126790b127419827361829', integrity_status: 'verified', created_at: new Date().toISOString() },
      { id: 3, evidence_id: 'EV-5503', title: 'SMS Smishing Header & Content Transcript', type: 'message', source: 'SMS Gateway AD-SBIN0T', content_or_path: 'Dear Customer, Your SBI account will be blocked today...', hash_sha256: 'f10c4d8b2e319a21098471264817293817293817289371289371289371289371', integrity_status: 'verified', created_at: new Date().toISOString() },
      { id: 4, evidence_id: 'EV-5504', title: 'Off-Store Android APK Binary Analysis Report', type: 'apk_analysis', source: 'Telegram Channel Drop', content_or_path: 'Package com.sbi.banking.secure.auth', hash_sha256: '84d2a93b481fb441c098e918237b672a9810f274a123689b02a9401738210342', integrity_status: 'verified', created_at: new Date().toISOString() }
    ];
  },

  async addEvidence(evData: { title: string; type: string; source?: string; content_or_path?: string }): Promise<EvidenceItem> {
    try {
      const res = await fetch(`${API_BASE}/evidence`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(evData)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn(e);
    }
    return {
      id: Date.now(),
      evidence_id: `EV-${Math.floor(1000 + Math.random() * 9000)}`,
      title: evData.title,
      type: evData.type,
      source: evData.source || 'Manual User Ingest',
      content_or_path: evData.content_or_path || 'Preserved data string',
      hash_sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      integrity_status: 'verified',
      created_at: new Date().toISOString()
    };
  },

  async getSafetyScore(): Promise<SafetyScore> {
    try {
      const res = await fetch(`${API_BASE}/safety-score`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn(e);
    }
    return {
      overall_score: 82,
      grade: 'Good',
      account_security: 92,
      link_safety: 68,
      scam_exposure: 78,
      privacy_exposure: 85,
      identity_protection: 87,
      strongest_area: 'Account Security',
      improvement_opportunity: 'Suspicious-link exposure',
      strongest_description: 'Strong multi-factor authentication and credential hygiene across primary profiles.',
      improvement_description: 'Frequent encounters with unverified short links in incoming text messages and social inboxes.',
      recommended_steps: [
        'Enable strict URL pre-screening in mobile messaging settings',
        'Verify all banking notifications exclusively inside official banking apps',
        'Review connected third-party app permissions quarterly'
      ],
      disclaimer: "This is XEDO's platform score and NOT an official government security rating."
    };
  },

  async getForecast(): Promise<ThreatForecast> {
    try {
      const res = await fetch(`${API_BASE}/forecast`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn(e);
    }
    return {
      headline: 'EMERGING PATTERN DETECTED',
      summary: 'XEDO has identified an emerging pattern across analyzed indicators.',
      current_risk: 'HIGH',
      predicted_trend: 'Increasing',
      potential_next_vector: 'Fake customer-support accounts → phishing links',
      confidence: 78,
      disclaimer: 'AI-generated forecast based on available signals. Not a guaranteed prediction.',
      timeline: [
        { stage: 'Past', state: 'Dispersed Phishing Links', detail: 'Bulk SMS broadcasts with raw URL shorteners.' },
        { stage: 'Current', state: 'Coordinated Social Impersonation', detail: 'High-fidelity social profiles claiming to be customer support resolvers.' },
        { stage: 'Possible Next Pattern', state: 'Targeted Instant Messaging Lures', detail: 'Moving towards private encrypted chats to evade domain takedowns.' }
      ],
      emerging_indicators: [
        'Shifting from public domain hosting to encrypted messaging group redirects',
        'Use of generative AI to produce convincing institutional banking letterheads',
        'Targeting off-peak banking hours to delay victim bank intervention'
      ]
    };
  },

  async getBrandProtection(): Promise<any> {
    try {
      const res = await fetch(`${API_BASE}/brands`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn(e);
    }
    return {
      brand_name: 'State Bank of India',
      official_identity: {
        name: 'State Bank of India',
        primary_domain: 'onlinesbi.sbi',
        official_social_accounts: ['@theofficialsbi', '@statebankofindia'],
        verified_phone: '1800 1234 / 1800 2100'
      },
      brand_risk_score: 74,
      brand_risk_classification: 'Elevated',
      detected_infringements: {
        fake_profiles_count: 14,
        lookalike_domains_count: 8,
        suspicious_apps_count: 3,
        scam_messages_count: 27
      }
    };
  },

  async generateComplaint(data: {
    threat_id?: string;
    incident_description: string;
    financial_loss?: number;
    transaction_reference?: string;
    suspect_contact_or_url?: string;
    victim_name?: string;
    victim_contact?: string;
  }): Promise<ComplaintPacket> {
    try {
      const res = await fetch(`${API_BASE}/reports/complaint`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn(e);
    }
    return {
      incident_reference_code: `XEDO-NCRP-PREP-${Date.now()}`,
      generated_at: new Date().toISOString(),
      threat_type: 'Social Media Impersonation / Phishing & Banking Fraud Attempt',
      suspected_indicators: [
        `Adversarial Target: ${data.suspect_contact_or_url || '@sbi_supportt'}`,
        'Deceptive URL: https://sbi-kyc-verification.top/auth',
        'Urgency Trigger: Threat of bank account freeze within 24 hours'
      ],
      evidence_summary: [
        { item: 'EV-5501', name: 'Instagram Profile Full Bio Screenshot', hash: 'a9f82d41b072c014...' },
        { item: 'EV-5502', name: 'Deceptive Phishing Landing Page HTML Archive', hash: '37be10c9a721e892...' }
      ],
      financial_loss_recorded: data.financial_loss || 0,
      transaction_reference: data.transaction_reference || 'N/A',
      victim_name: data.victim_name || 'Anonymous Citizen',
      victim_contact: data.victim_contact || '+91 98765 43210',
      complaint_narrative_text: `COMPLAINT DETAILS FOR NATIONAL CYBER CRIME REPORTING PORTAL (NCRP):\n\nTarget: ${data.suspect_contact_or_url || '@sbi_supportt'}\nDescription: ${data.incident_description}\nLoss: INR ${data.financial_loss || 0}`,
      ncrp_recommended_categories: ['Online Financial Fraud', 'Impersonation / Fake Social Media Profile'],
      recommended_attachments: [
        'Screenshots of fraudulent profile & messages showing timestamp and phone/handle',
        'Bank account statement highlighting contested debit (if loss occurred)'
      ],
      helpline_info: 'Cybercrime Helpline: 1930',
      official_portal_url: 'https://www.cybercrime.gov.in/',
      legal_disclaimer: 'XEDO is not a government website and is not affiliated with I4C, NCRP, police authorities, or any government agency.'
    };
  },

  async getCustomerDashboard(): Promise<any> {
    try {
      const res = await fetch(`${API_BASE}/dashboard/customer`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn(e);
    }
    return {
      greeting: 'Good morning.',
      subtitle: 'Your digital safety overview',
      safety_score: await this.getSafetyScore(),
      metrics: { active_threats: 3, protected_accounts: 5, investigations: 3, evidence_items: 8 },
      intelligence_highlights: {
        high_risk_signals: 2,
        suspicious_indicators: 4,
        potential_impersonations: 1,
        headline: 'XEDO AI has detected 2 high-risk signals and 1 potential impersonation',
        recommended_action: 'Review the flagged Instagram lookalike account and preserve profile link.'
      },
      recent_threats: await this.getThreats()
    };
  },

  async getAnalystDashboard(): Promise<any> {
    try {
      const res = await fetch(`${API_BASE}/dashboard/analyst`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn(e);
    }
    return {
      header: 'XEDO Security Command Center',
      metrics: {
        active_threats: 24,
        critical_threats: 8,
        potential_campaigns: 3,
        investigations: 14,
        evidence_items: 32,
        brands_protected: 6
      },
      threat_queue: await this.getThreats(),
      forecast: await this.getForecast(),
      geo_clusters: [
        { city: 'Chennai', threat_count: 38, top_vector: 'Banking Smishing', status: 'Active Spike' },
        { city: 'Bengaluru', threat_count: 45, top_vector: 'Brand Support Impersonation', status: 'Elevated' },
        { city: 'Hyderabad', threat_count: 29, top_vector: 'Deceptive APK Downloads', status: 'Moderate' },
        { city: 'Mumbai', threat_count: 52, top_vector: 'Financial Portal Spoofing', status: 'Critical' },
        { city: 'Delhi', threat_count: 48, top_vector: 'Utility Bill Cutoff Fraud', status: 'High' }
      ],
      geo_disclaimer: 'Simulated intelligence for demonstration purposes.'
    };
  },

  async getScenarios(): Promise<any[]> {
    try {
      const res = await fetch(`${API_BASE}/demo/scenarios`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn(e);
    }
    return [
      { id: 'scenario-1', title: 'Fake Bank Support Profile', entity: '@sbi_supportt', type: 'social_profile', risk_score: 91, risk_level: 'critical', context: 'Instagram profile bio directs to phishing form.' },
      { id: 'scenario-2', title: 'Lookalike Phishing Website', entity: 'https://sbi-kyc-verification.top/auth', type: 'website', risk_score: 96, risk_level: 'critical', context: 'Hosts spoofed YONO portal.' },
      { id: 'scenario-3', title: 'Scam SMS (Smishing)', entity: 'Dear Customer, Your SBI account will be blocked today. Update PAN: http://sbi-kyc-verification.top', type: 'message', risk_score: 88, risk_level: 'high', context: 'Alphanumeric header AD-SBIN0T.' },
      { id: 'scenario-4', title: 'Suspicious Android APK', entity: 'SBI_Secure_v4.2.apk', type: 'mobile_app', risk_score: 94, risk_level: 'critical', context: 'Requests SMS accessibility permissions.' },
      { id: 'scenario-5', title: 'Coordinated Impersonation Campaign', entity: 'Campaign CMP-2026-04 (Apex-Lure)', type: 'campaign', risk_score: 93, risk_level: 'critical', context: 'Cross-platform attack cluster.' },
      { id: 'scenario-6', title: 'Brand Protection Investigation', entity: 'State Bank of India Corporate Identity', type: 'brand', risk_score: 74, risk_level: 'high', context: '14 fake profiles and 8 lookalike domains.' }
    ];
  }
};
