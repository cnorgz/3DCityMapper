# Phase 4 Review Packet

## Metadata
- base_branch: refactor/phase3-blueprint-core
- base_commit: 6c73fca
- phase_end_commit: 5676069
- packet_commit: 061885e

## Phase Checklist
- ✅ Snapshot helpers added to BlueprintModel (getSnapshot/applySnapshot)
- ✅ History/apply paths use blueprintModel.applySnapshot to keep model/data aligned
- ✅ CoordinateMapper and OverlayTransform extracted to src/core
- ✅ city-sim.html wired to new mapping modules (no behavior change intended)
- ⛔ Optional ImageSource upload skipped (left for Phase 4b)

## Git Evidence

### git status -sb
```
## refactor/phase4-overlay-coords
?? docs/ai/review_packet_phase4.md
```

### git log --oneline --decorate -n 20
```
5676069 (HEAD -> refactor/phase4-overlay-coords) feat(phase4): add snapshot helpers + coordinate mapping modules
6c73fca (refactor/phase3-blueprint-core) docs(ai): fix packet_commit for phase 3
3a63b65 docs(ai): add review packet for phase 3
7f34515 feat(phase3): add BlueprintModel + validator + normalizer
bea3202 (refactor/phase2-persistence) docs(ai): add review packet for phase 2
15e5136 feat(phase2): add StateStore + migrations + opt-in persistence
68c6963 chore(phase1): add EventBus/EventCatalog (warn+count)
3d10457 docs(phase0): capture refactor probe baseline anchor
3501049 (refactor/phase1-config-utils) docs(plan): add v7 refactor plan (replace v6)
b4f5e40 docs(phase1.1): add review packet
2d6952b refactor(phase1.1): align RNG + legend rules with plan (no behavior change)
8feef0e docs(phase1): add phase1 review packet
67e5864 (origin/refactor/phase1-config-utils) refactor(phase1): extract config+utils (verbatim)
f9af069 chore(phase1): add src/ skeleton (config/utils/ui)
74af2d4 docs(phase1): clean phase0 checklist to match v6
d9263da (refactor/phase0a-probe-alignment) chore(phase0): align probe output + gate debug state
3dff6a2 (refactor/phase0-instrumentation) chore(phase0): add gated refactor parity probe
5ae5216 docs(phase0): add refactor log + debug + localStorage report
0f43169 docs(plan): add refactor execution plan v6
ec0c1b1 (origin/master, master) Merge branch 'phase6-round-joins'
```

### git diff --stat 6c73fca...5676069
```
 city-sim.html                | 49 +++++++++++++++++++++-----------------------
 src/core/BlueprintModel.js   | 15 ++++++++++++++
 src/core/CoordinateMapper.js | 30 +++++++++++++++++++++++++++
 src/core/OverlayTransform.js | 44 +++++++++++++++++++++++++++++++++++++++
 4 files changed, 112 insertions(+), 26 deletions(-)
```

### git diff --check 6c73fca...5676069
```
```

