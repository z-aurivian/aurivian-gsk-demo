# Aurivian Demo Brief

> One filled-out copy of this document = one new customer demo. Hand this file to the build pipeline (or to Claude) and the `/src/config/` bundle is populated from it. The product experience (login → Command Center → ARIA / LUCA / NOVA / VEGA → Strategy-to-Action / KIT Performance / Insight Sources & Impact → Insight Journey → Artifacts → Auri chat) is fixed by the master template; this brief controls only the customer-specific surface.

---

## 0. Meta

- **Demo name (repo slug):** `aurivian-<customer>-demo`
- **Target meeting:** (customer, date, attendees of note)
- **Primary contact / persona the demo is built for:**
  - Name, title, background (one line — e.g. "Eric Krauter, ED US MSLs, ex-Otsuka Global Medical Strategy")
- **Referral / relationship context** (optional)

---

## 1. Customer

- **Company name:** `Dyne Therapeutics`
- **Logo URL or asset path:** (SVG preferred)
- **One-line company description** (for login screen + header)
- **Accent color override** (optional hex — defaults to Aurivian blue if omitted; Otsuka-palette surface is locked)
- **Cloud environment label** (for the "Deployed in your cloud" chip — e.g. `dyne-prod-aws`)

---

## 2. Portfolio

Each product gets its own card in the product switcher.

- **Products**
  - `id`, `name` (brand), `generic`, `indication`, `stage` (e.g. Phase 3 / Launched / Pre-launch)
  - Repeat per product
- **Platform / Mechanism lens** *(optional — use when the customer tracks a cross-indication platform, e.g. FORCE™)*
  - `name`, `description`, `applies_to_products: [ids]`
- **Competitive MoA lenses** *(optional, for ARIA tagging)*
  - e.g. `exon-skipping`, `gene therapy`, `oligo-delivery`

---

## 3. Therapeutic Area

- **TA:** (e.g. Neuromuscular / HIV / Oncology)
- **Sub-indications:** (e.g. DMD, DM1, Pompe, FSHD)
- **Key competitors:** name, company, MoA, competitive posture
- **Key congresses:** name, date, location, focus
- **Patient advocacy / society orgs to namecheck** (optional — e.g. PPMD, MDF, FSHD Society)

---

## 4. Strategic Framework (drives Strategy-to-Action / NOVA)

> If the customer hasn't shared their real ISP, construct a plausible one based on their pipeline and public posture. Eric-caliber MA leaders will recognize the structure.

### 4.1 Integrated Strategic Plan (ISP)
3–5 pillars covering the strategic horizon (2–3 yrs). One sentence each.

### 4.2 Plan of Action — Medical Objectives (POA)
Annual MOs that roll up to ISP pillars. Shape:
- `id` (MO1..MOn), `name`, `description`, `isp_pillar_ref`

### 4.3 Listening Priorities, KIQs, KITs
- `id` (LP1..LPn), `name`, `mo_ref`, `kiq` (key insight question), `kits` (list of key insight tools)

### 4.4 Coverage targets
How each MO/LP should feel scored at the moment of the demo (Sufficient / Low / Gap). Include intentional gaps to make the Gap Radar moment land.

---

## 5. Insights (NOVA's dataset)

5–8 actionable insights. Each:
- `id` (AI1..AIn)
- `title`
- `priority` (High / Medium / Low)
- `lp_refs`, `mo_refs`
- `recurrence` (integer)
- `recency` (YYYY-MM)
- `summary` (1–2 sentences)
- `source_insights[]` — each with:
  - `type` (MSL interaction / Ad board / Med Info query / Congress debrief / Social signal)
  - `location`, `role` (e.g. "ID specialist, London")
  - `quote` (verbatim-style)
  - `date`
- `status` (Captured / Triaged / Validated / Prioritised) — drives upstream insight board
- `confidence_score` (0–1, for Source Verifier display)

---

## 6. Proposed Actions (Strategy-to-Action board)

Actions grouped by MO. Each:
- `id`, `title`, `from_insight_ref`, `mo_ref`
- `owner` (optional), `due_by` (optional)
- `status` (Proposed / Started / Accepted / Declined)
- `strategy_impact` (Confirmed / Challenged / Changed / —)

Target: 6–10 actions spread across MOs, a few with status ≠ Proposed to show momentum.

---

