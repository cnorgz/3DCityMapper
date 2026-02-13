# Review Packet — Phase 14

## Metadata
- branch: refactor/phase14-scanner-questions-decisions-doc
- base_commit: f15e86b
- phase_end_commit: 21d22cb
- packet_commit: PENDING (self-reference; see git log)
- focus_paths: REFACTOR_LOG.md docs/SCANNER_DECISIONS.md docs/SCANNER.md docs/BLUEPRINT_SPEC.md docs/COORDINATES.md docs/ai/REFACTOR_STATUS.md docs/ai/UPLOAD_BUNDLE_PHASE14.md docs/ai/UPLOAD_BUNDLE_MASTER.md docs/ai/UPLOAD_GUIDE.md docs/ai/audit_md_links_phase14.txt docs/ai/review_packet_phase14.md
- probe: NOT RUN (docs/tooling-only)

## Link Audit Summary
- command: `bash tools/audit_md_links.sh docs/ai/audit_md_links_phase14.txt`
- output file: `docs/ai/audit_md_links_phase14.txt`
- result: PASS (no missing targets for scanned link patterns)

## Minimal Upload Set For SeniorDev Review (3 files)
1. `REFACTOR_LOG.md`
2. `docs/ai/UPLOAD_BUNDLE_MASTER.md`
3. `docs/ai/UPLOAD_BUNDLE_PHASE14.md`

## Evidence Bundle

### `git status -sb`
```text
## refactor/phase14-scanner-questions-decisions-doc
AM docs/ai/review_packet_phase14.md
```

### `git log --oneline -n 20`
```text
21d22cb docs(phase14): resolve scanner questions decisions + docs integration
f15e86b docs(ai): add review packet for phase13d
677c94d docs(phase13d): refresh markdown link audit artifact
389d273 docs(ai): add review packet for phase13c
ca3b55e docs(phase13c): add refactor status handoff snapshot
910d753 docs(ai): add review packet for phase13b
e5642d9 docs(phase13b): update upload master and guide for phase0-9 bundle
b8e752b docs(ai): add review packet for phase13a
b866378 docs(phase13a): add upload bundle for phase0-9
4ef5e22 docs(ai): add review packet for phase12_1
45d53ea docs(phase12_1): backfill phase12 log metadata
fa3a3a9 docs(ai): add review packet for phase 12
8ff82af docs(phase12): wrap-up review simplification + audits + final validation notes
206c867 docs(ai): add review packet for phase 11ac
c7e9522 docs(phase11ac): classify REFACTOR_LOG pending metadata sweep
0fc035a docs(ai): add review packet for phase 11ab
8f3eff4 docs(phase11ab): add markdown-only handoff helper script
178d1c0 docs(ai): add review packet for phase 11aa
69b92cf docs(phase11aa): standardize packet evidence bundle guidance
dbcc7ce docs(ai): add review packet for phase 11z
```

### `git diff --stat f15e86b...21d22cb`
```text

```

### `git diff --check f15e86b...21d22cb`
```text
(no output)
```

### ```diff
commit 21d22cb43476942377e0611f6128cbe33ea48bbb
Author: xavstack <your.email@example.com>
Date:   Fri Feb 13 16:50:33 2026 +0100

    docs(phase14): resolve scanner questions decisions + docs integration

diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index b0ae113..9ff92d1 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -846,8 +846,17 @@ Probe check (post-extraction):
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_len: 3978
 - json_sha256: c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
 - rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }
 - parity_decision: PASS (tracked fields unchanged and drift within epsPx=0.05)
+
+## Phase 14 – Scanner Questions Decisions (docs)
+
+- branch: refactor/phase14-scanner-questions-decisions-doc
+- base_commit: f15e86b
+- phase_end_commit: PENDING
+- packet_commit: PENDING
+- capture_method: n/a (docs/tooling-only)
+- probe: NOT RUN (docs-only)
```

### ```diff
commit 21d22cb43476942377e0611f6128cbe33ea48bbb
Author: xavstack <your.email@example.com>
Date:   Fri Feb 13 16:50:33 2026 +0100

    docs(phase14): resolve scanner questions decisions + docs integration

