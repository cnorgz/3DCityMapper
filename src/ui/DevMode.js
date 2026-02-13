export function isDevMode({ search = globalThis.location?.search, storage = globalThis.localStorage } = {}) {
  try {
    const params = new URLSearchParams(search || '');
    if (params.get('dev') === '1') return true;
  } catch (e) {
    // ignore URL parsing issues
  }

  try {
    return storage?.getItem?.('3dcm:dev') === '1';
  } catch (e) {
    return false;
  }
}
