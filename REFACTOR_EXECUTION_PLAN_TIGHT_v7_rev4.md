# 3DCityMapper — Refactor Execution Plan (Codex‑CLI Optimized, Scanner‑Ready) v7

**Date:** Feb 3, 2026
**Scope:** Refactor monolithic `city-sim.html` into a modular architecture with strong guardrails, while laying clean foundations for:
- user **overlay image upload + calibration**
- future **auto-scan → DraftBlueprint → BlueprintModel**
- iterative **fidelity editing** and **persisted UX settings**
- a quarantined **Example City** demo (legacy path)

**Primary Tooling:** Codex CLI (no build step required)

> v7 deltas vs v6: adds a strict **review-packet workflow**, a **baseline anchor** procedure (Codex MCP attempt → Xav fallback), deterministic evidence commands (phase-end commit, focus paths), and a carry-forward policy to fold drifts/omissions into the next phase prompt.

> v7_rev4 deltas vs v7_rev3: adds **readiness-gated probing**, clarifies **favicon 404 is non-signal**, and updates hash-mismatch triage to gate on **parity fields** (counts/drift) rather than full SHA stability.

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
- Conflating “review packet” docs with “phase work” code (keep evidence targeted at phase-end commit).

---

## 3) Target Module Map (Authoritative)

**Thin HTML shell → single module entry**

**Entrypoint policy (v7):** The runnable entrypoint stays **`city-sim.html`** through the refactor phases. `/index.html` + `/src/app.js` is a *future consolidation target* and must only be introduced in an explicit, separately-scoped micro-phase (to avoid accidental boot/loader drift).

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
- **REFACTOR_LOG.md baseline anchor captured** (see §8.3)

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
- EventBus strict mode enabled via a dev runtime switch (e.g., `?dev=1` or `localStorage.3dcm:dev=1`) (reject unknown events)

Add:
- DevHUD panel (optional, gated by the same dev runtime switch):
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

## 8) Workflow & Evidence Packets (v7)

### 8.1 Roles (two-person loop)
- SeniorDev1 reviews v7 + review packets + logs, then produces the next Codex task prompt.
- Codex executes the prompt, runs fixed evidence commands, generates the review packet, and commits it.

Codex does **not** “review the plan”; the phase prompt must embed the checklist/invariants for that phase.

### 8.2 Git safety (non-negotiable)
- **Never work directly on `master`.** Use a dedicated refactor branch.
- Keep commits small and rollback-friendly; prefer **1 phase = 1 branch** (or 1–3 closely related phases).
- If anything looks off, stop and reset the branch rather than “patching forward”.

### 8.3 Baseline anchor capture (required)

**Goal:** keep a single canonical runtime fingerprint so we can detect real drift early.

**Serve the app over HTTP (required):**
- in repo root: `python3 -m http.server 8000`
- open: `http://localhost:8000/city-sim.html?refactorProbe=1`
- sanity: `src/mapBlueprint.json` must be reachable (HTTP 200)
- ignore 404 for `/favicon.ico` (non-signal)

**Run the probe in a clean session (required):**
- hard reload the tab
- do **not** click the UI
- wait for the scene to settle (no ongoing rebuilds)
- readiness gate: wait up to **1500ms** for blueprint arrays to become non-zero (roads/zones/coastlines/pois) before running the probe

**Mode A (Codex MCP DevTools) — attempt once (opportunistic):**
- evaluate **stringified JSON**, then compute SHA-256 **in-browser** to avoid truncation / remote-object weirdness:

```js
(async () => {
  // readiness gate: avoid first-paint blueprintCounts=0 artifacts
  const t0 = performance.now();
  while (performance.now() - t0 < 1500) {
    const bd = globalThis.__CITYSIM__?.blueprintData;
    const ok = bd && (bd.roads?.length || bd.zones?.length || bd.coastlines?.length || bd.pois?.length);
    if (ok) break;
    await new Promise(r => setTimeout(r, 100));
  }

  const s = JSON.stringify(runRefactorProbe());
  console.log("REFACTOR_PROBE_LEN=" + s.length);
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  const sha = [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
  console.log("REFACTOR_PROBE_SHA256=" + sha);
})();
```

- record: `REFACTOR_PROBE_LEN`, `REFACTOR_PROBE_SHA256`, plus the probe’s key fields (sceneCounts / blueprintCounts / overlayDrift / rendererInfo summary).
- if Mode A fails (timeout / tool error / truncation): **immediate fallback to Mode B** (no retries).

**Mode B (Xav manual) — fallback:**
- Xav runs the probe in the browser console and gives Codex:
  - the SHA-256 (from the snippet above), the LEN, and the summarized fields (counts + rendererInfo summary)
