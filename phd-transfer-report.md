# Transfer Report Specification
## What the document must be, not just how it is produced

Companion to phd-architecture.md and phd-pipeline.md. The pipeline builds the evidence; this file defines the paper the evidence must become. `/phd-writing` and `thesis-reviewer` both treat this document as their contract.

---

## 1. What examiners actually assess at transfer

An MPhil to PhD transfer panel is answering five questions. Every section of the report exists to answer one of them, and the report fails if any one is left implicit.

| Examiner question | Where it is answered | Evidence source |
|---|---|---|
| Does the candidate command the field? | Ch. 2 Literature review | registry: comparison matrix, method frequency table |
| Is there a real, defensible gap? | Ch. 2.6 and Ch. 3 | gaps.json: recurrence counts, feasibility filter |
| Are the research questions PhD-sized and falsifiable? | Ch. 3 | RQ/hypothesis/metric table (section 4 below) |
| Can this candidate actually do the work? | Ch. 4 Preliminary work | experiments.json: pilot results, infrastructure evidence |
| Is the plan feasible in the time remaining? | Ch. 5 Research programme | timeline, risk register, hardware map |

The single most common transfer failure is a competent literature survey attached to a vague plan and no evidence of capability. Chapter 4 (preliminary work) is what separates an outstanding transfer from a pass: it proves the candidate has closed the loop from simulation to hardware at least once, however modestly. That is why the implementation track (phd-implementation.md) runs in parallel with the review, not after it.

---

## 2. Report structure and word budgets

Target 10,000 to 12,000 words excluding references and appendices. Check City's current transfer regulations for the hard limit and adjust proportionally; the ratios below hold regardless.

```
Abstract                    250 words   the argument spine in miniature
1  Introduction           1,200 words   motivation, platform, contribution claim
2  Literature review      4,500 words   the registry, narrated
   2.1  Scope and method    400         corpus rules, PRISMA-style flow of the
                                        candidate -> triaged -> integrated funnel
   2.2  The zero-shot deployment problem   600
   2.3  Convergent methods  1,400        essential methods (count >= 8), what the
                                        field agrees on, with frequency evidence
   2.4  Contested and emerging methods  900   count 3 to 7, disagreements,
                                        rare methods where novelty may live
   2.5  Pipelines in practice  600      how working systems are actually built,
                                        from pipelines.json, 2 to 3 exemplars
   2.6  Gap analysis         600        clustered limitations, recurrence counts,
                                        the shortlist of 3
3  Research questions     1,000 words   the selected gap, RQs, hypotheses,
                                        contribution claims
4  Preliminary work       2,000 words   infrastructure, baseline reproduction,
                                        pilot experiment results
5  Proposed programme     2,000 words   work packages, timeline, milestones,
                                        risk register, training plan
6  Conclusion               300 words
References                                APA 7th, every entry resolvable
Appendices                                comparison matrix, method frequency
                                          table, full pipeline diagrams,
                                          extended pilot data
```

Rules:
- The comparison matrix and frequency table appear in appendices in full and in the body only as excerpts. Examiners skim appendices; the body must carry the argument on its own.
- Chapter 2 is generated from the registry via `/phd-writing` and then rewritten for narrative flow. The registry guarantees the facts; the candidate supplies the argument. A chapter that reads like a database dump fails the "commands the field" test even when every fact is correct.
- Chapter 4 reports negative and partial results honestly. "The policy transferred with degraded tracking (RMSE 0.31 m vs 0.12 m in sim); we attribute this to unmodelled battery sag, see risk R3" is stronger transfer evidence than a suspiciously clean result.

---

## 3. The argument spine

The whole report is one chain of reasoning. Write it as a single paragraph first; every chapter then expands one link. If the chain does not survive being stated in six sentences, the report is not ready.

Template, to be instantiated from the registry after Gate 2:

1. **Convergence**: across N papers (2022 to 2026), zero-shot deployment pipelines converge on {essential methods, with counts}: these are necessary infrastructure, not contributions.
2. **Residual failure**: despite this convergence, {gap cluster}, reported as a limitation in {k >= 3} papers ({ids}), remains unsolved.
3. **Why now**: {rare or missing method / new capability} makes the gap tractable now and explains why it is not already solved.
4. **Claim**: a control model that {one sentence} can close this gap while retaining the essential methods.
5. **Evidence of capability**: a pilot on {hardware} demonstrates {result}, showing the candidate can execute the full sim-to-real loop.
6. **Plan**: three work packages deliver the model, its evaluation, and its cross-platform extension within the remaining registration period.

Every sentence in the spine must be backed by a registry artefact: counts from methods.json, recurrence from gaps.json, results from experiments.json. `thesis-reviewer` checks the spine against the registry before checking anything else.

---

## 4. Research questions: rules and template

