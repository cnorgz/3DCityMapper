import { getItemRaw, setItemRaw, hasItem, setItem } from './StateStore.js';

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
  if (legacyRaw == null) return;

  const newKey = NEW_KEYS.overlayCalib(imageId);
  if (hasItem(newKey)) return;

  // legacy value is already JSON stringified; preserve as parsed object
  setItem(newKey, legacyRaw);
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
