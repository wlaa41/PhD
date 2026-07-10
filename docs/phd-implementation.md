# Implementation Track Specification
## From registry to running hardware, in parallel with the review

Companion to phd-pipeline.md. The literature pipeline (S1 to S9) produces the argument; this track produces the evidence of capability that Chapter 4 of the transfer report requires (phd-transfer-report.md section 1) and the infrastructure the whole PhD then runs on. It starts in week 1, not after the review, because environment bring-up has long lead times and zero dependency on the corpus.

---

## 1. Why a parallel track

- A transfer report with no real-hardware result is a literature survey with ambitions. One modest, honest sim-to-real demonstration changes the panel's capability question from "can they?" to "how far can they go?".
- Infrastructure failures (driver hell, firmware mismatches, TensorRT export bugs) are discovered in week 2 instead of month 8.
- The pilot experiment stress-tests the selected gap: if the minimum viable version is infeasible on the owned hardware, Gate 2 needs to know before the direction is locked.

The track has three phases: **I1 Infrastructure**, **I2 Baseline**, **I3 Pilot**. I1 and I2 are corpus-independent and start immediately. I3 depends on Gate 2 (direction selected).

---

## 2. Experiment state machine

Every experiment is a tracked object in `data/registry/experiments.json`, mirroring the paper state machine. Nothing is half done.

```
planned -> simulated -> sitl -> hitl -> tethered -> flown -> analyzed -> reported
              |           |       |         |
           blocked     blocked  blocked   aborted (safety) -> revised -> planned
```

Each transition requires the written pass criterion of the current rung to be met and logged. The dashboard renders experiments exactly as it renders papers: from the registry, current state visible, no state skipped.

Schema:

```json
{
  "id": "pilot-01-latency-adaptive-hover",
  "phase": "I3",
  "rq": "RQ1",
  "hypothesis": "one falsifiable sentence",
  "gap_id": "gap-cluster-id from gaps.json",
  "methods_kept": ["method-id", "..."],
  "novel_component": "one sentence: the thing no counted method provides",
  "baseline": "method-id + source paper id",
  "metrics": [{"name": "position RMSE", "unit": "m", "target": 0.15}],
  "seeds": 3,
  "real_trials_per_condition": 5,
  "pass_criteria_per_rung": {"sitl": "", "hitl": "", "tethered": "", "flown": ""},
  "kill_condition": "the result that falsifies the hypothesis",
  "status": "planned",
  "results_ref": "experiments/results/pilot-01/",
  "safety_review": "hardware-safety checklist id + date"
}
```

---

## 3. I1 Infrastructure bring-up (weeks 1 to 3, parallel with S1 to S4)

Each item has an acceptance test. The item is not done until the test passes and the command or log proving it is committed to `experiments/logs/i1/`.

| # | Item | Acceptance test |
|---|---|---|
| I1.1 | WSL2 Ubuntu 22.04 + CUDA on A4000 | `nvidia-smi` inside WSL2; a CUDA sample compiles and runs |
| I1.2 | Isaac Lab install | Bundled quadcopter example trains for 1,000 iterations without error; FPS logged |
| I1.3 | Aerial Gym install | Example task trains; throughput vs Isaac Lab logged (informs simulator choice) |
| I1.4 | PX4 v1.15 SITL + ROS 2 Humble + XRCE-DDS | SITL drone arms, takes off, and follows a square via ROS 2 offboard; rosbag committed |
| I1.5 | Jetson Orin Nano flashed (JetPack), TensorRT working | A reference ONNX model runs under `trtexec`; latency and memory logged |
| I1.6 | Jetson <-> Pixhawk 6X serial + XRCE-DDS bridge on bench | uORB topics visible from ROS 2 on the Jetson; round-trip latency measured |
| I1.7 | X500 V2 bench bring-up (no props) | Motors spin via offboard command, kill switch verified, failsafes configured and triggered deliberately once |
| I1.8 | Repo CI habit | `experiments/` layout, logging convention, and rosbag naming fixed and documented |

Fallbacks: if Isaac Lab is unstable under WSL2, dual-boot Ubuntu is the known-good path; decide by end of week 2, do not burn week 3 on environment debugging (risk R1).

## 4. I2 Baseline reproduction (weeks 3 to 6, parallel with S4 to S6)

Reproduce one published, well-documented zero-shot pipeline end to end. Default: a hover/waypoint tracking policy in the Learning-to-Fly-in-Seconds line or an Isaac Lab quadcopter task, whichever the corpus marks as best documented. This is deliberately unoriginal: the goal is proving the loop, and producing the latency numbers every later decision filters against.

