export function createLegacyRoads({ layer, defs, Y, THREE, tmpObj, createCars }) {
  const roadMat = new THREE.MeshStandardMaterial({
    color: 0x404040,
    roughness: 0.9
  });

  const sidewalkMat = new THREE.MeshStandardMaterial({
    color: 0x707070,
    roughness: 0.8
  });

  // Preserve unused material creation for parity
  void sidewalkMat;

  const dashGeo = new THREE.BoxGeometry(defs.dashSize.x, defs.dashSize.y, defs.dashSize.z);
  const dashMat = new THREE.MeshStandardMaterial({ color: 0xdddd44 });

  defs.hRoads.forEach((roadDef) => {
    const roadGeo = new THREE.BoxGeometry(roadDef.x2 - roadDef.x1, defs.roadHeight, defs.roadWidth);
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.position.set((roadDef.x1 + roadDef.x2) / 2, Y.roads, roadDef.z);
    road.receiveShadow = true;
    road.material.polygonOffset = true;
    road.material.polygonOffsetFactor = -1;
    road.material.polygonOffsetUnits = -1;
    layer.add(road);

    const dashes = new THREE.InstancedMesh(dashGeo, dashMat, defs.dashCount);
    for (let i = 0; i < defs.dashCount; i++) {
      tmpObj.position.set(roadDef.x1 + defs.dashOffset + i * defs.dashSpacing, 1.05, roadDef.z);
      tmpObj.rotation.set(0, 0, 0);
      tmpObj.updateMatrix();
      dashes.setMatrixAt(i, tmpObj.matrix);
    }
    dashes.instanceMatrix.needsUpdate = true;
    dashes.castShadow = false;
    dashes.receiveShadow = false;
    layer.add(dashes);
  });

  defs.vRoads.forEach((roadDef) => {
    const roadGeo = new THREE.BoxGeometry(defs.roadWidth, defs.roadHeight, Math.abs(roadDef.z2 - roadDef.z1));
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.position.set(roadDef.x, Y.roads, (roadDef.z1 + roadDef.z2) / 2);
    road.receiveShadow = true;
    road.material.polygonOffset = true;
    road.material.polygonOffsetFactor = -1;
    road.material.polygonOffsetUnits = -1;
    layer.add(road);
  });

  createCars();
}
