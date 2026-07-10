# Processing Pipeline Specification
## How every paper flows from discovery to the dashboard and the report

Companion to phd-architecture.md. The architecture defines the environment; this defines the machine that runs inside it. Add both to Claude Code and the Project. The implementation track that runs in parallel (experiments, hardware, pilot) is specified in phd-implementation.md; the document this machine ultimately produces is specified in phd-transfer-report.md.

---

## 1. The paper state machine

Every paper is a tracked object with a `status` field in `papers.json`. Nothing is "half done"; a paper is always in exactly one state.

```
candidate -> triaged -> acquired -> extracted -> verified -> integrated
     |          |           |            |
  rejected   rejected   unavailable   quarantined -> (fixed) -> verified
```

| State | Meaning | Set by |
|---|---|---|
| candidate | Found by discovery, not yet scored | S1 |
| triaged | Scored and ranked, awaiting your approval | S2 |
| rejected | Cut at triage or by you; kept with reason for audit | S2 / Gate 1 |
| acquired | PDF in repo and uploaded to NotebookLM | S3 |
| unavailable | PDF not obtainable; replacement candidate promoted | S3 |
| extracted | JSON draft written, not yet trusted | S4 |
| quarantined | Failed verification; mismatch logged, needs re-read | S5 |
| verified | Passed the NotebookLM cross-check | S5 |
| integrated | Methods merged into registry, counts recomputed | S6 |

Dashboard and vault only ever render `verified` and `integrated` papers. Quarantined papers are visible in a work queue, never in the analysis.

---

## 2. Stage contracts

Each stage: input, process, output, owner, gate, failure path.

### S1 Discover
- **Input**: the litreview command brief (scope, 2022+, zero-shot focus).
- **Process**: Claude Code searches arXiv, Semantic Scholar, Google Scholar and venue proceedings; NotebookLM source discovery in parallel; snowball from reference lists of anchor papers (Kaufmann/Scaramuzza line, Learning to Fly in Seconds, RMA family, recent VLA works).
- **Output**: ~100 to 120 rows in `candidates.json`: title, authors, year, venue, arXiv/DOI, one-line relevance note.
- **Owner**: Claude Code (`/corpus-search`).
- **Failure path**: too few drone-specific hits in a category -> widen to adjacent platforms, flag the thinness as a finding (thin literature is itself evidence for the gap analysis).

### S2 Triage
- **Process**: score every candidate 0 to 100 with a fixed rubric:
  - Recency: 2025 to 26 = 25, 2024 = 20, 2023 = 12, 2022 = 6
  - Real-hardware evidence: strong = 25, moderate = 15, weak = 5, none = 0
  - Zero-shot status: zero = 20, semi = 12, no = 0
  - Venue tier and citation velocity: up to 15
  - Drone relevance (or cross-platform anchor value): up to 15
- **Output**: ranked list; top ~50 proposed, next 15 held as reserves.
- **Gate 1 (you)**: approve, veto, or swap papers. Vetoes recorded with reason.
- **Failure path**: none; this stage cannot fail, only be overridden by you.

### S3 Acquire
- **Process**: download PDFs to `docs/literature/pdfs/{paper-id}.pdf`; upload the identical set to one NotebookLM notebook (50 sources fits a single notebook). Filename = paper id everywhere: repo, NotebookLM, registry, vault, webapp all join on this key.
- **Failure path**: paywalled -> try arXiv version, author page, lab page. Still nothing -> mark `unavailable`, promote the top reserve, log the swap.

### S4 Extract
- **Process**: `/paper-extract` on batches of 5. Per paper: full schema entry in `papers.json` (status `extracted`), pipeline stage array in `pipelines.json`, provisional method tags. Rule: "not stated" over guessing; every quantitative claim carries a page or section reference in a `provenance` field.
- **Owner**: Claude Code, literature-reviewer agent.
- **Failure path**: scanned/unreadable PDF -> OCR pass; still failing -> quarantine with reason.

### S5 Verify (the anti-hallucination gate)
- **Process**: for each extracted paper, ask NotebookLM five fixed questions grounded only in that PDF:
  1. What platform and hardware was used?
  2. Was deployment zero-shot, semi, or neither?
  3. What transfer/deployment methods does the paper use?
  4. What is the headline real-world result?
  5. What limitations and future work do the authors state?
- Compare NotebookLM answers with the extraction. All five consistent -> `verified`. Any mismatch -> `quarantined` with the discrepancy logged; Claude re-reads the specific section and either fixes the extraction or marks the field `unverified`. Also: DOI/arXiv id must resolve.
- **Why it works**: two independent models reading the same PDF rarely hallucinate the same fact. Agreement is strong evidence; disagreement is a flag, cheap to check.

### S6 Integrate
- **Process**: `/method-registry` merges the batch's provisional method tags into `methods.json` using the alias table (section 3), recomputes `usage_count` for every method, updates `trend` from year buckets, validates that every pipeline stage references a registered method id.
- **Output**: consistent registry; the frequency table is always current after every batch.
- **Failure path**: ambiguous method (is "actuator noise injection" a DR variant or its own method?) -> decision logged in `methods-decisions.md`, applied consistently forever after.

### S7 Analyze (runs once >= 80% of corpus is integrated)
- **Process**:
  1. Frequency table finalized; methods split into essential (count >= 8), common (3 to 7), rare (1 to 2).
  2. Per-method synthesis notes: agreements, contradictions, best drone recipe (full note for count >= 3, short flag for rare).
  3. Gap clustering: pool all `limitations_future_work` strings, cluster thematically, count recurrence, filter by hardware feasibility (X500 V2 + Orin Nano + A4000 + RoboMaster EP), check novelty against the registry (a gap already covered by a counted method is not a gap).
  4. Output ranked shortlist of 3 gaps + 1 recommended direction, each justified with frequency data: which essential methods the new control model keeps, which rare or missing piece it builds on. Each shortlisted gap carries a minimum viable pilot sketch (phd-implementation.md section 5); a gap without a 3-week-feasible pilot on the owned hardware is demoted.
