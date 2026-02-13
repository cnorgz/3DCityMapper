# Review Packet - Phase 11h

## Metadata
- branch: refactor/phase11h-image-source-normalize-2048
- base_commit: edc47d8
- phase_end_commit: 0afa0d9
- packet_commit: PENDING (self-reference; see git log)
- focus_paths: src/scanner/ImageSource.js src/config/constants.js src/core/OverlayTransform.js city-sim.html REFACTOR_LOG.md docs/ai/review_packet_phase11h.md

## Determinism
```text
rg=1
```

## Probe Summary
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_len: 3977
- json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
- sceneCounts: {"meshCount":631,"lineCount":6,"pointCount":0,"groupCount":206,"geometryCount":443,"materialCount":345}
- blueprintCounts: {"beaches":0,"buildings":0,"coastlines":1,"pois":1,"roads":2,"sea":0,"transit":0,"zones":1}
- overlayDrift: {"ok":true,"epsPx":0.05,"maxDriftPx":0}
- rendererInfo: {"memory":{"geometries":436,"textures":3},"render":{"calls":626,"triangles":22614,"lines":0,"points":0}}
- parity_decision: PASS (tracked fields unchanged and hash matches baseline snapshot)

## Fixed Command Evidence
### git status -sb
```text
## refactor/phase11h-image-source-normalize-2048
AM docs/ai/review_packet_phase11h.md
```

### git rev-parse --short HEAD
```text
0afa0d9
```

### git log --oneline --decorate -n 20
```text
0afa0d9 (HEAD -> refactor/phase11h-image-source-normalize-2048) docs(phase11h): record readiness-gated probe
8ede508 refactor(phase11h): harden image source normalization metadata
edc47d8 (refactor/phase11g_1-log-metadata) docs(ai): add review packet for phase 11g_1
880a352 docs(phase11g_1): backfill phase11g log metadata
6eee608 (refactor/phase11f_1-log-metadata) docs(ai): add review packet for phase 11f_1
96abc39 docs(phase11f_1): backfill phase11f log metadata
d3b3298 (refactor/phase11e_1-log-metadata) docs(ai): add review packet for phase 11e_1
311a419 docs(phase11e_1): backfill phase11e log metadata
ded6d59 (refactor/phase11g-scanner-use-draft-builder) docs(ai): add review packet for phase 11g
8eb12e4 docs(phase11g): record readiness-gated probe
7bbda6f refactor(phase11g): wire scanner controller through DraftBlueprintBuilder
53c2bbc (refactor/phase11f-draft-blueprint-builder) docs(ai): add review packet for phase 11f
0a201ba docs(phase11f): record readiness-gated probe
e017763 refactor(phase11f): add DraftBlueprintBuilder placeholder
b029371 (refactor/phase11e-legendrules-to-config) docs(ai): add review packet for phase 11e
08dba45 docs(phase11e): record readiness-gated probe
5b1d1fb refactor(phase11e): move legendRules to src/config with scanner shim
cb56281 (refactor/phase11d_1-log-metadata) docs(ai): add review packet for phase 11d_1
be84cb6 docs(phase11d_1): backfill phase11d log metadata
0a9750b (refactor/phase11d-scanner-draft-pipeline) docs(ai): add review packet for phase 11d
```

### git diff --stat edc47d8...0afa0d9 -- <focus_paths>
```text
 REFACTOR_LOG.md            | 16 ++++++++++++++++
 src/config/constants.js    |  1
 src/scanner/ImageSource.js | 27 +++++++++++++++++++++++----
 3 files changed, 40 insertions(+), 4 deletions(-)
```

### git diff --check edc47d8...0afa0d9 -- <focus_paths>
```text
```

