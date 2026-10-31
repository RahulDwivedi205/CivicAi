// Initial Mock Civic Complaints Dataset for Uttar Pradesh
// Realistically structured complaints across 5 districts in Hindi, English, and Hinglish

export const INITIAL_COMPLAINTS = [
  {
    id: 'cmp-001',
    publicId: 'UP-LKO-2026-1042',
    districtId: 'lucknow',
    districtName: 'Lucknow',
    ward: 'Alambagh (Ward 4)',
    text: 'गोमती नगर / आलमबाग रोड पर प्राथमिक स्कूल के सामने खुला गहरा नाला है। बारिश में पानी भर जाता है और छोटे बच्चों के गिरने का भारी खतरा है। कृपया तुरंत जाली या ढक्कन लगवाएं।',
    language: 'Hindi',
    category: 'drainage',
    categoryConfidence: 0.96,
    priority: 'urgent',
    priorityReason: 'URGENT: Location is in close proximity to children / school premises. Immediate fall and drowning hazard.',
    departmentId: 'UP Jal Nigam (Urban) & LMC Drainage Engineering Cell',
    departmentName: 'Lucknow Municipal Corporation (LMC) Drainage Wing',
    officialHelpline: '1533',
    status: 'in_progress',
    photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f0?auto=format&fit=crop&w=800&q=80',
    citizenName: 'Amitabh Verma',
    citizenContact: '+91-98390-XXXXX',
    coordinates: { lat: 26.8152, lng: 80.9125 },
    createdAt: '2026-10-28T09:15:00Z',
    updatedAt: '2026-10-30T14:20:00Z',
    isDuplicate: false,
    matchedComplaintId: null,
    auditLogs: [
      {
        id: 'aud-001-1',
        action: 'Complaint Submitted',
        actor: 'Citizen (Amitabh Verma)',
        timestamp: '2026-10-28T09:15:00Z',
        details: 'Complaint registered via CivicAI Citizen Portal'
      },
      {
        id: 'aud-001-2',
        action: 'AI Triage Completed',
        actor: 'CivicAI NLP Engine',
        timestamp: '2026-10-28T09:15:02Z',
        details: 'Category classified as Drainage (96% conf). Priority flagged as Urgent due to school trigger.'
      },
      {
        id: 'aud-001-3',
        action: 'Assigned to Department',
        actor: 'Auto-Routing Table',
        timestamp: '2026-10-28T09:16:00Z',
        details: 'Routed to LMC Drainage Engineering Cell. Ticket dispatched to Ward 4 Junior Engineer.'
      },
      {
        id: 'aud-001-4',
        action: 'Status Updated to In Progress',
        actor: 'JE R.K. Srivastava (LMC)',
        timestamp: '2026-10-30T14:20:00Z',
        details: 'Site inspection completed. Concrete slab order placed with contractor.'
      }
    ]
  },
  {
    id: 'cmp-002',
    publicId: 'UP-LKO-2026-1058',
    districtId: 'lucknow',
    districtName: 'Lucknow',
    ward: 'Alambagh (Ward 4)',
    text: 'Alambagh school ke pas ka nala open hai. Any child can fall into this open drain. Please cover it immediately!',
    language: 'Hinglish',
    category: 'drainage',
    categoryConfidence: 0.94,
    priority: 'urgent',
    priorityReason: 'URGENT: Location is in close proximity to children / school premises. Immediate hazard intervention required.',
    departmentId: 'UP Jal Nigam (Urban) & LMC Drainage Engineering Cell',
    departmentName: 'Lucknow Municipal Corporation (LMC) Drainage Wing',
    officialHelpline: '1533',
    status: 'assigned',
    photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f0?auto=format&fit=crop&w=800&q=80',
    citizenName: 'Sneha Gupta',
    citizenContact: '+91-94151-XXXXX',
    coordinates: { lat: 26.8160, lng: 80.9130 },
    createdAt: '2026-10-29T11:40:00Z',
    updatedAt: '2026-10-29T11:40:02Z',
    isDuplicate: true,
    matchedComplaintId: 'UP-LKO-2026-1042',
    similarityScore: 88,
    duplicateReason: 'High semantic overlap (88%) with complaint UP-LKO-2026-1042 in Alambagh (Ward 4). Both describe open drain near school.',
    auditLogs: [
      {
        id: 'aud-002-1',
        action: 'Complaint Submitted',
        actor: 'Citizen (Sneha Gupta)',
        timestamp: '2026-10-29T11:40:00Z',
        details: 'Complaint registered via CivicAI Citizen Portal'
      },
      {
        id: 'aud-002-2',
        action: 'AI Duplicate Flagged',
        actor: 'CivicAI Duplicate Engine',
        timestamp: '2026-10-29T11:40:02Z',
        details: 'Flagged as 88% duplicate of UP-LKO-2026-1042. Suggested grouping for field officer review.'
      }
    ]
  },
  {
    id: 'cmp-003',
    publicId: 'UP-VNS-2026-3021',
    districtId: 'varanasi',
    districtName: 'Varanasi',
    ward: 'Godowlia (Ward 7)',
    text: 'Godowlia main crossing se Dashashwamedh jane wale marg par pichle 10 dino se sari streetlights band hain. Raat ko bohot andhera rehta hai, pilgrims aur tourists ko bohot pareshani ho rahi hai.',
    language: 'Hinglish',
    category: 'streetlights',
    categoryConfidence: 0.95,
    priority: 'high',
    priorityReason: 'Flagged HIGH due to wide public disruption impact: "10 days" on major tourist transit thoroughfare.',
    departmentId: 'Purvanchal Vidyut Vitaran Nigam Ltd (PVVNL)',
    departmentName: 'PVVNL & Varanasi Nagar Nigam Streetlight Cell',
    officialHelpline: '1912 / 1533',
    status: 'assigned',
    photoUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
    citizenName: 'Manoj Tripathi',
    citizenContact: '+91-99350-XXXXX',
    coordinates: { lat: 25.3090, lng: 83.0062 },
    createdAt: '2026-10-27T18:00:00Z',
    updatedAt: '2026-10-28T09:00:00Z',
    isDuplicate: false,
    matchedComplaintId: null,
    auditLogs: [
      {
        id: 'aud-003-1',
        action: 'Complaint Submitted',
        actor: 'Citizen (Manoj Tripathi)',
        timestamp: '2026-10-27T18:00:00Z',
        details: 'Complaint registered'
      },
      {
        id: 'aud-003-2',
        action: 'AI Triage Completed',
        actor: 'CivicAI NLP Engine',
        timestamp: '2026-10-27T18:00:02Z',
        details: 'Classified: Streetlights (95%). Priority: High.'
      }
    ]
  },
  {
    id: 'cmp-004',
    publicId: 'UP-VNS-2026-3044',
    districtId: 'varanasi',
    districtName: 'Varanasi',
    ward: 'Godowlia (Ward 7)',
    text: 'Street lights are completely dead near Godowlia chowk. It has been totally dark for over a week, very unsafe for women and elders visiting the ghats.',
    language: 'English',
    category: 'streetlights',
    categoryConfidence: 0.93,
    priority: 'high',
    priorityReason: 'High priority due to public thoroughfare dark zone and pilgrim safety hazard.',
    departmentId: 'Purvanchal Vidyut Vitaran Nigam Ltd (PVVNL)',
    departmentName: 'PVVNL & Varanasi Nagar Nigam Streetlight Cell',
    officialHelpline: '1912',
    status: 'submitted',
    photoUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
    citizenName: 'Ananya Roy',
    citizenContact: '+91-98712-XXXXX',
    coordinates: { lat: 25.3095, lng: 83.0070 },
    createdAt: '2026-10-29T20:10:00Z',
    updatedAt: '2026-10-29T20:10:02Z',
    isDuplicate: true,
    matchedComplaintId: 'UP-VNS-2026-3021',
    similarityScore: 82,
    duplicateReason: 'Semantic overlap (82%) with prior complaint UP-VNS-2026-3021 regarding dark streetlights at Godowlia crossing.',
    auditLogs: [
      {
        id: 'aud-004-1',
        action: 'Complaint Submitted',
        actor: 'Citizen (Ananya Roy)',
        timestamp: '2026-10-29T20:10:00Z',
        details: 'Complaint registered'
      },
      {
        id: 'aud-004-2',
        action: 'Duplicate Alert Flagged',
        actor: 'CivicAI Duplicate Engine',
        timestamp: '2026-10-29T20:10:02Z',
        details: 'Similarity 82% with UP-VNS-2026-3021 in Ward 7'
      }
    ]
  },
  {
    id: 'cmp-005',
    publicId: 'UP-GKP-2026-5120',
    districtId: 'gorakhpur',
    districtName: 'Gorakhpur',
    ward: 'Shahpur (Ward 16)',
    text: 'शाहपुर मुख्य बाजार तिराहे पर 3 फीट गहरा गड्ढा हो गया है। कल रात एक मोटरसाइकिल वाला गड्ढे में गिरकर गंभीर रूप से घायल हो गया। सड़क तुरंत बनवाई जाए वर्ना और बड़ा हादसा होगा।',
    language: 'Hindi',
    category: 'roads',
    categoryConfidence: 0.94,
    priority: 'urgent',
    priorityReason: 'URGENT: Life safety hazard. Active road accident/injury recorded at this location.',
    departmentId: 'Gorakhpur Municipal Corporation (GMC) Civil Infra Wing',
    departmentName: 'PWD Gorakhpur Circle & GMC Civil Wing',
    officialHelpline: '1533',
    status: 'in_progress',
    photoUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    citizenName: 'Devendra Yadav',
    citizenContact: '+91-94500-XXXXX',
    coordinates: { lat: 26.7720, lng: 83.3850 },
    createdAt: '2026-10-26T08:30:00Z',
    updatedAt: '2026-10-30T11:00:00Z',
    isDuplicate: false,
    matchedComplaintId: null,
    auditLogs: [
      {
        id: 'aud-005-1',
        action: 'Complaint Submitted',
        actor: 'Citizen (Devendra Yadav)',
        timestamp: '2026-10-26T08:30:00Z',
        details: 'Complaint filed'
      },
      {
        id: 'aud-005-2',
        action: 'AI Triage Completed',
        actor: 'CivicAI NLP Engine',
        timestamp: '2026-10-26T08:30:02Z',
        details: 'Category: Roads (94%). Priority: Urgent (Accident reported).'
      },
      {
        id: 'aud-005-3',
        action: 'Triage Accepted by Staff',
        actor: 'Assistant Engineer PWD Gorakhpur',
        timestamp: '2026-10-26T10:15:00Z',
        details: 'AI priority accepted. Patch repair team mobilised.'
      }
    ]
  },
  {
    id: 'cmp-006',
    publicId: 'UP-AGR-2026-7890',
    districtId: 'agra',
    districtName: 'Agra',
    ward: 'Tajganj (Ward 1)',
    text: 'Huge heaps of garbage accumulated behind Taj East Gate road. Waste has not been cleared by municipal sweepers for 5 days. Foul stench spreading everywhere and stray cattle gathering.',
    language: 'English',
    category: 'sanitation',
    categoryConfidence: 0.97,
    priority: 'high',
    priorityReason: 'High priority due to international tourist zone proximity and sanitation vector outbreak risk.',
    departmentId: 'Agra Nagar Nigam Swachh Bharat Mission Unit',
    departmentName: 'Agra Municipal Corporation Health & Sanitation Wing',
    officialHelpline: '1533',
    status: 'assigned',
    photoUrl: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=800&q=80',
    citizenName: 'Mohd. Tariq',
    citizenContact: '+91-98970-XXXXX',
    coordinates: { lat: 27.1720, lng: 78.0450 },
    createdAt: '2026-10-29T07:20:00Z',
    updatedAt: '2026-10-29T10:30:00Z',
    isDuplicate: false,
    matchedComplaintId: null,
    auditLogs: [
      {
        id: 'aud-006-1',
        action: 'Complaint Submitted',
        actor: 'Citizen (Mohd. Tariq)',
        timestamp: '2026-10-29T07:20:00Z',
        details: 'Filed via web app'
      },
      {
        id: 'aud-006-2',
        action: 'AI Triaged',
        actor: 'CivicAI NLP Engine',
        timestamp: '2026-10-29T07:20:02Z',
        details: 'Classified: Sanitation (97%). Priority: High.'
      }
    ]
  },
  {
    id: 'cmp-007',
    publicId: 'UP-KNP-2026-9012',
    districtId: 'kanpur',
    districtName: 'Kanpur',
    ward: 'Kalyanpur (Ward 31)',
    text: 'कल्याणपुर आवास विकास कॉलोनी में मुख्य पेयजल पाइपलाइन फट गई है। सड़कों पर हजारों लीटर पीने का पानी बह रहा है और घरों में गंदा बदबूदार पानी आ रहा है। कृपया जल्द मरम्मत कराएं।',
    language: 'Hindi',
    category: 'water',
    categoryConfidence: 0.95,
    priority: 'high',
    priorityReason: 'Potable water disruption affects household daily necessity. Pipeline rupture detected.',
    departmentId: 'Jal Sansthan Kanpur (Benajhabar Water Works)',
    departmentName: 'Kanpur Jal Sansthan & UP Jal Nigam',
    officialHelpline: '0512-2546312',
    status: 'in_progress',
    photoUrl: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80',
    citizenName: 'Vikas Kushwaha',
    citizenContact: '+91-93361-XXXXX',
    coordinates: { lat: 26.4950, lng: 80.2650 },
    createdAt: '2026-10-27T14:15:00Z',
    updatedAt: '2026-10-28T16:45:00Z',
    isDuplicate: false,
    matchedComplaintId: null,
    auditLogs: [
      {
        id: 'aud-007-1',
        action: 'Complaint Submitted',
        actor: 'Citizen (Vikas Kushwaha)',
        timestamp: '2026-10-27T14:15:00Z',
        details: 'Registered'
      },
      {
        id: 'aud-007-2',
        action: 'Status In Progress',
        actor: 'Jal Sansthan Pipeline Wing',
        timestamp: '2026-10-28T16:45:00Z',
        details: 'Valve isolated, replacement pipe section under transit.'
      }
    ]
  },
  {
    id: 'cmp-008',
    publicId: 'UP-KNP-2026-9045',
    districtId: 'kanpur',
    districtName: 'Kanpur',
    ward: 'Kalyanpur (Ward 31)',
    text: 'Kalyanpur awas vikas me peene ka pani nahi aa raha hai aur jo thoda aa raha wo bohot ganda aur peela hai. Pipeline leak hai road pe.',
    language: 'Hinglish',
    category: 'water',
    categoryConfidence: 0.92,
    priority: 'high',
    priorityReason: 'Water supply contamination reported in Kalyanpur.',
    departmentId: 'Jal Sansthan Kanpur (Benajhabar Water Works)',
    departmentName: 'Kanpur Jal Sansthan',
    officialHelpline: '0512-2546312',
    status: 'assigned',
    photoUrl: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80',
    citizenName: 'Pooja Agarwal',
    citizenContact: '+91-94511-XXXXX',
    coordinates: { lat: 26.4960, lng: 80.2660 },
    createdAt: '2026-10-28T10:00:00Z',
    updatedAt: '2026-10-28T10:00:02Z',
    isDuplicate: true,
    matchedComplaintId: 'UP-KNP-2026-9012',
    similarityScore: 84,
    duplicateReason: 'Semantic overlap (84%) with UP-KNP-2026-9012 in Kalyanpur (Ward 31) pipeline leak.',
    auditLogs: [
      {
        id: 'aud-008-1',
        action: 'Complaint Submitted',
        actor: 'Citizen (Pooja Agarwal)',
        timestamp: '2026-10-28T10:00:00Z',
        details: 'Registered'
      },
      {
        id: 'aud-008-2',
        action: 'Duplicate Detected',
        actor: 'CivicAI Duplicate Engine',
        timestamp: '2026-10-28T10:00:02Z',
        details: 'Linked to UP-KNP-2026-9012'
      }
    ]
  },
  {
    id: 'cmp-009',
    publicId: 'UP-LKO-2026-1189',
    districtId: 'lucknow',
    districtName: 'Lucknow',
    ward: 'Hazratganj (Ward 12)',
    text: 'बिजली का खंभा झुक गया है और तार नीचे लटक रहे हैं, कभी भी स्पार्क होकर करंट फैल सकता है। कृपया लेसा से तुरंत टीम भेजें।',
    language: 'Hindi',
    category: 'streetlights',
    categoryConfidence: 0.94,
    priority: 'urgent',
    priorityReason: 'URGENT: Risk of electrocution from exposed or sparking electrical infrastructure.',
    departmentId: 'LESA (Lucknow Electricity Supply Administration)',
    departmentName: 'LESA & Lucknow Nagar Nigam Streetlight Cell',
    officialHelpline: '1912',
    status: 'resolved',
    photoUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=800&q=80',
    citizenName: 'Rajesh Saxena',
    citizenContact: '+91-94150-XXXXX',
    coordinates: { lat: 26.8520, lng: 80.9410 },
    createdAt: '2026-10-24T16:00:00Z',
    updatedAt: '2026-10-25T17:30:00Z',
    isDuplicate: false,
    matchedComplaintId: null,
    rating: 5,
    feedback: 'Prompt action by LESA team within 24 hours. Leaning pole straightened and wiring insulated. Thank you!',
    auditLogs: [
      {
        id: 'aud-009-1',
        action: 'Complaint Submitted',
        actor: 'Citizen (Rajesh Saxena)',
        timestamp: '2026-10-24T16:00:00Z',
        details: 'Registered'
      },
      {
        id: 'aud-009-2',
        action: 'AI Triage Completed',
        actor: 'CivicAI NLP Engine',
        timestamp: '2026-10-24T16:00:02Z',
        details: 'Classified: Streetlights (94%). Priority: Urgent (Current/Spark trigger).'
      },
      {
        id: 'aud-009-3',
        action: 'Status Resolved',
        actor: 'LESA Hazratganj Substation JE',
        timestamp: '2026-10-25T17:30:00Z',
        details: 'Overhead conductors tensioned and safety clearance restored.'
      }
    ]
  },
  {
    id: 'cmp-010',
    publicId: 'UP-GKP-2026-5290',
    districtId: 'gorakhpur',
    districtName: 'Gorakhpur',
    ward: 'Mohaddipur (Ward 9)',
    text: 'Sir yahan bohot samasya hai koi sunwai nahi ho rahi jaldi kariye.',
    language: 'Hinglish',
    category: 'roads',
    categoryConfidence: 0.58,
    isLowConfidence: true,
    priority: 'low',
    priorityReason: 'Ambiguous description with low NLP token signal. Sent to Low-Confidence Human Review Queue.',
    departmentId: 'Gorakhpur Municipal Corporation (GMC)',
    departmentName: 'Gorakhpur Municipal Corporation',
    officialHelpline: '1533',
    status: 'submitted',
    photoUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    citizenName: 'Suraj Chauhan',
    citizenContact: '+91-98380-XXXXX',
    coordinates: { lat: 26.7550, lng: 83.3910 },
    createdAt: '2026-10-30T10:15:00Z',
    updatedAt: '2026-10-30T10:15:02Z',
    isDuplicate: false,
    matchedComplaintId: null,
    auditLogs: [
      {
        id: 'aud-010-1',
        action: 'Complaint Submitted',
        actor: 'Citizen (Suraj Chauhan)',
        timestamp: '2026-10-30T10:15:00Z',
        details: 'Registered'
      },
      {
        id: 'aud-010-2',
        action: 'Sent to Low-Confidence Queue',
        actor: 'CivicAI NLP Engine',
        timestamp: '2026-10-30T10:15:02Z',
        details: 'Confidence 58% (<75% threshold). Awaiting human officer categorization.'
      }
    ]
  },
  {
    id: 'cmp-011',
    publicId: 'UP-AGR-2026-7932',
    districtId: 'agra',
    districtName: 'Agra',
    ward: 'Sanjay Place (Ward 8)',
    text: 'Drainage line choked completely in commercial complex sector 2. Foul black water overflowing into basement parking.',
    language: 'English',
    category: 'drainage',
    categoryConfidence: 0.94,
    priority: 'high',
    priorityReason: 'Severe disruption: choked commercial complex drainage overflowing into parking.',
    departmentId: 'Yamuna Pollution Control Unit & ANN Drainage Division',
    departmentName: 'Agra Nagar Nigam Drainage Division',
    officialHelpline: '1533',
    status: 'assigned',
    photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f0?auto=format&fit=crop&w=800&q=80',
    citizenName: 'Harish Bansal',
    citizenContact: '+91-94122-XXXXX',
    coordinates: { lat: 27.2001, lng: 78.0050 },
    createdAt: '2026-10-29T15:20:00Z',
    updatedAt: '2026-10-29T16:00:00Z',
    isDuplicate: false,
    matchedComplaintId: null,
    auditLogs: [
      {
        id: 'aud-011-1',
        action: 'Complaint Submitted',
        actor: 'Citizen (Harish Bansal)',
        timestamp: '2026-10-29T15:20:00Z',
        details: 'Registered'
      },
      {
        id: 'aud-011-2',
        action: 'AI Triaged',
        actor: 'CivicAI NLP Engine',
        timestamp: '2026-10-29T15:20:02Z',
        details: 'Classified: Drainage (94%). Priority: High.'
      }
    ]
  },
  {
    id: 'cmp-012',
    publicId: 'UP-VNS-2026-3105',
    districtId: 'varanasi',
    districtName: 'Varanasi',
    ward: 'Assi Ghat (Ward 22)',
    text: 'अस्सी घाट मुख्य मार्ग पर सीवर का गंदा पानी उफन रहा है। श्रद्धालु और पर्यटकों को पैदल निकलने में अत्यंत परेशानी हो रही है। तुरंत सुपर सकर मशीन भेजें।',
    language: 'Hindi',
    category: 'drainage',
    categoryConfidence: 0.95,
    priority: 'high',
    priorityReason: 'High priority due to tourist/pilgrim transit area sewage backflow.',
    departmentId: 'Ganga Pollution Control Unit (GPCU) & UP Jal Nigam',
    departmentName: 'Namami Gange & Varanasi Jal Nigam',
    officialHelpline: '1533',
    status: 'resolved',
    photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f0?auto=format&fit=crop&w=800&q=80',
    citizenName: 'Pt. Shambhu Nath',
    citizenContact: '+91-94518-XXXXX',
    coordinates: { lat: 25.2890, lng: 83.0060 },
    createdAt: '2026-10-25T11:00:00Z',
    updatedAt: '2026-10-27T18:00:00Z',
    isDuplicate: false,
    matchedComplaintId: null,
    rating: 4,
    feedback: 'Super sucker machine deployed by Jal Nigam team and drain cleared. Thank you for quick redressal.',
    auditLogs: [
      {
        id: 'aud-012-1',
        action: 'Complaint Submitted',
        actor: 'Citizen (Pt. Shambhu Nath)',
        timestamp: '2026-10-25T11:00:00Z',
        details: 'Registered'
      },
      {
        id: 'aud-012-2',
        action: 'Status Resolved',
        actor: 'Superintending Engineer Jal Nigam VNS',
        timestamp: '2026-10-27T18:00:00Z',
        details: 'Sewer suction operation completed and line de-silted.'
      }
    ]
  }
];

