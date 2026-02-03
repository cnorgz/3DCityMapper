# Phase 2 Review Packet

## 1) Metadata
- base_commit: 3d10457
- phase_end_commit: 15e5136
- packet_commit: (pending)
- Branch: refactor/phase2-persistence

## 2) Phase Summary (human)
- Added persistence foundations (StateStore + Migrations) with new key namespace `3dcm:v1:`.
- Migrated legacy overlay calibration + panel collapsed keys on boot (idempotent, no overwrites).
- Replaced direct localStorage usage in city-sim.html with StateStore for overlay, editor snap, traffic, blueprint preview settings.
- Added EventBus/EventCatalog skeleton (warn+count only).
- Captured baseline probe JSON in REFACTOR_LOG.md (phase1.1-baseline).

## 3) Git Evidence

### git status -sb
```
## refactor/phase2-persistence
```

### git log --oneline --decorate -n 20
```
15e5136 (HEAD -> refactor/phase2-persistence) feat(phase2): add StateStore + migrations + opt-in persistence
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
0c24306 (phase6-round-joins) Phase6: reduce U-turns at junctions
6a059f0 Phase6: right-hand traffic + shared car assets
00de047 Phase6: prevent blueprint headlight leak
30cac6d Phase6: persist junction markers
e651701 Phase6: keep traffic paths inside ribbon
```

### git diff --stat 3d10457...15e5136
```
 city-sim.html                 | 101 +++++++++++++++++++++++++++++++++++++++---
 docs/LOCALSTORAGE_KEYS.md     |  52 +++++++++++++++++++---
 docs/PERSISTENCE.md           |  40 +++++++++++++++++
 src/persistence/Migrations.js |  47 ++++++++++++++++++++
 src/persistence/StateStore.js |  63 ++++++++++++++++++++++++++
 src/utils/EventBus.js         |  23 ++++++++++
 src/utils/EventCatalog.js     |   7 +++
 7 files changed, 320 insertions(+), 13 deletions(-)
```

### git diff --check 3d10457...15e5136
```
```

