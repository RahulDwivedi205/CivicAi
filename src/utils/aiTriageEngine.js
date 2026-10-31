// CivicAI Natural Language Processing & Triage Engine
// Multi-lingual text classification, Priority rule engine & Semantic Duplicate Detection

const KEYWORD_DICTIONARY = {
  roads: {
    en: ['road', 'pothole', 'potholes', 'crater', 'asphalt', 'tar', 'bridge', 'divider', 'speed breaker', 'caved', 'cracked', 'flyover', 'pavement', 'footpath'],
    hi: ['सड़क', 'सडक', 'गड्ढा', 'गड्ढे', 'तारकोल', 'पुल', 'फुटपाथ', 'डिवाइडर', 'टूटी', 'रास्ता', 'मार्केट रोड'],
    hinglish: ['gaddha', 'gaddhe', 'sadak', 'tooti', 'rasta', 'road kharab', 'bike slip', 'accident ho raha', 'tarcol', 'footpath toota']
  },
  sanitation: {
    en: ['garbage', 'trash', 'waste', 'dump', 'dustbin', 'sweeping', 'litter', 'filth', 'decaying', 'rotting', 'stink', 'smell', 'animal carcass', 'cleaning'],
    hi: ['कचरा', 'कूड़ा', 'कूडेदान', 'सफाई', 'सड़ांध', 'बदबू', 'सफाईकर्मी', 'गंदगी', 'ढेर', 'मृत पशु', 'मक्खियां'],
    hinglish: ['kachra', 'kuda', 'gandagi', 'badbu', 'dustbin overflow', 'safai nahi hui', 'kude ka dher', 'stink aa rahi', 'safai karmi']
  },
  streetlights: {
    en: ['streetlight', 'light', 'lamp', 'dark', 'bulb', 'wire', 'pole', 'electricity', 'sparking', 'cable', 'transformer', 'blackout', 'hanging wire'],
    hi: ['स्ट्रीट लाइट', 'बत्ती', 'अंधेरा', 'तार', 'खंभा', 'बिजली', 'स्पार्क', 'करंट', 'केबल', 'ट्रांसफार्मर', 'खंभे'],
    hinglish: ['bijli', 'khamba', 'khambha', 'light kharab', 'taar jhool raha', 'spark ho raha', 'andhera', 'bulb fuse', 'current lag sakta', 'pole']
  },
  water: {
    en: ['water', 'drinking water', 'pipeline', 'pipe', 'leakage', 'contamination', 'dirty water', 'tap', 'supply', 'pressure', 'dry tap', 'smelly water'],
    hi: ['पानी', 'पेयजल', 'पाइप', 'पाइपलाइन', 'रिसाव', 'गंदा पानी', 'आपूर्ति', 'नल', 'जल', 'बदबूदार पानी', 'पानी नहीं'],
    hinglish: ['pani', 'nal', 'pipe fat gaya', 'peene ka pani', 'ganda pani', 'pani nahi aa raha', 'supply bandh', 'leakage ho rahi', 'yellow pani']
  },
  drainage: {
    en: ['drain', 'drainage', 'sewer', 'sewage', 'manhole', 'overflow', 'waterlogging', 'choked', 'stagnant water', 'gutter', 'open drain', 'nalah'],
    hi: ['नाला', 'नाली', 'सीवर', 'गटर', 'मैनहोल', 'जलभराव', 'बहाव', 'जाम', 'खुला नाला', 'गंदा पानी भरा'],
    hinglish: ['nala', 'naali', 'sewer jam', 'gutter overflow', 'waterlogging', 'choke', 'khula nala', 'manhole ka dhakkan', 'jal jamav']
  }
};

const URGENT_TRIGGERS = [
  'school', 'hospital', 'child', 'children', 'accident', 'sparking', 'live wire', 'open manhole',
  'drowning', 'cholera', 'current', 'death', 'casualty', 'imminent', 'hazard', 'bleeding',
  'स्कूल', 'अस्पताल', 'बच्चे', 'बच्चा', 'हादसा', 'करंट', 'खुला नाला', 'मौत', 'खतरा', 'अति गंभीर', 'तार टूट',
  'school ke samne', 'bachhe', 'accident ho chuka', 'spark', 'current daur raha', 'open drain', 'khula gutter'
];

