// ============================================================================
// Congress Intelligence Data — GSK Immunology & Oncology
// Keys off CONGRESS_OPTIONS from config
// ============================================================================

import { PRODUCT_OPTIONS } from '../config';

const productNames = PRODUCT_OPTIONS.map(p => p.name);

export const MOCK_TREND_SENTIMENT = {
  timeline: ['AAAAI 2025', 'Q1 2026', 'Q2 2026', 'ASCO 2026', 'Post-ASCO 2026'],
  scientific: [
    { period: 'AAAAI 2025',      Nucala: 71, Blenrep: 52, Jemperli: 61, Dupixent: 68, Other: 48 },
    { period: 'Q1 2026',         Nucala: 73, Blenrep: 55, Jemperli: 64, Dupixent: 70, Other: 49 },
    { period: 'Q2 2026',         Nucala: 75, Blenrep: 51, Jemperli: 66, Dupixent: 72, Other: 51 },
    { period: 'ASCO 2026',       Nucala: 76, Blenrep: 48, Jemperli: 68, Dupixent: 73, Other: 52 },
    { period: 'Post-ASCO 2026',  Nucala: 77, Blenrep: 46, Jemperli: 69, Dupixent: 74, Other: 53 },
  ],
  social: [
    { period: 'AAAAI 2025',      Nucala: 66, Blenrep: 48, Jemperli: 57, Dupixent: 64, Other: 44 },
    { period: 'Q1 2026',         Nucala: 68, Blenrep: 50, Jemperli: 59, Dupixent: 66, Other: 45 },
    { period: 'Q2 2026',         Nucala: 70, Blenrep: 46, Jemperli: 61, Dupixent: 68, Other: 46 },
    { period: 'ASCO 2026',       Nucala: 71, Blenrep: 43, Jemperli: 63, Dupixent: 70, Other: 47 },
    { period: 'Post-ASCO 2026',  Nucala: 72, Blenrep: 41, Jemperli: 64, Dupixent: 71, Other: 48 },
  ],
};

export const MOCK_SCIENTIFIC_ARTICLES = [
  { title: 'DREAMM-7: OS benefit with belantamab mafodotin + bortezomib/dex in R/R MM', journalOrCongress: 'NEJM Evidence', date: '2024-11', product: 'Blenrep', sentiment: 'positive' },
  { title: 'RUBY: Dostarlimab OS benefit in dMMR/MSI-H endometrial cancer', journalOrCongress: 'NEJM', date: '2025-06', product: 'Jemperli', sentiment: 'positive' },
  { title: 'PRIMA extended follow-up: niraparib 1L maintenance in ovarian cancer', journalOrCongress: 'Lancet Oncology', date: '2025-09', product: 'Zejula', sentiment: 'positive' },
  { title: 'Mepolizumab in EGPA: 3-year real-world outcomes across EU centres', journalOrCongress: 'ERJ', date: '2026-02', product: 'Nucala', sentiment: 'positive' },
  { title: 'Real-world teclistamab CRS management: improving tolerability profile', journalOrCongress: 'Blood', date: '2026-04', product: 'Competitor', sentiment: 'positive' },
  { title: 'Belimumab in lupus nephritis: earlier-line benefit — BLISS-LN 5-year data', journalOrCongress: 'Arthritis Rheumatol', date: '2026-03', product: 'Benlysta', sentiment: 'positive' },
  { title: 'Dupilumab in EGPA: Phase 3 interim — LIBERTY-EGPA MUPPETS', journalOrCongress: 'NEJM', date: '2026-05', product: 'Competitor', sentiment: 'positive' },
];

export const MOCK_SOCIAL_TREND_SOURCES = [
  { platform: 'LinkedIn', author: 'Dr. Sagar Lonial', topic: 'DREAMM-7 OS framing — changing ADC conversation', date: '2026-07-05', product: 'Blenrep', sentiment: 'positive' },
  { platform: 'X / Twitter', author: 'Dr. Elena Zamagni', topic: 'Keratopathy vs bispecific CRS — comparative burden', date: '2026-06-08', product: 'Blenrep', sentiment: 'negative' },
  { platform: 'LinkedIn', author: 'Dr. Shannon Westin', topic: 'dMMR pan-tumor testing — beyond endometrial', date: '2026-06-14', product: 'Jemperli', sentiment: 'positive' },
  { platform: 'X / Twitter', author: 'Dr. Mario Castro', topic: 'Nucala multi-indication breadth at AAAAI 2026', date: '2026-03-01', product: 'Nucala', sentiment: 'positive' },
  { platform: 'PubMed alert', author: 'Dr. Elena Zamagni et al.', topic: 'BCMA ADC keratopathy vs bispecific CRS — treatment selection', date: '2026-05-20', product: 'Blenrep', sentiment: 'negative' },
];

