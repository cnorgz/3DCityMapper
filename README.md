# TADHG City Simulator

Web-based 3D city viewer/editor with a Fidelity Mode workflow for tracing a 2D map and generating 3D geometry from a single JSON blueprint.

## Run
- Serve the repo from a local web server (module imports require HTTP).
- Open `city-sim.html`.

## Overlay Calibration
- Use the Map Overlay panel to adjust Offset X/Z, Rotation (degrees), and Scale (uniform).
- Hold Shift for fine steps.
- Calibration persists in localStorage; Export/Import uses a JSON blob.

## Coordinate Contract
- Image pixels: `(px, py)` with `(0,0)` at top-left, `px` right, `py` down.
- World plane: `(x, z)` with `(0,0)` at map center, `+x` right, `+z` down.
- `MapCoordMapper` is the single source of truth; overlay calibration is applied to:
  - the overlay mesh transform
  - world <-> px conversions
  - Fidelity Mode editor hit-tests and export

## Blueprint Format (world coords)
All polygon points are `[x, z]` in world units (centered map).

```json
{
  "meta": { "version": 1, "units": "world", "origin": "center" },
  "coastlines": [{ "id": "mainland", "polygon": [[0,0],[10,0],[10,10]] }],
  "beaches": [{ "id": "beach-1", "polygon": [[0,0],[10,0],[10,10]] }],
  "sea": [{ "id": "sea-1", "polygon": [[-700,-500],[700,-500],[700,500],[-700,500]] }],
  "roads": [{ "id": "road-1", "polygon": [[0,0],[10,0],[10,2]] }],
  "zones": [{ "id": "zone-1", "typeCode": "Q", "polygon": [[0,0],[10,0],[10,10]] }],
  "buildings": [{ "id": "bldg-1", "typeCode": "B", "polygon": [[0,0],[4,0],[4,4]] }],
  "pois": [{ "id": "poi-1", "type": "METRO_STATION", "position": [0,0] }]
}
```

Optional fields:
- `curves`: array of vertex indices for quadratic curve control points.
- `roads[].polyline`: array of points for centerline roads (optional `width`).

Supported `typeCode` values:
`Q, B, ZC, J, H, R, PO, PK, MA, H★, S, T, D, Ci, ff, P, ⚡, 💧`

## Fidelity Mode Editor
- Switch to Fidelity Mode, enable the Editor.
- Draw Polygon tool: click to place points, Enter to close, Esc to cancel.
- Select tool: move vertices, delete vertices, or delete polygons.
- Add POI tool: places a point marker.
- Snap options: grid or pixel snapping (off by default).
- Use "Use Blueprint for City" to render the blueprint-driven city.