### git diff -U15 3d10457...15e5136 -- $FOCUS_PATHS
```
diff --git a/city-sim.html b/city-sim.html
index cd3585b..1f106b9 100644
--- a/city-sim.html
+++ b/city-sim.html
@@ -747,52 +747,53 @@
     import { Line2 } from 'three/addons/lines/Line2.js';
     import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
     import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
     import { MapCoordMapper, createMapOverlay } from './src/mapOverlay.js';
     import {
       MAP_WIDTH,
       MAP_HEIGHT,
       MAP_OVERLAY_IMG_W,
       MAP_OVERLAY_IMG_H,
       MAP_OVERLAY_WORLD_W,
       MAP_OVERLAY_WORLD_H,
       GRID_STEP_X,
       GRID_STEP_Z,
       IS_DEV,
       Y,
-      OVERLAY_STORAGE_KEY,
       OVERLAY_DEFAULTS,
       OVERLAY_LIMITS,
       LINE_TYPES,
       TRANSIT_TYPES,
       USE_RIBBON_ROADS
     } from './src/config/constants.js';
     import {
       COLORS,
       POI_COLORS,
       ROAD_LINE_STYLES,
       TRANSIT_STYLES
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
+    import { getItem, setItem } from './src/persistence/StateStore.js';
+    import { runMigrations } from './src/persistence/Migrations.js';
@@ -931,30 +932,43 @@ let editorDraftGlowLine = null;
 let editorSelectionLine = null;
 let editorSelectionGlowLine = null;
 let editorDraftRibbon = null;
 let editorSelectionRibbon = null;
 let editorVertexGroup = null;
 let editorDraftVertexGroup = null;
 let editorLineEndpointGroup = null;
 let editorJunctionMarkerGroup = null;
 const debugSettings = {
   showGrid: false,
   showOverlayBounds: false,
   showBlueprintOutlines: false,
   showRoadCenterlines: false
 };

+const PERSISTENCE_IMAGE_ID = 'demo';
+const PERSIST_KEYS = {
+  overlayCalib: `overlayCalib:${PERSISTENCE_IMAGE_ID}`,
+  overlayPanelCollapsed: 'ui.overlayPanelCollapsed',
+  editorSnapGrid: 'editor.snapGrid',
+  editorSnapPixels: 'editor.snapPixels',
+  editorPixelStep: 'editor.pixelStep',
+  trafficMaxCars: 'traffic.maxCars',
+  trafficSpeedScale: 'traffic.speedScale',
+  blueprintOpacity: 'blueprint.opacity',
+  blueprintShowLabels: 'blueprint.showLabels'
+};
@@ -5882,30 +5896,36 @@ function getRoadLineStyle(type) {
     async function init() {
       console.log("TADHG CITY SIMULATOR - VERSION 2.1 - ROBUST FIXES APPLIED");
       // Show loading progress
       const loadingBar = document.getElementById('loadingBar');

       loadingBar.style.width = '20%';
+
+      try {
+        runMigrations({ imageId: PERSISTENCE_IMAGE_ID });
+      } catch (error) {
+        console.warn('Failed to run migrations:', error);
+      }
@@ -6017,41 +6037,41 @@ function getRoadLineStyle(type) {
       const loadSettings = () => {
         try {
-          const stored = localStorage.getItem(OVERLAY_STORAGE_KEY);
-          if (stored) return normalizeOverlaySettings(JSON.parse(stored));
+          const stored = getItem(PERSIST_KEYS.overlayCalib);
+          if (stored) return normalizeOverlaySettings(stored);
         } catch (e) {
           console.warn('Failed to load overlay calibration:', e);
         }
         return { ...OVERLAY_DEFAULTS };
       };
@@ -6152,47 +6172,47 @@ function getRoadLineStyle(type) {
       if (panelToggle && panel) {
-        const STORAGE_KEY = 'tadhgOverlayPanelCollapsed';
         const applyPanelState = (collapsed) => {
           panel.classList.toggle('collapsed', collapsed);
           panelToggle.textContent = collapsed ? 'Show' : 'Hide';
         };
         let collapsed = false;
         try {
-          collapsed = localStorage.getItem(STORAGE_KEY) === 'true';
+          const stored = getItem(PERSIST_KEYS.overlayPanelCollapsed);
+          if (typeof stored === 'boolean') collapsed = stored;
         } catch (e) {
           collapsed = false;
         }
         applyPanelState(collapsed);
         panelToggle.addEventListener('click', () => {
           collapsed = !collapsed;
           applyPanelState(collapsed);
           try {
-            localStorage.setItem(STORAGE_KEY, collapsed ? 'true' : 'false');
+            setItem(PERSIST_KEYS.overlayPanelCollapsed, collapsed);
           } catch (e) {
             // ignore
           }
         });
       }
@@ -6210,48 +6230,66 @@ function getRoadLineStyle(type) {
       if (!loadBtn || !saveBtn || !copyBtn || !validateBtn || !jsonField) return;

+      try {
+        const storedOpacity = getItem(PERSIST_KEYS.blueprintOpacity);
+        if (Number.isFinite(storedOpacity)) {
+          blueprintPreviewSettings.opacity = clampNumber(storedOpacity, 0.1, 1);
+        }
+        const storedLabels = getItem(PERSIST_KEYS.blueprintShowLabels);
+        if (typeof storedLabels === 'boolean') {
+          blueprintPreviewSettings.showLabels = storedLabels;
+        }
+      } catch (e) {
+        // ignore persistence load errors
+      }
@@ -6318,30 +6356,35 @@ function getRoadLineStyle(type) {
       if (labelsToggle) {
         labelsToggle.addEventListener('change', (e) => {
           blueprintPreviewSettings.showLabels = !!e.target.checked;
+          try {
+            setItem(PERSIST_KEYS.blueprintShowLabels, blueprintPreviewSettings.showLabels);
+          } catch (e) {
+            // ignore persistence errors
+          }
           updateBlueprintPreview();
         });
       }
@@ -7539,30 +7582,49 @@ function getRoadLineStyle(type) {
       if (!enableToggle) return;

+      try {
+        const storedSnapGrid = getItem(PERSIST_KEYS.editorSnapGrid);
+        if (typeof storedSnapGrid === 'boolean') editorState.snapGrid = storedSnapGrid;
+        const storedSnapPixels = getItem(PERSIST_KEYS.editorSnapPixels);
+        if (typeof storedSnapPixels === 'boolean') editorState.snapPixels = storedSnapPixels;
+        const storedPixelStep = getItem(PERSIST_KEYS.editorPixelStep);
+        if (Number.isFinite(storedPixelStep)) editorState.pixelStep = storedPixelStep;
+        const storedMaxCars = getItem(PERSIST_KEYS.trafficMaxCars);
+        if (Number.isFinite(storedMaxCars)) {
+          trafficRuntime.maxCars = Math.max(0, Math.min(40, Number.parseInt(storedMaxCars, 10) || 0));
+        }
+        const storedSpeedScale = getItem(PERSIST_KEYS.trafficSpeedScale);
+        if (Number.isFinite(storedSpeedScale)) {
+          trafficRuntime.speedScale = Math.max(0.2, Math.min(3, Number.parseFloat(storedSpeedScale) || 1));
+        }
+      } catch (e) {
+        // ignore persistence load errors
+      }
@@ -7642,35 +7704,45 @@ function getRoadLineStyle(type) {
       bindTrafficNumber(trafficCarSlider, trafficCarValue, (value) => {
         trafficRuntime.maxCars = Math.max(0, Math.min(40, Number.parseInt(value, 10) || 0));
+        try {
+          setItem(PERSIST_KEYS.trafficMaxCars, trafficRuntime.maxCars);
+        } catch (e) {
+          // ignore persistence errors
+        }
         rebuildBlueprintTraffic();
       });
@@ -7679,42 +7751,57 @@ function getRoadLineStyle(type) {
       if (snapGridToggle) {
         snapGridToggle.addEventListener('change', (e) => {
           editorState.snapGrid = !!e.target.checked;
+          try {
+            setItem(PERSIST_KEYS.editorSnapGrid, editorState.snapGrid);
+          } catch (e) {
+            // ignore persistence errors
+          }
         });
       }
@@ -7685,14 +7767,19 @@ function getRoadLineStyle(type) {
       if (snapPixelToggle) {
         snapPixelToggle.addEventListener('change', (e) => {
           editorState.snapPixels = !!e.target.checked;
+          try {
+            setItem(PERSIST_KEYS.editorSnapPixels, editorState.snapPixels);
+          } catch (e) {
+            // ignore persistence errors
+          }
         });
       }
@@ -7692,10 +7779,15 @@ function getRoadLineStyle(type) {
       if (pixelStepInput) {
         pixelStepInput.addEventListener('input', (e) => {
           editorState.pixelStep = Number.parseFloat(e.target.value) || 1;
+          try {
+            setItem(PERSIST_KEYS.editorPixelStep, editorState.pixelStep);
+          } catch (e) {
+            // ignore persistence errors
+          }
         });
       }
@@ -7703,7 +7795,7 @@ function getRoadLineStyle(type) {
       bindLinkedNumber(zoomSlider, zoomValue, (value) => applyEditorZoom(value));
```

