export function createZoneInfoPanel({
  three,
  getActiveCamera,
  getZonesToTest,
  getLegendInfo,
  normalizeTypeCode,
  doc = document
} = {}) {
  const raycaster = new three.Raycaster();
  const mouse = new three.Vector2();
  const defaultText = 'Hover over zones for info';
  let initialized = false;
  let zoneInfoEl = null;

  function onMouseMove(event) {
    if (!zoneInfoEl) return;
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const activeCamera = getActiveCamera?.();
    if (!activeCamera) {
      zoneInfoEl.textContent = defaultText;
      return;
    }

    raycaster.setFromCamera(mouse, activeCamera);
    const zonesToTest = getZonesToTest?.() || [];
    const intersects = raycaster.intersectObjects(zonesToTest);

    if (intersects.length > 0) {
      const zone = intersects[0].object;
      const data = zone.userData;
      if (data.label) {
        const info = getLegendInfo?.(data.label) || {};
        zoneInfoEl.textContent = `${normalizeTypeCode?.(data.label) || data.label}: ${info.label || data.type}`;
      }
      return;
    }

    zoneInfoEl.textContent = defaultText;
  }

  function init() {
    if (initialized) return;
    zoneInfoEl = doc.getElementById('zoneInfo');
    if (!zoneInfoEl) return;
    zoneInfoEl.textContent = defaultText;
    window.addEventListener('mousemove', onMouseMove);
    initialized = true;
  }

  function sync() {
    // no-op for now; hover state is event-driven
  }

  return {
    init,
    sync
  };
}
