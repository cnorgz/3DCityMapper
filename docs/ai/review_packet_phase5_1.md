# Phase 5.1 Evidence Alignment Packet

## Metadata
- base_branch: refactor/phase4b-overlay-system
- base_commit: 1310de1
- phase_end_commit: cd2a4d0
- packet_commit: 5a1fffd
- later packet-fix commits: docs(ai): add review packet for phase 5 (d68f43d), docs(ai): finalize phase5 packet_commit (6ab75e6)

## Baseline / Phase 5 record check
- baseline JSON present: ✅ (REFACTOR_LOG.md, Phase 0 – Baseline section)
- Phase 5 probe record present: ✅ (REFACTOR_LOG.md, “Phase 5 – Scene + Layer Ownership”)

## Git evidence

### git status -sb
```
## refactor/phase5_1-evidence-alignment
```

### git log --oneline --decorate -n 20
```
6ab75e6 (HEAD -> refactor/phase5_1-evidence-alignment, refactor/phase5-scene-layer-ownership) docs(ai): finalize phase5 packet_commit
d68f43d docs(ai): add review packet for phase 5
cd2a4d0 docs(phase5): record parity probe output
d76cadc feat(phase5): extract scene/layer/viewmode/renderloop
1310de1 (refactor/phase4b-overlay-system) docs(ai): finalize phase4b.1 packet_commit
120816a docs(ai): add review packet for phase 4b.1
deb35db docs: fix phase4b packet metadata + overlayCalib docs
b77b0df docs(ai): finalize phase4b packet_commit
80b70d5 docs(ai): refresh phase4b review packet
6d16986 fix(phase4b): align overlay migration + cleanup import
b795c24 docs(ai): update phase4b packet_commit
e6edf1c docs(ai): add review packet for phase 4b
b9b4c67 feat(phase4b): add ImageSource + OverlayLayer + preview renderer
2eeedf9 (refactor/phase4-overlay-coords) docs(ai): fix packet_commit for phase 4
061885e docs(ai): add review packet for phase 4
5676069 feat(phase4): add snapshot helpers + coordinate mapping modules
6c73fca (refactor/phase3-blueprint-core) docs(ai): fix packet_commit for phase 3
3a63b65 docs(ai): add review packet for phase 3
7f34515 feat(phase3): add BlueprintModel + validator + normalizer
bea3202 (refactor/phase2-persistence) docs(ai): add review packet for phase 2
```

### git diff --stat 1310de1...cd2a4d0
```
 REFACTOR_LOG.md                  |  11 ++
 city-sim.html                    | 313 +++++++--------------------------------
 src/render/LayerManager.js       |  53 +++++++
 src/render/RenderLoop.js         | 118 +++++++++++++++
 src/render/SceneManager.js       |  92 ++++++++++++
 src/render/ViewModeController.js |  66 ++++++++++
 6 files changed, 391 insertions(+), 262 deletions(-)
```

### git diff --check 1310de1...cd2a4d0
```
```

