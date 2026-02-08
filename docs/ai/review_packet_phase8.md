# Review Packet — Phase 8

## Metadata
- branch: `refactor/phase8-traffic-system`
- base_commit: `84bc767`
- phase_end_commit: `aa5b414`
- packet_commit: `PENDING` (self-reference; see git log)
- focus_paths: `city-sim.html src/sim/TrafficSystem.js REFACTOR_LOG.md docs/ai/review_packet_phase8.md`

## Determinism
```bash
rg=1
```

## Probe Gate Checks
```bash
1091:    const probeEnabled = new URLSearchParams(location.search).has('refactorProbe');
1145:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

```bash
1145:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

## Fixed Command Outputs (Verbatim)
```bash
## refactor/phase8-traffic-system
```

```bash
aa5b414
```

```bash
aa5b414 (HEAD -> refactor/phase8-traffic-system) docs(phase8): record readiness-gated probe
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
957d3ea docs(phase7c): record readiness-gated probe
dab5f8f refactor(phase7c): extract editor snap engine
483707c (refactor/phase7b_1-log-metadata) docs(ai): add review packet for phase 7b_1
0ead366 docs(phase7b_1): fix phase7b log metadata
7dfb487 (refactor/phase7b-editor-history-manager) docs(ai): add review packet for phase 7b
```

## Audit Evidence (`84bc767...aa5b414`)
```bash
 REFACTOR_LOG.md          |  15 +++++
 city-sim.html            | 146 +++++--------------------------------------
 src/sim/TrafficSystem.js | 158 +++++++++++++++++++++++++++++++++++++++++++++++
 3 files changed, 187 insertions(+), 132 deletions(-)
```

```bash
(no output)
```

