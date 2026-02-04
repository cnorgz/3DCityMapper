# Phase 6b Review Packet

## Metadata
- base_commit: a8d7fe8
- phase_end_commit: b932578
- packet_commit: 2925842

## Phase checklist
- ✅ Extracted terrain generation into src/terrain/TerrainGenerator.js
- ✅ Extracted terrain rendering into src/render/TerrainLayer.js
- ✅ city-sim.html wired to new terrain modules (no behavior change intended)
- ✅ Parity probe hash matches baseline (see Probe summary)
- ⏭️ 5x rebuild memory growth check: not run (no safe rebuild trigger without extra code)

## Git evidence
```bash
git status -sb
```
```
## refactor/phase6b-terrain-layer
```

```bash
git rev-parse --short HEAD
```
```
b932578
```

```bash
git log --oneline --decorate -n 20
```
```
b932578 (HEAD -> refactor/phase6b-terrain-layer) docs(phase6b): record probe baseline match
b3e269d refactor(phase6b): extract terrain generator/layer
a8d7fe8 (refactor/phase6a-material-library) docs(plan): replace refactor plan v7 rev1 with rev2
7e85b9f docs(ai): fix phase6a packet_commit
aaaf294 docs(ai): add review packet for phase 6a
ce16421 feat(phase6a): add MaterialLibrary and shared window assets
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
```

```bash
git diff --stat a8d7fe8...b932578
```
```
 REFACTOR_LOG.md                 | 14 ++++++++++++++
 city-sim.html                   | 33 +++++++++------------------------
 src/render/TerrainLayer.js      | 10 ++++++++++
 src/terrain/TerrainGenerator.js | 14 ++++++++++++++
 4 files changed, 47 insertions(+), 24 deletions(-)
```

```bash
git diff --check a8d7fe8...b932578
```
```
```

```bash
git diff -U15 a8d7fe8...b932578 -- city-sim.html src/render src/terrain docs/ai
```
```
diff --git a/city-sim.html b/city-sim.html
index 60f929e..17a1434 100644
--- a/city-sim.html
+++ b/city-sim.html
@@ -793,30 +793,32 @@
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
     import { getSharedWindowMaterials, getSharedWindowGeometry } from './src/render/MaterialLibrary.js';
+    import { createLegacyTerrain } from './src/render/TerrainLayer.js';
+    import { buildLegacyTerrainDefs } from './src/terrain/TerrainGenerator.js';
@@ -3286,54 +3288,37 @@ function validateBlueprint(data) {
       }
     };
@@
     function buildPhase1() {
-      // Sea
-      const sea = createPolygon(seaPoints, COLORS.sea, -2);
-      sea.name = 'sea';
-      LAYERS.terrain.add(sea);
-
-      // Beach
-      const beach = createPolygon(beachPoints, COLORS.beach, -1);
-      beach.name = 'beach';
-      LAYERS.terrain.add(beach);
-
-      // Mainland base
-      const mainlandPoints = [
-        [0.36, 0], [1, 0], [1, 1], [0.32, 1],
-        [0.30, 0.85], [0.32, 0.70], [0.36, 0.55],
-        [0.38, 0.42], [0.40, 0.30], [0.38, 0.15]
-      ];
-      const mainland = createPolygon(mainlandPoints, COLORS.land, 0);
-      mainland.name = 'mainland';
-      LAYERS.terrain.add(mainland);
-
-      // Island base
-      const island = createPolygon(islandOutline, 0xb8a888, 0.5);
-      island.name = 'island';
-      LAYERS.terrain.add(island);
+      const terrainDefs = buildLegacyTerrainDefs({
+        seaPoints,
+        beachPoints,
+        islandOutline,
+        colors: COLORS
+      });
+      createLegacyTerrain({ layer: LAYERS.terrain, createPolygon, defs: terrainDefs });
@@
     }

diff --git a/src/render/TerrainLayer.js b/src/render/TerrainLayer.js
new file mode 100644
index 0000000..0e64c1f
--- /dev/null
+++ b/src/render/TerrainLayer.js
@@ -0,0 +1,10 @@
+export function createLegacyTerrain({ layer, createPolygon, defs }) {
+  const meshes = [];
+  defs.forEach(def => {
+    const mesh = createPolygon(def.points, def.color, def.y);
+    mesh.name = def.name;
+    layer.add(mesh);
+    meshes.push(mesh);
+  });
+  return meshes;
+}

diff --git a/src/terrain/TerrainGenerator.js b/src/terrain/TerrainGenerator.js
new file mode 100644
index 0000000..3dd3e44
--- /dev/null
+++ b/src/terrain/TerrainGenerator.js
@@ -0,0 +1,14 @@
+export function buildLegacyTerrainDefs({ seaPoints, beachPoints, islandOutline, colors }) {
+  const mainlandPoints = [
+    [0.36, 0], [1, 0], [1, 1], [0.32, 1],
+    [0.30, 0.85], [0.32, 0.70], [0.36, 0.55],
+    [0.38, 0.42], [0.40, 0.30], [0.38, 0.15]
+  ];
+
+  return [
+    { name: 'sea', points: seaPoints, color: colors.sea, y: -2 },
+    { name: 'beach', points: beachPoints, color: colors.beach, y: -1 },
+    { name: 'mainland', points: mainlandPoints, color: colors.land, y: 0 },
+    { name: 'island', points: islandOutline, color: 0xb8a888, y: 0.5 }
+  ];
+}
```
## Guardrail greps
```bash
grep -nF "refactorProbe" city-sim.html
```
```
1070:    const probeEnabled = new URLSearchParams(location.search).has('refactorProbe');
1124:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

```bash
grep -nF "import('./tools/refactorProbe.js')" city-sim.html || grep -nF 'import("./tools/refactorProbe.js")' city-sim.html
```
```
1124:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

## Probe summary
- json_sha256: 2526c68e85ea72655154e08d692db9d3d0c46de7b5edf812091f674f74b6fa0b
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
- matches baseline: yes

## Packet commit evidence (pre-commit)
```bash
git diff --stat --cached
```
```
 docs/ai/review_packet_phase6b.md | 210 +++++++++++++++++++++++++++++++++++++++
 1 file changed, 210 insertions(+)
```

```bash
git diff --check --cached
```
```
```
