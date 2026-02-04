import * as THREE from 'three';

export function createLayerManager(scene) {
  const LAYERS = {
    terrain: new THREE.Group(),
    overlay: new THREE.Group(),
    zones: new THREE.Group(),
    roads: new THREE.Group(),
    buildings: new THREE.Group(),
    props: new THREE.Group(),
    fx: new THREE.Group(),
    debug: new THREE.Group()
  };
  Object.values(LAYERS).forEach(g => scene.add(g));

  const BLUEPRINT_LAYERS = {
    terrain: new THREE.Group(),
    zones: new THREE.Group(),
    roads: new THREE.Group(),
    buildings: new THREE.Group(),
    props: new THREE.Group(),
    fx: new THREE.Group()
  };
  const blueprintRootGroup = new THREE.Group();
  blueprintRootGroup.name = 'BlueprintRoot';
  Object.values(BLUEPRINT_LAYERS).forEach(g => {
    g.visible = false;
    blueprintRootGroup.add(g);
  });

  const blueprintTraffic = {
    group: new THREE.Group(),
    cars: [],
    paths: [],
    lights: []
  };
  blueprintTraffic.group.name = 'BlueprintTraffic';

  function ensureBlueprintTrafficGroup() {
    if (!BLUEPRINT_LAYERS.props.children.includes(blueprintTraffic.group)) {
      BLUEPRINT_LAYERS.props.add(blueprintTraffic.group);
    }
  }
  ensureBlueprintTrafficGroup();

  return {
    LAYERS,
    BLUEPRINT_LAYERS,
    blueprintRootGroup,
    blueprintTraffic,
    ensureBlueprintTrafficGroup
  };
}
