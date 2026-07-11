// Named agent roster — ARIA / LUCA / NOVA / VEGA.
// Tagline and role copy come straight from the Aurivian Position Document.
// Users direct these agents by name; the underlying sub-agents (Insight
// Analyst, Source Verifier, Report Builder, etc.) are orchestration detail
// and not user-facing.

export const AGENTS = {
  aria: {
    id: 'aria',
    name: 'ARIA',
    role: 'Congress Intelligence',
    tagline: 'Attends. Records. Interprets. Advises.',
    description:
      "Extends the reach of the Medical Affairs professional into every room of a congress simultaneously. Synthesizes across presentations, posters, discussions, and competing interpretations.",
    path: '/congress',
  },
  luca: {
    id: 'luca',
    name: 'LUCA',
    role: 'KOL Intelligence',
    tagline: 'Knows who matters. Knows what they think.',
    description:
      "Amplifies the relationship intelligence of the professionals who live and work within the scientific community. Continuously maps emerging voices, tracks sentiment changes, and flags influential shifts.",
    path: '/kol',
  },
  nova: {
    id: 'nova',
    name: 'NOVA',
    role: 'Medical Insights',
    tagline: 'Transforms fragmented science into decisions.',
    description:
      "Extends the analytical capacity of the professionals who need to make sense of an overwhelming volume of biomedical literature, field data, and emerging evidence. Produces the Strategy-to-Action artifact.",
    path: '/insights',
  },
  vega: {
    id: 'vega',
    name: 'VEGA',
    role: 'Strategic Analytics',
    tagline: 'Visualizes. Evaluates. Grounds. Analyzes.',
    description:
      "Extends Medical Affairs leadership's view from activity tracking to strategic decision support — quantifying field engagement effectiveness, scientific alignment, strategy drift and impact across the medical mission.",
    path: '/vega',
  },
};

export const AGENT_LIST = Object.values(AGENTS);
