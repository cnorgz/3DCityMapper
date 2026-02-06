export function createEditorHistoryManager(deps) {
  const {
    getBlueprintData,
    setBlueprintData,
    blueprintModel,
    editorState,
    editorHistory,
    normalizeBlueprintData,
    clearJunctionMode,
    buildBlueprintFromData,
    rebuildBlueprintCity,
    updateDraftLine,
    updateDraftMarkers,
    updateSelectionMarkers,
    updateEditorStatus
  } = deps || {};

  function cloneBlueprintData(data) {
    const fallback = normalizeBlueprintData({});
    if (!data) return fallback;
    try {
      return JSON.parse(JSON.stringify(data));
    } catch (e) {
      console.warn('Blueprint clone failed, resetting.', e);
      return fallback;
    }
  }

  function snapshotEditorState() {
    return {
      blueprint: cloneBlueprintData(getBlueprintData()),
      selected: editorState.selected ? { ...editorState.selected } : null
    };
  }

  function pushEditorHistory(snapshot) {
    if (!snapshot) return;
    editorHistory.undo.push(snapshot);
    if (editorHistory.undo.length > editorHistory.limit) {
      editorHistory.undo.shift();
    }
    editorHistory.redo = [];
  }

  function applyEditorSnapshot(snapshot, label) {
    blueprintModel.applySnapshot(snapshot?.blueprint || {});
    const nextBlueprint = blueprintModel.getData();
    setBlueprintData(nextBlueprint);
    editorState.draft = [];
    editorState.previewPoint = null;
    clearJunctionMode();
    editorState.hover = null;
    editorState.hoverDraftIndex = null;
    if (
      snapshot?.selected &&
      nextBlueprint?.[snapshot.selected.layer]?.[snapshot.selected.index]
    ) {
      editorState.selected = { ...snapshot.selected };
    } else {
      editorState.selected = null;
    }
    buildBlueprintFromData(nextBlueprint);
    rebuildBlueprintCity();
    updateDraftLine();
    updateDraftMarkers();
    updateSelectionMarkers();
    updateEditorStatus(label || 'History applied.');
  }

  function undoEditor() {
    if (editorHistory.undo.length === 0) {
      updateEditorStatus('Undo: nothing to undo.');
      return;
    }
    const current = snapshotEditorState();
    const snapshot = editorHistory.undo.pop();
    editorHistory.redo.push(current);
    applyEditorSnapshot(snapshot, 'Undo.');
  }

  function redoEditor() {
    if (editorHistory.redo.length === 0) {
      updateEditorStatus('Redo: nothing to redo.');
      return;
    }
    const current = snapshotEditorState();
    const snapshot = editorHistory.redo.pop();
    editorHistory.undo.push(current);
    applyEditorSnapshot(snapshot, 'Redo.');
  }

  return {
    cloneBlueprintData,
    snapshotEditorState,
    pushEditorHistory,
    applyEditorSnapshot,
    undoEditor,
    redoEditor
  };
}
