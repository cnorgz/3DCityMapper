# Review Packet: Phase 10a

## Metadata
- branch: refactor/phase10a-city-mode-controller
- base_commit: b22284c
- phase_end_commit: bbbae5e
- packet_commit: PENDING (self-reference; see git log)
- focus_paths: city-sim.html src/modes/CityModeController.js src/ui/panels/CityModePanel.js REFACTOR_LOG.md docs/ai/review_packet_phase10a.md

## Probe Summary
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- REFACTOR_PROBE_LEN: 3977
- REFACTOR_PROBE_SHA256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
- sceneCounts: {"meshCount":631,"lineCount":6,"pointCount":0,"groupCount":206,"geometryCount":443,"materialCount":345}
- blueprintCounts: {"beaches":0,"buildings":0,"coastlines":1,"pois":1,"roads":2,"sea":0,"transit":0,"zones":1}
- overlayDrift: {"ok":true,"epsPx":0.05,"maxDriftPx":0}
- parity decision: PASS (tracked counts and drift unchanged)

## Determinism
```bash
command -v rg >/dev/null && echo "rg=1" || echo "rg=0"
```
```text
```
```bash
rg --version
```
```text
ripgrep 14.1.1 (rev 4649aa9700)

features:+pcre2
simd(compile):+SSE2,+SSSE3,-AVX2
simd(runtime):+SSE2,+SSSE3,+AVX2

PCRE2 10.43 is available (JIT is available)
```

## Fixed Commands
```bash
git status -sb
```
```text
## refactor/phase10a-city-mode-controller
?? docs/ai/review_packet_phase10a.md
```
```bash
git rev-parse --short HEAD
```
```text
bbbae5e
```
```bash
git log --oneline --decorate -n 20
```
```text
bbbae5e (HEAD -> refactor/phase10a-city-mode-controller) docs(phase10a): record readiness-gated probe
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
324f0b6 (refactor/phase9d_1-log-metadata) docs(ai): add review packet for phase 9d_1
bacf595 docs(phase9d_1): fix phase9d log metadata
37df0dc (refactor/phase9d-ui-blueprint-preview-dedup) docs(ai): add review packet for phase 9d
```

