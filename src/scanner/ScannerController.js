export function createScannerController({
  getOverlayImage = () => null,
  getLegendRules = () => null,
  createBlankBlueprint = () => null,
  validateDraft = null,
  normalizeDraft = null,
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

        const ctx = { overlay, legendRules };

        if (typeof validateDraft === 'function') {
          const validation = await validateDraft(draft, ctx);
          if (!validation?.ok) {
            return {
              ok: false,
              reason: 'invalid-blueprint-draft',
              errors: validation?.errors || []
            };
          }
        }

        let normalizedDraft = draft;
        if (typeof normalizeDraft === 'function') {
          try {
            normalizedDraft = await normalizeDraft(draft, ctx);
          } catch (_error) {
            return { ok: false, reason: 'normalize-failed' };
          }
        }

        const applyResult = await applyBlueprintData(normalizedDraft, ctx);
        if (applyResult && applyResult.ok === false) {
          return {
            ok: false,
            reason: applyResult.reason || 'apply-blueprint-failed',
            errors: applyResult.errors || null
          };
        }

        const overlayMeta = {};
        if (overlay.imageId !== undefined && overlay.imageId !== null) {
          overlayMeta.imageId = overlay.imageId;
        }
        const width = overlay?.meta?.width ?? overlay?.width;
        const height = overlay?.meta?.height ?? overlay?.height;
        if (Number.isFinite(width)) overlayMeta.width = width;
        if (Number.isFinite(height)) overlayMeta.height = height;

        const result = {
          ok: true,
          mode: 'placeholder-draft',
          draft: normalizedDraft,
          legendRules
        };
        if (Object.keys(overlayMeta).length > 0) {
          result.overlayMeta = overlayMeta;
        }
        return result;
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
