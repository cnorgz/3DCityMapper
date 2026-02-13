export function createEditorGestures(deps) {
  const {
    document,
    window,
    renderer,
    getViewMode,
    perspCamera,
    controls
  } = deps || {};

  function setup() {
    const joystick = document.getElementById('joystick');
    const joystickKnob = document.getElementById('joystickKnob');
    let joystickActive = false;
    let joystickOrigin = { x: 0, y: 0 };

    if (joystick && joystickKnob) {
      joystick.addEventListener('touchstart', (e) => {
        joystickActive = true;
        const rect = joystick.getBoundingClientRect();
        joystickOrigin = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };
        e.preventDefault();
      });

      joystick.addEventListener('touchmove', (e) => {
        if (!joystickActive) return;
        const touch = e.touches[0];
        const dx = touch.clientX - joystickOrigin.x;
        const dy = touch.clientY - joystickOrigin.y;
        const maxDist = 35;
        const dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxDist);
        const angle = Math.atan2(dy, dx);

        const kx = Math.cos(angle) * dist;
        const ky = Math.sin(angle) * dist;

        joystickKnob.style.transform = `translate(calc(-50% + ${kx}px), calc(-50% + ${ky}px))`;

        if (getViewMode() === '3d' || getViewMode() === 'street') {
          const moveSpeed = 2;
          const dxWorld = (kx / maxDist) * moveSpeed;
          const dzWorld = (ky / maxDist) * moveSpeed;
          perspCamera.position.x += dxWorld;
          perspCamera.position.z += dzWorld;
          controls.target.x += dxWorld;
          controls.target.z += dzWorld;
        }
        e.preventDefault();
      });

      joystick.addEventListener('touchend', () => {
        joystickActive = false;
        joystickKnob.style.transform = 'translate(-50%, -50%)';
      });
    }

    const zoomIn = document.getElementById('zoomIn');
    const zoomOut = document.getElementById('zoomOut');
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;

    if (!isCoarse && zoomIn && zoomOut) {
      zoomIn.addEventListener('click', () => {
        if (getViewMode() === '3d' || getViewMode() === 'street') {
          perspCamera.position.y = Math.max(50, perspCamera.position.y - 50);
          perspCamera.fov = Math.max(30, perspCamera.fov - 5);
          perspCamera.updateProjectionMatrix();
        }
      });

      zoomOut.addEventListener('click', () => {
        if (getViewMode() === '3d' || getViewMode() === 'street') {
          perspCamera.position.y = Math.min(800, perspCamera.position.y + 50);
          perspCamera.fov = Math.min(90, perspCamera.fov + 5);
          perspCamera.updateProjectionMatrix();
        }
      });
    }

    let touchStartDist = 0;
    renderer.domElement.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        touchStartDist = Math.sqrt(dx * dx + dy * dy);
      }
    });

    renderer.domElement.addEventListener('touchmove', (e) => {
      if (e.touches.length === 2 && getViewMode() !== 'plan') {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const delta = dist - touchStartDist;

        perspCamera.position.y -= delta * 0.5;
        perspCamera.position.y = Math.max(50, Math.min(800, perspCamera.position.y));

        touchStartDist = dist;
        e.preventDefault();
      }
    });
  }

  return {
    setup
  };
}
