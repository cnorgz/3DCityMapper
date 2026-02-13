# Upload Bundle — Phase 0 to 9

## Purpose
Minimal upload facade for refactor phases 0 through 9, so SeniorDev review can run from a small markdown set.

## Coverage
- Phase 0 baseline
- Phase 5/5.2 parity and probe hygiene
- Phase 6a..6g renderer/layer extraction slices
- Phase 7a..7e editor extraction slices
- Phase 8 traffic extraction
- Phase 9a..9g UI modularization slices

## Phase Metadata (sourced from REFACTOR_LOG.md)

| Phase | Branch | Base Commit | Phase End Commit | Packet Commit | Notes |
|---|---|---|---|---|---|
| 0 | n/a | n/a | n/a | n/a | Baseline record exists (`baseline_commit=3501049`) but branch/end/packet fields are not structured in log. |
| 5 | n/a | n/a | `d76cadc` | n/a | Probe check commit recorded; no branch/packet fields in this section. |
| 5.2 | n/a | n/a | n/a | n/a | Manual probe hygiene record; no commit triplet fields. |
| 6a | `refactor/phase6a-material-library` (from packet history) | n/a | n/a | n/a | Log stores probe output only; commit triplet not fully structured. |
| 6b | `refactor/phase6b-terrain-layer` | `a8d7fe8` | `b932578` | n/a | Base/end present; packet SHA not recorded in log. |
| 6c | `refactor/phase6c-zone-layer` | `f4f5e91` | `2b051a4` | n/a | Base/end present; packet SHA not recorded in log. |
| 6d (triage) | n/a | n/a | n/a | n/a | Hash-policy record only. |
| 6d (road layer) | `refactor/phase6d-road-layer-triage2` | n/a | `5ee91fd` | n/a | End recorded; base/packet absent in log. |
| 6e | `refactor/phase6e-building-layer` | n/a | n/a | n/a | Probe section present; commit triplet absent in log. |
| 6f | `refactor/phase6f-props-debug` | n/a | n/a | n/a | Probe section present; commit triplet absent in log. |
| 6g | `refactor/phase6g-city-renderer` | n/a | n/a | n/a | Probe section present; commit triplet absent in log. |
| 7a | `refactor/phase7a-editor-rebuild-scheduler` | `23e77ed` | `4f1afa4` | n/a | Base/end present; packet absent in log. |
| 7b | `refactor/phase7b-editor-history-manager` | `5961cf5` | `a028b0e` | n/a | Base/end present; packet absent in log. |
| 7c | `refactor/phase7c-editor-snap-engine` | `483707c` | `957d3ea` | `ad2702b` | Fully structured. |
| 7d | `refactor/phase7d-editor-controller` | `446dea1` | `a11428d` | `c920af7` | Fully structured. |
| 7e | `refactor/phase7e-input-router-hit-test-gestures` | `c920af7` | `e857692` | `03cb9a0` | Fully structured. |
| 8 | `refactor/phase8-traffic-system` | `84bc767` | `aa5b414` | `4810ada` | Fully structured. |
| 9a | `refactor/phase9a-ui-panelmanager-traffic-panel` | `83a3967` | `3abe2cc` | `3982699` | Fully structured. |
| 9b | `refactor/phase9b-ui-eventbus-strict` | `3982699` | `ee3b220` | `245035e` | Fully structured. |
| 9c | `refactor/phase9c-ui-blueprint-preview-panel` | `e415781` | `bdd2d4f` | `1f1578d` | Fully structured. |
| 9d | `refactor/phase9d-ui-blueprint-preview-dedup` | `caf72fc` | `ae12eaa` | `37df0dc` | Fully structured. |
| 9e | `refactor/phase9e-ui-dev-mode-switch` | `324f0b6` | `e07ae40` | `58f38a5` | Fully structured. |
| 9f | `refactor/phase9f-ui-zone-info-panel` | `cc9f741` | `2969992` | `9b4bace` | Fully structured. |
| 9g | `refactor/phase9g-ui-devhud-panel` | `6883132` | `f7f8d20` | `3e36260` | Fully structured. |

## High-Level Focus Paths Across 0–9
- `city-sim.html`
- `src/render/*` (layers/orchestrator)
- `src/editor/*` (history/scheduler/snap/controller/input)
- `src/sim/*` (traffic)
- `src/ui/*` (panel/eventbus/dev mode)
- `REFACTOR_LOG.md`
- `docs/ai/review_packet_phase*.md`

## Minimal Upload Set (0–9 review)
1. `REFACTOR_LOG.md`
2. `docs/ai/UPLOAD_BUNDLE_MASTER.md`
3. `docs/ai/UPLOAD_BUNDLE_PHASE0-9.md`

## Optional Deep Evidence
Use existing packet files (no new index explosion needed), for example:
- `docs/ai/review_packet_phase6a.md` ... `docs/ai/review_packet_phase9g.md`
- plus any corresponding `_1` metadata packets where relevant.
