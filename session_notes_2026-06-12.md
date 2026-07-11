# Session Notes — 2026-06-12

## Objective
Multi-demo update sweep: migrate all demos to Monochrome v1 branding via wholesale master template component copy, wire Pulse Brief button to every left rail, and fix Listen buttons on all Pulse Briefs. Also replace incorrect audio files on Novartis and Roche.

---

## Demos Updated

### Terumo Europe (`aurivian-terumo-europe-demo`)
- Already on correct branding from prior session
- Added `PULSE_BRIEF_URL` to `customer.js` and `config/index.js`
- Added Pulse Brief button to `App.js` left rail
- Added Listen button + `openAudio()` to `public/pulse_terumo_brief.html`
- Committed `2fd29f1`

### Novartis (`aurivian-novartis-demo`)
- Replaced all 17 components + `App.js` + `App.css` with master template wholesale
- Fixed `tailwind.config.js` — was missing all `s-*` semantic tokens and `manrope`/`plex-mono` font families (root cause of old branding persisting)
- Fixed `CAPTURE_APP_URL` from dead generic URL to `null`
- Added `PULSE_BRIEF_URL`, wired button into left rail
- Fixed Pulse Brief audio bar: `position: sticky` → `position: fixed`, added Listen button + `openAudio()`
- Replaced audio file: old file had Terumo content. Wrote Novartis-specific script (DESTINY-Breast06 / Pluvicto access / Scemblix STAMP / payer layer). New file: `pulse_brief_novartis_audio.mp3`
- Updated HTML src reference to match new filename, removed old `pulse_brief_novartis.mp3`
- Committed `74dbce7`, `da426b6`, `d64b516` — **Vercel webhook broken on Novartis; requires manual SHA paste in Vercel dashboard**

### argenx (`aurivian-argenx-demo`)
- Replaced all 17 components + `App.js` + `App.css` with master template wholesale
- Fixed lowercase brand name: `argenx` → `.charAt(0).toUpperCase() + .slice(1)` in `Login.js`, `CommandCenter.js`, `AuriChatPanel.js`
- Added `PULSE_BRIEF_URL`, wired button into left rail
- Committed `72d657c` — Vercel auto-deployed

### Otsuka (`aurivian-otsuka-demo`)
- Replaced all components with master template — initially caused Vercel build failure
- **Build failure root cause**: master template had grown 7 new config files and `src/lib/journeyStore.js` that weren't present in older demos. `cp *.js` only grabbed component files.
- Fix: copied missing config files (`emerging-themes`, `insight-sources`, `insight-to-impact`, `kit-scorecards`, `messaging-alignment`, `predictive-signals`, `vega`) + `src/lib/journeyStore.js`; updated `config/index.js` to match master's full export list
- Added `PULSE_BRIEF_URL`, wired button into left rail
- Committed `8c8a6d8` (build fail), `fc175bc` (fix) — Vercel auto-deployed

### Alexion (`aurivian-alexion-demo`)
- Same treatment as Otsuka — all components replaced, same 7 config files + journeyStore copied, index.js updated
- Added `PULSE_BRIEF_URL`, wired button into left rail
- Committed `1c2791a`, `42ad889` — Vercel auto-deployed

### Dyne (`aurivian-dyne-demo`)
- Replaced all components + App.js + App.css with master template
- Copied `src/lib/journeyStore.js` and all 7 new config files from master (applied lesson from Otsuka)
- Updated `config/index.js` to full master export list
- Added `PULSE_BRIEF_URL = '/pulse_dyne_brief.html'` to `customer.js`
- Wired Pulse Brief button into left rail
- `public/pulse_dyne_brief.html` and `public/pulse_dyne_brief_audio.mp3` were already present and committed
- Added Listen button + `openAudio()` to `pulse_dyne_brief.html`; resolved duplicate `play-icon` reference (`var icon = playBtn`)
- Committed `e452827`, `4e2d7a5` — Vercel auto-deployed

### Roche (`aurivian-roche-demo`)
- Audio file replaced: old audio had incorrect content. Wrote Roche-specific script covering DESTINY-Breast06 sequencing, Phesgo SC inertia (4-territory pattern), Morschhauser divergence alert (73→61), EHA 2026 Hemlibra pediatric evidence (MO5 gap), Vabysmo/biosimilar background
- HTML already referenced `pulse_roche_brief_audio.mp3` — no HTML change needed, file swapped in place
- Committed `8e6b6f3` — Vercel auto-deployed

---

## Key Technical Finding — Master Template Copy Protocol

**When copying master components to any demo, the `cp *.js` command is NOT sufficient.** Full required file list:

1. `cp ../aurivian-master-demo/src/components/*.js src/components/`
2. `cp ../aurivian-master-demo/src/App.js src/App.js`
3. `cp ../aurivian-master-demo/src/App.css src/App.css`
4. `mkdir -p src/lib && cp ../aurivian-master-demo/src/lib/journeyStore.js src/lib/`
5. Copy 7 new config files: `emerging-themes.js`, `insight-sources.js`, `insight-to-impact.js`, `kit-scorecards.js`, `messaging-alignment.js`, `predictive-signals.js`, `vega.js`
6. Rewrite `src/config/index.js` to match master's full export list (add all new exports)
7. Add `PULSE_BRIEF_URL` to `customer.js` and re-export from `index.js`
8. Add Pulse Brief button block to `App.js` left rail after Congress Capture block

**This is now documented in MEMORY.md patterns.**

---

## Pulse Brief Audio Scripts Written This Session
- **Novartis**: Kisqali NATALEE vs monarchE adjuvant framing, Pluvicto access crisis (14-week delay, "approved but unavailable"), Scemblix STAMP mechanism education gap, payer CDK4/6 equivalence tier risk
- **Roche**: DESTINY-Breast06 sequencing narrative, Phesgo SC inertia 4-territory pattern, Morschhauser divergence 73→61, EHA 2026 Hemlibra MO5 pediatric evidence pre-read, Vabysmo/biosimilar background monitoring

---

## Status After This Session

| Demo | Branding | Pulse Brief Button | Listen Button | Audio |
|------|----------|--------------------|---------------|-------|
| Terumo Europe | ✅ | ✅ | ✅ | ✅ |
| Novartis | ✅ | ✅ | ✅ | ✅ (new script) |
| argenx | ✅ | ✅ | ✅ | ✅ |
| Otsuka | ✅ | ✅ | — (no brief yet) | — |
| Alexion | ✅ | ✅ | — (no brief yet) | — |
| Dyne | ✅ | ✅ | ✅ | ✅ |
| Roche | ✅ | ✅ | ✅ | ✅ (new script) |

**Remaining**: Otsuka and Alexion do not yet have Pulse Brief HTML files — the left rail button will 404 until those are built.

---

## Notes
- Novartis Vercel webhook is broken — any future deploys require manual SHA paste at vercel.com → project → Deployments → "Paste a valid commit reference"
- argenx brand name fix (`charAt(0).toUpperCase()`) should be verified on any new demo where `CLIENT.name` is lowercase
