export function createEditorHitTest(deps) {
  const {
    mapOverlayGroupRef,
    raycaster,
    THREE,
    Y,
    getActiveCamera,
    orthoCamera,
    MAP_WIDTH,
    MAP_HEIGHT,
    getViewportSize
  } = deps || {};

  function canPanMap() {
    const viewW = (orthoCamera.right - orthoCamera.left) / orthoCamera.zoom;
    const viewH = (orthoCamera.top - orthoCamera.bottom) / orthoCamera.zoom;
    return (MAP_WIDTH > viewW + 1) || (MAP_HEIGHT > viewH + 1);
  }

  function applyPanDelta(dxPx, dyPx) {
    const viewport = getViewportSize();
    const viewW = (orthoCamera.right - orthoCamera.left) / orthoCamera.zoom;
    const viewH = (orthoCamera.top - orthoCamera.bottom) / orthoCamera.zoom;
    const worldPerPxX = viewW / viewport.width;
    const worldPerPxZ = viewH / viewport.height;
    const dxWorld = -dxPx * worldPerPxX;
    const dzWorld = -dyPx * worldPerPxZ;
    orthoCamera.position.x += dxWorld;
    orthoCamera.position.z += dzWorld;
    orthoCamera.lookAt(orthoCamera.position.x, 0, orthoCamera.position.z);
    orthoCamera.updateProjectionMatrix();
  }

  function getPointerMapPoint(event) {
    const mapOverlayGroup = mapOverlayGroupRef();
    if (!mapOverlayGroup) return null;
    const viewport = getViewportSize();
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -Y.overlay);
    const mouseVec = new THREE.Vector2(
      (event.clientX / viewport.width) * 2 - 1,
      -(event.clientY / viewport.height) * 2 + 1
    );
    raycaster.setFromCamera(mouseVec, getActiveCamera());
    const hit = new THREE.Vector3();
    if (!raycaster.ray.intersectPlane(plane, hit)) return null;
    mapOverlayGroup.worldToLocal(hit);
    return { x: hit.x, z: hit.z };
  }

  return {
    canPanMap,
    applyPanDelta,
    getPointerMapPoint
  };
}
