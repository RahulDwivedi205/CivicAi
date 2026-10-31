import React, { useState } from 'react';
import {
  MapPin,
  Building2,
  PhoneCall,
  ExternalLink,
  ShieldCheck,
  Search,
  Filter,
  Calendar,
  AlertCircle,
  FileCheck2
} from 'lucide-react';
import { DISTRICT_ROUTING_TABLE, UP_DISTRICTS, COMPLAINT_CATEGORIES } from '../data/districts';

export default function RoutingDirectory({ language }) {
  const isHindi = language === 'hi';
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRules = DISTRICT_ROUTING_TABLE.filter((rule) => {
    if (selectedDistrict !== 'all' && rule.districtId !== selectedDistrict) return false;
    if (selectedCategory !== 'all' && rule.category !== selectedCategory) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchDept = rule.department.toLowerCase().includes(q);
      const matchDist = rule.districtName.toLowerCase().includes(q);
      const matchOfficer = rule.officer.toLowerCase().includes(q);
      if (!matchDept && !matchDist && !matchOfficer) return false;
    }
    return true;
  });

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
          <Building2 className="w-3.5 h-3.5" />
          <span>UP District Administrative Routing Engine</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {isHindi ? 'उत्तर प्रदेश जिला रूटिंग डायरेक्टरी' : 'Uttar Pradesh Department Routing Directory'}
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          {isHindi
            ? 'लखनऊ, वाराणसी, गोरखपुर, आगरा एवं कानपुर के नगर निगम, जल निगम, लोक निर्माण विभाग (PWD) तथा विद्युत वितरण कंपनियों के सत्यापित संपर्क एवं पोर्टल।'
            : 'Verified municipal routing rules mapping 5 civic categories across 5 UP districts to responsible executive authorities, helplines, and state portals.'}
        </p>
      </div>

      {/* Official Disclaimer Alert */}
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">
            {isHindi ? 'आधिकारिक सरकारी डिस्क्लेमर (Section 11):' : 'Official State Grievance Disclaimer (Report Section 11):'}
          </p>
          <p className="text-amber-800 leading-relaxed">
            CivicAI is an academic AI research prototype developed by Rahul (Rishihood University) and is not an officially commissioned government portal. For binding government inquiries, citizens can also utilize the official Uttar Pradesh Integrated Grievance Redressal System (<a href="https://jansunwai.up.nic.in" target="_blank" rel="noreferrer" className="underline font-bold hover:text-amber-950">Jansunwai IGRS UP</a>) or respective municipal helplines (1533).
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search department, nodal officer, or helpline..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* District Selector */}
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="bg-slate-50 border border-slate-300 text-xs font-semibold rounded-xl px-3 py-2 text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All 5 Districts</option>
            {Object.values(UP_DISTRICTS).map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.hindiName})
              </option>
            ))}
          </select>

          {/* Category Selector */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-50 border border-slate-300 text-xs font-semibold rounded-xl px-3 py-2 text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All 5 Categories</option>
            {Object.values(COMPLAINT_CATEGORIES).map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <span className="text-xs font-bold text-slate-500">
            {filteredRules.length} Rules Active
          </span>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRules.map((rule) => {
          const category = COMPLAINT_CATEGORIES[rule.category] || COMPLAINT_CATEGORIES.roads;
          const district = UP_DISTRICTS[rule.districtId];

          return (
            <div
              key={rule.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="flex items-center gap-1 text-xs font-bold text-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{rule.districtName}</span>
                    <span className="text-slate-400 font-normal">({district?.hindiName})</span>
                  </span>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${category.badgeColor}`}>
                    {category.name}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 leading-snug">
                  {rule.department}
                </h3>

                <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-start gap-1.5">
                    <span className="text-slate-400 font-medium">Designation:</span>
                    <span className="font-semibold text-slate-700">{rule.officer}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-indigo-700 font-semibold font-mono text-xs pt-1">
                    <PhoneCall className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>{rule.contact}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  <span>Verified: {rule.lastVerified}</span>
                </span>

                <a
                  href={rule.officialPortal}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-bold transition-colors"
                >
                  <span>Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
