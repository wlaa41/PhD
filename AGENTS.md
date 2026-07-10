# Agent Context (Codex, Antigravity, and any non-Claude assistant)

Read CLAUDE.md in this directory — it is the single source of project context and applies to every AI tool
working in this repository, not only Claude. The non-negotiables, restated:

1. **THE LAW**: everything published is quoted or verified; nothing is invented. Unverified items are
   labelled, never hidden.
2. **THE REMOVAL RULE**: nothing is removed from site or docs without the owner's explicit permission;
   diff any rewrite against docs/site-content-inventory.md; removals are named in commit messages.
3. Tool lanes (docs/phd-architecture.md §2): Claude Code orchestrates and owns registry-type data; Codex is
   the second engineer (mechanical multi-file edits, design consultation — diffs are reviewed before commit);
   Antigravity browser-tests the future dashboard; NotebookLM verifies; no tool crosses lanes.
4. Never `git add -A` here; stage explicit paths. Never store credentials. UK English, no em dashes in docs/.
5. New paper pages copy site/papers/raptor-2026.html structurally; counts must stay consistent across
   index.html, corpus.html, README.md and docs/ in the same commit.
