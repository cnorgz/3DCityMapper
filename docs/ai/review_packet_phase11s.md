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
