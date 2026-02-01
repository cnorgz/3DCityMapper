# 3DCityMapper — Refactor Execution Plan (Codex‑CLI Optimized, Scanner‑Ready) v6

**Date:** Feb 1, 2026  
**Scope:** Refactor monolithic `city-sim.html` into a modular architecture with strong guardrails, while laying clean foundations for:
- user **overlay image upload + calibration**
- future **auto-scan → DraftBlueprint → BlueprintModel**
- iterative **fidelity editing** and **persisted UX settings**
- a quarantined **Example City** demo (legacy path)

**Primary Tooling:** Codex CLI (no build step required)

> v6 deltas vs v5: cleaned up version notes, added explicit Phase 0 no-extraction rule, generalized execution loop wording, and fixed footer version.

> v6 incorporates your latest answers: keep the refactor focused, keep mapping deterministic, constrain uploaded images to a standard max spec, preserve “start from scratch” editing, keep dev/debug outputs available (console + optional UI HUD).

---

## 0) Product Direction (refactor target)

### 0.1 Primary user journeys (target)
**A) Scan-first workflow (default new city)**
1) User uploads a hand-drawn map image (standard legend / graphic ruleset).  
2) Scanner pipeline produces a DraftBlueprint.  
3) DraftBlueprint is validated + normalized, then loaded into BlueprintModel.  
4) User refines via editor tools (fidelity pass).

**B) Start-from-scratch workflow (supported option)**
- User creates a **Blank Blueprint** and builds a city directly with the editor tools (no scan).

**C) Example City (demo / onboarding)**
- Legacy/non-blueprint city is kept as **Example City** only (explicitly loaded).

### 0.2 Deterministic mapping policy (overlay image constraints)
To keep the system stable and deterministic during refactor (and early scanner MVP):
- Overlay images are normalized to a **standard max spec** at import time:
  - **maxEdgePx = 2048** (configurable constant)
  - preserve aspect ratio (fit within maxEdge)
- All mapping + drift checks use the **normalized** image dimensions.
- Optional future: strict aspect enforcement via padding/letterboxing (not required for refactor).

**Clarification:** Image normalization affects **overlay image source dimensions only**. During refactor, **world scale remains constant**; we avoid introducing world-scaling complexity until scanner MVP warrants it.

### 0.3 Debug/dev visibility policy
- Dev warnings and diagnostics remain available in **console**.
- Optionally surface key warnings in a lightweight **DevHUD** panel (dev-only toggle).

---

## 1) Mission & Non‑Negotiable Invariants ✅

### 1.1 Coordinate contract (must not drift)
- Preserve 3-space mapping: **pixel → overlay-local → world**.  
- Overlay mapping must round-trip within **epsPx=0.05** (preserve threshold; do not loosen).

### 1.2 Render-loop semantics (must not drift)
- Preserve throttled rendering behavior (mode + animation controlled FPS), not “always render every rAF”.

### 1.3 One-owner scene graph
- One canonical creator/owner for scene groups.  
- No duplicate roots, no shadow scene graphs.

### 1.4 Shared materials safety
- Shared materials/geometry are centrally owned and must not be disposed.
- Mark shared assets `userData.shared = true`; disposal must skip them.

### 1.5 Blueprint canonical
- Blueprint is mutated **only** through BlueprintModel API.
- BlueprintValidator runs on every load/import (and scanner output once it exists).

### 1.6 Persistence is additive
- Defaults on first run must match current behavior.
- Persisted settings apply only after user changes them.
- Migration must preserve existing keys currently used by the app:
  - `tadhgCityOverlayCalib`
  - `tadhgOverlayPanelCollapsed`

---

## 2) Pitfalls to Avoid ⚠️
- Extract + improve in the same PR (do verbatim extraction first).
- Duplicate coordinate math across modules.
- UI mutating runtime/editor/blueprint state directly (UI emits events/actions only).
- Introducing circular imports.
- Breaking touch (joystick/pinch/zoom buttons) during InputRouter extraction.
- Conflating layer scopes too early (legacy vs blueprint vs overlay/debug).

---

## 3) Target Module Map (Authoritative)

**Thin HTML shell → single module entry**
```
/index.html            # shell only, imports /src/app.js
/src/app.js            # orchestrator (thin)
```

