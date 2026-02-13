# Review Packet: Phase 9c (UI BlueprintPreviewPanel)

## Metadata
- Branch: `refactor/phase9c-ui-blueprint-preview-panel`
- base_commit: `e415781`
- phase_end_commit: `bdd2d4f`
- packet_commit: `PENDING` (self-reference)
- focus_paths: `city-sim.html src/ui/panels/BlueprintPreviewPanel.js REFACTOR_LOG.md docs/ai`

## Determinism
```bash
rg=1
```

## Fixed Command Evidence

```bash
$ git status -sb
## refactor/phase9c-ui-blueprint-preview-panel
```

```bash
$ git rev-parse --short HEAD
bdd2d4f
```

```bash
$ git log --oneline --decorate -n 20
bdd2d4f (HEAD -> refactor/phase9c-ui-blueprint-preview-panel) docs(phase9c): record readiness-gated probe
9de6354 refactor(phase9c): extract BlueprintPreviewPanel and integrate via PanelManager
e415781 (refactor/phase9b_1-log-metadata) docs(ai): add review packet for phase 9b_1
d399ec7 docs(phase9b_1): fix phase9a/9b log metadata
245035e (refactor/phase9b-ui-eventbus-strict) docs(ai): add review packet for phase 9b
ee3b220 docs(phase9b): record readiness-gated probe
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
```

## Audit Evidence (`e415781...bdd2d4f`)

```bash
$ git diff --stat e415781...bdd2d4f -- city-sim.html src/ui/panels/BlueprintPreviewPanel.js REFACTOR_LOG.md docs/ai
 REFACTOR_LOG.md                        | 15 ++++++
 city-sim.html                          | 90 ++++++++++++++++++++--------------
 src/ui/panels/BlueprintPreviewPanel.js | 56 +++++++++++++++++++++
 3 files changed, 123 insertions(+), 38 deletions(-)
```

```bash
$ git diff --check e415781...bdd2d4f -- city-sim.html src/ui/panels/BlueprintPreviewPanel.js REFACTOR_LOG.md docs/ai
(no output)
```

```bash
$ git diff -U15 e415781...bdd2d4f -- city-sim.html src/ui/panels/BlueprintPreviewPanel.js REFACTOR_LOG.md docs/ai
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 1a02888..4b372c1 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -258,15 +258,30 @@ Probe check (post-extraction):
 - rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }

 ## Phase 9b – UI EventBus strict mode + traffic routed

 - branch: refactor/phase9b-ui-eventbus-strict
 - base_commit: 3982699
 - phase_end_commit: ee3b220
 - packet_commit: 245035e
 - capture_method: codex-mcp (readiness gated)
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_len: 3977
 - json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
+
+## Phase 9c – UI BlueprintPreviewPanel extraction
+
+- branch: refactor/phase9c-ui-blueprint-preview-panel
+- base_commit: e415781
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
index aee9c18..b31db7e 100644
--- a/city-sim.html
+++ b/city-sim.html
@@ -813,30 +813,31 @@
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
     import { createTrafficPanel } from './src/ui/panels/TrafficPanel.js';
     import { createOverlayPanel } from './src/ui/panels/OverlayPanel.js';
+    import { createBlueprintPreviewPanel } from './src/ui/panels/BlueprintPreviewPanel.js';
@@ -977,37 +978,64 @@ const editorHistory = {
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
+  let blueprintPreviewPanel = null;
@@ -5340,53 +5368,30 @@ function validateBlueprint(data) {
       const applyPreviewSettings = () => {
         if (opacitySlider) opacitySlider.value = blueprintPreviewSettings.opacity;
         if (opacityInput) opacityInput.value = blueprintPreviewSettings.opacity;
         if (labelsToggle) labelsToggle.checked = blueprintPreviewSettings.showLabels;
       };
@@ -5501,43 +5506,30 @@ function validateBlueprint(data) {
       if (useCityToggle) {
         useCityToggle.checked = blueprintCityEnabled;
         useCityToggle.addEventListener('change', (e) => {
           setBlueprintCityEnabled(!!e.target.checked);
         });
       }
@@ -6227,87 +6219,109 @@ function validateBlueprint(data) {
     function ensurePanelManager() {
       if (!panelManager) {
         if (!uiEventBus) {
           uiEventBus = createEventBus({
             strict: isUiStrictMode(),
+            allowed: ['traffic/setMaxCars', 'traffic/setSpeedScale', 'blueprintPreview/setOpacity', 'blueprintPreview/setShowLabels']
           });
@@ -6227,87 +6219,109 @@ function validateBlueprint(data) {
+          uiEventBus.on('blueprintPreview/setOpacity', (value) => {
+            setBlueprintPreviewOpacity(value);
+          });
+          uiEventBus.on('blueprintPreview/setShowLabels', (value) => {
+            setBlueprintPreviewLabels(value);
+          });
@@ -6227,87 +6219,109 @@ function validateBlueprint(data) {
+        blueprintPreviewPanel = createBlueprintPreviewPanel({
+          actions: {
+            setOpacity: (value) => uiEventBus.emit('blueprintPreview/setOpacity', value),
+            setShowLabels: (value) => uiEventBus.emit('blueprintPreview/setShowLabels', value)
+          },
+          state: {
+            blueprintPreview: {
+              opacity: blueprintPreviewSettings.opacity,
+              showLabels: blueprintPreviewSettings.showLabels
+            }
+          }
+        });
+        panelManager = createPanelManager({ panels: [trafficPanel, overlayPanel, blueprintPreviewPanel] });
@@ -6227,87 +6219,109 @@ function validateBlueprint(data) {
     function syncTrafficPanel() {
       ensurePanelManager().syncAll({
         traffic: {
           maxCars: trafficRuntime.maxCars,
           speedScale: trafficRuntime.speedScale
         },
         overlay: {
           opacity: overlaySettings?.opacity ?? OVERLAY_DEFAULTS.opacity
+        },
+        blueprintPreview: {
+          opacity: blueprintPreviewSettings.opacity,
+          showLabels: blueprintPreviewSettings.showLabels
         }
       });
     }
diff --git a/src/ui/panels/BlueprintPreviewPanel.js b/src/ui/panels/BlueprintPreviewPanel.js
new file mode 100644
index 0000000..ade5d77
--- /dev/null
+++ b/src/ui/panels/BlueprintPreviewPanel.js
@@ -0,0 +1,56 @@
+export function createBlueprintPreviewPanel({ doc = document, state = {}, actions = {} } = {}) {
+  let refs = null;
+  let panelState = {
+    opacity: 1,
+    showLabels: false
+  };
+  function getRefs() {
+    if (refs) return refs;
+    refs = {
+      opacitySlider: doc.getElementById('blueprintOpacity'),
+      opacityValue: doc.getElementById('blueprintOpacityValue'),
+      showLabels: doc.getElementById('blueprintLabels')
+    };
+    return refs;
+  }
+  function sync(nextState = state) {
+    const previewState = nextState?.blueprintPreview || nextState || {};
+    panelState = {
+      ...panelState,
+      ...previewState
+    };
+    const { opacitySlider, opacityValue, showLabels } = getRefs();
+    if (opacitySlider) opacitySlider.value = panelState.opacity;
+    if (opacityValue) opacityValue.value = panelState.opacity;
+    if (showLabels) showLabels.checked = !!panelState.showLabels;
+  }
+  function bindOpacity(sliderEl, inputEl) {
+    if (!sliderEl || !inputEl || typeof actions.setOpacity !== 'function') return;
+    const apply = (value) => {
+      sliderEl.value = value;
+      inputEl.value = value;
+      actions.setOpacity(value);
+    };
+    sliderEl.addEventListener('input', (e) => apply(e.target.value));
+    inputEl.addEventListener('input', (e) => apply(e.target.value));
+  }
+  function init() {
+    const { opacitySlider, opacityValue, showLabels } = getRefs();
+    bindOpacity(opacitySlider, opacityValue);
+    if (showLabels && typeof actions.setShowLabels === 'function') {
+      showLabels.addEventListener('change', (e) => {
+        actions.setShowLabels(!!e.target.checked);
+      });
+    }
+    sync(state);
+  }
+  return {
+    init,
+    sync
+  };
+}
```

