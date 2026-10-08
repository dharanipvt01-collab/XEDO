import React, { useEffect, useState } from 'react';
import { ShieldAlert, Search, Filter, ArrowRight, RefreshCw, Cpu } from 'lucide-react';
import { Threat } from '../types';
import { api } from '../services/api';
import { RiskBadge } from '../components/RiskBadge';

interface ThreatsListPageProps {
  onNavigate: (path: string) => void;
  onSelectThreat: (threat: Threat) => void;
  onOpenInvestigation: (threatId: string) => void;
}

export const ThreatsListPage: React.FC<ThreatsListPageProps> = ({
  onNavigate,
  onSelectThreat,
  onOpenInvestigation,
}) => {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchThreats = () => {
    setLoading(true);
    api.getThreats(typeFilter, riskFilter, search).then((res) => {
      setThreats(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchThreats();
  }, [typeFilter, riskFilter]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Adversarial Telemetry Ingest
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
            Monitored Threats & Indicators
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Browse and filter active digital risk entities across profiles, domains, messages, and mobile APKs.
          </p>
        </div>

        <button
          onClick={() => onNavigate('#analyze')}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors self-start sm:self-auto"
        >
          Analyze New Threat +
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchThreats()}
            placeholder="Search by handle, domain, or ID..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900"
          />
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto overflow-x-auto pb-1 sm:pb-0">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-semibold"
          >
            <option value="all">All Types</option>
            <option value="social_profile">Social Profile</option>
            <option value="website">Website / URL</option>
            <option value="mobile_app">Mobile App</option>
            <option value="message">Scam Message</option>
          </select>

          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-semibold"
          >
            <option value="all">All Risks</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Threats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {threats.map((threat) => (
          <div
            key={threat.id}
            onClick={() => {
              onSelectThreat(threat);
              onNavigate('#threat-detail');
            }}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4 hover:border-slate-300 transition-colors cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {threat.threat_id}
              </span>
              <RiskBadge level={threat.risk_level} score={threat.risk_score} size="sm" />
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                {threat.entity}
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                {threat.description}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
              <span className="capitalize">{threat.type.replace('_', ' ')}</span>
              <span className="text-blue-600 font-semibold group-hover:underline flex items-center gap-1">
                <span>Inspect Intelligence</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
