import { normalizeBlueprint } from './BlueprintNormalizer.js';
import { validateBlueprint } from './BlueprintValidator.js';

export class BlueprintModel {
  constructor(helpers = {}) {
    this.helpers = helpers;
    this.data = null;
  }

  loadFromJSON(raw) {
    const parsed = this._parseRaw(raw);
    this.data = normalizeBlueprint(parsed, this.helpers);
    return this.data;
  }

  createBlank() {
    this.data = normalizeBlueprint({}, this.helpers);
    return this.data;
  }

  getData() {
    return this.data;
  }

  getSnapshot() {
    const source = this.data || {};
    try {
      return JSON.parse(JSON.stringify(source));
    } catch (e) {
      return {};
    }
  }

  applySnapshot(snapshot) {
    const target = snapshot && typeof snapshot === 'object' ? snapshot : {};
    this.data = normalizeBlueprint(target, this.helpers);
    return this.data;
  }

  validate(raw) {
    const target = raw !== undefined ? this._parseRaw(raw) : (this.data || {});
    return validateBlueprint(target, this.helpers);
  }

  addFeature(type, feature) {
    if (!this.data) this.createBlank();
    if (!Array.isArray(this.data[type])) this.data[type] = [];
    this.data[type].push(feature);
    return feature;
  }

  updateFeature(type, id, patch) {
    if (!this.data || !id) return false;
    const list = this.data[type];
    if (!Array.isArray(list)) return false;
    const idx = list.findIndex((item) => item && item.id === id);
    if (idx < 0) return false;
    Object.assign(list[idx], patch);
    return true;
  }

  removeFeature(type, id) {
    if (!this.data || !id) return false;
    const list = this.data[type];
    if (!Array.isArray(list)) return false;
    const idx = list.findIndex((item) => item && item.id === id);
    if (idx < 0) return false;
    list.splice(idx, 1);
    return true;
  }

  _parseRaw(raw) {
    if (typeof raw === 'string') {
      try {
        return JSON.parse(raw);
      } catch (e) {
        return {};
      }
    }
    if (raw && typeof raw === 'object') return raw;
    return {};
  }
}
