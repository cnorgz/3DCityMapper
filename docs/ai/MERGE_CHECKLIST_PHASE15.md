# Merge Checklist — Phase 15

## Local Probe Validation
1. Start a local server from repo root:
```bash
python3 -m http.server 8000
```
2. Open:
`http://localhost:8000/city-sim.html?refactorProbe=1`
3. Run readiness-gated probe capture per `docs/ai/PACKET_EVIDENCE_BUNDLE.md`.

## PASS Criteria
- `sceneCounts` unchanged from accepted baseline
- `blueprintCounts` unchanged from accepted baseline
- `overlayDrift.ok === true`
- `overlayDrift.epsPx === 0.05`
- `overlayDrift.maxDriftPx <= 0.05`

## Post-Merge Smoke Checks (Non-invasive)
- Open `city-sim.html` over HTTP and verify no startup errors in console.
- Confirm upload bundle docs are reachable from `docs/ai/UPLOAD_BUNDLE_MASTER.md`.
- Confirm `REFACTOR_LOG.md` has concrete metadata for completed phases.

## What To Share
- Primary share path uses 3-file rule:
  1. `REFACTOR_LOG.md`
  2. `docs/ai/UPLOAD_BUNDLE_MASTER.md`
  3. scope bundle (current final: `docs/ai/UPLOAD_BUNDLE_PHASE15_FINAL.md`)
