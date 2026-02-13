export function buildLegacyTerrainDefs({ seaPoints, beachPoints, islandOutline, colors }) {
  const mainlandPoints = [
    [0.36, 0], [1, 0], [1, 1], [0.32, 1],
    [0.30, 0.85], [0.32, 0.70], [0.36, 0.55],
    [0.38, 0.42], [0.40, 0.30], [0.38, 0.15]
  ];

  return [
    { name: 'sea', points: seaPoints, color: colors.sea, y: -2 },
    { name: 'beach', points: beachPoints, color: colors.beach, y: -1 },
    { name: 'mainland', points: mainlandPoints, color: colors.land, y: 0 },
    { name: 'island', points: islandOutline, color: 0xb8a888, y: 0.5 }
  ];
}
