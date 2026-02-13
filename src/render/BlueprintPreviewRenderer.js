export function createBlueprintPreviewGroups({ THREE, mapOverlayGroup }) {
  const outline = new THREE.Group();
  outline.name = 'BlueprintOutlines';
  mapOverlayGroup.add(outline);

  const meshes = new THREE.Group();
  meshes.name = 'BlueprintMeshes';
  mapOverlayGroup.add(meshes);

  const labels = new THREE.Group();
  labels.name = 'BlueprintLabels';
  mapOverlayGroup.add(labels);

  const centerlines = new THREE.Group();
  centerlines.name = 'RoadCenterlines';
  mapOverlayGroup.add(centerlines);

  const offsetDebug = new THREE.Group();
  offsetDebug.name = 'RoadOffsetDebug';
  mapOverlayGroup.add(offsetDebug);

  return {
    outline,
    meshes,
    labels,
    centerlines,
    offsetDebug
  };
}

function createLabelSprite(THREE, text) {
  const canvas = document.createElement('canvas');
  const size = 192;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = 'rgba(12, 16, 30, 0.8)';
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.38, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#64c8ff';
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 104px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, size / 2, size / 2 + 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.95, depthTest: false });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(46, 46, 1);
  sprite.renderOrder = 1000;
  return sprite;
}

function addBlueprintLabels({ THREE, data, groups, Y, normalizeTypeCode, centroidNorm }) {
  if (!groups.labels) return;
  const addLabel = (entry, yOffset) => {
    if (!entry?.polygon || !entry.typeCode) return;
    const code = normalizeTypeCode(entry.typeCode);
    const centroid = centroidNorm(entry.polygon);
    const sprite = createLabelSprite(THREE, code);
    sprite.position.set(centroid[0], Y.overlay + yOffset, centroid[1]);
    groups.labels.add(sprite);
  };

  (data.buildings || []).forEach(entry => addLabel(entry, 0.095));
}

export function clearBlueprintPreview({ resetGroup, groups }) {
  resetGroup(groups.outline);
  resetGroup(groups.meshes);
  if (groups.labels) resetGroup(groups.labels);
  if (groups.centerlines) resetGroup(groups.centerlines);
  if (groups.offsetDebug) resetGroup(groups.offsetDebug);
}

