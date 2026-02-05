# Phase 6c Review Packet

## Metadata
- base_commit: f4f5e91
- phase_end_commit: 2b051a4
- packet_commit: PENDING (best-effort; see git log)

## Phase checklist
- ✅ Pre-flight micro-fix applied (phase6b metadata note + packet note)
- ✅ ZoneLayer extracted into src/render/ZoneLayer.js
- ⏭️ ZoneGenerator helper not created (not needed for clean extraction)
- ✅ Parity probe hash matches baseline
- ✅ No whitespace issues (git diff --check clean)

## Git evidence
```bash
git status -sb
```
```
## refactor/phase6c-zone-layer
```

```bash
git rev-parse --short HEAD
```
```
2b051a4
```

```bash
git log --oneline --decorate -n 20
```
```
2b051a4 (HEAD -> refactor/phase6c-zone-layer) docs(phase6c): record probe baseline match
80d8446 refactor(phase6c): extract zone layer
cc7eb76 docs(phase6c): fix phase6b metadata note
f4f5e91 (refactor/phase6b-terrain-layer) docs(ai): add review packet for phase 6b
b932578 docs(phase6b): record probe baseline match
b3e269d refactor(phase6b): extract terrain generator/layer
a8d7fe8 (refactor/phase6a-material-library) docs(plan): replace refactor plan v7 rev1 with rev2
7e85b9f docs(ai): fix phase6a packet_commit
aaaf294 docs(ai): add review packet for phase 6a
ce16421 feat(phase6a): add MaterialLibrary and shared window assets
c1e482d (refactor/phase5_2-probe-hygiene) docs(ai): fix phase5.2 packet_commit
093431d docs(ai): add review packet for phase 5.2
8c0801e docs(phase5.2): record probe hygiene verification
8d49f5e (refactor/phase5_1-evidence-alignment) docs(ai): fix phase5.1 packet_commit
5a1fffd docs(ai): add phase5.1 evidence alignment packet
6ab75e6 (refactor/phase5-scene-layer-ownership) docs(ai): finalize phase5 packet_commit
d68f43d docs(ai): add review packet for phase 5
cd2a4d0 docs(phase5): record parity probe output
d76cadc feat(phase5): extract scene/layer/viewmode/renderloop
1310de1 (refactor/phase4b-overlay-system) docs(ai): finalize phase4b.1 packet_commit
```

```bash
git diff --stat f4f5e91...2b051a4
```
```
 REFACTOR_LOG.md                  | 16 +++++++++++++++-
 city-sim.html                    | 31 +++++++++++++++----------------
 docs/ai/review_packet_phase6b.md |  1 +
 src/render/ZoneLayer.js          | 13 +++++++++++++
 4 files changed, 44 insertions(+), 17 deletions(-)
```

```bash
git diff --check f4f5e91...2b051a4
```
```
```

```bash
git show -U15 2b051a4 -- city-sim.html src/render src/zones src/core src/config src/utils docs tools REFACTOR_LOG.md
```
```
commit 2b051a409dfa01c66c2693b7fc0fadcb57e3db57
Author: xavstack <your.email@example.com>
Date:   Thu Feb 5 08:32:14 2026 +0100

    docs(phase6c): record probe baseline match

diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 7200d5b..a86ef47 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -73,15 +73,29 @@ Probe check (post-extraction):
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }

 ## Phase 6b – TerrainLayer + TerrainGenerator

 - branch: refactor/phase6b-terrain-layer
 - base_commit: a8d7fe8
 - phase_end_commit: b932578

 Probe check (post-extraction):
 - capture_method: codex-mcp
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_sha256: 2526c68e85ea72655154e08d692db9d3d0c46de7b5edf812091f674f74b6fa0b
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
+
+## Phase 6c – ZoneLayer
+
+- branch: refactor/phase6c-zone-layer
+- base_commit: f4f5e91
+- phase_end_commit: 2d076e3
+
+Probe check (post-extraction):
+- capture_method: codex-mcp
+- url: http://localhost:8000/city-sim.html?refactorProbe=1
+- json_sha256: 2526c68e85ea72655154e08d692db9d3d0c46de7b5edf812091f674f74b6fa0b
+- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
+- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
+- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
```

## Guardrail greps
```bash
grep -nF "refactorProbe" city-sim.html
```
```
1071:    const probeEnabled = new URLSearchParams(location.search).has('refactorProbe');
1125:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

```bash
grep -nF "import('./tools/refactorProbe.js')" city-sim.html || grep -nF 'import("./tools/refactorProbe.js")' city-sim.html
```
```
1125:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

```bash
rg -n "epsPx" city-sim.html src/core src/utils tools || true
```
```
city-sim.html:1150:        if (sample.dx > drift.epsPx || sample.dy > drift.epsPx) {
city-sim.html:1151:          console.warn('Overlay mapping drift', { sampleIndex: idx, sample, epsPx: drift.epsPx });
tools/refactorProbe.js:38:  const epsPx = 0.05;
tools/refactorProbe.js:56:  return { ok: maxDrift <= epsPx, epsPx, maxDriftPx: roundNum(maxDrift), samples };
src/core/OverlayTransform.js:20:export function computeOverlayDrift({ dims, group, epsPx = OVERLAY_DRIFT_EPS_PX, samples }) {
src/core/OverlayTransform.js:43:  return { ok: maxDrift <= epsPx, epsPx, maxDriftPx: maxDrift, samples: sampleOut };
```

```bash
rg -n "userData\.shared" city-sim.html src/utils src/render || true
```
```
city-sim.html:4008:        CAR_ASSETS.bodyGeo.userData.shared = true;
city-sim.html:4010:        CAR_ASSETS.roofGeo.userData.shared = true;
city-sim.html:4012:        CAR_ASSETS.wheelGeo.userData.shared = true;
city-sim.html:4014:        CAR_ASSETS.headlightGeo.userData.shared = true;
city-sim.html:4016:        CAR_ASSETS.wheelMat.userData.shared = true;
city-sim.html:4022:        CAR_ASSETS.headlightMat.userData.shared = true;
city-sim.html:4028:        CAR_ASSETS.tailMat.userData.shared = true;
city-sim.html:4041:      mat.userData.shared = true;
src/render/MaterialLibrary.js:23:  day.userData.shared = true;
src/render/MaterialLibrary.js:24:  nightLit.userData.shared = true;
src/render/MaterialLibrary.js:25:  nightDark.userData.shared = true;
src/render/MaterialLibrary.js:32:  geo.userData.shared = true;
```

## Probe summary
- json_sha256: 2526c68e85ea72655154e08d692db9d3d0c46de7b5edf812091f674f74b6fa0b
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
- matches baseline: yes

## Packet commit evidence (pre-commit)
```bash
git diff --stat --cached
```
```
 docs/ai/review_packet_phase6c.md | 183 +++++++++++++++++++++++++++++++++++++++
 1 file changed, 183 insertions(+)
```

```bash
git diff --check --cached
```
```
```
