# Phase 4b Review Packet

## Metadata
- base_branch: refactor/phase4-overlay-coords
- base_commit: 2eeedf9
- phase_end_commit: b9b4c67
- packet_commit: e6edf1c

## Phase checklist
- ✅ ImageSource added (upload + persistence + maxEdgePx normalization)
- ✅ OverlayLayer extraction (mapOverlayGroup + coord mapper + drift hook)
- ✅ BlueprintPreviewRenderer extraction (preview groups preserved)
- ✅ Parity probe JSON captured (MCP, see probe summary)
- ✅ Overlay drift check still epsPx=0.05 with no warnings

## Git evidence

### git status -sb
```
## refactor/phase4b-overlay-system
?? docs/ai/review_packet_phase4_1.md
```

### git log --oneline --decorate -n 20
```
b9b4c67 (HEAD -> refactor/phase4b-overlay-system) feat(phase4b): add ImageSource + OverlayLayer + preview renderer
2eeedf9 (refactor/phase4-overlay-coords) docs(ai): fix packet_commit for phase 4
061885e docs(ai): add review packet for phase 4
5676069 feat(phase4): add snapshot helpers + coordinate mapping modules
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
```

### git diff --stat 2eeedf9...b9b4c67
```
 city-sim.html                          | 496 +++++++++++----------------------
 docs/LOCALSTORAGE_KEYS.md              |  15 +
 docs/PERSISTENCE.md                    |  49 +---
 src/overlay/OverlayLayer.js            | 100 +++++++
 src/render/BlueprintPreviewRenderer.js | 323 +++++++++++++++++++++
 src/scanner/ImageSource.js             | 137 +++++++++
 6 files changed, 746 insertions(+), 374 deletions(-)
```

### git diff --check 2eeedf9...b9b4c67
```
```

### git diff -U15 2eeedf9...b9b4c67 -- $FOCUS_PATHS
```
(diff output omitted for brevity in this summary — see command run in terminal)
```

## Guardrail greps
```
1180:    const probeEnabled = new URLSearchParams(location.search).has('refactorProbe');
1217:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```
```
1217:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```
```
src/core/CoordinateMapper.js:1:export function pixelToOverlayLocal(px, py, dims) {
src/core/CoordinateMapper.js:14:export function overlayLocalToPixel(local, dims) {
```

## Probe summary
Captured via MCP:
- JSON hash (sha256): `ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d`
- JSON string (full):
```
{"rendererInfo":{"memory":{"geometries":436,"textures":3},"render":{"calls":626,"triangles":22614,"lines":0,"points":0}},"sceneCounts":{"meshCount":631,"lineCount":6,"pointCount":0,"groupCount":206,"geometryCount":443,"materialCount":345},"blueprintCounts":{"beaches":0,"buildings":0,"coastlines":1,"pois":1,"roads":2,"sea":0,"transit":0,"zones":1},"sceneSignature":{"groups":[{"name":"bigBlueJ_building","childrenCount":3},{"name":"bigR_building","childrenCount":3},{"name":"BlueprintLabels","childrenCount":0},{"name":"BlueprintMeshes","childrenCount":4},{"name":"BlueprintOutlines","childrenCount":4},{"name":"BlueprintRoot","childrenCount":6},{"name":"BlueprintTraffic","childrenCount":0},{"name":"bridge","childrenCount":7},{"name":"coastB1_building","childrenCount":3},{"name":"coastB2_building","childrenCount":3},{"name":"coastQ1_building","childrenCount":4},{"name":"coastQ2_building","childrenCount":4},{"name":"colB1_building","childrenCount":3},{"name":"colCi_building","childrenCount":3},{"name":"colFf_building","childrenCount":1},{"name":"colQ_school_building","childrenCount":4},{"name":"colZC1_building","childrenCount":3},{"name":"eastH1_building","childrenCount":3},{"name":"eastH2_building","childrenCount":3},{"name":"eastM_building","childrenCount":1},{"name":"eastMA_building","childrenCount":3},{"name":"eastO_building","childrenCount":3},{"name":"eastR_building","childrenCount":3},{"name":"eastZC_tri_building","childrenCount":3},{"name":"eastZC2_building","childrenCount":3},{"name":"electric_building","childrenCount":3},{"name":"ferrisWheel","childrenCount":3},{"name":"hospB_building","childrenCount":3},{"name":"hospital_building","childrenCount":3},{"name":"hospR_building","childrenCount":3},{"name":"hospZC_tri_building","childrenCount":3},{"name":"hospZC1_building","childrenCount":3},{"name":"islandB1_building","childrenCount":3},{"name":"islandB2_building","childrenCount":3},{"name":"islandB3_building","childrenCount":3},{"name":"islandQ1_building","childrenCount":4},{"name":"islandQ2_building","childrenCount":4},{"name":"islandQ3_building","childrenCount":4},{"name":"islandZC_building","childrenCount":3},{"name":"MapOverlayGroup","childrenCount":10},{"name":"RoadCenterlines","childrenCount":0},{"name":"RoadOffsetDebug","childrenCount":0},{"name":"rubbish_building","childrenCount":1},{"name":"transport1_building","childrenCount":3},{"name":"transport2_building","childrenCount":3},{"name":"underRQ_building","childrenCount":4},{"name":"waterTreatment_building","childrenCount":3},{"name":"windmills","childrenCount":11}]},"overlayDrift":{"ok":true,"epsPx":0.05,"maxDriftPx":0,"samples":[{"px":700,"py":500,"dx":0,"dy":0},{"px":140,"py":100,"dx":0,"dy":0},{"px":1260,"py":900,"dx":0,"dy":0}]},"overlayPreviewGroups":{"BlueprintOutlines":{"childrenCount":4,"visible":false},"BlueprintMeshes":{"childrenCount":4,"visible":false},"BlueprintLabels":{"childrenCount":0,"visible":false},"RoadCenterlines":{"childrenCount":0,"visible":false},"RoadOffsetDebug":{"childrenCount":0,"visible":false}},"renderOrderSignature":{"min":0,"max":999,"unique":[0,997,999]},"renderLoopSignature":{"renderFps":{"realtime":60,"realtimeIdle":30,"idle":20,"idleNoAnim":8},"animationEnabled":false,"targetFpsByMode":{"plan":8,"3d":30,"street":30,"fidelity":8}},"viewModeSignature":{"plan":{"viewMode":"plan","overlayVisible":true,"editorVisible":false,"propsVisible":true,"fxVisible":true,"blueprintPropsVisible":false,"blueprintFxVisible":false},"3d":{"viewMode":"3d","overlayVisible":false,"editorVisible":false,"propsVisible":true,"fxVisible":true,"blueprintPropsVisible":false,"blueprintFxVisible":false},"street":{"viewMode":"street","overlayVisible":false,"editorVisible":false,"propsVisible":true,"fxVisible":true,"blueprintPropsVisible":false,"blueprintFxVisible":false},"fidelity":{"viewMode":"fidelity","overlayVisible":true,"editorVisible":false,"propsVisible":false,"fxVisible":false,"blueprintPropsVisible":false,"blueprintFxVisible":false}}}
```

## Carry-forward
### P0 blockers
- None observed (probe matched baseline fields and drift).

### P1 fold-forward
- Consider avoiding UI upload button placement under Blueprint section if UX should live under Overlay section (no behavior change required).
