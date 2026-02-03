# Persistence (Phase 2)

## Namespace
All new keys use the prefix:
- `3dcm:v1:`

## Placeholder imageId
Overlay calibration is stored under:
- `3dcm:v1:overlayCalib:demo`

`demo` is a temporary placeholder until Phase 4 introduces image identity. This must be revisited when image sources are modeled.

## Migration table
Legacy keys are migrated once at boot (idempotent):

| Legacy key | New key |
| --- | --- |
| `tadhgCityOverlayCalib` | `3dcm:v1:overlayCalib:demo` |
| `tadhgOverlayPanelCollapsed` | `3dcm:v1:ui.overlayPanelCollapsed` |

Migration rules:
- If the new key exists, legacy is ignored.
- If legacy exists and new missing, legacy is copied into the new key.
- Legacy keys are not removed (safe, reversible).

## Opt-in persisted settings (write on user change only)
- `3dcm:v1:editor.snapGrid`
- `3dcm:v1:editor.snapPixels`
- `3dcm:v1:editor.pixelStep`
- `3dcm:v1:traffic.maxCars`
- `3dcm:v1:traffic.speedScale`
- `3dcm:v1:blueprint.opacity`
- `3dcm:v1:blueprint.showLabels`

Defaults remain unchanged when keys are absent.

## Storage implementation
All localStorage access is centralized in:
- `src/persistence/StateStore.js`
- `src/persistence/Migrations.js`