export const MOCK_INGESTION = {
  agendas: 18,
  abstracts: 2841,
  posters: 892,
  speakers: 634,
  publicationsLinked: 3124,
  sessions: [
    { title: 'Blenrep DREAMM-8 Update: Belantamab + Pomalidomide/Dex in R/R MM', track: 'Hematology Oncology', products: ['Blenrep'] },
    { title: 'Jemperli RUBY Extension: OS in dMMR/MSI-H Endometrial Cancer', track: 'GYN Oncology', products: ['Jemperli'] },
    { title: 'Zejula 1L Maintenance — Updated BRCA-Stratified Analysis', track: 'GYN Oncology', products: ['Zejula'] },
    { title: 'dMMR Pan-Tumor Testing: Beyond Colorectal and Endometrial', track: 'Immuno-Oncology', products: ['Jemperli'] },
  ],
};

export const INGESTION_BY_CONGRESS = {
  'asco-2026': {
    agendas: 18,
    abstracts: 2841,
    posters: 892,
    speakers: 634,
    publicationsLinked: 3124,
    sessions: [
      { title: 'Blenrep DREAMM-8 Update: Belantamab + Pomalidomide/Dex in R/R MM', track: 'Hematology Oncology', products: ['Blenrep'] },
      { title: 'Jemperli RUBY Extension: OS in dMMR/MSI-H Endometrial Cancer', track: 'GYN Oncology', products: ['Jemperli'] },
      { title: 'Zejula 1L Maintenance — Updated BRCA-Stratified Analysis', track: 'GYN Oncology', products: ['Zejula'] },
      { title: 'dMMR Pan-Tumor Testing: Beyond Colorectal and Endometrial', track: 'Immuno-Oncology', products: ['Jemperli'] },
    ],
  },
  'aaaai-2026': {
    agendas: 12,
    abstracts: 1142,
    posters: 387,
    speakers: 298,
    publicationsLinked: 1521,
    sessions: [
      { title: 'Nucala in EGPA and HES: Real-World Outcomes Across Indications', track: 'Asthma/Allergy', products: ['Nucala'] },
      { title: 'Type-2 Inflammation Biomarkers: Eosinophil Thresholds Across Indications', track: 'Immunology', products: ['Nucala'] },
      { title: 'Dupixent vs IL-5 Biologics in T2 Disease: Mechanism and Patient Selection', track: 'Competitive', products: ['Competitor', 'Nucala'] },
      { title: 'CRSwNP Management: Biologics Beyond Anti-IgE', track: 'ENT/Allergy', products: ['Nucala'] },
    ],
  },
  'trend-2025-2026': {
    agendas: 0,
    abstracts: 0,
    posters: 0,
    speakers: 0,
    publicationsLinked: 0,
    sessions: [],
  },
};

export function getIngestionForCongress(congressId) {
  return INGESTION_BY_CONGRESS[congressId] || MOCK_INGESTION;
}

export const MOCK_THEMES = [
  {
    theme: 'Blenrep comeback vs bispecific preference shift in R/R MM',
    momentum: 94,
    mentions: 78,
    summary: 'DREAMM-7/8 OS data driving Blenrep "comeback story" narrative in academic MM circles, but bispecific antibody (teclistamab/talquetamab) real-world data and improving CRS management are creating a counter-narrative. Zamagni divergence is the sentinel signal of a broader European KOL preference shift. ASCO 2026 SOV: Blenrep 18% vs bispecifics 31%.',
    action: 'Deploy keratopathy vs CRS comparative guide to MM MSLs. Commission DREAMM-7 OS community briefing card. Schedule Zamagni scientific exchange before ESMO 2026.',
  },
  {
    theme: 'Nucala T2 indication breadth vs dupilumab competitive pressure',
    momentum: 87,
    mentions: 62,
    summary: 'Dupilumab expanding into all major T2 inflammatory indications, encroaching on Nucala territory. Dupixent Phase III EGPA data expected Q3 2026. Multi-indication breadth is Nucala\'s key differentiation — eosinophil biology unifies SEA, EGPA, HES, CRSwNP — but MSLs are not communicating this breadth in first interactions (AI2, recurrence 4).',
    action: 'Deploy cascade conversation guide (A3). Accelerate eosinophil-threshold KOL engagement (A4) before Dupixent EGPA data arrives.',
  },
  {
    theme: 'dMMR pan-tumor testing gap — Jemperli awareness outside GYN oncology',
    momentum: 81,
    mentions: 54,
    summary: 'FDA tumor-agnostic pembrolizumab approval is accelerating dMMR/MSI-H testing expansion beyond colorectal and endometrial cancer into gastric, biliary, thoracic and other solid tumors. However, Jemperli is not top-of-mind when positive dMMR results come back in non-GYN settings — pembrolizumab is the default reflex. AI3 (recurrence 3) confirms systematic gap.',
    action: 'Partner with GI tumor board chairs on dMMR testing protocols (A5). Develop pan-tumor Jemperli educational toolkit for non-GYN oncologists (A6).',
  },
  {
    theme: 'Zejula 1L maintenance BRCA access gap in community GYN oncology',
    momentum: 73,
    mentions: 41,
    summary: 'PRIMA all-comer approval simplifies prescribing but community GYN oncology sites lack embedded BRCA/HRD CDx workflows. Testing is ordered ad hoc, delaying eligibility determination. Academic centres have integrated pathways; community does not. CDx access support programme (A7) addressing this, with 6 sites now offering reflex BRCA testing.',
    action: 'Expand CDx access support programme to additional community sites. Develop community oncologist briefing on BRCA-stratified PRIMA data.',
  },
];

