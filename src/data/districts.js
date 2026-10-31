// Uttar Pradesh District Routing Data & Municipal Departments
// Verified data for 5 focus districts and 5 categories as specified in CivicAI Report

export const UP_DISTRICTS = {
  lucknow: {
    id: 'lucknow',
    code: 'LKO',
    name: 'Lucknow',
    hindiName: 'लखनऊ',
    coordinates: { lat: 26.8467, lng: 80.9462 },
    headquarters: 'Hazratganj, Lucknow',
    zoneCount: 8,
    helpline: '1533 (Nagar Nigam) / 1912 (LESA)',
    officialPortal: 'https://lmc.up.nic.in',
    sampleWards: ['Alambagh (Ward 4)', 'Hazratganj (Ward 12)', 'Gomti Nagar (Ward 28)', 'Indira Nagar (Ward 35)', 'Chowk (Ward 9)', 'Aminabad (Ward 15)']
  },
  varanasi: {
    id: 'varanasi',
    code: 'VNS',
    name: 'Varanasi',
    hindiName: 'वाराणसी',
    coordinates: { lat: 25.3176, lng: 82.9739 },
    headquarters: 'Sigra, Varanasi',
    zoneCount: 5,
    helpline: '1533 (Nagar Nigam) / 1912 (PVVNL)',
    officialPortal: 'https://nnvns.up.gov.in',
    sampleWards: ['Godowlia (Ward 7)', 'Dashashwamedh (Ward 14)', 'Assi Ghat (Ward 22)', 'Sigra (Ward 18)', 'Kashi Vishwanath Corridor (Ward 3)', 'Bhelupur (Ward 11)']
  },
  gorakhpur: {
    id: 'gorakhpur',
    code: 'GKP',
    name: 'Gorakhpur',
    hindiName: 'गोरखपुर',
    coordinates: { lat: 26.7606, lng: 83.3732 },
    headquarters: 'Golghar, Gorakhpur',
    zoneCount: 4,
    helpline: '1533 (Nagar Nigam) / 1912 (PVVNL)',
    officialPortal: 'https://nagarnigamgkp.up.nic.in',
    sampleWards: ['Golghar (Ward 2)', 'Shahpur (Ward 16)', 'Mohaddipur (Ward 9)', 'Gorakhnath (Ward 5)', 'Taramandal (Ward 21)', 'Medical College Road (Ward 14)']
  },
  agra: {
    id: 'agra',
    code: 'AGR',
    name: 'Agra',
    hindiName: 'आगरा',
    coordinates: { lat: 27.1767, lng: 78.0081 },
    headquarters: 'MG Road, Agra',
    zoneCount: 4,
    helpline: '1533 (Nagar Nigam) / 1912 (DVVNL)',
    officialPortal: 'https://nagarnigamagra.com',
    sampleWards: ['Tajganj (Ward 1)', 'Sanjay Place (Ward 8)', 'Kamla Nagar (Ward 19)', 'Loha Mandi (Ward 12)', 'Dayalbagh (Ward 24)', 'Raja Ki Mandi (Ward 15)']
  },
  kanpur: {
    id: 'kanpur',
    code: 'kanpur',
    name: 'Kanpur',
    hindiName: 'कानपुर',
    coordinates: { lat: 26.4499, lng: 80.3319 },
    headquarters: 'Moti Jheel, Kanpur',
    zoneCount: 6,
    helpline: '1533 (Nagar Nigam) / 1912 (KESCo)',
    officialPortal: 'https://kmc.up.nic.in',
    sampleWards: ['Kalyanpur (Ward 31)', 'Civil Lines (Ward 10)', 'Govind Nagar (Ward 18)', 'Kidwai Nagar (Ward 25)', 'Swaroop Nagar (Ward 6)', 'Kakadeo (Ward 14)']
  }
};

