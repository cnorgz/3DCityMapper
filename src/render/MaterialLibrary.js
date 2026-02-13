import * as THREE from 'three';

let WINDOW_MATS = null;
let WINDOW_GEO = null;

function buildWindowMaterials() {
  const day = new THREE.MeshStandardMaterial({
    color: 0x9cc9ff,
    roughness: 0.25,
    metalness: 0.0,
    envMapIntensity: 1.0,
    transparent: false
  });

  const nightLit = day.clone();
  nightLit.emissive.setHex(0xffaa44);
  nightLit.emissiveIntensity = 1.4;

  const nightDark = day.clone();
  nightDark.emissive.setHex(0x101020);
  nightDark.emissiveIntensity = 0.08;

  day.userData.shared = true;
  nightLit.userData.shared = true;
  nightDark.userData.shared = true;

  return { day, nightLit, nightDark };
}

function buildWindowGeometry() {
  const geo = new THREE.PlaneGeometry(3, 3 * 1.3);
  geo.userData.shared = true;
  return geo;
}

export function getSharedWindowMaterials() {
  if (!WINDOW_MATS) WINDOW_MATS = buildWindowMaterials();
  return WINDOW_MATS;
}

export function getSharedWindowGeometry() {
  if (!WINDOW_GEO) WINDOW_GEO = buildWindowGeometry();
  return WINDOW_GEO;
}
