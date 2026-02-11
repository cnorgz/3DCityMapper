export const MAP_WIDTH = 1400;
export const MAP_HEIGHT = 1000;

export const MAP_OVERLAY_IMG_W = 1400;
export const MAP_OVERLAY_IMG_H = 1000;
export const MAP_OVERLAY_WORLD_W = MAP_WIDTH;
export const MAP_OVERLAY_WORLD_H = MAP_HEIGHT;
export const GRID_STEP_X = MAP_OVERLAY_WORLD_W / 20;
export const GRID_STEP_Z = MAP_OVERLAY_WORLD_H / 20;

export const IS_DEV = true; // Set to false for production

export const Y = {
  terrainSea: -2,
  beach: -1,
  land: 0,
  island: 0.5,
  zones: 1.0,
  overlay: 1.015,
  roads: 1.02,
  buildings: 1.05
};

export const OVERLAY_STORAGE_KEY = 'tadhgCityOverlayCalib';
export const OVERLAY_IMPORT_MAX_EDGE_PX = 2048;
export const OVERLAY_DEFAULTS = {
  offsetX: 0,
  offsetZ: 0,
  rotation: 0,
  scale: 1,
  opacity: 0.9,
  dimmer: 0,
  visible: true
};
export const OVERLAY_LIMITS = {
  offsetX: { min: -400, max: 400 },
  offsetZ: { min: -400, max: 400 },
  rotation: { min: -45, max: 45 },
  scale: { min: 0.5, max: 1.5 },
  opacity: { min: 0, max: 1 },
  dimmer: { min: 0, max: 0.8 }
};

export const LINE_TYPES = new Set(['ROAD_MAJOR', 'ROAD_MINOR', 'PATH', 'FOOTPATH', 'METRO', 'TRAIN', 'HYPERLOOP']);
export const TRANSIT_TYPES = new Set(['METRO', 'TRAIN', 'HYPERLOOP']);
export const USE_RIBBON_ROADS = true;