diff --git a/docs/SCANNER_DECISIONS.md b/docs/SCANNER_DECISIONS.md
new file mode 100644
index 0000000..650417a
--- /dev/null
+++ b/docs/SCANNER_DECISIONS.md
@@ -0,0 +1,69 @@
+# Scanner Decisions (Canon v0)
+
+## Scope
+This document resolves the deferred scanner questions from v7_rev4 Section 10 at specification level only.
+No scanner inference code is implemented by this document.
+
+## Legend Canon v0
+
+| Feature | Color (Hex) | Symbol / Marker | Notes |
+|---|---|---|---|
+| Roads | `#2B2B2B` | Solid polyline | Primary extraction target for MVP Tier 0. |
+| Transit | `#5A2CA0` | Parallel dashed polyline | Kept distinct from roads in legend, normalized into supported blueprint representation later. |
+| Coastlines | `#F4E17A` | Boundary stroke | Defines land/sea edge; used in Tier 1. |
+| Sea / Water | `#2E9AE6` | Filled polygon | Includes sea and major water bodies; Tier 1 candidate. |
+| Zones | `#E64A3C` | Filled polygon with type code | Uses typeCode mapping in existing blueprint schema. |
+| Buildings | `#B5B5B5` | Filled polygon with outline | Tier 2, geometry quality gated by confidence. |
+| POIs | `#F2992E` | Point marker glyph | Kept as sparse point set in MVP. |
+| Beaches / Parks / Greenspace | `#79C55B` | Filled polygon, optional hatch | Grouped as environmental polygons in scanner outputs. |
+
+Canon status:
+- Canon v0 is provisional and may change after implementation feedback.
+- In current codebase, scanner is still placeholder-only.
+
+## Label Strategy (OCR vs Symbol Markers)
+
+Recommended MVP default:
+- Prefer symbol markers and type-code glyph matching first.
+- Defer OCR to post-MVP unless a symbol-free source is explicitly targeted.
+
+Rationale:
+- Symbol matching is more deterministic with current map style.
+- OCR increases noise and language/layout variance in early phases.
+
+Failure modes and mitigation (spec-level):
+- Ambiguous symbol classes: mark low-confidence feature as unresolved candidate.
+- Missing marker in legend: emit warning + leave feature unclassified.
+- OCR hallucination (future): require confidence threshold and fallback to symbol-only mode.
+
+## MVP Scan Scope (Tiered)
+
+### Tier 0 — Roads-only
+- Expected DraftBlueprint fields touched: `roads`
+- Expected empty fields: `zones`, `buildings`, `pois`, `beaches`, `sea`, `coastlines`, `transit`
+
+### Tier 1 — Roads + Water/Coastline
+- Expected DraftBlueprint fields touched: `roads`, `coastlines`, `sea` (and/or `beaches` when identified)
+- Expected empty fields: `zones`, `buildings`, `pois`, `transit`
+
+### Tier 2 — Zones / Buildings / POIs
+- Expected DraftBlueprint fields touched: `roads`, `coastlines`, `sea`, `zones`, `buildings`, `pois` (plus optional `beaches`)
+- `transit` remains optional and may be normalized via existing pipeline rules.
+
+## Implications (Docs-level)
+
+DraftBlueprint / BlueprintModel:
+- DraftBlueprint output must stay schema-compatible with existing blueprint normalization/validation path.
+- Tiered scan output should only populate fields covered by the selected tier.
+
+OverlayMeta required fields for placement correctness:
+- `imageId`
+- `normalizedWidth`, `normalizedHeight`
+- `originalWidth`, `originalHeight` (when available)
+- `scaleX`, `scaleY` (when available)
+- `maxEdgePx` (when available)
+
+## Not Implemented Yet
+- Real image segmentation, OCR extraction, or symbol classifier runtime logic.
+- Confidence scoring, active learning, and operator review tooling.
+- This is a decisions/spec document only.
```

### ```diff
commit 21d22cb43476942377e0611f6128cbe33ea48bbb
Author: xavstack <your.email@example.com>
Date:   Fri Feb 13 16:50:33 2026 +0100

    docs(phase14): resolve scanner questions decisions + docs integration

