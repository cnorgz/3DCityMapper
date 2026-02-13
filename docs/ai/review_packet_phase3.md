# Phase 3 Review Packet

## Metadata
- base_commit: bea3202
- phase_end_commit: 7f34515
- packet_commit: 3a63b65

## Command Outputs (verbatim)

### git status -sb
```
## refactor/phase3-blueprint-core
?? docs/ai/review_packet_phase3.md
```

### git log --oneline --decorate -n 20
```
7f34515 (HEAD -> refactor/phase3-blueprint-core) feat(phase3): add BlueprintModel + validator + normalizer
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
0c24306 (phase6-round-joins) Phase6: reduce U-turns at junctions
6a059f0 Phase6: right-hand traffic + shared car assets
00de047 Phase6: prevent blueprint headlight leak
```

### git diff --stat bea3202...7f34515
```
 city-sim.html                   | 331 +++++-----------------------------------
 docs/BLUEPRINT_SPEC.md          |  70 +++++++++
 src/core/BlueprintModel.js      |  68 +++++++++
 src/core/BlueprintNormalizer.js |  57 +++++++
 src/core/BlueprintValidator.js  | 225 +++++++++++++++++++++++++++
 5 files changed, 459 insertions(+), 292 deletions(-)
```

### git diff --check bea3202...7f34515
```
```

