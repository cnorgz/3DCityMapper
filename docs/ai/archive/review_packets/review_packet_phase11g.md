# Phase 11g Review Packet

## Metadata
- branch: `refactor/phase11g-scanner-use-draft-builder`
- base_commit: `53c2bbc`
- phase_end_commit: `8eb12e4`
- packet_commit: `PENDING` (self-reference; see git log)
- focus_paths:
  - `city-sim.html`
  - `src/scanner/ScannerController.js`
  - `src/scanner/DraftBlueprintBuilder.js`
  - `REFACTOR_LOG.md`
  - `docs/ai/review_packet_phase11g.md`

## Determinism

```bash
$ command -v rg >/dev/null && echo "rg=1" || echo "rg=0"; if command -v rg >/dev/null; then rg --version | head -n 1; fi
rg=1
ripgrep 14.1.1 (rev 4649aa9700)
```

## Fixed Commands

```bash
$ git status -sb
## refactor/phase11g-scanner-use-draft-builder
```

```bash
$ git rev-parse --short HEAD
8eb12e4
```

```bash
$ git log --oneline --decorate -n 20
8eb12e4 (HEAD -> refactor/phase11g-scanner-use-draft-builder) docs(phase11g): record readiness-gated probe
7bbda6f refactor(phase11g): wire scanner controller through DraftBlueprintBuilder
53c2bbc (refactor/phase11f-draft-blueprint-builder) docs(ai): add review packet for phase 11f
0a201ba docs(phase11f): record readiness-gated probe
e017763 refactor(phase11f): add DraftBlueprintBuilder placeholder
b029371 (refactor/phase11e-legendrules-to-config) docs(ai): add review packet for phase 11e
08dba45 docs(phase11e): record readiness-gated probe
5b1d1fb refactor(phase11e): move legendRules to src/config with scanner shim
cb56281 (refactor/phase11d_1-log-metadata) docs(ai): add review packet for phase 11d_1
be84cb6 docs(phase11d_1): backfill phase11d log metadata
0a9750b (refactor/phase11d-scanner-draft-pipeline) docs(ai): add review packet for phase 11d
041e143 docs(phase11d): record readiness-gated probe
78ee0b3 refactor(phase11d): move scanner draft validate/normalize orchestration into ScannerController
8e9efd9 (refactor/phase11c_1-log-metadata) docs(ai): add review packet for phase 11c_1
5734663 docs(phase11c_1): backfill phase11c log metadata
a7b9b64 (refactor/phase11c-scanner-normalize-safety) docs(ai): add review packet for phase 11c
f5ba1bd docs(phase11c): record readiness-gated probe
706ca15 refactor(phase11c): harden scanner draft normalization
3601fcd (refactor/phase11b_1-log-metadata) docs(ai): add review packet for phase 11b_1
a8c7f0e docs(phase11b_1): backfill phase11b log metadata
```

## Audit Evidence (`53c2bbc...8eb12e4`)

```bash
$ git diff --stat 53c2bbc...8eb12e4 -- city-sim.html src/scanner/ScannerController.js src/scanner/DraftBlueprintBuilder.js REFACTOR_LOG.md docs/ai/review_packet_phase11g.md
 REFACTOR_LOG.md                  | 15 +++++++++++++++
 city-sim.html                    |  2 ++
 src/scanner/ScannerController.js | 35 ++++++++++++++++++++++++-----------
 3 files changed, 41 insertions(+), 11 deletions(-)
```

```bash
$ git diff --check 53c2bbc...8eb12e4 -- city-sim.html src/scanner/ScannerController.js src/scanner/DraftBlueprintBuilder.js REFACTOR_LOG.md docs/ai/review_packet_phase11g.md
(no output)
```

