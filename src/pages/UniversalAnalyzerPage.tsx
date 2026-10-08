import React, { useState } from 'react';
import {
  Search, ShieldAlert, Globe, Smartphone, MessageSquare, Mail, Phone,
  UserCheck, Sparkles, Loader2, ArrowRight, CheckCircle2, AlertTriangle,
  Info, Cpu, Layers, Fingerprint, FileText
} from 'lucide-react';
import { Threat } from '../types';
import { api } from '../services/api';
import { RiskScoreCircle } from '../components/RiskScoreCircle';
import { RiskBadge } from '../components/RiskBadge';

interface UniversalAnalyzerPageProps {
  onNavigate: (path: string) => void;
  onOpenInvestigation: (threatId: string) => void;
  onSelectThreat: (threat: Threat) => void;
  presetEntity?: string;
}

export const UniversalAnalyzerPage: React.FC<UniversalAnalyzerPageProps> = ({
  onNavigate,
  onOpenInvestigation,
  onSelectThreat,
  presetEntity,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'social_profile' | 'website' | 'mobile_app' | 'message' | 'email' | 'phone' | 'username'>('all');
  const [inputVal, setInputVal] = useState(presetEntity || '@sbi_supportt');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [result, setResult] = useState<Threat | null>(null);

  const steps = [
    'Collecting observable digital signals...',
    'Analyzing identity & sovereign brand assets...',
    'Checking lexical similarity & typosquats...',
    'Evaluating composite threat risk factors...',
    'Building multi-vector threat graph...',
    'Generating explainable AI assessment...'
  ];

  const entityTabs = [
    { id: 'all', label: 'Universal', icon: Search },
    { id: 'social_profile', label: 'Social Profile', icon: UserCheck },
    { id: 'website', label: 'Website / URL', icon: Globe },
    { id: 'mobile_app', label: 'Mobile App', icon: Smartphone },
    { id: 'message', label: 'Scam Message', icon: MessageSquare },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'phone', label: 'Phone Number', icon: Phone },
  ];

  const handleAnalyze = async () => {
    if (!inputVal.trim()) return;
    setAnalyzing(true);
    setAnalysisStep(0);
    setResult(null);

    // Step progression animation
    for (let i = 0; i < steps.length; i++) {
      setAnalysisStep(i);
      await new Promise((r) => setTimeout(r, 380));
    }

    try {
      const res = await api.analyzeEntity(inputVal, activeTab === 'all' ? 'auto' : activeTab);
      setResult(res);
      onSelectThreat(res);
    } catch (e) {
      console.error(e);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/80">
          Universal Threat Analyzer
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
          Analyze Anything with XEDO AI
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Paste a suspicious social profile, URL, scam message, application package, or phone number to evaluate risk.
        </p>
      </div>

      {/* Input Card Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
        {/* Tab Selection */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 border-b border-slate-100">
          {entityTabs.map((tab) => {
            const IconComp = tab.icon;
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isTabActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <IconComp className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Input Text Area / Bar */}
        <div className="mt-6 space-y-4">
          <div className="relative">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Paste a URL, profile handle (@...), scam SMS text, APK filename, or phone number..."
              className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-500">Quick Demo Presets:</span>
              <button
                onClick={() => setInputVal('@sbi_supportt')}
                className="underline hover:text-blue-600 transition-colors"
              >
                @sbi_supportt
              </button>
              <span>•</span>
              <button
                onClick={() => setInputVal('https://sbi-kyc-verification.top/auth')}
                className="underline hover:text-blue-600 transition-colors"
              >
                sbi-kyc-verification.top
              </button>
              <span>•</span>
              <button
                onClick={() => setInputVal('Dear Customer, SBI account blocked. Update PAN now: http://sbi-kyc-verification.top')}
                className="underline hover:text-blue-600 transition-colors"
              >
                Scam SMS Lure
              </button>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={analyzing || !inputVal.trim()}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-blue-600/25 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 shrink-0"
            >
              {analyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analyzing with XEDO AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze with XEDO AI</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Multi-Step Analysis Loading State */}
        {analyzing && (
          <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                <span>{steps[analysisStep]}</span>
              </span>
              <span className="font-mono text-blue-600">{Math.round(((analysisStep + 1) / steps.length) * 100)}%</span>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
                style={{ width: `${((analysisStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* AI Risk Engine Results Card */}
      {result && !analyzing && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-8 animate-fadeIn">
          {/* Top Result Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <RiskScoreCircle score={result.risk_score} size={110} strokeWidth={9} />
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">{result.entity}</h2>
                  <RiskBadge level={result.risk_level} score={result.risk_score} size="md" />
                </div>
                <p className="text-xs text-slate-500 mt-1 capitalize">
                  Entity Category: <strong className="text-slate-700">{result.type.replace('_', ' ')}</strong> • Confidence: {(result.confidence * 100).toFixed(0)}%
                </p>
              </div>
            </div>

            {/* Quick Action Matrix */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => onOpenInvestigation(result.threat_id)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Cpu className="w-4 h-4" />
                <span>Investigate with XEDO AI</span>
              </button>
              <button
                onClick={() => onNavigate('#threat-graph')}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <Layers className="w-4 h-4" />
                <span>View Threat Graph</span>
              </button>
            </div>
          </div>

          {/* Explainable AI Risk Score Breakdown */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Algorithmic Risk Breakdown Index</span>
            </h3>

            {result.breakdown && (
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
                {[
                  { label: 'Brand Similarity', val: result.breakdown.brand_similarity, color: 'text-rose-600' },
                  { label: 'Username Similarity', val: result.breakdown.username_similarity, color: 'text-orange-600' },
                  { label: 'URL Similarity', val: result.breakdown.url_similarity, color: 'text-red-600' },
                  { label: 'Content Urgency', val: result.breakdown.content_risk, color: 'text-amber-600' },
                  { label: 'Identity Signals', val: result.breakdown.identity_signals, color: 'text-purple-600' },
                ].map((item) => (
                  <div key={item.label} className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-2xl text-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      {item.label}
                    </span>
                    <span className={`text-xl font-black ${item.color}`}>{item.val}%</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Explainable Reason & Ethical Phrasing Box */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Info className="w-4 h-4 text-blue-600" />
              <span>Why XEDO thinks this is risky</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {result.why_risky}
            </p>

            <div className="pt-2 border-t border-slate-200/60 flex items-center gap-2 text-xs text-amber-900 font-semibold">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Recommended Next Action: {result.recommended_action}</span>
            </div>
          </div>

          {/* Observable Signals List */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Observable Forensic Signals ({result.signals?.length || 0})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {result.signals?.map((sig, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-slate-200 bg-white text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">{sig.name}</span>
                    <span className="font-mono text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded text-[11px]">
                      {sig.score}/100
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px] leading-relaxed">{sig.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Pathways */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
              <span>Ethical AI Protocol: XEDO presents probabilistic similarity, not legal accusation.</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('#report')}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>Prepare Cybercrime Complaint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
