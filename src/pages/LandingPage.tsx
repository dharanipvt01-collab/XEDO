import React, { useState } from 'react';
import {
  Shield, Sparkles, ArrowRight, Layers, Bot, AlertTriangle,
  CheckCircle2, Fingerprint, Cpu, TrendingUp, Search, Eye, Lock
} from 'lucide-react';
import { UserRole } from '../types';

interface LandingPageProps {
  onEnterApp: (path: string, role?: UserRole) => void;
  onLoadScenario: (scenarioId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp, onLoadScenario }) => {
  const [hoveredNode, setHoveredNode] = useState<{
    label: string;
    type: string;
    risk: string;
    status: string;
  } | null>(null);

  const heroNodes = [
    { id: 'n1', label: 'Social Profile', type: 'Potential Impersonation', risk: 'High', status: 'Correlated (94% mimicry)', x: '20%', y: '25%' },
    { id: 'n2', label: 'Website / URL', type: 'Phishing Landing Page', risk: 'Critical', status: 'Active Credential Harvester', x: '80%', y: '25%' },
    { id: 'n3', label: 'Mobile App', type: 'Trojanized APK Drop', risk: 'Critical', status: 'SMS Listener Detected', x: '85%', y: '75%' },
    { id: 'n4', label: 'Scam Message', type: 'Social Engineering Lure', risk: 'High', status: 'Urgent Account Freeze Pretext', x: '15%', y: '75%' },
    { id: 'n5', label: 'Brand Asset', type: 'Target of Impersonation', risk: 'Sovereign', status: 'State Bank of India', x: '50%', y: '12%' },
    { id: 'n6', label: 'Evidence Vault', type: 'Forensic Hash Packet', risk: 'Sealed', status: 'SHA-256 Chain of Custody', x: '50%', y: '88%' },
  ];

  const valueSteps = [
    { title: 'Suspicion', desc: 'Unverified SMS or urgent support message received.' },
    { title: 'Detection', desc: 'Multi-modal signal extraction identifies lookalike patterns.' },
    { title: 'Evidence', desc: 'Preserved with immutable cryptographic SHA-256 digests.' },
    { title: 'Correlation', desc: 'Mapped to synchronized multi-channel campaign clusters.' },
    { title: 'Risk Understanding', desc: 'Explainable AI breaks down observable threat signals.' },
    { title: 'Recommended Action', desc: 'Immediate damage mitigation and account lockdown.' },
    { title: 'Official Reporting', desc: 'Direct complaint packets formatted for NCRP and 1930.' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Top Banner Navigation */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
            <Shield className="w-5 h-5 fill-white" />
          </div>
          <div>
            <span className="text-2xl font-black tracking-tight text-slate-900">XEDO</span>
            <span className="ml-2 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
              Intelligence OS
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onEnterApp('#command-center', 'analyst')}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            Analyst Console
          </button>
          <button
            onClick={() => onEnterApp('#customer-home', 'citizen')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/25 transition-all hover:shadow-md"
          >
            Launch Platform
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 text-center">
        {/* Futuristic Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold mb-6 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Next-Generation Digital Risk Intelligence</span>
        </div>

        {/* Hero Title & Subheading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 max-w-4xl mx-auto leading-[1.08]">
          Detect. Connect. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Predict. Protect.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Detect suspicious identities. Connect hidden signals. Understand the risk. Take the right lawful action.
        </p>

        {/* Hero Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onEnterApp('#analyze', 'citizen')}
            className="px-7 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/30 transition-all hover:scale-[1.02] flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Analyze a Threat</span>
          </button>
          <button
            onClick={() => onEnterApp('#customer-home', 'citizen')}
            className="px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-sm shadow-xs transition-all hover:border-slate-300 flex items-center gap-2"
          >
            <span>Explore XEDO</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Hero Visual: Interactive Futuristic Threat Intelligence Visualization */}
        <div className="mt-16 relative max-w-4xl mx-auto h-[440px] sm:h-[480px] bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden p-6 flex items-center justify-center">
          {/* Subtle background radar circles */}
          <div className="absolute w-[420px] h-[420px] rounded-full border border-blue-500/15 border-dashed" />
          <div className="absolute w-[280px] h-[280px] rounded-full border border-indigo-500/20" />
          <div className="absolute w-[160px] h-[160px] rounded-full border border-slate-200" />

          {/* Central Node: XEDO AI */}
          <div className="relative z-10 w-28 h-28 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex flex-col items-center justify-center text-white shadow-xl shadow-blue-500/30 ring-8 ring-blue-50 animate-pulse-subtle">
            <Cpu className="w-8 h-8 mb-1" />
            <span className="text-xs font-black tracking-wider uppercase">XEDO AI</span>
            <span className="text-[9px] text-blue-200 font-mono">Brain Core</span>
          </div>

          {/* Satellite Nodes */}
          {heroNodes.map((node) => (
            <div
              key={node.id}
              style={{ left: node.x, top: node.y }}
              onMouseEnter={() => setHoveredNode(node)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => onEnterApp('#threat-graph', 'analyst')}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
            >
              <div className="bg-white hover:bg-blue-50 border border-slate-200/90 hover:border-blue-400 px-3.5 py-2 rounded-2xl shadow-sm transition-all hover:scale-110 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 group-hover:animate-ping" />
                <span className="text-xs font-bold text-slate-800 group-hover:text-blue-700">
                  {node.label}
                </span>
              </div>
            </div>
          ))}

          {/* Hover Details Card Popup */}
          {hoveredNode && (
            <div className="absolute bottom-6 bg-slate-900/95 text-white px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-md text-left z-30 animate-fadeIn border border-slate-700">
              <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                Threat Entity: {hoveredNode.label}
              </div>
              <div className="text-xs font-bold text-white mt-0.5">{hoveredNode.type}</div>
              <div className="text-[11px] text-slate-300 mt-0.5">
                Risk: <strong className="text-rose-400">{hoveredNode.risk}</strong> • Status: {hoveredNode.status}
              </div>
            </div>
          )}
        </div>

        {/* Demo Scenario Launch Bar right on landing page */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-4xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Interactive Hackathon Demonstrations (One-Click Ingest)</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {[
              { id: 'scenario-1', label: 'Fake Bank Support (@sbi_supportt)' },
              { id: 'scenario-2', label: 'Lookalike Phishing Portal (sbi-kyc-verification.top)' },
              { id: 'scenario-3', label: 'Urgent Scam SMS Lure' },
              { id: 'scenario-4', label: 'Trojanized APK Package' },
              { id: 'scenario-5', label: 'Coordinated Campaign CMP-2026-04' },
            ].map((sc) => (
              <button
                key={sc.id}
                onClick={() => {
                  onLoadScenario(sc.id);
                  onEnterApp('#analyze', 'citizen');
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200 hover:border-blue-200 transition-all flex items-center gap-1.5"
              >
                <span>{sc.label}</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* The 7-Stage Digital Risk Lifecycle */}
      <section className="bg-white border-y border-slate-200/80 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Autonomous Lifecycle
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-3">From Suspicion to Lawful Action</h2>
            <p className="text-sm text-slate-500 mt-2">
              XEDO bridges the critical gap between encountering an unverified lure and preparing legal evidence packages.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {valueSteps.map((step, idx) => (
              <div key={idx} className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 hover:bg-white hover:shadow-md transition-all">
                <div className="w-8 h-8 rounded-xl bg-blue-600/10 text-blue-600 font-extrabold text-xs flex items-center justify-center mb-3">
                  0{idx + 1}
                </div>
                <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Reporting Disclaimer */}
      <footer className="max-w-7xl mx-auto px-4 py-8 text-center text-xs text-slate-400">
        <p>
          XEDO is an independent AI Digital Risk Intelligence and Protection Platform.
          XEDO is not a government agency and is not affiliated with I4C, NCRP, or police authorities.
          For emergency cyber financial fraud reporting in India, dial helpline <strong>1930</strong> or visit{' '}
          <a href="https://www.cybercrime.gov.in/" target="_blank" rel="noreferrer" className="text-blue-600 underline">
            cybercrime.gov.in
          </a>.
        </p>
        <p className="mt-2 font-medium">© 2026 XEDO Security Intelligence. All rights reserved.</p>
      </footer>
    </div>
  );
};
