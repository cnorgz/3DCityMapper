# Phase 6e Review Packet

## Metadata
- branch: refactor/phase6e-building-layer
- base_commit: 3f545a7
- phase_end_commit: 7223a3b
- packet_commit: PENDING (self-reference; see git log)

## Phase checklist
- ✅ readiness-gated baseline probe run (pre-change) and matched baseline fields
- ✅ building generation extracted to BuildingGenerator + BuildingLayer
- ✅ city-sim.html wired to new modules (verbatim behavior)
- ✅ post-change probe matched baseline fields
- ✅ REFACTOR_LOG updated

## Evidence (fixed commands)

### git status -sb
```
## refactor/phase6e-building-layer
```

### git rev-parse --short HEAD
```
7223a3b
```

### git log --oneline --decorate -n 20
```
7223a3b (HEAD -> refactor/phase6e-building-layer) docs(phase6e): record probe baseline match
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
f4f5e91 (refactor/phase6b-terrain-layer) docs(ai): add review packet for phase 6b
b932578 docs(phase6b): record probe baseline match
b3e269d refactor(phase6b): extract terrain generator/layer
```

### git diff --stat 3f545a7...7223a3b
```
 REFACTOR_LOG.md                   | 11 +++++++++++
 city-sim.html                     | 35 +++++++++++------------------------
 src/geometry/BuildingGenerator.js | 22 ++++++++++++++++++++++
 src/render/BuildingLayer.js       | 24 ++++++++++++++++++++++++
 4 files changed, 68 insertions(+), 24 deletions(-)
```

### git diff --check 3f545a7...7223a3b
```
```

