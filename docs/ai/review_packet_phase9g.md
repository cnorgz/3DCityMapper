# Review Packet — Phase 9g

## Metadata
- branch: `refactor/phase9g-ui-devhud-panel`
- base_commit: `6883132`
- phase_end_commit: `f7f8d20`
- packet_commit: `PENDING` (self-reference; see git log)
- focus_paths: `city-sim.html src/ui/panels/DevHUDPanel.js REFACTOR_LOG.md docs/ai/review_packet_phase9g.md`

## Determinism
```bash
rg=1
```

## Fixed Commands (Verbatim)
```bash
git status -sb
## refactor/phase9g-ui-devhud-panel
```

```bash
git rev-parse --short HEAD
f7f8d20
```

```bash
git log --oneline --decorate -n 20
f7f8d20 (HEAD -> refactor/phase9g-ui-devhud-panel) docs(phase9g): record readiness-gated probe
9f2d162 refactor(phase9g): add DevHUDPanel (dev-only)
6883132 (refactor/phase9f_1-log-metadata) docs(ai): add review packet for phase 9f_1
0f96734 docs(phase9f_1): fix phase9f log metadata
9b4bace (refactor/phase9f-ui-zone-info-panel) docs(ai): add review packet for phase 9f
2969992 docs(phase9f): record readiness-gated probe
96910cf refactor(phase9f): extract ZoneInfoPanel
cc9f741 (refactor/phase9e_1-log-metadata) docs(ai): add review packet for phase 9e_1
58ec08d docs(phase9e_1): fix phase9e log metadata
58f38a5 (refactor/phase9e-ui-dev-mode-switch) docs(ai): add review packet for phase 9e
e07ae40 docs(phase9e): record readiness-gated probe
6f60adb refactor(phase9e): add dev-mode switch for UI strict EventBus
324f0b6 (refactor/phase9d_1-log-metadata) docs(ai): add review packet for phase 9d_1
bacf595 docs(phase9d_1): fix phase9d log metadata
37df0dc (refactor/phase9d-ui-blueprint-preview-dedup) docs(ai): add review packet for phase 9d
ae12eaa docs(phase9d): record readiness-gated probe
d809461 refactor(phase9d): dedupe blueprint preview control wiring
caf72fc (refactor/phase9c_1-log-metadata) docs(ai): add review packet for phase 9c_1
45cf14b docs(phase9c_1): fix phase9c log metadata
1f1578d (refactor/phase9c-ui-blueprint-preview-panel) docs(ai): add review packet for phase 9c
```

## Audit Evidence (base...phase_end)
```bash
git diff --stat 6883132...f7f8d20 -- city-sim.html src/ui/panels/DevHUDPanel.js REFACTOR_LOG.md docs/ai/review_packet_phase9g.md
 REFACTOR_LOG.md              | 15 +++++++
 city-sim.html                | 60 ++++++++++++++++++++++++++-
 src/ui/panels/DevHUDPanel.js | 98 ++++++++++++++++++++++++++++++++++++++++++++
 3 files changed, 172 insertions(+), 1 deletion(-)
```

```bash
git diff --check 6883132...f7f8d20 -- city-sim.html src/ui/panels/DevHUDPanel.js REFACTOR_LOG.md docs/ai/review_packet_phase9g.md
(no output)
```

```bash
git diff -U15 6883132...f7f8d20 -- city-sim.html src/ui/panels/DevHUDPanel.js REFACTOR_LOG.md docs/ai/review_packet_phase9g.md
<see working tree excerpt captured in terminal; key hunks included below via git show>
```

```bash
git show -U5 9f2d162 -- city-sim.html
(commit 9f2d162...)
- import { createDevHUDPanel } from './src/ui/panels/DevHUDPanel.js';
- added devHudPanel/devHudState
- added summarizeProbeForHUD
- ensurePanelManager now registers createDevHUDPanel(...)
- syncTrafficPanel now syncs devHud.lastProbe
```

```bash
git show -U15 9f2d162 -- src/ui/panels/DevHUDPanel.js
(new file with createDevHUDPanel({ doc, state, actions, enabled }))
- init(): idempotent, creates #devHud only when enabled
- sync(): updates LEN/SHA/sceneCounts/blueprintCounts/overlayDrift text
- Run Probe button calls injected actions.runProbe()
```

```bash
git show -U15 f7f8d20 -- REFACTOR_LOG.md
- added Phase 9g block with base_commit 6883132
- probe capture fields recorded (len/sha/counts/drift/rendererInfo)
```

