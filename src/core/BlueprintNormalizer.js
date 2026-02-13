export function normalizeBlueprint(data, helpers = {}) {
  const normalizeTypeCode = helpers.normalizeTypeCode || ((code) => code);
  const normalizeLineType = helpers.normalizeLineType || ((type) => type);

  const normalized = {
    meta: (data && typeof data.meta === 'object' && data.meta) ? data.meta : {},
    coastlines: Array.isArray(data?.coastlines) ? data.coastlines : [],
    beaches: Array.isArray(data?.beaches) ? data.beaches : [],
    sea: Array.isArray(data?.sea) ? data.sea : [],
    transit: Array.isArray(data?.transit) ? data.transit : [],
    roads: Array.isArray(data?.roads) ? data.roads : [],
    zones: Array.isArray(data?.zones) ? data.zones : [],
    buildings: Array.isArray(data?.buildings) ? data.buildings : [],
    pois: Array.isArray(data?.pois) ? data.pois : []
  };
  ['coastlines', 'beaches', 'sea', 'transit', 'roads', 'zones', 'buildings'].forEach((key) => {
    normalized[key].forEach((entry) => {
      if (!Array.isArray(entry.curves)) entry.curves = [];
    });
  });
  normalized.zones.forEach((entry) => {
    if (entry && entry.typeCode) entry.typeCode = normalizeTypeCode(entry.typeCode);
  });
  normalized.buildings.forEach((entry) => {
    if (entry && entry.typeCode) entry.typeCode = normalizeTypeCode(entry.typeCode);
  });
  normalized.transit.forEach((entry) => {
    if (entry && entry.type) entry.type = String(entry.type).toUpperCase();
    if (entry && entry.kind) entry.kind = normalizeLineType(entry.kind);
  });
  normalized.roads.forEach((entry) => {
    if (entry && entry.kind) entry.kind = normalizeLineType(entry.kind);
    if (entry && entry.type) entry.type = normalizeLineType(entry.type);
  });

  // Merge legacy transit lines into roads so all line features live in one place.
  if (normalized.transit.length > 0) {
    normalized.transit.forEach((entry) => {
      if (!entry?.polyline) return;
      normalized.roads.push({
        ...entry,
        kind: normalizeLineType(entry.kind ?? entry.type ?? 'METRO')
      });
    });
    normalized.transit = [];
  }

  normalized.roads.forEach((entry) => {
    if (!entry) return;
    if (entry.polyline) {
      entry.kind = normalizeLineType(entry.kind ?? entry.type ?? 'ROAD_MINOR');
      entry.type = entry.kind;
    }
  });

  return normalized;
}
