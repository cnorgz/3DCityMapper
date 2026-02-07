# Phase 7d Review Packet

## Metadata
- branch: `refactor/phase7d-editor-controller`
- base_commit: `446dea1`
- phase_end_commit: `a11428d`
- packet_commit: `PENDING` (self-reference; use git log as authority)

## Probe Drift Triage (two runs)
- URL: `http://localhost:8000/city-sim.html?refactorProbe=1`
- Result: stable across two hard-reload runs (`LEN` and `SHA256` unchanged).

### RUN1
```json
{"href":"http://localhost:8000/city-sim.html?refactorProbe=1","len":3978,"sha":"c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa","sceneCounts":{"meshCount":631,"lineCount":6,"pointCount":0,"groupCount":206,"geometryCount":443,"materialCount":345},"blueprintCounts":{"beaches":0,"buildings":0,"coastlines":1,"pois":1,"roads":2,"sea":0,"transit":0,"zones":1},"overlayDrift":{"ok":true,"epsPx":0.05,"maxDriftPx":0,"samples":[{"px":700,"py":500,"dx":0,"dy":0},{"px":140,"py":100,"dx":0,"dy":0},{"px":1260,"py":900,"dx":0,"dy":0}]},"rendererInfo":{"memory":{"geometries":436,"textures":3},"render":{"calls":626,"triangles":22614,"lines":0,"points":0}}}
```

### RUN2
```json
{"href":"http://localhost:8000/city-sim.html?refactorProbe=1","len":3978,"sha":"c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa","sceneCounts":{"meshCount":631,"lineCount":6,"pointCount":0,"groupCount":206,"geometryCount":443,"materialCount":345},"blueprintCounts":{"beaches":0,"buildings":0,"coastlines":1,"pois":1,"roads":2,"sea":0,"transit":0,"zones":1},"overlayDrift":{"ok":true,"epsPx":0.05,"maxDriftPx":0,"samples":[{"px":700,"py":500,"dx":0,"dy":0},{"px":140,"py":100,"dx":0,"dy":0},{"px":1260,"py":900,"dx":0,"dy":0}]},"rendererInfo":{"memory":{"geometries":436,"textures":3},"render":{"calls":626,"triangles":22614,"lines":0,"points":0}}}
```

## Determinism / Tooling
### `command -v rg; rg --version; command -v sha256sum; sha256sum --version`
```text
/Users/xavstack/.nvm/versions/node/v22.12.0/lib/node_modules/@openai/codex/vendor/x86_64-apple-darwin/path/rg
ripgrep 14.1.1 (rev 4649aa9700)

features:+pcre2
simd(compile):+SSE2,+SSSE3,-AVX2
simd(runtime):+SSE2,+SSSE3,+AVX2

PCRE2 10.43 is available (JIT is available)
zsh:14: command not found: sha256sum
```

## Fixed Commands
### `git status -sb`
```text
## refactor/phase7d-editor-controller
M  REFACTOR_LOG.md
A  docs/ai/review_packet_phase7d.md
```

### `git diff --name-only 446dea1...a11428d`
```text
REFACTOR_LOG.md
city-sim.html
src/editor/EditorController.js
```

