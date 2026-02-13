# Review Packet — Phase 10n

## Metadata
- branch: refactor/phase10n-docs-index-map
- base_commit: 70d63fa
- phase_end_commit: 7b34dd5
- packet_commit: PENDING (self-reference; see git log)
- focus_paths: docs/DOCS_INDEX.md docs/README.md docs/ai/review_packet_phase10n.md REFACTOR_LOG.md
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
## refactor/phase10n-docs-index-map
```

### `git rev-parse --short HEAD`
```text
7b34dd5
```

### `git log --oneline --decorate -n 25`
```text
7b34dd5 (HEAD -> refactor/phase10n-docs-index-map) docs(phase10n): add docs index + stub policy
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
6f1c9b7 (refactor/phase10e_1-log-metadata) docs(ai): add review packet for phase 10e_1
31ce377 docs(phase10e_1): backfill phase10e log metadata
9b38c37 (refactor/phase10e-docs-dir-normalize) docs(ai): add review packet for phase 10e
363b3ce docs(phase10e): normalize minimum docs under /docs
b3db947 (refactor/phase10d_1-log-metadata) docs(ai): add review packet for phase 10d_1
7188087 docs(phase10d_1): backfill phase10d log metadata
```

### `git diff --stat <base>...<phase_end>`
```text
 REFACTOR_LOG.md    |  9 +++++++++
 docs/DOCS_INDEX.md | 18 ++++++++++++++++++
 docs/README.md     |  3 +++
 3 files changed, 30 insertions(+)
```

### `git diff --check <base>...<phase_end>`
```text
(no output)
```

### `git diff -U15 <base>...<phase_end> -- $FOCUS_PATHS`
```diff
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index b8f7a53..9f8eebc 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -722,15 +722,24 @@ Probe check (post-extraction):
 - branch: refactor/phase10l-phase10-log-scan
 - base_commit: be26321
 - phase_end_commit: c7f0703
 - packet_commit: ac7a562
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10m – Phase 10 packet index refresh

 - branch: refactor/phase10m-phase10-packet-index-refresh
 - base_commit: bf96fef
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)
+
+### Phase 10n – Canonical docs index + stub policy
+
+- branch: refactor/phase10n-docs-index-map
+- base_commit: 70d63fa
+- phase_end_commit: PENDING
+- packet_commit: PENDING
+- capture_method: n/a (docs-only)
+- probe: NOT RUN (docs-only)
diff --git a/docs/DOCS_INDEX.md b/docs/DOCS_INDEX.md
new file mode 100644
index 0000000..e42a170
--- /dev/null
+++ b/docs/DOCS_INDEX.md
@@ -0,0 +1,18 @@
+# 3DCityMapper Docs Index Map
+
+Canonical docs live under `/docs`.
+
+Root-level `*.md` files are lightweight stubs pointing to canonical docs in `/docs` for convenience.
+
+## Canonical Docs
+- [ARCHITECTURE](ARCHITECTURE.md)
+- [COORDINATES](COORDINATES.md)
+- [SCANNER](SCANNER.md)
+- [INPUTS](INPUTS.md)
+- [EDITOR_TOOLS](EDITOR_TOOLS.md)
+- [BLUEPRINT_SPEC](BLUEPRINT_SPEC.md)
+- [PERSISTENCE](PERSISTENCE.md)
+- [DEV_DEBUG](DEV_DEBUG.md)
+- [LOCALSTORAGE_KEYS](LOCALSTORAGE_KEYS.md)
+- [CONTRACTS](CONTRACTS.md)
+- [README](README.md)
diff --git a/docs/README.md b/docs/README.md
index 2c8ea07..b83473f 100644
--- a/docs/README.md
+++ b/docs/README.md
@@ -1,17 +1,20 @@
 # 3DCityMapper Docs Index

+See also:
+- `docs/DOCS_INDEX.md` for canonical docs vs root stub policy.
+
 Read first:
 - `docs/ARCHITECTURE.md`
 - `docs/COORDINATES.md`
 - `docs/SCANNER.md`
 - `docs/INPUTS.md`
 - `docs/EDITOR_TOOLS.md`

 Extra docs:
 - `docs/BLUEPRINT_SPEC.md`
 - `docs/PERSISTENCE.md`
 - `docs/DEV_DEBUG.md`
 - `docs/LOCALSTORAGE_KEYS.md`

 Note:
 - Older historical docs may exist under `/archive`; they are not authoritative.
```

### `git show --no-ext-diff --unified=12 <phase_end> -- $FOCUS_PATHS`
```diff
commit 7b34dd536f7c83724186fc792ecb50bf2ccfd781
Author: xavstack <your.email@example.com>
Date:   Fri Feb 13 02:18:20 2026 +0100

    docs(phase10n): add docs index + stub policy

diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index b8f7a53..9f8eebc 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -725,12 +725,21 @@ Probe check (post-extraction):
 - packet_commit: ac7a562
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10m – Phase 10 packet index refresh

 - branch: refactor/phase10m-phase10-packet-index-refresh
 - base_commit: bf96fef
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)
+
+### Phase 10n – Canonical docs index + stub policy
+
+- branch: refactor/phase10n-docs-index-map
+- base_commit: 70d63fa
+- phase_end_commit: PENDING
+- packet_commit: PENDING
+- capture_method: n/a (docs-only)
+- probe: NOT RUN (docs-only)
diff --git a/docs/DOCS_INDEX.md b/docs/DOCS_INDEX.md
new file mode 100644
index 0000000..e42a170
--- /dev/null
+++ b/docs/DOCS_INDEX.md
@@ -0,0 +1,18 @@
+# 3DCityMapper Docs Index Map
+
+Canonical docs live under `/docs`.
+
+Root-level `*.md` files are lightweight stubs pointing to canonical docs in `/docs` for convenience.
+
+## Canonical Docs
+- [ARCHITECTURE](ARCHITECTURE.md)
+- [COORDINATES](COORDINATES.md)
+- [SCANNER](SCANNER.md)
+- [INPUTS](INPUTS.md)
+- [EDITOR_TOOLS](EDITOR_TOOLS.md)
+- [BLUEPRINT_SPEC](BLUEPRINT_SPEC.md)
+- [PERSISTENCE](PERSISTENCE.md)
+- [DEV_DEBUG](DEV_DEBUG.md)
+- [LOCALSTORAGE_KEYS](LOCALSTORAGE_KEYS.md)
+- [CONTRACTS](CONTRACTS.md)
+- [README](README.md)
diff --git a/docs/README.md b/docs/README.md
index 2c8ea07..b83473f 100644
--- a/docs/README.md
+++ b/docs/README.md
@@ -1,14 +1,17 @@
 # 3DCityMapper Docs Index

+See also:
+- `docs/DOCS_INDEX.md` for canonical docs vs root stub policy.
+
 Read first:
 - `docs/ARCHITECTURE.md`
 - `docs/COORDINATES.md`
 - `docs/SCANNER.md`
 - `docs/INPUTS.md`
 - `docs/EDITOR_TOOLS.md`

 Extra docs:
 - `docs/BLUEPRINT_SPEC.md`
 - `docs/PERSISTENCE.md`
 - `docs/DEV_DEBUG.md`
 - `docs/LOCALSTORAGE_KEYS.md`
```

## Packet Commit Evidence (Pre-Commit)
### `git diff --stat --cached`
```text
 docs/ai/review_packet_phase10n.md | 252 ++++++++++++++++++++++++++++++++++++++
 1 file changed, 252 insertions(+)
```

### `git diff --check --cached`
```text
(no output)
```

## Carry-Forward
- P0: none
- P1: none
- P2: none