diff --git a/docs/SCANNER.md b/docs/SCANNER.md
index 0c41c00..b1f58c9 100644
--- a/docs/SCANNER.md
+++ b/docs/SCANNER.md
@@ -24,13 +24,17 @@
 - `scaleX` / `scaleY`: normalized-to-original scale ratios when both dimensions are finite and positive.

 ## Key Modules (Names Only)
 - `src/scanner/ScannerController.js`
 - `src/scanner/ImageSource.js`
 - `src/scanner/DraftBlueprintBuilder.js`
 - `src/config/legendRules.js` (and scanner compatibility re-export path)

+## Decisions
+- Scanner decisions/spec baseline: `docs/SCANNER_DECISIONS.md`
+- This decisions doc resolves deferred legend/label/scope questions without changing runtime behavior.
+
 ## Deferred Items (Not Built Yet)
 - Legend extraction from uploaded map legend images.
 - OCR/classification for labels and symbols.
 - Real road/zone/building inference from raster inputs.
 - Confidence scoring and human-in-the-loop correction pipeline.
```

### ```diff
commit 21d22cb43476942377e0611f6128cbe33ea48bbb
Author: xavstack <your.email@example.com>
Date:   Fri Feb 13 16:50:33 2026 +0100

    docs(phase14): resolve scanner questions decisions + docs integration

diff --git a/docs/BLUEPRINT_SPEC.md b/docs/BLUEPRINT_SPEC.md
index 798637b..1f76322 100644
--- a/docs/BLUEPRINT_SPEC.md
+++ b/docs/BLUEPRINT_SPEC.md
@@ -66,8 +66,9 @@ A “blank” blueprint is created by normalizing an empty object `{}` via the s
 ## Notes

 - `transit[]` is legacy; during normalization, any entries are merged into `roads[]` and `transit` is cleared.
 - Curve indices are stored but expanded at render time. Their interpretation is consistent with current runtime behavior; no schema redesign is introduced in Phase 3.
 - The future scanner will output this same schema; do not change keys during refactor without a migration plan.
 - Current scanner scaffolding produces a placeholder DraftBlueprint first.
 - That DraftBlueprint is validated and normalized through existing pipeline hooks before becoming active BlueprintModel data.
 - This remains descriptive only; no new scanner inference requirements are introduced here.
+- Scanner MVP output tiers (Tier 0/1/2) are documented in `docs/SCANNER_DECISIONS.md`.
```

### ```diff
commit 21d22cb43476942377e0611f6128cbe33ea48bbb
Author: xavstack <your.email@example.com>
Date:   Fri Feb 13 16:50:33 2026 +0100

    docs(phase14): resolve scanner questions decisions + docs integration

diff --git a/docs/COORDINATES.md b/docs/COORDINATES.md
index 30e8458..de9a9c1 100644
--- a/docs/COORDINATES.md
+++ b/docs/COORDINATES.md
@@ -20,8 +20,9 @@
 - `maxDriftPx` is the maximum measured pixel drift across sampled points.
 - Parity pass requires `overlayDrift.ok === true` and tracked counts to remain unchanged.

 ## Mapping Intent (Conceptual)
 - Overlay calibration maps normalized image coordinates to world/map coordinates.
 - Probe checks that runtime mapping remains consistent after refactor extraction.
 - This document defines contracts and terms only; it does not promise specific implementation internals.
 - See `docs/SCANNER.md` for current OverlayMeta fields used to carry normalized/original image dimensions into scanner plumbing.
+- See `docs/SCANNER_DECISIONS.md` for scanner-tier decisions that depend on normalized overlay coordinates.
```

### ```diff
commit 21d22cb43476942377e0611f6128cbe33ea48bbb
Author: xavstack <your.email@example.com>
Date:   Fri Feb 13 16:50:33 2026 +0100

    docs(phase14): resolve scanner questions decisions + docs integration

diff --git a/docs/ai/REFACTOR_STATUS.md b/docs/ai/REFACTOR_STATUS.md
index 39ca2f5..69ce7ca 100644
--- a/docs/ai/REFACTOR_STATUS.md
+++ b/docs/ai/REFACTOR_STATUS.md
@@ -8,21 +8,26 @@
 - Phase 0: baseline parity anchor captured.
 - Phases 1–4: early modular groundwork completed (see phase packets and log).
 - Phases 5–9: renderer/editor/ui extraction series completed with parity-gated probes.
 - Phases 10–11: docs closure + scanner placeholder scaffolding completed.
 - Phase 12: post-plan wrap-up completed (upload simplification, docs/tooling audits, final validation probe).

 Source of truth: `REFACTOR_LOG.md`.

