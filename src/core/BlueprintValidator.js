export function validateBlueprint(data, helpers = {}) {
  const errors = [];
  const warnings = [];
  const normalizeTypeCode = helpers.normalizeTypeCode || ((code) => code);
  const normalizeLineType = helpers.normalizeLineType || ((type) => type);
  const ALLOWED_TYPE_CODES = helpers.ALLOWED_TYPE_CODES || new Set();
  const LINE_TYPES = helpers.LINE_TYPES || new Set();
  const TRANSIT_TYPES = helpers.TRANSIT_TYPES || new Set();

  if (!data || typeof data !== 'object') {
    errors.push('Blueprint must be an object.');
    return { ok: false, errors, warnings };
  }

  ['coastlines', 'roads', 'zones', 'buildings', 'pois'].forEach((key) => {
    if (!Array.isArray(data[key])) errors.push(`${key} must be an array.`);
  });
  ['beaches', 'sea'].forEach((key) => {
    if (data[key] !== undefined && !Array.isArray(data[key])) {
      errors.push(`${key} must be an array when provided.`);
    }
  });
  if (data.transit !== undefined && !Array.isArray(data.transit)) {
    errors.push('transit must be an array when provided.');
  } else if (Array.isArray(data.transit) && data.transit.length > 0) {
    warnings.push('transit is legacy; line features should live in roads[].');
  }

  const isFinitePoint = (pt) => Array.isArray(pt) && pt.length >= 2 &&
    Number.isFinite(pt[0]) && Number.isFinite(pt[1]);

  const polygonArea = (poly) => {
    let area = 0;
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i];
      const b = poly[(i + 1) % poly.length];
      area += (a[0] * b[1]) - (b[0] * a[1]);
    }
    return area * 0.5;
  };

  const validateCurves = (entry, idx, label) => {
    if (!entry || entry.curves === undefined) return;
    if (!Array.isArray(entry.curves) || !entry.curves.every(Number.isInteger)) {
      errors.push(`${label}[${idx}] curves must be an array of indices.`);
      return;
    }
    if (entry.polygon) {
      entry.curves.forEach((c) => {
        if (c < 0 || c >= entry.polygon.length) {
          warnings.push(`${label}[${idx}] curve index ${c} is out of range.`);
        }
      });
    }
  };

  (data.coastlines || []).forEach((entry, idx) => {
    const poly = entry?.polygon;
    if (!Array.isArray(poly) || poly.length < 3) {
      errors.push(`coastlines[${idx}] polygon must have >= 3 points.`);
      return;
    }
    if (!poly.every(isFinitePoint)) {
      errors.push(`coastlines[${idx}] polygon has invalid points.`);
      return;
    }
    const area = polygonArea(poly);
    if (Math.abs(area) < 0.001) {
      errors.push(`coastlines[${idx}] polygon area is near zero.`);
    } else if (area < 0) {
      warnings.push(`coastlines[${idx}] polygon winding is clockwise.`);
    }
    validateCurves(entry, idx, 'coastlines');
  });

  (data.beaches || []).forEach((entry, idx) => {
    const poly = entry?.polygon;
    if (!Array.isArray(poly) || poly.length < 3) {
      errors.push(`beaches[${idx}] polygon must have >= 3 points.`);
      return;
    }
    if (!poly.every(isFinitePoint)) {
      errors.push(`beaches[${idx}] polygon has invalid points.`);
      return;
    }
    const area = polygonArea(poly);
    if (Math.abs(area) < 0.001) {
      errors.push(`beaches[${idx}] polygon area is near zero.`);
    } else if (area < 0) {
      warnings.push(`beaches[${idx}] polygon winding is clockwise.`);
    }
    validateCurves(entry, idx, 'beaches');
  });

  (data.sea || []).forEach((entry, idx) => {
    const poly = entry?.polygon;
    if (!Array.isArray(poly) || poly.length < 3) {
      errors.push(`sea[${idx}] polygon must have >= 3 points.`);
      return;
    }
    if (!poly.every(isFinitePoint)) {
      errors.push(`sea[${idx}] polygon has invalid points.`);
      return;
    }
    const area = polygonArea(poly);
    if (Math.abs(area) < 0.001) {
      errors.push(`sea[${idx}] polygon area is near zero.`);
    } else if (area < 0) {
      warnings.push(`sea[${idx}] polygon winding is clockwise.`);
    }
    validateCurves(entry, idx, 'sea');
  });

  (data.transit || []).forEach((entry, idx) => {
    if (!entry?.type && !entry?.kind) {
      errors.push(`transit[${idx}] type is required.`);
    }
    const line = entry?.polyline;
    if (!Array.isArray(line) || line.length < 2 || !line.every(isFinitePoint)) {
      errors.push(`transit[${idx}] polyline must have >= 2 valid points.`);
    }
    if (entry?.stations) {
      if (!Array.isArray(entry.stations) || !entry.stations.every(isFinitePoint)) {
        errors.push(`transit[${idx}] stations must be an array of points.`);
      }
    }
    const kind = normalizeLineType(entry?.kind ?? entry?.type);
    if (kind && !TRANSIT_TYPES.has(kind)) {
      warnings.push(`transit[${idx}] type "${entry.type ?? entry.kind}" is unknown.`);
    }
  });

  (data.roads || []).forEach((entry, idx) => {
    if (entry?.polygon) {
      const poly = entry.polygon;
      if (!Array.isArray(poly) || poly.length < 3 || !poly.every(isFinitePoint)) {
        errors.push(`roads[${idx}] polygon must have >= 3 valid points.`);
        return;
      }
      const area = polygonArea(poly);
      if (Math.abs(area) < 0.001) {
        errors.push(`roads[${idx}] polygon area is near zero.`);
      } else if (area < 0) {
        warnings.push(`roads[${idx}] polygon winding is clockwise.`);
      }
      validateCurves(entry, idx, 'roads');
    } else if (entry?.polyline) {
      const line = entry.polyline;
      if (!Array.isArray(line) || line.length < 2 || !line.every(isFinitePoint)) {
        errors.push(`roads[${idx}] polyline must have >= 2 valid points.`);
      }
      if (entry.type && typeof entry.type !== 'string') {
        errors.push(`roads[${idx}] type must be a string when provided.`);
      }
      if (entry.kind && typeof entry.kind !== 'string') {
        errors.push(`roads[${idx}] kind must be a string when provided.`);
      }
      if (entry.width !== undefined && !Number.isFinite(entry.width)) {
        errors.push(`roads[${idx}] width must be a number when provided.`);
      }
      const kind = normalizeLineType(entry.kind ?? entry.type);
      if (kind && !LINE_TYPES.has(kind)) {
        warnings.push(`roads[${idx}] kind "${entry.kind ?? entry.type}" is unknown.`);
      }
    } else {
      errors.push(`roads[${idx}] must define polygon or polyline.`);
    }
  });

  (data.zones || []).forEach((entry, idx) => {
    if (!entry?.typeCode || typeof entry.typeCode !== 'string') {
      errors.push(`zones[${idx}] typeCode is required.`);
    }
    const normalized = normalizeTypeCode(entry?.typeCode);
    if (normalized && !ALLOWED_TYPE_CODES.has(normalized)) {
      warnings.push(`zones[${idx}] typeCode "${entry.typeCode}" is unknown.`);
    }
    const poly = entry?.polygon;
    if (!Array.isArray(poly) || poly.length < 3 || !poly.every(isFinitePoint)) {
      errors.push(`zones[${idx}] polygon must have >= 3 valid points.`);
      return;
    }
    const area = polygonArea(poly);
    if (Math.abs(area) < 0.001) {
      errors.push(`zones[${idx}] polygon area is near zero.`);
    } else if (area < 0) {
      warnings.push(`zones[${idx}] polygon winding is clockwise.`);
    }
    validateCurves(entry, idx, 'zones');
  });

  (data.buildings || []).forEach((entry, idx) => {
    if (!entry?.typeCode || typeof entry.typeCode !== 'string') {
      errors.push(`buildings[${idx}] typeCode is required.`);
    }
    const normalized = normalizeTypeCode(entry?.typeCode);
    if (normalized && !ALLOWED_TYPE_CODES.has(normalized)) {
      warnings.push(`buildings[${idx}] typeCode "${entry.typeCode}" is unknown.`);
    }
    const poly = entry?.polygon;
    if (!Array.isArray(poly) || poly.length < 3 || !poly.every(isFinitePoint)) {
      errors.push(`buildings[${idx}] polygon must have >= 3 valid points.`);
      return;
    }
    const area = polygonArea(poly);
    if (Math.abs(area) < 0.001) {
      errors.push(`buildings[${idx}] polygon area is near zero.`);
    } else if (area < 0) {
      warnings.push(`buildings[${idx}] polygon winding is clockwise.`);
    }
    validateCurves(entry, idx, 'buildings');
  });

  (data.pois || []).forEach((entry, idx) => {
    if (!entry?.type || typeof entry.type !== 'string') {
      errors.push(`pois[${idx}] type is required.`);
    }
    if (!entry?.position || !isFinitePoint(entry.position)) {
      errors.push(`pois[${idx}] position must be [x, z].`);
    }
  });

  if (errors.length === 0 && warnings.length === 0) warnings.push('OK');
  return { ok: errors.length === 0, errors, warnings };
}
