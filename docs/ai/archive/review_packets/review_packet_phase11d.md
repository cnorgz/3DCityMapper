# Review Packet - Phase 11d

## Metadata
- Branch: `refactor/phase11d-scanner-draft-pipeline`
- Base commit: `8e9efd9`
- Phase end commit: `041e143`
- Packet commit: `PENDING` (self-reference)
- Focus paths: `city-sim.html`, `src/scanner/ScannerController.js`, `REFACTOR_LOG.md`, `docs/ai/review_packet_phase11d.md`

## Determinism
```text
rg=1
```

## Fixed Evidence
### `git status -sb`
```text
## refactor/phase11d-scanner-draft-pipeline
```

### `git rev-parse --short HEAD`
```text
041e143
```

### `git log --oneline --decorate -n 20`
```text
041e143 (HEAD -> refactor/phase11d-scanner-draft-pipeline) docs(phase11d): record readiness-gated probe
78ee0b3 refactor(phase11d): move scanner draft validate/normalize orchestration into ScannerController
8e9efd9 (refactor/phase11c_1-log-metadata) docs(ai): add review packet for phase 11c_1
5734663 docs(phase11c_1): backfill phase11c log metadata
a7b9b64 (refactor/phase11c-scanner-normalize-safety) docs(ai): add review packet for phase 11c
f5ba1bd docs(phase11c): record readiness-gated probe
706ca15 refactor(phase11c): harden scanner draft normalization
3601fcd (refactor/phase11b_1-log-metadata) docs(ai): add review packet for phase 11b_1
a8c7f0e docs(phase11b_1): backfill phase11b log metadata
657d5da (refactor/phase11b-scanner-validate-normalize) docs(ai): add review packet for phase 11b
d2ff787 docs(phase11b): record readiness-gated probe
1cb03c2 refactor(phase11b): scanner validate+normalize placeholder
f125309 (refactor/phase11a_1-log-metadata) docs(ai): add review packet for phase 11a_1
38e3f68 docs(phase11a_1): fix phase11a log metadata
fc79b21 (refactor/phase11a-scanner-scaffolding) docs(ai): add review packet for phase 11a
31b75b4 docs(phase11a): record readiness-gated probe
64a6fc6 refactor(phase11a): add scanner scaffolding placeholder
8db8050 (refactor/phase10b_1-log-metadata) docs(ai): add review packet for phase 10b_1
cfd031d docs(phase10b_1): fix phase10a/10b log metadata
cf6ed56 (origin/refactor/phase10b-example-city-entry, refactor/phase10b-example-city-entry) docs(ai): add review packet for phase 10b
```

## Audit Evidence
### `git diff --stat 8e9efd9...041e143 -- city-sim.html src/scanner/ScannerController.js REFACTOR_LOG.md docs/ai/review_packet_phase11d.md`
```text
 REFACTOR_LOG.md                  | 16 ++++++++++++++++
 city-sim.html                    | 34 +++++++++++++++-------------------
 src/scanner/ScannerController.js | 28 ++++++++++++++++++++++++++--
 3 files changed, 57 insertions(+), 21 deletions(-)
```

### `git diff --check 8e9efd9...041e143 -- city-sim.html src/scanner/ScannerController.js REFACTOR_LOG.md docs/ai/review_packet_phase11d.md`
```text
(no output)
```

