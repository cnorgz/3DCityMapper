# Phase 11e Review Packet

## Metadata
- branch: `refactor/phase11e-legendrules-to-config`
- base_commit: `cb56281`
- phase_end_commit: `08dba45`
- packet_commit: `PENDING` (self-reference; see git log)
- focus_paths:
  - `city-sim.html`
  - `src/config/legendRules.js`
  - `src/scanner/legendRules.js`
  - `REFACTOR_LOG.md`
  - `docs/ai/review_packet_phase11e.md`

## Determinism

```bash
$ command -v rg >/dev/null && echo "rg=1" || echo "rg=0"; if command -v rg >/dev/null; then rg --version | head -n 1; fi
rg=1
ripgrep 14.1.1 (rev 4649aa9700)
```

## Fixed Commands

```bash
$ git status -sb
## refactor/phase11e-legendrules-to-config
```

```bash
$ git rev-parse --short HEAD
08dba45
```

```bash
$ git log --oneline --decorate -n 20
08dba45 (HEAD -> refactor/phase11e-legendrules-to-config) docs(phase11e): record readiness-gated probe
5b1d1fb refactor(phase11e): move legendRules to src/config with scanner shim
cb56281 (refactor/phase11d_1-log-metadata) docs(ai): add review packet for phase 11d_1
be84cb6 docs(phase11d_1): backfill phase11d log metadata
0a9750b (refactor/phase11d-scanner-draft-pipeline) docs(ai): add review packet for phase 11d
041e143 docs(phase11d): record readiness-gated probe
78ee0b3 refactor(phase11d): move scanner draft validate/normalize orchestration into ScannerController
8e9efd9 (refactor/phase11c_1-log-metadata) docs(ai): add review packet for phase 11c_1
5734663 docs(phase11c_1): backfill phase11c log metadata
a7b9b64 (refactor/phase11c-scanner-normalize-safety) docs(ai): add review packet for phase 11c
f5ba1bd docs(phase11c): record readiness-gated probe
706ca15 refactor(phase11c): harden scanner draft normalization
3601fcd (refactor/phase11b_1-log-metadata) docs(ai): add review packet for phase 11b_1
a8c7f0e docs(phase11b_1): backfill phase11b log metadata
657d5da (refactor/phase11b-scanner-validate-normalize) docs(ai): add review packet for phase 11b
d2ff787 docs(phase11b): record readiness-gated probe
1cb03c2 refactor(phase11b): scanner validate+normalize placeholder
f125309 (refactor/phase11a_1-log-metadata) docs(ai): add review packet for phase 11a_1
38e3f68 docs(phase11a_1): fix phase11a log metadata
fc79b21 (refactor/phase11a-scanner-scaffolding) docs(ai): add review packet for phase 11a
```

## Audit Evidence (`cb56281...08dba45`)

```bash
$ git diff --stat cb56281...08dba45 -- city-sim.html src/config/legendRules.js src/scanner/legendRules.js REFACTOR_LOG.md docs/ai/review_packet_phase11e.md
 REFACTOR_LOG.md            | 15 +++++++++++++++
 src/config/legendRules.js  |  6 ++++++
 src/scanner/legendRules.js |  6 +-----
 3 files changed, 22 insertions(+), 5 deletions(-)
```

```bash
$ git diff --check cb56281...08dba45 -- city-sim.html src/config/legendRules.js src/scanner/legendRules.js REFACTOR_LOG.md docs/ai/review_packet_phase11e.md
(no output)
```

