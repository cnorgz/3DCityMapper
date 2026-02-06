import { overlayLocalToPixel, pixelToOverlayLocal } from '../core/CoordinateMapper.js';

export function createEditorSnapEngine(deps) {
  const {
    editorState,
    getMapCoordMapper,
    GRID_STEP_X,
    GRID_STEP_Z
  } = deps;

  function snapMapPoint(point) {
    let x = point.x;
    let z = point.z;

    if (editorState.snapGrid) {
      x = Math.round(x / GRID_STEP_X) * GRID_STEP_X;
      z = Math.round(z / GRID_STEP_Z) * GRID_STEP_Z;
    }

    const mapper = getMapCoordMapper();
    if (editorState.snapPixels && mapper) {
      const px = overlayLocalToPixel({ x, z }, mapper);
      const step = Math.max(1, editorState.pixelStep);
      const snappedPx = {
        px: Math.round(px.px / step) * step,
        py: Math.round(px.py / step) * step
      };
      const snapped = pixelToOverlayLocal(snappedPx.px, snappedPx.py, mapper);
      if (snapped) {
        x = snapped.x;
        z = snapped.z;
      }
    }

    return { x, z };
  }

  return { snapMapPoint };
}
