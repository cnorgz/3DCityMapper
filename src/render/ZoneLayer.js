export function createZoneMeshes({ layer, zoneDefs, zones, registry, createPolygon, y }) {
  const meshes = [];
  Object.entries(zoneDefs).forEach(([key, zone]) => {
    const mesh = createPolygon(zone.points, zone.color, y);
    mesh.name = key;
    mesh.userData = { ...zone };
    layer.add(mesh);
    zones.push(mesh);
    registry[key] = { zoneMesh: mesh, buildingGroup: null, props: [] };
    meshes.push(mesh);
  });
  return meshes;
}
