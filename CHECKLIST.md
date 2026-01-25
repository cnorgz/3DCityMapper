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
- [x] Endpoint snapping + junction insert on edge.
- [x] Road editing UX polish (junction mode + curve mode flow).
- [x] 2‑way traffic prototype on ribbon centerlines (visual demo).
- [ ] Minor‑vs‑major yield rule (simple, non‑blocking).
- [x] Traffic light tool for junctions (simple timed toggle).
- [ ] Editor junction interactions feel stable for hand‑drawn maps.

## ⏭ Phase 6.1+ Additions (current focus)
- [x] Road traffic demo (two‑way on offset centerlines, no lanes UI).
- [ ] Dead‑end handling (U‑turn / respawn).
- [ ] Smooth pathing on bends (simple spline) — deferred.
- [x] Junction selection + orange “junction mode” (double‑click).
- [x] Curve editing for roads in select mode (curve handles only).
- [x] Tool UX: draw → junction → draw without mode switching.
- [x] Traffic light placement on junction points (simple cycle).

## ⏳ Future Phases (paused)
- [ ] Phase 7: Land/sea pipeline.
- [ ] Phase 8: Legend mapping + park rules.
- [ ] Phase 9: README + final import/export polish.

## 🔧 New UI Tools (requested)
- [x] Map zoom slider for fine tracing (fidelity view only).
- [x] Point size slider for editor handles.
- [x] Map pan (mouse drag; two‑finger touch) when zoomed.

## Notes / Constraints
- Legacy car animation exists only for legacy roads; Phase 6 traffic will use blueprint roads.
- No one‑way lanes for now (keep 2‑way simple).
- Corner radius refinement for road turns is deferred (needs research).
