import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { MAP_HEIGHT } from '../config/constants.js';

export function createSceneManager({ container = document.body } = {}) {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const aspect = window.innerWidth / window.innerHeight;
  const frustumSize = MAP_HEIGHT * 1.1;

  const orthoCamera = new THREE.OrthographicCamera(
    -frustumSize * aspect / 2,
    frustumSize * aspect / 2,
    frustumSize / 2,
    -frustumSize / 2,
    1, 2000
  );
  orthoCamera.up.set(0, 0, -1);
  orthoCamera.position.set(0, 800, 1);
  orthoCamera.lookAt(0, 0, 0);

  const perspCamera = new THREE.PerspectiveCamera(60, aspect, 1, 5000);
  perspCamera.position.set(-600, 400, 600);
  perspCamera.lookAt(0, 0, 0);

  let activeCamera = orthoCamera;
  const setActiveCamera = (camera) => {
    activeCamera = camera;
  };
  const getActiveCamera = () => activeCamera;

  const controls = new OrbitControls(perspCamera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxPolarAngle = Math.PI / 2 - 0.1;
  controls.minDistance = 100;
  controls.maxDistance = 2000;
  controls.enabled = false;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight(0xffeedd, 1.2);
  sunLight.position.set(300, 500, 200);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(2048, 2048);
  sunLight.shadow.camera.near = 1;
  sunLight.shadow.camera.far = 1500;
  sunLight.shadow.camera.left = -800;
  sunLight.shadow.camera.right = 800;
  sunLight.shadow.camera.top = 600;
  sunLight.shadow.camera.bottom = -600;
  sunLight.shadow.bias = -0.0001;
  sunLight.shadow.normalBias = 0.02;
  scene.add(sunLight);

  const hemisphereLight = new THREE.HemisphereLight(0x88ccff, 0x44aa44, 0.3);
  scene.add(hemisphereLight);

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
  scene.environment = envRT.texture;
  pmrem.dispose();

  return {
    renderer,
    scene,
    cameras: {
      orthoCamera,
      perspCamera,
      getActiveCamera,
      setActiveCamera
    },
    controls,
    lights: {
      ambientLight,
      sunLight,
      hemisphereLight
    }
  };
}
