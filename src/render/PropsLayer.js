export function addProp(layer, obj) {
  layer.add(obj);
  return obj;
}

export function addProps(layer, objects) {
  objects.forEach(obj => layer.add(obj));
  return objects;
}
