# Review Packet Phase 7e

## Metadata
- Branch: `refactor/phase7e-input-router-hit-test-gestures`
- base_commit: `c920af7`
- phase_end_commit: `e857692`
- packet_commit: `PENDING` (self-reference; use git log as authoritative)
- FOCUS_PATHS: `city-sim.html`, `src/editor/InputRouter.js`, `src/editor/HitTest.js`, `src/editor/Gestures.js`, `REFACTOR_LOG.md`

## Determinism
Command:
```bash
command -v rg >/dev/null && echo "rg=1" || echo "rg=0"
```
Output:
```text
rg=1
```

## Fixed Commands (Verbatim)
Command:
```bash
rg -n "Phase 7e|InputRouter|HitTest|Gestures" docs/ai/review_packet_phase7e.md REFACTOR_LOG.md
```
Output:
```text
REFACTOR_LOG.md:215:## Phase 7e – Editor InputRouter + HitTest + Gestures extraction
docs/ai/review_packet_phase7e.md:1:# Review Packet Phase 7e
docs/ai/review_packet_phase7e.md:8:- FOCUS_PATHS: `city-sim.html`, `src/editor/InputRouter.js`, `src/editor/HitTest.js`, `src/editor/Gestures.js`, `REFACTOR_LOG.md`
docs/ai/review_packet_phase7e.md:23:rg -n "Phase 7e|InputRouter|HitTest|Gestures" docs/ai/review_packet_phase7e.md REFACTOR_LOG.md
docs/ai/review_packet_phase7e.md:27:REFACTOR_LOG.md:215:## Phase 7e – Editor InputRouter + HitTest + Gestures extraction
docs/ai/review_packet_phase7e.md:28:docs/ai/review_packet_phase7e.md:1:# Review Packet Phase 7e
docs/ai/review_packet_phase7e.md:29:docs/ai/review_packet_phase7e.md:22:rg -n "Phase 7e|InputRouter|HitTest|Gestures" docs/ai/review_packet_phase7e.md REFACTOR_LOG.md
docs/ai/review_packet_phase7e.md:30:docs/ai/review_packet_phase7e.md:27:REFACTOR_LOG.md:215:## Phase 7e – Editor InputRouter + HitTest + Gestures extraction
docs/ai/review_packet_phase7e.md:31:docs/ai/review_packet_phase7e.md:74:2d33023 refactor(phase7e): extract InputRouter + HitTest + Gestures
docs/ai/review_packet_phase7e.md:32:docs/ai/review_packet_phase7e.md:98:git diff --stat c920af7...e857692 -- city-sim.html src/editor/InputRouter.js src/editor/HitTest.js src/editor/Gestures.js REFACTOR_LOG.md
docs/ai/review_packet_phase7e.md:33:docs/ai/review_packet_phase7e.md:104: src/editor/Gestures.js    | 110 +++++++++++
docs/ai/review_packet_phase7e.md:34:docs/ai/review_packet_phase7e.md:105: src/editor/HitTest.js     |  55 ++++++
docs/ai/review_packet_phase7e.md:35:docs/ai/review_packet_phase7e.md:106: src/editor/InputRouter.js | 329 ++++++++++++++++++++++++++++++
docs/ai/review_packet_phase7e.md:36:docs/ai/review_packet_phase7e.md:112:git diff --check c920af7...e857692 -- city-sim.html src/editor/InputRouter.js src/editor/HitTest.js src/editor/Gestures.js REFACTOR_LOG.md
docs/ai/review_packet_phase7e.md:37:docs/ai/review_packet_phase7e.md:121:git diff -U15 c920af7...e857692 -- city-sim.html src/editor/InputRouter.js src/editor/HitTest.js src/editor/Gestures.js REFACTOR_LOG.md
docs/ai/review_packet_phase7e.md:38:docs/ai/review_packet_phase7e.md:155:+## Phase 7e – Editor InputRouter + HitTest + Gestures extraction
docs/ai/review_packet_phase7e.md:39:docs/ai/review_packet_phase7e.md:189:+    import { createEditorHitTest } from './src/editor/HitTest.js';
docs/ai/review_packet_phase7e.md:40:docs/ai/review_packet_phase7e.md:190:+    import { createEditorInputRouter } from './src/editor/InputRouter.js';
docs/ai/review_packet_phase7e.md:41:docs/ai/review_packet_phase7e.md:191:+    import { createEditorGestures } from './src/editor/Gestures.js';
docs/ai/review_packet_phase7e.md:42:docs/ai/review_packet_phase7e.md:223:+  let editorHitTest = null;
docs/ai/review_packet_phase7e.md:43:docs/ai/review_packet_phase7e.md:224:+  let editorInputRouter = null;
docs/ai/review_packet_phase7e.md:44:docs/ai/review_packet_phase7e.md:225:+  let editorGestures = null;
docs/ai/review_packet_phase7e.md:45:docs/ai/review_packet_phase7e.md:356:+    ensureGestures().setup();
docs/ai/review_packet_phase7e.md:46:docs/ai/review_packet_phase7e.md:388:+    function ensureEditorHitTest() {
docs/ai/review_packet_phase7e.md:47:docs/ai/review_packet_phase7e.md:389:+      if (!editorHitTest) {
docs/ai/review_packet_phase7e.md:48:docs/ai/review_packet_phase7e.md:390:+        editorHitTest = createEditorHitTest({
docs/ai/review_packet_phase7e.md:49:docs/ai/review_packet_phase7e.md:405:+      return editorHitTest;
docs/ai/review_packet_phase7e.md:50:docs/ai/review_packet_phase7e.md:412:+      return ensureEditorHitTest().canPanMap();
docs/ai/review_packet_phase7e.md:51:docs/ai/review_packet_phase7e.md:426:+      return ensureEditorHitTest().applyPanDelta(dxPx, dyPx);
docs/ai/review_packet_phase7e.md:52:docs/ai/review_packet_phase7e.md:469:+      return ensureEditorHitTest().getPointerMapPoint(event);
docs/ai/review_packet_phase7e.md:53:docs/ai/review_packet_phase7e.md:501:+    function ensureEditorInputRouter() {
docs/ai/review_packet_phase7e.md:54:docs/ai/review_packet_phase7e.md:502:+      if (!editorInputRouter) {
docs/ai/review_packet_phase7e.md:55:docs/ai/review_packet_phase7e.md:503:+        editorInputRouter = createEditorInputRouter({
docs/ai/review_packet_phase7e.md:56:docs/ai/review_packet_phase7e.md:542:+      return editorInputRouter;
docs/ai/review_packet_phase7e.md:57:docs/ai/review_packet_phase7e.md:545:+    function ensureGestures() {
docs/ai/review_packet_phase7e.md:58:docs/ai/review_packet_phase7e.md:546:+      if (!editorGestures) {
docs/ai/review_packet_phase7e.md:59:docs/ai/review_packet_phase7e.md:547:+        editorGestures = createEditorGestures({
docs/ai/review_packet_phase7e.md:60:docs/ai/review_packet_phase7e.md:556:+      return editorGestures;
docs/ai/review_packet_phase7e.md:61:docs/ai/review_packet_phase7e.md:872:+      ensureEditorInputRouter().bindEditorEvents();
docs/ai/review_packet_phase7e.md:62:docs/ai/review_packet_phase7e.md:888:diff --git a/src/editor/Gestures.js b/src/editor/Gestures.js
docs/ai/review_packet_phase7e.md:63:docs/ai/review_packet_phase7e.md:892:+++ b/src/editor/Gestures.js
docs/ai/review_packet_phase7e.md:64:docs/ai/review_packet_phase7e.md:894:+export function createEditorGestures(deps) {
docs/ai/review_packet_phase7e.md:65:docs/ai/review_packet_phase7e.md:1004:diff --git a/src/editor/HitTest.js b/src/editor/HitTest.js
docs/ai/review_packet_phase7e.md:66:docs/ai/review_packet_phase7e.md:1008:+++ b/src/editor/HitTest.js
docs/ai/review_packet_phase7e.md:67:docs/ai/review_packet_phase7e.md:1010:+export function createEditorHitTest(deps) {
docs/ai/review_packet_phase7e.md:68:docs/ai/review_packet_phase7e.md:1065:diff --git a/src/editor/InputRouter.js b/src/editor/InputRouter.js
docs/ai/review_packet_phase7e.md:69:docs/ai/review_packet_phase7e.md:1069:+++ b/src/editor/InputRouter.js
docs/ai/review_packet_phase7e.md:70:docs/ai/review_packet_phase7e.md:1071:+export function createEditorInputRouter(deps) {
docs/ai/review_packet_phase7e.md:71:docs/ai/review_packet_phase7e.md:1405:git show e857692:src/editor/InputRouter.js
docs/ai/review_packet_phase7e.md:72:docs/ai/review_packet_phase7e.md:1409:export function createEditorInputRouter(deps) {
docs/ai/review_packet_phase7e.md:73:docs/ai/review_packet_phase7e.md:1742:git show e857692:src/editor/HitTest.js
docs/ai/review_packet_phase7e.md:74:docs/ai/review_packet_phase7e.md:1746:export function createEditorHitTest(deps) {
docs/ai/review_packet_phase7e.md:75:docs/ai/review_packet_phase7e.md:1805:git show e857692:src/editor/Gestures.js
docs/ai/review_packet_phase7e.md:76:docs/ai/review_packet_phase7e.md:1809:export function createEditorGestures(deps) {
docs/ai/review_packet_phase7e.md:77:docs/ai/review_packet_phase7e.md:1934:  - Locator: `REFACTOR_LOG.md` Phase 7e block (`phase_end_commit`/`packet_commit` placeholders).
docs/ai/review_packet_phase7e.md:78:docs/ai/review_packet_phase7e.md:1935:  - Acceptance: replace placeholders with concrete SHAs in Phase 7e_1 docs hygiene.
docs/ai/review_packet_phase7e.md:107:2d33023 refactor(phase7e): extract InputRouter + HitTest + Gestures
docs/ai/review_packet_phase7e.md:131:git diff --stat c920af7...e857692 -- city-sim.html src/editor/InputRouter.js src/editor/HitTest.js src/editor/Gestures.js REFACTOR_LOG.md
docs/ai/review_packet_phase7e.md:137: src/editor/Gestures.js    | 110 +++++++++++
docs/ai/review_packet_phase7e.md:138: src/editor/HitTest.js     |  55 ++++++
docs/ai/review_packet_phase7e.md:139: src/editor/InputRouter.js | 329 ++++++++++++++++++++++++++++++
docs/ai/review_packet_phase7e.md:145:git diff --check c920af7...e857692 -- city-sim.html src/editor/InputRouter.js src/editor/HitTest.js src/editor/Gestures.js REFACTOR_LOG.md
docs/ai/review_packet_phase7e.md:154:git diff -U15 c920af7...e857692 -- city-sim.html src/editor/InputRouter.js src/editor/HitTest.js src/editor/Gestures.js REFACTOR_LOG.md
docs/ai/review_packet_phase7e.md:188:+## Phase 7e – Editor InputRouter + HitTest + Gestures extraction
docs/ai/review_packet_phase7e.md:222:+    import { createEditorHitTest } from './src/editor/HitTest.js';
docs/ai/review_packet_phase7e.md:223:+    import { createEditorInputRouter } from './src/editor/InputRouter.js';
docs/ai/review_packet_phase7e.md:224:+    import { createEditorGestures } from './src/editor/Gestures.js';
docs/ai/review_packet_phase7e.md:256:+  let editorHitTest = null;
docs/ai/review_packet_phase7e.md:257:+  let editorInputRouter = null;
docs/ai/review_packet_phase7e.md:258:+  let editorGestures = null;
docs/ai/review_packet_phase7e.md:389:+    ensureGestures().setup();
docs/ai/review_packet_phase7e.md:421:+    function ensureEditorHitTest() {
docs/ai/review_packet_phase7e.md:422:+      if (!editorHitTest) {
docs/ai/review_packet_phase7e.md:423:+        editorHitTest = createEditorHitTest({
docs/ai/review_packet_phase7e.md:438:+      return editorHitTest;
docs/ai/review_packet_phase7e.md:445:+      return ensureEditorHitTest().canPanMap();
docs/ai/review_packet_phase7e.md:459:+      return ensureEditorHitTest().applyPanDelta(dxPx, dyPx);
docs/ai/review_packet_phase7e.md:502:+      return ensureEditorHitTest().getPointerMapPoint(event);
docs/ai/review_packet_phase7e.md:534:+    function ensureEditorInputRouter() {
docs/ai/review_packet_phase7e.md:535:+      if (!editorInputRouter) {
docs/ai/review_packet_phase7e.md:536:+        editorInputRouter = createEditorInputRouter({
docs/ai/review_packet_phase7e.md:575:+      return editorInputRouter;
docs/ai/review_packet_phase7e.md:578:+    function ensureGestures() {
docs/ai/review_packet_phase7e.md:579:+      if (!editorGestures) {
docs/ai/review_packet_phase7e.md:580:+        editorGestures = createEditorGestures({
docs/ai/review_packet_phase7e.md:589:+      return editorGestures;
docs/ai/review_packet_phase7e.md:905:+      ensureEditorInputRouter().bindEditorEvents();
docs/ai/review_packet_phase7e.md:921:diff --git a/src/editor/Gestures.js b/src/editor/Gestures.js
docs/ai/review_packet_phase7e.md:925:+++ b/src/editor/Gestures.js
docs/ai/review_packet_phase7e.md:927:+export function createEditorGestures(deps) {
docs/ai/review_packet_phase7e.md:1037:diff --git a/src/editor/HitTest.js b/src/editor/HitTest.js
docs/ai/review_packet_phase7e.md:1041:+++ b/src/editor/HitTest.js
docs/ai/review_packet_phase7e.md:1043:+export function createEditorHitTest(deps) {
docs/ai/review_packet_phase7e.md:1098:diff --git a/src/editor/InputRouter.js b/src/editor/InputRouter.js
docs/ai/review_packet_phase7e.md:1102:+++ b/src/editor/InputRouter.js
docs/ai/review_packet_phase7e.md:1104:+export function createEditorInputRouter(deps) {
docs/ai/review_packet_phase7e.md:1458:git show e857692:src/editor/InputRouter.js
docs/ai/review_packet_phase7e.md:1462:export function createEditorInputRouter(deps) {
docs/ai/review_packet_phase7e.md:1795:git show e857692:src/editor/HitTest.js
docs/ai/review_packet_phase7e.md:1799:export function createEditorHitTest(deps) {
docs/ai/review_packet_phase7e.md:1858:git show e857692:src/editor/Gestures.js
docs/ai/review_packet_phase7e.md:1862:export function createEditorGestures(deps) {
docs/ai/review_packet_phase7e.md:1988:  - Locator: `REFACTOR_LOG.md` Phase 7e block (`phase_end_commit` and `packet_commit` currently `PENDING`).
```

