export function createPanelManager({ panels = [] } = {}) {
  let initialized = false;

  function initAll() {
    if (initialized) return;
    panels.forEach((panel) => panel?.init?.());
    initialized = true;
  }

  function syncAll(state) {
    panels.forEach((panel) => panel?.sync?.(state));
  }

  return {
    initAll,
    syncAll
  };
}
