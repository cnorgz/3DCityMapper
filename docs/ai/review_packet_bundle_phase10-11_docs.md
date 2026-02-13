# Review Packet Bundle — Phase 10/11 Docs Refresh Extensions

This file bundles full packet contents for external review in one document.

## Included Packets
- [Phase 10l_1](#phase-10l_1)
- [Phase 10m](#phase-10m)
- [Phase 10n](#phase-10n)
- [Phase 10o](#phase-10o)
- [Phase 10p](#phase-10p)
- [Phase 10q](#phase-10q)
- [Phase 11q](#phase-11q)
- [Phase 11r](#phase-11r)
- [Phase 11s](#phase-11s)
- [Phase 11t](#phase-11t)
- [Phase 11u](#phase-11u)
- [Phase 11v](#phase-11v)

---

## Phase 10l_1

Source: `docs/ai/review_packet_phase10l_1.md`

### BEGIN VERBATIM

# Review Packet — Phase 10l_1

## Metadata
- branch: refactor/phase10l_1-log-metadata
- base_commit: ac7a562
- phase_end_commit: 1069d02
- packet_commit: PENDING (self-reference; see git log)
- focus_paths: REFACTOR_LOG.md docs/ai/review_packet_phase10l_1.md
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
## refactor/phase10l_1-log-metadata
A  docs/ai/review_packet_phase10l_1.md
```

### `git rev-parse --short HEAD`
```text
1069d02
```

### `git log --oneline --decorate -n 25`
```text
1069d02 (HEAD -> refactor/phase10l_1-log-metadata) docs(phase10l_1): backfill phase10l log metadata
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
89a6bb5 (refactor/phase10d-inputs-editor-doc) docs(ai): add review packet for phase 10d
6d9102f docs(phase10d): add INPUTS.md and EDITOR_TOOLS.md
f36331d (refactor/phase10c-scanner-doc) docs(ai): add review packet for phase 10c
a455f2d docs(phase10c): add SCANNER.md
```

### `git diff --stat <base>...<phase_end>`
```text
 REFACTOR_LOG.md | 4 ++--
 1 file changed, 2 insertions(+), 2 deletions(-)
```

### `git diff --check <base>...<phase_end>`
```text
(no output)
```

### `git diff -U15 <base>...<phase_end> -- $FOCUS_PATHS`
```diff
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 769ddbf..ef2088a 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -709,19 +709,19 @@ Probe check (post-extraction):
 - probe: NOT RUN (docs-only)

 ### Phase 10k – Archive note in docs landing page

 - branch: refactor/phase10k-archive-note
 - base_commit: ad6561e
 - phase_end_commit: 8ad7760
 - packet_commit: be26321
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10l – Phase 10 log completeness scan

 - branch: refactor/phase10l-phase10-log-scan
 - base_commit: be26321
-- phase_end_commit: PENDING
-- packet_commit: PENDING
+- phase_end_commit: c7f0703
+- packet_commit: ac7a562
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)
```

### `git show --no-ext-diff --unified=12 <phase_end> -- $FOCUS_PATHS`
```diff
commit 1069d02d094d17cd37eeb3b48b1e374f7078cc46
Author: xavstack <your.email@example.com>
Date:   Fri Feb 13 02:15:37 2026 +0100

    docs(phase10l_1): backfill phase10l log metadata

diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 769ddbf..ef2088a 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -712,16 +712,16 @@ Probe check (post-extraction):

 - branch: refactor/phase10k-archive-note
 - base_commit: ad6561e
 - phase_end_commit: 8ad7760
 - packet_commit: be26321
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10l – Phase 10 log completeness scan

 - branch: refactor/phase10l-phase10-log-scan
 - base_commit: be26321
-- phase_end_commit: PENDING
-- packet_commit: PENDING
+- phase_end_commit: c7f0703
+- packet_commit: ac7a562
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)
```

## Packet Commit Evidence (Pre-Commit)
### `git diff --stat --cached`
```text
 docs/ai/review_packet_phase10l_1.md | 150 ++++++++++++++++++++++++++++++++++++
 1 file changed, 150 insertions(+)
```

### `git diff --check --cached`
```text
(no output)
```

## Carry-Forward
- P0: none
- P1: none
- P2: none

### END VERBATIM

---

## Phase 10m

Source: `docs/ai/review_packet_phase10m.md`

### BEGIN VERBATIM

# Review Packet — Phase 10m

## Metadata
- branch: refactor/phase10m-phase10-packet-index-refresh
- base_commit: bf96fef
- phase_end_commit: 527a133
- packet_commit: PENDING (self-reference; see git log)
- focus_paths: docs/ai/review_packet_index_phase10.md REFACTOR_LOG.md docs/ai/review_packet_phase10m.md
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
## refactor/phase10m-phase10-packet-index-refresh
```

### `git rev-parse --short HEAD`
```text
527a133
```

### `git log --oneline --decorate -n 25`
```text
527a133 (HEAD -> refactor/phase10m-phase10-packet-index-refresh) docs(phase10m): refresh Phase 10 review packet index
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
89a6bb5 (refactor/phase10d-inputs-editor-doc) docs(ai): add review packet for phase 10d
6d9102f docs(phase10d): add INPUTS.md and EDITOR_TOOLS.md
```

### `git diff --stat <base>...<phase_end>`
```text
 REFACTOR_LOG.md                        |  9 +++++++++
 docs/ai/review_packet_index_phase10.md | 26 +++++++++++++++-----------
 2 files changed, 24 insertions(+), 11 deletions(-)
```

### `git diff --check <base>...<phase_end>`
```text
(no output)
```

### `git diff -U15 <base>...<phase_end> -- $FOCUS_PATHS`
```diff
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index ef2088a..b8f7a53 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -713,15 +713,24 @@ Probe check (post-extraction):
 - branch: refactor/phase10k-archive-note
 - base_commit: ad6561e
 - phase_end_commit: 8ad7760
 - packet_commit: be26321
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10l – Phase 10 log completeness scan

 - branch: refactor/phase10l-phase10-log-scan
 - base_commit: be26321
 - phase_end_commit: c7f0703
 - packet_commit: ac7a562
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)
+
+### Phase 10m – Phase 10 packet index refresh
+
+- branch: refactor/phase10m-phase10-packet-index-refresh
+- base_commit: bf96fef
+- phase_end_commit: PENDING
+- packet_commit: PENDING
+- capture_method: n/a (docs-only)
+- probe: NOT RUN (docs-only)
diff --git a/docs/ai/review_packet_index_phase10.md b/docs/ai/review_packet_index_phase10.md
index 239a0b9..61e2460 100644
--- a/docs/ai/review_packet_index_phase10.md
+++ b/docs/ai/review_packet_index_phase10.md
@@ -1,29 +1,33 @@
 # Phase 10 Review Packet Index

 ## Primary Phase Packets
-- `docs/ai/review_packet_phase10a.md`
-- `docs/ai/review_packet_phase10b.md`
-- `docs/ai/review_packet_phase10c.md`
-- `docs/ai/review_packet_phase10d.md`
-- `docs/ai/review_packet_phase10e.md`
-- `docs/ai/review_packet_phase10f.md`
-- `docs/ai/review_packet_phase10g.md`
-- `docs/ai/review_packet_phase10h.md`
-- `docs/ai/review_packet_phase10i.md`
+- `docs/ai/review_packet_phase10a.md` | branch `refactor/phase10a-architecture-doc` | phase_end `c4a2688` | packet `8147ad0`
+- `docs/ai/review_packet_phase10b.md` | branch `refactor/phase10b-coordinates-doc` | phase_end `a471ae8` | packet `8156bc4`
+- `docs/ai/review_packet_phase10c.md` | branch `refactor/phase10c-scanner-doc` | phase_end `a455f2d` | packet `f36331d`
+- `docs/ai/review_packet_phase10d.md` | branch `refactor/phase10d-inputs-editor-doc` | phase_end `6d9102f` | packet `89a6bb5`
+- `docs/ai/review_packet_phase10e.md` | branch `refactor/phase10e-docs-dir-normalize` | phase_end `363b3ce` | packet `9b38c37`
+- `docs/ai/review_packet_phase10f.md` | branch `refactor/phase10f-docs-dir-normalize-extra` | phase_end `999f6ad` | packet `3de43d0`
+- `docs/ai/review_packet_phase10g.md` | branch `refactor/phase10g-docs-readme` | phase_end `2ae3523` | packet `3da1d2e`
+- `docs/ai/review_packet_phase10h.md` | branch `refactor/phase10h-contracts-doc` | phase_end `74892c4` | packet `e0d7111`
+- `docs/ai/review_packet_phase10i.md` | branch `refactor/phase10i-phase10-packet-index` | phase_end `132d09d` | packet `782c8e9`
+- `docs/ai/review_packet_phase10j.md` | branch `refactor/phase10j-doc-links-sanity` | phase_end `b0c60d8` | packet `ad6561e`
+- `docs/ai/review_packet_phase10k.md` | branch `refactor/phase10k-archive-note` | phase_end `8ad7760` | packet `be26321`
+- `docs/ai/review_packet_phase10l.md` | branch `refactor/phase10l-phase10-log-scan` | phase_end `c7f0703` | packet `ac7a562`

 ## Micro / Backfill Packets
-- `docs/ai/review_packet_phase10d_1.md`
-- `docs/ai/review_packet_phase10e_1.md`
+- `docs/ai/review_packet_phase10d_1.md` | branch `refactor/phase10d_1-log-metadata` | phase_end `7188087` | packet `b3db947`
+- `docs/ai/review_packet_phase10e_1.md` | branch `refactor/phase10e_1-log-metadata` | phase_end `31ce377` | packet `6f1c9b7`
+- `docs/ai/review_packet_phase10l_1.md` | branch `refactor/phase10l_1-log-metadata` | phase_end `1069d02` | packet `bf96fef`

 ## Docs Inventory
 - `docs/ARCHITECTURE.md`
 - `docs/COORDINATES.md`
 - `docs/SCANNER.md`
 - `docs/INPUTS.md`
 - `docs/EDITOR_TOOLS.md`
 - `docs/BLUEPRINT_SPEC.md`
 - `docs/PERSISTENCE.md`
 - `docs/DEV_DEBUG.md`
 - `docs/LOCALSTORAGE_KEYS.md`
 - `docs/README.md`
 - `docs/CONTRACTS.md`
```

### `git show --no-ext-diff --unified=12 <phase_end> -- $FOCUS_PATHS`
```diff
commit 527a133281558cb7b3180edd4a473c4033f6de46
Author: xavstack <your.email@example.com>
Date:   Fri Feb 13 02:17:28 2026 +0100

    docs(phase10m): refresh Phase 10 review packet index

diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index ef2088a..b8f7a53 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -716,12 +716,21 @@ Probe check (post-extraction):
 - packet_commit: be26321
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10l – Phase 10 log completeness scan

 - branch: refactor/phase10l-phase10-log-scan
 - base_commit: be26321
 - phase_end_commit: c7f0703
 - packet_commit: ac7a562
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)
+
+### Phase 10m – Phase 10 packet index refresh
+
+- branch: refactor/phase10m-phase10-packet-index-refresh
+- base_commit: bf96fef
+- phase_end_commit: PENDING
+- packet_commit: PENDING
+- capture_method: n/a (docs-only)
+- probe: NOT RUN (docs-only)
diff --git a/docs/ai/review_packet_index_phase10.md b/docs/ai/review_packet_index_phase10.md
index 239a0b9..61e2460 100644
--- a/docs/ai/review_packet_index_phase10.md
+++ b/docs/ai/review_packet_index_phase10.md
@@ -1,28 +1,32 @@
 # Phase 10 Review Packet Index

 ## Primary Phase Packets
-- `docs/ai/review_packet_phase10a.md`
-- `docs/ai/review_packet_phase10b.md`
-- `docs/ai/review_packet_phase10c.md`
-- `docs/ai/review_packet_phase10d.md`
-- `docs/ai/review_packet_phase10e.md`
-- `docs/ai/review_packet_phase10f.md`
-- `docs/ai/review_packet_phase10g.md`
-- `docs/ai/review_packet_phase10h.md`
-- `docs/ai/review_packet_phase10i.md`
+- `docs/ai/review_packet_phase10a.md` | branch `refactor/phase10a-architecture-doc` | phase_end `c4a2688` | packet `8147ad0`
+- `docs/ai/review_packet_phase10b.md` | branch `refactor/phase10b-coordinates-doc` | phase_end `a471ae8` | packet `8156bc4`
+- `docs/ai/review_packet_phase10c.md` | branch `refactor/phase10c-scanner-doc` | phase_end `a455f2d` | packet `f36331d`
+- `docs/ai/review_packet_phase10d.md` | branch `refactor/phase10d-inputs-editor-doc` | phase_end `6d9102f` | packet `89a6bb5`
+- `docs/ai/review_packet_phase10e.md` | branch `refactor/phase10e-docs-dir-normalize` | phase_end `363b3ce` | packet `9b38c37`
+- `docs/ai/review_packet_phase10f.md` | branch `refactor/phase10f-docs-dir-normalize-extra` | phase_end `999f6ad` | packet `3de43d0`
+- `docs/ai/review_packet_phase10g.md` | branch `refactor/phase10g-docs-readme` | phase_end `2ae3523` | packet `3da1d2e`
+- `docs/ai/review_packet_phase10h.md` | branch `refactor/phase10h-contracts-doc` | phase_end `74892c4` | packet `e0d7111`
+- `docs/ai/review_packet_phase10i.md` | branch `refactor/phase10i-phase10-packet-index` | phase_end `132d09d` | packet `782c8e9`
+- `docs/ai/review_packet_phase10j.md` | branch `refactor/phase10j-doc-links-sanity` | phase_end `b0c60d8` | packet `ad6561e`
+- `docs/ai/review_packet_phase10k.md` | branch `refactor/phase10k-archive-note` | phase_end `8ad7760` | packet `be26321`
+- `docs/ai/review_packet_phase10l.md` | branch `refactor/phase10l-phase10-log-scan` | phase_end `c7f0703` | packet `ac7a562`

 ## Micro / Backfill Packets
-- `docs/ai/review_packet_phase10d_1.md`
-- `docs/ai/review_packet_phase10e_1.md`
+- `docs/ai/review_packet_phase10d_1.md` | branch `refactor/phase10d_1-log-metadata` | phase_end `7188087` | packet `b3db947`
+- `docs/ai/review_packet_phase10e_1.md` | branch `refactor/phase10e_1-log-metadata` | phase_end `31ce377` | packet `6f1c9b7`
+- `docs/ai/review_packet_phase10l_1.md` | branch `refactor/phase10l_1-log-metadata` | phase_end `1069d02` | packet `bf96fef`

 ## Docs Inventory
 - `docs/ARCHITECTURE.md`
 - `docs/COORDINATES.md`
 - `docs/SCANNER.md`
 - `docs/INPUTS.md`
 - `docs/EDITOR_TOOLS.md`
 - `docs/BLUEPRINT_SPEC.md`
 - `docs/PERSISTENCE.md`
 - `docs/DEV_DEBUG.md`
 - `docs/LOCALSTORAGE_KEYS.md`
 - `docs/README.md`
```

## Packet Commit Evidence (Pre-Commit)
### `git diff --stat --cached`
```text
 docs/ai/review_packet_phase10m.md | 253 ++++++++++++++++++++++++++++++++++++++
 1 file changed, 253 insertions(+)
```

### `git diff --check --cached`
```text
(no output)
```

## Carry-Forward
- P0: none
- P1: none
- P2: none

### END VERBATIM

---

## Phase 10n

Source: `docs/ai/review_packet_phase10n.md`

### BEGIN VERBATIM

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

### END VERBATIM

---

## Phase 10o

Source: `docs/ai/review_packet_phase10o.md`

### BEGIN VERBATIM

# Review Packet — Phase 10o

## Metadata
- branch: refactor/phase10o-root-stub-normalize
- base_commit: e4c3653
- phase_end_commit: 77715e0
- packet_commit: PENDING (self-reference; see git log)
- focus_paths: ARCHITECTURE.md COORDINATES.md SCANNER.md INPUTS.md EDITOR_TOOLS.md BLUEPRINT_SPEC.md PERSISTENCE.md DEV_DEBUG.md LOCALSTORAGE_KEYS.md REFACTOR_LOG.md docs/ai/review_packet_phase10o.md
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
## refactor/phase10o-root-stub-normalize
```

### `git rev-parse --short HEAD`
```text
77715e0
```

### `git log --oneline --decorate -n 25`
```text
77715e0 (HEAD -> refactor/phase10o-root-stub-normalize) docs(phase10o): normalize root doc stubs
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
6f1c9b7 (refactor/phase10e_1-log-metadata) docs(ai): add review packet for phase 10e_1
31ce377 docs(phase10e_1): backfill phase10e log metadata
9b38c37 (refactor/phase10e-docs-dir-normalize) docs(ai): add review packet for phase 10e
363b3ce docs(phase10e): normalize minimum docs under /docs
```

### `git diff --stat <base>...<phase_end>`
```text
 ARCHITECTURE.md      | 4 +++-
 BLUEPRINT_SPEC.md    | 4 +++-
 COORDINATES.md       | 4 +++-
 DEV_DEBUG.md         | 4 +++-
 EDITOR_TOOLS.md      | 4 +++-
 INPUTS.md            | 4 +++-
 LOCALSTORAGE_KEYS.md | 4 +++-
 PERSISTENCE.md       | 4 +++-
 REFACTOR_LOG.md      | 9 +++++++++
 SCANNER.md           | 4 +++-
 10 files changed, 36 insertions(+), 9 deletions(-)
```

### `git diff --check <base>...<phase_end>`
```text
(no output)
```

### `git diff -U15 <base>...<phase_end> -- $FOCUS_PATHS`
```diff
diff --git a/ARCHITECTURE.md b/ARCHITECTURE.md
index fdbc75c..63b39fc 100644
--- a/ARCHITECTURE.md
+++ b/ARCHITECTURE.md
@@ -1 +1,3 @@
-This doc moved to docs/ARCHITECTURE.md
+# ARCHITECTURE.md (Stub)
+
+Canonical: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
diff --git a/BLUEPRINT_SPEC.md b/BLUEPRINT_SPEC.md
index b7917fa..38e6fbe 100644
--- a/BLUEPRINT_SPEC.md
+++ b/BLUEPRINT_SPEC.md
@@ -1 +1,3 @@
-This doc moved to docs/BLUEPRINT_SPEC.md
+# BLUEPRINT_SPEC.md (Stub)
+
+Canonical: [docs/BLUEPRINT_SPEC.md](docs/BLUEPRINT_SPEC.md)
diff --git a/COORDINATES.md b/COORDINATES.md
index da286ff..c05c9e9 100644
--- a/COORDINATES.md
+++ b/COORDINATES.md
@@ -1 +1,3 @@
-This doc moved to docs/COORDINATES.md
+# COORDINATES.md (Stub)
+
+Canonical: [docs/COORDINATES.md](docs/COORDINATES.md)
diff --git a/DEV_DEBUG.md b/DEV_DEBUG.md
index 0c526d8..f0476ce 100644
--- a/DEV_DEBUG.md
+++ b/DEV_DEBUG.md
@@ -1 +1,3 @@
-This doc moved to docs/DEV_DEBUG.md
+# DEV_DEBUG.md (Stub)
+
+Canonical: [docs/DEV_DEBUG.md](docs/DEV_DEBUG.md)
diff --git a/EDITOR_TOOLS.md b/EDITOR_TOOLS.md
index e3d1b64..811a579 100644
--- a/EDITOR_TOOLS.md
+++ b/EDITOR_TOOLS.md
@@ -1 +1,3 @@
-This doc moved to docs/EDITOR_TOOLS.md
+# EDITOR_TOOLS.md (Stub)
+
+Canonical: [docs/EDITOR_TOOLS.md](docs/EDITOR_TOOLS.md)
diff --git a/INPUTS.md b/INPUTS.md
index 38f4dd3..c1f74d2 100644
--- a/INPUTS.md
+++ b/INPUTS.md
@@ -1 +1,3 @@
-This doc moved to docs/INPUTS.md
+# INPUTS.md (Stub)
+
+Canonical: [docs/INPUTS.md](docs/INPUTS.md)
diff --git a/LOCALSTORAGE_KEYS.md b/LOCALSTORAGE_KEYS.md
index fd6bad1..22fabbf 100644
--- a/LOCALSTORAGE_KEYS.md
+++ b/LOCALSTORAGE_KEYS.md
@@ -1 +1,3 @@
-This doc moved to docs/LOCALSTORAGE_KEYS.md
+# LOCALSTORAGE_KEYS.md (Stub)
+
+Canonical: [docs/LOCALSTORAGE_KEYS.md](docs/LOCALSTORAGE_KEYS.md)
diff --git a/PERSISTENCE.md b/PERSISTENCE.md
index d2565e3..90ba54e 100644
--- a/PERSISTENCE.md
+++ b/PERSISTENCE.md
@@ -1 +1,3 @@
-This doc moved to docs/PERSISTENCE.md
+# PERSISTENCE.md (Stub)
+
+Canonical: [docs/PERSISTENCE.md](docs/PERSISTENCE.md)
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 9f8eebc..079d42f 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -731,15 +731,24 @@ Probe check (post-extraction):
 - branch: refactor/phase10m-phase10-packet-index-refresh
 - base_commit: bf96fef
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10n – Canonical docs index + stub policy

 - branch: refactor/phase10n-docs-index-map
 - base_commit: 70d63fa
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)
+
+### Phase 10o – Root stub formatting normalize
+
+- branch: refactor/phase10o-root-stub-normalize
+- base_commit: e4c3653
+- phase_end_commit: PENDING
+- packet_commit: PENDING
+- capture_method: n/a (docs-only)
+- probe: NOT RUN (docs-only)
diff --git a/SCANNER.md b/SCANNER.md
index ebf0877..485ff35 100644
--- a/SCANNER.md
+++ b/SCANNER.md
@@ -1 +1,3 @@
-This doc moved to docs/SCANNER.md
+# SCANNER.md (Stub)
+
+Canonical: [docs/SCANNER.md](docs/SCANNER.md)
```

### `git show --no-ext-diff --unified=12 <phase_end> -- $FOCUS_PATHS`
```diff
commit 77715e0a2eb347e3e00e481d546fba5ec3533485
Author: xavstack <your.email@example.com>
Date:   Fri Feb 13 02:19:05 2026 +0100

    docs(phase10o): normalize root doc stubs

diff --git a/ARCHITECTURE.md b/ARCHITECTURE.md
index fdbc75c..63b39fc 100644
--- a/ARCHITECTURE.md
+++ b/ARCHITECTURE.md
@@ -1 +1,3 @@
-This doc moved to docs/ARCHITECTURE.md
+# ARCHITECTURE.md (Stub)
+
+Canonical: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
diff --git a/BLUEPRINT_SPEC.md b/BLUEPRINT_SPEC.md
index b7917fa..38e6fbe 100644
--- a/BLUEPRINT_SPEC.md
+++ b/BLUEPRINT_SPEC.md
@@ -1 +1,3 @@
-This doc moved to docs/BLUEPRINT_SPEC.md
+# BLUEPRINT_SPEC.md (Stub)
+
+Canonical: [docs/BLUEPRINT_SPEC.md](docs/BLUEPRINT_SPEC.md)
diff --git a/COORDINATES.md b/COORDINATES.md
index da286ff..c05c9e9 100644
--- a/COORDINATES.md
+++ b/COORDINATES.md
@@ -1 +1,3 @@
-This doc moved to docs/COORDINATES.md
+# COORDINATES.md (Stub)
+
+Canonical: [docs/COORDINATES.md](docs/COORDINATES.md)
diff --git a/DEV_DEBUG.md b/DEV_DEBUG.md
index 0c526d8..f0476ce 100644
--- a/DEV_DEBUG.md
+++ b/DEV_DEBUG.md
@@ -1 +1,3 @@
-This doc moved to docs/DEV_DEBUG.md
+# DEV_DEBUG.md (Stub)
+
+Canonical: [docs/DEV_DEBUG.md](docs/DEV_DEBUG.md)
diff --git a/EDITOR_TOOLS.md b/EDITOR_TOOLS.md
index e3d1b64..811a579 100644
--- a/EDITOR_TOOLS.md
+++ b/EDITOR_TOOLS.md
@@ -1 +1,3 @@
-This doc moved to docs/EDITOR_TOOLS.md
+# EDITOR_TOOLS.md (Stub)
+
+Canonical: [docs/EDITOR_TOOLS.md](docs/EDITOR_TOOLS.md)
diff --git a/INPUTS.md b/INPUTS.md
index 38f4dd3..c1f74d2 100644
--- a/INPUTS.md
+++ b/INPUTS.md
@@ -1 +1,3 @@
-This doc moved to docs/INPUTS.md
+# INPUTS.md (Stub)
+
+Canonical: [docs/INPUTS.md](docs/INPUTS.md)
diff --git a/LOCALSTORAGE_KEYS.md b/LOCALSTORAGE_KEYS.md
index fd6bad1..22fabbf 100644
--- a/LOCALSTORAGE_KEYS.md
+++ b/LOCALSTORAGE_KEYS.md
@@ -1 +1,3 @@
-This doc moved to docs/LOCALSTORAGE_KEYS.md
+# LOCALSTORAGE_KEYS.md (Stub)
+
+Canonical: [docs/LOCALSTORAGE_KEYS.md](docs/LOCALSTORAGE_KEYS.md)
diff --git a/PERSISTENCE.md b/PERSISTENCE.md
index d2565e3..90ba54e 100644
--- a/PERSISTENCE.md
+++ b/PERSISTENCE.md
@@ -1 +1,3 @@
-This doc moved to docs/PERSISTENCE.md
+# PERSISTENCE.md (Stub)
+
+Canonical: [docs/PERSISTENCE.md](docs/PERSISTENCE.md)
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 9f8eebc..079d42f 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -734,12 +734,21 @@ Probe check (post-extraction):
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10n – Canonical docs index + stub policy

 - branch: refactor/phase10n-docs-index-map
 - base_commit: 70d63fa
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)
+
+### Phase 10o – Root stub formatting normalize
+
+- branch: refactor/phase10o-root-stub-normalize
+- base_commit: e4c3653
+- phase_end_commit: PENDING
+- packet_commit: PENDING
+- capture_method: n/a (docs-only)
+- probe: NOT RUN (docs-only)
diff --git a/SCANNER.md b/SCANNER.md
index ebf0877..485ff35 100644
--- a/SCANNER.md
+++ b/SCANNER.md
@@ -1 +1,3 @@
-This doc moved to docs/SCANNER.md
+# SCANNER.md (Stub)
+
+Canonical: [docs/SCANNER.md](docs/SCANNER.md)
```

## Packet Commit Evidence (Pre-Commit)
### `git diff --stat --cached`
```text
 docs/ai/review_packet_phase10o.md | 326 ++++++++++++++++++++++++++++++++++++++
 1 file changed, 326 insertions(+)
```

### `git diff --check --cached`
```text
(no output)
```

## Carry-Forward
- P0: none
- P1: none
- P2: none

### END VERBATIM

---

## Phase 10p

Source: `docs/ai/review_packet_phase10p.md`

### BEGIN VERBATIM

# Review Packet — Phase 10p

## Metadata
- branch: refactor/phase10p-doc-links-sanity-2
- base_commit: 31fbfc5
- phase_end_commit: 3d2d676
- packet_commit: PENDING (self-reference; see git log)
- focus_paths: docs/**/*.md *.md REFACTOR_LOG.md docs/ai/review_packet_phase10p.md
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
## refactor/phase10p-doc-links-sanity-2
```

### `git rev-parse --short HEAD`
```text
3d2d676
```

### `git log --oneline --decorate -n 25`
```text
3d2d676 (HEAD -> refactor/phase10p-doc-links-sanity-2) docs(phase10p): fix broken doc links after /docs normalization
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
6f1c9b7 (refactor/phase10e_1-log-metadata) docs(ai): add review packet for phase 10e_1
31ce377 docs(phase10e_1): backfill phase10e log metadata
```

### `git diff --stat <base>...<phase_end>`
```text
 REFACTOR_LOG.md |  9 +++++++++
 docs/README.md  | 18 +++++++++---------
 2 files changed, 18 insertions(+), 9 deletions(-)
```

### `git diff --check <base>...<phase_end>`
```text
(no output)
```

### `git diff -U15 <base>...<phase_end> -- $FOCUS_PATHS`
```diff
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 079d42f..df78723 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -740,15 +740,24 @@ Probe check (post-extraction):
 - branch: refactor/phase10n-docs-index-map
 - base_commit: 70d63fa
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10o – Root stub formatting normalize

 - branch: refactor/phase10o-root-stub-normalize
 - base_commit: e4c3653
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)
+
+### Phase 10p – Doc links sanity after root/docs normalization
+
+- branch: refactor/phase10p-doc-links-sanity-2
+- base_commit: 31fbfc5
+- phase_end_commit: PENDING
+- packet_commit: PENDING
+- capture_method: n/a (docs-only)
+- probe: NOT RUN (docs-only)
```

### `git show --no-ext-diff --unified=12 <phase_end> -- $FOCUS_PATHS`
```diff
commit 3d2d676d6b047b109f4754a372b0aa648059233f
Author: xavstack <your.email@example.com>
Date:   Fri Feb 13 02:19:56 2026 +0100

    docs(phase10p): fix broken doc links after /docs normalization

diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 079d42f..df78723 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -743,12 +743,21 @@ Probe check (post-extraction):
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10o – Root stub formatting normalize

 - branch: refactor/phase10o-root-stub-normalize
 - base_commit: e4c3653
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)
+
+### Phase 10p – Doc links sanity after root/docs normalization
+
+- branch: refactor/phase10p-doc-links-sanity-2
+- base_commit: 31fbfc5
+- phase_end_commit: PENDING
+- packet_commit: PENDING
+- capture_method: n/a (docs-only)
+- probe: NOT RUN (docs-only)
```

## Packet Commit Evidence (Pre-Commit)
### `git diff --stat --cached`
```text
 docs/ai/review_packet_phase10p.md | 156 ++++++++++++++++++++++++++++++++++++++
 1 file changed, 156 insertions(+)
```

### `git diff --check --cached`
```text
(no output)
```

## Carry-Forward
- P0: none
- P1: none
- P2: none

### END VERBATIM

---

## Phase 10q

Source: `docs/ai/review_packet_phase10q.md`

### BEGIN VERBATIM

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

### END VERBATIM

---

## Phase 11q

Source: `docs/ai/review_packet_phase11q.md`

### BEGIN VERBATIM

# Review Packet — Phase 11q

## Metadata
- branch: refactor/phase11q-phase11-packet-index-refresh
- base_commit: 7f886fb
- phase_end_commit: 8d10c51
- packet_commit: PENDING (self-reference; see git log)
- focus_paths: docs/ai/review_packet_index_phase11.md docs/ai/review_packet_phase11q.md REFACTOR_LOG.md
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
## refactor/phase11q-phase11-packet-index-refresh
```

### `git rev-parse --short HEAD`
```text
8d10c51
```

### `git log --oneline --decorate -n 25`
```text
8d10c51 (HEAD -> refactor/phase11q-phase11-packet-index-refresh) docs(phase11q): refresh Phase 11 review packet index
7f886fb (refactor/phase10q-docs-readme-structure) docs(ai): add review packet for phase 10q
5fccf75 docs(phase10q): document docs/ vs root-stubs structure
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
```

### `git diff --stat <base>...<phase_end>`
```text
 REFACTOR_LOG.md                        | 11 ++++++
 docs/ai/review_packet_index_phase11.md | 67 ++++++++++++++++++----------------
 2 files changed, 46 insertions(+), 32 deletions(-)
```

### `git diff --check <base>...<phase_end>`
```text
(no output)
```

### `git diff -U15 <base>...<phase_end> -- $FOCUS_PATHS`
```diff
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 3bd30cc..3b231eb 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -714,30 +714,41 @@ Probe check (post-extraction):
 - base_commit: ad6561e
 - phase_end_commit: 8ad7760
 - packet_commit: be26321
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10l – Phase 10 log completeness scan

 - branch: refactor/phase10l-phase10-log-scan
 - base_commit: be26321
 - phase_end_commit: c7f0703
 - packet_commit: ac7a562
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

+## Phase 11 (Docs Refresh Extensions)
+
+### Phase 11q – Phase 11 packet index refresh
+
+- branch: refactor/phase11q-phase11-packet-index-refresh
+- base_commit: 7f886fb
+- phase_end_commit: PENDING
+- packet_commit: PENDING
+- capture_method: n/a (docs-only)
+- probe: NOT RUN (docs-only)
+
 ### Phase 10m – Phase 10 packet index refresh

 - branch: refactor/phase10m-phase10-packet-index-refresh
 - base_commit: bf96fef
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10n – Canonical docs index + stub policy

 - branch: refactor/phase10n-docs-index-map
 - base_commit: 70d63fa
 - phase_end_commit: PENDING
 - packet_commit: PENDING
diff --git a/docs/ai/review_packet_index_phase11.md b/docs/ai/review_packet_index_phase11.md
index 87e94c1..c03f388 100644
--- a/docs/ai/review_packet_index_phase11.md
+++ b/docs/ai/review_packet_index_phase11.md
@@ -1,39 +1,42 @@
 # Phase 11 Review Packet Index

-This index tracks Phase 11 review packets in chronological order and their `_1` metadata backfills.
+## Primary Packets
+- `docs/ai/review_packet_phase11a.md` | branch `refactor/phase11a-scanner-scaffolding` | phase_end `31b75b4` | packet `fc79b21`
+- `docs/ai/review_packet_phase11b.md` | branch `refactor/phase11b-scanner-validate-normalize` | phase_end `d2ff787` | packet `657d5da`
+- `docs/ai/review_packet_phase11c.md` | branch `refactor/phase11c-scanner-normalize-safety` | phase_end `f5ba1bd` | packet `a7b9b64`
+- `docs/ai/review_packet_phase11d.md` | branch `refactor/phase11d-scanner-draft-pipeline` | phase_end `041e143` | packet `0a9750b`
+- `docs/ai/review_packet_phase11e.md` | branch `refactor/phase11e-legendrules-to-config` | phase_end `08dba45` | packet `b029371`
+- `docs/ai/review_packet_phase11f.md` | branch `refactor/phase11f-draft-blueprint-builder` | phase_end `0a201ba` | packet `53c2bbc`
+- `docs/ai/review_packet_phase11g.md` | branch `refactor/phase11g-scanner-use-draft-builder` | phase_end `8eb12e4` | packet `ded6d59`
+- `docs/ai/review_packet_phase11h.md` | branch `refactor/phase11h-image-source-normalize-2048` | phase_end `0afa0d9` | packet `aa6b8a3`
+- `docs/ai/review_packet_phase11i.md` | branch `refactor/phase11i-imageid-calib-keying` | phase_end `f2bd6da` | packet `43ed3f5`
+- `docs/ai/review_packet_phase11j.md` | branch `refactor/phase11j-scanner-consume-normalized-meta` | phase_end `cb658e6` | packet `1772722`
+- `docs/ai/review_packet_phase11k.md` | branch `refactor/phase11k-scanner-overlaymeta-helper` | phase_end `636d43f` | packet `d3ca2bf`
+- `docs/ai/review_packet_phase11l.md` | branch `refactor/phase11l-overlaymeta-maxedge-originaldims` | phase_end `63d3475` | packet `782964f`
+- `docs/ai/review_packet_phase11m.md` | branch `refactor/phase11m-overlaymeta-scale-fields` | phase_end `40b7ce2` | packet `686af22`
+- `docs/ai/review_packet_phase11n.md` | branch `refactor/phase11n-imagesource-meta-scale` | phase_end `049b2de` | packet `897c6c5`
+- `docs/ai/review_packet_phase11o.md` | branch `refactor/phase11o-scanner-result-overlaymeta` | phase_end `bd758f4` | packet `af77516`
+- `docs/ai/review_packet_phase11p.md` | branch `refactor/phase11p-phase11-packet-index` | phase_end `c636f6a` | packet `8b248be`

-## Primary Phase Packets
-- `docs/ai/review_packet_phase11a.md`: Phase 11a scanner scaffolding placeholder.
-- `docs/ai/review_packet_phase11b.md`: Phase 11b validate/normalize placeholder pipeline.
-- `docs/ai/review_packet_phase11c.md`: Phase 11c scanner draft normalization hardening.
-- `docs/ai/review_packet_phase11d.md`: Phase 11d scanner draft orchestration move.
-- `docs/ai/review_packet_phase11e.md`: Phase 11e legend rules move to config + scanner shim.
-- `docs/ai/review_packet_phase11f.md`: Phase 11f DraftBlueprintBuilder placeholder.
-- `docs/ai/review_packet_phase11g.md`: Phase 11g ScannerController uses DraftBlueprintBuilder.
-- `docs/ai/review_packet_phase11h.md`: Phase 11h ImageSource normalization.
-- `docs/ai/review_packet_phase11i.md`: Phase 11i stable imageId + calibration keying.
-- `docs/ai/review_packet_phase11j.md`: Phase 11j scanner consumes normalized overlay meta.
-- `docs/ai/review_packet_phase11k.md`: Phase 11k overlayMeta helper extraction.
-- `docs/ai/review_packet_phase11l.md`: Phase 11l overlayMeta optional original/max-edge fields.
-- `docs/ai/review_packet_phase11m.md`: Phase 11m overlayMeta scale fields.
-- `docs/ai/review_packet_phase11n.md`: Phase 11n ImageSource additive scale metadata.
-- `docs/ai/review_packet_phase11o.md`: Phase 11o scan result overlayMeta provenance.
+## Metadata Closures (`_1`)
+- `docs/ai/review_packet_phase11a_1.md` | branch `refactor/phase11a_1-log-metadata` | phase_end/packet: see packet metadata
+- `docs/ai/review_packet_phase11b_1.md` | branch `refactor/phase11b_1-log-metadata` | phase_end/packet: see packet metadata
+- `docs/ai/review_packet_phase11c_1.md` | branch `refactor/phase11c_1-log-metadata` | phase_end/packet: see packet metadata
+- `docs/ai/review_packet_phase11d_1.md` | branch `refactor/phase11d_1-log-metadata` | phase_end/packet: see packet metadata
+- `docs/ai/review_packet_phase11e_1.md` | branch `refactor/phase11e_1-log-metadata` | phase_end/packet: see packet metadata
+- `docs/ai/review_packet_phase11f_1.md` | branch `refactor/phase11f_1-log-metadata` | phase_end/packet: see packet metadata
+- `docs/ai/review_packet_phase11g_1.md` | branch `refactor/phase11g_1-log-metadata` | phase_end/packet: see packet metadata
+- `docs/ai/review_packet_phase11h_1.md` | branch `refactor/phase11h_1-log-metadata` | phase_end/packet: see packet metadata
+- `docs/ai/review_packet_phase11i_1.md` | branch `refactor/phase11i_1-log-metadata` | phase_end/packet: see packet metadata
+- `docs/ai/review_packet_phase11j_1.md` | branch `refactor/phase11j_1-log-metadata` | phase_end/packet: see packet metadata
+- `docs/ai/review_packet_phase11k_1.md` | branch `refactor/phase11k_1-log-metadata` | phase_end/packet: see packet metadata
+- `docs/ai/review_packet_phase11l_1.md` | branch `refactor/phase11l_1-log-metadata` | phase_end/packet: see packet metadata
+- `docs/ai/review_packet_phase11m_1.md` | branch `refactor/phase11m_1-log-metadata` | phase_end `ef54347` | packet `a239344`
+- `docs/ai/review_packet_phase11n_1.md` | branch `refactor/phase11n_1-log-metadata` | phase_end `f2175db` | packet `835abea`
+- `docs/ai/review_packet_phase11o_1.md` | branch `refactor/phase11o_1-log-metadata` | phase_end `3996f6b` | packet `221a8f7`
+- `docs/ai/review_packet_phase11p_1.md` | branch `refactor/phase11p_1-log-metadata` | phase_end `bdaa294` | packet `720fabe`

-## Metadata Backfill Packets (`_1`)
-- `docs/ai/review_packet_phase11a_1.md`: docs-only metadata backfill for Phase 11a.
-- `docs/ai/review_packet_phase11b_1.md`: docs-only metadata backfill for Phase 11b.
-- `docs/ai/review_packet_phase11c_1.md`: docs-only metadata backfill for Phase 11c.
-- `docs/ai/review_packet_phase11d_1.md`: docs-only metadata backfill for Phase 11d.
-- `docs/ai/review_packet_phase11e_1.md`: docs-only metadata backfill for Phase 11e.
-- `docs/ai/review_packet_phase11f_1.md`: docs-only metadata backfill for Phase 11f.
-- `docs/ai/review_packet_phase11g_1.md`: docs-only metadata backfill for Phase 11g.
-- `docs/ai/review_packet_phase11h_1.md`: docs-only metadata backfill for Phase 11h.
-- `docs/ai/review_packet_phase11i_1.md`: docs-only metadata backfill for Phase 11i.
-- `docs/ai/review_packet_phase11j_1.md`: docs-only metadata backfill for Phase 11j.
-- `docs/ai/review_packet_phase11k_1.md`: docs-only metadata backfill for Phase 11k.
-- `docs/ai/review_packet_phase11l_1.md`: docs-only metadata backfill for Phase 11l.
-
-## Current Packet Inventory Command
+## Inventory Command
 ```bash
 ls -1 docs/ai/review_packet_phase11*.md | sort
 ```
```

### `git show --no-ext-diff --unified=12 <phase_end> -- $FOCUS_PATHS`
```diff
commit 8d10c512c29ce83b3e3d06c53c9008701a798df6
Author: xavstack <your.email@example.com>
Date:   Fri Feb 13 02:22:15 2026 +0100

    docs(phase11q): refresh Phase 11 review packet index

diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 3bd30cc..3b231eb 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -717,24 +717,35 @@ Probe check (post-extraction):
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10l – Phase 10 log completeness scan

 - branch: refactor/phase10l-phase10-log-scan
 - base_commit: be26321
 - phase_end_commit: c7f0703
 - packet_commit: ac7a562
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

+## Phase 11 (Docs Refresh Extensions)
+
+### Phase 11q – Phase 11 packet index refresh
+
+- branch: refactor/phase11q-phase11-packet-index-refresh
+- base_commit: 7f886fb
+- phase_end_commit: PENDING
+- packet_commit: PENDING
+- capture_method: n/a (docs-only)
+- probe: NOT RUN (docs-only)
+
 ### Phase 10m – Phase 10 packet index refresh

 - branch: refactor/phase10m-phase10-packet-index-refresh
 - base_commit: bf96fef
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10n – Canonical docs index + stub policy

 - branch: refactor/phase10n-docs-index-map
diff --git a/docs/ai/review_packet_index_phase11.md b/docs/ai/review_packet_index_phase11.md
index 87e94c1..c03f388 100644
--- a/docs/ai/review_packet_index_phase11.md
+++ b/docs/ai/review_packet_index_phase11.md
@@ -1,39 +1,42 @@
 # Phase 11 Review Packet Index

-This index tracks Phase 11 review packets in chronological order and their `_1` metadata backfills.
+## Primary Packets
+- `docs/ai/review_packet_phase11a.md` | branch `refactor/phase11a-scanner-scaffolding` | phase_end `31b75b4` | packet `fc79b21`
+- `docs/ai/review_packet_phase11b.md` | branch `refactor/phase11b-scanner-validate-normalize` | phase_end `d2ff787` | packet `657d5da`
+- `docs/ai/review_packet_phase11c.md` | branch `refactor/phase11c-scanner-normalize-safety` | phase_end `f5ba1bd` | packet `a7b9b64`
+- `docs/ai/review_packet_phase11d.md` | branch `refactor/phase11d-scanner-draft-pipeline` | phase_end `041e143` | packet `0a9750b`
+- `docs/ai/review_packet_phase11e.md` | branch `refactor/phase11e-legendrules-to-config` | phase_end `08dba45` | packet `b029371`
+- `docs/ai/review_packet_phase11f.md` | branch `refactor/phase11f-draft-blueprint-builder` | phase_end `0a201ba` | packet `53c2bbc`
+- `docs/ai/review_packet_phase11g.md` | branch `refactor/phase11g-scanner-use-draft-builder` | phase_end `8eb12e4` | packet `ded6d59`
+- `docs/ai/review_packet_phase11h.md` | branch `refactor/phase11h-image-source-normalize-2048` | phase_end `0afa0d9` | packet `aa6b8a3`
+- `docs/ai/review_packet_phase11i.md` | branch `refactor/phase11i-imageid-calib-keying` | phase_end `f2bd6da` | packet `43ed3f5`
+- `docs/ai/review_packet_phase11j.md` | branch `refactor/phase11j-scanner-consume-normalized-meta` | phase_end `cb658e6` | packet `1772722`
+- `docs/ai/review_packet_phase11k.md` | branch `refactor/phase11k-scanner-overlaymeta-helper` | phase_end `636d43f` | packet `d3ca2bf`
+- `docs/ai/review_packet_phase11l.md` | branch `refactor/phase11l-overlaymeta-maxedge-originaldims` | phase_end `63d3475` | packet `782964f`
+- `docs/ai/review_packet_phase11m.md` | branch `refactor/phase11m-overlaymeta-scale-fields` | phase_end `40b7ce2` | packet `686af22`
+- `docs/ai/review_packet_phase11n.md` | branch `refactor/phase11n-imagesource-meta-scale` | phase_end `049b2de` | packet `897c6c5`
+- `docs/ai/review_packet_phase11o.md` | branch `refactor/phase11o-scanner-result-overlaymeta` | phase_end `bd758f4` | packet `af77516`
+- `docs/ai/review_packet_phase11p.md` | branch `refactor/phase11p-phase11-packet-index` | phase_end `c636f6a` | packet `8b248be`

-## Primary Phase Packets
-- `docs/ai/review_packet_phase11a.md`: Phase 11a scanner scaffolding placeholder.
-- `docs/ai/review_packet_phase11b.md`: Phase 11b validate/normalize placeholder pipeline.
-- `docs/ai/review_packet_phase11c.md`: Phase 11c scanner draft normalization hardening.
-- `docs/ai/review_packet_phase11d.md`: Phase 11d scanner draft orchestration move.
-- `docs/ai/review_packet_phase11e.md`: Phase 11e legend rules move to config + scanner shim.
-- `docs/ai/review_packet_phase11f.md`: Phase 11f DraftBlueprintBuilder placeholder.
-- `docs/ai/review_packet_phase11g.md`: Phase 11g ScannerController uses DraftBlueprintBuilder.
-- `docs/ai/review_packet_phase11h.md`: Phase 11h ImageSource normalization.
-- `docs/ai/review_packet_phase11i.md`: Phase 11i stable imageId + calibration keying.
-- `docs/ai/review_packet_phase11j.md`: Phase 11j scanner consumes normalized overlay meta.
-- `docs/ai/review_packet_phase11k.md`: Phase 11k overlayMeta helper extraction.
-- `docs/ai/review_packet_phase11l.md`: Phase 11l overlayMeta optional original/max-edge fields.
-- `docs/ai/review_packet_phase11m.md`: Phase 11m overlayMeta scale fields.
-- `docs/ai/review_packet_phase11n.md`: Phase 11n ImageSource additive scale metadata.
-- `docs/ai/review_packet_phase11o.md`: Phase 11o scan result overlayMeta provenance.
+## Metadata Closures (`_1`)
+- `docs/ai/review_packet_phase11a_1.md` | branch `refactor/phase11a_1-log-metadata` | phase_end/packet: see packet metadata
+- `docs/ai/review_packet_phase11b_1.md` | branch `refactor/phase11b_1-log-metadata` | phase_end/packet: see packet metadata
+- `docs/ai/review_packet_phase11c_1.md` | branch `refactor/phase11c_1-log-metadata` | phase_end/packet: see packet metadata
+- `docs/ai/review_packet_phase11d_1.md` | branch `refactor/phase11d_1-log-metadata` | phase_end/packet: see packet metadata
+- `docs/ai/review_packet_phase11e_1.md` | branch `refactor/phase11e_1-log-metadata` | phase_end/packet: see packet metadata
+- `docs/ai/review_packet_phase11f_1.md` | branch `refactor/phase11f_1-log-metadata` | phase_end/packet: see packet metadata
+- `docs/ai/review_packet_phase11g_1.md` | branch `refactor/phase11g_1-log-metadata` | phase_end/packet: see packet metadata
+- `docs/ai/review_packet_phase11h_1.md` | branch `refactor/phase11h_1-log-metadata` | phase_end/packet: see packet metadata
+- `docs/ai/review_packet_phase11i_1.md` | branch `refactor/phase11i_1-log-metadata` | phase_end/packet: see packet metadata
+- `docs/ai/review_packet_phase11j_1.md` | branch `refactor/phase11j_1-log-metadata` | phase_end/packet: see packet metadata
+- `docs/ai/review_packet_phase11k_1.md` | branch `refactor/phase11k_1-log-metadata` | phase_end/packet: see packet metadata
+- `docs/ai/review_packet_phase11l_1.md` | branch `refactor/phase11l_1-log-metadata` | phase_end/packet: see packet metadata
+- `docs/ai/review_packet_phase11m_1.md` | branch `refactor/phase11m_1-log-metadata` | phase_end `ef54347` | packet `a239344`
+- `docs/ai/review_packet_phase11n_1.md` | branch `refactor/phase11n_1-log-metadata` | phase_end `f2175db` | packet `835abea`
+- `docs/ai/review_packet_phase11o_1.md` | branch `refactor/phase11o_1-log-metadata` | phase_end `3996f6b` | packet `221a8f7`
+- `docs/ai/review_packet_phase11p_1.md` | branch `refactor/phase11p_1-log-metadata` | phase_end `bdaa294` | packet `720fabe`

-## Metadata Backfill Packets (`_1`)
-- `docs/ai/review_packet_phase11a_1.md`: docs-only metadata backfill for Phase 11a.
-- `docs/ai/review_packet_phase11b_1.md`: docs-only metadata backfill for Phase 11b.
-- `docs/ai/review_packet_phase11c_1.md`: docs-only metadata backfill for Phase 11c.
-- `docs/ai/review_packet_phase11d_1.md`: docs-only metadata backfill for Phase 11d.
-- `docs/ai/review_packet_phase11e_1.md`: docs-only metadata backfill for Phase 11e.
-- `docs/ai/review_packet_phase11f_1.md`: docs-only metadata backfill for Phase 11f.
-- `docs/ai/review_packet_phase11g_1.md`: docs-only metadata backfill for Phase 11g.
-- `docs/ai/review_packet_phase11h_1.md`: docs-only metadata backfill for Phase 11h.
-- `docs/ai/review_packet_phase11i_1.md`: docs-only metadata backfill for Phase 11i.
-- `docs/ai/review_packet_phase11j_1.md`: docs-only metadata backfill for Phase 11j.
-- `docs/ai/review_packet_phase11k_1.md`: docs-only metadata backfill for Phase 11k.
-- `docs/ai/review_packet_phase11l_1.md`: docs-only metadata backfill for Phase 11l.
-
-## Current Packet Inventory Command
+## Inventory Command
 ```bash
 ls -1 docs/ai/review_packet_phase11*.md | sort
 ```
```

## Packet Commit Evidence (Pre-Commit)
### `git diff --stat --cached`
```text
 docs/ai/review_packet_phase11q.md | 345 ++++++++++++++++++++++++++++++++++++++
 1 file changed, 345 insertions(+)
```

### `git diff --check --cached`
```text
(no output)
```

## Carry-Forward
- P0: none
- P1: none
- P2: none

### END VERBATIM

---

## Phase 11r

Source: `docs/ai/review_packet_phase11r.md`

### BEGIN VERBATIM

# Review Packet — Phase 11r

## Metadata
- branch: refactor/phase11r-scanner-doc-overlaymeta-schema
- base_commit: 6ad41cd
- phase_end_commit: a1393d8
- packet_commit: PENDING (self-reference; see git log)
- focus_paths: docs/SCANNER.md docs/ai/review_packet_phase11r.md REFACTOR_LOG.md
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
## refactor/phase11r-scanner-doc-overlaymeta-schema
```

### `git rev-parse --short HEAD`
```text
a1393d8
```

### `git log --oneline --decorate -n 25`
```text
a1393d8 (HEAD -> refactor/phase11r-scanner-doc-overlaymeta-schema) docs(phase11r): document OverlayMeta schema (current fields)
6ad41cd (refactor/phase11q-phase11-packet-index-refresh) docs(ai): add review packet for phase 11q
8d10c51 docs(phase11q): refresh Phase 11 review packet index
7f886fb (refactor/phase10q-docs-readme-structure) docs(ai): add review packet for phase 10q
5fccf75 docs(phase10q): document docs/ vs root-stubs structure
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
```

### `git diff --stat <base>...<phase_end>`
```text
 REFACTOR_LOG.md | 9 +++++++++
 docs/SCANNER.md | 8 ++++++++
 2 files changed, 17 insertions(+)
```

### `git diff --check <base>...<phase_end>`
```text
(no output)
```

### `git diff -U15 <base>...<phase_end> -- $FOCUS_PATHS`
```diff
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 3b231eb..3faa9d1 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -725,30 +725,39 @@ Probe check (post-extraction):
 - packet_commit: ac7a562
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ## Phase 11 (Docs Refresh Extensions)

 ### Phase 11q – Phase 11 packet index refresh

 - branch: refactor/phase11q-phase11-packet-index-refresh
 - base_commit: 7f886fb
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

+### Phase 11r – Scanner docs OverlayMeta schema note
+
+- branch: refactor/phase11r-scanner-doc-overlaymeta-schema
+- base_commit: 6ad41cd
+- phase_end_commit: PENDING
+- packet_commit: PENDING
+- capture_method: n/a (docs-only)
+- probe: NOT RUN (docs-only)
+
 ### Phase 10m – Phase 10 packet index refresh

 - branch: refactor/phase10m-phase10-packet-index-refresh
 - base_commit: bf96fef
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10n – Canonical docs index + stub policy

 - branch: refactor/phase10n-docs-index-map
 - base_commit: 70d63fa
 - phase_end_commit: PENDING
 - packet_commit: PENDING
diff --git a/docs/SCANNER.md b/docs/SCANNER.md
index 073671f..0c41c00 100644
--- a/docs/SCANNER.md
+++ b/docs/SCANNER.md
@@ -3,26 +3,34 @@
 ## Current State
 - Scanner is placeholder-only in current refactor phases.
 - No production legend/image inference is implemented yet.
 - Behavior is intentionally conservative to preserve parity during extraction.

 ## Inputs (Conceptual)
 - Overlay image source and normalized overlay metadata.
 - Legend-rules concept for future classification stages.
 - Scanner entry action is user-triggered; no automatic scan on probe boot path.

 ## Outputs
 - DraftBlueprint JSON through existing blueprint model pathways.
 - Structured result status (`ok`, `reason`, `errors` when available).
 - Overlay provenance threading (`overlayMeta`) for downstream diagnostics and calibration continuity.

+## OverlayMeta (Current Fields)
+- `imageId`: stable identity string for the currently loaded overlay image source (if available).
+- `normalizedWidth` / `normalizedHeight`: normalized dimensions used by scanner/mapping.
+- `width` / `height`: compatibility aliases for normalized dimensions.
+- `originalWidth` / `originalHeight`: original imported image dimensions when present.
+- `maxEdgePx`: normalization max-edge constraint when present in source metadata.
+- `scaleX` / `scaleY`: normalized-to-original scale ratios when both dimensions are finite and positive.
+
 ## Key Modules (Names Only)
 - `src/scanner/ScannerController.js`
 - `src/scanner/ImageSource.js`
 - `src/scanner/DraftBlueprintBuilder.js`
 - `src/config/legendRules.js` (and scanner compatibility re-export path)

 ## Deferred Items (Not Built Yet)
 - Legend extraction from uploaded map legend images.
 - OCR/classification for labels and symbols.
 - Real road/zone/building inference from raster inputs.
 - Confidence scoring and human-in-the-loop correction pipeline.
```

### `git show --no-ext-diff --unified=12 <phase_end> -- $FOCUS_PATHS`
```diff
commit a1393d81e04a28f4313667cc9ecc1ada63b0a26e
Author: xavstack <your.email@example.com>
Date:   Fri Feb 13 02:23:07 2026 +0100

    docs(phase11r): document OverlayMeta schema (current fields)

diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 3b231eb..3faa9d1 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -728,24 +728,33 @@ Probe check (post-extraction):

 ## Phase 11 (Docs Refresh Extensions)

 ### Phase 11q – Phase 11 packet index refresh

 - branch: refactor/phase11q-phase11-packet-index-refresh
 - base_commit: 7f886fb
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

+### Phase 11r – Scanner docs OverlayMeta schema note
+
+- branch: refactor/phase11r-scanner-doc-overlaymeta-schema
+- base_commit: 6ad41cd
+- phase_end_commit: PENDING
+- packet_commit: PENDING
+- capture_method: n/a (docs-only)
+- probe: NOT RUN (docs-only)
+
 ### Phase 10m – Phase 10 packet index refresh

 - branch: refactor/phase10m-phase10-packet-index-refresh
 - base_commit: bf96fef
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10n – Canonical docs index + stub policy

 - branch: refactor/phase10n-docs-index-map
diff --git a/docs/SCANNER.md b/docs/SCANNER.md
index 073671f..0c41c00 100644
--- a/docs/SCANNER.md
+++ b/docs/SCANNER.md
@@ -6,23 +6,31 @@
 - Behavior is intentionally conservative to preserve parity during extraction.

 ## Inputs (Conceptual)
 - Overlay image source and normalized overlay metadata.
 - Legend-rules concept for future classification stages.
 - Scanner entry action is user-triggered; no automatic scan on probe boot path.

 ## Outputs
 - DraftBlueprint JSON through existing blueprint model pathways.
 - Structured result status (`ok`, `reason`, `errors` when available).
 - Overlay provenance threading (`overlayMeta`) for downstream diagnostics and calibration continuity.

+## OverlayMeta (Current Fields)
+- `imageId`: stable identity string for the currently loaded overlay image source (if available).
+- `normalizedWidth` / `normalizedHeight`: normalized dimensions used by scanner/mapping.
+- `width` / `height`: compatibility aliases for normalized dimensions.
+- `originalWidth` / `originalHeight`: original imported image dimensions when present.
+- `maxEdgePx`: normalization max-edge constraint when present in source metadata.
+- `scaleX` / `scaleY`: normalized-to-original scale ratios when both dimensions are finite and positive.
+
 ## Key Modules (Names Only)
 - `src/scanner/ScannerController.js`
 - `src/scanner/ImageSource.js`
 - `src/scanner/DraftBlueprintBuilder.js`
 - `src/config/legendRules.js` (and scanner compatibility re-export path)

 ## Deferred Items (Not Built Yet)
 - Legend extraction from uploaded map legend images.
 - OCR/classification for labels and symbols.
 - Real road/zone/building inference from raster inputs.
 - Confidence scoring and human-in-the-loop correction pipeline.
```

## Packet Commit Evidence (Pre-Commit)
### `git diff --stat --cached`
```text
 docs/ai/review_packet_phase11r.md | 258 ++++++++++++++++++++++++++++++++++++++
 1 file changed, 258 insertions(+)
```

### `git diff --check --cached`
```text
(no output)
```

## Carry-Forward
- P0: none
- P1: none
- P2: none

### END VERBATIM

---

## Phase 11s

Source: `docs/ai/review_packet_phase11s.md`

### BEGIN VERBATIM

# Review Packet — Phase 11s

## Metadata
- branch: refactor/phase11s-coordinates-doc-overlay-normalize-link
- base_commit: 86025e3
- phase_end_commit: 7369cd5
- packet_commit: PENDING (self-reference; see git log)
- focus_paths: docs/COORDINATES.md docs/ai/review_packet_phase11s.md REFACTOR_LOG.md
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
## refactor/phase11s-coordinates-doc-overlay-normalize-link
```

### `git rev-parse --short HEAD`
```text
7369cd5
```

### `git log --oneline --decorate -n 25`
```text
7369cd5 (HEAD -> refactor/phase11s-coordinates-doc-overlay-normalize-link) docs(phase11s): link coordinates to overlay normalization notes
86025e3 (refactor/phase11r-scanner-doc-overlaymeta-schema) docs(ai): add review packet for phase 11r
a1393d8 docs(phase11r): document OverlayMeta schema (current fields)
6ad41cd (refactor/phase11q-phase11-packet-index-refresh) docs(ai): add review packet for phase 11q
8d10c51 docs(phase11q): refresh Phase 11 review packet index
7f886fb (refactor/phase10q-docs-readme-structure) docs(ai): add review packet for phase 10q
5fccf75 docs(phase10q): document docs/ vs root-stubs structure
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
```

### `git diff --stat <base>...<phase_end>`
```text
 REFACTOR_LOG.md     | 9 +++++++++
 docs/COORDINATES.md | 1 +
 2 files changed, 10 insertions(+)
```

### `git diff --check <base>...<phase_end>`
```text
(no output)
```

### `git diff -U15 <base>...<phase_end> -- $FOCUS_PATHS`
```diff
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 3faa9d1..67d0f4d 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -734,30 +734,39 @@ Probe check (post-extraction):
 - base_commit: 7f886fb
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 11r – Scanner docs OverlayMeta schema note

 - branch: refactor/phase11r-scanner-doc-overlaymeta-schema
 - base_commit: 6ad41cd
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

+### Phase 11s – Coordinates docs link to overlay normalization notes
+
+- branch: refactor/phase11s-coordinates-doc-overlay-normalize-link
+- base_commit: 86025e3
+- phase_end_commit: PENDING
+- packet_commit: PENDING
+- capture_method: n/a (docs-only)
+- probe: NOT RUN (docs-only)
+
 ### Phase 10m – Phase 10 packet index refresh

 - branch: refactor/phase10m-phase10-packet-index-refresh
 - base_commit: bf96fef
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10n – Canonical docs index + stub policy

 - branch: refactor/phase10n-docs-index-map
 - base_commit: 70d63fa
 - phase_end_commit: PENDING
 - packet_commit: PENDING
diff --git a/docs/COORDINATES.md b/docs/COORDINATES.md
index b22e284..30e8458 100644
--- a/docs/COORDINATES.md
+++ b/docs/COORDINATES.md
@@ -12,15 +12,16 @@
 - `originalWidth`, `originalHeight`
 - Optional scale fields when available:
 - `scaleX`, `scaleY`
 - Compatibility aliases can include `width`/`height` when they represent normalized dimensions.

 ## Drift Definition
 - Drift gate uses `overlayDrift` from probe output.
 - `epsPx=0.05` is the accepted error threshold.
 - `maxDriftPx` is the maximum measured pixel drift across sampled points.
 - Parity pass requires `overlayDrift.ok === true` and tracked counts to remain unchanged.

 ## Mapping Intent (Conceptual)
 - Overlay calibration maps normalized image coordinates to world/map coordinates.
 - Probe checks that runtime mapping remains consistent after refactor extraction.
 - This document defines contracts and terms only; it does not promise specific implementation internals.
+- See `docs/SCANNER.md` for current OverlayMeta fields used to carry normalized/original image dimensions into scanner plumbing.
```

### `git show --no-ext-diff --unified=12 <phase_end> -- $FOCUS_PATHS`
```diff
commit 7369cd565012f2590f17c1df4478e3dfe3572bc5
Author: xavstack <your.email@example.com>
Date:   Fri Feb 13 02:23:53 2026 +0100

    docs(phase11s): link coordinates to overlay normalization notes

diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 3faa9d1..67d0f4d 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -737,24 +737,33 @@ Probe check (post-extraction):
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 11r – Scanner docs OverlayMeta schema note

 - branch: refactor/phase11r-scanner-doc-overlaymeta-schema
 - base_commit: 6ad41cd
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

+### Phase 11s – Coordinates docs link to overlay normalization notes
+
+- branch: refactor/phase11s-coordinates-doc-overlay-normalize-link
+- base_commit: 86025e3
+- phase_end_commit: PENDING
+- packet_commit: PENDING
+- capture_method: n/a (docs-only)
+- probe: NOT RUN (docs-only)
+
 ### Phase 10m – Phase 10 packet index refresh

 - branch: refactor/phase10m-phase10-packet-index-refresh
 - base_commit: bf96fef
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10n – Canonical docs index + stub policy

 - branch: refactor/phase10n-docs-index-map
diff --git a/docs/COORDINATES.md b/docs/COORDINATES.md
index b22e284..30e8458 100644
--- a/docs/COORDINATES.md
+++ b/docs/COORDINATES.md
@@ -15,12 +15,13 @@
 - Compatibility aliases can include `width`/`height` when they represent normalized dimensions.

 ## Drift Definition
 - Drift gate uses `overlayDrift` from probe output.
 - `epsPx=0.05` is the accepted error threshold.
 - `maxDriftPx` is the maximum measured pixel drift across sampled points.
 - Parity pass requires `overlayDrift.ok === true` and tracked counts to remain unchanged.

 ## Mapping Intent (Conceptual)
 - Overlay calibration maps normalized image coordinates to world/map coordinates.
 - Probe checks that runtime mapping remains consistent after refactor extraction.
 - This document defines contracts and terms only; it does not promise specific implementation internals.
+- See `docs/SCANNER.md` for current OverlayMeta fields used to carry normalized/original image dimensions into scanner plumbing.
```

## Packet Commit Evidence (Pre-Commit)
### `git diff --stat --cached`
```text
 docs/ai/review_packet_phase11s.md | 222 ++++++++++++++++++++++++++++++++++++++
 1 file changed, 222 insertions(+)
```

### `git diff --check --cached`
```text
(no output)
```

## Carry-Forward
- P0: none
- P1: none
- P2: none

### END VERBATIM

---

## Phase 11t

Source: `docs/ai/review_packet_phase11t.md`

### BEGIN VERBATIM

# Review Packet — Phase 11t

## Metadata
- branch: refactor/phase11t-blueprint-spec-scanner-output-note
- base_commit: 9a1f3b0
- phase_end_commit: ea21dd7
- packet_commit: PENDING (self-reference; see git log)
- focus_paths: docs/BLUEPRINT_SPEC.md docs/ai/review_packet_phase11t.md REFACTOR_LOG.md
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
## refactor/phase11t-blueprint-spec-scanner-output-note
```

### `git rev-parse --short HEAD`
```text
ea21dd7
```

### `git log --oneline --decorate -n 25`
```text
ea21dd7 (HEAD -> refactor/phase11t-blueprint-spec-scanner-output-note) docs(phase11t): note scanner DraftBlueprint flow in blueprint spec
9a1f3b0 (refactor/phase11s-coordinates-doc-overlay-normalize-link) docs(ai): add review packet for phase 11s
7369cd5 docs(phase11s): link coordinates to overlay normalization notes
86025e3 (refactor/phase11r-scanner-doc-overlaymeta-schema) docs(ai): add review packet for phase 11r
a1393d8 docs(phase11r): document OverlayMeta schema (current fields)
6ad41cd (refactor/phase11q-phase11-packet-index-refresh) docs(ai): add review packet for phase 11q
8d10c51 docs(phase11q): refresh Phase 11 review packet index
7f886fb (refactor/phase10q-docs-readme-structure) docs(ai): add review packet for phase 10q
5fccf75 docs(phase10q): document docs/ vs root-stubs structure
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
```

### `git diff --stat <base>...<phase_end>`
```text
 REFACTOR_LOG.md        | 9 +++++++++
 docs/BLUEPRINT_SPEC.md | 3 +++
 2 files changed, 12 insertions(+)
```

### `git diff --check <base>...<phase_end>`
```text
(no output)
```

### `git diff -U15 <base>...<phase_end> -- $FOCUS_PATHS`
```diff
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 67d0f4d..c381e77 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -743,30 +743,39 @@ Probe check (post-extraction):
 - base_commit: 6ad41cd
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 11s – Coordinates docs link to overlay normalization notes

 - branch: refactor/phase11s-coordinates-doc-overlay-normalize-link
 - base_commit: 86025e3
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

+### Phase 11t – Blueprint spec scanner output note
+
+- branch: refactor/phase11t-blueprint-spec-scanner-output-note
+- base_commit: 9a1f3b0
+- phase_end_commit: PENDING
+- packet_commit: PENDING
+- capture_method: n/a (docs-only)
+- probe: NOT RUN (docs-only)
+
 ### Phase 10m – Phase 10 packet index refresh

 - branch: refactor/phase10m-phase10-packet-index-refresh
 - base_commit: bf96fef
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10n – Canonical docs index + stub policy

 - branch: refactor/phase10n-docs-index-map
 - base_commit: 70d63fa
 - phase_end_commit: PENDING
 - packet_commit: PENDING
diff --git a/docs/BLUEPRINT_SPEC.md b/docs/BLUEPRINT_SPEC.md
index 39dc2d0..798637b 100644
--- a/docs/BLUEPRINT_SPEC.md
+++ b/docs/BLUEPRINT_SPEC.md
@@ -56,15 +56,18 @@ This is a minimal schema reference for the current blueprint JSON format. It ref
   "id": "optional-string",
   "type": "METRO" | "PORT" | "ECOLE" | ...,
   "position": [x, z]
 }
 ```

 ## Blank blueprint

 A “blank” blueprint is created by normalizing an empty object `{}` via the same normalize routine used at runtime. Missing top-level arrays are filled with empty arrays. This keeps the editor functional even before a file is loaded.

 ## Notes

 - `transit[]` is legacy; during normalization, any entries are merged into `roads[]` and `transit` is cleared.
 - Curve indices are stored but expanded at render time. Their interpretation is consistent with current runtime behavior; no schema redesign is introduced in Phase 3.
 - The future scanner will output this same schema; do not change keys during refactor without a migration plan.
+- Current scanner scaffolding produces a placeholder DraftBlueprint first.
+- That DraftBlueprint is validated and normalized through existing pipeline hooks before becoming active BlueprintModel data.
+- This remains descriptive only; no new scanner inference requirements are introduced here.
```

### `git show --no-ext-diff --unified=12 <phase_end> -- $FOCUS_PATHS`
```diff
commit ea21dd7ef62ca649d296463ec0172656a2a9e4fa
Author: xavstack <your.email@example.com>
Date:   Fri Feb 13 02:24:35 2026 +0100

    docs(phase11t): note scanner DraftBlueprint flow in blueprint spec

diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 67d0f4d..c381e77 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -746,24 +746,33 @@ Probe check (post-extraction):
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 11s – Coordinates docs link to overlay normalization notes

 - branch: refactor/phase11s-coordinates-doc-overlay-normalize-link
 - base_commit: 86025e3
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

+### Phase 11t – Blueprint spec scanner output note
+
+- branch: refactor/phase11t-blueprint-spec-scanner-output-note
+- base_commit: 9a1f3b0
+- phase_end_commit: PENDING
+- packet_commit: PENDING
+- capture_method: n/a (docs-only)
+- probe: NOT RUN (docs-only)
+
 ### Phase 10m – Phase 10 packet index refresh

 - branch: refactor/phase10m-phase10-packet-index-refresh
 - base_commit: bf96fef
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10n – Canonical docs index + stub policy

 - branch: refactor/phase10n-docs-index-map
diff --git a/docs/BLUEPRINT_SPEC.md b/docs/BLUEPRINT_SPEC.md
index 39dc2d0..798637b 100644
--- a/docs/BLUEPRINT_SPEC.md
+++ b/docs/BLUEPRINT_SPEC.md
@@ -59,12 +59,15 @@ This is a minimal schema reference for the current blueprint JSON format. It ref
 }
 ```

 ## Blank blueprint

 A “blank” blueprint is created by normalizing an empty object `{}` via the same normalize routine used at runtime. Missing top-level arrays are filled with empty arrays. This keeps the editor functional even before a file is loaded.

 ## Notes

 - `transit[]` is legacy; during normalization, any entries are merged into `roads[]` and `transit` is cleared.
 - Curve indices are stored but expanded at render time. Their interpretation is consistent with current runtime behavior; no schema redesign is introduced in Phase 3.
 - The future scanner will output this same schema; do not change keys during refactor without a migration plan.
+- Current scanner scaffolding produces a placeholder DraftBlueprint first.
+- That DraftBlueprint is validated and normalized through existing pipeline hooks before becoming active BlueprintModel data.
+- This remains descriptive only; no new scanner inference requirements are introduced here.
```

## Packet Commit Evidence (Pre-Commit)
### `git diff --stat --cached`
```text
 docs/ai/review_packet_phase11t.md | 226 ++++++++++++++++++++++++++++++++++++++
 1 file changed, 226 insertions(+)
```

### `git diff --check --cached`
```text
(no output)
```

## Carry-Forward
- P0: none
- P1: none
- P2: none

### END VERBATIM

---

## Phase 11u

Source: `docs/ai/review_packet_phase11u.md`

### BEGIN VERBATIM

# Review Packet — Phase 11u

## Metadata
- branch: refactor/phase11u-log-metadata-sweep-10-11
- base_commit: 5193d35
- phase_end_commit: 66c00cc
- packet_commit: PENDING (self-reference; see git log)
- focus_paths: REFACTOR_LOG.md docs/ai/review_packet_phase11u.md
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
## refactor/phase11u-log-metadata-sweep-10-11
```

### `git rev-parse --short HEAD`
```text
66c00cc
```

### `git log --oneline --decorate -n 25`
```text
66c00cc (HEAD -> refactor/phase11u-log-metadata-sweep-10-11) docs(phase11u): sweep REFACTOR_LOG pending metadata for phase 10/11
5193d35 (refactor/phase11t-blueprint-spec-scanner-output-note) docs(ai): add review packet for phase 11t
ea21dd7 docs(phase11t): note scanner DraftBlueprint flow in blueprint spec
9a1f3b0 (refactor/phase11s-coordinates-doc-overlay-normalize-link) docs(ai): add review packet for phase 11s
7369cd5 docs(phase11s): link coordinates to overlay normalization notes
86025e3 (refactor/phase11r-scanner-doc-overlaymeta-schema) docs(ai): add review packet for phase 11r
a1393d8 docs(phase11r): document OverlayMeta schema (current fields)
6ad41cd (refactor/phase11q-phase11-packet-index-refresh) docs(ai): add review packet for phase 11q
8d10c51 docs(phase11q): refresh Phase 11 review packet index
7f886fb (refactor/phase10q-docs-readme-structure) docs(ai): add review packet for phase 10q
5fccf75 docs(phase10q): document docs/ vs root-stubs structure
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
```

### `git diff --stat <base>...<phase_end>`
```text
 REFACTOR_LOG.md | 41 +++++++++++++++++++++++++----------------
 1 file changed, 25 insertions(+), 16 deletions(-)
```

### `git diff --check <base>...<phase_end>`
```text
(no output)
```

### `git diff -U15 <base>...<phase_end> -- $FOCUS_PATHS`
```diff
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index c381e77..31cb474 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -720,91 +720,100 @@ Probe check (post-extraction):
 ### Phase 10l – Phase 10 log completeness scan

 - branch: refactor/phase10l-phase10-log-scan
 - base_commit: be26321
 - phase_end_commit: c7f0703
 - packet_commit: ac7a562
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ## Phase 11 (Docs Refresh Extensions)

 ### Phase 11q – Phase 11 packet index refresh

 - branch: refactor/phase11q-phase11-packet-index-refresh
 - base_commit: 7f886fb
-- phase_end_commit: PENDING
-- packet_commit: PENDING
+- phase_end_commit: 8d10c51
+- packet_commit: 6ad41cd
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 11r – Scanner docs OverlayMeta schema note

 - branch: refactor/phase11r-scanner-doc-overlaymeta-schema
 - base_commit: 6ad41cd
-- phase_end_commit: PENDING
-- packet_commit: PENDING
+- phase_end_commit: a1393d8
+- packet_commit: 86025e3
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 11s – Coordinates docs link to overlay normalization notes

 - branch: refactor/phase11s-coordinates-doc-overlay-normalize-link
 - base_commit: 86025e3
-- phase_end_commit: PENDING
-- packet_commit: PENDING
+- phase_end_commit: 7369cd5
+- packet_commit: 9a1f3b0
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 11t – Blueprint spec scanner output note

 - branch: refactor/phase11t-blueprint-spec-scanner-output-note
 - base_commit: 9a1f3b0
+- phase_end_commit: ea21dd7
+- packet_commit: 5193d35
+- capture_method: n/a (docs-only)
+- probe: NOT RUN (docs-only)
+
+### Phase 11u – REFACTOR_LOG metadata sweep for Phase 10/11
+
+- branch: refactor/phase11u-log-metadata-sweep-10-11
+- base_commit: 5193d35
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10m – Phase 10 packet index refresh

 - branch: refactor/phase10m-phase10-packet-index-refresh
 - base_commit: bf96fef
-- phase_end_commit: PENDING
-- packet_commit: PENDING
+- phase_end_commit: 527a133
+- packet_commit: 70d63fa
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10n – Canonical docs index + stub policy

 - branch: refactor/phase10n-docs-index-map
 - base_commit: 70d63fa
-- phase_end_commit: PENDING
-- packet_commit: PENDING
+- phase_end_commit: 7b34dd5
+- packet_commit: e4c3653
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10o – Root stub formatting normalize

 - branch: refactor/phase10o-root-stub-normalize
 - base_commit: e4c3653
-- phase_end_commit: PENDING
-- packet_commit: PENDING
+- phase_end_commit: 77715e0
+- packet_commit: 31fbfc5
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10p – Doc links sanity after root/docs normalization

 - branch: refactor/phase10p-doc-links-sanity-2
 - base_commit: 31fbfc5
-- phase_end_commit: PENDING
-- packet_commit: PENDING
+- phase_end_commit: 3d2d676
+- packet_commit: 67065ce
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10q – Docs README structure note

 - branch: refactor/phase10q-docs-readme-structure
 - base_commit: 67065ce
-- phase_end_commit: PENDING
-- packet_commit: PENDING
+- phase_end_commit: 5fccf75
+- packet_commit: 7f886fb
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)
```

### `git show --no-ext-diff --unified=12 <phase_end> -- $FOCUS_PATHS`
```diff
commit 66c00cc1ff88b19b021938ef1a494fe8398ea8b0
Author: xavstack <your.email@example.com>
Date:   Fri Feb 13 02:25:33 2026 +0100

    docs(phase11u): sweep REFACTOR_LOG pending metadata for phase 10/11

diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index c381e77..31cb474 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -723,88 +723,97 @@ Probe check (post-extraction):
 - base_commit: be26321
 - phase_end_commit: c7f0703
 - packet_commit: ac7a562
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ## Phase 11 (Docs Refresh Extensions)

 ### Phase 11q – Phase 11 packet index refresh

 - branch: refactor/phase11q-phase11-packet-index-refresh
 - base_commit: 7f886fb
-- phase_end_commit: PENDING
-- packet_commit: PENDING
+- phase_end_commit: 8d10c51
+- packet_commit: 6ad41cd
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 11r – Scanner docs OverlayMeta schema note

 - branch: refactor/phase11r-scanner-doc-overlaymeta-schema
 - base_commit: 6ad41cd
-- phase_end_commit: PENDING
-- packet_commit: PENDING
+- phase_end_commit: a1393d8
+- packet_commit: 86025e3
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 11s – Coordinates docs link to overlay normalization notes

 - branch: refactor/phase11s-coordinates-doc-overlay-normalize-link
 - base_commit: 86025e3
-- phase_end_commit: PENDING
-- packet_commit: PENDING
+- phase_end_commit: 7369cd5
+- packet_commit: 9a1f3b0
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 11t – Blueprint spec scanner output note

 - branch: refactor/phase11t-blueprint-spec-scanner-output-note
 - base_commit: 9a1f3b0
+- phase_end_commit: ea21dd7
+- packet_commit: 5193d35
+- capture_method: n/a (docs-only)
+- probe: NOT RUN (docs-only)
+
+### Phase 11u – REFACTOR_LOG metadata sweep for Phase 10/11
+
+- branch: refactor/phase11u-log-metadata-sweep-10-11
+- base_commit: 5193d35
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10m – Phase 10 packet index refresh

 - branch: refactor/phase10m-phase10-packet-index-refresh
 - base_commit: bf96fef
-- phase_end_commit: PENDING
-- packet_commit: PENDING
+- phase_end_commit: 527a133
+- packet_commit: 70d63fa
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10n – Canonical docs index + stub policy

 - branch: refactor/phase10n-docs-index-map
 - base_commit: 70d63fa
-- phase_end_commit: PENDING
-- packet_commit: PENDING
+- phase_end_commit: 7b34dd5
+- packet_commit: e4c3653
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10o – Root stub formatting normalize

 - branch: refactor/phase10o-root-stub-normalize
 - base_commit: e4c3653
-- phase_end_commit: PENDING
-- packet_commit: PENDING
+- phase_end_commit: 77715e0
+- packet_commit: 31fbfc5
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10p – Doc links sanity after root/docs normalization

 - branch: refactor/phase10p-doc-links-sanity-2
 - base_commit: 31fbfc5
-- phase_end_commit: PENDING
-- packet_commit: PENDING
+- phase_end_commit: 3d2d676
+- packet_commit: 67065ce
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10q – Docs README structure note

 - branch: refactor/phase10q-docs-readme-structure
 - base_commit: 67065ce
-- phase_end_commit: PENDING
-- packet_commit: PENDING
+- phase_end_commit: 5fccf75
+- packet_commit: 7f886fb
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)
```

## Packet Commit Evidence (Pre-Commit)
### `git diff --stat --cached`
```text
 docs/ai/review_packet_phase11u.md | 339 ++++++++++++++++++++++++++++++++++++++
 1 file changed, 339 insertions(+)
```

### `git diff --check --cached`
```text
(no output)
```

## Carry-Forward
- P0: none
- P1: none
- P2: none

### END VERBATIM

---

## Phase 11v

Source: `docs/ai/review_packet_phase11v.md`

### BEGIN VERBATIM

# Review Packet — Phase 11v

## Metadata
- branch: refactor/phase11v-packet-evidence-bundle-doc
- base_commit: 8ee6584
- phase_end_commit: a505b09
- packet_commit: PENDING (self-reference; see git log)
- focus_paths: docs/ai/PACKET_EVIDENCE_BUNDLE.md docs/ai/review_packet_phase11v.md REFACTOR_LOG.md
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
## refactor/phase11v-packet-evidence-bundle-doc
```

### `git rev-parse --short HEAD`
```text
a505b09
```

### `git log --oneline --decorate -n 25`
```text
a505b09 (HEAD -> refactor/phase11v-packet-evidence-bundle-doc) docs(phase11v): add packet evidence bundle doc
8ee6584 (refactor/phase11u-log-metadata-sweep-10-11) docs(ai): add review packet for phase 11u
66c00cc docs(phase11u): sweep REFACTOR_LOG pending metadata for phase 10/11
5193d35 (refactor/phase11t-blueprint-spec-scanner-output-note) docs(ai): add review packet for phase 11t
ea21dd7 docs(phase11t): note scanner DraftBlueprint flow in blueprint spec
9a1f3b0 (refactor/phase11s-coordinates-doc-overlay-normalize-link) docs(ai): add review packet for phase 11s
7369cd5 docs(phase11s): link coordinates to overlay normalization notes
86025e3 (refactor/phase11r-scanner-doc-overlaymeta-schema) docs(ai): add review packet for phase 11r
a1393d8 docs(phase11r): document OverlayMeta schema (current fields)
6ad41cd (refactor/phase11q-phase11-packet-index-refresh) docs(ai): add review packet for phase 11q
8d10c51 docs(phase11q): refresh Phase 11 review packet index
7f886fb (refactor/phase10q-docs-readme-structure) docs(ai): add review packet for phase 10q
5fccf75 docs(phase10q): document docs/ vs root-stubs structure
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
```

### `git diff --stat <base>...<phase_end>`
```text
 REFACTOR_LOG.md                   |  9 +++++++++
 docs/ai/PACKET_EVIDENCE_BUNDLE.md | 28 ++++++++++++++++++++++++++++
 2 files changed, 37 insertions(+)
```

### `git diff --check <base>...<phase_end>`
```text
(no output)
```

### `git diff -U15 <base>...<phase_end> -- $FOCUS_PATHS`
```diff
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 31cb474..fb0295e 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -761,30 +761,39 @@ Probe check (post-extraction):
 - base_commit: 9a1f3b0
 - phase_end_commit: ea21dd7
 - packet_commit: 5193d35
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 11u – REFACTOR_LOG metadata sweep for Phase 10/11

 - branch: refactor/phase11u-log-metadata-sweep-10-11
 - base_commit: 5193d35
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

+### Phase 11v – Packet evidence bundle process doc
+
+- branch: refactor/phase11v-packet-evidence-bundle-doc
+- base_commit: 8ee6584
+- phase_end_commit: PENDING
+- packet_commit: PENDING
+- capture_method: n/a (docs-only)
+- probe: NOT RUN (docs-only)
+
 ### Phase 10m – Phase 10 packet index refresh

 - branch: refactor/phase10m-phase10-packet-index-refresh
 - base_commit: bf96fef
 - phase_end_commit: 527a133
 - packet_commit: 70d63fa
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10n – Canonical docs index + stub policy

 - branch: refactor/phase10n-docs-index-map
 - base_commit: 70d63fa
 - phase_end_commit: 7b34dd5
 - packet_commit: e4c3653
diff --git a/docs/ai/PACKET_EVIDENCE_BUNDLE.md b/docs/ai/PACKET_EVIDENCE_BUNDLE.md
new file mode 100644
index 0000000..51f4a7f
--- /dev/null
+++ b/docs/ai/PACKET_EVIDENCE_BUNDLE.md
@@ -0,0 +1,28 @@
+# Packet Evidence Bundle (Standard)
+
+Use this bundle for docs/code review packets with deterministic evidence.
+
+## Standard Evidence Command Bundle
+
+```bash
+git status -sb
+git rev-parse --short HEAD
+git log --oneline --decorate -n 25
+git diff --stat <base_commit>...<phase_end_commit>
+git diff --check <base_commit>...<phase_end_commit>
+git show --no-ext-diff --unified=12 <phase_end_commit> -- <focus_paths>
+```
+
+## Packet Commit Evidence (Pre-Commit)
+
+```bash
+git diff --stat --cached
+git diff --check --cached
+```
+
+## Rules
+- Do not leave diff blocks empty in packets.
+- If `--unified=12` output is too large or sparse, include bounded fallback excerpts from:
+  - `git show --no-ext-diff --unified=5 <phase_end_commit> -- <focus_paths>`
+  - `git show --no-ext-diff --unified=0 <phase_end_commit> -- <focus_paths>`
+- Keep evidence bounded to declared focus paths and to `<base_commit>...<phase_end_commit>`.
```

### `git show --no-ext-diff --unified=12 <phase_end> -- $FOCUS_PATHS`
```diff
commit a505b091b0155b929fa9eecc7efc4cdaba43215a
Author: xavstack <your.email@example.com>
Date:   Fri Feb 13 02:26:22 2026 +0100

    docs(phase11v): add packet evidence bundle doc

diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 31cb474..fb0295e 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -764,24 +764,33 @@ Probe check (post-extraction):
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 11u – REFACTOR_LOG metadata sweep for Phase 10/11

 - branch: refactor/phase11u-log-metadata-sweep-10-11
 - base_commit: 5193d35
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

+### Phase 11v – Packet evidence bundle process doc
+
+- branch: refactor/phase11v-packet-evidence-bundle-doc
+- base_commit: 8ee6584
+- phase_end_commit: PENDING
+- packet_commit: PENDING
+- capture_method: n/a (docs-only)
+- probe: NOT RUN (docs-only)
+
 ### Phase 10m – Phase 10 packet index refresh

 - branch: refactor/phase10m-phase10-packet-index-refresh
 - base_commit: bf96fef
 - phase_end_commit: 527a133
 - packet_commit: 70d63fa
 - capture_method: n/a (docs-only)
 - probe: NOT RUN (docs-only)

 ### Phase 10n – Canonical docs index + stub policy

 - branch: refactor/phase10n-docs-index-map
diff --git a/docs/ai/PACKET_EVIDENCE_BUNDLE.md b/docs/ai/PACKET_EVIDENCE_BUNDLE.md
new file mode 100644
index 0000000..51f4a7f
--- /dev/null
+++ b/docs/ai/PACKET_EVIDENCE_BUNDLE.md
@@ -0,0 +1,28 @@
+# Packet Evidence Bundle (Standard)
+
+Use this bundle for docs/code review packets with deterministic evidence.
+
+## Standard Evidence Command Bundle
+
+```bash
+git status -sb
+git rev-parse --short HEAD
+git log --oneline --decorate -n 25
+git diff --stat <base_commit>...<phase_end_commit>
+git diff --check <base_commit>...<phase_end_commit>
+git show --no-ext-diff --unified=12 <phase_end_commit> -- <focus_paths>
+```
+
+## Packet Commit Evidence (Pre-Commit)
+
+```bash
+git diff --stat --cached
+git diff --check --cached
+```
+
+## Rules
+- Do not leave diff blocks empty in packets.
+- If `--unified=12` output is too large or sparse, include bounded fallback excerpts from:
+  - `git show --no-ext-diff --unified=5 <phase_end_commit> -- <focus_paths>`
+  - `git show --no-ext-diff --unified=0 <phase_end_commit> -- <focus_paths>`
+- Keep evidence bounded to declared focus paths and to `<base_commit>...<phase_end_commit>`.
```

## Packet Commit Evidence (Pre-Commit)
### `git diff --stat --cached`
```text
 docs/ai/review_packet_phase11v.md | 251 ++++++++++++++++++++++++++++++++++++++
 1 file changed, 251 insertions(+)
```

### `git diff --check --cached`
```text
(no output)
```

## Carry-Forward
- P0: none
- P1: none
- P2: none

### END VERBATIM