Command:
```bash
git status -sb
```
Output:
```text
## refactor/phase7e-input-router-hit-test-gestures
?? docs/ai/review_packet_phase7e.md
```

Command:
```bash
git rev-parse --short HEAD
```
Output:
```text
e857692
```

Command:
```bash
git log --oneline --decorate -n 20
```
Output:
```text
e857692 (HEAD -> refactor/phase7e-input-router-hit-test-gestures) docs(phase7e): record readiness-gated probe
2d33023 refactor(phase7e): extract InputRouter + HitTest + Gestures
c920af7 (refactor/phase7d-editor-controller) docs(ai): add review packet for phase 7d
a11428d docs(phase7d): record readiness-gated probe
b4d4665 refactor(phase7d): extract editor controller
446dea1 (refactor/phase7c_1-log-metadata) docs(ai): add review packet for phase 7c_1
a6b296c docs(phase7c_1): fix phase7c log metadata
f0248c1 docs(ai): add review packet for phase 7c_1
a3232c8 docs(phase7c_1): fix phase7c log metadata
ad2702b (refactor/phase7c-editor-snap-engine) docs(ai): add review packet for phase 7c
957d3ea docs(phase7c): record readiness-gated probe
dab5f8f refactor(phase7c): extract editor snap engine
483707c (refactor/phase7b_1-log-metadata) docs(ai): add review packet for phase 7b_1
0ead366 docs(phase7b_1): fix phase7b log metadata
7dfb487 (refactor/phase7b-editor-history-manager) docs(ai): add review packet for phase 7b
a028b0e docs(phase7b): record readiness-gated probe
57e6e5f refactor(phase7b): extract editor history manager
5961cf5 (refactor/phase7a-editor-rebuild-scheduler) docs(ai): add review packet for phase 7a
4f1afa4 docs(phase7a): record readiness-gated probe
98b2a62 refactor(phase7a): extract editor rebuild scheduler
```

## Audit Evidence (base...phase_end)
Command:
```bash
git diff --stat c920af7...e857692 -- city-sim.html src/editor/InputRouter.js src/editor/HitTest.js src/editor/Gestures.js REFACTOR_LOG.md
```
Output:
```text
 REFACTOR_LOG.md           |  15 ++
 city-sim.html             | 494 +++++++++-------------------------------------
 src/editor/Gestures.js    | 110 +++++++++++
 src/editor/HitTest.js     |  55 ++++++
 src/editor/InputRouter.js | 329 ++++++++++++++++++++++++++++++
 5 files changed, 599 insertions(+), 404 deletions(-)
```

Command:
```bash
git diff --check c920af7...e857692 -- city-sim.html src/editor/InputRouter.js src/editor/HitTest.js src/editor/Gestures.js REFACTOR_LOG.md
```
Output:
```text
(no output)
```

