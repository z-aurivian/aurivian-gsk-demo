// Outcome Volume (RaaS) — Demo Brief §10.
// Powers the persistent header chip. Results-as-a-Service: customers
// pre-commit to an outcome volume; we show real-time consumed/remaining.

export const OUTCOME_VOLUME = {
  period: 'Q2 2026',
  committed: 1400,
  consumed: 962,
  // Per-agent breakdown
  byAgent: {
    aria: { committed: 467, consumed: 341 },
    luca: { committed: 467, consumed: 318 },
    nova: { committed: 466, consumed: 303 },
  },
  momentumNote: '+11% vs Q1 2026',
};
