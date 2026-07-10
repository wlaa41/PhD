# S5 Verification Record · NotebookLM cross-check
## Batch 1: the five extracted papers · 10 July 2026

Procedure per docs/phd-pipeline.md S5: each paper's full arXiv HTML text was loaded as a source into one
NotebookLM notebook ("E2E-Fly: An Integrated Training-to-Deployment System for Quadrotor Autonomy",
notebook d336f22d, rutaul41@gmail.com); with ONLY that source selected, NotebookLM answered the five standard
questions, quoting the paper. Quotes below are NotebookLM's verbatim citations from the papers.
Verdicts follow the verifier rule: "a near-match on numbers is a mismatch."

Overall: 0 fabrications found in our extractions; 3 material corrections; limitations sections filled for
all 5 papers (previously "awaits full-PDF pass"); method registry gains members and 2 new candidate methods.

---

## 1 · falcongym-2025 — VERIFIED with corrections

- Platform/hardware: quadrotor "30cm × 34cm × 11cm"; "Raspberry Pi 3 and a Navio2 board for flight control";
  "ArduCam global-shutter camera"; onboard IMU. **CORRECTION:** perception and controller inference run on an
  "offboard workstation... equipped with an NVIDIA RTX 4090 GPU" over the same subnet; "stable 20Hz... control
  loop" via ROS topics. Our page implied an onboard-capable perception stack; running "fully onboard" is in
  fact the authors' FUTURE WORK.
- Zero-shot: verbatim "zero-shot sim-to-real transfer"; "deploy the resulting policy to real hardware with no
  additional fine-tuning". CONSISTENT with our page.
- Methods: NeRF sim; ViT-based NPE; Kalman filter fusing NPE + IMU; self-attention multi-modal controller;
  imitation learning "DAGGER-style" from an "expert state-based controller"; **domain randomization** ("mild
  random noise into expert's control output") — NOT previously tagged by us; **quantile-based perception error
  modeling** (perturbed poses for augmentation) — NEW candidate method; offboard computation. REGISTRY ACTIONS:
  add falcongym to domain-randomization-dynamics (noise-injection variant; judgement logged); consider new id
  perception-error-modelling-quantile at S6.
- Headline result: "30 live hardware flights spanning three tracks and 120 gates... 95.8% success". CONSISTENT.
- Limitations (previously missing, now verified): performance degrades with visual domain gaps, communication
  delays, sim-vs-real dynamics mismatch; future: Gaussian Splatting rendering; generalizing to "unseen tracks";
  "physics-based dynamics" beyond the double-integrator; distilling to run "fully onboard"; handling
  "motion blur" at high speed.

## 2 · raptor-2026 — VERIFIED, enriched

- Platform/hardware: "10 different real quadrotors from 32 g to 2.4 kg", "65 mm - 500 mm", incl. Hummingbird,
  Crazyflie, M5StampFly, Crazyflie Brushless, SavageBee Pusher, ARPL; "brushed and brushless", "2/3/4-blade",
  "soft vs. rigid"; deployed "directly onto the microcontrollers"; firmwares "PX4/Betaflight/Crazyflie/
  M5StampFly". CONSISTENT with our page.
- Zero-shot: verbatim "zero-shot adaptation to a wide variety of platforms"; generalizes "zero-shot outside of
  [the training] distribution". CONSISTENT.
- Methods: Meta-Imitation Learning ("condenses the behavior of 1000 Markovian teacher policies into a single
  adaptive/non-Markovian student"); in-context learning via "recurrence in the hidden layer" — a "Gated
  Recurrent Unit (GRU)"; **"very broad distribution over dynamics parameters"** (the paper's own wide-DR
  framing) — REGISTRY ACTION: add raptor to domain-randomization-dynamics (wide-distribution variant; our
  earlier exclusion reversed, judgement logged); **ancestral sampling** of physically plausible quadrotors —
  NEW candidate method; trained in the **"L2F simulator"** (Learning-to-Fly) — REGISTRY ACTION: add raptor to
  custom-high-performance-simulator; on-policy imitation (DAgger-style — consistent with our reconstruction);
  **"overlaying a simple accelerometer integral... grounded through an exponential decay"** to counteract
  velocity-feedback delay — REGISTRY ACTION: add raptor to latency-compensation; 50/50 null-trajectory /
  Langevin-process trajectory mixture during training.
- Headline results (previously missing numbers): figure-eight tracking "RMSE ranges between 0.07 m and 0.19 m
  (mean: 0.11 m)"; 5.5-s trajectory "0.17 m and 0.29 m (mean: 0.20 m)"; "10x context window size extrapolation"
  (50 s stable flight from 5-s training sequences).
- Limitations (previously missing, now verified): flight-controller/infrastructure delays are a significant
  part of the remaining gap; over-reliance on linear-velocity observations for implicit system ID; DR range
  limits on out-of-distribution platforms (e.g. very high thrust-to-weight); no trajectory lookahead.

## 3 · monorace-2026 — VERIFIED with corrections

- Platform/hardware: "custom carbon fiber frame designed by the competition organizers", "total mass of
  966 g", "5.1-inch propellers", "single CMOS rolling-shutter camera", autopilot "with normal IMU".
  **CORRECTION:** main compute is an "NVIDIA Jetson Orin NX as the main processing unit"; the flight
  controller is an "STM32H743 ARM processor (480 MHz)". Our page said "all compute onboard the flight
  controller" — all compute IS onboard the aircraft, but split Orin NX (main) + STM32 FC. (Relevance note
  strengthened: they flew our companion-computer family.)
