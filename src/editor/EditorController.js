export function createEditorController(deps) {
  const {
    editorState,
    trafficRuntime,
    PERSIST_KEYS,
    getItem,
    setItem,
    getBlueprintData,
    setBlueprintData,
    blueprintModel,
    normalizeBlueprintData,
    pushEditorHistory,
    snapshotEditorState,
    buildBlueprintFromData,
    rebuildBlueprintCity,
    rebuildBlueprintTraffic,
    updateEditorStatus,
    ensureEditorGroups,
    getEditorGroup,
    getViewMode,
    updateEditorUIState,
    initTrafficPanel,
    syncTrafficPanel,
    updateDraftLine,
    updateDraftMarkers,
    updateSelectionMarkers,
    clearJunctionMode,
    getSelectedEntry,
    getLegendInfo,
    hideEditorLines,
    setBlueprintStatus,
    applyEditorZoom,
    applyHandleScale,
    deleteSelection,
    setCityLayerVisibility,
    undoEditor,
    redoEditor
  } = deps || {};

  function addPoiAt(point) {
    let data = getBlueprintData();
    if (!data) {
      data = blueprintModel.createBlank();
      setBlueprintData(data);
    }
    pushEditorHistory(snapshotEditorState());
    const id = `poi-${Date.now()}`;
    blueprintModel.addFeature('pois', { id, type: editorState.poiType, position: [point.x, point.z] });
    buildBlueprintFromData(data);
    rebuildBlueprintCity();
    updateEditorStatus('POI added.');
  }

  function setupEditorControls() {
    const enableToggle = document.getElementById('editorEnable');
    const undoBtn = document.getElementById('editorUndo');
    const redoBtn = document.getElementById('editorRedo');
    const toolSelect = document.getElementById('editorTool');
    const layerSelect = document.getElementById('editorLayer');
    const typeSelect = document.getElementById('editorTypeCode');
    const poiSelect = document.getElementById('editorPoiType');
    const transitSelect = document.getElementById('editorTransitType');
    const junctionToggle = document.getElementById('editorJunctionMode');
    const junctionSplitToggle = document.getElementById('editorJunctionAutoSplit');
    const debugOffsetsToggle = document.getElementById('editorDebugRoadOffsets');
    const heightRange = document.getElementById('editorHeightRange');
    const heightValue = document.getElementById('editorHeightValue');
    const heightApply = document.getElementById('editorHeightApply');
    const snapGridToggle = document.getElementById('editorSnapGrid');
    const snapPixelToggle = document.getElementById('editorSnapPixels');
    const pixelStepInput = document.getElementById('editorPixelStep');
    const zoomSlider = document.getElementById('editorZoom');
    const zoomValue = document.getElementById('editorZoomValue');
    const handleScaleSlider = document.getElementById('editorHandleScale');
    const handleScaleValue = document.getElementById('editorHandleScaleValue');
    const deleteBtn = document.getElementById('editorDelete');
    const clearBtn = document.getElementById('editorClear');
    const hideCityToggle = document.getElementById('editorHideCity');

    if (!enableToggle) return;

    try {
      const storedSnapGrid = getItem(PERSIST_KEYS.editorSnapGrid);
      if (typeof storedSnapGrid === 'boolean') editorState.snapGrid = storedSnapGrid;
      const storedSnapPixels = getItem(PERSIST_KEYS.editorSnapPixels);
      if (typeof storedSnapPixels === 'boolean') editorState.snapPixels = storedSnapPixels;
      const storedPixelStep = getItem(PERSIST_KEYS.editorPixelStep);
      if (Number.isFinite(storedPixelStep)) editorState.pixelStep = storedPixelStep;
      const storedMaxCars = getItem(PERSIST_KEYS.trafficMaxCars);
      if (Number.isFinite(storedMaxCars)) {
        trafficRuntime.maxCars = Math.max(0, Math.min(40, Number.parseInt(storedMaxCars, 10) || 0));
      }
      const storedSpeedScale = getItem(PERSIST_KEYS.trafficSpeedScale);
      if (Number.isFinite(storedSpeedScale)) {
        trafficRuntime.speedScale = Math.max(0.2, Math.min(3, Number.parseFloat(storedSpeedScale) || 1));
      }
    } catch (e) {
      // ignore persistence load errors
    }

    enableToggle.checked = editorState.enabled;
    enableToggle.addEventListener('change', (e) => {
      editorState.enabled = !!e.target.checked;
      ensureEditorGroups();
      const editorGroup = getEditorGroup();
      if (editorGroup) editorGroup.visible = editorState.enabled && getViewMode() === 'fidelity';
      if (editorState.enabled && getViewMode() !== 'fidelity') {
        updateEditorStatus('Editor enabled (switch to Fidelity Mode).');
      } else {
        updateEditorStatus(editorState.enabled ? 'Editor enabled.' : 'Editor disabled.');
      }
      updateEditorUIState();
    });

    if (undoBtn) undoBtn.addEventListener('click', undoEditor);
    if (redoBtn) redoBtn.addEventListener('click', redoEditor);

    if (toolSelect) {
      toolSelect.addEventListener('change', (e) => {
        editorState.tool = e.target.value;
        if (editorState.tool === 'polygon' || editorState.tool === 'polyline') {
          editorState.selected = null;
          updateSelectionMarkers();
        }
        if (editorState.tool !== 'polygon' && editorState.tool !== 'polyline') {
          editorState.draft = [];
          editorState.previewPoint = null;
          updateDraftLine();
        }
        clearJunctionMode();
        updateEditorUIState();
        updateDraftMarkers();
        updateEditorStatus(`Tool: ${editorState.tool}`);
      });
    }

    if (layerSelect) {
      layerSelect.addEventListener('change', (e) => {
        editorState.targetLayer = e.target.value;
        if (editorState.targetLayer === 'transit') {
          editorState.tool = 'polyline';
        }
        updateEditorUIState();
        updateDraftLine();
        updateDraftMarkers();
      });
    }

    if (typeSelect) {
      typeSelect.addEventListener('change', (e) => {
        editorState.typeCode = e.target.value;
        updateDraftLine();
        updateSelectionMarkers();
      });
    }

    if (poiSelect) {
      poiSelect.addEventListener('change', (e) => {
        editorState.poiType = e.target.value;
      });
    }

    if (transitSelect) {
      transitSelect.addEventListener('change', (e) => {
        editorState.transitType = e.target.value;
        updateDraftLine();
        updateSelectionMarkers();
      });
    }

    if (junctionToggle) {
      junctionToggle.checked = editorState.junctionInsertMode;
      junctionToggle.addEventListener('change', (e) => {
        editorState.junctionInsertMode = !!e.target.checked;
        updateEditorStatus(editorState.junctionInsertMode ? 'Junction mode enabled.' : 'Junction mode disabled.');
      });
    }
    if (junctionSplitToggle) {
      junctionSplitToggle.checked = editorState.junctionAutoSplit;
      junctionSplitToggle.addEventListener('change', (e) => {
        editorState.junctionAutoSplit = !!e.target.checked;
      });
    }
    if (debugOffsetsToggle) {
      debugOffsetsToggle.checked = editorState.debugRoadOffsets;
      debugOffsetsToggle.addEventListener('change', (e) => {
        editorState.debugRoadOffsets = !!e.target.checked;
        buildBlueprintFromData(getBlueprintData() || normalizeBlueprintData({}));
      });
    }

    if (typeof initTrafficPanel === 'function') initTrafficPanel();
    if (typeof syncTrafficPanel === 'function') syncTrafficPanel();

    if (heightRange && heightValue) {
      heightRange.addEventListener('input', (e) => {
        heightValue.value = e.target.value;
      });
      heightValue.addEventListener('input', (e) => {
        heightRange.value = e.target.value;
      });
    }

    if (heightApply) {
      heightApply.addEventListener('click', () => {
        const selected = getSelectedEntry();
        if (!selected || selected.layer !== 'buildings') return;
        const info = getLegendInfo(selected.entry.typeCode);
        if (!info.buildable) return;
        const height = Math.max(0, Math.min(2000, Number.parseFloat(heightValue?.value)));
        if (!Number.isFinite(height)) return;
        pushEditorHistory(snapshotEditorState());
        selected.entry.height = height;
        selected.entry.heightMeters = height;
        const data = getBlueprintData();
        buildBlueprintFromData(data);
        rebuildBlueprintCity();
        updateSelectionMarkers();
        updateEditorStatus(`Height set to ${Math.round(height)}m.`);
      });
    }

    if (snapGridToggle) {
      snapGridToggle.addEventListener('change', (e) => {
        editorState.snapGrid = !!e.target.checked;
        try {
          setItem(PERSIST_KEYS.editorSnapGrid, editorState.snapGrid);
        } catch (e) {
          // ignore persistence errors
        }
      });
    }

    if (snapPixelToggle) {
      snapPixelToggle.addEventListener('change', (e) => {
        editorState.snapPixels = !!e.target.checked;
        try {
          setItem(PERSIST_KEYS.editorSnapPixels, editorState.snapPixels);
        } catch (e) {
          // ignore persistence errors
        }
      });
    }

    if (pixelStepInput) {
      pixelStepInput.addEventListener('input', (e) => {
        editorState.pixelStep = Number.parseFloat(e.target.value) || 1;
        try {
          setItem(PERSIST_KEYS.editorPixelStep, editorState.pixelStep);
        } catch (e) {
          // ignore persistence errors
        }
      });
    }

    const bindLinkedNumber = (slider, input, onChange) => {
      if (!slider || !input) return;
      const apply = (value) => {
        slider.value = value;
        input.value = value;
        onChange(value);
      };
      slider.addEventListener('input', (e) => apply(e.target.value));
      input.addEventListener('input', (e) => apply(e.target.value));
    };

    bindLinkedNumber(zoomSlider, zoomValue, (value) => applyEditorZoom(value));
    bindLinkedNumber(handleScaleSlider, handleScaleValue, (value) => applyHandleScale(value));

    if (deleteBtn) deleteBtn.addEventListener('click', deleteSelection);

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        pushEditorHistory(snapshotEditorState());
        const next = blueprintModel.createBlank();
        setBlueprintData(next);
        editorState.draft = [];
        editorState.previewPoint = null;
        clearJunctionMode();
        editorState.selected = null;
        editorState.hover = null;
        editorState.hoverDraftIndex = null;
        buildBlueprintFromData(next);
        rebuildBlueprintCity();
        updateDraftLine();
        updateDraftMarkers();
        updateSelectionMarkers();
        hideEditorLines();
        updateEditorStatus('Cleared all blueprint shapes.');
        setBlueprintStatus('Blueprint status: cleared in memory.');
      });
    }

    if (hideCityToggle) {
      hideCityToggle.checked = editorState.hideCity;
      hideCityToggle.addEventListener('change', (e) => {
        editorState.hideCity = !!e.target.checked;
        setCityLayerVisibility();
      });
    }

    updateDraftMarkers();
    updateEditorUIState();
    applyEditorZoom(editorState.mapZoom);
    applyHandleScale(editorState.handleScale);
  }

  return {
    addPoiAt,
    setupEditorControls
  };
}
