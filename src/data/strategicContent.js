// Strategic content for GSK Medical Affairs Demo — Immunology & Oncology
// Last updated: 2026-07-11

export const STRATEGIC_IMPERATIVES = [
  {
    id: 'si-001',
    name: 'Biomarker-Driven Patient Identification',
    category: 'Patient-Related',
    description:
      'Ensure that eosinophil-guided patient identification for Nucala is applied consistently across all 4 approved T2 indications (SEA, EGPA, HES, CRSwNP), not only in severe eosinophilic asthma. For Oncology, expand dMMR/MSI-H reflex testing beyond GYN oncology and improve BRCA/HRD CDx access in community GYN oncology settings to capture 1L niraparib maintenance eligibility at diagnosis.',
    successMetrics: [
      'Nucala multi-indication awareness rate across prescribing pulmonologists and allergists (target: >70%)',
      'dMMR reflex testing rate in GI and thoracic tumor boards (target: +15pts by Q4 2026)',
      'BRCA/HRD testing rate at ovarian cancer diagnosis — community sites (target: >60%)',
      'Insight AI2 recurrence reduction after A3 cascade guide deployment'
    ],
    keyActions: [
      'Deploy Nucala multi-indication cascade conversation guide (A3) to respiratory/allergy MSLs',
      'Partner with GI tumor board chairs on dMMR/MSI-H reflex testing protocols (A5)',
      'Activate CDx access support programme for BRCA testing in community GYN oncology (A7)',
      'Engage respiratory KOLs on eosinophil threshold guidance across all 4 Nucala indications (A4)'
    ]
  },
  {
    id: 'si-002',
    name: 'Clinical Differentiation in Competitive Settings',
    category: 'Scientific',
    description:
      'Position Nucala\'s multi-indication T2 breadth vs dupilumab\'s single-mechanism approach using eosinophil biology as the unifying frame. Rebuild Blenrep KOL conviction using DREAMM-7/8 OS and PFS data, addressing keratopathy perception vs bispecific CRS through the ophthalmology co-management protocol. Establish Jemperli\'s RUBY endometrial survival data and pan-tumor dMMR narrative ahead of the ESMO 2026 abstract cycle.',
    successMetrics: [
      'Blenrep SOV at ASH 2026 vs bispecifics (target: >25%, from 18% at ASCO 2026)',
      'Nucala SOV at AAAAI 2026 vs Dupixent (near-parity at 29% vs 31% — maintain or improve)',
      'Zamagni alignment score recovery (target: >60 within 90 days)',
      'DREAMM-7 OS data awareness among community MM oncologists (target: >50%)'
    ],
    keyActions: [
      'Deploy keratopathy vs CRS comparative management guide to all MM MSLs (A1)',
      'Schedule scientific exchange with Dr. Zamagni — DREAMM-7 OS + keratopathy protocol (A2)',
      'Commission DREAMM-7 OS community oncologist briefing card (A8)',
      'Develop Jemperli pan-tumor dMMR educational toolkit for non-GYN oncologists (A6)'
    ]
  },
  {
    id: 'si-003',
    name: 'Real-World Evidence & Outcome Capture',
    category: 'Evidence Generation',
    description:
      'Generate and disseminate RWE across the dual-division portfolio. Capture and codify field insights into actionable Medical Objectives through the NOVA insight loop. Demonstrate MA ROI through outcome attribution and VEGA Impact Index tracking across both Immunology and Oncology franchises.',
    successMetrics: [
      'NOVA insight recurrence rate per LP (target: all active LPs with ≥2 sources per quarter)',
      'Insight-to-action conversion rate (target: >40% of Prioritised insights generate a Started action)',
      'VEGA Impact Index overall score (current 74, target 80 by Q4 2026)',
      'Benlysta LN earlier-line initiation rate (MO5, current 19% — target reversal to >25%)'
    ],
    keyActions: [
      'Benlysta LN MSL re-briefing on earlier-line patient identification criteria (A9)',
      'Maintain NOVA insight capture cadence across dual-division MSL team',
      'Develop KIQ for Benlysta LN line-of-therapy timing data collection',
      'VEGA ROMI quarterly review with GSK MA leadership'
    ]
  },
];

