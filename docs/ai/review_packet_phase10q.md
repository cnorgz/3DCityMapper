# Review Packet — Phase 10q

## Metadata
- branch: refactor/phase10q-docs-readme-structure
- base_commit: 67065ce
- phase_end_commit: 5fccf75
- packet_commit: PENDING (self-reference; see git log)
- focus_paths: docs/README.md docs/ai/review_packet_phase10q.md REFACTOR_LOG.md
- probe: NOT RUN (docs-only)

## Notes
- Using git show --unified=12 for bounded commit diff.


## Evidence Bundle

### `command -v rg >/dev/null && echo "rg=1" || echo "rg=0"`
```text
rg=1
```

### `git status -sb`
```text
## refactor/phase10q-docs-readme-structure
```

### `git rev-parse --short HEAD`
```text
5fccf75
```

### `git log --oneline --decorate -n 25`
```text
5fccf75 (HEAD -> refactor/phase10q-docs-readme-structure) docs(phase10q): document docs/ vs root-stubs structure
67065ce (refactor/phase10p-doc-links-sanity-2) docs(ai): add review packet for phase 10p
3d2d676 docs(phase10p): fix broken doc links after /docs normalization
31fbfc5 (refactor/phase10o-root-stub-normalize) docs(ai): add review packet for phase 10o
77715e0 docs(phase10o): normalize root doc stubs
e4c3653 (refactor/phase10n-docs-index-map) docs(ai): add review packet for phase 10n
7b34dd5 docs(phase10n): add docs index + stub policy
70d63fa (refactor/phase10m-phase10-packet-index-refresh) docs(ai): add review packet for phase 10m
527a133 docs(phase10m): refresh Phase 10 review packet index
bf96fef (refactor/phase10l_1-log-metadata) docs(ai): add review packet for phase 10l_1
1069d02 docs(phase10l_1): backfill phase10l log metadata
ac7a562 (refactor/phase10l-phase10-log-scan) docs(ai): add review packet for phase 10l
c7f0703 docs(phase10l): scan and backfill Phase 10 log metadata
be26321 (refactor/phase10k-archive-note) docs(ai): add review packet for phase 10k
8ad7760 docs(phase10k): add archive note to docs README
ad6561e (refactor/phase10j-doc-links-sanity) docs(ai): add review packet for phase 10j
b0c60d8 docs(phase10j): verify docs link sanity
782c8e9 (refactor/phase10i-phase10-packet-index) docs(ai): add review packet for phase 10i
132d09d docs(phase10i): add Phase 10 review packet index
e0d7111 (refactor/phase10h-contracts-doc) docs(ai): add review packet for phase 10h
74892c4 docs(phase10h): add contracts cheat sheet
3da1d2e (refactor/phase10g-docs-readme) docs(ai): add review packet for phase 10g
2ae3523 docs(phase10g): add docs README landing page
3de43d0 (refactor/phase10f-docs-dir-normalize-extra) docs(ai): add review packet for phase 10f
999f6ad docs(phase10f): normalize extra docs under /docs
```

### `git diff --stat <base>...<phase_end>`
```text
 REFACTOR_LOG.md | 9 +++++++++
 docs/README.md  | 5 +++++
 2 files changed, 14 insertions(+)
```

### `git diff --check <base>...<phase_end>`
```text
(no output)
```