Command:
```bash
git diff -U15 c920af7...e857692 -- city-sim.html src/editor/InputRouter.js src/editor/HitTest.js src/editor/Gestures.js REFACTOR_LOG.md
```
Output:
```diff
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index f132af3..a2e99d0 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -190,24 +190,39 @@ Probe check (post-extraction):
 - packet_commit: ad2702b
 - capture_method: codex-mcp (readiness gated)
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_len: 3977
 - json_sha256: f88283c8083d6fbb6c5c2ebbb381c8be963e6c86c44c5188288865ea6288d188
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
 - rendererInfo: { memory: { geometries: 434, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }

 ## Phase 7d – EditorController extraction

 - branch: refactor/phase7d-editor-controller
 - base_commit: 446dea1
 - phase_end_commit: a11428d
+- packet_commit: c920af7
+- capture_method: codex-mcp (readiness gated)
+- url: http://localhost:8000/city-sim.html?refactorProbe=1
+- json_len: 3978
+- json_sha256: c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa
+- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
+- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
+- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
+- rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }
+
+## Phase 7e – Editor InputRouter + HitTest + Gestures extraction
+
+- branch: refactor/phase7e-input-router-hit-test-gestures
+- base_commit: c920af7
+- phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: codex-mcp (readiness gated)
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_len: 3978
 - json_sha256: c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
 - rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }
diff --git a/city-sim.html b/city-sim.html
index 92a1a09..a5b3ad5 100644
--- a/city-sim.html
+++ b/city-sim.html
@@ -805,30 +805,33 @@
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
     import { buildLegacyCity } from './src/render/CityRenderer.js';
     import { createEditorRebuildScheduler } from './src/editor/RebuildScheduler.js';
     import { createEditorHistoryManager } from './src/editor/HistoryManager.js';
     import { createEditorSnapEngine } from './src/editor/SnapEngine.js';
     import { createEditorController } from './src/editor/EditorController.js';
+    import { createEditorHitTest } from './src/editor/HitTest.js';
+    import { createEditorInputRouter } from './src/editor/InputRouter.js';
+    import { createEditorGestures } from './src/editor/Gestures.js';

     // ============================================
     // CONFIGURATION
     // ============================================


     // ============================================
     // SCENE SETUP
     // ============================================
 const sceneManager = createSceneManager({ container: document.body });
 const renderer = sceneManager.renderer;
 const scene = sceneManager.scene;
 const { orthoCamera, perspCamera, getActiveCamera, setActiveCamera: setSceneActiveCamera } = sceneManager.cameras;
 const controls = sceneManager.controls;
 const { ambientLight, sunLight, hemisphereLight } = sceneManager.lights;
@@ -962,30 +965,33 @@ const trafficRuntime = {
 };

 const editorHistory = {
   undo: [],
   redo: [],
   limit: 80
 };

 let blueprintCityEnabled = false;
 let blueprintZoneMeshes = [];
   let blueprintLabelGroup = null;
   let editorRebuildScheduler = null;
   let editorHistoryManager = null;
   let editorSnapEngine = null;
   let editorController = null;
+  let editorHitTest = null;
+  let editorInputRouter = null;
+  let editorGestures = null;

 const blueprintPreviewSettings = {
   opacity: 1,
   showLabels: false
 };

 const panState = {
   active: false,
   pending: false,
   pointerId: null,
   lastX: 0,
   lastY: 0,
   isTouch: false,
   deferredAction: null,
   touchPoints: new Map()
@@ -4913,128 +4919,32 @@ function validateBlueprint(data) {
     const editorModal = document.getElementById('editorHelpModal');
     const editorHelpBtn = document.getElementById('btnEditorHelp');
     const editorHelpClose = document.getElementById('closeEditorHelp');
     if (editorHelpBtn && editorModal && editorHelpClose) {
       editorHelpBtn.addEventListener('click', () => {
         editorModal.style.display = 'flex';
       });
       editorHelpClose.addEventListener('click', () => {
         editorModal.style.display = 'none';
       });
       editorModal.addEventListener('click', (e) => {
         if (e.target === editorModal) editorModal.style.display = 'none';
       });
     }

-    // Touch Controls - Virtual Joystick
-    const joystick = document.getElementById('joystick');
-    const joystickKnob = document.getElementById('joystickKnob');
-    let joystickActive = false;
-    let joystickOrigin = { x: 0, y: 0 };
-
-    if (joystick && joystickKnob) {
-      joystick.addEventListener('touchstart', (e) => {
-        joystickActive = true;
-        const rect = joystick.getBoundingClientRect();
-        joystickOrigin = {
-          x: rect.left + rect.width / 2,
-          y: rect.top + rect.height / 2
-        };
-        e.preventDefault();
-      });
-
-      joystick.addEventListener('touchmove', (e) => {
-        if (!joystickActive) return;
-        const touch = e.touches[0];
-        const dx = touch.clientX - joystickOrigin.x;
-        const dy = touch.clientY - joystickOrigin.y;
-        const maxDist = 35;
-        const dist = Math.min(Math.sqrt(dx*dx + dy*dy), maxDist);
-        const angle = Math.atan2(dy, dx);
-
-        const kx = Math.cos(angle) * dist;
-        const ky = Math.sin(angle) * dist;
-
-        joystickKnob.style.transform = `translate(calc(-50% + ${kx}px), calc(-50% + ${ky}px))`;
-
-        // Apply to camera movement
-        if (viewMode === '3d' || viewMode === 'street') {
-          const moveSpeed = 2;
-          const dxWorld = (kx / maxDist) * moveSpeed;
-          const dzWorld = (ky / maxDist) * moveSpeed;
-          perspCamera.position.x += dxWorld;
-          perspCamera.position.z += dzWorld;
-          controls.target.x += dxWorld;
-          controls.target.z += dzWorld;
-        }
-        e.preventDefault();
-      });
-
-      joystick.addEventListener('touchend', () => {
-        joystickActive = false;
-        joystickKnob.style.transform = 'translate(-50%, -50%)';
-      });
-    }
-
-    // Zoom controls (desktop only)
-    const zoomIn = document.getElementById('zoomIn');
-    const zoomOut = document.getElementById('zoomOut');
-    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
-
-    if (!isCoarse && zoomIn && zoomOut) {
-      zoomIn.addEventListener('click', () => {
-        if (viewMode === '3d' || viewMode === 'street') {
-          perspCamera.position.y = Math.max(50, perspCamera.position.y - 50);
-          perspCamera.fov = Math.max(30, perspCamera.fov - 5);
-          perspCamera.updateProjectionMatrix();
-        }
-      });
-
-      zoomOut.addEventListener('click', () => {
-        if (viewMode === '3d' || viewMode === 'street') {
-          perspCamera.position.y = Math.min(800, perspCamera.position.y + 50);
-          perspCamera.fov = Math.min(90, perspCamera.fov + 5);
-          perspCamera.updateProjectionMatrix();
-        }
-      });
-    }
-
-    // Touch gesture support for the canvas
-    let touchStartDist = 0;
-    renderer.domElement.addEventListener('touchstart', (e) => {
-      if (e.touches.length === 2) {
-        const dx = e.touches[0].clientX - e.touches[1].clientX;
-        const dy = e.touches[0].clientY - e.touches[1].clientY;
-        touchStartDist = Math.sqrt(dx*dx + dy*dy);
-      }
-    });
-
-    renderer.domElement.addEventListener('touchmove', (e) => {
-      if (e.touches.length === 2 && viewMode !== 'plan') {
-        const dx = e.touches[0].clientX - e.touches[1].clientX;
-        const dy = e.touches[0].clientY - e.touches[1].clientY;
-        const dist = Math.sqrt(dx*dx + dy*dy);
-        const delta = dist - touchStartDist;
-
-        // Pinch zoom
-        perspCamera.position.y -= delta * 0.5;
-        perspCamera.position.y = Math.max(50, Math.min(800, perspCamera.position.y));
-
-        touchStartDist = dist;
-        e.preventDefault();
-      }
-    });
+    // Touch controls + pinch/zoom controls
+    ensureGestures().setup();

     // ============================================
     // COMPASS
     // ============================================

     const compassCanvas = document.getElementById('compass');
     const compassCtx = compassCanvas.getContext('2d');
     compassCanvas.width = 80;
     compassCanvas.height = 80;

     function drawCompass() {
       const ctx = compassCtx;
       const cx = 40, cy = 40, r = 35;

       ctx.clearRect(0, 0, 80, 80);
@@ -5823,47 +5733,56 @@ function validateBlueprint(data) {
       updateLineResolution(editorSelectionLine);
       updateLineResolution(editorSelectionGlowLine);
     }

     function updateEditorStatus(text) {
       const el = document.getElementById('editorStatus');
       if (!el) return;
       el.textContent = text;
     }

     function updateLineResolution(line) {
       if (!line || !line.material || !line.material.resolution) return;
       line.material.resolution.set(window.innerWidth, window.innerHeight);
     }

+    function ensureEditorHitTest() {
+      if (!editorHitTest) {
+        editorHitTest = createEditorHitTest({
+          mapOverlayGroupRef: () => mapOverlayGroup,
+          raycaster,
+          THREE,
+          Y,
+          getActiveCamera: () => activeCamera,
+          orthoCamera,
+          MAP_WIDTH,
+          MAP_HEIGHT,
+          getViewportSize: () => ({
+            width: window.innerWidth,
+            height: window.innerHeight
+          })
+        });
+      }
+      return editorHitTest;
+    }
+
     function canPanMap() {
-      const viewW = (orthoCamera.right - orthoCamera.left) / orthoCamera.zoom;
-      const viewH = (orthoCamera.top - orthoCamera.bottom) / orthoCamera.zoom;
-      return (MAP_WIDTH > viewW + 1) || (MAP_HEIGHT > viewH + 1);
+      return ensureEditorHitTest().canPanMap();
     }

     function applyPanDelta(dxPx, dyPx) {
-      const viewW = (orthoCamera.right - orthoCamera.left) / orthoCamera.zoom;
-      const viewH = (orthoCamera.top - orthoCamera.bottom) / orthoCamera.zoom;
-      const worldPerPxX = viewW / window.innerWidth;
-      const worldPerPxZ = viewH / window.innerHeight;
-      const dxWorld = -dxPx * worldPerPxX;
-      const dzWorld = -dyPx * worldPerPxZ;
-      orthoCamera.position.x += dxWorld;
-      orthoCamera.position.z += dzWorld;
-      orthoCamera.lookAt(orthoCamera.position.x, 0, orthoCamera.position.z);
-      orthoCamera.updateProjectionMatrix();
+      return ensureEditorHitTest().applyPanDelta(dxPx, dyPx);
     }

     function applyEditorZoom(value) {
       const zoom = clampNumber(Number.parseFloat(value), 0.5, 3);
       editorState.mapZoom = zoom;
       orthoCamera.zoom = zoom;
       orthoCamera.updateProjectionMatrix();
     }

     function applyHandleScale(value) {
       const scale = clampNumber(Number.parseFloat(value), 0.4, 2.5);
       editorState.handleScale = scale;
       updateDraftMarkers();
       updateSelectionMarkers();
       updateLineEndpointMarkers();
@@ -6018,41 +5937,31 @@ function validateBlueprint(data) {
       const enabled = !!(isBuilding && info?.buildable);
       heightRange.disabled = !enabled;
       heightValue.disabled = !enabled;
       heightApply.disabled = !enabled;
       if (!enabled) {
         heightRange.value = 0;
         heightValue.value = 0;
         return;
       }
       const height = Math.max(0, Math.min(2000, Math.round(getEntryHeight(entry))));
       heightRange.value = height;
       heightValue.value = height;
     }

     function getPointerMapPoint(event) {
-      if (!mapOverlayGroup) return null;
-      const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -Y.overlay);
-      const mouseVec = new THREE.Vector2(
-        (event.clientX / window.innerWidth) * 2 - 1,
-        -(event.clientY / window.innerHeight) * 2 + 1
-      );
-      raycaster.setFromCamera(mouseVec, activeCamera);
-      const hit = new THREE.Vector3();
-      if (!raycaster.ray.intersectPlane(plane, hit)) return null;
-      mapOverlayGroup.worldToLocal(hit);
-      return { x: hit.x, z: hit.z };
+      return ensureEditorHitTest().getPointerMapPoint(event);
     }

     function ensureEditorSnapEngine() {
       if (!editorSnapEngine) {
         editorSnapEngine = createEditorSnapEngine({
           editorState,
           getMapCoordMapper: () => mapCoordMapper,
           GRID_STEP_X,
           GRID_STEP_Z
         });
       }
       return editorSnapEngine;
     }

     function snapMapPoint(point) {
@@ -6461,30 +6370,88 @@ function validateBlueprint(data) {
           getSelectedEntry,
           getLegendInfo,
           hideEditorLines,
           setBlueprintStatus,
           applyEditorZoom,
           applyHandleScale,
           deleteSelection,
           setCityLayerVisibility,
           undoEditor,
           redoEditor
         });
       }
       return editorController;
     }

+    function ensureEditorInputRouter() {
+      if (!editorInputRouter) {
+        editorInputRouter = createEditorInputRouter({
+          renderer,
+          editorActive,
+          getActiveCamera: () => activeCamera,
+          orthoCamera,
+          canPanMap,
+          panState,
+          getPointerMapPoint,
+          snapMapPoint,
+          getEditorMode,
+          isDoubleClick,
+          findNearestDraftVertex,
+          findNearestVertex,
+          getSelectedEntry,
+          findNearestVertexInEntry,
+          findNearestEdgeInEntry,
+          pointInPolygon,
+          handleEditorPointerDown,
+          applyPanDelta,
+          editorState,
+          updateDraftLine,
+          updateEditorHover,
+          findNearestLineEndpoint,
+          findNearestLineVertex,
+          findNearestLineEdge,
+          getEditorHitRadius,
+          getBlueprintData: () => blueprintData,
+          scheduleEditorRebuild,
+          pushEditorHistory,
+          clearJunctionMode,
+          updateDraftMarkers,
+          updateEditorStatus,
+          addPolygonFromDraft,
+          addPolylineFromDraft,
+          deleteSelection,
+          undoEditor,
+          redoEditor
+        });
+      }
+      return editorInputRouter;
+    }
+
+    function ensureGestures() {
+      if (!editorGestures) {
+        editorGestures = createEditorGestures({
+          document,
+          window,
+          renderer,
+          getViewMode: () => viewMode,
+          perspCamera,
+          controls
+        });
+      }
+      return editorGestures;
+    }
+
     function cloneBlueprintData(data) {
       return ensureEditorHistoryManager().cloneBlueprintData(data);
     }

     function snapshotEditorState() {
       return ensureEditorHistoryManager().snapshotEditorState();
     }

     function pushEditorHistory(snapshot) {
       return ensureEditorHistoryManager().pushEditorHistory(snapshot);
     }

     function applyEditorSnapshot(snapshot, label) {
       return ensureEditorHistoryManager().applyEditorSnapshot(snapshot, label);
     }
@@ -7318,312 +7285,31 @@ function validateBlueprint(data) {
             start: { x: snapped.x, z: snapped.z },
             original: (entry.polyline || entry.polygon).map(p => [p[0], p[1]]),
             curves: Array.isArray(entry.curves) ? [...entry.curves] : [],
             isPolyline: !!entry.polyline,
             historySnapshot,
             historyPushed: false,
             didMove: false
           };
         }
       } else {
         editorState.selected = null;
       }
     }

     function bindEditorEvents() {
-      renderer.domElement.style.touchAction = 'none';
-      renderer.domElement.addEventListener('pointerdown', (e) => {
-        if (!editorActive()) return;
-        if (e.button !== 0) return;
-
-        if (activeCamera === orthoCamera && e.pointerType === 'touch') {
-          panState.touchPoints.set(e.pointerId, { x: e.clientX, y: e.clientY });
-          if (panState.touchPoints.size >= 2 && canPanMap()) {
-            panState.active = true;
-            panState.isTouch = true;
-            panState.pending = false;
-            const pts = Array.from(panState.touchPoints.values());
-            panState.lastX = (pts[0].x + pts[1].x) / 2;
-            panState.lastY = (pts[0].y + pts[1].y) / 2;
-            renderer.domElement.setPointerCapture(e.pointerId);
-            return;
-          }
-        }
-
-        const mapPoint = getPointerMapPoint(e);
-        if (!mapPoint) return;
-        const snapped = snapMapPoint(mapPoint);
-        const mode = getEditorMode();
-        const doubleClick = isDoubleClick(snapped);
-
-        const canMousePan = (activeCamera === orthoCamera && canPanMap() && e.pointerType === 'mouse');
-        let immediateDrag = false;
-        if (mode === 'draw-polygon' || mode === 'draw-polyline') {
-          immediateDrag = !!findNearestDraftVertex(snapped, 10);
-        } else if (mode === 'edit') {
-          const selected = getSelectedEntry();
-          if (selected) {
-            immediateDrag = !!findNearestVertexInEntry(selected.entry, snapped, 10);
-            if (!immediateDrag) immediateDrag = !!findNearestEdgeInEntry(selected.entry, snapped, 12);
-            if (!immediateDrag && selected.entry.polygon) {
-              immediateDrag = pointInPolygon(snapped.x, snapped.z, selected.entry.polygon);
-            }
-          }
-        } else if (mode === 'select') {
-          immediateDrag = !!findNearestVertex(snapped, 12);
-        }
-
-        if (canMousePan && !immediateDrag) {
-          panState.pending = true;
-          panState.active = false;
-          panState.isTouch = false;
-          panState.pointerId = e.pointerId;
-          panState.lastX = e.clientX;
-          panState.lastY = e.clientY;
-          panState.deferredAction = { snapped, mapPoint, mode, doubleClick };
-          renderer.domElement.setPointerCapture(e.pointerId);
-          return;
-        }
-
-        handleEditorPointerDown(snapped, mapPoint, mode, doubleClick);
-      });
-
-      renderer.domElement.addEventListener('pointermove', (e) => {
-        if (!editorActive()) return;
-
-        if (activeCamera === orthoCamera && e.pointerType === 'touch') {
-          if (panState.touchPoints.has(e.pointerId)) {
-            panState.touchPoints.set(e.pointerId, { x: e.clientX, y: e.clientY });
-          }
-          if (panState.active && panState.isTouch && panState.touchPoints.size >= 2) {
-            const pts = Array.from(panState.touchPoints.values());
-            const cx = (pts[0].x + pts[1].x) / 2;
-            const cy = (pts[0].y + pts[1].y) / 2;
-            const dx = cx - panState.lastX;
-            const dy = cy - panState.lastY;
-            panState.lastX = cx;
-            panState.lastY = cy;
-            applyPanDelta(dx, dy);
-            return;
-          }
-        }
-
-        if (panState.pending && e.pointerType === 'mouse' && e.pointerId === panState.pointerId) {
-          const dx = e.clientX - panState.lastX;
-          const dy = e.clientY - panState.lastY;
-          if (Math.hypot(dx, dy) > 3) {
-            panState.active = true;
-            panState.pending = false;
-          }
-        }
-        if (panState.active && !panState.isTouch && e.pointerId === panState.pointerId) {
-          const dx = e.clientX - panState.lastX;
-          const dy = e.clientY - panState.lastY;
-          panState.lastX = e.clientX;
-          panState.lastY = e.clientY;
-          applyPanDelta(dx, dy);
-          return;
-        }
-
-        const mapPoint = getPointerMapPoint(e);
-        if (!mapPoint) return;
-        const snapped = snapMapPoint(mapPoint);
-        const mode = getEditorMode();
-
-        if (!editorState.dragging) {
-        if (mode === 'draw-polygon' || mode === 'draw-polyline') {
-          if (editorState.draft.length > 0) {
-            if (mode === 'draw-polyline') {
-                const endpointHit = findNearestLineEndpoint(mapPoint, getEditorHitRadius(16));
-                const vertexHit = findNearestLineVertex(mapPoint, getEditorHitRadius(16));
-                const edgeHit = findNearestLineEdge(mapPoint, getEditorHitRadius(12));
-                const draftStart = editorState.draft[0];
-                const dxStart = draftStart ? (mapPoint.x - draftStart[0]) : 0;
-                const dzStart = draftStart ? (mapPoint.z - draftStart[1]) : 0;
-                const closeStart = draftStart && (dxStart * dxStart + dzStart * dzStart) <= getEditorHitRadius(14) * getEditorHitRadius(14);
-                if (closeStart) {
-                  editorState.previewPoint = [draftStart[0], draftStart[1]];
-                } else if (vertexHit) {
-                  editorState.previewPoint = [vertexHit.point[0], vertexHit.point[1]];
-                } else if (endpointHit) {
-                  editorState.previewPoint = [endpointHit.point[0], endpointHit.point[1]];
-                } else if (edgeHit) {
-                  editorState.previewPoint = [edgeHit.point.x, edgeHit.point.z];
-                } else {
-                  editorState.previewPoint = [snapped.x, snapped.z];
-                }
-              } else {
-                editorState.previewPoint = [snapped.x, snapped.z];
-              }
-            } else {
-              editorState.previewPoint = null;
-            }
-            updateDraftLine();
-          }
-          updateEditorHover(snapped);
-          return;
-        }
-
-        if (editorState.dragging.mode === 'draft') {
-          const idx = editorState.dragging.index;
-          if (editorState.draft[idx]) {
-            editorState.draft[idx] = [snapped.x, snapped.z];
-            updateDraftLine();
-            updateDraftMarkers();
-          }
-          return;
-        }
-
-        if (!editorState.selected) return;
-        const { layer, index, vertexIndex } = editorState.selected;
-        const list = blueprintData?.[layer];
-        if (!list || !list[index]) return;
-        const entry = list[index];
-
-        if (editorState.dragging.mode === 'vertex' && vertexIndex !== null) {
-          let target = snapped;
-          if (entry.polyline) {
-            const endpointHit = findNearestLineEndpoint(mapPoint, getEditorHitRadius(14));
-            if (endpointHit &&
-              !(endpointHit.index === index && endpointHit.vertexIndex === vertexIndex)) {
-              target = { x: endpointHit.point[0], z: endpointHit.point[1] };
-            }
-          }
-          if (entry.polyline) {
-            entry.polyline[vertexIndex] = [target.x, target.z];
-          } else if (entry.polygon) {
-            entry.polygon[vertexIndex] = [target.x, target.z];
-          }
-          editorState.dragging.didMove = true;
-        } else if (editorState.dragging.mode === 'polygon' && editorState.dragging.original) {
-          const dx = snapped.x - editorState.dragging.start.x;
-          const dz = snapped.z - editorState.dragging.start.z;
-          const moved = editorState.dragging.original.map(p => [p[0] + dx, p[1] + dz]);
-          if (editorState.dragging.isPolyline) {
-            entry.polyline = moved;
-          } else {
-            entry.polygon = moved;
-            if (Array.isArray(entry.curves)) {
-              entry.curves = editorState.dragging.curves || entry.curves;
-            }
-          }
-          editorState.dragging.didMove = true;
-        }
-        scheduleEditorRebuild();
-      });
-
-      renderer.domElement.addEventListener('pointerup', (e) => {
-        if (e.pointerType === 'touch') {
-          panState.touchPoints.delete(e.pointerId);
-          if (panState.touchPoints.size < 2) {
-            panState.active = false;
-            panState.isTouch = false;
-          }
-        }
-        if (panState.pending && e.pointerId === panState.pointerId) {
-          panState.pending = false;
-          panState.active = false;
-          panState.pointerId = null;
-          const deferred = panState.deferredAction;
-          panState.deferredAction = null;
-          if (deferred) {
-            handleEditorPointerDown(deferred.snapped, deferred.mapPoint, deferred.mode, deferred.doubleClick);
-          }
-        }
-        if (panState.active && !panState.isTouch && e.pointerId === panState.pointerId) {
-          panState.active = false;
-          panState.pointerId = null;
-        }
-        if (editorState.dragging?.historySnapshot &&
-          editorState.dragging.didMove &&
-          !editorState.dragging.historyPushed) {
-          pushEditorHistory(editorState.dragging.historySnapshot);
-        }
-        if (editorState.dragging?.didMove) {
-          scheduleEditorRebuild();
-        }
-        editorState.dragging = null;
-      });
-
-      renderer.domElement.addEventListener('pointercancel', (e) => {
-        if (e.pointerType === 'touch') {
-          panState.touchPoints.delete(e.pointerId);
-          if (panState.touchPoints.size < 2) {
-            panState.active = false;
-            panState.isTouch = false;
-          }
-        }
-        if (panState.pointerId === e.pointerId) {
-          panState.pending = false;
-          panState.active = false;
-          panState.pointerId = null;
-          panState.deferredAction = null;
-        }
-      });
-
-      window.addEventListener('keydown', (e) => {
-        if (!editorActive()) return;
-        const activeEl = document.activeElement;
-        const isTextInput = activeEl &&
-          (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable);
-        if (!isTextInput && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
-          e.preventDefault();
-          if (e.shiftKey) {
-            redoEditor();
-          } else {
-            undoEditor();
-          }
-          return;
-        }
-        if (!isTextInput && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
-          e.preventDefault();
-          redoEditor();
-          return;
-        }
-        if (e.key === 'Enter') {
-          if (editorState.tool === 'polygon') addPolygonFromDraft();
-          if (editorState.tool === 'polyline') addPolylineFromDraft();
-        } else if (e.key === 'Escape') {
-          editorState.draft = [];
-          editorState.previewPoint = null;
-          clearJunctionMode();
-          updateDraftLine();
-          updateDraftMarkers();
-          updateEditorStatus('Draft cancelled.');
-        } else if (e.key === 'Delete' || e.key === 'Backspace') {
-          const mode = getEditorMode();
-          if (mode === 'draw-polygon' || mode === 'draw-polyline') {
-            if (editorState.draft.length > 0) {
-              if (editorState.hoverDraftIndex !== null) {
-                editorState.draft.splice(editorState.hoverDraftIndex, 1);
-                editorState.hoverDraftIndex = null;
-              } else {
-                editorState.draft.pop();
-              }
-              editorState.previewPoint = null;
-              if (editorState.draft.length === 0) {
-                clearJunctionMode();
-              }
-              updateDraftLine();
-              updateDraftMarkers();
-              updateEditorStatus(`Draft points: ${editorState.draft.length}`);
-            }
-          } else {
-            deleteSelection();
-          }
-        }
-      });
+      ensureEditorInputRouter().bindEditorEvents();
     }

     // ============================================
 // ANIMATION LOOP
     // ============================================

     const renderLoop = createRenderLoop({
       renderer,
       scene,
       cameras: {
         perspCamera,
         getActiveCamera: () => activeCamera
       },
       controls,
       getViewMode: () => viewMode,
diff --git a/src/editor/Gestures.js b/src/editor/Gestures.js
new file mode 100644
index 0000000..a5fffec
--- /dev/null
+++ b/src/editor/Gestures.js
@@ -0,0 +1,110 @@
+export function createEditorGestures(deps) {
+  const {
+    document,
+    window,
+    renderer,
+    getViewMode,
+    perspCamera,
+    controls
+  } = deps || {};
+
+  function setup() {
+    const joystick = document.getElementById('joystick');
+    const joystickKnob = document.getElementById('joystickKnob');
+    let joystickActive = false;
+    let joystickOrigin = { x: 0, y: 0 };
+
+    if (joystick && joystickKnob) {
+      joystick.addEventListener('touchstart', (e) => {
+        joystickActive = true;
+        const rect = joystick.getBoundingClientRect();
+        joystickOrigin = {
+          x: rect.left + rect.width / 2,
+          y: rect.top + rect.height / 2
+        };
+        e.preventDefault();
+      });
+
+      joystick.addEventListener('touchmove', (e) => {
+        if (!joystickActive) return;
+        const touch = e.touches[0];
+        const dx = touch.clientX - joystickOrigin.x;
+        const dy = touch.clientY - joystickOrigin.y;
+        const maxDist = 35;
+        const dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxDist);
+        const angle = Math.atan2(dy, dx);
+
+        const kx = Math.cos(angle) * dist;
+        const ky = Math.sin(angle) * dist;
+
+        joystickKnob.style.transform = `translate(calc(-50% + ${kx}px), calc(-50% + ${ky}px))`;
+
+        if (getViewMode() === '3d' || getViewMode() === 'street') {
+          const moveSpeed = 2;
+          const dxWorld = (kx / maxDist) * moveSpeed;
+          const dzWorld = (ky / maxDist) * moveSpeed;
+          perspCamera.position.x += dxWorld;
+          perspCamera.position.z += dzWorld;
+          controls.target.x += dxWorld;
+          controls.target.z += dzWorld;
+        }
+        e.preventDefault();
+      });
+
+      joystick.addEventListener('touchend', () => {
+        joystickActive = false;
+        joystickKnob.style.transform = 'translate(-50%, -50%)';
+      });
+    }
+
+    const zoomIn = document.getElementById('zoomIn');
+    const zoomOut = document.getElementById('zoomOut');
+    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
+
+    if (!isCoarse && zoomIn && zoomOut) {
+      zoomIn.addEventListener('click', () => {
+        if (getViewMode() === '3d' || getViewMode() === 'street') {
+          perspCamera.position.y = Math.max(50, perspCamera.position.y - 50);
+          perspCamera.fov = Math.max(30, perspCamera.fov - 5);
+          perspCamera.updateProjectionMatrix();
+        }
+      });
+
+      zoomOut.addEventListener('click', () => {
+        if (getViewMode() === '3d' || getViewMode() === 'street') {
+          perspCamera.position.y = Math.min(800, perspCamera.position.y + 50);
+          perspCamera.fov = Math.min(90, perspCamera.fov + 5);
+          perspCamera.updateProjectionMatrix();
+        }
+      });
+    }
+
+    let touchStartDist = 0;
+    renderer.domElement.addEventListener('touchstart', (e) => {
+      if (e.touches.length === 2) {
+        const dx = e.touches[0].clientX - e.touches[1].clientX;
+        const dy = e.touches[0].clientY - e.touches[1].clientY;
+        touchStartDist = Math.sqrt(dx * dx + dy * dy);
+      }
+    });
+
+    renderer.domElement.addEventListener('touchmove', (e) => {
+      if (e.touches.length === 2 && getViewMode() !== 'plan') {
+        const dx = e.touches[0].clientX - e.touches[1].clientX;
+        const dy = e.touches[0].clientY - e.touches[1].clientY;
+        const dist = Math.sqrt(dx * dx + dy * dy);
+        const delta = dist - touchStartDist;
+
+        perspCamera.position.y -= delta * 0.5;
+        perspCamera.position.y = Math.max(50, Math.min(800, perspCamera.position.y));
+
+        touchStartDist = dist;
+        e.preventDefault();
+      }
+    });
+  }
+
+  return {
+    setup
+  };
+}
diff --git a/src/editor/HitTest.js b/src/editor/HitTest.js
new file mode 100644
index 0000000..02562ad
--- /dev/null
+++ b/src/editor/HitTest.js
@@ -0,0 +1,55 @@
+export function createEditorHitTest(deps) {
+  const {
+    mapOverlayGroupRef,
+    raycaster,
+    THREE,
+    Y,
+    getActiveCamera,
+    orthoCamera,
+    MAP_WIDTH,
+    MAP_HEIGHT,
+    getViewportSize
+  } = deps || {};
+
+  function canPanMap() {
+    const viewW = (orthoCamera.right - orthoCamera.left) / orthoCamera.zoom;
+    const viewH = (orthoCamera.top - orthoCamera.bottom) / orthoCamera.zoom;
+    return (MAP_WIDTH > viewW + 1) || (MAP_HEIGHT > viewH + 1);
+  }
+
+  function applyPanDelta(dxPx, dyPx) {
+    const viewport = getViewportSize();
+    const viewW = (orthoCamera.right - orthoCamera.left) / orthoCamera.zoom;
+    const viewH = (orthoCamera.top - orthoCamera.bottom) / orthoCamera.zoom;
+    const worldPerPxX = viewW / viewport.width;
+    const worldPerPxZ = viewH / viewport.height;
+    const dxWorld = -dxPx * worldPerPxX;
+    const dzWorld = -dyPx * worldPerPxZ;
+    orthoCamera.position.x += dxWorld;
+    orthoCamera.position.z += dzWorld;
+    orthoCamera.lookAt(orthoCamera.position.x, 0, orthoCamera.position.z);
+    orthoCamera.updateProjectionMatrix();
+  }
+
+  function getPointerMapPoint(event) {
+    const mapOverlayGroup = mapOverlayGroupRef();
+    if (!mapOverlayGroup) return null;
+    const viewport = getViewportSize();
+    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -Y.overlay);
+    const mouseVec = new THREE.Vector2(
+      (event.clientX / viewport.width) * 2 - 1,
+      -(event.clientY / viewport.height) * 2 + 1
+    );
+    raycaster.setFromCamera(mouseVec, getActiveCamera());
+    const hit = new THREE.Vector3();
+    if (!raycaster.ray.intersectPlane(plane, hit)) return null;
+    mapOverlayGroup.worldToLocal(hit);
+    return { x: hit.x, z: hit.z };
+  }
+
+  return {
+    canPanMap,
+    applyPanDelta,
+    getPointerMapPoint
+  };
+}
diff --git a/src/editor/InputRouter.js b/src/editor/InputRouter.js
new file mode 100644
index 0000000..558cea9
--- /dev/null
+++ b/src/editor/InputRouter.js
@@ -0,0 +1,329 @@
+export function createEditorInputRouter(deps) {
+  const {
+    renderer,
+    editorActive,
+    getActiveCamera,
+    orthoCamera,
+    canPanMap,
+    panState,
+    getPointerMapPoint,
+    snapMapPoint,
+    getEditorMode,
+    isDoubleClick,
+    findNearestDraftVertex,
+    findNearestVertex,
+    getSelectedEntry,
+    findNearestVertexInEntry,
+    findNearestEdgeInEntry,
+    pointInPolygon,
+    handleEditorPointerDown,
+    applyPanDelta,
+    editorState,
+    updateDraftLine,
+    updateEditorHover,
+    findNearestLineEndpoint,
+    findNearestLineVertex,
+    findNearestLineEdge,
+    getEditorHitRadius,
+    getBlueprintData,
+    scheduleEditorRebuild,
+    pushEditorHistory,
+    clearJunctionMode,
+    updateDraftMarkers,
+    updateEditorStatus,
+    addPolygonFromDraft,
+    addPolylineFromDraft,
+    deleteSelection,
+    undoEditor,
+    redoEditor
+  } = deps || {};
+
+  function bindEditorEvents() {
+    renderer.domElement.style.touchAction = 'none';
+    renderer.domElement.addEventListener('pointerdown', (e) => {
+      if (!editorActive()) return;
+      if (e.button !== 0) return;
+
+      if (getActiveCamera() === orthoCamera && e.pointerType === 'touch') {
+        panState.touchPoints.set(e.pointerId, { x: e.clientX, y: e.clientY });
+        if (panState.touchPoints.size >= 2 && canPanMap()) {
+          panState.active = true;
+          panState.isTouch = true;
+          panState.pending = false;
+          const pts = Array.from(panState.touchPoints.values());
+          panState.lastX = (pts[0].x + pts[1].x) / 2;
+          panState.lastY = (pts[0].y + pts[1].y) / 2;
+          renderer.domElement.setPointerCapture(e.pointerId);
+          return;
+        }
+      }
+
+      const mapPoint = getPointerMapPoint(e);
+      if (!mapPoint) return;
+      const snapped = snapMapPoint(mapPoint);
+      const mode = getEditorMode();
+      const doubleClick = isDoubleClick(snapped);
+
+      const canMousePan = (getActiveCamera() === orthoCamera && canPanMap() && e.pointerType === 'mouse');
+      let immediateDrag = false;
+      if (mode === 'draw-polygon' || mode === 'draw-polyline') {
+        immediateDrag = !!findNearestDraftVertex(snapped, 10);
+      } else if (mode === 'edit') {
+        const selected = getSelectedEntry();
+        if (selected) {
+          immediateDrag = !!findNearestVertexInEntry(selected.entry, snapped, 10);
+          if (!immediateDrag) immediateDrag = !!findNearestEdgeInEntry(selected.entry, snapped, 12);
+          if (!immediateDrag && selected.entry.polygon) {
+            immediateDrag = pointInPolygon(snapped.x, snapped.z, selected.entry.polygon);
+          }
+        }
+      } else if (mode === 'select') {
+        immediateDrag = !!findNearestVertex(snapped, 12);
+      }
+
+      if (canMousePan && !immediateDrag) {
+        panState.pending = true;
+        panState.active = false;
+        panState.isTouch = false;
+        panState.pointerId = e.pointerId;
+        panState.lastX = e.clientX;
+        panState.lastY = e.clientY;
+        panState.deferredAction = { snapped, mapPoint, mode, doubleClick };
+        renderer.domElement.setPointerCapture(e.pointerId);
+        return;
+      }
+
+      handleEditorPointerDown(snapped, mapPoint, mode, doubleClick);
+    });
+
+    renderer.domElement.addEventListener('pointermove', (e) => {
+      if (!editorActive()) return;
+
+      if (getActiveCamera() === orthoCamera && e.pointerType === 'touch') {
+        if (panState.touchPoints.has(e.pointerId)) {
+          panState.touchPoints.set(e.pointerId, { x: e.clientX, y: e.clientY });
+        }
+        if (panState.active && panState.isTouch && panState.touchPoints.size >= 2) {
+          const pts = Array.from(panState.touchPoints.values());
+          const cx = (pts[0].x + pts[1].x) / 2;
+          const cy = (pts[0].y + pts[1].y) / 2;
+          const dx = cx - panState.lastX;
+          const dy = cy - panState.lastY;
+          panState.lastX = cx;
+          panState.lastY = cy;
+          applyPanDelta(dx, dy);
+          return;
+        }
+      }
+
+      if (panState.pending && e.pointerType === 'mouse' && e.pointerId === panState.pointerId) {
+        const dx = e.clientX - panState.lastX;
+        const dy = e.clientY - panState.lastY;
+        if (Math.hypot(dx, dy) > 3) {
+          panState.active = true;
+          panState.pending = false;
+        }
+      }
+      if (panState.active && !panState.isTouch && e.pointerId === panState.pointerId) {
+        const dx = e.clientX - panState.lastX;
+        const dy = e.clientY - panState.lastY;
+        panState.lastX = e.clientX;
+        panState.lastY = e.clientY;
+        applyPanDelta(dx, dy);
+        return;
+      }
+
+      const mapPoint = getPointerMapPoint(e);
+      if (!mapPoint) return;
+      const snapped = snapMapPoint(mapPoint);
+      const mode = getEditorMode();
+
+      if (!editorState.dragging) {
+        if (mode === 'draw-polygon' || mode === 'draw-polyline') {
+          if (editorState.draft.length > 0) {
+            if (mode === 'draw-polyline') {
+              const endpointHit = findNearestLineEndpoint(mapPoint, getEditorHitRadius(16));
+              const vertexHit = findNearestLineVertex(mapPoint, getEditorHitRadius(16));
+              const edgeHit = findNearestLineEdge(mapPoint, getEditorHitRadius(12));
+              const draftStart = editorState.draft[0];
+              const dxStart = draftStart ? (mapPoint.x - draftStart[0]) : 0;
+              const dzStart = draftStart ? (mapPoint.z - draftStart[1]) : 0;
+              const closeStart = draftStart && (dxStart * dxStart + dzStart * dzStart) <= getEditorHitRadius(14) * getEditorHitRadius(14);
+              if (closeStart) {
+                editorState.previewPoint = [draftStart[0], draftStart[1]];
+              } else if (vertexHit) {
+                editorState.previewPoint = [vertexHit.point[0], vertexHit.point[1]];
+              } else if (endpointHit) {
+                editorState.previewPoint = [endpointHit.point[0], endpointHit.point[1]];
+              } else if (edgeHit) {
+                editorState.previewPoint = [edgeHit.point.x, edgeHit.point.z];
+              } else {
+                editorState.previewPoint = [snapped.x, snapped.z];
+              }
+            } else {
+              editorState.previewPoint = [snapped.x, snapped.z];
+            }
+          } else {
+            editorState.previewPoint = null;
+          }
+          updateDraftLine();
+        }
+        updateEditorHover(snapped);
+        return;
+      }
+
+      if (editorState.dragging.mode === 'draft') {
+        const idx = editorState.dragging.index;
+        if (editorState.draft[idx]) {
+          editorState.draft[idx] = [snapped.x, snapped.z];
+          updateDraftLine();
+          updateDraftMarkers();
+        }
+        return;
+      }
+
+      if (!editorState.selected) return;
+      const { layer, index, vertexIndex } = editorState.selected;
+      const list = getBlueprintData()?.[layer];
+      if (!list || !list[index]) return;
+      const entry = list[index];
+
+      if (editorState.dragging.mode === 'vertex' && vertexIndex !== null) {
+        let target = snapped;
+        if (entry.polyline) {
+          const endpointHit = findNearestLineEndpoint(mapPoint, getEditorHitRadius(14));
+          if (endpointHit &&
+            !(endpointHit.index === index && endpointHit.vertexIndex === vertexIndex)) {
+            target = { x: endpointHit.point[0], z: endpointHit.point[1] };
+          }
+        }
+        if (entry.polyline) {
+          entry.polyline[vertexIndex] = [target.x, target.z];
+        } else if (entry.polygon) {
+          entry.polygon[vertexIndex] = [target.x, target.z];
+        }
+        editorState.dragging.didMove = true;
+      } else if (editorState.dragging.mode === 'polygon' && editorState.dragging.original) {
+        const dx = snapped.x - editorState.dragging.start.x;
+        const dz = snapped.z - editorState.dragging.start.z;
+        const moved = editorState.dragging.original.map(p => [p[0] + dx, p[1] + dz]);
+        if (editorState.dragging.isPolyline) {
+          entry.polyline = moved;
+        } else {
+          entry.polygon = moved;
+          if (Array.isArray(entry.curves)) {
+            entry.curves = editorState.dragging.curves || entry.curves;
+          }
+        }
+        editorState.dragging.didMove = true;
+      }
+      scheduleEditorRebuild();
+    });
+
+    renderer.domElement.addEventListener('pointerup', (e) => {
+      if (e.pointerType === 'touch') {
+        panState.touchPoints.delete(e.pointerId);
+        if (panState.touchPoints.size < 2) {
+          panState.active = false;
+          panState.isTouch = false;
+        }
+      }
+      if (panState.pending && e.pointerId === panState.pointerId) {
+        panState.pending = false;
+        panState.active = false;
+        panState.pointerId = null;
+        const deferred = panState.deferredAction;
+        panState.deferredAction = null;
+        if (deferred) {
+          handleEditorPointerDown(deferred.snapped, deferred.mapPoint, deferred.mode, deferred.doubleClick);
+        }
+      }
+      if (panState.active && !panState.isTouch && e.pointerId === panState.pointerId) {
+        panState.active = false;
+        panState.pointerId = null;
+      }
+      if (editorState.dragging?.historySnapshot &&
+        editorState.dragging.didMove &&
+        !editorState.dragging.historyPushed) {
+        pushEditorHistory(editorState.dragging.historySnapshot);
+      }
+      if (editorState.dragging?.didMove) {
+        scheduleEditorRebuild();
+      }
+      editorState.dragging = null;
+    });
+
+    renderer.domElement.addEventListener('pointercancel', (e) => {
+      if (e.pointerType === 'touch') {
+        panState.touchPoints.delete(e.pointerId);
+        if (panState.touchPoints.size < 2) {
+          panState.active = false;
+          panState.isTouch = false;
+        }
+      }
+      if (panState.pointerId === e.pointerId) {
+        panState.pending = false;
+        panState.active = false;
+        panState.pointerId = null;
+        panState.deferredAction = null;
+      }
+    });
+
+    window.addEventListener('keydown', (e) => {
+      if (!editorActive()) return;
+      const activeEl = document.activeElement;
+      const isTextInput = activeEl &&
+        (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable);
+      if (!isTextInput && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
+        e.preventDefault();
+        if (e.shiftKey) {
+          redoEditor();
+        } else {
+          undoEditor();
+        }
+        return;
+      }
+      if (!isTextInput && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
+        e.preventDefault();
+        redoEditor();
+        return;
+      }
+      if (e.key === 'Enter') {
+        if (editorState.tool === 'polygon') addPolygonFromDraft();
+        if (editorState.tool === 'polyline') addPolylineFromDraft();
+      } else if (e.key === 'Escape') {
+        editorState.draft = [];
+        editorState.previewPoint = null;
+        clearJunctionMode();
+        updateDraftLine();
+        updateDraftMarkers();
+        updateEditorStatus('Draft cancelled.');
+      } else if (e.key === 'Delete' || e.key === 'Backspace') {
+        const mode = getEditorMode();
+        if (mode === 'draw-polygon' || mode === 'draw-polyline') {
+          if (editorState.draft.length > 0) {
+            if (editorState.hoverDraftIndex !== null) {
+              editorState.draft.splice(editorState.hoverDraftIndex, 1);
+              editorState.hoverDraftIndex = null;
+            } else {
+              editorState.draft.pop();
+            }
+            editorState.previewPoint = null;
+            if (editorState.draft.length === 0) {
+              clearJunctionMode();
+            }
+            updateDraftLine();
+            updateDraftMarkers();
+            updateEditorStatus(`Draft points: ${editorState.draft.length}`);
+          }
+        } else {
+          deleteSelection();
+        }
+      }
+    });
+  }
+
+  return {
+    bindEditorEvents
+  };
+}
```