export const COMPETITIVE_LANDSCAPE = [
  {
    area: 'T2 Inflammation — Nucala vs Dupilumab',
    competitor: 'Dupixent (dupilumab, Sanofi/Regeneron)',
    mechanism: 'IL-4/IL-13 dual blockade vs Nucala IL-5 blockade',
    gskPosition: 'Nucala approved in 4 T2 indications including HES — dupilumab has no HES label. EGPA Phase III data for dupilumab expected Q3 2026. Eosinophil-guided selection is the key differentiation: for eosinophil-dominant disease, IL-5 depletion is mechanistically superior.',
    threat: 'High — dupilumab expanding into all Nucala indications except HES; label expansion imminent',
  },
  {
    area: 'R/R Multiple Myeloma — Blenrep vs Bispecific Antibodies',
    competitor: 'Tecvayli (teclistamab, J&J) / Talvey (talquetamab, J&J)',
    mechanism: 'BCMA ADC (Blenrep) vs BCMA/CD3 bispecific (Tecvayli) / GPRC5D/CD3 bispecific (Talvey)',
    gskPosition: 'DREAMM-7 OS benefit (bela+bortezomib/dex) is the primary differentiation. Keratopathy management protocol via ophthalmology co-management addresses the main objection. Blenrep hits a different BCMA epitope; combination with novel agents opens future positioning.',
    threat: 'High — bispecific real-world data improving, CRS management perception improving, Zamagni divergence amplifying',
  },
  {
    area: 'GYN Oncology — Jemperli vs Pembrolizumab / Zejula vs Lynparza/Rubraca',
    competitor: 'Keytruda (pembrolizumab, MSD) / Lynparza (olaparib, AstraZeneca)',
    mechanism: 'PD-1 inhibitor (dMMR pan-tumor) / PARP inhibitor (ovarian cancer maintenance)',
    gskPosition: 'Jemperli has RUBY trial endometrial survival data and a pan-tumor dMMR label. Zejula has an all-comer 1L maintenance approval enabling simplified prescribing. PARP + checkpoint combos are emerging as the next competitive frontier.',
    threat: 'Medium — pembrolizumab well-established in dMMR pan-tumor; olaparib entrenched in BRCA+ ovarian maintenance',
  },
];

