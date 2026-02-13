export function buildLegacyBuildingDefs({ zones, heights }) {
  const buildable = [];

  zones.forEach(zoneMesh => {
    const data = zoneMesh.userData;
    if (!data.type || data.type === 'garden' || data.type === 'port' || data.type === 'stadium' || data.type === 'skyscraper') return;

    let height = data.height !== undefined ? data.height : (heights[data.type] || 20);
    if (height < 5) return;

    buildable.push({
      name: zoneMesh.name,
      userData: data,
      points: data.points,
      color: data.color,
      type: data.type,
      height
    });
  });

  return { buildable };
}
