# Phase 6f Review Packet

## Metadata
- branch: refactor/phase6f-props-debug
- base_commit: 5883f96
- phase_end_commit: 607c47c
- packet_commit: PENDING (self-reference; see git log)

## Phase checklist
- ✅ clean-tree readiness-gated probe matched baseline fields
- ✅ extracted PropsLayer + DebugLayer (no behavior change intended)
- ✅ city-sim.html wired to use PropsLayer for all props additions
- ✅ parity probe matched baseline after changes
- ✅ REFACTOR_LOG updated

## Evidence (fixed commands)

### git status -sb
```
## refactor/phase6f-props-debug
```

### git rev-parse --short HEAD
```
607c47c
```

### git log --oneline --decorate -n 20
```
607c47c (HEAD -> refactor/phase6f-props-debug) docs(phase6f): record readiness-gated probe
dd1b545 refactor(phase6f): extract props + debug layers
5883f96 (refactor/phase6e-building-layer) docs(ai): add review packet for phase 6e
7223a3b docs(phase6e): record probe baseline match
5508bec refactor(phase6e): extract building generator + layer
3f545a7 (refactor/phase6d-road-layer-triage2) docs(ai): add review packet for phase 6d
2a8625b docs(phase6d): record decision hash + parity fields
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
```

### git diff --stat 5883f96...607c47c
```
 REFACTOR_LOG.md          | 11 +++++++++++
 city-sim.html            | 41 +++++++++++++++++++++--------------------
 src/render/DebugLayer.js |  9 +++++++++
 src/render/PropsLayer.js |  9 +++++++++
 4 files changed, 50 insertions(+), 20 deletions(-)
```

### git diff --check 5883f96...607c47c
```
```

### git diff -U15 5883f96...607c47c -- $FOCUS_PATHS
```
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 965e09a..6edd6b0 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -119,15 +119,26 @@ Probe check (post-extraction):
 - json_sha256: bbdb4df5a7f643db3dc66c09b8fba081f8c0efea33b134491d6ac94a0029374a
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }

 ## Phase 6e – BuildingLayer + BuildingGenerator

 - branch: refactor/phase6e-building-layer
 - capture_method: codex-mcp (readiness gated)
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_len: 3978
 - json_sha256: bbdb4df5a7f643db3dc66c09b8fba081f8c0efea33b134491d6ac94a0029374a
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
+
+## Phase 6f – PropsLayer + DebugLayer
+
+- branch: refactor/phase6f-props-debug
+- capture_method: codex-mcp (readiness gated)
+- url: http://localhost:8000/city-sim.html?refactorProbe=1
+- json_len: 3978
+- json_sha256: bbdb4df5a7f643db3dc66c09b8fba081f8c0efea33b134491d6ac94a0029374a
+- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
+- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
+- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
diff --git a/city-sim.html b/city-sim.html
index 711807c..6c80743 100644
--- a/city-sim.html
+++ b/city-sim.html
@@ -800,30 +800,31 @@
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
     import { createLegacyRoads } from './src/render/RoadLayer.js';
     import { buildLegacyRoadDefs } from './src/geometry/RoadGenerator.js';
     import { buildLegacyBuildingDefs } from './src/geometry/BuildingGenerator.js';
     import { createLegacyBuildings } from './src/render/BuildingLayer.js';
     import { createZoneMeshes } from './src/render/ZoneLayer.js';
+    import { addProp } from './src/render/PropsLayer.js';
@@ -3390,31 +3391,31 @@ function validateBlueprint(data) {
       createParkTrees();
       if (zoneByName.islandJ) {
         const [px, pz] = worldCentroid(zoneByName.islandJ.userData.points);
         createPondAt(px, pz);
       }
       createRoads();
       createStreetLamps();
       createElectricPylons();
       createWaterTreatment();

       // Ferris wheel in fairground (colFf zone is at 0.44-0.50, 0.75-0.85)
       if (zoneByName.colFf) {
         const [ffX, ffZ] = worldCentroid(zoneByName.colFf.userData.points);
         const ferrisWheel = createFerrisWheel(ffX, ffZ);
         ferrisWheel.name = 'ferrisWheel';
-        LAYERS.props.add(ferrisWheel);
+        addProp(LAYERS.props, ferrisWheel);
         ferrisWheelRef = ferrisWheel;  // Cache reference
       }
@@ -3504,135 +3505,135 @@ function validateBlueprint(data) {
-      LAYERS.props.add(bridgeGroup);
+      addProp(LAYERS.props, bridgeGroup);
@@
-      LAYERS.props.add(crossGroup);
+      addProp(LAYERS.props, crossGroup);
@@
-      LAYERS.props.add(field);
+      addProp(LAYERS.props, field);
@@
-      LAYERS.props.add(track);
+      addProp(LAYERS.props, track);
@@
-        LAYERS.props.add(seat);
+        addProp(LAYERS.props, seat);
@@
-      LAYERS.props.add(windmillGroup);
+      addProp(LAYERS.props, windmillGroup);
@@
-        LAYERS.props.add(metro);
+        addProp(LAYERS.props, metro);
@@
-          LAYERS.props.add(tree);
+          addProp(LAYERS.props, tree);
@@
-        LAYERS.props.add(car);
+        addProp(LAYERS.props, car);
@@
-        LAYERS.props.add(lamp);
+        addProp(LAYERS.props, lamp);
@@
-        LAYERS.props.add(pylon);
+        addProp(LAYERS.props, pylon);
@@
-        LAYERS.props.add(tank);
+        addProp(LAYERS.props, tank);
@@
-        LAYERS.props.add(water);
+        addProp(LAYERS.props, water);
@@
-      LAYERS.props.add(pond);
+      addProp(LAYERS.props, pond);
@@
-      LAYERS.props.add(dock1);
+      addProp(LAYERS.props, dock1);
@@
-      LAYERS.props.add(dock2);
+      addProp(LAYERS.props, dock2);
@@
-      LAYERS.props.add(dock3);
+      addProp(LAYERS.props, dock3);
@@
-        LAYERS.props.add(boat);
+        addProp(LAYERS.props, boat);
@@
-        LAYERS.props.add(star);
+        addProp(LAYERS.props, star);
*** End Patch
```

### Guardrail greps
```
1075:    const probeEnabled = new URLSearchParams(location.search).has('refactorProbe');
1129:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```
```
1129:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

## Probe summary
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- readiness: { roads: 2, zones: 1, coastlines: 1, pois: 1 }
- len: 3978
- sha256: bbdb4df5a7f643db3dc66c09b8fba081f8c0efea33b134491d6ac94a0029374a
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }

## Packet staging evidence (pre-commit)
```
docs/ai/review_packet_phase6f.md | 224 +++++++++++++++++++++++++++++++++++++++
1 file changed, 224 insertions(+)
```
```
(no output)
```
