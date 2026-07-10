# PhD Research Architecture: Zero-Shot UAV Deployment
## Claude Code + Codex + Antigravity + NotebookLM + Understand-Anything

Architecture for the MPhil to PhD transfer pipeline: gather ~50 papers, extract methodologies and pipelines, count method usage across the field, identify the most promising direction, and present everything through an Obsidian vault plus a ReactJS dashboard, while a parallel implementation track (phd-implementation.md) brings up the hardware stack, reproduces a published baseline on the real drone, and runs a pilot experiment so the transfer report (phd-transfer-report.md) contains real preliminary results, not just a survey.

---

## 0. Design loops (how this was refined)

**Loop 1** took the base skills-and-agents structure. Critique: the Obsidian vault and the React app would be written separately and drift apart; no rule for which AI tool does what; nothing stops fabricated citations reaching the report.

**Loop 2** fixed drift with a single source of truth: a JSON registry that both the vault and the React app are generated from. Added tool lanes (each tool has one job). Critique: still no independent verification of extractions, and rebuilding the dashboard by hand every time the registry changes is churn.

**Loop 3** added a NotebookLM verification gate (a second, independent reader over the same PDFs), Understand-Anything as the knowledge-graph layer over the vault, a `/dashboard-sync` skill so the React app regenerates from the registry automatically, and human approval gates at corpus lock and gap selection.

**Loop 4** noticed the system built evidence but never specified the paper: nothing defined what an outstanding transfer report contains or what examiners assess. Added phd-transfer-report.md: chapter structure with word budgets, the argument spine, RQ/hypothesis/kill-condition rules, evidence standards, pre-submission checklist and mock viva bank. `/phd-writing` and thesis-reviewer now treat it as their contract.

**Loop 5 (final)** noticed implementation was deferred to "later", so the report would have had no preliminary results and infrastructure risk would surface in month 8. Added phd-implementation.md: a parallel track (I1 infrastructure, I2 baseline reproduction, I3 pilot experiment) starting week 1, an experiment state machine in `experiments.json` mirroring the paper state machine, the flight-safety ladder, a risk register, and statistics standards. Gate 2 now requires the recommended direction to ship with a feasible pilot spec.

---

## 1. Core principle: one registry, many views

```
                    ┌─────────────────────────┐
                    │   data/registry/        │
                    │   papers.json           │
                    │   methods.json          │
                    │   pipelines.json        │
                    │   gaps.json             │
                    │   hardware-map.json     │
                    │   candidates.json       │
                    │   experiments.json      │
                    └───────────┬─────────────┘
              ┌─────────────────┼──────────────────┐
              ▼                 ▼                  ▼
      Obsidian vault      React dashboard    Transfer report
      (reading/thinking)  (presenting)       (writing)
              │
              ▼
      Understand-Anything knowledge graph
      (exploring relationships)
```

Nothing is written twice. Paper notes, method counts, pipeline diagrams, gap clusters: all generated from the registry. Edit the registry, regenerate the views. This is what makes the system outstanding rather than a folder of markdown that rots.

---

## 2. Tool lanes (each tool has one job)

| Tool | Lane | What it does here |
|---|---|---|
| **Claude Code** (WSL2) | Orchestrator | Runs all skills and agents. Searches, extracts papers to JSON, builds the vault, generates analysis, writes report drafts. The only tool that writes to the registry. |
| **NotebookLM** (Pro) | Independent second reader | All ~50 PDFs uploaded to one notebook. Used to verify Claude's extractions (ask the same questions, compare answers), cross-paper Q&A grounded in sources, Audio Overviews per methodology family for passive learning, and source discovery for corpus building. Never writes anything; it is the verification gate. |
| **Understand-Anything** | Knowledge graph | Installed as a Claude Code plugin. Its wiki-analysis skill runs over the vault (wikilinked markdown) and produces an interactive graph dashboard: papers, methods, authors as nodes; cites, builds_on, contradicts as edges. Also used later on the ROS2/PX4 codebase. |
| **Codex** (Pro) | Second engineer | Builds and reviews the React dashboard against the spec in section 6. Cross-checks Claude Code's generator scripts. Two independent implementations of anything critical means bugs surface. |
| **Antigravity** (Pro) | Browser-verified frontend | Its agent runs the React app in a real browser, clicks through every page, screenshots, and verifies against the spec. Used for E2E testing and visual polish. Gemini 3 long context also used for whole-corpus cross-checks when a question spans many papers at once. |
| **Obsidian** | Human layer | Where you read, annotate, and think. Your annotations get promoted back into the registry via `/vault-sync`. |

