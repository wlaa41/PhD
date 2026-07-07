# Corpus Acquisition Manifest
## Standalone task brief: download and stage the candidate papers

This file is SELF-CONTAINED. Hand it to any module, session or agent and it can do the whole job without reading anything else. It supersets `corpus-candidates.md` (the ranked triage list): every paper there appears here, NOTHING is ever removed, plus institutional additions (A-block), Chinese-institution additions (C-block), fresh 2026 additions (F-block) and lab-sweep directives. New papers found here flow into `candidates.json` at Phase 1.

Updated: 2026-07-07 (v2: point-breakdown and citation columns, C-block, F-block) · Owner: acquisition module (S3) · Human gate: none here, but nothing is corpus-final until Gate 1.

---

## 1. How selection points are earned (so every score is justified)

Total score = R + H + Z + V + A, shown per paper in the Points column:

| Component | Points | Rule |
|---|---|---|
| R · Recency | 25 / 20 / 12 / 6 | 2025-26 = 25 · 2024 = 20 · 2023 = 12 · 2022 = 6 |
| H · Real-hardware evidence | 25 / 15 / 5 / 0 | strong (many flights/platforms/out-of-lab) / moderate / weak / none |
| Z · Zero-shot status | 20 / 12 / 0 | zero / semi / no |
| V · Venue tier + citation velocity | 0-15 | Nature, Science Robotics = 15 · RSS, CoRL, ICRA, IROS, RA-L = 8-12 · arXiv-only = up to 8, raised at S2 once citations are fetched |
| A · Platform relevance | 0-15 | drone = 15 · ground anchor = 10-12 · legged/humanoid anchor = 6-8 · stack = per use |

