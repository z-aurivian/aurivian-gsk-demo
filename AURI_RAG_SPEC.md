# Auri Chatbot — RAG Spec

> Auri is the *chatbot* surface. Not the agents. Auri sits in the sidebar / overlay on every screen and answers free-form questions by grounding on the demo's populated config bundle. When the config is thin, Auri has to work harder — but should still feel impressive, never evasive.

---

## Core principle

**Auri never hallucinates.** If a question can't be answered from the config + allowed public knowledge, Auri says so and offers the nearest thing it *can* answer. This matches the Position Doc's "auditable, traceable, hallucination-free" constraint.

---

## Retrieval corpus (in priority order)

1. **Customer config bundle** — `/src/config/*.js` — insights, actions, KOLs, congresses, strategy spine, outcome volume, gap radar, signals. This is the *customer's intelligence layer* in demo form. Grounded answers here feel like Auri "knows the org."
2. **Provenance-tagged public records** — anything with `provenance: "public:..."` can be cited with its source URL/ID.
3. **LLM world knowledge** — fall-back only, and Auri must signal when it's drawing from this vs. from the customer's data.

---

## Answer pattern

Every Auri response follows this shape (enforced by the system prompt):

```
[One-line direct answer]

[1–3 grounding bullets, each citing a config object or public source]

[Optional: suggested next action — "Would you like me to direct NOVA to build a full Strategy-to-Action report on this?"]
```

Every grounding bullet renders with a **provenance chip**:
- `[Insight AI2]` — clickable, opens the insight
- `[KOL: Dr. X]` — clickable, opens the KOL profile
- `[Congress: MDA 2026]` — clickable, opens the congress view
- `[Public: ClinicalTrials.gov NCT0xxx]` — external link
- `[Synthesized]` — labeled honestly when the answer draws on `provenance: "synthesized"` records

---

## Three tiers of response quality

### Tier A — Config has a direct answer
Example: *"What are the top insights on TAF safety?"* → retrieves AI1, cites source quotes verbatim. Feels like magic.

### Tier B — Config has adjacent data; Auri synthesizes
Example: *"Who should we engage for the BHIVA guideline push?"* → cross-references LP3 + KOLs tagged with guideline roles + recent actions referencing BHIVA. Auri composes the answer from multiple config objects.

### Tier C — Config is thin; Auri answers with public knowledge + signals the gap
Example: *"What's the latest on competitor X's Phase 3 readout?"* → if not in config, Auri answers from public knowledge AND suggests "This isn't yet tracked in your Intelligence Layer — would you like me to add competitor X to ARIA's watchlist?" That turns a gap into a product moment.

**Never return "I don't have that information."** Always return either an answer, a proximate answer, or a productized gap-closure suggestion.

---

## Prompting strategy

System prompt template (per demo — generated from config):

```
You are Auri, the chatbot surface of Aurivian.

You are deployed inside {customer.name}'s environment.
You operate across three named agents: ARIA (congress), LUCA (KOL), NOVA (medical insights + strategy-to-action).

Your grounding is:
- Strategic framework: {ISP pillars}, {MOs}, {LPs}, {KIQs}
- {N} actionable insights (IDs AI1..AIn)
- {N} KOLs across {sub-indications}
- {N} congresses on the roster
- Outcome volume: {consumed}/{committed} for {period}

When answering:
1. Always ground in the provided config bundle first.
2. Cite every grounding bullet with an ID or public source.
3. If the answer requires data outside the config, say so and offer to direct the relevant agent.
4. Never fabricate insights, KOL quotes, or trial data.
5. Match the tone of a senior MA colleague: concise, clinically literate, no marketing language.
```

---

## Concrete RAG implementation (lightweight, for demo)

Given demos are React + CRA + browser-side LLM calls with `REACT_APP_ANTHROPIC_KEY`:

- **No vector DB.** The config is small (a few hundred KB). We include the entire retrieval corpus in the system prompt on every request.
- **Structured context injection.** Before each call, concat:
  - Condensed strategy spine (ISP/POA/LPs as bullet list)
  - All insight summaries + IDs
  - KOL name + sub-indication + sentiment tags
  - Congress names + dates
  - Outcome volume snapshot
- **Response schema enforced.** We ask for JSON: `{answer, citations: [{type, id, label}], suggested_next?}` → client renders the provenance chips from citations.
- **Fallback chain** (from existing pattern): Claude → OpenAI → keyword-match against config. Keyword fallback returns the closest config object with a canned "Here's what I found in your intelligence layer" wrapper — still feels grounded even without API keys.

---

## Canned Q&A as the safety net

Section 12 of the demo brief (Auri Chat) defines canned prompt/response pairs. These serve two purposes:

1. **Demo script reliability** — if live LLM fails, the canned answer plays.
2. **Prompt suggestions** — the chat UI surfaces 3–5 of these as clickable prompts so the demo driver can always steer to a known-good moment.

Canned responses are written against the **same schema** as live responses (answer + citations) so the UX is identical.

---

## What makes Auri impressive on a thin brief

Even with sparse config, these moves punch above the data:

- **Cite specifics.** "Based on AI2 (RWE data gap, recurrence 2x, last captured March 2025)..." — specificity reads as depth.
- **Cross-reference.** Chain two config objects: an insight + a KOL + a congress. Three citations feels like a system, not a lookup.
- **Suggest next action.** Every response ends with a directive the user can click — makes Auri feel agentic, not reactive.
- **Name the named agents.** "LUCA flagged this sentiment shift in March..." — keeps ARIA/LUCA/NOVA present even when the user is talking to Auri.
- **Surface the Intelligence Layer.** "Your org has directed NOVA 47 times on this LP — here's the compound view..." — even if the number is synthesized, it makes the moat visible.

---

## Minimum viable Auri for a new demo

If we have less than 24 hours to ship, Auri still works with:
- 8–12 canned Q&A pairs (covers the demo script)
- System prompt with condensed strategy spine
- Live LLM call with config bundle in context
- Keyword fallback for offline resilience

That's enough to feel impressive in a 30-minute demo meeting.