export const MOCK_COMPETITOR_VISIBILITY = [
  { product: 'Nucala (GSK)',               share: 24, mentions: 62 },
  { product: 'Dupixent (Sanofi/Regeneron)', share: 31, mentions: 81 },
  { product: 'Tecvayli/Talvey (J&J)',       share: 18, mentions: 47 },
  { product: 'Fasenra (AstraZeneca)',        share: 14, mentions: 36 },
  { product: 'Other',                        share: 13, mentions: 34 },
];

export const MOCK_TRIALS = {
  total: 47,
  linkedToKOLs: 31,
  byIndication: {
    'Multiple Myeloma': 18,
    'GYN Oncology': 16,
    'Respiratory/Allergy': 9,
    'Rheumatology': 4,
  },
  sample: [
    { nctId: 'NCT04162210', title: 'DREAMM-7: Belantamab + Bortezomib/Dex in R/R MM', phase: 'Phase 3', sponsor: 'GSK', product: 'Blenrep', indication: 'R/R Multiple Myeloma', status: 'Completed', sites: 132 },
    { nctId: 'NCT03981796', title: 'RUBY: Dostarlimab + Carboplatin/Paclitaxel in Endometrial Cancer', phase: 'Phase 3', sponsor: 'GSK', product: 'Jemperli', indication: 'Endometrial Cancer', status: 'Active', sites: 118 },
    { nctId: 'NCT02655016', title: 'PRIMA: Niraparib 1L Maintenance in Advanced Ovarian Cancer', phase: 'Phase 3', sponsor: 'GSK', product: 'Zejula', indication: 'Ovarian Cancer', status: 'Completed', sites: 119 },
    { nctId: 'NCT02020889', title: 'MIRRA: Mepolizumab in EGPA', phase: 'Phase 3', sponsor: 'GSK', product: 'Nucala', indication: 'EGPA', status: 'Completed', sites: 39 },
  ],
};

export const MOCK_SOCIAL = {
  totalSignals: 4218,
  period: 'Last 90 days',
  byPlatform: [
    { platform: 'Twitter / X', mentions: 1412, kolsTracked: 88 },
    { platform: 'LinkedIn',    mentions: 1087, kolsTracked: 114 },
    { platform: 'PubMed / alerts', mentions: 541, kolsTracked: 312 },
    { platform: 'Conference backchannels', mentions: 1178, kolsTracked: 127 },
  ],
  sample: [
    { platform: 'LinkedIn', author: 'Dr. Sagar Lonial', topic: 'DREAMM-7 OS — ADC comeback story', sentiment: 'positive', date: '2026-07-05' },
    { platform: 'X / Twitter', author: 'Dr. Elena Zamagni', topic: 'Keratopathy vs bispecific CRS comparison', sentiment: 'negative', date: '2026-06-08' },
    { platform: 'PubMed alert', author: 'Multiple (Zamagni et al.)', topic: 'BCMA ADC tolerability in real-world practice', sentiment: 'negative', date: '2026-05-20' },
  ],
};

export const DATA_MODULES = [
  { id: 'congress', label: 'Congress & Publications', iconId: 'FileText', status: 'connected', description: 'Agendas, abstracts, posters, speakers, linked publications' },
  { id: 'trials',   label: 'Clinical Trials',         iconId: 'Activity',     status: 'available', description: 'Trial sponsorship, sites, outcomes by product' },
  { id: 'social',   label: 'Social & Digital',        iconId: 'MessageCircle', status: 'available', description: 'Scientific and digital footprint signals' },
];

export function getDemoContext() {
  return {
    ingestion: MOCK_INGESTION,
    themes: MOCK_THEMES,
    competitorVisibility: MOCK_COMPETITOR_VISIBILITY,
    trials: MOCK_TRIALS,
    social: MOCK_SOCIAL,
    trendSentiment: MOCK_TREND_SENTIMENT,
    scientificArticles: MOCK_SCIENTIFIC_ARTICLES,
    socialTrendSources: MOCK_SOCIAL_TREND_SOURCES,
  };
}
