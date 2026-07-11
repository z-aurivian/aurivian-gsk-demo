# Aurivian Feature Request

> One filled-out copy of this document = one scoped change to the product. Hand this to the build team (or to Claude) and the request is unambiguous. The goal is not to write a novel — it's to force clarity before code moves.

---

## 0. Meta

- **Request title:** (short — e.g. "Add coverage scoring bar to Strategy-to-Action")
- **Requested by:** (name + role)
- **Date submitted:** YYYY-MM-DD
- **Priority:** Critical / High / Medium / Nice-to-have
- **Target surface(s):** (e.g. NOVA — Strategy-to-Action, Command Center, Auri sidebar)
- **Target demo(s):** All / Master template only / Specific demo(s): ___

---

## 1. What problem does this solve?

One paragraph, max. Describe the gap or friction *from the user's perspective* (the person demoing or the customer watching). Not "the component doesn't have X" — instead, "when the presenter walks through Strategy-to-Action, the customer can't see Y, which means Z doesn't land."

---

## 2. What does "done" look like?

Describe the desired end state in concrete, observable terms. If someone opened the demo after this ships, what would they *see* that they don't see today?

Bullet points preferred. Be specific:
- "The coverage bar shows Sufficient (green) / Low (amber) / Gap (red) per MO"
- NOT "improve the coverage visualization"

---

## 3. What should NOT change?

Equally important. List anything in the current experience that must be preserved. This prevents well-intentioned scope creep.

- (e.g. "The ISP pillars → MO → LP hierarchy stays as-is")
- (e.g. "Don't touch the Actions board layout")
- (e.g. "Auri sidebar behavior is unaffected")

---

## 4. Data requirements

Does this feature need new data, or does it use what already exists in `/src/config/`?

- **Existing config fields used:** (e.g. `COVERAGE_TARGETS`, `MEDICAL_OBJECTIVES`)
- **New config fields needed:** (describe shape — e.g. `coverageNote: string` per MO)
- **New data file(s) needed:** (if any — describe shape)
- **No data changes required:** (check if purely presentational)

---

## 5. Acceptance criteria

How do we know this is right? List 3–5 testable statements:

1. [ ] (e.g. "Coverage bar renders for all 4 MOs on the Strategy-to-Action page")
2. [ ] (e.g. "Colors match COVERAGE_STYLE: Sufficient=emerald, Low=amber, Gap=rose")
3. [ ] (e.g. "Build passes with CI=false on master template and at least one customer demo")
4. [ ] ...
5. [ ] ...

---

## 6. Design reference (optional)

Screenshots, sketches, Figma links, or a plain-English description of layout. Even a rough "I want it to look roughly like the Gap Radar cards but horizontal" is useful.

If no reference: say "builder's discretion within existing design language."

---

## 7. What this does NOT need

Explicitly list things someone might assume are in scope but aren't. This is the single most useful section for preventing wasted work.

- (e.g. "No mobile responsiveness needed — demo is always on a laptop")
- (e.g. "No animation — static render is fine")
- (e.g. "No backend/API integration — config-driven only")
- (e.g. "No new Auri prompts needed for this change")

---

## 8. Open questions

Anything unresolved that needs a decision before or during build. Flag who should answer.

- (e.g. "Should the coverage bar be clickable to drill into the LP list? — ask [name]")
- (e.g. "Do we show coverage on the Command Center too, or just Strategy-to-Action?")

---

## Conventions

- **Reference existing surfaces by name:** Command Center, ARIA, LUCA, NOVA, Strategy-to-Action, Insight Journey, Artifact Library, Auri sidebar.
- **Reference config files by path** when relevant: `src/config/strategy.js`, `src/config/insights.js`, etc.
- **One feature per request.** If you have three ideas, file three requests. Bundled requests get partially built and nobody's happy.
- **"Nice to have" is fine** — just put it in a clearly labeled section so the builder can cut scope if time is tight.
- **Tone**: write like you're briefing a colleague who's about to do the work, not like you're writing a Jira ticket into the void.
