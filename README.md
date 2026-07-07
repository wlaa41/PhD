# PhD Zero-Shot UAV: Bootstrap

Starter docs package for the MPhil to PhD transfer pipeline.
Unzip into the repo root so the six files sit in `docs/`.

## Files and reading order

1. `docs/phd-architecture.md`  The environment: repo structure, CLAUDE.md content, tool lanes (Claude Code, NotebookLM, Understand-Anything, Codex, Antigravity), registry-as-single-source-of-truth, React dashboard spec, hardware map.
2. `docs/phd-pipeline.md`  The machine: paper state machine, nine stage contracts S1 to S9, NotebookLM verification gate, method merge rules, weekly cadence with the full 12-week programme, provenance chain.
3. `docs/phd-implementation.md`  The hardware track: phases I1 to I3 (infrastructure, baseline reproduction, pilot experiment) running in parallel from week 1, experiment state machine and experiments.json schema, flight-safety ladder, risk register, statistics standards.
4. `docs/phd-agents.md`  The workers: eight agent definitions ready for `.claude/agents/`, orchestration protocol, single-writer rule, parallel extraction.
5. `docs/phd-transfer-report.md`  The paper: what examiners assess, chapter structure with word budgets, the argument spine, RQ/hypothesis/kill-condition rules, evidence standards, pre-submission checklist, mock viva bank, writing workflow.
6. `docs/sim2real-litreview-command.md`  The task brief: ~50 papers, 2022 onwards, zero-shot focus, method frequency counting, per-paper pipelines, pilot sketch per shortlisted gap, Obsidian vault output.
7. `docs/corpus-candidates.md`  Seed candidate list from the 2026-07-07 deep-research sweep, ranked with rubric scores and per-paper verification status. Feeds candidates.json at Phase 1.
8. `docs/corpus-acquisition.md`  Standalone download manifest (70 papers): direct links, per-paper point breakdown (R+H+Z+V+A) and citation column (filled at S2 via Semantic Scholar), institutional additions (MIT, Stanford, CMU, Berkeley, DeepMind), Chinese-institution block (SJTU, Shanghai AI Lab, Tsinghua, Qi Zhi, Fudan incl. 2026 entries), fresh-2026 block, lab-sweep directives (incl. Tel Aviv/Technion, Chinese 2026 and UK labs), and step-by-step instructions so any module or session can run the acquisition alone.
9. `transfer-hub.html`  The project website: single self-contained file (no build step, works offline). Explains the whole system: approaches, S1-S9 pipeline, 12-week Gantt, skills installed vs pending, force-directed system graph, corpus table, weather-simulation hero. All content lives in the SITE_DATA block at the top of its script; renderers below it never change.

## Site map (canonical copy)

The website mirrors this map in its Map section; this README copy is the source of truth.

| Section | Anchor | Contents |
|---|---|---|
| Home | `#hero` | weather sim, programme at a glance |
| System | `#system` | registry principle, generated views, five design loops |
| Tools | `#tools` | six tool lanes and their contracts |
| Pipeline | `#pipeline` | S1-S9 contracts, paper states, I1-I3, flight ladder |
| Gantt | `#gantt` | 12-week programme, three lanes, three gates |
| Skills | `#skills` | installed vs Phase 0 vs external, agent roster |
| Graph | `#graph` | force-directed map of the whole system |
| Corpus | `#corpus` | seeded candidates with verification status |
| Map | `#map` | site map mirror + update protocol |

## Update protocol (run on EVERY tweak, in order)

1. Edit the source of truth first: the relevant file in `docs/`. Never start with a generated view.
2. If the change alters how the system works, record it as a new design loop in phd-architecture.md section 0.
3. Update `transfer-hub.html`: edit the SITE_DATA block only; bump `meta.version` and `meta.updated`. Markup and renderers below the block never change.
4. Update this README (site map, file list, reading order) if pages, sections or files changed.
5. Update the Claude memory (`phd-transfer-pipeline`) if standing facts changed.
6. After Phase 0 exists: regenerate views (`/vault-build`, `/dashboard-sync`) and commit, naming the loop.

## Paper access (S3 acquire)

Never store university credentials in this repo or any file. Most of the corpus is open-access on arXiv. For the few paywalled PDFs: log in to the institutional proxy in Chrome yourself, then let Claude drive the already-authenticated browser via the Chrome extension (same pattern as the Aula downloads). Credentials stay in the browser; the repo only ever holds the PDFs you are licensed to keep.

## Phase 0 prompt (paste into Claude Code from the repo root)

Read docs/phd-architecture.md, docs/phd-pipeline.md,
docs/phd-implementation.md, docs/phd-agents.md and
docs/phd-transfer-report.md in full. Then execute Phase 0:

1. Create CLAUDE.md at the repo root exactly as specified in
   phd-architecture.md section 4, and a matching AGENTS.md.
2. Create the full directory structure from phd-architecture.md
   section 3 (data/registry, docs/literature/pdfs, docs/literature/
   inbox, vault, webapp, src/ros2_ws, sim, experiments/plans,
   experiments/logs, experiments/results, reports, data/staging).
3. Create every skill in .claude/skills/ per phd-architecture.md
   section 5, consistent with the pipeline stage contracts in
   phd-pipeline.md and the experiment schema in
   phd-implementation.md section 2.
4. Create every agent in .claude/agents/ using the definitions in
   phd-agents.md verbatim.
5. Initialise empty registry files: papers.json, methods.json,
   pipelines.json, gaps.json, hardware-map.json (seed hardware-map
   from phd-architecture.md section 7), candidates.json,
   experiments.json.
6. Create reports/transfer-report/risk-register.md seeded from
   phd-implementation.md section 7.
7. Do NOT start the literature search yet. Report what was created
   and stop for my review.

After review and a git commit, two tracks start in the same week:

Literature: Read docs/sim2real-litreview-command.md and begin
Phase 1 (Discover and Triage) per docs/phd-pipeline.md, using the
scout agent. Stop at Gate 1 with the ranked candidate list for my
approval.

Implementation: Begin I1 from docs/phd-implementation.md section 3
with the ros2-px4-engineer agent, working the acceptance-test list
top to bottom and committing evidence to experiments/logs/i1/.

## Plugin install (once, inside Claude Code)

/plugin marketplace add Egonex-AI/Understand-Anything
/plugin install understand-anything
