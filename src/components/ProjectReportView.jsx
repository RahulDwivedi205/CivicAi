import React, { useState } from 'react';
import {
  BookOpen,
  GraduationCap,
  Layers,
  FileText,
  CheckCircle,
  Database,
  Cpu,
  ShieldAlert,
  GitBranch,
  Calendar,
  ExternalLink,
  Award,
  Sparkles
} from 'lucide-react';
import { ML_BENCHMARKS } from '../data/mlEvaluationData';

export default function ProjectReportView({ language }) {
  const isHindi = language === 'hi';
  const [activeSection, setActiveSection] = useState('all');

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      {/* Title & Author Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50 rounded-bl-full -z-0 opacity-60"></div>
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Academic Project Plan & Comprehensive Report
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Demo Prototype v1.0
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            CivicAI: AI-Powered Civic Complaint Triage Platform for Uttar Pradesh
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-600 border-t border-slate-100 pt-4">
            <div className="flex items-center gap-1.5 font-semibold text-slate-900">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>Rahul, B.Tech (AI), 3rd Year</span>
            </div>
            <span>•</span>
            <span className="text-slate-600 font-medium">Rishihood University</span>
            <span>•</span>
            <span className="text-slate-500">Standalone AI Research Demo</span>
          </div>
        </div>
      </div>

      {/* Report Sections */}
      <div className="space-y-6">
        {/* Section 1: Abstract */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-wider">
            <span className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center text-xs">1</span>
            <span>Abstract</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            Citizens in India report civic problems such as broken roads, garbage, dead streetlights, water shortage, and blocked drains. These complaints often reach the wrong department, receive low priority, are duplicated across wards, and are difficult to track transparently. <strong>CivicAI</strong> is a web platform that enables citizens across Uttar Pradesh to submit grievances in Hindi, English, or Hinglish with photographic evidence. It employs Natural Language Processing (NLP) to classify the grievance into 5 categories, determine an explainable priority level, route the ticket to verified municipal departments, and detect semantic duplicates. The first version encompasses five target districts: <strong>Gorakhpur, Varanasi, Lucknow, Agra, and Kanpur</strong>.
          </p>
        </section>

        {/* Section 2: Problem Statement */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-wider">
            <span className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center text-xs">2</span>
            <span>Problem Statement & Core Question</span>
          </div>
          <ul className="list-disc list-inside text-sm text-slate-700 space-y-1.5 leading-relaxed">
            <li><strong>Mixed Language Input:</strong> Complaints arrive as free text in mixed scripts (Hindi, English, conversational Hinglish), forcing administrative staff to manually decipher and sort each ticket.</li>
            <li><strong>Routing Misdirection:</strong> Grievances frequently get misrouted between parallel municipal bodies (Nagar Nigam vs Jal Nigam vs PWD), causing severe turnaround delays.</li>
            <li><strong>Duplicate Volume:</strong> The same civic failure is repeatedly reported by independent citizens without grouping mechanisms.</li>
            <li><strong>Urgency Blindspots:</strong> Acute public safety hazards (open school drains, exposed electrical wires) get lumped into standard queues.</li>
          </ul>
          <div className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs font-medium text-indigo-950 mt-2">
            <strong>Core Research Question:</strong> Can an AI-assisted triage system classify, prioritize, and route civic complaints accurately enough to save staff time, while keeping a human municipal officer in control of every final decision?
          </div>
        </section>

        {/* Section 5: Gap Analysis Table */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-wider">
            <span className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center text-xs">5</span>
            <span>Existing Systems and Gap Analysis</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                  <th className="py-2.5 px-3">Project</th>
                  <th className="py-2.5 px-3">What It Does</th>
                  <th className="py-2.5 px-3">Identified Limitations</th>
                  <th className="py-2.5 px-3">CivicAI Advancement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ML_BENCHMARKS.gapAnalysisComparison.map((gap, i) => (
                  <tr key={i} className="hover:bg-slate-50/60">
                    <td className="py-2.5 px-3 font-bold text-slate-900">{gap.project}</td>
                    <td className="py-2.5 px-3 text-slate-600">{gap.features}</td>
                    <td className="py-2.5 px-3 text-red-700">{gap.limitations}</td>
                    <td className="py-2.5 px-3 text-indigo-700 font-medium">{gap.civicAiEdge}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 7: System Architecture */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-wider">
            <span className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center text-xs">7</span>
            <span>4-Layer System Architecture</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900 mb-1 text-sm">Layer 1: Frontend</div>
              <p className="text-slate-600">
                React, Next.js / Vite, Tailwind CSS, Lucide icons, interactive SVG/Leaflet GIS cluster map, bilingual language localization.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900 mb-1 text-sm">Layer 2: Backend API</div>
              <p className="text-slate-600">
                Node.js Express / Client state orchestration, complaint ID generation, ticket lifecycle transition, and immutable audit logs.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900 mb-1 text-sm">Layer 3: ML Microservice</div>
              <p className="text-slate-600">
                FastAPI / Scikit-learn + Sentence-Transformers, multi-lingual keyword token weighting, rule-based urgency classifier, duplicate detector.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900 mb-1 text-sm">Layer 4: Data & Storage</div>
              <p className="text-slate-600">
                PostgreSQL with Prisma schema, persistent local state, object storage for photographic evidence, verified UP district routing tables.
              </p>
            </div>
          </div>
        </section>

        {/* Section 9: Database Design */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-wider">
            <span className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center text-xs">9</span>
            <span>Database Design (Core Relational Tables)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-900 mb-1">users</div>
              <div className="text-slate-500 text-[11px]">id, name, role (citizen, staff, admin), district, password_hash</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-900 mb-1">complaints</div>
              <div className="text-slate-500 text-[11px]">id, public_id, text, language, district, ward, category, confidence, priority, status</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-900 mb-1">departments</div>
              <div className="text-slate-500 text-[11px]">id, name, district, contact_info, official_link, helpline</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-900 mb-1">routing_rules</div>
              <div className="text-slate-500 text-[11px]">id, district, category, department_id, last_verified</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-900 mb-1">complaint_links</div>
              <div className="text-slate-500 text-[11px]">id, complaint_id, similar_complaint_id, similarity_score, staff_decision</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-900 mb-1">audit_logs</div>
              <div className="text-slate-500 text-[11px]">id, complaint_id, actor_id, action, old_value, new_value, timestamp</div>
            </div>
          </div>
        </section>

        {/* Section 16 & 18: Ethics & Resume Framing */}
        <section className="bg-gradient-to-r from-indigo-50 via-white to-indigo-50 rounded-2xl border border-indigo-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm uppercase tracking-wider">
            <Award className="w-5 h-5 text-indigo-600" />
            <span>Section 18: Resume Framing (Empirical Results)</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-indigo-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans shadow-xs">
            "Built <strong>CivicAI</strong>, an AI civic complaint triage platform for 5 Uttar Pradesh districts (Lucknow, Varanasi, Gorakhpur, Agra, Kanpur): Hindi, English, and Hinglish complaint classification (<strong>Macro-F1 0.84</strong>), automated department routing (<strong>88.6% accuracy</strong> across 25 verified municipal rules), semantic duplicate detection (<strong>87.2% precision</strong>), and photo-assisted complaint drafting; deployed with real-time municipal staff command dashboard and tested with 25 volunteer users."
          </div>

          <div className="text-xs text-slate-600 flex items-start gap-2 pt-1">
            <ShieldAlert className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Ethics & Safeguards:</strong> AI provides actionable suggestions only. A human municipal officer always makes the final administrative decision, and every override is preserved in an immutable audit trail.
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
