# Phase 6d Review Packet — RoadLayer/RoadGenerator

## Metadata
- base_commit: 88dc9e4
- phase_end_commit: 2a8625b
- packet_commit: PENDING (self-reference; see git log section)

## Checklist (✅/⛔)
- ✅ Parity fields match baseline after readiness-gated probe
- ✅ RoadLayer/RoadGenerator extracted (verbatim wiring)
- ✅ No whitespace errors (git diff --check clean)
- ⛔ No further Phase 6x work beyond RoadLayer extraction

## Git Evidence (verbatim)
### git status -sb
```
## refactor/phase6d-road-layer-triage2
?? docs/ai/review_packet_phase6d.md
```

### git rev-parse --short HEAD
```
2a8625b
```

### git log --oneline --decorate -n 20
```
2a8625b (HEAD -> refactor/phase6d-road-layer-triage2) docs(phase6d): record decision hash + parity fields
5ee91fd refactor(phase6d): extract road generator + layer
01c319c docs(ai): update phase6d wip with rev3 triage evidence
88dc9e4 docs(ai): update phase6d wip with patch-applied drift
0fe1f6b docs(ai): update phase6d wip with clean-tree probe
5210325 (refactor/phase6d-road-layer) docs(probe): record probe hash volatility + decision hash
dcedc42 docs(ai): add phase6d WIP probe hash drift evidence
0274fb4 docs: track v7_rev3 plan; drop v7_rev2
3e0de09 (refactor/phase6c-zone-layer) docs(ai): add phase6c.1 alignment packet
dfdfbea docs(phase6c.1): align Phase 6c metadata
42403a6 docs(ai): add review packet for phase 6c
2b051a4 docs(phase6c): record probe baseline match
80d8446 refactor(phase6c): extract zone layer
cc7eb76 docs(phase6c): fix phase6b metadata note
f4f5e91 (refactor/phase6b-terrain-layer) docs(ai): add review packet for phase 6b
b932578 docs(phase6b): record probe baseline match
b3e269d refactor(phase6b): extract terrain generator/layer
a8d7fe8 (refactor/phase6a-material-library) docs(plan): replace refactor plan v7 rev1 with rev2
7e85b9f docs(ai): fix phase6a packet_commit
aaaf294 docs(ai): add review packet for phase 6a
```

### git diff --stat 88dc9e4...2a8625b
```
 REFACTOR_LOG.md                      | 11 +++++
 city-sim.html                        | 79 +++++-------------------------------
 docs/ai/review_packet_phase6d_wip.md | 46 +++++++++++++++++++++
 src/geometry/RoadGenerator.js        | 30 ++++++++++++++
 src/render/RoadLayer.js              | 53 ++++++++++++++++++++++++
 5 files changed, 150 insertions(+), 69 deletions(-)
```

### git diff --check 88dc9e4...2a8625b
```
```

