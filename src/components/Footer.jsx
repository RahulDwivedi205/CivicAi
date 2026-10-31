import React from 'react';
import { Layers, Heart, Shield, Sparkles, MapPin } from 'lucide-react';

export default function Footer({ language, setActiveTab }) {
  const isHindi = language === 'hi';

  return (
    <footer className="bg-white border-t border-slate-200 mt-16 py-10 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Brand Details */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                🏛️
              </div>
              <span className="font-extrabold text-base text-slate-900 tracking-tight">
                Civic<span className="text-indigo-600">AI</span> Uttar Pradesh
              </span>
            </div>
            <p className="mt-1 text-slate-500 max-w-sm">
              AI-Powered Civic Complaint Triage Platform for Gorakhpur, Varanasi, Lucknow, Agra, and Kanpur.
            </p>
            <div className="mt-2 text-[11px] text-slate-400 font-medium">
              Created by <strong className="text-slate-700">Rahul</strong> • B.Tech (AI), 3rd Year, Rishihood University
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 font-medium text-slate-600">
            <button onClick={() => setActiveTab('citizen')} className="hover:text-indigo-600 transition-colors cursor-pointer">
              {isHindi ? 'शिकायत दर्ज करें' : 'Citizen Portal'}
            </button>
            <button onClick={() => setActiveTab('track')} className="hover:text-indigo-600 transition-colors cursor-pointer">
              {isHindi ? 'स्थिति जांचें' : 'Track Grievance'}
            </button>
            <button onClick={() => setActiveTab('staff')} className="hover:text-indigo-600 transition-colors cursor-pointer">
              {isHindi ? 'अधिकारी डैशबोर्ड' : 'Staff Command'}
            </button>
            <button onClick={() => setActiveTab('routing')} className="hover:text-indigo-600 transition-colors cursor-pointer">
              {isHindi ? 'जिला रूटिंग' : 'UP Routing Directory'}
            </button>
            <button onClick={() => setActiveTab('ml-lab')} className="hover:text-indigo-600 transition-colors cursor-pointer">
              {isHindi ? 'मॉडल मूल्यांकन' : 'ML Benchmarks'}
            </button>
            <button onClick={() => setActiveTab('report')} className="hover:text-indigo-600 transition-colors cursor-pointer">
              {isHindi ? 'परियोजना रिपोर्ट' : 'Project Report'}
            </button>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 text-center sm:text-left">
          <div>
            © 2026 CivicAI Uttar Pradesh. Academic AI Research Prototype.
          </div>
          <div className="flex items-center gap-1">
            <span>Human-in-the-loop GovTech Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
