import React, { useEffect, useState } from 'react';
import { Tag, Sparkles, Layers, ArrowRight, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Campaign } from '../types';
import { api } from '../services/api';

interface CampaignsPageProps {
  onNavigate: (path: string) => void;
  onOpenInvestigation: (threatId: string) => void;
}

export const CampaignsPage: React.FC<CampaignsPageProps> = ({ onNavigate, onOpenInvestigation }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCampaigns().then((res) => {
      setCampaigns(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Clustered Adversarial Operations
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
          Potential Threat Campaigns
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          XEDO automatically groups isolated suspicious profiles, lookalike domains, scam messages, and apps sharing technical signatures into correlated operational clusters.
        </p>
      </div>

      {/* Campaign Cards */}
      <div className="space-y-6">
        {campaigns.map((camp) => (
          <div key={camp.id} className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
            {/* Campaign Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                    {camp.campaign_id}
                  </span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {camp.pattern_title || 'Potential Coordinated Threat Pattern'}
                  </span>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">{camp.name}</h2>
              </div>

              {/* Confidence Meter */}
              <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl flex items-center gap-3 self-start sm:self-auto">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Campaign Confidence</div>
                  <div className="text-xl font-black text-purple-600 leading-none mt-0.5">
                    {Math.round(camp.confidence * 100)}%
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase">
                  {camp.status}
                </span>
              </div>
            </div>

            {/* Entity Breakdown: 6 profiles, 3 domains, 2 scam messages, 1 mobile app */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Suspicious Profiles', val: camp.entity_breakdown?.suspicious_profiles || 6, color: 'text-rose-600' },
                { label: 'Suspicious Domains', val: camp.entity_breakdown?.suspicious_domains || 3, color: 'text-red-600' },
                { label: 'Scam Messages', val: camp.entity_breakdown?.scam_messages || 2, color: 'text-amber-600' },
                { label: 'Mobile Application', val: camp.entity_breakdown?.mobile_applications || 1, color: 'text-purple-600' },
              ].map((ent) => (
                <div key={ent.label} className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl text-center">
                  <div className={`text-2xl font-black ${ent.color}`}>{ent.val}</div>
                  <div className="text-[10px] uppercase font-bold text-slate-500 mt-0.5">{ent.label}</div>
                </div>
              ))}
            </div>

            {/* Shared Indicators */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>Correlated Technical Indicators</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {camp.shared_indicators.map((ind, i) => (
                  <div key={i} className="p-3.5 bg-purple-50/40 border border-purple-100 rounded-xl text-xs">
                    <span className="font-bold text-purple-950 block mb-0.5">
                      {ind.indicator || ind.type}
                    </span>
                    <p className="text-slate-600 text-[11px]">{ind.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Projected Evolution Vector */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-xs">
              <span className="font-bold uppercase tracking-wider text-slate-500 text-[10px] block mb-1">
                Projected Attack Vector Evolution
              </span>
              <p className="text-slate-800 font-medium">
                {camp.potential_next_vector}
              </p>
            </div>

            {/* Mandatory Regulatory & Attribution Disclaimer */}
            <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-[11px] text-amber-900 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Attribution Principle:</strong> {camp.disclaimer}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => onNavigate('#threat-graph')}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Inspect in Threat Graph
              </button>
              <button
                onClick={() => onOpenInvestigation('XD-1024')}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors"
              >
                Run AI Investigation
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
