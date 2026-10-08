import React, { useState } from 'react';
import {
  Cpu, ShieldAlert, Fingerprint, FileText, Activity, GitFork, Clock,
  ArrowUpRight, AlertCircle, Sparkles, CheckCircle2, ChevronRight
} from 'lucide-react';
import { ThreatTwin as ThreatTwinType } from '../types';
import { RiskBadge } from './RiskBadge';

interface ThreatTwinProps {
  twin: ThreatTwinType;
}

export const ThreatTwin: React.FC<ThreatTwinProps> = ({ twin }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'identity' | 'signals' | 'relationships' | 'timeline'>('overview');

  const satellites = [
    { id: 'identity', label: 'Identity Mimicry', icon: Fingerprint, count: twin.identity_nodes.length, color: 'text-rose-600 bg-rose-50 border-rose-200' },
    { id: 'signals', label: 'Behavioral Signals', icon: Activity, count: twin.signal_nodes.length, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { id: 'relationships', label: 'Threat Topology', icon: GitFork, count: twin.relationship_edges.length, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { id: 'timeline', label: 'Event Horizon', icon: Clock, count: twin.timeline_milestones.length, color: 'text-blue-600 bg-blue-50 border-blue-200' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">XEDO Digital Threat Twin™</h3>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700">
                Signature AI Brain
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-0.5">
              Autonomous cybernetic twin mirroring adversarial infrastructure, lures, and evidence vectors.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <RiskBadge level={twin.risk_level} score={twin.risk_score} size="lg" />
        </div>
      </div>

      {/* Futuristic Radial Hub Visualization */}
      <div className="my-8 relative rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-8 text-white overflow-hidden shadow-inner min-h-[380px] flex items-center justify-center">
        {/* Soft background ambient glow */}
        <div className="absolute w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        <div className="absolute w-80 h-80 rounded-full bg-indigo-600/10 blur-2xl pointer-events-none" />

        {/* Orbit Rings */}
        <div className="absolute w-[340px] h-[340px] rounded-full border border-blue-500/20 border-dashed animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-[240px] h-[240px] rounded-full border border-indigo-500/25" />

        {/* Center Node: Threat Twin Core */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 bg-slate-900/90 border border-blue-400/40 rounded-full w-48 h-48 shadow-2xl backdrop-blur-md">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mb-1 border border-blue-400/30">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-blue-300">Target Twin</span>
          <span className="text-sm font-extrabold text-white mt-0.5 truncate max-w-[140px]">{twin.entity}</span>
          <span className="text-xs font-semibold text-rose-400 mt-1">Risk Score: {twin.risk_score}/100</span>
          <span className="text-[9px] text-slate-400 mt-0.5 font-mono">CMP-2026-04</span>
        </div>

        {/* Radial Satellite Nodes */}
        {/* Top: Identity */}
        <div
          onClick={() => setActiveTab('identity')}
          className="absolute top-6 cursor-pointer transform hover:scale-110 transition-all flex items-center gap-2 bg-slate-800/90 hover:bg-slate-700 border border-rose-500/40 px-3.5 py-1.5 rounded-full text-xs shadow-lg backdrop-blur-md"
        >
          <Fingerprint className="w-4 h-4 text-rose-400" />
          <span className="font-semibold text-rose-200">Spoofed Identity</span>
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
        </div>

        {/* Right: Signals */}
        <div
          onClick={() => setActiveTab('signals')}
          className="absolute right-6 cursor-pointer transform hover:scale-110 transition-all flex items-center gap-2 bg-slate-800/90 hover:bg-slate-700 border border-amber-500/40 px-3.5 py-1.5 rounded-full text-xs shadow-lg backdrop-blur-md"
        >
          <Activity className="w-4 h-4 text-amber-400" />
          <span className="font-semibold text-amber-200">4 Risk Signals</span>
        </div>

        {/* Bottom: Evidence & Vault */}
        <div
          onClick={() => setActiveTab('overview')}
          className="absolute bottom-6 cursor-pointer transform hover:scale-110 transition-all flex items-center gap-2 bg-slate-800/90 hover:bg-slate-700 border border-blue-500/40 px-3.5 py-1.5 rounded-full text-xs shadow-lg backdrop-blur-md"
        >
          <FileText className="w-4 h-4 text-blue-400" />
          <span className="font-semibold text-blue-200">8 Vault Proofs</span>
        </div>

        {/* Left: Topology */}
        <div
          onClick={() => setActiveTab('relationships')}
          className="absolute left-6 cursor-pointer transform hover:scale-110 transition-all flex items-center gap-2 bg-slate-800/90 hover:bg-slate-700 border border-indigo-500/40 px-3.5 py-1.5 rounded-full text-xs shadow-lg backdrop-blur-md"
        >
          <GitFork className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold text-indigo-200">6 Connected Nodes</span>
        </div>
      </div>

      {/* Navigation tabs for twin sub-aspects */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4 overflow-x-auto">
        {(['overview', 'identity', 'signals', 'relationships', 'timeline'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {activeTab === 'overview' && (
        <div className="space-y-4 text-xs">
          <p className="text-sm text-slate-700 font-medium leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            {twin.ecosystem_summary}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-slate-200/80 rounded-xl p-4">
              <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">Cryptographic Evidence Nodes</h5>
              <div className="space-y-2">
                {twin.evidence_nodes.map((ev) => (
                  <div key={ev.id} className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <div>
                      <div className="font-semibold text-slate-800">{ev.label}</div>
                      <div className="text-[10px] text-slate-400 font-mono">SHA-256: {ev.hash}</div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">SEALED</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-slate-200/80 rounded-xl p-4">
              <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">Operational Interconnections</h5>
              <div className="space-y-2">
                {twin.relationship_edges.map((rel, i) => (
                  <div key={i} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <ChevronRight className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <div>
                      <div className="font-medium text-slate-700">{rel.source} → {rel.target}</div>
                      <div className="text-[10px] text-slate-400 font-semibold">{rel.relation}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'identity' && (
        <div className="space-y-3 text-xs">
          <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Deceptive Identity Breakdown</h5>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {twin.identity_nodes.map((idNode) => (
              <div key={idNode.id} className="p-3 rounded-xl border border-slate-200/80 bg-slate-50">
                <div className="text-[10px] font-bold text-slate-400 uppercase">{idNode.label}</div>
                <div className="font-bold text-slate-900 text-sm mt-1">{idNode.value}</div>
                <div className="text-[10px] text-rose-600 font-semibold uppercase mt-1">Status: {idNode.status}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'signals' && (
        <div className="space-y-3 text-xs">
          <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Active Risk Telemetry</h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {twin.signal_nodes.map((sig, i) => (
              <div key={i} className="p-3 rounded-xl border border-slate-200/80 bg-slate-50 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800">{sig.name}</div>
                  <div className="text-[11px] text-slate-500">{sig.value}</div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-rose-50 text-rose-700 border border-rose-200">
                  {sig.risk}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className="space-y-3">
          <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Threat Genesis & Propagation Log</h5>
          <div className="relative border-l-2 border-blue-500/30 ml-3 space-y-4 pl-4 text-xs">
            {twin.timeline_milestones.map((m, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-blue-600 border-2 border-white" />
                <div className="font-mono text-[10px] text-blue-600 font-bold">{m.time}</div>
                <div className="font-bold text-slate-900">{m.title}</div>
                <div className="text-slate-500 text-[11px] mt-0.5">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
