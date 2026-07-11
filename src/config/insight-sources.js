// Insight Source Value Matrix — NOVA's "Insight Sources & Impact" tab.
// Quantifies the value of each insight-source channel: volume,
// quality, leads-to-action, cost, and an aggregated ROI score.

export const INSIGHT_SOURCES = [
  { id: 'is-1', source: 'MSL Field Reports',                       volume: 1186, qualityScore: 84, leadsToActionPct: 68, costPerInsight: 194,  roiScore: 8.1 },
  { id: 'is-2', source: 'Congress Intelligence (ASCO/AAAAI 2026)', volume: 284,  qualityScore: 79, leadsToActionPct: 42, costPerInsight: 760,  roiScore: 7.3 },
  { id: 'is-3', source: 'Advisory Board Readouts',                 volume: 52,   qualityScore: 96, leadsToActionPct: 38, costPerInsight: 3840, roiScore: 8.6 },
  { id: 'is-4', source: 'Medical Information Queries',             volume: 743,  qualityScore: 69, leadsToActionPct: 24, costPerInsight: 42,   roiScore: 7.0 },
  { id: 'is-5', source: 'Social & Digital (KOL monitoring)',       volume: 3912, qualityScore: 44, leadsToActionPct: 19, costPerInsight: 11,   roiScore: 4.8 },
];

// KIT Relevance Trend — 6-month relevance score per KIT.
export const KIT_RELEVANCE_TREND = [
  { month: 'Jan 2026', 'Blenrep Ocular Toxicity Mgmt': 74, 'Bispecific vs BCMA ADC': 68, 'Nucala T2 Breadth': 71, 'dMMR Pan-Tumor Testing': 58, 'PARP 1L Maintenance': 74 },
  { month: 'Feb 2026', 'Blenrep Ocular Toxicity Mgmt': 78, 'Bispecific vs BCMA ADC': 73, 'Nucala T2 Breadth': 72, 'dMMR Pan-Tumor Testing': 62, 'PARP 1L Maintenance': 73 },
  { month: 'Mar 2026', 'Blenrep Ocular Toxicity Mgmt': 82, 'Bispecific vs BCMA ADC': 78, 'Nucala T2 Breadth': 74, 'dMMR Pan-Tumor Testing': 67, 'PARP 1L Maintenance': 72 },
  { month: 'Apr 2026', 'Blenrep Ocular Toxicity Mgmt': 86, 'Bispecific vs BCMA ADC': 81, 'Nucala T2 Breadth': 75, 'dMMR Pan-Tumor Testing': 71, 'PARP 1L Maintenance': 71 },
  { month: 'May 2026', 'Blenrep Ocular Toxicity Mgmt': 91, 'Bispecific vs BCMA ADC': 87, 'Nucala T2 Breadth': 77, 'dMMR Pan-Tumor Testing': 78, 'PARP 1L Maintenance': 71 },
  { month: 'Jun 2026', 'Blenrep Ocular Toxicity Mgmt': 96, 'Bispecific vs BCMA ADC': 93, 'Nucala T2 Breadth': 78, 'dMMR Pan-Tumor Testing': 84, 'PARP 1L Maintenance': 71 },
];
