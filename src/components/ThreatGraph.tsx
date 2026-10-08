import React, { useEffect, useState } from 'react';
import {
  ShieldAlert, Globe, Smartphone, MessageSquare, ShieldCheck,
  FileCheck, ExternalLink, Filter, Layers, X, Info, AlertTriangle, ArrowRight
} from 'lucide-react';
import { ThreatGraphData, GraphNode } from '../types';
import { RiskBadge } from './RiskBadge';

interface ThreatGraphProps {
  data: ThreatGraphData;
  onFilterChange?: (filter: string) => void;
  activeFilter?: string;
  onSelectNode?: (node: GraphNode) => void;
}

export const ThreatGraph: React.FC<ThreatGraphProps> = ({
  data,
  onFilterChange,
  activeFilter = 'all',
  onSelectNode,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const selectedNode = data.nodes.find((node) => node.id === selectedNodeId)
    ?? data.nodes.find((node) => node.risk_score >= 80)
    ?? data.nodes[0]
    ?? null;

  useEffect(() => {
    if (!data.nodes.some((node) => node.id === selectedNodeId)) {
      setSelectedNodeId(
        data.nodes.find((node) => node.risk_score >= 80)?.id
          ?? data.nodes[0]?.id
          ?? null,
      );
    }
  }, [data.nodes, selectedNodeId]);

  const filterTabs = [
    { id: 'all', label: 'All Entities' },
    { id: 'profiles', label: 'Profiles' },
    { id: 'urls', label: 'URLs' },
    { id: 'apps', label: 'Apps' },
    { id: 'messages', label: 'Messages' },
    { id: 'brands', label: 'Brands' },
    { id: 'evidence', label: 'Evidence' },
  ];

  // Visual layout mapping for 2D Canvas positioning
  const nodePositions: Record<string, { x: number; y: number }> = {
    'node-brand': { x: 120, y: 160 },
    'node-profile': { x: 340, y: 110 },
    'node-url': { x: 560, y: 160 },
    'node-message': { x: 340, y: 260 },
    'node-app': { x: 740, y: 210 },
    'node-evidence': { x: 540, y: 290 },
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'brand': return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case 'social_profile': return <ShieldAlert className="w-5 h-5 text-rose-600" />;
      case 'website': return <Globe className="w-5 h-5 text-red-600" />;
      case 'mobile_app': return <Smartphone className="w-5 h-5 text-purple-600" />;
      case 'message': return <MessageSquare className="w-5 h-5 text-amber-600" />;
      case 'evidence': return <FileCheck className="w-5 h-5 text-blue-600" />;
      default: return <Layers className="w-5 h-5 text-slate-600" />;
    }
  };

  const handleNodeClick = (node: GraphNode) => {
    setSelectedNodeId(node.id);
    if (onSelectNode) onSelectNode(node);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col">
      {/* Graph Header & Filter Toolbar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-xs">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Threat Intelligence Graph</h3>
            <p className="text-xs text-slate-500">
              Interactive topological nexus correlating cross-channel adversarial entities.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl text-xs font-medium">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onFilterChange && onFilterChange(tab.id)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeFilter === tab.id
                  ? 'bg-white text-blue-600 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Graph Canvas Area & Detail Drawer */}
      <div className="relative min-h-[440px] flex-1 flex flex-col lg:flex-row bg-[#F8FAFC]">
        {/* Interactive Visual Canvas */}
        <div className="flex-1 relative p-4 flex items-center justify-center overflow-x-auto min-h-[400px]">
          <svg
            viewBox="0 0 860 380"
            preserveAspectRatio="xMidYMid meet"
            className="w-full max-w-[860px] h-[380px] drop-shadow-xs select-none"
            role="img"
            aria-label="Interactive graph of related threat entities"
          >
            {/* Background Grid Pattern */}
            <defs>
              <pattern id="graph-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="1" fill="#E2E8F0" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#graph-grid)" />

            {/* Connecting Edges */}
            {data.edges.map((edge) => {
              const srcPos = nodePositions[edge.source] || { x: 100, y: 100 };
              const tgtPos = nodePositions[edge.target] || { x: 300, y: 300 };

              // Midpoint for relationship label
              const midX = (srcPos.x + tgtPos.x) / 2;
              const midY = (srcPos.y + tgtPos.y) / 2;

              return (
                <g key={edge.id} className="cursor-pointer group">
                  <line
                    x1={srcPos.x}
                    y1={srcPos.y}
                    x2={tgtPos.x}
                    y2={tgtPos.y}
                    stroke="#CBD5E1"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    className="group-hover:stroke-blue-500 group-hover:stroke-[3] transition-all"
                  />
                  {/* Midpoint Label Tag */}
                  <rect
                    x={midX - 55}
                    y={midY - 11}
                    width="110"
                    height="22"
                    rx="11"
                    fill="#FFFFFF"
                    stroke="#E2E8F0"
                    strokeWidth="1"
                    className="shadow-xs"
                  />
                  <text
                    x={midX}
                    y={midY + 4}
                    textAnchor="middle"
                    fill="#64748B"
                    fontSize="9.5"
                    fontWeight="600"
                    className="select-none pointer-events-none"
                  >
                    {edge.label}
                  </text>
                </g>
              );
            })}

            {/* Render Nodes */}
            {data.nodes.map((node) => {
              const pos = nodePositions[node.id] || { x: 250, y: 200 };
              const isSelected = selectedNode?.id === node.id;
              const isCritical = node.risk_score >= 80;

              return (
                <g
                  key={node.id}
                  transform={`translate(${pos.x - 70}, ${pos.y - 45})`}
                  onClick={() => handleNodeClick(node)}
                  className="cursor-pointer transition-transform hover:scale-105"
                >
                  {/* Card Surface */}
                  <rect
                    width="140"
                    height="85"
                    rx="14"
                    fill="#FFFFFF"
                    stroke={isSelected ? '#2563EB' : isCritical ? '#FCA5A5' : '#E2E8F0'}
                    strokeWidth={isSelected ? '2.5' : '1.5'}
                    className={`shadow-sm ${isSelected ? 'drop-shadow-md' : ''}`}
                  />

                  {/* Header Strip */}
                  <rect
                    width="140"
                    height="24"
                    rx="14"
                    fill={isCritical ? '#FEF2F2' : '#F1F5F9'}
                  />

                  {/* Node Type Text */}
                  <text
                    x="12"
                    y="16"
                    fill="#475569"
                    fontSize="9"
                    fontWeight="700"
                    letterSpacing="0.05em"
                    className="uppercase"
                  >
                    {node.type.replace('_', ' ')}
                  </text>

                  {/* Risk Dot */}
                  <circle
                    cx="126"
                    cy="12"
                    r="4"
                    fill={node.risk_score >= 80 ? '#DC2626' : node.risk_score >= 50 ? '#F59E0B' : '#10B981'}
                  />

                  {/* Node Label Text */}
                  <text
                    x="12"
                    y="45"
                    fill="#0F172A"
                    fontSize="11.5"
                    fontWeight="700"
                  >
                    {node.label.length > 17 ? node.label.slice(0, 16) + '...' : node.label}
                  </text>

                  {/* Timestamp & Evidence Badge */}
                  <text
                    x="12"
                    y="63"
                    fill="#64748B"
                    fontSize="9.5"
                  >
                    {node.timestamp}
                  </text>

                  <rect
                    x="12"
                    y="68"
                    width="62"
                    height="14"
                    rx="7"
                    fill="#F8FAFC"
                    stroke="#E2E8F0"
                  />
                  <text
                    x="43"
                    y="78"
                    textAnchor="middle"
                    fill="#475569"
                    fontSize="8.5"
                    fontWeight="600"
                  >
                    {node.evidence_count} Evidence
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Threat Detail Slide-Over Panel */}
        {selectedNode && (
          <div className="w-full lg:w-80 bg-white border-t lg:border-t-0 lg:border-l border-slate-200/90 p-5 flex flex-col justify-between shrink-0 shadow-lg lg:shadow-none animate-fadeIn">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-slate-100 text-slate-700">
                    {getNodeIcon(selectedNode.type)}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Entity Intelligence
                  </span>
                </div>
                <RiskBadge level={selectedNode.risk_level} score={selectedNode.risk_score} size="sm" />
              </div>

              <div className="mt-4">
                <h4 className="text-base font-bold text-slate-900 leading-snug">
                  {selectedNode.label}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Type: <span className="font-semibold text-slate-700 capitalize">{selectedNode.type.replace('_', ' ')}</span>
                </p>
              </div>

              {/* Why it Matters */}
              <div className="mt-4 bg-slate-50 rounded-xl p-3 border border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1 mb-1">
                  <Info className="w-3 h-3 text-blue-500" />
                  Why it matters
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedNode.details?.why_it_matters ||
                    'Observed as an operational nexus point in credential harvesting infrastructure.'}
                </p>
              </div>

              {/* Recommended Action */}
              <div className="mt-3 bg-amber-50/60 rounded-xl p-3 border border-amber-200/60">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1 mb-1">
                  <AlertTriangle className="w-3 h-3 text-amber-600" />
                  Recommended Action
                </span>
                <p className="text-xs text-amber-900 leading-relaxed">
                  {selectedNode.details?.recommended_action ||
                    'Preserve digital evidence digest and block unauthorized domain at gateway.'}
                </p>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-2 gap-2 mt-4 text-center">
                <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50">
                  <div className="text-[10px] font-medium text-slate-400 uppercase">Evidence Preserved</div>
                  <div className="text-sm font-bold text-slate-900">{selectedNode.evidence_count} items</div>
                </div>
                <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50">
                  <div className="text-[10px] font-medium text-slate-400 uppercase">Detection Time</div>
                  <div className="text-xs font-semibold text-slate-700 mt-0.5">{selectedNode.timestamp}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <a
                href="#evidence-vault"
                className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
              >
                <span>Inspect Evidence Vault</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
