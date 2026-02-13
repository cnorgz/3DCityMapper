# Review Packet — Phase 9e (UI DevMode strict EventBus gating)

## Metadata
- branch: `refactor/phase9e-ui-dev-mode-switch`
- base_commit: `324f0b6`
- phase_end_commit: `e07ae40`
- packet_commit: `PENDING` (self-reference; see git log)
- focus_paths: `city-sim.html src/ui/DevMode.js REFACTOR_LOG.md docs/ai`

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
## refactor/phase9e-ui-dev-mode-switch
```

Command:
```bash
git rev-parse --short HEAD
```
Output:
```text
e07ae40
```

Command:
```bash
git log --oneline --decorate -n 20
```
Output:
```text
e07ae40 (HEAD -> refactor/phase9e-ui-dev-mode-switch) docs(phase9e): record readiness-gated probe
6f60adb refactor(phase9e): add dev-mode switch for UI strict EventBus
324f0b6 (refactor/phase9d_1-log-metadata) docs(ai): add review packet for phase 9d_1
bacf595 docs(phase9d_1): fix phase9d log metadata
37df0dc (refactor/phase9d-ui-blueprint-preview-dedup) docs(ai): add review packet for phase 9d
ae12eaa docs(phase9d): record readiness-gated probe
d809461 refactor(phase9d): dedupe blueprint preview control wiring
caf72fc (refactor/phase9c_1-log-metadata) docs(ai): add review packet for phase 9c_1
45cf14b docs(phase9c_1): fix phase9c log metadata
1f1578d (refactor/phase9c-ui-blueprint-preview-panel) docs(ai): add review packet for phase 9c
bdd2d4f docs(phase9c): record readiness-gated probe
9de6354 refactor(phase9c): extract BlueprintPreviewPanel and integrate via PanelManager
e415781 (refactor/phase9b_1-log-metadata) docs(ai): add review packet for phase 9b_1
d399ec7 docs(phase9b_1): fix phase9a/9b log metadata
245035e (refactor/phase9b-ui-eventbus-strict) docs(ai): add review packet for phase 9b
ee3b220 docs(phase9b): record readiness-gated probe
d1d0478 refactor(phase9b): add UI EventBus strict mode + traffic routed
3982699 (refactor/phase9a-ui-panelmanager-traffic-panel) docs(ai): add review packet for phase 9a
3abe2cc docs(phase9a): record readiness-gated probe
baa0a41 refactor(phase9a): add PanelManager + TrafficPanel
```

## Audit Evidence (`base...phase_end`, bounded to focus_paths)
Command:
```bash
git diff --stat 324f0b6...e07ae40 -- city-sim.html src/ui/DevMode.js REFACTOR_LOG.md docs/ai
```
Output:
```text
 REFACTOR_LOG.md   | 15 +++++++++++++++
 city-sim.html     | 12 ++----------
 src/ui/DevMode.js | 14 ++++++++++++++
 3 files changed, 31 insertions(+), 10 deletions(-)
```

Command:
```bash
git diff --check 324f0b6...e07ae40 -- city-sim.html src/ui/DevMode.js REFACTOR_LOG.md docs/ai
```
Output:
```text
(no output)
```

Command:
```bash
git diff -U15 324f0b6...e07ae40 -- city-sim.html src/ui/DevMode.js REFACTOR_LOG.md docs/ai
```
Output:
```diff
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 9d3d859..6217c77 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -288,15 +288,30 @@ Probe check (post-extraction):

 ## Phase 9d – UI BlueprintPreview wiring dedupe

 - branch: refactor/phase9d-ui-blueprint-preview-dedup
 - base_commit: caf72fc
 - phase_end_commit: ae12eaa
 - packet_commit: 37df0dc
 - capture_method: codex-mcp (readiness gated)
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_len: 3977
 - json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
 - rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }
+
+## Phase 9e – UI DevMode switch + strict EventBus gating
+
+- branch: refactor/phase9e-ui-dev-mode-switch
+- base_commit: 324f0b6
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
index cc7ba48..5d7a759 100644
--- a/city-sim.html
+++ b/city-sim.html
@@ -811,30 +811,31 @@
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
+    import { isDevMode } from './src/ui/DevMode.js';
     import { createTrafficPanel } from './src/ui/panels/TrafficPanel.js';
     import { createOverlayPanel } from './src/ui/panels/OverlayPanel.js';
     import { createBlueprintPreviewPanel } from './src/ui/panels/BlueprintPreviewPanel.js';

     // ============================================
     // CONFIGURATION
     // ============================================


     // ============================================
     // SCENE SETUP
     // ============================================
 const sceneManager = createSceneManager({ container: document.body });
 const renderer = sceneManager.renderer;
 const scene = sceneManager.scene;