### git diff -U15 3f545a7...7223a3b -- $FOCUS_PATHS
```
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 7af2b01..965e09a 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -108,15 +108,26 @@ Probe check (post-extraction):
 - gate_sha256: 9e81fb032829d9398f8c3b61eb83027c56b3aee9f026cbdf6a5a6241d206a3c5
 - gate_fields: [sceneCounts, blueprintCounts, overlayDrift]
 - volatile_top_level_keys: []
 - note: full hash may vary; decision uses gate hash; counts matched baseline

 ## Phase 6d – RoadLayer + RoadGenerator

 - branch: refactor/phase6d-road-layer-triage2
 - phase_end_commit: 5ee91fd
 - capture_method: codex-mcp (readiness gated)
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_sha256: bbdb4df5a7f643db3dc66c09b8fba081f8c0efea33b134491d6ac94a0029374a
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
+
+## Phase 6e – BuildingLayer + BuildingGenerator
+
+- branch: refactor/phase6e-building-layer
+- capture_method: codex-mcp (readiness gated)
+- url: http://localhost:8000/city-sim.html?refactorProbe=1
+- json_len: 3978
+- json_sha256: bbdb4df5a7f643db3dc66c09b8fba081f8c0efea33b134491d6ac94a0029374a
+- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
+- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
+- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
diff --git a/city-sim.html b/city-sim.html
index c2c3ac6..711807c 100644
--- a/city-sim.html
+++ b/city-sim.html
@@ -797,30 +797,32 @@
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
     import { createLegacyRoads } from './src/render/RoadLayer.js';
     import { buildLegacyRoadDefs } from './src/geometry/RoadGenerator.js';
+    import { buildLegacyBuildingDefs } from './src/geometry/BuildingGenerator.js';
+    import { createLegacyBuildings } from './src/render/BuildingLayer.js';
     import { createZoneMeshes } from './src/render/ZoneLayer.js';
@@ -3351,54 +3353,39 @@ function validateBlueprint(data) {
         mairie: 30,
         hotel: 50,
         stadium: 15,
         transport: 20,
         cinema: 25,
         fairground: 10,
         port: 0,
         rubbish: 8,
         electric: 0,
         water: 0,
         skyscraper: 120,
         other: 20
       };

       const zoneByName = Object.fromEntries(zones.map(z => [z.name, z]));
-
-      zones.forEach(zoneMesh => {
-        const data = zoneMesh.userData;
-        // Skip zones that don't need buildings or have custom implementations
-        if (!data.type || data.type === 'garden' || data.type === 'port' || data.type === 'stadium' || data.type === 'skyscraper') return;
-
-        // Use height from zone data if available, otherwise use type default
-        let height = data.height !== undefined ? data.height : (heights[data.type] || 20);
-
-        // Skip if height is 0 or very small
-        if (height < 5) return;
-
-        // Create building group with attached windows
-        const buildingGroup = createBuildingWithWindows(data.points, data.color, height, data.type);
-        buildingGroup.name = zoneMesh.name + '_building';
-        buildingGroup.userData = data;
-        buildingGroup.position.y = Y.buildings;
-        LAYERS.buildings.add(buildingGroup);
-        buildings.push(buildingGroup);
-        buildingGroups.push(buildingGroup);
-
-        // Update registry
-        const entry = ZONE_REGISTRY[zoneMesh.name];
-        if (entry) entry.buildingGroup = buildingGroup;
+      const buildingDefs = buildLegacyBuildingDefs({ zones, heights });
+      createLegacyBuildings({
+        layer: LAYERS.buildings,
+        defs: buildingDefs,
+        createBuildingWithWindows,
+        buildings,
+        buildingGroups,
+        registry: ZONE_REGISTRY,
+        Y
       });

       // Special buildings driven by zone centroids when available
       if (zoneByName.hospital) {
         const [hx, hz] = worldCentroid(zoneByName.hospital.userData.points);
         createHospitalCrossAt(hx, hz);
       }
       if (zoneByName.stadium) {
         const [sx, sz] = worldCentroid(zoneByName.stadium.userData.points);
         createStadiumDetailsAt(sx, sz);
       }
       createWindmills();
       createMetroStations();
       createParkTrees();
       if (zoneByName.islandJ) {
@@ -3440,15 +3427,12 @@ function validateBlueprint(data) {
 diff --git a/src/geometry/BuildingGenerator.js b/src/geometry/BuildingGenerator.js
 new file mode 100644
 index 0000000..37c1383
 --- /dev/null
 +++ b/src/geometry/BuildingGenerator.js
 @@ -0,0 +1,22 @@
 +export function buildLegacyBuildingDefs({ zones, heights }) {
 +  const buildable = [];
 +
 +  zones.forEach(zoneMesh => {
 +    const data = zoneMesh.userData;
 +    if (!data.type || data.type === 'garden' || data.type === 'port' || data.type === 'stadium' || data.type === 'skyscraper') return;
 +
 +    let height = data.height !== undefined ? data.height : (heights[data.type] || 20);
 +    if (height < 5) return;
 +
 +    buildable.push({
 +      name: zoneMesh.name,
 +      userData: data,
 +      points: data.points,
 +      color: data.color,
 +      type: data.type,
 +      height
 +    });
 +  });
 +
 +  return { buildable };
 +}
 diff --git a/src/render/BuildingLayer.js b/src/render/BuildingLayer.js
 new file mode 100644
 index 0000000..9eb94b7
 --- /dev/null
 +++ b/src/render/BuildingLayer.js
 @@ -0,0 +1,24 @@
 +export function createLegacyBuildings({
 +  layer,
 +  defs,
 +  createBuildingWithWindows,
 +  buildings,
 +  buildingGroups,
 +  registry,
 +  Y
 +}) {
 +  const buildable = defs?.buildable || [];
 +
 +  buildable.forEach(def => {
 +    const buildingGroup = createBuildingWithWindows(def.points, def.color, def.height, def.type);
 +    buildingGroup.name = def.name + '_building';
 +    buildingGroup.userData = def.userData;
 +    buildingGroup.position.y = Y.buildings;
 +    layer.add(buildingGroup);
 +    buildings.push(buildingGroup);
 +    buildingGroups.push(buildingGroup);
 +
 +    const entry = registry[def.name];
 +    if (entry) entry.buildingGroup = buildingGroup;
 +  });
 +}
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
docs/ai/review_packet_phase6e.md | 271 +++++++++++++++++++++++++++++++++++++++
1 file changed, 271 insertions(+)
```
```
(no output)
```
