// Insight-to-Impact — Vision Doc Module 2 (Insights to Action) impact view.
// Surfaces the lineage from a captured insight → action taken → measurable
// outcome, with timeframe and impact score.

export const INSIGHT_TO_IMPACT = [
  {
    id: 'i2i-1',
    insight: 'Nucala multi-indication gap: pulmonologists unaware of EGPA, HES, CRSwNP approvals after first 2 MSL interactions (AI2, recurrence 4).',
    action: 'Nucala multi-indication cascade conversation guide (A3) deployed to MSL team; structured to introduce all 4 indications in a single interaction using eosinophil biology as the unifying frame.',
    outcome: '3 pulmonologists now initiating EGPA/CRSwNP conversations with Nucala in all 4 indications; 1 formulary committee opened a Nucala vs Fasenra indication-breadth review.',
    timeframe: '5 weeks',
    impactScore: 7,
    relatedInsight: 'AI2',
    relatedMO: 'MO1',
  },
  {
    id: 'i2i-2',
    insight: 'BRCA/HRD testing ordered ad hoc in community GYN oncology — missing 1L maintenance eligibility window (AI4, recurrence 2).',
    action: 'CDx access support programme (A7, Started) engaged 8 community GYN oncology sites with integrated BRCA testing pathway — reflex ordering at diagnosis embedded in oncology intake protocol.',
    outcome: '6 community GYN oncology sites now offering reflex BRCA testing at diagnosis; median time to eligibility determination reduced from 34 to 18 days at participating sites.',
    timeframe: '7 weeks',
    impactScore: 8,
    relatedInsight: 'AI4',
    relatedMO: 'MO4',
  },
  {
    id: 'i2i-3',
    insight: 'Blenrep keratopathy perceived as greater burden than bispecific CRS — ophthalmology co-management cited as logistical barrier (AI1, recurrence 3).',
    action: 'Keratopathy vs CRS comparative management guide (A1, Started) deployed to MM MSL team with ophthalmology co-management protocol and grade 2 dose-delay algorithm.',
    outcome: 'Ophthalmology co-management protocol adopted by 4 MM centres; 2 previously hesitant community MM oncologists reopened Blenrep prescribing discussions after receiving the dose-delay algorithm.',
    timeframe: '4 weeks',
    impactScore: 6,
    relatedInsight: 'AI1',
    relatedMO: 'MO2',
  },
];
