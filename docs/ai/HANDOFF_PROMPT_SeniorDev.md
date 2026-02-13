# SeniorDev Handoff Prompt (Phase 12)

## 1) Source Documents
- Refactor plan: `REFACTOR_EXECUTION_PLAN_TIGHT_v7_rev4.md`
- Execution log: `REFACTOR_LOG.md`
- Upload routing: `docs/ai/UPLOAD_BUNDLE_MASTER.md`
- Packet evidence policy: `docs/ai/PACKET_EVIDENCE_BUNDLE.md`

## 2) Review Procedure
1. Read `REFACTOR_LOG.md` for phase ordering and commit metadata.
2. Open `docs/ai/UPLOAD_BUNDLE_MASTER.md` and pick the matching scope bundle.
3. If deeper evidence is needed, open the optional deep-evidence file linked by that bundle.

## 3) Local Probe Check
- Serve over HTTP from repo root:
```bash
python3 -m http.server 8000
```
- Open:
`http://localhost:8000/city-sim.html?refactorProbe=1`
- Run readiness-gated probe using the canonical snippet referenced in `docs/ai/PACKET_EVIDENCE_BUNDLE.md`.

## 4) PASS Criteria
- `sceneCounts` unchanged from accepted baseline
- `blueprintCounts` unchanged from accepted baseline
- `overlayDrift.ok === true`
- `overlayDrift.epsPx === 0.05`
- `overlayDrift.maxDriftPx <= 0.05`

## 5) Upload Convention
- Preferred: markdown bundles only (no zip required)
- Minimum upload set: `REFACTOR_LOG.md` + `UPLOAD_BUNDLE_MASTER.md` + one scope-specific bundle
