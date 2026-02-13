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