## Probe Gate Greps
Command:
```bash
grep -nF "refactorProbe" city-sim.html
```
Output:
```text
1089:    const probeEnabled = new URLSearchParams(location.search).has('refactorProbe');
1143:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

Command:
```bash
grep -nF "import('./tools/refactorProbe.js')" city-sim.html || grep -nF 'import("./tools/refactorProbe.js")' city-sim.html
```
Output:
```text
1143:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

## Pinned New Module Contents
Command:
```bash
git show e857692:src/editor/InputRouter.js
```
Output:
```javascript
export function createEditorInputRouter(deps) {
  const {
    renderer,
    editorActive,
    getActiveCamera,
    orthoCamera,
    canPanMap,
    panState,
    getPointerMapPoint,
    snapMapPoint,
    getEditorMode,
    isDoubleClick,
    findNearestDraftVertex,
    findNearestVertex,
    getSelectedEntry,
    findNearestVertexInEntry,
    findNearestEdgeInEntry,
    pointInPolygon,
    handleEditorPointerDown,
    applyPanDelta,
    editorState,
    updateDraftLine,
    updateEditorHover,
    findNearestLineEndpoint,
    findNearestLineVertex,
    findNearestLineEdge,
    getEditorHitRadius,
    getBlueprintData,
    scheduleEditorRebuild,
    pushEditorHistory,
    clearJunctionMode,
    updateDraftMarkers,
    updateEditorStatus,
    addPolygonFromDraft,
    addPolylineFromDraft,
    deleteSelection,
    undoEditor,
    redoEditor
  } = deps || {};

  function bindEditorEvents() {
    renderer.domElement.style.touchAction = 'none';
    renderer.domElement.addEventListener('pointerdown', (e) => {
      if (!editorActive()) return;
      if (e.button !== 0) return;

      if (getActiveCamera() === orthoCamera && e.pointerType === 'touch') {
        panState.touchPoints.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (panState.touchPoints.size >= 2 && canPanMap()) {
          panState.active = true;
          panState.isTouch = true;
          panState.pending = false;
          const pts = Array.from(panState.touchPoints.values());
          panState.lastX = (pts[0].x + pts[1].x) / 2;
          panState.lastY = (pts[0].y + pts[1].y) / 2;
          renderer.domElement.setPointerCapture(e.pointerId);
          return;
        }
      }

      const mapPoint = getPointerMapPoint(e);
      if (!mapPoint) return;
      const snapped = snapMapPoint(mapPoint);
      const mode = getEditorMode();
      const doubleClick = isDoubleClick(snapped);

      const canMousePan = (getActiveCamera() === orthoCamera && canPanMap() && e.pointerType === 'mouse');
      let immediateDrag = false;
      if (mode === 'draw-polygon' || mode === 'draw-polyline') {
        immediateDrag = !!findNearestDraftVertex(snapped, 10);
      } else if (mode === 'edit') {
        const selected = getSelectedEntry();
        if (selected) {
          immediateDrag = !!findNearestVertexInEntry(selected.entry, snapped, 10);
          if (!immediateDrag) immediateDrag = !!findNearestEdgeInEntry(selected.entry, snapped, 12);
          if (!immediateDrag && selected.entry.polygon) {
            immediateDrag = pointInPolygon(snapped.x, snapped.z, selected.entry.polygon);
          }
        }
      } else if (mode === 'select') {
        immediateDrag = !!findNearestVertex(snapped, 12);
      }

      if (canMousePan && !immediateDrag) {
        panState.pending = true;
        panState.active = false;
        panState.isTouch = false;
        panState.pointerId = e.pointerId;
        panState.lastX = e.clientX;
        panState.lastY = e.clientY;
        panState.deferredAction = { snapped, mapPoint, mode, doubleClick };
        renderer.domElement.setPointerCapture(e.pointerId);
        return;
      }

      handleEditorPointerDown(snapped, mapPoint, mode, doubleClick);
    });

    renderer.domElement.addEventListener('pointermove', (e) => {
      if (!editorActive()) return;

      if (getActiveCamera() === orthoCamera && e.pointerType === 'touch') {
        if (panState.touchPoints.has(e.pointerId)) {
          panState.touchPoints.set(e.pointerId, { x: e.clientX, y: e.clientY });
        }
        if (panState.active && panState.isTouch && panState.touchPoints.size >= 2) {
          const pts = Array.from(panState.touchPoints.values());
          const cx = (pts[0].x + pts[1].x) / 2;
          const cy = (pts[0].y + pts[1].y) / 2;
          const dx = cx - panState.lastX;
          const dy = cy - panState.lastY;
          panState.lastX = cx;
          panState.lastY = cy;
          applyPanDelta(dx, dy);
          return;
        }
      }

      if (panState.pending && e.pointerType === 'mouse' && e.pointerId === panState.pointerId) {
        const dx = e.clientX - panState.lastX;
        const dy = e.clientY - panState.lastY;
        if (Math.hypot(dx, dy) > 3) {
          panState.active = true;
          panState.pending = false;
        }
      }
      if (panState.active && !panState.isTouch && e.pointerId === panState.pointerId) {
        const dx = e.clientX - panState.lastX;
        const dy = e.clientY - panState.lastY;
        panState.lastX = e.clientX;
        panState.lastY = e.clientY;
        applyPanDelta(dx, dy);
        return;
      }

      const mapPoint = getPointerMapPoint(e);
      if (!mapPoint) return;
      const snapped = snapMapPoint(mapPoint);
      const mode = getEditorMode();

      if (!editorState.dragging) {
        if (mode === 'draw-polygon' || mode === 'draw-polyline') {
          if (editorState.draft.length > 0) {
            if (mode === 'draw-polyline') {
              const endpointHit = findNearestLineEndpoint(mapPoint, getEditorHitRadius(16));
              const vertexHit = findNearestLineVertex(mapPoint, getEditorHitRadius(16));
              const edgeHit = findNearestLineEdge(mapPoint, getEditorHitRadius(12));
              const draftStart = editorState.draft[0];
              const dxStart = draftStart ? (mapPoint.x - draftStart[0]) : 0;
              const dzStart = draftStart ? (mapPoint.z - draftStart[1]) : 0;
              const closeStart = draftStart && (dxStart * dxStart + dzStart * dzStart) <= getEditorHitRadius(14) * getEditorHitRadius(14);
              if (closeStart) {
                editorState.previewPoint = [draftStart[0], draftStart[1]];
              } else if (vertexHit) {
                editorState.previewPoint = [vertexHit.point[0], vertexHit.point[1]];
              } else if (endpointHit) {
                editorState.previewPoint = [endpointHit.point[0], endpointHit.point[1]];
              } else if (edgeHit) {
                editorState.previewPoint = [edgeHit.point.x, edgeHit.point.z];
              } else {
                editorState.previewPoint = [snapped.x, snapped.z];
              }
            } else {
              editorState.previewPoint = [snapped.x, snapped.z];
            }
          } else {
            editorState.previewPoint = null;
          }
          updateDraftLine();
        }
        updateEditorHover(snapped);
        return;
      }

      if (editorState.dragging.mode === 'draft') {
        const idx = editorState.dragging.index;
        if (editorState.draft[idx]) {
          editorState.draft[idx] = [snapped.x, snapped.z];
          updateDraftLine();
          updateDraftMarkers();
        }
        return;
      }

      if (!editorState.selected) return;
      const { layer, index, vertexIndex } = editorState.selected;
      const list = getBlueprintData()?.[layer];
      if (!list || !list[index]) return;
      const entry = list[index];

      if (editorState.dragging.mode === 'vertex' && vertexIndex !== null) {
        let target = snapped;
        if (entry.polyline) {
          const endpointHit = findNearestLineEndpoint(mapPoint, getEditorHitRadius(14));
          if (endpointHit &&
            !(endpointHit.index === index && endpointHit.vertexIndex === vertexIndex)) {
            target = { x: endpointHit.point[0], z: endpointHit.point[1] };
          }
        }
        if (entry.polyline) {
          entry.polyline[vertexIndex] = [target.x, target.z];
        } else if (entry.polygon) {
          entry.polygon[vertexIndex] = [target.x, target.z];
        }
        editorState.dragging.didMove = true;
      } else if (editorState.dragging.mode === 'polygon' && editorState.dragging.original) {
        const dx = snapped.x - editorState.dragging.start.x;
        const dz = snapped.z - editorState.dragging.start.z;
        const moved = editorState.dragging.original.map(p => [p[0] + dx, p[1] + dz]);
        if (editorState.dragging.isPolyline) {
          entry.polyline = moved;
        } else {
          entry.polygon = moved;
          if (Array.isArray(entry.curves)) {
            entry.curves = editorState.dragging.curves || entry.curves;
          }
        }
        editorState.dragging.didMove = true;
      }
      scheduleEditorRebuild();
    });

    renderer.domElement.addEventListener('pointerup', (e) => {
      if (e.pointerType === 'touch') {
        panState.touchPoints.delete(e.pointerId);
        if (panState.touchPoints.size < 2) {
          panState.active = false;
          panState.isTouch = false;
        }
      }
      if (panState.pending && e.pointerId === panState.pointerId) {
        panState.pending = false;
        panState.active = false;
        panState.pointerId = null;
        const deferred = panState.deferredAction;
        panState.deferredAction = null;
        if (deferred) {
          handleEditorPointerDown(deferred.snapped, deferred.mapPoint, deferred.mode, deferred.doubleClick);
        }
      }
      if (panState.active && !panState.isTouch && e.pointerId === panState.pointerId) {
        panState.active = false;
        panState.pointerId = null;
      }
      if (editorState.dragging?.historySnapshot &&
        editorState.dragging.didMove &&
        !editorState.dragging.historyPushed) {
        pushEditorHistory(editorState.dragging.historySnapshot);
      }
      if (editorState.dragging?.didMove) {
        scheduleEditorRebuild();
      }
      editorState.dragging = null;
    });

    renderer.domElement.addEventListener('pointercancel', (e) => {
      if (e.pointerType === 'touch') {
        panState.touchPoints.delete(e.pointerId);
        if (panState.touchPoints.size < 2) {
          panState.active = false;
          panState.isTouch = false;
        }
      }
      if (panState.pointerId === e.pointerId) {
        panState.pending = false;
        panState.active = false;
        panState.pointerId = null;
        panState.deferredAction = null;
      }
    });

    window.addEventListener('keydown', (e) => {
      if (!editorActive()) return;
      const activeEl = document.activeElement;
      const isTextInput = activeEl &&
        (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable);
      if (!isTextInput && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          redoEditor();
        } else {
          undoEditor();
        }
        return;
      }
      if (!isTextInput && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redoEditor();
        return;
      }
      if (e.key === 'Enter') {
        if (editorState.tool === 'polygon') addPolygonFromDraft();
        if (editorState.tool === 'polyline') addPolylineFromDraft();
      } else if (e.key === 'Escape') {
        editorState.draft = [];
        editorState.previewPoint = null;
        clearJunctionMode();
        updateDraftLine();
        updateDraftMarkers();
        updateEditorStatus('Draft cancelled.');
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        const mode = getEditorMode();
        if (mode === 'draw-polygon' || mode === 'draw-polyline') {
          if (editorState.draft.length > 0) {
            if (editorState.hoverDraftIndex !== null) {
              editorState.draft.splice(editorState.hoverDraftIndex, 1);
              editorState.hoverDraftIndex = null;
            } else {
              editorState.draft.pop();
            }
            editorState.previewPoint = null;
            if (editorState.draft.length === 0) {
              clearJunctionMode();
            }
            updateDraftLine();
            updateDraftMarkers();
            updateEditorStatus(`Draft points: ${editorState.draft.length}`);
          }
        } else {
          deleteSelection();
        }
      }
    });
  }

  return {
    bindEditorEvents
  };
}
```

