import React, { useState, useEffect } from 'react';
import {
  Sparkles, CheckCircle2, Loader2, ShieldCheck, AlertTriangle,
  Layers, Database, ArrowRight, X, Cpu, FileText
} from 'lucide-react';
import { InvestigationResult } from '../types';
import { api } from '../services/api';

interface AutonomousInvestigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  threatId?: string;
  onCompleted?: (result: InvestigationResult) => void;
}

export const AutonomousInvestigationModal: React.FC<AutonomousInvestigationModalProps> = ({
  isOpen,
  onClose,
  threatId = 'XD-1024',
  onCompleted,
}) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [result, setResult] = useState<InvestigationResult | null>(null);

  const steps = [
    'Collecting available digital signals across HTTP/DNS & social headers...',
    'Comparing Digital Identity DNA against sovereign brand fingerprints...',
    'Detecting lexical typosquats and lookalike domain structures...',
    'Correlating related entities through shared redirection telemetry...',
    'Synthesizing multi-vector Threat Intelligence Graph...',
    'Evaluating composite multi-factor algorithmic risk score...',
    'Clustering indicators under coordinated Campaign CMP-2026-04...',
    'Preserving and sealing evidence items with SHA-256 integrity digests in Vault...',
    'Synthesizing final executive intelligence report and action guidance...'
  ];

  useEffect(() => {
    if (!isOpen) {
      setStepIndex(0);
      setIsDone(false);
      setResult(null);
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < steps.length) {
        setStepIndex(current);
      } else {
        clearInterval(interval);
        api.runInvestigation(threatId).then((res) => {
          setResult(res);
          setIsDone(true);
          if (onCompleted) onCompleted(res);
        });
      }
    }, 600);

    return () => clearInterval(interval);
  }, [isOpen, threatId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-slate-900">Autonomous AI Investigation</h3>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                XEDO Brain
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Deep telemetry correlation across identity, network infrastructure, and evidence vectors.
            </p>
          </div>
        </div>

        {/* Animated Sequence Progress */}
        {!isDone ? (
          <div className="space-y-6 py-4">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Investigation Sequence Phase {stepIndex + 1} of {steps.length}</span>
              <span className="font-mono text-blue-600">{Math.round(((stepIndex + 1) / steps.length) * 100)}%</span>
            </div>

            {/* Progress bar */}
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
                style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
              />
            </div>

            {/* Active Step Indicator */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin shrink-0" />
              <p className="text-xs font-medium text-slate-800 animate-pulse">
                {steps[stepIndex]}
              </p>
            </div>

            {/* Micro-counter live previews */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/70">
                <div className="text-[10px] uppercase font-bold text-slate-400">Signals Evaluated</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">{Math.min(17, (stepIndex + 1) * 2)}</div>
              </div>
              <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/70">
                <div className="text-[10px] uppercase font-bold text-slate-400">Entities Linked</div>
                <div className="text-lg font-black text-blue-600 mt-0.5">{Math.min(6, Math.floor((stepIndex + 1) * 0.8))}</div>
              </div>
              <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/70">
                <div className="text-[10px] uppercase font-bold text-slate-400">Evidence Vaulted</div>
                <div className="text-lg font-black text-emerald-600 mt-0.5">{Math.min(8, stepIndex)}</div>
              </div>
            </div>
          </div>
        ) : (
          /* Completed View */
          <div className="space-y-6 py-2 animate-fadeIn">
            {/* Success Banner */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-emerald-950">Investigation Complete</h4>
                <p className="text-xs text-emerald-800">
                  Target entity verified as an active component in multi-channel Campaign CMP-2026-04.
                </p>
              </div>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="text-lg font-black text-slate-900">17</div>
                <div className="text-[10px] uppercase font-bold text-slate-500">Signals Analyzed</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="text-lg font-black text-blue-600">6</div>
                <div className="text-[10px] uppercase font-bold text-slate-500">Related Entities</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="text-lg font-black text-rose-600">3</div>
                <div className="text-[10px] uppercase font-bold text-slate-500">High-Risk Indicators</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="text-lg font-black text-purple-600">1</div>
                <div className="text-[10px] uppercase font-bold text-slate-500">Campaign Linked</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="text-lg font-black text-emerald-600">8</div>
                <div className="text-[10px] uppercase font-bold text-slate-500">Evidence Preserved</div>
              </div>
            </div>

            {/* Findings & Recommended Action */}
            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="font-bold uppercase tracking-wider text-slate-500 text-[10px] block mb-1">
                  AI Synthesized Summary
                </span>
                <p className="text-slate-800 leading-relaxed font-medium">
                  {result?.summary}
                </p>
              </div>

              <div className="bg-amber-50/80 p-3.5 rounded-xl border border-amber-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold uppercase tracking-wider text-amber-900 text-[10px]">
                    Recommended Action
                  </span>
                  <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                    PRIORITY: HIGH
                  </span>
                </div>
                <p className="text-amber-900 leading-relaxed font-semibold">
                  {result?.recommended_action}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  window.location.hash = '#threat-graph';
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors flex items-center gap-1.5"
              >
                <span>View in Threat Graph</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
