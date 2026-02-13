# Scanner Decisions (Canon v0)

## Scope
This document resolves the deferred scanner questions from v7_rev4 Section 10 at specification level only.
No scanner inference code is implemented by this document.

## Legend Canon v0

| Feature | Color (Hex) | Symbol / Marker | Notes |
|---|---|---|---|
| Roads | `#2B2B2B` | Solid polyline | Primary extraction target for MVP Tier 0. |
| Transit | `#5A2CA0` | Parallel dashed polyline | Kept distinct from roads in legend, normalized into supported blueprint representation later. |
| Coastlines | `#F4E17A` | Boundary stroke | Defines land/sea edge; used in Tier 1. |
| Sea / Water | `#2E9AE6` | Filled polygon | Includes sea and major water bodies; Tier 1 candidate. |
| Zones | `#E64A3C` | Filled polygon with type code | Uses typeCode mapping in existing blueprint schema. |
| Buildings | `#B5B5B5` | Filled polygon with outline | Tier 2, geometry quality gated by confidence. |
| POIs | `#F2992E` | Point marker glyph | Kept as sparse point set in MVP. |
| Beaches / Parks / Greenspace | `#79C55B` | Filled polygon, optional hatch | Grouped as environmental polygons in scanner outputs. |

Canon status:
- Canon v0 is provisional and may change after implementation feedback.
- In current codebase, scanner is still placeholder-only.

## Label Strategy (OCR vs Symbol Markers)

Recommended MVP default:
- Prefer symbol markers and type-code glyph matching first.
- Defer OCR to post-MVP unless a symbol-free source is explicitly targeted.

Rationale:
- Symbol matching is more deterministic with current map style.
- OCR increases noise and language/layout variance in early phases.

Failure modes and mitigation (spec-level):
- Ambiguous symbol classes: mark low-confidence feature as unresolved candidate.
- Missing marker in legend: emit warning + leave feature unclassified.
- OCR hallucination (future): require confidence threshold and fallback to symbol-only mode.

## MVP Scan Scope (Tiered)

### Tier 0 — Roads-only
- Expected DraftBlueprint fields touched: `roads`
- Expected empty fields: `zones`, `buildings`, `pois`, `beaches`, `sea`, `coastlines`, `transit`

### Tier 1 — Roads + Water/Coastline
- Expected DraftBlueprint fields touched: `roads`, `coastlines`, `sea` (and/or `beaches` when identified)
- Expected empty fields: `zones`, `buildings`, `pois`, `transit`

### Tier 2 — Zones / Buildings / POIs
- Expected DraftBlueprint fields touched: `roads`, `coastlines`, `sea`, `zones`, `buildings`, `pois` (plus optional `beaches`)
- `transit` remains optional and may be normalized via existing pipeline rules.

## Implications (Docs-level)

DraftBlueprint / BlueprintModel:
- DraftBlueprint output must stay schema-compatible with existing blueprint normalization/validation path.
- Tiered scan output should only populate fields covered by the selected tier.

OverlayMeta required fields for placement correctness:
- `imageId`
- `normalizedWidth`, `normalizedHeight`
- `originalWidth`, `originalHeight` (when available)
- `scaleX`, `scaleY` (when available)
- `maxEdgePx` (when available)

## Not Implemented Yet
- Real image segmentation, OCR extraction, or symbol classifier runtime logic.
- Confidence scoring, active learning, and operator review tooling.
- This is a decisions/spec document only.