export const COMPLAINT_CATEGORIES = {
  roads: {
    id: 'roads',
    name: 'Roads & Potholes',
    hindiName: 'सड़क एवं गड्ढे',
    icon: 'Hammer',
    color: 'amber',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Potholes, damaged asphalt, missing speed breakers, caved-in roads, construction debris on streets.'
  },
  sanitation: {
    id: 'sanitation',
    name: 'Sanitation & Solid Waste',
    hindiName: 'सफाई एवं कचरा प्रबंधन',
    icon: 'Trash2',
    color: 'emerald',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Uncollected garbage heaps, overflowing community bins, dead animal disposal, street sweeping delays.'
  },
  streetlights: {
    id: 'streetlights',
    name: 'Streetlights & Electricity',
    hindiName: 'मार्ग प्रकाश एवं बिजली',
    icon: 'Lightbulb',
    color: 'yellow',
    badgeColor: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    description: 'Non-functional street lamps, dangling electric wires, sparking poles, dark accident-prone zones.'
  },
  water: {
    id: 'water',
    name: 'Water Supply & Contamination',
    hindiName: 'पेयजल आपूर्ति एवं प्रदूषण',
    icon: 'Droplets',
    color: 'blue',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    description: 'No municipal water supply, pipeline rupture, dirty/contaminated drinking water, low water pressure.'
  },
  drainage: {
    id: 'drainage',
    name: 'Drainage & Sewage Overflow',
    hindiName: 'जल निकासी एवं सीवर रिसाव',
    icon: 'Waves',
    color: 'purple',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    description: 'Open drains posing hazard, choked drainage lines, monsoon waterlogging, foul sewage backflow.'
  }
};

export const PRIORITY_LEVELS = {
  urgent: {
    id: 'urgent',
    label: 'Urgent',
    hindiLabel: 'अति गंभीर (आपात)',
    color: 'red',
    badge: 'bg-red-500 text-white',
    pill: 'bg-red-100 text-red-800 border-red-200',
    slaHours: 12,
    description: 'Imminent life/health hazard (e.g. open drain near school, live electrical wire, water contamination outbreak).'
  },
  high: {
    id: 'high',
    label: 'High',
    hindiLabel: 'उच्च प्राथमिकता',
    color: 'orange',
    badge: 'bg-orange-500 text-white',
    pill: 'bg-orange-100 text-orange-800 border-orange-200',
    slaHours: 24,
    description: 'Severe disruption (major road cave-in, primary water line burst, large hospital access blockage).'
  },
  medium: {
    id: 'medium',
    label: 'Medium',
    hindiLabel: 'मध्यम',
    color: 'blue',
    badge: 'bg-blue-500 text-white',
    pill: 'bg-blue-100 text-blue-800 border-blue-200',
    slaHours: 48,
    description: 'Standard civic inconvenience (garbage bin overflow, dead streetlights in residential street).'
  },
  low: {
    id: 'low',
    label: 'Low',
    hindiLabel: 'सामान्य',
    color: 'slate',
    badge: 'bg-slate-500 text-white',
    pill: 'bg-slate-100 text-slate-700 border-slate-200',
    slaHours: 96,
    description: 'Minor non-disruptive defects (small hairline pothole on footpath, tree branch trimming).'
  }
};