### git diff -U15 bea3202...7f34515 -- city-sim.html src/core src/config src/utils src/persistence docs/BLUEPRINT_SPEC.md REFACTOR_LOG.md tools/refactorProbe.js
```
diff --git a/city-sim.html b/city-sim.html
index 1f106b9..553c05c 100644
--- a/city-sim.html
+++ b/city-sim.html
@@ -770,30 +770,33 @@
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
     import { getItem, setItem } from './src/persistence/StateStore.js';
     import { runMigrations } from './src/persistence/Migrations.js';
+    import { validateBlueprint as validateBlueprintCore } from './src/core/BlueprintValidator.js';
+    import { normalizeBlueprint } from './src/core/BlueprintNormalizer.js';
+    import { BlueprintModel } from './src/core/BlueprintModel.js';

     // ============================================
     // CONFIGURATION
     // ============================================


     // ============================================
     // SCENE SETUP
     // ============================================
 const renderer = new THREE.WebGLRenderer({ antialias: true });
     renderer.setSize(window.innerWidth, window.innerHeight);
     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
 renderer.shadowMap.enabled = true;
 renderer.shadowMap.type = THREE.PCFSoftShadowMap;
     renderer.toneMapping = THREE.ACESFilmicToneMapping;
@@ -1067,30 +1070,47 @@ function getLineKind(entry) {
 }

 function isTransitKind(kind) {
   return TRANSIT_TYPES.has(normalizeLineType(kind));
 }

 function isTransitLine(type) {
   return isTransitKind(type);
 }

 function getRoadLineStyle(type) {
   const normalized = normalizeLineType(type);
   return ROAD_LINE_STYLES[normalized] || ROAD_LINE_STYLES.ROAD_MINOR;
 }

+const blueprintHelpers = {
+  normalizeTypeCode,
+  normalizeLineType,
+  ALLOWED_TYPE_CODES,
+  LINE_TYPES,
+  TRANSIT_TYPES
+};
+const blueprintModel = new BlueprintModel(blueprintHelpers);
+
+function normalizeBlueprintData(data) {
+  return normalizeBlueprint(data, blueprintHelpers);
+}
+
+function validateBlueprint(data) {
+  return validateBlueprintCore(data, blueprintHelpers);
+}
+
 // Cameras
     const aspect = window.innerWidth / window.innerHeight;
     const frustumSize = MAP_HEIGHT * 1.1;

     const orthoCamera = new THREE.OrthographicCamera(
       -frustumSize * aspect / 2,
       frustumSize * aspect / 2,
       frustumSize / 2,
       -frustumSize / 2,
       1, 2000
     );
     orthoCamera.up.set(0, 0, -1);
     orthoCamera.position.set(0, 800, 1);
     orthoCamera.lookAt(0, 0, 0);

@@ -1334,325 +1354,50 @@ function getRoadLineStyle(type) {
       mapOverlayGroup.add(blueprintMeshGroup);

       blueprintLabelGroup = new THREE.Group();
       blueprintLabelGroup.name = 'BlueprintLabels';
       mapOverlayGroup.add(blueprintLabelGroup);

       blueprintCenterlineGroup = new THREE.Group();
       blueprintCenterlineGroup.name = 'RoadCenterlines';
       mapOverlayGroup.add(blueprintCenterlineGroup);

       blueprintOffsetDebugGroup = new THREE.Group();
       blueprintOffsetDebugGroup.name = 'RoadOffsetDebug';
       mapOverlayGroup.add(blueprintOffsetDebugGroup);
     }

-    function normalizeBlueprintData(data) {
-      const normalized = {
-        meta: (data && typeof data.meta === 'object' && data.meta) ? data.meta : {},
-        coastlines: Array.isArray(data?.coastlines) ? data.coastlines : [],
-        beaches: Array.isArray(data?.beaches) ? data.beaches : [],
-        sea: Array.isArray(data?.sea) ? data.sea : [],
-        transit: Array.isArray(data?.transit) ? data.transit : [],
-        roads: Array.isArray(data?.roads) ? data.roads : [],
-        zones: Array.isArray(data?.zones) ? data.zones : [],
-        buildings: Array.isArray(data?.buildings) ? data.buildings : [],
-        pois: Array.isArray(data?.pois) ? data.pois : []
-      };
-      ['coastlines', 'beaches', 'sea', 'transit', 'roads', 'zones', 'buildings'].forEach((key) => {
-        normalized[key].forEach((entry) => {
-          if (!Array.isArray(entry.curves)) entry.curves = [];
-        });
-      });
-      normalized.zones.forEach((entry) => {
-        if (entry && entry.typeCode) entry.typeCode = normalizeTypeCode(entry.typeCode);
-      });
-      normalized.buildings.forEach((entry) => {
-        if (entry && entry.typeCode) entry.typeCode = normalizeTypeCode(entry.typeCode);
-      });
-      normalized.transit.forEach((entry) => {
-        if (entry && entry.type) entry.type = String(entry.type).toUpperCase();
-        if (entry && entry.kind) entry.kind = normalizeLineType(entry.kind);
-      });
-      normalized.roads.forEach((entry) => {
-        if (entry && entry.kind) entry.kind = normalizeLineType(entry.kind);
-        if (entry && entry.type) entry.type = normalizeLineType(entry.type);
-      });
-
-      // Merge legacy transit lines into roads so all line features live in one place.
-      if (normalized.transit.length > 0) {
-        normalized.transit.forEach((entry) => {
-          if (!entry?.polyline) return;
-          normalized.roads.push({
-            ...entry,
-            kind: normalizeLineType(entry.kind ?? entry.type ?? 'METRO')
-          });
-        });
-        normalized.transit = [];
-      }
-
-      normalized.roads.forEach((entry) => {
-        if (!entry) return;
-        if (entry.polyline) {
-          entry.kind = normalizeLineType(entry.kind ?? entry.type ?? 'ROAD_MINOR');
-          entry.type = entry.kind;
-        }
-      });
-
-      return normalized;
-    }
-
-    function validateBlueprint(data) {
-      const errors = [];
-      const warnings = [];
-
-      if (!data || typeof data !== 'object') {
-        errors.push('Blueprint must be an object.');
-        return { ok: false, errors, warnings };
-      }
-
-      ['coastlines', 'roads', 'zones', 'buildings', 'pois'].forEach((key) => {
-        if (!Array.isArray(data[key])) errors.push(`${key} must be an array.`);
-      });
-      ['beaches', 'sea'].forEach((key) => {
-        if (data[key] !== undefined && !Array.isArray(data[key])) {
-          errors.push(`${key} must be an array when provided.`);
-        }
-      });
-      if (data.transit !== undefined && !Array.isArray(data.transit)) {
-        errors.push('transit must be an array when provided.');
-      } else if (Array.isArray(data.transit) && data.transit.length > 0) {
-        warnings.push('transit is legacy; line features should live in roads[].');
-      }
-
-      const isFinitePoint = (pt) => Array.isArray(pt) && pt.length >= 2 &&
-        Number.isFinite(pt[0]) && Number.isFinite(pt[1]);
-
-      const polygonArea = (poly) => {
-        let area = 0;
-        for (let i = 0; i < poly.length; i++) {
-          const a = poly[i];
-          const b = poly[(i + 1) % poly.length];
-          area += (a[0] * b[1]) - (b[0] * a[1]);
-        }
-        return area * 0.5;
-      };
-
-      const validateCurves = (entry, idx, label) => {
-        if (!entry || entry.curves === undefined) return;
-        if (!Array.isArray(entry.curves) || !entry.curves.every(Number.isInteger)) {
-          errors.push(`${label}[${idx}] curves must be an array of indices.`);
-          return;
-        }
-        if (entry.polygon) {
-          entry.curves.forEach((c) => {
-            if (c < 0 || c >= entry.polygon.length) {
-              warnings.push(`${label}[${idx}] curve index ${c} is out of range.`);
-            }
-          });
-        }
-      };
-
-      (data.coastlines || []).forEach((entry, idx) => {
-        const poly = entry?.polygon;
-        if (!Array.isArray(poly) || poly.length < 3) {
-          errors.push(`coastlines[${idx}] polygon must have >= 3 points.`);
-          return;
-        }
-        if (!poly.every(isFinitePoint)) {
-          errors.push(`coastlines[${idx}] polygon has invalid points.`);
-          return;
-        }
-        const area = polygonArea(poly);
-        if (Math.abs(area) < 0.001) {
-          errors.push(`coastlines[${idx}] polygon area is near zero.`);
-        } else if (area < 0) {
-          warnings.push(`coastlines[${idx}] polygon winding is clockwise.`);
-        }
-        validateCurves(entry, idx, 'coastlines');
-      });
-
-      (data.beaches || []).forEach((entry, idx) => {
-        const poly = entry?.polygon;
-        if (!Array.isArray(poly) || poly.length < 3) {
-          errors.push(`beaches[${idx}] polygon must have >= 3 points.`);
-          return;
-        }
-        if (!poly.every(isFinitePoint)) {
-          errors.push(`beaches[${idx}] polygon has invalid points.`);
-          return;
-        }
-        const area = polygonArea(poly);
-        if (Math.abs(area) < 0.001) {
-          errors.push(`beaches[${idx}] polygon area is near zero.`);
-        } else if (area < 0) {
-          warnings.push(`beaches[${idx}] polygon winding is clockwise.`);
-        }
-        validateCurves(entry, idx, 'beaches');
-      });
-
-      (data.sea || []).forEach((entry, idx) => {
-        const poly = entry?.polygon;
-        if (!Array.isArray(poly) || poly.length < 3) {
-          errors.push(`sea[${idx}] polygon must have >= 3 points.`);
-          return;
-        }
-        if (!poly.every(isFinitePoint)) {
-          errors.push(`sea[${idx}] polygon has invalid points.`);
-          return;
-        }
-        const area = polygonArea(poly);
-        if (Math.abs(area) < 0.001) {
-          errors.push(`sea[${idx}] polygon area is near zero.`);
-        } else if (area < 0) {
-          warnings.push(`sea[${idx}] polygon winding is clockwise.`);
-        }
-        validateCurves(entry, idx, 'sea');
-      });
-
-      (data.transit || []).forEach((entry, idx) => {
-        if (!entry?.type && !entry?.kind) {
-          errors.push(`transit[${idx}] type is required.`);
-        }
-        const line = entry?.polyline;
-        if (!Array.isArray(line) || line.length < 2 || !line.every(isFinitePoint)) {
-          errors.push(`transit[${idx}] polyline must have >= 2 valid points.`);
-        }
-        if (entry?.stations) {
-          if (!Array.isArray(entry.stations) || !entry.stations.every(isFinitePoint)) {
-            errors.push(`transit[${idx}] stations must be an array of points.`);
-          }
-        }
-        const kind = normalizeLineType(entry?.kind ?? entry?.type);
-        if (kind && !TRANSIT_TYPES.has(kind)) {
-          warnings.push(`transit[${idx}] type "${entry.type ?? entry.kind}" is unknown.`);
-        }
-      });
-
-      (data.roads || []).forEach((entry, idx) => {
-        if (entry?.polygon) {
-          const poly = entry.polygon;
-          if (!Array.isArray(poly) || poly.length < 3 || !poly.every(isFinitePoint)) {
-            errors.push(`roads[${idx}] polygon must have >= 3 valid points.`);
-            return;
-          }
-          const area = polygonArea(poly);
-          if (Math.abs(area) < 0.001) {
-            errors.push(`roads[${idx}] polygon area is near zero.`);
-          } else if (area < 0) {
-            warnings.push(`roads[${idx}] polygon winding is clockwise.`);
-          }
-          validateCurves(entry, idx, 'roads');
-        } else if (entry?.polyline) {
-          const line = entry.polyline;
-          if (!Array.isArray(line) || line.length < 2 || !line.every(isFinitePoint)) {
-            errors.push(`roads[${idx}] polyline must have >= 2 valid points.`);
-          }
-          if (entry.type && typeof entry.type !== 'string') {
-            errors.push(`roads[${idx}] type must be a string when provided.`);
-          }
-          if (entry.kind && typeof entry.kind !== 'string') {
-            errors.push(`roads[${idx}] kind must be a string when provided.`);
-          }
-          if (entry.width !== undefined && !Number.isFinite(entry.width)) {
-            errors.push(`roads[${idx}] width must be a number when provided.`);
-          }
-          const kind = normalizeLineType(entry.kind ?? entry.type);
-          if (kind && !LINE_TYPES.has(kind)) {
-            warnings.push(`roads[${idx}] kind "${entry.kind ?? entry.type}" is unknown.`);
-          }
-        } else {
-          errors.push(`roads[${idx}] must define polygon or polyline.`);
-        }
-      });
-
-      (data.zones || []).forEach((entry, idx) => {
-        if (!entry?.typeCode || typeof entry.typeCode !== 'string') {
-          errors.push(`zones[${idx}] typeCode is required.`);
-        }
-        const normalized = normalizeTypeCode(entry?.typeCode);
-        if (normalized && !ALLOWED_TYPE_CODES.has(normalized)) {
-          warnings.push(`zones[${idx}] typeCode "${entry.typeCode}" is unknown.`);
-        }
-        const poly = entry?.polygon;
-        if (!Array.isArray(poly) || poly.length < 3 || !poly.every(isFinitePoint)) {
-          errors.push(`zones[${idx}] polygon must have >= 3 valid points.`);
-          return;
-        }
-        const area = polygonArea(poly);
-        if (Math.abs(area) < 0.001) {
-          errors.push(`zones[${idx}] polygon area is near zero.`);
-        } else if (area < 0) {
-          warnings.push(`zones[${idx}] polygon winding is clockwise.`);
-        }
-        validateCurves(entry, idx, 'zones');
-      });
-
-      (data.buildings || []).forEach((entry, idx) => {
-        if (!entry?.typeCode || typeof entry.typeCode !== 'string') {
-          errors.push(`buildings[${idx}] typeCode is required.`);
-        }
-        const normalized = normalizeTypeCode(entry?.typeCode);
-        if (normalized && !ALLOWED_TYPE_CODES.has(normalized)) {
-          warnings.push(`buildings[${idx}] typeCode "${entry.typeCode}" is unknown.`);
-        }
-        const poly = entry?.polygon;
-        if (!Array.isArray(poly) || poly.length < 3 || !poly.every(isFinitePoint)) {
-          errors.push(`buildings[${idx}] polygon must have >= 3 valid points.`);
-          return;
-        }
-        const area = polygonArea(poly);
-        if (Math.abs(area) < 0.001) {
-          errors.push(`buildings[${idx}] polygon area is near zero.`);
-        } else if (area < 0) {
-          warnings.push(`buildings[${idx}] polygon winding is clockwise.`);
-        }
-        validateCurves(entry, idx, 'buildings');
-      });
-
-      (data.pois || []).forEach((entry, idx) => {
-        if (!entry?.type || typeof entry.type !== 'string') {
-          errors.push(`pois[${idx}] type is required.`);
-        }
-        if (!entry?.position || !isFinitePoint(entry.position)) {
-          errors.push(`pois[${idx}] position must be [x, z].`);
-        }
-      });
-
-      if (errors.length === 0 && warnings.length === 0) warnings.push('OK');
-      return { ok: errors.length === 0, errors, warnings };
-    }
-
     function setBlueprintStatus(text, ok = true) {
       const el = document.getElementById('blueprintStatus');
       if (!el) return;
       el.textContent = text;
       el.style.color = ok ? '#9fb7c9' : '#ff9aa2';
     }

     async function loadBlueprintData() {
       try {
         const res = await fetch('./src/mapBlueprint.json');
         if (!res.ok) throw new Error(`Failed to load blueprint: ${res.status}`);
         const raw = await res.json();
-        const validation = validateBlueprint(raw);
+        const validation = blueprintModel.validate(raw);
         if (!validation.ok) {
           console.warn('Blueprint validation failed:', validation.errors);
           setBlueprintStatus(`Blueprint invalid: ${validation.errors[0]}`, false);
           return;
         }
-        blueprintData = normalizeBlueprintData(raw);
+        blueprintModel.loadFromJSON(raw);
+        blueprintData = blueprintModel.getData();
         buildBlueprintFromData(blueprintData);
         rebuildBlueprintCity();
         setBlueprintStatus('Blueprint status: loaded from file.');
       } catch (error) {
         console.warn('Blueprint load failed:', error);
         setBlueprintStatus('Blueprint status: load failed.', false);
       }
     }

     function buildBlueprintFromData(data) {
       if (!data) return;
       if (!blueprintOutlineGroup || !blueprintMeshGroup) return;
       resetGroup(blueprintOutlineGroup);
       resetGroup(blueprintMeshGroup);
       if (blueprintLabelGroup) resetGroup(blueprintLabelGroup);
@@ -6337,31 +6082,32 @@ function getRoadLineStyle(type) {
         } else {
           setBlueprintStatus('Blueprint validation: no data.', false);
         }
       });

       loadBtn.addEventListener('click', () => {
         const raw = jsonField.value.trim();
         if (!raw) {
           setBlueprintStatus('Blueprint load: paste JSON first.', false);
           return;
         }
         try {
           const parsed = JSON.parse(raw);
           const result = validateRaw(parsed, 'Blueprint load');
           if (!result.ok) return;
-          blueprintData = normalizeBlueprintData(parsed);
+          blueprintModel.loadFromJSON(parsed);
+          blueprintData = blueprintModel.getData();
           buildBlueprintFromData(blueprintData);
           rebuildBlueprintCity();
           setBlueprintStatus('Blueprint status: loaded from textarea.');
         } catch (e) {
           setBlueprintStatus('Blueprint load: invalid JSON.', false);
         }
       });

       if (useCityToggle) {
         useCityToggle.checked = blueprintCityEnabled;
         useCityToggle.addEventListener('change', (e) => {
           setBlueprintCityEnabled(!!e.target.checked);
         });
       }

@@ -7096,31 +6842,32 @@ function getRoadLineStyle(type) {
         blueprint: cloneBlueprintData(blueprintData),
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
-      blueprintData = normalizeBlueprintData(snapshot?.blueprint || {});
+      blueprintModel.loadFromJSON(snapshot?.blueprint || {});
+      blueprintData = blueprintModel.getData();
       editorState.draft = [];
       editorState.previewPoint = null;
       clearJunctionMode();
       editorState.hover = null;
       editorState.hoverDraftIndex = null;
       if (snapshot?.selected &&
         blueprintData?.[snapshot.selected.layer]?.[snapshot.selected.index]) {
         editorState.selected = { ...snapshot.selected };
       } else {
         editorState.selected = null;
       }
       buildBlueprintFromData(blueprintData);
       rebuildBlueprintCity();
       updateDraftLine();
       updateDraftMarkers();
@@ -7440,72 +7187,72 @@ function getRoadLineStyle(type) {
       updateJunctionMarkers();
     }

     function isDoubleClick(point) {
       const now = performance.now();
       const prev = editorState.lastPointerDown;
       editorState.lastPointerDown = { time: now, point: { x: point.x, z: point.z } };
       if (!prev) return false;
       const dt = now - prev.time;
       const dx = point.x - prev.point.x;
       const dz = point.z - prev.point.z;
       return dt < 320 && (dx * dx + dz * dz) < 36;
     }

     function addPolygonFromDraft() {
-      if (!blueprintData) blueprintData = normalizeBlueprintData({});
+      if (!blueprintData) blueprintData = blueprintModel.createBlank();
       if (editorState.draft.length < 3) return;

       pushEditorHistory(snapshotEditorState());
       const id = `${editorState.targetLayer}-${Date.now()}`;
       const polygon = editorState.draft.map(p => [p[0], p[1]]);

       if (editorState.targetLayer === 'zones') {
-        blueprintData.zones.push({ id, typeCode: editorState.typeCode, polygon, curves: [] });
+        blueprintModel.addFeature('zones', { id, typeCode: editorState.typeCode, polygon, curves: [] });
       } else if (editorState.targetLayer === 'buildings') {
-        blueprintData.buildings.push({ id, typeCode: editorState.typeCode, polygon, curves: [] });
+        blueprintModel.addFeature('buildings', { id, typeCode: editorState.typeCode, polygon, curves: [] });
       } else if (editorState.targetLayer === 'roads') {
-        blueprintData.roads.push({ id, polygon, curves: [] });
+        blueprintModel.addFeature('roads', { id, polygon, curves: [] });
       } else if (editorState.targetLayer === 'coastlines') {
-        blueprintData.coastlines.push({ id, polygon, curves: [] });
+        blueprintModel.addFeature('coastlines', { id, polygon, curves: [] });
       } else if (editorState.targetLayer === 'beaches') {
-        blueprintData.beaches.push({ id, polygon, curves: [] });
+        blueprintModel.addFeature('beaches', { id, polygon, curves: [] });
       } else if (editorState.targetLayer === 'sea') {
-        blueprintData.sea.push({ id, polygon, curves: [] });
+        blueprintModel.addFeature('sea', { id, polygon, curves: [] });
       }

       editorState.draft = [];
       editorState.previewPoint = null;
       editorState.selected = { layer: editorState.targetLayer, index: (blueprintData[editorState.targetLayer].length - 1), vertexIndex: null };
       buildBlueprintFromData(blueprintData);
       rebuildBlueprintCity();
       updateDraftLine();
       updateDraftMarkers();
       updateSelectionMarkers();
       updateEditorStatus('Polygon added.');
     }

     function addPolylineFromDraft() {
-      if (!blueprintData) blueprintData = normalizeBlueprintData({});
+      if (!blueprintData) blueprintData = blueprintModel.createBlank();
       if (editorState.draft.length < 2) return;
       pushEditorHistory(snapshotEditorState());
       const polyline = editorState.draft.map(p => [p[0], p[1]]);
       const lineType = normalizeLineType(editorState.transitType);
       const id = `line-${Date.now()}`;
       const style = getRoadLineStyle(lineType);
       const width = style?.width ?? (TRANSIT_STYLES[lineType]?.radius ? TRANSIT_STYLES[lineType].radius * 2 : 8);
-      blueprintData.roads.push({
+      blueprintModel.addFeature('roads', {
         id,
         kind: lineType,
         type: lineType,
         polyline,
         width,
         curves: []
       });
       blueprintData.transit = [];
       editorState.draft = [];
       editorState.previewPoint = null;
       clearJunctionMode();
       editorState.selected = { layer: 'roads', index: (blueprintData.roads.length - 1), vertexIndex: null };
       buildBlueprintFromData(blueprintData);
       rebuildBlueprintCity();
       updateDraftLine();
@@ -7541,34 +7288,34 @@ function getRoadLineStyle(type) {
           editorState.selected = null;
         } else {
           editorState.selected.vertexIndex = null;
         }
       } else {
         list.splice(index, 1);
         editorState.selected = null;
       }
       buildBlueprintFromData(blueprintData);
       rebuildBlueprintCity();
       updateSelectionMarkers();
       updateEditorStatus('Selection deleted.');
     }

     function addPoiAt(point) {
-      if (!blueprintData) blueprintData = normalizeBlueprintData({});
+      if (!blueprintData) blueprintData = blueprintModel.createBlank();
       pushEditorHistory(snapshotEditorState());
       const id = `poi-${Date.now()}`;
-      blueprintData.pois.push({ id, type: editorState.poiType, position: [point.x, point.z] });
+      blueprintModel.addFeature('pois', { id, type: editorState.poiType, position: [point.x, point.z] });
       buildBlueprintFromData(blueprintData);
       rebuildBlueprintCity();
       updateEditorStatus('POI added.');
     }

     function setupEditorControls() {
       const enableToggle = document.getElementById('editorEnable');
       const undoBtn = document.getElementById('editorUndo');
       const redoBtn = document.getElementById('editorRedo');
       const toolSelect = document.getElementById('editorTool');
       const layerSelect = document.getElementById('editorLayer');
       const typeSelect = document.getElementById('editorTypeCode');
       const poiSelect = document.getElementById('editorPoiType');
       const transitSelect = document.getElementById('editorTransitType');
       const junctionToggle = document.getElementById('editorJunctionMode');
@@ -7800,31 +7547,31 @@ function getRoadLineStyle(type) {
           input.value = value;
           onChange(value);
         };
         slider.addEventListener('input', (e) => apply(e.target.value));
         input.addEventListener('input', (e) => apply(e.target.value));
       };

       bindLinkedNumber(zoomSlider, zoomValue, (value) => applyEditorZoom(value));
       bindLinkedNumber(handleScaleSlider, handleScaleValue, (value) => applyHandleScale(value));

       if (deleteBtn) deleteBtn.addEventListener('click', deleteSelection);

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
diff --git a/docs/BLUEPRINT_SPEC.md b/docs/BLUEPRINT_SPEC.md
new file mode 100644
index 0000000..39dc2d0
--- /dev/null
+++ b/docs/BLUEPRINT_SPEC.md
@@ -0,0 +1,70 @@
+# Blueprint Spec (Phase 3)
+
+This is a minimal schema reference for the current blueprint JSON format. It reflects the existing `src/mapBlueprint.json` and the current runtime expectations in `city-sim.html`.
+
+## Top-level keys
+
+- `meta` (object, optional)
+- `coastlines` (array of polygon features)
+- `beaches` (array of polygon features, optional)
+- `sea` (array of polygon features, optional)
+- `roads` (array of polygon OR polyline features)
+- `zones` (array of polygon features)
+- `buildings` (array of polygon features)
+- `pois` (array of point features)
+- `transit` (legacy; array of line features that are merged into `roads` during normalization)
+
+## Feature shapes
+
+### Polygon feature
+
+```
+{
+  "id": "optional-string",
+  "polygon": [[x, z], [x, z], [x, z], ...],
+  "curves": [index, ...] // optional, indices into polygon
+}
+```
+
+### Polyline feature (roads/transit)
+
+```
+{
+  "id": "optional-string",
+  "polyline": [[x, z], [x, z], ...],
+  "kind": "ROAD_MAJOR" | "ROAD_MINOR" | "PATH" | "METRO" | "TRAIN" | "HYPERLOOP" | ...,
+  "width": 18, // optional
+  "curves": [index, ...] // optional, indices into polyline
+}
+```
+
+### Zone / Building feature
+
+```
+{
+  "id": "optional-string",
+  "typeCode": "Q" | "B" | "ZC" | "J" | "H" | ...,
+  "polygon": [[x, z], [x, z], [x, z], ...],
+  "curves": [index, ...] // optional
+}
+```
+
+### POI feature
+
+```
+{
+  "id": "optional-string",
+  "type": "METRO" | "PORT" | "ECOLE" | ...,
+  "position": [x, z]
+}
+```
+
+## Blank blueprint
+
+A “blank” blueprint is created by normalizing an empty object `{}` via the same normalize routine used at runtime. Missing top-level arrays are filled with empty arrays. This keeps the editor functional even before a file is loaded.
+
+## Notes
+
+- `transit[]` is legacy; during normalization, any entries are merged into `roads[]` and `transit` is cleared.
+- Curve indices are stored but expanded at render time. Their interpretation is consistent with current runtime behavior; no schema redesign is introduced in Phase 3.
+- The future scanner will output this same schema; do not change keys during refactor without a migration plan.
diff --git a/src/core/BlueprintModel.js b/src/core/BlueprintModel.js
new file mode 100644
index 0000000..d87521c
--- /dev/null
+++ b/src/core/BlueprintModel.js
@@ -0,0 +1,68 @@
+import { normalizeBlueprint } from './BlueprintNormalizer.js';
+import { validateBlueprint } from './BlueprintValidator.js';
+
+export class BlueprintModel {
+  constructor(helpers = {}) {
+    this.helpers = helpers;
+    this.data = null;
+  }
+
+  loadFromJSON(raw) {
+    const parsed = this._parseRaw(raw);
+    this.data = normalizeBlueprint(parsed, this.helpers);
+    return this.data;
+  }
+
+  createBlank() {
+    this.data = normalizeBlueprint({}, this.helpers);
+    return this.data;
+  }
+
+  getData() {
+    return this.data;
+  }
+
+  validate(raw) {
+    const target = raw !== undefined ? this._parseRaw(raw) : (this.data || {});
+    return validateBlueprint(target, this.helpers);
+  }
+
+  addFeature(type, feature) {
+    if (!this.data) this.createBlank();
+    if (!Array.isArray(this.data[type])) this.data[type] = [];
+    this.data[type].push(feature);
+    return feature;
+  }
+
+  updateFeature(type, id, patch) {
+    if (!this.data || !id) return false;
+    const list = this.data[type];
+    if (!Array.isArray(list)) return false;
+    const idx = list.findIndex((item) => item && item.id === id);
+    if (idx < 0) return false;
+    Object.assign(list[idx], patch);
+    return true;
+  }
+
+  removeFeature(type, id) {
+    if (!this.data || !id) return false;
+    const list = this.data[type];
+    if (!Array.isArray(list)) return false;
+    const idx = list.findIndex((item) => item && item.id === id);
+    if (idx < 0) return false;
+    list.splice(idx, 1);
+    return true;
+  }
+
+  _parseRaw(raw) {
+    if (typeof raw === 'string') {
+      try {
+        return JSON.parse(raw);
+      } catch (e) {
+        return {};
+      }
+    }
+    if (raw && typeof raw === 'object') return raw;
+    return {};
+  }
+}
diff --git a/src/core/BlueprintNormalizer.js b/src/core/BlueprintNormalizer.js
new file mode 100644
index 0000000..e0c954b
--- /dev/null
+++ b/src/core/BlueprintNormalizer.js
@@ -0,0 +1,57 @@
+export function normalizeBlueprint(data, helpers = {}) {
+  const normalizeTypeCode = helpers.normalizeTypeCode || ((code) => code);
+  const normalizeLineType = helpers.normalizeLineType || ((type) => type);
+
+  const normalized = {
+    meta: (data && typeof data.meta === 'object' && data.meta) ? data.meta : {},
+    coastlines: Array.isArray(data?.coastlines) ? data.coastlines : [],
+    beaches: Array.isArray(data?.beaches) ? data.beaches : [],
+    sea: Array.isArray(data?.sea) ? data.sea : [],
+    transit: Array.isArray(data?.transit) ? data.transit : [],
+    roads: Array.isArray(data?.roads) ? data.roads : [],
+    zones: Array.isArray(data?.zones) ? data.zones : [],
+    buildings: Array.isArray(data?.buildings) ? data.buildings : [],
+    pois: Array.isArray(data?.pois) ? data.pois : []
+  };
+  ['coastlines', 'beaches', 'sea', 'transit', 'roads', 'zones', 'buildings'].forEach((key) => {
+    normalized[key].forEach((entry) => {
+      if (!Array.isArray(entry.curves)) entry.curves = [];
+    });
+  });
+  normalized.zones.forEach((entry) => {
+    if (entry && entry.typeCode) entry.typeCode = normalizeTypeCode(entry.typeCode);
+  });
+  normalized.buildings.forEach((entry) => {
+    if (entry && entry.typeCode) entry.typeCode = normalizeTypeCode(entry.typeCode);
+  });
+  normalized.transit.forEach((entry) => {
+    if (entry && entry.type) entry.type = String(entry.type).toUpperCase();
+    if (entry && entry.kind) entry.kind = normalizeLineType(entry.kind);
+  });
+  normalized.roads.forEach((entry) => {
+    if (entry && entry.kind) entry.kind = normalizeLineType(entry.kind);
+    if (entry && entry.type) entry.type = normalizeLineType(entry.type);
+  });
+
+  // Merge legacy transit lines into roads so all line features live in one place.
+  if (normalized.transit.length > 0) {
+    normalized.transit.forEach((entry) => {
+      if (!entry?.polyline) return;
+      normalized.roads.push({
+        ...entry,
+        kind: normalizeLineType(entry.kind ?? entry.type ?? 'METRO')
+      });
+    });
+    normalized.transit = [];
+  }
+
+  normalized.roads.forEach((entry) => {
+    if (!entry) return;
+    if (entry.polyline) {
+      entry.kind = normalizeLineType(entry.kind ?? entry.type ?? 'ROAD_MINOR');
+      entry.type = entry.kind;
+    }
+  });
+
+  return normalized;
+}
diff --git a/src/core/BlueprintValidator.js b/src/core/BlueprintValidator.js
new file mode 100644
index 0000000..5531eb2
--- /dev/null
+++ b/src/core/BlueprintValidator.js
@@ -0,0 +1,225 @@
+export function validateBlueprint(data, helpers = {}) {
+  const errors = [];
+  const warnings = [];
+  const normalizeTypeCode = helpers.normalizeTypeCode || ((code) => code);
+  const normalizeLineType = helpers.normalizeLineType || ((type) => type);
+  const ALLOWED_TYPE_CODES = helpers.ALLOWED_TYPE_CODES || new Set();
+  const LINE_TYPES = helpers.LINE_TYPES || new Set();
+  const TRANSIT_TYPES = helpers.TRANSIT_TYPES || new Set();
+
+  if (!data || typeof data !== 'object') {
+    errors.push('Blueprint must be an object.');
+    return { ok: false, errors, warnings };
+  }
+
+  ['coastlines', 'roads', 'zones', 'buildings', 'pois'].forEach((key) => {
+    if (!Array.isArray(data[key])) errors.push(`${key} must be an array.`);
+  });
+  ['beaches', 'sea'].forEach((key) => {
+    if (data[key] !== undefined && !Array.isArray(data[key])) {
+      errors.push(`${key} must be an array when provided.`);
+    }
+  });
+  if (data.transit !== undefined && !Array.isArray(data.transit)) {
+    errors.push('transit must be an array when provided.');
+  } else if (Array.isArray(data.transit) && data.transit.length > 0) {
+    warnings.push('transit is legacy; line features should live in roads[].');
+  }
+
+  const isFinitePoint = (pt) => Array.isArray(pt) && pt.length >= 2 &&
+    Number.isFinite(pt[0]) && Number.isFinite(pt[1]);
+
+  const polygonArea = (poly) => {
+    let area = 0;
+    for (let i = 0; i < poly.length; i++) {
+      const a = poly[i];
+      const b = poly[(i + 1) % poly.length];
+      area += (a[0] * b[1]) - (b[0] * a[1]);
+    }
+    return area * 0.5;
+  };
+
+  const validateCurves = (entry, idx, label) => {
+    if (!entry || entry.curves === undefined) return;
+    if (!Array.isArray(entry.curves) || !entry.curves.every(Number.isInteger)) {
+      errors.push(`${label}[${idx}] curves must be an array of indices.`);
+      return;
+    }
+    if (entry.polygon) {
+      entry.curves.forEach((c) => {
+        if (c < 0 || c >= entry.polygon.length) {
+          warnings.push(`${label}[${idx}] curve index ${c} is out of range.`);
+        }
+      });
+    }
+  };
+
+  (data.coastlines || []).forEach((entry, idx) => {
+    const poly = entry?.polygon;
+    if (!Array.isArray(poly) || poly.length < 3) {
+      errors.push(`coastlines[${idx}] polygon must have >= 3 points.`);
+      return;
+    }
+    if (!poly.every(isFinitePoint)) {
+      errors.push(`coastlines[${idx}] polygon has invalid points.`);
+      return;
+    }
+    const area = polygonArea(poly);
+    if (Math.abs(area) < 0.001) {
+      errors.push(`coastlines[${idx}] polygon area is near zero.`);
+    } else if (area < 0) {
+      warnings.push(`coastlines[${idx}] polygon winding is clockwise.`);
+    }
+    validateCurves(entry, idx, 'coastlines');
+  });
+
+  (data.beaches || []).forEach((entry, idx) => {
+    const poly = entry?.polygon;
+    if (!Array.isArray(poly) || poly.length < 3) {
+      errors.push(`beaches[${idx}] polygon must have >= 3 points.`);
+      return;
+    }
+    if (!poly.every(isFinitePoint)) {
+      errors.push(`beaches[${idx}] polygon has invalid points.`);
+      return;
+    }
+    const area = polygonArea(poly);
+    if (Math.abs(area) < 0.001) {
+      errors.push(`beaches[${idx}] polygon area is near zero.`);
+    } else if (area < 0) {
+      warnings.push(`beaches[${idx}] polygon winding is clockwise.`);
+    }
+    validateCurves(entry, idx, 'beaches');
+  });
+
+  (data.sea || []).forEach((entry, idx) => {
+    const poly = entry?.polygon;
+    if (!Array.isArray(poly) || poly.length < 3) {
+      errors.push(`sea[${idx}] polygon must have >= 3 points.`);
+      return;
+    }
+    if (!poly.every(isFinitePoint)) {
+      errors.push(`sea[${idx}] polygon has invalid points.`);
+      return;
+    }
+    const area = polygonArea(poly);
+    if (Math.abs(area) < 0.001) {
+      errors.push(`sea[${idx}] polygon area is near zero.`);
+    } else if (area < 0) {
+      warnings.push(`sea[${idx}] polygon winding is clockwise.`);
+    }
+    validateCurves(entry, idx, 'sea');
+  });
+
+  (data.transit || []).forEach((entry, idx) => {
+    if (!entry?.type && !entry?.kind) {
+      errors.push(`transit[${idx}] type is required.`);
+    }
+    const line = entry?.polyline;
+    if (!Array.isArray(line) || line.length < 2 || !line.every(isFinitePoint)) {
+      errors.push(`transit[${idx}] polyline must have >= 2 valid points.`);
+    }
+    if (entry?.stations) {
+      if (!Array.isArray(entry.stations) || !entry.stations.every(isFinitePoint)) {
+        errors.push(`transit[${idx}] stations must be an array of points.`);
+      }
+    }
+    const kind = normalizeLineType(entry?.kind ?? entry?.type);
+    if (kind && !TRANSIT_TYPES.has(kind)) {
+      warnings.push(`transit[${idx}] type "${entry.type ?? entry.kind}" is unknown.`);
+    }
+  });
+
+  (data.roads || []).forEach((entry, idx) => {
+    if (entry?.polygon) {
+      const poly = entry.polygon;
+      if (!Array.isArray(poly) || poly.length < 3 || !poly.every(isFinitePoint)) {
+        errors.push(`roads[${idx}] polygon must have >= 3 valid points.`);
+        return;
+      }
+      const area = polygonArea(poly);
+      if (Math.abs(area) < 0.001) {
+        errors.push(`roads[${idx}] polygon area is near zero.`);
+      } else if (area < 0) {
+        warnings.push(`roads[${idx}] polygon winding is clockwise.`);
+      }
+      validateCurves(entry, idx, 'roads');
+    } else if (entry?.polyline) {
+      const line = entry.polyline;
+      if (!Array.isArray(line) || line.length < 2 || !line.every(isFinitePoint)) {
+        errors.push(`roads[${idx}] polyline must have >= 2 valid points.`);
+      }
+      if (entry.type && typeof entry.type !== 'string') {
+        errors.push(`roads[${idx}] type must be a string when provided.`);
+      }
+      if (entry.kind && typeof entry.kind !== 'string') {
+        errors.push(`roads[${idx}] kind must be a string when provided.`);
+      }
+      if (entry.width !== undefined && !Number.isFinite(entry.width)) {
+        errors.push(`roads[${idx}] width must be a number when provided.`);
+      }
+      const kind = normalizeLineType(entry.kind ?? entry.type);
+      if (kind && !LINE_TYPES.has(kind)) {
+        warnings.push(`roads[${idx}] kind "${entry.kind ?? entry.type}" is unknown.`);
+      }
+    } else {
+      errors.push(`roads[${idx}] must define polygon or polyline.`);
+    }
+  });
+
+  (data.zones || []).forEach((entry, idx) => {
+    if (!entry?.typeCode || typeof entry.typeCode !== 'string') {
+      errors.push(`zones[${idx}] typeCode is required.`);
+    }
+    const normalized = normalizeTypeCode(entry?.typeCode);
+    if (normalized && !ALLOWED_TYPE_CODES.has(normalized)) {
+      warnings.push(`zones[${idx}] typeCode "${entry.typeCode}" is unknown.`);
+    }
+    const poly = entry?.polygon;
+    if (!Array.isArray(poly) || poly.length < 3 || !poly.every(isFinitePoint)) {
+      errors.push(`zones[${idx}] polygon must have >= 3 valid points.`);
+      return;
+    }
+    const area = polygonArea(poly);
+    if (Math.abs(area) < 0.001) {
+      errors.push(`zones[${idx}] polygon area is near zero.`);
+    } else if (area < 0) {
+      warnings.push(`zones[${idx}] polygon winding is clockwise.`);
+    }
+    validateCurves(entry, idx, 'zones');
+  });
+
+  (data.buildings || []).forEach((entry, idx) => {
+    if (!entry?.typeCode || typeof entry.typeCode !== 'string') {
+      errors.push(`buildings[${idx}] typeCode is required.`);
+    }
+    const normalized = normalizeTypeCode(entry?.typeCode);
+    if (normalized && !ALLOWED_TYPE_CODES.has(normalized)) {
+      warnings.push(`buildings[${idx}] typeCode "${entry.typeCode}" is unknown.`);
+    }
+    const poly = entry?.polygon;
+    if (!Array.isArray(poly) || poly.length < 3 || !poly.every(isFinitePoint)) {
+      errors.push(`buildings[${idx}] polygon must have >= 3 valid points.`);
+      return;
+    }
+    const area = polygonArea(poly);
+    if (Math.abs(area) < 0.001) {
+      errors.push(`buildings[${idx}] polygon area is near zero.`);
+    } else if (area < 0) {
+      warnings.push(`buildings[${idx}] polygon winding is clockwise.`);
+    }
+    validateCurves(entry, idx, 'buildings');
+  });
+
+  (data.pois || []).forEach((entry, idx) => {
+    if (!entry?.type || typeof entry.type !== 'string') {
+      errors.push(`pois[${idx}] type is required.`);
+    }
+    if (!entry?.position || !isFinitePoint(entry.position)) {
+      errors.push(`pois[${idx}] position must be [x, z].`);
+    }
+  });
+
+  if (errors.length === 0 && warnings.length === 0) warnings.push('OK');
+  return { ok: errors.length === 0, errors, warnings };
+}

```

