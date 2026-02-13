# Review Packet - Phase 9a

## Metadata
- branch: refactor/phase9a-ui-panelmanager-traffic-panel
- base_commit: 83a3967
- phase_end_commit: 3abe2cc
- packet_commit: PENDING (self-reference; see git log)
- focus_paths: city-sim.html, src/ui/PanelManager.js, src/ui/panels/TrafficPanel.js, REFACTOR_LOG.md, docs/ai/review_packet_phase9a.md

## Determinism
```bash
rg=1
```

## Fixed Commands (verbatim)
### git status -sb
```bash
## refactor/phase9a-ui-panelmanager-traffic-panel
?? docs/ai/review_packet_phase9a.md
```

### git rev-parse --short HEAD
```bash
3abe2cc
```

### git log --oneline --decorate -n 20
```bash
3abe2cc (HEAD -> refactor/phase9a-ui-panelmanager-traffic-panel) docs(phase9a): record readiness-gated probe
baa0a41 refactor(phase9a): add PanelManager + TrafficPanel
83a3967 (refactor/phase8_1-log-metadata) docs(ai): add review packet for phase 8_1
fbbd432 docs(phase8_1): fix phase8 log metadata
4810ada (refactor/phase8-traffic-system) docs(ai): add review packet for phase 8
aa5b414 docs(phase8): record readiness-gated probe
069aa0e refactor(phase8): extract TrafficSystem
84bc767 (refactor/phase7e_1-log-metadata) docs(ai): add review packet for phase 7e_1
191a05b docs(phase7e_1): fix phase7e log metadata
03cb9a0 (refactor/phase7e-input-router-hit-test-gestures) docs(ai): add review packet for phase 7e
e857692 docs(phase7e): record readiness-gated probe
2d33023 refactor(phase7e): extract InputRouter + HitTest + Gestures
c920af7 (refactor/phase7d-editor-controller) docs(ai): add review packet for phase 7d
a11428d docs(phase7d): record readiness-gated probe
b4d4665 refactor(phase7d): extract editor controller
446dea1 (refactor/phase7c_1-log-metadata) docs(ai): add review packet for phase 7c_1
a6b296c docs(phase7c_1): fix phase7c log metadata
f0248c1 docs(ai): add review packet for phase 7c_1
a3232c8 docs(phase7c_1): fix phase7c log metadata
ad2702b (refactor/phase7c-editor-snap-engine) docs(ai): add review packet for phase 7c
```

## Audit Evidence (bounded)
### git diff --stat 83a3967...3abe2cc -- city-sim.html src/ui/PanelManager.js src/ui/panels/TrafficPanel.js REFACTOR_LOG.md docs/ai/review_packet_phase9a.md
```bash
 REFACTOR_LOG.md               | 15 +++++++++++
 city-sim.html                 | 63 +++++++++++++++++++++++++++++++++++++------
 src/ui/PanelManager.js        | 18 +++++++++++++
 src/ui/panels/TrafficPanel.js | 54 +++++++++++++++++++++++++++++++++++++
 4 files changed, 142 insertions(+), 8 deletions(-)
```

### git diff --check 83a3967...3abe2cc -- city-sim.html src/ui/PanelManager.js src/ui/panels/TrafficPanel.js REFACTOR_LOG.md docs/ai/review_packet_phase9a.md
```bash

```