- Zero-shot + training (previously unknown): "executed with zero-shot transfer"; "trained in simulation using
  reinforcement learning", "optimized via PPO to complete the track in minimal time"; "extensive domain
  randomization" over all model parameters. REGISTRY ACTIONS: add monorace to
  domain-randomization-dynamics; end-to-end-rl membership confirmed (PPO).
- Methods (additional): adaptive image cropping/resizing; "offline optimization procedure" = "mask-based
  extrinsic optimization" for camera calibration from onboard data (our system-identification merge decision
  VALIDATED); model-based acceleration prediction during "IMU saturation events"; "RANSAC-based outlier
  rejection" + Kalman-gated measurement filtering as fail-safes; temporal synchronization and delay
  compensation between camera and IMU — REGISTRY ACTION: add monorace to latency-compensation.
- Headline result: won A2RL 2025 beating "three human world champion pilots in a direct knockout tournament";
  "fastest completion time of 16.56 s"; "maximum speed of 28.23 m/s" (~100 km/h). CONSISTENT, now with numbers.
- Limitations (previously partial, now verified): decoupled vision/control requires reward shaping and assumes
  near-perfect state estimation (end-to-end learning named as the way forward); pipeline specialized to
  rectangular gate geometry; no detection/avoidance of other drones (a collision occurred in a multi-drone
  event); racing-specific elements limit generalization.

## 4 · fly-seconds-2024 — VERIFIED with a wording correction (LAW-relevant)

- Platform/hardware: "real Crazyflie nano quadrotor", "27 g"; training on a "consumer-grade laptop" — a
  "2020 MacBook Pro"; simulation on an "Nvidia T2000 laptop GPU"; deployed on "microcontrollers... under
  real-time guarantees". CONSISTENT, enriched.