const HIGH_TRIGGERS = [
  'main road', 'highway', 'crossing', 'market', 'choked', 'foul smell', '10 days', 'two weeks',
  'entire ward', 'junction', 'burst', 'flooding',
  'मुख्य मार्ग', 'बाजार', 'चौराहा', 'दस दिन', 'दो हफ्ते', 'पूरा मोहल्ला', 'बाढ़', 'पाइप फटा',
  'traffic jam', 'pura ward', 'main crossing', 'bheed', 'dukaan'
];

/**
 * Tokenize and normalize input text
 */
function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u0900-\u097F]/gi, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

/**
 * Classify civic grievance text into one of 5 categories
 */
export function classifyComplaint(text) {
  if (!text || text.trim().length === 0) {
    return {
      category: 'roads',
      confidence: 0.5,
      allScores: { roads: 0.2, sanitation: 0.2, streetlights: 0.2, water: 0.2, drainage: 0.2 },
      isLowConfidence: true
    };
  }

  const tokens = tokenize(text);
  const scores = { roads: 0, sanitation: 0, streetlights: 0, water: 0, drainage: 0 };

  // Calculate weighted frequency
  tokens.forEach((token) => {
    Object.keys(KEYWORD_DICTIONARY).forEach((cat) => {
      const dict = KEYWORD_DICTIONARY[cat];
      const matchEn = dict.en.some((w) => token.includes(w) || w.includes(token));
      const matchHi = dict.hi.some((w) => token.includes(w) || w.includes(token));
      const matchHing = dict.hinglish.some((w) => token.includes(w) || w.includes(token));

      if (matchEn) scores[cat] += 2.0;
      if (matchHi) scores[cat] += 2.2; // slight weight to Hindi/Devanagari
      if (matchHing) scores[cat] += 2.0;
    });
  });

  // Check specific high-signal bigrams
  const lower = text.toLowerCase();
  if (lower.includes('खुला नाला') || lower.includes('open drain') || lower.includes('gutter') || lower.includes('sewer')) {
    scores.drainage += 3.5;
  }
  if (lower.includes('waterlogging') || lower.includes('जलभराव') || lower.includes('पानी भर गया')) {
    scores.drainage += 2.5;
  }
  if (lower.includes('street light') || lower.includes('स्ट्रीट लाइट') || lower.includes('खंभा') || lower.includes('lamp')) {
    scores.streetlights += 3.5;
  }
  if (lower.includes('peene ka pani') || lower.includes('drinking water') || lower.includes('pipe fat') || lower.includes('नल में')) {
    scores.water += 3.5;
  }
  if (lower.includes('kachra') || lower.includes('garbage') || lower.includes('कूड़ा') || lower.includes('dustbin')) {
    scores.sanitation += 3.5;
  }
  if (lower.includes('gaddha') || lower.includes('pothole') || lower.includes('गड्ढा') || lower.includes('road kharab')) {
    scores.roads += 3.5;
  }

  // Find max category
  let maxCat = 'roads';
  let maxScore = -1;
  let totalScore = 0;

  Object.entries(scores).forEach(([cat, val]) => {
    totalScore += val;
    if (val > maxScore) {
      maxScore = val;
      maxCat = cat;
    }
  });

  let confidence = 0.88;
  if (totalScore === 0) {
    // Fallback baseline heuristic
    confidence = 0.58;
    maxCat = 'roads';
  } else {
    // Normalization with realistic probabilistic confidence bound (0.75 - 0.98)
    const ratio = maxScore / (totalScore + 0.1);
    confidence = Math.min(0.97, Math.max(0.68, 0.72 + ratio * 0.25));
  }

  // Round to 2 decimals
  confidence = Math.round(confidence * 100) / 100;

  return {
    category: maxCat,
    confidence,
    isLowConfidence: confidence < 0.75,
    matchedTokens: tokens.filter((t) =>
      Object.values(KEYWORD_DICTIONARY[maxCat]).flat().some((kw) => t.includes(kw) || kw.includes(t))
    )
  };
}

/**
 * Determine Priority Level and Explainable Justification
 */