### git diff -U15 83a3967...3abe2cc -- city-sim.html src/ui/PanelManager.js src/ui/panels/TrafficPanel.js REFACTOR_LOG.md docs/ai/review_packet_phase9a.md
```diff
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index fe6a1b0..2773ab0 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -229,15 +229,30 @@ Probe check (post-extraction):

 ## Phase 8 – TrafficSystem extraction

 - branch: refactor/phase8-traffic-system
 - base_commit: 84bc767
 - phase_end_commit: aa5b414
 - packet_commit: 4810ada
 - capture_method: codex-mcp (readiness gated)
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_len: 3977
 - json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
 - rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }
+
+## Phase 9a – UI PanelManager + TrafficPanel extraction
+
+- branch: refactor/phase9a-ui-panelmanager-traffic-panel
+- base_commit: 83a3967
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
diff --git a/city-sim.html b/city-sim.html
index ba4d9b8..05784be 100644
--- a/city-sim.html
+++ b/city-sim.html
@@ -809,30 +809,32 @@
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
+    import { createPanelManager } from './src/ui/PanelManager.js';
+    import { createTrafficPanel } from './src/ui/panels/TrafficPanel.js';

     // ============================================
     // CONFIGURATION
     // ============================================


     // ============================================
     // SCENE SETUP
     // ============================================
 const sceneManager = createSceneManager({ container: document.body });
 const renderer = sceneManager.renderer;
 const scene = sceneManager.scene;
 const { orthoCamera, perspCamera, getActiveCamera, setActiveCamera: setSceneActiveCamera } = sceneManager.cameras;
 const controls = sceneManager.controls;
 const { ambientLight, sunLight, hemisphereLight } = sceneManager.lights;
@@ -969,30 +971,32 @@ const editorHistory = {
   undo: [],
   redo: [],
   limit: 80
 };

 let blueprintCityEnabled = false;
 let blueprintZoneMeshes = [];
   let blueprintLabelGroup = null;
   let editorRebuildScheduler = null;
   let editorHistoryManager = null;
   let editorSnapEngine = null;
   let editorController = null;
   let editorHitTest = null;
   let editorInputRouter = null;
   let editorGestures = null;
+  let panelManager = null;
+  let trafficPanel = null;
   let trafficSystem = null;

 const blueprintPreviewSettings = {
   opacity: 1,
   showLabels: false
 };

 const panState = {
   active: false,
   pending: false,
   pointerId: null,
   lastX: 0,
   lastY: 0,
   isTouch: false,
   deferredAction: null,
@@ -5784,38 +5788,31 @@ function validateBlueprint(data) {
       if (poiSelect) {
         poiSelect.disabled = (editorState.tool !== 'poi');
         poiSelect.value = editorState.poiType;
       }
       if (transitSelect) {
         transitSelect.disabled = (editorState.tool !== 'polyline');
         transitSelect.value = editorState.transitType;
       }
       if (junctionToggle) junctionToggle.checked = editorState.junctionInsertMode;
       if (junctionSplitToggle) junctionSplitToggle.checked = editorState.junctionAutoSplit;
       if (debugOffsetsToggle) debugOffsetsToggle.checked = editorState.debugRoadOffsets;
       if (zoomSlider) zoomSlider.value = editorState.mapZoom;
       if (zoomValue) zoomValue.value = editorState.mapZoom;
       if (scaleSlider) scaleSlider.value = editorState.handleScale;
       if (scaleValue) scaleValue.value = editorState.handleScale;
-      const trafficCarSlider = document.getElementById('trafficCarCount');
-      const trafficCarValue = document.getElementById('trafficCarCountValue');
-      const trafficSpeedSlider = document.getElementById('trafficSpeed');
-      const trafficSpeedValue = document.getElementById('trafficSpeedValue');
-      if (trafficCarSlider) trafficCarSlider.value = trafficRuntime.maxCars;
-      if (trafficCarValue) trafficCarValue.value = trafficRuntime.maxCars;
-      if (trafficSpeedSlider) trafficSpeedSlider.value = trafficRuntime.speedScale;
-      if (trafficSpeedValue) trafficSpeedValue.value = trafficRuntime.speedScale;
+      syncTrafficPanel();
       updateEditorHeightControls();
     }

     function updateEditorHeightControls() {
       const heightRange = document.getElementById('editorHeightRange');
       const heightValue = document.getElementById('editorHeightValue');
       const heightApply = document.getElementById('editorHeightApply');
       if (!heightRange || !heightValue || !heightApply) return;
       const selected = getSelectedEntry();
       const entry = selected?.entry || null;
       const isBuilding = selected?.layer === 'buildings';
       const info = entry ? getLegendInfo(entry.typeCode) : null;
       const enabled = !!(isBuilding && info?.buildable);
       heightRange.disabled = !enabled;
       heightValue.disabled = !enabled;
@@ -6211,30 +6208,78 @@ function validateBlueprint(data) {
           editorState,
           editorHistory,
           normalizeBlueprintData,
           clearJunctionMode,
           buildBlueprintFromData,
           rebuildBlueprintCity,
           updateDraftLine,
           updateDraftMarkers,
           updateSelectionMarkers,
           updateEditorStatus
         });
       }
       return editorHistoryManager;
     }

+    function ensurePanelManager() {
+      if (!panelManager) {
+        trafficPanel = createTrafficPanel({
+          actions: {
+            setTrafficMaxCars: (value) => {
+              trafficRuntime.maxCars = Math.max(0, Math.min(40, Number.parseInt(value, 10) || 0));
+              try {
+                setItem(PERSIST_KEYS.trafficMaxCars, trafficRuntime.maxCars);
+              } catch (e) {
+                // ignore persistence errors
+              }
+              rebuildBlueprintTraffic();
+            },
+            setTrafficSpeedScale: (value) => {
+              trafficRuntime.speedScale = Math.max(0.2, Math.min(3, Number.parseFloat(value) || 1));
+              try {
+                setItem(PERSIST_KEYS.trafficSpeedScale, trafficRuntime.speedScale);
+              } catch (e) {
+                // ignore persistence errors
+              }
+            }
+          },
+          state: {
+            traffic: {
+              maxCars: trafficRuntime.maxCars,
+              speedScale: trafficRuntime.speedScale
+            }
+          }
+        });
+        panelManager = createPanelManager({ panels: [trafficPanel] });
+      }
+      return panelManager;
+    }
+
+    function initTrafficPanel() {
+      ensurePanelManager().initAll();
+      syncTrafficPanel();
+    }
+
+    function syncTrafficPanel() {
+      ensurePanelManager().syncAll({
+        traffic: {
+          maxCars: trafficRuntime.maxCars,
+          speedScale: trafficRuntime.speedScale
+        }
+      });
+    }
+
     function ensureEditorController() {
       if (!editorController) {
         editorController = createEditorController({
           editorState,
           trafficRuntime,
           PERSIST_KEYS,
           getItem,
           setItem,
           getBlueprintData: () => blueprintData,
           setBlueprintData: (next) => { blueprintData = next; },
           blueprintModel,
           normalizeBlueprintData,
           pushEditorHistory,
           snapshotEditorState,
           buildBlueprintFromData,
@@ -6243,30 +6288,32 @@ function validateBlueprint(data) {
           updateEditorStatus,
           ensureEditorGroups,
           getEditorGroup: () => editorGroup,
           getViewMode: () => viewMode,
           updateEditorUIState,
           updateDraftLine,
           updateDraftMarkers,
           updateSelectionMarkers,
           clearJunctionMode,
           getSelectedEntry,
           getLegendInfo,
           hideEditorLines,
           setBlueprintStatus,
           applyEditorZoom,
           applyHandleScale,
+          initTrafficPanel,
+          syncTrafficPanel,
           deleteSelection,
           setCityLayerVisibility,
           undoEditor,
           redoEditor
         });
       }
       return editorController;
     }

     function ensureEditorInputRouter() {
       if (!editorInputRouter) {
         editorInputRouter = createEditorInputRouter({
           renderer,
           editorActive,
           getActiveCamera: () => activeCamera,
diff --git a/src/ui/PanelManager.js b/src/ui/PanelManager.js
new file mode 100644
index 0000000..a02cadf
--- /dev/null
+++ b/src/ui/PanelManager.js
@@ -0,0 +1,18 @@
+export function createPanelManager({ panels = [] } = {}) {
+  let initialized = false;
+
+  function initAll() {
+    if (initialized) return;
+    panels.forEach((panel) => panel?.init?.());
+    initialized = true;
+  }
+
+  function syncAll(state) {
+    panels.forEach((panel) => panel?.sync?.(state));
+  }
+
+  return {
+    initAll,
+    syncAll
+  };
+}
diff --git a/src/ui/panels/TrafficPanel.js b/src/ui/panels/TrafficPanel.js
new file mode 100644
index 0000000..a6caaec
--- /dev/null
+++ b/src/ui/panels/TrafficPanel.js
@@ -0,0 +1,54 @@
+export function createTrafficPanel({ doc = document, actions = {}, state = {} } = {}) {
+  let refs = null;
+  let panelState = {
+    maxCars: 12,
+    speedScale: 1
+  };
+
+  function getRefs() {
+    if (refs) return refs;
+    refs = {
+      carSlider: doc.getElementById('trafficCarCount'),
+      carValue: doc.getElementById('trafficCarCountValue'),
+      speedSlider: doc.getElementById('trafficSpeed'),
+      speedValue: doc.getElementById('trafficSpeedValue')
+    };
+    return refs;
+  }
+
+  function bindPair(sliderEl, inputEl, onChange) {
+    if (!sliderEl || !inputEl || typeof onChange !== 'function') return;
+    const apply = (value) => {
+      sliderEl.value = value;
+      inputEl.value = value;
+      onChange(value);
+    };
+    sliderEl.addEventListener('input', (e) => apply(e.target.value));
+    inputEl.addEventListener('input', (e) => apply(e.target.value));
+  }
+
+  function sync(nextState = state) {
+    const trafficState = nextState?.traffic || nextState || {};
+    panelState = {
+      ...panelState,
+      ...trafficState
+    };
+    const { carSlider, carValue, speedSlider, speedValue } = getRefs();
+    if (carSlider) carSlider.value = panelState.maxCars;
+    if (carValue) carValue.value = panelState.maxCars;
+    if (speedSlider) speedSlider.value = panelState.speedScale;
+    if (speedValue) speedValue.value = panelState.speedScale;
+  }
+
+  function init() {
+    const { carSlider, carValue, speedSlider, speedValue } = getRefs();
+    bindPair(carSlider, carValue, actions.setTrafficMaxCars);
+    bindPair(speedSlider, speedValue, actions.setTrafficSpeedScale);
+    sync(state);
+  }
+
+  return {
+    init,
+    sync
+  };
+}
```

