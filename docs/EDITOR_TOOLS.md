# 3DCityMapper Editor Tools (Minimum Docs)

## Intended Future Tools (Placeholder List)
- Selection and inspection tools.
- Move/adjust operations for placed entities.
- Zone painting/editing tools.
- Road/path editing helpers.
- POI placement and editing.

## Current Non-Goals
- Full editor tool implementation is not part of current scanner/docs closure phases.
- No behavior redesign is performed in these placeholder docs phases.

## Why Parity/Probe Gates Matter
- Refactor work is staged behind probe-based parity checks.
- Existing behavior remains stable while tool modules are extracted and documented incrementally.
- `overlayDrift` threshold remains `epsPx=0.05` as a guardrail during refactor progression.
