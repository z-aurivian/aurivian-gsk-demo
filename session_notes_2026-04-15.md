# Aurivian Master Demo — Session Notes 2026-04-15

## What this repo is now

A **config-driven template** for every Aurivian customer demo. Code is locked; `src/config/*` is the per-demo fill. One filled-out `DEMO_BRIEF_TEMPLATE.md` = one customer demo.

## Work done this session

Refactored from a fixed Alexion-flavored demo into a reusable template. Nine incremental commits on `template-refactor` branch, fast-forward merged to `master`. Then two follow-ups from Dyne work:

- **Step 1** `6e2c2d8` — auth gate, Command Center, Otsuka palette, Claude Sonnet 4.6
- **Step 2** `f8bea78` — split `clientConfig.js` + `data/*` into the `/config/` bundle
- **Step 3** `fa34226` — Command Center hub (signals, coverage, Gap Radar)
- **Step 4** `d420a97` — agent surface shells (ARIA / LUCA / NOVA banners) + expandable scientific themes
- **Step 5** `b1a2217` — Strategy-to-Action artifact inside NOVA
- **Step 7** `59d30d1` — persistent Auri sidebar + citation chips
- **Step 8** `6f6e783` — Artifact Library
- **Step 9** `109ff4c` — finalize (README, ESLint fix, Sonnet 4.6)
- `be9641b` — NOVA collapses to Strategy-to-Action only (legacy Alexion tabs retired)
- `70b3c66` — Insight Journey board + Command Center density trim + Dashboard retired

## Key architectural decisions

- **Named agents are visible; sub-agents are infrastructure.** ARIA/LUCA/NOVA are what users direct; the Auri Canvas PRD's Insight Analyst / Source Verifier / Report Builder are orchestration details exposed only in provenance traces.
- **Reference-key discipline.** Ids (`MO1`, `LP2`, `AI3`, `A5`) are the spine. Auri citations resolve to these ids.
- **Provenance is first-class.** `provenance: 'public:<source>' | 'synthesized' | 'synthesized-from-public'` — drives honest Auri citations.
- **Inverted re-export direction**: `config/kols.js` is the authoritative source; `data/demoData.js` re-exports from config. New demos should follow this pattern for all config-owned data.
- **NOVA = Strategy-to-Action, full stop.** The legacy KIT / Field Intelligence / Competitive / Predictive / ROI tabs predated the agent-centric pitch and were retired. MedicalInsights.js is a thin wrapper: `AgentSurfaceHeader + StrategyToAction`.
- **Dashboard retired entirely.** Contradicted the Position Document's "not another dashboard" framing; duplicated ARIA and LUCA content.

## Companion docs

- `DEMO_BRIEF_TEMPLATE.md` — input schema (14 sections)
- `RESEARCH_PROTOCOL.md` — gap-filling when briefs come in thin
- `AURI_RAG_SPEC.md` — chatbot grounding rules
- `README.md` — loop overview + build/deploy

## Known follow-ups (not blockers)

- **Legacy `src/data/` files** (pubmedData, clinicalTrialsData, strategicContent, much of demoData) still contain Alexion content, referenced by `api/auriApi.js` for chat grounding. Dead-code sweep when we reshape the Auri RAG pipeline. Low priority.
- **Otsuka parity backlog** (from step 4 commit message): `selectedProduct` threading into CongressIngestion; per-product totals on MOCK_TRIALS / MOCK_SOCIAL; per-congress theme `summary`/`action` enrichment in INGESTION_BY_CONGRESS. Deferred to the ARIA data reshape.
- **ESLint**: reinstalling the lockfile (`rm -rf node_modules package-lock.json && npm install`) resolved the transitive dep issue. Build no longer needs `DISABLE_ESLINT_PLUGIN=true`.

## How to use this template

1. `gh repo create z-aurivian/aurivian-<customer>-demo --template z-aurivian/aurivian-master-demo --private`
2. Fill `src/config/*` from the customer's Demo Brief
3. Hook up Vercel, add `REACT_APP_ANTHROPIC_API_KEY`
4. Commit, push, deploy

The Dyne demo (`z-aurivian/aurivian-dyne-demo`) is the first customer built from this template.