## Audit Evidence
```bash
git diff --stat b22284c...bbbae5e -- city-sim.html src/modes/CityModeController.js src/ui/panels/CityModePanel.js REFACTOR_LOG.md
```
```text
 REFACTOR_LOG.md                 | 14 ++++++++
 city-sim.html                   | 72 ++++++++++++++++++++++++++++++++++++-
 src/modes/CityModeController.js | 57 +++++++++++++++++++++++++++++
 src/ui/panels/CityModePanel.js  | 79 +++++++++++++++++++++++++++++++++++++++++
 4 files changed, 221 insertions(+), 1 deletion(-)
```
```bash
git diff --check b22284c...bbbae5e -- city-sim.html src/modes/CityModeController.js src/ui/panels/CityModePanel.js REFACTOR_LOG.md
```
```text
```
```bash
git diff -U15 b22284c...bbbae5e -- city-sim.html src/modes/CityModeController.js src/ui/panels/CityModePanel.js REFACTOR_LOG.md
```
```diff
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 4c388cd..516aed4 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -333,15 +333,29 @@ Probe check (post-extraction):
 
 ## Phase 9g – UI DevHUD panel (dev-only)
 
 - branch: refactor/phase9g-ui-devhud-panel
 - base_commit: 6883132
 - phase_end_commit: f7f8d20
 - packet_commit: 3e36260
 - capture_method: codex-mcp (readiness gated)
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_len: 3978
 - json_sha256: c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
 - rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }
+
+## Phase 10a – CityModeController skeleton + minimal wiring
+
+- branch: refactor/phase10a-city-mode-controller
+- base_commit: b22284c
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
index 8b0677e..c377901 100644
--- a/city-sim.html
+++ b/city-sim.html
@@ -812,31 +812,33 @@
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
+    import { createCityModeController } from './src/modes/CityModeController.js';
     import { createTrafficPanel } from './src/ui/panels/TrafficPanel.js';
+    import { createCityModePanel } from './src/ui/panels/CityModePanel.js';
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
 const sceneManager = createSceneManager({ container: document.body });
 const renderer = sceneManager.renderer;
@@ -980,38 +982,43 @@ const editorHistory = {
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
   let panelManager = null;
   let uiEventBus = null;
   let trafficPanel = null;
+  let cityModePanel = null;
   let overlayPanel = null;
   let blueprintPreviewPanel = null;
   let zoneInfoPanel = null;
   let devHudPanel = null;
+  let cityModeController = null;
   let trafficSystem = null;
   const devHudState = {
     lastProbe: null
   };
+  const cityModeState = {
+    mode: 'example'
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
@@ -1691,30 +1698,65 @@ function validateBlueprint(data) {
       }
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
+
+    async function applyCityModeBlueprint() {
+      if (!blueprintData) {
+        await loadBlueprintData();
+      }
+      setBlueprintCityEnabled(true);
+      setBlueprintStatus('Blueprint status: blueprint mode.');
+    }
+
+    async function applyCityModeBlank() {
+      blueprintModel.createBlank();
+      blueprintData = blueprintModel.getData();
+      buildBlueprintFromData(blueprintData);
+      setBlueprintCityEnabled(true);
+      setBlueprintStatus('Blueprint status: blank city.');
+    }
+
+    async function applyCityModeExample() {
+      setBlueprintCityEnabled(false);
+      setBlueprintStatus('Blueprint status: example city mode.');
+    }
+
+    function ensureCityModeController() {
+      if (!cityModeController) {
+        cityModeController = createCityModeController({
+          defaultMode: 'example',
+          actions: {
+            applyBlueprintMode: applyCityModeBlueprint,
+            applyBlankMode: applyCityModeBlank,
+            applyExampleMode: applyCityModeExample
+          }
+        });
+      }
+      return cityModeController;
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
@@ -5088,30 +5130,34 @@ function validateBlueprint(data) {
           setupOverlayControls();
           setupDebugHelpers();
           setupDebugControls();
           setupBlueprintControls();
           setupEditorControls();
           if (!editorRebuildScheduler) {
             editorRebuildScheduler = createEditorRebuildScheduler({
               getBlueprintData: () => blueprintData,
               buildBlueprintFromData,
               rebuildBlueprintCity,
               updateSelectionMarkers
             });
           }
           bindEditorEvents();
           await loadBlueprintData();
+          const controller = ensureCityModeController();
+          await controller.applyInitialMode();
+          cityModeState.mode = controller.getMode();
+          syncTrafficPanel();
 
           console.log('Map overlay loaded. coordMapper available for pixel-to-world conversion.');
           } catch (error) {
             console.warn('Failed to load map overlay:', error);
           }
 
           loadingBar.style.width = '90%';
 
           // Set initial view
           setTimeOfDay(false);
           setViewMode('plan');
 
           loadingBar.style.width = '100%';
 
           // Hide loading screen
@@ -5494,30 +5540,32 @@ function validateBlueprint(data) {
           if (!result.ok) return;
           blueprintModel.loadFromJSON(parsed);
           blueprintData = blueprintModel.getData();
           buildBlueprintFromData(blueprintData);
           rebuildBlueprintCity();
           setBlueprintStatus('Blueprint status: loaded from textarea.');
         } catch (e) {
           setBlueprintStatus('Blueprint load: invalid JSON.', false);
         }
       });
 
       if (useCityToggle) {
         useCityToggle.checked = blueprintCityEnabled;
         useCityToggle.addEventListener('change', (e) => {
           setBlueprintCityEnabled(!!e.target.checked);
+          cityModeState.mode = e.target.checked ? 'blueprint' : 'example';
+          syncTrafficPanel();
         });
       }
     }
 
     function editorActive() {
       return editorState.enabled && viewMode === 'fidelity';
     }
 
     function getEditorMode() {
       if (!editorActive()) return 'disabled';
       if (editorState.tool === 'polygon') return 'draw-polygon';
       if (editorState.tool === 'polyline') return 'draw-polyline';
       if (editorState.tool === 'poi') return 'poi';
       return editorState.selected ? 'edit' : 'select';
     }
@@ -6246,30 +6294,49 @@ function validateBlueprint(data) {
             setBlueprintPreviewLabels(value);
           });
         }
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
+        cityModePanel = createCityModePanel({
+          actions: {
+            openScan: () => {
+              const upload = document.getElementById('overlayUpload');
+              upload?.click();
+            },
+            setMode: async (mode) => {
+              const controller = ensureCityModeController();
+              await controller.setMode(mode);
+              cityModeState.mode = controller.getMode();
+              syncTrafficPanel();
+            }
+          },
+          state: {
+            cityMode: {
+              mode: cityModeState.mode
+            }
+          }
+        });
         overlayPanel = createOverlayPanel({
           state: {
             overlay: {
               opacity: overlaySettings?.opacity ?? OVERLAY_DEFAULTS.opacity
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
@@ -6297,53 +6364,56 @@ function validateBlueprint(data) {
                 const raw = window.runRefactorProbe();
                 devHudState.lastProbe = summarizeProbeForHUD(raw);
               } catch (error) {
                 devHudState.lastProbe = { error: String(error?.message || error) };
               }
               panelManager?.syncAll({ devHud: { lastProbe: devHudState.lastProbe } });
               return devHudState.lastProbe;
             }
           },
           state: {
             devHud: {
               lastProbe: devHudState.lastProbe
             }
           }
         });
-        panelManager = createPanelManager({ panels: [trafficPanel, overlayPanel, blueprintPreviewPanel, zoneInfoPanel, devHudPanel] });
+        panelManager = createPanelManager({ panels: [trafficPanel, cityModePanel, overlayPanel, blueprintPreviewPanel, zoneInfoPanel, devHudPanel] });
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
         overlay: {
           opacity: overlaySettings?.opacity ?? OVERLAY_DEFAULTS.opacity
         },
         blueprintPreview: {
           opacity: blueprintPreviewSettings.opacity,
           showLabels: blueprintPreviewSettings.showLabels
         },
+        cityMode: {
+          mode: cityModeState.mode
+        },
         devHud: {
           lastProbe: devHudState.lastProbe
         }
       });
     }
 
     function ensureEditorController() {
       if (!editorController) {
         editorController = createEditorController({
           editorState,
           trafficRuntime,
           PERSIST_KEYS,
           getItem,
           setItem,
           getBlueprintData: () => blueprintData,
diff --git a/src/modes/CityModeController.js b/src/modes/CityModeController.js
new file mode 100644
index 0000000..57fcd90
--- /dev/null
+++ b/src/modes/CityModeController.js
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
diff --git a/src/ui/panels/CityModePanel.js b/src/ui/panels/CityModePanel.js
new file mode 100644
index 0000000..adbbf18
--- /dev/null
+++ b/src/ui/panels/CityModePanel.js
@@ -0,0 +1,79 @@
+export function createCityModePanel({ doc = document, state = {}, actions = {} } = {}) {
+  let refs = null;
+  let initialized = false;
+  let panelState = {
+    mode: 'example'
+  };
+
+  function ensureModeButtons() {
+    const uploadBtn = doc.getElementById('overlayUpload');
+    if (!uploadBtn || !uploadBtn.parentElement) return {};
+
+    let row = doc.getElementById('cityModeActions');
+    if (!row) {
+      row = doc.createElement('div');
+      row.id = 'cityModeActions';
+      row.className = 'overlay-actions';
+      row.style.marginTop = '6px';
+      row.innerHTML = [
+        '<button class="btn" id="cityModeScan" style="flex:1;padding:6px;">New City (Scan)</button>',
+        '<button class="btn" id="cityModeBlank" style="flex:1;padding:6px;">New City (Blank)</button>',
+        '<button class="btn" id="cityModeExample" style="flex:1;padding:6px;">Load Example City</button>'
+      ].join('');
+      uploadBtn.parentElement.insertAdjacentElement('afterend', row);
+    }
+
+    return {
+      row,
+      scanBtn: row.querySelector('#cityModeScan'),
+      blankBtn: row.querySelector('#cityModeBlank'),
+      exampleBtn: row.querySelector('#cityModeExample')
+    };
+  }
+
+  function getRefs() {
+    if (refs) return refs;
+    refs = ensureModeButtons();
+    return refs;
+  }
+
+  function markActiveButton(mode) {
+    const { blankBtn, exampleBtn } = getRefs();
+    if (blankBtn) {
+      blankBtn.style.opacity = mode === 'blank' ? '1' : '0.75';
+    }
+    if (exampleBtn) {
+      exampleBtn.style.opacity = mode === 'example' ? '1' : '0.75';
+    }
+  }
+
+  function sync(nextState = state) {
+    const incoming = nextState?.cityMode || nextState || {};
+    panelState = {
+      ...panelState,
+      ...incoming
+    };
+    markActiveButton(panelState.mode);
+  }
+
+  function init() {
+    if (initialized) return;
+    initialized = true;
+    const { scanBtn, blankBtn, exampleBtn } = getRefs();
+    if (scanBtn && typeof actions.openScan === 'function') {
+      scanBtn.addEventListener('click', () => actions.openScan());
+    }
+    if (blankBtn && typeof actions.setMode === 'function') {
+      blankBtn.addEventListener('click', () => actions.setMode('blank'));
+    }
+    if (exampleBtn && typeof actions.setMode === 'function') {
+      exampleBtn.addEventListener('click', () => actions.setMode('example'));
+    }
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
```bash
git show bbbae5e:src/modes/CityModeController.js
```
```js
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
```bash
git show bbbae5e:src/ui/panels/CityModePanel.js
```
```js
export function createCityModePanel({ doc = document, state = {}, actions = {} } = {}) {
  let refs = null;
  let initialized = false;
  let panelState = {
    mode: 'example'
  };

  function ensureModeButtons() {
    const uploadBtn = doc.getElementById('overlayUpload');
    if (!uploadBtn || !uploadBtn.parentElement) return {};

    let row = doc.getElementById('cityModeActions');
    if (!row) {
      row = doc.createElement('div');
      row.id = 'cityModeActions';
      row.className = 'overlay-actions';
      row.style.marginTop = '6px';
      row.innerHTML = [
        '<button class="btn" id="cityModeScan" style="flex:1;padding:6px;">New City (Scan)</button>',
        '<button class="btn" id="cityModeBlank" style="flex:1;padding:6px;">New City (Blank)</button>',
        '<button class="btn" id="cityModeExample" style="flex:1;padding:6px;">Load Example City</button>'
      ].join('');
      uploadBtn.parentElement.insertAdjacentElement('afterend', row);
    }

    return {
      row,
      scanBtn: row.querySelector('#cityModeScan'),
      blankBtn: row.querySelector('#cityModeBlank'),
      exampleBtn: row.querySelector('#cityModeExample')
    };
  }

  function getRefs() {
    if (refs) return refs;
    refs = ensureModeButtons();
    return refs;
  }

  function markActiveButton(mode) {
    const { blankBtn, exampleBtn } = getRefs();
    if (blankBtn) {
      blankBtn.style.opacity = mode === 'blank' ? '1' : '0.75';
    }
    if (exampleBtn) {
      exampleBtn.style.opacity = mode === 'example' ? '1' : '0.75';
    }
  }

  function sync(nextState = state) {
    const incoming = nextState?.cityMode || nextState || {};
    panelState = {
      ...panelState,
      ...incoming
    };
    markActiveButton(panelState.mode);
  }

  function init() {
    if (initialized) return;
    initialized = true;
    const { scanBtn, blankBtn, exampleBtn } = getRefs();
    if (scanBtn && typeof actions.openScan === 'function') {
      scanBtn.addEventListener('click', () => actions.openScan());
    }
    if (blankBtn && typeof actions.setMode === 'function') {
      blankBtn.addEventListener('click', () => actions.setMode('blank'));
    }
    if (exampleBtn && typeof actions.setMode === 'function') {
      exampleBtn.addEventListener('click', () => actions.setMode('example'));
    }
    sync(state);
  }

  return {
    init,
    sync
  };
}
```

