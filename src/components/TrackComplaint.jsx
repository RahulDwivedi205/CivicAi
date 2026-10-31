import React, { useState, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  Building2,
  PhoneCall,
  ExternalLink,
  MapPin,
  Calendar,
  AlertTriangle,
  History,
  Star,
  Copy,
  Check,
  ArrowRight,
  ShieldAlert,
  Send
} from 'lucide-react';
import { COMPLAINT_CATEGORIES, PRIORITY_LEVELS, UP_DISTRICTS } from '../data/districts';

export default function TrackComplaint({
  complaints,
  setComplaints,
  selectedComplaintId,
  setSelectedComplaintId,
  language,
  showToast
}) {
  const isHindi = language === 'hi';
  const [searchId, setSearchId] = useState(selectedComplaintId || '');
  const [currentComplaint, setCurrentComplaint] = useState(null);
  const [copied, setCopied] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Sync with selected complaint or prop
  useEffect(() => {
    if (selectedComplaintId) {
      setSearchId(selectedComplaintId);
      const match = complaints.find(
        (c) => c.publicId.toLowerCase() === selectedComplaintId.toLowerCase() || c.id === selectedComplaintId
      );
      if (match) setCurrentComplaint(match);
    } else if (complaints.length > 0 && !currentComplaint) {
      // Default to first complaint
      setCurrentComplaint(complaints[0]);
      setSearchId(complaints[0].publicId);
    }
  }, [selectedComplaintId, complaints]);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (!searchId.trim()) return;

    const query = searchId.trim().toUpperCase();
    const match = complaints.find(
      (c) => c.publicId.toUpperCase() === query || c.publicId.toUpperCase().includes(query)
    );

    if (match) {
      setCurrentComplaint(match);
      setSelectedComplaintId(match.publicId);
      showToast(isHindi ? `शिकायत लोड की गई: ${match.publicId}` : `Found complaint: ${match.publicId}`);
    } else {
      showToast(isHindi ? 'शिकायत नहीं मिली। कृपया आईडी जांचें।' : 'Complaint ID not found in system records.');
    }
  };

  const handleCopyId = () => {
    if (currentComplaint?.publicId) {
      navigator.clipboard.writeText(currentComplaint.publicId);
      setCopied(true);
      showToast(isHindi ? 'शिकायत संख्या कॉपी की गई!' : 'Complaint ID copied!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!currentComplaint) return;

    const updated = {
      ...currentComplaint,
      rating: userRating,
      feedback: feedbackText || 'Citizen satisfied with timely redressal.',
      auditLogs: [
        ...currentComplaint.auditLogs,
        {
          id: `aud-feedback-${Date.now()}`,
          action: 'Citizen Feedback Received',
          actor: 'Citizen (Public)',
          timestamp: new Date().toISOString(),
          details: `Rated ${userRating} Stars. Feedback: "${feedbackText || 'Satisfied'}"`
        }
      ]
    };

    setComplaints((prev) => prev.map((c) => (c.id === currentComplaint.id ? updated : c)));
    setCurrentComplaint(updated);
    setFeedbackSubmitted(true);
    showToast(isHindi ? 'आपकी प्रतिक्रिया दर्ज कर ली गई है। धन्यवाद!' : 'Feedback submitted successfully. Thank you!');
  };

  // Status Stepper Definition
  const statusSteps = [
    { key: 'submitted', label: isHindi ? 'शिकायत दर्ज' : 'Grievance Lodged', sub: 'Citizen Portal' },
    { key: 'triaged', label: isHindi ? 'AI वर्गीकरण' : 'AI Triage & NLP', sub: 'Auto-validation' },
    { key: 'assigned', label: isHindi ? 'विभाग को आवंटित' : 'Department Assigned', sub: 'Routing Engine' },
    { key: 'in_progress', label: isHindi ? 'कार्य प्रगति पर' : 'Field Work In Progress', sub: 'Site Inspection' },
    { key: 'resolved', label: isHindi ? 'समाधान पूर्ण' : 'Redressed & Resolved', sub: 'Closed' }
  ];

  const getStepStatus = (stepKey, currentStatus) => {
    const order = ['submitted', 'triaged', 'assigned', 'in_progress', 'resolved'];
    const currentIndex = order.indexOf(currentStatus);
    const stepIndex = order.indexOf(stepKey);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  const category = currentComplaint ? COMPLAINT_CATEGORIES[currentComplaint.category] || COMPLAINT_CATEGORIES.roads : null;
  const priority = currentComplaint ? PRIORITY_LEVELS[currentComplaint.priority] || PRIORITY_LEVELS.medium : null;

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {isHindi ? 'शिकायत की स्थिति जांचें' : 'Track Grievance Status'}
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          {isHindi
            ? 'अपनी विशिष्ट शिकायत आईडी (जैसे UP-LKO-2026-1042) दर्ज करें और वास्तविक समय की प्रगति देखें।'
            : 'Enter your Public Complaint ID (e.g. UP-LKO-2026-1042) to inspect real-time departmental routing, field updates, and audit trail.'}
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mt-5 flex items-center max-w-lg mx-auto shadow-sm">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="e.g. UP-LKO-2026-1042"
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-l-xl text-sm font-semibold tracking-wide text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 uppercase placeholder:normal-case placeholder:font-normal"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-r-xl transition-colors cursor-pointer shrink-0"
          >
            {isHindi ? 'खोजें' : 'Track'}
          </button>
        </form>

        {/* Quick Sample Complaint Chips */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs">
          <span className="text-slate-500 font-medium">{isHindi ? 'नमूना देखें:' : 'Try sample IDs:'}</span>
          {complaints.slice(0, 4).map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSearchId(c.publicId);
                setCurrentComplaint(c);
                setSelectedComplaintId(c.publicId);
              }}
              className="bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 font-mono text-[11px] px-2 py-0.5 rounded-md border border-slate-200 transition-colors cursor-pointer"
            >
              {c.publicId}
            </button>
          ))}
        </div>
      </div>

      {currentComplaint ? (
        <div className="space-y-6">
          {/* Main Status Banner Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            {/* Header with Complaint ID, Badges, and Copy */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                    {isHindi ? 'सार्वजनिक शिकायत संख्या' : 'Public Grievance ID'}
                  </span>
                  <button
                    onClick={handleCopyId}
                    className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                    title="Copy ID"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 tracking-tight mt-0.5">
                  {currentComplaint.publicId}
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-medium text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                    {currentComplaint.ward}, {currentComplaint.districtName}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(currentComplaint.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>

              {/* Status & Priority Pills */}
              <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    currentComplaint.status === 'resolved'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : currentComplaint.status === 'in_progress'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                  }`}
                >
                  Status: {currentComplaint.status.replace('_', ' ')}
                </span>
                <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider ${priority?.badge}`}>
                  {priority?.label} Priority
                </span>
                <span className={`px-2.5 py-0.5 rounded-md text-xs font-semibold ${category?.badgeColor}`}>
                  {category?.name}
                </span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="py-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
                {isHindi ? 'निवारण प्रगति (Resolution Journey)' : 'Lifecycle Progress'}
              </h3>
              <div className="relative">
                <div className="overflow-x-auto pb-4">
                  <div className="min-w-[640px] flex items-center justify-between relative">
                    {/* Background Progress Bar */}
                    <div className="absolute top-5 left-6 right-6 h-1 bg-slate-100 -z-0"></div>

                    {statusSteps.map((step, idx) => {
                      const status = getStepStatus(step.key, currentComplaint.status);
                      const isComplete = status === 'completed';
                      const isCurrent = status === 'current';

                      return (
                        <div key={step.key} className="flex flex-col items-center text-center relative z-10 px-2">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                              isComplete
                                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200'
                                : isCurrent
                                ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 shadow-md shadow-indigo-200'
                                : 'bg-slate-100 text-slate-400 border border-slate-200'
                            }`}
                          >
                            {isComplete ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                          </div>
                          <div className="mt-2.5">
                            <div className={`text-xs font-bold ${isCurrent ? 'text-indigo-600' : isComplete ? 'text-slate-800' : 'text-slate-400'}`}>
                              {step.label}
                            </div>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              {step.sub}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Complaint Text & Photo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    {isHindi ? 'नागरिक द्वारा दर्ज शिकायत' : 'Citizen Grievance Description'}
                  </h4>
                  <p className="text-sm text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                    "{currentComplaint.text}"
                  </p>
                </div>

                {/* AI Triage Rationale */}
                <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-2.5">
                  <div className="p-1.5 rounded-md bg-indigo-600 text-white shrink-0 mt-0.5">
                    <Building2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xs text-slate-700">
                    <div className="font-bold text-indigo-950">
                      AI Triage Assessment ({Math.round(currentComplaint.categoryConfidence * 100)}% NLP Confidence)
                    </div>
                    <p className="mt-0.5 text-slate-600">
                      {currentComplaint.priorityReason}
                    </p>
                  </div>
                </div>
              </div>

              {/* Photo Preview */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {isHindi ? 'संलग्न फोटो साक्ष्य' : 'Photographic Evidence'}
                </h4>
                {currentComplaint.photoUrl ? (
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video relative group">
                    <img
                      src={currentComplaint.photoUrl}
                      alt="Civic issue"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                      <span className="text-[11px] text-white font-medium">Geotagged & AI Inspected</span>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 aspect-video flex items-center justify-center text-xs text-slate-400">
                    No photo uploaded
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Department Contact & Routing Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>{isHindi ? 'आवंटित सरकारी विभाग' : 'Designated Municipal Department'}</span>
              </h3>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {currentComplaint.departmentName}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Authorized Redressal Authority • {currentComplaint.districtName} Division
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-200 text-xs">
                  <div className="flex items-center gap-1.5 text-indigo-700 font-semibold">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Helpline: {currentComplaint.officialHelpline || '1533'}</span>
                  </div>
                  {currentComplaint.officialPortal && (
                    <a
                      href={currentComplaint.officialPortal}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-slate-600 hover:text-indigo-600 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Official Portal</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Audit Trail & Action History */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-indigo-600" />
                <span>{isHindi ? 'ऑडिट इतिहास एवं लॉग्स' : 'Official Audit Trail & Action Log'}</span>
              </h3>
              <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                {currentComplaint.auditLogs?.map((log, idx) => (
                  <div key={log.id || idx} className="text-xs pb-2.5 border-b border-slate-100 last:border-0">
                    <div className="flex items-center justify-between text-slate-500 text-[10px]">
                      <span className="font-bold text-slate-700">{log.action}</span>
                      <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="text-slate-600 mt-0.5">{log.details}</div>
                    <div className="text-[10px] text-slate-400 italic">By: {log.actor}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Citizen Feedback Form (If Resolved) */}
          {currentComplaint.status === 'resolved' && (
            <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-2xl border border-emerald-200 p-6 text-slate-800">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-base text-emerald-950">
                  {isHindi ? 'समस्या का समाधान हो चुका है — अपनी राय दें' : 'Grievance Redressed — Rate Resolution Quality'}
                </h3>
              </div>
              <p className="text-xs text-slate-600 mb-4">
                {isHindi
                  ? 'यह शिकायत संबंधित विभाग द्वारा हल कर दी गई है। कृपया अपनी संतुष्टि रेटिंग दें ताकि व्यवस्था को और बेहतर बनाया जा सके।'
                  : 'Municipal team marked this issue as resolved. Share your feedback to improve public accountability.'}
              </p>

              {currentComplaint.rating ? (
                <div className="bg-white p-4 rounded-xl border border-emerald-200 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 mb-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={`w-4 h-4 ${s <= currentComplaint.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                      ))}
                    </div>
                    <p className="text-xs text-slate-700 italic">"{currentComplaint.feedback}"</p>
                  </div>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                    Feedback Logged
                  </span>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-3">
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setUserRating(star)}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star className={`w-6 h-6 ${star <= userRating ? 'fill-amber-400' : 'text-slate-300'}`} />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-2">
                      {userRating === 5 ? 'Excellent (बहुत अच्छा)' : userRating >= 3 ? 'Satisfactory (संतोषजनक)' : 'Needs Improvement'}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder={isHindi ? 'अपनी टिप्पणी लिखें (उदा. कार्य समय पर पूरा हुआ)...' : 'Remarks on repair quality...'}
                      className="flex-1 bg-white border border-emerald-300 rounded-xl px-3.5 py-2 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isHindi ? 'जमा करें' : 'Submit'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
          <ShieldAlert className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">No Complaint Selected</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Please search for a Public Complaint ID above or click on one of the sample IDs.
          </p>
        </div>
      )}
    </div>
  );
}
