# 3DCityMapper Scanner (Placeholder Pipeline)

## Current State
- Scanner is placeholder-only in current refactor phases.
- No production legend/image inference is implemented yet.
- Behavior is intentionally conservative to preserve parity during extraction.

## Inputs (Conceptual)
- Overlay image source and normalized overlay metadata.
- Legend-rules concept for future classification stages.
- Scanner entry action is user-triggered; no automatic scan on probe boot path.

## Outputs
- DraftBlueprint JSON through existing blueprint model pathways.
- Structured result status (`ok`, `reason`, `errors` when available).
- Overlay provenance threading (`overlayMeta`) for downstream diagnostics and calibration continuity.

## OverlayMeta (Current Fields)
- `imageId`: stable identity string for the currently loaded overlay image source (if available).
- `normalizedWidth` / `normalizedHeight`: normalized dimensions used by scanner/mapping.
- `width` / `height`: compatibility aliases for normalized dimensions.
- `originalWidth` / `originalHeight`: original imported image dimensions when present.
- `maxEdgePx`: normalization max-edge constraint when present in source metadata.
- `scaleX` / `scaleY`: normalized-to-original scale ratios when both dimensions are finite and positive.

## Key Modules (Names Only)
- `src/scanner/ScannerController.js`
- `src/scanner/ImageSource.js`
- `src/scanner/DraftBlueprintBuilder.js`
- `src/config/legendRules.js` (and scanner compatibility re-export path)

## Decisions
- Scanner decisions/spec baseline: `docs/SCANNER_DECISIONS.md`
- This decisions doc resolves deferred legend/label/scope questions without changing runtime behavior.

## Deferred Items (Not Built Yet)
- Legend extraction from uploaded map legend images.
- OCR/classification for labels and symbols.
- Real road/zone/building inference from raster inputs.
- Confidence scoring and human-in-the-loop correction pipeline.
