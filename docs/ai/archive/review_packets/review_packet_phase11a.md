# Review Packet - Phase 11a

## Metadata
- branch: refactor/phase11a-scanner-scaffolding
- base_commit: 8db8050
- phase_end_commit: 31b75b4
- packet_commit: PENDING (self-reference)
- focus_paths:
  - city-sim.html
  - src/scanner/ScannerController.js
  - src/scanner/ImageSource.js
  - src/scanner/legendRules.js
  - REFACTOR_LOG.md
  - docs/ai/review_packet_phase11a.md

## Determinism
Command:
```bash
command -v rg >/dev/null && echo "rg=1" || echo "rg=0"
```
Output:
```text
rg=1
```

Command:
```bash
node -v && npm -v
```
Output:
```text
v22.11.0
10.9.0
```

## Fixed Commands
Command:
```bash
git status -sb
```
Output:
```text
## refactor/phase11a-scanner-scaffolding
```

Command:
```bash
git rev-parse --short HEAD
```
Output:
```text
31b75b4
```

Command:
```bash
git log --oneline --decorate -n 20
```
Output:
```text
31b75b4 (HEAD -> refactor/phase11a-scanner-scaffolding) docs(phase11a): record readiness-gated probe
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
6883132 (refactor/phase9f_1-log-metadata) docs(ai): add review packet for phase 9f_1
0f96734 docs(phase9f_1): fix phase9f log metadata
9b4bace (refactor/phase9f-ui-zone-info-panel) docs(ai): add review packet for phase 9f
2969992 docs(phase9f): record readiness-gated probe
96910cf refactor(phase9f): extract ZoneInfoPanel
```

## Audit Evidence
Command:
```bash
git diff --stat 8db8050...31b75b4 -- city-sim.html src/scanner/ScannerController.js src/scanner/ImageSource.js src/scanner/legendRules.js REFACTOR_LOG.md docs/ai/review_packet_phase11a.md
```
Output:
```text
 REFACTOR_LOG.md                  | 14 ++++++++++++
 city-sim.html                    | 50 ++++++++++++++++++++++++++++++++++++++--
 src/scanner/ScannerController.js | 34 +++++++++++++++++++++++++++
 src/scanner/legendRules.js       |  5 +++++
 4 files changed, 101 insertions(+), 2 deletions(-)
```

Command:
```bash
git diff --check 8db8050...31b75b4 -- city-sim.html src/scanner/ScannerController.js src/scanner/ImageSource.js src/scanner/legendRules.js REFACTOR_LOG.md docs/ai/review_packet_phase11a.md
```
Output:
```text
(no output)
```