### git show -U15 5676069 -- city-sim.html src/core src/persistence src/utils docs tools REFACTOR_LOG.md
```
commit 56760691532f3ed1a14be4c09655369ea472e144
Author: xavstack <your.email@example.com>
Date:   Wed Feb 4 12:01:02 2026 +0100

    feat(phase4): add snapshot helpers + coordinate mapping modules

diff --git a/city-sim.html b/city-sim.html
index 553c05c..8645b46 100644
--- a/city-sim.html
+++ b/city-sim.html
@@ -773,30 +773,32 @@
     } from './src/config/palette.js';
     import {
       LEGEND_LINE_COLORS,
       LEGEND_TYPE_MAP,
       ALLOWED_TYPE_CODES
     } from './src/config/legendRules.js';
     import { RENDER_FPS } from './src/config/renderPresets.js';
     import { clampNumber, rng } from './src/utils/Math.js';
     import { pointInPolygon, centroidNorm, distancePointToSegment } from './src/utils/GeometryMath.js';
     import { disposeObject3D } from './src/utils/Dispose.js';
     import { getItem, setItem } from './src/persistence/StateStore.js';
     import { runMigrations } from './src/persistence/Migrations.js';
     import { validateBlueprint as validateBlueprintCore } from './src/core/BlueprintValidator.js';
     import { normalizeBlueprint } from './src/core/BlueprintNormalizer.js';
     import { BlueprintModel } from './src/core/BlueprintModel.js';
+    import { pixelToOverlayLocal, overlayLocalToPixel } from './src/core/CoordinateMapper.js';
+    import { computeOverlayDrift, overlayLocalToWorld, worldToOverlayLocal } from './src/core/OverlayTransform.js';
@@ -1211,59 +1213,52 @@ function validateBlueprint(data) {
     // Coordinate contract: image (0,0) top-left; world (0,0) center; +X right, +Z down.
     function overlayWorldToPx(x, z) {
       if (!mapCoordMapper || !mapOverlayGroup) return null;
-      const local = new THREE.Vector3(x, 0, z);
-      mapOverlayGroup.worldToLocal(local);
-      return mapCoordMapper.worldToPx(local.x, local.z);
+      const local = worldToOverlayLocal({ x, y: 0, z }, mapOverlayGroup);
+      if (!local) return null;
+      return overlayLocalToPixel({ x: local.x, z: local.z }, mapCoordMapper);
     }
@@ -1247,22 +1242,15 @@ function validateBlueprint(data) {
     function verifyOverlayMapping() {
       if (!mapCoordMapper || !mapOverlayGroup) return;
-      const epsPx = 0.05;
-      const probes = [
-        { px: MAP_OVERLAY_IMG_W * 0.5, py: MAP_OVERLAY_IMG_H * 0.5 },
-        { px: MAP_OVERLAY_IMG_W * 0.1, py: MAP_OVERLAY_IMG_H * 0.1 },
-        { px: MAP_OVERLAY_IMG_W * 0.9, py: MAP_OVERLAY_IMG_H * 0.9 }
-      ];
-
-      probes.forEach((probe) => {
-        const world = overlayPxToWorld(probe.px, probe.py, 0);
-        if (!world) return;
-        const pxBack = overlayWorldToPx(world.x, world.z);
-        if (!pxBack) return;
-        const dx = Math.abs(pxBack.px - probe.px);
-        const dy = Math.abs(pxBack.py - probe.py);
-        if (dx > epsPx || dy > epsPx) {
-          console.warn('Overlay mapping drift', { probe, back: pxBack, error: { dx, dy } });
+      const drift = computeOverlayDrift({
+        dims: mapCoordMapper,
+        group: mapOverlayGroup
+      });
+      if (!drift) return;
+      drift.samples.forEach((sample, idx) => {
+        if (sample.dx > drift.epsPx || sample.dy > drift.epsPx) {
+          console.warn('Overlay mapping drift', { sampleIndex: idx, sample, epsPx: drift.epsPx });
         }
       });
     }
@@ -6449,39 +6444,41 @@ function validateBlueprint(data) {
       if (editorState.snapPixels && mapCoordMapper) {
-        const px = mapCoordMapper.worldToPx(x, z);
+        const px = overlayLocalToPixel({ x, z }, mapCoordMapper);
         const step = Math.max(1, editorState.pixelStep);
         const snappedPx = {
           px: Math.round(px.px / step) * step,
           py: Math.round(px.py / step) * step
         };
-        const snapped = mapCoordMapper.pxToWorld(snappedPx.px, snappedPx.py);
-        x = snapped.x;
-        z = snapped.z;
+        const snapped = pixelToOverlayLocal(snappedPx.px, snappedPx.py, mapCoordMapper);
+        if (snapped) {
+          x = snapped.x;
+          z = snapped.z;
+        }
       }
@@ -6842,31 +6839,31 @@ function validateBlueprint(data) {
     function applyEditorSnapshot(snapshot, label) {
-      blueprintModel.loadFromJSON(snapshot?.blueprint || {});
+      blueprintModel.applySnapshot(snapshot?.blueprint || {});
       blueprintData = blueprintModel.getData();
       editorState.draft = [];
       editorState.previewPoint = null;
       clearJunctionMode();
@@ -7800,31 +7547,31 @@ function validateBlueprint(data) {
       if (clearBtn) {
         clearBtn.addEventListener('click', () => {
           pushEditorHistory(snapshotEditorState());
-          blueprintData = normalizeBlueprintData({});
+          blueprintData = blueprintModel.createBlank();
           editorState.draft = [];
           editorState.previewPoint = null;
           clearJunctionMode();
           editorState.selected = null;
           editorState.hover = null;
           editorState.hoverDraftIndex = null;
           buildBlueprintFromData(blueprintData);
           rebuildBlueprintCity();
           updateDraftLine();
           updateDraftMarkers();
           updateSelectionMarkers();
           hideEditorLines();
           updateEditorStatus('Cleared all blueprint shapes.');
           setBlueprintStatus('Blueprint status: cleared in memory.');
         });
       }

diff --git a/src/core/BlueprintModel.js b/src/core/BlueprintModel.js
index d87521c..3712921 100644
--- a/src/core/BlueprintModel.js
+++ b/src/core/BlueprintModel.js
@@ -10,30 +10,45 @@ export class BlueprintModel {
   loadFromJSON(raw) {
     const parsed = this._parseRaw(raw);
     this.data = normalizeBlueprint(parsed, this.helpers);
     return this.data;
   }
@@ -25,30 +40,45 @@ export class BlueprintModel {
   getData() {
     return this.data;
   }

+  getSnapshot() {
+    const source = this.data || {};
+    try {
+      return JSON.parse(JSON.stringify(source));
+    } catch (e) {
+      return {};
+    }
+  }
+
+  applySnapshot(snapshot) {
+    const target = snapshot && typeof snapshot === 'object' ? snapshot : {};
+    this.data = normalizeBlueprint(target, this.helpers);
+    return this.data;
+  }
+
   validate(raw) {
     const target = raw !== undefined ? this._parseRaw(raw) : (this.data || {});
     return validateBlueprint(target, this.helpers);
   }

diff --git a/src/core/CoordinateMapper.js b/src/core/CoordinateMapper.js
new file mode 100644
index 0000000..13dc4ae
--- /dev/null
+++ b/src/core/CoordinateMapper.js
@@ -0,0 +1,30 @@
+export function pixelToOverlayLocal(px, py, dims = {}) {
+  if (!dims || !Number.isFinite(dims.imgW) || !Number.isFinite(dims.imgH)) return null;
+  const worldW = Number.isFinite(dims.worldW) ? dims.worldW : 0;
+  const worldH = Number.isFinite(dims.worldH)
+    ? dims.worldH
+    : (worldW && dims.imgW ? worldW * (dims.imgH / dims.imgW) : 0);
+  const origin = dims.origin || { x: 0, z: 0 };
+  const u = px / dims.imgW;
+  const v = py / dims.imgH;
+  const x = (u - 0.5) * worldW + (origin.x ?? 0);
+  const z = (v - 0.5) * worldH + (origin.z ?? 0);
+  return { x, z };
+}
+
+export function overlayLocalToPixel(local, dims = {}) {
+  if (!local || !Number.isFinite(dims.imgW) || !Number.isFinite(dims.imgH)) return null;
+  const worldW = Number.isFinite(dims.worldW) ? dims.worldW : 0;
+  const worldH = Number.isFinite(dims.worldH)
+    ? dims.worldH
+    : (worldW && dims.imgW ? worldW * (dims.imgH / dims.imgW) : 0);
+  const origin = dims.origin || { x: 0, z: 0 };
+  const x = Number.isFinite(local.x) ? local.x : local[0];
+  const z = Number.isFinite(local.z) ? local.z : local[1];
+  const u = worldW ? ((x - (origin.x ?? 0)) / worldW + 0.5) : 0.5;
+  const v = worldH ? ((z - (origin.z ?? 0)) / worldH + 0.5) : 0.5;
+  return {
+    px: u * dims.imgW,
+    py: v * dims.imgH
+  };
+}

diff --git a/src/core/OverlayTransform.js b/src/core/OverlayTransform.js
new file mode 100644
index 0000000..b4afc7f
--- /dev/null
+++ b/src/core/OverlayTransform.js
@@ -0,0 +1,44 @@
+import * as THREE from 'three';
+import { pixelToOverlayLocal, overlayLocalToPixel } from './CoordinateMapper.js';
+
+export const OVERLAY_DRIFT_EPS_PX = 0.05;
+
+export function overlayLocalToWorld(local, group, y = 0) {
+  if (!group || !local) return null;
+  const x = Number.isFinite(local.x) ? local.x : local[0];
+  const z = Number.isFinite(local.z) ? local.z : local[1];
+  const vec = new THREE.Vector3(x, y, z);
+  return group.localToWorld(vec);
+}
+
+export function worldToOverlayLocal(world, group) {
+  if (!group || !world) return null;
+  const vec = new THREE.Vector3(world.x, world.y ?? 0, world.z);
+  return group.worldToLocal(vec);
+}
+
+export function computeOverlayDrift({ dims, group, epsPx = OVERLAY_DRIFT_EPS_PX, samples }) {
+  if (!dims || !group) return null;
+  const probes = samples && samples.length ? samples : [
+    { px: dims.imgW * 0.5, py: dims.imgH * 0.5 },
+    { px: dims.imgW * 0.1, py: dims.imgH * 0.1 },
+    { px: dims.imgW * 0.9, py: dims.imgH * 0.9 }
+  ];
+  let maxDrift = 0;
+  const sampleOut = [];
+  probes.forEach((probe) => {
+    const local = pixelToOverlayLocal(probe.px, probe.py, dims);
+    if (!local) return;
+    const world = overlayLocalToWorld(local, group, 0);
+    if (!world) return;
+    const backLocal = worldToOverlayLocal(world, group);
+    if (!backLocal) return;
+    const pxBack = overlayLocalToPixel({ x: backLocal.x, z: backLocal.z }, dims);
+    if (!pxBack) return;
+    const dx = Math.abs(pxBack.px - probe.px);
+    const dy = Math.abs(pxBack.py - probe.py);
+    maxDrift = Math.max(maxDrift, dx, dy);
+    sampleOut.push({ px: probe.px, py: probe.py, dx, dy });
+  });
+  return { ok: maxDrift <= epsPx, epsPx, maxDriftPx: maxDrift, samples: sampleOut };
+}
```