## Pinned Module Contents
### git show 3abe2cc:src/ui/PanelManager.js
```js
export function createPanelManager({ panels = [] } = {}) {
  let initialized = false;

  function initAll() {
    if (initialized) return;
    panels.forEach((panel) => panel?.init?.());
    initialized = true;
  }

  function syncAll(state) {
    panels.forEach((panel) => panel?.sync?.(state));
  }

  return {
    initAll,
    syncAll
  };
}
```

### git show 3abe2cc:src/ui/panels/TrafficPanel.js
```js
export function createTrafficPanel({ doc = document, actions = {}, state = {} } = {}) {
  let refs = null;
  let panelState = {
    maxCars: 12,
    speedScale: 1
  };

  function getRefs() {
    if (refs) return refs;
    refs = {
      carSlider: doc.getElementById('trafficCarCount'),
      carValue: doc.getElementById('trafficCarCountValue'),
      speedSlider: doc.getElementById('trafficSpeed'),
      speedValue: doc.getElementById('trafficSpeedValue')
    };
    return refs;
  }

  function bindPair(sliderEl, inputEl, onChange) {
    if (!sliderEl || !inputEl || typeof onChange !== 'function') return;
    const apply = (value) => {
      sliderEl.value = value;
      inputEl.value = value;
      onChange(value);
    };
    sliderEl.addEventListener('input', (e) => apply(e.target.value));
    inputEl.addEventListener('input', (e) => apply(e.target.value));
  }

  function sync(nextState = state) {
    const trafficState = nextState?.traffic || nextState || {};
    panelState = {
      ...panelState,
      ...trafficState
    };
    const { carSlider, carValue, speedSlider, speedValue } = getRefs();
    if (carSlider) carSlider.value = panelState.maxCars;
    if (carValue) carValue.value = panelState.maxCars;
    if (speedSlider) speedSlider.value = panelState.speedScale;
    if (speedValue) speedValue.value = panelState.speedScale;
  }

  function init() {
    const { carSlider, carValue, speedSlider, speedValue } = getRefs();
    bindPair(carSlider, carValue, actions.setTrafficMaxCars);
    bindPair(speedSlider, speedValue, actions.setTrafficSpeedScale);
    sync(state);
  }

  return {
    init,
    sync
  };
}
```