Rule: Claude Code owns the registry. Codex and Antigravity own the webapp code. NotebookLM owns verification. No tool crosses lanes.

---

## 3. Repository structure

```
phd-zeroshot-uav/
├── CLAUDE.md                        # project context (section 4)
├── AGENTS.md                        # same context for Codex/Antigravity
├── .claude/
│   ├── settings.json
│   ├── skills/
│   │   ├── corpus-search/SKILL.md   # find + rank candidate papers
│   │   ├── paper-extract/SKILL.md   # PDF -> papers.json entry + vault note
│   │   ├── method-registry/SKILL.md # update methods.json + usage counts
│   │   ├── pipeline-map/SKILL.md    # per-paper pipeline -> pipelines.json + Mermaid
│   │   ├── gap-analysis/SKILL.md    # cluster limitations -> gaps.json
│   │   ├── vault-build/SKILL.md     # registry -> Obsidian vault
│   │   ├── dashboard-sync/SKILL.md  # registry -> webapp/public/data/*.json
│   │   ├── citation-audit/SKILL.md  # verify every claim has a real source
│   │   ├── phd-writing/SKILL.md     # registry + vault -> report sections
│   │   ├── experiment-plan/SKILL.md # research question -> measurable experiment
│   │   ├── ros2-review/SKILL.md     # later: code review lane
│   │   └── hardware-safety/SKILL.md # later: pre-flight checklist
│   └── agents/
│       ├── literature-reviewer.md
│       ├── method-analyst.md        # owns frequency counting + trends
│       ├── dashboard-engineer.md
│       ├── ros2-px4-engineer.md
│       └── thesis-reviewer.md
├── data/
│   └── registry/
│       ├── papers.json
│       ├── methods.json
│       ├── pipelines.json
│       ├── gaps.json
│       ├── hardware-map.json
│       ├── candidates.json
│       └── experiments.json         # experiment state machine (phd-implementation.md)
├── docs/
│   └── literature/
│       ├── pdfs/                    # the ~50 PDFs (also uploaded to NotebookLM)
│       └── inbox/                   # candidates awaiting approval
├── vault/                           # generated Obsidian vault
│   ├── 00-home.md
│   ├── 10-papers/
│   ├── 20-methods/
│   ├── 30-analysis/
│   └── 40-dashboards/
├── webapp/                          # React dashboard (section 6)
├── src/ros2_ws/                     # later: implementation
├── sim/                             # isaac-lab/, aerial-gym/, px4-sitl/
├── experiments/                     # plans/, logs/, results/
└── reports/
    ├── transfer-report/
    └── annual-progress/
```

---

## 4. CLAUDE.md (root of repo)

```markdown
# PhD Project Context

PhD in Robotics, City, University of London. Research Affiliate, MIT.
Topic: simulation-trained UAV control policies with zero-shot or
semi-zero-shot deployment to real hardware. Application oriented:
drones first, designed to extend to robotic arms and ground robots.

## Single source of truth
data/registry/*.json is the only place facts about papers, methods,
pipelines, gaps and experiments live. The vault/ and webapp/ are
GENERATED views. Never edit generated files directly; edit the
registry and regenerate with /vault-build and /dashboard-sync.

## Two parallel tracks
- Literature track: stages S1 to S9 in docs/phd-pipeline.md.
- Implementation track: phases I1 to I3 in docs/phd-implementation.md,
  starts week 1. Experiments live in experiments.json with the same
  state-machine discipline as papers. The flight ladder (unit -> sim
  -> SITL -> HITL -> tethered -> free) is never skipped.
- The transfer report contract is docs/phd-transfer-report.md; writing
  tasks follow its structure, evidence standards and checklist.

## Corpus rules
- Papers 2022 onwards only, majority from the last 18 months.
- Top venues and high citation velocity preferred.
- Zero-shot status recorded as: zero | semi | no.
- Every method a paper uses is recorded, even if used by one paper.
- Method usage_count across the corpus is the essentiality signal.
- Never fabricate citations. Unverifiable claims get status: unverified.

## Hardware (feasibility filter for all analysis)
- Holybro X500 V2 + Pixhawk 6X + Jetson Orin Nano (TensorRT onboard)
- Workstation: RTX A4000, Ryzen 7 7800X3D, DDR5 (Isaac Lab, Aerial Gym)
- Stack: PX4 v1.15+, XRCE-DDS, ROS 2 Humble
- DJI RoboMaster EP (ground robot, arm+gripper, 80-120 ms Wi-Fi latency)
- Meta Quest 3, Bambu H2C with 40W laser (rigs/mounts), budget for more

## Style rules
- Precise, technical, UK English. Academic style for writing tasks.
- Always separate: claim, method, experiment, limitation, relevance.
- No em dashes anywhere.
- Distinguish evidence from speculation explicitly.
```

