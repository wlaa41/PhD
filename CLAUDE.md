# Project Context — read this first on any machine

PhD in Robotics, City, University of London (Research Affiliate, MIT). Topic: simulation-trained UAV control
policies deployed zero-shot / semi-zero-shot on real hardware; drones first, designed to extend to arms and
ground robots. This repository (github.com/wlaa41/PhD, PUBLIC) holds the MPhil→PhD transfer pipeline
specifications (docs/), the candidate corpus and verification records (docs/), and the public reading platform
(site/). The full research repo (phd-zeroshot-uav: registry JSONs, skills, agents, vault, webapp) is created
later by the Phase 0 prompt in the README — it does not exist yet.

## The two standing laws (owner-decreed; never relax them)

1. **THE LAW**: everything published is quoted or verified; nothing is invented. Unverified items are
   labelled (`to confirm`, `S4-lite`, `S5 pending`), never hidden. Reconstructed equations are labelled
   "notation ours"; our explanations are labelled ours. External links only if existence-verified, with date.
2. **THE REMOVAL RULE**: nothing is removed from site or docs without the owner's explicit permission.
   Before ANY rewrite/redesign, diff against docs/site-content-inventory.md; removals must be named in commit
   messages. Full rewrites migrate content BY CHECKLIST, never by selection. Silent drops are defects.

## Status snapshot · 13 July 2026 (update this block when it changes)