- Codex updates `REFACTOR_LOG.md` accordingly.

**Hash-mismatch triage (required before stopping work):**
If `REFACTOR_PROBE_SHA256` differs from the canonical baseline:

1) hard reload, repeat the probe **once** (same no-click + readiness gate rule)
2) compare **parity fields** (sceneCounts / blueprintCounts / overlayDrift):
   - if parity fields match the baseline and are stable across both runs: **do not stop**; record both SHAs+LENs as trace metadata and continue
   - stop only if parity fields drift, readiness gate never reaches non-zero blueprint arrays, or a **critical asset** fails to load (e.g., `src/mapBlueprint.json` not 200). (Ignore `/favicon.ico`.)

**Canonical baseline location:**
- `REFACTOR_LOG.md` holds the canonical baseline record and later phase records.


### 8.4 Carry-forward policy (drift is expected)
Every review packet ends with Carry-Forward issues:
- **P0 blockers** (must fix before proceeding)
- **P1 fold-forward** (first steps in next phase prompt)
- **P2 notes** (only if cheap)

Each P0/P1 must include:
- locator (file:line OR commit hash OR fixed-string grep)
- 1-line acceptance criterion (“done when …”)

### 8.5 Review packet workflow (required at end of every phase / sub-phase)

Codex must generate and commit:
- `docs/ai/review_packet_phaseX.md`
- `docs/ai/review_packet_phaseX_Y.md` for micro-fixes

Packet must declare:
- `base_commit` (start of phase)
- `phase_end_commit` (last work commit; review packet commit is not included in phase delta)
- `packet_commit` (**may be** `PENDING (self-reference; see git log)`)

**Packet self-reference rule (important):**
A packet cannot reliably embed its own commit hash without creating churn. Therefore:
- **Do not amend** packet commits to “fix packet_commit”.
- If you want an exact packet SHA, rely on the packet’s included `git log --oneline --decorate -n 20` output (authoritative), or record the exact SHA in `REFACTOR_LOG.md` under the phase entry.
- If a packet needs substantive correction, treat it as a micro-phase and create a new `review_packet_phaseX_Y.md`.

Packet generation is **fixed-commands only** (no exploration). Extra snippets are allowed only to document P0/P1 items:
- `git show -U3 <phase_end_commit> -- <file>`
- or `sed -n '<a>,<b>p' <file>`

Focus paths:
- Each phase prompt defines `FOCUS_PATHS="..."` (space-separated paths) and packet excerpts must be limited to those paths.

Command determinism:
- detect tools: `command -v rg >/dev/null && echo "rg=1" || echo "rg=0"`
- probe gate checks use fixed-string grep:
  - `grep -nF "refactorProbe" city-sim.html`
  - `grep -nF "import('./tools/refactorProbe.js')" city-sim.html || grep -nF 'import("./tools/refactorProbe.js")' city-sim.html`

Evidence commands (verbatim output) in the packet:
- `git status -sb`
- `git rev-parse --short HEAD`
- `git log --oneline --decorate -n 20`
- `git diff --stat <base_commit>...<phase_end_commit>`
- `git diff --check <base_commit>...<phase_end_commit>`
- one of (choose based on size; always limited to FOCUS_PATHS):
  - `git diff -U15 <base_commit>...<phase_end_commit> -- $FOCUS_PATHS` (preferred)
  - OR `git show -U15 <each work commit> -- $FOCUS_PATHS`

**Huge-diff fallback (deterministic, no loops):** if diff output would be massive/truncated (common for `city-sim.html`), do not re-run “full” commands. Instead, reduce context *only* for `city-sim.html` and keep -U15 for extracted modules:
- `git show -U5 <phase_end_commit> -- city-sim.html`
- `git show -U15 <phase_end_commit> -- <other paths in $FOCUS_PATHS>`

Packet commit evidence (to prove “packet-only” change) is captured before committing the packet:
- stage packet file(s)
- include in packet:
  - `git diff --stat --cached`
  - `git diff --check --cached`
Then commit the packet.


### 8.6 Cheap self-checks (best-effort, do not “fix to satisfy”) (best-effort, do not “fix to satisfy”)
Codex should run and record results per phase:
- `git diff --check <base_commit>...<phase_end_commit>` (already required)
- Node ESM import smoke tests only for Node-safe modules under:
  - `src/config/*`, `src/utils/*`
If import-smoke fails due to browser-only environment mismatch, record reason and move on (do not refactor to satisfy Node unless prompted).
- If `package.json` exists later, run whatever scripts exist (test/lint) and record.

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

**v7 is ready to drive the Codex refactor loop with deterministic phase evidence and low-slop reviews.**
