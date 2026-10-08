import urllib.request
import json

BASE_URL = "http://127.0.0.1:8000/api"

def test_api_health():
    res = urllib.request.urlopen(f"{BASE_URL}/health")
    assert res.status == 200
    data = json.loads(res.read().decode())
    assert data["status"] == "healthy"
    print("PASS: /api/health")

def test_api_threats():
    res = urllib.request.urlopen(f"{BASE_URL}/threats")
    assert res.status == 200
    data = json.loads(res.read().decode())
    assert len(data) >= 4
    print("PASS: /api/threats (count:", len(data), ")")

def test_api_analyze():
    payload = json.dumps({"entity": "@sbi_supportt", "type": "social_profile"}).encode("utf-8")
    req = urllib.request.Request(f"{BASE_URL}/analyze", data=payload, headers={"Content-Type": "application/json"})
    res = urllib.request.urlopen(req)
    assert res.status == 200
    data = json.loads(res.read().decode())
    assert data["risk_score"] >= 70
    assert "breakdown" in data
    print("PASS: /api/analyze (score:", data["risk_score"], ")")

def test_api_forecast():
    res = urllib.request.urlopen(f"{BASE_URL}/forecast")
    assert res.status == 200
    data = json.loads(res.read().decode())
    assert data["headline"] == "EMERGING PATTERN DETECTED"
    print("PASS: /api/forecast")

def test_api_campaigns():
    res = urllib.request.urlopen(f"{BASE_URL}/campaigns")
    assert res.status == 200
    data = json.loads(res.read().decode())
    assert len(data) >= 1
    assert data[0]["campaign_id"] == "CMP-2026-04"
    print("PASS: /api/campaigns")

def test_api_complaint():
    payload = json.dumps({
        "incident_description": "Received suspicious SMS with account freeze alert.",
        "financial_loss": 0.0,
        "suspect_contact_or_url": "@sbi_supportt"
    }).encode("utf-8")
    req = urllib.request.Request(f"{BASE_URL}/reports/complaint", data=payload, headers={"Content-Type": "application/json"})
    res = urllib.request.urlopen(req)
    assert res.status == 200
    data = json.loads(res.read().decode())
    assert "1930" in data["helpline_info"]
    assert "cybercrime.gov.in" in data["official_portal_url"]
    print("PASS: /api/reports/complaint")

if __name__ == "__main__":
    test_api_health()
    test_api_threats()
    test_api_analyze()
    test_api_forecast()
    test_api_campaigns()
    test_api_complaint()
    print("\nALL 6 LIVE FASTAPI ENDPOINT TESTS PASSED SUCCESSFULLY!")