### `git diff -U15 <base>...<phase_end> -- $FOCUS_PATHS`
```diff
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index df78723..3bd30cc 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -749,15 +749,24 @@ Probe check (post-extraction):
 - branch: refactor/phase10o-root-stub-normalize
 - base_commit: e4c3653
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10p – Doc links sanity after root/docs normalization

 - branch: refactor/phase10p-doc-links-sanity-2
 - base_commit: 31fbfc5
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)
+
+### Phase 10q – Docs README structure note
+
+- branch: refactor/phase10q-docs-readme-structure
+- base_commit: 67065ce
+- phase_end_commit: PENDING
+- packet_commit: PENDING
+- capture_method: n/a (docs-only)
+- probe: NOT RUN (docs-only)
diff --git a/docs/README.md b/docs/README.md
index ffc9893..a1b893e 100644
--- a/docs/README.md
+++ b/docs/README.md
@@ -1,20 +1,25 @@
 # 3DCityMapper Docs Index

 See also:
 - `docs/DOCS_INDEX.md` for canonical docs vs root stub policy.

+## Structure
+- Canonical docs live under `/docs`.
+- Root-level `*.md` files are convenience stubs.
+- Index and policy reference: [DOCS_INDEX.md](DOCS_INDEX.md).
+
 Read first:
 - [ARCHITECTURE](ARCHITECTURE.md)
 - [COORDINATES](COORDINATES.md)
 - [SCANNER](SCANNER.md)
 - [INPUTS](INPUTS.md)
 - [EDITOR_TOOLS](EDITOR_TOOLS.md)

 Extra docs:
 - [BLUEPRINT_SPEC](BLUEPRINT_SPEC.md)
 - [PERSISTENCE](PERSISTENCE.md)
 - [DEV_DEBUG](DEV_DEBUG.md)
 - [LOCALSTORAGE_KEYS](LOCALSTORAGE_KEYS.md)

 Note:
 - Older historical docs may exist under `/archive`; they are not authoritative.
```

### `git show --no-ext-diff --unified=12 <phase_end> -- $FOCUS_PATHS`
```diff
commit 5fccf754fa63ee94be98037f692ca08e8f1654af
Author: xavstack <your.email@example.com>
Date:   Fri Feb 13 02:20:43 2026 +0100

    docs(phase10q): document docs/ vs root-stubs structure

diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index df78723..3bd30cc 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -752,12 +752,21 @@ Probe check (post-extraction):
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10p – Doc links sanity after root/docs normalization

 - branch: refactor/phase10p-doc-links-sanity-2
 - base_commit: 31fbfc5
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)
+
+### Phase 10q – Docs README structure note
+
+- branch: refactor/phase10q-docs-readme-structure
+- base_commit: 67065ce
+- phase_end_commit: PENDING
+- packet_commit: PENDING
+- capture_method: n/a (docs-only)
+- probe: NOT RUN (docs-only)
diff --git a/docs/README.md b/docs/README.md
index ffc9893..a1b893e 100644
--- a/docs/README.md
+++ b/docs/README.md
@@ -1,17 +1,22 @@
 # 3DCityMapper Docs Index

 See also:
 - `docs/DOCS_INDEX.md` for canonical docs vs root stub policy.

+## Structure
+- Canonical docs live under `/docs`.
+- Root-level `*.md` files are convenience stubs.
+- Index and policy reference: [DOCS_INDEX.md](DOCS_INDEX.md).
+
 Read first:
 - [ARCHITECTURE](ARCHITECTURE.md)
 - [COORDINATES](COORDINATES.md)
 - [SCANNER](SCANNER.md)
 - [INPUTS](INPUTS.md)
 - [EDITOR_TOOLS](EDITOR_TOOLS.md)

 Extra docs:
 - [BLUEPRINT_SPEC](BLUEPRINT_SPEC.md)
 - [PERSISTENCE](PERSISTENCE.md)
 - [DEV_DEBUG](DEV_DEBUG.md)
 - [LOCALSTORAGE_KEYS](LOCALSTORAGE_KEYS.md)
```

## Packet Commit Evidence (Pre-Commit)
### `git diff --stat --cached`
```text
 docs/ai/review_packet_phase10q.md | 213 ++++++++++++++++++++++++++++++++++++++
 1 file changed, 213 insertions(+)
```

### `git diff --check --cached`
```text
(no output)
```

## Carry-Forward
- P0: none
- P1: none
- P2: none
