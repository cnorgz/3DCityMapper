# Fidelity Checklist

## Overlay + workflow
- [ ] Overlay plane anchored with +X east and +Z north; north indicator matches map.
- [ ] Calibration controls: numeric inputs, shift fine step, uniform scale, degrees.
- [ ] Calibration persistence via localStorage + import/export JSON.
- [ ] Debug aids: grid, overlay bounds, blueprint outline markers.
- [ ] Fidelity Mode: locked top-down view, simplified shading.

## Blueprint pipeline
- [ ] `src/mapBlueprint.json` schema for coastline, roads, zones, and POI.
- [ ] Renderer generates meshes from blueprint (no manual meshes).
- [ ] Minimal editor: polygon + POI tools, type dropdown, optional grid snap.

## Fidelity data
- [ ] Coastline polygons (mainland + island) + water plane.
- [ ] Roads as polygons or center lines with widths.
- [ ] Buildings/zones polygons with type codes.
- [ ] Parks spawn props inside polygons only.
- [ ] Legend codes normalized to stable IDs.

## Acceptance
- [ ] Overlay does not stretch; uniform scale only.
- [ ] Calibration persists after refresh + import/export.
- [ ] Fidelity Mode enables alignment.
- [ ] Coastline can match map by editing blueprint.
- [ ] Buildings/roads generated from blueprint.
- [ ] Parks keep vegetation off roads.

## Notes
- [ ] 
