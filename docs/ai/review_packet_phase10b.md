# Phase 10b Review Packet

## Metadata
- branch: refactor/phase10b-example-city-entry
- base_commit: d233ca9
- phase_end_commit: 6540d5b
- packet_commit: PENDING (self-reference; use `git log`)
- focus_paths: city-sim.html src/core/CityModeController.js src/demo/ExampleCityEntry.js REFACTOR_LOG.md docs/ai/review_packet_phase10b.md

## Determinism
Command:
```bash
command -v rg >/dev/null && echo "rg=1" || echo "rg=0"
node -v
npm -v
```
Output:
```text
rg=1
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
## refactor/phase10b-example-city-entry
?? docs/ai/review_packet_phase10b.md
```

Command:
```bash
git rev-parse --short HEAD
```
Output:
```text
6540d5b
```

Command:
```bash
git log --oneline --decorate -n 20
```
Output:
```text
6540d5b (HEAD -> refactor/phase10b-example-city-entry) docs(phase10b): record readiness-gated probe
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
cc9f741 (refactor/phase9e_1-log-metadata) docs(ai): add review packet for phase 9e_1
58ec08d docs(phase9e_1): fix phase9e log metadata
58f38a5 (refactor/phase9e-ui-dev-mode-switch) docs(ai): add review packet for phase 9e
e07ae40 docs(phase9e): record readiness-gated probe
6f60adb refactor(phase9e): add dev-mode switch for UI strict EventBus
```

## Audit Evidence (bounded)
Command:
```bash
git diff --stat d233ca9...6540d5b -- city-sim.html src/core/CityModeController.js src/demo/ExampleCityEntry.js REFACTOR_LOG.md docs/ai/review_packet_phase10b.md
```
Output:
```text
 REFACTOR_LOG.md                | 14 ++++++++++++
 city-sim.html                  | 26 ++++++++++++++++---
 src/core/CityModeController.js | 57 ++++++++++++++++++++++++++++++++++++++++++
 src/demo/ExampleCityEntry.js   | 23 +++++++++++++++++
 4 files changed, 116 insertions(+), 4 deletions(-)
```

Command:
```bash
git diff --check d233ca9...6540d5b -- city-sim.html src/core/CityModeController.js src/demo/ExampleCityEntry.js REFACTOR_LOG.md docs/ai/review_packet_phase10b.md
```
Output:
```text
(no output)
```

