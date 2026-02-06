# Metadata
- base_commit: `5961cf5`
- phase_end_commit: `a028b0e`
- packet_commit: `PENDING` (self-reference; see git log)
- focus_paths: `city-sim.html src/editor/HistoryManager.js REFACTOR_LOG.md docs/ai/`

# Probe Summary (readiness-gated)
- url: `http://localhost:8000/city-sim.html?refactorProbe=1`
- REFACTOR_PROBE_LEN: `3977`
- REFACTOR_PROBE_SHA256: `f88283c8083d6fbb6c5c2ebbb381c8be963e6c86c44c5188288865ea6288d188`
- sceneCounts: `{ meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }`
- blueprintCounts: `{ beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }`
- overlayDrift: `{ ok: true, epsPx: 0.05, maxDriftPx: 0 }`

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
1080:    const probeEnabled = new URLSearchParams(location.search).has('refactorProbe');
1134:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

```sh
grep -nF "import('./tools/refactorProbe.js')" city-sim.html || grep -nF 'import("./tools/refactorProbe.js")' city-sim.html
```
```text
1134:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

```sh
git status -sb
```
```text
## refactor/phase7b-editor-history-manager
```

```sh
git rev-parse --short HEAD
```
```text
a028b0e
```

```sh
git log --oneline --decorate -n 20
```
```text
a028b0e (HEAD -> refactor/phase7b-editor-history-manager) docs(phase7b): record readiness-gated probe
57e6e5f refactor(phase7b): extract editor history manager
5961cf5 (refactor/phase7a-editor-rebuild-scheduler) docs(ai): add review packet for phase 7a
4f1afa4 docs(phase7a): record readiness-gated probe
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
```

```sh
git diff --stat 5961cf5...a028b0e
```
```text
 REFACTOR_LOG.md              |  16 ++++++-
 city-sim.html                |  82 +++++++++++++++++++++----------------------
 src/editor/HistoryManager.js | 100 ++++++++++++++++++++++++++++++++++++++++++++++++++++
 3 files changed, 144 insertions(+), 54 deletions(-)
```

```sh
git diff --check 5961cf5...a028b0e
```
```text
(no output)
```

```sh
git diff -U15 5961cf5...a028b0e -- city-sim.html src/editor/HistoryManager.js REFACTOR_LOG.md docs/ai/review_packet_phase7b.md
```
```diff
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 92630a0..2668ed4 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -146,24 +146,38 @@ Probe check (post-extraction):
 ## Phase 6g – CityRenderer orchestrator
@@
 ## Phase 7a – Editor RebuildScheduler extraction

 - branch: refactor/phase7a-editor-rebuild-scheduler
 - base_commit: 23e77ed
