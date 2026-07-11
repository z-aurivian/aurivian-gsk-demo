# Session Notes — 2026-06-09

## Aurivian Monochrome v1 Brand Implementation

### Summary
Applied the new Aurivian Monochrome v1 brand guidelines to the master demo template in two commits.

---

### Commit 1 — Core brand system
`0a93f7f` — Apply Aurivian Monochrome v1 brand guidelines

- **Fonts**: Inter → Manrope (body/headlines) + IBM Plex Mono (labels/readouts, `font-plex-mono`). Michroma unchanged (wordmark only). Google Fonts link updated in `public/index.html`.
- **Brand color retired**: `#00A8FF` removed everywhere. `--auri-blue` is now informational semantic only (`#3B82F6`).
- **UI chrome token**: All former `auri-blue` usages replaced with `auri-text` / `auri-bg`. Buttons: `bg-auri-text text-auri-bg` (black/white in light, white/dark in dark).
- **Semantic tokens** added to both `index.css` and `tailwind.config.js`: `s-urgent`, `s-caution`, `s-new`, `s-info`, `s-emerging`, `s-stable`.
- **AgentSurfaceHeader**: Removed `AGENT_ACCENT` per-agent color map. Now uses single 2px ink top border (`border-t-2 border-t-auri-text`) on bone background — matches brand doc exactly.
- **Default theme**: Light (was already default).

---

### Commit 2 — Palette hierarchy + active states + tile dots
`b123209` — Refine monochrome brand: palette hierarchy, active states, semantic tile dots

**Key insight from reviewing brand HTML**: The page background should be warm off-white (bone), and cards should be pure white — they POP against the background. The initial implementation had this inverted.

**Five fixes applied:**

1. **Background/card swap** — `--auri-bg` = Bone `#F8F8F5`, `--auri-card` = Paper `#FFFFFF`. Cards now pop.
2. **Border lightened** — `#C9C8C2` → `#E7E7E1` (`--line` from brand doc). Barely visible.
3. **Body text** — `#0B0B0C` → `#14161A` (`--text` from brand doc). Warm near-ink.
4. **Offset surface** — `--auri-offset` = `#F1F1ED` (Surface2 from brand doc) for chrome/header areas.
5. **Active states** — All nav links, filter tabs, toggle buttons: full ink fill (`bg-auri-text text-auri-bg`), not the previous 10% tint. Product dropdown uses 4px left border indicator (avoids text-color conflict with hardcoded child elements).

**CommandCenter tile headers** — Replaced icons with semantic color dots:
- Predictive Signals: `bg-s-new` (green, pulsing) — fresh opportunity worth acting on
- KIT Metrics: `bg-s-info` (blue) — tracked, in-progress
- Gap Radar: `bg-s-urgent` (red) — needs a decision, risk
- Emerging Themes: `bg-s-emerging` (purple) — pattern forming before consensus

---

### Final CSS token reference (light mode)

| Token | Value | Role |
|-------|-------|------|
| `--auri-bg` | `#F8F8F5` | Page background (bone) |
| `--auri-card` | `#FFFFFF` | Card surfaces (paper) |
| `--auri-offset` | `#F1F1ED` | Chrome/header areas (surface2) |
| `--auri-text` | `#14161A` | Primary text |
| `--auri-muted` | `#5A5E62` | Secondary text |
| `--auri-border` | `#E7E7E1` | Borders (barely visible) |
| `--s-urgent` | `#DC4A41` | Semantic: urgent action |
| `--s-caution` | `#E0A12E` | Semantic: caution |
| `--s-new` | `#3FA56A` | Semantic: new insight |
| `--s-info` | `#3B82F6` | Semantic: informational |
| `--s-emerging` | `#8B7CF0` | Semantic: emerging pattern |
| `--s-stable` | `#8E9296` | Semantic: stable/neutral |

---

### Next
Build new demo (details TBD).
