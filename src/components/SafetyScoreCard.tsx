import React from 'react';
import { ShieldCheck, TrendingUp, AlertCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { SafetyScore } from '../types';

interface SafetyScoreCardProps {
  score: SafetyScore;
}

export const SafetyScoreCard: React.FC<SafetyScoreCardProps> = ({ score }) => {
  const components = [
    { label: 'Account Security', val: score.account_security, color: 'bg-blue-600' },
    { label: 'Link Safety', val: score.link_safety, color: 'bg-amber-500' },
    { label: 'Scam Exposure', val: score.scam_exposure, color: 'bg-purple-600' },
    { label: 'Privacy Exposure', val: score.privacy_exposure, color: 'bg-emerald-600' },
    { label: 'Identity Protection', val: score.identity_protection, color: 'bg-indigo-600' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Personal Cyber Safety
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-0.5">Digital Safety Score™</h3>
        </div>

        {/* Circular / Score Display */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-3xl font-extrabold text-blue-600 leading-none">
              {score.overall_score}
              <span className="text-sm font-semibold text-slate-400">/100</span>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 mt-1 inline-block">
              {score.grade}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Breakdown Bars */}
      <div className="space-y-3.5 my-6">
        {components.map((comp) => (
          <div key={comp.label}>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-700">{comp.label}</span>
              <span className="font-mono text-slate-500">{comp.val}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${comp.color} rounded-full transition-all duration-1000`}
                style={{ width: `${comp.val}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4 text-xs">
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3">
          <div className="font-bold text-emerald-900 mb-0.5 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Strongest Area</span>
          </div>
          <p className="text-emerald-800 leading-relaxed text-[11px]">
            Your strongest area is <strong>{score.strongest_area}</strong>. {score.strongest_description}
          </p>
        </div>

        <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3">
          <div className="font-bold text-amber-900 mb-0.5 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Improvement Opportunity</span>
          </div>
          <p className="text-amber-800 leading-relaxed text-[11px]">
            Your biggest opportunity is <strong>{score.improvement_opportunity}</strong>. {score.improvement_description}
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-[10px] text-slate-400 mt-3 pt-3 border-t border-slate-100">
        Important: {score.disclaimer}
      </p>
    </div>
  );
};