-- phase_end_commit: PENDING (set in phase7a review packet)
+- phase_end_commit: 4f1afa4
 - capture_method: codex-mcp (readiness gated)
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_len: 3977
 - json_sha256: f88283c8083d6fbb6c5c2ebbb381c8be963e6c86c44c5188288865ea6288d188
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
 - rendererInfo: { memory: { geometries: 434, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }
+
+## Phase 7b – Editor HistoryManager extraction
+
+- branch: refactor/phase7b-editor-history-manager
+- base_commit: 5961cf5
+- phase_end_commit: PENDING (set in phase7b review packet)
+- capture_method: codex-mcp (readiness gated)
+- url: http://localhost:8000/city-sim.html?refactorProbe=1
+- json_len: 3977
+- json_sha256: f88283c8083d6fbb6c5c2ebbb381c8be963e6c86c44c5188288865ea6288d188
+- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
+- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
+- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
+- rendererInfo: { memory: { geometries: 434, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }

diff --git a/city-sim.html b/city-sim.html
index b52ba27..7943ede 100644
--- a/city-sim.html
+++ b/city-sim.html
@@ -803,30 +803,31 @@
@@
     import { buildLegacyCity } from './src/render/CityRenderer.js';
     import { createEditorRebuildScheduler } from './src/editor/RebuildScheduler.js';
+    import { createEditorHistoryManager } from './src/editor/HistoryManager.js';
@@
 let blueprintCityEnabled = false;
 let blueprintZoneMeshes = [];
   let blueprintLabelGroup = null;
   let editorRebuildScheduler = null;
+  let editorHistoryManager = null;
@@
-    function cloneBlueprintData(data) {
-      const fallback = normalizeBlueprintData({});
-      if (!data) return fallback;
-      try {
-        return JSON.parse(JSON.stringify(data));
-      } catch (e) {
-        console.warn('Blueprint clone failed, resetting.', e);
-        return fallback;
+    function ensureEditorHistoryManager() {
+      if (!editorHistoryManager) {
+        editorHistoryManager = createEditorHistoryManager({
+          getBlueprintData: () => blueprintData,
+          setBlueprintData: (next) => { blueprintData = next; },
+          blueprintModel,
+          editorState,
+          editorHistory,
+          normalizeBlueprintData,
+          clearJunctionMode,
+          buildBlueprintFromData,
+          rebuildBlueprintCity,
+          updateDraftLine,
+          updateDraftMarkers,
+          updateSelectionMarkers,
+          updateEditorStatus
+        });
       }
+      return editorHistoryManager;
     }
@@
-    function snapshotEditorState() {
-      return {
-        blueprint: cloneBlueprintData(blueprintData),
-        selected: editorState.selected ? { ...editorState.selected } : null
-      };
-    }
+    function snapshotEditorState() { return ensureEditorHistoryManager().snapshotEditorState(); }
@@
-    function pushEditorHistory(snapshot) {
-      if (!snapshot) return;
-      editorHistory.undo.push(snapshot);
-      if (editorHistory.undo.length > editorHistory.limit) {
-        editorHistory.undo.shift();
-      }
-      editorHistory.redo = [];
-    }
+    function pushEditorHistory(snapshot) { return ensureEditorHistoryManager().pushEditorHistory(snapshot); }
@@
-    function applyEditorSnapshot(snapshot, label) {
-      blueprintModel.applySnapshot(snapshot?.blueprint || {});
-      blueprintData = blueprintModel.getData();
-      ...
-    }
+    function applyEditorSnapshot(snapshot, label) { return ensureEditorHistoryManager().applyEditorSnapshot(snapshot, label); }
@@
-    function undoEditor() {
-      ...
-    }
+    function undoEditor() { return ensureEditorHistoryManager().undoEditor(); }
@@
-    function redoEditor() {
-      ...
-    }
+    function redoEditor() { return ensureEditorHistoryManager().redoEditor(); }

diff --git a/src/editor/HistoryManager.js b/src/editor/HistoryManager.js
new file mode 100644
index 0000000..35a2989
--- /dev/null
+++ b/src/editor/HistoryManager.js
@@ -0,0 +1,100 @@
+export function createEditorHistoryManager(deps) {
+  const {
+    getBlueprintData,
+    setBlueprintData,
+    blueprintModel,
+    editorState,
+    editorHistory,
+    normalizeBlueprintData,
+    clearJunctionMode,
+    buildBlueprintFromData,
+    rebuildBlueprintCity,
+    updateDraftLine,
+    updateDraftMarkers,
+    updateSelectionMarkers,
+    updateEditorStatus
+  } = deps || {};
+  ...
+  return {
+    cloneBlueprintData,
+    snapshotEditorState,
+    pushEditorHistory,
+    applyEditorSnapshot,
+    undoEditor,
+    redoEditor
+  };
+}
```

# Pinned New Module Contents
```sh
git show a028b0e:src/editor/HistoryManager.js
```
```js
export function createEditorHistoryManager(deps) {
  const {
    getBlueprintData,
    setBlueprintData,
    blueprintModel,
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
  } = deps || {};

  function cloneBlueprintData(data) {
    const fallback = normalizeBlueprintData({});
    if (!data) return fallback;
    try {
      return JSON.parse(JSON.stringify(data));
    } catch (e) {
      console.warn('Blueprint clone failed, resetting.', e);
      return fallback;
    }
  }

  function snapshotEditorState() {
    return {
      blueprint: cloneBlueprintData(getBlueprintData()),
      selected: editorState.selected ? { ...editorState.selected } : null
    };
  }

  function pushEditorHistory(snapshot) {
    if (!snapshot) return;
    editorHistory.undo.push(snapshot);
    if (editorHistory.undo.length > editorHistory.limit) {
      editorHistory.undo.shift();
    }
    editorHistory.redo = [];
  }

  function applyEditorSnapshot(snapshot, label) {
    blueprintModel.applySnapshot(snapshot?.blueprint || {});
    const nextBlueprint = blueprintModel.getData();
    setBlueprintData(nextBlueprint);
    editorState.draft = [];
    editorState.previewPoint = null;
    clearJunctionMode();
    editorState.hover = null;
    editorState.hoverDraftIndex = null;
    if (
      snapshot?.selected &&
      nextBlueprint?.[snapshot.selected.layer]?.[snapshot.selected.index]
    ) {
      editorState.selected = { ...snapshot.selected };
    } else {
      editorState.selected = null;
    }
    buildBlueprintFromData(nextBlueprint);
    rebuildBlueprintCity();
    updateDraftLine();
    updateDraftMarkers();
    updateSelectionMarkers();
    updateEditorStatus(label || 'History applied.');
  }

  function undoEditor() {
    if (editorHistory.undo.length === 0) {
      updateEditorStatus('Undo: nothing to undo.');
      return;
    }
    const current = snapshotEditorState();
    const snapshot = editorHistory.undo.pop();
    editorHistory.redo.push(current);
    applyEditorSnapshot(snapshot, 'Undo.');
  }

  function redoEditor() {
    if (editorHistory.redo.length === 0) {
      updateEditorStatus('Redo: nothing to redo.');
      return;
    }
    const current = snapshotEditorState();
    const snapshot = editorHistory.redo.pop();
    editorHistory.undo.push(current);
    applyEditorSnapshot(snapshot, 'Redo.');
  }

  return {
    cloneBlueprintData,
    snapshotEditorState,
    pushEditorHistory,
    applyEditorSnapshot,
    undoEditor,
    redoEditor
  };
}
```

# Carry-Forward Issues
- `P0 blockers`
  - None.
- `P1 fold-forward`
  - Locator: `city-sim.html` still contains lazy `ensureEditorHistoryManager()` wrapper.
  - Acceptance: remove lazy wrapper and initialize manager in a single orchestration location when broader editor bootstrap extraction lands.
- `P2 notes`
  - Locator: `REFACTOR_LOG.md` phase blocks.
  - Acceptance: keep `phase_end_commit` values updated in-phase to avoid follow-up metadata-only corrections.

# Packet Commit Evidence (pre-commit)
```sh
git diff --stat --cached
```
```text
 docs/ai/review_packet_phase7b.md | 377 +++++++++++++++++++++++++++++++++++++++
 1 file changed, 377 insertions(+)
```

```sh
git diff --check --cached
```
```text
```
