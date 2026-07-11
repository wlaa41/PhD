# S5 Verification Record · NotebookLM cross-check
## Batch 2: papers 06–10 · 11 July 2026

Procedure per docs/phd-pipeline.md S5, identical to batch 1 (docs/s5-notebooklm-2026-07-10.md): each paper's
full arXiv HTML text added to the standing notebook (d336f22d); with ONLY that source selected, NotebookLM
answered the five standard questions with verbatim quotes. Verdicts follow "a near-match on numbers is a
mismatch."

Overall: 0 fabrications; 2 material corrections (both the same species: offboard compute where our pages
implied or left ambiguous onboard execution); zero-shot wording VERIFIED verbatim for all five (resolving
two flagged caveats); limitations filled for all five; the five SimpleFlight factors named; registry counts
move substantially (DR 4→8 of 10; sysid 2→6; latency 4→6).

---

## 06 · attention-legged-2025 — VERIFIED, enriched (zero-shot caveat RESOLVED)

- Platforms named: quadruped = "ANYmal-D"; humanoid = "Fourier GR-1". ANYmal-D: "control policy inference is
  done on a single Intel core-i7 8850H CPU", "elevation mapping runs on an onboard Nvidia Jetson",
  "robot-centric height map". GR-1: "Intel core-i7 13700h CPU"; **honesty note:** GR-1's "map scans are
  sampled through ray-casting on a pre-designed terrain mesh given the robot's pose" — i.e. a known mesh +
  captured pose, not onboard perception, a partial crutch our page must state.
- Zero-shot verbatim: "We deployed the fine-tuned policies for both ANYmal-D and GR-1 zero-shot on the real
  hardware" — our "wording to verify" caveat RESOLVES to verified.
- Stack: "massively parallel DRL", "custom version of Proximal Policy Optimization (PPO)"; A100-40GB
  (ANYmal), RTX 4090 (GR-1).
- Methods (registry actions): two-stage training (perfect perception → "perception noise and drift");
  **domain randomization** (observation noise, "torso mass and the friction coefficient of each contact
  foot") → ADD to domain-randomization-dynamics; **privileged training** (critic keeps privileged info while
  actor fine-tunes with noise) → ADD to asymmetric-actor-critic (judgement logged); **curriculum** (terrain
  levels upgraded on success) → ADD to curriculum-learning; **"actuator model through supervised learning"**
  → ADD to system-identification (actuator-network variant, judgement logged); disturbance injection
  (artificial pushes, map-scan drift).
- Results: "26.5% and 77.3% higher success rates compared to DTC and baseline RL"; "100% success rate in
  traversing a challenging obstacle parkour" (simulation, unseen); "reduction of roughly 60% of training
  time compared to DTC"; GR-1 accelerating 0.7→1.5 m/s on a shaky balance beam; "19-cm wide beam"; grid
  stones "12cm x 12cm".
- Limitations (verified): training takes days (tuning slow); "2.5D height map representation" fails in
  "confined spaces" → future "effective 3D representations"; locomotion-only → future loco-manipulation
  ("opening doors", "climbing with the help of hands").

## 07 · wheeledlab-2025 — VERIFIED, enriched

- Platforms: "the HOUND" (drift; LiDAR + RGB; "Jetson Orin NX"; "about 3000 USD") and "the MuSHR" (elevation
  + visual; "estimated at 930 USD"); training on a "single NVIDIA RTX 3080 GPU".
- Zero-shot verbatim: "direct zero-shot policies"; "direct Sim2Real transfer for drifting without online
  fine-tuning". Stack: Isaac Lab + "Proximal Policy Optimization (PPO) as implemented in the RSL RL library".
