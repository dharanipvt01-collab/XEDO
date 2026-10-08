import React, { useEffect, useState } from 'react';
import {
  ShieldCheck, Globe, AlertTriangle, UserX, Smartphone,
  MessageSquare, Sparkles, ExternalLink, ArrowRight
} from 'lucide-react';
import { api } from '../services/api';
import { RiskScoreCircle } from '../components/RiskScoreCircle';

interface BrandProtectionPageProps {
  onNavigate: (path: string) => void;
  onOpenInvestigation: (threatId: string) => void;
}

export const BrandProtectionPage: React.FC<BrandProtectionPageProps> = ({
  onNavigate,
  onOpenInvestigation,
}) => {
  const [brandData, setBrandData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getBrandProtection().then((res) => {
      setBrandData(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Corporate Sovereign Footprint
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
          Enterprise Brand Protection
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Autonomous surveillance monitoring deceptive lookalike domains, unverified social profiles, and fraudulent mobile apps targeting your trademark.
        </p>
      </div>

      {/* Brand Profile & Exposure Risk Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Brand Identity Card */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-sm font-black text-lg">
              SBI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">State Bank of India</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Verified Sovereign
                </span>
              </div>
              <p className="text-xs text-slate-400">Sovereign Financial Enterprise • 450M+ Consumers</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Authorized Domains
              </span>
              <div className="font-mono font-semibold text-slate-800 space-y-0.5">
                <div>onlinesbi.sbi (Primary Root)</div>
                <div>sbi.co.in (Institutional)</div>
                <div>sbicard.com (Credit Cards)</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Verified Social Handles
              </span>
              <div className="font-mono font-semibold text-slate-800 space-y-0.5">
                <div>@theofficialsbi (Verified Blue)</div>
                <div>@statebankofindia</div>
                <div>@sbi_global</div>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs">
            <span className="text-slate-500">Identity DNA Synchronization:</span>
            <span className="font-semibold text-blue-600 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Active Fingerprint v4.2</span>
            </span>
          </div>
        </div>

        {/* Brand Exposure Score */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm flex flex-col items-center justify-center text-center">
          <RiskScoreCircle score={74} size={130} label="BRAND RISK" />
          <h4 className="text-sm font-bold text-slate-900 mt-3">Elevated Risk Exposure</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-[220px]">
            Aggressive adversarial mimicry targeting customer grievance resolution channels.
          </p>
        </div>
      </div>

      {/* Detected Infringement Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Fake Social Profiles', count: 14, icon: UserX, color: 'text-rose-600' },
          { label: 'Lookalike Domains', count: 8, icon: Globe, color: 'text-red-600' },
          { label: 'Suspicious Apps', count: 3, icon: Smartphone, color: 'text-purple-600' },
          { label: 'Scam Broadcast Messages', count: 27, icon: MessageSquare, color: 'text-amber-600' },
        ].map((item) => {
          const IconComp = item.icon;
          return (
            <div key={item.label} className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm text-center">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mx-auto mb-2 text-slate-700">
                <IconComp className="w-5 h-5" />
              </div>
              <div className={`text-2xl font-black ${item.color}`}>{item.count}</div>
              <div className="text-xs font-semibold text-slate-600 mt-0.5">{item.label}</div>
            </div>
          );
        })}
      </div>

      {/* Recent High-Risk Detected Infringements */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Active Infringements Under Takedown</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live unauthorized entities flagged for brand abuse.
            </p>
          </div>
          <button
            onClick={() => onOpenInvestigation('XD-1024')}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
          >
            Launch Investigation Sweep
          </button>
        </div>

        <div className="divide-y divide-slate-100 mt-2 text-xs">
          {[
            { entity: '@sbi_supportt', type: 'Social Profile', platform: 'Instagram', status: 'Evidence Sealed in Vault', risk: 'Critical (91/100)' },
            { entity: 'sbi-kyc-verification.top', type: 'Lookalike Domain', platform: 'NameCheap Registrar', status: 'Takedown Notice Sent', risk: 'Critical (96/100)' },
            { entity: 'SBI_Secure_v4.2.apk', type: 'Trojanized Mobile APK', platform: 'Telegram Drop', status: 'CERT-In Flagged', risk: 'Critical (94/100)' },
            { entity: '@axis_sbi_refund', type: 'Social Profile', platform: 'X (Twitter)', status: 'Active Telemetry Monitoring', risk: 'High (78/100)' }
          ].map((inf, i) => (
            <div key={i} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="font-bold text-slate-900 text-sm">{inf.entity}</div>
                <div className="text-slate-500 text-[11px] mt-0.5">
                  {inf.type} • {inf.platform}
                </div>
              </div>
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                  {inf.risk}
                </span>
                <span className="text-slate-500 font-medium">{inf.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
