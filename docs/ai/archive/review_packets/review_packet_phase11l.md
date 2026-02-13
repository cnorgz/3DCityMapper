# Phase 11l Review Packet

## Metadata
- branch: refactor/phase11l-overlaymeta-maxedge-originaldims
- base_commit: 67162f5
- phase_end_commit: 63d3475
- packet_commit: PENDING (self-reference; see git log)
- focus_paths: src/scanner/ScannerController.js src/scanner/overlayMeta.js REFACTOR_LOG.md docs/ai/review_packet_phase11l.md

## Determinism
```text
rg=1
```

## Fixed Commands

### `git status -sb`
```text
## refactor/phase11l-overlaymeta-maxedge-originaldims
```

### `git rev-parse HEAD`
```text
63d3475985cb8e8174a4f96f5688c1fa5740c768
```

### `git log --oneline --decorate -n 20`
```text
63d3475 (HEAD -> refactor/phase11l-overlaymeta-maxedge-originaldims) docs(phase11l): record readiness-gated probe
aa8b6f6 refactor(phase11l): enrich overlayMeta helper with optional import constraints
67162f5 (refactor/phase11k_1-log-metadata) docs(ai): add review packet for phase 11k_1
e9481ff docs(phase11k_1): backfill phase11k log metadata
d3ca2bf (refactor/phase11k-scanner-overlaymeta-helper) docs(ai): add review packet for phase 11k
636d43f docs(phase11k): record readiness-gated probe
df6db91 refactor(phase11k): extract scanner overlayMeta helper
6be26fb (refactor/phase11-handoff-bundle) docs(ai): add review packet for phase 11i_1
afe57a1 docs(phase11i_1): backfill phase11i log metadata
627eedd docs(ai): add review packet for phase 11h_1
593fd02 docs(phase11h_1): backfill phase11h log metadata
f4b2c37 (refactor/phase11j_1-log-metadata) docs(ai): add review packet for phase 11j_1
8846bd9 docs(phase11j_1): backfill phase11j log metadata
1772722 (refactor/phase11j-scanner-consume-normalized-meta) docs(ai): add review packet for phase 11j
cb658e6 docs(phase11j): record readiness-gated probe
7a78dd9 refactor(phase11j): scanner pipeline consumes normalized overlay metadata
43ed3f5 (refactor/phase11i-imageid-calib-keying) docs(ai): add review packet for phase 11i
f2bd6da docs(phase11i): record readiness-gated probe
3779c3a refactor(phase11i): add stable imageId keying and calib migration fallback
aa6b8a3 (refactor/phase11h-image-source-normalize-2048) docs(ai): add review packet for phase 11h
```

### `git diff --stat 67162f5...63d3475 -- src/scanner/ScannerController.js src/scanner/overlayMeta.js REFACTOR_LOG.md docs/ai/review_packet_phase11l.md`
```text
 REFACTOR_LOG.md            | 16 ++++++++++++++++
 src/scanner/overlayMeta.js | 15 +++++++++++++++
 2 files changed, 31 insertions(+)
```

### `git diff --check 67162f5...63d3475 -- src/scanner/ScannerController.js src/scanner/overlayMeta.js REFACTOR_LOG.md docs/ai/review_packet_phase11l.md`
```text
(no output)
```

### `git diff -U15 67162f5...63d3475 -- src/scanner/ScannerController.js src/scanner/overlayMeta.js REFACTOR_LOG.md docs/ai/review_packet_phase11l.md`
```diff
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 6a50fdb..b967481 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -530,15 +530,31 @@ Probe check (post-extraction):
 ## Phase 11k – Extract overlayMeta assembly helper

 - branch: refactor/phase11k-scanner-overlaymeta-helper
 - base_commit: 6be26fb
 - phase_end_commit: 636d43f
 - packet_commit: d3ca2bf
 - capture_method: codex-mcp (readiness gated)
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_len: 3977
 - json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
 - rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }
 - parity_decision: PASS (tracked fields unchanged and hash matches current baseline snapshot)
+
+## Phase 11l – overlayMeta helper includes optional original dims/max edge
+
+- branch: refactor/phase11l-overlaymeta-maxedge-originaldims
+- base_commit: 67162f5
+- phase_end_commit: PENDING
+- packet_commit: PENDING
+- capture_method: codex-mcp (readiness gated)
+- url: http://localhost:8000/city-sim.html?refactorProbe=1
+- json_len: 3977
+- json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
+- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
+- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
+- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
+- rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }
+- parity_decision: PASS (tracked fields unchanged and hash matches current baseline snapshot)
diff --git a/src/scanner/overlayMeta.js b/src/scanner/overlayMeta.js
index 6a37f9d..b4fe4e6 100644
--- a/src/scanner/overlayMeta.js
+++ b/src/scanner/overlayMeta.js
@@ -1,23 +1,38 @@
 export function buildOverlayMetaFromOverlay(overlay) {
   const overlayMeta = {};
   if (!overlay) return overlayMeta;

   if (overlay.imageId !== undefined && overlay.imageId !== null) {
     overlayMeta.imageId = overlay.imageId;
   }

   const normalizedWidth = overlay?.meta?.width ?? overlay?.width;
   const normalizedHeight = overlay?.meta?.height ?? overlay?.height;
+  const originalWidth = overlay?.meta?.originalWidth;
+  const originalHeight = overlay?.meta?.originalHeight;
+  const maxEdgePx = overlay?.meta?.maxEdgePx;
@@
+  if (Number.isFinite(originalWidth)) {
+    overlayMeta.originalWidth = originalWidth;
+  }
+
+  if (Number.isFinite(originalHeight)) {
+    overlayMeta.originalHeight = originalHeight;
+  }
+
+  if (Number.isFinite(maxEdgePx)) {
+    overlayMeta.maxEdgePx = maxEdgePx;
+  }
+
   return overlayMeta;
 }
```

## Probe Summary
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_len: 3977
- json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
- sceneCounts: {"meshCount":631,"lineCount":6,"pointCount":0,"groupCount":206,"geometryCount":443,"materialCount":345}
- blueprintCounts: {"beaches":0,"buildings":0,"coastlines":1,"pois":1,"roads":2,"sea":0,"transit":0,"zones":1}
- overlayDrift: {"ok":true,"epsPx":0.05,"maxDriftPx":0}
- rendererInfo: {"memory":{"geometries":436,"textures":3},"render":{"calls":626,"triangles":22614,"lines":0,"points":0}}
- parity_decision: PASS

## Carry-forward
- P0: none
- P1: fill `phase_end_commit` and `packet_commit` in REFACTOR_LOG for 11l during 11l_1 metadata phase.
- P2: none

## Packet Pre-Commit Evidence

### `git diff --stat --cached`
```text
 docs/ai/review_packet_phase11l.md | 149 ++++++++++++++++++++++++++++++++++++++
 1 file changed, 149 insertions(+)
```

### `git diff --check --cached`
```text
(no output)
```