## Pinned Module Contents (`bdd2d4f`)

```bash
$ git show bdd2d4f:src/ui/panels/BlueprintPreviewPanel.js
export function createBlueprintPreviewPanel({ doc = document, state = {}, actions = {} } = {}) {
  let refs = null;
  let panelState = {
    opacity: 1,
    showLabels: false
  };

  function getRefs() {
    if (refs) return refs;
    refs = {
      opacitySlider: doc.getElementById('blueprintOpacity'),
      opacityValue: doc.getElementById('blueprintOpacityValue'),
      showLabels: doc.getElementById('blueprintLabels')
    };
    return refs;
  }

  function sync(nextState = state) {
    const previewState = nextState?.blueprintPreview || nextState || {};
    panelState = {
      ...panelState,
      ...previewState
    };
    const { opacitySlider, opacityValue, showLabels } = getRefs();
    if (opacitySlider) opacitySlider.value = panelState.opacity;
    if (opacityValue) opacityValue.value = panelState.opacity;
    if (showLabels) showLabels.checked = !!panelState.showLabels;
  }

  function bindOpacity(sliderEl, inputEl) {
    if (!sliderEl || !inputEl || typeof actions.setOpacity !== 'function') return;
    const apply = (value) => {
      sliderEl.value = value;
      inputEl.value = value;
      actions.setOpacity(value);
    };
    sliderEl.addEventListener('input', (e) => apply(e.target.value));
    inputEl.addEventListener('input', (e) => apply(e.target.value));
  }

  function init() {
    const { opacitySlider, opacityValue, showLabels } = getRefs();
    bindOpacity(opacitySlider, opacityValue);
    if (showLabels && typeof actions.setShowLabels === 'function') {
      showLabels.addEventListener('change', (e) => {
        actions.setShowLabels(!!e.target.checked);
      });
    }
    sync(state);
  }

  return {
    init,
    sync
  };
}
```

## Probe Summary
- URL: `http://localhost:8000/city-sim.html?refactorProbe=1`
- `REFACTOR_PROBE_LEN`: `3977`
- `REFACTOR_PROBE_SHA256`: `ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d`
- `sceneCounts`: `{ meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }`
- `blueprintCounts`: `{ beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }`
- `overlayDrift`: `{ ok: true, epsPx: 0.05, maxDriftPx: 0 }`
- Parity decision: `PASS` (tracked fields unchanged).

## Packet Commit Evidence (pre-commit)

```bash
$ git diff --stat --cached
 docs/ai/review_packet_phase9c.md | 343 +++++++++++++++++++++++++++++++++++++++
 1 file changed, 343 insertions(+)
```

```bash
$ git diff --check --cached
(no output)
```

## Carry-forward
- P0: None.
- P1: Replace `phase_end_commit`/`packet_commit` from `PENDING` in `REFACTOR_LOG.md` with concrete SHAs via docs-only microfix.
- P2: Keep additional panel extraction incremental (one panel at a time) to avoid hidden double-binding regressions.
