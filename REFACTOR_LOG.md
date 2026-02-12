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

## Phase 6d – Probe hash policy (triage)

- capture_method: codex-mcp
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- full_sha256: c7bd5ec46ec368b72220071bedb9bc07fa29edcb66992c8701fe9ca14069c2ab
- gate_sha256: 9e81fb032829d9398f8c3b61eb83027c56b3aee9f026cbdf6a5a6241d206a3c5
- gate_fields: [sceneCounts, blueprintCounts, overlayDrift]
- volatile_top_level_keys: []
- note: full hash may vary; decision uses gate hash; counts matched baseline

## Phase 6d – RoadLayer + RoadGenerator

- branch: refactor/phase6d-road-layer-triage2
- phase_end_commit: 5ee91fd
- capture_method: codex-mcp (readiness gated)
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_sha256: bbdb4df5a7f643db3dc66c09b8fba081f8c0efea33b134491d6ac94a0029374a
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }

## Phase 6e – BuildingLayer + BuildingGenerator

- branch: refactor/phase6e-building-layer
- capture_method: codex-mcp (readiness gated)
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_len: 3978
- json_sha256: bbdb4df5a7f643db3dc66c09b8fba081f8c0efea33b134491d6ac94a0029374a
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }

## Phase 6f – PropsLayer + DebugLayer

- branch: refactor/phase6f-props-debug
- capture_method: codex-mcp (readiness gated)
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_len: 3978
- json_sha256: bbdb4df5a7f643db3dc66c09b8fba081f8c0efea33b134491d6ac94a0029374a
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }

## Phase 6g – CityRenderer orchestrator

- branch: refactor/phase6g-city-renderer
- capture_method: codex-mcp (readiness gated)
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_len: 3978
- json_sha256: bbdb4df5a7f643db3dc66c09b8fba081f8c0efea33b134491d6ac94a0029374a
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }

## Phase 7a – Editor RebuildScheduler extraction

- branch: refactor/phase7a-editor-rebuild-scheduler
- base_commit: 23e77ed
- phase_end_commit: 4f1afa4
- capture_method: codex-mcp (readiness gated)
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_len: 3977
- json_sha256: f88283c8083d6fbb6c5c2ebbb381c8be963e6c86c44c5188288865ea6288d188
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
- rendererInfo: { memory: { geometries: 434, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }

## Phase 7b – Editor HistoryManager extraction

- branch: refactor/phase7b-editor-history-manager
- base_commit: 5961cf5
- phase_end_commit: a028b0e
- capture_method: codex-mcp (readiness gated)
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_len: 3977
- json_sha256: f88283c8083d6fbb6c5c2ebbb381c8be963e6c86c44c5188288865ea6288d188
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
- rendererInfo: { memory: { geometries: 434, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }

## Phase 7c – Editor SnapEngine extraction

- branch: refactor/phase7c-editor-snap-engine
- base_commit: 483707c
- phase_end_commit: 957d3ea
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
- packet_commit: c920af7
- capture_method: codex-mcp (readiness gated)
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_len: 3978
- json_sha256: c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
- rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }

## Phase 7e – Editor InputRouter + HitTest + Gestures extraction

- branch: refactor/phase7e-input-router-hit-test-gestures
- base_commit: c920af7
- phase_end_commit: e857692
- packet_commit: 03cb9a0
- capture_method: codex-mcp (readiness gated)
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_len: 3978
- json_sha256: c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
- rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }

## Phase 8 – TrafficSystem extraction

- branch: refactor/phase8-traffic-system
- base_commit: 84bc767
- phase_end_commit: aa5b414
- packet_commit: 4810ada
- capture_method: codex-mcp (readiness gated)
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_len: 3977
- json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
- rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }

## Phase 9a – UI PanelManager + TrafficPanel extraction

- branch: refactor/phase9a-ui-panelmanager-traffic-panel
- base_commit: 83a3967
- phase_end_commit: 3abe2cc
- packet_commit: 3982699
- capture_method: codex-mcp (readiness gated)
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_len: 3977
- json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
- rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }

## Phase 9b – UI EventBus strict mode + traffic routed

- branch: refactor/phase9b-ui-eventbus-strict
- base_commit: 3982699
- phase_end_commit: ee3b220
- packet_commit: 245035e
- capture_method: codex-mcp (readiness gated)
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_len: 3977
- json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }

## Phase 9c – UI BlueprintPreviewPanel extraction

- branch: refactor/phase9c-ui-blueprint-preview-panel
- base_commit: e415781
- phase_end_commit: bdd2d4f
- packet_commit: 1f1578d
- capture_method: codex-mcp (readiness gated)
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_len: 3977
- json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
- rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }

## Phase 9d – UI BlueprintPreview wiring dedupe

- branch: refactor/phase9d-ui-blueprint-preview-dedup
- base_commit: caf72fc
- phase_end_commit: ae12eaa
- packet_commit: 37df0dc
- capture_method: codex-mcp (readiness gated)
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_len: 3977
- json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
- rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }

## Phase 9e – UI DevMode switch + strict EventBus gating

- branch: refactor/phase9e-ui-dev-mode-switch
- base_commit: 324f0b6
- phase_end_commit: e07ae40
- packet_commit: 58f38a5
- capture_method: codex-mcp (readiness gated)
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_len: 3977
- json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
- rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }

## Phase 9f – UI ZoneInfoPanel extraction

