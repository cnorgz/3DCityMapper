export function createEditorRebuildScheduler(opts) {
  const {
    getBlueprintData,
    buildBlueprintFromData,
    rebuildBlueprintCity,
    updateSelectionMarkers
  } = opts || {};

  let rafId = null;

  function schedule() {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      rafId = null;
      const data = typeof getBlueprintData === 'function' ? getBlueprintData() : null;
      if (!data) return;
      buildBlueprintFromData(data);
      rebuildBlueprintCity();
      updateSelectionMarkers();
    });
  }

  return { schedule };
}