Command:
```bash
git show e857692:src/editor/HitTest.js
```
Output:
```javascript
export function createEditorHitTest(deps) {
  const {
    mapOverlayGroupRef,
    raycaster,
    THREE,
    Y,
    getActiveCamera,
    orthoCamera,
    MAP_WIDTH,
    MAP_HEIGHT,
    getViewportSize
  } = deps || {};

  function canPanMap() {
    const viewW = (orthoCamera.right - orthoCamera.left) / orthoCamera.zoom;
    const viewH = (orthoCamera.top - orthoCamera.bottom) / orthoCamera.zoom;
    return (MAP_WIDTH > viewW + 1) || (MAP_HEIGHT > viewH + 1);
  }

  function applyPanDelta(dxPx, dyPx) {
    const viewport = getViewportSize();
    const viewW = (orthoCamera.right - orthoCamera.left) / orthoCamera.zoom;
    const viewH = (orthoCamera.top - orthoCamera.bottom) / orthoCamera.zoom;
    const worldPerPxX = viewW / viewport.width;
    const worldPerPxZ = viewH / viewport.height;
    const dxWorld = -dxPx * worldPerPxX;
    const dzWorld = -dyPx * worldPerPxZ;
    orthoCamera.position.x += dxWorld;
    orthoCamera.position.z += dzWorld;
    orthoCamera.lookAt(orthoCamera.position.x, 0, orthoCamera.position.z);
    orthoCamera.updateProjectionMatrix();
  }

  function getPointerMapPoint(event) {
    const mapOverlayGroup = mapOverlayGroupRef();
    if (!mapOverlayGroup) return null;
    const viewport = getViewportSize();
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -Y.overlay);
    const mouseVec = new THREE.Vector2(
      (event.clientX / viewport.width) * 2 - 1,
      -(event.clientY / viewport.height) * 2 + 1
    );
    raycaster.setFromCamera(mouseVec, getActiveCamera());
    const hit = new THREE.Vector3();
    if (!raycaster.ray.intersectPlane(plane, hit)) return null;
    mapOverlayGroup.worldToLocal(hit);
    return { x: hit.x, z: hit.z };
  }

  return {
    canPanMap,
    applyPanDelta,
    getPointerMapPoint
  };
}
```

