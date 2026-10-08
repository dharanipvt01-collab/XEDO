import React, { useState } from 'react';
import { UserRole } from '../types';
import { Sparkles, Users, ShieldAlert, Play, Check, ChevronDown } from 'lucide-react';

interface DemoBarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onLoadScenario: (scenarioId: string) => void;
}

export const DemoBar: React.FC<DemoBarProps> = ({ currentRole, onRoleChange, onLoadScenario }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const scenarios = [
    { id: 'scenario-1', title: 'Scenario 1: Fake Bank Support Profile (@sbi_supportt)' },
    { id: 'scenario-2', title: 'Scenario 2: Lookalike Phishing Website (sbi-kyc-verification.top)' },
    { id: 'scenario-3', title: 'Scenario 3: Urgent Scam SMS (Smishing Pretext)' },
    { id: 'scenario-4', title: 'Scenario 4: Suspicious Android APK (SBI_Secure_v4.2.apk)' },
    { id: 'scenario-5', title: 'Scenario 5: Coordinated Campaign (CMP-2026-04 Apex-Lure)' },
    { id: 'scenario-6', title: 'Scenario 6: Enterprise Brand Protection Sweep' },
  ];

  return (
    <div className="bg-slate-900 text-white px-4 py-2 border-b border-slate-800 text-xs flex flex-wrap items-center justify-between gap-3 sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 font-bold tracking-wider text-[11px] text-blue-400 uppercase">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>XEDO Hackathon Demo Controller</span>
        </div>

        {/* Persona Switcher */}
        <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
          <button
            onClick={() => onRoleChange('citizen')}
            className={`px-2.5 py-1 rounded-md transition-all font-semibold ${
              currentRole === 'citizen'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Citizen / Customer
          </button>
          <button
            onClick={() => onRoleChange('analyst')}
            className={`px-2.5 py-1 rounded-md transition-all font-semibold ${
              currentRole === 'analyst'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Security Analyst / Admin
          </button>
        </div>
      </div>

      {/* Preset Scenarios Menu */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1 rounded-lg text-slate-200 transition-colors font-semibold"
        >
          <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
          <span>Load Demo Threat Scenario</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-1.5 w-72 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-1 z-50 text-slate-200">
            {scenarios.map((sc) => (
              <button
                key={sc.id}
                onClick={() => {
                  onLoadScenario(sc.id);
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-700 text-xs font-medium text-slate-200 hover:text-white transition-colors"
              >
                {sc.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
