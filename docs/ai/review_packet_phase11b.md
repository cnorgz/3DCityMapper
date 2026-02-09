# Review Packet - Phase 11b

## Metadata
- branch: refactor/phase11b-scanner-validate-normalize
- base_commit: f125309
- phase_end_commit: d2ff787
- packet_commit: PENDING (self-reference)
- focus_paths:
  - src/scanner/ScannerController.js
  - city-sim.html
  - REFACTOR_LOG.md
  - docs/ai/review_packet_phase11b.md

## Determinism
Command:
```bash
command -v rg >/dev/null && echo "rg=1" || echo "rg=0"
```
Output:
```text
rg=1
```

## Fixed Commands
Command:
```bash
git status -sb
```
Output:
```text
## refactor/phase11b-scanner-validate-normalize
```

Command:
```bash
git rev-parse --short HEAD
```
Output:
```text
d2ff787
```

Command:
```bash
git log --oneline --decorate -n 20
```
Output:
```text
d2ff787 (HEAD -> refactor/phase11b-scanner-validate-normalize) docs(phase11b): record readiness-gated probe
1cb03c2 refactor(phase11b): scanner validate+normalize placeholder
f125309 (refactor/phase11a_1-log-metadata) docs(ai): add review packet for phase 11a_1
38e3f68 docs(phase11a_1): fix phase11a log metadata
fc79b21 (refactor/phase11a-scanner-scaffolding) docs(ai): add review packet for phase 11a
31b75b4 docs(phase11a): record readiness-gated probe
64a6fc6 refactor(phase11a): add scanner scaffolding placeholder
8db8050 (refactor/phase10b_1-log-metadata) docs(ai): add review packet for phase 10b_1
cfd031d docs(phase10b_1): fix phase10a/10b log metadata
cf6ed56 (origin/refactor/phase10b-example-city-entry, refactor/phase10b-example-city-entry) docs(ai): add review packet for phase 10b
6540d5b docs(phase10b): record readiness-gated probe
6602bb8 refactor(phase10b): extract ExampleCityEntry and route example mode through it (and move CityModeController to src/core)
d233ca9 (refactor/phase10a-city-mode-controller) docs(ai): add review packet for phase 10a
bbbae5e docs(phase10a): record readiness-gated probe
ef369c8 refactor(phase10a): add CityModeController skeleton + minimal wiring
b22284c (refactor/phase9g_1-log-metadata, refactor/phase10a-city-modes-controller) docs(ai): add review packet for phase 9g_1
03b8dba docs(phase9g_1): fix phase9g log metadata
3e36260 (refactor/phase9g-ui-devhud-panel) docs(ai): add review packet for phase 9g
f7f8d20 docs(phase9g): record readiness-gated probe
9f2d162 refactor(phase9g): add DevHUDPanel (dev-only)
```

## Bounded Diffs (Audit Target)
Command:
```bash
git diff --stat f125309...d2ff787 -- src/scanner/ScannerController.js city-sim.html REFACTOR_LOG.md docs/ai/review_packet_phase11b.md
```
Output:
```text
 REFACTOR_LOG.md                  | 15 +++++++++++++++
 city-sim.html                    | 25 ++++++++++++++++++++++---
 src/scanner/ScannerController.js | 30 ++++++++++++++++++++++++++++--
 3 files changed, 65 insertions(+), 5 deletions(-)
```

Command:
```bash
git diff --check f125309...d2ff787 -- src/scanner/ScannerController.js city-sim.html REFACTOR_LOG.md docs/ai/review_packet_phase11b.md
```
Output:
```text
(no output)
```

