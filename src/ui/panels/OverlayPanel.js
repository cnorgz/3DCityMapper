export function createOverlayPanel({ doc = document, state = {} } = {}) {
  let refs = null;

  function getRefs() {
    if (refs) return refs;
    refs = {
      opacitySlider: doc.getElementById('overlayOpacity'),
      opacityValue: doc.getElementById('overlayOpacityValue')
    };
    return refs;
  }

  function sync(nextState = state) {
    const overlayState = nextState?.overlay || nextState || {};
    const opacity = Number.parseFloat(overlayState.opacity);
    if (!Number.isFinite(opacity)) return;
    const { opacitySlider, opacityValue } = getRefs();
    if (opacitySlider) opacitySlider.value = opacity;
    if (opacityValue) opacityValue.value = opacity;
  }

  function init() {
    sync(state);
  }

  return {
    init,
    sync
  };
}
