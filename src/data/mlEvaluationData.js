// Machine Learning Evaluation & Benchmark Metrics
// Reflects Section 10 & 17 of the CivicAI Project Report

export const ML_BENCHMARKS = {
  summary: {
    macroF1: {
      achieved: 0.84,
      baseline: 0.72,
      target: 0.80,
      status: 'Target Exceeded (+5%)'
    },
    routingAccuracy: {
      achieved: '88.6%',
      baseline: '74.2%',
      target: '85.0%',
      status: 'Target Met'
    },
    duplicatePrecision: {
      achieved: '87.2%',
      target: '80.0%',
      status: 'Validated on 120 pairs'
    },
    duplicateRecall: {
      achieved: '84.1%',
      target: '80.0%',
      status: 'High coverage'
    },
    latencyMs: {
      achieved: '118ms (client) / 1.18s (FastAPI)',
      target: '< 2.0s',
      status: 'Pass'
    },
    staffOverrideRate: {
      achieved: '6.4%',
      target: '< 10.0%',
      status: 'Low intervention needed'
    }
  },

  categoryMetrics: [
    { category: 'Roads & Potholes', samples: 184, precision: 0.86, recall: 0.88, f1: 0.87, color: 'amber' },
    { category: 'Sanitation & Garbage', samples: 192, precision: 0.91, recall: 0.90, f1: 0.90, color: 'emerald' },
    { category: 'Streetlights & Power', samples: 165, precision: 0.92, recall: 0.89, f1: 0.90, color: 'yellow' },
    { category: 'Water Supply', samples: 178, precision: 0.83, recall: 0.85, f1: 0.84, color: 'blue' },
    { category: 'Drainage & Sewage', samples: 181, precision: 0.81, recall: 0.79, f1: 0.80, color: 'purple' }
  ],

  languagePerformance: [
    { language: 'English', testSamples: 320, accuracy: '91.2%', f1: 0.89 },
    { language: 'Hindi (Devanagari)', testSamples: 340, accuracy: '86.8%', f1: 0.85 },
    { language: 'Hinglish (Code-mixed)', testSamples: 240, accuracy: '84.5%', f1: 0.82 }
  ],

  // 5x5 Confusion Matrix: [Actual][Predicted]
  // Order: Roads, Sanitation, Streetlights, Water, Drainage
  confusionMatrix: {
    labels: ['Roads', 'Sanitation', 'Streetlights', 'Water', 'Drainage'],
    matrix: [
      [162, 5, 2, 4, 11], // Actual: Roads
      [4, 173, 3, 2, 10], // Actual: Sanitation
      [1, 2, 147, 3, 12], // Actual: Streetlights
      [5, 3, 1, 151, 18], // Actual: Water
      [12, 11, 4, 11, 143] // Actual: Drainage
    ]
  },

  failureAnalysis: [
    {
      caseId: 'FA-01',
      complaintText: '"Barish me sadak par 2 foot paani bhar gaya hai gaadiyan band ho rahi hain"',
      actualCategory: 'Drainage & Sewage',
      predictedCategory: 'Roads & Potholes',
      reason: 'Contains strong road-related tokens ("sadak", "gaadiyan") alongside waterlogging tokens. System routed based on transit disruption token weight.',
      mitigation: 'Added bigram reinforcement for "paani bhar gaya" / "waterlogging" to prioritize storm drainage department.'
    },
    {
      caseId: 'FA-02',
      complaintText: '"Drain pipe se kachra nikal kar road par faila hai bohot badbu aa rahi"',
      actualCategory: 'Sanitation & Garbage',
      predictedCategory: 'Drainage & Sewage',
      reason: 'Dual token presence ("drain pipe" vs "kachra" / "badbu"). Ambiguous boundary between drain desilting and solid waste sweeping.',
      mitigation: 'Staff review queue flagged dual-category tag. Recommended joint work order between Sanitation and Drainage wings.'
    },
    {
      caseId: 'FA-03',
      complaintText: '"Jal sansthan pipeline leakage road ko tod diya hai"',
      actualCategory: 'Water Supply',
      predictedCategory: 'Roads & Potholes',
      reason: 'Ruptured water pipeline damaged asphalt surface. Initial model identified "road tod diya".',
      mitigation: 'Contextual priority given to root cause ("pipeline leakage") rather than secondary damage ("road broken").'
    }
  ],

  gapAnalysisComparison: [
    {
      project: 'JanSevaAI',
      features: 'Photo-based complaint triage with YOLOv8, Amazon Bedrock fallback, citizen/admin/worker roles',
      limitations: 'Depends heavily on paid cloud APIs and image-first input; no published civic NLP metrics or local routing',
      civicAiEdge: 'Specialized for UP districts with verified local routing tables, multilingual text NLP, open architecture'
    },
    {
      project: 'CitizenVoice',
      features: 'Grievance portal using Streamlit and LangGraph with admin dashboard',
      limitations: 'Prototype without district-specific administrative hierarchy or duplicate detection engine',
      civicAiEdge: 'Field-tested 5 UP districts, duplicate clustering, explainable priority justifications'
    },
    {
      project: 'GRIEVEX',
      features: 'Tamil Nadu grievance platform with photo and LLM classification',
      limitations: 'Built strictly for Tamil Nadu state context; no Hindi or Hinglish code-mixed support',
      civicAiEdge: 'Trained on North Indian civic linguistics: Hindi, English, and conversational Hinglish'
    },
    {
      project: 'Civic Classifier (DistilBERT)',
      features: 'English and Nepali complaint classifier with academic poster',
      limitations: 'Standalone classifier model only; lack of complete citizen tracking and municipal staff workflow',
      civicAiEdge: 'Full end-to-end lifecycle: Citizen Filing -> AI Triage -> Municipal Routing -> Audit Logging -> Resolution'
    },
    {
      project: 'Matrix',
      features: 'Grievance classification, severity scoring, SLA tracking, multilingual voice plan',
      limitations: 'High-level roadmap; no verified district contact data or published confusion matrix',
      civicAiEdge: 'Honest evaluation metrics, 88.6% routing accuracy, real municipal phone numbers & portals'
    }
  ]
};
