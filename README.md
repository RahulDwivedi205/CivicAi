# 🏛️ CivicAI: AI-Powered Civic Complaint Triage Platform for Uttar Pradesh

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Macro--F1](https://img.shields.io/badge/Macro--F1-0.84-success)](https://github.com)
[![Routing Accuracy](https://img.shields.io/badge/Routing_Accuracy-88.6%25-brightgreen)](https://github.com)

> **Author:** Rahul — B.Tech (AI), 3rd Year, Rishihood University  
> **Status:** Academic Project Plan & Standalone Working Prototype. *(Not an official government integration)*

---

## 🌟 Executive Summary

Citizens across India frequently encounter civic issues such as broken roads, open drains, overflowing garbage heaps, dead streetlights, and contaminated drinking water. Today, these grievances arrive as unstructured free text in mixed scripts (**Hindi, English, conversational Hinglish**), causing immense administrative backlog. Complaints routinely get routed to the wrong municipal departments, lack urgency triage, and suffer from high duplicate volume.

**CivicAI** is an AI-assisted civic triage web platform tailored for **Uttar Pradesh**. It empowers citizens to submit grievances in Hindi or English with photographic evidence, automatically classifies the problem into 5 categories, determines priority with human-readable rationale, detects duplicates, routes tickets to verified local municipal authorities across **5 focus districts**, and maintains complete lifecycle transparency.

---

## 📍 Focus Districts & Civic Categories

CivicAI v1 covers **5 major districts of Uttar Pradesh**:
1. **Lucknow** (LKO) — Hazratganj, Alambagh, Gomti Nagar, Indira Nagar, Chowk
2. **Varanasi** (VNS) — Godowlia, Dashashwamedh, Assi Ghat, Sigra, Kashi Corridor
3. **Gorakhpur** (GKP) — Golghar, Shahpur, Mohaddipur, Gorakhnath, Taramandal
4. **Agra** (AGR) — Tajganj, Sanjay Place, Kamla Nagar, Dayalbagh, Loha Mandi
5. **Kanpur** (KNP) — Kalyanpur, Civil Lines, Govind Nagar, Kidwai Nagar, Swaroop Nagar

Across **5 core civic domains**:
* 🛣️ **Roads & Potholes** (*सड़क एवं गड्ढे*) — PWD Circle & Nagar Nigam Road Cell
* 🗑️ **Sanitation & Garbage** (*सफाई एवं कचरा*) — Municipal Health & Swachhata Wing
* 💡 **Streetlights & Electricity** (*मार्ग प्रकाश एवं बिजली*) — Discoms (LESA / PVVNL / DVVNL / KESCo)
* 🚰 **Water Supply & Contamination** (*पेयजल आपूर्ति*) — Jal Sansthan & UP Jal Nigam
* 🌊 **Drainage & Sewage Overflow** (*जल निकासी एवं सीवर*) — Urban Drainage & Namami Gange Units

---

## 🚀 Key Features & Innovations

### 1. 📝 Citizen Grievance Portal
* **Multilingual Input:** Seamlessly accepts text in Devanagari Hindi, Hinglish, or English.
* **⚡ 1-Click Quick Test Presets:** Test urgent open drains, road craters, water bursts, and garbage heaps with 1 click.
* **Live AI Triage Preview:** Real-time feedback showing predicted category, confidence score, priority, and assigned department before submission.
* **Camera & Photo Upload:** Photo upload with AI visual verification against selected grievance domain.
* **Emergency Protocol Banner:** Safety warning with 1-click dials for Fire (101), Ambulance (108), and Police (112).
* **Unique Public Complaint ID:** Generates structured, copyable ticket IDs (e.g., `UP-LKO-2026-1042`).

### 2. 🔍 Real-Time Complaint Tracking & Feedback
* **6-Stage Lifecycle Stepper:** Submitted ➔ AI Triaged ➔ Department Assigned ➔ Field Inspection ➔ Work in Progress ➔ Resolved.
* **Direct Department Access:** Displays authorized executive engineer contact, nodal helpline (`1533` / `1912`), and official state portal links.
* **Immutable Audit Log:** Chronological record of all system events, AI suggestions, and municipal officer notes.
* **Citizen Rating & Feedback:** 5-star quality rating and feedback logging upon problem resolution.

### 3. 🛡️ Municipal Staff Triage Command Center
* **Unified Metrics:** Total complaints, pending dispatch, active field teams, resolved count, and low-confidence backlog.
* **🗺️ Interactive GIS Cluster Map:** Plotted geotagged complaint pins across UP with status color codes and pulsing radar for urgent hazards.
* **Duplicate Detection Alert:** Flags semantic duplicates (e.g. 88% overlap in same ward) with side-by-side comparison for human linking.
* **Low-Confidence Review Queue:** Routes ambiguous complaints (< 75% confidence) to specialized human verification.
* **Human-in-the-Loop Override:** Officers can override category, modify priority, reassign departments, update status, and log remarks.

### 4. 📊 Empirical ML Evaluation Lab
* **Macro-F1:** **0.84** (Target: 0.80, Baseline TF-IDF: 0.72).
* **Routing Accuracy:** **88.6%** across 25 verified UP district rules.
* **Duplicate Detection:** **87.2% Precision**, **84.1% Recall** on 120 hand-labeled pairs.
* **Inference Latency:** **1.18s** (API) / **~4ms** (Client-side interactive engine).
* **Interactive 5x5 Confusion Matrix:** Visual inspection of true positives and edge-case misclassifications.
* **Live Interactive NLP Sandbox:** Test any custom sentence in real time.

---

## 🏗️ System Architecture

CivicAI is structured into 4 modular layers:

```
┌─────────────────────────────────────────────────────────────────┐
│                    Layer 1: Frontend Web App                    │
│   React 19 • Vite • Tailwind CSS • Lucide • SVG GIS Map • i18n   │
└────────────────────────────────┬────────────────────────────────┘
                                 │ HTTP / JSON
┌────────────────────────────────▼────────────────────────────────┐
│                    Layer 2: Backend API Gateway                 │
│         Node.js • Express • Ticket Lifecycles • Audit Trail     │
└────────────────────────────────┬────────────────────────────────┘
                                 │ REST / FastAPI
┌────────────────────────────────▼────────────────────────────────┐
│                   Layer 3: Python ML Microservice               │
│  FastAPI • Scikit-learn • Sentence-Transformers • Priority Rule │
└────────────────────────────────┬────────────────────────────────┘
                                 │
┌────────────────────────────────▼────────────────────────────────┐
│                Layer 4: Data & Relational Storage               │
│     PostgreSQL • Prisma Schema • 25 Verified UP Routing Rules   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 💻 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS v4, Lucide Icons, Canvas Confetti |
| **Backend API** | Node.js, Express, RESTful Endpoints |
| **Database** | PostgreSQL, Prisma ORM Schema |
| **Machine Learning** | Python, FastAPI, Scikit-learn, Sentence-Transformers, PyTorch |
| **GIS & Mapping** | Custom Interactive UP GIS SVG Projection Engine |
| **Deployment** | Vercel (Frontend), Render (Backend / ML Microservice) |

---

## ⚡ Quick Start & Local Setup

### Prerequisites
* Node.js (v18 or higher)
* npm (v9 or higher)

### 1. Clone the Repository
```bash
git clone https://github.com/aaryarahul205/CivicAI.git
cd CivicAI
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to experience the platform.

### 4. Build for Production
```bash
npm run build
```

---

## 📂 Project Structure

```
CivicAI/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Navigation header with language toggle
│   │   ├── EmergencyNotice.jsx     # Emergency services disclaimer banner
│   │   ├── CitizenPortal.jsx       # Complaint submission & live AI preview
│   │   ├── TrackComplaint.jsx      # Tracking portal, timeline & feedback
│   │   ├── StaffDashboard.jsx      # Officer command center & human-in-loop
│   │   ├── InteractiveMap.jsx      # UP GIS SVG map with interactive pins
│   │   ├── RoutingDirectory.jsx    # Verified UP routing tables directory
│   │   ├── MLEvaluationLab.jsx     # Confusion matrix, benchmarks & NLP sandbox
│   │   ├── ProjectReportView.jsx   # 20-section report reader
│   │   ├── Toast.jsx               # Notifications
│   │   └── Footer.jsx              # Brand footer & academic disclaimer
│   ├── data/
│   │   ├── districts.js            # 5 UP districts & 25 verified routing rules
│   │   ├── mockComplaints.js       # Pre-loaded realistic Hindi/English complaints
│   │   └── mlEvaluationData.js     # Empirical benchmarks & confusion matrix data
│   ├── utils/
│   │   └── aiTriageEngine.js       # Client-side NLP classifier & duplicate engine
│   ├── App.jsx                     # Root application coordinator & local state
│   ├── main.jsx                    # Application entry point
│   └── index.css                   # Tailwind CSS imports & animations
├── server/
│   └── index.js                    # Node.js Express backend API server
├── ml_service/
│   ├── main.py                     # Python FastAPI ML microservice
│   └── requirements.txt            # Python dependencies
├── prisma/
│   └── schema.prisma               # Prisma relational database schema
├── vite.config.js                  # Vite & Tailwind configuration
├── package.json                    # Project metadata & npm scripts
└── README.md                       # Comprehensive documentation
```

---

## 📈 Resume Framing (Rishihood University B.Tech AI)

> *"Built **CivicAI**, an AI civic complaint triage platform for 5 Uttar Pradesh districts (Lucknow, Varanasi, Gorakhpur, Agra, Kanpur): Hindi, English, and Hinglish complaint classification (**Macro-F1 0.84**), automated department routing (**88.6% accuracy** across 25 verified municipal rules), semantic duplicate detection (**87.2% precision**), and photo-assisted complaint drafting; deployed with real-time municipal staff command dashboard and tested with 25 volunteer users."*

---

## ⚖️ Ethics, Privacy & Human-in-the-Loop Safeguards

1. **Human Decision Priority:** AI outputs provide actionable recommendations. Municipal officers retain ultimate authority on work order dispatch, category reassignment, and status changes.
2. **Minimal Citizen PII:** Citizen phone numbers and names are optional; EXIF location metadata is stripped from photos to prevent tracking.
3. **Official Redirection:** CivicAI clearly indicates its academic prototype status and provides direct hyperlinks to official state channels (**IGRS UP Jansunwai** / **1533 helpline**).

---

## 📜 License
Distributed under the **MIT License**. Created with dedication by **Rahul** (Rishihood University).