Command:
```bash
git show e857692:src/editor/Gestures.js
```
Output:
```javascript
export function createEditorGestures(deps) {
  const {
    document,
    window,
    renderer,
    getViewMode,
    perspCamera,
    controls
  } = deps || {};

  function setup() {
    const joystick = document.getElementById('joystick');
    const joystickKnob = document.getElementById('joystickKnob');
    let joystickActive = false;
    let joystickOrigin = { x: 0, y: 0 };

    if (joystick && joystickKnob) {
      joystick.addEventListener('touchstart', (e) => {
        joystickActive = true;
        const rect = joystick.getBoundingClientRect();
        joystickOrigin = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };
        e.preventDefault();
      });

      joystick.addEventListener('touchmove', (e) => {
        if (!joystickActive) return;
        const touch = e.touches[0];
        const dx = touch.clientX - joystickOrigin.x;
        const dy = touch.clientY - joystickOrigin.y;
        const maxDist = 35;
        const dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxDist);
        const angle = Math.atan2(dy, dx);

        const kx = Math.cos(angle) * dist;
        const ky = Math.sin(angle) * dist;

        joystickKnob.style.transform = `translate(calc(-50% + ${kx}px), calc(-50% + ${ky}px))`;

        if (getViewMode() === '3d' || getViewMode() === 'street') {
          const moveSpeed = 2;
          const dxWorld = (kx / maxDist) * moveSpeed;
          const dzWorld = (ky / maxDist) * moveSpeed;
          perspCamera.position.x += dxWorld;
          perspCamera.position.z += dzWorld;
          controls.target.x += dxWorld;
          controls.target.z += dzWorld;
        }
        e.preventDefault();
      });

      joystick.addEventListener('touchend', () => {
        joystickActive = false;
        joystickKnob.style.transform = 'translate(-50%, -50%)';
      });
    }

    const zoomIn = document.getElementById('zoomIn');
    const zoomOut = document.getElementById('zoomOut');
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;

    if (!isCoarse && zoomIn && zoomOut) {
      zoomIn.addEventListener('click', () => {
        if (getViewMode() === '3d' || getViewMode() === 'street') {
          perspCamera.position.y = Math.max(50, perspCamera.position.y - 50);
          perspCamera.fov = Math.max(30, perspCamera.fov - 5);
          perspCamera.updateProjectionMatrix();
        }
      });

      zoomOut.addEventListener('click', () => {
        if (getViewMode() === '3d' || getViewMode() === 'street') {
          perspCamera.position.y = Math.min(800, perspCamera.position.y + 50);
          perspCamera.fov = Math.min(90, perspCamera.fov + 5);
          perspCamera.updateProjectionMatrix();
        }
      });
    }

    let touchStartDist = 0;
    renderer.domElement.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        touchStartDist = Math.sqrt(dx * dx + dy * dy);
      }
    });

    renderer.domElement.addEventListener('touchmove', (e) => {
      if (e.touches.length === 2 && getViewMode() !== 'plan') {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const delta = dist - touchStartDist;

        perspCamera.position.y -= delta * 0.5;
        perspCamera.position.y = Math.max(50, Math.min(800, perspCamera.position.y));

        touchStartDist = dist;
        e.preventDefault();
      }
    });
  }

  return {
    setup
  };
}
```

