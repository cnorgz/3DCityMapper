# Review Packet — Phase 9d (UI BlueprintPreview Wiring Dedupe)

## Metadata
- branch: `refactor/phase9d-ui-blueprint-preview-dedup`
- base_commit: `caf72fc`
- phase_end_commit: `ae12eaa`
- packet_commit: `PENDING` (self-reference)
- focus_paths: `city-sim.html src/ui/panels/BlueprintPreviewPanel.js REFACTOR_LOG.md docs/ai`

## Determinism
Command:
```bash
command -v rg >/dev/null && echo "rg=1" || echo "rg=0"
```
Output:
```text
rg=1
```

## Fixed Commands
Command:
```bash
git status -sb
```
Output:
```text
## refactor/phase9d-ui-blueprint-preview-dedup
```

Command:
```bash
git rev-parse --short HEAD
```
Output:
```text
ae12eaa
```

Command:
```bash
git log --oneline --decorate -n 20
```
Output:
```text
ae12eaa (HEAD -> refactor/phase9d-ui-blueprint-preview-dedup) docs(phase9d): record readiness-gated probe
d809461 refactor(phase9d): dedupe blueprint preview control wiring
caf72fc (refactor/phase9c_1-log-metadata) docs(ai): add review packet for phase 9c_1
45cf14b docs(phase9c_1): fix phase9c log metadata
1f1578d (refactor/phase9c-ui-blueprint-preview-panel) docs(ai): add review packet for phase 9c
bdd2d4f docs(phase9c): record readiness-gated probe
9de6354 refactor(phase9c): extract BlueprintPreviewPanel and integrate via PanelManager
e415781 (refactor/phase9b_1-log-metadata) docs(ai): add review packet for phase 9b_1
d399ec7 docs(phase9b_1): fix phase9a/9b log metadata
245035e (refactor/phase9b-ui-eventbus-strict) docs(ai): add review packet for phase 9b
ee3b220 docs(phase9b): record readiness-gated probe
d1d0478 refactor(phase9b): add UI EventBus strict mode + traffic routed
3982699 (refactor/phase9a-ui-panelmanager-traffic-panel) docs(ai): add review packet for phase 9a
3abe2cc docs(phase9a): record readiness-gated probe
baa0a41 refactor(phase9a): add PanelManager + TrafficPanel
83a3967 (refactor/phase8_1-log-metadata) docs(ai): add review packet for phase 8_1
fbbd432 docs(phase8_1): fix phase8 log metadata
4810ada (refactor/phase8-traffic-system) docs(ai): add review packet for phase 8
aa5b414 docs(phase8): record readiness-gated probe
069aa0e refactor(phase8): extract TrafficSystem
```

## Audit Evidence (`base...phase_end`)
Command:
```bash
git diff --stat caf72fc...ae12eaa -- city-sim.html src/ui/panels/BlueprintPreviewPanel.js REFACTOR_LOG.md docs/ai
```
Output:
```text
 REFACTOR_LOG.md | 15 +++++++++++++++
 city-sim.html   | 11 -----------
 2 files changed, 15 insertions(+), 11 deletions(-)
```

Command:
```bash
git diff --check caf72fc...ae12eaa -- city-sim.html src/ui/panels/BlueprintPreviewPanel.js REFACTOR_LOG.md docs/ai
```
Output:
```text
(no output)
```

