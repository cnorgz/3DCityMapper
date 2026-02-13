import { EVENT_CATALOG, isKnownEvent } from './EventCatalog.js';

let unknownEventCount = 0;

export function emit(name, payload) {
  if (!isKnownEvent(name)) {
    unknownEventCount += 1;
    // warn-only in phases 1–7; strict mode comes later (per plan)
    console.warn(`[EventBus] Unknown event: ${name}`);
  }
  // placeholder for future subscribers; no-op for now
  return { name, payload };
}

export function getUnknownEventCount() {
  return unknownEventCount;
}

export function resetUnknownEventCount() {
  unknownEventCount = 0;
}

export { EVENT_CATALOG };
