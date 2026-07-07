# Corpus Candidates: Seed List (S1 partial output)
## Deep-research sweep, 2026-07-07

Companion file: `corpus-acquisition.md` is the standalone download manifest and now the RICHER of the two: per-paper point breakdown (R+H+Z+V+A), strength signals, citation column (filled at S2), institutional additions (A-block), Chinese-institution additions (C-block: SJTU, Shanghai AI Lab, Tsinghua, Qi Zhi, Fudan, incl. verified 2026 entries) and fresh-2026 additions (F-block). This file remains the original ranked triage list; the manifest supersets it and nothing is ever removed from either.

Status of this file: **seed for `candidates.json`**, produced by a 106-agent deep-research sweep (5 search angles, 24 primary sources fetched, 25 claims adversarially verified before the session limit cut verification short). It is NOT the finished S1 output: the scout agent still owes the full 100-120 candidate sweep in Phase 1. Nothing here is `triaged` until the rubric scores are recomputed at S2 and you approve at Gate 1.

Verification key:
- **web-verified** = fetched and adversarially verified this session (quotes on file)
- **web-found** = surfaced and fetched this session; arXiv ID resolves; content claims unverified
- **knowledge** = from model knowledge; EXISTS-CHECK REQUIRED at S3 before it may enter the corpus; IDs marked (confirm) are best-effort and must be resolved, never trusted

Rubric: recency (2025-26=25, 2024=20, 2023=12, 2022=6) + hardware evidence (25/15/5/0) + zero-shot (zero=20, semi=12, no=0) + venue/velocity (<=15) + drone/anchor relevance (<=15). Scores are triage estimates to be recomputed at S2.

## Tier 1: drone core (primary platform)

| # | id | Paper | Year | Venue | arXiv / DOI | ZS | Score | Status |
|---|---|---|---|---|---|---|---|---|
| 1 | miao-2025-falcongym | FalconGym: zero-shot vision gate-crossing via NeRF sim (95.8% over 120 real gates) | 2025 | IROS | 2503.02198 | zero | 95 | web-found |
| 2 | raptor-2025-foundation | RAPTOR: one 2,084-param recurrent foundation policy flies 10 real quadrotors (32 g to 2.4 kg), meta-imitation from 1,000 teachers | 2025 | arXiv | 2509.11481 | zero | 93 | web-found |
| 3 | bahnam-2026-monorace | MonoRace: monocular champion-level racing, won A2RL 2025 beating 3 human world champions (TU Delft) | 2026 | arXiv | 2601.15222 | zero (check) | 93 | web-verified (win 2-0) |
| 4 | eschmann-2024-fly-seconds | Learning to Fly in Seconds: RL-to-firmware, 18 s training, direct RPM control on Crazyflie | 2024 | RA-L | 2311.13081 | zero | 92 | web-found |
| 5 | geles-2024-pixels-no-state | Demonstrating Agile Flight from Pixels without State Estimation (Scaramuzza lab) | 2024 | RSS | 2406.12505 (confirm) | zero | 90 | knowledge |
| 6 | simpleflight-2024-what-matters | What Matters in Learning a Zero-Shot Sim-to-Real RL Policy for Quadrotor Control (SimpleFlight, OmniDrones, >50% tracking-error cut on Crazyflie) | 2024 | arXiv | 2412.11764 | zero | 88 | web-found |
| 7 | kulkarni-2025-aerialgym | Aerial Gym Simulator: GPU-parallel multirotor sim + zero-shot depth navigation on real hardware | 2025 | arXiv | 2503.01471 | zero | 83 | web-found |
| 8 | huang-2023-datt | DATT: Deep Adaptive Trajectory Tracking (RL + L1 adaptive) on real quadrotor | 2023 | CoRL | 2310.09053 (confirm) | zero | 82 | knowledge |
| 9 | zhang-2023-one-controller | Learning a Single Near-Hover Position Controller for Vastly Different Quadcopters | 2023 | ICRA | 2209.09232 (confirm) | zero | 82 | knowledge |
| 10 | kaufmann-2023-swift | Champion-level drone racing using deep RL (Swift): PPO in sim + empirical residual models from 50 s real flight, then fine-tune | 2023 | Nature | 10.1038/s41586-023-06419-4 | semi | 79 | web-verified (3-0, quotes on file) |
| 11 | song-2023-limit-racing | Reaching the Limit in Autonomous Racing: Optimal Control vs RL | 2023 | Sci. Robotics | 2310.10943 (confirm) | semi | 79 | knowledge |
| 12 | xing-2024-bootstrap-vision | Bootstrapping RL with Imitation for Vision-Based Agile Flight | 2024 | CoRL | 2403.12203 (confirm) | zero (check) | 80 | knowledge |
| 13 | oconnell-2022-neural-fly | Neural-Fly: rapid online adaptation for flight in strong winds | 2022 | Sci. Robotics | 10.1126/scirobotics.abm6597 | semi | 73 | knowledge |
| 14 | ferede-2024-time-optimal | End-to-end RL for time-optimal quadcopter flight (TU Delft line pre-MonoRace) | 2024 | arXiv | 2311.16948 (confirm) | zero (check) | 78 | knowledge |
| 15 | romero-2024-ac-mpc | Actor-Critic Model Predictive Control | 2024 | ICRA | 2306.09852 (confirm) | semi | 70 | knowledge |

