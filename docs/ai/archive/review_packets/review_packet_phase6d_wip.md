# Phase 6d WIP — Probe Hash Drift Evidence

## Metadata
- Branch: refactor/phase6d-road-layer
- HEAD: 0274fb4
- packet_commit: PENDING (self-reference; see git log section)

## Context
Baseline hash (Phase 6c packet): `2526c68e85ea72655154e08d692db9d3d0c46de7b5edf812091f674f74b6fa0b`

Clean-tree probe runs (no UI actions):
- RUN1: LEN=3977 SHA256=ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
- RUN2: LEN=3978 SHA256=c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa

Summary fields (latest run):
```json
{"sceneCounts":{"meshCount":631,"lineCount":6,"pointCount":0,"groupCount":206,"geometryCount":443,"materialCount":345},"blueprintCounts":{"beaches":0,"buildings":0,"coastlines":1,"pois":1,"roads":2,"sea":0,"transit":0,"zones":1},"overlayDrift":{"ok":true,"epsPx":0.05,"maxDriftPx":0}}
```

Clean-tree probe (rev3 triage, new run):
- LEN=3968 SHA256=1db55488f2ae68c57bb67e8783ec5d01eb2c80c398f53e2522f0d8aba04d1874
- sceneCounts: { meshCount: 628, lineCount: 2, pointCount: 0, groupCount: 206, geometryCount: 436, materialCount: 338 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 0, pois: 0, roads: 0, sea: 0, transit: 0, zones: 0 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
- NOTE: counts do NOT match Phase 6c baseline; drift reproduced on clean tree.

Status: Hash drift on clean tree → STOP (per v7_rev3).

## Patch-applied probe (WIP reproduction)
- LEN=3968 SHA256=1db55488f2ae68c57bb67e8783ec5d01eb2c80c398f53e2522f0d8aba04d1874
- sceneCounts: { meshCount: 628, lineCount: 2, pointCount: 0, groupCount: 206, geometryCount: 436, materialCount: 338 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 0, pois: 0, roads: 0, sea: 0, transit: 0, zones: 0 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
- NOTE: parity fields drift (counts differ vs baseline), so STOP (no work commit).

Console errors (patch-applied run):
- Failed to load resource: the server responded with a status of 404 (File not found)

Blueprint debug (patch-applied run):
- keys: [\"meta\",\"coastlines\",\"beaches\",\"sea\",\"transit\",\"roads\",\"zones\",\"buildings\",\"pois\"]
- lengths: { roads: 0, zones: 0, coastlines: 0, buildings: 0, pois: 0, beaches: 0 }
- hasBlueprint: true

## Work tree snapshot (patch applied, no commit)
### git status -sb
```
## refactor/phase6d-road-layer-triage2
 M city-sim.html
?? src/geometry/
?? src/render/RoadLayer.js
```

### git diff --stat
```
 city-sim.html | 79 ++++++++---------------------------------------------------
 1 file changed, 10 insertions(+), 69 deletions(-)
```

## Rev3 baseline recovery attempt (Phase6d triage2)

### curl -I http://localhost:8000/city-sim.html
```
HTTP/1.0 200 OK
Server: SimpleHTTP/0.6 Python/3.13.0
Date: Thu, 05 Feb 2026 21:39:23 GMT
Content-type: text/html
Content-Length: 290841
Last-Modified: Thu, 05 Feb 2026 18:10:52 GMT
```

### curl -I http://localhost:8000/src/mapBlueprint.json
```
HTTP/1.0 200 OK
Server: SimpleHTTP/0.6 Python/3.13.0
Date: Thu, 05 Feb 2026 21:39:56 GMT
Content-type: application/json
Content-Length: 920
Last-Modified: Sat, 17 Jan 2026 12:49:45 GMT
```

### fetch('./src/mapBlueprint.json') status
```
{ ok: true, status: 200 }
```

### Probe RUN1 (clean tree, after hard reload)
- LEN=4201 SHA256=d3785458634079f4137c5fdb8ed9cf5a03fe97492330ed1de133700f95fec183
- sceneCounts: { meshCount: 634, lineCount: 6, pointCount: 0, groupCount: 211, geometryCount: 442, materialCount: 344 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 0, pois: 0, roads: 0, sea: 0, transit: 0, zones: 0 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }

### Probe RUN2 (single reload retry)
- LEN=3978 SHA256=c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa
- sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
- blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
- overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }

### Console errors (include missing URL)
- Failed to load resource: the server responded with a status of 404 (File not found)
- Missing URL (network request): http://localhost:8000/favicon.ico

### STOP reason (rev3)
- RUN1 blueprintCounts all zero OR any 404 -> STOP (no Phase 6d code commits).

## Git Evidence (verbatim)
### git status -sb
```
## refactor/phase6d-road-layer
?? docs/ai/review_packet_phase6d_wip.md
```

### git log --oneline --decorate -n 20
```
0274fb4 (HEAD -> refactor/phase6d-road-layer) docs: track v7_rev3 plan; drop v7_rev2
3e0de09 (refactor/phase6c-zone-layer) docs(ai): add phase6c.1 alignment packet
dfdfbea docs(phase6c.1): align Phase 6c metadata
42403a6 docs(ai): add review packet for phase 6c
2b051a4 docs(phase6c): record probe baseline match
80d8446 refactor(phase6c): extract zone layer
cc7eb76 docs(phase6c): fix phase6b metadata note
f4f5e91 (refactor/phase6b-terrain-layer) docs(ai): add review packet for phase 6b
b932578 docs(phase6b): record probe baseline match
b3e269d refactor(phase6b): extract terrain generator/layer
a8d7fe8 (refactor/phase6a-material-library) docs(plan): replace refactor plan v7 rev1 with rev2
7e85b9f docs(ai): fix phase6a packet_commit
aaaf294 docs(ai): add review packet for phase 6a
ce16421 feat(phase6a): add MaterialLibrary and shared window assets
c1e482d (refactor/phase5_2-probe-hygiene) docs(ai): fix phase5.2 packet_commit
093431d docs(ai): add review packet for phase 5.2
8c0801e docs(phase5.2): record probe hygiene verification
8d49f5e (refactor/phase5_1-evidence-alignment) docs(ai): fix phase5.1 packet_commit
5a1fffd docs(ai): add phase5.1 evidence alignment packet
6ab75e6 (refactor/phase5-scene-layer-ownership) docs(ai): finalize phase5 packet_commit
```

### git diff --stat --cached
```
 docs/ai/review_packet_phase6d_wip.md | 32 ++++++++++++++++++++++++++++++++
 1 file changed, 32 insertions(+)
```

### git diff --check --cached
```
```
