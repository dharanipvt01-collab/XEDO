import React, { useState } from 'react';
import {
  HelpCircle, AlertTriangle, PhoneCall, ShieldCheck, ArrowRight,
  RotateCcw, FileText, CheckCircle2, Info
} from 'lucide-react';

interface SafetyNavigatorPageProps {
  onNavigate: (path: string) => void;
}

export const SafetyNavigatorPage: React.FC<SafetyNavigatorPageProps> = ({ onNavigate }) => {
  const [step, setStep] = useState<'initial' | 'lost_money' | 'shared_otp' | 'clicked_link' | 'safe'>('initial');

  return (
    <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Interactive Triage Engine
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-2">
          Safety Navigator: What should I do now?
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Simple, step-by-step guidance tailored to your immediate digital situation.
        </p>
      </div>

      {/* Decision Tree Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
        {step === 'initial' && (
          <div className="space-y-6 text-center py-4">
            <h2 className="text-xl font-extrabold text-slate-900">
              Did you lose any money or approve an unauthorized transaction?
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setStep('lost_money')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md shadow-rose-600/20 transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>YES — Money was debited</span>
              </button>
              <button
                onClick={() => setStep('shared_otp')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all flex items-center justify-center gap-2"
              >
                <span>NO — Money was NOT debited</span>
              </button>
            </div>
          </div>
        )}

        {/* Path 1: Lost Money (Critical Emergency) */}
        {step === 'lost_money' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 flex items-start gap-4">
              <PhoneCall className="w-8 h-8 text-rose-600 shrink-0 mt-0.5 animate-bounce" />
              <div>
                <h3 className="text-base font-extrabold text-rose-950">
                  Critical Emergency Protocol: Call 1930 Right Now
                </h3>
                <p className="text-xs text-rose-900 mt-1 leading-relaxed">
                  The first 2–4 hours (the 'Golden Hour') are crucial for law enforcement to freeze funds before they are withdrawn by fraudulent recipients.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Recommended 4-Step Checklist:
              </h4>

              {[
                { title: '1. Call National Cyber Crime Helpline: 1930', desc: 'State your bank name, account number, contested transaction amount, and UTR number.' },
                { title: '2. Block your ATM Card / Net Banking Access', desc: 'Call your bank’s official toll-free card blocking hotline immediately.' },
                { title: '3. Preserve Transaction Evidence', desc: 'Download your official bank statement and screenshot SMS debit alerts into XEDO Evidence Vault.' },
                { title: '4. Prepare NCRP Cybercrime Complaint', desc: 'Generate your official complaint summary and submit to cybercrime.gov.in.' }
              ].map((item, i) => (
                <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
                  <span className="font-bold text-slate-900 block mb-0.5">{item.title}</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setStep('initial')}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Start Over</span>
              </button>

              <button
                onClick={() => onNavigate('#report')}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>Continue to Complaint Preparation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Path 2: Shared Credentials / OTP */}
        {step === 'shared_otp' && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-lg font-bold text-slate-900 text-center">
              Did you share an OTP, enter your net banking password, or install an APK?
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setStep('clicked_link')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-colors"
              >
                YES — Entered credentials or installed app
              </button>
              <button
                onClick={() => setStep('safe')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
              >
                NO — Only viewed or received the message
              </button>
            </div>
          </div>
        )}

        {/* Path 3: Clicked or Shared Credentials */}
        {step === 'clicked_link' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
              <div className="text-xs">
                <h4 className="font-bold text-amber-950">Credential Reset Required</h4>
                <p className="text-amber-900">
                  Change all banking passwords and net-banking credentials from a clean, secure device.
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong>1. Change Net Banking Password Immediately</strong> via your official bank app.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong>2. Uninstall Any Sideloaded APK Files</strong> from your phone's Apps settings.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong>3. Report the Deceptive URL to XEDO</strong> to preserve cryptographic evidence.
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setStep('initial')}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Start Over
              </button>
              <button
                onClick={() => onNavigate('#analyze')}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
              >
                Analyze Suspicious URL Now
              </button>
            </div>
          </div>
        )}

        {/* Path 4: Safe - Only Received */}
        {step === 'safe' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div className="text-xs">
                <h4 className="font-bold text-emerald-950">No Compromise Detected</h4>
                <p className="text-emerald-900">
                  You are safe! Simply block the sender, avoid clicking any links, and report the handle.
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                • <strong>Do not click or forward</strong> the suspicious message to other family members.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                • <strong>Block and report the sender</strong> inside your messaging or social platform.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                • Report unsolicited SMS to <strong>TRAI Chakshu portal</strong> via 1930.
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setStep('initial')}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Start Over
              </button>
              <button
                onClick={() => onNavigate('#customer-home')}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
              >
                Return to Safety Dashboard
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Legal & Safety Advice Disclaimer */}
      <div className="p-4 bg-slate-100/70 border border-slate-200 rounded-2xl text-[11px] text-slate-500 text-center">
        General safety information. Not legal advice. If you suspect criminal fraud, report directly to law enforcement or dial 1930.
      </div>
    </div>
  );
};