## Probe Gate Checks
### grep -nF "refactorProbe" city-sim.html
```bash
1095:    const probeEnabled = new URLSearchParams(location.search).has('refactorProbe');
1149:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

### grep -nF "import('./tools/refactorProbe.js')" city-sim.html || grep -nF 'import("./tools/refactorProbe.js")' city-sim.html
```bash
1149:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

## Probe Summary
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- REFACTOR_PROBE_LEN: 3977
- REFACTOR_PROBE_SHA256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
- parity decision: PASS (tracked parity fields unchanged vs baseline; SHA allowed to vary per v7_rev4 policy)

## Carry-forward
- P0: None.
- P1: REFACTOR_LOG phase 9a metadata still has `phase_end_commit: PENDING` and `packet_commit: PENDING`; fill concrete SHAs in a docs-only follow-up.
  - locator: REFACTOR_LOG.md (Phase 9a block)
  - acceptance: replace both PENDING values with actual SHAs.
- P2: Expand PanelManager beyond traffic-only in subsequent Phase 9 slices.
  - locator: src/ui/PanelManager.js
  - acceptance: at least one additional panel integrated through init/sync API.

## Packet Commit Evidence (pre-commit)
### git diff --stat --cached
```bash
 docs/ai/review_packet_phase9a.md | 531 +++++++++++++++++++++++++++++++++++++++
 1 file changed, 531 insertions(+)
```

### git diff --check --cached
```bash
docs/ai/review_packet_phase9a.md:73: trailing whitespace.
+
docs/ai/review_packet_phase9a.md:75: trailing whitespace.
+
docs/ai/review_packet_phase9a.md:125: trailing whitespace.
+
docs/ai/review_packet_phase9a.md:129: trailing whitespace.
+
docs/ai/review_packet_phase9a.md:130: trailing whitespace.
+
docs/ai/review_packet_phase9a.md:145: trailing whitespace.
+
docs/ai/review_packet_phase9a.md:159: trailing whitespace.
+
docs/ai/review_packet_phase9a.md:164: trailing whitespace.
+
docs/ai/review_packet_phase9a.md:200: trailing whitespace.
+
docs/ai/review_packet_phase9a.md:228: trailing whitespace.
+
docs/ai/review_packet_phase9a.md:318: trailing whitespace.
+
```