-## Deferred (Plan Section 10 — Scanner Questions)
-From `REFACTOR_EXECUTION_PLAN_TIGHT_v7_rev4.md`, explicitly deferred:
-1. Canonical legend colors/symbols per feature type.
-2. OCR vs symbol markers for labels.
-3. MVP scan scope (roads-only vs roads+water vs full zones/buildings).
+## Resolved (Docs) — Scanner Questions
+Resolved in docs via `docs/SCANNER_DECISIONS.md`:
+1. Canonical legend colors/symbols per feature type (Canon v0).
+2. OCR vs symbol marker strategy for MVP.
+3. Tiered MVP scan scope (Tier 0/1/2).
+
+## Next Steps (Non-Blocking)
+- Implement legend and marker parsing in scanner runtime modules.
+- Add confidence/error telemetry for unresolved scan candidates.
+- Keep parity-gated validation active while moving from placeholder to inference.

 ## What To Upload For Review
 Use the 3-file rule:
 1. `REFACTOR_LOG.md`
 2. `docs/ai/UPLOAD_BUNDLE_MASTER.md`
 3. One scope-specific upload bundle (`docs/ai/UPLOAD_BUNDLE_PHASE0-9.md`, `docs/ai/UPLOAD_BUNDLE_PHASE10-11.md`, `docs/ai/UPLOAD_BUNDLE_PHASE11-CODE.md`, or `docs/ai/UPLOAD_BUNDLE_PHASE12.md`).

 Optional deep evidence: one matching `review_packet_*` bundle/doc when requested.
```

### ```diff
commit 21d22cb43476942377e0611f6128cbe33ea48bbb
Author: xavstack <your.email@example.com>
Date:   Fri Feb 13 16:50:33 2026 +0100

    docs(phase14): resolve scanner questions decisions + docs integration

diff --git a/docs/ai/UPLOAD_BUNDLE_PHASE14.md b/docs/ai/UPLOAD_BUNDLE_PHASE14.md
new file mode 100644
index 0000000..90a2ae9
--- /dev/null
+++ b/docs/ai/UPLOAD_BUNDLE_PHASE14.md
@@ -0,0 +1,23 @@
+# Upload Bundle — Phase 14 (Scanner Questions Decisions)
+
+## Purpose
+Upload-ready summary for Phase 14, which resolves deferred scanner questions at the documentation/spec layer.
+
+## Scope
+Phase 14 covers:
+- `docs/SCANNER_DECISIONS.md` (new canonical decisions doc)
+- Integration links in scanner/blueprint/coordinates docs
+- Status and upload-routing doc updates
+- Link-audit refresh artifact
+
+## Minimal Upload Set (3 files)
+1. `REFACTOR_LOG.md`
+2. `docs/ai/UPLOAD_BUNDLE_MASTER.md`
+3. `docs/ai/UPLOAD_BUNDLE_PHASE14.md`
+
+## Optional Deep Evidence
+- `docs/ai/review_packet_phase14.md`
+
+## Notes
+- This phase is docs/tooling-only and does not implement scanner inference runtime.
+- Bundle format is markdown-only (no zip workflow).
```

### ```diff
commit 21d22cb43476942377e0611f6128cbe33ea48bbb
Author: xavstack <your.email@example.com>
Date:   Fri Feb 13 16:50:33 2026 +0100

    docs(phase14): resolve scanner questions decisions + docs integration