- Corpus: 70 candidates seeded, scored (rubric R+H+Z+V+A); **Gate 1 (corpus lock) is PENDING — it is the
  owner's decision alone**; extraction ran ahead on the top twenty with the owner's knowledge (batch 3 was
  the owner's explicit instruction, 12 Jul).
- Extracted & annotated: **20 papers** (site/papers/ ×20). Ranks 01–10 **ALL S5-verified** — records:
  docs/s5-notebooklm-2026-07-10.md (batch 1) and docs/s5-notebooklm-2026-07-11.md (batch 2; SimpleFlight's
  five factors; 2 offboard-compute corrections). Ranks 11–20 (batch 3) **S4-extracted 12 Jul 2026, S5
  PENDING** — record docs/s4-batch3-2026-07-12.md; all six starred arXiv ids confirmed; DTC is
  abstract-only (no arXiv HTML — needs its PDF at S3); HOVER and ANYmal Parkour never use the literal term
  "zero-shot" (asterisked badges with wording notes, fly-in-seconds precedent). NEXT STEP: S5 batch 3 in
  notebook d336f22d, five questions per source in isolation.
- Method registry: **34 canonical methods in 9 families** (families are FIXED — the owner likes them as they
  are; batch 3 added 11 new methods with merge judgements logged in the s4 record). Top counts /20:
  end-to-end-rl 17, **domain-randomization-dynamics 14**, **latency-compensation 10** (latency remains the
  emerging gap candidate — fits the owner's RoboMaster EP 80–120 ms testbed), system-identification 8.
  Batch-3 evidence lines are tagged (S4) until S5; the shared-stack stripe/lens still counts ONLY the ten
  S5-verified papers and says so.
  Cross-corpus finding: "zero-shot ≠ onboard" — falcongym, pixels and simpleflight-Crazyflie all compute
  OFFBOARD; monorace, raptor, diffphys, fly-seconds run onboard. A live analysis axis for the gap study.
- NotebookLM: notebook id d336f22d (owner's Google account) is the standing S5 second reader.
- Implementation track (I1–I3): NOT started; the 12-week clock has no start date. Phase 0 not run.
- Open owner decisions: Gate 1; corpus-dashboard charts (inventory row 19, dropped-pending-decision);
  Phase 0 / clock start; I2 baseline choice (Fly-in-Seconds vs E2E-Fly stack — S5 raised real doubts).

## The pipeline in one line each

S1 discover → S2 triage (GATE 1: owner) → S3 acquire → S4 extract (batches, strict schema, "not stated" over
guessing) → S5 verify (NotebookLM answers 5 fixed questions per paper, single-source isolation; near-match on
numbers is a mismatch; corrections applied VISIBLY) → S6 integrate (single-writer registry; count = distinct
papers; split test; judgements logged) → S7 analyse (GATE 2: owner picks direction + pilot together) →
S8 render → S9 write (GATE 3: owner signs off after clean citation audit). Implementation I1→I2→I3 runs in
parallel from week 1; flight ladder (unit → sim → SITL → HITL → tethered → free) is never skipped.
Full contracts: docs/phd-pipeline.md, docs/phd-implementation.md, docs/phd-agents.md,
docs/phd-transfer-report.md.

## The site (static, no build; GitHub-Pages ready)

Design mandate "Precision Lab": Space Grotesk + Inter + JetBrains Mono; light AND dark themes (toggle,
persisted, pre-paint snippet in every head); everything is a card; method cards open deep-dive modals
(what / intuition-ours / KaTeX math notation-ours / verified evidence quotes / related / try-it resources);
knowledge graph nodes open info cards (hover = corner brief); the graph weights node size by usage and has
TWO LENSES on the one master map (methods↔families / shared stack) — never a second competing diagram;
papers draw as per-paper icons (not circles) with names on HOVER ONLY, node size is CONVEX in usage
(count-1 leaves small, r ~ count^1.5), popular methods carry an aura scaled to usage, hover lights
paths TWO HOPS out (family → methods → papers), a ⛶ full-screen toggle gives the map room as the corpus
grows, and the graph paints synchronous frames when the document is hidden (rAF is suspended in
background tabs — a blank canvas there is this bug, not a data problem); the
shared-stack stripe (index #stack) renders docs/shared-stack.md (simulators, algorithms, compute, sensors,
firmware, code releases; counts = distinct papers; "not stated" shown, never guessed); ONE master map per
page + zoom figures, never competing diagrams; figures on a constant light plate; NO always-on animation
loops (physics sleeps when idle); every fact card carries a .src source chip; the LAW prints in every footer;
counts must agree across index cards, corpus table, README and docs on every change (the owner notices stale
numbers).
New paper pages: copy the structure of site/papers/raptor-2026.html exactly.

## Working rules on any machine

- Update protocol: README "Update protocol" section — step 0 is the removal rule; docs/ first, then site/,
  then README, then commit+push. Commit messages name what changed and what was corrected.
- NEVER `git add -A` in this folder without checking untracked files (a personal .docx once reached the
  public repo and history had to be scrubbed; *.docx and *.pdf are gitignored; the transfer-application .tex
  is tracked BY the owner's explicit instruction).
- Never store credentials anywhere; paywalled papers via the owner's own logged-in browser.
- Codex CLI is the second engineer when installed (`codex exec --full-auto` for mechanical multi-file edits,
  `--sandbox read-only` for design consultation); ALWAYS review its diff before committing.
- Style in docs/: precise, technical, UK English; no em dashes; claims separated from speculation.
- S5 batch procedure: README "Verification (S5)" section. Per source: isolate it (checkboxes), ask the five
  questions from docs/phd-pipeline.md S5 requesting verbatim quotes, record a dated docs/s5-*.md, apply
  corrections visibly, delete notebook chat between papers.
- The owner's role is real: gates are theirs, merge disputes are theirs, flight go/no-go is theirs. Surface
  pending owner decisions prominently (the index carries a Gate 1 call-to-action card).

## Key file map

docs/phd-architecture.md (environment + design-loop history §0) · docs/phd-pipeline.md (S1–S9, rubric, merge
rules, programme) · docs/phd-implementation.md (I1–I3, ladder, risks) · docs/phd-agents.md (8 agents) ·
docs/phd-transfer-report.md (report contract) · docs/sim2real-litreview-command.md (task brief) ·
docs/corpus-candidates.md + docs/corpus-acquisition.md (the 70, scores, links, download instructions) ·
docs/s5-notebooklm-2026-07-10.md + docs/s5-notebooklm-2026-07-11.md (verification records) ·
docs/shared-stack.md (tools/platforms across the ten papers; source of the stack stripe + stack lens) ·
docs/site-content-inventory.md (anti-drop manifest) · site/index.html · site/system.html · site/corpus.html ·
docs/s4-batch3-2026-07-12.md (batch-3 extraction record) ·
site/papers/*.html ×20 · archive/transfer-hub-v1.html (superseded dashboard hub — contains the
pending-decision charts).