## 7. KOLs (LUCA's dataset)

10–20 KOLs. Each:
- `id`, `name`, `institution`, `city`, `country`
- `sub_indications[]` (supports cross-indication tagging)
- `role` (PI / sub-I / Author / Speaker / Ad Board member)
- `sentiment` (Advocate / Neutral / Skeptic / Emerging)
- `sentiment_trend` (shifting toward / shifting away / stable) — optional, powers LUCA's "sentiment shift" moment
- `publications_recent` (count + 2–3 titles)
- `congress_speaking[]` (congress id refs)
- `recent_interactions[]` (brief)

Include a **cross-indication cluster** (e.g. KOLs touching both DM1 and Pompe) to power the signature LUCA query.

---

## 8. Congresses (ARIA's dataset)

2–4 congresses. Each:
- `id`, `name`, `date`, `location`
- `customer_presence[]` (abstracts, posters, symposia — title, type, session, presenter KOL ref)
- `competitor_presence[]` (same shape, flagged as competitor)
- `key_signals[]` (ARIA-surfaced observations — MoA, phase, endpoint tags)
- `aria_narrative` (1-paragraph synthesized debrief)

---

## 9. Gap Radar (proactive suggestions)

What the system *proposes back* to the user. 3–5 entries:
- `type` (New KIQ / New LP / New KIT)
- `suggestion`, `rationale`, `mo_ref`

---

## 10. Outcome Volume (RaaS header chip)

- `period` (e.g. "Q2 2026")
- `committed` (e.g. 1200)
- `consumed` (e.g. 847)
- `remaining` (derived)
- **Breakdown per agent**: ARIA / LUCA / NOVA consumed vs committed
- **Optional momentum note**: e.g. "+12% vs last quarter"

---

## 11. Predictive Signals (Command Center — always-listening feed)

4–8 momentum-style signals for the Command Center "Predictive Signals" tile and NOVA. Each:
- `agent` (ARIA / LUCA / NOVA / VEGA)
- `signal` — short headline
- `currentState` — 1–2 sentences on what's been observed
- `trajectory` (`rising` / `declining` / `flat`)
- `timeToImpact` (e.g. `0–3 months`, `3–6 months`)
- `confidence` (`high` / `medium` / `low`)
- `requiredAction` — what the team should do
- `suggestedAction` — `{ label, path }` deep link

> Note: a legacy `signals.js` config also feeds the Insight Journey kanban's Captured-lane "fresh signal" cards. Most demos reuse the predictive-signals data and let the journey cards be derivative.

---

## 12. Auri Chat (canned Q&A)

Pre-built prompt/response pairs for the Auri sidebar chat. 8–15 entries. Include:
- **Direct agent-invocation prompts** (pulled from the demo brief's agent sections — e.g. Dyne's "What did we learn about exon-skipping vs gene therapy at MDA and WMS?")
- **Synthesis prompts** that cross agents
- **Strategy-level prompts** (e.g. "Where are our biggest coverage gaps?")

Each entry:
- `prompt`, `response`, `cites[]` (insight / KOL / congress / action refs for show-your-work)

---

## 13. Demo script (optional but recommended)

A 10–15 minute guided path: which surface to open, which prompt to type, which artifact to download. Ensures the narrative lands even if the attendee drives.

---

## 14. Anything else

Free-form section for customer-specific things that don't fit the schema. Platform lens hooks, special sentiment moments, inside jokes, brand nuance.

---

## 15. KIT Performance (NOVA — KIT Performance tab)

Three datasets feed NOVA's KIT Performance surface and Command Center's "KIT Metrics" tile:

### 15.1 KIT Scorecards
4–6 KITs. Each:
- `id`, `name`
- `currentMentions`, `priorMentions`, `percentChange`
- `currentSentiment` (0–1), `priorSentiment`, `sentimentShift`
- `relevanceScore` (0–100)
- `status` (`Active` / `Monitor` / `Alert` / `Declining`)
- `aiSummaryCurrent` — 2–3 sentences synthesizing this month's signal
- `aiSummaryPrior` — 2–3 sentences for comparison

### 15.2 Emerging Themes
3–5 themes detected as growing in volume across MSL / ad-board / congress sources. Each:
- `id`, `theme`
- `growthRate` (% growth this period)
- `firstDetected` (`YYYY-MM-DD`)
- `relatedKIT` — name reference back to a KIT scorecard
- `description` — 1–2 sentences

