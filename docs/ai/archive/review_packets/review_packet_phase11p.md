# Review Packet: Phase 11p

## Metadata
- branch: `refactor/phase11p-phase11-packet-index`
- base_commit: `af77516`
- phase_end_commit: `c636f6a`
- packet_commit: `PENDING` (self-reference; see git log)
- focus_paths:
  - `docs/ai/review_packet_index_phase11.md`
  - `REFACTOR_LOG.md`
  - `docs/ai/review_packet_phase11p.md`

## Determinism
```bash
command -v rg >/dev/null && echo "rg=1" || echo "rg=0"
rg=1
```

## Fixed Evidence Commands
```bash
git status -sb
## refactor/phase11p-phase11-packet-index
?? docs/ai/review_packet_phase11p.md
```

```bash
git rev-parse --short HEAD
c636f6a
```

```bash
git log --oneline --decorate -n 20
c636f6a (HEAD -> refactor/phase11p-phase11-packet-index) docs(phase11p): add Phase 11 review packet index
af77516 (refactor/phase11o-scanner-result-overlaymeta) docs(ai): add review packet for phase 11o
bd758f4 docs(phase11o): record readiness-gated probe
03cff28 refactor(phase11o): thread overlayMeta through scanner result
897c6c5 (refactor/phase11n-imagesource-meta-scale) docs(ai): add review packet for phase 11n
049b2de docs(phase11n): record readiness-gated probe
8264de0 refactor(phase11n): expose additive overlay meta scale fields
686af22 (refactor/phase11m-overlaymeta-scale-fields) docs(ai): add review packet for phase 11m
40b7ce2 docs(phase11m): record readiness-gated probe
c148d6a refactor(phase11m): add optional overlayMeta scale fields
818d216 (refactor/phase11l_1-log-metadata) docs(ai): add review packet for phase 11l_1
7237efd docs(phase11l_1): backfill phase11l log metadata
782964f (refactor/phase11l-overlaymeta-maxedge-originaldims) docs(ai): add review packet for phase 11l
63d3475 docs(phase11l): record readiness-gated probe
aa8b6f6 refactor(phase11l): enrich overlayMeta helper with optional import constraints
67162f5 (refactor/phase11k_1-log-metadata) docs(ai): add review packet for phase 11k_1
e9481ff docs(phase11k_1): backfill phase11k log metadata
d3ca2bf (refactor/phase11k-scanner-overlaymeta-helper) docs(ai): add review packet for phase 11k
636d43f docs(phase11k): record readiness-gated probe
df6db91 refactor(phase11k): extract scanner overlayMeta helper
```

## Audit Evidence (<base>...<phase_end>, bounded)
```bash
git diff --stat af77516...c636f6a -- docs/ai/review_packet_index_phase11.md REFACTOR_LOG.md docs/ai/review_packet_phase11p.md
 REFACTOR_LOG.md                        |  9 ++++++++
 docs/ai/review_packet_index_phase11.md | 39 ++++++++++++++++++++++++++++++++++
 2 files changed, 48 insertions(+)
```

```bash
git diff --check af77516...c636f6a -- docs/ai/review_packet_index_phase11.md REFACTOR_LOG.md docs/ai/review_packet_phase11p.md
(no output)
```