Command:
```bash
git diff -U15 f125309...d2ff787 -- city-sim.html src/scanner/ScannerController.js REFACTOR_LOG.md
```
Output:
```diff
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index aec3ea6..f63483a 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -375,15 +375,30 @@ Probe check (post-extraction):
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
 
 ## Phase 11a – Scanner scaffolding placeholder
 
 - branch: refactor/phase11a-scanner-scaffolding
 - base_commit: 8db8050
 - phase_end_commit: 31b75b4
 - packet_commit: fc79b21
 - capture_method: codex-mcp (readiness gated)
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_len: 3977
 - json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
+
+## Phase 11b – Scanner validate+normalize placeholder pipeline
+
+- branch: refactor/phase11b-scanner-validate-normalize
+- base_commit: f125309
+- phase_end_commit: PENDING
+- packet_commit: PENDING
+- capture_method: codex-mcp (readiness gated)
+- url: http://localhost:8000/city-sim.html?refactorProbe=1
+- json_len: 3978
+- json_sha256: c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa
+- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
+- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
+- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
+- parity_decision: PASS (tracked fields sceneCounts + blueprintCounts + overlayDrift match baseline; hash variance accepted per v7 triage)
diff --git a/city-sim.html b/city-sim.html
index c75a4a4..d6ed609 100644
--- a/city-sim.html
+++ b/city-sim.html
@@ -1771,37 +1771,55 @@ function validateBlueprint(data) {
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
-          applyBlueprintData: async (draft) => {
-            blueprintData = draft;
+          applyBlueprintData: async (draft, ctx) => {
+            const validation = blueprintModel.validate(draft);
+            if (!validation.ok) {
+              const firstError = validation.errors?.[0] || 'unknown validation error';
+              console.warn('Scanner placeholder draft validation failed:', { errors: validation.errors, context: ctx });
+              setBlueprintStatus(`Blueprint status: scan draft invalid (${firstError}).`, false);
+              return { ok: false, reason: 'invalid-blueprint-draft', errors: validation.errors || [] };
+            }
+
+            let normalizedDraft = null;
+            try {
+              normalizedDraft = blueprintModel.loadFromJSON(draft);
+            } catch (error) {
+              console.warn('Scanner placeholder draft normalization failed:', error);
+              setBlueprintStatus('Blueprint status: scan draft normalization failed.', false);
+              return { ok: false, reason: 'normalize-failed' };
+            }
+
+            blueprintData = normalizedDraft;
             buildBlueprintFromData(blueprintData);
             setBlueprintCityEnabled(true);
             cityModeState.mode = 'blueprint';
             setBlueprintStatus('Blueprint status: scanner placeholder draft loaded.');
             syncTrafficPanel();
+            return { ok: true };
           }
         });
       }
       return scannerController;
     }
@@ -5567,31 +5585,32 @@ function validateBlueprint(data) {
             verifyOverlayMapping();
 
             if (pendingScan) {
               pendingScan = false;
               const scanResult = await ensureScannerController().scanFromOverlay();
               if (!scanResult?.ok) {
-                setBlueprintStatus('Blueprint status: scan placeholder failed.', false);
+                const reason = scanResult?.reason ? ` (${scanResult.reason})` : '';
+                setBlueprintStatus(`Blueprint status: scan placeholder failed.${reason}`, false);
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
@@
diff --git a/src/scanner/ScannerController.js b/src/scanner/ScannerController.js
index 7fbaeb7..f505dce 100644
--- a/src/scanner/ScannerController.js
+++ b/src/scanner/ScannerController.js
@@ -6,29 +6,55 @@ export function createScannerController({
 } = {}) {
   let pending = null;
 
   async function scanFromOverlay() {
     if (pending) return pending;
@@
-        await applyBlueprintData(draft, { overlay, legendRules });
-        return { ok: true, mode: 'placeholder-draft' };
+        const applyResult = await applyBlueprintData(draft, { overlay, legendRules });
+        if (applyResult && applyResult.ok === false) {
+          return {
+            ok: false,
+            reason: applyResult.reason || 'apply-blueprint-failed',
+            errors: applyResult.errors || null
+          };
+        }
+
+        const overlayMeta = {};
+        if (overlay.imageId !== undefined && overlay.imageId !== null) {
+          overlayMeta.imageId = overlay.imageId;
+        }
+        const width = overlay?.meta?.width ?? overlay?.width;
+        const height = overlay?.meta?.height ?? overlay?.height;
+        if (Number.isFinite(width)) overlayMeta.width = width;
+        if (Number.isFinite(height)) overlayMeta.height = height;
+
+        const result = {
+          ok: true,
+          mode: 'placeholder-draft',
+          draft,
+          legendRules
+        };
+        if (Object.keys(overlayMeta).length > 0) {
+          result.overlayMeta = overlayMeta;
+        }
+        return result;
       })
       .finally(() => {
         pending = null;
       });
```

## Pinned Module Content
Command:
```bash
git show d2ff787:src/scanner/ScannerController.js
```
Output:
```javascript
export function createScannerController({
  getOverlayImage = () => null,
  getLegendRules = () => null,
  createBlankBlueprint = () => null,
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

        const applyResult = await applyBlueprintData(draft, { overlay, legendRules });
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
          draft,
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
    scanFromOverlay
  };
}
```

## Probe Summary
- url: `http://localhost:8000/city-sim.html?refactorProbe=1`
- capture_method: codex-mcp (readiness gated)
- REFACTOR_PROBE_LEN: `3978`
- REFACTOR_PROBE_SHA256: `c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa`
- sceneCounts: `{"meshCount":631,"lineCount":6,"pointCount":0,"groupCount":206,"geometryCount":443,"materialCount":345}`
- blueprintCounts: `{"beaches":0,"buildings":0,"coastlines":1,"pois":1,"roads":2,"sea":0,"transit":0,"zones":1}`
- overlayDrift: `{"ok":true,"epsPx":0.05,"maxDriftPx":0}`
- parity_decision: PASS (tracked fields sceneCounts + blueprintCounts + overlayDrift match baseline)

## Carry-forward P0/P1/P2
- P0: None.
- P1: `REFACTOR_LOG.md` Phase 11b `phase_end_commit`/`packet_commit` remain PENDING by convention; backfill in Phase 11b_1 docs micro-phase if strict metadata closure is required.
- P2: Scanner still placeholder-only by design; real overlay/legend inference remains future scope.