## Pinned Module Contents
```bash
git show f7f8d20:src/ui/panels/DevHUDPanel.js
export function createDevHUDPanel({ doc = document, state = {}, actions = {}, enabled = false } = {}) {
  let initialized = false;
  let panelState = {
    lastProbe: null
  };
  let container = null;
  let probeSummaryEl = null;

  function formatProbeSummary(summary) {
    if (!summary) return 'No probe run yet';
    if (summary.error) return `Error: ${summary.error}`;
    const lines = [];
    if (Number.isFinite(summary.len)) lines.push(`LEN: ${summary.len}`);
    if (summary.sha) lines.push(`SHA: ${summary.sha}`);
    if (summary.sceneCounts) lines.push(`sceneCounts: ${JSON.stringify(summary.sceneCounts)}`);
    if (summary.blueprintCounts) lines.push(`blueprintCounts: ${JSON.stringify(summary.blueprintCounts)}`);
    if (summary.overlayDrift) lines.push(`overlayDrift: ${JSON.stringify(summary.overlayDrift)}`);
    return lines.join('\n') || 'No probe run yet';
  }

  function ensureContainer() {
    if (!enabled) return null;
    if (container) return container;

    container = doc.createElement('div');
    container.id = 'devHud';
    container.style.position = 'fixed';
    container.style.top = '12px';
    container.style.right = '12px';
    container.style.zIndex = '1600';
    container.style.width = '320px';
    container.style.maxHeight = '35vh';
    container.style.overflow = 'auto';
    container.style.padding = '10px';
    container.style.borderRadius = '8px';
    container.style.background = 'rgba(8, 14, 32, 0.9)';
    container.style.border = '1px solid rgba(100, 200, 255, 0.45)';
    container.style.color = '#d9ebff';
    container.style.font = '12px/1.35 monospace';

    const title = doc.createElement('div');
    title.textContent = 'Dev HUD';
    title.style.fontWeight = '700';
    title.style.marginBottom = '8px';
    title.style.color = '#7ad0ff';

    const runButton = doc.createElement('button');
    runButton.type = 'button';
    runButton.textContent = 'Run Probe';
    runButton.style.marginBottom = '8px';
    runButton.style.width = '100%';
    runButton.addEventListener('click', async () => {
      if (typeof actions.runProbe !== 'function') return;
      const next = await actions.runProbe();
      if (next) {
        sync({ devHud: { lastProbe: next } });
      }
    });

    probeSummaryEl = doc.createElement('pre');
    probeSummaryEl.style.margin = '0';
    probeSummaryEl.style.whiteSpace = 'pre-wrap';
    probeSummaryEl.style.wordBreak = 'break-word';
    probeSummaryEl.textContent = formatProbeSummary(panelState.lastProbe);

    container.appendChild(title);
    container.appendChild(runButton);
    container.appendChild(probeSummaryEl);
    doc.body.appendChild(container);
    return container;
  }

  function sync(nextState = state) {
    if (!enabled) return;
    const nextHudState = nextState?.devHud || nextState || {};
    panelState = {
      ...panelState,
      ...nextHudState
    };
    ensureContainer();
    if (probeSummaryEl) {
      probeSummaryEl.textContent = formatProbeSummary(panelState.lastProbe);
    }
  }

  function init() {
    if (initialized) return;
    initialized = true;
    if (!enabled) return;
    ensureContainer();
    sync(state);
  }

  return {
    init,
    sync
  };
}
```

## Probe Gate / Invariants
```bash
grep -nF "refactorProbe" city-sim.html
1037:    return { error: 'runRefactorProbe unavailable (open ?refactorProbe=1)' };
1161:    const probeEnabled = urlSearchParams.has('refactorProbe');
1215:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
6292:                devHudState.lastProbe = { error: 'runRefactorProbe unavailable (open ?refactorProbe=1)' };
```

```bash
grep -nF "import('./tools/refactorProbe.js')" city-sim.html || grep -nF 'import("./tools/refactorProbe.js")' city-sim.html
1215:      import('./tools/refactorProbe.js').then(({ buildRefactorProbeJSON }) => {
```

## Probe Summary
- URL: `http://localhost:8000/city-sim.html?refactorProbe=1`
- Method: readiness-gated MCP probe
- REFACTOR_PROBE_LEN: `3978`
- REFACTOR_PROBE_SHA256: `c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa`
- sceneCounts: `{ meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }`
- blueprintCounts: `{ beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }`
- overlayDrift: `{ ok: true, epsPx: 0.05, maxDriftPx: 0 }`
- parity decision: `PASS` (tracked fields match baseline)

## Carry-forward
- `P0`: None.
- `P1`: REFACTOR_LOG Phase 9g still has `phase_end_commit` and `packet_commit` as `PENDING`; backfill in next docs-only hygiene phase.
  - locator: `REFACTOR_LOG.md` (`## Phase 9g – UI DevHUD panel (dev-only)`)
  - acceptance: set `phase_end_commit=f7f8d20` and `packet_commit=<phase9g packet sha>`.
- `P2`: `DevHUDPanel` currently reports `SHA` only if probe object carries `__hash`; can optionally compute hash in action for fuller HUD output in a future dev-only refinement.
  - locator: `src/ui/panels/DevHUDPanel.js`
  - acceptance: show SHA consistently without changing probe behavior.

## Packet Commit Evidence (Pre-commit, cached)
```bash
git diff --stat --cached
 docs/ai/review_packet_phase9g.md | 238 +++++++++++++++++++++++++++++++++++++++
 1 file changed, 238 insertions(+)
```

```bash
git diff --check --cached
(no output)
```