diff --git a/docs/ai/UPLOAD_BUNDLE_MASTER.md b/docs/ai/UPLOAD_BUNDLE_MASTER.md
index 0540d40..eaa56a2 100644
--- a/docs/ai/UPLOAD_BUNDLE_MASTER.md
+++ b/docs/ai/UPLOAD_BUNDLE_MASTER.md
@@ -20,15 +20,20 @@ Policy: NO ZIP uploads by default. Use markdown bundles.
   - Minimal upload set: `REFACTOR_LOG.md` + `docs/ai/UPLOAD_BUNDLE_MASTER.md` + `docs/ai/UPLOAD_BUNDLE_PHASE0-9.md`
   - Optional deep evidence: per-phase packets `docs/ai/review_packet_phase1.md` through `docs/ai/review_packet_phase9g.md`

 - `docs/ai/UPLOAD_BUNDLE_PHASE12.md`
   - Coverage: Phase 12 post-plan wrap-up and review simplification.
   - Minimal upload set: `REFACTOR_LOG.md` + `docs/ai/UPLOAD_BUNDLE_MASTER.md` + `docs/ai/UPLOAD_BUNDLE_PHASE12.md`
   - Optional deep evidence: `docs/ai/review_packet_phase12.md`

+- `docs/ai/UPLOAD_BUNDLE_PHASE14.md`
+  - Coverage: scanner-question decisions resolved in docs + integration routing updates.
+  - Minimal upload set: `REFACTOR_LOG.md` + `docs/ai/UPLOAD_BUNDLE_MASTER.md` + `docs/ai/UPLOAD_BUNDLE_PHASE14.md`
+  - Optional deep evidence: `docs/ai/review_packet_phase14.md`
+
 ## Default Recommendation
 For SeniorDev handoffs, upload:
 1. `REFACTOR_LOG.md`
 2. `docs/ai/UPLOAD_BUNDLE_MASTER.md`
 3. One scope-specific bundle doc from this index.

 Add one optional deep-evidence file only when command-level detail is requested.
```

### ```diff
commit 21d22cb43476942377e0611f6128cbe33ea48bbb
Author: xavstack <your.email@example.com>
Date:   Fri Feb 13 16:50:33 2026 +0100

    docs(phase14): resolve scanner questions decisions + docs integration

diff --git a/docs/ai/UPLOAD_GUIDE.md b/docs/ai/UPLOAD_GUIDE.md
index ee20065..f674809 100644
--- a/docs/ai/UPLOAD_GUIDE.md
+++ b/docs/ai/UPLOAD_GUIDE.md
@@ -2,16 +2,17 @@

 Bundle means single markdown bundle, not zip.

 ## What You Upload To SeniorDev (3 files)
 1. `REFACTOR_LOG.md`
 2. `docs/ai/UPLOAD_BUNDLE_MASTER.md`
 3. One scope-specific bundle, usually:
    - `docs/ai/UPLOAD_BUNDLE_PHASE0-9.md`, or
+   - `docs/ai/UPLOAD_BUNDLE_PHASE14.md`, or
    - `docs/ai/UPLOAD_BUNDLE_PHASE12.md`, or
    - `docs/ai/UPLOAD_BUNDLE_PHASE10-11.md`, or
    - `docs/ai/UPLOAD_BUNDLE_PHASE11-CODE.md`

 ## Optional Deep Evidence (1 file)
 Include one deep-evidence markdown only when requested:
 - `docs/ai/review_packet_phase12.md` for Phase 12 scope
 - `docs/ai/review_packet_bundle_phase10-11_docs.md` for docs refresh scope
```

### ```diff
commit 21d22cb43476942377e0611f6128cbe33ea48bbb
Author: xavstack <your.email@example.com>
Date:   Fri Feb 13 16:50:33 2026 +0100

    docs(phase14): resolve scanner questions decisions + docs integration

diff --git a/docs/ai/audit_md_links_phase14.txt b/docs/ai/audit_md_links_phase14.txt
new file mode 100644
index 0000000..1124ab6
--- /dev/null
+++ b/docs/ai/audit_md_links_phase14.txt
@@ -0,0 +1,8 @@
+# Markdown Link Audit
+
+repo_root=/Users/xavstack/Documents/1.CODE/1_Games/City_simulator/TADHG
+scan_patterns=](./...) and ](/docs/...)
+
+status=PASS
+
+No missing targets found for scanned patterns.
```

## Packet Commit Evidence (pre-commit)

### `git diff --stat --cached`
```text
 docs/ai/review_packet_phase14.md | 441 +++++++++++++++++++++++++++++++++++++++
 1 file changed, 441 insertions(+)
```

### `git diff --check --cached`
```text
(no output)
```

## Carry-forward
- P0: None.
- P1: None.
- P2: Scanner decisions are docs-level canon v0; runtime implementation remains future scope.