Mirror the same content in `AGENTS.md` so Codex and Antigravity read identical context.

---

## 5. Key skills (the ones that differ from the obvious)

### /paper-extract
Input: one PDF path. Output: one entry appended to `papers.json` AND one vault note. Strict schema, "not stated" instead of guessing:

```json
{
  "id": "kaufmann-2023-champion",
  "title": "", "authors": [], "year": 2023, "venue": "",
  "doi_or_arxiv": "", "status": "verified",
  "platform": ["drone"],
  "simulator_stack": [],
  "methods": ["method-id", "..."],
  "zero_shot": "zero",
  "observation_space": "", "action_space": "",
  "deployment_compute": "",
  "results_summary": "",
  "limitations_future_work": ["verbatim-adjacent paraphrase 1", "..."],
  "relevance_to_phd": "",
  "pipeline_id": "kaufmann-2023-champion-pipeline"
}
```

### /method-registry
After each extraction batch, recompute `methods.json`. Every method has `usage_count` (how many papers), `papers` (wikilinks), `platforms`, `trend` (rising/stable/fading across 2022 to 2026). Single-use methods stay in the registry with count 1; rare methods are where novelty may live. High counts mark essential pipeline components.

### /pipeline-map
For each paper, the ordered end-to-end pipeline (sim setup, randomization, training algorithm, distillation/adaptation, transfer step, onboard runtime, hardware) written to `pipelines.json` as a stage array, plus a Mermaid `flowchart LR` embedded in the vault note. Stage entries reference method ids, so pipelines are the ground truth for frequency counting.

### /gap-analysis
Cluster all `limitations_future_work` entries across papers. A gap qualifies when it recurs in 3+ papers, is feasible on the hardware above, and points to a novel control model. Output: ranked shortlist of 3 in `gaps.json` plus one recommended direction, justified with the frequency data (which essential methods to keep, which rare or missing piece to build on). Human approval gate before this is treated as decided.

### /experiment-plan
Input: a research question or gap id. Output: a complete `experiments.json` entry per the schema in phd-implementation.md section 2, including baseline, metrics with targets, seeds and trial counts, per-rung pass criteria and a kill condition, all written BEFORE any code. Refuses to emit an entry whose metrics need equipment absent from hardware-map.json.

### /dashboard-sync
Copies the registry into `webapp/public/data/` and runs the build. The React app never has hardcoded content; it renders whatever the registry says. This is what keeps the webapp honest.

### /citation-audit
Before any report section is accepted: every claim maps to a paper id in the registry, every paper id resolves to a verified DOI/arXiv entry. Run NotebookLM spot checks on 10 random claims per section: ask the notebook the same question and compare.

---

## 6. React dashboard spec (webapp/)

Stack: Vite + React + Tailwind + Recharts + react-flow (pipelines) + Fuse.js (search). Static build, data loaded from `public/data/*.json`. Deployable to Vercel free tier for supervisor access.

Pages:

1. **Overview**: corpus stats, papers-per-year timeline, zero/semi/no split, top 10 methods by usage_count, one-paragraph state of the field.
2. **Papers Explorer**: filterable, sortable table (platform, method, zero-shot status, year, venue, simulator). Row click opens a drawer with the full extraction and the pipeline diagram.
3. **Method Frequency**: horizontal bar chart sorted by usage_count with trend badges. Click a bar to see member papers and the synthesis note. This page answers "which methods are essential" at a glance.
4. **Pipeline Gallery**: every paper's pipeline rendered with react-flow. Compare mode: select 2 to 3 papers and view pipelines side by side with shared stages highlighted. This is the page that shows how the field actually builds working systems.
5. **Gap Board**: clustered limitations as cards, recurrence count on each, ranked shortlist of 3, and the recommended direction with its justification.
6. **Hardware Map**: your equipment on the left, methods and planned experiments each item enables on the right (from `hardware-map.json`). Shows examiners the practical grounding.
7. **Knowledge Graph**: link out to (or iframe) the Understand-Anything dashboard generated from the vault.
8. **Experiments**: every experiments.json entry as a card showing its state on the ladder (planned to reported), linked RQ and gap, metrics with targets vs measured, and latest result summary. Gives supervisors live implementation progress next to the literature progress.

Build workflow: Claude Code scaffolds and writes generators; Codex implements pages against this spec and reviews Claude's code; Antigravity browser-tests every page, screenshots each state, and files fix tasks. Loop until the Antigravity walkthrough passes clean.

---

## 7. Hardware map (registry seed)

| Item | Role in the research |
|---|---|
| RTX A4000 + 7800X3D workstation | GPU-parallel training: Isaac Lab, Aerial Gym, thousands of parallel drone envs |
| Jetson Orin Nano | Onboard inference target; TensorRT latency benchmarks; the deployment constraint every candidate method is filtered against |
| X500 V2 + Pixhawk 6X | Primary real-world platform; PX4 offboard, XRCE-DDS to ROS 2 Humble |
| DJI RoboMaster EP | Cross-platform validation (ground + arm); latency-aware transfer experiments under real 80 to 120 ms Wi-Fi delay |
| Meta Quest 3 | Immersive telemetry/visualization; optional WebXR view of the knowledge graph or flight replays |
| Bambu H2C + 40W laser | Custom mounts, Jetson carrier, propeller guards, tethered test rigs |
| Budget headroom | Flagged purchases as gaps demand: e.g. safety tether/net, spare frames, motion-capture alternative (AprilTag rig, laser-cut) |

---

## 8. Execution order

```
Literature track                      Implementation track (parallel)
Phase 0  Setup    repo, CLAUDE.md,    I1  Infrastructure (wk 1-3)
                  skills, agents,         WSL2/CUDA, Isaac Lab,
                  install plugin          Aerial Gym, PX4 SITL +
Phase 1  Corpus   /corpus-search +        ROS 2 + XRCE-DDS, Jetson
                  NotebookLM discovery    flash + TensorRT, bench
                  >>> GATE 1: approve     bring-up (no props)
                  the ~50-paper list  I2  Baseline repro (wk 3-6)
Phase 2  Extract  batches of 5 to 10,     train 3 seeds, ONNX ->
                  /method-registry +      TensorRT, Orin latency
                  /pipeline-map,          benchmark, SITL, HITL,
                  NotebookLM verify       tethered flight
Phase 3  Analyze  /gap-analysis           >>> feeds Gate 2 feasibility
                  >>> GATE 2: direction I3  Pilot (wk 7-9, post-Gate 2)
                  + pilot spec            minimum viable experiment
Phase 4  Views    /vault-build, graph,    on the selected gap; result
                  /dashboard-sync,        (positive or negative) goes
                  Codex + Antigravity     to report Ch. 4
Phase 5  Writing  per phd-transfer-report.md: spine -> Ch. 2 (from wk 4)
                  -> Ch. 3-5 -> cold review x2 -> /citation-audit
                  >>> GATE 3: sign-off
```

Phases 2 to 4 loop as new papers appear; the registry makes updates cheap. Details of I1 to I3, the flight ladder and the risk register: docs/phd-implementation.md.

---

## 9. First commands to run

```bash
# in WSL2 Ubuntu
mkdir -p ~/phd-zeroshot-uav && cd ~/phd-zeroshot-uav
git init
# add CLAUDE.md, .claude/skills/, .claude/agents/ per this document
claude
/plugin marketplace add Egonex-AI/Understand-Anything
/plugin install understand-anything
```

Then feed Claude Code the literature review command file (sim2real-litreview-command.md) as the Phase 1 to 3 task brief. It already encodes the 50-paper, 2022+, frequency-counted, pipeline-per-paper methodology; this architecture is the environment it runs inside. In the same week, start I1 from docs/phd-implementation.md; the two tracks share nothing until Gate 2, so neither blocks the other.