- Zero-shot: **CORRECTION — the paper does NOT use the term "zero-shot".** It states the approach "directly
  transfers to real-world platforms even without domain randomization" and calls the process "Sim2Real
  transfer" for "direct Revolutions Per Minute (RPM) control". Functionally a no-fine-tuning transfer, but our
  zero-shot badge must carry this wording note. (Our provenance box had pre-flagged exactly this: "zero-shot
  wording to verify at S5". The flag was warranted.)
- Methods: asymmetric actor-critic (critic gets "privileged information from the simulator" incl. motor speeds
  and disturbances) — CONSISTENT; curriculum = "gradually increases the penalties in the reward function";
  **"history of control actions"** in the actor observation against motor-delay partial observability —
  REGISTRY ACTION: add flysec to latency-compensation (action-history variant); **rotor delay modelling** via
  "first-order low-pass filter" motor dynamics; observation noise "to account for imperfections in the
  sensors" — REGISTRY ACTION: add flysec to sensor-noise-modelling; random force/torque disturbances per
  episode; scheduled exploration-noise decay; replay-buffer reward recalculation. **CORRECTION:** the replay
  buffer + exploration-noise schedule indicate an OFF-POLICY actor-critic, not PPO — our page's "PPO" framing
  is amended (exact algorithm name to be confirmed from the paper's method section at S6).
- Headline result: "Sim2Real transfer for direct RPM control after only 18 seconds of training"; flight up to
  "3 m/s and accelerations of up to 0.9 g"; simulator "about 5 months of flight per second on a laptop GPU".
  CONSISTENT, now with flight numbers.
- Limitations (previously missing, now verified): design space sparsely explored ("curse of dimensionality");
  training speed and robustness to be further optimized; automatic hyperparameter tuning planned; adaptivity
  to "battery levels or wind"; "integral compensation" or "meta-RL" as adaptation directions.

## 5 · e2e-fly-2026 — VERIFIED, enriched

- Platform/hardware (previously unknown): two platforms — "VIS-Real (VIS-R)": Radax X4 onboard computer,
  "Intel N100 processor", "Intel RealSense D435i" stereo camera; "VIS-Hardware-in-the-loop (VIS-H)": wireless
  link + FPV camera streaming to a ground station. Both: "Betaflight-compatible STM32F7-based Mini flight
  controller", 3000KV motors, 3.5-inch propellers.
- Zero-shot: verbatim "systematic, zero-shot transfer pipeline"; "reliable zero-shot deployment without any
  task-specific system parameters fine-tuning". CONSISTENT.
- Methods: a "comprehensive four-stage sim-to-real alignment framework" — System Identification (measured
  mass, digital prototypes for inertia); Latency Compensation via "step-response alignment method";
  Domain Randomization ("empirically validated domain-randomization parameters"); Noise Modelling (Gaussian
  noise on inverse depth + "Redwood depth noise model"); plus the "betaflight-ctrl" low-level control bridge.
  ALL CONSISTENT with our four tags; the four-stage framing is a better description than ours.
- Headline results (previously missing): BPTT converges in "approximately 1,200 seconds... less than 30% of
  PPO's training time"; vision-based racing "100% success rate across three racetracks of different shapes".
  Six tasks: hovering, tracking, landing, racing, visual landing, racing in cluttered environments.
- Limitations (previously missing, now verified): differentiable reward design is hard for long-horizon tasks;
  BPTT suffers "vanishing or exploding gradients"; gradient methods prone to local optima; high sensitivity to
  sparse rewards; BPTT "requires constructing a fully differentiable gradient chain"; future: hybrid RL
  (exploration) + differentiable simulation (refinement).

---

## Registry actions summary (to apply at S6)

| Method id | Change | Evidence |
|---|---|---|
| domain-randomization-dynamics | members 1 → 4 (add falcongym, raptor, monorace) | quotes above |
| latency-compensation | members 1 → 4 (add raptor, monorace, flysec) | quotes above |
| sensor-noise-modelling | members 1 → 2 (add flysec) | "account for imperfections in the sensors" |
| custom-high-performance-simulator | members 1 → 2 (add raptor: "L2F simulator") | quote above |
| NEW candidates | perception-error-modelling-quantile (falcongym); ancestral-sampling-platform-distribution (raptor) | quotes above |
| fly-seconds zero_shot | zero → zero-functional with wording note | paper never uses the term |
| fly-seconds algorithm | PPO framing corrected to off-policy actor-critic (replay buffer) | reward recalculation in replay buffer |

Verdict on the pipeline itself: the S5 gate caught 3 material corrections and filled 5 missing limitation
sections that no amount of abstract-reading could have supplied. The two-reader design works.
