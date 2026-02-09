export async function ensureExampleCity({ state, runLegacyBuild } = {}) {
  if (!state || typeof state !== 'object') {
    throw new Error('ensureExampleCity requires a mutable state object');
  }
  if (typeof runLegacyBuild !== 'function') {
    throw new Error('ensureExampleCity requires runLegacyBuild function');
  }

  if (state.initialized) return false;
  if (state.pending) return state.pending;

  state.pending = Promise.resolve()
    .then(() => runLegacyBuild())
    .then(() => {
      state.initialized = true;
      return true;
    })
    .finally(() => {
      state.pending = null;
    });

  return state.pending;
}