@@ -1115,39 +1116,30 @@ function validateBlueprint(data) {

     let activeCamera = orthoCamera;
     let viewMode = 'plan';
     const setActiveCamera = (camera) => {
       activeCamera = camera;
       setSceneActiveCamera(camera);
     };

     // ============================================
 // HELPER FUNCTIONS
     // ============================================

     const urlSearchParams = new URLSearchParams(location.search);
     const probeEnabled = urlSearchParams.has('refactorProbe');

-    function isUiStrictMode() {
-      if (urlSearchParams.has('dev') || urlSearchParams.has('uiStrict')) return true;
-      try {
-        return localStorage.getItem('3dcm_ui_strict') === '1';
-      } catch (e) {
-        return false;
-      }
-    }
-
     function exposeDebugState() {
       if (window.__CITYSIM__) return;
       window.__CITYSIM__ = {
         get blueprintData() { return blueprintData; },
         get overlay() {
           return {
             group: mapOverlayGroup,
             position: mapOverlayGroup?.position,
             rotationY: mapOverlayGroup?.rotation?.y,
             scale: mapOverlayGroup?.scale
           };
         },
         get editor() { return editorState; }
       };
     }
@@ -6207,31 +6199,31 @@ function validateBlueprint(data) {
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

     function ensurePanelManager() {
       if (!panelManager) {
         if (!uiEventBus) {
           uiEventBus = createEventBus({
-            strict: isUiStrictMode(),
+            strict: isDevMode(),
             allowed: ['traffic/setMaxCars', 'traffic/setSpeedScale', 'blueprintPreview/setOpacity', 'blueprintPreview/setShowLabels']
           });
           uiEventBus.on('traffic/setMaxCars', (value) => {
             trafficRuntime.maxCars = Math.max(0, Math.min(40, Number.parseInt(value, 10) || 0));
             try {
               setItem(PERSIST_KEYS.trafficMaxCars, trafficRuntime.maxCars);
             } catch (e) {
               // ignore persistence errors
             }
             rebuildBlueprintTraffic();
           });
           uiEventBus.on('traffic/setSpeedScale', (value) => {
             trafficRuntime.speedScale = Math.max(0.2, Math.min(3, Number.parseFloat(value) || 1));
             try {
               setItem(PERSIST_KEYS.trafficSpeedScale, trafficRuntime.speedScale);
diff --git a/src/ui/DevMode.js b/src/ui/DevMode.js
new file mode 100644
index 0000000..1d438f4
--- /dev/null
+++ b/src/ui/DevMode.js
@@ -0,0 +1,14 @@
+export function isDevMode({ search = globalThis.location?.search, storage = globalThis.localStorage } = {}) {
+  try {
+    const params = new URLSearchParams(search || '');
+    if (params.get('dev') === '1') return true;
+  } catch (e) {
+    // ignore URL parsing issues
+  }
+
+  try {
+    return storage?.getItem?.('3dcm:dev') === '1';
+  } catch (e) {
+    return false;
+  }
+}
```

## Pinned Module Contents
Command:
```bash
git show e07ae40:src/ui/DevMode.js
```
Output:
```js
export function isDevMode({ search = globalThis.location?.search, storage = globalThis.localStorage } = {}) {
  try {
    const params = new URLSearchParams(search || '');
    if (params.get('dev') === '1') return true;
  } catch (e) {
    // ignore URL parsing issues
  }

  try {
    return storage?.getItem?.('3dcm:dev') === '1';
  } catch (e) {
    return false;
  }
}
```

## Probe Summary
- url: `http://localhost:8000/city-sim.html?refactorProbe=1`
- REFACTOR_PROBE_LEN: `3977`
- REFACTOR_PROBE_SHA256: `ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d`
- sceneCounts: `{ meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }`
- blueprintCounts: `{ beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }`
- overlayDrift: `{ ok: true, epsPx: 0.05, maxDriftPx: 0 }`
- parity decision: `PASS` (tracked counts and drift unchanged)

## Packet Commit Evidence (pre-commit)
Command:
```bash
git diff --stat --cached
```
Output:
```text
 docs/ai/review_packet_phase9e.md | 316 +++++++++++++++++++++++++++++++++++++++
 1 file changed, 316 insertions(+)
```

Command:
```bash
git diff --check --cached
```
Output:
```text
(no output)
```

## Carry-Forward
- P0: None.
- P1: Update `REFACTOR_LOG.md` phase9e `phase_end_commit` and `packet_commit` from `PENDING` in the next docs-only hygiene phase.
- P2: If needed later, keep backward compatibility by optionally supporting legacy key `3dcm_ui_strict` read alongside `3dcm:dev`.
