import { buildDraftBlueprint as buildDraftBlueprintDefault } from './DraftBlueprintBuilder.js';
import { buildOverlayMetaFromOverlay } from './overlayMeta.js';

export function createScannerController({
  getOverlayImage = () => null,
  getLegendRules = () => null,
  createBlankBlueprint = () => null,
  buildDraftBlueprint = buildDraftBlueprintDefault,
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
        const overlayMeta = buildOverlayMetaFromOverlay(overlay);

        let draft = null;
        try {
          draft = buildDraftBlueprint({
            overlayImage: overlay,
            legendRules,
            overlayMeta,
            createBlankBlueprint
          });
        } catch (_error) {
          return { ok: false, reason: 'blank-blueprint-failed' };
        }
        if (!draft) return { ok: false, reason: 'blank-blueprint-failed' };

        const ctx = { overlay, overlayMeta, legendRules };

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
