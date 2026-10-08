import re
from typing import Dict, Any, List, Tuple

OFFICIAL_BRANDS = {
    "sbi": {"name": "State Bank of India", "domains": ["onlinesbi.sbi", "sbi.co.in"], "handles": ["theofficialsbi", "statebankofindia"]},
    "hdfc": {"name": "HDFC Bank", "domains": ["hdfcbank.com"], "handles": ["hdfcbank", "hdfcbank_cares"]},
    "icici": {"name": "ICICI Bank", "domains": ["icicibank.com"], "handles": ["icicibank", "icicibank_care"]},
    "axis": {"name": "Axis Bank", "domains": ["axisbank.com"], "handles": ["axisbank", "axisbanksupport"]},
    "paytm": {"name": "Paytm", "domains": ["paytm.com"], "handles": ["paytm", "paytmcare"]},
    "google": {"name": "Google", "domains": ["google.com", "google.co.in"], "handles": ["google", "googleindia"]},
    "apple": {"name": "Apple", "domains": ["apple.com"], "handles": ["apple", "applesupport"]},
    "microsoft": {"name": "Microsoft", "domains": ["microsoft.com"], "handles": ["microsoft", "msftsupport"]},
    "amazon": {"name": "Amazon", "domains": ["amazon.in", "amazon.com"], "handles": ["amazon", "amazondotin"]},
    "whatsapp": {"name": "WhatsApp", "domains": ["whatsapp.com"], "handles": ["whatsapp"]},
    "instagram": {"name": "Instagram", "domains": ["instagram.com"], "handles": ["instagram"]},
    "netflix": {"name": "Netflix", "domains": ["netflix.com"], "handles": ["netflix", "netflix_in"]},
}

SCAM_URGENCY_KEYWORDS = [
    "blocked", "suspended", "deactivated", "urgent", "immediately", "within 24 hours",
    "kyc update", "pan card", "aadhaar", "lottery", "cashback", "refund", "unauthorized debit",
    "apk download", "install app", "verify pin", "share otp", "electricity cut", "bill overdue",
    "customs clearance", "reward points expire", "crypto investment", "work from home"
]

SUSPICIOUS_TLDS = [".xyz", ".top", ".live", ".work", ".shop", ".online", ".site", ".space", ".cfd", ".buzz", ".click", ".link"]

def levenshtein_distance(s1: str, s2: str) -> int:
    s1, s2 = s1.lower(), s2.lower()
    if len(s1) < len(s2):
        return levenshtein_distance(s2, s1)
    if len(s2) == 0:
        return len(s1)
    previous_row = range(len(s2) + 1)
    for i, c1 in enumerate(s1):
        current_row = [i + 1]
        for j, c2 in enumerate(s2):
            insertions = previous_row[j + 1] + 1
            deletions = current_row[j] + 1
            substitutions = previous_row[j] + (c1 != c2)
            current_row.append(min(insertions, deletions, substitutions))
        previous_row = current_row
    return previous_row[-1]

def string_similarity_ratio(s1: str, s2: str) -> float:
    s1, s2 = s1.lower().strip(), s2.lower().strip()
    if s1 == s2:
        return 1.0
    if not s1 or not s2:
        return 0.0
    max_len = max(len(s1), len(s2))
    dist = levenshtein_distance(s1, s2)
    return max(0.0, 1.0 - (dist / max_len))

def check_brand_similarity(target: str) -> Tuple[str, float, Dict[str, Any]]:
    target_clean = re.sub(r"[^a-zA-Z0-9]", "", target.lower())
    best_brand = "Generic Target"
    best_score = 0.0
    matched_meta = {}

    for brand_key, brand_info in OFFICIAL_BRANDS.items():
        # Check direct substring
        if brand_key in target_clean:
            score = 0.88
            if target_clean != brand_key:
                score = 0.94 # Typosquatting or brand spoof suffix
            if score > best_score:
                best_score = score
                best_brand = brand_info["name"]
                matched_meta = brand_info
        else:
            sim = string_similarity_ratio(brand_key, target_clean[:len(brand_key)+2])
            if sim > 0.70 and sim > best_score:
                best_score = sim
                best_brand = brand_info["name"]
                matched_meta = brand_info

    return best_brand, best_score, matched_meta

def analyze_url_risk(url: str) -> Tuple[int, List[str]]:
    risk_score = 10
    indicators = []
    url_lower = url.lower()

    for tld in SUSPICIOUS_TLDS:
        if tld in url_lower:
            risk_score += 35
            indicators.append(f"Uses high-risk/frequently spoofed top-level domain: {tld}")

    if any(ip_pattern in url_lower for ip_pattern in ["http://1", "http://2", "http://0."]):
        risk_score += 40
        indicators.append("Direct IP address URL used instead of authentic domain hostname")

    if "@" in url_lower or "-" in url_lower:
        subdomain_parts = url_lower.split("/")
        if len(subdomain_parts) > 2 and "-" in subdomain_parts[2]:
            risk_score += 20
            indicators.append("Hyphenated deceptive domain structure mimicking trusted authority")

    brand, brand_score, _ = check_brand_similarity(url)
    if brand_score > 0.8:
        # Check if it actually belongs to the official brand
        is_official = False
        for _, b_data in OFFICIAL_BRANDS.items():
            if any(dom in url_lower for dom in b_data.get("domains", [])):
                is_official = True
                break
        if not is_official:
            risk_score += 35
            indicators.append(f"High similarity to {brand} but not hosted on official verified domain")

    return min(100, risk_score), indicators

def analyze_message_content_risk(text: str) -> Tuple[int, List[str]]:
    text_lower = text.lower()
    score = 15
    matches = []

    for kw in SCAM_URGENCY_KEYWORDS:
        if kw in text_lower:
            matches.append(kw)
            score += 15

    if re.search(r"http[s]?://", text_lower):
        score += 25
        matches.append("unsolicited link inclusion")

    if re.search(r"\b(otp|pin|password|cvv)\b", text_lower):
        score += 35
        matches.append("request for sensitive credentials/OTP")

    indicators = [f"Contains urgency/threat trigger: '{m}'" for m in matches[:4]]
    return min(100, score), indicators
