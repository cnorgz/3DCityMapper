const STORAGE_PREFIX = '3dcm:v1:';

function safeParse(json, fallback = null) {
  try {
    return JSON.parse(json);
  } catch (err) {
    return fallback;
  }
}

function safeStringify(value) {
  try {
    return JSON.stringify(value);
  } catch (err) {
    return null;
  }
}

export function makeKey(key) {
  return `${STORAGE_PREFIX}${key}`;
}

export function getItem(key) {
  const raw = localStorage.getItem(makeKey(key));
  if (raw == null) return null;
  return safeParse(raw, null);
}

export function setItem(key, value) {
  const json = safeStringify(value);
  if (json == null) return false;
  localStorage.setItem(makeKey(key), json);
  return true;
}

export function removeItem(key) {
  localStorage.removeItem(makeKey(key));
}

export function hasItem(key) {
  return localStorage.getItem(makeKey(key)) != null;
}

export function getRawKey(key) {
  return makeKey(key);
}

export function getNamespacePrefix() {
  return STORAGE_PREFIX;
}

export function setItemRaw(fullKey, value) {
  const json = safeStringify(value);
  if (json == null) return false;
  localStorage.setItem(fullKey, json);
  return true;
}

export function getItemRaw(fullKey) {
  const raw = localStorage.getItem(fullKey);
  if (raw == null) return null;
  return safeParse(raw, null);
}
