import React, { useEffect, useState } from 'react';
import {
  ShieldAlert, Layers, TrendingUp, Tag, Globe, Cpu, Search,
  ArrowRight, Filter, AlertTriangle, MapPin, Sparkles, RefreshCw
} from 'lucide-react';
import { Threat, ThreatForecast } from '../types';
import { api } from '../services/api';
import { RiskBadge } from '../components/RiskBadge';
import { ThreatForecastCard } from '../components/ThreatForecastCard';

interface AnalystDashboardProps {
  onNavigate: (path: string) => void;
  onSelectThreat: (threat: Threat) => void;
  onOpenInvestigation: (threatId: string) => void;
}

export const AnalystDashboard: React.FC<AnalystDashboardProps> = ({
  onNavigate,
  onSelectThreat,
  onOpenInvestigation,
}) => {
  const [data, setData] = useState<any>(null);
  const [threatFilter, setThreatFilter] = useState<'all' | 'critical' | 'high' | 'medium'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAnalystDashboard().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  const filteredThreats = data?.threat_queue?.filter((t: Threat) => {
    if (threatFilter === 'all') return true;
    return t.risk_level === threatFilter;
  }) || [];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            SOC Operations Matrix
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
            XEDO Security Command Center
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenInvestigation('XD-1024')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Cpu className="w-4 h-4 animate-pulse" />
            <span>Autonomous AI Investigation</span>
          </button>
        </div>
      </div>

      {/* 6 Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {[
          { label: 'Active Threats', val: data?.metrics?.active_threats || 24, color: 'text-slate-900', badge: 'Active' },
          { label: 'Critical Threats', val: data?.metrics?.critical_threats || 8, color: 'text-rose-600', badge: 'Tier 1' },
          { label: 'Potential Campaigns', val: data?.metrics?.potential_campaigns || 3, color: 'text-purple-600', badge: 'Clusters' },
          { label: 'Investigations', val: data?.metrics?.investigations || 14, color: 'text-blue-600', badge: 'Resolved' },
          { label: 'Evidence Preserved', val: data?.metrics?.evidence_items || 32, color: 'text-emerald-600', badge: 'SHA-256' },
          { label: 'Brands Protected', val: data?.metrics?.brands_protected || 6, color: 'text-indigo-600', badge: 'Sovereign' },
        ].map((m) => (
          <div key={m.label} className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              {m.label}
            </span>
            <div className={`text-2xl font-black ${m.color}`}>{m.val}</div>
            <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded mt-1 inline-block">
              {m.badge}
            </span>
          </div>
        ))}
      </div>

      {/* Primary Intelligence Section: Threat Queue & Threat Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat Queue Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Live Threat Queue</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Real-time ingest queue prioritized by composite algorithmic risk.
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                {(['all', 'critical', 'high', 'medium'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setThreatFilter(lvl)}
                    className={`px-2.5 py-1 rounded-lg uppercase tracking-wider text-[10px] transition-all ${
                      threatFilter === lvl
                        ? 'bg-white text-blue-600 shadow-xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] font-bold">
                    <th className="pb-3">Threat ID</th>
                    <th className="pb-3">Entity</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Risk</th>
                    <th className="pb-3">Campaign</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredThreats.map((threat: Threat) => (
                    <tr
                      key={threat.id}
                      onClick={() => {
                        onSelectThreat(threat);
                        onNavigate('#threat-detail');
                      }}
                      className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
                    >
                      <td className="py-3 font-mono font-bold text-blue-600">{threat.threat_id}</td>
                      <td className="py-3 font-semibold text-slate-900 max-w-[200px] truncate">
                        {threat.entity}
                      </td>
                      <td className="py-3 text-slate-500 capitalize">{threat.type.replace('_', ' ')}</td>
                      <td className="py-3">
                        <RiskBadge level={threat.risk_level} score={threat.risk_score} size="sm" />
                      </td>
                      <td className="py-3 text-slate-500 font-mono text-[11px]">
                        {threat.campaign_id ? 'CMP-2026-04' : 'None'}
                      </td>
                      <td className="py-3 text-right">
                        <span className="text-xs font-semibold text-blue-600 group-hover:underline">
                          Triage →
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>Showing {filteredThreats.length} active indicators</span>
            <button
              onClick={() => onNavigate('#threat-graph')}
              className="text-blue-600 font-semibold hover:underline"
            >
              Open Threat Graph →
            </button>
          </div>
        </div>

        {/* Digital Threat Map Component */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-600" />
                <h3 className="text-base font-bold text-slate-900">Digital Threat Map</h3>
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase bg-slate-100 px-2 py-0.5 rounded">
                Telemetry Clusters
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-2">
              Regional concentrations of incoming impersonation lures and SMS smishing broadcasts.
            </p>

            {/* Simulated Regional City Clusters */}
            <div className="space-y-3 mt-4">
              {data?.geo_clusters?.map((cluster: any) => (
                <div key={cluster.city} className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                      <span>{cluster.city}</span>
                    </span>
                    <span className="font-mono text-rose-600">{cluster.threat_count} incidents</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 text-[11px] mt-1">
                    <span>Top Vector: {cluster.top_vector}</span>
                    <span className="font-semibold text-slate-700">{cluster.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mandatory Simulated Data Disclaimer */}
          <div className="mt-4 p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-[10px] text-amber-900">
            <strong>Note:</strong> {data?.geo_disclaimer || 'Simulated intelligence for demonstration purposes.'}
          </div>
        </div>
      </div>

      {/* AI Threat Forecast Section */}
      {data?.forecast && (
        <ThreatForecastCard forecast={data.forecast} />
      )}
    </div>
  );
};