export const QUICK_PRESETS = [
  {
    title: 'School Open Drain (Urgent)',
    districtId: 'lucknow',
    ward: 'Alambagh (Ward 4)',
    text: 'गोमती नगर / आलमबाग रोड पर प्राथमिक स्कूल के सामने खुला गहरा नाला है, बच्चे गिर सकते हैं तुरंत ढक्कन लगवाएं।',
    expectedCategory: 'drainage',
    expectedPriority: 'urgent'
  },
  {
    title: 'Broken Road / Accident (Urgent)',
    districtId: 'gorakhpur',
    ward: 'Shahpur (Ward 16)',
    text: 'शाहपुर तिराहे पर 3 फीट गहरा गड्ढा है, कल रात बाइक सवार का गंभीर एक्सीडेंट हो गया। सड़क तुरंत बनवाएं।',
    expectedCategory: 'roads',
    expectedPriority: 'urgent'
  },
  {
    title: 'Water Pipe Burst & Leak (High)',
    districtId: 'kanpur',
    ward: 'Kalyanpur (Ward 31)',
    text: 'Kalyanpur awas vikas me main drinking water pipeline burst ho gayi hai, hazaro litre paani waste ho raha hai.',
    expectedCategory: 'water',
    expectedPriority: 'high'
  },
  {
    title: 'Tourist Area Garbage Overflow (High)',
    districtId: 'agra',
    ward: 'Tajganj (Ward 1)',
    text: 'Huge heap of uncollected garbage near Tajganj main market for 4 days, foul smell and flies everywhere.',
    expectedCategory: 'sanitation',
    expectedPriority: 'high'
  },
  {
    title: 'Dead Streetlights at Night (Medium)',
    districtId: 'varanasi',
    ward: 'Godowlia (Ward 7)',
    text: 'Street lights completely broken on main road towards ghats, complete dark stretch causing safety hazard.',
    expectedCategory: 'streetlights',
    expectedPriority: 'medium'
  }
];
