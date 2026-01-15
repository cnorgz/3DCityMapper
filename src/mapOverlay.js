import * as THREE from "three";

export class MapCoordMapper {
  constructor({ imgW, imgH, worldW, worldH, origin = new THREE.Vector3(0, 0, 0) }) {
    this.imgW = imgW;
    this.imgH = imgH;
    this.worldW = worldW;
    this.worldH = (worldH ?? (worldW * (imgH / imgW)));
    this.origin = origin.clone(); // center of map in world coords
  }

  pxToWorld(px, py, y = 0) {
    const u = px / this.imgW;     // 0..1 left->right
    const v = py / this.imgH;     // 0..1 top->bottom (world +Z follows +py)

    const x = (u - 0.5) * this.worldW + this.origin.x;
    const z = (v - 0.5) * this.worldH + this.origin.z; // +Z is "down" (same as +py)
    return new THREE.Vector3(x, y + this.origin.y, z);
  }

  worldToPx(x, z) {
    const u = (x - this.origin.x) / this.worldW + 0.5;
    const v = (z - this.origin.z) / this.worldH + 0.5;
    return {
      px: u * this.imgW,
      py: v * this.imgH,
    };
  }
}

export async function createMapOverlay({
  textureUrl,
  imgW,
  imgH,
  worldW,
  worldH,
  y = 1.015,
  opacity = 0.9,
  visible = true,
  renderOnTop = false,
  renderer
}) {

  const loader = new THREE.TextureLoader();
  const tex = await new Promise((resolve, reject) => {
    loader.load(textureUrl, resolve, undefined, reject);
  });

  // Three r152+:
  if ("colorSpace" in tex) tex.colorSpace = THREE.SRGBColorSpace;

  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;

  if (renderer?.capabilities?.getMaxAnisotropy) {
    tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  }

  const h = (worldH ?? (worldW * (imgH / imgW)));
  const geometry = new THREE.PlaneGeometry(worldW, h);
  geometry.rotateX(-Math.PI / 2);

  const mat = new THREE.MeshBasicMaterial({
    map: tex,
    transparent: true,
    opacity,
    depthWrite: false,
  });

  const mesh = new THREE.Mesh(geometry, mat);
  mesh.position.set(0, y, 0);
  mesh.visible = visible;
  mesh.material.opacity = opacity;
  mesh.name = "MapOverlayPlane";

  if (renderOnTop === true) {
    mat.depthTest = false;
    mesh.renderOrder = 999;
  } else {
    mat.depthTest = true;
    mesh.renderOrder = 1;
  }

  return { mesh, texture: tex, worldH: h };
}
