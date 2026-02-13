import * as THREE from 'three';
import { pixelToOverlayLocal, overlayLocalToPixel } from './CoordinateMapper.js';

export const OVERLAY_DRIFT_EPS_PX = 0.05;

export function overlayLocalToWorld(local, group, y = 0) {
  if (!group || !local) return null;
  const x = Number.isFinite(local.x) ? local.x : local[0];
  const z = Number.isFinite(local.z) ? local.z : local[1];
  const vec = new THREE.Vector3(x, y, z);
  return group.localToWorld(vec);
}

export function worldToOverlayLocal(world, group) {
  if (!group || !world) return null;
  const vec = new THREE.Vector3(world.x, world.y ?? 0, world.z);
  return group.worldToLocal(vec);
}

export function computeOverlayDrift({ dims, group, epsPx = OVERLAY_DRIFT_EPS_PX, samples }) {
  if (!dims || !group) return null;
  const probes = samples && samples.length ? samples : [
    { px: dims.imgW * 0.5, py: dims.imgH * 0.5 },
    { px: dims.imgW * 0.1, py: dims.imgH * 0.1 },
    { px: dims.imgW * 0.9, py: dims.imgH * 0.9 }
  ];
  let maxDrift = 0;
  const sampleOut = [];
  probes.forEach((probe) => {
    const local = pixelToOverlayLocal(probe.px, probe.py, dims);
    if (!local) return;
    const world = overlayLocalToWorld(local, group, 0);
    if (!world) return;
    const backLocal = worldToOverlayLocal(world, group);
    if (!backLocal) return;
    const pxBack = overlayLocalToPixel({ x: backLocal.x, z: backLocal.z }, dims);
    if (!pxBack) return;
    const dx = Math.abs(pxBack.px - probe.px);
    const dy = Math.abs(pxBack.py - probe.py);
    maxDrift = Math.max(maxDrift, dx, dy);
    sampleOut.push({ px: probe.px, py: probe.py, dx, dy });
  });
  return { ok: maxDrift <= epsPx, epsPx, maxDriftPx: maxDrift, samples: sampleOut };
}