### `git diff -U15 446dea1...a11428d -- REFACTOR_LOG.md docs/ai/review_packet_phase7d.md src/editor/EditorController.js city-sim.html`
```diff
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index e530eba..223521f 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -184,15 +184,30 @@ Probe check (post-extraction):

 ## Phase 7c – Editor SnapEngine extraction

 - branch: refactor/phase7c-editor-snap-engine
 - base_commit: 483707c
 - phase_end_commit: 957d3ea
 - packet_commit: ad2702b
 - capture_method: codex-mcp (readiness gated)
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_len: 3977
 - json_sha256: f88283c8083d6fbb6c5c2ebbb381c8be963e6c86c44c5188288865ea6288d188
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
 - rendererInfo: { memory: { geometries: 434, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }
+
+## Phase 7d – EditorController extraction
+
+- branch: refactor/phase7d-editor-controller
+- base_commit: 446dea1
+- phase_end_commit: b4d4665
+- packet_commit: PENDING
+- capture_method: codex-mcp (readiness gated)
+- url: http://localhost:8000/city-sim.html?refactorProbe=1
+- json_len: 3978
+- json_sha256: c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa
+- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
+- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
+- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
+- rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }
diff --git a/city-sim.html b/city-sim.html
index a1cdd39..92a1a09 100644
--- a/city-sim.html
+++ b/city-sim.html
@@ -804,30 +804,31 @@
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
     import { createEditorRebuildScheduler } from './src/editor/RebuildScheduler.js';
     import { createEditorHistoryManager } from './src/editor/HistoryManager.js';
     import { createEditorSnapEngine } from './src/editor/SnapEngine.js';
+    import { createEditorController } from './src/editor/EditorController.js';

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
@@ -960,30 +961,31 @@ const trafficRuntime = {
   speedScale: 1
 };

 const editorHistory = {
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
+  let editorController = null;

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
   touchPoints: new Map()
@@ -6418,30 +6420,71 @@ function validateBlueprint(data) {
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

+    function ensureEditorController() {
+      if (!editorController) {
+        editorController = createEditorController({
+          editorState,
+          trafficRuntime,
+          PERSIST_KEYS,
+          getItem,
+          setItem,
+          getBlueprintData: () => blueprintData,
+          setBlueprintData: (next) => { blueprintData = next; },
+          blueprintModel,
+          normalizeBlueprintData,
+          pushEditorHistory,
+          snapshotEditorState,
+          buildBlueprintFromData,
+          rebuildBlueprintCity,
+          rebuildBlueprintTraffic,
+          updateEditorStatus,
+          ensureEditorGroups,
+          getEditorGroup: () => editorGroup,
+          getViewMode: () => viewMode,
+          updateEditorUIState,
+          updateDraftLine,
+          updateDraftMarkers,
+          updateSelectionMarkers,
+          clearJunctionMode,
+          getSelectedEntry,
+          getLegendInfo,
+          hideEditorLines,
+          setBlueprintStatus,
+          applyEditorZoom,
+          applyHandleScale,
+          deleteSelection,
+          setCityLayerVisibility,
+          undoEditor,
+          redoEditor
+        });
+      }
+      return editorController;
+    }
+
     function cloneBlueprintData(data) {
       return ensureEditorHistoryManager().cloneBlueprintData(data);
     }

     function snapshotEditorState() {
       return ensureEditorHistoryManager().snapshotEditorState();
     }

     function pushEditorHistory(snapshot) {
       return ensureEditorHistoryManager().pushEditorHistory(snapshot);
     }

     function applyEditorSnapshot(snapshot, label) {
       return ensureEditorHistoryManager().applyEditorSnapshot(snapshot, label);
     }
@@ -6845,319 +6888,35 @@ function validateBlueprint(data) {
           editorState.selected = null;
         } else {
           editorState.selected.vertexIndex = null;
         }
       } else {
         list.splice(index, 1);
         editorState.selected = null;
       }
       buildBlueprintFromData(blueprintData);
       rebuildBlueprintCity();
       updateSelectionMarkers();
       updateEditorStatus('Selection deleted.');
     }

     function addPoiAt(point) {
-      if (!blueprintData) blueprintData = blueprintModel.createBlank();
-      pushEditorHistory(snapshotEditorState());
-      const id = `poi-${Date.now()}`;
-      blueprintModel.addFeature('pois', { id, type: editorState.poiType, position: [point.x, point.z] });
-      buildBlueprintFromData(blueprintData);
-      rebuildBlueprintCity();
-      updateEditorStatus('POI added.');
+      return ensureEditorController().addPoiAt(point);
     }

     function setupEditorControls() {
-      const enableToggle = document.getElementById('editorEnable');
-      const undoBtn = document.getElementById('editorUndo');
-      const redoBtn = document.getElementById('editorRedo');
-      const toolSelect = document.getElementById('editorTool');
-      const layerSelect = document.getElementById('editorLayer');
-      const typeSelect = document.getElementById('editorTypeCode');
-      const poiSelect = document.getElementById('editorPoiType');
-      const transitSelect = document.getElementById('editorTransitType');
-      const junctionToggle = document.getElementById('editorJunctionMode');
-      const junctionSplitToggle = document.getElementById('editorJunctionAutoSplit');
-      const debugOffsetsToggle = document.getElementById('editorDebugRoadOffsets');
-      const trafficCarSlider = document.getElementById('trafficCarCount');
-      const trafficCarValue = document.getElementById('trafficCarCountValue');
-      const trafficSpeedSlider = document.getElementById('trafficSpeed');
-      const trafficSpeedValue = document.getElementById('trafficSpeedValue');
-      const heightRange = document.getElementById('editorHeightRange');
-      const heightValue = document.getElementById('editorHeightValue');
-      const heightApply = document.getElementById('editorHeightApply');
-      const snapGridToggle = document.getElementById('editorSnapGrid');
-      const snapPixelToggle = document.getElementById('editorSnapPixels');
-      const pixelStepInput = document.getElementById('editorPixelStep');
-      const zoomSlider = document.getElementById('editorZoom');
-      const zoomValue = document.getElementById('editorZoomValue');
-      const handleScaleSlider = document.getElementById('editorHandleScale');
-      const handleScaleValue = document.getElementById('editorHandleScaleValue');
-      const deleteBtn = document.getElementById('editorDelete');
-      const clearBtn = document.getElementById('editorClear');
-      const hideCityToggle = document.getElementById('editorHideCity');
-
-      if (!enableToggle) return;
-
-      try {
-        const storedSnapGrid = getItem(PERSIST_KEYS.editorSnapGrid);
-        if (typeof storedSnapGrid === 'boolean') editorState.snapGrid = storedSnapGrid;
-        const storedSnapPixels = getItem(PERSIST_KEYS.editorSnapPixels);
-        if (typeof storedSnapPixels === 'boolean') editorState.snapPixels = storedSnapPixels;
-        const storedPixelStep = getItem(PERSIST_KEYS.editorPixelStep);
-        if (Number.isFinite(storedPixelStep)) editorState.pixelStep = storedPixelStep;
-        const storedMaxCars = getItem(PERSIST_KEYS.trafficMaxCars);
-        if (Number.isFinite(storedMaxCars)) {
-          trafficRuntime.maxCars = Math.max(0, Math.min(40, Number.parseInt(storedMaxCars, 10) || 0));
-        }
-        const storedSpeedScale = getItem(PERSIST_KEYS.trafficSpeedScale);
-        if (Number.isFinite(storedSpeedScale)) {
-          trafficRuntime.speedScale = Math.max(0.2, Math.min(3, Number.parseFloat(storedSpeedScale) || 1));
-        }
-      } catch (e) {
-        // ignore persistence load errors
-      }
-
-      enableToggle.checked = editorState.enabled;
-      enableToggle.addEventListener('change', (e) => {
-        editorState.enabled = !!e.target.checked;
-        ensureEditorGroups();
-        if (editorGroup) editorGroup.visible = editorState.enabled && viewMode === 'fidelity';
-        if (editorState.enabled && viewMode !== 'fidelity') {
-          updateEditorStatus('Editor enabled (switch to Fidelity Mode).');
-        } else {
-          updateEditorStatus(editorState.enabled ? 'Editor enabled.' : 'Editor disabled.');
-        }
-        updateEditorUIState();
-      });
-
-      if (undoBtn) undoBtn.addEventListener('click', undoEditor);
-      if (redoBtn) redoBtn.addEventListener('click', redoEditor);
-
-      if (toolSelect) {
-        toolSelect.addEventListener('change', (e) => {
-          editorState.tool = e.target.value;
-      if (editorState.tool === 'polygon' || editorState.tool === 'polyline') {
-        editorState.selected = null;
-        updateSelectionMarkers();
-      }
-      if (editorState.tool !== 'polygon' && editorState.tool !== 'polyline') {
-        editorState.draft = [];
-        editorState.previewPoint = null;
-        updateDraftLine();
-      }
-      clearJunctionMode();
-          updateEditorUIState();
-          updateDraftMarkers();
-          updateEditorStatus(`Tool: ${editorState.tool}`);
-        });
-      }
-
-      if (layerSelect) {
-        layerSelect.addEventListener('change', (e) => {
-          editorState.targetLayer = e.target.value;
-          if (editorState.targetLayer === 'transit') {
-            editorState.tool = 'polyline';
-          }
-          updateEditorUIState();
-          updateDraftLine();
-          updateDraftMarkers();
-        });
-      }
-
-      if (typeSelect) {
-        typeSelect.addEventListener('change', (e) => {
-          editorState.typeCode = e.target.value;
-          updateDraftLine();
-          updateSelectionMarkers();
-        });
-      }
-
-      if (poiSelect) {
-        poiSelect.addEventListener('change', (e) => {
-          editorState.poiType = e.target.value;
-        });
-      }
-
-      if (transitSelect) {
-        transitSelect.addEventListener('change', (e) => {
-          editorState.transitType = e.target.value;
-          updateDraftLine();
-          updateSelectionMarkers();
-        });
-      }
-
-      if (junctionToggle) {
-        junctionToggle.checked = editorState.junctionInsertMode;
-        junctionToggle.addEventListener('change', (e) => {
-          editorState.junctionInsertMode = !!e.target.checked;
-          updateEditorStatus(editorState.junctionInsertMode ? 'Junction mode enabled.' : 'Junction mode disabled.');
-        });
-      }
-      if (junctionSplitToggle) {
-        junctionSplitToggle.checked = editorState.junctionAutoSplit;
-        junctionSplitToggle.addEventListener('change', (e) => {
-          editorState.junctionAutoSplit = !!e.target.checked;
-        });
-      }
-      if (debugOffsetsToggle) {
-        debugOffsetsToggle.checked = editorState.debugRoadOffsets;
-        debugOffsetsToggle.addEventListener('change', (e) => {
-          editorState.debugRoadOffsets = !!e.target.checked;
-          buildBlueprintFromData(blueprintData || normalizeBlueprintData({}));
-        });
-      }
-
-      const bindTrafficNumber = (slider, input, onChange) => {
-        if (!slider || !input) return;
-        const apply = (value) => {
-          slider.value = value;
-          input.value = value;
-          onChange(value);
-        };
-        slider.addEventListener('input', (e) => apply(e.target.value));
-        input.addEventListener('input', (e) => apply(e.target.value));
-      };
-
-      bindTrafficNumber(trafficCarSlider, trafficCarValue, (value) => {
-        trafficRuntime.maxCars = Math.max(0, Math.min(40, Number.parseInt(value, 10) || 0));
-        try {
-          setItem(PERSIST_KEYS.trafficMaxCars, trafficRuntime.maxCars);
-        } catch (e) {
-          // ignore persistence errors
-        }
-        rebuildBlueprintTraffic();
-      });
-
-      bindTrafficNumber(trafficSpeedSlider, trafficSpeedValue, (value) => {
-        trafficRuntime.speedScale = Math.max(0.2, Math.min(3, Number.parseFloat(value) || 1));
-        try {
-          setItem(PERSIST_KEYS.trafficSpeedScale, trafficRuntime.speedScale);
-        } catch (e) {
-          // ignore persistence errors
-        }
-      });
-
-      if (heightRange && heightValue) {
-        heightRange.addEventListener('input', (e) => {
-          heightValue.value = e.target.value;
-        });
-        heightValue.addEventListener('input', (e) => {
-          heightRange.value = e.target.value;
-        });
-      }
-
-      if (heightApply) {
-        heightApply.addEventListener('click', () => {
-          const selected = getSelectedEntry();
-          if (!selected || selected.layer !== 'buildings') return;
-          const info = getLegendInfo(selected.entry.typeCode);
-          if (!info.buildable) return;
-          const height = Math.max(0, Math.min(2000, Number.parseFloat(heightValue?.value)));
-          if (!Number.isFinite(height)) return;
-          pushEditorHistory(snapshotEditorState());
-          selected.entry.height = height;
-          selected.entry.heightMeters = height;
-          buildBlueprintFromData(blueprintData);
-          rebuildBlueprintCity();
-          updateSelectionMarkers();
-          updateEditorStatus(`Height set to ${Math.round(height)}m.`);
-        });
-      }
-
-      if (snapGridToggle) {
-        snapGridToggle.addEventListener('change', (e) => {
-          editorState.snapGrid = !!e.target.checked;
-          try {
-            setItem(PERSIST_KEYS.editorSnapGrid, editorState.snapGrid);
-          } catch (e) {
-            // ignore persistence errors
-          }
-        });
-      }
-
-      if (snapPixelToggle) {
-        snapPixelToggle.addEventListener('change', (e) => {
-          editorState.snapPixels = !!e.target.checked;
-          try {
-            setItem(PERSIST_KEYS.editorSnapPixels, editorState.snapPixels);
-          } catch (e) {
-            // ignore persistence errors
-          }
-        });
-      }
-
-      if (pixelStepInput) {
-        pixelStepInput.addEventListener('input', (e) => {
-          editorState.pixelStep = Number.parseFloat(e.target.value) || 1;
-          try {
-            setItem(PERSIST_KEYS.editorPixelStep, editorState.pixelStep);
-          } catch (e) {
-            // ignore persistence errors
-          }
-        });
-      }
-
-      const bindLinkedNumber = (slider, input, onChange) => {
-        if (!slider || !input) return;
-        const apply = (value) => {
-          slider.value = value;
-          input.value = value;
-          onChange(value);
-        };
-        slider.addEventListener('input', (e) => apply(e.target.value));
-        input.addEventListener('input', (e) => apply(e.target.value));
-      };
-
-      bindLinkedNumber(zoomSlider, zoomValue, (value) => applyEditorZoom(value));
-      bindLinkedNumber(handleScaleSlider, handleScaleValue, (value) => applyHandleScale(value));
-
-      if (deleteBtn) deleteBtn.addEventListener('click', deleteSelection);
-
-      if (clearBtn) {
-        clearBtn.addEventListener('click', () => {
-          pushEditorHistory(snapshotEditorState());
-          blueprintData = blueprintModel.createBlank();
-          editorState.draft = [];
-          editorState.previewPoint = null;
-          clearJunctionMode();
-          editorState.selected = null;
-          editorState.hover = null;
-          editorState.hoverDraftIndex = null;
-          buildBlueprintFromData(blueprintData);
-          rebuildBlueprintCity();
-          updateDraftLine();
-          updateDraftMarkers();
-          updateSelectionMarkers();
-          hideEditorLines();
-          updateEditorStatus('Cleared all blueprint shapes.');
-          setBlueprintStatus('Blueprint status: cleared in memory.');
-        });
-      }
-
-      if (hideCityToggle) {
-        hideCityToggle.checked = editorState.hideCity;
-        hideCityToggle.addEventListener('change', (e) => {
-          editorState.hideCity = !!e.target.checked;
-          setCityLayerVisibility();
-        });
-      }
-
-      updateDraftMarkers();
-      updateEditorUIState();
-      applyEditorZoom(editorState.mapZoom);
-      applyHandleScale(editorState.handleScale);
+      return ensureEditorController().setupEditorControls();
     }

     function clearJunctionMode() {
       editorState.junctionMode = false;
       editorState.junctionBase = null;
     }

     function markJunctionIndex(entry, insertIndex) {
       if (!entry || !Number.isFinite(insertIndex)) return;
       if (!Array.isArray(entry.junctions)) entry.junctions = [];
       entry.junctions = entry.junctions.map(idx => (idx >= insertIndex ? idx + 1 : idx));
       if (!entry.junctions.includes(insertIndex)) {
         entry.junctions.push(insertIndex);
       }
     }
diff --git a/src/editor/EditorController.js b/src/editor/EditorController.js
new file mode 100644
index 0000000..5ba16a8
--- /dev/null
+++ b/src/editor/EditorController.js
@@ -0,0 +1,341 @@
+export function createEditorController(deps) {
+  const {
+    editorState,
+    trafficRuntime,
+    PERSIST_KEYS,
+    getItem,
+    setItem,
+    getBlueprintData,
+    setBlueprintData,
+    blueprintModel,
+    normalizeBlueprintData,
+    pushEditorHistory,
+    snapshotEditorState,
+    buildBlueprintFromData,
+    rebuildBlueprintCity,
+    rebuildBlueprintTraffic,
+    updateEditorStatus,
+    ensureEditorGroups,
+    getEditorGroup,
+    getViewMode,
+    updateEditorUIState,
+    updateDraftLine,
+    updateDraftMarkers,
+    updateSelectionMarkers,
+    clearJunctionMode,
+    getSelectedEntry,
+    getLegendInfo,
+    hideEditorLines,
+    setBlueprintStatus,
+    applyEditorZoom,
+    applyHandleScale,
+    deleteSelection,
+    setCityLayerVisibility,
+    undoEditor,
+    redoEditor
+  } = deps || {};
+
+  function addPoiAt(point) {
+    let data = getBlueprintData();
+    if (!data) {
+      data = blueprintModel.createBlank();
+      setBlueprintData(data);
+    }
+    pushEditorHistory(snapshotEditorState());
+    const id = `poi-${Date.now()}`;
+    blueprintModel.addFeature('pois', { id, type: editorState.poiType, position: [point.x, point.z] });
+    buildBlueprintFromData(data);
+    rebuildBlueprintCity();
+    updateEditorStatus('POI added.');
+  }
+
+  function setupEditorControls() {
+    const enableToggle = document.getElementById('editorEnable');
+    const undoBtn = document.getElementById('editorUndo');
+    const redoBtn = document.getElementById('editorRedo');
+    const toolSelect = document.getElementById('editorTool');
+    const layerSelect = document.getElementById('editorLayer');
+    const typeSelect = document.getElementById('editorTypeCode');
+    const poiSelect = document.getElementById('editorPoiType');
+    const transitSelect = document.getElementById('editorTransitType');
+    const junctionToggle = document.getElementById('editorJunctionMode');
+    const junctionSplitToggle = document.getElementById('editorJunctionAutoSplit');
+    const debugOffsetsToggle = document.getElementById('editorDebugRoadOffsets');
+    const trafficCarSlider = document.getElementById('trafficCarCount');
+    const trafficCarValue = document.getElementById('trafficCarCountValue');
+    const trafficSpeedSlider = document.getElementById('trafficSpeed');
+    const trafficSpeedValue = document.getElementById('trafficSpeedValue');
+    const heightRange = document.getElementById('editorHeightRange');
+    const heightValue = document.getElementById('editorHeightValue');
+    const heightApply = document.getElementById('editorHeightApply');
+    const snapGridToggle = document.getElementById('editorSnapGrid');
+    const snapPixelToggle = document.getElementById('editorSnapPixels');
+    const pixelStepInput = document.getElementById('editorPixelStep');
+    const zoomSlider = document.getElementById('editorZoom');
+    const zoomValue = document.getElementById('editorZoomValue');
+    const handleScaleSlider = document.getElementById('editorHandleScale');
+    const handleScaleValue = document.getElementById('editorHandleScaleValue');
+    const deleteBtn = document.getElementById('editorDelete');
+    const clearBtn = document.getElementById('editorClear');
+    const hideCityToggle = document.getElementById('editorHideCity');
+
+    if (!enableToggle) return;
+
+    try {
+      const storedSnapGrid = getItem(PERSIST_KEYS.editorSnapGrid);
+      if (typeof storedSnapGrid === 'boolean') editorState.snapGrid = storedSnapGrid;
+      const storedSnapPixels = getItem(PERSIST_KEYS.editorSnapPixels);
+      if (typeof storedSnapPixels === 'boolean') editorState.snapPixels = storedSnapPixels;
+      const storedPixelStep = getItem(PERSIST_KEYS.editorPixelStep);
+      if (Number.isFinite(storedPixelStep)) editorState.pixelStep = storedPixelStep;
+      const storedMaxCars = getItem(PERSIST_KEYS.trafficMaxCars);
+      if (Number.isFinite(storedMaxCars)) {
+        trafficRuntime.maxCars = Math.max(0, Math.min(40, Number.parseInt(storedMaxCars, 10) || 0));
+      }
+      const storedSpeedScale = getItem(PERSIST_KEYS.trafficSpeedScale);
+      if (Number.isFinite(storedSpeedScale)) {
+        trafficRuntime.speedScale = Math.max(0.2, Math.min(3, Number.parseFloat(storedSpeedScale) || 1));
+      }
+    } catch (e) {
+      // ignore persistence load errors
+    }
+
+    enableToggle.checked = editorState.enabled;
+    enableToggle.addEventListener('change', (e) => {
+      editorState.enabled = !!e.target.checked;
+      ensureEditorGroups();
+      const editorGroup = getEditorGroup();
+      if (editorGroup) editorGroup.visible = editorState.enabled && getViewMode() === 'fidelity';
+      if (editorState.enabled && getViewMode() !== 'fidelity') {
+        updateEditorStatus('Editor enabled (switch to Fidelity Mode).');
+      } else {
+        updateEditorStatus(editorState.enabled ? 'Editor enabled.' : 'Editor disabled.');
+      }
+      updateEditorUIState();
+    });
+
+    if (undoBtn) undoBtn.addEventListener('click', undoEditor);
+    if (redoBtn) redoBtn.addEventListener('click', redoEditor);
+
+    if (toolSelect) {
+      toolSelect.addEventListener('change', (e) => {
+        editorState.tool = e.target.value;
+        if (editorState.tool === 'polygon' || editorState.tool === 'polyline') {
+          editorState.selected = null;
+          updateSelectionMarkers();
+        }
+        if (editorState.tool !== 'polygon' && editorState.tool !== 'polyline') {
+          editorState.draft = [];
+          editorState.previewPoint = null;
+          updateDraftLine();
+        }
+        clearJunctionMode();
+        updateEditorUIState();
+        updateDraftMarkers();
+        updateEditorStatus(`Tool: ${editorState.tool}`);
+      });
+    }
+
+    if (layerSelect) {
+      layerSelect.addEventListener('change', (e) => {
+        editorState.targetLayer = e.target.value;
+        if (editorState.targetLayer === 'transit') {
+          editorState.tool = 'polyline';
+        }
+        updateEditorUIState();
+        updateDraftLine();
+        updateDraftMarkers();
+      });
+    }
+
+    if (typeSelect) {
+      typeSelect.addEventListener('change', (e) => {
+        editorState.typeCode = e.target.value;
+        updateDraftLine();
+        updateSelectionMarkers();
+      });
+    }
+
+    if (poiSelect) {
+      poiSelect.addEventListener('change', (e) => {
+        editorState.poiType = e.target.value;
+      });
+    }
+
+    if (transitSelect) {
+      transitSelect.addEventListener('change', (e) => {
+        editorState.transitType = e.target.value;
+        updateDraftLine();
+        updateSelectionMarkers();
+      });
+    }
+
+    if (junctionToggle) {
+      junctionToggle.checked = editorState.junctionInsertMode;
+      junctionToggle.addEventListener('change', (e) => {
+        editorState.junctionInsertMode = !!e.target.checked;
+        updateEditorStatus(editorState.junctionInsertMode ? 'Junction mode enabled.' : 'Junction mode disabled.');
+      });
+    }
+    if (junctionSplitToggle) {
+      junctionSplitToggle.checked = editorState.junctionAutoSplit;
+      junctionSplitToggle.addEventListener('change', (e) => {
+        editorState.junctionAutoSplit = !!e.target.checked;
+      });
+    }
+    if (debugOffsetsToggle) {
+      debugOffsetsToggle.checked = editorState.debugRoadOffsets;
+      debugOffsetsToggle.addEventListener('change', (e) => {
+        editorState.debugRoadOffsets = !!e.target.checked;
+        buildBlueprintFromData(getBlueprintData() || normalizeBlueprintData({}));
+      });
+    }
+
+    const bindTrafficNumber = (slider, input, onChange) => {
+      if (!slider || !input) return;
+      const apply = (value) => {
+        slider.value = value;
+        input.value = value;
+        onChange(value);
+      };
+      slider.addEventListener('input', (e) => apply(e.target.value));
+      input.addEventListener('input', (e) => apply(e.target.value));
+    };
+
+    bindTrafficNumber(trafficCarSlider, trafficCarValue, (value) => {
+      trafficRuntime.maxCars = Math.max(0, Math.min(40, Number.parseInt(value, 10) || 0));
+      try {
+        setItem(PERSIST_KEYS.trafficMaxCars, trafficRuntime.maxCars);
+      } catch (e) {
+        // ignore persistence errors
+      }
+      rebuildBlueprintTraffic();
+    });
+
+    bindTrafficNumber(trafficSpeedSlider, trafficSpeedValue, (value) => {
+      trafficRuntime.speedScale = Math.max(0.2, Math.min(3, Number.parseFloat(value) || 1));
+      try {
+        setItem(PERSIST_KEYS.trafficSpeedScale, trafficRuntime.speedScale);
+      } catch (e) {
+        // ignore persistence errors
+      }
+    });
+
+    if (heightRange && heightValue) {
+      heightRange.addEventListener('input', (e) => {
+        heightValue.value = e.target.value;
+      });
+      heightValue.addEventListener('input', (e) => {
+        heightRange.value = e.target.value;
+      });
+    }
+
+    if (heightApply) {
+      heightApply.addEventListener('click', () => {
+        const selected = getSelectedEntry();
+        if (!selected || selected.layer !== 'buildings') return;
+        const info = getLegendInfo(selected.entry.typeCode);
+        if (!info.buildable) return;
+        const height = Math.max(0, Math.min(2000, Number.parseFloat(heightValue?.value)));
+        if (!Number.isFinite(height)) return;
+        pushEditorHistory(snapshotEditorState());
+        selected.entry.height = height;
+        selected.entry.heightMeters = height;
+        const data = getBlueprintData();
+        buildBlueprintFromData(data);
+        rebuildBlueprintCity();
+        updateSelectionMarkers();
+        updateEditorStatus(`Height set to ${Math.round(height)}m.`);
+      });
+    }
+
+    if (snapGridToggle) {
+      snapGridToggle.addEventListener('change', (e) => {
+        editorState.snapGrid = !!e.target.checked;
+        try {
+          setItem(PERSIST_KEYS.editorSnapGrid, editorState.snapGrid);
+        } catch (e) {
+          // ignore persistence errors
+        }
+      });
+    }
+
+    if (snapPixelToggle) {
+      snapPixelToggle.addEventListener('change', (e) => {
+        editorState.snapPixels = !!e.target.checked;
+        try {
+          setItem(PERSIST_KEYS.editorSnapPixels, editorState.snapPixels);
+        } catch (e) {
+          // ignore persistence errors
+        }
+      });
+    }
+
+    if (pixelStepInput) {
+      pixelStepInput.addEventListener('input', (e) => {
+        editorState.pixelStep = Number.parseFloat(e.target.value) || 1;
+        try {
+          setItem(PERSIST_KEYS.editorPixelStep, editorState.pixelStep);
+        } catch (e) {
+          // ignore persistence errors
+        }
+      });
+    }
+
+    const bindLinkedNumber = (slider, input, onChange) => {
+      if (!slider || !input) return;
+      const apply = (value) => {
+        slider.value = value;
+        input.value = value;
+        onChange(value);
+      };
+      slider.addEventListener('input', (e) => apply(e.target.value));
+      input.addEventListener('input', (e) => apply(e.target.value));
+    };
+
+    bindLinkedNumber(zoomSlider, zoomValue, (value) => applyEditorZoom(value));
+    bindLinkedNumber(handleScaleSlider, handleScaleValue, (value) => applyHandleScale(value));
+
+    if (deleteBtn) deleteBtn.addEventListener('click', deleteSelection);
+
+    if (clearBtn) {
+      clearBtn.addEventListener('click', () => {
+        pushEditorHistory(snapshotEditorState());
+        const next = blueprintModel.createBlank();
+        setBlueprintData(next);
+        editorState.draft = [];
+        editorState.previewPoint = null;
+        clearJunctionMode();
+        editorState.selected = null;
+        editorState.hover = null;
+        editorState.hoverDraftIndex = null;
+        buildBlueprintFromData(next);
+        rebuildBlueprintCity();
+        updateDraftLine();
+        updateDraftMarkers();
+        updateSelectionMarkers();
+        hideEditorLines();
+        updateEditorStatus('Cleared all blueprint shapes.');
+        setBlueprintStatus('Blueprint status: cleared in memory.');
+      });
+    }
+
+    if (hideCityToggle) {
+      hideCityToggle.checked = editorState.hideCity;
+      hideCityToggle.addEventListener('change', (e) => {
+        editorState.hideCity = !!e.target.checked;
+        setCityLayerVisibility();
+      });
+    }
+
+    updateDraftMarkers();
+    updateEditorUIState();
+    applyEditorZoom(editorState.mapZoom);
+    applyHandleScale(editorState.handleScale);
+  }
+
+  return {
+    addPoiAt,
+    setupEditorControls
+  };
+}
```

