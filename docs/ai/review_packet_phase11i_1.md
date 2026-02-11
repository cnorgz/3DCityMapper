# Review Packet — Phase 11i_1 (docs-only)

## Metadata
- branch: `refactor/phase11i_1-log-metadata`
- base_commit: `43ed3f5`
- phase_end_commit: `a05348d`
- packet_commit: `PENDING` (self-reference; see git log)
- focus_paths:
  - `REFACTOR_LOG.md`
  - `docs/ai/review_packet_phase11i_1.md`

## Determinism
```bash
command -v rg >/dev/null && echo "rg=1" || echo "rg=0"
rg=1
```

## Fixed Evidence Commands (verbatim)
```bash
git status -sb
## refactor/phase11i_1-log-metadata
```

```bash
git rev-parse --short HEAD
a05348d
```

```bash
git log --oneline --decorate -n 20
a05348d (HEAD -> refactor/phase11i_1-log-metadata) docs(phase11i_1): backfill phase11i log metadata
43ed3f5 (refactor/phase11i-imageid-calib-keying) docs(ai): add review packet for phase 11i
f2bd6da docs(phase11i): record readiness-gated probe
3779c3a refactor(phase11i): add stable imageId keying and calib migration fallback
aa6b8a3 (refactor/phase11h-image-source-normalize-2048) docs(ai): add review packet for phase 11h
0afa0d9 docs(phase11h): record readiness-gated probe
8ede508 refactor(phase11h): harden image source normalization metadata
edc47d8 (refactor/phase11g_1-log-metadata) docs(ai): add review packet for phase 11g_1
880a352 docs(phase11g_1): backfill phase11g log metadata
6eee608 (refactor/phase11f_1-log-metadata) docs(ai): add review packet for phase 11f_1
96abc39 docs(phase11f_1): backfill phase11f log metadata
d3b3298 (refactor/phase11e_1-log-metadata) docs(ai): add review packet for phase 11e_1
311a419 docs(phase11e_1): backfill phase11e log metadata
ded6d59 (refactor/phase11g-scanner-use-draft-builder) docs(ai): add review packet for phase 11g
8eb12e4 docs(phase11g): record readiness-gated probe
7bbda6f refactor(phase11g): wire scanner controller through DraftBlueprintBuilder
53c2bbc (refactor/phase11f-draft-blueprint-builder) docs(ai): add review packet for phase 11f
0a201ba docs(phase11f): record readiness-gated probe
e017763 refactor(phase11f): add DraftBlueprintBuilder placeholder
b029371 (refactor/phase11e-legendrules-to-config) docs(ai): add review packet for phase 11e
```

## Bounded Diff Evidence (`base...phase_end`)
```bash
git diff --stat 43ed3f5...a05348d -- REFACTOR_LOG.md docs/ai/review_packet_phase11i_1.md
 REFACTOR_LOG.md | 4 ++--
 1 file changed, 2 insertions(+), 2 deletions(-)
```

```bash
git diff --check 43ed3f5...a05348d -- REFACTOR_LOG.md docs/ai/review_packet_phase11i_1.md
(no output)
```

```bash
git diff -U15 43ed3f5...a05348d -- REFACTOR_LOG.md docs/ai/review_packet_phase11i_1.md
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 2b34240..19164d1 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -487,26 +487,26 @@ Probe check (post-extraction):
 - packet_commit: PENDING
 - capture_method: codex-mcp (readiness gated)
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_len: 3977
 - json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
 - rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }
 - parity_decision: PASS (tracked fields unchanged and hash matches baseline snapshot)

 ## Phase 11i – Stable imageId + calibration keying

 - branch: refactor/phase11i-imageid-calib-keying
 - base_commit: aa6b8a3
- phase_end_commit: PENDING
- packet_commit: PENDING
+ phase_end_commit: f2bd6da
+ packet_commit: 43ed3f5
 - capture_method: codex-mcp (readiness gated)
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_len: 3978
 - json_sha256: c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
 - rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }
 - parity_decision: PASS (tracked fields unchanged; hash variance accepted per v7 triage)
```

## Carry-Forward
- P0: none
- P1: none

## Packet Commit Evidence (pre-commit)
```bash
git diff --stat --cached
(captured after staging packet file)
```

```bash
git diff --check --cached
(captured after staging packet file; expected no output)
```