### 3.1 Core modules
```
/src/config/
  constants.js
  palette.js
  legendRules.js         # extracted from existing legend mapping (scanner-facing too)
  renderPresets.js       # FPS caps, camera presets, view modes

/src/utils/
  EventBus.js
  EventCatalog.js
  Assert.js
  Math.js
  GeometryMath.js
  Dispose.js
  Signature.js           # scene signatures, counts, probe hashing

/src/persistence/
  StateStore.js          # localStorage wrapper + versioned keys + migrations
  Migrations.js

/src/core/
  BlueprintValidator.js
  BlueprintModel.js
  BlueprintNormalizer.js # e.g. transit→roads normalization
  CoordinateMapper.js    # pure pixel ↔ overlay-local math
  OverlayTransform.js    # calibration + overlay-local ↔ world + drift check
  ViewModeController.js
  CityModeController.js  # 'blueprint' | 'blank' | 'example'
  DevHUD.js              # optional dev-only diagnostics sink

/src/rendering/
  SceneManager.js
  RenderLoop.js
  LayerManager.js
  MaterialLibrary.js
  CityRenderer.js
  Line2Utils.js
  BlueprintPreviewRenderer.js
  /layers/
    TerrainLayer.js
    ZoneLayer.js
    RoadLayer.js
    BuildingLayer.js
    PropsLayer.js
    OverlayLayer.js
    DebugLayer.js

/src/geometry/
  TerrainGenerator.js
  RoadGenerator.js
  BuildingGenerator.js

/src/input/
  InputRouter.js
  HitTest.js
  Gestures.js            # pinch, joystick, wheel (optional but recommended)

/src/editor/
  EditorController.js
  HistoryManager.js
  RebuildScheduler.js    # preserves rAF-throttled rebuild behavior
  SnapEngine.js
  /tools/...

/src/ui/
  PanelManager.js
  panels/
    (one-file-per-panel).js
  uiActions.js           # event/action creators (no state)
```

### 3.2 Demo / legacy extraction
```
/src/demo/
  ExampleCityEntry.js
  LegacyCityRenderer.js
  demoAssets.js
```

### 3.3 Scanner scaffolding (post-stability)
```
/src/scanner/
  ScannerController.js
  ImageSource.js             # handles upload + normalization to maxEdge
  DraftBlueprintBuilder.js
  (future) Segmenter.js, OCRLabels.js, RoadTracer.js, etc.
```

---

## 4) Dependency Rules (One‑Way, Enforced)

Allowed flow:
```
config → utils → persistence → core → geometry → rendering → input → editor → ui
```