```bash
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 0c1de12..51dc77d 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -214,15 +214,30 @@ Probe check (post-extraction):

 ## Phase 7e – Editor InputRouter + HitTest + Gestures extraction

 - branch: refactor/phase7e-input-router-hit-test-gestures
 - base_commit: c920af7
 - phase_end_commit: e857692
 - packet_commit: 03cb9a0
 - capture_method: codex-mcp (readiness gated)
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_len: 3978
 - json_sha256: c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
 - rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }
+
+## Phase 8 – TrafficSystem extraction
+
+- branch: refactor/phase8-traffic-system
+- base_commit: 84bc767
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
index a5b3ad5..ba4d9b8 100644
--- a/city-sim.html
+++ b/city-sim.html
@@ -801,30 +801,31 @@
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
+    import { createTrafficSystem } from './src/sim/TrafficSystem.js';
     import { createEditorRebuildScheduler } from './src/editor/RebuildScheduler.js';
     import { createEditorHistoryManager } from './src/editor/HistoryManager.js';
     import { createEditorSnapEngine } from './src/editor/SnapEngine.js';
     import { createEditorController } from './src/editor/EditorController.js';
     import { createEditorHitTest } from './src/editor/HitTest.js';
     import { createEditorInputRouter } from './src/editor/InputRouter.js';
     import { createEditorGestures } from './src/editor/Gestures.js';

     // ============================================
     // CONFIGURATION
     // ============================================


     // ============================================
     // SCENE SETUP
@@ -968,30 +969,31 @@ const editorHistory = {
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
+  let trafficSystem = null;

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
@@ -3918,175 +3920,55 @@ function validateBlueprint(data) {

     // Create roads between zones
     function createRoads() {
       const roadDefs = buildLegacyRoadDefs({ toWorld });
       createLegacyRoads({
         layer: LAYERS.roads,
         defs: roadDefs,
         Y,
         THREE,
         tmpObj: _tmpObj,
         createCars
       });
     }

     // Cars with headlights that drive on roads
-    const cars = [];
     const warningLights = [];
     const marqueeLights = [];
-    const CAR_ASSETS = {
-      bodyGeo: null,
-      roofGeo: null,
-      wheelGeo: null,
-      headlightGeo: null,
-      wheelMat: null,
-      headlightMat: null,
-      tailMat: null,
-      bodyMats: new Map()
-    };
-
-    function getSharedCarAssets() {
-      if (!CAR_ASSETS.bodyGeo) {
-        CAR_ASSETS.bodyGeo = new THREE.BoxGeometry(8, 3, 4);
-        CAR_ASSETS.bodyGeo.userData.shared = true;
-        CAR_ASSETS.roofGeo = new THREE.BoxGeometry(4, 2, 3.5);
-        CAR_ASSETS.roofGeo.userData.shared = true;
-        CAR_ASSETS.wheelGeo = new THREE.CylinderGeometry(1, 1, 0.5, 12);
-        CAR_ASSETS.wheelGeo.userData.shared = true;
-        CAR_ASSETS.headlightGeo = new THREE.SphereGeometry(0.4, 8, 8);
-        CAR_ASSETS.headlightGeo.userData.shared = true;
-        CAR_ASSETS.wheelMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
-        CAR_ASSETS.wheelMat.userData.shared = true;
-        CAR_ASSETS.headlightMat = new THREE.MeshStandardMaterial({
-          color: 0xffffcc,
-          emissive: 0xffffcc,
-          emissiveIntensity: 0.5
-        });
-        CAR_ASSETS.headlightMat.userData.shared = true;
-        CAR_ASSETS.tailMat = new THREE.MeshStandardMaterial({
-          color: 0xff0000,
-          emissive: 0xff0000,
-          emissiveIntensity: 0.3
+    function ensureTrafficSystem() {
+      if (!trafficSystem) {
+        trafficSystem = createTrafficSystem({
+          THREE,
+          addProp,
+          propsLayer: LAYERS.props,
+          toWorld,
+          headlights
         });
-        CAR_ASSETS.tailMat.userData.shared = true;
       }
-      return CAR_ASSETS;
-    }
-
-    function getCarBodyMaterial(color) {
-      const assets = getSharedCarAssets();
-      if (assets.bodyMats.has(color)) return assets.bodyMats.get(color);
-      const mat = new THREE.MeshStandardMaterial({
-        color,
-        metalness: 0.6,
-        roughness: 0.4
-      });
-      mat.userData.shared = true;
-      assets.bodyMats.set(color, mat);
-      return mat;
+      return trafficSystem;
     }

     function createCars() {
-      // Create several cars on different roads
-      const carSpecs = [
-        { nx: 0.45, nz: 0.22, dir: 1, speed: 0.3, color: 0xff3333 },
-        { nx: 0.55, nz: 0.44, dir: -1, speed: 0.25, color: 0x3333ff },
-        { nx: 0.75, nz: 0.56, dir: 1, speed: 0.35, color: 0x33ff33 },
-        { nx: 0.85, nz: 0.32, dir: -1, speed: 0.28, color: 0xffff33 },
-        { nx: 0.60, nz: 0.70, dir: 1, speed: 0.32, color: 0xff33ff },
-        { nx: 0.50, nz: 0.06, dir: 1, speed: 0.22, color: 0x33ffff },
-      ];
-
-      carSpecs.forEach(spec => {
-        const car = createCar(spec.color);
-        const [x, z] = toWorld(spec.nx, spec.nz);
-        car.position.set(x, 1.5, z);
-        car.userData.direction = spec.dir;
-        car.userData.speed = spec.speed;
-        car.userData.roadZ = z;
-        car.userData.minX = toWorld(0.42, 0)[0];
-        car.userData.maxX = toWorld(0.95, 0)[0];
-        if (spec.dir < 0) car.rotation.y = Math.PI;
-        addProp(LAYERS.props, car);
-        cars.push(car);
-      });
+      ensureTrafficSystem().createCars();
     }

     function createCar(color, options = {}) {
-      const group = new THREE.Group();
-      const isBlueprintCar = !!options.blueprintTraffic;
-      const assets = getSharedCarAssets();
-
-      // Car body
-      const bodyMat = getCarBodyMaterial(color);
-      const body = new THREE.Mesh(assets.bodyGeo, bodyMat);
-      body.position.y = 1.5;
-      body.castShadow = true;
-      group.add(body);
-
-      // Car roof
-      const roof = new THREE.Mesh(assets.roofGeo, bodyMat);
-      roof.position.set(-0.5, 3.5, 0);
-      roof.castShadow = true;
-      group.add(roof);
-
-      // Wheels
-      const wheelPositions = [
-        [2.5, 0.5, 2.2], [2.5, 0.5, -2.2],
-        [-2.5, 0.5, 2.2], [-2.5, 0.5, -2.2]
-      ];
-      wheelPositions.forEach(([x, y, z]) => {
-        const wheel = new THREE.Mesh(assets.wheelGeo, assets.wheelMat);
-        wheel.position.set(x, y, z);
-        wheel.rotation.x = Math.PI / 2;
-        wheel.castShadow = false;  // Decorative - no shadow
-        group.add(wheel);
-      });
-
-      // Headlights (front)
-      const hl1 = new THREE.Mesh(assets.headlightGeo, assets.headlightMat);
-      const hl2 = new THREE.Mesh(assets.headlightGeo, assets.headlightMat);
-      hl1.position.set(4.1, 1.5, 1.2);
-      hl2.position.set(4.1, 1.5, -1.2);
-      hl1.userData.isHeadlight = true;
-      hl2.userData.isHeadlight = true;
-      hl1.userData.blueprintTraffic = isBlueprintCar;
-      hl2.userData.blueprintTraffic = isBlueprintCar;
-      group.add(hl1, hl2);
-      headlights.push(hl1, hl2);
-
-      // Taillights (back)
-      const tl1 = new THREE.Mesh(assets.headlightGeo, assets.tailMat);
-      const tl2 = new THREE.Mesh(assets.headlightGeo, assets.tailMat);
-      tl1.position.set(-4.1, 1.5, 1.2);
-      tl2.position.set(-4.1, 1.5, -1.2);
-      group.add(tl1, tl2);
-
-      return group;
+      return ensureTrafficSystem().createCar(color, options);
     }

     function animateCars() {
-      cars.forEach(car => {
-        car.position.x += car.userData.direction * car.userData.speed;
-
-        // Wrap around when reaching road ends
-        if (car.position.x > car.userData.maxX) {
-          car.position.x = car.userData.minX;
-        } else if (car.position.x < car.userData.minX) {
-          car.position.x = car.userData.maxX;
-        }
-      });
+      ensureTrafficSystem().animateCars();
     }

     // Create street lamps
     function createStreetLamps() {
       const lampPositions = [];

       // Along main roads
       for (let x = 0.42; x < 0.95; x += 0.08) {
         lampPositions.push([x, 0.06], [x, 0.28], [x, 0.56]);
       }

       lampPositions.forEach(pos => {
         const [x, z] = toWorld(pos[0], pos[1]);
         const lamp = createStreetLamp();
         lamp.position.set(x, 0, z);
diff --git a/src/sim/TrafficSystem.js b/src/sim/TrafficSystem.js
new file mode 100644
index 0000000..d16b4a5
--- /dev/null
+++ b/src/sim/TrafficSystem.js
@@ -0,0 +1,158 @@
+export function createTrafficSystem({
+  THREE,
+  addProp,
+  propsLayer,
+  toWorld,
+  headlights
+}) {
+  const cars = [];
+  const CAR_ASSETS = {
+    bodyGeo: null,
+    roofGeo: null,
+    wheelGeo: null,
+    headlightGeo: null,
+    wheelMat: null,
+    headlightMat: null,
+    tailMat: null,
+    bodyMats: new Map()
+  };
+
+  function getSharedCarAssets() {
+    if (!CAR_ASSETS.bodyGeo) {
+      CAR_ASSETS.bodyGeo = new THREE.BoxGeometry(8, 3, 4);
+      CAR_ASSETS.bodyGeo.userData.shared = true;
+      CAR_ASSETS.roofGeo = new THREE.BoxGeometry(4, 2, 3.5);
+      CAR_ASSETS.roofGeo.userData.shared = true;
+      CAR_ASSETS.wheelGeo = new THREE.CylinderGeometry(1, 1, 0.5, 12);
+      CAR_ASSETS.wheelGeo.userData.shared = true;
+      CAR_ASSETS.headlightGeo = new THREE.SphereGeometry(0.4, 8, 8);
+      CAR_ASSETS.headlightGeo.userData.shared = true;
+      CAR_ASSETS.wheelMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
+      CAR_ASSETS.wheelMat.userData.shared = true;
+      CAR_ASSETS.headlightMat = new THREE.MeshStandardMaterial({
+        color: 0xffffcc,
+        emissive: 0xffffcc,
+        emissiveIntensity: 0.5
+      });
+      CAR_ASSETS.headlightMat.userData.shared = true;
+      CAR_ASSETS.tailMat = new THREE.MeshStandardMaterial({
+        color: 0xff0000,
+        emissive: 0xff0000,
+        emissiveIntensity: 0.3
+      });
+      CAR_ASSETS.tailMat.userData.shared = true;
+    }
+    return CAR_ASSETS;
+  }
+
+  function getCarBodyMaterial(color) {
+    const assets = getSharedCarAssets();
+    if (assets.bodyMats.has(color)) return assets.bodyMats.get(color);
+    const mat = new THREE.MeshStandardMaterial({
+      color,
+      metalness: 0.6,
+      roughness: 0.4
+    });
+    mat.userData.shared = true;
+    assets.bodyMats.set(color, mat);
+    return mat;
+  }
+
+  function createCar(color, options = {}) {
+    const group = new THREE.Group();
+    const isBlueprintCar = !!options.blueprintTraffic;
+    const assets = getSharedCarAssets();
+
+    // Car body
+    const bodyMat = getCarBodyMaterial(color);
+    const body = new THREE.Mesh(assets.bodyGeo, bodyMat);
+    body.position.y = 1.5;
+    body.castShadow = true;
+    group.add(body);
+
+    // Car roof
+    const roof = new THREE.Mesh(assets.roofGeo, bodyMat);
+    roof.position.set(-0.5, 3.5, 0);
+    roof.castShadow = true;
+    group.add(roof);
+
+    // Wheels
+    const wheelPositions = [
+      [2.5, 0.5, 2.2], [2.5, 0.5, -2.2],
+      [-2.5, 0.5, 2.2], [-2.5, 0.5, -2.2]
+    ];
+    wheelPositions.forEach(([x, y, z]) => {
+      const wheel = new THREE.Mesh(assets.wheelGeo, assets.wheelMat);
+      wheel.position.set(x, y, z);
+      wheel.rotation.x = Math.PI / 2;
+      wheel.castShadow = false;  // Decorative - no shadow
+      group.add(wheel);
+    });
+
+    // Headlights (front)
+    const hl1 = new THREE.Mesh(assets.headlightGeo, assets.headlightMat);
+    const hl2 = new THREE.Mesh(assets.headlightGeo, assets.headlightMat);
+    hl1.position.set(4.1, 1.5, 1.2);
+    hl2.position.set(4.1, 1.5, -1.2);
+    hl1.userData.isHeadlight = true;
+    hl2.userData.isHeadlight = true;
+    hl1.userData.blueprintTraffic = isBlueprintCar;
+    hl2.userData.blueprintTraffic = isBlueprintCar;
+    group.add(hl1, hl2);
+    headlights.push(hl1, hl2);
+
+    // Taillights (back)
+    const tl1 = new THREE.Mesh(assets.headlightGeo, assets.tailMat);
+    const tl2 = new THREE.Mesh(assets.headlightGeo, assets.tailMat);
+    tl1.position.set(-4.1, 1.5, 1.2);
+    tl2.position.set(-4.1, 1.5, -1.2);
+    group.add(tl1, tl2);
+
+    return group;
+  }
+
+  function createCars() {
+    // Create several cars on different roads
+    const carSpecs = [
+      { nx: 0.45, nz: 0.22, dir: 1, speed: 0.3, color: 0xff3333 },
+      { nx: 0.55, nz: 0.44, dir: -1, speed: 0.25, color: 0x3333ff },
+      { nx: 0.75, nz: 0.56, dir: 1, speed: 0.35, color: 0x33ff33 },
+      { nx: 0.85, nz: 0.32, dir: -1, speed: 0.28, color: 0xffff33 },
+      { nx: 0.60, nz: 0.70, dir: 1, speed: 0.32, color: 0xff33ff },
+      { nx: 0.50, nz: 0.06, dir: 1, speed: 0.22, color: 0x33ffff },
+    ];
+
+    carSpecs.forEach(spec => {
+      const car = createCar(spec.color);
+      const [x, z] = toWorld(spec.nx, spec.nz);
+      car.position.set(x, 1.5, z);
+      car.userData.direction = spec.dir;
+      car.userData.speed = spec.speed;
+      car.userData.roadZ = z;
+      car.userData.minX = toWorld(0.42, 0)[0];
+      car.userData.maxX = toWorld(0.95, 0)[0];
+      if (spec.dir < 0) car.rotation.y = Math.PI;
+      addProp(propsLayer, car);
+      cars.push(car);
+    });
+  }
+
+  function animateCars() {
+    cars.forEach(car => {
+      car.position.x += car.userData.direction * car.userData.speed;
+
+      // Wrap around when reaching road ends
+      if (car.position.x > car.userData.maxX) {
+        car.position.x = car.userData.minX;
+      } else if (car.position.x < car.userData.minX) {
+        car.position.x = car.userData.maxX;
+      }
+    });
+  }
+
+  return {
+    createCar,
+    createCars,
+    animateCars
+  };
+}
```

