// Auri canned Q&A — Demo Brief §12.
// Backs the chatbot's suggested prompts and the offline/fallback path.

export const AURI_PROMPTS = [
  {
    prompt: 'Where are the biggest MO coverage gaps across the two divisions?',
    response:
      'Three MO-level gaps stand out across the dual-division portfolio:\n\n• **MO5 (Benlysta LN earlier-line)** — Gap status, 19% coverage. Rheumatologists initiating after 2+ line failure. No current MSL re-briefing in market. A9 proposed but no owner.\n• **MO2 (Blenrep KOL confidence post-readmission)** — Low, 34% coverage. Zamagni divergence (alignment 44) is the live risk signal. A1 and A2 are in progress but community MM reach (AI7) remains limited.\n• **MO3 (Jemperli dMMR pan-tumor)** — Low, 28% coverage. Testing expansion is happening but Jemperli is not top-of-mind outside GYN oncology. A5 and A6 are Proposed with no owners assigned.',
    cites: [
      { type: 'mo', id: 'MO5' },
      { type: 'mo', id: 'MO2' },
      { type: 'mo', id: 'MO3' },
      { type: 'insight', id: 'AI7' },
      { type: 'action', id: 'A9' },
    ],
  },
  {
    prompt: 'What is the Blenrep comeback story and how should MSLs frame the keratopathy conversation?',
    response:
      'The Blenrep comeback story runs on three pillars:\n\n1. **DREAMM-7 OS benefit** — belantamab mafodotin + bortezomib/dex showed overall survival benefit vs bortezomib/dex alone in R/R MM. This is the data that drove FDA readmission Nov 2023 after the 2022 voluntary withdrawal.\n2. **DREAMM-8** — bela + pomalidomide/dex confirmed the combination approach with updated progression-free and response data.\n3. **Keratopathy framing** — MSLs should lead with the ophthalmology co-management protocol (dose-delay algorithm), not downplay the event rate. The 21% grade 2+ rate in DREAMM-7 is real, but grade 2 events resolved with dose delay — the key message is *manageable, not absent*.\n\nThe A1 keratopathy vs CRS comparative guide (Started) provides the head-to-head framing vs teclistamab CRS. A8 (DREAMM-7 OS briefing card) targets community oncologists who haven\'t reviewed the survival data.',
    cites: [
      { type: 'insight', id: 'AI1' },
      { type: 'insight', id: 'AI7' },
      { type: 'action', id: 'A1' },
      { type: 'action', id: 'A8' },
      { type: 'mo', id: 'MO2' },
    ],
  },
  {
    prompt: 'Summarise the Zamagni divergence and the recommended response.',
    response:
      'Dr. Elena Zamagni (IRCCS Bologna, MM Tier 1, influence 83) has seen her alignment score drop from 69 to 44 in 60 days — the steepest decline in the current KOL portfolio. She has published in HemaSphere and posted twice publicly on LinkedIn/X comparing Blenrep keratopathy unfavourably to bispecific CRS following KarMMa-3 data. Her last MSL contact was 10 weeks ago.\n\nWhy this matters: Zamagni is influential in the Italian MM community and presents regularly at ESMO and EHA. Her public framing is actively seeding into European MM networks and could shape ESMO 2026 abstract discussions before the conference.\n\nRecommended response:\n• **Immediate (A2, Started)** — Schedule scientific exchange focused on DREAMM-7 OS data + keratopathy management protocol. The exchange must be evidence-led, not promotional.\n• **Near-term** — Engage Lonial (A-alignment 86, just posted positively on DREAMM-7) as a peer voice.\n• **Monitor** — Track further LinkedIn/X posts and any ESMO 2026 abstract submissions from Bologna.',
    cites: [
      { type: 'kol', id: 'kol-18' },
      { type: 'insight', id: 'AI5' },
      { type: 'action', id: 'A2' },
      { type: 'mo', id: 'MO2' },
    ],
  },
  {
    prompt: 'Which dMMR/MSI-H testing gaps should NOVA prioritise for Jemperli expansion?',
    response:
      'NOVA\'s priority sequence for Jemperli pan-tumor expansion is:\n\n1. **GI tumor boards (colorectal and gastric)** — AI3 (recurrence 3, Validated) shows reflex dMMR testing is absent in these settings. When a positive result comes back, pembrolizumab is the default. Jemperli needs to be in the conversation before testing commoditises. A5 (partner with GI tumor board chairs) is Proposed — needs owner and Q4 commitment.\n2. **Thoracic oncology** — One ad board source confirmed dMMR testing not reflexly ordered in lung tumor boards. Early-stage engagement.\n3. **Biliary/hepatobiliary** — Emerging signal from ASCO 2026, not yet captured as a formal LP.\n\nA6 (Jemperli pan-tumor educational toolkit) should be activated alongside A5 — the toolkit enables MSL conversations in non-GYN settings without requiring a full scientific exchange.',
    cites: [
      { type: 'insight', id: 'AI3' },
      { type: 'action', id: 'A5' },
      { type: 'action', id: 'A6' },
      { type: 'mo', id: 'MO3' },
    ],
  },
  {
    prompt: 'How should we differentiate Nucala from dupilumab in the T2 inflammation conversation?',
    response:
      'The Nucala vs dupilumab differentiation story runs on eosinophil-guided precision:\n\n• **Multi-indication breadth** — Nucala is approved in 4 T2 indications (SEA, EGPA, HES, CRSwNP). Dupilumab holds approvals in overlapping territory but the mechanism is distinct: dupilumab blocks IL-4/IL-13, not IL-5. For eosinophil-dominant disease (EGPA, HES), eosinophil depletion via mepolizumab is the mechanistically appropriate choice.\n• **EGPA specificity** — EGPA is an eosinophil-driven vasculitis. The MIRRA trial established Nucala in EGPA with organ-sparing benefit. Dupilumab EGPA Phase III data (expected Q3 2026) will test this differentiation directly.\n• **HES** — Nucala is the only anti-IL-5 with HES approval. Dupilumab has no HES label.\n• **MSL conversation gap** — AI2 (recurrence 4) shows the multi-indication story is not landing in first interactions. A3 (cascade conversation guide) addresses this directly.',
    cites: [
      { type: 'insight', id: 'AI2' },
      { type: 'action', id: 'A3' },
      { type: 'action', id: 'A4' },
      { type: 'mo', id: 'MO1' },
    ],
  },
  {
    prompt: 'Prepare me for a meeting with the GSK immunology and oncology MA heads',
    response:
      'Key headlines for a dual-division MA leadership meeting:\n\n**Cross-division platform value:**\nAurivian is running as a unified intelligence layer across Immunology (Nucala/Benlysta/Arexvy) and Oncology (Blenrep/Jemperli/Zejula) — same agents (ARIA/LUCA/NOVA/VEGA), same insight capture methodology, cross-pollination of field intelligence.\n\n**Top 3 live risks:**\n1. Zamagni divergence (MM, LUCA) — Tier 1 KOL going public vs Blenrep, 10-week gap, ESMO 2026 risk\n2. Dupilumab EGPA expansion (Immunology, ARIA) — Phase III readout Q3 2026, Nucala positioning at stake\n3. MO3 + MO5 coverage Gap/Low (NOVA) — Jemperli pan-tumor and Benlysta LN both at risk of competitor capture\n\n**VEGA ROMI framing:**\n$3.1M net value created, ROI 154%, $2.54 per $1 invested in Medical Affairs. Cross-division tracking enables attribution across both franchises from a single platform investment.\n\n**Recommended ask:** Approve A5/A6 (Jemperli pan-tumor) owners and Q4 timeline; unlock A9 (Benlysta LN) MSL re-briefing for Q4.',
    cites: [
      { type: 'insight', id: 'AI5' },
      { type: 'mo', id: 'MO3' },
      { type: 'mo', id: 'MO5' },
    ],
  },
];

export const SUGGESTED_PROMPTS = [
  'Where are the biggest MO coverage gaps across the two divisions?',
  'What is the Blenrep comeback story and how should MSLs frame the keratopathy conversation?',
  'Summarise the Zamagni divergence and the recommended response.',
  'Which dMMR/MSI-H testing gaps should NOVA prioritise for Jemperli expansion?',
  'How should we differentiate Nucala from dupilumab in the T2 inflammation conversation?',
  'Prepare me for a meeting with the GSK immunology and oncology MA heads',
];
