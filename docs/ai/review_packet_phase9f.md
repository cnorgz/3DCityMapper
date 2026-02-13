# Review Packet — Phase 9f (UI ZoneInfoPanel extraction)

## Metadata
- branch: `refactor/phase9f-ui-zone-info-panel`
- base_commit: `cc9f741`
- phase_end_commit: `2969992`
- packet_commit: `PENDING` (self-reference; see git log)
- focus_paths: `city-sim.html src/ui/panels/ZoneInfoPanel.js REFACTOR_LOG.md docs/ai/review_packet_phase9f.md`

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
## refactor/phase9f-ui-zone-info-panel
```

Command:
```bash
git rev-parse --short HEAD
```
Output:
```text
2969992
```

Command:
```bash
git log --oneline --decorate -n 20
```
Output:
```text
2969992 (HEAD -> refactor/phase9f-ui-zone-info-panel) docs(phase9f): record readiness-gated probe
96910cf refactor(phase9f): extract ZoneInfoPanel
cc9f741 (refactor/phase9e_1-log-metadata) docs(ai): add review packet for phase 9e_1
58ec08d docs(phase9e_1): fix phase9e log metadata
58f38a5 (refactor/phase9e-ui-dev-mode-switch) docs(ai): add review packet for phase 9e
e07ae40 docs(phase9e): record readiness-gated probe
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
```

## Audit Evidence (`base...phase_end`, bounded to focus paths)
Command:
```bash
git diff --stat cc9f741...2969992 -- city-sim.html src/ui/panels/ZoneInfoPanel.js REFACTOR_LOG.md docs/ai/review_packet_phase9f.md
```
Output:
```text
 REFACTOR_LOG.md                | 15 ++++++++++++
 city-sim.html                  | 49 ++++++++++++----------------------
 src/ui/panels/ZoneInfoPanel.js | 60 +++++++++++++++++++++++++++++++++++++++++
 3 files changed, 92 insertions(+), 32 deletions(-)
```

Command:
```bash
git diff --check cc9f741...2969992 -- city-sim.html src/ui/panels/ZoneInfoPanel.js REFACTOR_LOG.md docs/ai/review_packet_phase9f.md
```
Output:
```text
(no output)
```

Command:
```bash
git diff -U15 cc9f741...2969992 -- city-sim.html src/ui/panels/ZoneInfoPanel.js REFACTOR_LOG.md docs/ai/review_packet_phase9f.md
```
Output:
```diff
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 09e88c4..49a4971 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -303,15 +303,30 @@ Probe check (post-extraction):

 ## Phase 9e – UI DevMode switch + strict EventBus gating

 - branch: refactor/phase9e-ui-dev-mode-switch
 - base_commit: 324f0b6
 - phase_end_commit: e07ae40
 - packet_commit: 58f38a5
 - capture_method: codex-mcp (readiness gated)
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_len: 3977
 - json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
 - rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }
+
+## Phase 9f – UI ZoneInfoPanel extraction
+
+- branch: refactor/phase9f-ui-zone-info-panel
+- base_commit: cc9f741
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
index 5d7a759..1a9b3b2 100644
--- a/city-sim.html
+++ b/city-sim.html
@@ -815,30 +815,31 @@
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
     import { createTrafficPanel } from './src/ui/panels/TrafficPanel.js';
     import { createOverlayPanel } from './src/ui/panels/OverlayPanel.js';
     import { createBlueprintPreviewPanel } from './src/ui/panels/BlueprintPreviewPanel.js';
