export function createEventBus({ strict = false, allowed = [] } = {}) {
  const handlers = new Map();
  const allowedSet = new Set(allowed);

  function on(name, handler) {
    if (!handlers.has(name)) handlers.set(name, []);
    const list = handlers.get(name);
    list.push(handler);
    return () => {
      const idx = list.indexOf(handler);
      if (idx >= 0) list.splice(idx, 1);
    };
  }

  function emit(name, payload) {
    if (!allowedSet.has(name)) {
      const message = `[UI EventBus] Unknown event: ${name}`;
      if (strict) {
        console.error(message);
      } else {
        console.warn(message);
      }
      return false;
    }
    const list = handlers.get(name);
    if (!list || list.length === 0) return false;
    list.forEach((handler) => handler(payload));
    return true;
  }

  return {
    on,
    emit
  };
}
