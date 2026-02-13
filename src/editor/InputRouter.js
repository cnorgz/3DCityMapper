export function createEditorInputRouter(deps) {
  const {
    renderer,
    editorActive,
    getActiveCamera,
    orthoCamera,
    canPanMap,
    panState,
    getPointerMapPoint,
    snapMapPoint,
    getEditorMode,
    isDoubleClick,
    findNearestDraftVertex,
    findNearestVertex,
    getSelectedEntry,
    findNearestVertexInEntry,
    findNearestEdgeInEntry,
    pointInPolygon,
    handleEditorPointerDown,
    applyPanDelta,
    editorState,
    updateDraftLine,
    updateEditorHover,
    findNearestLineEndpoint,
    findNearestLineVertex,
    findNearestLineEdge,
    getEditorHitRadius,
    getBlueprintData,
    scheduleEditorRebuild,
    pushEditorHistory,
    clearJunctionMode,
    updateDraftMarkers,
    updateEditorStatus,
    addPolygonFromDraft,
    addPolylineFromDraft,
    deleteSelection,
    undoEditor,
    redoEditor
  } = deps || {};

  function bindEditorEvents() {
    renderer.domElement.style.touchAction = 'none';
    renderer.domElement.addEventListener('pointerdown', (e) => {
      if (!editorActive()) return;
      if (e.button !== 0) return;

      if (getActiveCamera() === orthoCamera && e.pointerType === 'touch') {
        panState.touchPoints.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (panState.touchPoints.size >= 2 && canPanMap()) {
          panState.active = true;
          panState.isTouch = true;
          panState.pending = false;
          const pts = Array.from(panState.touchPoints.values());
          panState.lastX = (pts[0].x + pts[1].x) / 2;
          panState.lastY = (pts[0].y + pts[1].y) / 2;
          renderer.domElement.setPointerCapture(e.pointerId);
          return;
        }
      }

      const mapPoint = getPointerMapPoint(e);
      if (!mapPoint) return;
      const snapped = snapMapPoint(mapPoint);
      const mode = getEditorMode();
      const doubleClick = isDoubleClick(snapped);

      const canMousePan = (getActiveCamera() === orthoCamera && canPanMap() && e.pointerType === 'mouse');
      let immediateDrag = false;
      if (mode === 'draw-polygon' || mode === 'draw-polyline') {
        immediateDrag = !!findNearestDraftVertex(snapped, 10);
      } else if (mode === 'edit') {
        const selected = getSelectedEntry();
        if (selected) {
          immediateDrag = !!findNearestVertexInEntry(selected.entry, snapped, 10);
          if (!immediateDrag) immediateDrag = !!findNearestEdgeInEntry(selected.entry, snapped, 12);
          if (!immediateDrag && selected.entry.polygon) {
            immediateDrag = pointInPolygon(snapped.x, snapped.z, selected.entry.polygon);
          }
        }
      } else if (mode === 'select') {
        immediateDrag = !!findNearestVertex(snapped, 12);
      }

      if (canMousePan && !immediateDrag) {
        panState.pending = true;
        panState.active = false;
        panState.isTouch = false;
        panState.pointerId = e.pointerId;
        panState.lastX = e.clientX;
        panState.lastY = e.clientY;
        panState.deferredAction = { snapped, mapPoint, mode, doubleClick };
        renderer.domElement.setPointerCapture(e.pointerId);
        return;
      }

      handleEditorPointerDown(snapped, mapPoint, mode, doubleClick);
    });

    renderer.domElement.addEventListener('pointermove', (e) => {
      if (!editorActive()) return;

      if (getActiveCamera() === orthoCamera && e.pointerType === 'touch') {
        if (panState.touchPoints.has(e.pointerId)) {
          panState.touchPoints.set(e.pointerId, { x: e.clientX, y: e.clientY });
        }
        if (panState.active && panState.isTouch && panState.touchPoints.size >= 2) {
          const pts = Array.from(panState.touchPoints.values());
          const cx = (pts[0].x + pts[1].x) / 2;
          const cy = (pts[0].y + pts[1].y) / 2;
          const dx = cx - panState.lastX;
          const dy = cy - panState.lastY;
          panState.lastX = cx;
          panState.lastY = cy;
          applyPanDelta(dx, dy);
          return;
        }
      }

      if (panState.pending && e.pointerType === 'mouse' && e.pointerId === panState.pointerId) {
        const dx = e.clientX - panState.lastX;
        const dy = e.clientY - panState.lastY;
        if (Math.hypot(dx, dy) > 3) {
          panState.active = true;
          panState.pending = false;
        }
      }
      if (panState.active && !panState.isTouch && e.pointerId === panState.pointerId) {
        const dx = e.clientX - panState.lastX;
        const dy = e.clientY - panState.lastY;
        panState.lastX = e.clientX;
        panState.lastY = e.clientY;
        applyPanDelta(dx, dy);
        return;
      }

      const mapPoint = getPointerMapPoint(e);
      if (!mapPoint) return;
      const snapped = snapMapPoint(mapPoint);
      const mode = getEditorMode();

      if (!editorState.dragging) {
        if (mode === 'draw-polygon' || mode === 'draw-polyline') {
          if (editorState.draft.length > 0) {
            if (mode === 'draw-polyline') {
              const endpointHit = findNearestLineEndpoint(mapPoint, getEditorHitRadius(16));
              const vertexHit = findNearestLineVertex(mapPoint, getEditorHitRadius(16));
              const edgeHit = findNearestLineEdge(mapPoint, getEditorHitRadius(12));
              const draftStart = editorState.draft[0];
              const dxStart = draftStart ? (mapPoint.x - draftStart[0]) : 0;
              const dzStart = draftStart ? (mapPoint.z - draftStart[1]) : 0;
              const closeStart = draftStart && (dxStart * dxStart + dzStart * dzStart) <= getEditorHitRadius(14) * getEditorHitRadius(14);
              if (closeStart) {
                editorState.previewPoint = [draftStart[0], draftStart[1]];
              } else if (vertexHit) {
                editorState.previewPoint = [vertexHit.point[0], vertexHit.point[1]];
              } else if (endpointHit) {
                editorState.previewPoint = [endpointHit.point[0], endpointHit.point[1]];
              } else if (edgeHit) {
                editorState.previewPoint = [edgeHit.point.x, edgeHit.point.z];
              } else {
                editorState.previewPoint = [snapped.x, snapped.z];
              }
            } else {
              editorState.previewPoint = [snapped.x, snapped.z];
            }
          } else {
            editorState.previewPoint = null;
          }
          updateDraftLine();
        }
        updateEditorHover(snapped);
        return;
      }

      if (editorState.dragging.mode === 'draft') {
        const idx = editorState.dragging.index;
        if (editorState.draft[idx]) {
          editorState.draft[idx] = [snapped.x, snapped.z];
          updateDraftLine();
          updateDraftMarkers();
        }
        return;
      }

      if (!editorState.selected) return;
      const { layer, index, vertexIndex } = editorState.selected;
      const list = getBlueprintData()?.[layer];
      if (!list || !list[index]) return;
      const entry = list[index];

      if (editorState.dragging.mode === 'vertex' && vertexIndex !== null) {
        let target = snapped;
        if (entry.polyline) {
          const endpointHit = findNearestLineEndpoint(mapPoint, getEditorHitRadius(14));
          if (endpointHit &&
            !(endpointHit.index === index && endpointHit.vertexIndex === vertexIndex)) {
            target = { x: endpointHit.point[0], z: endpointHit.point[1] };
          }
        }
        if (entry.polyline) {
          entry.polyline[vertexIndex] = [target.x, target.z];
        } else if (entry.polygon) {
          entry.polygon[vertexIndex] = [target.x, target.z];
        }
        editorState.dragging.didMove = true;
      } else if (editorState.dragging.mode === 'polygon' && editorState.dragging.original) {
        const dx = snapped.x - editorState.dragging.start.x;
        const dz = snapped.z - editorState.dragging.start.z;
        const moved = editorState.dragging.original.map(p => [p[0] + dx, p[1] + dz]);
        if (editorState.dragging.isPolyline) {
          entry.polyline = moved;
        } else {
          entry.polygon = moved;
          if (Array.isArray(entry.curves)) {
            entry.curves = editorState.dragging.curves || entry.curves;
          }
        }
        editorState.dragging.didMove = true;
      }
      scheduleEditorRebuild();
    });

    renderer.domElement.addEventListener('pointerup', (e) => {
      if (e.pointerType === 'touch') {
        panState.touchPoints.delete(e.pointerId);
        if (panState.touchPoints.size < 2) {
          panState.active = false;
          panState.isTouch = false;
        }
      }
      if (panState.pending && e.pointerId === panState.pointerId) {
        panState.pending = false;
        panState.active = false;
        panState.pointerId = null;
        const deferred = panState.deferredAction;
        panState.deferredAction = null;
        if (deferred) {
          handleEditorPointerDown(deferred.snapped, deferred.mapPoint, deferred.mode, deferred.doubleClick);
        }
      }
      if (panState.active && !panState.isTouch && e.pointerId === panState.pointerId) {
        panState.active = false;
        panState.pointerId = null;
      }
      if (editorState.dragging?.historySnapshot &&
        editorState.dragging.didMove &&
        !editorState.dragging.historyPushed) {
        pushEditorHistory(editorState.dragging.historySnapshot);
      }
      if (editorState.dragging?.didMove) {
        scheduleEditorRebuild();
      }
      editorState.dragging = null;
    });

    renderer.domElement.addEventListener('pointercancel', (e) => {
      if (e.pointerType === 'touch') {
        panState.touchPoints.delete(e.pointerId);
        if (panState.touchPoints.size < 2) {
          panState.active = false;
          panState.isTouch = false;
        }
      }
      if (panState.pointerId === e.pointerId) {
        panState.pending = false;
        panState.active = false;
        panState.pointerId = null;
        panState.deferredAction = null;
      }
    });

    window.addEventListener('keydown', (e) => {
      if (!editorActive()) return;
      const activeEl = document.activeElement;
      const isTextInput = activeEl &&
        (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable);
      if (!isTextInput && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          redoEditor();
        } else {
          undoEditor();
        }
        return;
      }
      if (!isTextInput && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redoEditor();
        return;
      }
      if (e.key === 'Enter') {
        if (editorState.tool === 'polygon') addPolygonFromDraft();
        if (editorState.tool === 'polyline') addPolylineFromDraft();
      } else if (e.key === 'Escape') {
        editorState.draft = [];
        editorState.previewPoint = null;
        clearJunctionMode();
        updateDraftLine();
        updateDraftMarkers();
        updateEditorStatus('Draft cancelled.');
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        const mode = getEditorMode();
        if (mode === 'draw-polygon' || mode === 'draw-polyline') {
          if (editorState.draft.length > 0) {
            if (editorState.hoverDraftIndex !== null) {
              editorState.draft.splice(editorState.hoverDraftIndex, 1);
              editorState.hoverDraftIndex = null;
            } else {
              editorState.draft.pop();
            }
            editorState.previewPoint = null;
            if (editorState.draft.length === 0) {
              clearJunctionMode();
            }
            updateDraftLine();
            updateDraftMarkers();
            updateEditorStatus(`Draft points: ${editorState.draft.length}`);
          }
        } else {
          deleteSelection();
        }
      }
    });
  }

  return {
    bindEditorEvents
  };
}
