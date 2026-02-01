export function disposeObject3D(root) {
  root.traverse(o => {
    if (o.geometry && !o.geometry.userData?.shared) o.geometry.dispose();
    if (o.material) {
      if (Array.isArray(o.material)) {
        o.material.forEach(m => {
          if (!m?.userData?.shared) m.dispose();
        });
      } else if (!o.material.userData?.shared) {
        o.material.dispose();
      }
    }
  });
}