export function buildBlueprintPreview({
  THREE,
  data,
  groups,
  Y,
  COLORS,
  POI_COLORS,
  LEGEND_LINE_COLORS,
  TRANSIT_STYLES,
  blueprintPreviewSettings,
  editorState,
  ROAD_JOIN_SETTINGS,
  getRenderPolygonPoints,
  getRenderPolylinePoints,
  getLineKind,
  getRoadLineStyle,
  isTransitKind,
  computeOffsetRails,
  normalizeTypeCode,
  centroidNorm,
  updateDebugVisibility,
  resetGroup
}) {
  if (!data) return;
  if (!groups.outline || !groups.meshes) return;
  clearBlueprintPreview({ resetGroup, groups });

  const lineOpacity = blueprintPreviewSettings.opacity;
  const baseOutlineMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: lineOpacity });
  baseOutlineMat.depthTest = false;
  const landFillMat = new THREE.MeshBasicMaterial({
    color: COLORS.land,
    transparent: true,
    opacity: 0.18 * blueprintPreviewSettings.opacity,
    depthWrite: false,
    depthTest: false,
    side: THREE.DoubleSide
  });
  const beachFillMat = new THREE.MeshBasicMaterial({
    color: COLORS.beach,
    transparent: true,
    opacity: 0.18 * blueprintPreviewSettings.opacity,
    depthWrite: false,
    depthTest: false,
    side: THREE.DoubleSide
  });
  const seaFillMat = new THREE.MeshBasicMaterial({
    color: COLORS.sea,
    transparent: true,
    opacity: 0.16 * blueprintPreviewSettings.opacity,
    depthWrite: false,
    depthTest: false,
    side: THREE.DoubleSide
  });
  const roadFillMat = new THREE.MeshBasicMaterial({
    color: 0x222222,
    transparent: true,
    opacity: 0.22 * blueprintPreviewSettings.opacity,
    depthWrite: false,
    depthTest: false,
    side: THREE.DoubleSide
  });

  const makeShapeMesh = (points, material, y) => {
    if (!points || points.length < 3) return null;
    const shape = new THREE.Shape(points.map(p => new THREE.Vector2(p[0], p[1])));
    const geometry = new THREE.ShapeGeometry(shape);
    geometry.rotateX(Math.PI / 2);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = y;
    mesh.renderOrder = 997;
    return mesh;
  };

  const makeOutline = (points, color, y) => {
    if (!points || points.length < 2) return null;
    const pts = points.map(p => new THREE.Vector3(p[0], y, p[1]));
    const geometry = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = baseOutlineMat.clone();
    mat.color.setHex(color);
    const line = new THREE.LineLoop(geometry, mat);
    line.renderOrder = 999;
    return line;
  };

  (data.coastlines || []).forEach(entry => {
    const points = getRenderPolygonPoints(entry);
    const fillBase = Y.overlay + 0.02;
    const mesh = makeShapeMesh(points, landFillMat, fillBase);
    if (mesh) groups.meshes.add(mesh);
    const outline = makeOutline(points, 0x00f0ff, Y.overlay + 0.05);
    if (outline) groups.outline.add(outline);
  });

  (data.beaches || []).forEach(entry => {
    const points = getRenderPolygonPoints(entry);
    const mesh = makeShapeMesh(points, beachFillMat, Y.overlay + 0.019);
    if (mesh) groups.meshes.add(mesh);
    const outline = makeOutline(points, 0xffd27a, Y.overlay + 0.048);
    if (outline) groups.outline.add(outline);
  });

  (data.sea || []).forEach(entry => {
    const points = getRenderPolygonPoints(entry);
    const mesh = makeShapeMesh(points, seaFillMat, Y.overlay + 0.018);
    if (mesh) groups.meshes.add(mesh);
    const outline = makeOutline(points, 0x3aa6ff, Y.overlay + 0.047);
    if (outline) groups.outline.add(outline);
  });

  (data.roads || []).forEach(entry => {
    if (entry.polygon) {
      const points = getRenderPolygonPoints(entry);
      const fillBase = Y.overlay + 0.022;
      const mesh = makeShapeMesh(points, roadFillMat, fillBase);
      if (mesh) groups.meshes.add(mesh);
      const outline = makeOutline(points, 0xffffff, Y.overlay + 0.055);
      if (outline) groups.outline.add(outline);
      return;
    }
    const renderPoints = getRenderPolylinePoints(entry);
    if (!renderPoints || renderPoints.length < 2) return;
    const kind = getLineKind(entry);
    const style = getRoadLineStyle(kind);
    const width = Number.isFinite(entry.width) ? entry.width : style.width;
    if (editorState.debugRoadOffsets && !isTransitKind(kind) && groups.offsetDebug) {
      const rails = computeOffsetRails(renderPoints, width / 2, {
        roundSegments: ROAD_JOIN_SETTINGS.roundSegments,
        minAngle: ROAD_JOIN_SETTINGS.minAngle,
        maxAngle: ROAD_JOIN_SETTINGS.maxAngle
      });
      const leftPts = rails.left.map(p => new THREE.Vector3(p[0], Y.overlay + 0.09, p[1]));
      const rightPts = rails.right.map(p => new THREE.Vector3(p[0], Y.overlay + 0.09, p[1]));
      const leftGeom = new THREE.BufferGeometry().setFromPoints(leftPts);
      const rightGeom = new THREE.BufferGeometry().setFromPoints(rightPts);
      const leftMat = new THREE.LineBasicMaterial({ color: 0x44ff88, transparent: true, opacity: 0.9 });
      const rightMat = new THREE.LineBasicMaterial({ color: 0xff4dd2, transparent: true, opacity: 0.9 });
      const leftLine = new THREE.Line(leftGeom, leftMat);
      const rightLine = new THREE.Line(rightGeom, rightMat);
      leftLine.renderOrder = 1002;
      rightLine.renderOrder = 1002;
      groups.offsetDebug.add(leftLine);
      groups.offsetDebug.add(rightLine);

      const modeColor = (mode) => {
        if (mode === 'ROUND') return 0x55ff55;
        if (mode === 'STRAIGHT') return 0x66bbff;
        if (mode === 'SPLIT') return 0xff5a5a;
        if (mode === 'CAP') return 0xffd65a;
        return 0xffffff;
      };
      const dotGeo = new THREE.SphereGeometry(2.6, 10, 10);
      rails.center.forEach((pt, idx) => {
        const join = rails.joins[idx] || {};
        const color = modeColor(join.mode);
        const dot = new THREE.Mesh(dotGeo, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95, depthTest: false }));
        dot.position.set(pt[0], Y.overlay + 0.095, pt[1]);
        dot.renderOrder = 1004;
        groups.offsetDebug.add(dot);
      });
    }
    const pts = renderPoints.map(p => new THREE.Vector3(p[0], Y.overlay + 0.055, p[1]));
    const geometry = new THREE.BufferGeometry().setFromPoints(pts);
    let mat = null;
    if (isTransitKind(kind)) {
      const style = TRANSIT_STYLES[kind] || TRANSIT_STYLES.METRO;
      mat = new THREE.LineBasicMaterial({ color: style.color });
    } else {
      mat = new THREE.LineBasicMaterial({ color: style.outline, transparent: true, opacity: lineOpacity });
    }
    mat.depthTest = false;
    const line = new THREE.Line(geometry, mat);
    line.renderOrder = 999;
    groups.outline.add(line);

    if (kind === 'METRO') {
      const stations = Array.isArray(entry.stations)
        ? entry.stations
        : (data.pois || [])
          .filter(poi => poi.type === 'METRO_STATION')
          .map(poi => poi.position);
      const stationGeo = new THREE.SphereGeometry(3, 10, 10);
      stations.forEach((pos) => {
        if (!pos || pos.length < 2) return;
        const station = new THREE.Mesh(stationGeo, new THREE.MeshBasicMaterial({ color: TRANSIT_STYLES.METRO.color }));
        station.position.set(pos[0], Y.overlay + 0.06, pos[1]);
        groups.outline.add(station);
      });
    }
  });

  (data.buildings || []).forEach(entry => {
    const points = getRenderPolygonPoints(entry);
    const code = normalizeTypeCode(entry.typeCode);
    const color = LEGEND_LINE_COLORS[code] ?? 0xffffff;
    const zoneMat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.14 * blueprintPreviewSettings.opacity,
      depthWrite: false,
      depthTest: false,
      side: THREE.DoubleSide
    });
    const mesh = makeShapeMesh(points, zoneMat, Y.overlay + 0.024);
    if (mesh) groups.meshes.add(mesh);
    const outline = makeOutline(points, color, Y.overlay + 0.065);
    if (outline) groups.outline.add(outline);
  });

  (data.zones || []).forEach(entry => {
    const points = getRenderPolygonPoints(entry);
    const code = normalizeTypeCode(entry.typeCode);
    const color = LEGEND_LINE_COLORS[code] ?? 0xffffff;
    const zoneMat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.18 * blueprintPreviewSettings.opacity,
      depthWrite: false,
      depthTest: false,
      side: THREE.DoubleSide
    });
    const mesh = makeShapeMesh(points, zoneMat, Y.overlay + 0.023);
    if (mesh) groups.meshes.add(mesh);
    const outline = makeOutline(points, color, Y.overlay + 0.06);
    if (outline) groups.outline.add(outline);
  });

  const poiGeo = new THREE.SphereGeometry(4, 10, 10);
  (data.pois || []).forEach(entry => {
    if (!entry.position || entry.position.length < 2) return;
    const color = POI_COLORS[entry.type] ?? 0x00ff88;
    const marker = new THREE.Mesh(poiGeo, new THREE.MeshBasicMaterial({ color }));
    marker.position.set(entry.position[0], Y.overlay + 0.08, entry.position[1]);
    groups.meshes.add(marker);
  });

  if (blueprintPreviewSettings.showLabels) {
    addBlueprintLabels({ THREE, data, groups, Y, normalizeTypeCode, centroidNorm });
  }

  updateDebugVisibility();
}
