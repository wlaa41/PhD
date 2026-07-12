# The Shared Stack · tools and platforms across the ten extracted papers
## Derived 12 July 2026 · feeds the site's "Shared stack" stripe and the graph's stack lens

Derivation: every item below is grounded in the ten paper pages (site/papers/) and the two S5 verification
records (docs/s5-notebooklm-2026-07-10.md, docs/s5-notebooklm-2026-07-11.md); nothing was taken from model
knowledge or the papers themselves beyond what those sources already state. Ten parallel extractions (one per
paper page) were canonicalised with the registry's split test, then adversarially re-checked twice: a recount
pass (every count re-derived from members; all counts confirmed exact) and a grounding pass (30+ quotes
re-located in the sources; items that could not be grounded were corrected or dropped, corrections listed at
the bottom). Count = distinct papers, never mentions. A facet a paper does not state is listed as "not
stated", never guessed: that gap is itself a finding.

This file complements the method registry: the registry counts techniques (domain randomization,
system identification, ...); this file counts the concrete tools and platforms those techniques run on.
Where an item corresponds to a registry method, the counts agree by construction (differentiable simulation:
2, matching differentiable-physics-learning).

Paper keys: falcongym, raptor, monorace, e2efly, flysec, attn, wheeled, pixels, diffphys, simpleflight.

---

## 1. Simulators and training environments

Only four of ten papers train in a simulator that has a name; six build their own or never name it.
Simulators are where this corpus does not converge.

| Item | Count | Members and evidence |
|---|---|---|
| Isaac Lab + RSL-RL | 1 | wheeled: policies trained with PPO "as implemented in the RSL RL library" inside Isaac Lab's GPU-parallel simulation (page + S5 11 Jul). The only third-party framework here that is also this project's planned training stack |
| OmniDrones | 1 | simpleflight: trained in the GPU-based OmniDrones simulator, "a GPU-accelerated, highly parallel drone simulator" (S5 11 Jul) |
| FalconGym (NeRF-built) | 1 | falcongym: trained "entirely inside the NeRF simulator" (page) |
| L2F (Learning-to-Fly) simulator | 1 | raptor: "the student is a GRU trained in the L2F (Learning-to-Fly) simulator" (page; S5 10 Jul) |
| Purpose-built or unnamed simulator | 6 | flysec: purpose-built, "about 5 months of simulated flight per second on a laptop GPU" (page) · e2efly: unnamed high-performance simulator supporting differentiable physics and RL, plus a second simulator for sim-to-sim validation (page) · diffphys: "a simple point-mass physics model and a depth rendering engine", renderer "implemented with CUDA as a PyTorch extension" (page; S5 11 Jul) · pixels: PPO in an "augmented simulator", a data-driven augmentation of a quadratic propeller model (page; S5 11 Jul) · monorace: "trained in simulation using reinforcement learning", simulator never named (S5 10 Jul) · attn: "massively parallel DRL", simulator not named (S5 11 Jul) |

Grouping note: the six purpose-built/unnamed simulators are six different artefacts, grouped only to show
the pattern; the site's info card states this explicitly.

Not stated: none (all ten state at least this much about their training environment).

## 2. Training algorithms

PPO is the only algorithm this corpus shares; everything else appears once or twice.

| Item | Count | Members and evidence |
|---|---|---|
| PPO | 6 | monorace: "optimized via PPO to complete the track in minimal time" (S5 10 Jul) · simpleflight: "a PPO-based training framework" (page, verbatim) · wheeled: "PPO as implemented in the RSL RL library" (S5 11 Jul) · attn: "custom version of Proximal Policy Optimization (PPO)" (S5 11 Jul) · pixels: "model-free reinforcement learning relying on PPO" (S5 11 Jul) · e2efly: PPO trained as the comparison baseline; BPTT converges "in less than 30% of PPO's training time" (page) |
| Backpropagation through differentiable simulation | 2 | e2efly: BPTT through the differentiable simulator (page) · diffphys: "backpropagation through a physical simulator directly", no reward shaping, no policy-gradient estimation (page; S5 11 Jul). Matches registry method differentiable-physics-learning (count 2) |
| DAgger-style imitation learning | 2 | falcongym: imitation learning "DAGGER-style" from an "expert state-based controller" (S5 10 Jul) · raptor: "the expectation over trajectories is taken under the student's own behaviour, DAgger-style" (page) |
| Meta-Imitation Learning | 1 | raptor: "condenses the behavior of 1000 Markovian teacher policies into a single adaptive/non-Markovian student" (S5 10 Jul) |
| Off-policy actor-critic (name not stated) | 1 | flysec: replay buffer + scheduled exploration-noise decay; S5 correction: "OFF-POLICY actor-critic, not PPO"; exact algorithm name deferred to S6 (S5 10 Jul) |