+    import { createZoneInfoPanel } from './src/ui/panels/ZoneInfoPanel.js';

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
@@ -980,30 +981,31 @@ const editorHistory = {
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
   let panelManager = null;
   let uiEventBus = null;
   let trafficPanel = null;
   let overlayPanel = null;
   let blueprintPreviewPanel = null;
+  let zoneInfoPanel = null;
   let trafficSystem = null;

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
@@ -4892,72 +4894,48 @@ function validateBlueprint(data) {
       ctx.fillText('E', cx + r - 10, cy);
       ctx.fillText('W', cx - r + 10, cy);

       // Center dot
       ctx.fillStyle = '#64c8ff';
       ctx.beginPath();
       ctx.arc(cx, cy, 3, 0, Math.PI * 2);
       ctx.fill();
     }

     drawCompass();

     // ============================================
     // RAYCASTING FOR ZONE INFO
     // ============================================
-
-    const raycaster = new THREE.Raycaster();
-    const mouse = new THREE.Vector2();
-
-    function onMouseMove(event) {
-      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
-      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
-
-      raycaster.setFromCamera(mouse, activeCamera);
-      const zonesToTest = blueprintCityEnabled ? blueprintZoneMeshes : zones;
-      const intersects = raycaster.intersectObjects(zonesToTest);
-
-      if (intersects.length > 0) {
-        const zone = intersects[0].object;
-        const data = zone.userData;
-        if (data.label) {
-          const info = getLegendInfo(data.label);
-          document.getElementById('zoneInfo').textContent =
-            `${normalizeTypeCode(data.label)}: ${info.label || data.type}`;
-        }
-      } else {
-        document.getElementById('zoneInfo').textContent = 'Hover over zones for info';
-      }
-    }
-
-    window.addEventListener('mousemove', onMouseMove);
+    const editorRaycaster = new THREE.Raycaster();
+    const placementMouse = new THREE.Vector2();

     // ============================================
     // PLACEMENT DEBUG TOOL
     // ============================================
     const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -1); // y=1 plane (zone level)
     const tmpP = new THREE.Vector3();

     window.addEventListener('pointerdown', (e) => {
       // Only log on left click (button 0) and when holding Shift
       if (e.button !== 0 || !e.shiftKey) return;

-      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
-      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
-      raycaster.setFromCamera(mouse, activeCamera);
+      placementMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
+      placementMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
+      editorRaycaster.setFromCamera(placementMouse, activeCamera);

-      if (!raycaster.ray.intersectPlane(groundPlane, tmpP)) return;
+      if (!editorRaycaster.ray.intersectPlane(groundPlane, tmpP)) return;

       const x = tmpP.x;
       const z = tmpP.z;
       const nx = x / MAP_WIDTH + 0.5;
       const nz = z / MAP_HEIGHT + 0.5;

       const result = {
         world: { x: +x.toFixed(2), z: +z.toFixed(2) },
         normalized: { nx: +nx.toFixed(4), nz: +nz.toFixed(4) }
       };

       if (mapCoordMapper && mapOverlayGroup) {
         const pxCoords = overlayWorldToPx(x, z);
         if (pxCoords) {
           result.overlay = { px: +pxCoords.px.toFixed(1), py: +pxCoords.py.toFixed(1) };
@@ -5610,31 +5588,31 @@ function validateBlueprint(data) {
     function updateEditorStatus(text) {
       const el = document.getElementById('editorStatus');
       if (!el) return;
       el.textContent = text;
     }

     function updateLineResolution(line) {
       if (!line || !line.material || !line.material.resolution) return;
       line.material.resolution.set(window.innerWidth, window.innerHeight);
     }

     function ensureEditorHitTest() {
       if (!editorHitTest) {
         editorHitTest = createEditorHitTest({
           mapOverlayGroupRef: () => mapOverlayGroup,
-          raycaster,
+          raycaster: editorRaycaster,
           THREE,
           Y,
           getActiveCamera: () => activeCamera,
           orthoCamera,
           MAP_WIDTH,
           MAP_HEIGHT,
           getViewportSize: () => ({
             width: window.innerWidth,
             height: window.innerHeight
           })
         });
       }
       return editorHitTest;
     }

@@ -6257,31 +6235,38 @@ function validateBlueprint(data) {
             }
           }
         });
         blueprintPreviewPanel = createBlueprintPreviewPanel({
           actions: {
             setOpacity: (value) => uiEventBus.emit('blueprintPreview/setOpacity', value),
             setShowLabels: (value) => uiEventBus.emit('blueprintPreview/setShowLabels', value)
           },
           state: {
             blueprintPreview: {
               opacity: blueprintPreviewSettings.opacity,
               showLabels: blueprintPreviewSettings.showLabels
             }
           }
         });
-        panelManager = createPanelManager({ panels: [trafficPanel, overlayPanel, blueprintPreviewPanel] });
+        zoneInfoPanel = createZoneInfoPanel({
+          three: THREE,
+          getActiveCamera: () => activeCamera,
+          getZonesToTest: () => (blueprintCityEnabled ? blueprintZoneMeshes : zones),
+          getLegendInfo,
+          normalizeTypeCode
+        });
+        panelManager = createPanelManager({ panels: [trafficPanel, overlayPanel, blueprintPreviewPanel, zoneInfoPanel] });
       }
       return panelManager;
     }

     function initTrafficPanel() {
       ensurePanelManager().initAll();
       syncTrafficPanel();
     }

     function syncTrafficPanel() {
       ensurePanelManager().syncAll({
         traffic: {
           maxCars: trafficRuntime.maxCars,
           speedScale: trafficRuntime.speedScale
         },
diff --git a/src/ui/panels/ZoneInfoPanel.js b/src/ui/panels/ZoneInfoPanel.js
new file mode 100644
index 0000000..ca57514
--- /dev/null
+++ b/src/ui/panels/ZoneInfoPanel.js
@@ -0,0 +1,60 @@
+export function createZoneInfoPanel({
+  three,
+  getActiveCamera,
+  getZonesToTest,
+  getLegendInfo,
+  normalizeTypeCode,
+  doc = document
+} = {}) {
+  const raycaster = new three.Raycaster();
+  const mouse = new three.Vector2();
+  const defaultText = 'Hover over zones for info';
+  let initialized = false;
+  let zoneInfoEl = null;
+
+  function onMouseMove(event) {
+    if (!zoneInfoEl) return;
+    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
+    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
+
+    const activeCamera = getActiveCamera?.();
+    if (!activeCamera) {
+      zoneInfoEl.textContent = defaultText;
+      return;
+    }
+
+    raycaster.setFromCamera(mouse, activeCamera);
+    const zonesToTest = getZonesToTest?.() || [];
+    const intersects = raycaster.intersectObjects(zonesToTest);
+
+    if (intersects.length > 0) {
+      const zone = intersects[0].object;
+      const data = zone.userData;
+      if (data.label) {
+        const info = getLegendInfo?.(data.label) || {};
+        zoneInfoEl.textContent = `${normalizeTypeCode?.(data.label) || data.label}: ${info.label || data.type}`;
+      }
+      return;
+    }
+
+    zoneInfoEl.textContent = defaultText;
+  }
+
+  function init() {
+    if (initialized) return;
+    zoneInfoEl = doc.getElementById('zoneInfo');
+    if (!zoneInfoEl) return;
+    zoneInfoEl.textContent = defaultText;
+    window.addEventListener('mousemove', onMouseMove);
+    initialized = true;
+  }
+
+  function sync() {
+    // no-op for now; hover state is event-driven
+  }
+
+  return {
+    init,
+    sync
+  };
+}
```

## Pinned Module Contents
Command:
```bash
git show 2969992:src/ui/panels/ZoneInfoPanel.js
```
Output:
```js
export function createZoneInfoPanel({
  three,
  getActiveCamera,
  getZonesToTest,
  getLegendInfo,
  normalizeTypeCode,
  doc = document
} = {}) {
  const raycaster = new three.Raycaster();
  const mouse = new three.Vector2();
  const defaultText = 'Hover over zones for info';
  let initialized = false;
  let zoneInfoEl = null;

  function onMouseMove(event) {
    if (!zoneInfoEl) return;
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const activeCamera = getActiveCamera?.();
    if (!activeCamera) {
      zoneInfoEl.textContent = defaultText;
      return;
    }

    raycaster.setFromCamera(mouse, activeCamera);
    const zonesToTest = getZonesToTest?.() || [];
    const intersects = raycaster.intersectObjects(zonesToTest);

    if (intersects.length > 0) {
      const zone = intersects[0].object;
      const data = zone.userData;
      if (data.label) {
        const info = getLegendInfo?.(data.label) || {};
        zoneInfoEl.textContent = `${normalizeTypeCode?.(data.label) || data.label}: ${info.label || data.type}`;
      }
      return;
    }

    zoneInfoEl.textContent = defaultText;
  }

  function init() {
    if (initialized) return;
    zoneInfoEl = doc.getElementById('zoneInfo');
    if (!zoneInfoEl) return;
    zoneInfoEl.textContent = defaultText;
    window.addEventListener('mousemove', onMouseMove);
    initialized = true;
  }

  function sync() {
    // no-op for now; hover state is event-driven
  }

  return {
    init,
    sync
  };
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
 docs/ai/review_packet_phase9f.md | 518 +++++++++++++++++++++++++++++++++++++++
 1 file changed, 518 insertions(+)
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
- P1: Replace Phase 9f `phase_end_commit` and `packet_commit` from `PENDING` in `REFACTOR_LOG.md` in the next docs-only hygiene phase.
- P2: If needed later, this panel could move to pointer events for touch parity, but current extraction keeps existing mousemove semantics exactly.
