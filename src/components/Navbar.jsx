import React from 'react';
import {
  FileText,
  Search,
  LayoutDashboard,
  MapPin,
  Cpu,
  BookOpen,
  Languages,
  Layers,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, language, setLanguage, pendingCount = 0 }) {
  const isHindi = language === 'hi';

  const navItems = [
    {
      id: 'citizen',
      label: isHindi ? 'शिकायत दर्ज करें' : 'Citizen Portal',
      icon: FileText,
      badge: isHindi ? 'नया' : 'Submit'
    },
    {
      id: 'track',
      label: isHindi ? 'स्थिति जांचें' : 'Track Status',
      icon: Search,
    },
    {
      id: 'staff',
      label: isHindi ? 'अधिकारी डैशबोर्ड' : 'Staff Command',
      icon: LayoutDashboard,
      count: pendingCount
    },
    {
      id: 'routing',
      label: isHindi ? 'जिला रूटिंग' : 'UP Routing Table',
      icon: MapPin,
    },
    {
      id: 'ml-lab',
      label: isHindi ? 'मॉडल मूल्यांकन' : 'ML Benchmarks',
      icon: Cpu,
      sparkle: true
    },
    {
      id: 'report',
      label: isHindi ? 'परियोजना रिपोर्ट' : 'Project Report',
      icon: BookOpen,
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Details */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('citizen')}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
                  Civic<span className="text-indigo-600">AI</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Uttar Pradesh
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-700">
                AI-Powered Municipal Grievance Triage System
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-600'}`} />
                  <span>{item.label}</span>

                  {item.count > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                      {item.count}
                    </span>
                  )}

                  {item.sparkle && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Language Switcher & Info */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
              title="Toggle Hindi / English"
            >
              <Languages className="w-3.5 h-3.5 text-indigo-600" />
              <span>{language === 'en' ? 'हिन्दी (Hindi)' : 'English'}</span>
            </button>

            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>5 UP Districts Live</span>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Scrollable Tab Bar */}
        <div className="lg:hidden flex items-center gap-1.5 py-2 border-t border-slate-100 overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors shrink-0 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {item.count > 0 && (
                  <span className={`px-1 rounded-full text-[9px] font-bold ${isActive ? 'bg-white text-indigo-700' : 'bg-amber-500 text-white'}`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