```bash
$ git diff -U15 cb56281...08dba45 -- city-sim.html src/config/legendRules.js src/scanner/legendRules.js REFACTOR_LOG.md docs/ai/review_packet_phase11e.md
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index e36f1cb..e1b6add 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -421,15 +421,30 @@ Probe check (post-extraction):
 ## Phase 11d – Scanner draft pipeline orchestration

 - branch: refactor/phase11d-scanner-draft-pipeline
 - base_commit: 8e9efd9
 - phase_end_commit: 041e143
 - packet_commit: 0a9750b
 - capture_method: codex-mcp (readiness gated)
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_len: 3977
 - json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
 - rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }
 - parity_decision: PASS (tracked fields match baseline; hash matches baseline snapshot)
+
+## Phase 11e – Legend rules move to config with scanner shim
+
+- branch: refactor/phase11e-legendrules-to-config
+- base_commit: cb56281
+- phase_end_commit: PENDING
+- packet_commit: PENDING
+- capture_method: codex-mcp (readiness gated)
+- url: http://localhost:8000/city-sim.html?refactorProbe=1
+- json_len: 3978
+- json_sha256: c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa
+- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
+- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
+- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
+- parity_decision: PASS (tracked fields unchanged and hash matches baseline snapshot)
diff --git a/src/config/legendRules.js b/src/config/legendRules.js
index ee49ca1..d3f30ad 100644
--- a/src/config/legendRules.js
+++ b/src/config/legendRules.js
@@ -29,15 +29,21 @@ export const LEGEND_TYPE_MAP = {
   PO: { label: 'Police Station', type: 'police', color: LEGEND_LINE_COLORS.PO, height: 18, buildable: true },
   PK: { label: 'Parking', type: 'parking', color: LEGEND_LINE_COLORS.PK, height: 6, buildable: true },
   MA: { label: 'Town Hall (Mairie)', type: 'mairie', color: LEGEND_LINE_COLORS.MA, height: 28, buildable: true },
   'H★': { label: 'Hotel', type: 'hotel', color: LEGEND_LINE_COLORS['H★'], height: 40, buildable: true },
   S: { label: 'Stadium (Stade)', type: 'stadium', color: LEGEND_LINE_COLORS.S, height: 12, buildable: false },
   T: { label: 'Transport/Train', type: 'transport', color: LEGEND_LINE_COLORS.T, height: 16, buildable: true },
   D: { label: 'Déchetterie', type: 'utilities', color: LEGEND_LINE_COLORS.D, height: 14, buildable: true },
   Ci: { label: 'Cinema', type: 'cinema', color: LEGEND_LINE_COLORS.Ci, height: 18, buildable: true },
   ff: { label: 'Fairground', type: 'fairground', color: LEGEND_LINE_COLORS.ff, height: 10, buildable: false },
   P: { label: 'Port', type: 'port', color: LEGEND_LINE_COLORS.P, height: 14, buildable: true },
   '⚡': { label: 'Electric Station', type: 'electric', color: LEGEND_LINE_COLORS['⚡'], height: 18, buildable: true },
   '💧': { label: 'Water Treatment', type: 'water', color: LEGEND_LINE_COLORS['💧'], height: 16, buildable: true }
 };

 export const ALLOWED_TYPE_CODES = new Set(Object.keys(LEGEND_TYPE_MAP));
+
+export const LEGEND_RULES = Object.freeze({
+  version: 'phase11a-placeholder',
+  mode: 'manual-legend',
+  classes: []
+});
diff --git a/src/scanner/legendRules.js b/src/scanner/legendRules.js
index 58ddc4a..76017bf 100644
--- a/src/scanner/legendRules.js
+++ b/src/scanner/legendRules.js
@@ -1,5 +1 @@
-export const LEGEND_RULES = Object.freeze({
-  version: 'phase11a-placeholder',
-  mode: 'manual-legend',
-  classes: []
-});
+export { LEGEND_RULES } from '../config/legendRules.js';
```

## Pinned Module Contents