// Immunology and oncology biology corpus (maps to COMPLEMENT_BIOLOGY export name for template compatibility)
export const COMPLEMENT_BIOLOGY = {
  nucala: {
    name: 'IL-5 / Eosinophil Biology (Nucala)',
    mechanism: 'Mepolizumab is a humanised anti-IL-5 monoclonal antibody that binds to interleukin-5, the key cytokine responsible for eosinophil differentiation, maturation, activation and survival. By blocking IL-5 signalling, mepolizumab depletes circulating and tissue eosinophils. This mechanism underpins efficacy across all 4 T2 indications: SEA, EGPA (eosinophilic granulomatosis with polyangiitis), HES (hypereosinophilic syndrome), and CRSwNP (chronic rhinosinusitis with nasal polyps).',
    relevance: 'Eosinophil count serves as the primary biomarker for patient selection — ≥150 cells/μL at initiation or ≥300 cells/μL in prior year for SEA; peripheral eosinophilia as cardinal feature in EGPA and HES. The multi-indication breadth is unified by eosinophil biology.',
  },
  benlysta: {
    name: 'BLyS / APRIL Biology (Benlysta)',
    mechanism: 'Belimumab is a human monoclonal antibody that inhibits B-lymphocyte stimulator (BLyS, also known as BAFF), a cytokine critical for B-cell survival, maturation, and differentiation into antibody-secreting plasma cells. In SLE, excess BLyS drives autoreactive B-cell survival and autoantibody production. By blocking soluble BLyS, belimumab reduces autoantibody levels (particularly anti-dsDNA) and decreases B-cell populations involved in disease perpetuation.',
    relevance: 'Benlysta is approved for both SLE and lupus nephritis (LN). The LN approval (IV formulation) addresses renal manifestations driven by immune complex deposition and complement activation. Earlier-line initiation (MO5) is supported by BLISS-LN trial showing renal response benefit — rheumatologists are initiating too late.',
  },
  blenrep: {
    name: 'BCMA / Plasma Cell Biology (Blenrep)',
    mechanism: 'Belantamab mafodotin is an antibody-drug conjugate (ADC) targeting B-cell maturation antigen (BCMA, also known as TNFRSF17), a protein highly expressed on malignant plasma cells in multiple myeloma. The anti-BCMA antibody (GSK2857916) is conjugated to mafodotin (MMAF), a microtubule-disrupting agent, via a protease-resistant linker. Binding to BCMA on myeloma cells induces internalisation, intracellular MMAF release, and apoptosis. The ADC also triggers ADCC and ADCP through the afucosylated Fc region.',
    relevance: 'BCMA expression increases with disease progression, making Blenrep particularly relevant in the R/R setting. DREAMM-7 (+ bortezomib/dex) and DREAMM-8 (+ pomalidomide/dex) demonstrated OS and PFS benefits enabling FDA readmission. Keratopathy (corneal epithelial changes) is an on-target effect of mafodotin in ocular tissues — the key safety consideration requiring ophthalmology monitoring.',
  },
  jemperli: {
    name: 'MMR Pathway / dMMR-MSI-H Biology (Jemperli)',
    mechanism: 'Dostarlimab is a humanised PD-1 blocking antibody that restores anti-tumour T-cell immunity. In dMMR (deficient mismatch repair) or MSI-H (microsatellite instability-high) tumors, defects in the MMR gene complex (MLH1, MSH2, MSH6, PMS2) lead to accumulation of insertions/deletions at microsatellite repeats, generating high neoantigen burden. This high mutational load creates immunogenic tumors that are particularly responsive to PD-1 checkpoint inhibition.',
    relevance: 'Jemperli is approved for dMMR endometrial cancer and dMMR solid tumors. The RUBY trial demonstrated OS benefit in dMMR/MSI-H advanced endometrial cancer (+ carboplatin/paclitaxel). Pan-tumor dMMR testing expansion (MO3) is the primary growth lever — GI and thoracic tumor boards are not consistently testing or considering Jemperli for positive results.',
  },
  zejula: {
    name: 'PARP / HRD Biology (Zejula)',
    mechanism: 'Niraparib is a PARP1/2 inhibitor that blocks base-excision repair of single-strand DNA breaks. In cells with BRCA1/2 mutations or other homologous recombination deficiency (HRD), niraparib induces synthetic lethality — the inability to repair double-strand breaks via either the PARP pathway or HR pathway results in irreversible DNA damage and cell death. BRCA wild-type HRD tumors (via genomic instability testing) also show benefit, underpinning the all-comer 1L maintenance approval.',
    relevance: 'Zejula is approved for 1L maintenance in advanced ovarian cancer regardless of BRCA/HRD status (all-comer PRIMA trial). This approval simplifies prescribing but creates a CDx access gap — BRCA testing identifies the patients most likely to benefit, but community sites are not consistently testing at diagnosis (MO4, AI4).',
  },
};

export const PIPELINE_INTELLIGENCE = [
  {
    asset: 'Depemokimab',
    mechanism: 'Next-generation anti-IL-5 with extended half-life (6-month dosing)',
    stage: 'Phase III (SWIFT programme — SEA and EGPA)',
    gskDivision: 'Immunology',
    relevance: 'Next-gen Nucala successor — 2× yearly dosing vs monthly Nucala. If approved, will reshape eosinophilic disease treatment frequency. Critical for EGPA and HES indication coverage where Nucala T2 breadth story is being built.',
  },
  {
    asset: 'Feladilimab',
    mechanism: 'ICOS agonist — T-cell co-stimulatory immune activator',
    stage: 'Phase II (solid tumors, combination with pembrolizumab)',
    gskDivision: 'Oncology',
    relevance: 'Immuno-oncology combination play — could complement dostarlimab (Jemperli) strategy if data support GYN oncology combinations.',
  },
  {
    asset: 'Cobolimab',
    mechanism: 'TIM-3 checkpoint inhibitor — reverses T-cell exhaustion in tumors with high TIM-3 expression',
    stage: 'Phase III (COSTAR Lung — NSCLC, in combination with dostarlimab)',
    gskDivision: 'Oncology',
    relevance: 'Potential pipeline combination for Jemperli — if COSTAR Lung succeeds, dostarlimab+cobolimab could expand GYN/solid tumor indication set and strengthen the Jemperli platform narrative.',
  },
];
