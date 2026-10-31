import React, { useState } from 'react';
import {
  MapPin,
  Filter,
  Layers,
  ArrowRight,
  Info,
  Building,
  CheckCircle,
  AlertTriangle,
  Flame
} from 'lucide-react';
import { UP_DISTRICTS, COMPLAINT_CATEGORIES, PRIORITY_LEVELS } from '../data/districts';

export default function InteractiveMap({
  complaints,
  onSelectComplaint,
  language
}) {
  const isHindi = language === 'hi';

  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activePin, setActivePin] = useState(null);

  // Filter complaints for the map
  const filteredComplaints = complaints.filter((c) => {
    if (selectedDistrict !== 'all' && c.districtId !== selectedDistrict) return false;
    if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
    return true;
  });

  // Geographic bounds of UP approximate projection into SVG coordinate space (800 x 500)
  // Lat: 25.0 to 28.5 (y inverted)
  // Lng: 77.5 to 84.5 (x)
  const project = (lat, lng) => {
    const minLng = 77.2;
    const maxLng = 84.8;
    const minLat = 25.0;
    const maxLat = 28.2;

    const x = ((lng - minLng) / (maxLng - minLng)) * 740 + 30;
    const y = 470 - ((lat - minLat) / (maxLat - minLat)) * 430 + 10;
    return { x: Math.max(30, Math.min(770, x)), y: Math.max(20, Math.min(480, y)) };
  };

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden p-6 text-white relative">
      {/* Map Header & Filter Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
              <MapPin className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold tracking-tight text-white">
              {isHindi ? 'उत्तर प्रदेश जीआईएस शिकायत मानचित्र' : 'Uttar Pradesh Civic Grievance GIS Map'}
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time geotagged complaint distribution across Lucknow, Varanasi, Gorakhpur, Agra, and Kanpur.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* District Filter */}
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-xs font-semibold rounded-xl px-3 py-1.5 text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">{isHindi ? 'सभी 5 जिले (All Districts)' : 'All 5 Districts'}</option>
            {Object.values(UP_DISTRICTS).map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-xs font-semibold rounded-xl px-3 py-1.5 text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">{isHindi ? 'सभी श्रेणियां (All Categories)' : 'All Categories'}</option>
            {Object.values(COMPLAINT_CATEGORIES).map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <span className="text-xs font-bold px-2.5 py-1 bg-indigo-900/60 border border-indigo-700/60 text-indigo-300 rounded-lg">
            {filteredComplaints.length} Plotted
          </span>
        </div>
      </div>

      {/* SVG Canvas Map */}
      <div className="relative mt-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-2xl border border-slate-800/80 overflow-hidden min-h-[440px] flex items-center justify-center">
        <svg viewBox="0 0 800 500" className="w-full h-auto select-none">
          {/* Stylized UP State Grid Lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </pattern>
            {/* Pulsing radar for urgent alerts */}
            <radialGradient id="urgentPulse" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="800" height="500" fill="url(#grid)" />

          {/* UP State Outline Shape (Stylized polygon covering western Agra to eastern Varanasi/Gorakhpur) */}
          <path
            d="M 60,190 L 160,110 L 280,100 L 400,120 L 520,110 L 670,160 L 740,240 L 710,360 L 610,430 L 490,440 L 370,410 L 260,390 L 140,320 L 70,250 Z"
            fill="rgba(30, 41, 59, 0.4)"
            stroke="rgba(99, 102, 241, 0.3)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Inter-District Highway Corridors */}
          <path
            d="M 120,270 L 380,310 L 470,280 L 680,340 L 690,260"
            fill="none"
            stroke="rgba(99, 102, 241, 0.2)"
            strokeWidth="2"
          />

          {/* District Hub Indicators & Labels */}
          {Object.values(UP_DISTRICTS).map((district) => {
            const pos = project(district.coordinates.lat, district.coordinates.lng);
            const districtComplaints = complaints.filter((c) => c.districtId === district.id);

            return (
              <g key={district.id} transform={`translate(${pos.x}, ${pos.y})`}>
                {/* District Radial Glow */}
                <circle r="28" fill="rgba(99, 102, 241, 0.08)" />
                <circle r="16" fill="rgba(99, 102, 241, 0.15)" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="1" />
                <circle r="4" fill="#818cf8" />

                {/* District Name Label */}
                <text
                  x="0"
                  y="26"
                  textAnchor="middle"
                  fill="#cbd5e1"
                  fontSize="11"
                  fontWeight="bold"
                  className="tracking-wider uppercase"
                >
                  {district.name}
                </text>
                <text x="0" y="38" textAnchor="middle" fill="#94a3b8" fontSize="9">
                  {districtComplaints.length} tickets
                </text>
              </g>
            );
          })}

          {/* Complaint Pins */}
          {filteredComplaints.map((c) => {
            const pos = project(c.coordinates.lat, c.coordinates.lng);
            const isUrgent = c.priority === 'urgent';
            const isHigh = c.priority === 'high';
            const isResolved = c.status === 'resolved';

            const pinColor = isResolved
              ? '#10b981' // emerald
              : isUrgent
              ? '#ef4444' // red
              : isHigh
              ? '#f97316' // orange
              : '#3b82f6'; // blue

            return (
              <g
                key={c.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                onClick={() => setActivePin(c)}
                className="cursor-pointer group"
              >
                {/* Urgent Pulse Animation */}
                {isUrgent && (
                  <circle r="18" fill="url(#urgentPulse)" className="animate-ping" style={{ transformOrigin: 'center' }} />
                )}

                {/* Pin Head */}
                <circle
                  r="7"
                  fill={pinColor}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="transition-transform group-hover:scale-150 duration-200"
                />

                {/* Subtle Mini Label on Hover */}
                <title>{`${c.publicId}: ${c.category} in ${c.ward}`}</title>
              </g>
            );
          })}
        </svg>

        {/* Floating Active Pin Card Overlay */}
        {activePin && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-indigo-500/40 p-4 shadow-2xl animate-in fade-in duration-200">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold font-mono tracking-wider text-indigo-400">
                  {activePin.publicId}
                </span>
                <h4 className="text-xs font-bold text-white mt-0.5">
                  {activePin.ward}, {activePin.districtName}
                </h4>
              </div>
              <button
                onClick={() => setActivePin(null)}
                className="text-slate-400 hover:text-white p-1 rounded-md text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 mt-2 line-clamp-2 italic">
              "{activePin.text}"
            </p>

            <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-800 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${PRIORITY_LEVELS[activePin.priority]?.badge}`}>
                  {activePin.priority}
                </span>
                <span className="text-slate-400 capitalize">{activePin.status.replace('_', ' ')}</span>
              </div>

              <button
                onClick={() => onSelectComplaint(activePin)}
                className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Review Ticket</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Map Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 pt-2 border-t border-slate-800">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-slate-300">Map Legend:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
            <span>Urgent (Radar Pulse)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-orange-500 inline-block"></span>
            <span>High Priority</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
            <span>Standard Priority</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            <span>Resolved</span>
          </div>
        </div>

        <div className="text-[11px] text-slate-400">
          Click any pin on the map to inspect ticket & open officer review.
        </div>
      </div>
    </div>
  );
}
