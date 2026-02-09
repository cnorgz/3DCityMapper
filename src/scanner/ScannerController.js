export function createScannerController({
  getOverlayImage = () => null,
  getLegendRules = () => null,
  createBlankBlueprint = () => null,
  applyBlueprintData = async () => {}
} = {}) {
  let pending = null;

  async function scanFromOverlay() {
    if (pending) return pending;

    pending = Promise.resolve()
      .then(async () => {
        const overlay = getOverlayImage();
        if (!overlay || !overlay.dataUrl) return { ok: false, reason: 'no-overlay-image' };

        const legendRules = getLegendRules();
        const draft = createBlankBlueprint();
        if (!draft) return { ok: false, reason: 'blank-blueprint-failed' };

        await applyBlueprintData(draft, { overlay, legendRules });
        return { ok: true, mode: 'placeholder-draft' };
      })
      .finally(() => {
        pending = null;
      });

    return pending;
  }

  return {
    scanFromOverlay
  };
}