### `git diff -U15 8e9efd9...041e143 -- city-sim.html src/scanner/ScannerController.js REFACTOR_LOG.md`
```diff
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 1363b5e..64f166e 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -405,15 +405,31 @@ Probe check (post-extraction):

 ## Phase 11c – Scanner draft normalization hardening

 - branch: refactor/phase11c-scanner-normalize-safety
 - base_commit: 3601fcd
 - phase_end_commit: f5ba1bd
 - packet_commit: a7b9b64
 - capture_method: codex-mcp (readiness gated)
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_len: 3977
 - json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
 - parity_decision: PASS (tracked fields unchanged and hash matches baseline snapshot)
+
+## Phase 11d – Scanner draft pipeline orchestration
+
+- branch: refactor/phase11d-scanner-draft-pipeline
+- base_commit: 8e9efd9
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
+- parity_decision: PASS (tracked fields match baseline; hash matches baseline snapshot)
diff --git a/city-sim.html b/city-sim.html
index 3041a82..ab27cd6 100644
--- a/city-sim.html
+++ b/city-sim.html
@@ -1771,48 +1771,37 @@ function validateBlueprint(data) {
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
           createBlankBlueprint: () => {
             blueprintModel.createBlank();
             return blueprintModel.getData();
           },
+          validateDraft: (draft, _ctx) => blueprintModel.validate(draft),
+          normalizeDraft: (draft, _ctx) => {
+            blueprintModel.loadFromJSON(draft);
+            return blueprintModel.getData();
+          },
           applyBlueprintData: async (draft, ctx) => {
-            const validation = blueprintModel.validate(draft);
-            if (!validation.ok) {
-              const firstError = validation.errors?.[0] || 'unknown validation error';
-              console.warn('Scanner placeholder draft validation failed:', { errors: validation.errors, context: ctx });
-              setBlueprintStatus(`Blueprint status: scan draft invalid (${firstError}).`, false);
-              return { ok: false, reason: 'invalid-blueprint-draft', errors: validation.errors || [] };
-            }
-
-            try {
-              blueprintModel.loadFromJSON(draft);
-            } catch (error) {
-              console.warn('Scanner placeholder draft normalization failed:', error);
-              setBlueprintStatus('Blueprint status: scan draft normalization failed.', false);
-              return { ok: false, reason: 'normalize-failed' };
-            }
-
-            blueprintData = blueprintModel.getData();
+            blueprintData = draft;
             buildBlueprintFromData(blueprintData);
             setBlueprintCityEnabled(true);
             cityModeState.mode = 'blueprint';
             setBlueprintStatus('Blueprint status: scanner placeholder draft loaded.');
             syncTrafficPanel();
             return { ok: true };
           }
         });
       }
       return scannerController;
     }

     // Rebuild a single zone (for editing)
     function rebuildZone(name) {
       const entry = ZONE_REGISTRY[name];
@@ -5584,32 +5573,39 @@ function validateBlueprint(data) {
             });

             if (mapOverlayMesh) mapOverlayGroup.remove(mapOverlayMesh);
             if (overlayDimmer) mapOverlayGroup.remove(overlayDimmer);
             mapOverlayMesh = overlayResult.mapOverlayMesh;
             overlayDimmer = overlayResult.overlayDimmer;
             mapCoordMapper = overlayResult.mapCoordMapper;
             overlayLayer = overlayResult;
             updateOverlayVisibility();
             verifyOverlayMapping();

             if (pendingScan) {
               pendingScan = false;
               const scanResult = await ensureScannerController().scanFromOverlay();
               if (!scanResult?.ok) {
-                const reason = scanResult?.reason ? ` (${scanResult.reason})` : '';
-                setBlueprintStatus(`Blueprint status: scan placeholder failed.${reason}`, false);
+                if (scanResult.reason === 'invalid-blueprint-draft') {
+                  const firstError = scanResult?.errors?.[0] || 'unknown validation error';
+                  setBlueprintStatus(`Blueprint status: scan draft invalid (${firstError}).`, false);
+                } else if (scanResult.reason === 'normalize-failed') {
+                  setBlueprintStatus('Blueprint status: scan draft normalization failed.', false);
+                } else {
+                  const reason = scanResult?.reason ? ` (${scanResult.reason})` : '';
+                  setBlueprintStatus(`Blueprint status: scan placeholder failed.${reason}`, false);
+                }
               }
             }
           } catch (err) {
             console.warn('Failed to load uploaded overlay:', err);
             pendingScan = false;
           } finally {
             fileInput.value = '';
           }
         });
       }

       loadBtn.addEventListener('click', () => {
         const raw = jsonField.value.trim();
         if (!raw) {
           setBlueprintStatus('Blueprint load: paste JSON first.', false);
diff --git a/src/scanner/ScannerController.js b/src/scanner/ScannerController.js
index f505dce..57bfc70 100644
--- a/src/scanner/ScannerController.js
+++ b/src/scanner/ScannerController.js
@@ -1,57 +1,81 @@
 export function createScannerController({
   getOverlayImage = () => null,
   getLegendRules = () => null,
   createBlankBlueprint = () => null,
+  validateDraft = null,
+  normalizeDraft = null,
   applyBlueprintData = async () => {}
 } = {}) {
   let pending = null;

   async function scanFromOverlay() {
     if (pending) return pending;

     pending = Promise.resolve()
       .then(async () => {
         const overlay = getOverlayImage();
         if (!overlay || !overlay.dataUrl) return { ok: false, reason: 'no-overlay-image' };

         const legendRules = getLegendRules();
         const draft = createBlankBlueprint();
         if (!draft) return { ok: false, reason: 'blank-blueprint-failed' };

-        const applyResult = await applyBlueprintData(draft, { overlay, legendRules });
+        const ctx = { overlay, legendRules };
+
+        if (typeof validateDraft === 'function') {
+          const validation = await validateDraft(draft, ctx);
+          if (!validation?.ok) {
+            return {
+              ok: false,
+              reason: 'invalid-blueprint-draft',
+              errors: validation?.errors || []
+            };
+          }
+        }
+
+        let normalizedDraft = draft;
+        if (typeof normalizeDraft === 'function') {
+          try {
+            normalizedDraft = await normalizeDraft(draft, ctx);
+          } catch (_error) {
+            return { ok: false, reason: 'normalize-failed' };
+          }
+        }
+
+        const applyResult = await applyBlueprintData(normalizedDraft, ctx);
         if (applyResult && applyResult.ok === false) {
           return {
             ok: false,
             reason: applyResult.reason || 'apply-blueprint-failed',
             errors: applyResult.errors || null
           };
         }

         const overlayMeta = {};
         if (overlay.imageId !== undefined && overlay.imageId !== null) {
           overlayMeta.imageId = overlay.imageId;
         }
         const width = overlay?.meta?.width ?? overlay?.width;
         const height = overlay?.meta?.height ?? overlay?.height;
         if (Number.isFinite(width)) overlayMeta.width = width;
         if (Number.isFinite(height)) overlayMeta.height = height;

         const result = {
           ok: true,
           mode: 'placeholder-draft',
-          draft,
+          draft: normalizedDraft,
           legendRules
         };
         if (Object.keys(overlayMeta).length > 0) {
           result.overlayMeta = overlayMeta;
         }
         return result;
       })
       .finally(() => {
         pending = null;
       });

     return pending;
   }

   return {
```

