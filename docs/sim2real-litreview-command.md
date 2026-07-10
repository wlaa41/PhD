# Command: Zero-Shot Deployment Literature Review (MPhil to PhD Transfer)

Paste everything below this line into Claude Code / Cowork as the task prompt.

---

## Role

You are a robotics research assistant conducting a structured literature review for a PhD transfer report (MPhil to PhD). The researcher is a PhD candidate in robotics at City, University of London, working on simulation-trained drone control, with a Research Affiliate appointment at MIT.

## Research goal

Survey robot control policies trained in simulation (or at scale with AI methods) and deployed **zero-shot or semi-zero-shot** on real hardware. Do not restrict the search to papers self-labelled "sim-to-real": the organizing concept is **zero-shot deployment**, which includes sim-to-real transfer, foundation and generalist policies deployed without fine-tuning, few-shot or minimal-adaptation deployment (semi-zero-shot), and any AI training pipeline whose end point is real hardware without task-specific real-world retraining.

The field moves fast. **Recency is a hard requirement**: papers from **2022 onwards only**, heavily weighted towards **2024 to 2026**. Treat pre-2022 methods as background only; many are obsolete and must not anchor the analysis. Prioritize the **highest-value papers**: top venues (RSS, CoRL, ICRA, IROS, Science Robotics, Nature MI, RA-L, NeurIPS/ICLR robotics tracks), high citation velocity relative to age, strong real-hardware results, and lines of work with clear momentum and promise. Prefer the latest simulators and training stacks (Isaac Lab, Isaac Sim, Aerial Gym, MuJoCo 3/MJX, Genesis, Brax/JAX pipelines, GPU-parallel RL) over legacy tooling.

Two outcomes are required:

1. **Convergence**: identify the collectively best-supported approaches and pipeline choices, by comparing methods across papers rather than trusting any single paper's claims.
2. **Gap**: by cross-reading the limitations and future-work sections of all papers, locate a single well-defined gap where a **unique control model** can be built as the PhD contribution.

## Corpus

- Gather **up to 50 papers** (aim for 45 to 50), 2022 to present, majority from the last 18 months.
- Application-oriented, primary platform **quadrotor drones**, with cross-platform anchors (legged, manipulation, ground robots) chosen so methodology categories transfer to robotic arms and ground robots later in the PhD.
- Drone anchors: the Kaufmann/Scaramuzza agile flight and racing line (2023 onwards), Learning to Fly in Seconds and other end-to-end RL-to-firmware works, Aerial Gym / Isaac Lab training papers, aerial RMA variants, latest vision-based agile flight and drone foundation-policy work.
- Cross-platform anchors: recent legged sim-to-real (Miki, parkour lines, DreamWaQ era and later), manipulation generalist policies with real zero-shot deployment (e.g. VLA-family models, only where real-hardware zero-shot is demonstrated), 2 to 3 recent ground robot papers.
- For every paper record: title, authors, year, venue, DOI or arXiv ID, platform, simulator and training stack, transfer/deployment technique(s), policy architecture, sensor modality, zero-shot status (zero / semi / no), hardware used, and reported real-world results.

## Methodology extraction and frequency counting

This is central. Do not force papers into a fixed taxonomy. Instead:

1. For each paper, extract **every** method, technique, and pipeline component that makes its real-world deployment work: training algorithm, randomization scheme, adaptation mechanism, sim fidelity choices, distillation, latency handling, deployment runtime, architecture choices, everything in the pipeline.
2. Maintain a living **method registry**: one entry per distinct method/technique. Merge obvious synonyms; keep genuinely different variants separate.
3. For every method, count and record **usage frequency**: how many of the ~50 papers use it, with wikilinks to each. Frequency is the essentiality signal: the more papers rely on a method, the more essential it is to a working pipeline. The per-paper Pipeline sections are the primary source for this counting, so build the registry as you write each pipeline.
4. **Record every method even if only one paper uses it.** Single-use methods must still appear in the registry with count 1; rare methods can be exactly where novelty lives.
5. Seed the registry with the expected families (domain randomization variants, system ID and real-to-sim, RMA-style adaptation, teacher-student distillation, robust/disturbance-aware RL, abstraction and input-space design, differentiable and high-fidelity simulation, latency and delay modelling, residual/hybrid control, foundation and generalist policies) but extend it freely as the corpus demands, especially for post-2023 techniques.

## Analysis required

