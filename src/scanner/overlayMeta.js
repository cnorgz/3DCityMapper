export function buildOverlayMetaFromOverlay(overlay) {
  const overlayMeta = {};
  if (!overlay) return overlayMeta;

  if (overlay.imageId !== undefined && overlay.imageId !== null) {
    overlayMeta.imageId = overlay.imageId;
  }

  const normalizedWidth = overlay?.meta?.width ?? overlay?.width;
  const normalizedHeight = overlay?.meta?.height ?? overlay?.height;

  if (Number.isFinite(normalizedWidth)) {
    overlayMeta.normalizedWidth = normalizedWidth;
    overlayMeta.width = normalizedWidth;
  }

  if (Number.isFinite(normalizedHeight)) {
    overlayMeta.normalizedHeight = normalizedHeight;
    overlayMeta.height = normalizedHeight;
  }

  return overlayMeta;
}
