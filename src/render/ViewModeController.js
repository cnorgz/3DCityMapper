export function createViewModeController({
  getViewMode,
  setViewModeValue,
  cameras,
  controls,
  applyFidelityMode,
  updateOverlayVisibility,
  updateEditorStatus,
  editorState,
  editorGroup,
  setCityLayerVisibility
}) {
  function setViewMode(mode) {
    if (getViewMode() === 'fidelity' && mode !== 'fidelity') {
      applyFidelityMode(false);
    }
    setViewModeValue(mode);

    ['btnPlan', 'btn3D', 'btnStreet', 'btnFidelity'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('active');
    });

    switch (mode) {
      case 'plan':
        cameras.setActiveCamera(cameras.orthoCamera);
        controls.enabled = false;
        document.getElementById('btnPlan').classList.add('active');
        break;
      case '3d':
        cameras.setActiveCamera(cameras.perspCamera);
        controls.enabled = true;
        cameras.perspCamera.position.set(-600, 400, 600);
        controls.target.set(0, 0, 0);
        controls.update();
        document.getElementById('btn3D').classList.add('active');
        break;
      case 'street':
        cameras.setActiveCamera(cameras.perspCamera);
        controls.enabled = true;
        cameras.perspCamera.position.set(0, 30, 200);
        controls.target.set(0, 20, 0);
        controls.update();
        document.getElementById('btnStreet').classList.add('active');
        break;
      case 'fidelity':
        cameras.setActiveCamera(cameras.orthoCamera);
        controls.enabled = false;
        applyFidelityMode(true);
        document.getElementById('btnFidelity').classList.add('active');
        break;
    }

    updateOverlayVisibility();
    if (editorState.enabled) {
      updateEditorStatus(mode === 'fidelity' ? 'Editor ready.' : 'Editor paused (switch to Fidelity Mode).');
    }
    if (editorGroup) editorGroup.visible = editorState.enabled && mode === 'fidelity';
    setCityLayerVisibility();
  }

  return {
    setViewMode,
    getViewMode
  };
}
