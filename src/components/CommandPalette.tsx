import React, { useState, useEffect } from 'react';
import { Search, X, ShieldAlert, Globe, FileText, Briefcase, Tag, ArrowRight } from 'lucide-react';
import { Threat } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (path: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onSelectAction }) => {
  const [query, setQuery] = useState('');

  const items = [
    { title: 'Threat: @sbi_supportt', type: 'Profile Threat', path: '#threat-detail', icon: ShieldAlert, category: 'Threats' },
    { title: 'Threat: sbi-kyc-verification.top', type: 'Domain Threat', path: '#threat-detail', icon: Globe, category: 'Threats' },
    { title: 'Case: CASE-8941 (SBI Support Impersonation)', type: 'Case File', path: '#cases', icon: Briefcase, category: 'Cases' },
    { title: 'Evidence: EV-5501 (Profile Bio Screenshot)', type: 'Vault Item', path: '#evidence', icon: FileText, category: 'Evidence' },
    { title: 'Campaign: CMP-2026-04 (Apex-Lure Banking Cluster)', type: 'Campaign', path: '#campaigns', icon: Tag, category: 'Campaigns' },
    { title: 'Brand: State Bank of India Corporate Identity', type: 'Brand Identity', path: '#brand-protection', icon: Globe, category: 'Brands' },
    { title: 'Analyze New URL / Handle / Message', type: 'Universal Analyzer', path: '#analyze', icon: Search, category: 'Actions' },
    { title: 'Prepare Official Cybercrime Complaint (NCRP)', type: 'Complaint Report', path: '#report', icon: FileText, category: 'Actions' },
  ];

  const filtered = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xl max-w-xl w-full overflow-hidden">
        {/* Search Input */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search threats, URLs, cases, evidence, brands... (ESC to close)"
            className="flex-1 text-sm bg-transparent border-none focus:outline-none text-slate-900 placeholder:text-slate-400"
            autoFocus
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-semibold text-slate-400 bg-slate-100 border border-slate-200 rounded">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length > 0 ? (
            <div className="space-y-1">
              {filtered.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      onSelectAction(item.path);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {item.type} • {item.category}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">
              No matching intelligence entities found.
            </div>
          )}
        </div>

        {/* Palette Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between">
          <span>Tip: Type 'threat', 'case', 'domain' or 'evidence'</span>
          <span>XEDO Universal Search</span>
        </div>
      </div>
    </div>
  );
};
