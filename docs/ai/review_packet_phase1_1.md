# 1) Metadata
- Branch name: refactor/phase1-config-utils
- Base branch: refactor/phase0a-probe-alignment
- HEAD: 2d6952b9c4be09fbb5b817dd780ccc147fa6a69c
- Phase 1.1 commit list:
  - 2d6952b refactor(phase1.1): align RNG + legend rules with plan (no behavior change)
- Status at end of phase commit (recorded now; unchanged since commit 1):

```
## refactor/phase1-config-utils
```

- Status at packet generation time:

```
## refactor/phase1-config-utils
?? docs/ai/review_packet_phase1_1.md
```

# 2) Phase 1.1 Checklist (explicit)
- ✅ RNG naming aligned (mulberry32 restored; rng seed 123456 preserved).
  Evidence: Math.js exports `mulberry32` and `rng = mulberry32(123456)`; no `createRNG` occurrences (see Guardrail Evidence).
- ✅ legendRules.js created and imports rewired.
  Evidence: new `src/config/legendRules.js`; city-sim.html imports LEGEND_* from it (see Git Evidence + Guardrail Evidence).
- ✅ No behavior changes intended.
  Evidence: diff is limited to module extraction alignment (legend rule relocation + RNG naming), no logic changes; commit message explicitly states no behavior change.
- ✅ Probe gate unchanged.
  Evidence: `refactorProbe` gate and dynamic import still present (see Guardrail Evidence).
- ✅ Phase 2 not started.
  Evidence: only Math/legend rule files touched in Phase 1.1; no new state/model modules introduced (see Git Evidence).

# 3) Git Evidence (verbatim command output)

```
## refactor/phase1-config-utils
```

```
2d6952b (HEAD -> refactor/phase1-config-utils) refactor(phase1.1): align RNG + legend rules with plan (no behavior change)
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
ae05802 Phase6: allow loop close on draft start
41a863d Phase6: add traffic controls and snap-to-vertex
3aa9ede Phase6: round-join ribbon generator
5fbf424 (tag: phase6-pre-round-join, phases6-traffic-uitools) Docs: update phase tracking checklist
44cf76b Phase6: fix editor junction toggle refs
```

```
 city-sim.html             |  8 +++++---
 src/config/legendRules.js | 43 +++++++++++++++++++++++++++++++++++++++++++
 src/config/palette.js     | 44 --------------------------------------------
 src/utils/Math.js         |  4 ++--
 4 files changed, 50 insertions(+), 49 deletions(-)
```

```
commit 2d6952b9c4be09fbb5b817dd780ccc147fa6a69c
Author: xavstack <your.email@example.com>
Date:   Mon Feb 2 23:53:09 2026 +0100

    refactor(phase1.1): align RNG + legend rules with plan (no behavior change)

diff --git a/city-sim.html b/city-sim.html
index 97f6b3b..cd3585b 100644
--- a/city-sim.html
+++ b/city-sim.html
@@ -756,37 +756,39 @@
       MAP_OVERLAY_WORLD_W,
       MAP_OVERLAY_WORLD_H,
       GRID_STEP_X,
       GRID_STEP_Z,
       IS_DEV,
       Y,
       OVERLAY_STORAGE_KEY,
       OVERLAY_DEFAULTS,
       OVERLAY_LIMITS,
       LINE_TYPES,
       TRANSIT_TYPES,
       USE_RIBBON_ROADS
     } from './src/config/constants.js';
     import {
       COLORS,
-      LEGEND_LINE_COLORS,
-      LEGEND_TYPE_MAP,
-      ALLOWED_TYPE_CODES,
       POI_COLORS,
       ROAD_LINE_STYLES,
       TRANSIT_STYLES
     } from './src/config/palette.js';
+    import {
+      LEGEND_LINE_COLORS,
+      LEGEND_TYPE_MAP,
+      ALLOWED_TYPE_CODES
+    } from './src/config/legendRules.js';
     import { RENDER_FPS } from './src/config/renderPresets.js';
     import { clampNumber, rng } from './src/utils/Math.js';
     import { pointInPolygon, centroidNorm, distancePointToSegment } from './src/utils/GeometryMath.js';
     import { disposeObject3D } from './src/utils/Dispose.js';
     
     // ============================================
     // CONFIGURATION
     // ============================================
     
     
     // ============================================
     // SCENE SETUP
     // ============================================
 const renderer = new THREE.WebGLRenderer({ antialias: true });
     renderer.setSize(window.innerWidth, window.innerHeight);
```

# 4) Guardrail Evidence

rg -n "createRNG" src city-sim.html
```
(no matches)
```

rg -n "mulberry32" src/utils/Math.js city-sim.html
```
src/utils/Math.js:5:export function mulberry32(seed) {
src/utils/Math.js:14:export const rng = mulberry32(123456); // Change seed to regenerate the city
```

rg -n "refactorProbe" city-sim.html
```
1126:    const probeEnabled = new URLSearchParams(location.search).has('refactorProbe');
1180:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

rg -n "import\\('./tools/refactorProbe\\.js'\\)" city-sim.html
```
1180:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

# 5) File/Export Summary
- `src/utils/Math.js`
  - exports: `clampNumber`, `mulberry32`, `rng`
  - imported in `city-sim.html`: `import { clampNumber, rng } from './src/utils/Math.js';`
- `src/config/legendRules.js`
  - exports: `LEGEND_LINE_COLORS`, `LEGEND_TYPE_MAP`, `ALLOWED_TYPE_CODES`
  - imported in `city-sim.html`: `import { LEGEND_LINE_COLORS, LEGEND_TYPE_MAP, ALLOWED_TYPE_CODES } from './src/config/legendRules.js';`
- `src/config/palette.js`
  - exports: `COLORS`, `POI_COLORS`, `ROAD_LINE_STYLES`, `TRANSIT_STYLES`
  - imported in `city-sim.html`: `import { COLORS, POI_COLORS, ROAD_LINE_STYLES, TRANSIT_STYLES } from './src/config/palette.js';`

# 6) Proof / sanity
```
(no package.json)
```

# 7) Next-step Notes
- Phase 1.1 complete; Phase 2 not started.
- Next step is Phase 2 extraction per plan (BlueprintModel + Validator), but only after senior review.
