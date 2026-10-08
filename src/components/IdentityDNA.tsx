import React from 'react';
import { Fingerprint, ShieldCheck, AlertTriangle, ArrowRightLeft, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { DigitalDNA } from '../types';

interface IdentityDNAProps {
  dna: DigitalDNA;
}

export const IdentityDNA: React.FC<IdentityDNAProps> = ({ dna }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
            <Fingerprint className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">Digital Identity DNA™</h3>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                Fingerprint Engine
              </span>
            </div>
            <p className="text-sm text-slate-500">
              Comparative biometric-style telemetry evaluating identity divergence against trusted baselines.
            </p>
          </div>
        </div>

        {/* Match Percentage Pill */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl self-start sm:self-auto">
          <div>
            <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Similarity Index</div>
            <div className="text-2xl font-black text-rose-600 leading-none mt-0.5">
              {dna.overall_match_score}%
            </div>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="text-xs font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
            High Deception Risk
          </div>
        </div>
      </div>

      {/* Comparative Matrix: Trusted vs Suspicious */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        {/* Trusted Column */}
        <div className="bg-emerald-50/40 rounded-xl border border-emerald-100 p-5">
          <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified Sovereign Baseline</span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <span className="font-semibold text-slate-500 uppercase block tracking-wider text-[10px]">Username Pattern</span>
              <span className="font-mono text-emerald-950 font-medium bg-emerald-100/60 px-2 py-1 rounded inline-block mt-1">
                {dna.trusted_identity.username_pattern}
              </span>
            </div>
            <div>
              <span className="font-semibold text-slate-500 uppercase block tracking-wider text-[10px]">Domain & TLS Signature</span>
              <span className="font-mono text-emerald-950 font-medium bg-emerald-100/60 px-2 py-1 rounded inline-block mt-1">
                {dna.trusted_identity.domain_pattern}
              </span>
            </div>
            <div>
              <span className="font-semibold text-slate-500 uppercase block tracking-wider text-[10px]">Visual & Asset Vector</span>
              <span className="text-slate-800 font-medium block mt-1">
                {dna.trusted_identity.visual_signature}
              </span>
            </div>
            <div>
              <span className="font-semibold text-slate-500 uppercase block tracking-wider text-[10px]">Communication Protocol</span>
              <span className="text-slate-800 font-medium block mt-1">
                {dna.trusted_identity.support_channel_pattern}
              </span>
            </div>
          </div>
        </div>

        {/* Suspicious Target Column */}
        <div className="bg-rose-50/40 rounded-xl border border-rose-100 p-5">
          <div className="flex items-center gap-2 text-rose-800 font-semibold text-sm mb-4">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Analyzed External Footprint</span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <span className="font-semibold text-slate-500 uppercase block tracking-wider text-[10px]">Username Pattern</span>
              <span className="font-mono text-rose-950 font-medium bg-rose-100/60 px-2 py-1 rounded inline-block mt-1">
                {dna.suspicious_identity.username_pattern}
              </span>
            </div>
            <div>
              <span className="font-semibold text-slate-500 uppercase block tracking-wider text-[10px]">Domain & Infrastructure</span>
              <span className="font-mono text-rose-950 font-medium bg-rose-100/60 px-2 py-1 rounded inline-block mt-1">
                {dna.suspicious_identity.domain_pattern}
              </span>
            </div>
            <div>
              <span className="font-semibold text-slate-500 uppercase block tracking-wider text-[10px]">Visual & Asset Vector</span>
              <span className="text-slate-800 font-medium block mt-1">
                {dna.suspicious_identity.visual_signature}
              </span>
            </div>
            <div>
              <span className="font-semibold text-slate-500 uppercase block tracking-wider text-[10px]">Communication Protocol</span>
              <span className="text-slate-800 font-medium block mt-1">
                {dna.suspicious_identity.support_channel_pattern}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Matching Signals Breakdown */}
      <div className="mt-6 pt-5 border-t border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Observed Signal Correlations</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {dna.matching_signals.map((sig, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs">
              <div className="flex items-center justify-between font-semibold text-slate-900 mb-1">
                <span>{sig.signal}</span>
                <span className="font-mono text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded text-[11px]">
                  {sig.match}
                </span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                {sig.assessment}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mandatory Regulatory & Product Disclaimer */}
      <div className="mt-6 p-3 rounded-lg bg-amber-50/60 border border-amber-200/80 text-[11px] text-amber-800 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <span>
          <strong>Note:</strong> {dna.disclaimer} Risk classifications reflect XEDO’s algorithmic similarity heuristics and do not establish legal liability.
        </span>
      </div>
    </div>
  );
};