Command:
```bash
git diff -U15 d233ca9...6540d5b -- city-sim.html src/core/CityModeController.js src/demo/ExampleCityEntry.js REFACTOR_LOG.md
```
Output:
```diff
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 516aed4..a07ac3d 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -347,15 +347,29 @@ Probe check (post-extraction):
 - rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }
 
 ## Phase 10a – CityModeController skeleton + minimal wiring
 
 - branch: refactor/phase10a-city-mode-controller
 - base_commit: b22284c
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: codex-mcp (readiness gated)
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_len: 3977
 - json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
+
+## Phase 10b – ExampleCityEntry extraction + CityModeController move
+
+- branch: refactor/phase10b-example-city-entry
+- base_commit: d233ca9
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
index c377901..7aa123e 100644
--- a/city-sim.html
+++ b/city-sim.html
@@ -782,61 +782,62 @@
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
+    import { ensureExampleCity } from './src/demo/ExampleCityEntry.js';
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
     import { buildLegacyBuildingDefs } from './src/geometry/BuildingGenerator.js';
     import { createLegacyBuildings } from './src/render/BuildingLayer.js';
     import { createZoneMeshes } from './src/render/ZoneLayer.js';
     import { addProp } from './src/render/PropsLayer.js';
     import { buildLegacyCity } from './src/render/CityRenderer.js';
     import { createTrafficSystem } from './src/sim/TrafficSystem.js';
     import { createEditorRebuildScheduler } from './src/editor/RebuildScheduler.js';
     import { createEditorHistoryManager } from './src/editor/HistoryManager.js';
     import { createEditorSnapEngine } from './src/editor/SnapEngine.js';
     import { createEditorController } from './src/editor/EditorController.js';
     import { createEditorHitTest } from './src/editor/HitTest.js';
     import { createEditorInputRouter } from './src/editor/InputRouter.js';
     import { createEditorGestures } from './src/editor/Gestures.js';
     import { createPanelManager } from './src/ui/PanelManager.js';
     import { createEventBus } from './src/ui/EventBus.js';
     import { isDevMode } from './src/ui/DevMode.js';
-    import { createCityModeController } from './src/modes/CityModeController.js';
+    import { createCityModeController } from './src/core/CityModeController.js';
     import { createTrafficPanel } from './src/ui/panels/TrafficPanel.js';
     import { createCityModePanel } from './src/ui/panels/CityModePanel.js';
     import { createOverlayPanel } from './src/ui/panels/OverlayPanel.js';
     import { createBlueprintPreviewPanel } from './src/ui/panels/BlueprintPreviewPanel.js';
     import { createZoneInfoPanel } from './src/ui/panels/ZoneInfoPanel.js';
     import { createDevHUDPanel } from './src/ui/panels/DevHUDPanel.js';
     
     // ============================================
     // CONFIGURATION
     // ============================================
     
     
     // ============================================
     // SCENE SETUP
     // ============================================
@@ -995,30 +996,34 @@ let blueprintZoneMeshes = [];
   let uiEventBus = null;
   let trafficPanel = null;
   let cityModePanel = null;
   let overlayPanel = null;
   let blueprintPreviewPanel = null;
   let zoneInfoPanel = null;
   let devHudPanel = null;
   let cityModeController = null;
   let trafficSystem = null;
   const devHudState = {
     lastProbe: null
   };
   const cityModeState = {
     mode: 'example'
   };
+  const exampleCityEntryState = {
+    initialized: false,
+    pending: null
+  };
 
 const blueprintPreviewSettings = {
   opacity: 1,
   showLabels: false
 };
 
 function refreshBlueprintPreview() {
   if (!blueprintData) return;
   buildBlueprintFromData(blueprintData);
 }
 
 function setBlueprintPreviewOpacity(value) {
   const clamped = clampNumber(Number.parseFloat(value), 0.1, 1);
   blueprintPreviewSettings.opacity = clamped;
   try {
@@ -1699,47 +1704,62 @@ function validateBlueprint(data) {
       rebuildBlueprintTraffic();
       setCityLayerVisibility();
     }
 
     function setBlueprintCityEnabled(enabled) {
       blueprintCityEnabled = !!enabled;
       const toggle = document.getElementById('blueprintUseCity');
       if (toggle) toggle.checked = blueprintCityEnabled;
       if (blueprintCityEnabled) {
         if (!blueprintData) loadBlueprintData();
         rebuildBlueprintCity();
       }
       setCityLayerVisibility();
     }
 
+    async function ensureExampleCityBuilt(options = {}) {
+      return ensureExampleCity({
+        state: exampleCityEntryState,
+        runLegacyBuild: () =>
+          buildLegacyCity({
+            buildPhase1,
+            buildPhase2,
+            delayMs: options.delayMs ?? 100,
+            onPhase1Done: options.onPhase1Done,
+            onPhase2Done: options.onPhase2Done
+          })
+      });
+    }
+
     async function applyCityModeBlueprint() {
       if (!blueprintData) {
         await loadBlueprintData();
       }
       setBlueprintCityEnabled(true);
       setBlueprintStatus('Blueprint status: blueprint mode.');
     }
 
     async function applyCityModeBlank() {
       blueprintModel.createBlank();
       blueprintData = blueprintModel.getData();
       buildBlueprintFromData(blueprintData);
       setBlueprintCityEnabled(true);
       setBlueprintStatus('Blueprint status: blank city.');
     }
 
     async function applyCityModeExample() {
+      await ensureExampleCityBuilt();
       setBlueprintCityEnabled(false);
       setBlueprintStatus('Blueprint status: example city mode.');
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
@@ -5063,33 +5083,31 @@ function validateBlueprint(data) {
     async function init() {
       console.log("TADHG CITY SIMULATOR - VERSION 2.1 - ROBUST FIXES APPLIED");
       // Show loading progress
       const loadingBar = document.getElementById('loadingBar');
       
       loadingBar.style.width = '20%';
 
       try {
         loadOverlayImageFromStore();
         const migrationImageId = getOverlayImageId() || PERSISTENCE_IMAGE_ID;
         runMigrations({ imageId: migrationImageId });
       } catch (error) {
         console.warn('Failed to run migrations:', error);
       }
       
-      buildLegacyCity({
-        buildPhase1,
-        buildPhase2,
+      await ensureExampleCityBuilt({
         delayMs: 100,
         onPhase1Done: () => {
           loadingBar.style.width = '40%';
         },
         onPhase2Done: async () => {
           loadingBar.style.width = '70%';
 
           // Animated water
           createAnimatedWater();
           loadingBar.style.width = '80%';
 
           // Map overlay
           try {
           const uploadedDataUrl = getOverlayImageDataURL();
           const uploadedMeta = getOverlayImageMeta();
diff --git a/src/core/CityModeController.js b/src/core/CityModeController.js
new file mode 100644
index 0000000..57fcd90
--- /dev/null
+++ b/src/core/CityModeController.js
@@ -0,0 +1,57 @@
+const SUPPORTED_MODES = new Set(['blueprint', 'blank', 'example']);
+
+function normalizeMode(rawMode, fallback = 'blueprint') {
+  const mode = typeof rawMode === 'string' ? rawMode.toLowerCase().trim() : '';
+  if (SUPPORTED_MODES.has(mode)) return mode;
+  return fallback;
+}
+
+function readModeFromSearch(search) {
+  try {
+    const params = new URLSearchParams(search || globalThis?.location?.search || '');
+    return params.get('cityMode');
+  } catch (_) {
+    return null;
+  }
+}
+
+export function createCityModeController({ actions = {}, search = null, defaultMode = 'blueprint' } = {}) {
+  let currentMode = normalizeMode(defaultMode, 'blueprint');
+
+  async function setMode(rawMode) {
+    const nextMode = normalizeMode(rawMode, currentMode);
+    if (nextMode === currentMode && nextMode !== 'example') return currentMode;
+
+    if (nextMode === 'blank' && typeof actions.applyBlankMode === 'function') {
+      await actions.applyBlankMode();
+    } else if (nextMode === 'example' && typeof actions.applyExampleMode === 'function') {
+      await actions.applyExampleMode();
+    } else if (nextMode === 'blueprint' && typeof actions.applyBlueprintMode === 'function') {
+      await actions.applyBlueprintMode();
+    }
+
+    currentMode = nextMode;
+    return currentMode;
+  }
+
+  function getMode() {
+    return currentMode;
+  }
+
+  function resolveInitialMode() {
+    return normalizeMode(readModeFromSearch(search), currentMode);
+  }
+
+  async function applyInitialMode() {
+    const initial = resolveInitialMode();
+    if (initial === currentMode) return currentMode;
+    return setMode(initial);
+  }
+
+  return {
+    setMode,
+    getMode,
+    resolveInitialMode,
+    applyInitialMode
+  };
+}
diff --git a/src/demo/ExampleCityEntry.js b/src/demo/ExampleCityEntry.js
new file mode 100644
index 0000000..667022c
--- /dev/null
+++ b/src/demo/ExampleCityEntry.js
@@ -0,0 +1,23 @@
+export async function ensureExampleCity({ state, runLegacyBuild } = {}) {
+  if (!state || typeof state !== 'object') {
+    throw new Error('ensureExampleCity requires a mutable state object');
+  }
+  if (typeof runLegacyBuild !== 'function') {
+    throw new Error('ensureExampleCity requires runLegacyBuild function');
+  }
+
+  if (state.initialized) return false;
+  if (state.pending) return state.pending;
+
+  state.pending = Promise.resolve()
+    .then(() => runLegacyBuild())
+    .then(() => {
+      state.initialized = true;
+      return true;
+    })
+    .finally(() => {
+      state.pending = null;
+    });
+
+  return state.pending;
+}
```

