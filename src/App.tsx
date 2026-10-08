import React, { useState, useEffect } from 'react';
import { UserRole, Threat } from './types';
import { DemoBar } from './components/DemoBar';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { AskXedoModal } from './components/AskXedoModal';
import { CommandPalette } from './components/CommandPalette';
import { AutonomousInvestigationModal } from './components/AutonomousInvestigationModal';
import { LandingPage } from './pages/LandingPage';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { AnalystDashboard } from './pages/AnalystDashboard';
import { UniversalAnalyzerPage } from './pages/UniversalAnalyzerPage';
import { ThreatGraphPage } from './pages/ThreatGraphPage';
import { ThreatTwinPage } from './pages/ThreatTwinPage';
import { ThreatDetailPage } from './pages/ThreatDetailPage';
import { ThreatsListPage } from './pages/ThreatsListPage';
import { CampaignsPage } from './pages/CampaignsPage';
import { EvidenceVaultPage } from './pages/EvidenceVaultPage';
import { CaseManagementPage } from './pages/CaseManagementPage';
import { SafetyNavigatorPage } from './pages/SafetyNavigatorPage';
import { ComplaintPreparationPage } from './pages/ComplaintPreparationPage';
import { BrandProtectionPage } from './pages/BrandProtectionPage';
import { CopilotPage } from './pages/CopilotPage';
import { SettingsPage } from './pages/SettingsPage';
import { IdentityDNA } from './components/IdentityDNA';
import { api } from './services/api';

