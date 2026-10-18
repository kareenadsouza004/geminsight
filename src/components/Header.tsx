import React, { useState, useEffect } from 'react';
import { PersonaType } from '../types';
import { ChevronDown, Check, Sparkles, Database } from 'lucide-react';

interface HeaderProps {
  currentPersona: PersonaType;
  onPersonaChange: (persona: PersonaType) => void;
}

const PERSONAS: PersonaType[] = [
  'Chief Executive Officer (CEO)',
  'Chief Financial Officer (CFO)',
  'Chief People Officer (CHRO)',
  'Chief Digital & Technology Officer (CDTO)',
  'Chief Operations & Supply Chain Officer (COSO)',
];

export const Header: React.FC<HeaderProps> = ({ currentPersona, onPersonaChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Google Quad-color strip */}
      <div className="h-1 w-full flex">
        <div className="h-full flex-1 bg-[#4285F4]"></div>
        <div className="h-full flex-1 bg-[#EA4335]"></div>
        <div className="h-full flex-1 bg-[#FBBC05]"></div>
        <div className="h-full flex-1 bg-[#34A853]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand with Google 4-color dots & Retail Sub-badge */}
          <div className="flex items-center space-x-3.5">
            {/* Google-inspired emblem */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-white border border-slate-200 shadow-md">
              <div className="grid grid-cols-2 gap-1 p-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#4285F4]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#EA4335]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#34A853]"></div>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  Gem<span className="text-[#4285F4]">In</span><span className="text-[#EA4335]">si</span><span className="text-[#FBBC05]">gh</span><span className="text-[#34A853]">t</span>
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full bg-blue-50 text-[#4285F4] border border-blue-200">
                  AI Autonomous
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500">
                The ArKitects Pvt. Ltd. • Retail Electronics & Appliances
              </p>
            </div>
          </div>

          {/* Center / Right: Live indicator & Persona Selector */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Live Indicator with Google Green */}
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#34A853] text-xs font-bold shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34A853] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34A853]"></span>
              </span>
              <span>Live</span>
              <span className="text-slate-600 font-mono text-[11px] font-medium">
                {currentTime || '09:42:15'}
              </span>
            </div>

            {/* Cloud Firestore Persistence Indicator */}
            <div
              className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#4285F4] text-xs font-bold shadow-xs"
              title="Cloud Firestore is actively persisting strategies, progress, and chat history"
            >
              <Database className="w-3.5 h-3.5 text-[#4285F4]" />
              <span>Firestore Active</span>
            </div>

            {/* Persona Dropdown (NO CUTOFFS - full title visible) */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100/90 text-slate-900 font-bold text-xs sm:text-sm border border-slate-200 shadow-xs transition-all duration-200 cursor-pointer"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#4285F4]"></div>
                <span className="whitespace-nowrap">{currentPersona}</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDropdownOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-slate-200 shadow-2xl z-50 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 flex items-center justify-between">
                      <span>Select Executive Role</span>
                      <span className="text-[#4285F4]">5 Portfolios</span>
                    </div>
                    {PERSONAS.map((persona) => {
                      const isSelected = persona === currentPersona;
                      return (
                        <button
                          key={persona}
                          onClick={() => {
                            onPersonaChange(persona);
                            setDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 text-xs font-semibold flex items-center justify-between transition-colors ${
                            isSelected
                              ? 'bg-blue-50/80 text-[#4285F4] font-bold'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#4285F4]' : 'bg-slate-300'}`}></span>
                            <span>{persona}</span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-[#4285F4] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
