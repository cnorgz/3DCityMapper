# Refactor Log

## Phase 0 – Baseline

Checklist (from v6):
- Parity probe (mesh counts + vertex counts + blueprint feature counts)
- Seeded RNG baseline (default seed 123456): stable counts for trees/props/lit windows
- Overlay drift check log (no warnings at epsPx=0.05)
- Overlay preview group counts (BlueprintOutlines/BlueprintMeshes/BlueprintLabels/RoadCenterlines/RoadOffsetDebug)
- Renderer info snapshots (renderer.info.memory + renderer.info.render) before/after 5 rebuilds
- Scene tree signature (group names + child counts) for:
  - LAYERS.overlay
  - overlay-attached preview groups
  - blueprintRootGroup children
- RenderOrder signature for preview groups (min/max/unique renderOrder values)
- ViewMode signature (plan→3d→street→fidelity): overlay/editor gating + render throttle targets + props/fx visibility

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

Baseline JSON output (paste here):
```json
{
  "TODO": "paste runRefactorProbe() output here"
}
```
