// VEGA — Strategic Analytics agent.
// Implements the "must-have" measures from the Aurivian extended analytics
// document (Vision Doc, Strategic Analytics, Section 5).

// 1.1 HCP Awareness Progression — movement of HCPs along the awareness ladder.
export const VEGA_AWARENESS_PROGRESSION = {
  benchmark: '34% of HCPs achieving sustained practice change vs 22% industry average — +55% outperformance across Immunology and Oncology divisions. Slowest conversion: Knowledgeable → Intent (61%, avg 52 days). Primary blockers: Blenrep keratopathy hesitancy (Oncology) and Nucala multi-indication awareness gap (Immunology). Recommended actions: deploy keratopathy vs CRS comparative guide to MM MSLs; activate Nucala cascade conversation guide to respiratory/allergy MSLs.',
  stages: [
    { stage: 'Sustained practice change', hcps: 487,  pctTotal: 34, vsQ4: '+9%'  },
    { stage: 'Actively changing practice', hcps: 574,  pctTotal: 40, vsQ4: '+7%'  },
    { stage: 'Intent to change',           hcps: 821,  pctTotal: 57, vsQ4: '+4%'  },
    { stage: 'Knowledgeable',              hcps: 1184, pctTotal: 82, vsQ4: '+3%'  },
    { stage: 'Aware only',                 hcps: 418,  pctTotal: 29, vsQ4: '-11%' },
  ],
};

// 1.2 Interaction Quality vs Quantity — by MSL/Region.
export const VEGA_INTERACTION_QUALITY = {
  insight: 'Dr. Priya Nair (EU Immunology) shows high interaction volume but conversations are not converting to KIQ insights — likely conducting relationship maintenance rather than structured KIQ discussions. Marcus Williams (US Oncology NE) has a volume gap; Q2 interactions 28% below target. Joint field visit with regional lead recommended for both.',
  rows: [
    { msl: 'Sarah Chen',       region: 'US Immunology West',   interactions: 51, vsTarget: '+7%',  quality: 8.6, insightRate: 79, overall: 'Excellent'    },
    { msl: 'Marcus Williams',  region: 'US Oncology NE',       interactions: 34, vsTarget: '-28%', quality: 8.1, insightRate: 74, overall: 'Volume gap'    },
    { msl: 'Dr. Priya Nair',   region: 'EU Immunology',        interactions: 48, vsTarget: '+4%',  quality: 5.8, insightRate: 38, overall: 'Quality gap'   },
    { msl: 'James Thornton',   region: 'US Oncology SE',       interactions: 44, vsTarget: '+2%',  quality: 8.3, insightRate: 77, overall: 'On track'      },
    { msl: 'Dr. Amelia Brooks', region: 'US Immunology Midwest', interactions: 39, vsTarget: '-13%', quality: 9.2, insightRate: 91, overall: 'Volume gap'  },
    { msl: 'Dr. Carlos Rivera', region: 'US Oncology SW',      interactions: 46, vsTarget: '+5%',  quality: 8.8, insightRate: 84, overall: 'Excellent'    },
  ],
};

// 1.3 Engagement Gap Tracker — Tier 1/2 KOLs not contacted within window.
export const VEGA_ENGAGEMENT_GAPS = [
  { kol: 'Dr. Elena Zamagni',          tier: 'Tier 1', lastContact: '2026-04-28', gap: '10 weeks', action: 'URGENT — divergence alert. Schedule scientific exchange immediately. Alignment 69→44.' },
  { kol: 'Dr. Mansoor Raza Mirza',     tier: 'Tier 2', lastContact: '2026-05-13', gap: '8 weeks',  action: 'Re-engage before ESMO 2026 abstract submission deadline — key Zejula/Jemperli KOL.' },
  { kol: 'Dr. Bevra Hahn',             tier: 'Tier 2', lastContact: '2026-05-27', gap: '6 weeks',  action: 'Schedule — Benlysta LN earlier-line re-briefing opportunity.' },
  { kol: 'Dr. Richard Beasley',        tier: 'Tier 2', lastContact: '2026-06-03', gap: '5 weeks',  action: 'Plan interaction — Nucala T2 indication breadth conversation.' },
  { kol: 'Dr. Joan Reibman',           tier: 'Tier 2', lastContact: '2026-06-17', gap: '3 weeks',  action: 'On track — next interaction due before end July.' },
];

// 2.1 Share of Scientific Voice — vs competitors.
export const VEGA_SHARE_OF_VOICE = {
  watchArea: 'Blenrep SOV at ASCO 2026 was 18% vs bispecifics (teclistamab + talquetamab combined) at 31% — a 13-point gap that represents the most urgent SOV risk in the portfolio. Nucala SOV at AAAAI 2026 was 29% vs Dupixent 31% — near parity, reinforcing the T2 indication breadth differentiation opportunity.',
  rows: [
    { source: 'ASCO 2026 — MM sessions (Blenrep vs bispecifics)', us: '18%', compA: '31%', compB: '28%', compC: '23%', trend: 'down' },
    { source: 'AAAAI 2026 — Respiratory/allergy (Nucala vs Dupixent)', us: '29%', compA: '31%', compB: '18%', compC: '22%', trend: 'flat' },
    { source: 'Peer-reviewed publications (12m, Immunology)',       us: '31%', compA: '28%', compB: '22%', compC: '19%', trend: 'up'   },
    { source: 'Peer-reviewed publications (12m, Oncology)',         us: '26%', compA: '34%', compB: '22%', compC: '18%', trend: 'flat' },
    { source: 'KOL active endorsements (all portfolio)',            us: '33%', compA: '29%', compB: '24%', compC: '14%', trend: 'up'   },
  ],
};

