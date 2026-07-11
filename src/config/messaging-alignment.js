// Medical Messaging Alignment — LUCA's per-KOL alignment view.
// Vision Doc Module 3 (KOL Intelligence) — alignment % per messaging pillar
// plus an AI engagement recommendation tying tier, influence and gaps
// together.

// The medical messaging pillars the brand is trying to move HCPs toward.
export const MESSAGING_PILLARS = [
  { id: 'pillar-1', name: 'Blenrep DREAMM-7 OS Benefit',         short: 'DREAMM-7 OS' },
  { id: 'pillar-2', name: 'Nucala T2 Indication Breadth',        short: 'T2 breadth' },
  { id: 'pillar-3', name: 'Jemperli dMMR Pan-Tumor',             short: 'dMMR pan-tumor' },
  { id: 'pillar-4', name: 'Zejula 1L Maintenance Evidence',      short: '1L maintenance' },
];

// Stable per-KOL alignment + AI recommendation, derived deterministically
// from tier + influence + a per-pillar offset on the KOL id hash. Avoids
// the 18×4 hand-keyed table while giving each KOL distinct values across
// re-renders and per-pillar realism.
function hashCode(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const TIER_BASELINE = { 'Tier 1': 78, 'Tier 2': 64, 'Tier 3': 50 };

export function getMessagingAlignment(kol) {
  if (!kol) return null;
  const baseline = TIER_BASELINE[kol.engagementTier] ?? 60;
  const influenceLift = Math.round((kol.influenceScore - 70) / 4); // ~ -5..+8
  const idHash = hashCode(kol.id);

  const pillars = MESSAGING_PILLARS.map((p, i) => {
    // Deterministic per-pillar offset in -15..+15
    const offset = ((idHash + i * 37) % 31) - 15;
    const score = Math.max(20, Math.min(98, baseline + influenceLift + offset));
    return { ...p, score };
  });

  // Identify the largest gap pillar to anchor the recommendation.
  const gap = pillars.reduce((min, p) => (p.score < min.score ? p : min), pillars[0]);
  const strongest = pillars.reduce((max, p) => (p.score > max.score ? p : max), pillars[0]);
  const avgScore = Math.round(pillars.reduce((sum, p) => sum + p.score, 0) / pillars.length);

  let recommendation;
  if (gap.score >= 75) {
    recommendation = `Strong alignment across all messaging pillars (avg ${avgScore}%). Maintain current cadence — consider advisory board invitation, particularly on ${strongest.short}.`;
  } else if (gap.score >= 55) {
    recommendation = `Average alignment ${avgScore}%. Largest gap is ${gap.name} (${gap.score}%). Recommended: targeted scientific exchange focused on this pillar; bring updated evidence pack.`;
  } else {
    recommendation = `Below-target alignment on ${gap.name} (${gap.score}%). Suggest urgent re-engagement and 1:1 advisory; risk of competitor capture if not addressed within 6 weeks.`;
  }

  return { pillars, avgScore, gap, strongest, recommendation };
}