### 15.3 Insight-to-Impact Tracking
3–5 insight → action → outcome lineage entries. Each:
- `id`
- `insight` — what was heard
- `action` — what the team did
- `outcome` — measurable result
- `timeframe` (e.g. `6 weeks`)
- `impactScore` (1–10)
- `relatedInsight` (AI ref), `relatedMO` (MO ref)

---

## 16. Insight Sources (NOVA — Insight Sources & Impact tab)

5–7 channels with the value matrix shape:
- `id`, `source` (e.g. `MSL Field Reports`, `Advisory Boards`, `Congress Feedback`, `Med Info Inquiries`, `Social Listening`)
- `volume` — count this period
- `qualityScore` (0–100)
- `leadsToActionPct` (0–100)
- `costPerInsight` (number, demo currency-agnostic)
- `roiScore` (0–10)

---

## 17. Messaging Alignment Pillars (LUCA)

The medical-messaging pillars the brand is trying to move HCPs toward. 3–5 pillars. Each:
- `id`, `name` (full pillar name), `short` (≤ 4 words for the bar label)

Per-KOL alignment percentages are derived deterministically from KOL tier + influence + a stable id-hash offset. Override by writing a per-KOL `messagingAlignment` map only when a customer has supplied real numbers.

---

## 18. VEGA — Strategic Analytics

VEGA's three tabs (Field Engagement · Scientific Alignment · Impact & Outcomes) are populated from one config bundle (`vega.js`) covering the must-have measures from the Aurivian Vision Doc. Per demo, fill or override:

- **Awareness Progression** — stage / hcps / pctTotal / vsQ4 + benchmark narrative
- **Interaction Quality** — MSL × region rows (interactions, vs-target, quality, insight-rate, overall verdict) + AI insight
- **Engagement Gaps** — Tier 1/2 KOLs not contacted within window
- **Share of Scientific Voice** — vs 3 named competitors across abstracts / publications / endorsements / citation index / social
- **KOL Sentiment Velocity** — score · 30d change · velocity arrow · interpretation
- **Care Gap Closure** — care gap / linked MO / baseline / current / patients impacted
- **ROMI** — net value, ROI %, return per £1, plus 4 value-category rows
- **MA Impact Index** — overall composite (0–100), vs Q4, target, plus 5 dimension rows

If the customer has shared real data, replace the Alexion default fill row by row. Otherwise the Alexion baseline is acceptable for first-pass demos.

---

## Conventions

- **Reference keys** across sections (e.g. `lp_ref: "LP2"`, `mo_ref: "MO1"`) must resolve to the ids defined above. The build will fail loud on broken refs.
- **Dates** as `YYYY-MM-DD` or `YYYY-MM`.
- **Synthetic data is fine and expected.** Keep it plausible — real congress names, real KOL institutions, real trial names when public. Invented quotes are clearly invented-but-plausible.
- **Tone**: every piece of copy should read like it came from inside an MA team, not from a software marketing deck.

---

## What the template does with this brief

| Brief section | Surface(s) it populates |
|---|---|
| 1 Customer | Login screen, header, sovereign-cloud chip |
| 2 Portfolio | Product switcher, ARIA/LUCA/NOVA scope |
| 3 TA | ARIA/LUCA scope, competitive tagging |
| 4 Strategic Framework | Strategy-to-Action spine, left-nav, coverage scoring |
| 5 Insights | NOVA insights board, provenance traces |
| 6 Actions | Strategy-to-Action Actions board (kanban-feel) |
| 7 KOLs | LUCA surface, cross-indication cluster |
| 8 Congresses | ARIA surface, debrief artifacts |
| 9 Gap Radar | Command center proactive feed |
| 10 Outcome Volume | Persistent RaaS header chip |
| 11 Predictive Signals | Command Center Predictive Signals tile |
| 12 Auri Chat | Auri sidebar responses |
| 13 Demo script | README / speaker notes |
| 15 KIT Performance | NOVA KIT Performance tab + CC KIT Metrics tile |
| 16 Insight Sources | NOVA Insight Sources & Impact tab |
| 17 Messaging Pillars | LUCA per-KOL Medical Messaging Alignment |
| 18 VEGA Analytics | VEGA agent surface (all three tabs) |
