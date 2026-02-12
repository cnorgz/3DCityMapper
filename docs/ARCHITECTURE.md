# 3DCityMapper Architecture (Minimum Docs)

## Purpose And Non-Goals
- Purpose: support parity-first refactor from `city-sim.html` into small modules without behavior drift.
- Purpose: keep extraction decisions reviewable via fixed evidence packets and deterministic diffs.
- Non-goal: redesign rendering, editor tools, scanner inference, or runtime UX in this docs phase.

## Entry Point And Serving
- Entry point remains `city-sim.html`.
- Run over HTTP for local testing (`python3 -m http.server 8000`).
- Probe URL convention: `http://localhost:8000/city-sim.html?refactorProbe=1`.

## Module Map (High Level)
- `src/core`: shared core contracts and model/state primitives.
- `src/render`: render-layer modules and scene orchestration.
- `src/editor`: editor controllers, history, rebuild scheduling, snapping, inputs.
- `src/scanner`: placeholder scanner pipeline modules (no real inference yet).
- `src/ui`: panel modules, panel manager, and UI event boundary.
- `src/config`: shared constants and scanner configuration.

## Probe And Parity Discipline
- Primary parity gate is tracked fields from `runRefactorProbe()`:
- `sceneCounts`
- `blueprintCounts`
- `overlayDrift` (must remain within `epsPx=0.05`)
- Hash can vary in some phases; field parity is the release gate unless a phase explicitly requires hash lock.

## Shared Materials Safety
- Shared material/geometry ownership must remain intact.
- `userData.shared === true` markers are treated as non-disposable shared assets.
- Refactor work should not introduce disposal changes that break shared ownership assumptions.

## Adding New Modules (Naming + Placement)
- Prefer feature-local placement under `src/<domain>/`.
- Name modules by role, not by phase (`*Controller`, `*Layer`, `*Panel`, `*Builder`).
- Keep imports explicit and avoid broad barrels unless already established.
- For phased extraction, keep thin wiring in `city-sim.html` and move logic into injected modules.