## Tier 2: cross-platform anchors (legged, humanoid, manipulation, ground)

| # | id | Paper | Year | Venue | arXiv / DOI | ZS | Score | Status |
|---|---|---|---|---|---|---|---|---|
| 16 | he-2025-attention-legged | Attention-Based Map Encoding for Generalized Legged Locomotion (ETH; quadruped + humanoid) | 2025 | Sci. Robotics | 2506.09588 | zero | 93 | web-found |
| 17 | han-2025-wheeledlab | Wheeled Lab: Isaac Lab to low-cost wheeled robots, zero-shot (ground anchor for RoboMaster) | 2025 | CoRL | 2502.07380 | zero | 92 | web-found |
| 18 | hoeller-2024-anymal-parkour | ANYmal Parkour: perception + skills trained in sim only | 2024 | Sci. Robotics | 2306.14874 | zero | 88 | web-found |
| 19 | radosavovic-2024-humanoid | Real-World Humanoid Locomotion with RL | 2024 | Sci. Robotics | 2303.03381 (confirm) | zero | 88 | knowledge |
| 20 | haarnoja-2024-soccer | Learning Agile Soccer Skills for a Bipedal Robot with Deep RL | 2024 | Sci. Robotics | 2304.13653 (confirm) | zero | 86 | knowledge |
| 21 | jenelten-2024-dtc | DTC: Deep Tracking Control (hybrid model-based + RL) | 2024 | Sci. Robotics | 2309.15462 (confirm) | zero | 84 | knowledge |
| 22 | cheng-2024-extreme-parkour | Extreme Parkour with Legged Robots (vision, low-cost hardware) | 2024 | ICRA | 2309.14341 | zero | 83 | web-found |
| 23 | hover-2024-humanoid | HOVER: Versatile Neural Whole-Body Controller for Humanoid Robots | 2024 | arXiv | 2410.21229 (confirm) | zero (check) | 83 | knowledge |
| 24 | he-2025-asap | ASAP: Aligning Sim and Real Physics for Agile Humanoid Whole-Body Skills (delta-action real2sim) | 2025 | arXiv | 2502.01143 (confirm) | semi | 80 | knowledge |
| 25 | handa-2023-dextreme | DeXtreme: agile in-hand manipulation, sim to real | 2023 | ICRA | 2210.13702 (confirm) | zero | 79 | knowledge |
| 26 | zhuang-2023-parkour | Robot Parkour Learning (end-to-end vision, distillation) | 2023 | CoRL | 2309.05665 | zero | 77 | web-found |
| 27 | ma-2024-dreureka | DrEureka: LLM-designed rewards + domain randomization for sim-to-real | 2024 | RSS | 2406.01967 | zero | 75 | web-found |
| 28 | nahrendra-2023-dreamwaq | DreamWaQ: implicit terrain estimation, zero-shot on Unitree A1 | 2023 | ICRA | 2301.10602 | zero | 75 | web-found |
| 29 | miki-2022-wild | Learning Robust Perceptive Locomotion in the Wild (teacher-student, belief state) | 2022 | Sci. Robotics | 2201.08117 | zero | 74 | knowledge |
| 30 | margolis-2022-walk-these-ways | Walk These Ways: multiplicity-of-behavior locomotion | 2022 | CoRL | 2212.03238 (confirm) | zero | 71 | knowledge |
| 31 | agarwal-2022-egocentric | Legged Locomotion in Challenging Terrains using Egocentric Vision | 2022 | CoRL | 2211.07638 (confirm) | zero | 71 | knowledge |

## Tier 3: stacks and infrastructure (cite, count methods, do not treat as contribution papers)