## Pinned New Module Contents
```bash
export function createTrafficSystem({
  THREE,
  addProp,
  propsLayer,
  toWorld,
  headlights
}) {
  const cars = [];
  const CAR_ASSETS = {
    bodyGeo: null,
    roofGeo: null,
    wheelGeo: null,
    headlightGeo: null,
    wheelMat: null,
    headlightMat: null,
    tailMat: null,
    bodyMats: new Map()
  };

  function getSharedCarAssets() {
    if (!CAR_ASSETS.bodyGeo) {
      CAR_ASSETS.bodyGeo = new THREE.BoxGeometry(8, 3, 4);
      CAR_ASSETS.bodyGeo.userData.shared = true;
      CAR_ASSETS.roofGeo = new THREE.BoxGeometry(4, 2, 3.5);
      CAR_ASSETS.roofGeo.userData.shared = true;
      CAR_ASSETS.wheelGeo = new THREE.CylinderGeometry(1, 1, 0.5, 12);
      CAR_ASSETS.wheelGeo.userData.shared = true;
      CAR_ASSETS.headlightGeo = new THREE.SphereGeometry(0.4, 8, 8);
      CAR_ASSETS.headlightGeo.userData.shared = true;
      CAR_ASSETS.wheelMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
      CAR_ASSETS.wheelMat.userData.shared = true;
      CAR_ASSETS.headlightMat = new THREE.MeshStandardMaterial({
        color: 0xffffcc,
        emissive: 0xffffcc,
        emissiveIntensity: 0.5
      });
      CAR_ASSETS.headlightMat.userData.shared = true;
      CAR_ASSETS.tailMat = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        emissive: 0xff0000,
        emissiveIntensity: 0.3
      });
      CAR_ASSETS.tailMat.userData.shared = true;
    }
    return CAR_ASSETS;
  }

  function getCarBodyMaterial(color) {
    const assets = getSharedCarAssets();
    if (assets.bodyMats.has(color)) return assets.bodyMats.get(color);
    const mat = new THREE.MeshStandardMaterial({
      color,
      metalness: 0.6,
      roughness: 0.4
    });
    mat.userData.shared = true;
    assets.bodyMats.set(color, mat);
    return mat;
  }

  function createCar(color, options = {}) {
    const group = new THREE.Group();
    const isBlueprintCar = !!options.blueprintTraffic;
    const assets = getSharedCarAssets();

    // Car body
    const bodyMat = getCarBodyMaterial(color);
    const body = new THREE.Mesh(assets.bodyGeo, bodyMat);
    body.position.y = 1.5;
    body.castShadow = true;
    group.add(body);

    // Car roof
    const roof = new THREE.Mesh(assets.roofGeo, bodyMat);
    roof.position.set(-0.5, 3.5, 0);
    roof.castShadow = true;
    group.add(roof);

    // Wheels
    const wheelPositions = [
      [2.5, 0.5, 2.2], [2.5, 0.5, -2.2],
      [-2.5, 0.5, 2.2], [-2.5, 0.5, -2.2]
    ];
    wheelPositions.forEach(([x, y, z]) => {
      const wheel = new THREE.Mesh(assets.wheelGeo, assets.wheelMat);
      wheel.position.set(x, y, z);
      wheel.rotation.x = Math.PI / 2;
      wheel.castShadow = false;  // Decorative - no shadow
      group.add(wheel);
    });

    // Headlights (front)
    const hl1 = new THREE.Mesh(assets.headlightGeo, assets.headlightMat);
    const hl2 = new THREE.Mesh(assets.headlightGeo, assets.headlightMat);
    hl1.position.set(4.1, 1.5, 1.2);
    hl2.position.set(4.1, 1.5, -1.2);
    hl1.userData.isHeadlight = true;
    hl2.userData.isHeadlight = true;
    hl1.userData.blueprintTraffic = isBlueprintCar;
    hl2.userData.blueprintTraffic = isBlueprintCar;
    group.add(hl1, hl2);
    headlights.push(hl1, hl2);

    // Taillights (back)
    const tl1 = new THREE.Mesh(assets.headlightGeo, assets.tailMat);
    const tl2 = new THREE.Mesh(assets.headlightGeo, assets.tailMat);
    tl1.position.set(-4.1, 1.5, 1.2);
    tl2.position.set(-4.1, 1.5, -1.2);
    group.add(tl1, tl2);

    return group;
  }

  function createCars() {
    // Create several cars on different roads
    const carSpecs = [
      { nx: 0.45, nz: 0.22, dir: 1, speed: 0.3, color: 0xff3333 },
      { nx: 0.55, nz: 0.44, dir: -1, speed: 0.25, color: 0x3333ff },
      { nx: 0.75, nz: 0.56, dir: 1, speed: 0.35, color: 0x33ff33 },
      { nx: 0.85, nz: 0.32, dir: -1, speed: 0.28, color: 0xffff33 },
      { nx: 0.60, nz: 0.70, dir: 1, speed: 0.32, color: 0xff33ff },
      { nx: 0.50, nz: 0.06, dir: 1, speed: 0.22, color: 0x33ffff },
    ];

    carSpecs.forEach(spec => {
      const car = createCar(spec.color);
      const [x, z] = toWorld(spec.nx, spec.nz);
      car.position.set(x, 1.5, z);
      car.userData.direction = spec.dir;
      car.userData.speed = spec.speed;
      car.userData.roadZ = z;
      car.userData.minX = toWorld(0.42, 0)[0];
      car.userData.maxX = toWorld(0.95, 0)[0];
      if (spec.dir < 0) car.rotation.y = Math.PI;
      addProp(propsLayer, car);
      cars.push(car);
    });
  }

  function animateCars() {
    cars.forEach(car => {
      car.position.x += car.userData.direction * car.userData.speed;

      // Wrap around when reaching road ends
      if (car.position.x > car.userData.maxX) {
        car.position.x = car.userData.minX;
      } else if (car.position.x < car.userData.minX) {
        car.position.x = car.userData.maxX;
      }
    });
  }

  return {
    createCar,
    createCars,
    animateCars
  };
}
```

## Probe Summary (Readiness-Gated)
- url: `http://localhost:8000/city-sim.html?refactorProbe=1`
- REFACTOR_PROBE_LEN: `3977`
- REFACTOR_PROBE_SHA256: `ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d`
- sceneCounts: `{ meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }`
- blueprintCounts: `{ beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }`
- overlayDrift: `{ ok: true, epsPx: 0.05, maxDriftPx: 0 }`
- rendererInfo: `{ memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }`
- parity gate: `PASS` (tracked fields unchanged)

## Carry-Forward
- P0: none.
- P1: `REFACTOR_LOG.md` Phase 8 metadata still has `phase_end_commit: PENDING` and `packet_commit: PENDING`.
  - locator: `REFACTOR_LOG.md` (Phase 8 block).
  - acceptance: replace with concrete SHAs in next docs-only hygiene phase.
- P2: packet commit self-reference left as `PENDING`.
  - locator: this packet metadata.
  - acceptance: rely on `git log` as authoritative per workflow.

## Packet Commit Evidence (Pre-Commit, Verbatim)
```bash
 docs/ai/review_packet_phase8.md | 715 ++++++++++++++++++++++++++++++++++++++++
 1 file changed, 715 insertions(+)
```

```bash
(no output)
```
