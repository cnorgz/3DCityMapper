export function createLegacyTerrain({ layer, createPolygon, defs }) {
  const meshes = [];
  defs.forEach(def => {
    const mesh = createPolygon(def.points, def.color, def.y);
    mesh.name = def.name;
    layer.add(mesh);
    meshes.push(mesh);
  });
  return meshes;
}