## Probe Summary
```text
URL: http://localhost:8000/city-sim.html?refactorProbe=1
REFACTOR_PROBE_LEN: 3977
REFACTOR_PROBE_SHA256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
sceneCounts: {"meshCount":631,"lineCount":6,"pointCount":0,"groupCount":206,"geometryCount":443,"materialCount":345}
blueprintCounts: {"beaches":0,"buildings":0,"coastlines":1,"pois":1,"roads":2,"sea":0,"transit":0,"zones":1}
overlayDrift: {"ok":true,"epsPx":0.05,"maxDriftPx":0,"samples":[{"px":700,"py":500,"dx":0,"dy":0},{"px":140,"py":100,"dx":0,"dy":0},{"px":1260,"py":900,"dx":0,"dy":0}]}
parity_decision: PASS (tracked fields match baseline; hash matches baseline snapshot)
```

## Carry-forward
- P0: None.
- P1: Continue backfilling `phase_end_commit`/`packet_commit` in `REFACTOR_LOG.md` during `*_1` docs phases.
  - Locator: `REFACTOR_LOG.md`
  - Acceptance: No `PENDING` values for completed phases after hygiene pass.
- P2: Packet self-reference remains `PENDING` by design; use git log as authoritative.
  - Locator: `docs/ai/review_packet_phase11d.md` metadata
  - Acceptance: Packet commit documented in next docs-only backfill phase.

## Packet Pre-commit Evidence
### `git diff --stat --cached`
```text
 docs/ai/review_packet_phase11d.md | 322 ++++++++++++++++++++++++++++++++++++++
 1 file changed, 322 insertions(+)
```

### `git diff --check --cached`
```text
(no output)
```