- Methods (registry actions): "massive parallelization, domain randomization, sensor simulation, and
  end-to-end learning" + "perturbation simulation" and "corruption" → ADD wheeled to
  domain-randomization-dynamics; drift task: "aggressive domain randomization", "Sim2Real2Sim" cycles
  refining "randomized gain ranges", friction coefficient estimated with a "cheap (less than 5 USD) spring
  scale" → ADD wheeled to system-identification (real measurements → sim parameters, judgement logged);
  suspension/steering articulation fixes; tape on wheels; elevation task: "local (2.5 × 2.5 meters)
  body-centric elevation map"; visual task: "grayscale observation (resolution of 40 × 60)", "image
  augmentations (i.e., color jittering and Gaussian blur)", "MLP-based policy" beating CNNs.
- Results: drift "maximum (controlled) slip angle [of] 58°", "average speed [of] about 1.6 m/s", full laps vs
  baseline failing every turn; elevation traversal succeeds where baseline fails; visual navigation "3 / 5"
  trials (honest number).
- Limitations (verified): no pedagogical study yet; "open curriculum" needed; policies not "plug-and-play" —
  require "patience and an intent to iterate"; adaptation to deployment conditions is the frontier;
  "mechanical hysteresis and tolerances of hobby-grade components"; identifying the hardest Sim2Real steps.

## 08 · pixels-2024 — VERIFIED with a material correction (zero-shot caveat RESOLVED)

- **CORRECTION (compute):** "the policy does not run on the drone" — it runs on an "offboard ground-station
  PC"; commands return via an "RF receiver". Detector inference "only 4 ms when deployed on an RTX 3090"
  (offboard); video "transmission latency of 33 ms at a rate of 60 Hz". Platform: "modification of the
  Agilicious platform", onboard FPV camera.
- Zero-shot verbatim: "direct zero-shot simulation-to-reality transfer of our pixel-based control policies" —
  our flagged caveat RESOLVES to verified.
- Stack: "model-free reinforcement learning relying on PPO"; the "augmented simulator" with "data-driven
  augmentation" of a quadratic propeller model → ADD pixels to system-identification (data-driven model
  augmentation, judgement logged).
