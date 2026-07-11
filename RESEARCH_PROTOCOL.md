# Gap-Filling Research Protocol

When a demo brief comes back incomplete (most will), the build side is responsible for filling the gaps with research rather than bouncing the brief back to product. This document defines **where to look**, **what's authoritative**, and **how to mark what was researched vs. invented** so the demo still feels credible and Auri can ground its answers.

---

## Source hierarchy (most → least authoritative)

Always prefer higher tiers. Drop to synthetic only when nothing public exists.

### Tier 1 — Authoritative public sources (cite in the config)
- **Company investor / corporate site** — pipeline, platform description, indications, phase, trial names
  - IR pages, 10-K / annual report, corporate deck PDFs
- **ClinicalTrials.gov (v2 API)** — trial IDs, phase, status, PI, sites, endpoints, enrollment
- **PubMed E-utilities** — publications, RWE, author/KOL publication counts
- **FDA / EMA** — labels, approvals, advisory committee docs (for approved products)
- **Congress sites** — MDA, WMS, ASCO, ESMO, ASH, AACR, CROI, EASD, APA etc. for abstracts, session lists, presenters
- **Patient advocacy orgs** — PPMD, MDF, FSHD Society, CureDM, etc. for disease context and stakeholder landscape

### Tier 2 — Semi-authoritative
- **Press releases / news** (Fierce Biotech, Endpoints, BioSpace) for recent data readouts, trial updates
- **Linked KOL profiles** (institutional pages, Google Scholar, ORCID) for publication counts, affiliations
- **Competitor corporate sites** for competitive MoA/phase framing

### Tier 3 — Plausibly synthesized
Everything that doesn't exist publicly or would be confidential in a real deployment. Must be **plausible and internally consistent** with Tier 1 facts.
- MSL field-note quotes
- Ad board member sentiments
- Med Info query volumes
- Sentiment scores, sentiment trend shifts
- Specific coverage scores and recurrence counts
- KOL interaction histories
- Proprietary RWE summaries

---

## What's authoritative per brief slot

| Brief slot | Primary source | Fallback |
|---|---|---|
| 1 Customer basics | Corporate site, Wikipedia, LinkedIn | — |
| 2 Products / pipeline / phase | Corporate pipeline page, ClinicalTrials.gov | Press releases |
| 2 Platform / mechanism | Corporate platform page, published reviews | Plausible synthesis |
| 3 TA / sub-indications | Corporate, disease orgs | Medical textbooks |
| 3 Competitors | Competitor corporate sites, Evaluate/GlobalData | Press |
| 3 Congresses | Congress websites, prior-year abstract books | — |
| 4 ISP / POA / MOs / LPs | **Almost always synthesized** — rarely published | Build from pipeline + TA logic |
| 5 Insights (titles + priority + recency) | Synthesized, anchored to real KIQs | — |
| 5 Source-insight quotes | Synthesized — clearly invented but plausible | — |
| 6 Actions | Synthesized | — |
| 7 KOLs (identity, institution, pubs) | PubMed, institutional pages, congress programs | — |
| 7 KOL sentiment + trend | Synthesized | Social listening as signal only |
| 8 Congress abstracts (customer) | Congress site abstract search, corporate IR | Inferred from announced presentations |
| 8 Congress abstracts (competitor) | Congress site | Corporate site for competitors |
| 9 Gap Radar suggestions | Synthesized, grounded in coverage logic | — |
| 10 Outcome Volume | Synthesized | — |
| 11 Background signals | Synthesized | Real press releases can anchor headlines |
| 12 Auri chat Q&A | Synthesized, must cite populated config objects | — |

---

## Research workflow when a brief arrives incomplete

1. **Read the brief end-to-end.** Note which slots are populated vs. empty vs. thin.
2. **Fill Tier 1 first.** Pipeline, trials, congresses, KOLs from public sources. Cite source URLs inline in the config as `source:` fields where space allows, so Auri can reference them.
3. **Construct the strategic spine.** ISP → POA → LPs is almost always synthesized. Build it from:
   - Stage of each product (Phase 1 vs launched → different MO mix)
   - Competitive posture (me-too vs first-in-class → different LPs)
   - Public KOL debates in the TA (the real controversies become LP themes)
4. **Populate insights anchored to real KIQs.** Each insight should resolve a question a working MA team would actually have. Source quotes invented but specific: named city, plausible role, realistic clinical concern.
5. **Populate KOLs.** Pull 10–20 from congress programs + PubMed. Real names, real institutions. Sentiment/trend is synthesized.
6. **Populate congresses.** Real abstract titles where you can find them; otherwise infer from announced presentations / corporate IR decks.
7. **Generate Auri Q&A last** — after the rest of the config is locked, so every canned response can cite a real object in the bundle.

---

## Labeling convention — distinguish real from synthesized

In the config, every non-trivial record carries a `provenance` field:

```js
{
  id: "AI2",
  title: "RWE data gap — women & elderly subgroups",
  provenance: "synthesized",   // or "public:clinicaltrials.gov/NCT0xxx"
                               // or "public:pubmed:PMID12345"
  ...
}
```

- **`public:<source>`** — record is grounded in an authoritative source; include a URL or identifier.
- **`synthesized`** — invented for the demo, plausible-but-not-real.
- **`synthesized-from-public`** — structure/quote is invented but anchored in a real trial, paper, or congress session (e.g. a fictional MSL quote about a real trial).

This serves three purposes:
1. **Auditability** — if an attendee asks "is this real?" we can answer truthfully per record.
2. **Auri RAG grounding** — the chatbot can say "based on your field data" vs "based on public trial registry."
3. **Future hardening** — if a demo becomes a pilot, we know exactly which records need to be replaced with real customer data.

---

## What product owes us vs. what we fill

**Product must provide:**
- Customer name + meeting context + primary persona
- Target agent emphasis (ARIA-heavy? LUCA-heavy? Balanced?)
- Any known inside info about the persona (e.g. "Eric is ex-Otsuka Global Medical Strategy" → use Gilead-style Strategy-to-Action layout he'll recognize)
- Any hard constraints ("don't mention competitor X", "lead with platform not product")

**We fill:**
- Everything else, using the source hierarchy above.

**Product nice-to-have:**
- Their ISP / POA if the customer has shared it (rare)
- Known KOL preferences
- Known pain points in current MA ops

---

## Red flags that require escalation to product

Do **not** fill these silently — ask:

- Customer is pre-clinical with no public pipeline → what do we anchor on?
- Customer is in a TA where we have no prior demo as precedent
- The target persona is non-MA (Commercial, R&D) → agent emphasis shifts substantially
- The brief includes specific competitive claims we can't source → we don't make these up

---

## Running list of reusable research assets

As we build more demos, accumulate:

- **Congress calendar** (per TA): `src/research/congresses-{TA}.json`
- **KOL seeds** (per TA): `src/research/kols-{TA}.json` — names + institutions harvested from congress programs, re-usable
- **Competitive landscape** (per TA): `src/research/competitors-{TA}.json`

These are checked into the master template, not per-demo, and grow over time. New demos in the same TA inherit them as starting points.
