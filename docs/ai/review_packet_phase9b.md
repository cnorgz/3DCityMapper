# Review Packet - Phase 9b

## Metadata
- branch: refactor/phase9b-ui-eventbus-strict
- base_commit: 3982699
- phase_end_commit: ee3b220
- packet_commit: PENDING (self-reference; see git log)
- focus_paths: city-sim.html, src/ui/EventBus.js, src/ui/panels/OverlayPanel.js, REFACTOR_LOG.md, docs/ai/review_packet_phase9b.md

## Determinism
```bash
rg=1
```

## Fixed Commands (verbatim)
### git status -sb
```bash
## refactor/phase9b-ui-eventbus-strict
```

### git rev-parse --short HEAD
```bash
ee3b220
```

### git log --oneline --decorate -n 20
```bash
ee3b220 (HEAD -> refactor/phase9b-ui-eventbus-strict) docs(phase9b): record readiness-gated probe
d1d0478 refactor(phase9b): add UI EventBus strict mode + traffic routed
3982699 (refactor/phase9a-ui-panelmanager-traffic-panel) docs(ai): add review packet for phase 9a
3abe2cc docs(phase9a): record readiness-gated probe
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
```

## Audit Evidence (bounded)
### git diff --stat 3982699...ee3b220 -- city-sim.html src/ui/EventBus.js src/ui/panels/OverlayPanel.js REFACTOR_LOG.md docs/ai/review_packet_phase9b.md
```bash
 REFACTOR_LOG.md               | 16 +++++++++-
 city-sim.html                 | 70 +++++++++++++++++++++++++++++++------------
 src/ui/EventBus.js            | 35 ++++++++++++++++++++++
 src/ui/panels/OverlayPanel.js | 30 ++++++++++++++++++++
 4 files changed, 131 insertions(+), 20 deletions(-)
```

### git diff --check 3982699...ee3b220 -- city-sim.html src/ui/EventBus.js src/ui/panels/OverlayPanel.js REFACTOR_LOG.md docs/ai/review_packet_phase9b.md
```bash
(no output)
```

