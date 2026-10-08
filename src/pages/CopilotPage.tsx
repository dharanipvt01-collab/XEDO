import React, { useState } from 'react';
import { Bot, Send, Sparkles, Shield, Cpu, ArrowRight, CornerDownLeft, Layers, FileText } from 'lucide-react';
import { api } from '../services/api';

interface CopilotPageProps {
  onNavigate: (path: string) => void;
  onOpenInvestigation: (threatId: string) => void;
}

export const CopilotPage: React.FC<CopilotPageProps> = ({ onNavigate, onOpenInvestigation }) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'copilot'; text: string; actions?: string[] }>>([
    {
      sender: 'copilot',
      text: (
        "XEDO AI Security Copilot initialized.\n\n" +
        "I am connected to the live telemetry stream for Threat XD-1024 (@sbi_supportt), Campaign CMP-2026-04, and the Evidence Vault.\n\n" +
        "How can I assist your investigation today?"
      ),
      actions: [
        "Why is this account high risk?",
        "Find related threats.",
        "Summarize this investigation.",
        "What evidence should I collect?",
        "Compare this profile with the official identity."
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    const userMsg = { sender: 'user' as const, text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.queryCopilot(text, 'XD-1024', 'analyst');
      setMessages((prev) => [
        ...prev,
        {
          sender: 'copilot',
          text: res.reply,
          actions: res.suggested_actions
        }
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'copilot',
          text: "I don't have enough evidence to evaluate that query at this time. Please specify an exact IOC, handle, or domain."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Analyst Command Assistant
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            XEDO Copilot
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-slate-600">Model: XEDO Brain Engine</span>
        </div>
      </div>

      {/* Chat Messages Feed */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-white rounded-3xl border border-slate-200/90 shadow-sm">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
            <div
              className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed whitespace-pre-wrap ${
                m.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none shadow-xs'
                  : 'bg-slate-50 text-slate-800 rounded-bl-none border border-slate-200/80 font-normal'
              }`}
            >
              {m.text}
            </div>

            {m.actions && m.actions.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[85%]">
                {m.actions.map((act, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(act)}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 border border-slate-200 transition-colors"
                  >
                    {act}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
            <Bot className="w-4 h-4 animate-bounce text-blue-600" />
            <span>XEDO Copilot is querying application telemetry...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="flex items-center gap-2 pt-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask XEDO Copilot (e.g. 'Why is this account high risk?', 'Summarize this investigation')..."
          className="flex-1 bg-white border border-slate-200 rounded-2xl px-5 py-3.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm transition-all"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span>Send</span>
        </button>
      </form>
    </div>
  );
};
