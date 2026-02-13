import { getItemRaw, hasItem, setItem, getItem } from './StateStore.js';

const LEGACY_KEYS = {
  overlayCalib: 'tadhgCityOverlayCalib',
  overlayPanelCollapsed: 'tadhgOverlayPanelCollapsed'
};

const NEW_KEYS = {
  overlayCalib: (imageId) => `overlayCalib:${imageId}`,
  overlayPanelCollapsed: 'ui.overlayPanelCollapsed'
};

export function runMigrations({ imageId = 'demo' } = {}) {
  migrateOverlayCalib(imageId);
  migrateOverlayPanelCollapsed();
}

function migrateOverlayCalib(imageId) {
  const legacyRaw = getItemRaw(LEGACY_KEYS.overlayCalib);
  const newKey = NEW_KEYS.overlayCalib(imageId);
  if (legacyRaw != null && !hasItem(newKey)) {
    // legacy value is already JSON stringified; preserve as parsed object
    setItem(newKey, legacyRaw);
  }

  if (hasItem(newKey)) return;
  if (imageId === 'demo') return;

  const demoKey = NEW_KEYS.overlayCalib('demo');
  if (!hasItem(demoKey)) return;

  const demoValue = getItem(demoKey);
  if (demoValue == null) return;
  setItem(newKey, demoValue);
}

function migrateOverlayPanelCollapsed() {
  const legacyRaw = getItemRaw(LEGACY_KEYS.overlayPanelCollapsed);
  if (legacyRaw == null) return;

  if (hasItem(NEW_KEYS.overlayPanelCollapsed)) return;

  setItem(NEW_KEYS.overlayPanelCollapsed, legacyRaw);
}

export function getLegacyKeys() {
  return { ...LEGACY_KEYS };
}

export function getNewKeys(imageId = 'demo') {
  return {
    overlayCalib: NEW_KEYS.overlayCalib(imageId),
    overlayPanelCollapsed: NEW_KEYS.overlayPanelCollapsed
  };
}