A transfer-grade RQ is falsifiable, measurable on the available hardware, and sized so that answering it is a thesis chapter, not a career.

| Field | Rule |
|---|---|
| RQ | One sentence, interrogative, no compound questions |
| Hypothesis | A directional, falsifiable claim the RQ tests |
| Metric | Named, unit-bearing, measurable with owned equipment |
| Baseline | The best-supported existing method from the registry (cite counts) |
| Experiment | Points to an experiments.json id or a planned entry |
| Kill condition | The result that would falsify the hypothesis, stated in advance |

Aim for one primary RQ and two subsidiary RQs. Each subsidiary RQ should survive the primary RQ failing (partial credit structure: even if the headline model underperforms, the thesis still contains publishable findings).

Anti-patterns the reviewer rejects: RQs that are engineering tasks in disguise ("can we build X"), RQs with no baseline, RQs whose metric needs equipment not on the hardware map, hypotheses that cannot lose.

---

## 5. Evidence standards (enforced by thesis-reviewer and /citation-audit)

1. Every empirical claim carries a paper id; every paper id resolves to a `verified` registry entry whose content actually supports the claim.
2. Every method usage count quoted in prose matches methods.json at time of writing. `/citation-audit` recomputes and diffs.
3. Every preliminary result states: seeds (>= 3 for training runs), trials (>= 5 per real-world condition), mean and standard deviation, and failure count. No cherry-picked single runs.
4. Speculation is legal but labelled: "we conjecture", "untested", never mixed into evidence sentences.
5. Limitations of the candidate's own pilot work get the same treatment demanded of the corpus papers: an explicit stated-limitations paragraph in Chapter 4.
6. UK English, academic register, no em dashes, APA 7th.

---

## 6. Pre-submission checklist and mock viva

### Checklist (all must pass before Gate 3 sign-off)

- [ ] Argument spine stated in the abstract and traceable through every chapter
- [ ] Corpus funnel numbers (found / triaged / integrated) reported in 2.1
- [ ] Every RQ has hypothesis, metric, baseline, experiment id, kill condition
- [ ] Chapter 4 contains at least one real-hardware result with statistics
- [ ] Timeline covers registration period end to end with named milestones
- [ ] Risk register present with mitigation per risk (phd-implementation.md section 7)
- [ ] `/citation-audit` clean; thesis-reviewer findings all resolved or waived with reason
- [ ] Appendices complete; dashboard URL included for the panel
- [ ] Word count within regulations

### Mock viva question bank

`thesis-reviewer` generates a tailored set after each full draft; these are the standing ones. For each, the answer must already exist in a named artefact.

1. Why is your gap not already solved by {highest-count adjacent method}? (gaps.json novelty check)
2. Your frequency analysis: how did you avoid double-counting synonymous methods? (methods-decisions.md)
3. Why 2022 as the cutoff, and what do you lose by it? (corpus rules, 2.1)
4. Your pilot underperforms the sim result. Why should we believe the full model will close the gap? (Ch. 4 limitations + risk register)
5. What happens to the thesis if hypothesis H1 is false? (partial credit structure, section 4 above)
6. Why quadrotors first, and what evidence supports the claim that the method extends to the RoboMaster arm? (cross-platform anchors in the corpus)
7. Jetson Orin Nano inference budget: what is your measured latency headroom and which candidate methods does it exclude? (experiments.json baseline benchmarks)
8. Which of your 50 papers would you remove, and why was it included? (triage rubric, rejection log)
9. What distinguishes your contribution from {most similar paper}? (comparison matrix)
10. Show me the provenance for the claim on page X. (provenance chain, must resolve in under a minute)
11. What would make you abandon this direction by month 6? (kill conditions + risk register)
12. What is your safety case for free flight? (flight ladder, phd-implementation.md)

---

## 7. Writing workflow

```
1. Instantiate the argument spine from the registry (after Gate 2).
   You write this by hand; it is the one thing not generated.
2. /phd-writing drafts Ch. 2 section by section from the registry.
3. You rewrite for narrative; facts stay pinned to registry ids.
4. Ch. 3 and 5 drafted from gaps.json + experiments.json plans.
5. Ch. 4 drafted from experiments.json results + experiment logs.
6. thesis-reviewer, cold context, full pass. Fix blockers and majors.
7. /citation-audit. Fail -> rewrite or cut the sentence, no exceptions.
8. Second cold thesis-reviewer pass on the revised draft.
9. Checklist above. Gate 3: your sign-off. Freeze, format, submit.
```

Cadence: Ch. 2 can be drafted incrementally from week 4 onwards (the registry is already partially populated); do not wait for the corpus to be complete. Chapters 3 to 5 wait for Gate 2 and the pilot. The two cold review passes are not negotiable; the second pass regularly catches regressions introduced while fixing the first pass's findings.
