# Dev Debug: Refactor Probe

## Enable the probe
- Add the URL param: `?refactorProbe=1`
- Example: `http://localhost:8000/city-sim.html?refactorProbe=1`

## Run the probe
Open the browser console and call:
```js
runRefactorProbe()
```
It returns a JSON object and also logs it to the console.

## What it outputs (stable JSON)
The probe JSON includes (best-effort, stable keys/ordering):
- `rendererInfo`: safe subset of `renderer.info`
- `sceneSignature`: stable group/name/child counts
- `blueprintCounts`: per-section counts from blueprint data
- `overlayDrift`: drift check summary (epsPx=0.05)
- `overlayPreviewGroups`: counts/visibility for overlay-attached preview groups
- `renderOrderSignature`: min/max/unique renderOrder values for preview groups
- `renderLoopSignature`: mode-based FPS/throttle values or table
- `viewModeSignature`: plan/3d/street/fidelity gating + render throttle

## Rule
The probe must be **fully gated** by `refactorProbe=1` and must not emit logs or change behavior when the param is absent.