- **Gate 2 (you)**: pick the direction AND approve its pilot spec together; the pilot (I3) starts from this decision. Recorded in `gaps.json` as `selected: true` with the pilot's experiments.json id.

### S8 Render
- **Process**: `/vault-build` regenerates the Obsidian vault from the registry; Understand-Anything wiki skill regenerates the knowledge graph; `/dashboard-sync` copies registry to `webapp/public/data/` and rebuilds. Codex reviews any generator changes; Antigravity runs the browser E2E checklist (every page loads, filters work, all 50 papers render, pipeline compare mode works, no console errors) and screenshots each page.
- **Rule**: rendering is idempotent. Run it twice, get the same output. Never hand-edit generated files.

### S9 Write
- **Process**: `/phd-writing` drafts report sections pulling only from the registry and synthesis notes. Every claim carries a paper id.
- **Gate 3 (`/citation-audit`)**: every claim resolves to a verified paper; 10 random claims per section spot-checked against NotebookLM. Fail -> the sentence is rewritten or cut. No exceptions.

---

## 3. Method merge rules (keeps counting honest)

The usage counts are your headline analysis, so the registry must not double-count or fragment methods.

1. **Canonical ids**: kebab-case, specific: `domain-randomization-dynamics`, `domain-randomization-visual`, `teacher-student-distillation`, `rma-latent-adaptation`, `residual-policy-on-classical-controller`, `action-delay-modelling`, `tensorrt-onboard-inference`.
2. **Alias table** in `methods.json`: "dynamics randomization", "DR over physical parameters", "randomized dynamics" all map to `domain-randomization-dynamics`. Every new phrasing gets an alias entry, never a new method, unless it is genuinely distinct.
3. **Split test**: two phrasings are the same method if swapping them in a paper's pipeline changes nothing about what was built. If the mechanism differs (latent adaptation vs online system ID), they stay separate.
4. **Every decision logged** in `methods-decisions.md` with one line of reasoning, so counting is reproducible and defensible in the viva.
5. **Count = number of distinct papers**, not mentions. A paper using DR in three places counts once for DR.

---

## 4. Weekly operating cadence

```
Mon    Extract batch A (5 papers)         S4
Tue    Verify batch A, fix quarantines    S5
Wed    Extract batch B (5 papers)         S4
Thu    Verify batch B, integrate A+B      S5, S6
Fri    Render, read vault in Obsidian,    S8 + human
       annotate, promote annotations
       to registry, commit
```

10 papers per week -> full 50-paper corpus extracted, verified and integrated in ~5 weeks. Rendering every Friday means the dashboard is never more than a week stale, so you can show supervisors live progress at any point.

The implementation track (phd-implementation.md) runs alongside; its work slots into mornings or a fixed 2-hour daily block, whichever survives contact with reality, and its Friday state is committed with everything else.

### Full programme to submission

```
Wk 1-2   S1-S2 discover + triage, GATE 1   | I1 infrastructure bring-up
Wk 3     S3-S4 acquire, first extractions  | I1 finish, I2 training starts
Wk 4-5   S4-S6 batches, verify, integrate  | I2 TensorRT, Orin benchmark,
         Ch. 2 drafting starts (from wk 4) |    SITL, HITL
Wk 6     S7 analysis, GATE 2 (direction    | I2 tethered flight
         + pilot spec chosen together)     |
Wk 7-9   S8 render, Ch. 2 revision         | I3 pilot experiment
Wk 10-11 S9 write Ch. 3-5, cold review,    | results analysis, figures
         /citation-audit, second review    |    regenerated from logs
Wk 12    Checklist, GATE 3, freeze, submit + buffer
```

Slack lives in week 12 and in the I2 optional rungs; if the corpus slips, Ch. 2 drafting from week 4 (risk R5) keeps writing off the critical path.

---

## 5. Provenance chain (viva-proofing)

Every fact is traceable end to end:

```
Report sentence -> paper id -> papers.json entry -> provenance
(page/section) -> PDF in repo -> NotebookLM verification record

Report sentence -> experiment id -> experiments.json entry ->
results directory -> rosbag / training log / benchmark output
```

If an examiner challenges any claim in the transfer report, literature or experimental, the chain resolves in under a minute. This is the property the whole pipeline is designed to guarantee.

---

## 6. What each tool sees at each stage

| Stage | Claude Code | NotebookLM | Codex | Antigravity | You |
|---|---|---|---|---|---|
| S1 Discover | drives | discovery assist | - | - | - |
| S2 Triage | scores | - | - | - | **Gate 1** |
| S3 Acquire | downloads | receives PDFs | - | - | - |
| S4 Extract | drives | - | - | - | - |
| S5 Verify | compares | **answers** | - | - | quarantine review |
| S6 Integrate | drives | - | - | - | alias disputes |
| S7 Analyze | drives | cross-corpus Q&A | - | Gemini long-context checks | **Gate 2** |
| S8 Render | generates | - | reviews code | **browser E2E** | Friday review |
| S9 Write | drafts | spot-checks | - | - | **Gate 3** sign-off |
| I1-I3 Implement | drives (ros2-px4-engineer) | - | reviews deployment code | - | flight go/no-go per rung |
