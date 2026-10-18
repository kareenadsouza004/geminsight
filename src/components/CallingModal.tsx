import React, { useState, useEffect } from 'react';
import { ContactPerson } from '../types';
import {
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Grid,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface CallingModalProps {
  contact: ContactPerson | null;
  itemTitle?: string;
  onClose: () => void;
}

export const CallingModal: React.FC<CallingModalProps> = ({
  contact,
  itemTitle,
  onClose,
}) => {
  const [callState, setCallState] = useState<'ringing' | 'connected' | 'ended'>('ringing');
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);

  useEffect(() => {
    if (!contact) return;
    setCallState('ringing');
    setDuration(0);

    // After 2.5 seconds, transition to connected
    const connectTimer = setTimeout(() => {
      setCallState('connected');
    }, 2400);

    return () => clearTimeout(connectTimer);
  }, [contact]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callState === 'connected') {
      interval = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callState]);

  if (!contact) return null;

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setCallState('ended');
    setTimeout(() => {
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={handleEndCall}></div>

      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col items-center p-6 text-center animate-in zoom-in-95 duration-200">
        {/* Google Color Top Ambient Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 flex">
          <div className="h-full flex-1 bg-[#4285F4]"></div>
          <div className="h-full flex-1 bg-[#EA4335]"></div>
          <div className="h-full flex-1 bg-[#FBBC05]"></div>
          <div className="h-full flex-1 bg-[#34A853]"></div>
        </div>

        {/* Security / Corporate Encrypted badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-500 mb-6 mt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#34A853]" />
          <span>Encrypted Executive Voice Link</span>
        </div>

        {/* Contact Avatar with Google animated rings */}
        <div className="relative mb-4">
          {callState === 'ringing' && (
            <div className="absolute -inset-3 rounded-full border-2 border-[#4285F4]/40 animate-ping"></div>
          )}
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#4285F4] via-[#EA4335] to-[#FBBC05] p-1 shadow-lg shadow-blue-500/20">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-2xl font-black text-slate-800">
              {contact.name.split(' ').map((n) => n[0]).join('')}
            </div>
          </div>
          {callState === 'connected' && (
            <span className="absolute bottom-0 right-0 w-5 h-5 bg-[#34A853] border-2 border-white rounded-full flex items-center justify-center text-[10px] text-white font-bold">
              ✓
            </span>
          )}
        </div>

        {/* Contact Info */}
        <h3 className="text-lg font-black text-slate-900 tracking-tight">
          {contact.name}
        </h3>
        <p className="text-xs font-semibold text-[#4285F4] mt-0.5">
          {contact.role}
        </p>
        <p className="text-[11px] text-slate-500">
          {contact.department} • {contact.phone}
        </p>

        {/* Regarding Topic */}
        {itemTitle && (
          <div className="mt-3 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 max-w-full truncate">
            Topic: <span className="font-semibold text-slate-800">{itemTitle}</span>
          </div>
        )}

        {/* Call Status / Audio Waves */}
        <div className="my-6 flex flex-col items-center">
          {callState === 'ringing' && (
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#4285F4] animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-[#EA4335] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-[#FBBC05] animate-bounce [animation-delay:0.4s]"></span>
                <span className="w-2 h-2 rounded-full bg-[#34A853] animate-bounce [animation-delay:0.6s]"></span>
              </div>
              <span className="text-xs font-bold text-slate-600 animate-pulse">
                Ringing direct line...
              </span>
            </div>
          )}

          {callState === 'connected' && (
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-1 h-6">
                <div className="w-1 bg-[#34A853] h-3 animate-pulse"></div>
                <div className="w-1 bg-[#4285F4] h-6 animate-pulse [animation-delay:0.1s]"></div>
                <div className="w-1 bg-[#EA4335] h-4 animate-pulse [animation-delay:0.2s]"></div>
                <div className="w-1 bg-[#FBBC05] h-5 animate-pulse [animation-delay:0.3s]"></div>
                <div className="w-1 bg-[#34A853] h-3 animate-pulse [animation-delay:0.4s]"></div>
              </div>
              <span className="text-xs font-mono font-bold text-[#34A853]">
                Connected: {formatDuration(duration)}
              </span>
            </div>
          )}

          {callState === 'ended' && (
            <span className="text-xs font-bold text-slate-500">Call Ended</span>
          )}
        </div>

        {/* Mid-call Action Toggles */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3 rounded-2xl border transition-all ${
              isMuted
                ? 'bg-rose-50 border-rose-300 text-rose-600'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsSpeaker(!isSpeaker)}
            className={`p-3 rounded-2xl border transition-all ${
              isSpeaker
                ? 'bg-blue-50 border-blue-300 text-[#4285F4]'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
            title={isSpeaker ? 'Speaker On' : 'Speaker Off'}
          >
            {isSpeaker ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 transition-all"
            title="Keypad"
          >
            <Grid className="w-4 h-4" />
          </button>
        </div>

        {/* End Call Button */}
        <button
          onClick={handleEndCall}
          className="w-full py-3 rounded-2xl bg-[#EA4335] hover:bg-red-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-500/25 transition-all"
        >
          <PhoneOff className="w-4 h-4" />
          <span>End Call</span>
        </button>
      </div>
    </div>
  );
};