### `git diff --check 446dea1...a11428d`
```text
(no output)
```

### `grep -nF "refactorProbe" city-sim.html`
```text
1083:    const probeEnabled = new URLSearchParams(location.search).has('refactorProbe');
1137:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

### `grep -nF "import('./tools/refactorProbe.js')" city-sim.html`
```text
1137:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

### `rg -n "Phase 7d|EditorController" docs/ai/review_packet_phase7d.md REFACTOR_LOG.md`
```text
REFACTOR_LOG.md:200:## Phase 7d – EditorController extraction
docs/ai/review_packet_phase7d.md:1:# Phase 7d Review Packet
docs/ai/review_packet_phase7d.md:16:### `rg -n "Phase 7d|EditorController" docs/ai/review_packet_phase7d.md REFACTOR_LOG.md`
docs/ai/review_packet_phase7d.md:18:docs/ai/review_packet_phase7d.md:1:# Phase 7d Review Packet
docs/ai/review_packet_phase7d.md:19:docs/ai/review_packet_phase7d.md:16:### `rg -n "Phase 7d|EditorController" docs/ai/review_packet_phase7d.md REFACTOR_LOG.md`
docs/ai/review_packet_phase7d.md:20:REFACTOR_LOG.md:200:## Phase 7d – EditorController extraction
docs/ai/review_packet_phase7d.md:61:### `git diff --stat 446dea1...a11428d -- city-sim.html src/editor/EditorController.js REFACTOR_LOG.md`
docs/ai/review_packet_phase7d.md:65: src/editor/EditorController.js | 341 +++++++++++++++++++++++++++++++++++++++++
docs/ai/review_packet_phase7d.md:69:### `git diff --check 446dea1...a11428d -- city-sim.html src/editor/EditorController.js REFACTOR_LOG.md`
docs/ai/review_packet_phase7d.md:73:### `git diff -U15 446dea1...a11428d -- city-sim.html src/editor/EditorController.js REFACTOR_LOG.md`
docs/ai/review_packet_phase7d.md:96:+## Phase 7d – EditorController extraction
docs/ai/review_packet_phase7d.md:130:+    import { createEditorController } from './src/editor/EditorController.js';
docs/ai/review_packet_phase7d.md:197:+    function ensureEditorController() {
docs/ai/review_packet_phase7d.md:199:+        editorController = createEditorController({
docs/ai/review_packet_phase7d.md:276:+      return ensureEditorController().addPoiAt(point);
docs/ai/review_packet_phase7d.md:559:+      return ensureEditorController().setupEditorControls();
docs/ai/review_packet_phase7d.md:575:diff --git a/src/editor/EditorController.js b/src/editor/EditorController.js
docs/ai/review_packet_phase7d.md:579:+++ b/src/editor/EditorController.js
docs/ai/review_packet_phase7d.md:581:+export function createEditorController(deps) {
docs/ai/review_packet_phase7d.md:924:### Pinned new module contents: `git show a11428d:src/editor/EditorController.js`
docs/ai/review_packet_phase7d.md:926:export function createEditorController(deps) {
docs/ai/review_packet_phase7d.md:1293:- `P1`: fix `REFACTOR_LOG.md` Phase 7d `packet_commit` after packet commit is known.
docs/ai/review_packet_phase7d.md:1294:  - locator: `REFACTOR_LOG.md` Phase 7d block
docs/ai/review_packet_phase7d.md:1296:- `P2`: split `createEditorController().setupEditorControls()` into smaller internal helpers after extraction phases complete.
docs/ai/review_packet_phase7d.md:1297:  - locator: `src/editor/EditorController.js`
```

