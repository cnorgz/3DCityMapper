export function createLegacyBuildings({
  layer,
  defs,
  createBuildingWithWindows,
  buildings,
  buildingGroups,
  registry,
  Y
}) {
  const buildable = defs?.buildable || [];

  buildable.forEach(def => {
    const buildingGroup = createBuildingWithWindows(def.points, def.color, def.height, def.type);
    buildingGroup.name = def.name + '_building';
    buildingGroup.userData = def.userData;
    buildingGroup.position.y = Y.buildings;
    layer.add(buildingGroup);
    buildings.push(buildingGroup);
    buildingGroups.push(buildingGroup);

    const entry = registry[def.name];
    if (entry) entry.buildingGroup = buildingGroup;
  });
}
