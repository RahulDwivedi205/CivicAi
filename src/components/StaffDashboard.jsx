import React, { useState } from 'react';
import {
  LayoutDashboard,
  Filter,
  Search,
  AlertTriangle,
  CopyCheck,
  CheckCircle,
  Clock,
  ArrowRight,
  Eye,
  Building2,
  FileCheck,
  MapPin,
  Flame,
  ShieldCheck,
  ExternalLink,
  ChevronDown,
  Layers,
  Map as MapIcon,
  List,
  Sparkles,
  Link2
} from 'lucide-react';
import { UP_DISTRICTS, COMPLAINT_CATEGORIES, PRIORITY_LEVELS, DISTRICT_ROUTING_TABLE, getRoutingInfo } from '../data/districts';
import InteractiveMap from './InteractiveMap';

export default function StaffDashboard({
  complaints,
  setComplaints,
  language,
  showToast
}) {
  const isHindi = language === 'hi';

  // State
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'map'
  const [activeFilterTab, setActiveFilterTab] = useState('all'); // 'all' | 'low-conf' | 'duplicates' | 'urgent' | 'resolved'
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected complaint for review modal
  const [reviewComplaint, setReviewComplaint] = useState(null);

  // Form overrides inside the review modal
  const [overrideCategory, setOverrideCategory] = useState('');
  const [overridePriority, setOverridePriority] = useState('');
  const [overrideStatus, setOverrideStatus] = useState('');
  const [overrideDepartment, setOverrideDepartment] = useState('');
  const [officerNotes, setOfficerNotes] = useState('');

  // Open modal and prepopulate overrides
  const handleOpenReview = (complaint) => {
    setReviewComplaint(complaint);
    setOverrideCategory(complaint.category);
    setOverridePriority(complaint.priority);
    setOverrideStatus(complaint.status);
    setOverrideDepartment(complaint.departmentName);
    setOfficerNotes('');
  };

  // Close modal
  const handleCloseReview = () => {
    setReviewComplaint(null);
  };

  // Save changes & add audit log
  const handleSaveReview = () => {
    if (!reviewComplaint) return;

    const hasCategoryChanged = overrideCategory !== reviewComplaint.category;
    const hasPriorityChanged = overridePriority !== reviewComplaint.priority;
    const hasStatusChanged = overrideStatus !== reviewComplaint.status;
    const hasDeptChanged = overrideDepartment !== reviewComplaint.departmentName;

    const newLogs = [...(reviewComplaint.auditLogs || [])];
    const timestamp = new Date().toISOString();

    if (hasCategoryChanged) {
      newLogs.push({
        id: `aud-ovr-cat-${Date.now()}`,
        action: 'Category Overridden by Officer',
        actor: 'Municipal Nodal Officer',
        timestamp,
        details: `Category modified from ${COMPLAINT_CATEGORIES[reviewComplaint.category]?.name} to ${COMPLAINT_CATEGORIES[overrideCategory]?.name}`
      });
    }

    if (hasPriorityChanged) {
      newLogs.push({
        id: `aud-ovr-prio-${Date.now()}`,
        action: 'Priority Overridden by Officer',
        actor: 'Municipal Nodal Officer',
        timestamp,
        details: `Priority adjusted from ${reviewComplaint.priority.toUpperCase()} to ${overridePriority.toUpperCase()}`
      });
    }

    if (hasStatusChanged) {
      newLogs.push({
        id: `aud-ovr-stat-${Date.now()}`,
        action: `Status Updated to ${overrideStatus.replace('_', ' ').toUpperCase()}`,
        actor: 'Municipal Field Engineer',
        timestamp,
        details: officerNotes ? `Officer remarks: "${officerNotes}"` : 'Status transition logged by authority.'
      });
    } else if (officerNotes) {
      newLogs.push({
        id: `aud-notes-${Date.now()}`,
        action: 'Internal Note Added',
        actor: 'Municipal Field Engineer',
        timestamp,
        details: `Field remarks: "${officerNotes}"`
      });
    }

    const updated = {
      ...reviewComplaint,
      category: overrideCategory,
      priority: overridePriority,
      status: overrideStatus,
      departmentName: overrideDepartment,
      isLowConfidence: false, // human reviewed!
      updatedAt: timestamp,
      auditLogs: newLogs
    };

    setComplaints((prev) => prev.map((c) => (c.id === reviewComplaint.id ? updated : c)));
    setReviewComplaint(null);
    showToast(isHindi ? `शिकायत ${updated.publicId} अद्यतन की गई` : `Ticket ${updated.publicId} successfully updated & logged!`);
  };

  // Handle Duplicate Decision
  const handleConfirmDuplicate = (isDup) => {
    if (!reviewComplaint) return;

    const timestamp = new Date().toISOString();
    const updated = {
      ...reviewComplaint,
      isDuplicate: isDup,
      duplicateDecision: isDup ? 'Confirmed by Officer' : 'Marked Independent',
      auditLogs: [
        ...reviewComplaint.auditLogs,
        {
          id: `aud-dup-${Date.now()}`,
          action: isDup ? 'Duplicate Link Confirmed' : 'Marked Independent Ticket',
          actor: 'Municipal Triage Officer',
          timestamp,
          details: isDup
            ? `Linked as duplicate of ${reviewComplaint.matchedComplaintId}. Combined with existing field work order.`
            : 'Officer determined this complaint represents a distinct defect.'
        }
      ]
    };

    setComplaints((prev) => prev.map((c) => (c.id === reviewComplaint.id ? updated : c)));
    setReviewComplaint(updated);
    showToast(isDup ? 'Linked to master ticket' : 'Marked as independent ticket');
  };

  // KPI Calculations
  const totalCount = complaints.length;
  const inProgressCount = complaints.filter((c) => c.status === 'in_progress').length;
  const resolvedCount = complaints.filter((c) => c.status === 'resolved').length;
  const pendingCount = complaints.filter((c) => c.status === 'submitted' || c.status === 'assigned').length;
  const lowConfCount = complaints.filter((c) => c.isLowConfidence).length;
  const duplicateAlertsCount = complaints.filter((c) => c.isDuplicate).length;
  const urgentCount = complaints.filter((c) => c.priority === 'urgent' || c.priority === 'high').length;

  // Filter complaints list
  const filteredList = complaints.filter((c) => {
    // Tab filter
    if (activeFilterTab === 'low-conf' && !c.isLowConfidence) return false;
    if (activeFilterTab === 'duplicates' && !c.isDuplicate) return false;
    if (activeFilterTab === 'urgent' && c.priority !== 'urgent' && c.priority !== 'high') return false;
    if (activeFilterTab === 'resolved' && c.status !== 'resolved') return false;

    // Dropdown filters
    if (selectedDistrict !== 'all' && c.districtId !== selectedDistrict) return false;
    if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = c.publicId.toLowerCase().includes(q);
      const matchText = c.text.toLowerCase().includes(q);
      const matchWard = c.ward?.toLowerCase().includes(q);
      const matchCitizen = c.citizenName?.toLowerCase().includes(q);
      if (!matchId && !matchText && !matchWard && !matchCitizen) return false;
    }

    return true;
  });

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700">
              <LayoutDashboard className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isHindi ? 'नगर निगम अधिकारी कमांड सेंटर' : 'Municipal Staff Triage Command Center'}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {isHindi
              ? 'लखनऊ, वाराणसी, गोरखपुर, आगरा एवं कानपुर के नागरिक शिकायतों का AI वर्गीकरण, समीक्षा एवं कार्य आवंटन।'
              : 'Multi-district grievance review queue, human-in-the-loop overrides, GIS cluster map, and automated routing audit.'}
          </p>
        </div>

        {/* View Switcher: List vs Map */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 self-start md:self-auto">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'list' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <List className="w-4 h-4" />
            <span>{isHindi ? 'सूची दृश्य (List)' : 'Queue List'}</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'map' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapIcon className="w-4 h-4" />
            <span>{isHindi ? 'मानचित्र (GIS Map)' : 'GIS Cluster Map'}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Filed</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{totalCount}</div>
          <div className="text-[10px] text-emerald-600 font-medium mt-0.5">100% AI Analyzed</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Pending Action</div>
          <div className="text-2xl font-extrabold text-indigo-600 mt-1">{pendingCount}</div>
          <div className="text-[10px] text-indigo-500 font-medium mt-0.5">Awaiting dispatch</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">In Progress</div>
          <div className="text-2xl font-extrabold text-amber-600 mt-1">{inProgressCount}</div>
          <div className="text-[10px] text-amber-500 font-medium mt-0.5">Field teams active</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Resolved</div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">{resolvedCount}</div>
          <div className="text-[10px] text-emerald-600 font-medium mt-0.5">Redressed tickets</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-red-200/80 shadow-xs">
          <div className="text-[11px] font-semibold text-red-600 uppercase tracking-wider">Urgent & High</div>
          <div className="text-2xl font-extrabold text-red-600 mt-1">{urgentCount}</div>
          <div className="text-[10px] text-red-500 font-medium mt-0.5">High hazard SLA</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-purple-200/80 shadow-xs">
          <div className="text-[11px] font-semibold text-purple-600 uppercase tracking-wider">Duplicates / Low Conf</div>
          <div className="text-2xl font-extrabold text-purple-600 mt-1">
            {duplicateAlertsCount} / {lowConfCount}
          </div>
          <div className="text-[10px] text-purple-500 font-medium mt-0.5">Human review flagged</div>
        </div>
      </div>

      {/* View Mode: GIS Map */}
      {viewMode === 'map' ? (
        <InteractiveMap
          complaints={complaints}
          onSelectComplaint={(c) => handleOpenReview(c)}
          language={language}
        />
      ) : (
        /* View Mode: Queue List & Filters */
        <div className="space-y-4">
          {/* Quick Filter Pill Tabs */}
          <div className="flex flex-wrap items-center gap-2 pb-1 border-b border-slate-200">
            <button
              onClick={() => setActiveFilterTab('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilterTab === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Complaints ({totalCount})
            </button>
            <button
              onClick={() => setActiveFilterTab('urgent')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeFilterTab === 'urgent'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-white text-red-700 hover:bg-red-50 border border-red-200'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Urgent & High ({urgentCount})</span>
            </button>
            <button
              onClick={() => setActiveFilterTab('duplicates')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeFilterTab === 'duplicates'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white text-purple-700 hover:bg-purple-50 border border-purple-200'
              }`}
            >
              <CopyCheck className="w-3.5 h-3.5" />
              <span>Duplicate Alerts ({duplicateAlertsCount})</span>
            </button>
            <button
              onClick={() => setActiveFilterTab('low-conf')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeFilterTab === 'low-conf'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white text-amber-700 hover:bg-amber-50 border border-amber-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Low-Confidence Review Queue ({lowConfCount})</span>
            </button>
            <button
              onClick={() => setActiveFilterTab('resolved')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilterTab === 'resolved'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-emerald-700 hover:bg-emerald-50 border border-emerald-200'
              }`}
            >
              Resolved ({resolvedCount})
            </button>
          </div>

          {/* Filter & Search Bar */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isHindi ? 'शिकायत संख्या, वार्ड या शब्द खोजें...' : 'Search by ID, ward, or keyword...'}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {/* District Filter */}
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="bg-slate-50 border border-slate-300 text-xs font-semibold rounded-xl px-3 py-2 text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All 5 Districts</option>
                {Object.values(UP_DISTRICTS).map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.code})
                  </option>
                ))}
              </select>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-50 border border-slate-300 text-xs font-semibold rounded-xl px-3 py-2 text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Categories</option>
                {Object.values(COMPLAINT_CATEGORIES).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Complaints Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-3 px-4">Complaint ID & Date</th>
                    <th className="py-3 px-4">District & Ward</th>
                    <th className="py-3 px-4">AI Category (NLP Conf)</th>
                    <th className="py-3 px-4">Priority Level</th>
                    <th className="py-3 px-4">Status & Flags</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredList.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        No complaints match your active filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredList.map((c) => {
                      const category = COMPLAINT_CATEGORIES[c.category] || COMPLAINT_CATEGORIES.roads;
                      const priority = PRIORITY_LEVELS[c.priority] || PRIORITY_LEVELS.medium;

                      return (
                        <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-mono font-bold text-slate-900 text-xs">
                              {c.publicId}
                            </div>
                            <div className="text-[10px] text-slate-600 mt-0.5">
                              {new Date(c.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-800">
                              {c.districtName}
                            </div>
                            <div className="text-[11px] text-slate-600 truncate max-w-[150px]">
                              {c.ward}
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1.5">
                              <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${category.badgeColor}`}>
                                {category.name}
                              </span>
                              <span className="text-[10px] font-mono text-slate-600 font-bold">
                                {Math.round(c.categoryConfidence * 100)}%
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-600 mt-0.5 truncate max-w-[160px]">
                              {c.departmentName}
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${priority.badge}`}>
                              {priority.label}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="flex flex-col gap-1">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase w-fit ${
                                  c.status === 'resolved'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : c.status === 'in_progress'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-indigo-100 text-indigo-800'
                                }`}
                              >
                                {c.status.replace('_', ' ')}
                              </span>

                              {/* Alert Badges */}
                              {c.isDuplicate && (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-semibold bg-purple-100 text-purple-800 border border-purple-200 w-fit">
                                  <Link2 className="w-2.5 h-2.5" />
                                  <span>{c.similarityScore}% Duplicate</span>
                                </span>
                              )}

                              {c.isLowConfidence && (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-semibold bg-amber-100 text-amber-800 border border-amber-200 w-fit">
                                  <span>Review Conf</span>
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => handleOpenReview(c)}
                              className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white rounded-lg text-xs font-bold transition-all shadow-2xs cursor-pointer inline-flex items-center gap-1"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>{isHindi ? 'समीक्षा करें' : 'Triage & Act'}</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Review & Triage Drawer Modal */}
      {reviewComplaint && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-extrabold text-indigo-600 text-lg">
                    {reviewComplaint.publicId}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${PRIORITY_LEVELS[reviewComplaint.priority]?.badge}`}>
                    {reviewComplaint.priority} Priority
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Reported at {reviewComplaint.ward}, {reviewComplaint.districtName} by {reviewComplaint.citizenName}
                </p>
              </div>

              <button
                onClick={handleCloseReview}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Content Grid */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column (Complaint details & Photo) */}
              <div className="lg:col-span-6 space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Grievance Description
                  </h4>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 leading-relaxed">
                    "{reviewComplaint.text}"
                  </div>
                </div>

                {/* Photo Preview */}
                {reviewComplaint.photoUrl && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Attached Photographic Evidence
                    </h4>
                    <div className="rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-100">
                      <img
                        src={reviewComplaint.photoUrl}
                        alt="Evidence"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* AI Duplicate Detection Panel */}
                {reviewComplaint.isDuplicate && (
                  <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900">
                        <CopyCheck className="w-4 h-4 text-purple-600" />
                        <span>Potential Duplicate Detected ({reviewComplaint.similarityScore}% Overlap)</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-purple-800 leading-relaxed">
                      {reviewComplaint.duplicateReason || `Strong semantic overlap with existing ticket ${reviewComplaint.matchedComplaintId}.`}
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleConfirmDuplicate(true)}
                        className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold transition-colors cursor-pointer"
                      >
                        Link as Duplicate
                      </button>
                      <button
                        type="button"
                        onClick={() => handleConfirmDuplicate(false)}
                        className="px-3 py-1 rounded-lg bg-white border border-purple-300 text-purple-700 hover:bg-purple-100 text-[11px] font-bold transition-colors cursor-pointer"
                      >
                        Keep Separate Ticket
                      </button>
                    </div>
                  </div>
                )}

                {/* Audit Logs Mini-View */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Recent Audit Activity
                  </h4>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {reviewComplaint.auditLogs?.slice(-3).map((l, i) => (
                      <div key={i} className="text-[11px] p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="font-semibold text-slate-700">{l.action}</div>
                        <div className="text-slate-500 text-[10px]">{l.details}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column (Officer Action & Overrides) */}
              <div className="lg:col-span-6 bg-slate-50/80 rounded-2xl border border-slate-200 p-5 space-y-4">
                <div className="flex items-center gap-1.5 pb-2 border-b border-slate-200 text-slate-900 font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <span>Human-In-The-Loop Officer Override Controls</span>
                </div>

                {/* Category Override */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Category (AI Confidence: {Math.round(reviewComplaint.categoryConfidence * 100)}%)
                  </label>
                  <select
                    value={overrideCategory}
                    onChange={(e) => {
                      setOverrideCategory(e.target.value);
                      const routing = getRoutingInfo(reviewComplaint.districtId, e.target.value);
                      setOverrideDepartment(routing.department);
                    }}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  >
                    {Object.values(COMPLAINT_CATEGORIES).map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.hindiName})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Priority Override */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Priority Level
                  </label>
                  <select
                    value={overridePriority}
                    onChange={(e) => setOverridePriority(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  >
                    {Object.values(PRIORITY_LEVELS).map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label} Priority ({p.hindiLabel})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Department Assignment */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Assigned Municipal Department
                  </label>
                  <input
                    type="text"
                    value={overrideDepartment}
                    onChange={(e) => setOverrideDepartment(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>

                {/* Status Updater */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Lifecycle Status
                  </label>
                  <select
                    value={overrideStatus}
                    onChange={(e) => setOverrideStatus(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  >
                    <option value="submitted">Submitted (दर्ज)</option>
                    <option value="assigned">Assigned to Dept (आवंटित)</option>
                    <option value="in_progress">Work in Progress / Field Inspection (कार्य प्रगति पर)</option>
                    <option value="resolved">Resolved & Closed (समाधान पूर्ण)</option>
                  </select>
                </div>

                {/* Internal Officer Remarks */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Officer Field Remarks / Notes
                  </label>
                  <textarea
                    rows={2}
                    value={officerNotes}
                    onChange={(e) => setOfficerNotes(e.target.value)}
                    placeholder="e.g. Dispatched suction truck #12; concrete cover placed on site..."
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  ></textarea>
                </div>

                {/* Submit Action Buttons */}
                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={handleCloseReview}
                    className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveReview}
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Save & Log to Audit Trail</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
