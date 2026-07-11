# PhD Zero-Shot UAV

MPhil → PhD transfer, Robotics, City, University of London. Topic: simulation-trained UAV control policies
deployed zero-shot (or semi-zero-shot) on real hardware, drones first, designed to extend to arms and ground
robots. This repository holds the pipeline specifications, the candidate corpus, the verification records, and
the public reading platform they generate.

**The law of this project: everything published is quoted or verified; nothing is invented. Unverified items
are labelled, never hidden.**

## Status · 10 July 2026

| What | State |
|---|---|
| Candidate corpus | 70 papers seeded, scored against the fixed rubric; **awaiting Gate 1** (human corpus lock) |
| Extracted & annotated | **10 papers, all S5-verified** (batches 1–2), each with its own site page (figures, math, provenance, verified limitations) |
| S5 verification | **Both batches passed** (records: `docs/s5-notebooklm-2026-07-10.md`, `docs/s5-notebooklm-2026-07-11.md`). Batch 2 named SimpleFlight's five factors and applied two offboard-compute corrections; "zero-shot ≠ onboard" identified as a cross-corpus analysis axis |
| Method registry | 23 canonical methods in 9 families; top counts after both S5 passes: end-to-end RL 8/10, **domain randomization 8/10**, **system identification 7/10** (SimpleFlight ranks it crucial), latency handling 6/10 |
| NotebookLM notebook | Live (notebook `d336f22d`, 5 full-text sources) — the standing S5 instrument; add each batch's papers on arrival |
| Implementation track (I1–I3) | **Not started** — the 12-week clock has no start date yet |

## Repository structure

```
docs/                         the source of truth (reading order below)
  phd-architecture.md         the environment: registry principle, tool lanes,
                              repo layout, CLAUDE.md, dashboard spec, hardware map,
                              design-loop history (§0)
  phd-pipeline.md             the machine: S1-S9 stage contracts, paper state
                              machine, method merge rules, 12-week programme,
                              provenance chain
  phd-implementation.md       the hardware track: I1-I3 with acceptance tests,
                              experiments.json schema, flight ladder, risk register,
                              statistics standards
  phd-agents.md               eight agent definitions, orchestration protocol,
                              single-writer rule
  phd-transfer-report.md      the paper contract: examiner questions, chapter
                              budgets, argument spine, RQ/kill-condition rules,
                              pre-submission checklist, mock viva bank
  sim2real-litreview-command.md   the task brief (~50 papers, 2022+, frequency
                              counting, pilot sketch per shortlisted gap)
  corpus-candidates.md        ranked triage list from the deep-research sweep
  corpus-acquisition.md       standalone 70-paper download manifest: links, rubric
                              point breakdowns, strength signals, citation-fetch
                              instructions, lab-sweep directives — hand it to any
                              module and it can run acquisition alone
  s5-notebooklm-2026-07-10.md batch-1 verification record: quotes, verdicts,
                              corrections, registry actions
  s5-notebooklm-2026-07-11.md batch-2 verification record: five factors named,
                              offboard-compute corrections, registry actions
site/                         the reading platform (static, framework-free,
                              light + dark themes, GitHub-Pages ready)
archive/                      superseded artefacts (transfer-hub-v1.html)
```

## The reading platform (site/)

Tech: semantic HTML + one stylesheet + vanilla JS. Space Grotesk / Inter / JetBrains Mono; KaTeX for
mathematics; hand-drawn SVG figures on a constant light plate so they read in both themes. No build step:
enable GitHub Pages (Settings → Pages → main) and it serves as-is.

| Page | Contents |
|---|---|
| `site/index.html` | status cards · annotated-paper card grid (built for 70; only extracted papers get pages) · **knowledge graph** (Obsidian view: papers↔methods↔families; hover shows an on-canvas brief with connections; click opens an info card with the page/deep-dive action) · **method registry** as clickable cards opening deep-dive modals (what · intuition · mathematics "notation ours" · S5-verified evidence quotes · related methods · try-it-yourself open-source links, every URL existence-verified and dated) · navigation-map figure · footer site map |
| `site/system.html` | **the whole system in one clickable map** (two tracks, three gates, registry hub, generated views — press any block to open the card that explains it) · S1–S9 stage cards with verbatim quotes · scoring rubric · method counting & categorization rules · 8 agent cards · registry schemas · I1–I3 · two-track 12-week timeline · the verification law |
| `site/corpus.html` | 40 ranked candidates with per-paper R+H+Z+V+A breakdowns, strength signals, platform/source/year filters + search; annotated papers linked |
| `site/papers/{id}.html` | one full annotated article per extracted paper: TL;DR, problem, pipeline figure, mathematics, results, author-stated limitations, relevance to this PhD, provenance status, BibTeX, prev/next. Batch 1 (S5-verified): `falcongym-2025`, `raptor-2026`, `monorace-2026`, `e2e-fly-2026`, `fly-seconds-2024`. Batch 2 (S5-verified): `attention-legged-2025`, `wheeledlab-2025`, `pixels-2024`, `diffphys-2025`, `simpleflight-2024` |

