import React, { useState } from 'react';
import { ContactPerson } from '../types';
import { CallingModal } from './CallingModal';
import { EmailModal } from './EmailModal';
import {
  X,
  ShieldCheck,
  Phone,
  Mail,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Sparkles,
} from 'lucide-react';

export interface MidDashboardDetail {
  categoryTitle: string;
  itemLabel: string;
  itemValue: string;
  itemColor?: string;
  breakdownTitle: string;
  breakdownItems: {
    label: string;
    value: string;
    subtext?: string;
    status?: 'good' | 'warning' | 'neutral';
  }[];
  contactPerson: ContactPerson;
}

interface MidDashboardModalProps {
  detail: MidDashboardDetail | null;
  onClose: () => void;
}

export const MidDashboardModal: React.FC<MidDashboardModalProps> = ({
  detail,
  onClose,
}) => {
  const [callingContact, setCallingContact] = useState(false);
  const [emailingContact, setEmailingContact] = useState(false);

  if (!detail) return null;

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
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-[#4285F4] border border-blue-200">
                  {detail.categoryTitle}
                </span>
                <span className="text-xs text-slate-400 font-semibold">• Live AI Index Drilldown</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight mt-1">
                {detail.itemLabel}: <span style={{ color: detail.itemColor || '#4285F4' }}>{detail.itemValue}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {detail.breakdownTitle}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-4 flex-1">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              Granular Operational Breakdown
            </div>

            <div className="space-y-2.5">
              {detail.breakdownItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-[#4285F4]/40 flex items-center justify-between gap-3 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-700 shrink-0">
                      {idx + 1}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-bold text-slate-800 break-words">
                        {item.label}
                      </div>
                      {item.subtext && (
                        <div className="text-[11px] text-slate-500 mt-0.5 break-words">
                          {item.subtext}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs sm:text-sm font-black text-slate-900">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Person Section */}
            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50/50 via-slate-50 to-emerald-50/40 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#34A853]" />
                  Operational Lead for this Index
                </span>
                <span className="text-[10px] font-bold text-[#4285F4]">Direct Profile</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#4285F4] text-white flex items-center justify-center font-bold text-sm shadow-md">
                    {detail.contactPerson.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-slate-900">
                      {detail.contactPerson.name}
                    </h5>
                    <p className="text-xs font-semibold text-[#4285F4]">
                      {detail.contactPerson.role} • {detail.contactPerson.department}
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {detail.contactPerson.phone} • {detail.contactPerson.email}
                    </p>
                  </div>
                </div>

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
                    <span>Email Lead</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Ringing Calling Modal */}
      {callingContact && (
        <CallingModal
          contact={detail.contactPerson}
          itemTitle={`${detail.categoryTitle} - ${detail.itemLabel}`}
          onClose={() => setCallingContact(false)}
        />
      )}

      {/* Email Modal */}
      {emailingContact && (
        <EmailModal
          contact={detail.contactPerson}
          defaultSubject={`Operational Query: ${detail.categoryTitle} (${detail.itemLabel})`}
          defaultBody={`Please share the latest store breakdown and action plan for "${detail.itemLabel}" currently tracking at ${detail.itemValue}.`}
          onClose={() => setEmailingContact(false)}
        />
      )}
    </>
  );
};