### git diff -U15 edc47d8...0afa0d9 -- <focus_paths>
```diff
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index c492fff..40fe7a0 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -466,15 +466,31 @@ Probe check (post-extraction):

 ## Phase 11g – Scanner controller uses DraftBlueprintBuilder

 - branch: refactor/phase11g-scanner-use-draft-builder
 - base_commit: 53c2bbc
 - phase_end_commit: 8eb12e4
 - packet_commit: ded6d59
 - capture_method: codex-mcp (readiness gated)
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_len: 3978
 - json_sha256: c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
 - parity_decision: PASS (tracked fields unchanged and hash matches baseline snapshot)
+
+## Phase 11h – ImageSource normalization to maxEdge=2048
+
+- branch: refactor/phase11h-image-source-normalize-2048
+- base_commit: edc47d8
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
+- parity_decision: PASS (tracked fields unchanged and hash matches baseline snapshot)
diff --git a/src/config/constants.js b/src/config/constants.js
index 0db7351..0dfac53 100644
--- a/src/config/constants.js
+++ b/src/config/constants.js
@@ -10,30 +10,31 @@ export const GRID_STEP_Z = MAP_OVERLAY_WORLD_H / 20;

 export const IS_DEV = true; // Set to false for production

 export const Y = {
   terrainSea: -2,
   beach: -1,
   land: 0,
   island: 0.5,
   zones: 1.0,
   overlay: 1.015,
   roads: 1.02,
   buildings: 1.05
 };

 export const OVERLAY_STORAGE_KEY = 'tadhgCityOverlayCalib';
+export const OVERLAY_IMPORT_MAX_EDGE_PX = 2048;
 export const OVERLAY_DEFAULTS = {
   offsetX: 0,
   offsetZ: 0,
   rotation: 0,
   scale: 1,
   opacity: 0.9,
   dimmer: 0,
   visible: true
 };
 export const OVERLAY_LIMITS = {
   offsetX: { min: -400, max: 400 },
   offsetZ: { min: -400, max: 400 },
   rotation: { min: -45, max: 45 },
   scale: { min: 0.5, max: 1.5 },
   opacity: { min: 0, max: 1 },
diff --git a/src/scanner/ImageSource.js b/src/scanner/ImageSource.js
index 00b0612..1230d0d 100644
--- a/src/scanner/ImageSource.js
+++ b/src/scanner/ImageSource.js
@@ -1,57 +1,68 @@
 import { getItem, setItem, removeItem } from '../persistence/StateStore.js';
+import { OVERLAY_IMPORT_MAX_EDGE_PX } from '../config/constants.js';

 const STORAGE_KEYS = {
   imageId: 'overlay.imageId',
   imageData: 'overlay.imageData',
   imageMeta: 'overlay.imageMeta'
 };

-const MAX_EDGE_PX = 2048;
-
 let currentImageId = null;
 let currentDataUrl = null;
 let currentMeta = null;

 function safeParseImageMeta(raw) {
   if (!raw || typeof raw !== 'object') return null;
   const width = Number(raw.width);
   const height = Number(raw.height);
   if (!Number.isFinite(width) || !Number.isFinite(height)) return null;
+  const originalWidth = Number.isFinite(Number(raw.originalWidth))
+    ? Number(raw.originalWidth)
+    : width;
+  const originalHeight = Number.isFinite(Number(raw.originalHeight))
+    ? Number(raw.originalHeight)
+    : height;
+  const scaleFactor = Number.isFinite(Number(raw.scaleFactor))
+    ? Number(raw.scaleFactor)
+    : 1;
   return {
     width,
     height,
+    originalWidth,
+    originalHeight,
+    scaleFactor,
     name: raw.name || '',
     size: Number.isFinite(raw.size) ? raw.size : 0,
     lastModified: Number.isFinite(raw.lastModified) ? raw.lastModified : 0
   };
 }

 export function getImageId() {
   return currentImageId;
 }

 export function getDataURL() {
   return currentDataUrl;
 }

 export function getImageMeta() {
   return currentMeta;
 }

 export function getMaxEdgePx() {
-  return MAX_EDGE_PX;
+  return OVERLAY_IMPORT_MAX_EDGE_PX;
 }

 export function loadFromStore() {
   const storedId = getItem(STORAGE_KEYS.imageId);
   const storedData = getItem(STORAGE_KEYS.imageData);
   const storedMeta = safeParseImageMeta(getItem(STORAGE_KEYS.imageMeta));
   if (storedId && storedData) {
     currentImageId = storedId;
     currentDataUrl = storedData;
     currentMeta = storedMeta;
     return true;
   }
   return false;
 }

@@ -92,36 +103,44 @@ function normalizeDataUrl(img, maxEdgePx) {

   const canvas = document.createElement('canvas');
   canvas.width = targetW;
   canvas.height = targetH;
   const ctx = canvas.getContext('2d');
   ctx.drawImage(img, 0, 0, targetW, targetH);
   const dataUrl = canvas.toDataURL('image/png');
   return { dataUrl, width: targetW, height: targetH };
 }

 export async function setFromFile(file) {
   if (!file) return null;
   const imageId = computeImageId(file);
   const rawDataUrl = await readFileAsDataURL(file);
   const img = await loadImage(rawDataUrl);
-  const normalized = normalizeDataUrl(img, MAX_EDGE_PX);
+  const normalized = normalizeDataUrl(img, OVERLAY_IMPORT_MAX_EDGE_PX);
   if (!normalized.dataUrl) return null;
+  const originalWidth = img.naturalWidth || img.width || normalized.width;
+  const originalHeight = img.naturalHeight || img.height || normalized.height;
+  const maxOriginal = Math.max(originalWidth, originalHeight);
+  const maxNormalized = Math.max(normalized.width, normalized.height);
+  const scaleFactor = maxOriginal > 0 ? maxNormalized / maxOriginal : 1;

   const meta = {
     width: normalized.width,
     height: normalized.height,
+    originalWidth,
+    originalHeight,
+    scaleFactor,
     name: file.name,
     size: file.size,
     lastModified: file.lastModified
   };

   currentImageId = imageId;
   currentDataUrl = normalized.dataUrl;
   currentMeta = meta;

   setItem(STORAGE_KEYS.imageId, imageId);
   setItem(STORAGE_KEYS.imageData, currentDataUrl);
   setItem(STORAGE_KEYS.imageMeta, meta);

   return { imageId, dataUrl: currentDataUrl, meta };
 }
```

## Packet Pre-Commit Evidence
### git diff --stat --cached
```text
docs/ai/review_packet_phase11h.md | 285 ++++++++++++++++++++++++++++++++++++++
1 file changed, 285 insertions(+)
```

### git diff --check --cached
```text
(no output)
```

## Carry-Forward
- P0: none
- P1: backfill phase_end_commit and packet_commit for 11h in docs-only micro phase.
- P2: none
