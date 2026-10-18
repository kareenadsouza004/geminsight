import React, { useState } from 'react';
import { KPICardData } from '../types';
import { CallingModal } from './CallingModal';
import { EmailModal } from './EmailModal';
import {
  X,
  TrendingUp,
  TrendingDown,
  Phone,
  Mail,
  User,
  ShieldCheck,
  Building2,
  Info,
  Target,
  Award,
} from 'lucide-react';

interface KPIDetailModalProps {
  card: KPICardData | null;
  onClose: () => void;
}

export const KPIDetailModal: React.FC<KPIDetailModalProps> = ({ card, onClose }) => {
  const [callingContact, setCallingContact] = useState<boolean>(false);
  const [emailingContact, setEmailingContact] = useState<boolean>(false);

  if (!card) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
        <div className="fixed inset-0" onClick={onClose}></div>

        <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
          {/* Google Color Accent Header Strip */}
          <div className="h-1.5 w-full flex">
            <div className="h-full flex-1 bg-[#4285F4]"></div>
            <div className="h-full flex-1 bg-[#EA4335]"></div>
            <div className="h-full flex-1 bg-[#FBBC05]"></div>
            <div className="h-full flex-1 bg-[#34A853]"></div>
          </div>

          {/* Header */}
          <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-100 flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-[#4285F4] border border-blue-200">
                  Leadership KPI Deep Dive
                </span>
                <span className="text-xs text-slate-400">• Real-time company aggregate</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                {card.detailTitle}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {card.detailDescription}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current Stat Bar */}
          <div className="px-6 py-3 bg-white border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-slate-500 font-semibold">{card.title}:</span>
              <span className="text-2xl font-black text-slate-900">{card.value}</span>
              {card.unit && <span className="text-xs text-slate-500 font-medium">({card.unit})</span>}
            </div>
            <div className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${
              card.trendPositive ? 'bg-emerald-50 text-[#34A853] border border-emerald-200' : 'bg-rose-50 text-[#EA4335] border border-rose-200'
            }`}>
              {card.trendPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              <span>{card.trend}</span>
            </div>
          </div>

          {/* Industry Benchmark Banner */}
          {card.industryBenchmark && (
            <div className="px-6 py-3 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-50 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white border border-blue-200 text-[#4285F4] shadow-xs">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                      Industry Benchmark Standard
                    </span>
                    {card.industryBenchmark.benchmarkSource && (
                      <span className="text-[10px] text-slate-400 font-medium">
                        • {card.industryBenchmark.benchmarkSource}
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-base font-black text-slate-900 font-mono">
                      {card.industryBenchmark.value}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Retail Industry Average</span>
                  </div>
                </div>
              </div>

              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs shadow-xs self-start sm:self-auto ${
                card.industryBenchmark.isBeatingBenchmark
                  ? 'bg-emerald-100 text-[#34A853] border border-emerald-200'
                  : 'bg-amber-100 text-[#FBBC05] border border-amber-200'
              }`}>
                <Award className="w-3.5 h-3.5 shrink-0" />
                <span>{card.industryBenchmark.comparisonText}</span>
              </div>
            </div>
          )}

          {/* Detailed Breakdown List */}
          <div className="p-6 overflow-y-auto space-y-3 flex-1">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
              Detailed Component Split & Ranks
            </div>
            {card.detailItems.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-[#4285F4]/50 hover:bg-blue-50/10 transition-all flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-700 shrink-0">
                    {idx + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs sm:text-sm font-bold text-slate-800 break-words">
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.badge.includes('Top') ? 'bg-emerald-100 text-[#34A853]' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {item.subtext && (
                      <p className="text-xs text-slate-500 mt-0.5 break-words">
                        {item.subtext}
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className={`text-xs sm:text-sm font-extrabold ${
                    item.isPositive === true
                      ? 'text-[#34A853]'
                      : item.isPositive === false
                      ? 'text-[#EA4335]'
                      : 'text-slate-900'
                  }`}>
                    {item.value}
                  </span>
                </div>
              </div>
            ))}

            {/* SUPER DETAILED EXECUTIVE CONTACT SECTION (Requirement 5) */}
            <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-blue-50/60 via-indigo-50/40 to-slate-50 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#4285F4] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4285F4]" />
                  Designated Executive Lead for this KPI
                </span>
                <span className="text-[10px] font-bold text-slate-500">Verified Corporate Profile</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#4285F4] text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/20">
                    {card.leadContact.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-slate-900">
                      {card.leadContact.name}
                    </h4>
                    <p className="text-xs font-semibold text-[#4285F4]">
                      {card.leadContact.role} • {card.leadContact.department}
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {card.leadContact.phone} • {card.leadContact.email}
                    </p>
                  </div>
                </div>

                {/* Interactive Call & Email buttons */}
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

          {/* Footer note */}
          <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#4285F4] shrink-0" />
              <span>Real-time connected from enterprise data streams.</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors shadow-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Ringing Call Modal */}
      {callingContact && (
        <CallingModal
          contact={card.leadContact}
          itemTitle={card.title}
          onClose={() => setCallingContact(false)}
        />
      )}

      {/* Interactive Email Modal */}
      {emailingContact && (
        <EmailModal
          contact={card.leadContact}
          defaultSubject={`Executive Query regarding ${card.title} (${card.value})`}
          defaultBody={`Please share the latest update and mitigation plan for ${card.title}.`}
          onClose={() => setEmailingContact(false)}
        />
      )}
    </>
  );
};