## Pinned Module Contents
Command:
```bash
git show 6540d5b:src/core/CityModeController.js
```
Output:
```javascript
const SUPPORTED_MODES = new Set(['blueprint', 'blank', 'example']);

function normalizeMode(rawMode, fallback = 'blueprint') {
  const mode = typeof rawMode === 'string' ? rawMode.toLowerCase().trim() : '';
  if (SUPPORTED_MODES.has(mode)) return mode;
  return fallback;
}

function readModeFromSearch(search) {
  try {
    const params = new URLSearchParams(search || globalThis?.location?.search || '');
    return params.get('cityMode');
  } catch (_) {
    return null;
  }
}

export function createCityModeController({ actions = {}, search = null, defaultMode = 'blueprint' } = {}) {
  let currentMode = normalizeMode(defaultMode, 'blueprint');

  async function setMode(rawMode) {
    const nextMode = normalizeMode(rawMode, currentMode);
    if (nextMode === currentMode && nextMode !== 'example') return currentMode;

    if (nextMode === 'blank' && typeof actions.applyBlankMode === 'function') {
      await actions.applyBlankMode();
    } else if (nextMode === 'example' && typeof actions.applyExampleMode === 'function') {
      await actions.applyExampleMode();
    } else if (nextMode === 'blueprint' && typeof actions.applyBlueprintMode === 'function') {
      await actions.applyBlueprintMode();
    }

    currentMode = nextMode;
    return currentMode;
  }

  function getMode() {
    return currentMode;
  }

  function resolveInitialMode() {
    return normalizeMode(readModeFromSearch(search), currentMode);
  }

  async function applyInitialMode() {
    const initial = resolveInitialMode();
    if (initial === currentMode) return currentMode;
    return setMode(initial);
  }

  return {
    setMode,
    getMode,
    resolveInitialMode,
    applyInitialMode
  };
}
```