| # | Step | Acceptance test |
|---|---|---|
| I2.1 | Train policy, 3 seeds | Reward curves committed; sim tracking RMSE within paper's reported band |
| I2.2 | Export ONNX -> TensorRT | Numerical parity check sim vs TensorRT output (max abs diff logged) |
| I2.3 | Benchmark on Orin Nano | Inference latency (mean, p99) and control-rate headroom logged; this number goes in the transfer report |
| I2.4 | SITL deployment | TensorRT policy flies the SITL drone; rosbag committed |
| I2.5 | HITL on bench | Policy runs on Jetson against real Pixhawk, no props |
| I2.6 | Tethered flight | Written pass criterion met (e.g. 30 s stable hover, position error bounded); video + rosbag |
| I2.7 | Free flight (optional for transfer) | Only if tethered is clean and supervision available |

I2.6 is the minimum Chapter 4 headline. Everything after is bonus.

## 5. I3 Pilot experiment (weeks 7 to 9, after Gate 2)

The minimum viable version of the selected direction: the smallest experiment that produces evidence the novel control model is worth a PhD. Designed with `/experiment-plan`, which must emit a complete experiments.json entry (schema above) including baseline, metrics, kill condition, and per-rung pass criteria before any code is written.

Requirements:
- The pilot must reuse the I2 stack unchanged except for the novel component. One variable at a time; the comparison against the I2 baseline is the result.
- Gate 2 output (gaps.json recommended direction) must include the pilot spec. A direction whose minimum viable pilot cannot run on the owned hardware within 3 weeks is demoted; the shortlist has 3 entries for exactly this reason.
- Results, positive or negative, are written up in Chapter 4 with the statistics standards below. A negative pilot with a diagnosed cause is acceptable transfer evidence; a missing pilot is not.

---

## 6. Safety: the flight ladder

Enforced by `hardware-safety` skill and the ros2-px4-engineer agent. No rung is skipped, ever, including "trivial" changes.

```
unit tests -> simulation -> SITL -> HITL (bench, no props)
   -> tethered flight -> free flight
```

- Every rung has a written pass criterion recorded in experiments.json before the rung is attempted.
- Any anomaly at any rung: stop, log, return to the previous rung after the fix.
- Tethered and free flights: pre-flight checklist (props, battery, failsafe, kill switch, geofence, observer present), site and weather constraints, and lipo-safe charging noted in the log.
- The Bambu H2C prints the tether mount and prop guards before the first tethered flight (flag in week 4 so printing is not the blocker).

## 7. Risk register (lives in reports/transfer-report/risk-register.md, summarized in Ch. 5)

| Id | Risk | L | I | Mitigation |
|---|---|---|---|---|
| R1 | Isaac Lab unstable under WSL2 | M | M | Decide dual-boot by end week 2; Aerial Gym as fallback simulator |
| R2 | Orin Nano latency insufficient for candidate methods | M | H | I2.3 benchmark early; latency budget becomes a hard filter at Gate 2 |
| R3 | Sim-to-real gap swamps pilot signal | M | H | I2 baseline isolates platform gap from method gap; report both |
| R4 | Crash damages X500 | M | M | Ladder discipline; printed guards; spare frame + props budgeted |
| R5 | Corpus slips, writing squeezed | M | H | Ch. 2 drafted incrementally from week 4 (phd-transfer-report.md section 7) |
| R6 | Selected gap already closed by unpublished/concurrent work | L | H | Scout re-run on arXiv in week 7; contingency = shortlist entry 2 |
| R7 | Single-person project stalls (illness, hardware lead times) | M | M | Weekly Friday commit is the recovery point; all state in registry |

## 8. Statistics and reporting standards

- Training: >= 3 seeds, report mean and standard deviation, all seeds committed.
- Real hardware: >= 5 trials per condition; report mean, standard deviation, and failure count. Failures are data.
- Sim vs real reported as paired numbers for the same metric; the gap itself is a headline figure.
- Every figure in the report regenerates from committed logs via a script in `experiments/results/`; no hand-made numbers.

## 9. How results flow back

```
experiments/logs + results  ->  experiments.json (registrar merges, same
single-writer rule as papers)  ->  dashboard Experiments page  ->
transfer report Ch. 4 (/phd-writing)  ->  /citation-audit (experiment ids
resolve like paper ids)
```

The provenance chain from phd-pipeline.md section 5 extends to experiments: report sentence -> experiment id -> experiments.json -> results directory -> rosbag/log. An examiner's challenge to a pilot claim resolves in under a minute, same as a literature claim.
