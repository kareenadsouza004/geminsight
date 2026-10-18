import React, { useState } from 'react';
import { ContactPerson } from '../types';
import { Mail, Send, X, CheckCircle2, User, Sparkles } from 'lucide-react';

interface EmailModalProps {
  contact: ContactPerson | null;
  defaultSubject?: string;
  defaultBody?: string;
  onClose: () => void;
}

export const EmailModal: React.FC<EmailModalProps> = ({
  contact,
  defaultSubject = '',
  defaultBody = '',
  onClose,
}) => {
  const [subject, setSubject] = useState(defaultSubject);
  const [body, setBody] = useState(
    defaultBody ||
      `Please provide an urgent status update and mitigation steps regarding this matter.`
  );
  const [isSent, setIsSent] = useState(false);

  if (!contact) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose}></div>

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Google Color Accent Header Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 flex">
          <div className="h-full flex-1 bg-[#4285F4]"></div>
          <div className="h-full flex-1 bg-[#EA4335]"></div>
          <div className="h-full flex-1 bg-[#FBBC05]"></div>
          <div className="h-full flex-1 bg-[#34A853]"></div>
        </div>

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between mt-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-50 text-[#4285F4]">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Send Direct Leadership Note
              </h3>
              <p className="text-[11px] text-slate-500">
                Connected via Google Workspace Executive Bridge
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSent ? (
          <div className="p-8 text-center space-y-3 animate-in zoom-in-95">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 text-[#34A853] flex items-center justify-center border-2 border-emerald-200">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-base font-black text-slate-900">
              Email Delivered Successfully
            </h4>
            <p className="text-xs text-slate-600">
              Dispatched with High Priority tag to <span className="font-semibold text-slate-800">{contact.name}</span> ({contact.email}).
            </p>
          </div>
        ) : (
          <form onSubmit={handleSend} className="p-6 space-y-4">
            {/* Recipient Details Pill */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#4285F4] text-white flex items-center justify-center font-bold text-xs">
                  {contact.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{contact.name}</div>
                  <div className="text-[11px] text-slate-500">
                    {contact.role} • {contact.email}
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#4285F4] border border-blue-200">
                {contact.department}
              </span>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Subject:
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#4285F4]/50 text-slate-800 font-semibold"
                placeholder="Subject line..."
                required
              />
            </div>

            {/* Body */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Message:
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={4}
                className="w-full p-3 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#4285F4]/50 text-slate-800 leading-relaxed"
                placeholder="Type your message..."
                required
              />
            </div>

            {/* Footer Buttons */}
            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#4285F4] hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Priority Note</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
