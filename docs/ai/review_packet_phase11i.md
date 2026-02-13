# Review Packet - Phase 11i

## Metadata
- branch: refactor/phase11i-imageid-calib-keying
- base_commit: aa6b8a3
- phase_end_commit: f2bd6da
- packet_commit: PENDING (self-reference; see git log)
- focus_paths: src/scanner/ImageSource.js src/persistence/StateStore.js src/persistence/Migrations.js src/core/OverlayTransform.js city-sim.html REFACTOR_LOG.md docs/ai/review_packet_phase11i.md

## Probe Summary
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_len: 3978
- json_sha256: c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa
- sceneCounts: {"meshCount":631,"lineCount":6,"pointCount":0,"groupCount":206,"geometryCount":443,"materialCount":345}
- blueprintCounts: {"beaches":0,"buildings":0,"coastlines":1,"pois":1,"roads":2,"sea":0,"transit":0,"zones":1}
- overlayDrift: {"ok":true,"epsPx":0.05,"maxDriftPx":0}
- rendererInfo: {"memory":{"geometries":436,"textures":3},"render":{"calls":626,"triangles":22614,"lines":0,"points":0}}
- parity_decision: PASS (tracked fields unchanged; hash variance accepted per v7 triage)

## Determinism
```text
rg=1
```

## Fixed Command Evidence
### git status -sb
```text
## refactor/phase11i-imageid-calib-keying
?? docs/ai/review_packet_phase11i.md
```

### git rev-parse --short HEAD
```text
f2bd6da
```

### git log --oneline --decorate -n 20
```text
f2bd6da (HEAD -> refactor/phase11i-imageid-calib-keying) docs(phase11i): record readiness-gated probe
3779c3a refactor(phase11i): add stable imageId keying and calib migration fallback
aa6b8a3 (refactor/phase11h-image-source-normalize-2048) docs(ai): add review packet for phase 11h
0afa0d9 docs(phase11h): record readiness-gated probe
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
```

### git diff --stat aa6b8a3...f2bd6da -- <focus_paths>
```text
 REFACTOR_LOG.md               | 16 ++++++++++++++++
 src/persistence/Migrations.js | 18 +++++++++++++-----
 src/scanner/ImageSource.js    |  7 ++++++-
 3 files changed, 35 insertions(+), 6 deletions(-)
```

### git diff --check aa6b8a3...f2bd6da -- <focus_paths>
```text
```

### git diff -U15 aa6b8a3...f2bd6da -- <focus_paths>
```diff
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 40fe7a0..2b34240 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -482,15 +482,31 @@ Probe check (post-extraction):
 ## Phase 11h – ImageSource normalization to maxEdge=2048

 - branch: refactor/phase11h-image-source-normalize-2048
 - base_commit: edc47d8
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: codex-mcp (readiness gated)
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_len: 3977
 - json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
 - rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }
 - parity_decision: PASS (tracked fields unchanged and hash matches baseline snapshot)
+
+## Phase 11i – Stable imageId + calibration keying
+
+- branch: refactor/phase11i-imageid-calib-keying
+- base_commit: aa6b8a3
+- phase_end_commit: PENDING
+- packet_commit: PENDING
+- capture_method: codex-mcp (readiness gated)
+- url: http://localhost:8000/city-sim.html?refactorProbe=1
+- json_len: 3978
+- json_sha256: c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa
+- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
+- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
+- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
+- rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }
+- parity_decision: PASS (tracked fields unchanged; hash variance accepted per v7 triage)
diff --git a/src/persistence/Migrations.js b/src/persistence/Migrations.js
index ef9b76d..bbede73 100644
--- a/src/persistence/Migrations.js
+++ b/src/persistence/Migrations.js
@@ -1,41 +1,49 @@
-import { getItemRaw, setItemRaw, hasItem, setItem } from './StateStore.js';
+import { getItemRaw, hasItem, setItem, getItem } from './StateStore.js';

 const LEGACY_KEYS = {
   overlayCalib: 'tadhgCityOverlayCalib',
   overlayPanelCollapsed: 'tadhgOverlayPanelCollapsed'
 };

 const NEW_KEYS = {
   overlayCalib: (imageId) => `overlayCalib:${imageId}`,
   overlayPanelCollapsed: 'ui.overlayPanelCollapsed'
 };

 export function runMigrations({ imageId = 'demo' } = {}) {
   migrateOverlayCalib(imageId);
   migrateOverlayPanelCollapsed();
 }

 function migrateOverlayCalib(imageId) {
   const legacyRaw = getItemRaw(LEGACY_KEYS.overlayCalib);
-  if (legacyRaw == null) return;
-
   const newKey = NEW_KEYS.overlayCalib(imageId);
+  if (legacyRaw != null && !hasItem(newKey)) {
+    // legacy value is already JSON stringified; preserve as parsed object
+    setItem(newKey, legacyRaw);
+  }
+
   if (hasItem(newKey)) return;
+  if (imageId === 'demo') return;
+
+  const demoKey = NEW_KEYS.overlayCalib('demo');
+  if (!hasItem(demoKey)) return;

-  // legacy value is already JSON stringified; preserve as parsed object
-  setItem(newKey, legacyRaw);
+  const demoValue = getItem(demoKey);
+  if (demoValue == null) return;
+  setItem(newKey, demoValue);
 }

 function migrateOverlayPanelCollapsed() {
   const legacyRaw = getItemRaw(LEGACY_KEYS.overlayPanelCollapsed);
   if (legacyRaw == null) return;

   if (hasItem(NEW_KEYS.overlayPanelCollapsed)) return;

   setItem(NEW_KEYS.overlayPanelCollapsed, legacyRaw);
 }

 export function getLegacyKeys() {
   return { ...LEGACY_KEYS };
 }

diff --git a/src/scanner/ImageSource.js b/src/scanner/ImageSource.js
index 1230d0d..572267a 100644
--- a/src/scanner/ImageSource.js
+++ b/src/scanner/ImageSource.js
@@ -55,31 +55,36 @@ export function getMaxEdgePx() {

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

 function computeImageId(file) {
-  return `${file.name}:${file.size}:${file.lastModified}`;
+  const identity = {
+    name: String(file?.name || ''),
+    size: Number.isFinite(Number(file?.size)) ? Number(file.size) : 0,
+    lastModified: Number.isFinite(Number(file?.lastModified)) ? Number(file.lastModified) : 0
+  };
+  return JSON.stringify(identity);
 }

 function readFileAsDataURL(file) {
   return new Promise((resolve, reject) => {
     const reader = new FileReader();
     reader.onload = () => resolve(reader.result);
     reader.onerror = () => reject(reader.error || new Error('Failed to read file'));
     reader.readAsDataURL(file);
   });
 }

 function loadImage(dataUrl) {
   return new Promise((resolve, reject) => {
     const img = new Image();
     img.onload = () => resolve(img);
```

## Packet Pre-Commit Evidence
### git diff --stat --cached
```text
docs/ai/review_packet_phase11i.md | 228 ++++++++++++++++++++++++++++++++++++++
1 file changed, 228 insertions(+)
```

### git diff --check --cached
```text
(no output)
```

## Carry-Forward
- P0: none
- P1: backfill phase_end_commit and packet_commit for 11i in docs-only micro phase.
- P2: none
