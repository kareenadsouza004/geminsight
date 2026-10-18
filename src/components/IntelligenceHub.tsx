import React, { useState } from 'react';
import { PersonaType, TagSentiment, IntelligenceItem } from '../types';
import { PERSONA_DATA } from '../data/personaData';
import { IntelligenceModal } from './IntelligenceModal';
import {
  Newspaper,
  Clock,
  Radio,
  ExternalLink,
  ChevronRight,
  User,
} from 'lucide-react';

interface IntelligenceHubProps {
  currentPersona: PersonaType;
}

export const IntelligenceHub: React.FC<IntelligenceHubProps> = ({ currentPersona }) => {
  const dataBundle = PERSONA_DATA[currentPersona];
  // Pop-up modal state on card click (Requirement 4)
  const [selectedItem, setSelectedItem] = useState<IntelligenceItem | null>(null);

  const getTagBadge = (tag: TagSentiment) => {
    switch (tag) {
      case 'Good':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#34A853] border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]"></span>
            Good
          </span>
        );
      case 'OK':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-50 text-[#FBBC05] border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC05]"></span>
            OK
          </span>
        );
      case 'Bad':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-rose-50 text-[#EA4335] border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]"></span>
            Bad
          </span>
        );
    }
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Intelligence Hub
            </h1>
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-50 text-[#EA4335] border border-red-200">
              Daily news brief
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            8 strategic briefings for {currentPersona}. Click any card to open the complete intelligence dossier with contact options.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs text-slate-700">
          <Radio className="w-3.5 h-3.5 text-[#4285F4] animate-pulse" />
          <span>Real-time news & internal signals filtered</span>
        </div>
      </div>

      {/* 8 News-Style Briefings Laid Out Horizontally in a multi-row news feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dataBundle.intelligence.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="cursor-pointer rounded-2xl p-4 bg-white/95 border border-slate-200 shadow-xs hover:shadow-md hover:border-[#4285F4]/50 transition-all duration-200 flex flex-col justify-between group min-h-[220px]"
          >
            {/* Top Meta: Source + Time + Tag */}
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] font-black text-slate-800 break-words" title={item.source}>
                    {item.source}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                    <Clock className="w-3 h-3 shrink-0" />
                    {item.timeAgo}
                  </span>
                </div>
                <div className="shrink-0">{getTagBadge(item.tag)}</div>
              </div>

              {/* Headline: 8-10 words in plain English (NO CUTOFFS) */}
              <h3 className="text-sm font-black text-slate-900 leading-snug tracking-tight mb-2 group-hover:text-[#4285F4] transition-colors break-words">
                {item.headline}
              </h3>

              {/* One sentence below it */}
              <p className="text-xs text-slate-600 leading-relaxed font-normal break-words">
                {item.oneLiner}
              </p>
            </div>

            {/* Bottom Meta & Click Affordance */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#4285F4]">
              <div className="flex items-center gap-1.5 text-slate-500 font-semibold text-[10px] truncate max-w-[150px]">
                <User className="w-3 h-3 text-[#34A853] shrink-0" />
                <span className="truncate">{item.contactPerson.name}</span>
              </div>
              <div className="flex items-center gap-0.5 shrink-0">
                <span>View dossier</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Intelligence summary footer */}
      <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 text-xs text-slate-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-[#4285F4] shrink-0" />
          <span>
            Daily intelligence brief compiled automatically from 42 internal SAP and communication systems plus 6 external market reports.
          </span>
        </div>
        <span className="text-[11px] font-bold text-slate-700 whitespace-nowrap">
          Next AI digest: 12:00 PM
        </span>
      </div>

      {/* Pop-up modal with way more details, contact info, and Call (ringing) / Email options (Requirement 4) */}
      <IntelligenceModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};
