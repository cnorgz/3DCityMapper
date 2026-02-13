# 3DCityMapper Coordinates (Minimum Docs)

## Coordinate Spaces Glossary
- Screen pixels: browser-space UI coordinates (canvas and DOM events).
- Normalized image space: uploaded overlay after normalization (bounded by import max edge).
- World units: map/local coordinates used by geometry, rendering, and editor actions.

## Overlay Meta Fields
- Normalized dimensions used by mapping/probe:
- `normalizedWidth`, `normalizedHeight`
- Original import dimensions when available:
- `originalWidth`, `originalHeight`
- Optional scale fields when available:
- `scaleX`, `scaleY`
- Compatibility aliases can include `width`/`height` when they represent normalized dimensions.

## Drift Definition
- Drift gate uses `overlayDrift` from probe output.
- `epsPx=0.05` is the accepted error threshold.
- `maxDriftPx` is the maximum measured pixel drift across sampled points.
- Parity pass requires `overlayDrift.ok === true` and tracked counts to remain unchanged.

## Mapping Intent (Conceptual)
- Overlay calibration maps normalized image coordinates to world/map coordinates.
- Probe checks that runtime mapping remains consistent after refactor extraction.
- This document defines contracts and terms only; it does not promise specific implementation internals.
- See `docs/SCANNER.md` for current OverlayMeta fields used to carry normalized/original image dimensions into scanner plumbing.
- See `docs/SCANNER_DECISIONS.md` for scanner-tier decisions that depend on normalized overlay coordinates.
