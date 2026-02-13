export function pixelToOverlayLocal(px, py, dims = {}) {
  if (!dims || !Number.isFinite(dims.imgW) || !Number.isFinite(dims.imgH)) return null;
  const worldW = Number.isFinite(dims.worldW) ? dims.worldW : 0;
  const worldH = Number.isFinite(dims.worldH)
    ? dims.worldH
    : (worldW && dims.imgW ? worldW * (dims.imgH / dims.imgW) : 0);
  const origin = dims.origin || { x: 0, z: 0 };
  const u = px / dims.imgW;
  const v = py / dims.imgH;
  const x = (u - 0.5) * worldW + (origin.x ?? 0);
  const z = (v - 0.5) * worldH + (origin.z ?? 0);
  return { x, z };
}

export function overlayLocalToPixel(local, dims = {}) {
  if (!local || !Number.isFinite(dims.imgW) || !Number.isFinite(dims.imgH)) return null;
  const worldW = Number.isFinite(dims.worldW) ? dims.worldW : 0;
  const worldH = Number.isFinite(dims.worldH)
    ? dims.worldH
    : (worldW && dims.imgW ? worldW * (dims.imgH / dims.imgW) : 0);
  const origin = dims.origin || { x: 0, z: 0 };
  const x = Number.isFinite(local.x) ? local.x : local[0];
  const z = Number.isFinite(local.z) ? local.z : local[1];
  const u = worldW ? ((x - (origin.x ?? 0)) / worldW + 0.5) : 0.5;
  const v = worldH ? ((z - (origin.z ?? 0)) / worldH + 0.5) : 0.5;
  return {
    px: u * dims.imgW,
    py: v * dims.imgH
  };
}
