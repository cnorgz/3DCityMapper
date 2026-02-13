# 3DCityMapper Contracts (Cheat Sheet)

## Entry Point Contract
- Application entry remains `city-sim.html`.
- Local runs are served over HTTP (not `file://`).

## Parity Contract
- Refactor gates track:
- `sceneCounts`
- `blueprintCounts`
- `overlayDrift` with `epsPx=0.05`
- Docs-only phases do not run probe unless explicitly requested.

## Shared Materials Contract
- Shared render assets marked `userData.shared = true` are treated as non-disposable shared ownership.
- Refactor extraction should not break shared material safety assumptions.

## Scanner Contract
- Scanner pipeline remains placeholder-only in current phases.
- No real legend/image inference is implied by docs scaffolding entries.
