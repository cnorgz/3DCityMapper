# Blueprint Spec (Phase 3)

This is a minimal schema reference for the current blueprint JSON format. It reflects the existing `src/mapBlueprint.json` and the current runtime expectations in `city-sim.html`.

## Top-level keys

- `meta` (object, optional)
- `coastlines` (array of polygon features)
- `beaches` (array of polygon features, optional)
- `sea` (array of polygon features, optional)
- `roads` (array of polygon OR polyline features)
- `zones` (array of polygon features)
- `buildings` (array of polygon features)
- `pois` (array of point features)
- `transit` (legacy; array of line features that are merged into `roads` during normalization)

## Feature shapes

### Polygon feature

```
{
  "id": "optional-string",
  "polygon": [[x, z], [x, z], [x, z], ...],
  "curves": [index, ...] // optional, indices into polygon
}
```

### Polyline feature (roads/transit)

```
{
  "id": "optional-string",
  "polyline": [[x, z], [x, z], ...],
  "kind": "ROAD_MAJOR" | "ROAD_MINOR" | "PATH" | "METRO" | "TRAIN" | "HYPERLOOP" | ...,
  "width": 18, // optional
  "curves": [index, ...] // optional, indices into polyline
}
```

### Zone / Building feature

```
{
  "id": "optional-string",
  "typeCode": "Q" | "B" | "ZC" | "J" | "H" | ...,
  "polygon": [[x, z], [x, z], [x, z], ...],
  "curves": [index, ...] // optional
}
```

### POI feature

```
{
  "id": "optional-string",
  "type": "METRO" | "PORT" | "ECOLE" | ...,
  "position": [x, z]
}
```

## Blank blueprint

A “blank” blueprint is created by normalizing an empty object `{}` via the same normalize routine used at runtime. Missing top-level arrays are filled with empty arrays. This keeps the editor functional even before a file is loaded.

## Notes

- `transit[]` is legacy; during normalization, any entries are merged into `roads[]` and `transit` is cleared.
- Curve indices are stored but expanded at render time. Their interpretation is consistent with current runtime behavior; no schema redesign is introduced in Phase 3.
- The future scanner will output this same schema; do not change keys during refactor without a migration plan.
