export function createRenderLoop({
  renderer,
  scene,
  cameras,
  controls,
  getViewMode,
  getAnimationEnabled,
  renderFps,
  keyState,
  animateWater,
  animateCars,
  animateBlueprintTraffic,
  getWindmillsGroup,
  getFerrisWheelRef,
  warningLights,
  marqueeLights,
  getPerfLogging
}) {
  let lastT = performance.now();
  let lastRenderTime = 0;

  function tick() {
    requestAnimationFrame(tick);

    const now = performance.now();
    const viewMode = getViewMode();
    const isRealtime = (viewMode === '3d' || viewMode === 'street');
    const targetFps = isRealtime
      ? (getAnimationEnabled() ? renderFps.realtime : renderFps.realtimeIdle)
      : (getAnimationEnabled() ? renderFps.idle : renderFps.idleNoAnim);
    const minFrameMs = 1000 / targetFps;
    if (now - lastRenderTime < minFrameMs) return;
    lastRenderTime = now;

    const dt = Math.min(0.05, (now - lastT) / 1000);
    lastT = now;
    const time = now * 0.001;

    const animActive = getAnimationEnabled() && isRealtime;

    if (viewMode === '3d' || viewMode === 'street') {
      let dx = 0, dz = 0;
      if (keyState.ArrowLeft) dx -= 1;
      if (keyState.ArrowRight) dx += 1;
      if (keyState.ArrowUp) dz -= 1;
      if (keyState.ArrowDown) dz += 1;

      if (dx || dz) {
        const len = Math.hypot(dx, dz) || 1;
        dx /= len; dz /= len;

        const speed = 220;
        const yaw = controls.getAzimuthalAngle();
        const cos = Math.cos(yaw), sin = Math.sin(yaw);

        const mx = (dx * cos - dz * sin) * speed * dt;
        const mz = (dx * sin + dz * cos) * speed * dt;

        cameras.perspCamera.position.x += mx;
        cameras.perspCamera.position.z += mz;
        controls.target.x += mx;
        controls.target.z += mz;
      }
    }

    if (animActive) {
      animateWater(time);
      animateCars();
      animateBlueprintTraffic(dt);

      const windmillsGroup = getWindmillsGroup();
      if (windmillsGroup) {
        windmillsGroup.children.forEach(windmill => {
          if (windmill.userData.blades) {
            windmill.userData.blades.rotation.z =
              time * windmill.userData.rotationSpeed * 10 + windmill.userData.rotationOffset;
          }
        });
      }

      const ferrisWheelRef = getFerrisWheelRef();
      if (ferrisWheelRef && ferrisWheelRef.userData.wheel) {
        ferrisWheelRef.userData.wheel.rotation.y += 0.003;
        ferrisWheelRef.userData.wheel.children.forEach(child => {
          if (child.userData.baseAngle !== undefined) {
            child.rotation.x = -ferrisWheelRef.userData.wheel.rotation.y;
          }
        });
      }

      warningLights.forEach(obj => {
        const blink = Math.sin(time * 3) > 0;
        obj.material.emissiveIntensity = blink ? 2 : 0.2;
      });
      marqueeLights.forEach(obj => {
        const twinkle = Math.sin(time * 5 + obj.position.x) > 0.3;
        obj.material.emissiveIntensity = twinkle ? 1 : 0.3;
      });
    }

    if (controls.enabled) {
      controls.update();
    }

    renderer.render(scene, cameras.getActiveCamera());
  }

  function start() {
    tick();
    if (getPerfLogging && getPerfLogging()) {
      setInterval(() => {
        console.log('drawCalls:', renderer.info.render.calls, 'tris:', renderer.info.render.triangles);
      }, 1000);
    }
  }

  return { start };
}
