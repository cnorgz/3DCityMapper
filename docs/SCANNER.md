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

## Key Modules (Names Only)
- `src/scanner/ScannerController.js`
- `src/scanner/ImageSource.js`
- `src/scanner/DraftBlueprintBuilder.js`
- `src/config/legendRules.js` (and scanner compatibility re-export path)

## Deferred Items (Not Built Yet)
- Legend extraction from uploaded map legend images.
- OCR/classification for labels and symbols.
- Real road/zone/building inference from raster inputs.
- Confidence scoring and human-in-the-loop correction pipeline.
