# Review Packet — Phase 11j

## Metadata
- branch: `refactor/phase11j-scanner-consume-normalized-meta`
- base_commit: `43ed3f5`
- phase_end_commit: `cb658e6`
- packet_commit: `PENDING` (self-reference; see git log)
- focus_paths:
  - `REFACTOR_LOG.md`
  - `city-sim.html`
  - `src/scanner/DraftBlueprintBuilder.js`
  - `src/scanner/ScannerController.js`
  - `docs/ai/review_packet_phase11j.md`

## Determinism
```bash
command -v rg >/dev/null && echo "rg=1" || echo "rg=0"
rg=1
```

## Fixed Evidence Commands (verbatim)
```bash
git status -sb
## refactor/phase11j-scanner-consume-normalized-meta
```

```bash
git rev-parse --short HEAD
cb658e6
```

```bash
git log --oneline --decorate -n 20
cb658e6 (HEAD -> refactor/phase11j-scanner-consume-normalized-meta) docs(phase11j): record readiness-gated probe
7a78dd9 refactor(phase11j): scanner pipeline consumes normalized overlay metadata
43ed3f5 (refactor/phase11i-imageid-calib-keying) docs(ai): add review packet for phase 11i
f2bd6da docs(phase11i): record readiness-gated probe
3779c3a refactor(phase11i): add stable imageId keying and calib migration fallback
aa6b8a3 (refactor/phase11h-image-source-normalize-2048) docs(ai): add review packet for phase 11h
0afa0d9 docs(phase11h): record readiness-gated probe
8ede508 refactor(phase11h): harden image source normalization metadata
edc47d8 (refactor/phase11g_1-log-metadata) docs(ai): add review packet for phase 11g_1
880a352 docs(phase11g_1): backfill phase11g log metadata
6eee608 (refactor/phase11f_1-log-metadata) docs(ai): add review packet for phase 11f_1
96abc39 docs(phase11f_1): backfill phase11f log metadata
d3b3298 (refactor/phase11e_1-log-metadata) docs(ai): add review packet for phase 11e_1
311a419 docs(phase11e_1): backfill phase11e log metadata
ded6d59 (refactor/phase11g-scanner-use-draft-builder) docs(ai): add review packet for phase 11g
8eb12e4 docs(phase11g): record readiness-gated probe
7bbda6f refactor(phase11g): wire scanner controller through DraftBlueprintBuilder
53c2bbc (refactor/phase11f-draft-blueprint-builder) docs(ai): add review packet for phase 11f
0a201ba docs(phase11f): record readiness-gated probe
e017763 refactor(phase11f): add DraftBlueprintBuilder placeholder
```

## Bounded Diff Evidence (`base...phase_end`)
```bash
git diff --stat 43ed3f5...cb658e6 -- REFACTOR_LOG.md city-sim.html src/scanner/DraftBlueprintBuilder.js src/scanner/ScannerController.js docs/ai/review_packet_phase11j.md
 REFACTOR_LOG.md                      | 16 ++++++++++++++++
 city-sim.html                        |  2 +-
 src/scanner/DraftBlueprintBuilder.js |  3 +--
 src/scanner/ScannerController.js     | 14 ++++++++++----
 4 files changed, 28 insertions(+), 7 deletions(-)
```

```bash
git diff --check 43ed3f5...cb658e6 -- REFACTOR_LOG.md city-sim.html src/scanner/DraftBlueprintBuilder.js src/scanner/ScannerController.js docs/ai/review_packet_phase11j.md
(no output)
```

