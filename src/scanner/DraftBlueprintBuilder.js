/**
 * Placeholder draft builder for scanner pipeline.
 * Future phases can add legend/image inference while keeping this API stable.
 */
export function buildDraftBlueprint({ overlayImage, legendRules, overlayMeta, createBlankBlueprint } = {}) {
  void overlayImage;
  void legendRules;
  void overlayMeta;
  if (typeof createBlankBlueprint !== 'function') {
    throw new Error('createBlankBlueprint-missing');
  }
  return createBlankBlueprint();
}
