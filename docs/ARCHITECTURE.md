# XEDO System Architecture

> **Tagline:** Detect. Connect. Predict. Protect.  
> **Mission:** "XEDO doesn't just detect digital threats. It connects the evidence, discovers potential threat campaigns, explains the risk, predicts emerging patterns, and guides users from suspicion to lawful action."

---

## 1. High-Level Architecture Diagram

```
                        ┌────────────────────────────────────────────────────────┐
                        │                   CLIENT EXPERIENCES                  │
                        ├───────────────────────────┬────────────────────────────┤
                        │    Citizen / Customer     │   Security Analyst / Admin │
                        │  • Personal Safety Score  │  • SOC Command Center      │
                        │  • Universal Threat Scans │  • Threat Intelligence Graph│
                        │  • Safety Navigator Tree  │  • Digital Threat Twin     │
                        │  • NCRP Complaint Prep    │  • Threat Forecast Engine  │
                        └─────────────┬─────────────┴─────────────┬──────────────┘
                                      │                           │
                                      ▼                           ▼
                        ┌────────────────────────────────────────────────────────┐
                        │                 XEDO FRONTEND (Vite / React)           │
                        │      Tailwind CSS • Lucide React • Recharts • SVG      │
                        └───────────────────────────┬────────────────────────────┘
                                                    │ REST API
                                                    ▼
                        ┌────────────────────────────────────────────────────────┐
                        │              XEDO BACKEND (FastAPI / Python)           │
                        ├────────────────────────────────────────────────────────┤
                        │  • Universal Signal Ingest (Social, URL, SMS, APK)     │
                        │  • Multi-Factor Algorithmic Risk Engine                │
                        │  • Digital Identity DNA Fingerprinting Engine          │
                        │  • Threat Topology Graph & Campaign Clustering         │
                        │  • Autonomous AI Investigation Agent                   │
                        │  • Evidence Vault with SHA-256 Custody Digests         │
                        │  • NCRP & Helpline 1930 Packet Generator               │
                        │  • Resilient Multi-Provider LLM Client + Fallback      │
                        └───────────────────────────┬────────────────────────────┘
                                                    │
                                     ┌──────────────┴──────────────┐
                                     ▼                             ▼
                        ┌────────────────────────┐   ┌───────────────────────────┐
                        │  SQLAlchemy ORM Layer  │   │     AI Intelligence       │
                        │  SQLite / PostgreSQL   │   │  • Google Gemini 1.5      │
                        │  • Users & RBAC        │   │  • OpenAI (Optional)      │
                        │  • Threats & Signals   │   │  • Deterministic Heuristic│
                        │  • Campaigns & Cases   │   │    Local Rule Fallback    │
                        │  • Evidence & Audits   │   └───────────────────────────┘
                        └────────────────────────┘
```

---

## 2. Layered Intelligence Engine

```
INPUT (URL, Social Profile, Scam SMS, APK, Email, Phone)
  ↓
SIGNAL EXTRACTION (Headers, WHOIS, DNS, Lexical Distance, TLD Abuse)
  ↓
RULE ENGINE (Zero-day urgency patterns, institutional trademark checks)
  ↓
SIMILARITY ENGINE (Levenshtein, Jaccard character n-grams, Homoglyph detection)
  ↓
ML CLASSIFIER & HEURISTICS (Multi-factor weighted scoring 0-100)
  ↓
CORRELATION ENGINE (Linking domains, redirect loops, APK drops, smishing headers)
  ↓
RISK ENGINE (Semantic grading: Low, Medium, High, Critical)
  ↓
THREAT GRAPH (Topological multi-hop connection map)
  ↓
GENERATIVE AI (Gemini / Resilient deterministic synthesis)
  ↓
EXPLANATION (Objective, non-criminal explainability)
  ↓
RECOMMENDATION (Triage, Evidence sealing, NCRP & 1930 reporting)
```

---

## 3. Core Technical Modules

### 3.1 Explainable Risk Engine (`app/risk/risk_engine.py`)
Calculates a 5-factor weighted score:
- **Brand Similarity** (25%): Measures semantic and phonetic distance to official trademarks.
- **Username Similarity** (20%): Evaluates character transposition and lookalike appendages.
- **URL Similarity & Infrastructure Risk** (20%): Scans abusive TLDs, IP hosting, and deceptive subdomains.
- **Content Urgency** (20%): Detects coercions (KYC suspensions, bill cuts, OTP requests).
- **Identity Signals** (15%): Evaluates lack of verification and registration variance.

### 3.2 Digital Identity DNA™ (`app/ai/digital_dna.py`)
Compares 6 identity vectors:
1. Username Pattern
2. Domain & TLS Signature
3. Visual Emblem Vector
4. Language Tone
5. Support Channel Protocols
6. Brand Naming Structure

### 3.3 Digital Threat Twin™ (`app/ai/threat_twin.py`)
A cybernetic twin synthesizing:
- Spoofed Identity
- Deceptive Infrastructure URLs
- Sideloaded APK Payloads
- Cryptographic Evidence Hashes
- Multi-Hop Graph Relationships
- Event Horizon Timeline

### 3.4 Evidence Vault & NCRP Complaint Generator (`app/services/complaint_generator.py`)
- Automatically generates SHA-256 cryptographic digests for every preserved screenshot, DOM snapshot, and message transcript.
- Synthesizes formatted complaint narratives ready for direct submission to the National Cyber Crime Reporting Portal (`cybercrime.gov.in`) and emergency dial `1930`.