Command:
```bash
git diff -U15 8db8050...31b75b4 -- city-sim.html src/scanner/ScannerController.js src/scanner/ImageSource.js src/scanner/legendRules.js REFACTOR_LOG.md docs/ai/review_packet_phase11a.md
```
Output:
```diff
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 267f65e..d506f4a 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -361,15 +361,29 @@ Probe check (post-extraction):
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }

 ## Phase 10b – ExampleCityEntry extraction + CityModeController move

 - branch: refactor/phase10b-example-city-entry
 - base_commit: d233ca9
 - phase_end_commit: 6540d5b
 - packet_commit: cf6ed56
 - capture_method: codex-mcp (readiness gated)
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_len: 3977
 - json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
+
+## Phase 11a – Scanner scaffolding placeholder
+
+- branch: refactor/phase11a-scanner-scaffolding
+- base_commit: 8db8050
+- phase_end_commit: PENDING
+- packet_commit: PENDING
+- capture_method: codex-mcp (readiness gated)
+- url: http://localhost:8000/city-sim.html?refactorProbe=1
+- json_len: 3977
+- json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
+- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
+- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
+- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
diff --git a/city-sim.html b/city-sim.html
index 7aa123e..c75a4a4 100644
--- a/city-sim.html
+++ b/city-sim.html
@@ -782,30 +782,32 @@
     import { clampNumber, rng } from './src/utils/Math.js';
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
+    import { LEGEND_RULES as SCANNER_LEGEND_RULES } from './src/scanner/legendRules.js';
+    import { createScannerController } from './src/scanner/ScannerController.js';
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
     import { buildLegacyRoadDefs } from './src/geometry/RoadGenerator.js';
@@ -989,30 +991,32 @@ let blueprintZoneMeshes = [];
   let editorHistoryManager = null;
   let editorSnapEngine = null;
   let editorController = null;
   let editorHitTest = null;
   let editorInputRouter = null;
   let editorGestures = null;
   let panelManager = null;
   let uiEventBus = null;
   let trafficPanel = null;
   let cityModePanel = null;
   let overlayPanel = null;
   let blueprintPreviewPanel = null;
   let zoneInfoPanel = null;
   let devHudPanel = null;
   let cityModeController = null;
+  let scannerController = null;
+  let pendingScan = false;
   let trafficSystem = null;
   const devHudState = {
     lastProbe: null
   };
   const cityModeState = {
     mode: 'example'
   };
   const exampleCityEntryState = {
     initialized: false,
     pending: null
   };

 const blueprintPreviewSettings = {
   opacity: 1,
   showLabels: false
@@ -1753,30 +1757,56 @@ function validateBlueprint(data) {
     }

     function ensureCityModeController() {
       if (!cityModeController) {
         cityModeController = createCityModeController({
           defaultMode: 'example',
           actions: {
             applyBlueprintMode: applyCityModeBlueprint,
             applyBlankMode: applyCityModeBlank,
             applyExampleMode: applyCityModeExample
           }
         });
       }
       return cityModeController;
     }
+
+    function ensureScannerController() {
+      if (!scannerController) {
+        scannerController = createScannerController({
+          getOverlayImage: () => ({
+            imageId: getOverlayImageId(),
+            dataUrl: getOverlayImageDataURL(),
+            meta: getOverlayImageMeta()
+          }),
+          getLegendRules: () => SCANNER_LEGEND_RULES,
+          createBlankBlueprint: () => {
+            blueprintModel.createBlank();
+            return blueprintModel.getData();
+          },
+          applyBlueprintData: async (draft) => {
+            blueprintData = draft;
+            buildBlueprintFromData(blueprintData);
+            setBlueprintCityEnabled(true);
+            cityModeState.mode = 'blueprint';
+            setBlueprintStatus('Blueprint status: scanner placeholder draft loaded.');
+            syncTrafficPanel();
+          }
+        });
+      }
+      return scannerController;
+    }

     // Rebuild a single zone (for editing)
     function rebuildZone(name) {
       const entry = ZONE_REGISTRY[name];
       if (!entry || !entry.buildingGroup) return;

       // Remove instanced window batches BEFORE disposing
       entry.buildingGroup.traverse(obj => {
         if (obj.userData?.isWindowBatch) {
           // Remove from batch arrays
           const batchIdx = buildingWindowBatches.findIndex(b => b.lit === obj || b.dark === obj);
           if (batchIdx > -1) buildingWindowBatches.splice(batchIdx, 1);
           const skyscraperIdx = skyscraperWindowBatches.findIndex(b => b.lit === obj || b.dark === obj);
           if (skyscraperIdx > -1) skyscraperWindowBatches.splice(skyscraperIdx, 1);
         }
@@ -5491,34 +5521,40 @@ function validateBlueprint(data) {
       });

       if (overlayUploadBtn) {
         const fileInput = document.createElement('input');
         fileInput.type = 'file';
         fileInput.accept = 'image/*';
         fileInput.style.display = 'none';
         overlayUploadBtn.insertAdjacentElement('afterend', fileInput);

         overlayUploadBtn.addEventListener('click', () => {
           fileInput.click();
         });

         fileInput.addEventListener('change', async (event) => {
           const file = event.target.files?.[0];
-          if (!file) return;
+          if (!file) {
+            pendingScan = false;
+            return;
+          }
           try {
             const result = await setOverlayImageFromFile(file);
-            if (!result) return;
+            if (!result) {
+              pendingScan = false;
+              return;
+            }

             mapOverlayImgW = result.meta?.width || MAP_OVERLAY_IMG_W;
             mapOverlayImgH = result.meta?.height || MAP_OVERLAY_IMG_H;
             applyOverlayCalibKey();

             const overlayResult = await createOverlayLayer({
               renderer,
               textureUrl: result.dataUrl,
               imgW: mapOverlayImgW,
               imgH: mapOverlayImgH,
               worldW: MAP_OVERLAY_WORLD_W,
               worldH: MAP_OVERLAY_WORLD_H,
               y: Y.overlay,
               opacity: overlaySettings?.opacity ?? OVERLAY_DEFAULTS.opacity,
               visible: overlaySettings?.visible ?? true,
@@ -5526,32 +5562,41 @@ function validateBlueprint(data) {
               dimmerOpacity: overlaySettings?.dimmer ?? OVERLAY_DEFAULTS.dimmer,
               overlayGroup: mapOverlayGroup,
               syncBlueprintRoot: syncBlueprintRootToOverlay,
               updateLineResolution,
               blueprintGroups: { overlayBounds }
             });

             if (mapOverlayMesh) mapOverlayGroup.remove(mapOverlayMesh);
             if (overlayDimmer) mapOverlayGroup.remove(overlayDimmer);
             mapOverlayMesh = overlayResult.mapOverlayMesh;
             overlayDimmer = overlayResult.overlayDimmer;
             mapCoordMapper = overlayResult.mapCoordMapper;
             overlayLayer = overlayResult;
             updateOverlayVisibility();
             verifyOverlayMapping();
+
+            if (pendingScan) {
+              pendingScan = false;
+              const scanResult = await ensureScannerController().scanFromOverlay();
+              if (!scanResult?.ok) {
+                setBlueprintStatus('Blueprint status: scan placeholder failed.', false);
+              }
+            }
           } catch (err) {
             console.warn('Failed to load uploaded overlay:', err);
+            pendingScan = false;
           } finally {
             fileInput.value = '';
           }
         });
       }

       loadBtn.addEventListener('click', () => {
         const raw = jsonField.value.trim();
         if (!raw) {
           setBlueprintStatus('Blueprint load: paste JSON first.', false);
           return;
         }
         try {
           const parsed = JSON.parse(raw);
           const result = validateRaw(parsed, 'Blueprint load');
@@ -6315,30 +6360,31 @@ function validateBlueprint(data) {
         trafficPanel = createTrafficPanel({
           actions: {
             setTrafficMaxCars: (value) => uiEventBus.emit('traffic/setMaxCars', value),
             setTrafficSpeedScale: (value) => uiEventBus.emit('traffic/setSpeedScale', value)
           },
           state: {
             traffic: {
               maxCars: trafficRuntime.maxCars,
               speedScale: trafficRuntime.speedScale
             }
           }
         });
         cityModePanel = createCityModePanel({
           actions: {
             openScan: () => {
+              pendingScan = true;
               const upload = document.getElementById('overlayUpload');
               upload?.click();
             },
             setMode: async (mode) => {
               const controller = ensureCityModeController();
               await controller.setMode(mode);
               cityModeState.mode = controller.getMode();
               syncTrafficPanel();
             }
           },
           state: {
             cityMode: {
               mode: cityModeState.mode
             }
           }
diff --git a/src/scanner/ScannerController.js b/src/scanner/ScannerController.js
new file mode 100644
index 0000000..7fbaeb7
--- /dev/null
+++ b/src/scanner/ScannerController.js
@@ -0,0 +1,34 @@
+export function createScannerController({
+  getOverlayImage = () => null,
+  getLegendRules = () => null,
+  createBlankBlueprint = () => null,
+  applyBlueprintData = async () => {}
+} = {}) {
+  let pending = null;
+
+  async function scanFromOverlay() {
+    if (pending) return pending;
+
+    pending = Promise.resolve()
+      .then(async () => {
+        const overlay = getOverlayImage();
+        if (!overlay || !overlay.dataUrl) return { ok: false, reason: 'no-overlay-image' };
+
+        const legendRules = getLegendRules();
+        const draft = createBlankBlueprint();
+        if (!draft) return { ok: false, reason: 'blank-blueprint-failed' };
+
+        await applyBlueprintData(draft, { overlay, legendRules });
+        return { ok: true, mode: 'placeholder-draft' };
+      })
+      .finally(() => {
+        pending = null;
+      });
+
+    return pending;
+  }
+
+  return {
+    scanFromOverlay
+  };
+}
diff --git a/src/scanner/legendRules.js b/src/scanner/legendRules.js
new file mode 100644
index 0000000..58ddc4a
--- /dev/null
+++ b/src/scanner/legendRules.js
@@ -0,0 +1,5 @@
+export const LEGEND_RULES = Object.freeze({
+  version: 'phase11a-placeholder',
+  mode: 'manual-legend',
+  classes: []
+});
```

