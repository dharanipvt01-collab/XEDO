import React from 'react';
import { TrendingUp, AlertTriangle, Sparkles, Clock, ArrowRight, ShieldAlert } from 'lucide-react';
import { ThreatForecast } from '../types';

interface ThreatForecastCardProps {
  forecast: ThreatForecast;
}

export const ThreatForecastCard: React.FC<ThreatForecastCardProps> = ({ forecast }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
            <TrendingUp className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded">
                {forecast.headline}
              </span>
              <span className="text-xs font-semibold text-slate-400">Confidence: {forecast.confidence}%</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {forecast.summary}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-slate-400">Predicted Trend</div>
            <div className="text-xs font-extrabold text-orange-600">{forecast.predicted_trend}</div>
          </div>
        </div>
      </div>

      {/* Projected Vector Highlight */}
      <div className="my-5 bg-purple-50/50 border border-purple-100 rounded-xl p-4">
        <div className="text-[10px] uppercase font-bold text-purple-800 tracking-wider mb-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>Potential Next Threat Vector</span>
        </div>
        <p className="text-sm font-semibold text-slate-900">
          {forecast.potential_next_vector}
        </p>
      </div>

      {/* Evolution Timeline: Past -> Current -> Possible Next */}
      <div className="space-y-2 mb-5">
        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 mb-3">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Pattern Trajectory Timeline</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {forecast.timeline.map((step, idx) => {
            const isNext = idx === 2;
            const isCurrent = idx === 1;

            return (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border text-xs ${
                  isNext
                    ? 'bg-purple-50/70 border-purple-200 shadow-xs'
                    : isCurrent
                    ? 'bg-orange-50/70 border-orange-200'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {step.stage}
                  </span>
                  {isCurrent && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-orange-200 text-orange-800">
                      LIVE
                    </span>
                  )}
                  {isNext && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-200 text-purple-800">
                      PROJECTED
                    </span>
                  )}
                </div>
                <div className="font-bold text-slate-900 text-xs">{step.state}</div>
                <p className="text-slate-600 text-[11px] mt-1 leading-relaxed">{step.detail}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mandatory Regulatory & Forecast Disclaimer */}
      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <span>
          <strong>Disclaimer:</strong> {forecast.disclaimer}
        </span>
      </div>
    </div>
  );
};
