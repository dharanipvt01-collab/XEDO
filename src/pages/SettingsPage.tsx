import React, { useState } from 'react';
import { Settings, Shield, User, Sliders, Bell, Eye, Database, History, Check } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [aiConfidenceThreshold, setAiConfidenceThreshold] = useState(85);
  const [autoPreserveEvidence, setAutoPreserveEvidence] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const auditLogs = [
    { time: '10:42 AM', user: 'Vikram Malhotra (Analyst)', action: 'REVIEW_THREAT', resource: 'Threat XD-1024', status: 'Success' },
    { time: '10:38 AM', user: 'System (AI Brain)', action: 'CORRELATE_CAMPAIGN', resource: 'CMP-2026-04 (Apex-Lure)', status: 'Clustered' },
    { time: '10:31 AM', user: 'Priya Sharma (Citizen)', action: 'SEAL_EVIDENCE', resource: 'EV-5501 (Profile Capture)', status: 'SHA-256 Verified' },
    { time: '10:25 AM', user: 'System (Telemetry Ingest)', action: 'INGEST_SMS', resource: 'Gateway AD-SBIN0T', status: 'Flagged High Risk' },
    { time: '09:14 AM', user: 'Vikram Malhotra (Analyst)', action: 'OPEN_CASE', resource: 'CASE-8941', status: 'Created' },
  ];

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Platform Configuration
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
          Settings & Governance
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage AI risk thresholds, interface theme, regulatory policies, and immutable audit telemetry.
        </p>
      </div>

      {/* Settings Sections */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Appearance Theme */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-2">Display & Theme</h3>
          <p className="text-xs text-slate-500 mb-3">
            Light theme is the recommended default for maximum legibility and clarity.
          </p>
          <div className="flex items-center gap-3">
            {(['light', 'dark', 'system'] as const).map((th) => (
              <button
                key={th}
                onClick={() => setTheme(th)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                  theme === th
                    ? 'bg-blue-600 text-white shadow-xs font-bold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {th} Theme
              </button>
            ))}
          </div>
        </div>

        {/* AI & Risk Engine Preferences */}
        <div className="pt-6 border-t border-slate-100 space-y-4">
          <h3 className="text-sm font-bold text-slate-900">AI Risk Engine Calibration</h3>
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Campaign Grouping Confidence Threshold</span>
              <span className="font-mono text-blue-600">{aiConfidenceThreshold}%</span>
            </div>
            <input
              type="range"
              min={60}
              max={95}
              value={aiConfidenceThreshold}
              onChange={(e) => setAiConfidenceThreshold(parseInt(e.target.value))}
              className="w-full accent-blue-600"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Minimum similarity confidence required to cluster disparate threat entities into a unified Campaign.
            </p>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
            <div>
              <span className="font-bold text-slate-800 block">Automated Evidence Sealing</span>
              <span className="text-slate-500 text-[11px]">
                Immediately compute SHA-256 digest when URLs and profile DOM captures are ingested.
              </span>
            </div>
            <input
              type="checkbox"
              checked={autoPreserveEvidence}
              onChange={(e) => setAutoPreserveEvidence(e.target.checked)}
              className="w-4 h-4 accent-blue-600 rounded"
            />
          </div>
        </div>

        <div className="pt-4 flex items-center justify-end">
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
          >
            {saveSuccess ? <Check className="w-4 h-4" /> : null}
            <span>{saveSuccess ? 'Preferences Saved' : 'Save Configuration'}</span>
          </button>
        </div>
      </div>

      {/* Audit Log Table (Requirement 52) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Compliance & Audit Trail</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Immutable event log recording analyst reviews, risk updates, and evidence sealing.
            </p>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 uppercase">
            Tamper Evident
          </span>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] font-bold">
                <th className="pb-3">Timestamp</th>
                <th className="pb-3">Operator</th>
                <th className="pb-3">Action</th>
                <th className="pb-3">Resource</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {auditLogs.map((log, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 font-mono text-slate-500">{log.time}</td>
                  <td className="py-3 font-medium text-slate-900">{log.user}</td>
                  <td className="py-3 font-mono font-bold text-blue-600">{log.action}</td>
                  <td className="py-3 text-slate-700">{log.resource}</td>
                  <td className="py-3 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
