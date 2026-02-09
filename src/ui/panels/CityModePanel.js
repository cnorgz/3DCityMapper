export function createCityModePanel({ doc = document, state = {}, actions = {} } = {}) {
  let refs = null;
  let initialized = false;
  let panelState = {
    mode: 'example'
  };

  function ensureModeButtons() {
    const uploadBtn = doc.getElementById('overlayUpload');
    if (!uploadBtn || !uploadBtn.parentElement) return {};

    let row = doc.getElementById('cityModeActions');
    if (!row) {
      row = doc.createElement('div');
      row.id = 'cityModeActions';
      row.className = 'overlay-actions';
      row.style.marginTop = '6px';
      row.innerHTML = [
        '<button class="btn" id="cityModeScan" style="flex:1;padding:6px;">New City (Scan)</button>',
        '<button class="btn" id="cityModeBlank" style="flex:1;padding:6px;">New City (Blank)</button>',
        '<button class="btn" id="cityModeExample" style="flex:1;padding:6px;">Load Example City</button>'
      ].join('');
      uploadBtn.parentElement.insertAdjacentElement('afterend', row);
    }

    return {
      row,
      scanBtn: row.querySelector('#cityModeScan'),
      blankBtn: row.querySelector('#cityModeBlank'),
      exampleBtn: row.querySelector('#cityModeExample')
    };
  }

  function getRefs() {
    if (refs) return refs;
    refs = ensureModeButtons();
    return refs;
  }

  function markActiveButton(mode) {
    const { blankBtn, exampleBtn } = getRefs();
    if (blankBtn) {
      blankBtn.style.opacity = mode === 'blank' ? '1' : '0.75';
    }
    if (exampleBtn) {
      exampleBtn.style.opacity = mode === 'example' ? '1' : '0.75';
    }
  }

  function sync(nextState = state) {
    const incoming = nextState?.cityMode || nextState || {};
    panelState = {
      ...panelState,
      ...incoming
    };
    markActiveButton(panelState.mode);
  }

  function init() {
    if (initialized) return;
    initialized = true;
    const { scanBtn, blankBtn, exampleBtn } = getRefs();
    if (scanBtn && typeof actions.openScan === 'function') {
      scanBtn.addEventListener('click', () => actions.openScan());
    }
    if (blankBtn && typeof actions.setMode === 'function') {
      blankBtn.addEventListener('click', () => actions.setMode('blank'));
    }
    if (exampleBtn && typeof actions.setMode === 'function') {
      exampleBtn.addEventListener('click', () => actions.setMode('example'));
    }
    sync(state);
  }

  return {
    init,
    sync
  };
}
