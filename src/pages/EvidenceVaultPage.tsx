import React, { useEffect, useState } from 'react';
import {
  FileText, ShieldCheck, Download, Plus, CheckCircle2, Lock,
  ExternalLink, Eye, ArrowRight, Hash, Sparkles
} from 'lucide-react';
import { EvidenceItem } from '../types';
import { api } from '../services/api';

interface EvidenceVaultPageProps {
  onNavigate: (path: string) => void;
}

export const EvidenceVaultPage: React.FC<EvidenceVaultPageProps> = ({ onNavigate }) => {
  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('screenshot');
  const [newContent, setNewContent] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    api.getEvidence().then(setEvidenceList);
  }, []);

  const handleAddEvidence = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const added = await api.addEvidence({
      title: newTitle,
      type: newType,
      source: 'Manual User Preservation',
      content_or_path: newContent || newTitle
    });
    setEvidenceList([added, ...evidenceList]);
    setShowAddModal(false);
    setNewTitle('');
    setNewContent('');
  };

  const handleDownloadReport = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);

    const reportContent = JSON.stringify(evidenceList, null, 2);
    const blob = new Blob([reportContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `XEDO-Evidence-Vault-Report-${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Cryptographic Custody
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
            Evidence Vault
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Forensic preservation repository hashing screenshots, network snapshots, and message logs with SHA-256 for legal admissibility.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Preserve New Evidence</span>
          </button>

          <button
            onClick={handleDownloadReport}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>{downloadSuccess ? 'Downloaded!' : 'Download Evidence Report'}</span>
          </button>
        </div>
      </div>

      {/* Preservation Integrity Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
          <div className="text-xs">
            <h4 className="font-bold text-emerald-950">Preserved Forensic Integrity</h4>
            <p className="text-emerald-800">
              All 8 active items are sealed with SHA-256 digests. Ready for attachment to NCRP Cyber Crime Portal or police station filings.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('#report')}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shrink-0"
        >
          Attach to Complaint →
        </button>
      </div>

      {/* Evidence Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {evidenceList.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4 hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {item.evidence_id}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 uppercase">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>{item.integrity_status}</span>
              </span>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-sm leading-snug">{item.title}</h3>
              <p className="text-xs text-slate-500 mt-1 font-mono break-all line-clamp-1">
                Source: {item.source}
              </p>
            </div>

            {/* SHA-256 Digest Box */}
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[10px] text-slate-500 font-mono break-all flex items-start gap-1.5">
              <Hash className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>SHA-256: {item.hash_sha256}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
              <span className="capitalize">{item.type.replace('_', ' ')}</span>
              <span>{new Date(item.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Preserve Evidence Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Preserve Digital Evidence</h3>
            <p className="text-xs text-slate-500 mb-4">
              Item will be cryptographically hashed with SHA-256 upon ingest.
            </p>

            <form onSubmit={handleAddEvidence} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Evidence Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Screenshot of WhatsApp Impersonation Chat"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Artifact Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900"
                >
                  <option value="screenshot">Screenshot Capture</option>
                  <option value="url">Web Domain Snapshot</option>
                  <option value="message">SMS / Chat Transcript</option>
                  <option value="apk_analysis">APK Application Binary</option>
                  <option value="document">Bank Transaction Slip</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Content / URL / Notes</label>
                <textarea
                  rows={3}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Paste URL, raw message text, or description..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  Seal & Hash in Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
