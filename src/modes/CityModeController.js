const SUPPORTED_MODES = new Set(['blueprint', 'blank', 'example']);

function normalizeMode(rawMode, fallback = 'blueprint') {
  const mode = typeof rawMode === 'string' ? rawMode.toLowerCase().trim() : '';
  if (SUPPORTED_MODES.has(mode)) return mode;
  return fallback;
}

function readModeFromSearch(search) {
  try {
    const params = new URLSearchParams(search || globalThis?.location?.search || '');
    return params.get('cityMode');
  } catch (_) {
    return null;
  }
}

export function createCityModeController({ actions = {}, search = null, defaultMode = 'blueprint' } = {}) {
  let currentMode = normalizeMode(defaultMode, 'blueprint');

  async function setMode(rawMode) {
    const nextMode = normalizeMode(rawMode, currentMode);
    if (nextMode === currentMode && nextMode !== 'example') return currentMode;

    if (nextMode === 'blank' && typeof actions.applyBlankMode === 'function') {
      await actions.applyBlankMode();
    } else if (nextMode === 'example' && typeof actions.applyExampleMode === 'function') {
      await actions.applyExampleMode();
    } else if (nextMode === 'blueprint' && typeof actions.applyBlueprintMode === 'function') {
      await actions.applyBlueprintMode();
    }

    currentMode = nextMode;
    return currentMode;
  }

  function getMode() {
    return currentMode;
  }

  function resolveInitialMode() {
    return normalizeMode(readModeFromSearch(search), currentMode);
  }

  async function applyInitialMode() {
    const initial = resolveInitialMode();
    if (initial === currentMode) return currentMode;
    return setMode(initial);
  }

  return {
    setMode,
    getMode,
    resolveInitialMode,
    applyInitialMode
  };
}
