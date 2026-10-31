import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';

export default function Toast({ message, visible, onHide }) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-indigo-500/40 flex items-center gap-3 text-xs sm:text-sm font-semibold">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
        </span>
        <span>{message}</span>
        <button
          onClick={onHide}
          className="ml-2 text-slate-400 hover:text-white text-xs cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