```bash
git diff -U15 43ed3f5...cb658e6 -- REFACTOR_LOG.md city-sim.html src/scanner/DraftBlueprintBuilder.js src/scanner/ScannerController.js docs/ai/review_packet_phase11j.md
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 2b34240..1cbba67 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -498,15 +498,31 @@ Probe check (post-extraction):
 ## Phase 11i – Stable imageId + calibration keying

 - branch: refactor/phase11i-imageid-calib-keying
 - base_commit: aa6b8a3
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: codex-mcp (readiness gated)
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_len: 3978
 - json_sha256: c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
 - rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }
 - parity_decision: PASS (tracked fields unchanged; hash variance accepted per v7 triage)
+
+## Phase 11j – Scanner pipeline consumes normalized image meta
+
+- branch: refactor/phase11j-scanner-consume-normalized-meta
+- base_commit: 43ed3f5
+- phase_end_commit: PENDING
+- packet_commit: PENDING
+- capture_method: codex-mcp (readiness gated)
+- url: http://localhost:8000/city-sim.html?refactorProbe=1
+- json_len: 3978
+- json_sha256: c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa
+- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
+- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
+- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
+- rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }
+- parity_decision: PASS (tracked fields unchanged and hash matches current baseline snapshot)
diff --git a/city-sim.html b/city-sim.html
index 88e9a89..4bd7be7 100644
--- a/city-sim.html
+++ b/city-sim.html
@@ -1768,31 +1768,31 @@ function validateBlueprint(data) {
           }
         });
       }
       return cityModeController;
     }

     function ensureScannerController() {
       if (!scannerController) {
         scannerController = createScannerController({
           getOverlayImage: () => ({
             imageId: getOverlayImageId(),
             dataUrl: getOverlayImageDataURL(),
             meta: getOverlayImageMeta()
           }),
           getLegendRules: () => SCANNER_LEGEND_RULES,
-          createBlankBlueprint: () => {
+          createBlankBlueprint: (_options = {}) => {
             blueprintModel.createBlank();
             return blueprintModel.getData();
           },
           buildDraftBlueprint,
           validateDraft: (draft, _ctx) => blueprintModel.validate(draft),
           normalizeDraft: (draft, _ctx) => {
             blueprintModel.loadFromJSON(draft);
             return blueprintModel.getData();
           },
           applyBlueprintData: async (draft, ctx) => {
             blueprintData = draft;
             buildBlueprintFromData(blueprintData);
             setBlueprintCityEnabled(true);
             cityModeState.mode = 'blueprint';
             setBlueprintStatus('Blueprint status: scanner placeholder draft loaded.');
diff --git a/src/scanner/DraftBlueprintBuilder.js b/src/scanner/DraftBlueprintBuilder.js
index 628c1bc..95f831c 100644
--- a/src/scanner/DraftBlueprintBuilder.js
+++ b/src/scanner/DraftBlueprintBuilder.js
@@ -1,13 +1,12 @@
 /**
  * Placeholder draft builder for scanner pipeline.
  * Future phases can add legend/image inference while keeping this API stable.
  */
 export function buildDraftBlueprint({ overlayImage, legendRules, overlayMeta, createBlankBlueprint } = {}) {
   void overlayImage;
   void legendRules;
-  void overlayMeta;
   if (typeof createBlankBlueprint !== 'function') {
     throw new Error('createBlankBlueprint-missing');
   }
-  return createBlankBlueprint();
+  return createBlankBlueprint({ overlayMeta });
 }
diff --git a/src/scanner/ScannerController.js b/src/scanner/ScannerController.js
index 4e552e7..e09309f 100644
--- a/src/scanner/ScannerController.js
+++ b/src/scanner/ScannerController.js
@@ -12,34 +12,40 @@ export function createScannerController({
   let pending = null;

   async function scanFromOverlay() {
     if (pending) return pending;

     pending = Promise.resolve()
       .then(async () => {
         const overlay = getOverlayImage();
         if (!overlay || !overlay.dataUrl) return { ok: false, reason: 'no-overlay-image' };

         const legendRules = getLegendRules();
         const overlayMeta = {};
         if (overlay.imageId !== undefined && overlay.imageId !== null) {
           overlayMeta.imageId = overlay.imageId;
         }
-        const width = overlay?.meta?.width ?? overlay?.width;
-        const height = overlay?.meta?.height ?? overlay?.height;
-        if (Number.isFinite(width)) overlayMeta.width = width;
-        if (Number.isFinite(height)) overlayMeta.height = height;
+        const normalizedWidth = overlay?.meta?.width ?? overlay?.width;
+        const normalizedHeight = overlay?.meta?.height ?? overlay?.height;
+        if (Number.isFinite(normalizedWidth)) {
+          overlayMeta.normalizedWidth = normalizedWidth;
+          overlayMeta.width = normalizedWidth;
+        }
+        if (Number.isFinite(normalizedHeight)) {
+          overlayMeta.normalizedHeight = normalizedHeight;
+          overlayMeta.height = normalizedHeight;
+        }

         let draft = null;
         try {
           draft = buildDraftBlueprint({
             overlayImage: overlay,
             legendRules,
             overlayMeta,
             createBlankBlueprint
           });
         } catch (_error) {
           return { ok: false, reason: 'blank-blueprint-failed' };
         }
         if (!draft) return { ok: false, reason: 'blank-blueprint-failed' };

         const ctx = { overlay, overlayMeta, legendRules };
```

## Probe Summary (Phase 11j)
- url: `http://localhost:8000/city-sim.html?refactorProbe=1`
- json_len: `3978`
- json_sha256: `c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa`
- sceneCounts: `{ meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }`
- blueprintCounts: `{ beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }`
- overlayDrift: `{ ok: true, epsPx: 0.05, maxDriftPx: 0 }`
- parity decision: PASS

## Carry-Forward
- P0: none
- P1: backfill `phase_end_commit` and `packet_commit` in `REFACTOR_LOG.md` Phase 11j via `11j_1` docs-only phase.
- P2: none

## Packet Commit Evidence (pre-commit)
```bash
git diff --stat --cached
(captured after staging packet file)
```

```bash
git diff --check --cached
(captured after staging packet file; expected no output)
```