Design rules that keep the site honest and consistent:
- Every fact card carries a `.src` source chip naming its file or record; statuses are
  `web-verified` / `web-found` / `to confirm` / `S4-lite` / `S5 verified`, never hidden.
- Reconstructed equations are labelled "notation ours"; our explanations are labelled ours.
- One master map per page plus zoom figures — never competing big diagrams.
- Figures sit on a constant light plate; no always-on animation loops (the graph physics sleeps when idle).

## Update protocol (run on EVERY tweak, in order)

0. **The removal rule (standing):** nothing is removed from the site or docs without the owner's explicit
   permission. Before ANY redesign or rewrite, diff against `docs/site-content-inventory.md`; every live
   content unit must survive or carry recorded approval to go. Removals are named in the commit message.
   Silent drops are defects.
1. Edit the source of truth first: the relevant file in `docs/`. Never start with a generated view.
2. If the change alters how the system works, record it as a design loop in docs/phd-architecture.md §0.
3. Update `site/`: the page whose content changed. Consistency sweep: index status cards and method counts,
   corpus table, page footers' dates — all must agree with docs/.
4. Update this README (status table, structure, site map) if pages, files or standing facts changed.
5. Update the Claude memory (`phd-transfer-pipeline`) if standing facts changed.
6. Commit and push (GitHub Pages redeploys automatically once enabled).

## Verification (S5) — how to run a batch

The NotebookLM notebook (`d336f22d`, account rutaul41@gmail.com) is the standing second reader. Per batch:
add each paper's full text as a source (arXiv HTML URL, or the PDF at acquisition); select ONLY that paper's
source; ask the five standard questions from docs/phd-pipeline.md S5, requesting verbatim quotes; record
answers and verdicts in a dated `docs/s5-*.md` file; apply corrections to the site visibly ("a near-match on
numbers is a mismatch"); delete the notebook chat between papers to keep sessions clean.

## Paper access (S3 acquire)

Never store university credentials in this repo or any file. Most of the corpus is open-access on arXiv. For
paywalled PDFs: log in to the institutional proxy in Chrome yourself, then let the assistant drive the
already-authenticated browser. Credentials stay in the browser; the repo only holds PDFs you are licensed to
keep — and `*.pdf` is gitignored because this repository is public.

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
   experiments.json. Seed candidates.json from
   docs/corpus-acquisition.md and papers/methods from the five
   S4-lite extractions + docs/s5-notebooklm-2026-07-10.md.
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

## Working from another machine

Everything needed to continue lives in this repository. On a new laptop:

1. `git clone https://github.com/wlaa41/PhD.git` (authenticate GitHub for pushing).
2. Open the folder in Claude Code — **CLAUDE.md loads automatically** and carries the full project context:
   the two laws, the status snapshot, the pipeline, the design mandates, the working rules. AGENTS.md carries
   the same rules for Codex/other tools. No session memory from any previous machine is required.
3. The site is static: open `site/index.html` directly in a browser, or serve the folder with any static
   server (`npx http-server .`). Internet needed for the KaTeX/fonts CDNs.
4. Optional per-machine installs: Codex CLI (`npm i -g @openai/codex`, then login) for the second-engineer
   lane; the Claude-in-Chrome extension for NotebookLM/S5 browser automation.
5. Cloud pieces travel with your accounts, not the machine: the NotebookLM notebook (Google login), GitHub,
   and GitHub Pages if enabled.
5b. Skills: the project depends on NO machine-local skills. Claude Code's bundled skills (deep-research,
   dataviz, …) exist on every install; user-installed ones (ui-ux-pro-max, aula-download) are machine-local
   but not required to continue. The twelve project skills do not exist yet anywhere — Phase 0 creates them
   in `.claude/skills/` INSIDE this repo, after which they are committed and travel with every clone. The
   Understand-Anything plugin is per-machine (install command at the bottom of this file).
6. Keep CLAUDE.md's status snapshot current — it is the cross-machine memory. Update it in the same commit
   as any status-changing work (the update protocol applies to it like everything else).

## Plugin install (once, inside Claude Code)

/plugin marketplace add Egonex-AI/Understand-Anything
/plugin install understand-anything

## Tool lanes (who does what)

Claude Code orchestrates and owns the registry · NotebookLM verifies (S5) · Codex CLI is the second engineer
(mechanical multi-file edits and design consultation, diff-reviewed before commit) · Antigravity browser-tests
the future React dashboard (S8) · Obsidian is the human reading layer. No tool crosses lanes.
