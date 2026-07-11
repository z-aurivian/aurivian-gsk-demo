# Aurivian Master Demo Template

The shell of every Aurivian customer demo. The **code** is locked (the product surface: login, Command Center, ARIA / LUCA / NOVA / VEGA, Strategy-to-Action, KIT Performance, Insight Sources & Impact, Insight Journey, Artifact Library, Auri chat). The **data + branding** lives entirely in `src/config/`. One filled-out Demo Brief = one new customer demo.

**Information architecture:** top header carries only Command Center + product/congress selectors + theme toggle. A left rail exposes the four named agents (ARIA / LUCA / NOVA / VEGA) and four workspaces (Insight Journey · Artifacts · Auri Chat · Congress Capture). Auri lives as a floating right-side pill on every authenticated screen.

---

## The loop

```
        Demo Brief                 src/config/*                  Deployed demo
 (DEMO_BRIEF_TEMPLATE.md)  ──▶  (customer-specific data)  ──▶  (Vercel + GitHub)
```

1. **Product writes a Demo Brief** in the format of [`DEMO_BRIEF_TEMPLATE.md`](./DEMO_BRIEF_TEMPLATE.md).
2. **Gaps are filled via research** per [`RESEARCH_PROTOCOL.md`](./RESEARCH_PROTOCOL.md) (public sources → semi-authoritative → plausibly synthesized, always labeled with `provenance`).
3. **Clone this repo** → rename → populate `src/config/*` → push → Vercel auto-deploys.

See [`AURI_RAG_SPEC.md`](./AURI_RAG_SPEC.md) for how the Auri chatbot grounds its answers on the populated config bundle.

---

## Repo layout

```
src/
├── App.js                       ← Router, auth gate, Shell (header + chips + Auri sidebar)
│
├── components/                  ← LOCKED. The Aurivian product surface.
│   ├── Login.js
│   ├── CommandCenter.js         ← Hub: directive input, agent grid, 4 collapsible tiles
│   │                               (Predictive Signals · KIT Metrics · Gap Radar · Emerging Themes)
│   ├── AgentSurfaceHeader.js    ← Shared banner on ARIA / LUCA / NOVA / VEGA
│   ├── CongressIngestion.js     ← ARIA (sky)
│   ├── KOLManagement.js         ← LUCA (violet) — incl. per-KOL Medical Messaging Alignment
│   ├── MedicalInsights.js       ← NOVA (emerald) — 3 tabs:
│   │                               Strategy-to-Action · KIT Performance · Insight Sources & Impact
│   ├── StrategyToAction.js      ← ISP → POA → LPs → Insights → Actions → Gap Radar
│   ├── KITPerformance.js        ← KIT scorecard, AI insight analysis, emerging themes
│   ├── InsightSources.js        ← Insight source value matrix + insight-to-impact lineage
│   ├── Vega.js                  ← VEGA (amber) — extended analytics, 3 tabs
│   ├── InsightJourney.js        ← Kanban — pinnable from NOVA's "Add to Insight Journey"
│   ├── ArtifactLibrary.js
│   ├── ExportPPTButton.js       ← Reusable Export-to-PPT stub (full impl deferred)
│   ├── AuriChatPanel.js         ← Reusable chat surface
│   ├── AuriSidebar.js           ← Floating Auri on every screen
│   └── AuriChat.js              ← /auri full-page route (uses the panel)
│
├── lib/
│   └── journeyStore.js          ← localStorage + custom-event store for the
│                                   "pin insight to journey" flow
│
├── config/                      ← PER-DEMO. Everything customer-specific.
│   ├── index.js                 ← Canonical import surface (barrel)
│   ├── customer.js              ← Brief §1
│   ├── products.js              ← Brief §2 (+ optional PLATFORM_LENS)
│   ├── therapeutic-area.js      ← Brief §3
│   ├── congresses.js            ← Brief §3 / §8
│   ├── strategy.js              ← Brief §4 (ISP / MOs / LPs / KIQs / KITs)
│   ├── insights.js              ← Brief §5
│   ├── actions.js               ← Brief §6
│   ├── kols.js                  ← Brief §7
│   ├── gap-radar.js             ← Brief §9
│   ├── outcome-volume.js        ← Brief §10
│   ├── signals.js               ← Brief §11 (legacy — Insight Journey signal cards)
│   ├── predictive-signals.js    ← Brief §11 (Command Center + NOVA — momentum-style)
│   ├── kit-scorecards.js        ← Brief §15 (NOVA KIT Performance)
│   ├── emerging-themes.js       ← Brief §15
│   ├── insight-to-impact.js     ← Brief §15 (Insight → Action → Outcome lineage)
│   ├── insight-sources.js       ← Brief §16 (Insight Source Value Matrix)
│   ├── messaging-alignment.js   ← Brief §17 (LUCA messaging pillar alignment)
│   ├── vega.js                  ← Brief §18 (VEGA extended analytics)
│   ├── auri-prompts.js          ← Brief §12
│   ├── artifacts.js             ← Artifact Library seed
│   ├── agents.js                ← Named agents (ARIA / LUCA / NOVA / VEGA) — usually unchanged
│   ├── system-prompt.js         ← Auri system prompt scaffolding
│   └── clientConfig.js          ← Back-compat shim (do not extend)
│
├── api/                         ← LOCKED. Claude → OpenAI → keyword fallback.
│   ├── claudeApi.js             ← Uses claude-sonnet-4-6
│   ├── openaiApi.js
│   ├── auriApi.js               ← Entry point: queryAuri(messages, productId)
│   ├── promptBuilder.js
│   └── rag.js
│
└── data/                        ← Legacy Alexion analytics data. Reshaped per demo
                                   when the relevant surface is built out.
```