## 4) Deterministic invariant checks (verbatim)

command -v rg >/dev/null && echo "rg=1" || echo "rg=0"
```
rg=1
```

grep -nF "refactorProbe" city-sim.html
```
1140:    const probeEnabled = new URLSearchParams(location.search).has('refactorProbe');
1194:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

grep -nF "import('./tools/refactorProbe.js')" city-sim.html || grep -nF 'import("./tools/refactorProbe.js")' city-sim.html
```
1194:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

rg -n "localStorage\." city-sim.html src || true
```
src/persistence/StateStore.js:24:  const raw = localStorage.getItem(makeKey(key));
src/persistence/StateStore.js:32:  localStorage.setItem(makeKey(key), json);
src/persistence/StateStore.js:37:  localStorage.removeItem(makeKey(key));
src/persistence/StateStore.js:41:  return localStorage.getItem(makeKey(key)) != null;
src/persistence/StateStore.js:55:  localStorage.setItem(fullKey, json);
src/persistence/StateStore.js:60:  const raw = localStorage.getItem(fullKey);
```

## 5) Packet commit evidence (pre-commit)

- git diff --stat --cached
```
 docs/ai/review_packet_phase2.md | 330 ++++++++++++++++++++++++++++++++++++++++
 1 file changed, 330 insertions(+)
```

- git diff --check --cached
```
```

## 6) Carry-Forward

### P0 blockers (must fix before Phase 3)
- None identified in Phase 2.

### P1 fold-forward
- EventCatalog is empty (placeholder). Populate with concrete events when UI module extraction begins (src/utils/EventCatalog.js).