// 2.2 KOL Sentiment Velocity — rate-of-change of alignment.
export const VEGA_SENTIMENT_VELOCITY = [
  { kol: 'Dr. Sagar Lonial',     score: 86, change30d: '+3.1', velocity: '+1.0 ↑↑', interpretation: 'Positive acceleration post-DREAMM-7 post — advisory board and co-authorship window open' },
  { kol: 'Dr. Elena Zamagni',    score: 44, change30d: '-8.2', velocity: '-2.7 ↓↓', interpretation: 'Critical decline — bispecific advocacy vocal and growing, ESMO risk in 3 months' },
  { kol: 'Dr. Shannon Westin',   score: 84, change30d: '+1.8', velocity: '+0.6 ↑',  interpretation: 'Steady positive — maintain current cadence, Jemperli pan-tumor data well received' },
  { kol: 'Dr. Mario Castro',     score: 82, change30d: '+2.4', velocity: '+0.8 ↑',  interpretation: 'Improving — Nucala T2 breadth message landing well in recent interactions' },
];

// 4.1 Care Gap Closure Tracking — patient-level outcome of MA activity.
export const VEGA_CARE_GAP_CLOSURE = [
  { gap: 'Nucala EGPA/HES/CRSwNP adoption — multi-indication identification', linkedMO: 'MO1', baseline: '28% multi-indication awareness', current: '40% (+12pts)', patientsImpacted: 'Est. 340 additional patients considered for non-SEA indications' },
  { gap: 'BRCA reflex testing access — community GYN oncology',               linkedMO: 'MO4', baseline: '41% community sites with embedded CDx', current: '50% (+9pts)', patientsImpacted: 'Est. 290 patients with earlier eligibility determination' },
  { gap: 'Benlysta LN earlier-line initiation — rheumatology',                linkedMO: 'MO5', baseline: '23% initiating at 1st-add-on',  current: '19% (-4pts)', patientsImpacted: 'Declining — MO5 Gap status, A9 re-briefing not yet deployed' },
];

// 4.2 ROMI — financial framing.
export const VEGA_ROMI = {
  netValueCreated: '$3.1M',
  roiPct: '154%',
  returnPerPound: '$2.54 per $1 invested',
  rows: [
    { category: 'Prescription growth attributed to MA (Immunology)',  value: '$1.8M',  methodology: 'HCPs with high Nucala/Benlysta MA engagement show 1.9× higher prescribing — difference-in-difference analysis Q1–Q2 2026' },
    { category: 'Prescription growth attributed to MA (Oncology)',    value: '$2.1M',  methodology: 'HCPs with high Blenrep/Jemperli/Zejula MA engagement show 1.7× higher prescribing vs matched controls' },
    { category: 'Competitive revenue protection (Blenrep)',           value: '$1.4M',  methodology: 'Estimated prescribing prevented from shifting to bispecifics in accounts with active MSL engagement post-readmission' },
    { category: 'Health system efficiency (biomarker testing access)', value: '$0.8M', methodology: 'Reduced time-to-treatment-eligibility in BRCA-tested community sites; fewer delayed maintenance initiations' },
    { category: 'Total investment',                                    value: '-$2.0M', methodology: 'Full dual-division Medical Affairs budget — field team, advisory boards, congress, content, platform' },
  ],
};

// 4.3 Medical Affairs Impact Index — composite executive headline metric.
export const VEGA_IMPACT_INDEX = {
  overall: 74,
  vsQ4: '+4',
  target: 80,
  dimensions: [
    { dim: 'Execution excellence',      score: 79, commentary: 'On track — field interactions and congress coverage meeting targets; community MM reach below benchmark' },
    { dim: 'External ecosystem impact', score: 76, commentary: '+14% KOL network expansion, Nucala SOV near parity with Dupixent at AAAAI 2026; Blenrep SOV gap vs bispecifics is the primary risk' },
    { dim: 'HCP practice change',       score: 74, commentary: '34% sustained change vs 22% industry average — strong Immunology performance, Oncology below target' },
    { dim: 'Patient care gap closure',  score: 71, commentary: 'Nucala EGPA adoption +12pts, BRCA testing +9pts; Benlysta LN -4pts declining — MO5 Gap requires urgent action' },
    { dim: 'Internal ecosystem impact', score: 70, commentary: 'Cross-division KOL intelligence sharing operational; HEOR collaboration on RWE below potential' },
  ],
};