---

## Building a new demo

```bash
# 1. Clone + rename
gh repo create z-aurivian/aurivian-<customer>-demo --template z-aurivian/aurivian-master-demo --private
cd aurivian-<customer>-demo

# 2. Fill out every file in src/config/ from the customer's Demo Brief
#    Reference: DEMO_BRIEF_TEMPLATE.md §1–§14

# 3. Point Vercel at the new repo; add env vars
#    REACT_APP_ANTHROPIC_API_KEY   (Claude Sonnet 4.6 by default)
#    REACT_APP_OPENAI_API_KEY      (optional fallback)

# 4. Commit + push; Vercel auto-deploys
```

---

## Local development

```bash
npm install
npm start       # http://localhost:3000
```

Build-time env:
- `REACT_APP_ANTHROPIC_API_KEY` — enables Auri live mode
- `REACT_APP_OPENAI_API_KEY` — optional fallback
- Without either, Auri still functions via the canned Q&A fast-path + keyword matching against the config bundle.

The `build` script sets `CI=false` so warnings don't fail the Vercel build.

---

## Conventions that matter

- **Id-reference discipline.** Objects carry ids (`MO1`, `LP2`, `AI3`, `A5`). Other objects reference them by id. A broken ref is visible everywhere and easy to spot during review.
- **Provenance is first-class.** Every synthesized record carries `provenance: 'synthesized'` (or `public:<source>`). Auri cites honestly.
- **Auri never hallucinates.** Exact prompt matches use canned responses from `config/auri-prompts.js`. Fall-through goes to the Claude/OpenAI chain with the config bundle in the system prompt. Unknown territory gets surfaced as a product moment, not a fabricated answer.
- **Aurivian is the brand, not the customer.** The customer's accent color + logo are optional overrides; the Aurivian wordmark, Michroma logo font, and Otsuka-baseline light palette stay.
- **No admin UI, no module tiers.** The Position Document's "What Aurivian Is Not" constraints are structural. Anything that looks like SaaS configuration undercuts the story.

---

## Companion docs

- [`DEMO_BRIEF_TEMPLATE.md`](./DEMO_BRIEF_TEMPLATE.md) — the input schema
- [`RESEARCH_PROTOCOL.md`](./RESEARCH_PROTOCOL.md) — how to fill gaps when a brief comes in thin
- [`AURI_RAG_SPEC.md`](./AURI_RAG_SPEC.md) — the Auri chatbot grounding spec

---

## Known follow-ups

Tracked deferrals — tackle when prioritized.

- **Full UI product awareness.** The product selector in the header currently scopes only Auri's RAG context (rag.js reads product-keyed `KIT_SCORECARDS`, `COMPETITOR_DATA`, PubMed/trial corpora from `src/data/*`). The dashboard surfaces — Command Center tiles, NOVA tabs, VEGA, ARIA, Insight Journey — read flat config arrays so they don't change when the product is toggled. The current UI is honest about this (selector sub-label reads "Auri scope · {generic}", and the Auri panel shows a "Scope: {product}" chip). Resolution: convert the relevant configs (`config/kit-scorecards.js`, `config/emerging-themes.js`, `config/predictive-signals.js`, `config/insight-to-impact.js`, `config/insights.js`, etc.) from flat arrays to product-keyed maps, thread `selectedProduct` through the surfaces that consume them, and remove the "scope" framing once the dashboard genuinely re-filters. Touches every customer demo that uses a multi-product portfolio.
- **Real Export-to-PowerPoint.** Today's `ExportPPTButton` is a visual stub that fires an alert. Wire `pptxgenjs` (or the equivalent) once a customer asks for it — render each surface's data into a formatted slide with brand palette + AI narrative.
- **Legacy `signals.js` consumer.** `InsightJourney.js` still reads the older flat `SIGNALS` array for Captured-lane "fresh signal" cards. The richer `predictive-signals.js` could subsume it; keeping for now to avoid disturbing demos that haven't repopulated the signals.
