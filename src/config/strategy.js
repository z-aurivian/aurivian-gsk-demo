// Strategic framework — Demo Brief §4.
// This is NOVA's spine: ISP → POA (Medical Objectives) → Listening
// Priorities → KIQs / KITs. Drives the Strategy-to-Action surface and the
// coverage scoring displayed on the Command Center.

export const ISP_PILLARS = [
  { id: 'p1', title: 'Biomarker-Driven Patient Identification',       description: 'Eosinophil-guided Nucala patient selection across all 4 indications; dMMR/MSI-H testing to unlock Jemperli pan-tumor use; BRCA/HRD biomarker access for Zejula 1L maintenance.' },
  { id: 'p2', title: 'Clinical Differentiation in Competitive Settings', description: 'Nucala T2 indication breadth vs dupilumab single-mechanism approach; Blenrep DREAMM-7/8 OS benefit vs bispecific antibody tolerability; Jemperli RUBY endometrial survival data vs SoC.' },
  { id: 'p3', title: 'Real-World Evidence & Outcome Capture',         description: 'Generate and disseminate RWE across the dual-division portfolio; capture and codify field insights into actionable Medical Objectives; demonstrate MA ROI through outcome attribution.' },
];

export const MEDICAL_OBJECTIVES = [
  { id: 'MO1', name: 'Nucala T2 indication breadth beyond severe asthma',    ispPillarRef: 'p1', description: 'Ensure prescribers understand and apply Nucala across all 4 approved T2 indications (SEA, EGPA, HES, CRSwNP), not only severe eosinophilic asthma.', status: 'Sufficient', coverage: 62 },
  { id: 'MO2', name: 'Blenrep KOL confidence post-readmission',              ispPillarRef: 'p2', description: 'Rebuild MM KOL conviction in Blenrep using DREAMM-7/8 OS data; address keratopathy perception vs bispecific CRS; re-engage KOLs who disengaged during withdrawal.', status: 'Low', coverage: 34 },
  { id: 'MO3', name: 'Jemperli dMMR pan-tumor beyond endometrial',           ispPillarRef: 'p1', description: 'Expand dMMR/MSI-H testing and Jemperli awareness beyond GYN oncology into colorectal, gastric, biliary and other solid tumor disciplines.', status: 'Low', coverage: 28 },
  { id: 'MO4', name: 'Zejula 1L maintenance BRCA testing access',            ispPillarRef: 'p1', description: 'Close the CDx gap in community GYN oncology — ensure reflex BRCA/HRD testing is standard at ovarian cancer diagnosis so 1L niraparib maintenance is identified early.', status: 'Sufficient', coverage: 58 },
  { id: 'MO5', name: 'Benlysta lupus nephritis earlier-line identification', ispPillarRef: 'p3', description: 'Drive earlier initiation of Benlysta in lupus nephritis — rheumatologists currently initiating too late, missing the window for maximal renal protection.', status: 'Gap', coverage: 19 },
];

export const LISTENING_PRIORITIES = [
  { id: 'LP1', name: 'Biomarker testing barriers for eosinophil-guided Nucala selection', moRef: 'MO1', kiq: 'What are the barriers preventing consistent eosinophil-count thresholds driving Nucala selection in EGPA and HES vs SEA? Are physicians applying the same criteria across indications?', kits: ['Eosinophil threshold guide', 'Multi-indication MSL briefing'] },
  { id: 'LP2', name: 'Blenrep ocular toxicity perception post-readmission',               moRef: 'MO2', kiq: 'How are MM KOLs framing keratopathy grade 2+ risk (21% DREAMM-7) relative to bispecific CRS? Is the ophthalmology co-management protocol seen as acceptable or prohibitive?', kits: ['Keratopathy vs CRS guide', 'DREAMM-7 OS briefing card'] },
  { id: 'LP3', name: 'dMMR testing in non-endometrial solid tumors',                      moRef: 'MO3', kiq: 'To what extent are GI, thoracic, and other oncology tumor boards reflexly testing for dMMR/MSI-H, and is Jemperli considered when a result is positive?', kits: ['dMMR pan-tumor toolkit', 'Tumor board engagement guide'] },
  { id: 'LP4', name: 'PARP inhibitor sequencing post-platinum in ovarian cancer',         moRef: 'MO4', kiq: 'How are GYN oncologists sequencing niraparib in the 1L maintenance setting? What is driving CDx uptake gaps in community vs academic centres?', kits: ['BRCA CDx access guide', 'PRIMA community briefing'] },
  { id: 'LP5', name: 'Bispecific vs BCMA ADC preference in MM post-KarMMa-3',            moRef: 'MO2', kiq: 'Following KarMMa-3 and real-world bispecific data, what is driving KOL preference for teclistamab or talquetamab over Blenrep in R/R MM, and how is this preference being communicated?', kits: ['Bispecific vs ADC comparative guide', 'KOL divergence briefing'] },
];

// Coverage score per MO at the moment of the demo.
export const COVERAGE_TARGETS = {
  MO1: 'Sufficient',
  MO2: 'Low',
  MO3: 'Low',
  MO4: 'Sufficient',
  MO5: 'Gap',
};