- Methods: sensor abstraction ("inner edges of the gates as a sensor abstraction", training "without
  rendering images") — confirms our new registry method training-time-sensor-abstraction; Swin gate detector
  trained on 80,000 images (real + photorealistic); asymmetric actor-critic (verbatim); "initial state
  buffer" against "catastrophic forgetting"; **domain randomization** ("robustify a control policy against a
  sim2real gap in the system dynamics"; thrust, mass, gate positions) → ADD pixels to
  domain-randomization-dynamics; action history ("history of three past actions" for "smoother control
  commands") → ADD pixels to latency-compensation (action-history variant; purpose smoothing, judgement
  logged).
- Results: "speeds up to 40 km/h with accelerations up to 2 g"; figure-8 "success rate across 6 runs and a
  total of 20 flown laps [of] 100%".
- Limitations (verified): "limited memory of the neural controller" (3 actions); if no gates visible for
  several frames the "success rate drops drastically" with no recovery; future recurrent nets for "prolonged
  memory retention"; sample efficiency of learning from pixels; applications ("indoor navigation or ship
  inspection", "powerline inspection"); obstacle avoidance/dynamic objects unhandled.

## 09 · diffphys-2025 — VERIFIED, enriched

- Hardware: "Roma 3-inch frame", "GEMFAN 3-inch propellers", "1606 3750KV motors", 365 g total, max
  thrust-to-weight 3.6; "Intel RealSense depth camera" (D435i) at 15 Hz; "Aocoda F7mini flight controller";
  "HAKRC 4-in-1 electronic speed controller"; the "$21 ARM-based computer" is a "Mango Pi" SBC with a
  "Cortex-A53 CPU" — fully onboard.
- Zero-shot verbatim ×3 incl. "zero-shot sim-to-real transfer" and "deploy the resulting navigation policy
  directly in the physical world".
- Methods (registry actions): point-mass differentiable simulation ("backpropagation through a physical
  simulator directly"); depth renderer "implemented with CUDA as a PyTorch extension" with "four kinds of
  abstract obstacles"; **calibration of "control latency", "exponential smoothing", "quadratic air drag"** →
  ADD diffphys to system-identification AND to latency-compensation (control latency explicitly calibrated);
  **"exponential decay mechanism into the position and velocity gradient"** against "gradient explosion" —
  the direct answer to the BPTT failure modes E2E-Fly lists (cross-linked on both pages); CRNN policy; depth
  max-pooled to "16 × 12" to bridge the gap (input abstraction, noted on page).
- Results: 90% success; 20 m/s in a real forest; multi-agent: "team of six quadrotors" through a narrow gate
  in opposite directions, "autonomous coordination without communication or centralized planning", success =
  all within "1.2 m" of goals without collision.
- Limitations (verified, forward-looking): task versatility (inputs/outputs/losses); broader applications
  (search and rescue, logistics, inspection, agriculture); scaling "localization-free and
  communication-free navigation".

## 10 · simpleflight-2024 — VERIFIED with a material correction; THE FIVE FACTORS NAMED

- **THE FIVE FACTORS** (the paper's core, previously unknown): (1) actor input design — "rotation matrix
  instead of a quaternion" + linear velocity; (2) critic input design — "a time vector to the critic's input"
  for temporal awareness; (3) reward design — "regularization of the difference between successive actions as
  the smoothness reward"; (4) "SysID for calibrating key dynamic parameters is crucial. DR exhibits selective
  effectiveness" → ADD simpleflight to system-identification AND domain-randomization-dynamics (selective);
  (5) training techniques — "larger batch sizes" for generalization via data diversity.
- **CORRECTION (compute):** for the Crazyflie experiments "the policy is executed on an offboard computer",
  commands via "2.4 GHz radio at 100 Hz", state from an "OptiTrack motion capture system" — offboard + mocap,
  which our page must state. Second platform: custom "Air" (250 mm arms, PX4 flight controller, "Nvidia Orin
  processor" — onboard-capable).
- Zero-shot verbatim: "robust RL-based control policies capable of zero-shot real-world deployment".
  Stack: "on-policy PPO algorithm" in "OmniDrones, a GPU-accelerated, highly parallel drone simulator".
- Results: ">50%" tracking-error reduction vs SOTA RL baselines; "the only one capable of successfully
  completing all benchmarking trajectories"; on Air it outperformed a "finely-tuned PAMPC"; consistent across
  quadrotor sizes/models.
- Limitations (verified): dynamics-focused, not vision — future "visual randomization and domain adaptation";
  higher-dimensional tasks may need a larger critic time vector; SimpleFlight is identified factors, not a
  new algorithm — future integration onto other control methods.

---

## Registry actions summary (applied to the site registry)

| Method id | Change | New count /10 |
|---|---|---|
| domain-randomization-dynamics | + attn, wheeled, pixels, simpleflight | **8** |
| system-identification | + attn (actuator model), wheeled (spring scale + Sim2Real2Sim), pixels (data-driven augmentation), diffphys (latency/smoothing/drag calibration), simpleflight (Factor 4) | **6*** (see note) |
| latency-compensation | + diffphys (control-latency calibration), pixels (action history) | **6** |
| curriculum-learning | + attn | 2 |
| asymmetric-actor-critic | + attn (privileged training) | 3 |
| training-time-sensor-abstraction | pixels membership CONFIRMED verbatim | 1 |
| Cross-corpus finding | "zero-shot ≠ onboard": pixels, simpleflight-Crazyflie, falcongym all compute OFFBOARD; monorace, raptor, diffphys, fly-seconds run onboard — a live analysis axis for the gap study | — |

*system-identification count: e2efly, monorace (batch 1) + attn, wheeled, pixels, diffphys, simpleflight = 7.
Correction applied in the registry as 7, the table row above under-counted; the registry on the site is
authoritative and lists all seven members with quotes.

Verdict: batch 2 verified. The S5 gate again did what abstracts cannot: named the five factors, exposed two
offboard-compute corrections, resolved two zero-shot wording caveats, and moved DR from a minority to a
near-universal method (8/10).
