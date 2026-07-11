# Session notes — 2026-05-09

## Goal
Vision-doc uplift of the master demo template, per Zeinab's mapping diagram and the Full Product Vision Document. Branch: `feature/vision-doc-uplift`.

## What landed

### IA shell + theme
- New top nav: **Command Center · ARIA · LUCA · NOVA · VEGA**
- New left rail (workspaces): Insight Journey · Artifacts · Auri Chat · Congress Capture
- Light/dark theme toggle (Sun/Moon in header, persists to `localStorage`)
- Color tokens refactored to CSS variables (`--auri-bg`, `--auri-blue`, etc.) so all `bg-auri-*`/`text-auri-*` utilities theme automatically. Aurivian dark palette applied (#111111 / #2D2C2C / #00A8FF / #FAFAFA).
- Hardcoded `bg-white`/`bg-gray-50/100`/`text-gray-400` swept across components.

### VEGA — new agent
- Registered in `config/agents.js` (4th agent — Strategic Analytics)
- Full surface (`components/Vega.js`) with three tabs:
  - **Field Engagement**: HCP awareness progression, interaction quality vs quantity, engagement gap tracker
  - **Scientific Alignment**: share of scientific voice, KOL sentiment velocity
  - **Impact & Outcomes**: MA Impact Index headline, care gap closure, ROMI
- Data in `config/vega.js` (8 must-have measures from Vision Doc §5)

### Command Center tile updates (per Zeinab's diagram)
- "New Signals" → **Predictive Signals** (Alexion-style: trajectory, time-to-impact, confidence; agent attribution preserved)
- "Strategic Coverage" → **KIT Metric · Insight-to-Impact** (top KITs by relevance, outcome volume retained, featured insight→action→outcome)
- New **Emerging Themes** tile paired with Gap Radar
- "Your Agents" grid expanded to 4 (added VEGA card)

### NOVA — three tabs
- **Strategy-to-Action** (existing, default tab — unchanged)
- **KIT Performance**: KIT scorecard, AI insight analysis (expandable per KIT), emerging themes table, KIT relevance trend (recharts line chart)
- **Insight Sources & Impact**: source value matrix (volume/quality/ROI per channel) + insight-to-impact lineage cards (insight→action→outcome)

### LUCA — Medical Messaging Alignment
- Added per-KOL alignment view in expanded row (4 messaging pillars with % bars)
- Deterministic per-KOL scores derived from tier + influence + id hash so all 18 KOLs have realistic data without hand-keying
- AI engagement recommendation tied to the largest gap pillar

### Export-to-PPT stubs
- Reusable `ExportPPTButton` component
- Lives in `AgentSurfaceHeader` (covers ARIA/LUCA/NOVA/VEGA automatically)
- Per-section buttons inside KIT Performance, Insight Sources, VEGA
- Top-of-page button on Command Center
- All show a placeholder alert; full `pptxgenjs` impl deferred

## New configs
- `predictive-signals.js` — momentum-style signals with agent attribution
- `kit-scorecards.js` — KIT scorecards (Alexion default fill)
- `emerging-themes.js`
- `insight-to-impact.js`
- `insight-sources.js` — source value matrix + KIT relevance trend
- `vega.js` — all VEGA measures
- `messaging-alignment.js` — pillars + deterministic alignment helper

## Other cleanup
- Removed untracked `Dashboard.js` (Dashboard retired per locked decisions)
- Old `signals.js` + `gap-radar.js` configs retained (still used by `InsightJourney.js`)

## Next up (Phase 2, 3 — only if Phase 1 ships clean)
- **Phase 2**: backport Alexion to refactored master template (same pattern as Otsuka conversion 2026-04-17)
- **Phase 3**: build Novartis demo from refreshed template — oncology (Kisqali/Pluvicto/Scemblix), ASCO/ESMO, Veeva CRM Medical_Insight integration. Meeting with Thiru Pattipaka 2026-05-11 8am EST.

## Known follow-ups
- Real PPT export via `pptxgenjs` (only buttons are stubs today)
- Agent accent colors (`bg-sky-50`, `bg-violet-50`, etc.) on `AgentSurfaceHeader` are still static Tailwind; OK on both themes but could be themed if dark-mode polish needed
- `signals.js` consumer in `InsightJourney.js` could migrate to `predictive-signals.js` for consistency

## Branch & deploy
- Branch: `feature/vision-doc-uplift`
- Commits: d60b757 (IA shell + theme + VEGA scaffold) → 67e46cd (CC tiles + VEGA full) → bf4d315 (NOVA tabs + LUCA alignment + PPT stubs) → 6a4b8b6 (theme-token sweep)
- Vercel preview should auto-build on push to this branch