## Guardrail Greps

### (command -v rg >/dev/null && rg -n "refactorProbe" city-sim.html) || grep -nF "refactorProbe" city-sim.html
```
1162:    const probeEnabled = new URLSearchParams(location.search).has('refactorProbe');
1216:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

### grep -nF "import('./tools/refactorProbe.js')" city-sim.html || grep -nF 'import("./tools/refactorProbe.js")' city-sim.html
```
1216:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

### (command -v rg >/dev/null && rg -n "CoordinateMapper|OverlayTransform" city-sim.html src/core) || grep -R -n "CoordinateMapper" city-sim.html src/core
```
city-sim.html:788:    import { pixelToOverlayLocal, overlayLocalToPixel } from './src/core/CoordinateMapper.js';
city-sim.html:789:    import { computeOverlayDrift, overlayLocalToWorld, worldToOverlayLocal } from './src/core/OverlayTransform.js';
src/core/OverlayTransform.js:2:import { pixelToOverlayLocal, overlayLocalToPixel } from './CoordinateMapper.js';
```

## Probe Summary (Mode A)
Captured via MCP/DevTools evaluate of:
```
JSON.stringify(runRefactorProbe())
```

JSON string (sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d):
```
{"rendererInfo":{"memory":{"geometries":436,"textures":3},"render":{"calls":626,"triangles":22614,"lines":0,"points":0}},"sceneCounts":{"meshCount":631,"lineCount":6,"pointCount":0,"groupCount":206,"geometryCount":443,"materialCount":345},"blueprintCounts":{"beaches":0,"buildings":0,"coastlines":1,"pois":1,"roads":2,"sea":0,"transit":0,"zones":1},"sceneSignature":{"groups":[{"name":"bigBlueJ_building","childrenCount":3},{"name":"bigR_building","childrenCount":3},{"name":"BlueprintLabels","childrenCount":0},{"name":"BlueprintMeshes","childrenCount":4},{"name":"BlueprintOutlines","childrenCount":4},{"name":"BlueprintRoot","childrenCount":6},{"name":"BlueprintTraffic","childrenCount":0},{"name":"bridge","childrenCount":7},{"name":"coastB1_building","childrenCount":3},{"name":"coastB2_building","childrenCount":3},{"name":"coastQ1_building","childrenCount":4},{"name":"coastQ2_building","childrenCount":4},{"name":"colB1_building","childrenCount":3},{"name":"colCi_building","childrenCount":3},{"name":"colFf_building","childrenCount":1},{"name":"colQ_school_building","childrenCount":4},{"name":"colZC1_building","childrenCount":3},{"name":"eastH1_building","childrenCount":3},{"name":"eastH2_building","childrenCount":3},{"name":"eastM_building","childrenCount":1},{"name":"eastMA_building","childrenCount":3},{"name":"eastO_building","childrenCount":3},{"name":"eastR_building","childrenCount":3},{"name":"eastZC_tri_building","childrenCount":3},{"name":"eastZC2_building","childrenCount":3},{"name":"electric_building","childrenCount":3},{"name":"ferrisWheel","childrenCount":3},{"name":"hospB_building","childrenCount":3},{"name":"hospital_building","childrenCount":3},{"name":"hospR_building","childrenCount":3},{"name":"hospZC_tri_building","childrenCount":3},{"name":"hospZC1_building","childrenCount":3},{"name":"islandB1_building","childrenCount":3},{"name":"islandB2_building","childrenCount":3},{"name":"islandB3_building","childrenCount":3},{"name":"islandQ1_building","childrenCount":4},{"name":"islandQ2_building","childrenCount":4},{"name":"islandQ3_building","childrenCount":4},{"name":"islandZC_building","childrenCount":3},{"name":"MapOverlayGroup","childrenCount":10},{"name":"RoadCenterlines","childrenCount":0},{"name":"RoadOffsetDebug","childrenCount":0},{"name":"rubbish_building","childrenCount":1},{"name":"transport1_building","childrenCount":3},{"name":"transport2_building","childrenCount":3},{"name":"underRQ_building","childrenCount":4},{"name":"waterTreatment_building","childrenCount":3},{"name":"windmills","childrenCount":11}]},"overlayDrift":{"ok":true,"epsPx":0.05,"maxDriftPx":0,"samples":[{"px":700,"py":500,"dx":0,"dy":0},{"px":140,"py":100,"dx":0,"dy":0},{"px":1260,"py":900,"dx":0,"dy":0}]},"overlayPreviewGroups":{"BlueprintOutlines":{"childrenCount":4,"visible":false},"BlueprintMeshes":{"childrenCount":4,"visible":false},"BlueprintLabels":{"childrenCount":0,"visible":false},"RoadCenterlines":{"childrenCount":0,"visible":false},"RoadOffsetDebug":{"childrenCount":0,"visible":false}},"renderOrderSignature":{"min":0,"max":999,"unique":[0,997,999]},"renderLoopSignature":{"renderFps":{"realtime":60,"realtimeIdle":30,"idle":20,"idleNoAnim":8},"animationEnabled":false,"targetFpsByMode":{"plan":8,"3d":30,"street":30,"fidelity":8}},"viewModeSignature":{"plan":{"viewMode":"plan","overlayVisible":true,"editorVisible":false,"propsVisible":true,"fxVisible":true,"blueprintPropsVisible":false,"blueprintFxVisible":false},"3d":{"viewMode":"3d","overlayVisible":false,"editorVisible":false,"propsVisible":true,"fxVisible":true,"blueprintPropsVisible":false,"blueprintFxVisible":false},"street":{"viewMode":"street","overlayVisible":false,"editorVisible":false,"propsVisible":true,"fxVisible":true,"blueprintPropsVisible":false,"blueprintFxVisible":false},"fidelity":{"viewMode":"fidelity","overlayVisible":true,"editorVisible":false,"propsVisible":false,"fxVisible":false,"blueprintPropsVisible":false,"blueprintFxVisible":false}}}
```

## Packet Commit Evidence (captured before commit)

### git diff --stat --cached
```
 docs/ai/review_packet_phase4.md | 352 ++++++++++++++++++++++++++++++++++++++++
 1 file changed, 352 insertions(+)
```

### git diff --check --cached
```
```

## Carry-Forward

### P0 Blockers
- None identified during Phase 4.

### P1 Fold-forward
- Optional Phase 4 ImageSource upload skipped. Locator: (not implemented). Acceptance: add src/scanner/ImageSource.js and wire to persistence imageId when safe.