### git diff -U15 3982699...ee3b220 -- city-sim.html src/ui/EventBus.js src/ui/panels/OverlayPanel.js REFACTOR_LOG.md docs/ai/review_packet_phase9b.md
```diff
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 2773ab0..0b8dd0d 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -234,25 +234,39 @@ Probe check (post-extraction):
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

 ## Phase 9a – UI PanelManager + TrafficPanel extraction

 - branch: refactor/phase9a-ui-panelmanager-traffic-panel
 - base_commit: 83a3967
+- phase_end_commit: 3abe2cc
+- packet_commit: 3982699
+- capture_method: codex-mcp (readiness gated)
+- url: http://localhost:8000/city-sim.html?refactorProbe=1
+- json_len: 3977
+- json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
+- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
+- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
+- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
+- rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }
+
+## Phase 9b – UI EventBus strict mode + traffic routed
+
+- branch: refactor/phase9b-ui-eventbus-strict
+- base_commit: 3982699
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: codex-mcp (readiness gated)
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_len: 3977
 - json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
-- rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }
diff --git a/city-sim.html b/city-sim.html
index 05784be..aee9c18 100644
--- a/city-sim.html
+++ b/city-sim.html
@@ -810,31 +810,33 @@
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
+    import { createEventBus } from './src/ui/EventBus.js';
     import { createTrafficPanel } from './src/ui/panels/TrafficPanel.js';
+    import { createOverlayPanel } from './src/ui/panels/OverlayPanel.js';
@@ -972,31 +974,33 @@ const editorHistory = {
   redo: [],
   limit: 80
 };
@@
   let editorGestures = null;
   let panelManager = null;
+  let uiEventBus = null;
   let trafficPanel = null;
+  let overlayPanel = null;
   let trafficSystem = null;
@@
-    const probeEnabled = new URLSearchParams(location.search).has('refactorProbe');
+    const urlSearchParams = new URLSearchParams(location.search);
+    const probeEnabled = urlSearchParams.has('refactorProbe');
+
+    function isUiStrictMode() {
+      if (urlSearchParams.has('dev') || urlSearchParams.has('uiStrict')) return true;
+      try {
+        return localStorage.getItem('3dcm_ui_strict') === '1';
+      } catch (e) {
+        return false;
+      }
+    }
@@
     function ensurePanelManager() {
       if (!panelManager) {
+        if (!uiEventBus) {
+          uiEventBus = createEventBus({
+            strict: isUiStrictMode(),
+            allowed: ['traffic/setMaxCars', 'traffic/setSpeedScale']
+          });
+          uiEventBus.on('traffic/setMaxCars', (value) => {
+            trafficRuntime.maxCars = Math.max(0, Math.min(40, Number.parseInt(value, 10) || 0));
+            try {
+              setItem(PERSIST_KEYS.trafficMaxCars, trafficRuntime.maxCars);
+            } catch (e) {
+              // ignore persistence errors
+            }
+            rebuildBlueprintTraffic();
+          });
+          uiEventBus.on('traffic/setSpeedScale', (value) => {
+            trafficRuntime.speedScale = Math.max(0.2, Math.min(3, Number.parseFloat(value) || 1));
+            try {
+              setItem(PERSIST_KEYS.trafficSpeedScale, trafficRuntime.speedScale);
+            } catch (e) {
+              // ignore persistence errors
+            }
+          });
+        }
         trafficPanel = createTrafficPanel({
           actions: {
-            setTrafficMaxCars: (value) => {
-              trafficRuntime.maxCars = Math.max(0, Math.min(40, Number.parseInt(value, 10) || 0));
-              try {
-                setItem(PERSIST_KEYS.trafficMaxCars, trafficRuntime.maxCars);
-              } catch (e) {
-                // ignore persistence errors
-              }
-              rebuildBlueprintTraffic();
-            },
-            setTrafficSpeedScale: (value) => {
-              trafficRuntime.speedScale = Math.max(0.2, Math.min(3, Number.parseFloat(value) || 1));
-              try {
-                setItem(PERSIST_KEYS.trafficSpeedScale, trafficRuntime.speedScale);
-              } catch (e) {
-                // ignore persistence errors
-              }
-            }
+            setTrafficMaxCars: (value) => uiEventBus.emit('traffic/setMaxCars', value),
+            setTrafficSpeedScale: (value) => uiEventBus.emit('traffic/setSpeedScale', value)
           },
@@
-        panelManager = createPanelManager({ panels: [trafficPanel] });
+        overlayPanel = createOverlayPanel({
+          state: {
+            overlay: {
+              opacity: overlaySettings?.opacity ?? OVERLAY_DEFAULTS.opacity
+            }
+          }
+        });
+        panelManager = createPanelManager({ panels: [trafficPanel, overlayPanel] });
       }
       return panelManager;
     }
@@
     function syncTrafficPanel() {
       ensurePanelManager().syncAll({
         traffic: {
           maxCars: trafficRuntime.maxCars,
           speedScale: trafficRuntime.speedScale
+        },
+        overlay: {
+          opacity: overlaySettings?.opacity ?? OVERLAY_DEFAULTS.opacity
         }
       });
     }
diff --git a/src/ui/EventBus.js b/src/ui/EventBus.js
new file mode 100644
index 0000000..0c89137
--- /dev/null
+++ b/src/ui/EventBus.js
@@ -0,0 +1,35 @@
+export function createEventBus({ strict = false, allowed = [] } = {}) {
+  const handlers = new Map();
+  const allowedSet = new Set(allowed);
+
+  function on(name, handler) {
+    if (!handlers.has(name)) handlers.set(name, []);
+    const list = handlers.get(name);
+    list.push(handler);
+    return () => {
+      const idx = list.indexOf(handler);
+      if (idx >= 0) list.splice(idx, 1);
+    };
+  }
+
+  function emit(name, payload) {
+    if (!allowedSet.has(name)) {
+      const message = `[UI EventBus] Unknown event: ${name}`;
+      if (strict) {
+        console.error(message);
+      } else {
+        console.warn(message);
+      }
+      return false;
+    }
+    const list = handlers.get(name);
+    if (!list || list.length === 0) return false;
+    list.forEach((handler) => handler(payload));
+    return true;
+  }
+
+  return {
+    on,
+    emit
+  };
+}
diff --git a/src/ui/panels/OverlayPanel.js b/src/ui/panels/OverlayPanel.js
new file mode 100644
index 0000000..957397d
--- /dev/null
+++ b/src/ui/panels/OverlayPanel.js
@@ -0,0 +1,30 @@
+export function createOverlayPanel({ doc = document, state = {} } = {}) {
+  let refs = null;
+
+  function getRefs() {
+    if (refs) return refs;
+    refs = {
+      opacitySlider: doc.getElementById('overlayOpacity'),
+      opacityValue: doc.getElementById('overlayOpacityValue')
+    };
+    return refs;
+  }
+
+  function sync(nextState = state) {
+    const overlayState = nextState?.overlay || nextState || {};
+    const opacity = Number.parseFloat(overlayState.opacity);
+    if (!Number.isFinite(opacity)) return;
+    const { opacitySlider, opacityValue } = getRefs();
+    if (opacitySlider) opacitySlider.value = opacity;
+    if (opacityValue) opacityValue.value = opacity;
+  }
+
+  function init() {
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
### git show ee3b220:src/ui/EventBus.js
```js
export function createEventBus({ strict = false, allowed = [] } = {}) {
  const handlers = new Map();
  const allowedSet = new Set(allowed);

  function on(name, handler) {
    if (!handlers.has(name)) handlers.set(name, []);
    const list = handlers.get(name);
    list.push(handler);
    return () => {
      const idx = list.indexOf(handler);
      if (idx >= 0) list.splice(idx, 1);
    };
  }

  function emit(name, payload) {
    if (!allowedSet.has(name)) {
      const message = `[UI EventBus] Unknown event: ${name}`;
      if (strict) {
        console.error(message);
      } else {
        console.warn(message);
      }
      return false;
    }
    const list = handlers.get(name);
    if (!list || list.length === 0) return false;
    list.forEach((handler) => handler(payload));
    return true;
  }

  return {
    on,
    emit
  };
}
```

### git show ee3b220:src/ui/panels/OverlayPanel.js
```js
export function createOverlayPanel({ doc = document, state = {} } = {}) {
  let refs = null;

  function getRefs() {
    if (refs) return refs;
    refs = {
      opacitySlider: doc.getElementById('overlayOpacity'),
      opacityValue: doc.getElementById('overlayOpacityValue')
    };
    return refs;
  }

  function sync(nextState = state) {
    const overlayState = nextState?.overlay || nextState || {};
    const opacity = Number.parseFloat(overlayState.opacity);
    if (!Number.isFinite(opacity)) return;
    const { opacitySlider, opacityValue } = getRefs();
    if (opacitySlider) opacitySlider.value = opacity;
    if (opacityValue) opacityValue.value = opacity;
  }

  function init() {
    sync(state);
  }

  return {
    init,
    sync
  };
}
```

## Probe Summary
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- REFACTOR_PROBE_LEN: 3977
- REFACTOR_PROBE_SHA256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
- parity decision: PASS (tracked counts + drift match baseline)

## Carry-forward
- P0: None.
- P1: `REFACTOR_LOG.md` Phase 9b `phase_end_commit` and `packet_commit` are still `PENDING` until a post-phase metadata hygiene pass sets concrete SHAs.
  - locator: `REFACTOR_LOG.md`
  - acceptance: replace both with actual hashes after packet commit lands.
- P2: Consider routing additional panels through `PanelManager` in the next UI slices to keep city-sim wiring thin.

## Packet Commit Evidence (pre-commit)
### git diff --stat --cached
```bash
 docs/ai/review_packet_phase9b.md | 410 +++++++++++++++++++++++++++++++++++++++
 1 file changed, 410 insertions(+)
```

### git diff --check --cached
```bash
(no output)
```