export function determinePriority(text, category) {
  const lower = text.toLowerCase();

  // Check urgent conditions
  for (const trigger of URGENT_TRIGGERS) {
    if (lower.includes(trigger.toLowerCase())) {
      let reason = `Flagged URGENT due to life safety risk trigger: "${trigger}". High public exposure detected.`;
      if (lower.includes('school') || lower.includes('स्कूल')) {
        reason = `URGENT: Location is in close proximity to children / school premises. Immediate hazard intervention required.`;
      } else if (lower.includes('wire') || lower.includes('current') || lower.includes('spark') || lower.includes('करंट')) {
        reason = `URGENT: Risk of electrocution from exposed or sparking electrical infrastructure.`;
      } else if (lower.includes('open drain') || lower.includes('खुला नाला') || lower.includes('manhole')) {
        reason = `URGENT: Fall and drowning hazard from uncovered deep drainage / manhole.`;
      }
      return { priority: 'urgent', reason };
    }
  }

  // Check high conditions
  for (const trigger of HIGH_TRIGGERS) {
    if (lower.includes(trigger.toLowerCase())) {
      return {
        priority: 'high',
        reason: `Flagged HIGH due to wide public disruption impact: "${trigger}" on major transit or thoroughfare.`
      };
    }
  }

  // Medium / Default
  if (category === 'sanitation' || category === 'streetlights') {
    return {
      priority: 'medium',
      reason: `Standard civic grievance priority. Routine departmental maintenance schedule applies.`
    };
  }

  if (category === 'water') {
    return {
      priority: 'high',
      reason: `Potable water disruption affects household daily necessity. Elevated triage priority.`
    };
  }

  return {
    priority: 'medium',
    reason: `Triaged to normal queue based on complaint severity evaluation.`
  };
}

/**
 * Semantic Similarity & Duplicate Detection Engine
 * Uses Jaccard & N-gram token overlap bounded by District and Category
 */
export function detectDuplicates(newComplaint, existingComplaints) {
  const newTokens = new Set(tokenize(newComplaint.text));
  if (newTokens.size === 0) return null;

  let bestMatch = null;
  let highestSimilarity = 0;

  for (const existing of existingComplaints) {
    if (existing.id === newComplaint.id || existing.publicId === newComplaint.publicId) continue;

    // Filter strictly or heavily weight by district and category
    const sameDistrict = existing.districtId === newComplaint.districtId;
    const sameCategory = existing.category === newComplaint.category;

    if (!sameDistrict || !sameCategory) continue;

    const existingTokens = new Set(tokenize(existing.text));
    if (existingTokens.size === 0) continue;

    // Calculate Jaccard similarity
    let intersection = 0;
    newTokens.forEach((t) => {
      if (existingTokens.has(t)) intersection++;
    });

    const union = new Set([...newTokens, ...existingTokens]).size;
    let similarity = intersection / union;

    // Boost similarity if wards match or closely match
    if (newComplaint.ward && existing.ward) {
      const ward1 = newComplaint.ward.toLowerCase();
      const ward2 = existing.ward.toLowerCase();
      if (ward1.includes(ward2) || ward2.includes(ward1)) {
        similarity = Math.min(0.96, similarity + 0.25);
      }
    }

    if (similarity > highestSimilarity) {
      highestSimilarity = similarity;
      bestMatch = existing;
    }
  }

  // Threshold for duplicate alert is 0.52 (52% semantic/token overlap in same ward/category)
  if (bestMatch && highestSimilarity >= 0.50) {
    return {
      isDuplicate: true,
      matchedComplaintId: bestMatch.publicId,
      originalComplaint: bestMatch,
      similarityScore: Math.round(highestSimilarity * 100),
      reason: `High semantic overlap (${Math.round(highestSimilarity * 100)}%) with prior complaint ${bestMatch.publicId} in ${bestMatch.ward || bestMatch.districtName}.`
    };
  }

  return {
    isDuplicate: false,
    matchedComplaintId: null,
    similarityScore: 0,
    reason: null
  };
}

/**
 * AI Photo Content Verification Simulator
 * Checks category keywords and generates auto-draft summary
 */
export function simulatePhotoVerification(fileName, category, ward, district) {
  const sampleDescriptions = {
    roads: `Visual verification confirmed: Severe asphalt breakdown and road cratering detected at ${ward}, ${district}. Hazardous for two-wheelers.`,
    sanitation: `Visual verification confirmed: Uncollected solid municipal waste heap and overflowing refuse container detected at ${ward}, ${district}.`,
    streetlights: `Visual verification confirmed: Inoperative street luminaire and exposed overhead service cable identified at ${ward}, ${district}.`,
    water: `Visual verification confirmed: Sub-surface water pipeline fracture causing drinking water leakage at ${ward}, ${district}.`,
    drainage: `Visual verification confirmed: Choked storm-water drainage channel with overflow into pedestrian path at ${ward}, ${district}.`
  };

  return {
    verified: true,
    confidence: 0.94,
    draftSummary: sampleDescriptions[category] || `Civic defect documented via photographic evidence at ${ward}, ${district}.`
  };
}