Judgement calls: e2efly counts under PPO because the paper trained PPO (as its baseline); the role is stated
in the evidence. Generic "reinforcement learning" statements (monorace, wheeled) are folded into those
papers' PPO membership rather than minting a vacuous standalone RL item. flysec is excluded from PPO by its
own S5 correction.

Not stated: none.

## 3. Training compute

Stated by only three papers, and the spread is the story: 18 seconds on a MacBook Pro at one end, an A100 at
the other.

| Item | Count | Members and evidence |
|---|---|---|
| A100-40GB + RTX 4090 | 1 | attn: custom PPO trained "on an A100-40GB (ANYmal) and RTX 4090 (GR-1)" (S5 11 Jul) |
| Single RTX 3080 | 1 | wheeled: training on a "single NVIDIA RTX 3080 GPU" (S5 11 Jul) |
| 2020 MacBook Pro (laptop GPU) | 1 | flysec: 18-second training on a consumer laptop, simulation on an "Nvidia T2000 laptop GPU" (page; S5 10 Jul) |

Not stated: falcongym, raptor, monorace, e2efly, pixels, diffphys, simpleflight (7 of 10).

## 4. Deployment compute

The live analysis axis from the S5 records: "zero-shot ≠ onboard". Six papers run fully onboard, three run
offboard, one does both; the offboard systems quietly lean on a ground-station GPU.

| Item | Count | Members and evidence |
|---|---|---|
| Offboard ground station | 4 | falcongym: perception + controller inference offboard on an NVIDIA RTX 4090 over the same subnet, stable 20 Hz loop (S5 10 Jul correction) · pixels: "the policy does not run on the drone", offboard ground-station PC, Swin detector 4 ms on an RTX 3090 (S5 11 Jul correction) · simpleflight: Crazyflie experiments, "the policy is executed on an offboard computer" via 2.4 GHz radio at 100 Hz, state from OptiTrack (S5 11 Jul correction); the second "Air" platform carries an onboard-capable Nvidia Orin · e2efly: VIS-H, hardware-in-the-loop with FPV camera streamed to a ground station (page). Four different machines, grouped to show the offboard pattern, not a shared tool |
| NVIDIA Jetson Orin NX | 2 | monorace: "main processing unit" onboard the 966 g airframe, alongside an STM32H743 (480 MHz) flight controller (S5 10 Jul) · wheeled: the HOUND (LiDAR + RGB, Jetson Orin NX, about 3,000 USD) (page; S5 11 Jul) |
| Flight-controller-class MCU (unnamed) | 2 | raptor: deployed "directly onto the microcontrollers" (S5 10 Jul); "fits comfortably on any flight controller, with no accelerator, quantization or pruning" (page) · flysec: "microcontroller with real-time guarantees" aboard a Crazyflie nano quadrotor (page) |
| Mango Pi SBC (Cortex-A53), 21 USD | 1 | diffphys: fully onboard; "Aocoda F7mini flight controller", "HAKRC 4-in-1" ESC alongside (page; S5 11 Jul) |
| Radax X4 (Intel N100) | 1 | e2efly: VIS-R, Radax X4 onboard computer with Intel N100 (page) |
| Intel i7-8850H + onboard Jetson | 1 | attn: ANYmal-D policy inference on the i7; "elevation mapping runs on an onboard Nvidia Jetson"; GR-1 uses an "Intel core-i7 13700h CPU" (S5 11 Jul) |

Not stated: none.

## 5. Sensors at deployment

Cameras dominate, but no two systems sense alike; two of ten fly with no explicit state estimation at all.