## Pinned Module Contents
Command:
```bash
git show 31b75b4:src/scanner/ScannerController.js
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

        await applyBlueprintData(draft, { overlay, legendRules });
        return { ok: true, mode: 'placeholder-draft' };
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

Command:
```bash
git show 31b75b4:src/scanner/ImageSource.js
```
Output:
```javascript
import { getItem, setItem, removeItem } from '../persistence/StateStore.js';

const STORAGE_KEYS = {
  imageId: 'overlay.imageId',
  imageData: 'overlay.imageData',
  imageMeta: 'overlay.imageMeta'
};

const MAX_EDGE_PX = 2048;

let currentImageId = null;
let currentDataUrl = null;
let currentMeta = null;

function safeParseImageMeta(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const width = Number(raw.width);
  const height = Number(raw.height);
  if (!Number.isFinite(width) || !Number.isFinite(height)) return null;
  return {
    width,
    height,
    name: raw.name || '',
    size: Number.isFinite(raw.size) ? raw.size : 0,
    lastModified: Number.isFinite(raw.lastModified) ? raw.lastModified : 0
  };
}

export function getImageId() {
  return currentImageId;
}

export function getDataURL() {
  return currentDataUrl;
}

export function getImageMeta() {
  return currentMeta;
}

export function getMaxEdgePx() {
  return MAX_EDGE_PX;
}

