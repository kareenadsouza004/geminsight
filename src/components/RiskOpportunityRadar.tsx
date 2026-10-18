import React, { useState, useMemo } from 'react';
import {
  PersonaType,
  RadarItem,
  StrategyItem,
  PriorityLevel,
} from '../types';
import { PERSONA_DATA } from '../data/personaData';
import { CallingModal } from './CallingModal';
import { EmailModal } from './EmailModal';
import {
  AlertTriangle,
  Lightbulb,
  Phone,
  Mail,
  Zap,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  FileText,
  Clock,
  Edit3,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  ChevronsUpDown,
  FolderKanban,
  Layers,
  User,
} from 'lucide-react';

interface RiskOpportunityRadarProps {
  currentPersona: PersonaType;
  onNavigateToCockpit: (newStrategy?: StrategyItem) => void;
}

export const RiskOpportunityRadar: React.FC<RiskOpportunityRadarProps> = ({
  currentPersona,
  onNavigateToCockpit,
}) => {
  const dataBundle = PERSONA_DATA[currentPersona];

  // Group risks into high-level categories/buckets
  const riskCategories = useMemo(() => {
    const map = new Map<string, RadarItem[]>();
    dataBundle.risks.forEach((item) => {
      const cat = item.category || 'Operational Risk';
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(item);
    });
    return Array.from(map.entries()).map(([category, items]) => ({
      category,
      items,
      criticalCount: items.filter((i) => i.priority === 'Critical').length,
    }));
  }, [dataBundle.risks]);

  // Group opportunities into high-level categories/buckets
  const opportunityCategories = useMemo(() => {
    const map = new Map<string, RadarItem[]>();
    dataBundle.opportunities.forEach((item) => {
      const cat = item.category || 'Strategic Growth';
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(item);
    });
    return Array.from(map.entries()).map(([category, items]) => ({
      category,
      items,
    }));
  }, [dataBundle.opportunities]);

  // Collapsible state for each bucket (by default all open)
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (key: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const collapseAll = () => {
    const all: Record<string, boolean> = {};
    riskCategories.forEach((r) => { all[`risk-${r.category}`] = true; });
    opportunityCategories.forEach((o) => { all[`opp-${o.category}`] = true; });
    setCollapsedCategories(all);
  };

  const expandAll = () => {
    setCollapsedCategories({});
  };

  // Source inspection modal
  const [activeSourceItem, setActiveSourceItem] = useState<RadarItem | null>(null);

  // Turn into action interactive workflow state
  const [actionItem, setActionItem] = useState<RadarItem | null>(null);
  const [selectedSolutionIndex, setSelectedSolutionIndex] = useState<number>(0);
  const [editedPlanText, setEditedPlanText] = useState<string>('');
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [isRejected, setIsRejected] = useState<boolean>(false);

  // Calling & Email modals state
  const [callingContact, setCallingContact] = useState<RadarItem['contactPerson'] | null>(null);
  const [emailingContact, setEmailingContact] = useState<RadarItem['contactPerson'] | null>(null);

  // Priority badge styling using Google colors
  const getPriorityBadge = (priority: PriorityLevel) => {
    switch (priority) {
      case 'Critical':
        return (
          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-50 text-[#EA4335] border border-rose-200">
            Critical
          </span>
        );
      case 'Medium':
        return (
          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-[#FBBC05] border border-amber-200">
            Medium
          </span>
        );
      case 'Low':
        return (
          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#34A853] border border-emerald-200">
            Low
          </span>
        );
    }
  };

  const handleOpenSource = (item: RadarItem) => {
    setActiveSourceItem(item);
  };

  const startTurnIntoAction = (item: RadarItem) => {
    setActionItem(item);
    setSelectedSolutionIndex(0);
    setEditedPlanText(
      `Approve ${item.recommendedSolutions[0]} and monitor store impact daily.`
    );
    setIsApproved(false);
    setIsRejected(false);
    setActiveSourceItem(null); // Close source modal
  };

  const handleApprove = () => {
    setIsApproved(true);
    setIsRejected(false);
  };

  const handleReject = () => {
    setIsRejected(true);
    setIsApproved(false);
  };

  const handleOpenInCockpit = () => {
    if (!actionItem) return;

    const chosenSolution = actionItem.recommendedSolutions[selectedSolutionIndex];
    // Create new strategy item for Action Cockpit
    const newStrategy: StrategyItem = {
      id: `strat-custom-${Date.now()}`,
      headline: actionItem.headline,
      twoSentenceDetail: editedPlanText || actionItem.description,
      tag: actionItem.type === 'opportunity' ? 'Good' : 'OK',
      percentCompleted: 15,
      actions: [
        {
          id: `act-auto-1`,
          header: 'Initialize automated solution routing',
          bullet1: chosenSolution,
          bullet2: 'Configured parameters in enterprise orchestrator',
          assignedTo: 'StrategyRouting AI',
          isAI: true,
          status: 'Done',
          progress: 100,
        },
        {
          id: `act-auto-2`,
          header: 'Notify relevant department teams and regional leads',
          bullet1: 'Dispatched automated action brief via Teams and email',
          bullet2: 'Scheduled daily 09:00 AM progress tracking checkpoint',
          assignedTo: 'CommSync Agent',
          isAI: true,
          status: 'In progress',
          progress: 50,
        },
        {
          id: `act-auto-3`,
          header: 'Review live implementation and sign final operational sign-off',
          bullet1: 'Verify store floor execution and physical inventory checks',
          bullet2: 'Confirm results against financial targets',
          assignedTo: actionItem.contactPerson.name,
          isAI: false,
          status: 'Waiting',
          progress: 10,
        },
      ],
    };

    onNavigateToCockpit(newStrategy);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Risk & Opportunity Radar
            </h1>
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-[#FBBC05] border border-amber-200">
              Interactive Decisions
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            5 risks and 3 opportunities for {currentPersona}. Click any card to inspect evidence, contact the owner, or turn into action.
          </p>
        </div>

        <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 flex items-center gap-2 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#4285F4]" />
          <span>Click any card for contact & action options</span>
        </div>
      </div>

      {/* Category Buckets Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:px-4 rounded-2xl bg-white/95 border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-xl bg-blue-50 text-[#4285F4] border border-blue-200/60">
            <FolderKanban className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-600">
            <span className="font-bold text-slate-800">Categorized Radar Buckets:</span>{' '}
            <span className="font-extrabold text-[#EA4335]">{riskCategories.length} Risk Categories</span> •{' '}
            <span className="font-extrabold text-[#34A853]">{opportunityCategories.length} Opportunity Categories</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={expandAll}
            className="px-3 py-1 text-xs font-bold rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Expand All
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="px-3 py-1 text-xs font-bold rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Two Columns: 5 Risks (Left) & 3 Opportunities (Right) Bucketized */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LEFT COLUMN: 5 RISKS (7 cols) */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-md bg-rose-100 text-[#EA4335]">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                Active Risks ({dataBundle.risks.length})
              </h2>
            </div>
            <span className="text-[11px] text-slate-500 font-semibold">
              Grouped into Collapsible Buckets
            </span>
          </div>

          <div className="space-y-3.5">
            {riskCategories.map((bucket) => {
              const catKey = `risk-${bucket.category}`;
              const isCollapsed = !!collapsedCategories[catKey];

              return (
                <div
                  key={bucket.category}
                  className="rounded-2xl border border-slate-200/90 bg-white/95 shadow-xs overflow-hidden transition-all"
                >
                  {/* Category Bucket Header - Collapsible Toggle */}
                  <button
                    type="button"
                    onClick={() => toggleCategory(catKey)}
                    className="w-full px-4 py-3 bg-slate-50/90 hover:bg-slate-100/80 border-b border-slate-200/60 flex items-center justify-between transition-colors text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-1.5 rounded-lg bg-rose-50 text-[#EA4335] border border-rose-200/80 shrink-0">
                        <FolderKanban className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black text-slate-900 tracking-tight group-hover:text-[#EA4335] transition-colors">
                          {bucket.category}
                        </span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                          {bucket.items.length} {bucket.items.length === 1 ? 'risk' : 'risks'}
                        </span>
                        {bucket.criticalCount > 0 && (
                          <span className="text-[10px] font-extrabold px-2 py-0.2 rounded-full bg-rose-100 text-[#EA4335] border border-rose-200">
                            {bucket.criticalCount} Critical
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-400 group-hover:text-slate-700 transition-colors shrink-0">
                      <span className="text-[10px] font-bold hidden sm:inline">
                        {isCollapsed ? 'Expand' : 'Collapse'}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isCollapsed ? '-rotate-90 text-slate-400' : 'rotate-0 text-slate-600'
                        }`}
                      />
                    </div>
                  </button>

                  {/* Category Items */}
                  {!isCollapsed && (
                    <div className="p-3 space-y-3 bg-slate-50/30">
                      {bucket.items.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleOpenSource(item)}
                          onDoubleClick={() => handleOpenSource(item)}
                          className="group cursor-pointer p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-[#EA4335]/50 border-l-4 border-l-[#EA4335] relative transition-all"
                        >
                          <div className="flex items-start justify-between gap-3 mb-1.5">
                            <h3 className="text-sm font-black text-slate-900 group-hover:text-[#EA4335] transition-colors break-words">
                              {item.headline}
                            </h3>
                            <div className="shrink-0">{getPriorityBadge(item.priority)}</div>
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed font-normal break-words">
                            {item.description}
                          </p>

                          {/* Footer with contact preview (NO CUTOFFS) */}
                          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                            <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                              <User className="w-3.5 h-3.5 text-[#4285F4] shrink-0" />
                              <span>Contact: {item.contactPerson.name}</span>
                            </div>
                            <span className="text-[#EA4335] font-extrabold text-[10px] uppercase tracking-wide flex items-center gap-0.5">
                              <span>Inspect & Contact</span>
                              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: 3 OPPORTUNITIES (5 cols) */}
        <div className="lg:col-span-5 space-y-3.5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-md bg-emerald-100 text-[#34A853]">
                <Lightbulb className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                Identified Opportunities ({dataBundle.opportunities.length})
              </h2>
            </div>
            <span className="text-[11px] text-slate-500 font-semibold">
              Grouped into Collapsible Buckets
            </span>
          </div>

          <div className="space-y-3.5">
            {opportunityCategories.map((bucket) => {
              const catKey = `opp-${bucket.category}`;
              const isCollapsed = !!collapsedCategories[catKey];

              return (
                <div
                  key={bucket.category}
                  className="rounded-2xl border border-slate-200/90 bg-white/95 shadow-xs overflow-hidden transition-all"
                >
                  {/* Category Bucket Header - Collapsible Toggle */}
                  <button
                    type="button"
                    onClick={() => toggleCategory(catKey)}
                    className="w-full px-4 py-3 bg-slate-50/90 hover:bg-slate-100/80 border-b border-slate-200/60 flex items-center justify-between transition-colors text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-1.5 rounded-lg bg-emerald-50 text-[#34A853] border border-emerald-200/80 shrink-0">
                        <FolderKanban className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black text-slate-900 tracking-tight group-hover:text-[#34A853] transition-colors">
                          {bucket.category}
                        </span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                          {bucket.items.length} {bucket.items.length === 1 ? 'opp' : 'opps'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-400 group-hover:text-slate-700 transition-colors shrink-0">
                      <span className="text-[10px] font-bold hidden sm:inline">
                        {isCollapsed ? 'Expand' : 'Collapse'}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isCollapsed ? '-rotate-90 text-slate-400' : 'rotate-0 text-slate-600'
                        }`}
                      />
                    </div>
                  </button>

                  {/* Category Items */}
                  {!isCollapsed && (
                    <div className="p-3 space-y-3 bg-slate-50/30">
                      {bucket.items.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleOpenSource(item)}
                          onDoubleClick={() => handleOpenSource(item)}
                          className="group cursor-pointer p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-[#34A853]/50 border-l-4 border-l-[#34A853] relative transition-all"
                        >
                          <div className="flex items-start justify-between gap-3 mb-1.5">
                            <h3 className="text-sm font-black text-slate-900 group-hover:text-[#34A853] transition-colors break-words">
                              {item.headline}
                            </h3>
                            <div className="shrink-0">{getPriorityBadge(item.priority)}</div>
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed font-normal break-words">
                            {item.description}
                          </p>

                          {/* Footer with contact preview (NO CUTOFFS) */}
                          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                            <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                              <User className="w-3.5 h-3.5 text-[#34A853] shrink-0" />
                              <span>Contact: {item.contactPerson.name}</span>
                            </div>
                            <span className="text-[#34A853] font-extrabold text-[10px] uppercase tracking-wide flex items-center gap-0.5">
                              <span>Inspect & Contact</span>
                              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SUPER DETAILED SOURCE & CONTACT VIEW MODAL (Requirement 5) */}
      {activeSourceItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="fixed inset-0"
            onClick={() => setActiveSourceItem(null)}
          ></div>

          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            {/* Google Color Top Accent Strip */}
            <div className="h-1.5 w-full flex">
              <div className="h-full flex-1 bg-[#4285F4]"></div>
              <div className="h-full flex-1 bg-[#EA4335]"></div>
              <div className="h-full flex-1 bg-[#FBBC05]"></div>
              <div className="h-full flex-1 bg-[#34A853]"></div>
            </div>

            {/* Header */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800">
                    Verified Origin Evidence
                  </span>
                  {activeSourceItem.category && (
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-[#4285F4] border border-blue-200">
                      {activeSourceItem.category}
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3" />
                  {activeSourceItem.sourceDetail.timestamp}
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900 mt-2 break-words leading-snug">
                {activeSourceItem.headline}
              </h3>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                <div className="flex items-center gap-2 font-mono font-bold text-slate-800 break-words">
                  <FileText className="w-4 h-4 text-[#4285F4] shrink-0" />
                  <span>{activeSourceItem.sourceDetail.senderOrDoc}</span>
                </div>
                <p className="text-slate-600 font-mono text-[11px] leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200 break-words">
                  "{activeSourceItem.sourceDetail.preview}"
                </p>
                {activeSourceItem.sourceDetail.metaInfo && (
                  <p className="text-[11px] text-slate-500 italic break-words">
                    {activeSourceItem.sourceDetail.metaInfo}
                  </p>
                )}
              </div>

              {/* SUPER DETAILED CONTACT PERSON CARD (Requirement 5) */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/50 via-slate-50 to-emerald-50/40 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#34A853]" />
                    Designated Responsible Owner
                  </span>
                  <span className="text-[10px] font-bold text-[#4285F4]">Direct Profile</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#4285F4] via-[#EA4335] to-[#FBBC05] text-white flex items-center justify-center font-bold text-sm shadow-md">
                    {activeSourceItem.contactPerson.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">
                      {activeSourceItem.contactPerson.name}
                    </h4>
                    <p className="text-xs font-semibold text-[#4285F4]">
                      {activeSourceItem.contactPerson.role} • {activeSourceItem.contactPerson.department}
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {activeSourceItem.contactPerson.phone} • {activeSourceItem.contactPerson.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Three Mandatory Buttons with Real Calling & Emailing */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  onClick={() => setCallingContact(activeSourceItem.contactPerson)}
                  className="w-full sm:flex-1 py-2.5 px-3 rounded-xl bg-[#34A853] hover:bg-green-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Direct</span>
                </button>

                <button
                  onClick={() => setEmailingContact(activeSourceItem.contactPerson)}
                  className="w-full sm:flex-1 py-2.5 px-3 rounded-xl bg-[#4285F4] hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Email</span>
                </button>

                <button
                  onClick={() => startTurnIntoAction(activeSourceItem)}
                  className="w-full sm:flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-[#FBBC05]" />
                  <span>Turn into action</span>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveSourceItem(null)}
                className="px-4 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TURN INTO ACTION WORKFLOW MODAL */}
      {actionItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="fixed inset-0"
            onClick={() => setActionItem(null)}
          ></div>

          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-blue-200 overflow-hidden z-10 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-5 bg-gradient-to-r from-blue-50 via-slate-50 to-indigo-50/40 border-b border-blue-100 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#4285F4] text-white shadow-xs">
                    Turn Decision into Action
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Autonomous Execution Setup</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 mt-1 break-words">
                  {actionItem.headline}
                </h3>
              </div>
              <button
                onClick={() => setActionItem(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              {/* Step 1: 2 Recommended Solutions */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  1. Choose Recommended Solution:
                </label>
                <div className="space-y-2">
                  {actionItem.recommendedSolutions.map((sol, sIdx) => {
                    const isSelected = selectedSolutionIndex === sIdx;
                    return (
                      <div
                        key={sIdx}
                        onClick={() => {
                          setSelectedSolutionIndex(sIdx);
                          setEditedPlanText(`Execute ${sol}.`);
                          setIsApproved(false);
                        }}
                        className={`cursor-pointer p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'bg-blue-50/80 border-[#4285F4] shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-[#4285F4] bg-[#4285F4] text-white' : 'border-slate-300'
                        }`}>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-bold text-slate-900 block">
                            Option {sIdx + 1}:
                          </span>
                          <span className="text-xs text-slate-700 leading-relaxed break-words">
                            {sol}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Leader Editable Text Box */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5 text-[#4285F4]" />
                    <span>2. Executive Edits & Specific Directives:</span>
                  </label>
                  <span className="text-[10px] text-slate-400">Leader can type changes</span>
                </div>
                <textarea
                  value={editedPlanText}
                  onChange={(e) => {
                    setEditedPlanText(e.target.value);
                    setIsApproved(false);
                  }}
                  rows={3}
                  className="w-full p-3 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#4285F4]/50 leading-relaxed text-slate-800"
                  placeholder="Type any adjustments, priority stores, or timeline changes here..."
                />
              </div>

              {/* Step 3: Approve / Reject Decision Buttons */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleApprove}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isApproved
                        ? 'bg-[#34A853] text-white shadow-md'
                        : 'bg-emerald-50 text-[#34A853] hover:bg-emerald-100 border border-emerald-200'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isApproved ? 'Plan Approved' : 'Approve'}</span>
                  </button>

                  <button
                    onClick={handleReject}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isRejected
                        ? 'bg-[#EA4335] text-white shadow-md'
                        : 'bg-rose-50 text-[#EA4335] hover:bg-rose-100 border border-rose-200'
                    }`}
                  >
                    <XCircle className="w-4 h-4" />
                    <span>{isRejected ? 'Plan Rejected' : 'Reject'}</span>
                  </button>
                </div>

                {isApproved && (
                  <span className="text-xs font-bold text-[#34A853] animate-in fade-in">
                    Ready to deploy into Action Cockpit
                  </span>
                )}
                {isRejected && (
                  <span className="text-xs font-bold text-[#EA4335] animate-in fade-in">
                    Plan discarded by leader.
                  </span>
                )}
              </div>
            </div>

            {/* Footer with "Open in Action Cockpit" */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">
                {isApproved
                  ? 'Plan validated. Deploy to trigger automated AI agent handoffs.'
                  : 'Leader approval required before opening in Action Cockpit.'}
              </span>

              <button
                disabled={!isApproved}
                onClick={handleOpenInCockpit}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition-all ${
                  isApproved
                    ? 'bg-[#4285F4] hover:bg-blue-600 text-white hover:shadow-lg cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Open in Action Cockpit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ringing Calling Modal */}
      {callingContact && (
        <CallingModal
          contact={callingContact}
          itemTitle={activeSourceItem?.headline}
          onClose={() => setCallingContact(null)}
        />
      )}

      {/* Direct Email Modal */}
      {emailingContact && (
        <EmailModal
          contact={emailingContact}
          defaultSubject={`Directive on: ${activeSourceItem?.headline}`}
          defaultBody={`Please prioritize immediate action and provide an update on "${activeSourceItem?.headline}".`}
          onClose={() => setEmailingContact(null)}
        />
      )}
    </div>
  );
};
