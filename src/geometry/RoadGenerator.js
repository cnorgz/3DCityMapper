export function buildLegacyRoadDefs({ toWorld }) {
  // Roads placed in gaps between zone boundaries (streets on map)
  const hRoadPositions = [0.06, 0.12, 0.22, 0.32, 0.44, 0.56, 0.70, 0.76, 0.92];
  const vRoadPositions = [0.44, 0.50, 0.56, 0.62, 0.66, 0.72, 0.78, 0.82, 0.90];

  const hRoads = hRoadPositions.map((nz) => {
    const [, z] = toWorld(0.5, nz);
    const [x1] = toWorld(0.40, 0);
    const [x2] = toWorld(0.98, 0);
    return { x1, x2, z };
  });

  const vRoads = vRoadPositions.map((nx) => {
    const [x] = toWorld(nx, 0);
    const [, z1] = toWorld(0, 0.02);
    const [, z2] = toWorld(0, 0.96);
    return { x, z1, z2 };
  });

  return {
    hRoads,
    vRoads,
    dashCount: 20,
    dashOffset: 30,
    dashSpacing: 30,
    dashSize: { x: 15, y: 0.1, z: 0.5 },
    roadHeight: 0.3,
    roadWidth: 12
  };
}