```bash
$ git diff -U15 53c2bbc...8eb12e4 -- city-sim.html src/scanner/ScannerController.js src/scanner/DraftBlueprintBuilder.js REFACTOR_LOG.md docs/ai/review_packet_phase11g.md
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index a52a68e..582c41e 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -451,15 +451,30 @@ Probe check (post-extraction):

 ## Phase 11f – DraftBlueprintBuilder placeholder module

 - branch: refactor/phase11f-draft-blueprint-builder
 - base_commit: b029371
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: codex-mcp (readiness gated)
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_len: 3978
 - json_sha256: c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
 - parity_decision: PASS (tracked fields unchanged and hash matches baseline snapshot)
+
+## Phase 11g – Scanner controller uses DraftBlueprintBuilder
+
+- branch: refactor/phase11g-scanner-use-draft-builder
+- base_commit: 53c2bbc
+- phase_end_commit: PENDING
+- packet_commit: PENDING
+- capture_method: codex-mcp (readiness gated)
+- url: http://localhost:8000/city-sim.html?refactorProbe=1
+- json_len: 3978
+- json_sha256: c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa
+- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
+- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
+- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
+- parity_decision: PASS (tracked fields unchanged and hash matches baseline snapshot)
diff --git a/city-sim.html b/city-sim.html
index ab27cd6..88e9a89 100644
--- a/city-sim.html
+++ b/city-sim.html
@@ -783,30 +783,31 @@
     import { pointInPolygon, centroidNorm, distancePointToSegment } from './src/utils/GeometryMath.js';
     import { disposeObject3D } from './src/utils/Dispose.js';
     import { getItem, setItem } from './src/persistence/StateStore.js';
     import { runMigrations } from './src/persistence/Migrations.js';
     import { validateBlueprint as validateBlueprintCore } from './src/core/BlueprintValidator.js';
     import { normalizeBlueprint } from './src/core/BlueprintNormalizer.js';
     import { BlueprintModel } from './src/core/BlueprintModel.js';
     import {
       loadFromStore as loadOverlayImageFromStore,
       getDataURL as getOverlayImageDataURL,
       getImageId as getOverlayImageId,
       getImageMeta as getOverlayImageMeta,
       setFromFile as setOverlayImageFromFile
     } from './src/scanner/ImageSource.js';
     import { LEGEND_RULES as SCANNER_LEGEND_RULES } from './src/scanner/legendRules.js';
+    import { buildDraftBlueprint } from './src/scanner/DraftBlueprintBuilder.js';
     import { createScannerController } from './src/scanner/ScannerController.js';
     import { ensureExampleCity } from './src/demo/ExampleCityEntry.js';
     import {
       createBlueprintPreviewGroups,
       buildBlueprintPreview,
       clearBlueprintPreview
     } from './src/render/BlueprintPreviewRenderer.js';
     import { createSceneManager } from './src/render/SceneManager.js';
     import { createLayerManager } from './src/render/LayerManager.js';
     import { createViewModeController } from './src/render/ViewModeController.js';
     import { createRenderLoop } from './src/render/RenderLoop.js';
     import { getSharedWindowMaterials, getSharedWindowGeometry } from './src/render/MaterialLibrary.js';
     import { createLegacyTerrain } from './src/render/TerrainLayer.js';
     import { buildLegacyTerrainDefs } from './src/terrain/TerrainGenerator.js';
     import { createLegacyRoads } from './src/render/RoadLayer.js';
@@ -1771,30 +1772,31 @@ function validateBlueprint(data) {
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
+          buildDraftBlueprint,
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
             syncTrafficPanel();
             return { ok: true };
           }
         });
diff --git a/src/scanner/ScannerController.js b/src/scanner/ScannerController.js
index 57bfc70..4e552e7 100644
--- a/src/scanner/ScannerController.js
+++ b/src/scanner/ScannerController.js
@@ -1,77 +1,90 @@
+import { buildDraftBlueprint as buildDraftBlueprintDefault } from './DraftBlueprintBuilder.js';
+
 export function createScannerController({
   getOverlayImage = () => null,
   getLegendRules = () => null,
   createBlankBlueprint = () => null,
+  buildDraftBlueprint = buildDraftBlueprintDefault,
   validateDraft = null,
   normalizeDraft = null,
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
         const overlayMeta = {};
         if (overlay.imageId !== undefined && overlay.imageId !== null) {
           overlayMeta.imageId = overlay.imageId;
```

## Pinned Module Contents

```bash
$ git show 8eb12e4:src/scanner/ScannerController.js
import { buildDraftBlueprint as buildDraftBlueprintDefault } from './DraftBlueprintBuilder.js';

export function createScannerController({
  getOverlayImage = () => null,
  getLegendRules = () => null,
  createBlankBlueprint = () => null,
  buildDraftBlueprint = buildDraftBlueprintDefault,
  validateDraft = null,
  normalizeDraft = null,
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
        const overlayMeta = {};
        if (overlay.imageId !== undefined && overlay.imageId !== null) {
          overlayMeta.imageId = overlay.imageId;
        }
        const width = overlay?.meta?.width ?? overlay?.width;
        const height = overlay?.meta?.height ?? overlay?.height;
        if (Number.isFinite(width)) overlayMeta.width = width;
        if (Number.isFinite(height)) overlayMeta.height = height;

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

        if (typeof validateDraft === 'function') {
          const validation = await validateDraft(draft, ctx);
          if (!validation?.ok) {
            return {
              ok: false,
              reason: 'invalid-blueprint-draft',
              errors: validation?.errors || []
            };
          }
        }

        let normalizedDraft = draft;
        if (typeof normalizeDraft === 'function') {
          try {
            normalizedDraft = await normalizeDraft(draft, ctx);
          } catch (_error) {
            return { ok: false, reason: 'normalize-failed' };
          }
        }

        const applyResult = await applyBlueprintData(normalizedDraft, ctx);
        if (applyResult && applyResult.ok === false) {
          return {
            ok: false,
            reason: applyResult.reason || 'apply-blueprint-failed',
            errors: applyResult.errors || null
          };
        }

        const result = {
          ok: true,
          mode: 'placeholder-draft',
          draft: normalizedDraft,
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

```bash
$ git show 8eb12e4:src/scanner/DraftBlueprintBuilder.js
/**
 * Placeholder draft builder for scanner pipeline.
 * Future phases can add legend/image inference while keeping this API stable.
 */
export function buildDraftBlueprint({ overlayImage, legendRules, overlayMeta, createBlankBlueprint } = {}) {
  void overlayImage;
  void legendRules;
  void overlayMeta;
  if (typeof createBlankBlueprint !== 'function') {
    throw new Error('createBlankBlueprint-missing');
  }
  return createBlankBlueprint();
}
```

## Probe Summary
- url: `http://localhost:8000/city-sim.html?refactorProbe=1`
- REFACTOR_PROBE_LEN: `3978`
- REFACTOR_PROBE_SHA256: `c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa`
- sceneCounts: `{ meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }`
- blueprintCounts: `{ beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }`
- overlayDrift: `{ ok: true, epsPx: 0.05, maxDriftPx: 0 }`
- parity decision: `PASS` (tracked fields unchanged and hash matches baseline snapshot)

## Carry-Forward
- P0: none
- P1: `REFACTOR_LOG.md` Phase 11g `phase_end_commit` and `packet_commit` remain `PENDING` by branch convention; backfill in `11g_1`.
- P2: none

## Packet Commit Evidence (pre-commit)

```bash
$ git diff --stat --cached
 docs/ai/review_packet_phase11g.md | 355 ++++++++++++++++++++++++++++++++++++++
 1 file changed, 355 insertions(+)
```

```bash
$ git diff --check --cached
(no output)
```
