import React, { useEffect, useState } from 'react';
import { ThreatTwin as ThreatTwinType } from '../types';
import { api } from '../services/api';
import { ThreatTwin } from '../components/ThreatTwin';
import { Cpu, ArrowLeft, RefreshCw } from 'lucide-react';

interface ThreatTwinPageProps {
  onNavigate: (path: string) => void;
  threatRef?: string;
}

export const ThreatTwinPage: React.FC<ThreatTwinPageProps> = ({ onNavigate, threatRef = 'XD-1024' }) => {
  const [twin, setTwin] = useState<ThreatTwinType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getThreatTwin(threatRef).then((res) => {
      setTwin(res);
      setLoading(false);
    });
  }, [threatRef]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Centerpiece AI Intelligence
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
            XEDO Digital Threat Twin™
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Dynamic digital representation synthesizing the complete adversarial ecosystem: Identity, Profiles, URLs, Apps, Evidence, Risk, Timeline, and Relationships.
          </p>
        </div>

        <button
          onClick={() => onNavigate('#threat-graph')}
          className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors self-start sm:self-auto"
        >
          View Topological Graph →
        </button>
      </div>

      {/* Threat Twin Component */}
      {twin ? (
        <ThreatTwin twin={twin} />
      ) : (
        <div className="h-[480px] bg-white rounded-2xl border border-slate-200 animate-pulse" />
      )}
    </div>
  );
};