Command:
```bash
git diff -U15 caf72fc...ae12eaa -- city-sim.html src/ui/panels/BlueprintPreviewPanel.js REFACTOR_LOG.md docs/ai
```
Output:
```diff
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 7f5adde..10eefa2 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -273,15 +273,30 @@ Probe check (post-extraction):

 ## Phase 9c – UI BlueprintPreviewPanel extraction

 - branch: refactor/phase9c-ui-blueprint-preview-panel
 - base_commit: e415781
 - phase_end_commit: bdd2d4f
 - packet_commit: 1f1578d
 - capture_method: codex-mcp (readiness gated)
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_len: 3977
 - json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
 - rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }
+
+## Phase 9d – UI BlueprintPreview wiring dedupe
+
+- branch: refactor/phase9d-ui-blueprint-preview-dedup
+- base_commit: caf72fc
+- phase_end_commit: PENDING
+- packet_commit: PENDING
+- capture_method: codex-mcp (readiness gated)
+- url: http://localhost:8000/city-sim.html?refactorProbe=1
+- json_len: 3977
+- json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
+- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
+- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
+- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
+- rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }
diff --git a/city-sim.html b/city-sim.html
index b31db7e..cc7ba48 100644
--- a/city-sim.html
+++ b/city-sim.html
@@ -5343,55 +5343,46 @@ function validateBlueprint(data) {

       bindToggle(gridToggle, 'showGrid');
       bindToggle(boundsToggle, 'showOverlayBounds');
       bindToggle(blueprintToggle, 'showBlueprintOutlines');
       bindToggle(roadCenterToggle, 'showRoadCenterlines');
     }

     function setupBlueprintControls() {
       const loadBtn = document.getElementById('blueprintLoad');
       const saveBtn = document.getElementById('blueprintSave');
       const copyBtn = document.getElementById('blueprintCopy');
       const validateBtn = document.getElementById('blueprintValidate');
       const overlayUploadBtn = document.getElementById('overlayUpload');
       const jsonField = document.getElementById('blueprintJson');
       const useCityToggle = document.getElementById('blueprintUseCity');
-      const opacitySlider = document.getElementById('blueprintOpacity');
-      const opacityInput = document.getElementById('blueprintOpacityValue');
-      const labelsToggle = document.getElementById('blueprintLabels');

       if (!loadBtn || !saveBtn || !copyBtn || !validateBtn || !jsonField) return;

       try {
         const storedOpacity = getItem(PERSIST_KEYS.blueprintOpacity);
         if (Number.isFinite(storedOpacity)) {
           blueprintPreviewSettings.opacity = clampNumber(storedOpacity, 0.1, 1);
         }
         const storedLabels = getItem(PERSIST_KEYS.blueprintShowLabels);
         if (typeof storedLabels === 'boolean') {
           blueprintPreviewSettings.showLabels = storedLabels;
         }
       } catch (e) {
         // ignore persistence load errors
       }

-      const applyPreviewSettings = () => {
-        if (opacitySlider) opacitySlider.value = blueprintPreviewSettings.opacity;
-        if (opacityInput) opacityInput.value = blueprintPreviewSettings.opacity;
-        if (labelsToggle) labelsToggle.checked = blueprintPreviewSettings.showLabels;
-      };
-
       const updateJsonField = () => {
         if (!blueprintData) {
           setBlueprintStatus('Blueprint status: no data loaded.', false);
           return;
         }
         jsonField.value = JSON.stringify(blueprintData, null, 2);
       };

       const validateRaw = (raw, label) => {
         const validation = validateBlueprint(raw);
         if (!validation.ok) {
           setBlueprintStatus(`${label}: ${validation.errors[0]}`, false);
           return { ok: false, validation };
         }
         setBlueprintStatus(`${label}: OK`);
@@ -5505,32 +5496,30 @@ function validateBlueprint(data) {
           blueprintData = blueprintModel.getData();
           buildBlueprintFromData(blueprintData);
           rebuildBlueprintCity();
           setBlueprintStatus('Blueprint status: loaded from textarea.');
         } catch (e) {
           setBlueprintStatus('Blueprint load: invalid JSON.', false);
         }
       });

       if (useCityToggle) {
         useCityToggle.checked = blueprintCityEnabled;
         useCityToggle.addEventListener('change', (e) => {
           setBlueprintCityEnabled(!!e.target.checked);
         });
       }
-
-      applyPreviewSettings();
     }
```

## Pinned Module Contents
Command:
```bash
git show ae12eaa:src/ui/panels/BlueprintPreviewPanel.js
```
Output:
```js
export function createBlueprintPreviewPanel({ doc = document, state = {}, actions = {} } = {}) {
  let refs = null;
  let panelState = {
    opacity: 1,
    showLabels: false
  };

  function getRefs() {
    if (refs) return refs;
    refs = {
      opacitySlider: doc.getElementById('blueprintOpacity'),
      opacityValue: doc.getElementById('blueprintOpacityValue'),
      showLabels: doc.getElementById('blueprintLabels')
    };
    return refs;
  }

  function sync(nextState = state) {
    const previewState = nextState?.blueprintPreview || nextState || {};
    panelState = {
      ...panelState,
      ...previewState
    };
    const { opacitySlider, opacityValue, showLabels } = getRefs();
    if (opacitySlider) opacitySlider.value = panelState.opacity;
    if (opacityValue) opacityValue.value = panelState.opacity;
    if (showLabels) showLabels.checked = !!panelState.showLabels;
  }

  function bindOpacity(sliderEl, inputEl) {
    if (!sliderEl || !inputEl || typeof actions.setOpacity !== 'function') return;
    const apply = (value) => {
      sliderEl.value = value;
      inputEl.value = value;
      actions.setOpacity(value);
    };
    sliderEl.addEventListener('input', (e) => apply(e.target.value));
    inputEl.addEventListener('input', (e) => apply(e.target.value));
  }

  function init() {
    const { opacitySlider, opacityValue, showLabels } = getRefs();
    bindOpacity(opacitySlider, opacityValue);
    if (showLabels && typeof actions.setShowLabels === 'function') {
      showLabels.addEventListener('change', (e) => {
        actions.setShowLabels(!!e.target.checked);
      });
    }
    sync(state);
  }

  return {
    init,
    sync
  };
}
```

## Probe Summary
- url: `http://localhost:8000/city-sim.html?refactorProbe=1`
- REFACTOR_PROBE_LEN: `3977`
- REFACTOR_PROBE_SHA256: `ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d`
- sceneCounts: `{ meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }`
- blueprintCounts: `{ beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }`
- overlayDrift: `{ ok: true, epsPx: 0.05, maxDriftPx: 0 }`
- parity decision: `PASS` (tracked fields unchanged)

## Packet Commit Evidence (Pre-commit)
Command:
```bash
git diff --stat --cached
```
Output:
```text
 docs/ai/review_packet_phase9d.md | 306 +++++++++++++++++++++++++++++++++++++++
 1 file changed, 306 insertions(+)
```

Command:
```bash
git diff --check --cached
```
Output:
```text
(no output)
```

## Carry-forward
- P0: None.
- P1: Fill `REFACTOR_LOG.md` Phase 9d `phase_end_commit` and `packet_commit` in the next docs hygiene micro-phase.
- P2: Keep panel-manager coverage expansion incremental with one panel per phase.