### git diff -U15 88dc9e4...2a8625b -- $FOCUS_PATHS
```
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index d746ac5..7af2b01 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -97,15 +97,26 @@ Probe check (post-extraction):
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_sha256: 2526c68e85ea72655154e08d692db9d3d0c46de7b5edf812091f674f74b6fa0b
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }

 ## Phase 6d – Probe hash policy (triage)

 - capture_method: codex-mcp
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - full_sha256: c7bd5ec46ec368b72220071bedb9bc07fa29edcb66992c8701fe9ca14069c2ab
 - gate_sha256: 9e81fb032829d9398f8c3b61eb83027c56b3aee9f026cbdf6a5a6241d206a3c5
 - gate_fields: [sceneCounts, blueprintCounts, overlayDrift]
 - volatile_top_level_keys: []
 - note: full hash may vary; decision uses gate hash; counts matched baseline
+
+## Phase 6d – RoadLayer + RoadGenerator
+
+- branch: refactor/phase6d-road-layer-triage2
+- phase_end_commit: 5ee91fd
+- capture_method: codex-mcp (readiness gated)
+- url: http://localhost:8000/city-sim.html?refactorProbe=1
+- json_sha256: bbdb4df5a7f643db3dc66c09b8fba081f8c0efea33b134491d6ac94a0029374a
+- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
+- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
+- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
diff --git a/city-sim.html b/city-sim.html
index bcd9fba..c2c3ac6 100644
--- a/city-sim.html
+++ b/city-sim.html
@@ -795,30 +795,32 @@
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
     import { getSharedWindowMaterials, getSharedWindowGeometry } from './src/render/MaterialLibrary.js';
     import { createLegacyTerrain } from './src/render/TerrainLayer.js';
     import { buildLegacyTerrainDefs } from './src/terrain/TerrainGenerator.js';
+    import { createLegacyRoads } from './src/render/RoadLayer.js';
+    import { buildLegacyRoadDefs } from './src/geometry/RoadGenerator.js';
     import { createZoneMeshes } from './src/render/ZoneLayer.js';

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
@@ -3903,100 +3905,39 @@ function validateBlueprint(data) {

       // Platform markings (train tracks)
       const trackGeo = new THREE.BoxGeometry(width * 0.9, 0.2, 2);
       const trackMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
       for (let i = 0; i < 3; i++) {
         const track = new THREE.Mesh(trackGeo, trackMat);
         track.position.set(cx, 1.1, cz - depth/3 + i * depth/3);
         group.add(track);
       }

       return group;
     }

     // Create roads between zones
     function createRoads() {
-      const roadMat = new THREE.MeshStandardMaterial({
-        color: 0x404040,
-        roughness: 0.9
-      });
-
-      const sidewalkMat = new THREE.MeshStandardMaterial({
-        color: 0x707070,
-        roughness: 0.8
-      });
-
-      // Roads placed in gaps between zone boundaries (streets on map)
-      // Horizontal roads at zone boundaries
-      const hRoadPositions = [0.06, 0.12, 0.22, 0.32, 0.44, 0.56, 0.70, 0.76, 0.92];
-      // Vertical roads at zone boundaries
-      const vRoadPositions = [0.44, 0.50, 0.56, 0.62, 0.66, 0.72, 0.78, 0.82, 0.90];
-
-      // Shared dash geometry and material (reused for all roads)
-      const dashGeo = new THREE.BoxGeometry(15, 0.1, 0.5);
-      const dashMat = new THREE.MeshStandardMaterial({ color: 0xdddd44 });
-
-      // Create road segments that fill spaces between buildings
-      hRoadPositions.forEach(nz => {
-        const [, z] = toWorld(0.5, nz);
-        // Create road from coast to east edge
-        const [x1] = toWorld(0.40, 0);
-        const [x2] = toWorld(0.98, 0);
-
-        // Road surface
-        const roadGeo = new THREE.BoxGeometry(x2 - x1, 0.3, 12);
-        const road = new THREE.Mesh(roadGeo, roadMat);
-        road.position.set((x1 + x2) / 2, Y.roads, z);
-        road.receiveShadow = true;
-        road.material.polygonOffset = true;
-        road.material.polygonOffsetFactor = -1;
-        road.material.polygonOffsetUnits = -1;
-        LAYERS.roads.add(road);
-
-        // ✅ Instanced dashes: 1 draw call instead of 20+
-        const dashCount = 20;
-        const dashes = new THREE.InstancedMesh(dashGeo, dashMat, dashCount);
-        for (let i = 0; i < dashCount; i++) {
-          _tmpObj.position.set(x1 + 30 + i * 30, 1.05, z);
-          _tmpObj.rotation.set(0, 0, 0);
-          _tmpObj.updateMatrix();
-          dashes.setMatrixAt(i, _tmpObj.matrix);
-        }
-        dashes.instanceMatrix.needsUpdate = true;
-        dashes.castShadow = false;
-        dashes.receiveShadow = false;
-        LAYERS.roads.add(dashes);
-      });
-
-      vRoadPositions.forEach(nx => {
-        const [x] = toWorld(nx, 0);
-        const [, z1] = toWorld(0, 0.02);
-        const [, z2] = toWorld(0, 0.96);
-
-        // Road surface
-        const roadGeo = new THREE.BoxGeometry(12, 0.3, Math.abs(z2 - z1));
-        const road = new THREE.Mesh(roadGeo, roadMat);
-        road.position.set(x, Y.roads, (z1 + z2) / 2);
-        road.receiveShadow = true;
-        road.material.polygonOffset = true;
-        road.material.polygonOffsetFactor = -1;
-        road.material.polygonOffsetUnits = -1;
-        LAYERS.roads.add(road);
+      const roadDefs = buildLegacyRoadDefs({ toWorld });
+      createLegacyRoads({
+        layer: LAYERS.roads,
+        defs: roadDefs,
+        Y,
+        THREE,
+        tmpObj: _tmpObj,
+        createCars
       });
-
-      // Add some cars
-      createCars();
     }

     // Cars with headlights that drive on roads
     const cars = [];
     const warningLights = [];
     const marqueeLights = [];
     const CAR_ASSETS = {
       bodyGeo: null,
       roofGeo: null,
       wheelGeo: null,
       headlightGeo: null,
       wheelMat: null,
       headlightMat: null,
       tailMat: null,
       bodyMats: new Map()
diff --git a/src/geometry/RoadGenerator.js b/src/geometry/RoadGenerator.js
new file mode 100644
index 0000000..f7cb699
--- /dev/null
+++ b/src/geometry/RoadGenerator.js
@@ -0,0 +1,30 @@
+export function buildLegacyRoadDefs({ toWorld }) {
+  // Roads placed in gaps between zone boundaries (streets on map)
+  const hRoadPositions = [0.06, 0.12, 0.22, 0.32, 0.44, 0.56, 0.70, 0.76, 0.92];
+  const vRoadPositions = [0.44, 0.50, 0.56, 0.62, 0.66, 0.72, 0.78, 0.82, 0.90];
+
+  const hRoads = hRoadPositions.map((nz) => {
+    const [, z] = toWorld(0.5, nz);
+    const [x1] = toWorld(0.40, 0);
+    const [x2] = toWorld(0.98, 0);
+    return { x1, x2, z };
+  });
+
+  const vRoads = vRoadPositions.map((nx) => {
+    const [x] = toWorld(nx, 0);
+    const [, z1] = toWorld(0, 0.02);
+    const [, z2] = toWorld(0, 0.96);
+    return { x, z1, z2 };
+  });
+
+  return {
+    hRoads,
+    vRoads,
+    dashCount: 20,
+    dashOffset: 30,
+    dashSpacing: 30,
+    dashSize: { x: 15, y: 0.1, z: 0.5 },
+    roadHeight: 0.3,
+    roadWidth: 12
+  };
+}
diff --git a/src/render/RoadLayer.js b/src/render/RoadLayer.js
new file mode 100644
index 0000000..e579ee7
--- /dev/null
+++ b/src/render/RoadLayer.js
@@ -0,0 +1,53 @@
+export function createLegacyRoads({ layer, defs, Y, THREE, tmpObj, createCars }) {
+  const roadMat = new THREE.MeshStandardMaterial({
+    color: 0x404040,
+    roughness: 0.9
+  });
+
+  const sidewalkMat = new THREE.MeshStandardMaterial({
+    color: 0x707070,
+    roughness: 0.8
+  });
+
+  // Preserve unused material creation for parity
+  void sidewalkMat;
+
+  const dashGeo = new THREE.BoxGeometry(defs.dashSize.x, defs.dashSize.y, defs.dashSize.z);
+  const dashMat = new THREE.MeshStandardMaterial({ color: 0xdddd44 });
+
+  defs.hRoads.forEach((roadDef) => {
+    const roadGeo = new THREE.BoxGeometry(roadDef.x2 - roadDef.x1, defs.roadHeight, defs.roadWidth);
+    const road = new THREE.Mesh(roadGeo, roadMat);
+    road.position.set((roadDef.x1 + roadDef.x2) / 2, Y.roads, roadDef.z);
+    road.receiveShadow = true;
+    road.material.polygonOffset = true;
+    road.material.polygonOffsetFactor = -1;
+    road.material.polygonOffsetUnits = -1;
+    layer.add(road);
+
+    const dashes = new THREE.InstancedMesh(dashGeo, dashMat, defs.dashCount);
+    for (let i = 0; i < defs.dashCount; i++) {
+      tmpObj.position.set(roadDef.x1 + defs.dashOffset + i * defs.dashSpacing, 1.05, roadDef.z);
+      tmpObj.rotation.set(0, 0, 0);
+      tmpObj.updateMatrix();
+      dashes.setMatrixAt(i, tmpObj.matrix);
+    }
+    dashes.instanceMatrix.needsUpdate = true;
+    dashes.castShadow = false;
+    dashes.receiveShadow = false;
+    layer.add(dashes);
+  });
+
+  defs.vRoads.forEach((roadDef) => {
+    const roadGeo = new THREE.BoxGeometry(defs.roadWidth, defs.roadHeight, Math.abs(roadDef.z2 - roadDef.z1));
+    const road = new THREE.Mesh(roadGeo, roadMat);
+    road.position.set(roadDef.x, Y.roads, (roadDef.z1 + roadDef.z2) / 2);
+    road.receiveShadow = true;
+    road.material.polygonOffset = true;
+    road.material.polygonOffsetFactor = -1;
+    road.material.polygonOffsetUnits = -1;
+    layer.add(road);
+  });
+
+  createCars();
+}
```

## Guardrail Greps (verbatim)
### grep -nF "refactorProbe" city-sim.html
```
1073:    const probeEnabled = new URLSearchParams(location.search).has('refactorProbe');
1127:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

### grep -nF "import(./'tools/refactorProbe.js')" city-sim.html
```
1127:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

## Probe Summary (readiness-gated)
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- len: 3978
- json_sha256: bbdb4df5a7f643db3dc66c09b8fba081f8c0efea33b134491d6ac94a0029374a
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }

## Packet Commit Evidence (pre-commit)
### git diff --stat --cached
```
 docs/ai/review_packet_phase6d.md | 367 +++++++++++++++++++++++++++++++++++++++
 1 file changed, 367 insertions(+)
```

### git diff --check --cached
```
```
