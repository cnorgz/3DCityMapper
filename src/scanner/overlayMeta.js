/**
 * Builds scanner/overlay metadata from the active overlay image source.
 * Keeps compatibility aliases (width/height) while exposing normalized
 * dimensions and optional original import constraints when available.
 */
export function buildOverlayMetaFromOverlay(overlay) {
  const overlayMeta = {};
  if (!overlay) return overlayMeta;

  if (overlay.imageId !== undefined && overlay.imageId !== null) {
    overlayMeta.imageId = overlay.imageId;
  }

  const normalizedWidth = overlay?.meta?.width ?? overlay?.width;
  const normalizedHeight = overlay?.meta?.height ?? overlay?.height;
  const originalWidth = overlay?.meta?.originalWidth;
  const originalHeight = overlay?.meta?.originalHeight;
  const maxEdgePx = overlay?.meta?.maxEdgePx;

  if (Number.isFinite(normalizedWidth)) {
    overlayMeta.normalizedWidth = normalizedWidth;
    overlayMeta.width = normalizedWidth;
  }

  if (Number.isFinite(normalizedHeight)) {
    overlayMeta.normalizedHeight = normalizedHeight;
    overlayMeta.height = normalizedHeight;
  }

  if (Number.isFinite(originalWidth)) {
    overlayMeta.originalWidth = originalWidth;
  }

  if (Number.isFinite(originalHeight)) {
    overlayMeta.originalHeight = originalHeight;
  }

  if (Number.isFinite(maxEdgePx)) {
    overlayMeta.maxEdgePx = maxEdgePx;
  }

  if (
    Number.isFinite(normalizedWidth) &&
    Number.isFinite(originalWidth) &&
    normalizedWidth > 0 &&
    originalWidth > 0
  ) {
    overlayMeta.scaleX = normalizedWidth / originalWidth;
  }

  if (
    Number.isFinite(normalizedHeight) &&
    Number.isFinite(originalHeight) &&
    normalizedHeight > 0 &&
    originalHeight > 0
  ) {
    overlayMeta.scaleY = normalizedHeight / originalHeight;
  }

  return overlayMeta;
}
