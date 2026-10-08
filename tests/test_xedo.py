import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend')))

from app.risk.similarity import (
    levenshtein_distance, string_similarity_ratio, check_brand_similarity,
    analyze_url_risk, analyze_message_content_risk
)
from app.risk.risk_engine import evaluate_threat_risk
from app.ai.digital_dna import compute_digital_identity_dna
from app.ai.threat_twin import generate_threat_twin
from app.ai.forecast_engine import generate_threat_forecast
from app.graph.threat_graph_builder import build_threat_graph
from app.services.complaint_generator import generate_official_complaint_packet
from app.services.campaign_service import get_demo_campaigns
from app.services.safety_score_service import get_personal_safety_score

def test_string_similarity():
    # Identical
    assert string_similarity_ratio("sbi", "sbi") == 1.0
    # Typosquat handle
    sim = string_similarity_ratio("theofficialsbi", "theofficialsbii")
    assert sim > 0.90
    # Levenshtein distance
    assert levenshtein_distance("bank", "bankk") == 1

def test_brand_similarity():
    brand, score, meta = check_brand_similarity("@sbi_supportt")
    assert brand == "State Bank of India"
    assert score >= 0.85

def test_url_risk():
    score, indicators = analyze_url_risk("https://sbi-kyc-verification.top/auth")
    assert score >= 70
    assert any("top" in ind.lower() for ind in indicators)

def test_message_content_risk():
    text = "Dear Customer, Your SBI account will be blocked today. Please update PAN immediately: http://test.xyz"
    score, indicators = analyze_message_content_risk(text)
    assert score >= 60
    assert len(indicators) >= 2

def test_composite_risk_engine():
    res = evaluate_threat_risk("@sbi_supportt", "social_profile")
    assert res["risk_score"] >= 70
    assert res["risk_level"] in ["high", "critical"]
    assert "breakdown" in res
    assert res["breakdown"]["brand_similarity"] >= 85

    # Ethical phrasing check: never accuse criminal status
    assert "criminal" not in res["why_risky"].lower()
    assert "potential impersonation" in res["why_risky"].lower() or "resembles" in res["why_risky"].lower()

def test_digital_identity_dna():
    dna = compute_digital_identity_dna("@sbi_supportt")
    assert dna["overall_match_score"] >= 90
    assert "trusted_identity" in dna
    assert "suspicious_identity" in dna
    assert len(dna["matching_signals"]) >= 4
    assert "disclaimer" in dna

def test_threat_twin():
    twin = generate_threat_twin("XD-1024", "@sbi_supportt")
    assert twin["threat_id"] == "XD-1024"
    assert len(twin["identity_nodes"]) >= 3
    assert len(twin["evidence_nodes"]) >= 4
    assert len(twin["signal_nodes"]) >= 4
    assert len(twin["relationship_edges"]) >= 3
    assert len(twin["timeline_milestones"]) >= 5

def test_threat_forecast():
    fc = generate_threat_forecast()
    assert fc["headline"] == "EMERGING PATTERN DETECTED"
    assert fc["confidence"] == 78
    assert len(fc["timeline"]) == 3

def test_threat_graph():
    graph = build_threat_graph("XD-1024", "all")
    assert graph["total_nodes"] >= 6
    assert graph["total_edges"] >= 6
    # Filter test
    filtered = build_threat_graph("XD-1024", "profiles")
    assert filtered["total_nodes"] < graph["total_nodes"]

def test_complaint_generator():
    packet = generate_official_complaint_packet(
        threat_entity="@sbi_supportt",
        incident_description="Received deceptive link",
        financial_loss=5000.0,
        transaction_reference="UPI/123456789/SBI"
    )
    assert packet["financial_loss_recorded"] == 5000.0
    assert "1930" in packet["helpline_info"]
    assert "cybercrime.gov.in" in packet["official_portal_url"]
    assert "not a government website" in packet["legal_disclaimer"].lower()

def test_campaign_grouping():
    camps = get_demo_campaigns()
    assert len(camps) >= 2
    assert camps[0]["campaign_id"] == "CMP-2026-04"
    assert camps[0]["confidence"] == 0.87
    assert camps[0]["entity_breakdown"]["suspicious_profiles"] == 6

def test_personal_safety_score():
    score = get_personal_safety_score()
    assert score["overall_score"] == 82
    assert score["account_security"] == 92
    assert "Account Security" in score["strongest_area"]

if __name__ == "__main__":
    test_funcs = [
        test_string_similarity,
        test_brand_similarity,
        test_url_risk,
        test_message_content_risk,
        test_composite_risk_engine,
        test_digital_identity_dna,
        test_threat_twin,
        test_threat_forecast,
        test_threat_graph,
        test_complaint_generator,
        test_campaign_grouping,
        test_personal_safety_score,
    ]
    for fn in test_funcs:
        fn()
        print(f"PASS: {fn.__name__}")
    print("\nALL 12 XEDO UNIT TESTS PASSED SUCCESSFULLY!")

