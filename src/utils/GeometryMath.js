// Simple point-in-polygon for normalized coords
export function pointInPolygon(px, pz, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], zi = poly[i][1];
    const xj = poly[j][0], zj = poly[j][1];
    const intersect = ((zi > pz) !== (zj > pz)) &&
      (px < (xj - xi) * (pz - zi) / (zj - zi + 1e-9) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Polygon centroid in normalized coordinates
export function centroidNorm(points) {
  let a = 0, cx = 0, cz = 0;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const [x0, z0] = points[j];
    const [x1, z1] = points[i];
    const f = x0 * z1 - x1 * z0;
    a += f;
    cx += (x0 + x1) * f;
    cz += (z0 + z1) * f;
  }
  a *= 0.5;
  if (Math.abs(a) < 1e-9) {
    let sx = 0, sz = 0;
    for (const [x, z] of points) { sx += x; sz += z; }
    return [sx / points.length, sz / points.length];
  }
  return [cx / (6 * a), cz / (6 * a)];
}

export function distancePointToSegment(point, a, b) {
  const abx = b[0] - a[0];
  const abz = b[1] - a[1];
  const apx = point.x - a[0];
  const apz = point.z - a[1];
  const abLen2 = abx * abx + abz * abz;
  const t = abLen2 === 0 ? 0 : (apx * abx + apz * abz) / abLen2;
  const clamped = Math.max(0, Math.min(1, t));
  const cx = a[0] + abx * clamped;
  const cz = a[1] + abz * clamped;
  const dx = point.x - cx;
  const dz = point.z - cz;
  return { dist2: dx * dx + dz * dz, closest: { x: cx, z: cz }, t, tClamped: clamped };
}
