import React, { useEffect, useState } from 'react';
import { Briefcase, Plus, CheckCircle2, Clock, AlertTriangle, ArrowRight, FileText } from 'lucide-react';
import { Case } from '../types';
import { api } from '../services/api';

interface CaseManagementPageProps {
  onNavigate: (path: string) => void;
}

export const CaseManagementPage: React.FC<CaseManagementPageProps> = ({ onNavigate }) => {
  const [cases, setCases] = useState<Case[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('high');

  useEffect(() => {
    api.getCases().then(setCases);
  }, []);

  const handleCreateCase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newC = await api.createCase({ title, description, priority });
    setCases([newC, ...cases]);
    setShowCreateModal(false);
    setTitle('');
    setDescription('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new': return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase">New</span>;
      case 'investigating': return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 uppercase">Investigating</span>;
      case 'evidence_collected': return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">Evidence Collected</span>;
      case 'ready_to_report': return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 uppercase">Ready to Report</span>;
      case 'closed': return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 uppercase">Closed</span>;
      default: return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 uppercase">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Case Lifecycle Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
            Active Cases & Investigations
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track evidence collection, analysis status, and official cybercrime report readiness.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Open New Case</span>
        </button>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cases.map((c) => (
          <div key={c.id} className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4 hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {c.case_id}
              </span>
              {getStatusBadge(c.status)}
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-base">{c.title}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{c.description}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Notes</span>
              <p className="text-slate-700">{c.notes}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-400">Priority: <strong className="text-rose-600 uppercase">{c.priority}</strong></span>
              <button
                onClick={() => onNavigate('#report')}
                className="text-blue-600 font-bold hover:underline flex items-center gap-1"
              >
                <span>Prepare Complaint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Case Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Open New Case File</h3>
            <p className="text-xs text-slate-500 mb-4">
              Group related threats, evidence items, and actions.
            </p>

            <form onSubmit={handleCreateCase} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Case Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Deceptive Instagram Account Masquerading as Support"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Priority Level</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900"
                >
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Incident Summary</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe initial suspicion and observed signals..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  Initialize Case
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
