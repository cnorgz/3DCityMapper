export const EVENT_CATALOG = new Set([
  // NOTE: keep minimal at Phase 2. Add explicit events in later phases.
]);

export function isKnownEvent(name) {
  return EVENT_CATALOG.has(name);
}
