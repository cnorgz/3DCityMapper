export function createTrafficPanel({ doc = document, actions = {}, state = {} } = {}) {
  let refs = null;
  let panelState = {
    maxCars: 12,
    speedScale: 1
  };

  function getRefs() {
    if (refs) return refs;
    refs = {
      carSlider: doc.getElementById('trafficCarCount'),
      carValue: doc.getElementById('trafficCarCountValue'),
      speedSlider: doc.getElementById('trafficSpeed'),
      speedValue: doc.getElementById('trafficSpeedValue')
    };
    return refs;
  }

  function bindPair(sliderEl, inputEl, onChange) {
    if (!sliderEl || !inputEl || typeof onChange !== 'function') return;
    const apply = (value) => {
      sliderEl.value = value;
      inputEl.value = value;
      onChange(value);
    };
    sliderEl.addEventListener('input', (e) => apply(e.target.value));
    inputEl.addEventListener('input', (e) => apply(e.target.value));
  }

  function sync(nextState = state) {
    const trafficState = nextState?.traffic || nextState || {};
    panelState = {
      ...panelState,
      ...trafficState
    };
    const { carSlider, carValue, speedSlider, speedValue } = getRefs();
    if (carSlider) carSlider.value = panelState.maxCars;
    if (carValue) carValue.value = panelState.maxCars;
    if (speedSlider) speedSlider.value = panelState.speedScale;
    if (speedValue) speedValue.value = panelState.speedScale;
  }

  function init() {
    const { carSlider, carValue, speedSlider, speedValue } = getRefs();
    bindPair(carSlider, carValue, actions.setTrafficMaxCars);
    bindPair(speedSlider, speedValue, actions.setTrafficSpeedScale);
    sync(state);
  }

  return {
    init,
    sync
  };
}
