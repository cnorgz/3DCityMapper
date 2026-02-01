export function safeRendererInfo(renderer) {
  if (!renderer || !renderer.info) return null;
  const info = renderer.info;
  return {
    memory: {
      geometries: info.memory?.geometries ?? null,
      textures: info.memory?.textures ?? null
    },
    render: {
      calls: info.render?.calls ?? null,
      triangles: info.render?.triangles ?? null,
      lines: info.render?.lines ?? null,
      points: info.render?.points ?? null
    }
  };
}

export function blueprintCounts(blueprintData) {
  if (!blueprintData) return null;
  const keys = [
    'coastlines',
    'roads',
    'zones',
    'buildings',
    'pois',
    'transit',
    'lines',
    'paths'
  ];
  const out = {};
  keys.forEach((key) => {
    if (Array.isArray(blueprintData[key])) out[key] = blueprintData[key].length;
  });
  return out;
}

function roundNum(value, digits = 3) {
  if (value === null || value === undefined || Number.isNaN(value)) return null;
  const factor = Math.pow(10, digits);
  return Math.round(value * factor) / factor;
}

export function overlayDriftSignature(refs) {
  const { mapCoordMapper, mapOverlayGroup, mapOverlayImgW, mapOverlayImgH, overlayPxToWorld, overlayWorldToPx } = refs || {};
  if (!mapCoordMapper || !mapOverlayGroup || !mapOverlayImgW || !mapOverlayImgH) return null;
  const epsPx = 0.05;
  const probes = [
    { px: mapOverlayImgW * 0.5, py: mapOverlayImgH * 0.5 },
    { px: mapOverlayImgW * 0.1, py: mapOverlayImgH * 0.1 },
    { px: mapOverlayImgW * 0.9, py: mapOverlayImgH * 0.9 }
  ];
  let maxDrift = 0;
  const samples = [];
  probes.forEach((probe) => {
    const world = overlayPxToWorld ? overlayPxToWorld(probe.px, probe.py, 0) : null;
    if (!world) return;
    const pxBack = overlayWorldToPx ? overlayWorldToPx(world.x, world.z) : null;
    if (!pxBack) return;
    const dx = Math.abs(pxBack.px - probe.px);
    const dy = Math.abs(pxBack.py - probe.py);
    maxDrift = Math.max(maxDrift, dx, dy);
    samples.push({ px: roundNum(probe.px), py: roundNum(probe.py), dx: roundNum(dx), dy: roundNum(dy) });
  });
  return { ok: maxDrift <= epsPx, epsPx, maxDriftPx: roundNum(maxDrift), samples };
}

export function stableSceneSignature(scene) {
  if (!scene) return null;
  const groups = [];
  scene.traverse((obj) => {
    if (!obj || !obj.isGroup) return;
    if (!obj.name) return;
    groups.push({ name: obj.name, childrenCount: obj.children?.length ?? 0 });
  });
  groups.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  return { groups };
}

export function renderLoopSignature(refs) {
  const { renderFps, animationEnabled } = refs || {};
  if (!renderFps) return null;
  const modes = ['plan', '3d', 'street', 'fidelity'];
  const targets = {};
  modes.forEach((mode) => {
    const isRealtime = (mode === '3d' || mode === 'street');
    targets[mode] = isRealtime
      ? (animationEnabled ? renderFps.realtime : renderFps.realtimeIdle)
      : (animationEnabled ? renderFps.idle : renderFps.idleNoAnim);
  });
  return { renderFps: { ...renderFps }, animationEnabled: !!animationEnabled, targetFpsByMode: targets };
}

export function overlayPreviewGroupSignature(groups) {
  if (!groups) return null;
  const out = {};
  Object.keys(groups).forEach((key) => {
    const g = groups[key];
    if (!g) return;
    out[key] = { childrenCount: g.children?.length ?? 0, visible: !!g.visible };
  });
  return out;
}

export function renderOrderSignature(groups) {
  if (!groups) return null;
  const values = [];
  Object.values(groups).forEach((g) => {
    if (!g || !g.children) return;
    g.children.forEach((child) => {
      if (typeof child.renderOrder === 'number') values.push(child.renderOrder);
    });
  });
  const unique = Array.from(new Set(values)).sort((a, b) => a - b);
  return {
    min: unique.length ? unique[0] : null,
    max: unique.length ? unique[unique.length - 1] : null,
    unique
  };
}

export function viewModeSignature(refs) {
  const { setViewMode, getViewMode, snapshotViewMode } = refs || {};
  if (typeof setViewMode !== 'function' || typeof snapshotViewMode !== 'function') return null;
  const modes = ['plan', '3d', 'street', 'fidelity'];
  const original = typeof getViewMode === 'function' ? getViewMode() : null;
  const signatures = {};
  modes.forEach((mode) => {
    setViewMode(mode);
    signatures[mode] = snapshotViewMode();
  });
  if (original) setViewMode(original);
  return signatures;
}

export function buildRefactorProbeJSON(refs) {
  const overlayGroups = refs?.overlayPreviewGroups || {};
  return {
    rendererInfo: safeRendererInfo(refs?.renderer),
    blueprintCounts: blueprintCounts(refs?.blueprintData),
    sceneSignature: stableSceneSignature(refs?.scene),
    overlayDrift: overlayDriftSignature(refs),
    overlayPreviewGroups: overlayPreviewGroupSignature(overlayGroups),
    renderOrderSignature: renderOrderSignature(overlayGroups),
    renderLoopSignature: renderLoopSignature(refs),
    viewModeSignature: viewModeSignature(refs)
  };
}
