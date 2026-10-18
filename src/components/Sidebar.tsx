import React from 'react';
import { ModuleType } from '../types';
import {
  LayoutDashboard,
  Newspaper,
  ShieldAlert,
  Zap,
  MessageSquareText,
} from 'lucide-react';

interface SidebarProps {
  activeModule: ModuleType;
  onSelectModule: (module: ModuleType) => void;
  openStrategiesCount?: number;
}

interface NavItem {
  id: ModuleType;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
  googleColor: string;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'command-centre',
    label: 'Command Centre',
    sublabel: 'Executive metrics & stores',
    icon: LayoutDashboard,
    googleColor: '#4285F4', // Google Blue
  },
  {
    id: 'intelligence-hub',
    label: 'Intelligence Hub',
    sublabel: 'Daily news brief',
    icon: Newspaper,
    googleColor: '#EA4335', // Google Red
    badge: '8 briefs',
  },
  {
    id: 'radar',
    label: 'Risk & Opportunity Radar',
    sublabel: 'Decisions & action turn',
    icon: ShieldAlert,
    googleColor: '#FBBC05', // Google Yellow
    badge: '5R • 3O',
  },
  {
    id: 'cockpit',
    label: 'Action Cockpit',
    sublabel: 'Autonomous execution split',
    icon: Zap,
    googleColor: '#34A853', // Google Green
  },
  {
    id: 'talk-data',
    label: 'Talk to Data',
    sublabel: 'Connected Gemini assistant',
    icon: MessageSquareText,
    googleColor: '#4285F4', // Google Blue
    badge: 'Gemini AI',
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  onSelectModule,
  openStrategiesCount = 4,
}) => {
  return (
    <aside className="w-full md:w-64 lg:w-72 shrink-0 bg-white/80 backdrop-blur-md border-r border-slate-200/90 flex flex-col p-3 sm:p-4 gap-1.5 self-stretch">
      <div className="px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
        Executive Modules
      </div>

      <nav className="flex flex-col gap-1.5 flex-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activeModule === item.id;
          const Icon = item.icon;
          const displayBadge =
            item.id === 'cockpit' ? `${openStrategiesCount} open` : item.badge;

          return (
            <button
              key={item.id}
              onClick={() => onSelectModule(item.id)}
              className={`group relative text-left w-full p-3 rounded-2xl flex items-center gap-3.5 transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-slate-50 border border-slate-200 shadow-sm text-slate-900 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent'
              }`}
            >
              {/* Google colored active left vertical tab */}
              {isActive && (
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-r-full shadow-sm"
                  style={{ backgroundColor: item.googleColor }}
                ></div>
              )}

              <div
                className={`p-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'text-white shadow-md'
                    : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-800'
                }`}
                style={isActive ? { backgroundColor: item.googleColor } : {}}
              >
                <Icon className="w-5 h-5 shrink-0" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold truncate leading-tight">
                    {item.label}
                  </span>
                  {displayBadge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-slate-100 text-slate-800'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                      }`}
                    >
                      {displayBadge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  {item.sublabel}
                </p>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Autonomous AI engine status card with Google quad-dots */}
      <div className="mt-auto p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/90 text-xs text-slate-600">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC05]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]"></span>
            </div>
            <span className="font-extrabold text-slate-900 text-[11px] uppercase tracking-wide">
              GemInsight Engine
            </span>
          </div>
          <span className="text-[10px] font-bold text-[#34A853] bg-emerald-50 px-1.5 py-0.5 rounded-md">
            Active
          </span>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-500">
          Continuous AI intelligence correlation across 284 store POS feeds, enterprise ledgers, and market indices.
        </p>
      </div>
    </aside>
  );
};
