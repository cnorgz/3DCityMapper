export function addDebug(layer, obj) {
  layer.add(obj);
  return obj;
}

export function addDebugs(layer, objects) {
  objects.forEach(obj => layer.add(obj));
  return objects;
}