## Probe Summary
- Probe URL: `http://localhost:8000/city-sim.html?refactorProbe=1`
- `REFACTOR_PROBE_LEN`: `3978`
- `REFACTOR_PROBE_SHA256`: `c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa`
- `sceneCounts`: `{ meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }`
- `blueprintCounts`: `{ beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }`
- `overlayDrift`: `{ ok: true, epsPx: 0.05, maxDriftPx: 0 }`

## Packet Commit Evidence (pre-commit)

### `git diff --stat --cached`
```text
 REFACTOR_LOG.md                  |   2 +-
 docs/ai/review_packet_phase7d.md | 972 +++++++++++++++++++++++++++++++++++++++
 2 files changed, 973 insertions(+), 1 deletion(-)
```

### `git diff --check --cached`
```text
(no output)
```

## Carry-Forward
- `P0`: none.
- `P1`: set `REFACTOR_LOG.md` Phase 7d `packet_commit` after this packet commit exists.
  - locator: `REFACTOR_LOG.md` Phase 7d block
  - acceptance: `packet_commit` equals packet commit SHA from `git log`.
- `P2`: split `createEditorController().setupEditorControls()` into smaller internal helpers in later extraction passes.
  - locator: `src/editor/EditorController.js`
  - acceptance: smaller helpers with unchanged behavior and parity fields.