## Carry-Forward
- P0: None.
- P1: Phase 10b should isolate example city seed into `src/demo/ExampleCityEntry.js` and route `example` mode through it.
Locator: `city-sim.html` legacy build path still used by `buildLegacyCity`.
Acceptance: `example` mode path no longer depends on inline legacy orchestration.
- P2: Add a dedicated `CityModePanel` style token instead of inline opacity styling for active mode state.
Locator: `src/ui/panels/CityModePanel.js`.
Acceptance: panel visual state handled by stylesheet class toggles.

## Packet Commit Evidence (pre-commit)

```bash
git diff --stat --cached
```
```text
 docs/ai/review_packet_phase10a.md | 761 ++++++++++++++++++++++++++++++++++++++
 1 file changed, 761 insertions(+)
```

```bash
git diff --check --cached
```
```text
docs/ai/review_packet_phase10a.md:103: trailing whitespace.
+ 
docs/ai/review_packet_phase10a.md:105: trailing whitespace.
+ 
docs/ai/review_packet_phase10a.md:159: trailing whitespace.
+     
docs/ai/review_packet_phase10a.md:163: trailing whitespace.
+     
docs/ai/review_packet_phase10a.md:164: trailing whitespace.
+     
docs/ai/review_packet_phase10a.md:172: trailing whitespace.
+ 
docs/ai/review_packet_phase10a.md:199: trailing whitespace.
+ 
docs/ai/review_packet_phase10a.md:204: trailing whitespace.
+ 
docs/ai/review_packet_phase10a.md:209: trailing whitespace.
+ 
docs/ai/review_packet_phase10a.md:219: trailing whitespace.
+ 
docs/ai/review_packet_phase10a.md:265: trailing whitespace.
+     
docs/ai/review_packet_phase10a.md:270: trailing whitespace.
+       
docs/ai/review_packet_phase10a.md:300: trailing whitespace.
+ 
docs/ai/review_packet_phase10a.md:305: trailing whitespace.
+ 
docs/ai/review_packet_phase10a.md:307: trailing whitespace.
+ 
docs/ai/review_packet_phase10a.md:311: trailing whitespace.
+ 
docs/ai/review_packet_phase10a.md:313: trailing whitespace.
+ 
docs/ai/review_packet_phase10a.md:326: trailing whitespace.
+ 
docs/ai/review_packet_phase10a.md:336: trailing whitespace.
+ 
docs/ai/review_packet_phase10a.md:340: trailing whitespace.
+ 
docs/ai/review_packet_phase10a.md:419: trailing whitespace.
+ 
docs/ai/review_packet_phase10a.md:424: trailing whitespace.
+ 
docs/ai/review_packet_phase10a.md:446: trailing whitespace.
+ 
```
