import React, { useState } from 'react';
import {
  FileText, ExternalLink, Download, Copy, Check, ShieldCheck,
  AlertTriangle, PhoneCall, Sparkles, ArrowRight
} from 'lucide-react';
import { api } from '../services/api';
import { ComplaintPacket } from '../types';

interface ComplaintPreparationPageProps {
  onNavigate: (path: string) => void;
  threatRef?: string;
}

export const ComplaintPreparationPage: React.FC<ComplaintPreparationPageProps> = ({
  onNavigate,
  threatRef = '@sbi_supportt',
}) => {
  const [suspectEntity, setSuspectEntity] = useState(threatRef);
  const [description, setDescription] = useState(
    'Encountered fraudulent Instagram support profile claiming my SBI account would be permanently blocked unless I verified KYC credentials at an external website.'
  );
  const [lossAmount, setLossAmount] = useState<number>(0);
  const [txRef, setTxRef] = useState('');
  const [victimName, setVictimName] = useState('Priya Sharma');
  const [victimContact, setVictimContact] = useState('+91 98765 43210');
  const [packet, setPacket] = useState<ComplaintPacket | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await api.generateComplaint({
      suspect_contact_or_url: suspectEntity,
      incident_description: description,
      financial_loss: lossAmount,
      transaction_reference: txRef,
      victim_name: victimName,
      victim_contact: victimContact
    });
    setPacket(res);
    setLoading(false);
  };

  const copyToClipboard = () => {
    if (!packet) return;
    navigator.clipboard.writeText(packet.complaint_narrative_text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadReport = () => {
    if (!packet) return;
    const blob = new Blob([JSON.stringify(packet, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${packet.incident_reference_code}.json`;
    a.click();
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
          Official Cybercrime Preparation Packet
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
          Prepare a Complaint for Official Reporting
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Synthesizes forensic timeline, digital evidence hashes, and suspect indicators into standardized National Cyber Crime Reporting Portal (NCRP) format.
        </p>
      </div>

      {/* Emergency Helpline Banner */}
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <PhoneCall className="w-6 h-6 text-rose-600 shrink-0" />
          <div className="text-xs text-rose-950">
            <h4 className="font-bold">National Cybercrime Helpline: Dial 1930</h4>
            <p className="text-rose-900">
              Immediate financial fraud reporting helpline active 24x7 across all Indian states and Union Territories.
            </p>
          </div>
        </div>
        <a
          href="tel:1930"
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs text-center transition-colors shrink-0"
        >
          Dial 1930 Now
        </a>
      </div>

      {/* Complaint Generator Form */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleGenerate} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Suspect Profile / URL / Phone</label>
              <input
                type="text"
                required
                value={suspectEntity}
                onChange={(e) => setSuspectEntity(e.target.value)}
                placeholder="e.g. @sbi_supportt or https://sbi-kyc-verification.top"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Financial Loss Amount (INR)</label>
              <input
                type="number"
                value={lossAmount}
                onChange={(e) => setLossAmount(parseFloat(e.target.value) || 0)}
                placeholder="0 if no money lost"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Transaction Ref / UTR (if applicable)</label>
              <input
                type="text"
                value={txRef}
                onChange={(e) => setTxRef(e.target.value)}
                placeholder="e.g. UPI/1234567890/IMPS"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Complainant Contact</label>
              <input
                type="text"
                value={victimContact}
                onChange={(e) => setVictimContact(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Factual Incident Statement</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex items-center justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loading ? 'Synthesizing...' : 'Generate Complaint Summary'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Generated Official Packet */}
      {packet && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                Ref: {packet.incident_reference_code}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">Generated Incident Packet</h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyToClipboard}
                className="px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied Narrative!' : 'Copy Summary'}</span>
              </button>

              <button
                onClick={handleDownloadReport}
                className="px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Download Report</span>
              </button>
            </div>
          </div>

          {/* Formatted Narrative Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <pre className="text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed">
              {packet.complaint_narrative_text}
            </pre>
          </div>

          {/* Recommended Categories on NCRP */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">
              Recommended NCRP Filing Categories:
            </h4>
            <div className="flex flex-wrap gap-2">
              {packet.ncrp_recommended_categories.map((cat, i) => (
                <span key={i} className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 font-semibold border border-blue-100">
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Recommended Attachments */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">
              Recommended Attachments to Upload on cybercrime.gov.in:
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              {packet.recommended_attachments.map((att, i) => (
                <li key={i}>{att}</li>
              ))}
            </ul>
          </div>

          {/* Primary Action to Official Portal */}
          <div className="p-5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
            <div>
              <h4 className="font-bold text-sm">Ready to Submit Official Complaint?</h4>
              <p className="text-xs text-blue-100 mt-0.5">
                Paste this summary directly into the National Cyber Crime Reporting Portal.
              </p>
            </div>

            <a
              href={packet.official_portal_url}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-2.5 rounded-xl bg-white text-blue-600 hover:bg-blue-50 font-extrabold text-xs transition-all shadow-sm flex items-center justify-center gap-2 shrink-0"
            >
              <span>Continue to Official NCRP</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Mandatory Strict Non-Government Disclaimer */}
          <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-[11px] text-amber-900 leading-relaxed">
            <strong>Important Legal Notice:</strong> {packet.legal_disclaimer}
          </div>
        </div>
      )}
    </div>
  );
};