**Citations (Cites column)**: left as `S2` and filled by the module at step 10 below, because citation counts must be fetched, not remembered. For 2025-26 papers LOW COUNTS ARE EXPECTED and must not reduce V; judge those by the strength signals instead (the user's standing rule):

LAB reputable lab/institution with a sustained line · CHAMP competition win or landmark demo · HW strong hardware evidence · CODE open code + checkpoints · VENUE top venue · ADOPT stack/benchmark adoption · LINE research-line momentum · FRESH 2025-26, judge by LAB+VENUE+HW not citations.

---

## 2. Instructions for the acquisition module (follow exactly)

1. **Target folder**: `docs/literature/pdfs/` in the repo `phd-zeroshot-uav`. If the repo does not exist yet, create `pdfs/` NEXT TO THIS FILE and log that it must move at Phase 0.
2. **Filename = paper id, exactly**: `{paper-id}.pdf`, kebab-case as in the tables. The repo, NotebookLM, registry, vault and webapp all join on this key.
3. **Verify BEFORE downloading**: landing-page title and first author must match the row. IDs marked `*` are best-effort from model knowledge and MUST be confirmed. Wrong ID: do NOT download; search the exact title on arXiv + Semantic Scholar, correct the row, log the correction.
4. **Source priority chain**, stop at first success: (1) `https://arxiv.org/pdf/{id}` (2) `https://arxiv.org/abs/{id}` → PDF (3) `https://doi.org/{doi}` (4) author/lab page, search `"{exact title}" filetype:pdf` (5) Semantic Scholar open-access link (6) paywalled: STOP, mark `unavailable-pending-proxy`; the researcher fetches it via the university proxy in their own logged-in browser. NEVER ask for, store or use credentials.
5. **Log everything** to `acquisition-log.md`: `{paper-id} | {date} | {source} | {ok / corrected-id / unavailable-pending-proxy / not-found} | {note}`.
6. **Integrity check**: PDF opens, >4 pages, title page matches the row.
7. **Never fabricate**: unfindable paper = `not-found` + what was searched. Never substitute a similar paper silently.
8. **Do not touch** any registry file. PDFs and logs only.
9. **Institution check**: rows saying `(confirm inst)` — read the PDF first page and write the real affiliation into the row.
10. **Fetch citations** (fills the Cites column): for each arXiv paper call
    `https://api.semanticscholar.org/graph/v1/paper/arXiv:{id}?fields=title,year,citationCount,influentialCitationCount`
    (for DOI entries use `.../paper/DOI:{doi}?fields=...`). Write into the Cites column as `raw/influential` (e.g. `412/57`). Add cites-per-month = citationCount ÷ months since publication to the log. Rate-limit: 1 request/second; on HTTP 429 wait 30 s. Remember: a 2026 paper with 3 citations is NOT weak (FRESH rule).
11. **When done**: report counts (ok / corrected / pending-proxy / not-found), the filled Cites column, and stop. NotebookLM upload is the researcher's manual step.

---

## 3. Main list (nothing removed)

Status: `web-verified` = adversarially verified with quotes · `web-found` = ID confirmed to resolve · `knowledge*` = confirm ID first.

### Drones (primary platform)

| # | paper-id | Paper · institution | Year · Venue | Get it | Points R+H+Z+V+A | Strength | Cites | Status |
|---|---|---|---|---|---|---|---|---|
| 1 | miao-2025-falcongym | FalconGym, zero-shot vision gate-crossing via NeRF · UIUC | 2025 · IROS | https://arxiv.org/pdf/2503.02198 | 25+25+20+10+15 = 95 | HW FRESH VENUE | S2 | web-found |
| 2 | raptor-2025-foundation | RAPTOR: 2,084-param foundation policy, 10 real quadrotors · (confirm inst) | 2025 · arXiv | https://arxiv.org/pdf/2509.11481 | 25+25+20+8+15 = 93 | HW FRESH LINE | S2 | web-found |
| 3 | bahnam-2026-monorace | MonoRace: monocular champion racing, won A2RL 2025 · TU Delft MAVLab | 2026 · arXiv | https://arxiv.org/pdf/2601.15222 | 25+25+20+8+15 = 93 | CHAMP LAB HW FRESH LINE | S2 | web-verified |
| 4 | eschmann-2024-fly-seconds | Learning to Fly in Seconds, RL-to-firmware · NYU ARPL | 2024 · RA-L | https://arxiv.org/pdf/2311.13081 | 20+25+20+12+15 = 92 | LAB CODE HW VENUE | S2 | web-found |
| 5 | geles-2024-pixels-no-state | Agile Flight from Pixels without State Estimation · UZH-RPG | 2024 · RSS | https://arxiv.org/abs/2406.12505 * | 20+25+20+10+15 = 90 | LAB VENUE LINE | S2 | knowledge* |
| 6 | simpleflight-2024-what-matters | What Matters in Zero-Shot Sim-to-Real Quadrotor RL · Tsinghua | 2024 · arXiv | https://arxiv.org/pdf/2412.11764 | 20+25+20+8+15 = 88 | LAB CODE HW ADOPT | S2 | web-found |
| 7 | kulkarni-2025-aerialgym | Aerial Gym Simulator + zero-shot depth navigation · NTNU-ARL | 2025 · arXiv | https://arxiv.org/pdf/2503.01471 | 25+15+20+8+15 = 83 | ADOPT CODE FRESH | S2 | web-found |
| 8 | huang-2023-datt | DATT: Deep Adaptive Trajectory Tracking · UW | 2023 · CoRL | https://arxiv.org/abs/2310.09053 * | 12+25+20+10+15 = 82 | VENUE CODE | S2 | knowledge* |
| 9 | zhang-2023-one-controller | One Near-Hover Controller for Vastly Different Quadcopters · Berkeley HiPeRLab | 2023 · ICRA | https://arxiv.org/abs/2209.09232 * | 12+25+20+10+15 = 82 | LAB HW | S2 | knowledge* |
| 10 | kaufmann-2023-swift | Swift: champion drone racing, SEMI-zero-shot · UZH-RPG | 2023 · Nature | https://doi.org/10.1038/s41586-023-06419-4 (open: PMC10468397) | 12+25+12+15+15 = 79 | CHAMP LAB VENUE LINE | S2 | web-verified 3-0 |
| 11 | song-2023-limit-racing | Reaching the Limit in Autonomous Racing: OC vs RL · UZH-RPG | 2023 · Sci. Robotics | https://arxiv.org/abs/2310.10943 * | 12+25+12+15+15 = 79 | LAB VENUE LINE | S2 | knowledge* |
| 12 | xing-2024-bootstrap-vision | Bootstrapping RL with Imitation, Vision-Based Agile Flight · UZH-RPG | 2024 · CoRL | https://arxiv.org/abs/2403.12203 * | 20+15+20+10+15 = 80 | LAB VENUE | S2 | knowledge* |
| 13 | oconnell-2022-neural-fly | Neural-Fly: rapid adaptation in wind · Caltech CAST | 2022 · Sci. Robotics | https://doi.org/10.1126/scirobotics.abm6597 | 6+25+12+15+15 = 73 | LAB VENUE HW | S2 | knowledge (DOI solid) |
| 14 | ferede-2024-time-optimal | Time-optimal quadcopter flight, end-to-end RL · TU Delft MAVLab | 2024 · arXiv | https://arxiv.org/abs/2311.16948 * | 20+15+20+8+15 = 78 | LAB LINE | S2 | knowledge* |
| 15 | romero-2024-ac-mpc | Actor-Critic Model Predictive Control · UZH-RPG | 2024 · ICRA | https://arxiv.org/abs/2306.09852 * | 20+15+12+8+15 = 70 | LAB VENUE | S2 | knowledge* |

### Cross-platform anchors

| # | paper-id | Paper · institution | Year · Venue | Get it | Points R+H+Z+V+A | Strength | Cites | Status |
|---|---|---|---|---|---|---|---|---|
| 16 | he-2025-attention-legged | Attention-Based Map Encoding for Legged Locomotion · ETH-RSL | 2025 · Sci. Robotics | https://arxiv.org/pdf/2506.09588 | 25+25+20+15+8 = 93 | LAB VENUE HW FRESH | S2 | web-found |
| 17 | han-2025-wheeledlab | Wheeled Lab: Isaac Lab to low-cost wheeled robots · UW | 2025 · CoRL | https://arxiv.org/pdf/2502.07380 | 25+25+20+10+12 = 92 | CODE ADOPT FRESH | S2 | web-found |
| 18 | hoeller-2024-anymal-parkour | ANYmal Parkour · ETH-RSL | 2024 · Sci. Robotics | https://arxiv.org/pdf/2306.14874 | 20+25+20+15+8 = 88 | LAB VENUE HW LINE | S2 | web-found |
| 19 | radosavovic-2024-humanoid | Real-World Humanoid Locomotion with RL · Berkeley | 2024 · Sci. Robotics | https://arxiv.org/abs/2303.03381 * | 20+25+20+15+8 = 88 | LAB VENUE HW | S2 | knowledge* |
| 20 | haarnoja-2024-soccer | Agile Soccer Skills, Bipedal Robot · DeepMind | 2024 · Sci. Robotics | https://arxiv.org/abs/2304.13653 * | 20+25+20+15+6 = 86 | LAB VENUE HW | S2 | knowledge* |
| 21 | jenelten-2024-dtc | DTC: Deep Tracking Control · ETH-RSL | 2024 · Sci. Robotics | https://arxiv.org/abs/2309.15462 * | 20+25+20+11+8 = 84 | LAB VENUE | S2 | knowledge* |
| 22 | cheng-2024-extreme-parkour | Extreme Parkour with Legged Robots · CMU (Pathak) | 2024 · ICRA | https://arxiv.org/pdf/2309.14341 | 20+25+20+10+8 = 83 | LAB HW CODE LINE | S2 | web-found |
| 23 | hover-2024-humanoid | HOVER: whole-body humanoid controller · NVIDIA GEAR | 2024 · arXiv | https://arxiv.org/abs/2410.21229 * | 20+25+20+10+8 = 83 | LAB LINE | S2 | knowledge* |
| 24 | he-2025-asap | ASAP: Aligning Sim and Real Physics · CMU LeCAR + NVIDIA | 2025 · arXiv | https://arxiv.org/abs/2502.01143 * | 25+25+12+10+8 = 80 | LAB FRESH LINE | S2 | knowledge* |
| 25 | handa-2023-dextreme | DeXtreme: in-hand manipulation sim-to-real · NVIDIA | 2023 · ICRA | https://arxiv.org/abs/2210.13702 * | 12+25+20+12+10 = 79 | LAB HW | S2 | knowledge* |
| 26 | zhuang-2023-parkour | Robot Parkour Learning · Shanghai Qi Zhi + Stanford | 2023 · CoRL | https://arxiv.org/pdf/2309.05665 | 12+25+20+12+8 = 77 | LAB VENUE CODE LINE | S2 | web-found |
| 27 | ma-2024-dreureka | DrEureka: LLM-designed rewards + DR · UPenn + NVIDIA | 2024 · RSS | https://arxiv.org/pdf/2406.01967 | 20+15+20+12+8 = 75 | LAB VENUE CODE | S2 | web-found |
| 28 | nahrendra-2023-dreamwaq | DreamWaQ, zero-shot on Unitree A1 · KAIST URL | 2023 · ICRA | https://arxiv.org/pdf/2301.10602 | 12+25+20+10+8 = 75 | LAB HW LINE | S2 | web-found |
| 29 | miki-2022-wild | Perceptive Locomotion in the Wild · ETH-RSL | 2022 · Sci. Robotics | https://arxiv.org/pdf/2201.08117 | 6+25+20+15+8 = 74 | LAB VENUE HW LINE | S2 | knowledge (ID solid) |
| 30 | margolis-2022-walk-these-ways | Walk These Ways · MIT Improbable AI | 2022 · CoRL | https://arxiv.org/abs/2212.03238 * | 6+25+20+12+8 = 71 | LAB CODE ADOPT | S2 | knowledge* |
| 31 | agarwal-2022-egocentric | Legged Locomotion via Egocentric Vision · CMU (Pathak) | 2022 · CoRL | https://arxiv.org/abs/2211.07638 * | 6+25+20+12+8 = 71 | LAB VENUE LINE | S2 | knowledge* |

### Stacks and boundary anchors

| # | paper-id | Paper · institution | Year | Get it | Points | Strength | Cites | Status |
|---|---|---|---|---|---|---|---|---|
| 32 | zakka-2025-mjx-playground | MuJoCo Playground · DeepMind + Berkeley | 2025 | https://arxiv.org/pdf/2502.08844 | 25+15+20+8+10 = 78 | ADOPT CODE FRESH | S2 | web-found |
| 33 | mittal-2025-isaaclab | Isaac Lab · NVIDIA + ETH | 2025 | https://arxiv.org/pdf/2511.04831 | 25+5+0+10+12 = 52 | ADOPT FRESH | S2 | web-found |
| 34 | omnidrones-2024 | OmniDrones: GPU-parallel drone RL · Tsinghua | 2024 | https://arxiv.org/abs/2309.12825 * | 20+5+0+10+15 = 50 | ADOPT CODE | S2 | knowledge* |
| 35 | black-2024-pi0 | pi-0 VLA (boundary: real-data-trained) · Physical Intelligence | 2024 | https://arxiv.org/pdf/2410.24164 | 20+25+0+10+6 = 61 | LAB LINE | S2 | web-found |
| 36 | pi05-2025 | pi-0.5 open-world (boundary) · Physical Intelligence | 2025 | https://arxiv.org/pdf/2504.16054 | 25+25+0+10+6 = 66 | LAB FRESH LINE | S2 | web-found |
| 37 | nvidia-2025-groot | GR00T N1 humanoid VLA (boundary) · NVIDIA | 2025 | https://arxiv.org/pdf/2503.14734 | 25+15+0+10+6 = 56 | LAB FRESH | S2 | web-found |

## 4. A-block: institutional additions (2026-07-07)

| # | paper-id | Paper · institution | Year · Venue | Get it | Points | Strength | Cites | Status |
|---|---|---|---|---|---|---|---|---|
| A1 | ji-2023-dribblebot | DribbleBot: soccer dribbling sim-to-real · MIT Improbable AI | 2023 · ICRA | https://arxiv.org/abs/2304.01159 * | 12+25+20+10+8 = 75 | LAB HW CODE | S2 | knowledge* |
| A2 | he-2024-agile-but-safe | Agile But Safe: collision-free high-speed locomotion · CMU LeCAR | 2024 · RSS | https://arxiv.org/abs/2401.17583 * | 20+25+20+12+8 = 85 | LAB VENUE HW | S2 | knowledge* |
| A3 | fu-2022-whole-body | Deep Whole-Body Control: legs + arm, one policy · CMU (Pathak) | 2022 · CoRL | https://arxiv.org/abs/2210.10044 * | 6+25+20+12+10 = 73 | LAB VENUE LINE | S2 | knowledge* |
| A4 | fu-2024-humanplus | HumanPlus: humanoid shadowing + sim RL base · Stanford | 2024 · CoRL | https://arxiv.org/abs/2406.10454 * | 20+25+12+12+6 = 75 | LAB VENUE FRESH | S2 | knowledge* |
| A5 | radosavovic-2024-next-token | Humanoid Locomotion as Next Token Prediction · Berkeley | 2024 · arXiv | https://arxiv.org/abs/2402.19469 * | 20+25+12+8+6 = 71 | LAB FRESH | S2 | knowledge* |
| A6 | barkour-2023 | Barkour: agile quadruped benchmark · Google DeepMind | 2023 · arXiv | https://arxiv.org/abs/2305.14654 * | 12+25+20+8+8 = 73 | LAB ADOPT HW | S2 | knowledge* |
| A7 | zhou-2022-swarm | Swarm of micro flying robots in the wild (classical baseline) · Zhejiang FAST-Lab | 2022 · Sci. Robotics | https://doi.org/10.1126/scirobotics.abm5954 * | 6+25+0+15+10 = 56 | LAB VENUE HW | S2 | knowledge* |
| A8 | dm-2022-table-tennis | i-Sim2Real: table tennis with humans · Google DeepMind | 2022 · CoRL | https://arxiv.org/abs/2207.06572 * | 6+25+12+12+6 = 61 | LAB VENUE | S2 | knowledge* |
| A9 | chen-2023-visual-dexterity | Visual Dexterity (promoted from reserves) · MIT | 2023 · Sci. Robotics | https://arxiv.org/abs/2211.11744 * | 12+25+20+15+8 = 80 | LAB VENUE HW | S2 | knowledge* |

## 5. C-block: Chinese-institution additions (2026-07-07, per user directive)

China's top robotics groups (Tsinghua, SJTU, Shanghai AI Laboratory, Shanghai Qi Zhi, Zhejiang FAST-Lab, PKU, Fudan, HKUST) publish heavily in exactly this space and are underrepresented in Western citation graphs; LAB weight applies. Already in the main list from Chinese institutions: SimpleFlight and OmniDrones (Tsinghua), Robot Parkour Learning (Shanghai Qi Zhi), Zhou swarm (Zhejiang). These ADD:

| # | paper-id | Paper · institution | Year · Venue | Get it | Points | Strength | Cites | Status |
|---|---|---|---|---|---|---|---|---|
| C1 | e2e-fly-2026 | E2E-Fly: integrated training-to-deployment for end-to-end quadrotor autonomy · SJTU (Danping Zou group; confirm on PDF) | 2026 · arXiv | https://arxiv.org/pdf/2604.12916 | 25+25+20+8+15 = 93 | LAB HW FRESH | S2 | web-found |
| C2 | zhang-2025-diffphys-flight | Vision-based agile flight via differentiable physics · SJTU + Shanghai Qi Zhi | 2024/25 · NMI | https://arxiv.org/abs/2407.10648 * | 25+15+20+15+15 = 90 | LAB VENUE FRESH | S2 | knowledge* |
| C3 | long-2024-him | HIM: Hybrid Internal Model for agile legged locomotion · Shanghai AI Lab + SJTU | 2024 · ICLR | https://arxiv.org/abs/2312.11460 * | 20+25+20+12+8 = 85 | LAB VENUE CODE | S2 | knowledge* |
| C4 | host-2025-standup | HoST: humanoid standing-up control across postures · Shanghai AI Lab (confirm inst) | 2025 · arXiv | https://arxiv.org/abs/2502.08378 * | 25+25+20+8+6 = 84 | LAB HW FRESH | S2 | knowledge* |
| C5 | gu-2024-humanoid-gym | Humanoid-Gym: RL with zero-shot sim2real (Unitree H1) · SJTU + Shanghai Qi Zhi | 2024 · arXiv | https://arxiv.org/pdf/2404.05695 | 20+15+20+8+8 = 71 | LAB CODE ADOPT | S2 | web-found |
| C6 | worldmodel-quad-2026 | Generalization of World Models under Environmental Variability for Vision-based Quadrotor Navigation · (confirm inst) | 2026 · arXiv | https://arxiv.org/abs/2606.05015 | 25+15+20+8+15 = 83 | FRESH | S2 | web-found |
| C7 | visfly-2024 | VisFly: differentiable visual flight simulator · Fudan (confirm inst) | 2024 · arXiv | https://arxiv.org/abs/2407.14783 * | 20+5+0+8+15 = 48 | ADOPT | S2 | knowledge* |

## 6. F-block: fresh 2026 additions (found by web search 2026-07-07; per user directive that 2026 matters)

| # | paper-id | Paper · institution | Year · Venue | Get it | Points | Strength | Cites | Status |
|---|---|---|---|---|---|---|---|---|
| F1 | rao-2026-skyjepa | SkyJEPA: long-horizon world models for zero-shot sim-to-real quadrotor control · Berkeley + NYU (LeCun, Loianno) + Brown | 2026 · arXiv | https://arxiv.org/pdf/2606.23444 | 25+15+20+8+15 = 83 | LAB FRESH LINE | S2 | web-found |
| F2 | racing-marl-2026 | Superhuman Safe and Agile Racing through Multi-Agent RL · (confirm inst) | 2026 · arXiv | https://arxiv.org/pdf/2605.22748 | 25+15+20+8+15 = 83 | CHAMP? FRESH | S2 | web-found |
| F3 | bridging-agile-2026 | Bridging Performance and Generalization in RL for Agile Flight · (confirm inst) | 2026 · arXiv | https://arxiv.org/pdf/2606.27348 | 25+15+20+8+15 = 83 | FRESH | S2 | web-found |
| F4 | wholebody-parkour-2026 | Deep Whole-body Parkour · (confirm inst) | 2026 · arXiv | https://arxiv.org/pdf/2601.07701 | 25+15+20+8+8 = 76 | FRESH LINE | S2 | web-found |
| F5 | adapt-2026 | ADAPT: analytical disturbance-aware policy training, humanoid · (confirm inst) | 2026 · arXiv | https://arxiv.org/pdf/2606.16542 | 25+15+20+8+6 = 74 | FRESH | S2 | web-found |
| F6 | psi0-2026 | Psi-0: open foundation model for humanoid loco-manipulation · (confirm inst) | 2026 · RSS | https://arxiv.org/abs/2603.12263 | 25+15+12+12+6 = 70 | VENUE FRESH | S2 | web-found |

F2-F6 institutions unknown until step 9 runs; several may also satisfy the C-block directive: check affiliations and tag accordingly.

## 7. Reserves (download only on unavailability or request)

| paper-id | Paper | Get it | Cites | Status |
|---|---|---|---|---|
| kim-2024-openvla | OpenVLA (boundary example) | https://arxiv.org/pdf/2406.09246 | S2 | web-found |
| octo-2024 | Octo generalist policy (boundary) | https://arxiv.org/pdf/2405.12213 | S2 | web-found |
| smolvla-2025 | SmolVLA | https://arxiv.org/pdf/2506.01844 | S2 | web-found |
| da-2025-survey | Sim-to-Real RL survey with foundation models | https://arxiv.org/pdf/2502.13187 | S2 | web-found |
| unknown-2025-survey | Sim-to-real survey, Oct 2025 (IDENTIFY TITLE FIRST) | https://arxiv.org/abs/2510.20808 | S2 | web-found (identify) |
| kumar-2022-rma-bipedal | Adapting RMA for bipedal robots | https://arxiv.org/abs/2205.15299 * | S2 | knowledge* |
| margolis-2022-rapid | Rapid Locomotion via RL · MIT | https://arxiv.org/abs/2205.02824 * | S2 | knowledge* |
| saviolo-2023-quad-dynamics | Saviolo/Loianno learned quadrotor dynamics line · NYU | RESOLVE TITLE + ID FIRST | S2 | knowledge (identify) |
| genesis-2024 | Genesis physics engine (stack) | RESOLVE ID FIRST | S2 | knowledge (identify) |
| slim-2025 | SLIM: sim-to-real legged instructive manipulation | https://arxiv.org/pdf/2501.09905 | S2 | web-found |
| physhsi-2025 | PhysHSI: humanoid-scene interaction (confirm inst; likely Shanghai AI Lab) | https://arxiv.org/pdf/2510.11072 | S2 | web-found |

## 8. Lab-sweep directives (scout, Phase 1: search these; do not invent)

1. **Chinese institutions, 2026 emphasis**: arXiv listings Jan-Jul 2026 (`2601`-`2607`) for Tsinghua TSAIL/IIIS, SJTU (Danping Zou, Weinan Zhang groups), Shanghai AI Laboratory, Shanghai Qi Zhi, Zhejiang FAST-Lab (Fei Gao), HKUST Aerial Robotics (Shaojie Shen), PKU, Fudan. Queries: `site:arxiv.org 2606 quadrotor sim-to-real`, `"Shanghai AI Laboratory" zero-shot 2026`, `FAST-Lab learning agile flight 2026`.
2. **Tel Aviv University + Technion**: "sim-to-real" / "zero-shot" + drone/UAV/quadrotor, 2022-2026; aerial autonomy and cognitive robotics groups.
3. **MIT**: AERA (Karaman) learned control 2024-26; Improbable AI newest lines.
4. **Stanford**: IRIS (Finn) and REAL lines where policies are sim-trained and hardware-deployed.
5. **UK labs** (viva relevance): Imperial Aerial Robotics, Oxford ORI, Edinburgh, Bristol Flight Lab, 2022-2026.
6. **UZH-RPG + TU Delft MAVLab 2025-26**: entries postdating the racing/agile lines above.

## 9. Completion checklist for the acquisition module

- [ ] Every row in sections 3-6 attempted in order; log line per paper
- [ ] Every `*` ID confirmed or corrected in this file; every `(confirm inst)` affiliation filled from the PDF
- [ ] Cites column filled via Semantic Scholar (step 10), raw/influential format
- [ ] PDFs named exactly `{paper-id}.pdf`, integrity-checked, in the target folder
- [ ] `unknown-2025-survey` identified by title before download
- [ ] Failures marked `unavailable-pending-proxy` or `not-found`, never guessed
- [ ] Final report: counts + ID corrections + affiliation fills; no registry file touched; no credentials used
