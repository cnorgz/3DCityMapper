export function createBlueprintPreviewPanel({ doc = document, state = {}, actions = {} } = {}) {
  let refs = null;
  let panelState = {
    opacity: 1,
    showLabels: false
  };

  function getRefs() {
    if (refs) return refs;
    refs = {
      opacitySlider: doc.getElementById('blueprintOpacity'),
      opacityValue: doc.getElementById('blueprintOpacityValue'),
      showLabels: doc.getElementById('blueprintLabels')
    };
    return refs;
  }

  function sync(nextState = state) {
    const previewState = nextState?.blueprintPreview || nextState || {};
    panelState = {
      ...panelState,
      ...previewState
    };
    const { opacitySlider, opacityValue, showLabels } = getRefs();
    if (opacitySlider) opacitySlider.value = panelState.opacity;
    if (opacityValue) opacityValue.value = panelState.opacity;
    if (showLabels) showLabels.checked = !!panelState.showLabels;
  }

  function bindOpacity(sliderEl, inputEl) {
    if (!sliderEl || !inputEl || typeof actions.setOpacity !== 'function') return;
    const apply = (value) => {
      sliderEl.value = value;
      inputEl.value = value;
      actions.setOpacity(value);
    };
    sliderEl.addEventListener('input', (e) => apply(e.target.value));
    inputEl.addEventListener('input', (e) => apply(e.target.value));
  }

  function init() {
    const { opacitySlider, opacityValue, showLabels } = getRefs();
    bindOpacity(opacitySlider, opacityValue);
    if (showLabels && typeof actions.setShowLabels === 'function') {
      showLabels.addEventListener('change', (e) => {
        actions.setShowLabels(!!e.target.checked);
      });
    }
    sync(state);
  }

  return {
    init,
    sync
  };
}
