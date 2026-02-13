# Metadata
- base_commit: d072929
- phase_end_commit: 09f1f12
- packet_commit: PENDING (self-reference; see git log)
- focus_paths: city-sim.html src/render/CityRenderer.js docs/ai/review_packet_phase6g.md REFACTOR_LOG.md

# Probe Summary (readiness-gated, from REFACTOR_LOG Phase 6g)
- json_len: 3978
- json_sha256: bbdb4df5a7f643db3dc66c09b8fba081f8c0efea33b134491d6ac94a0029374a
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }

# Determinism / tooling
```sh
command -v rg >/dev/null && echo "rg=1" || echo "rg=0"
```
```text
rg=1
```

# Git evidence
```sh
git status -sb
```
```text
## refactor/phase6g-city-renderer
```

```sh
git rev-parse --short HEAD
```
```text
09f1f12
```

```sh
git log --oneline --decorate -n 20
```
```text
09f1f12 (HEAD -> refactor/phase6g-city-renderer) docs(phase6g): record readiness-gated probe
ad10aa8 refactor(phase6g): extract CityRenderer orchestrator
d072929 (refactor/phase6f_2-track-handoff) docs(ai): track SeniorDev1 handoff doc
2d24954 (refactor/phase6f_1-packet-compliance) docs(ai): add review_packet_phase6f_1 (rev4 compliance addendum)
484754e (refactor/phase6f-props-debug) docs: archive v7_rev3 plan
ffbefde docs(ai): add review packet for phase 6f
607c47c docs(phase6f): record readiness-gated probe
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
```

```sh
git diff --stat d072929...09f1f12 -- city-sim.html src/render/CityRenderer.js docs/ai/review_packet_phase6g.md REFACTOR_LOG.md
```
```text
 REFACTOR_LOG.md            | 11 +++++++
 city-sim.html              | 71 ++++++++++++++++++++++++----------------------
 src/render/CityRenderer.js | 15 ++++++++++
 3 files changed, 63 insertions(+), 34 deletions(-)
```

```sh
git diff --check d072929...09f1f12 -- city-sim.html src/render/CityRenderer.js docs/ai/review_packet_phase6g.md REFACTOR_LOG.md
```
```text
 docs/ai/review_packet_phase6g.md | 264 +++++++++++++++++++++++++++++++++++++++
 1 file changed, 264 insertions(+)
```

```sh
git diff -U15 d072929...09f1f12 -- city-sim.html src/render/CityRenderer.js docs/ai/review_packet_phase6g.md REFACTOR_LOG.md
```
```diff
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 6edd6b0..46902d3 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -130,15 +130,26 @@ Probe check (post-extraction):
 - json_sha256: bbdb4df5a7f643db3dc66c09b8fba081f8c0efea33b134491d6ac94a0029374a
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }

 ## Phase 6f – PropsLayer + DebugLayer

 - branch: refactor/phase6f-props-debug
 - capture_method: codex-mcp (readiness gated)
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_len: 3978
 - json_sha256: bbdb4df5a7f643db3dc66c09b8fba081f8c0efea33b134491d6ac94a0029374a
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
+
+## Phase 6g – CityRenderer orchestrator
+
+- branch: refactor/phase6g-city-renderer
+- capture_method: codex-mcp (readiness gated)
+- url: http://localhost:8000/city-sim.html?refactorProbe=1
+- json_len: 3978
+- json_sha256: bbdb4df5a7f643db3dc66c09b8fba081f8c0efea33b134491d6ac94a0029374a
+- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
+- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
+- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }

diff --git a/city-sim.html b/city-sim.html
index 6c80743..bc8f8f8 100644
--- a/city-sim.html
+++ b/city-sim.html
@@ -801,30 +801,31 @@
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
     import { addProp } from './src/render/PropsLayer.js';
+    import { buildLegacyCity } from './src/render/CityRenderer.js';
@@ -5176,45 +5177,46 @@ function validateBlueprint(data) {
     async function init() {
       console.log("TADHG CITY SIMULATOR - VERSION 2.1 - ROBUST FIXES APPLIED");
@@
-      // Phase 1: 2D Zones
-      buildPhase1();
-      loadingBar.style.width = '40%';
-
-      // Phase 2: 3D Buildings
-      setTimeout(async () => {
-        buildPhase2();
-        loadingBar.style.width = '70%';
-
-        // Animated water
-        createAnimatedWater();
-        loadingBar.style.width = '80%';
-
-        // Map overlay
-        try {
+      buildLegacyCity({
+        buildPhase1,
+        buildPhase2,
+        delayMs: 100,
+        onPhase1Done: () => {
+          loadingBar.style.width = '40%';
+        },
+        onPhase2Done: async () => {
+          loadingBar.style.width = '70%';
+
+          // Animated water
+          createAnimatedWater();
+          loadingBar.style.width = '80%';
+
+          // Map overlay
+          try {
@@
-        } catch (error) {
-          console.warn('Failed to load map overlay:', error);
-        }
-
-        loadingBar.style.width = '90%';
-
-        // Set initial view
-        setTimeOfDay(false);
-        setViewMode('plan');
-
-        loadingBar.style.width = '100%';
-
-        // Hide loading screen
-        setTimeout(() => {
-          document.getElementById('loading').style.opacity = '0';
+          } catch (error) {
+            console.warn('Failed to load map overlay:', error);
+          }
+
+          loadingBar.style.width = '90%';
+
+          // Set initial view
+          setTimeOfDay(false);
+          setViewMode('plan');
+
+          loadingBar.style.width = '100%';
+
+          // Hide loading screen
           setTimeout(() => {
-            document.getElementById('loading').style.display = 'none';
-          }, 500);
-        }, 300);
-      }, 100);
+            document.getElementById('loading').style.opacity = '0';
+            setTimeout(() => {
+              document.getElementById('loading').style.display = 'none';
+            }, 500);
+          }, 300);
+        }
+      });
     }

diff --git a/src/render/CityRenderer.js b/src/render/CityRenderer.js
new file mode 100644
index 0000000..6f581f6
--- /dev/null
+++ b/src/render/CityRenderer.js
@@ -0,0 +1,15 @@
+export function buildLegacyCity({
+  buildPhase1,
+  buildPhase2,
+  onPhase1Done,
+  onPhase2Done,
+  delayMs = 0
+}) {
+  buildPhase1();
+  if (typeof onPhase1Done === 'function') onPhase1Done();
+
+  setTimeout(async () => {
+    await buildPhase2();
+    if (typeof onPhase2Done === 'function') onPhase2Done();
+  }, delayMs);
+}
```

# Guardrail greps (probe gate)
```sh
grep -nF "refactorProbe" city-sim.html
```
```text
1077:    const probeEnabled = new URLSearchParams(location.search).has('refactorProbe');
1131:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

```sh
grep -nF "import('./tools/refactorProbe.js')" city-sim.html || grep -nF 'import("./tools/refactorProbe.js")' city-sim.html
```
```text
1131:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

# Packet commit evidence (pre-commit)
```sh
git diff --stat --cached
```
```text
```

```sh
git diff --check --cached
```
```text
```
