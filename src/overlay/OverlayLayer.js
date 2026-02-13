import * as THREE from 'three';
import { MapCoordMapper, createMapOverlay } from '../mapOverlay.js';
import { pixelToOverlayLocal, overlayLocalToPixel } from '../core/CoordinateMapper.js';
import { computeOverlayDrift, overlayLocalToWorld, worldToOverlayLocal } from '../core/OverlayTransform.js';

export async function createOverlayLayer({
  renderer,
  textureUrl,
  imgW,
  imgH,
  worldW,
  worldH,
  y,
  opacity,
  visible,
  renderOnTop,
  dimmerOpacity,
  overlayGroup,
  syncBlueprintRoot,
  updateLineResolution,
  blueprintGroups
}) {
  const overlayResult = await createMapOverlay({
    textureUrl,
    imgW,
    imgH,
    worldW,
    worldH,
    y,
    opacity,
    visible,
    renderOnTop,
    renderer
  });

  const mapOverlayGroup = overlayGroup || new THREE.Group();
  mapOverlayGroup.name = 'MapOverlayGroup';
  const mapOverlayMesh = overlayResult.mesh;
  mapOverlayMesh.raycast = () => null;
  mapOverlayGroup.add(mapOverlayMesh);

  const dimmerMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: dimmerOpacity ?? 0,
    depthWrite: false
  });
  dimmerMat.depthTest = false;
  const overlayDimmer = new THREE.Mesh(
    new THREE.PlaneGeometry(worldW, worldH),
    dimmerMat
  );
  overlayDimmer.geometry.rotateX(-Math.PI / 2);
  overlayDimmer.position.y = y + 0.001;
  overlayDimmer.renderOrder = 2;
  mapOverlayGroup.add(overlayDimmer);

  if (syncBlueprintRoot) syncBlueprintRoot();

  const mapCoordMapper = new MapCoordMapper({
    imgW,
    imgH,
    worldW,
    worldH,
    origin: new THREE.Vector3(0, 0, 0)
  });

  const overlayWorldToPx = (x, z) => {
    const local = worldToOverlayLocal({ x, y: 0, z }, mapOverlayGroup);
    return overlayLocalToPixel({ x: local.x, z: local.z }, mapCoordMapper);
  };

  const overlayPxToWorld = (px, py, yPos = 0) => {
    const local = pixelToOverlayLocal(px, py, mapCoordMapper);
    return overlayLocalToWorld({ x: local.x, z: local.z }, mapOverlayGroup, yPos);
  };

  const verifyMapping = () => {
    if (!mapCoordMapper || !mapOverlayGroup) return null;
    return computeOverlayDrift({
      dims: mapCoordMapper,
      group: mapOverlayGroup
    });
  };

  if (blueprintGroups?.overlayBounds && updateLineResolution) {
    updateLineResolution(blueprintGroups.overlayBounds);
  }

  return {
    mapOverlayGroup,
    mapOverlayMesh,
    overlayDimmer,
    mapCoordMapper,
    overlayWorldToPx,
    overlayPxToWorld,
    verifyMapping,
    worldH: overlayResult.worldH
  };
}
