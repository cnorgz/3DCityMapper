# Metadata
- base_commit: `23e77ed`
- phase_end_commit: `4f1afa4`
- packet_commit: `PENDING` (self-reference; see git log)
- focus_paths: `city-sim.html src/editor/RebuildScheduler.js REFACTOR_LOG.md docs/ai/review_packet_phase7a.md`

# Probe Summary (readiness-gated)
- url: `http://localhost:8000/city-sim.html?refactorProbe=1`
- REFACTOR_PROBE_LEN: `3977`
- REFACTOR_PROBE_SHA256: `f88283c8083d6fbb6c5c2ebbb381c8be963e6c86c44c5188288865ea6288d188`
- sceneCounts: `{ meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }`
- blueprintCounts: `{ beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }`
- overlayDrift: `{ ok: true, epsPx: 0.05, maxDriftPx: 0 }`
- rendererInfo: `{ memory: { geometries: 434, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }`

# Fixed Evidence Commands
```sh
command -v rg >/dev/null && echo "rg=1" || echo "rg=0"
```
```text
rg=1
```

```sh
grep -nF "refactorProbe" city-sim.html
```
```text
1078:    const probeEnabled = new URLSearchParams(location.search).has('refactorProbe');
1132:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

```sh
grep -nF "import('./tools/refactorProbe.js')" city-sim.html || grep -nF 'import("./tools/refactorProbe.js")' city-sim.html
```
```text
1132:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

```sh
git status -sb
```
```text
## refactor/phase7a-editor-rebuild-scheduler
```

```sh
git rev-parse --short HEAD
```
```text
4f1afa4
```

```sh
git log --oneline --decorate -n 20
```
```text
4f1afa4 (HEAD -> refactor/phase7a-editor-rebuild-scheduler) docs(phase7a): record readiness-gated probe
98b2a62 refactor(phase7a): extract editor rebuild scheduler
23e77ed (refactor/phase6g_1-packet-compliance) docs(ai): add review_packet_phase6g_1 (rev4 compliance addendum)
1cb8f19 (refactor/phase6g-city-renderer) docs(ai): add review packet for phase 6g
09f1f12 docs(phase6g): record readiness-gated probe
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
```

```sh
git diff --stat 23e77ed...4f1afa4
```
```text
 REFACTOR_LOG.md                | 14 ++++++++++++++
 city-sim.html                  | 28 +++++++++++++++++++---------
 src/editor/RebuildScheduler.js | 24 ++++++++++++++++++++++++
 3 files changed, 57 insertions(+), 9 deletions(-)
```

```sh
git diff --check 23e77ed...4f1afa4
```
```text
(no output)
```

```sh
git diff -U15 23e77ed...4f1afa4 -- city-sim.html src/editor/RebuildScheduler.js REFACTOR_LOG.md docs/ai/review_packet_phase7a.md
```
```diff
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 46902d3..92630a0 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -141,15 +141,29 @@ Probe check (post-extraction):
 - json_sha256: bbdb4df5a7f643db3dc66c09b8fba081f8c0efea33b134491d6ac94a0029374a
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }

 ## Phase 6g – CityRenderer orchestrator

 - branch: refactor/phase6g-city-renderer
 - capture_method: codex-mcp (readiness gated)
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_len: 3978
 - json_sha256: bbdb4df5a7f643db3dc66c09b8fba081f8c0efea33b134491d6ac94a0029374a
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
+
+## Phase 7a – Editor RebuildScheduler extraction
+
+- branch: refactor/phase7a-editor-rebuild-scheduler
+- base_commit: 23e77ed
+- phase_end_commit: PENDING (set in phase7a review packet)
+- capture_method: codex-mcp (readiness gated)
+- url: http://localhost:8000/city-sim.html?refactorProbe=1
+- json_len: 3977
+- json_sha256: f88283c8083d6fbb6c5c2ebbb381c8be963e6c86c44c5188288865ea6288d188
+- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
+- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
+- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
+- rendererInfo: { memory: { geometries: 434, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }

diff --git a/city-sim.html b/city-sim.html
index bc8f8f8..b52ba27 100644
--- a/city-sim.html
+++ b/city-sim.html
@@ -802,30 +802,31 @@
     } from './src/render/BlueprintPreviewRenderer.js';
@@
     import { addProp } from './src/render/PropsLayer.js';
     import { buildLegacyCity } from './src/render/CityRenderer.js';
+    import { createEditorRebuildScheduler } from './src/editor/RebuildScheduler.js';
@@
 let blueprintCityEnabled = false;
 let blueprintZoneMeshes = [];
   let blueprintLabelGroup = null;
-  let editorRebuildRaf = null;
+  let editorRebuildScheduler = null;
@@
           setupDebugControls();
           setupBlueprintControls();
           setupEditorControls();
+          if (!editorRebuildScheduler) {
+            editorRebuildScheduler = createEditorRebuildScheduler({
+              getBlueprintData: () => blueprintData,
+              buildBlueprintFromData,
+              rebuildBlueprintCity,
+              updateSelectionMarkers
+            });
+          }
           bindEditorEvents();
           await loadBlueprintData();
@@
     function scheduleEditorRebuild() {
-      if (editorRebuildRaf) return;
-      editorRebuildRaf = requestAnimationFrame(() => {
-        editorRebuildRaf = null;
-        if (!blueprintData) return;
-        buildBlueprintFromData(blueprintData);
-        rebuildBlueprintCity();
-        updateSelectionMarkers();
-      });
+      if (!editorRebuildScheduler) {
+        editorRebuildScheduler = createEditorRebuildScheduler({
+          getBlueprintData: () => blueprintData,
+          buildBlueprintFromData,
+          rebuildBlueprintCity,
+          updateSelectionMarkers
+        });
+      }
+      editorRebuildScheduler.schedule();
     }

diff --git a/src/editor/RebuildScheduler.js b/src/editor/RebuildScheduler.js
new file mode 100644
index 0000000..f8eb0ac
--- /dev/null
+++ b/src/editor/RebuildScheduler.js
@@ -0,0 +1,24 @@
+export function createEditorRebuildScheduler(opts) {
+  const {
+    getBlueprintData,
+    buildBlueprintFromData,
+    rebuildBlueprintCity,
+    updateSelectionMarkers
+  } = opts || {};
+
+  let rafId = null;
+
+  function schedule() {
+    if (rafId) return;
+    rafId = requestAnimationFrame(() => {
+      rafId = null;
+      const data = typeof getBlueprintData === 'function' ? getBlueprintData() : null;
+      if (!data) return;
+      buildBlueprintFromData(data);
+      rebuildBlueprintCity();
+      updateSelectionMarkers();
+    });
+  }
+
+  return { schedule };
+}
```

# Carry-Forward Issues
- `P0 blockers`
  - None.
- `P1 fold-forward`
  - Locator: `REFACTOR_LOG.md` Phase 7a block (`phase_end_commit: PENDING`)
  - Acceptance: set `phase_end_commit` in `REFACTOR_LOG.md` to the actual Phase 7a work commit once packet is accepted.
- `P2 notes`
  - Locator: `city-sim.html` scheduler init + lazy fallback.
  - Acceptance: keep only one initialization path when editor boot sequence is extracted in a later phase.

# Packet Commit Evidence (pre-commit)
```sh
git diff --stat --cached
```
```text
 docs/ai/review_packet_phase7a.md | 239 +++++++++++++++++++++++++++++++++++++++
 1 file changed, 239 insertions(+)
```

```sh
git diff --check --cached
```
```text
```
