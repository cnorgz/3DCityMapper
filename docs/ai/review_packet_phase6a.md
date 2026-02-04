# Phase 6a Review Packet

## Metadata
- base_commit: c1e482d
- phase_end_commit: ce16421
- packet_commit: aaaf294

## Probe summary (Mode A, MCP)
- json_sha256: 2526c68e85ea72655154e08d692db9d3d0c46de7b5edf812091f674f74b6fa0b
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
- REFACTOR_LOG.md reference: Phase 6a – MaterialLibrary

## Git evidence

### git status -sb
```
## refactor/phase6a-material-library
```

### git log --oneline --decorate -n 20
```
ce16421 (HEAD -> refactor/phase6a-material-library) feat(phase6a): add MaterialLibrary and shared window assets
c1e482d (refactor/phase5_2-probe-hygiene) docs(ai): fix phase5.2 packet_commit
093431d docs(ai): add review packet for phase 5.2
8c0801e docs(phase5.2): record probe hygiene verification
8d49f5e (refactor/phase5_1-evidence-alignment) docs(ai): fix phase5.1 packet_commit
5a1fffd docs(ai): add phase5.1 evidence alignment packet
6ab75e6 (refactor/phase5-scene-layer-ownership) docs(ai): finalize phase5 packet_commit
d68f43d docs(ai): add review packet for phase 5
cd2a4d0 docs(phase5): record parity probe output
d76cadc feat(phase5): extract scene/layer/viewmode/renderloop
1310de1 (refactor/phase4b-overlay-system) docs(ai): finalize phase4b.1 packet_commit
120816a docs(ai): add review packet for phase 4b.1
deb35db docs: fix phase4b packet metadata + overlayCalib docs
b77b0df docs(ai): finalize phase4b packet_commit
80b70d5 docs(ai): refresh phase4b review packet
6d16986 fix(phase4b): align overlay migration + cleanup import
b795c24 docs(ai): update phase4b packet_commit
e6edf1c docs(ai): add review packet for phase 4b
b9b4c67 feat(phase4b): add ImageSource + OverlayLayer + preview renderer
2eeedf9 (refactor/phase4-overlay-coords) docs(ai): fix packet_commit for phase 4
```

### git diff --stat c1e482d...ce16421
```
 REFACTOR_LOG.md               | 10 ++++++++++
 city-sim.html                 | 23 +++-------------------
 src/render/MaterialLibrary.js | 44 +++++++++++++++++++++++++++++++++++++++++++
 3 files changed, 57 insertions(+), 20 deletions(-)
```

### git diff --check c1e482d...ce16421
```
```

