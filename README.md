# XEDO — Digital Risk Intelligence & Protection Platform

<p align="center">
  <strong>Detect. Connect. Predict. Protect.</strong><br>
  <em>Next-Generation AI Security Operating System</em>
</p>

---

## 🌟 Product Positioning

> **"XEDO doesn't just detect digital threats. It connects the evidence, discovers potential threat campaigns, explains the risk, predicts emerging patterns, and guides users from suspicion to lawful action."**

XEDO transforms the entire lifecycle of a digital risk incident:
```
Suspicion → Detection → Evidence → Correlation → Risk Understanding → Recommended Action → Evidence Preservation → Complaint Preparation → Official Reporting
```

---

## 🚀 Key Differentiators

1. **AI Security Brain**: Multi-layered intelligence pipeline combining deterministic rules, lexical string similarity, heuristics, and explainable LLM reasoning.
2. **Digital Threat Twin™**: A cybernetic dynamic digital reflection synthesizing an adversarial threat ecosystem across profiles, domains, APK payloads, evidence, and timelines.
3. **Threat Intelligence Graph**: Interactive visual network connecting official brands, lookalike profiles, suspicious URLs, scam messages, mobile apps, and evidence items.
4. **Digital Identity DNA™**: Biometric-style comparative fingerprint evaluating sovereign brand baselines against external deceptive signals.
5. **Threat Campaign Detection**: Automated clustering of isolated entities into "Potential Coordinated Threat Patterns" with confidence scores.
6. **AI Threat Forecast**: Trajectory modeling predicting emerging adversary tactics (e.g. *customer support spoofing → encrypted bot redirects → trojanized APK downloads*).
7. **Autonomous AI Investigation**: One-click deep triage analyzing 17 signals, linking 6 entities, and sealing 8 evidence items with live progress telemetry.
8. **Explainable Risk Engine**: 5-part algorithmic breakdown (Brand Similarity, Username Similarity, URL Similarity, Content Urgency, Identity Signals) with ethical, non-criminal phrasing.
9. **Safety Navigator**: Intuitive decision-tree guiding citizens through immediate panic mitigation, card freezing, and evidence preservation.
10. **Cybercrime Report Preparation**: Automatic synthesis of formatted complaint packets for the **National Cyber Crime Reporting Portal (NCRP)** (`cybercrime.gov.in`) and **Helpline 1930**.
11. **Evidence Vault**: Tamper-evident digital custody repository hashing screenshots, network snapshots, and message logs with SHA-256 digests.
12. **Dual Persona Console**: Seamless toggle between Citizen/Customer Safety Portal and Security Analyst Command Center.

---

## 🎨 Visual Design Direction

- **Default Theme**: Light theme. Apple-level simplicity, high whitespace, rounded cards, subtle borders, and calm, trustworthy typography.
- **Palette**:
  - Primary: `#2563EB` (Blue)
  - Secondary: `#7C3AED` (Purple)
  - Success / Low Risk: `#16A34A` (Emerald)
  - Warning / Medium Risk: `#F59E0B` (Amber)
  - High Risk: `#EA580C` (Orange)
  - Critical Risk: `#DC2626` (Red)
  - Background: `#F8FAFC`
  - Text: `#0F172A`
  - Secondary Text: `#64748B`

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite 5, Tailwind CSS, Lucide React, Recharts.
- **Backend**: Python 3.14+, FastAPI, SQLAlchemy, SQLite (default for instant zero-config setup) / PostgreSQL support.
- **AI & Analytics**: Scikit-Learn, Levenshtein distance, Jaccard character n-grams, Google Gemini API abstraction with 100% resilient offline fallback.
- **Security**: SHA-256 evidence hashing, JWT authentication, CORS restrictions.

---

## ⚡ Quickstart Guide

### 1. Backend Setup

```bash
cd backend
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```
*Backend initializes the database and seeds realistic interconnected demo data automatically.*
*Swagger API Documentation is live at:* `http://127.0.0.1:8000/docs`

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
*Frontend opens at:* `http://localhost:5174/`

---

## 👥 Demo Credentials & Personas

| Role | Username | Password | Dashboard URL |
| :--- | :--- | :--- | :--- |
| **Citizen / Customer** | `citizen` | `password123` | `http://localhost:5174/#customer-home` |
| **Security Analyst** | `analyst` | `password123` | `http://localhost:5174/#command-center` |
| **Platform Admin** | `admin` | `password123` | `http://localhost:5174/#settings` |

---

## 🎯 6 Seeded Demo Scenarios

XEDO features 6 pre-configured hackathon demo scenarios accessible via the top **DemoBar**:
1. **Scenario 1**: Fake Bank Support Profile (`@sbi_supportt` on Instagram)
2. **Scenario 2**: Lookalike Phishing Website (`https://sbi-kyc-verification.top/auth`)
3. **Scenario 3**: Urgent Scam SMS (Smishing Pretext with account freeze alert)
4. **Scenario 4**: Suspicious Android Application (`SBI_Secure_v4.2.apk`)
5. **Scenario 5**: Coordinated Impersonation Campaign (`CMP-2026-04 Apex-Lure Cluster`)
6. **Scenario 6**: Enterprise Brand Protection Audit (State Bank of India Corporate Identity)

---

## 🧪 Testing

Run the automated test suites:

```bash
# 1. Run unit test suite (similarity, risk engine, DNA, graph, complaints)
python tests/test_xedo.py

# 2. Run live FastAPI integration tests
python tests/test_api_endpoints.py
```

## 🌐 Deploying to Render

The repository includes a Render Blueprint in `render.yaml` for the FastAPI
backend, React frontend, and PostgreSQL database.

1. Push this project to a GitHub repository.
2. In Render, choose **New** → **Blueprint**, connect the repository, and deploy
   the `render.yaml` blueprint. Render will build both services, create the
   database, and generate a production `SECRET_KEY`.
3. Open `https://xedo-frontend.onrender.com`. The API is available at
   `https://xedo-api.onrender.com` and its health check at `/api/health`.
4. If you change either service name or use a custom frontend domain, update
   `CORS_ORIGINS` on `xedo-api` to that frontend's exact `https://` origin, then
   redeploy the API.

The Blueprint uses free Render plans as a starting point. Review Render's
current limits and upgrade the database plan before relying on persistent data.

> **Public demo only:** this project seeds demo accounts with the shared
> `password123` password and its API is not protected by production-grade
> authentication/authorization. Do not enter real personal, account, or
> investigation data, and do not use this deployment for production users.

---

## ⚖️ Legal & Ethical Disclaimers

- **Ethical AI Principle**: XEDO provides probabilistic risk scoring and similarity heuristics. It never accuses individuals of criminal conduct. It uses objective terminology: *"Potentially suspicious"*, *"Potential impersonation"*, *"High-risk indicator"*, *"Requires investigation"*.
- **Non-Government Affiliation**: XEDO is an independent cybersecurity platform and is **NOT** affiliated with the Indian Cybercrime Coordination Centre (I4C), National Cyber Crime Reporting Portal (NCRP), or state police authorities.
- **Reporting Resources**:
  - Official National Cyber Crime Reporting Portal: `https://www.cybercrime.gov.in/`
  - National Cybercrime Helpline: **1930**
