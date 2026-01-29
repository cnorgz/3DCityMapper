# Checklist / Progress

## ✅ Completed (Phases 1–5)
- [x] Overlay calibration + persistence (opacity/offset/rotation/scale + JSON import/export).
- [x] Fidelity Mode (top‑down, simplified shading).
- [x] Debug aids: grid, overlay bounds, blueprint outlines + labels.
- [x] Blueprint editor: polygons/POIs, selection, curves, snap (grid/pixels).
- [x] Undo/redo + editor controls modal.
- [x] Blueprint import/export + validation.
- [x] Blueprint‑driven city toggle.
- [x] Building height controls.

## 🔧 Phase 6 (Roads/Paths ribbon system)
- [x] Road/Path centerline storage in `blueprintData.roads[]`.
- [x] Ribbon mesh renderer (triangle strip).
- [x] Road dashes instanced + aligned with centerline.
- [x] Preview uses ribbon (not Line2).
- [x] Endpoint snapping.
- [x] Junction insert mode (single‑tap toggle; touch‑first).
- [x] Curve editing for roads in select mode (curve handles only).
- [x] 2‑way traffic prototype on ribbon centerlines (visual demo).
- [x] Traffic light tool for junctions (simple timed toggle).
- [ ] Ribbon join math is spike‑free at all angles (round‑join pivot).
- [ ] Junction interactions feel stable for hand‑drawn maps.

## ⏭ Phase 6.1+ Additions (current focus)
- [x] Road traffic demo (two‑way on offset centerlines, no lanes UI).
- [ ] Dead‑end handling (U‑turn / respawn).
- [ ] Smooth pathing on bends (simple spline) — deferred.
- [ ] Minor‑vs‑major yield rule (simple, non‑blocking).

## 🧭 Phase 6 Round‑Join Pivot (Option A)
- [x] Research + spec: rounded joins (no spikes at any angle).
- [ ] Implement round‑join rails (arc join, miter‑limit fallback if needed).
- [ ] Preview + final ribbon share the same round‑join generator.
- [ ] Debug: road offsets visual aid for join verification.
- [ ] Acceptance: no tapering/spikes at any turn angle.

## ⏳ Future Phases (paused but tracked)
- [ ] Phase 7: Land/sea pipeline (coastlines + sea polygons + beach band).
- [ ] Phase 8: Legend mapping + park rules (zones/buildings types, parks spawn).
- [ ] Phase 9: README + final import/export polish + schema summary.

## 🔧 New UI Tools (requested)
- [x] Map zoom slider for fine tracing (fidelity view only).
- [x] Point size slider for editor handles.
- [x] Map pan (mouse drag; two‑finger touch) when zoomed.

## Notes / Constraints
- Legacy car animation exists only for legacy roads; Phase 6 traffic will use blueprint roads.
- No one‑way lanes for now (keep 2‑way simple).
- Corner radius refinement for road turns is deferred (needs research).

## Housekeeping / Traceability
- Current branch: `phases6-traffic-uitools`.
- Bisect worktrees (for ribbon regression): `TADHG-bisect-c3d1`, `TADHG-bisect-d634`.
- Next planned branch: `phase6-round-joins` (after tag).