## Deterministic Invariant Checks (verbatim)

### command -v rg >/dev/null && echo "rg=1" || echo "rg=0"
```
rg=1
```

### grep -nF "refactorProbe" city-sim.html
```
1160:    const probeEnabled = new URLSearchParams(location.search).has('refactorProbe');
1214:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

### grep -nF "import('./tools/refactorProbe.js')" city-sim.html || grep -nF 'import("./tools/refactorProbe.js")' city-sim.html
```
1214:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

### rg -n "localStorage\." city-sim.html src || true
```
src/persistence/StateStore.js:24:  const raw = localStorage.getItem(makeKey(key));
src/persistence/StateStore.js:32:  localStorage.setItem(makeKey(key), json);
src/persistence/StateStore.js:37:  localStorage.removeItem(makeKey(key));
src/persistence/StateStore.js:41:  return localStorage.getItem(makeKey(key)) != null;
src/persistence/StateStore.js:55:  localStorage.setItem(fullKey, json);
src/persistence/StateStore.js:60:  const raw = localStorage.getItem(fullKey);
```

## Probe Summary (from runRefactorProbe)
```
{
  "sceneCounts": {
    "meshCount": 631,
    "lineCount": 6,
    "pointCount": 0,
    "groupCount": 206,
    "geometryCount": 443,
    "materialCount": 345
  },
  "blueprintCounts": {
    "beaches": 0,
    "buildings": 0,
    "coastlines": 1,
    "pois": 1,
    "roads": 2,
    "sea": 0,
    "transit": 0,
    "zones": 1
  },
  "overlayDrift": {
    "ok": true,
    "epsPx": 0.05,
    "maxDriftPx": 0,
    "samples": [
      {"px":700,"py":500,"dx":0,"dy":0},
      {"px":140,"py":100,"dx":0,"dy":0},
      {"px":1260,"py":900,"dx":0,"dy":0}
    ]
  },
  "rendererInfo": {
    "memory": {"geometries": 436, "textures": 3},
    "render": {"calls": 626, "triangles": 22614, "lines": 0, "points": 0}
  }
}
```

