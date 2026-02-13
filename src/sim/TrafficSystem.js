export function createTrafficSystem({
  THREE,
  addProp,
  propsLayer,
  toWorld,
  headlights
}) {
  const cars = [];
  const CAR_ASSETS = {
    bodyGeo: null,
    roofGeo: null,
    wheelGeo: null,
    headlightGeo: null,
    wheelMat: null,
    headlightMat: null,
    tailMat: null,
    bodyMats: new Map()
  };

  function getSharedCarAssets() {
    if (!CAR_ASSETS.bodyGeo) {
      CAR_ASSETS.bodyGeo = new THREE.BoxGeometry(8, 3, 4);
      CAR_ASSETS.bodyGeo.userData.shared = true;
      CAR_ASSETS.roofGeo = new THREE.BoxGeometry(4, 2, 3.5);
      CAR_ASSETS.roofGeo.userData.shared = true;
      CAR_ASSETS.wheelGeo = new THREE.CylinderGeometry(1, 1, 0.5, 12);
      CAR_ASSETS.wheelGeo.userData.shared = true;
      CAR_ASSETS.headlightGeo = new THREE.SphereGeometry(0.4, 8, 8);
      CAR_ASSETS.headlightGeo.userData.shared = true;
      CAR_ASSETS.wheelMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
      CAR_ASSETS.wheelMat.userData.shared = true;
      CAR_ASSETS.headlightMat = new THREE.MeshStandardMaterial({
        color: 0xffffcc,
        emissive: 0xffffcc,
        emissiveIntensity: 0.5
      });
      CAR_ASSETS.headlightMat.userData.shared = true;
      CAR_ASSETS.tailMat = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        emissive: 0xff0000,
        emissiveIntensity: 0.3
      });
      CAR_ASSETS.tailMat.userData.shared = true;
    }
    return CAR_ASSETS;
  }

  function getCarBodyMaterial(color) {
    const assets = getSharedCarAssets();
    if (assets.bodyMats.has(color)) return assets.bodyMats.get(color);
    const mat = new THREE.MeshStandardMaterial({
      color,
      metalness: 0.6,
      roughness: 0.4
    });
    mat.userData.shared = true;
    assets.bodyMats.set(color, mat);
    return mat;
  }

  function createCar(color, options = {}) {
    const group = new THREE.Group();
    const isBlueprintCar = !!options.blueprintTraffic;
    const assets = getSharedCarAssets();

    // Car body
    const bodyMat = getCarBodyMaterial(color);
    const body = new THREE.Mesh(assets.bodyGeo, bodyMat);
    body.position.y = 1.5;
    body.castShadow = true;
    group.add(body);

    // Car roof
    const roof = new THREE.Mesh(assets.roofGeo, bodyMat);
    roof.position.set(-0.5, 3.5, 0);
    roof.castShadow = true;
    group.add(roof);

    // Wheels
    const wheelPositions = [
      [2.5, 0.5, 2.2], [2.5, 0.5, -2.2],
      [-2.5, 0.5, 2.2], [-2.5, 0.5, -2.2]
    ];
    wheelPositions.forEach(([x, y, z]) => {
      const wheel = new THREE.Mesh(assets.wheelGeo, assets.wheelMat);
      wheel.position.set(x, y, z);
      wheel.rotation.x = Math.PI / 2;
      wheel.castShadow = false;  // Decorative - no shadow
      group.add(wheel);
    });

    // Headlights (front)
    const hl1 = new THREE.Mesh(assets.headlightGeo, assets.headlightMat);
    const hl2 = new THREE.Mesh(assets.headlightGeo, assets.headlightMat);
    hl1.position.set(4.1, 1.5, 1.2);
    hl2.position.set(4.1, 1.5, -1.2);
    hl1.userData.isHeadlight = true;
    hl2.userData.isHeadlight = true;
    hl1.userData.blueprintTraffic = isBlueprintCar;
    hl2.userData.blueprintTraffic = isBlueprintCar;
    group.add(hl1, hl2);
    headlights.push(hl1, hl2);

    // Taillights (back)
    const tl1 = new THREE.Mesh(assets.headlightGeo, assets.tailMat);
    const tl2 = new THREE.Mesh(assets.headlightGeo, assets.tailMat);
    tl1.position.set(-4.1, 1.5, 1.2);
    tl2.position.set(-4.1, 1.5, -1.2);
    group.add(tl1, tl2);

    return group;
  }

  function createCars() {
    // Create several cars on different roads
    const carSpecs = [
      { nx: 0.45, nz: 0.22, dir: 1, speed: 0.3, color: 0xff3333 },
      { nx: 0.55, nz: 0.44, dir: -1, speed: 0.25, color: 0x3333ff },
      { nx: 0.75, nz: 0.56, dir: 1, speed: 0.35, color: 0x33ff33 },
      { nx: 0.85, nz: 0.32, dir: -1, speed: 0.28, color: 0xffff33 },
      { nx: 0.60, nz: 0.70, dir: 1, speed: 0.32, color: 0xff33ff },
      { nx: 0.50, nz: 0.06, dir: 1, speed: 0.22, color: 0x33ffff },
    ];

    carSpecs.forEach(spec => {
      const car = createCar(spec.color);
      const [x, z] = toWorld(spec.nx, spec.nz);
      car.position.set(x, 1.5, z);
      car.userData.direction = spec.dir;
      car.userData.speed = spec.speed;
      car.userData.roadZ = z;
      car.userData.minX = toWorld(0.42, 0)[0];
      car.userData.maxX = toWorld(0.95, 0)[0];
      if (spec.dir < 0) car.rotation.y = Math.PI;
      addProp(propsLayer, car);
      cars.push(car);
    });
  }

  function animateCars() {
    cars.forEach(car => {
      car.position.x += car.userData.direction * car.userData.speed;

      // Wrap around when reaching road ends
      if (car.position.x > car.userData.maxX) {
        car.position.x = car.userData.minX;
      } else if (car.position.x < car.userData.minX) {
        car.position.x = car.userData.maxX;
      }
    });
  }

  return {
    createCar,
    createCars,
    animateCars
  };
}
