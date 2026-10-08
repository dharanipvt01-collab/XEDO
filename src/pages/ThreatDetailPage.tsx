import React, { useEffect, useState } from 'react';
import {
  ShieldAlert, Layers, Fingerprint, Cpu, FileText, ArrowLeft,
  Clock, AlertTriangle, Sparkles, CheckCircle2, Share2, Download
} from 'lucide-react';
import { Threat, DigitalDNA } from '../types';
import { api } from '../services/api';
import { RiskBadge } from '../components/RiskBadge';
import { RiskScoreCircle } from '../components/RiskScoreCircle';
import { IdentityDNA } from '../components/IdentityDNA';

interface ThreatDetailPageProps {
  threat?: Threat | null;
  onNavigate: (path: string) => void;
  onOpenInvestigation: (threatId: string) => void;
}

export const ThreatDetailPage: React.FC<ThreatDetailPageProps> = ({
  threat: propThreat,
  onNavigate,
  onOpenInvestigation,
}) => {
  const [threat, setThreat] = useState<Threat | null>(propThreat || null);
  const [dna, setDna] = useState<DigitalDNA | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (propThreat) {
      setThreat(propThreat);
      api.getDigitalDNA(propThreat.threat_id).then(setDna);
      setLoading(false);
    } else {
      api.getThreatDetail('XD-1024').then((res) => {
        setThreat(res);
        api.getDigitalDNA(res.threat_id).then(setDna);
        setLoading(false);
      });
    }
  }, [propThreat]);

  if (!threat) return null;

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Back button & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => onNavigate('#threats')}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Threats</span>
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{threat.entity}</h1>
            <RiskBadge level={threat.risk_level} score={threat.risk_score} size="md" />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Threat ID: <span className="font-mono font-bold text-slate-700">{threat.threat_id}</span> • Type: <span className="capitalize">{threat.type.replace('_', ' ')}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onOpenInvestigation(threat.threat_id)}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Cpu className="w-4 h-4" />
            <span>Investigate with AI</span>
          </button>
          <button
            onClick={() => onNavigate('#threat-twin')}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
          >
            Open Threat Twin
          </button>
          <button
            onClick={() => onNavigate('#report')}
            className="px-4 py-2.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-xs border border-rose-200 transition-colors"
          >
            Prepare NCRP Complaint
          </button>
        </div>
      </div>

      {/* Primary Score & Explanation Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-slate-100">
          <RiskScoreCircle score={threat.risk_score} size={120} strokeWidth={9} />
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Explainable Risk Assessment
            </span>
            <h2 className="text-base font-bold text-slate-900">Why XEDO thinks this is risky</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {threat.why_risky}
            </p>
            <div className="pt-2 text-xs text-amber-900 font-semibold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Recommended Action: {threat.recommended_action}</span>
            </div>
          </div>
        </div>

        {/* Observable Signals Breakdown */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Observable Forensic Signals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {threat.signals.map((sig, i) => (
              <div key={i} className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900">{sig.name}</span>
                  <span className="font-mono text-rose-600 font-bold">{sig.score}%</span>
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed">{sig.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Digital Identity DNA Component */}
      {dna && (
        <IdentityDNA dna={dna} />
      )}

      {/* Threat Timeline (Requirement 26) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
          <Clock className="w-4 h-4 text-slate-500" />
          <h3 className="text-base font-bold text-slate-900">Threat Timeline</h3>
        </div>

        <div className="mt-6 relative border-l-2 border-blue-500/30 ml-4 space-y-6 pl-6 text-xs">
          {[
            { time: '09:14 AM', title: 'Suspicious profile detected', desc: 'Initial ingest of @sbi_supportt via real-time social telemetry.' },
            { time: '09:17 AM', title: 'Brand similarity identified', desc: '94% lexical pattern match with State Bank of India sovereign trademarks.' },
            { time: '09:21 AM', title: 'Suspicious URL discovered', desc: 'Profile bio expansion revealed unverified landing domain sbi-kyc-verification.top.' },
            { time: '09:25 AM', title: 'Related scam message detected', desc: 'SMS broadcast correlated via identical phishing destination URL.' },
            { time: '09:28 AM', title: 'Threat campaign correlation generated', desc: 'Clustered into Campaign CMP-2026-04 with 6 correlated multi-vector nodes.' },
            { time: '09:31 AM', title: 'Evidence package prepared & sealed', desc: 'Sealed 8 evidence items with SHA-256 cryptographic custody digests in Vault.' },
          ].map((ev, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-blue-600 border-2 border-white" />
              <span className="font-mono text-[10px] text-blue-600 font-bold block">{ev.time}</span>
              <span className="font-bold text-slate-900 text-xs block mt-0.5">{ev.title}</span>
              <p className="text-slate-500 text-[11px] mt-0.5">{ev.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