| Item | Count | Members and evidence |
|---|---|---|
| Intel RealSense D435i | 2 | e2efly: VIS-R stereo camera (page) · diffphys: "Intel RealSense depth camera" (D435i) at 15 Hz (S5 11 Jul) |
| FPV camera to offboard compute | 2 | pixels: onboard FPV camera only; video at 60 Hz, 33 ms transmission latency (page; S5 11 Jul) · e2efly: VIS-H, FPV camera to a ground station (page) |
| IMU (stated) | 2 | falcongym: NPE fused with an IMU through a Kalman filter (page) · monorace: one monocular rolling-shutter camera + IMU (page) |
| Robot-centric elevation map | 2 | attn: "robot-centric height map", built on an onboard Jetson (S5 11 Jul) · wheeled: "local (2.5 × 2.5 meters) body-centric elevation map" (S5 11 Jul) |
| No explicit state estimation | 2 | pixels: "no state estimator anywhere in the loop" (page) · diffphys: "can operate without state estimation and adapt to dynamic obstacles" (page; S5 11 Jul) |
| Monocular rolling-shutter camera | 1 | monorace: "single CMOS rolling-shutter camera" (S5 10 Jul); "no external tracking of any kind" (page) |
| ArduCam global-shutter camera | 1 | falcongym: Raspberry Pi 3 + Navio2 with an ArduCam global-shutter camera (page; S5 10 Jul) |
| LiDAR + RGB | 1 | wheeled: the HOUND's sensing (page) |
| OptiTrack motion capture (external) | 1 | simpleflight: state from an "OptiTrack motion capture system", external, not onboard autonomy (S5 11 Jul correction) |
| Linear-velocity observations | 1 | raptor: the policy relies heavily on linear-velocity observations for its implicit system identification (page; S5 10 Jul limitation) |
| Proprioception (joint + body state) | 1 | attn: map encoding conditioned on the robot's proprioception (page) |

Not stated: flysec.

## 6. Firmware and middleware

Named by four papers only. RAPTOR alone spans four firmware ecosystems; six papers name none.

| Item | Count | Members and evidence |
|---|---|---|
| PX4 | 2 | raptor: flight-controller ecosystems "PX4/Betaflight/Crazyflie/M5StampFly" (S5 10 Jul) · simpleflight: the "Air" platform, "PX4 flight controller" with Nvidia Orin (S5 11 Jul). PX4 is this project's own stack |
| Betaflight | 2 | raptor: same ecosystems quote (S5 10 Jul) · e2efly: both platforms on "Betaflight-compatible STM32F7-based" flight controllers, driven through the "betaflight-ctrl" bridge (page; S5 10 Jul) |
| Crazyflie firmware | 1 | raptor: same ecosystems quote (S5 10 Jul). flysec flies a Crazyflie vehicle but states no firmware, so gets no firmware credit |
| M5StampFly | 1 | raptor: same ecosystems quote (S5 10 Jul) |
| ROS | 1 | falcongym: "a stable 20 Hz control loop via ROS topics" (S5 10 Jul) |

Not stated: monorace, flysec, attn, wheeled, pixels, diffphys (6 of 10).

## 7. Code releases and implementation language

Three of ten state a release. Implementation language is stated by exactly one paper; the gap stays visible.

| Item | Count | Members and evidence |
|---|---|---|
| Open-source release stated by the authors | 3 | flysec: "the code and simulator are open source" (page); this project's designated I2 baseline · simpleflight: open-source access to both the code and the model checkpoints (page) · wheeled: "The full stack, from hardware to software, is low-cost and open-source" (page); project site live-verified 10 Jul 2026 |
| Implementation language stated | 1 | diffphys: depth renderer "implemented with CUDA as a PyTorch extension" (S5 11 Jul) |

No release stated: falcongym, raptor, monorace, e2efly, attn, pixels, diffphys (7 of 10).

---

## Corrections applied during the grounding pass (12 July 2026)

1. flysec code release restricted to "code and simulator" (the page's author-attributed claim); the
   checkpoints phrasing on our page is relevance commentary, not an author claim. Checkpoints credit belongs
   to simpleflight only.
2. Gaussian Splatting (falcongym) excluded: named by the authors as FUTURE WORK, never used; it must not
   read as a used component.
3. raptor's accelerometer-integral overlay excluded from sensors: it is a latency-compensation technique
   (already counted in the method registry), not a stated sensor deployment.
4. "End-to-end RL" excluded as a stack item: it is a registry method (count 8/10 there); repeating it here
   with facet-local counting would create a conflicting number on the same page.
5. monorace's "end-to-end (perception-to-action)" qualifier avoided: the paper's vision and control are
   decoupled; its page names end-to-end learning as the authors' future work.

## How this file is used

- site/index.html renders this data as the "Shared stack" stripe (facet cards, counts, evidence modals) and
  as the knowledge graph's second lens (papers ↔ stack items, node size = count).
- Update rule: when a new batch is extracted and S5-verified, re-derive the counts here first, then update
  the site constants, then the README site map if the shape changes (update protocol step order).
