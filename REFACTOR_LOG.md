# Refactor Log

## Phase 0 – Baseline

Checklist (from v6):
- Parity probe (mesh/line/point/group counts + blueprint feature counts)
- Overlay drift check log (no warnings at epsPx=0.05)
- Overlay preview group counts (BlueprintOutlines/BlueprintMeshes/BlueprintLabels/RoadCenterlines/RoadOffsetDebug)
- Renderer info snapshots (renderer.info.memory + renderer.info.render) before/after 5 rebuilds
- Scene tree signature (group names + child counts) for:
  - LAYERS.overlay
  - overlay-attached preview groups
  - blueprintRootGroup children
- RenderOrder signature for preview groups (min/max/unique renderOrder values)
- ViewMode signature (plan→3d→street→fidelity): overlay/editor gating + render throttle targets + props/fx visibility
- RenderLoop signature (RENDER_FPS table + target FPS per mode)
- LocalStorage keys report (see docs/LOCALSTORAGE_KEYS.md)

How to run probe:
1) Start a static server (example):
   ```bash
   python3 -m http.server 8000
   ```
2) Open the app with probe enabled:
   ```
   http://localhost:8000/city-sim.html?refactorProbe=1
   ```
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

## Phase 5.2 – Probe hygiene verification

Probe check (clean state, no UI actions):
- capture_method: xav-manual
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_sha256: 2526c68e85ea72655154e08d692db9d3d0c46de7b5edf812091f674f74b6fa0b
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }

## Phase 6a – MaterialLibrary

Probe check (post-extraction):
- capture_method: codex-mcp
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_sha256: 2526c68e85ea72655154e08d692db9d3d0c46de7b5edf812091f674f74b6fa0b
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
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

## Phase 6c – ZoneLayer

- branch: refactor/phase6c-zone-layer
- base_commit: f4f5e91
- phase_end_commit: 2b051a4

Probe check (post-extraction):
- capture_method: codex-mcp
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_sha256: 2526c68e85ea72655154e08d692db9d3d0c46de7b5edf812091f674f74b6fa0b
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