### git diff -U15 c1e482d...ce16421 -- $FOCUS_PATHS
```
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 8c6f195..4f2d442 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -49,15 +49,25 @@ Probe check (post-extraction):

 Probe JSON output:
 ```json
 {"rendererInfo":{"memory":{"geometries":436,"textures":3},"render":{"calls":626,"triangles":22614,"lines":0,"points":0}},"sceneCounts":{"meshCount":631,"lineCount":6,"pointCount":0,"groupCount":206,"geometryCount":443,"materialCount":345},"blueprintCounts":{"beaches":0,"buildings":0,"coastlines":1,"pois":1,"roads":2,"sea":0,"transit":0,"zones":1},"sceneSignature":{"groups":[{"name":"bigBlueJ_building","childrenCount":3},{"name":"bigR_building","childrenCount":3},{"name":"BlueprintLabels","childrenCount":0},{"name":"BlueprintMeshes","childrenCount":4},{"name":"BlueprintOutlines","childrenCount":4},{"name":"BlueprintRoot","childrenCount":6},{"name":"BlueprintTraffic","childrenCount":0},{"name":"bridge","childrenCount":7},{"name":"coastB1_building","childrenCount":3},{"name":"coastB2_building","childrenCount":3},{"name":"coastQ1_building","childrenCount":4},{"name":"coastQ2_building","childrenCount":4},{"name":"colB1_building","childrenCount":3},{"name":"colCi_building","childrenCount":3},{"name":"colFf_building","childrenCount":1},{"name":"colQ_school_building","childrenCount":4},{"name":"colZC1_building","childrenCount":3},{"name":"eastH1_building","childrenCount":3},{"name":"eastH2_building","childrenCount":3},{"name":"eastM_building","childrenCount":1},{"name":"eastMA_building","childrenCount":3},{"name":"eastO_building","childrenCount":3},{"name":"eastR_building","childrenCount":3},{"name":"eastZC_tri_building","childrenCount":3},{"name":"eastZC2_building","childrenCount":3},{"name":"electric_building","childrenCount":3},{"name":"ferrisWheel","childrenCount":3},{"name":"hospB_building","childrenCount":3},{"name":"hospital_building","childrenCount":3},{"name":"hospR_building","childrenCount":3},{"name":"hospZC_tri_building","childrenCount":3},{"name":"hospZC1_building","childrenCount":3},{"name":"islandB1_building","childrenCount":3},{"name":"islandB2_building","childrenCount":3},{"name":"islandB3_building","childrenCount":3},{"name":"islandQ1_building","childrenCount":4},{"name":"islandQ2_building","childrenCount":4},{"name":"islandQ3_building","childrenCount":4},{"name":"islandZC_building","childrenCount":3},{"name":"MapOverlayGroup","childrenCount":10},{"name":"RoadCenterlines","childrenCount":0},{"name":"RoadOffsetDebug","childrenCount":0},{"name":"rubbish_building","childrenCount":1},{"name":"transport1_building","childrenCount":3},{"name":"transport2_building","childrenCount":3},{"name":"underRQ_building","childrenCount":4},{"name":"waterTreatment_building","childrenCount":3},{"name":"windmills","childrenCount":11}]},"overlayDrift":{"ok":true,"epsPx":0.05,"maxDriftPx":0,"samples":[{"px":700,"py":500,"dx":0,"dy":0},{"px":140,"py":100,"dx":0,"dy":0},{"px":1260,"py":900,"dx":0,"dy":0}]},"overlayPreviewGroups":{"BlueprintOutlines":{"childrenCount":4,"visible":false},"BlueprintMeshes":{"childrenCount":4,"visible":false},"BlueprintLabels":{"childrenCount":0,"visible":false},"RoadCenterlines":{"childrenCount":0,"visible":false},"RoadOffsetDebug":{"childrenCount":0,"visible":false}},"renderOrderSignature":{"min":0,"max":999,"unique":[0,997,999]},"renderLoopSignature":{"renderFps":{"realtime":60,"realtimeIdle":30,"idle":20,"idleNoAnim":8},"animationEnabled":false,"targetFpsByMode":{"plan":8,"3d":30,"street":30,"fidelity":8}},"viewModeSignature":{"plan":{"viewMode":"plan","overlayVisible":true,"editorVisible":false,"propsVisible":true,"fxVisible":true,"blueprintPropsVisible":false,"blueprintFxVisible":false},"3d":{"viewMode":"3d","overlayVisible":false,"editorVisible":false,"propsVisible":true,"fxVisible":true,"blueprintPropsVisible":false,"blueprintFxVisible":false},"street":{"viewMode":"street","overlayVisible":false,"editorVisible":false,"propsVisible":true,"fxVisible":true,"blueprintPropsVisible":false,"blueprintFxVisible":false},"fidelity":{"viewMode":"fidelity","overlayVisible":true,"editorVisible":false,"propsVisible":false,"fxVisible":false,"blueprintPropsVisible":false,"blueprintFxVisible":false}}}
 ```

 ## Phase 5.2 – Probe hygiene verification

 Probe check (clean state, no UI actions):
 - capture_method: xav-manual
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_sha256: 2526c68e85ea72655154e08d692db9d3d0c46de7b5edf812091f674f74b6fa0b
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
+
+## Phase 6a – MaterialLibrary
+
+Probe check (post-extraction):
+- capture_method: codex-mcp
+- url: http://localhost:8000/city-sim.html?refactorProbe=1
+- json_sha256: 2526c68e85ea72655154e08d692db9d3d0c46de7b5edf812091f674f74b6fa0b
+- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
+- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
+- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
diff --git a/city-sim.html b/city-sim.html
index 1ee96a2..60f929e 100644
--- a/city-sim.html
+++ b/city-sim.html
@@ -792,30 +792,31 @@
       loadFromStore as loadOverlayImageFromStore,
       getDataURL as getOverlayImageDataURL,
       getImageId as getOverlayImageId,
       getImageMeta as getOverlayImageMeta,
       setFromFile as setOverlayImageFromFile
     } from './src/scanner/ImageSource.js';
     import {
       createBlueprintPreviewGroups,
       buildBlueprintPreview,
       clearBlueprintPreview
     } from './src/render/BlueprintPreviewRenderer.js';
     import { createSceneManager } from './src/render/SceneManager.js';
     import { createLayerManager } from './src/render/LayerManager.js';
     import { createViewModeController } from './src/render/ViewModeController.js';
     import { createRenderLoop } from './src/render/RenderLoop.js';
+    import { getSharedWindowMaterials, getSharedWindowGeometry } from './src/render/MaterialLibrary.js';
@@ -832,52 +833,34 @@ const { LAYERS, BLUEPRINT_LAYERS, blueprintRootGroup, blueprintTraffic, ensureBl
 const ZONE_REGISTRY = {}; // name -> { zoneMesh, buildingGroup, props: [] }
@@
 const buildingWindowBatches = [];   // { lit: InstancedMesh, dark: InstancedMesh }
 const skyscraperWindowBatches = []; // { lit: InstancedMesh, dark: InstancedMesh }

 // Shared fast window materials (opaque = much cheaper than transparent Physical)
-const WINDOW_MATS = (() => {
-  const day = new THREE.MeshStandardMaterial({
-    color: 0x9cc9ff,
-    roughness: 0.25,
-    metalness: 0.0,
-    envMapIntensity: 1.0,
-    transparent: false
-  });
-
-  const nightLit = day.clone();
-  nightLit.emissive.setHex(0xffaa44);
-  nightLit.emissiveIntensity = 1.4;
-
-  const nightDark = day.clone();
-  nightDark.emissive.setHex(0x101020);
-  nightDark.emissiveIntensity = 0.08;
-
-  return { day, nightLit, nightDark };
-})();
+const WINDOW_MATS = getSharedWindowMaterials();

 // Shared window geometry (normal buildings)
-const WINDOW_GEO = new THREE.PlaneGeometry(3, 3 * 1.3);
+const WINDOW_GEO = getSharedWindowGeometry();
@@
 const _tmpObj = new THREE.Object3D();
 function makeInstanced(geo, mat, matrices) {
@@
 let windmillsGroup = null;
```

## Packet commit evidence (pre-commit)

### git diff --stat --cached
```
 docs/ai/review_packet_phase6a.md | 159 +++++++++++++++++++++++++++++++++++++++
 1 file changed, 159 insertions(+)
```

### git diff --check --cached
```
```