## Probe Summary
- Probe URL: `http://localhost:8000/city-sim.html?refactorProbe=1`
- Capture method: MCP readiness-gated probe
- REFACTOR_PROBE_LEN: `3978`
- REFACTOR_PROBE_SHA256: `c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa`
- sceneCounts: `{"meshCount":631,"lineCount":6,"pointCount":0,"groupCount":206,"geometryCount":443,"materialCount":345}`
- blueprintCounts: `{"beaches":0,"buildings":0,"coastlines":1,"pois":1,"roads":2,"sea":0,"transit":0,"zones":1}`
- overlayDrift: `{"ok":true,"epsPx":0.05,"maxDriftPx":0}`
- rendererInfo.memory: `{"geometries":436,"textures":3}`
- Parity status: tracked fields match Phase 7d baseline.

## Carry-forward Issues
- P0: None.
- P1:
  - Locator: `REFACTOR_LOG.md` Phase 7e block (`phase_end_commit` and `packet_commit` currently `PENDING`).
  - Acceptance: replace with concrete SHAs in a docs-only micro-fix phase.
- P2:
  - Locator: packet size due full `git diff -U15` + full module content blocks.
  - Acceptance: if packet review overhead becomes high, switch to huge-diff fallback in future packets while preserving fixed-command evidence.

## Packet Commit Evidence (Pre-commit)
Command:
```bash
git diff --stat --cached
```
Output:
```text
 docs/ai/review_packet_phase7e.md | 2063 ++++++++++++++++++++++++++++++++++++++
 1 file changed, 2063 insertions(+)
```

Command:
```bash
git diff --check --cached
```
Output:
```text
(no output)
```