```bash
$ git show 08dba45:src/config/legendRules.js
export const LEGEND_LINE_COLORS = {
  Q: 0xff3b3b,
  B: 0xffe85c,
  ZC: 0x2f7dff,
  J: 0x30ff7a,
  H: 0xc0c6d0,
  R: 0xff5fa3,
  PO: 0xb0723f,
  PK: 0xffb347,
  MA: 0xc08a62,
  'H★': 0x32c46a,
  S: 0xffffff,
  T: 0x9bffb0,
  D: 0xb0b0b0,
  Ci: 0xd07bff,
  ff: 0xffc06a,
  P: 0x7fbfff,
  '⚡': 0xfff04d,
  '💧': 0x5fd0ff
};

export const LEGEND_TYPE_MAP = {
  Q: { label: 'Residential (Quartiers)', type: 'residential', color: LEGEND_LINE_COLORS.Q, height: 22, buildable: true },
  B: { label: 'Offices (Bureaux)', type: 'office', color: LEGEND_LINE_COLORS.B, height: 32, buildable: true },
  ZC: { label: 'Commercial Zone', type: 'commercial', color: LEGEND_LINE_COLORS.ZC, height: 26, buildable: true },
  J: { label: 'Gardens/Parks (Jardins)', type: 'park', color: LEGEND_LINE_COLORS.J, height: 0, buildable: false },
  H: { label: 'Hospital (Hôpital)', type: 'hospital', color: LEGEND_LINE_COLORS.H, height: 30, buildable: true },
  R: { label: 'Restaurant', type: 'restaurant', color: LEGEND_LINE_COLORS.R, height: 14, buildable: true },
  PO: { label: 'Police Station', type: 'police', color: LEGEND_LINE_COLORS.PO, height: 18, buildable: true },
  PK: { label: 'Parking', type: 'parking', color: LEGEND_LINE_COLORS.PK, height: 6, buildable: true },
  MA: { label: 'Town Hall (Mairie)', type: 'mairie', color: LEGEND_LINE_COLORS.MA, height: 28, buildable: true },
  'H★': { label: 'Hotel', type: 'hotel', color: LEGEND_LINE_COLORS['H★'], height: 40, buildable: true },
  S: { label: 'Stadium (Stade)', type: 'stadium', color: LEGEND_LINE_COLORS.S, height: 12, buildable: false },
  T: { label: 'Transport/Train', type: 'transport', color: LEGEND_LINE_COLORS.T, height: 16, buildable: true },
  D: { label: 'Déchetterie', type: 'utilities', color: LEGEND_LINE_COLORS.D, height: 14, buildable: true },
  Ci: { label: 'Cinema', type: 'cinema', color: LEGEND_LINE_COLORS.Ci, height: 18, buildable: true },
  ff: { label: 'Fairground', type: 'fairground', color: LEGEND_LINE_COLORS.ff, height: 10, buildable: false },
  P: { label: 'Port', type: 'port', color: LEGEND_LINE_COLORS.P, height: 14, buildable: true },
  '⚡': { label: 'Electric Station', type: 'electric', color: LEGEND_LINE_COLORS['⚡'], height: 18, buildable: true },
  '💧': { label: 'Water Treatment', type: 'water', color: LEGEND_LINE_COLORS['💧'], height: 16, buildable: true }
};

export const ALLOWED_TYPE_CODES = new Set(Object.keys(LEGEND_TYPE_MAP));

export const LEGEND_RULES = Object.freeze({
  version: 'phase11a-placeholder',
  mode: 'manual-legend',
  classes: []
});
```

```bash
$ git show 08dba45:src/scanner/legendRules.js
export { LEGEND_RULES } from '../config/legendRules.js';
```

## Probe Summary
- url: `http://localhost:8000/city-sim.html?refactorProbe=1`
- REFACTOR_PROBE_LEN: `3978`
- REFACTOR_PROBE_SHA256: `c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa`
- sceneCounts: `{ meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }`
- blueprintCounts: `{ beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }`
- overlayDrift: `{ ok: true, epsPx: 0.05, maxDriftPx: 0 }`
- parity decision: `PASS` (tracked fields unchanged, hash matches baseline snapshot)

## Carry-Forward
- P0: none
- P1: `REFACTOR_LOG.md` Phase 11e `phase_end_commit` and `packet_commit` remain `PENDING` by branch convention; backfill in `11e_1`.
- P2: none

## Packet Commit Evidence (pre-commit)

```bash
$ git diff --stat --cached
 docs/ai/review_packet_phase11e.md | 235 ++++++++++++++++++++++++++++++++++++++
 1 file changed, 235 insertions(+)
```

```bash
$ git diff --check --cached
(no output)
```