| # | id | Paper | Year | arXiv | Note | Status |
|---|---|---|---|---|---|---|
| 32 | zakka-2025-mjx-playground | MuJoCo Playground (MJX, zero-shot state + pixels) | 2025 | 2502.08844 | modern JAX stack | web-found |
| 33 | mittal-2025-isaaclab | Isaac Lab (NVIDIA, successor to Isaac Gym) | 2025 | 2511.04831 | canonical stack citation | web-found |
| 34 | omnidrones-2024 | OmniDrones: GPU-parallel drone RL platform | 2024 | 2309.12825 (confirm) | SimpleFlight's simulator | knowledge |

## Boundary anchors (VLA / generalist: real-data-trained, NOT sim-to-real; they define the corpus boundary and the "zero-shot" terminology split)

| # | id | Paper | Year | arXiv | ZS note | Status |
|---|---|---|---|---|---|---|
| 35 | black-2024-pi0 | pi-0: VLA flow model (Physical Intelligence) | 2024 | 2410.24164 | zero-shot = task generalization after real-data pretraining | web-found |
| 36 | pi05-2025 | pi-0.5: open-world generalization in unseen homes | 2025 | 2504.16054 | same caveat | web-found |
| 37 | nvidia-2025-groot | GR00T N1: humanoid VLA foundation model (heavy synthetic data) | 2025 | 2503.14734 | mixed sim+real training | web-found |

Include 2 to 3 of these ONLY to sharpen the definition of zero-shot deployment in Ch. 2.2; the review's organising concept is sim-trained-to-real, which these are not (OpenVLA and Octo fetched this session and excluded on exactly this test; kept in reserves).

## Reserves (~15, promote on unavailability or veto)

| id | Paper | arXiv | Status |
|---|---|---|---|
| kim-2024-openvla | OpenVLA (excluded: real-data-trained; boundary example) | 2406.09246 | web-found |
| octo-2024 | Octo: open generalist policy (same exclusion) | 2405.12213 | web-found |
| smolvla-2025 | SmolVLA (real-data; cheap-hardware eval) | 2506.01844 | web-found |
| da-2025-survey | Survey of Sim-to-Real Methods in RL with Foundation Models | 2502.13187 | web-found (background) |
| unknown-2025-survey | Sim-to-real survey, Oct 2025 (title to confirm at acquisition) | 2510.20808 | web-found (identify) |
| kumar-2022-rma-bipedal | Adapting RMA for bipedal robots | 2205.15299 (confirm) | knowledge |
| margolis-2022-rapid | Rapid Locomotion via RL (speed on real hardware) | 2205.02824 (confirm) | knowledge |
| chen-2023-visual-dexterity | Visual Dexterity: in-hand reorientation (Sci. Robotics) | 2211.11744 (confirm) | knowledge |
| saviolo-2023-quad-dynamics | Saviolo/Loianno learned quadrotor dynamics line | confirm | knowledge |
| genesis-2024 | Genesis physics engine (stack; paper id to confirm) | confirm | knowledge |
| bauersfeld-2024-flightbench? | Any 2024-26 drone sim benchmark surfaced by scout | scout | pending S1 |
| + 4 slots | reserved for scout's full sweep (aerial RMA variants, drone foundation policies 2025-26, ground robot #2-3) | | pending S1 |

## What the sweep verified before the session limit

1. Swift (Nature 2023) trained with PPO in sim (1e8 interactions, ~50 min); transfer used empirical residual models (GP perception, kNN dynamics) from ~50 s of real flight plus fine-tuning. Verdict 3-0, three independent verifiers, verbatim quotes. **Consequence: Swift is `semi`, not `zero` — quote it accordingly in Ch. 2.**
2. MonoRace won A2RL 2025 against all AI teams and 3 human world champions (2-0; corroborated by TU Delft press release).
3. 21 further claims (RAPTOR, SimpleFlight, FalconGym, Aerial Gym, MuJoCo Playground, parkour lines) surfaced with quotes but their verification agents died on the session limit: treat as **web-found**, verify at S5 as normal.

## Next actions (owner: scout agent, Phase 1)

1. Re-run discovery to fill to 100-120 candidates (aerial RMA variants, 2025-26 drone foundation policies, ground robot anchors 2 and 3, latency/delay-modelling papers are thin above).
2. Resolve every (confirm) ID against arXiv/Semantic Scholar; wrong ID = replace, never guess.
3. Recompute rubric scores uniformly; my scores above are triage estimates.
4. Emit candidates.json; Gate 1 review.