Hard rules:
- geometry/* is pure (no DOM, no EventBus, no Layer creation).
- UI emits events/actions only.
- Only LayerManager creates/owns groups.
- Only BlueprintModel mutates blueprint data.
- Only CoordinateMapper/OverlayTransform handle coordinate conversions.

---

## 5) Stable Contracts (APIs that must not drift)

### 5.1 BlueprintModel
```js
loadFromJSON(json)
createBlank(options)         // supports “start from scratch”
getData()
getSnapshot() / applySnapshot(snapshot)
addFeature(type, feature)
updateFeature(type, id, patch)
removeFeature(type, id)
validate() -> { ok, errors, warnings }
```

### 5.2 CoordinateMapper + OverlayTransform
- CoordinateMapper: pixel ↔ overlay-local (pure)  
- OverlayTransform: overlay-local ↔ world + drift check (epsPx=0.05)
- Drift probe points must be generated from **current normalized image dims**, not fixed constants.

### 5.3 StateStore
```js
get(key, fallback)
set(key, value)
remove(key)
migrate() // run once at boot
```
Key strategy:
- New keys: `3dcm:v1:<key>`
- Migrate legacy keys:
  - `tadhgCityOverlayCalib` → `3dcm:v1:overlayCalib:<imageId>`
  - `tadhgOverlayPanelCollapsed` → `3dcm:v1:ui.overlayPanelCollapsed`

### 5.4 Layer scopes (explicit)
LayerManager must support **separate root scopes** (or named groups):
- `scope:legacy` (Example City)
- `scope:blueprint` (Blueprint city)
- `scope:overlay` (overlay plane + calibration widgets)
- `scope:debug` (helpers, labels, stats)

This preserves the current “swap city modes” behavior and prevents scope mixing.

**Parity rule:** Root scope group names and their direct child counts are part of the parity signature (do not rename casually).

---

## 6) Refactor Phases (Codex-executable, parity-first)

### Phase 0 — Baseline & Instrumentation

**Rule:** Phase 0 is **instrumentation only** — **no extraction/refactor** and no behavior changes outside an explicit probe gate.

Deliver:
- Parity probe (blueprint path):
  - renderer.info snapshot
  - mesh/material/geometry counts
  - scene signature (names + child counts)
  - feature counts per blueprint section
- Overlay drift check log (epsPx=0.05)
- ViewMode signature (plan→3d→street→fidelity)
- RenderLoop signature (target FPS chosen per mode + animation toggle)
- LocalStorage usage report (exact keys currently used)
- REFACTOR_LOG.md baseline record

Acceptance:
- Stable across reloads (no behavior drift).

---

### Phase 1 — Config + Utils Extraction (verbatim)
Move verbatim:
- constants/palette/render presets into /src/config
- Math/GeometryMath/Dispose/Assert into /src/utils
- Extract existing legend mapping into `legendRules.js` (do not redesign yet)

Add:
- EventBus + EventCatalog created now; warn+count only (non-strict)

Acceptance:
- parity probe unchanged

---

### Phase 2 — Persistence Foundations (StateStore)
Goal:
- Centralize all localStorage in one module before deep refactor.

Deliver:
- `StateStore.js` + `Migrations.js`
- Migrate legacy keys (must read old keys and write new keys):
  - `tadhgCityOverlayCalib`
  - `tadhgOverlayPanelCollapsed`

Add (opt-in persistence):
- editor snap settings: snap enabled, pixelStep
- traffic settings: maxCars, speedScale
- blueprint preview settings: showLabels, opacity

Rules:
- Do not persist images/blobs in localStorage.
- Only persist calibration/settings + image identity metadata.

Acceptance:
- Defaults unchanged on first run.
- User-changed settings persist across reload.
- Parity probe unchanged.

---

### Phase 3 — BlueprintModel + Validator + Normalizer
Extract:
- BlueprintValidator
- BlueprintNormalizer (e.g., transit→roads merge)
- BlueprintModel (mutation API + blank blueprint creation)

Acceptance:
- All imports pass validate/normalize
- parity probe unchanged

---

### Phase 4 — Overlay + Coordinates (Upload-ready, deterministic)
Extract:
- CoordinateMapper + OverlayTransform
- OverlayLayer + BlueprintPreviewRenderer

Deliver:
- Add overlay image upload flow via `ImageSource`:
  - Normalize to `maxEdgePx` (config), preserve aspect
  - Provide `imageId` (name + size + lastModified) for calibration keying
- Drift probes use normalized dims (dynamic)
- Keep demo image support (one-click preset), but do not depend on it.

Acceptance:
- No drift warnings at epsPx=0.05 after calibration
- Overlay behaves same for demo image
- Upload image loads + calibrates + persists calibration per imageId

---

### Phase 5 — Scene + Layer Ownership (scopes enforced)
Extract:
- SceneManager
- LayerManager (with scope roots)
- ViewModeController
- RenderLoop (preserve FPS throttling semantics)

Acceptance:
- No duplicate roots
- Layer scope signatures stable
- RenderLoop signature unchanged
- parity probe unchanged

---

### Phase 6 — Rendering + Geometry Split (one layer per PR)
Extract in this order:
1) MaterialLibrary
2) TerrainLayer + TerrainGenerator
3) ZoneLayer
4) RoadLayer + RoadGenerator
5) BuildingLayer + BuildingGenerator
6) PropsLayer + DebugLayer
7) CityRenderer orchestrator

Acceptance (every PR):
- parity probe unchanged
- no memory growth after 5 rebuilds
- Line2 resolution updates preserved via Line2Utils

---

### Phase 7 — Editor Subsystem (incl. rebuild scheduling)
Extract:
- EditorController
- HistoryManager
- SnapEngine
- RebuildScheduler (must preserve rAF-throttled rebuild behavior)
- InputRouter + HitTest + Gestures (joystick + pinch + zoom buttons)

Acceptance:
- draw/undo/redo works
- selection/POI placement works
- touch + pinch + joystick unchanged
- snapPixels + pixelStep correct + persisted (Phase 2)

---

### Phase 8 — Simulation (traffic)
Extract:
- TrafficSystem (+ optional EnvironmentSystem)

Acceptance:
- randomness source preserved (Math.random)
- traffic UI works
- persistence works (maxCars rebuild; speedScale runtime)

---

### Phase 9 — UI Modularization (event boundary + dev visibility)
Extract:
- PanelManager + panels
- UI emits events/actions only
- EventBus strict mode enabled in dev builds (reject unknown events)

Add:
- DevHUD panel (optional, dev-only toggle):
  - shows drift warnings, validator warnings, parity probe deltas
  - still logs to console

Acceptance:
- all controls work
- no UI logic in core/editor/rendering
- dev HUD is optional and non-invasive

---

### Phase 10 — City Modes: Blueprint / Blank / Example (intentional product framing)
Deliver:
- CityModeController supports 3 modes:
  - `blueprint` (loaded from scan/import)
  - `blank` (createBlank)
  - `example` (legacy demo)
- Example city extracted into `/src/demo` with minimal edits.
- Add UI actions:
  - New City (Scan)
  - New City (Blank)
  - Load Example City

Acceptance:
- default path is blueprint-oriented (scan/upload encouraged)
- blank city workflow works without scan
- example city works and is isolated from blueprint state

---

### Phase 11 — Scanner Scaffolding (wiring only, tiny placeholder)
Goal:
- Establish the pipeline without committing to real scanning algorithms yet.

Deliver:
- ScannerController wired to:
  - take the normalized overlay image (ImageSource)
  - consult `legendRules.js`
  - output DraftBlueprint
- Placeholder scan output options (choose one minimal):
  - empty but valid blueprint with bounds inferred, OR
  - trivial heuristic (e.g., detect dominant water color region)

Acceptance:
- scan pipeline runs end-to-end
- DraftBlueprint validates + normalizes
- editor can modify scan output

---

## 7) Stop Rules (hard stops)
Stop immediately if:
- parity probe changes unexpectedly
- overlay drift warnings appear (epsPx=0.05)
- circular import introduced
- scope mixing occurs (legacy into blueprint scope or vice versa)
- memory grows after 5 rebuild cycles
- UI directly mutates core/editor/blueprint state
- Blueprint mutated without BlueprintModel

---

## 8) Git Safety + Codex Execution Loop (branch-first)

### 8.1 Git safety (non-negotiable)
- **Never work directly on `master`.** Create a dedicated refactor branch before Phase 0.
- Keep commits small and reviewable; prefer **1 phase = 1 branch** (or 1–3 closely-related phases).
- Tag a known-good baseline before major extraction (optional but recommended): `baseline/pre-refactor`.
- If anything looks off, stop and reset the branch rather than “patching forward”.

### 8.2 Execution loop (commit-by-commit)
Per commit (or per PR chunk):
1) Apply the smallest coherent change set.
   - For extraction phases: extract **one** module verbatim
2) Wire via imports/injection
3) Run parity probe + drift check + RenderLoop signature
4) Commit: `refactor(P<phase>): <module>`
5) Update REFACTOR_LOG.md
6) Update docs touched

**Batching rule (to reduce human copy/paste):** Codex may complete a *reasonable batch* of steps in one session (e.g., an entire phase task list), **but must**:
- run parity/drift checks at the specified checkpoints,
- produce a short *session report* listing commits made, checks run, and any deviations,
- stop immediately on any stop-rule trigger.

---

## 9) Minimum Docs
- docs/ARCHITECTURE.md
- docs/COORDINATES.md
- docs/BLUEPRINT_SPEC.md
- docs/EDITOR_TOOLS.md
- docs/INPUTS.md (touch/pinch/joystick)
- docs/PERSISTENCE.md (keys + migrations)
- docs/SCANNER.md (pipeline outline + legend rules)
- docs/DEV_DEBUG.md (DevHUD + parity probe)

---

## 10) Scanner questions (explicitly deferred)
These do not block refactor; they become relevant when Phase 11 moves beyond placeholder:
1) Canonical legend colors/symbols per feature type
2) OCR vs symbol markers for labels
3) MVP scan scope (roads-only vs roads+water vs full zones/buildings)

---

**v6 is ready for Codex to begin refactorization.**  
It tightens scope separation, preserves deterministic coordinate mapping, preserves render-loop semantics, and keeps scanning work properly deferred while wiring the future path.
