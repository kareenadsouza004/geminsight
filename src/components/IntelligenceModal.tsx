import React, { useState } from 'react';
import { IntelligenceItem } from '../types';
import { CallingModal } from './CallingModal';
import { EmailModal } from './EmailModal';
import {
  X,
  Clock,
  Phone,
  Mail,
  Building2,
  FileText,
  TrendingUp,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface IntelligenceModalProps {
  item: IntelligenceItem | null;
  onClose: () => void;
}

export const IntelligenceModal: React.FC<IntelligenceModalProps> = ({ item, onClose }) => {
  const [callingContact, setCallingContact] = useState(false);
  const [emailingContact, setEmailingContact] = useState(false);

  if (!item) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
        <div className="fixed inset-0" onClick={onClose}></div>

        <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
          {/* Top Google Colors Bar */}
          <div className="h-1.5 w-full flex">
            <div className="h-full flex-1 bg-[#4285F4]"></div>
            <div className="h-full flex-1 bg-[#EA4335]"></div>
            <div className="h-full flex-1 bg-[#FBBC05]"></div>
            <div className="h-full flex-1 bg-[#34A853]"></div>
          </div>

          {/* Header */}
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-50 text-[#EA4335] border border-red-200">
                  Strategic Briefing Dossier
                </span>
                <span className="text-xs text-slate-500 font-bold">• {item.source}</span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.timeAgo}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug mt-1 break-words">
                {item.headline}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body with Expanded Details */}
          <div className="p-6 overflow-y-auto space-y-4 flex-1">
            {/* One-liner Executive Summary */}
            <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200 text-xs font-semibold text-slate-800 leading-relaxed">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#4285F4] mb-1">
                Executive Takeaway:
              </div>
              {item.oneLiner}
            </div>

            {/* In-depth Detailed Background */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Detailed Intelligence Report
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                {item.fullDetail}
              </p>
            </div>

            {/* Key Metrics Grid */}
            {item.inDepthReport && (
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Key Operational Metrics
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {item.inDepthReport.keyMetrics.map((km, kIdx) => (
                    <div
                      key={kIdx}
                      className="p-3 rounded-xl bg-white border border-slate-200 text-center"
                    >
                      <div className="text-[10px] text-slate-500 font-semibold break-words">
                        {km.label}
                      </div>
                      <div className="text-sm font-black text-slate-900 mt-1">
                        {km.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Affected Stores & Executive Recommendation */}
            {item.inDepthReport && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Scope of Impact:
                  </span>
                  <p className="text-slate-800 font-medium">
                    {item.inDepthReport.affectedStoresOrDepts}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#34A853] block">
                    Recommended Course:
                  </span>
                  <p className="text-slate-800 font-medium">
                    {item.inDepthReport.executiveRecommendation}
                  </p>
                </div>
              </div>
            )}

            {/* SUPER DETAILED CONTACT PERSON SECTION (Requirement 4 & 5) */}
            <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#34A853]" />
                  Information Owner & Primary Contact
                </span>
                <span className="text-[10px] font-bold text-slate-400">
                  Direct Line Verified
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#4285F4] to-[#EA4335] text-white flex items-center justify-center font-bold text-sm shadow-md">
                    {item.contactPerson.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-slate-900">
                      {item.contactPerson.name}
                    </h5>
                    <p className="text-xs font-semibold text-[#4285F4]">
                      {item.contactPerson.role} • {item.contactPerson.department}
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {item.contactPerson.phone} • {item.contactPerson.email}
                    </p>
                  </div>
                </div>

                {/* Call and Email Options */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCallingContact(true)}
                    className="px-3.5 py-2 rounded-xl bg-[#34A853] hover:bg-green-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm shadow-green-500/20 transition-all cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Direct</span>
                  </button>

                  <button
                    onClick={() => setEmailingContact(true)}
                    className="px-3.5 py-2 rounded-xl bg-[#4285F4] hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm shadow-blue-500/20 transition-all cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send Email</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Verified through enterprise news and internal ERP feeds.</span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors shadow-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Ringing Calling Modal */}
      {callingContact && (
        <CallingModal
          contact={item.contactPerson}
          itemTitle={item.headline}
          onClose={() => setCallingContact(false)}
        />
      )}

      {/* Email Modal */}
      {emailingContact && (
        <EmailModal
          contact={item.contactPerson}
          defaultSubject={`Inquiry on: ${item.headline}`}
          defaultBody={`Regarding the recent update on "${item.headline}": please share the latest execution report and store numbers.`}
          onClose={() => setEmailingContact(false)}
        />
      )}
    </>
  );
};