### git show -U15 cd2a4d0 -- $FOCUS_PATHS
```
commit cd2a4d01eff10fd1302f40630b0618bbfab5cfab
Author: xavstack <your.email@example.com>
Date:   Wed Feb 4 16:26:53 2026 +0100

    docs(phase5): record parity probe output

diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index d46f44b..4e1bf70 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -28,15 +28,26 @@ How to run probe:
 3) In the browser console, run:
    ```js
    runRefactorProbe()
    ```
 4) Paste the JSON output below.

 Baseline record:
 - baseline_commit: 3501049
 - captured_at_phase: phase1.1-baseline
 - capture_method: codex-mcp

 Baseline JSON output:
 ```json
 {"rendererInfo":{"memory":{"geometries":436,"textures":3},"render":{"calls":626,"triangles":22614,"lines":0,"points":0}},"sceneCounts":{"meshCount":631,"lineCount":6,"pointCount":0,"groupCount":206,"geometryCount":443,"materialCount":345},"blueprintCounts":{"beaches":0,"buildings":0,"coastlines":1,"pois":1,"roads":2,"sea":0,"transit":0,"zones":1},"sceneSignature":{"groups":[{"name":"bigBlueJ_building","childrenCount":3},{"name":"bigR_building","childrenCount":3},{"name":"BlueprintLabels","childrenCount":0},{"name":"BlueprintMeshes","childrenCount":4},{"name":"BlueprintOutlines","childrenCount":4},{"name":"BlueprintRoot","childrenCount":6},{"name":"BlueprintTraffic","childrenCount":0},{"name":"bridge","childrenCount":7},{"name":"coastB1_building","childrenCount":3},{"name":"coastB2_building","childrenCount":3},{"name":"coastQ1_building","childrenCount":4},{"name":"coastQ2_building","childrenCount":4},{"name":"colB1_building","childrenCount":3},{"name":"colCi_building","childrenCount":3},{"name":"colFf_building","childrenCount":1},{"name":"colQ_school_building","childrenCount":4},{"name":"colZC1_building","childrenCount":3},{"name":"eastH1_building","childrenCount":3},{"name":"eastH2_building","childrenCount":3},{"name":"eastM_building","childrenCount":1},{"name":"eastMA_building","childrenCount":3},{"name":"eastO_building","childrenCount":3},{"name":"eastR_building","childrenCount":3},{"name":"eastZC_tri_building","childrenCount":3},{"name":"eastZC2_building","childrenCount":3},{"name":"electric_building","childrenCount":3},{"name":"ferrisWheel","childrenCount":3},{"name":"hospB_building","childrenCount":3},{"name":"hospital_building","childrenCount":3},{"name":"hospR_building","childrenCount":3},{"name":"hospZC_tri_building","childrenCount":3},{"name":"hospZC1_building","childrenCount":3},{"name":"islandB1_building","childrenCount":3},{"name":"islandB2_building","childrenCount":3},{"name":"islandB3_building","childrenCount":3},{"name":"islandQ1_building","childrenCount":4},{"name":"islandQ2_building","childrenCount":4},{"name":"islandQ3_building","childrenCount":4},{"name":"islandZC_building","childrenCount":3},{"name":"MapOverlayGroup","childrenCount":10},{"name":"RoadCenterlines","childrenCount":0},{"name":"RoadOffsetDebug","childrenCount":0},{"name":"rubbish_building","childrenCount":1},{"name":"transport1_building","childrenCount":3},{"name":"transport2_building","childrenCount":3},{"name":"underRQ_building","childrenCount":4},{"name":"waterTreatment_building","childrenCount":3},{"name":"windmills","childrenCount":11}]},"overlayDrift":{"ok":true,"epsPx":0.05,"maxDriftPx":0,"samples":[{"px":700,"py":500,"dx":0,"dy":0},{"px":140,"py":100,"dx":0,"dy":0},{"px":1260,"py":900,"dx":0,"dy":0}]},"overlayPreviewGroups":{"BlueprintOutlines":{"childrenCount":4,"visible":false},"BlueprintMeshes":{"childrenCount":4,"visible":false},"BlueprintLabels":{"childrenCount":0,"visible":false},"RoadCenterlines":{"childrenCount":0,"visible":false},"RoadOffsetDebug":{"childrenCount":0,"visible":false}},"renderOrderSignature":{"min":0,"max":999,"unique":[0,997,999]},"renderLoopSignature":{"renderFps":{"realtime":60,"realtimeIdle":30,"idle":20,"idleNoAnim":8},"animationEnabled":false,"targetFpsByMode":{"plan":8,"3d":30,"street":30,"fidelity":8}},"viewModeSignature":{"plan":{"viewMode":"plan","overlayVisible":true,"editorVisible":false,"propsVisible":true,"fxVisible":true,"blueprintPropsVisible":false,"blueprintFxVisible":false},"3d":{"viewMode":"3d","overlayVisible":false,"editorVisible":false,"propsVisible":true,"fxVisible":true,"blueprintPropsVisible":false,"blueprintFxVisible":false},"street":{"viewMode":"street","overlayVisible":false,"editorVisible":false,"propsVisible":true,"fxVisible":true,"blueprintPropsVisible":false,"blueprintFxVisible":false},"fidelity":{"viewMode":"fidelity","overlayVisible":true,"editorVisible":false,"propsVisible":false,"fxVisible":false,"blueprintPropsVisible":false,"blueprintFxVisible":false}}}
 ```

## Phase 5 – Scene + Layer Ownership

Probe check (post-extraction):
- commit: d76cadc
- capture_method: codex-mcp

Probe JSON output:
```json
{"rendererInfo":{"memory":{"geometries":436,"textures":3},"render":{"calls":626,"triangles":22614,"lines":0,"points":0}},"sceneCounts":{"meshCount":631,"lineCount":6,"pointCount":0,"groupCount":206,"geometryCount":443,"materialCount":345},"blueprintCounts":{"beaches":0,"buildings":0,"coastlines":1,"pois":1,"roads":2,"sea":0,"transit":0,"zones":1},"sceneSignature":{"groups":[{"name":"bigBlueJ_building","childrenCount":3},{"name":"bigR_building","childrenCount":3},{"name":"BlueprintLabels","childrenCount":0},{"name":"BlueprintMeshes","childrenCount":4},{"name":"BlueprintOutlines","childrenCount":4},{"name":"BlueprintRoot","childrenCount":6},{"name":"BlueprintTraffic","childrenCount":0},{"name":"bridge","childrenCount":7},{"name":"coastB1_building","childrenCount":3},{"name":"coastB2_building","childrenCount":3},{"name":"coastQ1_building","childrenCount":4},{"name":"coastQ2_building","childrenCount":4},{"name":"colB1_building","childrenCount":3},{"name":"colCi_building","childrenCount":3},{"name":"colFf_building","childrenCount":1},{"name":"colQ_school_building","childrenCount":4},{"name":"colZC1_building","childrenCount":3},{"name":"eastH1_building","childrenCount":3},{"name":"eastH2_building","childrenCount":3},{"name":"eastM_building","childrenCount":1},{"name":"eastMA_building","childrenCount":3},{"name":"eastO_building","childrenCount":3},{"name":"eastR_building","childrenCount":3},{"name":"eastZC_tri_building","childrenCount":3},{"name":"eastZC2_building","childrenCount":3},{"name":"electric_building","childrenCount":3},{"name":"ferrisWheel","childrenCount":3},{"name":"hospB_building","childrenCount":3},{"name":"hospital_building","childrenCount":3},{"name":"hospR_building","childrenCount":3},{"name":"hospZC_tri_building","childrenCount":3},{"name":"hospZC1_building","childrenCount":3},{"name":"islandB1_building","childrenCount":3},{"name":"islandB2_building","childrenCount":3},{"name":"islandB3_building","childrenCount":3},{"name":"islandQ1_building","childrenCount":4},{"name":"islandQ2_building","childrenCount":4},{"name":"islandQ3_building","childrenCount":4},{"name":"islandZC_building","childrenCount":3},{"name":"MapOverlayGroup","childrenCount":10},{"name":"RoadCenterlines","childrenCount":0},{"name":"RoadOffsetDebug","childrenCount":0},{"name":"rubbish_building","childrenCount":1},{"name":"transport1_building","childrenCount":3},{"name":"transport2_building","childrenCount":3},{"name":"underRQ_building","childrenCount":4},{"name":"waterTreatment_building","childrenCount":3},{"name":"windmills","childrenCount":11}]},"overlayDrift":{"ok":true,"epsPx":0.05,"maxDriftPx":0,"samples":[{"px":700,"py":500,"dx":0,"dy":0},{"px":140,"py":100,"dx":0,"dy":0},{"px":1260,"py":900,"dx":0,"dy":0}]},"overlayPreviewGroups":{"BlueprintOutlines":{"childrenCount":4,"visible":false},"BlueprintMeshes":{"childrenCount":4,"visible":false},"BlueprintLabels":{"childrenCount":0,"visible":false},"RoadCenterlines":{"childrenCount":0,"visible":false},"RoadOffsetDebug":{"childrenCount":0,"visible":false}},"renderOrderSignature":{"min":0,"max":999,"unique":[0,997,999]},"renderLoopSignature":{"renderFps":{"realtime":60,"realtimeIdle":30,"idle":20,"idleNoAnim":8},"animationEnabled":false,"targetFpsByMode":{"plan":8,"3d":30,"street":30,"fidelity":8}},"viewModeSignature":{"plan":{"viewMode":"plan","overlayVisible":true,"editorVisible":false,"propsVisible":true,"fxVisible":true,"blueprintPropsVisible":false,"blueprintFxVisible":false},"3d":{"viewMode":"3d","overlayVisible":false,"editorVisible":false,"propsVisible":true,"fxVisible":true,"blueprintPropsVisible":false,"blueprintFxVisible":false},"street":{"viewMode":"street","overlayVisible":false,"editorVisible":false,"propsVisible":true,"fxVisible":true,"blueprintPropsVisible":false,"blueprintFxVisible":false},"fidelity":{"viewMode":"fidelity","overlayVisible":true,"editorVisible":false,"propsVisible":false,"fxVisible":false,"blueprintPropsVisible":false,"blueprintFxVisible":false}}}
```

## Guardrail greps

### refactorProbe gate
```
1085:    const probeEnabled = new URLSearchParams(location.search).has('refactorProbe');
1139:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