```bash
git diff -U15 af77516...c636f6a -- docs/ai/review_packet_index_phase11.md REFACTOR_LOG.md docs/ai/review_packet_phase11p.md
diff --git a/REFACTOR_LOG.md b/REFACTOR_LOG.md
index 7b20f17..8a19353 100644
--- a/REFACTOR_LOG.md
+++ b/REFACTOR_LOG.md
@@ -594,15 +594,24 @@ Probe check (post-extraction):
 ## Phase 11o – Scanner result carries overlayMeta provenance

 - branch: refactor/phase11o-scanner-result-overlaymeta
 - base_commit: 897c6c5
 - phase_end_commit: PENDING
 - packet_commit: PENDING
 - capture_method: codex-mcp (readiness gated)
 - url: http://localhost:8000/city-sim.html?refactorProbe=1
 - json_len: 3977
 - json_sha256: ac1cc0cdeadfa7bbbdcf1bb844f35a32e78404ce075499b1514f142d40f4529d
 - sceneCounts: { meshCount: 631, lineCount: 6, pointCount: 0, groupCount: 206, geometryCount: 443, materialCount: 345 }
 - blueprintCounts: { beaches: 0, buildings: 0, coastlines: 1, pois: 1, roads: 2, sea: 0, transit: 0, zones: 1 }
 - overlayDrift: { ok: true, epsPx: 0.05, maxDriftPx: 0 }
 - rendererInfo: { memory: { geometries: 436, textures: 3 }, render: { calls: 626, triangles: 22614, lines: 0, points: 0 } }
 - parity_decision: PASS (tracked fields unchanged and hash matches current baseline snapshot)
+
+## Phase 11p – Phase 11 packet index + naming audit
+
+- branch: refactor/phase11p-phase11-packet-index
+- base_commit: af77516
+- phase_end_commit: PENDING
+- packet_commit: PENDING
+- capture_method: n/a (docs-only)
+- probe: NOT RUN (docs-only)
diff --git a/docs/ai/review_packet_index_phase11.md b/docs/ai/review_packet_index_phase11.md
new file mode 100644
index 0000000..87e94c1
--- /dev/null
+++ b/docs/ai/review_packet_index_phase11.md
@@ -0,0 +1,39 @@
+# Phase 11 Review Packet Index
+
+This index tracks Phase 11 review packets in chronological order and their `_1` metadata backfills.
+
+## Primary Phase Packets
+- `docs/ai/review_packet_phase11a.md`: Phase 11a scanner scaffolding placeholder.
+- `docs/ai/review_packet_phase11b.md`: Phase 11b validate/normalize placeholder pipeline.
+- `docs/ai/review_packet_phase11c.md`: Phase 11c scanner draft normalization hardening.
+- `docs/ai/review_packet_phase11d.md`: Phase 11d scanner draft orchestration move.
+- `docs/ai/review_packet_phase11e.md`: Phase 11e legend rules move to config + scanner shim.
+- `docs/ai/review_packet_phase11f.md`: Phase 11f DraftBlueprintBuilder placeholder.
+- `docs/ai/review_packet_phase11g.md`: Phase 11g ScannerController uses DraftBlueprintBuilder.
+- `docs/ai/review_packet_phase11h.md`: Phase 11h ImageSource normalization.
+- `docs/ai/review_packet_phase11i.md`: Phase 11i stable imageId + calibration keying.
+- `docs/ai/review_packet_phase11j.md`: Phase 11j scanner consumes normalized overlay meta.
+- `docs/ai/review_packet_phase11k.md`: Phase 11k overlayMeta helper extraction.
+- `docs/ai/review_packet_phase11l.md`: Phase 11l overlayMeta optional original/max-edge fields.
+- `docs/ai/review_packet_phase11m.md`: Phase 11m overlayMeta scale fields.
+- `docs/ai/review_packet_phase11n.md`: Phase 11n ImageSource additive scale metadata.
+- `docs/ai/review_packet_phase11o.md`: Phase 11o scan result overlayMeta provenance.
+
+## Metadata Backfill Packets (`_1`)
+- `docs/ai/review_packet_phase11a_1.md`: docs-only metadata backfill for Phase 11a.
+- `docs/ai/review_packet_phase11b_1.md`: docs-only metadata backfill for Phase 11b.
+- `docs/ai/review_packet_phase11c_1.md`: docs-only metadata backfill for Phase 11c.
+- `docs/ai/review_packet_phase11d_1.md`: docs-only metadata backfill for Phase 11d.
+- `docs/ai/review_packet_phase11e_1.md`: docs-only metadata backfill for Phase 11e.
+- `docs/ai/review_packet_phase11f_1.md`: docs-only metadata backfill for Phase 11f.
+- `docs/ai/review_packet_phase11g_1.md`: docs-only metadata backfill for Phase 11g.
+- `docs/ai/review_packet_phase11h_1.md`: docs-only metadata backfill for Phase 11h.
+- `docs/ai/review_packet_phase11i_1.md`: docs-only metadata backfill for Phase 11i.
+- `docs/ai/review_packet_phase11j_1.md`: docs-only metadata backfill for Phase 11j.
+- `docs/ai/review_packet_phase11k_1.md`: docs-only metadata backfill for Phase 11k.
+- `docs/ai/review_packet_phase11l_1.md`: docs-only metadata backfill for Phase 11l.
+
+## Current Packet Inventory Command
+```bash
+ls -1 docs/ai/review_packet_phase11*.md | sort
+```
```

## Packet Inventory
```bash
ls -1 docs/ai/review_packet_phase11*.md | sort
docs/ai/review_packet_phase11a.md
docs/ai/review_packet_phase11a_1.md
docs/ai/review_packet_phase11b.md
docs/ai/review_packet_phase11b_1.md
docs/ai/review_packet_phase11c.md
docs/ai/review_packet_phase11c_1.md
docs/ai/review_packet_phase11d.md
docs/ai/review_packet_phase11d_1.md
docs/ai/review_packet_phase11e.md
docs/ai/review_packet_phase11e_1.md
docs/ai/review_packet_phase11f.md
docs/ai/review_packet_phase11f_1.md
docs/ai/review_packet_phase11g.md
docs/ai/review_packet_phase11g_1.md
docs/ai/review_packet_phase11h.md
docs/ai/review_packet_phase11h_1.md
docs/ai/review_packet_phase11i.md
docs/ai/review_packet_phase11i_1.md
docs/ai/review_packet_phase11j.md
docs/ai/review_packet_phase11j_1.md
docs/ai/review_packet_phase11k.md
docs/ai/review_packet_phase11k_1.md
docs/ai/review_packet_phase11l.md
docs/ai/review_packet_phase11l_1.md
docs/ai/review_packet_phase11m.md
docs/ai/review_packet_phase11n.md
docs/ai/review_packet_phase11o.md
```

## Packet Pre-Commit Evidence
```bash
git diff --stat --cached
 docs/ai/review_packet_phase11p.md | 192 ++++++++++++++++++++++++++++++++++++++
 1 file changed, 192 insertions(+)
```

```bash
git diff --check --cached
(no output)
```

## Carry-Forward
- P0: none.
- P1: none.
- P2: none.
