import React, { useEffect, useState } from 'react';
import {
  ShieldAlert, ShieldCheck, ArrowRight, Sparkles, FileText,
  AlertTriangle, PhoneCall, HelpCircle, Search, ExternalLink
} from 'lucide-react';
import { Threat, SafetyScore } from '../types';
import { api } from '../services/api';
import { RiskBadge } from '../components/RiskBadge';
import { SafetyScoreCard } from '../components/SafetyScoreCard';

interface CustomerDashboardProps {
  onNavigate: (path: string) => void;
  onSelectThreat: (threat: Threat) => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ onNavigate, onSelectThreat }) => {
  const [safetyScore, setSafetyScore] = useState<SafetyScore | null>(null);
  const [threats, setThreats] = useState<Threat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getSafetyScore(), api.getThreats()]).then(([scoreRes, threatRes]) => {
      setSafetyScore(scoreRes);
      setThreats(threatRes);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Greeting Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Good morning.
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
            Your Digital Safety Overview
          </h1>
        </div>

        <button
          onClick={() => onNavigate('#analyze')}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm shadow-blue-600/20 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Search className="w-4 h-4" />
          <span>Analyze a New Link or Profile</span>
        </button>
      </div>

      {/* Main Intelligence Highlight Card */}
      <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/60 to-purple-50/50 border border-blue-200/80 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>XEDO AI has detected</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              2 high-risk signals and 1 potential impersonation targeting your accounts
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              An unauthorized profile (@sbi_supportt) is soliciting KYC credentials. No passwords or money have been compromised.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('#threat-detail')}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
            >
              View Intelligence
            </button>
            <button
              onClick={() => onNavigate('#report')}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-rose-700 text-xs font-bold transition-colors"
            >
              Prepare Complaint (NCRP)
            </button>
          </div>
        </div>
      </div>

      {/* Primary Grid: Safety Score & Key Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Digital Safety Score Card */}
        <div className="lg:col-span-2">
          {safetyScore ? (
            <SafetyScoreCard score={safetyScore} />
          ) : (
            <div className="h-64 bg-white rounded-2xl border border-slate-200 animate-pulse" />
          )}
        </div>

        {/* Quick Protective Metric Counters */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Active Threats Monitored
            </span>
            <div className="text-3xl font-black text-rose-600 mt-1">3</div>
            <p className="text-xs text-slate-500 mt-1">
              2 domain lures and 1 lookalike social handle.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Protected Brand Identities
            </span>
            <div className="text-3xl font-black text-blue-600 mt-1">5</div>
            <p className="text-xs text-slate-500 mt-1">
              State Bank of India, HDFC Bank, ICICI, Axis, Paytm.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Evidence Items Vaulted
            </span>
            <div className="text-3xl font-black text-emerald-600 mt-1">8</div>
            <p className="text-xs text-slate-500 mt-1">
              Cryptographically verified with SHA-256 digests.
            </p>
          </div>
        </div>
      </div>

      {/* Active Threats List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Active Signals Requiring Attention</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Review flagged accounts before taking action.
            </p>
          </div>
          <button
            onClick={() => onNavigate('#threats')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100 mt-2">
          {threats.slice(0, 3).map((threat) => (
            <div
              key={threat.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 -mx-2 px-2 rounded-xl transition-colors cursor-pointer"
              onClick={() => {
                onSelectThreat(threat);
                onNavigate('#threat-detail');
              }}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-slate-900 text-sm">{threat.entity}</span>
                  <RiskBadge level={threat.risk_level} score={threat.risk_score} size="sm" />
                </div>
                <p className="text-xs text-slate-500 line-clamp-1">{threat.description}</p>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectThreat(threat);
                    onNavigate('#threat-detail');
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Review Risk
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Navigator Decision Helper CTA */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-400" />
            <h4 className="text-base font-bold">Unsure what to do next?</h4>
          </div>
          <p className="text-xs text-slate-300">
            Use XEDO's interactive Safety Navigator to determine whether to block, preserve evidence, or contact 1930.
          </p>
        </div>
        <button
          onClick={() => onNavigate('#safety-center')}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shrink-0 transition-colors"
        >
          Open Safety Navigator
        </button>
      </div>
    </div>
  );
};
