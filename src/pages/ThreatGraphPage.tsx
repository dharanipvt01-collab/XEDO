import React, { useEffect, useState } from 'react';
import { ThreatGraphData, GraphNode } from '../types';
import { api } from '../services/api';
import { ThreatGraph } from '../components/ThreatGraph';
import { Layers, ArrowLeft, RefreshCw, Cpu, Download } from 'lucide-react';

interface ThreatGraphPageProps {
  onNavigate: (path: string) => void;
  onOpenInvestigation: (threatId: string) => void;
}

export const ThreatGraphPage: React.FC<ThreatGraphPageProps> = ({ onNavigate, onOpenInvestigation }) => {
  const [graphData, setGraphData] = useState<ThreatGraphData | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const loadGraph = (filter: string = 'all') => {
    setActiveFilter(filter);
    api.getThreatGraph('XD-1024', filter).then((res) => {
      setGraphData(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadGraph('all');
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Topological Correlation Matrix
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
            Threat Intelligence Graph
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Visualizing interconnected relationships between spoofed profiles, malicious domains, APK drops, and evidence.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onOpenInvestigation('XD-1024')}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Cpu className="w-4 h-4" />
            <span>Autonomous Investigation</span>
          </button>
        </div>
      </div>

      {/* Graph Visual Surface */}
      {graphData ? (
        <ThreatGraph
          data={graphData}
          activeFilter={activeFilter}
          onFilterChange={(f) => loadGraph(f)}
        />
      ) : (
        <div className="h-[460px] bg-white rounded-2xl border border-slate-200 animate-pulse" />
      )}
    </div>
  );
};
