import React from 'react';
import { UserRole } from '../types';
import {
  Home, Search, ShieldAlert, Briefcase, FileText, HelpCircle,
  AlertTriangle, Layers, Cpu, Fingerprint, Tag, TrendingUp,
  Globe, Bot, Settings, LogOut, Sparkles
} from 'lucide-react';

interface SidebarProps {
  currentRole: UserRole;
  activePath: string;
  onNavigate: (path: string) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRole,
  activePath,
  onNavigate,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const citizenNav = [
    { label: 'Home Overview', path: '#customer-home', icon: Home },
    { label: 'Analyze Anything', path: '#analyze', icon: Search, badge: 'AI' },
    { label: 'My Threats', path: '#threats', icon: ShieldAlert },
    { label: 'My Cases', path: '#cases', icon: Briefcase },
    { label: 'Evidence Vault', path: '#evidence', icon: FileText },
    { label: 'Safety Center', path: '#safety-center', icon: HelpCircle },
    { label: 'Prepare Complaint', path: '#report', icon: AlertTriangle, highlight: true },
  ];

  const analystNav = [
    { label: 'Command Center', path: '#command-center', icon: Home },
    { label: 'Threat Queue', path: '#threats', icon: ShieldAlert },
    { label: 'Universal Analyzer', path: '#analyze', icon: Search },
    { label: 'Threat Graph', path: '#threat-graph', icon: Layers, badge: 'Interactive' },
    { label: 'Digital Threat Twin', path: '#threat-twin', icon: Cpu, badge: 'Core' },
    { label: 'Identity DNA', path: '#identity-dna', icon: Fingerprint },
    { label: 'Threat Campaigns', path: '#campaigns', icon: Tag },
    { label: 'Threat Forecast', path: '#forecast', icon: TrendingUp },
    { label: 'Brand Protection', path: '#brand-protection', icon: Globe },
    { label: 'Evidence Vault', path: '#evidence', icon: FileText },
    { label: 'Cases & Reports', path: '#cases', icon: Briefcase },
    { label: 'XEDO Copilot', path: '#copilot', icon: Bot },
    { label: 'Settings & Audit', path: '#settings', icon: Settings },
  ];

  const currentNav = currentRole === 'citizen' ? citizenNav : analystNav;

  const handleNavClick = (path: string) => {
    onNavigate(path);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-[95px] h-[calc(100vh-95px)] z-40 bg-white border-r border-slate-200/80 w-64 p-4 flex flex-col justify-between shrink-0 transition-transform duration-300 lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6 overflow-y-auto pr-1">
          {/* Persona Header Label */}
          <div className="px-3 pt-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {currentRole === 'citizen' ? 'Citizen Safety Portal' : 'Security Command Matrix'}
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {currentNav.map((item) => {
              const IconComponent = item.icon;
              const isActive = activePath === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 shadow-2xs font-bold'
                      : item.highlight
                      ? 'bg-rose-50/60 text-rose-700 hover:bg-rose-100/60'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent
                      className={`w-4 h-4 ${
                        isActive
                          ? 'text-blue-600'
                          : item.highlight
                          ? 'text-rose-600'
                          : 'text-slate-400 group-hover:text-slate-700'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                      {item.badge}
                    </span>
                  )}
                  {item.highlight && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-200 text-rose-800">
                      1930
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer with Help and NCRP Quick Link */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-[11px]">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>National Cyber Helpline</span>
            </div>
            <p className="text-slate-500 mt-1 leading-tight">
              Toll-Free 24x7 Financial Fraud:
            </p>
            <div className="font-extrabold text-blue-600 text-sm mt-0.5 font-mono">
              Dial 1930
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