export function App() {
  const [role, setRole] = useState<UserRole>('citizen');
  const [currentPath, setCurrentPath] = useState<string>('#landing');
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  const [isAskXedoOpen, setIsAskXedoOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isInvestigationModalOpen, setIsInvestigationModalOpen] = useState(false);
  const [investigationTargetId, setInvestigationTargetId] = useState('XD-1024');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [presetEntity, setPresetEntity] = useState<string>('@sbi_supportt');

  // Handle Hash Routing safely
  const getNormalizedPath = () => {
    const hash = window.location.hash;
    if (!hash || hash === '#' || hash === '') return '#landing';
    return hash;
  };

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(getNormalizedPath());
    };

    window.addEventListener('hashchange', handleHashChange);
    setCurrentPath(getNormalizedPath());
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    if (currentPath === '#customer-home' && newRole === 'analyst') {
      navigateTo('#command-center');
    } else if (currentPath === '#command-center' && newRole === 'citizen') {
      navigateTo('#customer-home');
    }
  };

  const handleLoadScenario = (scenarioId: string) => {
    const scenarioPresets: Record<string, { entity: string; role: UserRole; path: string }> = {
      'scenario-1': { entity: '@sbi_supportt', role: 'citizen', path: '#analyze' },
      'scenario-2': { entity: 'https://sbi-kyc-verification.top/auth', role: 'citizen', path: '#analyze' },
      'scenario-3': { entity: 'Dear Customer, Your SBI account will be blocked today. Update PAN: http://sbi-kyc-verification.top', role: 'citizen', path: '#analyze' },
      'scenario-4': { entity: 'SBI_Secure_v4.2.apk', role: 'analyst', path: '#threat-detail' },
      'scenario-5': { entity: 'Campaign CMP-2026-04', role: 'analyst', path: '#campaigns' },
      'scenario-6': { entity: 'State Bank of India', role: 'analyst', path: '#brand-protection' },
    };

    const target = scenarioPresets[scenarioId];
    if (target) {
      setRole(target.role);
      setPresetEntity(target.entity);
      navigateTo(target.path);
    }
  };

  const openInvestigation = (threatId: string = 'XD-1024') => {
    setInvestigationTargetId(threatId);
    setIsInvestigationModalOpen(true);
  };

  // If on landing page, display the polished LandingPage view
  if (currentPath === '#landing') {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <DemoBar
          currentRole={role}
          onRoleChange={handleRoleChange}
          onLoadScenario={handleLoadScenario}
        />
        <LandingPage
          onEnterApp={(path, targetRole) => {
            if (targetRole) setRole(targetRole);
            navigateTo(path);
          }}
          onLoadScenario={handleLoadScenario}
        />
        <AskXedoModal
          isOpen={isAskXedoOpen}
          onClose={() => setIsAskXedoOpen(false)}
        />
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onSelectAction={navigateTo}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col">
      {/* Top Demo Bar */}
      <DemoBar
        currentRole={role}
        onRoleChange={handleRoleChange}
        onLoadScenario={handleLoadScenario}
      />

      {/* Primary Sticky Header */}
      <Navbar
        currentRole={role}
        onOpenAskXedo={() => setIsAskXedoOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        activePath={currentPath}
        onNavigate={navigateTo}
        onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />

      {/* Main Workspace with Sidebar */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          currentRole={role}
          activePath={currentPath}
          onNavigate={navigateTo}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* Customer / Citizen Views */}
          {currentPath === '#customer-home' && (
            <CustomerDashboard
              onNavigate={navigateTo}
              onSelectThreat={setSelectedThreat}
            />
          )}

          {/* Analyst Views */}
          {currentPath === '#command-center' && (
            <AnalystDashboard
              onNavigate={navigateTo}
              onSelectThreat={setSelectedThreat}
              onOpenInvestigation={openInvestigation}
            />
          )}

          {/* Universal Threat Analyzer */}
          {currentPath === '#analyze' && (
            <UniversalAnalyzerPage
              onNavigate={navigateTo}
              onOpenInvestigation={openInvestigation}
              onSelectThreat={setSelectedThreat}
              presetEntity={presetEntity}
            />
          )}

          {/* Threat List */}
          {currentPath === '#threats' && (
            <ThreatsListPage
              onNavigate={navigateTo}
              onSelectThreat={setSelectedThreat}
              onOpenInvestigation={openInvestigation}
            />
          )}

          {/* Threat Detail */}
          {currentPath === '#threat-detail' && (
            <ThreatDetailPage
              threat={selectedThreat}
              onNavigate={navigateTo}
              onOpenInvestigation={openInvestigation}
            />
          )}

          {/* Threat Intelligence Graph */}
          {currentPath === '#threat-graph' && (
            <ThreatGraphPage
              onNavigate={navigateTo}
              onOpenInvestigation={openInvestigation}
            />
          )}

          {/* Threat Twin */}
          {currentPath === '#threat-twin' && (
            <ThreatTwinPage
              onNavigate={navigateTo}
              threatRef={selectedThreat?.threat_id || 'XD-1024'}
            />
          )}

          {/* Digital Identity DNA */}
          {currentPath === '#identity-dna' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Proprietary Identity Fingerprinting
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
                    Digital Identity DNA™
                  </h1>
                </div>
                <button
                  onClick={() => openInvestigation('XD-1024')}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                >
                  Run Autonomous Ingest
                </button>
              </div>
              <ThreatDetailPage
                threat={selectedThreat}
                onNavigate={navigateTo}
                onOpenInvestigation={openInvestigation}
              />
            </div>
          )}

          {/* Campaigns */}
          {currentPath === '#campaigns' && (
            <CampaignsPage
              onNavigate={navigateTo}
              onOpenInvestigation={openInvestigation}
            />
          )}

          {/* Forecast */}
          {currentPath === '#forecast' && (
            <div className="space-y-6 animate-fadeIn">
              <AnalystDashboard
                onNavigate={navigateTo}
                onSelectThreat={setSelectedThreat}
                onOpenInvestigation={openInvestigation}
              />
            </div>
          )}

          {/* Brand Protection */}
          {currentPath === '#brand-protection' && (
            <BrandProtectionPage
              onNavigate={navigateTo}
              onOpenInvestigation={openInvestigation}
            />
          )}

          {/* Evidence Vault */}
          {currentPath === '#evidence' && (
            <EvidenceVaultPage onNavigate={navigateTo} />
          )}

          {/* Cases */}
          {currentPath === '#cases' && (
            <CaseManagementPage onNavigate={navigateTo} />
          )}

          {/* Safety Navigator */}
          {currentPath === '#safety-center' && (
            <SafetyNavigatorPage onNavigate={navigateTo} />
          )}

          {/* Complaint Preparation */}
          {currentPath === '#report' && (
            <ComplaintPreparationPage
              onNavigate={navigateTo}
              threatRef={selectedThreat?.entity || '@sbi_supportt'}
            />
          )}

          {/* XEDO Copilot */}
          {currentPath === '#copilot' && (
            <CopilotPage
              onNavigate={navigateTo}
              onOpenInvestigation={openInvestigation}
            />
          )}

          {/* Settings */}
          {currentPath === '#settings' && (
            <SettingsPage />
          )}

          {/* Fallback View for any unrecognized path or #notifications */}
          {!([
            '#customer-home', '#command-center', '#analyze', '#threats',
            '#threat-detail', '#threat-graph', '#threat-twin', '#identity-dna',
            '#campaigns', '#forecast', '#brand-protection', '#evidence',
            '#cases', '#safety-center', '#report', '#copilot', '#settings'
          ].includes(currentPath)) && (
            role === 'citizen' ? (
              <CustomerDashboard
                onNavigate={navigateTo}
                onSelectThreat={setSelectedThreat}
              />
            ) : (
              <AnalystDashboard
                onNavigate={navigateTo}
                onSelectThreat={setSelectedThreat}
                onOpenInvestigation={openInvestigation}
              />
            )
          )}
        </main>

      </div>

      {/* Floating Global "Ask XEDO" Trigger Pill on bottom right */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setIsAskXedoOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs shadow-xl shadow-slate-900/30 transition-all hover:scale-105 border border-slate-800"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
          <span>Ask XEDO AI</span>
        </button>
      </div>

      {/* Global Modals */}
      <AskXedoModal
        isOpen={isAskXedoOpen}
        onClose={() => setIsAskXedoOpen(false)}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectAction={navigateTo}
      />

      <AutonomousInvestigationModal
        isOpen={isInvestigationModalOpen}
        onClose={() => setIsInvestigationModalOpen(false)}
        threatId={investigationTargetId}
        onCompleted={() => {
          // Investigation concluded
        }}
      />
    </div>
  );
}

export default App;
