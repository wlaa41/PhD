# PhD Zero-Shot UAV

MPhil to PhD transfer: pipeline specs, candidate corpus, and the reading platform.

## Repository structure

```
docs/       pipeline specifications + corpus files (reading order below)
site/       the website: an academic self-learning reading platform
  index.html          overview, reading list, method registry, programme
  corpus.html         ranked candidates with transparent scoring + filters
  papers/{id}.html    one full annotated page per extracted paper
                      (math via KaTeX, SVG figures, provenance notes)
  assets/             site.css (design system) + site.js (no framework)
archive/    superseded artefacts (transfer-hub-v1.html, the old dashboard hub)
```

Tech note: the site is deliberately static, framework-free HTML/CSS/JS
(Crimson Pro + Atkinson Hyperlegible, KaTeX for math) so it serves from
GitHub Pages with zero build. The React app in phd-architecture.md section 6
remains the registry-driven data dashboard, built at S8.

## Files and reading order

1. `docs/phd-architecture.md`  The environment: repo structure, CLAUDE.md content, tool lanes (Claude Code, NotebookLM, Understand-Anything, Codex, Antigravity), registry-as-single-source-of-truth, React dashboard spec, hardware map.
2. `docs/phd-pipeline.md`  The machine: paper state machine, nine stage contracts S1 to S9, NotebookLM verification gate, method merge rules, weekly cadence with the full 12-week programme, provenance chain.
3. `docs/phd-implementation.md`  The hardware track: phases I1 to I3 (infrastructure, baseline reproduction, pilot experiment) running in parallel from week 1, experiment state machine and experiments.json schema, flight-safety ladder, risk register, statistics standards.
4. `docs/phd-agents.md`  The workers: eight agent definitions ready for `.claude/agents/`, orchestration protocol, single-writer rule, parallel extraction.
5. `docs/phd-transfer-report.md`  The paper: what examiners assess, chapter structure with word budgets, the argument spine, RQ/hypothesis/kill-condition rules, evidence standards, pre-submission checklist, mock viva bank, writing workflow.
6. `docs/sim2real-litreview-command.md`  The task brief: ~50 papers, 2022 onwards, zero-shot focus, method frequency counting, per-paper pipelines, pilot sketch per shortlisted gap, Obsidian vault output.
7. `docs/corpus-candidates.md`  Seed candidate list from the 2026-07-07 deep-research sweep, ranked with rubric scores and per-paper verification status. Feeds candidates.json at Phase 1.
8. `docs/corpus-acquisition.md`  Standalone download manifest (70 papers): direct links, per-paper point breakdown (R+H+Z+V+A) and citation column (filled at S2 via Semantic Scholar), institutional additions (MIT, Stanford, CMU, Berkeley, DeepMind), Chinese-institution block (SJTU, Shanghai AI Lab, Tsinghua, Qi Zhi, Fudan incl. 2026 entries), fresh-2026 block, lab-sweep directives (incl. Tel Aviv/Technion, Chinese 2026 and UK labs), and step-by-step instructions so any module or session can run the acquisition alone.
## Site map (canonical copy)

| Page | Contents |
|---|---|
| `site/index.html` | overview + stats strip, the reading list (annotated papers), the categorized method registry with usage counts, the programme summary, colophon |
| `site/corpus.html` | ranked candidates, per-paper score breakdown (R+H+Z+V+A), strength signals, platform/source/year filters + search |
| `site/papers/falcongym-2025.html` | annotated paper 01 · NeRF sim, NPE + Kalman, attention fusion |
| `site/papers/raptor-2026.html` | annotated paper 02 · meta-imitation, 2,084-param recurrent student |
| `site/papers/monorace-2026.html` | annotated paper 03 · monocular racing, A2RL champion (verified) |
| `site/papers/e2e-fly-2026.html` | annotated paper 04 · integrated training-to-deployment system |
| `site/papers/fly-seconds-2024.html` | annotated paper 05 · asymmetric actor-critic, designated I2 baseline |

Every paper page carries: TL;DR, problem, pipeline figure, the mathematics
(reconstructed concept forms are labelled "notation ours"), results, stated
limitations, relevance to this PhD, provenance status, BibTeX, prev/next.

## Update protocol (run on EVERY tweak, in order)

1. Edit the source of truth first: the relevant file in `docs/`. Never start with a generated view.
2. If the change alters how the system works, record it as a new design loop in docs/phd-architecture.md section 0.
3. Update `site/`: the page whose content changed. Consistency sweep: the stats strip and method counts on index.html, the corpus table on corpus.html, and the "updated" date in page footers must all agree with docs/.
4. Update this README (structure, site map, reading order) if pages or files changed.
5. Update the Claude memory (`phd-transfer-pipeline`) if standing facts changed.
6. Commit and push (GitHub Pages redeploys the site automatically once enabled).

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