Command:
```bash
git show 6540d5b:src/demo/ExampleCityEntry.js
```
Output:
```javascript
export async function ensureExampleCity({ state, runLegacyBuild } = {}) {
  if (!state || typeof state !== 'object') {
    throw new Error('ensureExampleCity requires a mutable state object');
  }
  if (typeof runLegacyBuild !== 'function') {
    throw new Error('ensureExampleCity requires runLegacyBuild function');
  }

  if (state.initialized) return false;
  if (state.pending) return state.pending;

  state.pending = Promise.resolve()
    .then(() => runLegacyBuild())
    .then(() => {
      state.initialized = true;
      return true;
    })
    .finally(() => {
      state.pending = null;
    });

  return state.pending;
}
```

## Probe Summary
- URL: http://localhost:8000/city-sim.html?refactorProbe=1
- REFACTOR_PROBE_LEN: 3977
- REFACTOR_PROBE_SHA256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
- sceneCounts: {"meshCount":631,"lineCount":6,"pointCount":0,"groupCount":206,"geometryCount":443,"materialCount":345}
- blueprintCounts: {"beaches":0,"buildings":0,"coastlines":1,"pois":1,"roads":2,"sea":0,"transit":0,"zones":1}
- overlayDrift: {"ok":true,"epsPx":0.05,"maxDriftPx":0}
- parity decision: PASS (tracked fields match baseline)

## Carry-forward
- P0: None.
- P1: Phase 10b_1 should replace Phase 10b `phase_end_commit` and `packet_commit` placeholders in `REFACTOR_LOG.md`.
  - locator: `REFACTOR_LOG.md` Phase 10b block
  - acceptance: `phase_end_commit` and `packet_commit` are concrete SHAs.
- P2: None.

## Packet Commit Evidence (pre-commit)
Command:
```bash
git diff --stat --cached
```
Output:
```text
 docs/ai/review_packet_phase10b.md | 543 ++++++++++++++++++++++++++++++++++++++
 1 file changed, 543 insertions(+)
```

Command:
```bash
git diff --check --cached
```
Output:
```text
docs/ai/review_packet_phase10b.md:107: trailing whitespace.
+ 
docs/ai/review_packet_phase10b.md:109: trailing whitespace.
+ 
docs/ai/review_packet_phase10b.md:194: trailing whitespace.
+     
docs/ai/review_packet_phase10b.md:198: trailing whitespace.
+     
docs/ai/review_packet_phase10b.md:199: trailing whitespace.
+     
docs/ai/review_packet_phase10b.md:223: trailing whitespace.
+ 
docs/ai/review_packet_phase10b.md:228: trailing whitespace.
+ 
docs/ai/review_packet_phase10b.md:233: trailing whitespace.
+ 
docs/ai/review_packet_phase10b.md:242: trailing whitespace.
+ 
docs/ai/review_packet_phase10b.md:253: trailing whitespace.
+ 
docs/ai/review_packet_phase10b.md:275: trailing whitespace.
+ 
docs/ai/review_packet_phase10b.md:283: trailing whitespace.
+ 
docs/ai/review_packet_phase10b.md:289: trailing whitespace.
+ 
docs/ai/review_packet_phase10b.md:306: trailing whitespace.
+       
docs/ai/review_packet_phase10b.md:308: trailing whitespace.
+ 
docs/ai/review_packet_phase10b.md:316: trailing whitespace.
+       
docs/ai/review_packet_phase10b.md:327: trailing whitespace.
+ 
docs/ai/review_packet_phase10b.md:331: trailing whitespace.
+ 
```