- branch: refactor/phase9f-ui-zone-info-panel
- base_commit: cc9f741
- phase_end_commit: 2969992
- packet_commit: 9b4bace
- capture_method: codex-mcp (readiness gated)
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_len: 3977
- json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
- rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }

## Phase 9g – UI DevHUD panel (dev-only)

- branch: refactor/phase9g-ui-devhud-panel
- base_commit: 6883132
- phase_end_commit: f7f8d20
- packet_commit: 3e36260
- capture_method: codex-mcp (readiness gated)
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_len: 3978
- json_sha256: c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
- rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }

## Phase 10a – CityModeController skeleton + minimal wiring

- branch: refactor/phase10a-city-mode-controller
- base_commit: b22284c
- phase_end_commit: bbbae5e
- packet_commit: d233ca9
- capture_method: codex-mcp (readiness gated)
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_len: 3977
- json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }

## Phase 10b – ExampleCityEntry extraction + CityModeController move

- branch: refactor/phase10b-example-city-entry
- base_commit: d233ca9
- phase_end_commit: 6540d5b
- packet_commit: cf6ed56
- capture_method: codex-mcp (readiness gated)
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_len: 3977
- json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }

## Phase 11a – Scanner scaffolding placeholder

- branch: refactor/phase11a-scanner-scaffolding
- base_commit: 8db8050
- phase_end_commit: 31b75b4
- packet_commit: fc79b21
- capture_method: codex-mcp (readiness gated)
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_len: 3977
- json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }

## Phase 11b – Scanner validate+normalize placeholder pipeline

- branch: refactor/phase11b-scanner-validate-normalize
- base_commit: f125309
- phase_end_commit: d2ff787
- packet_commit: 657d5da
- capture_method: codex-mcp (readiness gated)
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_len: 3978
- json_sha256: c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
- parity_decision: PASS (tracked fields sceneCounts + blueprintCounts + overlayDrift match baseline; hash variance accepted per v7 triage)

## Phase 11c – Scanner draft normalization hardening

- branch: refactor/phase11c-scanner-normalize-safety
- base_commit: 3601fcd
- phase_end_commit: f5ba1bd
- packet_commit: a7b9b64
- capture_method: codex-mcp (readiness gated)
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_len: 3977
- json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
- parity_decision: PASS (tracked fields unchanged and hash matches baseline snapshot)

## Phase 11d – Scanner draft pipeline orchestration

- branch: refactor/phase11d-scanner-draft-pipeline
- base_commit: 8e9efd9
- phase_end_commit: 041e143
- packet_commit: 0a9750b
- capture_method: codex-mcp (readiness gated)
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_len: 3977
- json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
- rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }
- parity_decision: PASS (tracked fields match baseline; hash matches baseline snapshot)

## Phase 11e – Legend rules move to config with scanner shim

- branch: refactor/phase11e-legendrules-to-config
- base_commit: cb56281
- phase_end_commit: 08dba45
- packet_commit: b029371
- capture_method: codex-mcp (readiness gated)
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_len: 3978
- json_sha256: c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
- parity_decision: PASS (tracked fields unchanged and hash matches baseline snapshot)

## Phase 11f – DraftBlueprintBuilder placeholder module

- branch: refactor/phase11f-draft-blueprint-builder
- base_commit: b029371
- phase_end_commit: 0a201ba
- packet_commit: 53c2bbc
- capture_method: codex-mcp (readiness gated)
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_len: 3978
- json_sha256: c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
- parity_decision: PASS (tracked fields unchanged and hash matches baseline snapshot)

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

## Phase 11h – ImageSource normalization to maxEdge=2048

- branch: refactor/phase11h-image-source-normalize-2048
- base_commit: edc47d8
- phase_end_commit: 0afa0d9
- packet_commit: aa6b8a3
- capture_method: codex-mcp (readiness gated)
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_len: 3977
- json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
- rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }
- parity_decision: PASS (tracked fields unchanged and hash matches baseline snapshot)

## Phase 11i – Stable imageId + calibration keying

- branch: refactor/phase11i-imageid-calib-keying
- base_commit: aa6b8a3
- phase_end_commit: f2bd6da
- packet_commit: 43ed3f5
- capture_method: codex-mcp (readiness gated)
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_len: 3978
- json_sha256: c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
- rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }
- parity_decision: PASS (tracked fields unchanged; hash variance accepted per v7 triage)

## Phase 11j – Scanner pipeline consumes normalized image meta

- branch: refactor/phase11j-scanner-consume-normalized-meta
- base_commit: 43ed3f5
- phase_end_commit: cb658e6
- packet_commit: 1772722
- capture_method: codex-mcp (readiness gated)
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_len: 3978
- json_sha256: c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
- rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }
- parity_decision: PASS (tracked fields unchanged and hash matches current baseline snapshot)

## Phase 11k – Extract overlayMeta assembly helper

- branch: refactor/phase11k-scanner-overlaymeta-helper
- base_commit: 6be26fb
- phase_end_commit: 636d43f
- packet_commit: d3ca2bf
- capture_method: codex-mcp (readiness gated)
- url: http://localhost:8000/city-sim.html?refactorProbe=1
- json_len: 3977
- json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
- rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }
- parity_decision: PASS (tracked fields unchanged and hash matches current baseline snapshot)

## Phase 11l – overlayMeta helper includes optional original dims/max edge

- branch: refactor/phase11l-overlaymeta-maxedge-originaldims
- base_commit: 67162f5
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
- parity_decision: PASS (tracked fields unchanged and hash matches current baseline snapshot)