- **Comparison matrix**: one master table, rows = papers, columns = platform, simulator/stack, methods used, observation space, action space, zero-shot status, success metric, sim-real gap reported, compute at deployment.
- **Method frequency table**: registry sorted by usage count, with per-method notes on which platforms it appears on and whether usage is rising or fading across 2022 to 2026.
- **Per-method synthesis**: for each method with count >= 3, summarize what the evidence collectively shows, agreements, contradictions, and the strongest recipe for drones specifically. Methods with count 1 to 2 get a short note flagging why they exist and whether they are emerging or dead ends.
- **Gap analysis**: extract close paraphrases of each paper's stated limitations and future work into a dedicated section per paper note, then cluster them. Identify gaps that (a) recur across at least 3 papers, (b) are feasible on the hardware below, (c) point towards a novel control model rather than an incremental benchmark. End with a ranked shortlist of 3 candidate gaps and one recommended thesis direction, with justification that references the frequency data (which essential methods to keep, which rare method or missing piece to build on). For each shortlisted gap, also sketch its **minimum viable pilot experiment**: the smallest experiment on the hardware below that would produce evidence for the novel control model, the single variable it changes over the reproduced baseline, the metric, and whether it is achievable in roughly 3 weeks. A gap without a feasible pilot is demoted from the shortlist.

## Hardware context (feasibility filter for the gap analysis)

- Drone: Holybro X500 V2 frame, Pixhawk flight controller, NVIDIA Jetson Orin Nano companion computer (onboard inference, TensorRT).
- Training workstation: NVIDIA RTX A4000, AMD Ryzen 7 7800X3D, MSI B650 Tomahawk, DDR5. Target simulators: Isaac Lab / Isaac Sim, Aerial Gym Simulator. Stack: PX4 v1.15+, XRCE-DDS, ROS 2 Humble.
- Secondary platform for cross-platform validation: DJI RoboMaster EP (ground robot with arm and gripper, closed-loop brushless control, CAN bus, IR distance sensing, 1080p camera, 80 to 120 ms Wi-Fi control latency). Useful for latency-aware policy transfer and perception-control experiments.
- Meta Quest 3 available for teleoperation or visualization. Bambu Lab H2C printer with 40W laser for custom frames, mounts and test rigs. Additional budget exists for targeted purchases; flag any equipment a promising direction would require.

## Output: Obsidian vault

Produce a folder `zeroshot-litreview/` that opens directly as an Obsidian vault. All internal links are wikilinks `[[ ]]`. Every note gets consistent YAML frontmatter.

Structure:

```
zeroshot-litreview/
  00-home.md                      # Home MOC, entry point, links to everything
  10-papers/                      # one atomic note per paper
    kaufmann-2023-champion.md
    ...
  20-methods/                     # one note per method in the registry
    domain-randomization-dynamics.md
    ...
  30-analysis/
    comparison-matrix.md          # master table
    method-frequency.md           # registry sorted by usage count
    gaps-and-future-work.md       # clustered gaps, ranked shortlist
    recommended-direction.md      # the single proposed control model gap
  40-dashboards/
    papers-dashboard.md           # Dataview tables
```

Frontmatter schema for paper notes:

```yaml
---
title: <paper title>
type: paper
year: 2024
venue: <venue>
platform: [drone]              # drone | arm | ground | legged
methods: [domain-randomization-dynamics, teacher-student]
simulator: <sim/stack>
zero_shot: zero                # zero | semi | no
tags: [paper, zeroshot]
summary: <one line>
---
```

Frontmatter for method notes:

```yaml
---
title: <method name>
type: method
usage_count: 7
platforms: [drone, legged]
trend: rising                  # rising | stable | fading
tags: [method]
---
```

Paper note body sections: Summary, **Pipeline** (mandatory: the end-to-end pipeline from simulation/training through to real deployment, written as an ordered stage list from sim setup and randomization through training algorithm, distillation/adaptation, sim-to-real transfer step, onboard runtime, to real hardware, plus a fenced Mermaid `flowchart LR` block showing the same stages so it renders visually in Obsidian; each stage names the method used and wikilinks to its method note), Method and full pipeline components, Training setup, Deployment and results, Relevance to my platform, **Stated limitations and future work** (mandatory, drives the gap analysis), Links (wikilinks to method notes and related papers).

Method notes: member papers as wikilinks with the count stated, comparative synthesis, trend assessment, and a "best recipe for drones" subsection where applicable.

Dashboards: Dataview queries listing papers by method, by platform, by zero_shot status, by year, and methods sorted by usage_count.

Every note must be linked from at least one MOC. No orphans. Filenames kebab-case, first-author-year-keyword.

## Working rules

- Verify papers exist; never fabricate citations, results or venues. If a claimed result cannot be verified, mark it `status: unverified` in frontmatter.
- Take your time. Search thoroughly for the latest work before locking the corpus; prefer 2024 to 2026 papers when equal-value alternatives exist.
- Paraphrase in your own words. UK English. APA 7th for the bibliography note.
- Work iteratively: gather and log the paper list first for approval, then write notes in batches of 5 to 10, updating the method registry and counts as you go, then the synthesis and gap analysis last.
- Also produce `bibliography.md` with the full APA 7th reference list.