### import('./tools/refactorProbe.js')
```
1139:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

## Probe summary (Mode A, MCP)
- Server: existing http://localhost:8000 (port already in use; no new server started)
- Hash: 64c3a9de3f90e976d1c124ef09e56cf471feea5b1d91caa1bf66942ff483013d
- sceneCounts: { meshCount: 838, lineCount: 17, pointCount: 0, groupCount: 251, geometryCount: 530, materialCount: 437 }
- blueprintCounts: { beaches: 0, buildings: 6, coastlines: 0, pois: 0, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
- renderLoopSignature: { renderFps: { realtime: 60, realtimeIdle: 30, idle: 20, idleNoAnim: 8 }, animationEnabled: false, targetFpsByMode: { plan: 8, 3d: 30, street: 30, fidelity: 8 } }
- REFACTOR_LOG.md reference: Phase 5 – Scene + Layer Ownership

## Packet commit evidence (pre-commit)

### git diff --stat --cached
```
 docs/ai/review_packet_phase5_1.md | 134 ++++++++++++++++++++++++++++++++++++++
 1 file changed, 134 insertions(+)
```

### git diff --check --cached
```
```

## Carry-forward
- P0: Probe snapshot mismatch vs baseline (sceneCounts/blueprintCounts differ). Locator: hash 64c3a9de… from MCP probe in this packet. Acceptance: rerun probe on clean baseline state (no editor group, no blueprint traffic) and confirm counts match baseline.
- P1: None.
