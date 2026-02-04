import { getItem, setItem, removeItem } from '../persistence/StateStore.js';

const STORAGE_KEYS = {
  imageId: 'overlay.imageId',
  imageData: 'overlay.imageData',
  imageMeta: 'overlay.imageMeta'
};

const MAX_EDGE_PX = 2048;

let currentImageId = null;
let currentDataUrl = null;
let currentMeta = null;

function safeParseImageMeta(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const width = Number(raw.width);
  const height = Number(raw.height);
  if (!Number.isFinite(width) || !Number.isFinite(height)) return null;
  return {
    width,
    height,
    name: raw.name || '',
    size: Number.isFinite(raw.size) ? raw.size : 0,
    lastModified: Number.isFinite(raw.lastModified) ? raw.lastModified : 0
  };
}

export function getImageId() {
  return currentImageId;
}

export function getDataURL() {
  return currentDataUrl;
}

export function getImageMeta() {
  return currentMeta;
}

export function getMaxEdgePx() {
  return MAX_EDGE_PX;
}

export function loadFromStore() {
  const storedId = getItem(STORAGE_KEYS.imageId);
  const storedData = getItem(STORAGE_KEYS.imageData);
  const storedMeta = safeParseImageMeta(getItem(STORAGE_KEYS.imageMeta));
  if (storedId && storedData) {
    currentImageId = storedId;
    currentDataUrl = storedData;
    currentMeta = storedMeta;
    return true;
  }
  return false;
}

function computeImageId(file) {
  return `${file.name}:${file.size}:${file.lastModified}`;
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error || new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

function loadImage(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = dataUrl;
  });
}

function normalizeDataUrl(img, maxEdgePx) {
  const width = img.naturalWidth || img.width;
  const height = img.naturalHeight || img.height;
  if (!width || !height) return { dataUrl: null, width: 0, height: 0 };

  const maxDim = Math.max(width, height);
  if (maxDim <= maxEdgePx) {
    return { dataUrl: img.src, width, height };
  }
  const scale = maxEdgePx / maxDim;
  const targetW = Math.round(width * scale);
  const targetH = Math.round(height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, targetW, targetH);
  const dataUrl = canvas.toDataURL('image/png');
  return { dataUrl, width: targetW, height: targetH };
}

export async function setFromFile(file) {
  if (!file) return null;
  const imageId = computeImageId(file);
  const rawDataUrl = await readFileAsDataURL(file);
  const img = await loadImage(rawDataUrl);
  const normalized = normalizeDataUrl(img, MAX_EDGE_PX);
  if (!normalized.dataUrl) return null;

  const meta = {
    width: normalized.width,
    height: normalized.height,
    name: file.name,
    size: file.size,
    lastModified: file.lastModified
  };

  currentImageId = imageId;
  currentDataUrl = normalized.dataUrl;
  currentMeta = meta;

  setItem(STORAGE_KEYS.imageId, imageId);
  setItem(STORAGE_KEYS.imageData, currentDataUrl);
  setItem(STORAGE_KEYS.imageMeta, meta);

  return { imageId, dataUrl: currentDataUrl, meta };
}

export function clearImage() {
  currentImageId = null;
  currentDataUrl = null;
  currentMeta = null;
  removeItem(STORAGE_KEYS.imageId);
  removeItem(STORAGE_KEYS.imageData);
  removeItem(STORAGE_KEYS.imageMeta);
}

export function getStorageKeys() {
  return { ...STORAGE_KEYS };
}