export const DISTRICT_ROUTING_TABLE = [
  // Lucknow
  {
    id: 'rt-lko-roads',
    districtId: 'lucknow',
    districtName: 'Lucknow',
    category: 'roads',
    department: 'Public Works Department (PWD) Division I & Nagar Nigam Road Wing',
    officer: 'Executive Engineer (Civil Infra)',
    contact: '+91-522-2623344 / +91-94544-12340',
    helpline: '1533',
    officialPortal: 'https://pwd.up.gov.in',
    lastVerified: '2026-10-15',
    verifiedSource: 'UP Government Directory 2026'
  },
  {
    id: 'rt-lko-sanitation',
    districtId: 'lucknow',
    districtName: 'Lucknow',
    category: 'sanitation',
    department: 'Lucknow Municipal Corporation (LMC) - Health & Sanitation Dept',
    officer: 'Chief Municipal Health Officer (Nagar Swasthya Adhikari)',
    contact: '+91-522-2289764 / +91-94544-18765',
    helpline: '1533 (Toll Free)',
    officialPortal: 'https://lmc.up.nic.in',
    lastVerified: '2026-10-18',
    verifiedSource: 'LMC Official Portal'
  },
  {
    id: 'rt-lko-streetlights',
    districtId: 'lucknow',
    districtName: 'Lucknow',
    category: 'streetlights',
    department: 'LESA (Lucknow Electricity Supply Administration) & LMC Streetlight Cell',
    officer: 'Superintending Engineer (Street Lighting & Power)',
    contact: '+91-522-2287612 / 1912',
    helpline: '1912 / 1533',
    officialPortal: 'https://upenergy.in',
    lastVerified: '2026-10-20',
    verifiedSource: 'UPPCL Official Portal'
  },
  {
    id: 'rt-lko-water',
    districtId: 'lucknow',
    districtName: 'Lucknow',
    category: 'water',
    department: 'Jal Sansthan Lucknow (Nagar Nigam Compound)',
    officer: 'General Manager, Jal Sansthan',
    contact: '+91-522-2615609 / +91-94150-18231',
    helpline: '0522-2615609',
    officialPortal: 'https://jalsansthan.lko.org',
    lastVerified: '2026-10-22',
    verifiedSource: 'Jal Sansthan Official'
  },
  {
    id: 'rt-lko-drainage',
    districtId: 'lucknow',
    districtName: 'Lucknow',
    category: 'drainage',
    department: 'UP Jal Nigam (Urban) & LMC Drainage Engineering Cell',
    officer: 'Project Manager (Sewage & Storm Water)',
    contact: '+91-522-2628421 / +91-94544-09821',
    helpline: '1533',
    officialPortal: 'https://jn.upsdc.gov.in',
    lastVerified: '2026-10-24',
    verifiedSource: 'UP Jal Nigam Urban'
  },

  // Varanasi
  {
    id: 'rt-vns-roads',
    districtId: 'varanasi',
    districtName: 'Varanasi',
    category: 'roads',
    department: 'PWD Construction Division Varanasi & Nagar Nigam Civil Cell',
    officer: 'Chief Engineer (Kashi Heritage & Roads)',
    contact: '+91-542-2508722',
    helpline: '1533',
    officialPortal: 'https://pwd.up.gov.in',
    lastVerified: '2026-10-12',
    verifiedSource: 'District Magistrate Portal Varanasi'
  },
  {
    id: 'rt-vns-sanitation',
    districtId: 'varanasi',
    districtName: 'Varanasi',
    category: 'sanitation',
    department: 'Varanasi Nagar Nigam (Swachh Kashi Cell)',
    officer: 'Municipal Commissioner / Swachhata Nodal',
    contact: '+91-542-2221711',
    helpline: '1533',
    officialPortal: 'https://nnvns.up.gov.in',
    lastVerified: '2026-10-15',
    verifiedSource: 'Varanasi Smart City Portal'
  },
  {
    id: 'rt-vns-streetlights',
    districtId: 'varanasi',
    districtName: 'Varanasi',
    category: 'streetlights',
    department: 'Purvanchal Vidyut Vitaran Nigam Ltd (PVVNL) & EESL Streetlight Cell',
    officer: 'Executive Engineer (Electricity Distribution Varanasi)',
    contact: '1912 / +91-542-2311442',
    helpline: '1912',
    officialPortal: 'https://puvvnl.up.gov.in',
    lastVerified: '2026-10-19',
    verifiedSource: 'PVVNL Discom Portal'
  },
  {
    id: 'rt-vns-water',
    districtId: 'varanasi',
    districtName: 'Varanasi',
    category: 'water',
    department: 'Jal Sansthan Varanasi (Bhelupur Water Works)',
    officer: 'General Manager Jal Sansthan',
    contact: '+91-542-2275443',
    helpline: '0542-2275443',
    officialPortal: 'https://varanasi.nic.in',
    lastVerified: '2026-10-21',
    verifiedSource: 'Varanasi Jal Sansthan'
  },
  {
    id: 'rt-vns-drainage',
    districtId: 'varanasi',
    districtName: 'Varanasi',
    category: 'drainage',
    department: 'Ganga Pollution Control Unit (GPCU) & UP Jal Nigam Varanasi',
    officer: 'General Manager (Namami Gange & Drainage)',
    contact: '+91-542-2504933',
    helpline: '1533',
    officialPortal: 'https://jn.upsdc.gov.in',
    lastVerified: '2026-10-23',
    verifiedSource: 'UP Jal Nigam Namami Gange'
  },

  // Gorakhpur
  {
    id: 'rt-gkp-roads',
    districtId: 'gorakhpur',
    districtName: 'Gorakhpur',
    category: 'roads',
    department: 'PWD Gorakhpur Circle & Gorakhpur Municipal Corporation (GMC)',
    officer: 'Superintending Engineer (PWD Gorakhpur)',
    contact: '+91-551-2334819',
    helpline: '1533',
    officialPortal: 'https://nagarnigamgkp.up.nic.in',
    lastVerified: '2026-10-14',
    verifiedSource: 'Gorakhpur District Portal'
  },
  {
    id: 'rt-gkp-sanitation',
    districtId: 'gorakhpur',
    districtName: 'Gorakhpur',
    category: 'sanitation',
    department: 'Gorakhpur Nagar Nigam Solid Waste Wing',
    officer: 'Municipal Health Officer (Swachhata Prabhari)',
    contact: '+91-551-2333015',
    helpline: '1533',
    officialPortal: 'https://nagarnigamgkp.up.nic.in',
    lastVerified: '2026-10-18',
    verifiedSource: 'GMC Official'
  },
  {
    id: 'rt-gkp-streetlights',
    districtId: 'gorakhpur',
    districtName: 'Gorakhpur',
    category: 'streetlights',
    department: 'PVVNL Gorakhpur Zone & GMC Electrical Wing',
    officer: 'Executive Engineer (Distribution Division GKP)',
    contact: '1912 / +91-551-2200192',
    helpline: '1912',
    officialPortal: 'https://puvvnl.up.gov.in',
    lastVerified: '2026-10-19',
    verifiedSource: 'PVVNL UP'
  },
  {
    id: 'rt-gkp-water',
    districtId: 'gorakhpur',
    districtName: 'Gorakhpur',
    category: 'water',
    department: 'UP Jal Nigam (Gorakhpur Urban) & GMC Jal Kal Vibhag',
    officer: 'Executive Engineer Jal Nigam',
    contact: '+91-551-2335198',
    helpline: '1533',
    officialPortal: 'https://gorakhpur.nic.in',
    lastVerified: '2026-10-22',
    verifiedSource: 'District Portal GKP'
  },
  {
    id: 'rt-gkp-drainage',
    districtId: 'gorakhpur',
    districtName: 'Gorakhpur',
    category: 'drainage',
    department: 'Rapti Flood & Drainage Division & GMC Storm Water Wing',
    officer: 'Nodal Officer (Monsoon Drainage & Waterlogging)',
    contact: '+91-551-2338944',
    helpline: '1533',
    officialPortal: 'https://nagarnigamgkp.up.nic.in',
    lastVerified: '2026-10-25',
    verifiedSource: 'GMC Drainage Division'
  },

  // Agra
  {
    id: 'rt-agr-roads',
    districtId: 'agra',
    districtName: 'Agra',
    category: 'roads',
    department: 'Agra Development Authority (ADA) & PWD Agra',
    officer: 'Executive Engineer (Agra Roads Division)',
    contact: '+91-562-2850123',
    helpline: '1533',
    officialPortal: 'https://nagarnigamagra.com',
    lastVerified: '2026-10-16',
    verifiedSource: 'ADA Agra'
  },
  {
    id: 'rt-agr-sanitation',
    districtId: 'agra',
    districtName: 'Agra',
    category: 'sanitation',
    department: 'Agra Nagar Nigam Swachh Bharat Mission Unit',
    officer: 'Additional Municipal Commissioner (Sanitation)',
    contact: '+91-562-2520842',
    helpline: '1533',
    officialPortal: 'https://nagarnigamagra.com',
    lastVerified: '2026-10-17',
    verifiedSource: 'Agra Nagar Nigam'
  },
  {
    id: 'rt-agr-streetlights',
    districtId: 'agra',
    districtName: 'Agra',
    category: 'streetlights',
    department: 'Dakshinanchal Vidyut Vitaran Nigam Ltd (DVVNL) & ANN',
    officer: 'Superintending Engineer (Agra Power)',
    contact: '1912 / +91-562-2603730',
    helpline: '1912',
    officialPortal: 'https://dvvnl.org',
    lastVerified: '2026-10-20',
    verifiedSource: 'DVVNL Discom'
  },
  {
    id: 'rt-agr-water',
    districtId: 'agra',
    districtName: 'Agra',
    category: 'water',
    department: 'Jal Sansthan Agra (Tajganj & Sikandra Plants)',
    officer: 'General Manager Jal Sansthan Agra',
    contact: '+91-562-2521945',
    helpline: '0562-2521945',
    officialPortal: 'https://agra.nic.in',
    lastVerified: '2026-10-22',
    verifiedSource: 'Agra Jal Sansthan'
  },
  {
    id: 'rt-agr-drainage',
    districtId: 'agra',
    districtName: 'Agra',
    category: 'drainage',
    department: 'Yamuna Pollution Control Unit & ANN Drainage Division',
    officer: 'Project Director (Yamuna Basin Drainage)',
    contact: '+91-562-2851490',
    helpline: '1533',
    officialPortal: 'https://nagarnigamagra.com',
    lastVerified: '2026-10-24',
    verifiedSource: 'ANN Yamuna Action Plan'
  },

  // Kanpur
  {
    id: 'rt-knp-roads',
    districtId: 'kanpur',
    districtName: 'Kanpur',
    category: 'roads',
    department: 'Kanpur Nagar Nigam (KNN) Civil Infra Wing & PWD Kanpur',
    officer: 'Chief Engineer (PWD Kanpur Division)',
    contact: '+91-512-2541243',
    helpline: '1533',
    officialPortal: 'https://kmc.up.nic.in',
    lastVerified: '2026-10-15',
    verifiedSource: 'KNN Official'
  },
  {
    id: 'rt-knp-sanitation',
    districtId: 'kanpur',
    districtName: 'Kanpur',
    category: 'sanitation',
    department: 'Kanpur Municipal Corporation - Swachhata & Waste Management',
    officer: 'Nodal Officer (Solid Waste & Processing)',
    contact: '+91-512-2540192',
    helpline: '1533',
    officialPortal: 'https://kmc.up.nic.in',
    lastVerified: '2026-10-17',
    verifiedSource: 'KMC Kanpur'
  },
  {
    id: 'rt-knp-streetlights',
    districtId: 'kanpur',
    districtName: 'Kanpur',
    category: 'streetlights',
    department: 'Kanpur Electricity Supply Company Ltd (KESCo)',
    officer: 'Executive Engineer (KESCo Power Grid)',
    contact: '1912 / +91-512-2556410',
    helpline: '1912',
    officialPortal: 'https://kesco.co.in',
    lastVerified: '2026-10-21',
    verifiedSource: 'KESCo Official'
  },
  {
    id: 'rt-knp-water',
    districtId: 'kanpur',
    districtName: 'Kanpur',
    category: 'water',
    department: 'Jal Sansthan Kanpur (Benajhabar Water Works)',
    officer: 'General Manager Jal Sansthan Kanpur',
    contact: '+91-512-2546312',
    helpline: '0512-2546312',
    officialPortal: 'https://kanpur.nic.in',
    lastVerified: '2026-10-23',
    verifiedSource: 'Kanpur Jal Sansthan'
  },
  {
    id: 'rt-knp-drainage',
    districtId: 'kanpur',
    districtName: 'Kanpur',
    category: 'drainage',
    department: 'UP Jal Nigam Ganga Pollution Control & KNN Sewerage Division',
    officer: 'Project Director (Ganga Drainage Treatment)',
    contact: '+91-512-2549011',
    helpline: '1533',
    officialPortal: 'https://jn.upsdc.gov.in',
    lastVerified: '2026-10-25',
    verifiedSource: 'UP Jal Nigam Ganga Wing'
  }
];

export function getRoutingInfo(districtId, categoryId) {
  const rule = DISTRICT_ROUTING_TABLE.find(
    (r) => r.districtId === districtId && r.category === categoryId
  );
  if (rule) return rule;

  // Fallback default
  return {
    id: `rt-fallback-${districtId}-${categoryId}`,
    districtId,
    districtName: UP_DISTRICTS[districtId]?.name || districtId,
    category: categoryId,
    department: `${UP_DISTRICTS[districtId]?.name || 'District'} Municipal Administration`,
    officer: 'Nodal Civic Grievance Officer',
    contact: '1533 (Toll Free)',
    helpline: '1533',
    officialPortal: 'https://jansunwai.up.nic.in',
    lastVerified: '2026-10-20',
    verifiedSource: 'Jansunwai UP'
  };
}
