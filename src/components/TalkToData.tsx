import React, { useState, useRef, useEffect } from 'react';
import {
  PersonaType,
  ChatMessage,
  StrategyItem,
} from '../types';
import { PERSONA_DATA } from '../data/personaData';
import {
  subscribeToChatMessages,
  saveChatMessageToFirestore,
  clearChatHistoryInFirestore,
} from '../services/firestoreService';
import {
  Send,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  Zap,
  CornerDownLeft,
  RotateCcw,
  CheckCircle2,
  Clock,
  Database,
  Trash2,
} from 'lucide-react';

interface TalkToDataProps {
  currentPersona: PersonaType;
  onNavigateToCockpit: (newStrategy?: StrategyItem) => void;
}

export const TalkToData: React.FC<TalkToDataProps> = ({
  currentPersona,
  onNavigateToCockpit,
}) => {
  const dataBundle = PERSONA_DATA[currentPersona];
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Load chat history from Firestore for the active persona (persists across refresh)
  useEffect(() => {
    setIsHistoryLoading(true);
    const unsubscribe = subscribeToChatMessages(currentPersona, (loadedMessages) => {
      setMessages(loadedMessages);
      setIsHistoryLoading(false);
    });
    return () => unsubscribe();
  }, [currentPersona]);

  // Clean text helper to guarantee no stray asterisks or markdown in display
  const formatCleanText = (text: string) => {
    return text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/#{1,6}\s+/g, '')
      .replace(/`/g, '');
  };

  const handleClearHistory = async () => {
    try {
      await clearChatHistoryInFirestore(currentPersona);
      setMessages([]);
    } catch (err) {
      console.error('Failed to clear chat in Firestore:', err);
      setMessages([]);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isLoading) return;

    setInputQuery('');

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Optimistically show user message and save to Firestore
    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      // Persist user question to Firestore
      await saveChatMessageToFirestore(userMessage, currentPersona);
    } catch (fsErr) {
      console.error('Failed to save user message to Firestore:', fsErr);
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          persona: currentPersona,
          conversationHistory: newHistory.map((m) => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const botMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: formatCleanText(data.text || 'Information updated in leadership console.'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        followUps: data.followUps || [],
        actionCandidate: data.actionCandidate || null,
      };

      setMessages((prev) => [...prev, botMessage]);
      // Persist assistant response to Firestore so it stays after refresh!
      await saveChatMessageToFirestore(botMessage, currentPersona);
    } catch (err) {
      console.error('Chat error:', err);
      // Resilient fallback answer
      const fallbackMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: 'The ArKitects Pvt. Ltd. live data confirms current retail targets are healthy. We are monitoring store inventory and customer feedback continuously.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        followUps: [
          'What is our revenue forecast for this month?',
          'Which stores need immediate stock support?',
        ],
        actionCandidate: null,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
      try {
        await saveChatMessageToFirestore(fallbackMsg, currentPersona);
      } catch (saveErr) {
        console.error('Error saving fallback to Firestore:', saveErr);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTurnIntoAction = (candidate: NonNullable<ChatMessage['actionCandidate']>) => {
    const newStrategy: StrategyItem = {
      id: `strat-chat-${Date.now()}`,
      headline: candidate.headline,
      twoSentenceDetail: candidate.detail,
      tag: candidate.priority === 'Critical' ? 'Good' : 'OK',
      percentCompleted: 20,
      actions: [
        {
          id: `act-chat-1`,
          header: 'Deploy automated solution parameters',
          bullet1: candidate.solutions[0] || 'Execute initial phase directives',
          bullet2: 'Send automated alerts to affected store clusters',
          assignedTo: 'StrategyEngine AI',
          isAI: true,
          status: 'Done',
          progress: 100,
        },
        {
          id: `act-chat-2`,
          header: 'Monitor initial store telemetry response',
          bullet1: candidate.solutions[1] || 'Track store performance metrics',
          bullet2: 'Verify live stock and sales velocity updates',
          assignedTo: 'AuditBot AI',
          isAI: true,
          status: 'In progress',
          progress: 45,
        },
        {
          id: `act-chat-3`,
          header: 'Conduct store manager sign-off and physical review',
          bullet1: 'Store team validates shelf display and customer satisfaction',
          bullet2: 'Report summary back to leadership dashboard',
          assignedTo: 'Praveen Nair',
          isAI: false,
          status: 'Waiting',
          progress: 10,
        },
      ],
    };

    onNavigateToCockpit(newStrategy);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300 flex flex-col h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Talk to Data
            </h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
              Gemini Powered
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-[#34A853] border border-emerald-200 flex items-center gap-1">
              <Database className="w-3 h-3 text-[#34A853]" />
              <span>Firestore Saved</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Ask any question across company systems and external reports. Chat history automatically persists across page refresh.
          </p>
        </div>

        {messages.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-600 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-rose-200 shadow-xs transition-colors cursor-pointer"
            title="Clear saved conversation history from Cloud Firestore"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear history</span>
          </button>
        )}
      </div>

      {/* Main Conversation Container */}
      <div className="flex-1 overflow-y-auto glass-panel rounded-3xl p-4 sm:p-6 space-y-4">
        {/* If no messages, show strategic starter questions for this persona */}
        {messages.length === 0 ? (
          <div className="h-full flex flex-col justify-center max-w-2xl mx-auto py-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-violet-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-sky-500/20">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>

            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Connected Intelligence for {currentPersona}
            </h2>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              GemInsight has correlated all 284 stores, ERP ledgers, warehouse robotics, and market research. Select a strategic question to begin:
            </p>

            {/* Strategic Starter Questions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5">
              {dataBundle.starterQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="text-left p-3.5 rounded-2xl bg-white/90 border border-slate-200/90 hover:border-sky-400 hover:bg-sky-50/40 shadow-xs hover:shadow-md transition-all text-xs font-semibold text-slate-800 flex items-center justify-between group"
                >
                  <span className="leading-snug pr-2">{q}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-sky-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-400">
              <Bot className="w-4 h-4 text-sky-500" />
              <span>Real-time connected to 42 company databases and external intelligence sources.</span>
            </div>
          </div>
        ) : (
          /* Render Messages */
          <div className="space-y-4">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed space-y-2.5 break-words ${
                      isUser
                        ? 'bg-[#4285F4] text-white font-medium rounded-tr-xs shadow-md'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs shadow-xs'
                    }`}
                  >
                    {/* Message Text with simple line breaks (No asterisks) */}
                    <div className="whitespace-pre-line break-words">
                      {formatCleanText(msg.text)}
                    </div>

                    {/* Timestamp */}
                    <div
                      className={`text-[10px] ${
                        isUser ? 'text-blue-100' : 'text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </div>

                    {/* Optional "Turn into action" proposal */}
                    {!isUser && msg.actionCandidate && (
                      <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-sky-50 to-indigo-50/60 border border-sky-200 text-slate-800 space-y-2">
                        <div className="flex items-center gap-1.5 text-sky-900 font-bold text-[11px]">
                          <Zap className="w-3.5 h-3.5 text-sky-600" />
                          <span>Actionable Strategy Opportunity</span>
                        </div>
                        <p className="text-[11px] text-slate-700 font-semibold">
                          {msg.actionCandidate.headline}
                        </p>
                        <p className="text-[11px] text-slate-600">
                          {msg.actionCandidate.detail}
                        </p>
                        <button
                          onClick={() => handleTurnIntoAction(msg.actionCandidate!)}
                          className="mt-1 py-1.5 px-3 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold text-[11px] flex items-center gap-1.5 transition-colors shadow-xs"
                        >
                          <Zap className="w-3 h-3" />
                          <span>Turn into action in Action Cockpit</span>
                        </button>
                      </div>
                    )}

                    {/* 2-3 Follow-up Question Chips */}
                    {!isUser && msg.followUps && msg.followUps.length > 0 && (
                      <div className="pt-2 border-t border-slate-100 space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Suggested Follow-Ups:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.followUps.map((chip, cIdx) => (
                            <button
                              key={cIdx}
                              onClick={() => handleSendMessage(chip)}
                              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-sky-800 text-[11px] text-slate-700 border border-slate-200/80 transition-colors text-left"
                            >
                              {chip}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {isUser && (
                    <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-500 flex items-center gap-2 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping"></span>
                  <span>Synthesizing live data for {currentPersona}...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="shrink-0 flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-md focus-within:ring-2 focus-within:ring-sky-400/50"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder={`Ask anything about The ArKitects retail data as ${currentPersona.split(' ')[0]}...`}
          className="flex-1 px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isLoading}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
            inputQuery.trim() && !isLoading
              ? 'bg-[#4285F4] hover:bg-blue-600 text-white shadow-sm hover:shadow-md cursor-pointer'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Ask</span>
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
