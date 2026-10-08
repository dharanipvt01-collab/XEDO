import React, { useState } from 'react';
import {
  Sparkles, Send, X, Bot, Shield, AlertTriangle, ArrowRight,
  PhoneCall, CornerDownLeft, MessageSquare, ChevronRight
} from 'lucide-react';
import { api } from '../services/api';

interface AskXedoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'user' | 'xedo';
  text: string;
  actions?: string[];
  risk?: string;
}

export const AskXedoModal: React.FC<AskXedoModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'xedo',
      text: (
        "Hello. I'm XEDO AI, your digital risk intelligence assistant. " +
        "You can share a suspicious message, account handle, or link, and I will assess the risk, " +
        "explain observable signals, and guide your immediate actions."
      ),
      actions: [
        "I got a text saying my bank account will be blocked.",
        "How do I preserve evidence for cybercrime reporting?",
        "Why is @sbi_supportt considered high-risk?"
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: Message = { sender: 'user', text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await api.queryCopilot(userText);
      const replyMsg: Message = {
        sender: 'xedo',
        text: res.reply,
        actions: res.suggested_actions
      };
      setMessages((prev) => [...prev, replyMsg]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'xedo',
          text: "I don't have enough evidence to determine that with certainty. Please paste the exact URL or handle for deeper signal extraction."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl max-w-xl w-full h-[620px] flex flex-col overflow-hidden relative">
        {/* Assistant Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">XEDO AI Assistant</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-xs text-slate-500">
                Evidence-grounded risk guidance & scam triage
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History Messages */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[88%] rounded-2xl p-4 text-xs leading-relaxed whitespace-pre-wrap ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none shadow-xs'
                    : 'bg-slate-100/80 text-slate-800 rounded-bl-none border border-slate-200/60'
                }`}
              >
                {m.text}
              </div>

              {/* Action Chips */}
              {m.actions && m.actions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[90%]">
                  {m.actions.map((act, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(act)}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 border border-slate-200/80 transition-colors flex items-center gap-1 text-left"
                    >
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                      <span>{act}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
              <Bot className="w-4 h-4 animate-bounce text-blue-600" />
              <span>XEDO AI is evaluating observable signals...</span>
            </div>
          )}
        </div>

        {/* Emergency Helpline Strip */}
        <div className="px-4 py-2 bg-rose-50 border-t border-rose-100 flex items-center justify-between text-xs text-rose-800">
          <div className="flex items-center gap-1.5 font-medium">
            <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
            <span>Lost money? Call <strong>1930</strong> immediately</span>
          </div>
          <span className="text-[10px] text-rose-600 font-semibold uppercase">Helpline 24/7</span>
        </div>

        {/* Input Form */}
        <div className="p-3 sm:p-4 border-t border-slate-100 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask XEDO (e.g. 'I received a message about KYC block...')"
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white flex items-center justify-center transition-colors shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[10px] text-slate-400 text-center mt-2">
            General risk intelligence. XEDO never hallucinates evidence. Not legal advice.
          </p>
        </div>
      </div>
    </div>
  );
};