export function loadFromStore() {
  const storedId = getItem(STORAGE_KEYS.imageId);
  const storedData = getItem(STORAGE_KEYS.imageData);
  const storedMeta = safeParseImageMeta(getItem(STORAGE_KEYS.imageMeta));
  if (storedId && storedData) {
    currentImageId = storedId;
    currentDataUrl = storedData;
    currentMeta = storedMeta;
    return true;
  }
  return false;
}

function computeImageId(file) {
  return `${file.name}:${file.size}:${file.lastModified}`;
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error || new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

function loadImage(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = dataUrl;
  });
}

function normalizeDataUrl(img, maxEdgePx) {
  const width = img.naturalWidth || img.width;
  const height = img.naturalHeight || img.height;
  if (!width || !height) return { dataUrl: null, width: 0, height: 0 };

  const maxDim = Math.max(width, height);
  if (maxDim <= maxEdgePx) {
    return { dataUrl: img.src, width, height };
  }
  const scale = maxEdgePx / maxDim;
  const targetW = Math.round(width * scale);
  const targetH = Math.round(height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, targetW, targetH);
  const dataUrl = canvas.toDataURL('image/png');
  return { dataUrl, width: targetW, height: targetH };
}

export async function setFromFile(file) {
  if (!file) return null;
  const imageId = computeImageId(file);
  const rawDataUrl = await readFileAsDataURL(file);
  const img = await loadImage(rawDataUrl);
  const normalized = normalizeDataUrl(img, MAX_EDGE_PX);
  if (!normalized.dataUrl) return null;

  const meta = {
    width: normalized.width,
    height: normalized.height,
    name: file.name,
    size: file.size,
    lastModified: file.lastModified
  };

  currentImageId = imageId;
  currentDataUrl = normalized.dataUrl;
  currentMeta = meta;

  setItem(STORAGE_KEYS.imageId, imageId);
  setItem(STORAGE_KEYS.imageData, currentDataUrl);
  setItem(STORAGE_KEYS.imageMeta, meta);

  return { imageId, dataUrl: currentDataUrl, meta };
}

export function clearImage() {
  currentImageId = null;
  currentDataUrl = null;
  currentMeta = null;
  removeItem(STORAGE_KEYS.imageId);
  removeItem(STORAGE_KEYS.imageData);
  removeItem(STORAGE_KEYS.imageMeta);
}

export function getStorageKeys() {
  return { ...STORAGE_KEYS };
}
```

Command:
```bash
git show 31b75b4:src/scanner/legendRules.js
```
Output:
```javascript
export const LEGEND_RULES = Object.freeze({
  version: 'phase11a-placeholder',
  mode: 'manual-legend',
  classes: []
});
```

## Probe Summary
- url: `http://localhost:8000/city-sim.html?refactorProbe=1`
- capture_method: codex-mcp (readiness gated)
- REFACTOR_PROBE_LEN: `3977`
- REFACTOR_PROBE_SHA256: `ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d`
- sceneCounts: `{"meshCount":631,"lineCount":6,"pointCount":0,"groupCount":206,"geometryCount":443,"materialCount":345}`
- blueprintCounts: `{"beaches":0,"buildings":0,"coastlines":1,"pois":1,"roads":2,"sea":0,"transit":0,"zones":1}`
- overlayDrift: `{"ok":true,"epsPx":0.05,"maxDriftPx":0}`
- parity_decision: PASS (tracked fields match baseline)

## Packet Commit Evidence (pre-commit)
Command:
```bash
git diff --stat --cached
```
Output:
```text
docs/ai/review_packet_phase11a.md | 679 ++++++++++++++++++++++++++++++++++++++
1 file changed, 679 insertions(+)
```

Command:
```bash
git diff --check --cached
```
Output:
```text
(no output)
```

## Carry-forward
- P0: none.
- P1: backfill `phase_end_commit` and `packet_commit` in `REFACTOR_LOG.md` for Phase 11a in a docs-only follow-up (`phase11a_1`) if strict concrete metadata is required.
- P2: scanner placeholder currently uses blank blueprint only; real legend/image scan inference remains for later scanner phases.
