import React from 'react';
import { UserRole } from '../types';
import {
  Shield, Search, Bell, Bot, Sparkles, UserCheck, Menu, X, Command
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onOpenAskXedo: () => void;
  onOpenCommandPalette: () => void;
  activePath: string;
  onNavigate: (path: string) => void;
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onOpenAskXedo,
  onOpenCommandPalette,
  activePath,
  onNavigate,
  onToggleSidebar,
}) => {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-[37px] z-30 px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Brand & Mobile Toggle */}
      <div className="flex items-center gap-4">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* XEDO Brand Logo */}
        <div
          onClick={() => onNavigate(currentRole === 'citizen' ? '#customer-home' : '#command-center')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/30 group-hover:bg-blue-700 transition-colors">
            <Shield className="w-5 h-5 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                XEDO
              </span>
              <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 tracking-wider">
                OS
              </span>
            </div>
            <div className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase -mt-0.5 hidden sm:block">
              Detect • Connect • Predict • Protect
            </div>
          </div>
        </div>
      </div>

      {/* Global Search Button (Ctrl + K) */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between bg-slate-100/80 hover:bg-slate-100 border border-slate-200/80 rounded-xl px-3.5 py-2 text-xs text-slate-400 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <span className="text-slate-500">Search threats, URLs, cases, evidence...</span>
          </div>
          <kbd className="flex items-center gap-0.5 font-mono text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-500 font-semibold shadow-2xs">
            <Command className="w-3 h-3" /> K
          </kbd>
        </button>
      </div>

      {/* Right Action Utilities */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Ask XEDO Primary Button */}
        <button
          onClick={onOpenAskXedo}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold shadow-xs shadow-blue-600/20 transition-all hover:shadow-md"
        >
          <Bot className="w-4 h-4" />
          <span className="hidden sm:inline">Ask XEDO AI</span>
        </button>

        {/* Notifications Bell */}
        <button
          onClick={() => onNavigate('#notifications')}
          className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
        </button>

        {/* Role Pill Indicator */}
        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs">
            {currentRole === 'citizen' ? 'PS' : 'VM'}
          </div>
          <div className="text-left text-xs">
            <div className="font-semibold text-slate-900 leading-tight">
              {currentRole === 'citizen' ? 'Priya Sharma' : 'Vikram Malhotra'}
            </div>
            <div className="text-[10px] text-slate-400 font-medium capitalize">
              {currentRole} Account
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
