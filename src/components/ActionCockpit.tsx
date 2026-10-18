import React, { useState, useEffect } from 'react';
import {
  PersonaType,
  StrategyItem,
  TagSentiment,
  ActionItem,
  ContactPerson,
} from '../types';
import { PERSONA_DATA } from '../data/personaData';
import { CallingModal } from './CallingModal';
import { EmailModal } from './EmailModal';
import {
  subscribeToStrategies,
  updateStrategyProgressInFirestore,
} from '../services/firestoreService';
import {
  Bot,
  User,
  Zap,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Phone,
  Mail,
  Database,
  RefreshCw,
} from 'lucide-react';

interface ActionCockpitProps {
  currentPersona: PersonaType;
  customStrategies: StrategyItem[];
}

export const ActionCockpit: React.FC<ActionCockpitProps> = ({
  currentPersona,
  customStrategies,
}) => {
  // Live strategies loaded directly from Firestore
  const [firestoreStrategies, setFirestoreStrategies] = useState<StrategyItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Subscribe to real-time Firestore strategies
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeToStrategies(currentPersona, (loaded) => {
      setFirestoreStrategies(loaded);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [currentPersona]);

  // Combine live strategies, prioritizing custom additions
  const allStrategies = React.useMemo(() => {
    const combined = [...customStrategies, ...firestoreStrategies];
    const map = new Map<string, StrategyItem>();
    combined.forEach((s) => {
      if (!map.has(s.id)) map.set(s.id, s);
    });
    const result = Array.from(map.values());
    return result.length > 0 ? result.slice(0, 6) : PERSONA_DATA[currentPersona].strategies;
  }, [customStrategies, firestoreStrategies, currentPersona]);

  // Selected strategy
  const [selectedStrategyId, setSelectedStrategyId] = useState<string>(
    allStrategies[0]?.id || ''
  );

  // Placards flipped state
  const [flippedPlacards, setFlippedPlacards] = useState<Record<string, boolean>>({
    [allStrategies[0]?.id || '']: true,
  });

  // Calling & Email modals state for assignee contacts
  const [callingContact, setCallingContact] = useState<ContactPerson | null>(null);
  const [emailingContact, setEmailingContact] = useState<ContactPerson | null>(null);
  const [activeItemTitle, setActiveItemTitle] = useState<string>('');

  // Keep selectedStrategyId valid if persona changes
  useEffect(() => {
    if (allStrategies.length > 0 && !allStrategies.some((s) => s.id === selectedStrategyId)) {
      setSelectedStrategyId(allStrategies[0].id);
      setFlippedPlacards({ [allStrategies[0].id]: true });
    }
  }, [currentPersona, allStrategies]);

  // Live progress bar ticker
  const [progressOffset, setProgressOffset] = useState<number>(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgressOffset((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const selectedStrategy =
    allStrategies.find((s) => s.id === selectedStrategyId) || allStrategies[0];

  const handlePlacardClick = (strategy: StrategyItem) => {
    setSelectedStrategyId(strategy.id);
    setFlippedPlacards((prev) => ({
      ...prev,
      [strategy.id]: !prev[strategy.id],
    }));
  };

  const getTagBadge = (tag: TagSentiment) => {
    switch (tag) {
      case 'Good':
        return (
          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#34A853] border border-emerald-200">
            Good
          </span>
        );
      case 'OK':
        return (
          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-50 text-[#FBBC05] border border-amber-200">
            OK
          </span>
        );
      case 'Bad':
        return (
          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-rose-50 text-[#EA4335] border border-rose-200">
            Bad
          </span>
        );
    }
  };

  const getStatusBadge = (status: ActionItem['status']) => {
    switch (status) {
      case 'Done':
        return (
          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-100 text-[#34A853] flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Done
          </span>
        );
      case 'In progress':
        return (
          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-blue-100 text-[#4285F4] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4] animate-ping"></span>
            In progress
          </span>
        );
      case 'Waiting':
        return (
          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Waiting
          </span>
        );
    }
  };

  const handleToggleActionStatus = async (strategyId: string, actionId: string) => {
    const strat = allStrategies.find((s) => s.id === strategyId);
    if (!strat) return;

    const nextStatusMap: Record<ActionItem['status'], ActionItem['status']> = {
      Waiting: 'In progress',
      'In progress': 'Done',
      Done: 'Waiting',
    };

    const nextProgressMap: Record<ActionItem['status'], number> = {
      Waiting: 15,
      'In progress': 65,
      Done: 100,
    };

    const updatedActions = strat.actions.map((act) => {
      if (act.id === actionId) {
        const nextStatus = nextStatusMap[act.status] || 'Done';
        return {
          ...act,
          status: nextStatus,
          progress: nextProgressMap[nextStatus],
        };
      }
      return act;
    });

    const totalProgress = updatedActions.reduce((sum, a) => sum + a.progress, 0);
    const newPercent = Math.round(totalProgress / Math.max(1, updatedActions.length));

    try {
      await updateStrategyProgressInFirestore(strategyId, newPercent, updatedActions);
    } catch (err) {
      console.error('Failed to update strategy progress in Firestore:', err);
    }
  };

  const triggerCallAssignee = (act: ActionItem) => {
    const contact: ContactPerson = {
      name: act.assignedTo,
      role: act.isAI ? 'Lead Autonomous AI Agent' : 'Operations Lead Specialist',
      department: act.isAI ? 'GemInsight Agent Network' : 'Store Execution Operations',
      email: `${act.assignedTo.toLowerCase().replace(/[^a-z]/g, '')}@thearkitects.in`,
      phone: '+91 98200 44910',
    };
    setActiveItemTitle(act.header);
    setCallingContact(contact);
  };

  const triggerEmailAssignee = (act: ActionItem) => {
    const contact: ContactPerson = {
      name: act.assignedTo,
      role: act.isAI ? 'Lead Autonomous AI Agent' : 'Operations Lead Specialist',
      department: act.isAI ? 'GemInsight Agent Network' : 'Store Execution Operations',
      email: `${act.assignedTo.toLowerCase().replace(/[^a-z]/g, '')}@thearkitects.in`,
      phone: '+91 98200 44910',
    };
    setActiveItemTitle(act.header);
    setEmailingContact(contact);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Action Cockpit
            </h1>
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#34A853] border border-emerald-200">
              Autonomous Execution
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Decisions visibly split into AI agents and human actions in real time. Click contacts to call or email.
          </p>
        </div>

        <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 flex items-center gap-2 shadow-xs">
          <Bot className="w-3.5 h-3.5 text-[#4285F4] animate-pulse" />
          <span>Most tasks executed autonomously by AI agents</span>
        </div>
      </div>

      {/* Main Two-Pane Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LEFT PANE: 4 Open Strategies (Placards) (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">
              Open Strategies (4)
            </span>
            <span className="text-[10px] text-slate-400 font-semibold">Click placard to flip</span>
          </div>

          <div className="space-y-3">
            {allStrategies.map((strategy, idx) => {
              const isSelected = selectedStrategy?.id === strategy.id;
              const isFlipped = !!flippedPlacards[strategy.id];

              return (
                <div
                  key={strategy.id}
                  onClick={() => handlePlacardClick(strategy)}
                  className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 relative border ${
                    isSelected
                      ? 'bg-gradient-to-br from-white to-blue-50/40 border-[#4285F4] shadow-md ring-1 ring-blue-300'
                      : 'bg-white/85 border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  {/* Index tag */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Strategy #{idx + 1}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#4285F4] animate-pulse"></span>
                    )}
                  </div>

                  {/* UNFLIPPED: Shows only headline (NO CUTOFFS) */}
                  {!isFlipped ? (
                    <div>
                      <h3 className="text-sm font-black text-slate-900 leading-snug break-words">
                        {strategy.headline}
                      </h3>
                      <div className="mt-2 text-[10px] text-[#4285F4] font-extrabold flex items-center gap-1">
                        <span>Click to flip details</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  ) : (
                    /* FLIPPED: headline, 2-sentence detail, Good/OK/Bad tag, and % completed */
                    <div className="space-y-2 animate-in fade-in duration-200">
                      <h3 className="text-sm font-black text-slate-900 leading-snug break-words">
                        {strategy.headline}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed break-words font-normal">
                        {strategy.twoSentenceDetail}
                      </p>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          {getTagBadge(strategy.tag)}
                          <span className="text-xs font-black text-slate-800">
                            {strategy.percentCompleted}% completed
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold">Flipped</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT SIDE: Action Split for Selected Strategy (8 cols) */}
        {selectedStrategy && (
          <div className="lg:col-span-8 glass-panel rounded-3xl p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden">
            <div>
              {/* Strategy Header & 2-Line Detail */}
              <div className="pb-4 border-b border-slate-100">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#34A853] text-white shadow-xs">
                      Live Action Distribution
                    </span>
                    {getTagBadge(selectedStrategy.tag)}
                  </div>

                  {/* Overall % completed */}
                  <div className="text-right">
                    <span className="text-xs text-slate-400 font-medium">Overall Progress: </span>
                    <span className="text-base font-black text-slate-900">
                      {selectedStrategy.percentCompleted}%
                    </span>
                  </div>
                </div>

                <h2 className="text-lg font-black text-slate-900 mt-2 break-words leading-snug">
                  {selectedStrategy.headline}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed mt-1 break-words font-normal">
                  {selectedStrategy.twoSentenceDetail}
                </p>

                {/* Overall continuous progress bar with Google colors */}
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mt-3">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#4285F4] via-[#34A853] to-[#FBBC05] transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        100,
                        selectedStrategy.percentCompleted + progressOffset
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Action Split Live Animation Banner */}
              <div className="my-4 py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <Sparkles className="w-4 h-4 text-[#4285F4] animate-spin" />
                  <span>Decision autonomously split into {selectedStrategy.actions.length} assigned actions</span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">
                  Autonomous Hand-off: Active
                </span>
              </div>

              {/* Action Cards List */}
              <div className="space-y-3">
                {selectedStrategy.actions.map((act) => {
                  const animatedProgress = Math.min(
                    100,
                    act.status === 'Done'
                      ? 100
                      : act.progress + (act.status === 'In progress' ? progressOffset : 0)
                  );

                  return (
                    <div
                      key={act.id}
                      className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-[#4285F4]/50 transition-all relative overflow-hidden group"
                    >
                      {/* Left color bar based on who is doing it */}
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-1 ${
                          act.isAI ? 'bg-[#4285F4]' : 'bg-[#EA4335]'
                        }`}
                      ></div>

                      <div className="pl-2">
                        {/* Action Header + Status (Interactive toggle with Firestore persistence) */}
                        <div className="flex items-start justify-between gap-2 mb-1.5 flex-wrap">
                          <h4 className="text-sm font-black text-slate-900 leading-snug break-words">
                            {act.header}
                          </h4>
                          <button
                            type="button"
                            onClick={() => handleToggleActionStatus(selectedStrategy.id, act.id)}
                            className="cursor-pointer hover:scale-105 active:scale-95 transition-all focus:outline-none"
                            title="Click to advance status (Waiting → In progress → Done) and sync to Firestore"
                          >
                            {getStatusBadge(act.status)}
                          </button>
                        </div>

                        {/* 2 Short Bullets of what is being done */}
                        <ul className="text-xs text-slate-600 space-y-1 my-2">
                          <li className="flex items-start gap-1.5">
                            <span className="text-[#4285F4] font-bold shrink-0">•</span>
                            <span className="break-words">{act.bullet1}</span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="text-[#4285F4] font-bold shrink-0">•</span>
                            <span className="break-words">{act.bullet2}</span>
                          </li>
                        </ul>

                        {/* Who is doing it + Contact options + Live progress bar */}
                        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
                          {/* Assignee badge + Quick contact options */}
                          <div className="flex items-center gap-2 flex-wrap">
                            {act.isAI ? (
                              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#4285F4] border border-blue-200 text-[11px] font-bold">
                                <Bot className="w-3 h-3 text-[#4285F4]" />
                                <span>AI Agent: {act.assignedTo}</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-50 text-[#EA4335] border border-red-200 text-[11px] font-bold">
                                <User className="w-3 h-3 text-[#EA4335]" />
                                <span>Specialist: {act.assignedTo}</span>
                              </div>
                            )}

                            {/* Direct Call & Email affordance for assignee (Requirement 5) */}
                            <button
                              onClick={() => triggerCallAssignee(act)}
                              className="p-1 px-2 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-[#34A853] text-slate-600 text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                              title={`Call ${act.assignedTo}`}
                            >
                              <Phone className="w-3 h-3" />
                              <span>Call</span>
                            </button>

                            <button
                              onClick={() => triggerEmailAssignee(act)}
                              className="p-1 px-2 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-[#4285F4] text-slate-600 text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                              title={`Email ${act.assignedTo}`}
                            >
                              <Mail className="w-3 h-3" />
                              <span>Email</span>
                            </button>
                          </div>

                          {/* Live moving progress */}
                          <div className="flex items-center gap-2 min-w-[140px]">
                            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-300 ${
                                  act.status === 'Done'
                                    ? 'bg-[#34A853]'
                                    : 'bg-gradient-to-r from-[#4285F4] to-[#34A853]'
                                }`}
                                style={{ width: `${animatedProgress}%` }}
                              ></div>
                            </div>
                            <span className="font-mono text-[10px] font-bold text-slate-700 whitespace-nowrap">
                              {animatedProgress}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between flex-wrap gap-2">
              <span>Strategy ID: {selectedStrategy.id}</span>
              <span className="text-[#34A853] font-bold flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-[#34A853]" />
                <span>Saved in Cloud Firestore • Survives Refresh</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Ringing Calling Modal */}
      {callingContact && (
        <CallingModal
          contact={callingContact}
          itemTitle={activeItemTitle}
          onClose={() => setCallingContact(null)}
        />
      )}

      {/* Email Modal */}
      {emailingContact && (
        <EmailModal
          contact={emailingContact}
          defaultSubject={`Action Milestone: ${activeItemTitle}`}
          defaultBody={`Regarding your task "${activeItemTitle}": please confirm the completion status and any roadblocks.`}
          onClose={() => setEmailingContact(null)}
        />
      )}
    </div>
  );
};