## Node ESM import smoke
```
ok
(node:55902) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///Users/xavstack/Documents/1.CODE/1_Games/City_simulator/TADHG/src/core/BlueprintModel.js is not specified and it doesn't parse as CommonJS.
Reparsing as ES module because module syntax was detected. This incurs a performance overhead.
To eliminate this warning, add "type": "module" to /Users/xavstack/package.json.
(Use `node --trace-warnings ...` to show where the warning was created)
```

## Packet Commit Evidence (captured before commit)

### git diff --stat --cached
```
 docs/ai/review_packet_phase3.md | 1247 +++++++++++++++++++++++++++++++++++++++
 1 file changed, 1247 insertions(+)
```

### git diff --check --cached
```
```

## File/Export Summary

- src/core/BlueprintValidator.js
  - exports: validateBlueprint(data, helpers)
- src/core/BlueprintNormalizer.js
  - exports: normalizeBlueprint(data, helpers)
- src/core/BlueprintModel.js
  - exports: BlueprintModel
- docs/BLUEPRINT_SPEC.md
  - new minimal schema reference

city-sim.html imports:
```
import { validateBlueprint as validateBlueprintCore } from './src/core/BlueprintValidator.js';
import { normalizeBlueprint } from './src/core/BlueprintNormalizer.js';
import { BlueprintModel } from './src/core/BlueprintModel.js';
```

## Carry-Forward

### P0 Blockers
- None identified during Phase 3.

### P1 Fold-forward
- Blueprint mutations still occur directly in editor paths (e.g., deleteSelection / vertex edits) without BlueprintModel methods. Locator: city-sim.html (editor mutation blocks). Acceptance: route complex mutations through BlueprintModel or formally document exceptions.
