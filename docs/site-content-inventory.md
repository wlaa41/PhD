# Site Content Inventory · the anti-drop manifest

## The removal rule (standing, user-decreed 10 July 2026)

**Nothing is removed from the site without the owner's explicit permission.** Any rewrite or redesign MUST be
diffed against this inventory before commit. A unit may only leave the site when (a) the owner approved the
removal, (b) the removal is named in the commit message, and (c) this file records it with date and reason.
Silent drops are treated as defects. This extends the project's LAW: nothing invented — and nothing
disappeared.

History that forced this rule: the first redesign silently dropped the system/data/pipeline explanations
(caught by the owner); the second silently dropped the skills-status view (caught by the owner); an audit on
10 July 2026 then found two more (rows marked below). Full rewrites carry content by selection, and selection
loses things — so rewrites now carry content by THIS checklist.

## Content units and where each lives

| # | Content unit | Lives at | Status |
|---|---|---|---|
| 1 | Project status numbers (candidates / extracted / methods / gates) | index.html status cards + README status table | LIVE — must stay consistent |
| 2 | Annotated paper cards (scales to 70; only extracted get pages) | index.html #papers | LIVE |
| 3 | Per-paper annotated pages (TL;DR, figures, math, results, limitations, relevance, provenance, BibTeX) | site/papers/{id}.html ×10 (batch 1 S5-verified; batch 2 S5 pending) | LIVE |
| 4 | Knowledge graph (papers↔methods↔families, hover brief, node info cards) | index.html #graph | LIVE |
| 5 | Method registry: 9 families, 22 cards, deep-dive modals (what / intuition / math / evidence / related / try-it resources) | index.html #methods | LIVE — families never change without permission |
| 6 | Navigation map figure + footer site map on every page | index.html #map + all footers | LIVE |
| 7 | Registry principle + tool lanes (verbatim quotes) | system.html #principle | LIVE |
| 8 | **Design-loop history (Loops 1–5 self-critique)** | system.html #principle (restored 10 Jul) · source docs/phd-architecture.md §0 | RESTORED 10 Jul 2026 — was silently dropped in redesign v2 |
| 9 | Clickable master system map (two tracks, gates, registry, views) | system.html #workflow | LIVE |
| 10 | S1–S9 stage cards + clickable strip + paper state machine | system.html #pipeline | LIVE |
| 11 | Scoring rubric + method counting/categorization rules (quotes) | system.html #counting | LIVE |
| 12 | Agent cards ×8 with defining quotes | system.html #agents | LIVE |
| 13 | Registry schema cards ×7 | system.html #data | LIVE |
| 14 | Implementation track I1–I3 + flight ladder | system.html #implementation | LIVE |
| 15 | Skills & tooling status (installed vs pending, verified dates) | system.html #skills | RESTORED 10 Jul 2026 — was silently dropped in redesign v2 |
| 16 | Two-track 12-week timeline figure + programme table | system.html #programme | LIVE |
| 17 | Verification law + status vocabulary + provenance chain | system.html #law + every footer | LIVE |
| 18 | Ranked corpus table with rubric breakdowns + filters | corpus.html | LIVE |
| 19 | **Corpus dashboard charts** (KPI tiles; papers by year × zero-shot; platform mix; institutions; score distribution) | nowhere — was old hub #dash | **DROPPED in redesign v2 — PENDING OWNER DECISION.** The old implementation is preserved in archive/transfer-hub-v1.html; say the word and it returns as light/dark chart cards on corpus.html |
| 20 | Weather/drone hero simulation | removed | REMOVED BY OWNER REQUEST 7 Jul 2026 ("childish") — the one authorized removal |
| 21 | Update protocol (6 steps + removal rule) | README + this file | LIVE |
| 22 | S5 verification record | docs/s5-notebooklm-2026-07-10.md, linked from all paper pages | LIVE |

## How to use this file

- Before any redesign/rewrite: walk this table; every LIVE unit must exist in the new version or carry the
  owner's recorded approval to remove.
- After any content change: update the affected row(s) and the README site map in the same commit.
- New content units get a new row when they ship.
