# Upload Bundle — Phase 10/11 (External Review)

## Purpose
Upload-ready summary for SeniorDev review and ChatGPT upload minimization.

## Scope
Included phases in this bundle:
- Phase 10l_1, 10m, 10n, 10o, 10p, 10q
- Phase 11q, 11r, 11s, 11t, 11u, 11v

## Per-Phase Summary

| Phase | Branch | Base Commit | Phase End Commit | Packet Commit | Packet File | What Changed |
|---|---|---:|---:|---:|---|---|
| 10l_1 | `refactor/phase10l_1-log-metadata` | `ac7a562` | `1069d02` | `bf96fef` | `docs/ai/review_packet_phase10l_1.md` | Backfilled Phase 10l metadata in `REFACTOR_LOG.md`. |
| 10m | `refactor/phase10m-phase10-packet-index-refresh` | `bf96fef` | `527a133` | `70d63fa` | `docs/ai/review_packet_phase10m.md` | Refreshed Phase 10 packet index with full packet inventory. |
| 10n | `refactor/phase10n-docs-index-map` | `70d63fa` | `7b34dd5` | `e4c3653` | `docs/ai/review_packet_phase10n.md` | Added canonical docs map + root-stub policy docs. |
| 10o | `refactor/phase10o-root-stub-normalize` | `e4c3653` | `77715e0` | `31fbfc5` | `docs/ai/review_packet_phase10o.md` | Normalized root-level stub formatting and links. |
| 10p | `refactor/phase10p-doc-links-sanity-2` | `31fbfc5` | `3d2d676` | `67065ce` | `docs/ai/review_packet_phase10p.md` | Fixed broken relative doc links after canonical-doc move. |
| 10q | `refactor/phase10q-docs-readme-structure` | `67065ce` | `5fccf75` | `7f886fb` | `docs/ai/review_packet_phase10q.md` | Added concise docs structure section in `docs/README.md`. |
| 11q | `refactor/phase11q-phase11-packet-index-refresh` | `7f886fb` | `8d10c51` | `6ad41cd` | `docs/ai/review_packet_phase11q.md` | Refreshed Phase 11 packet index with current inventory. |
| 11r | `refactor/phase11r-scanner-doc-overlaymeta-schema` | `6ad41cd` | `a1393d8` | `86025e3` | `docs/ai/review_packet_phase11r.md` | Added factual OverlayMeta schema notes to scanner docs. |
| 11s | `refactor/phase11s-coordinates-doc-overlay-normalize-link` | `86025e3` | `7369cd5` | `9a1f3b0` | `docs/ai/review_packet_phase11s.md` | Cross-linked coordinates docs to overlay normalization notes. |
| 11t | `refactor/phase11t-blueprint-spec-scanner-output-note` | `9a1f3b0` | `ea21dd7` | `5193d35` | `docs/ai/review_packet_phase11t.md` | Added scanner DraftBlueprint flow note in blueprint spec docs. |
| 11u | `refactor/phase11u-log-metadata-sweep-10-11` | `5193d35` | `66c00cc` | `8ee6584` | `docs/ai/review_packet_phase11u.md` | Swept remaining Phase 10/11 log metadata for concrete SHAs. |
| 11v | `refactor/phase11v-packet-evidence-bundle-doc` | `8ee6584` | `a505b09` | `90082e5` | `docs/ai/review_packet_phase11v.md` | Added reusable evidence bundle process doc for future packets. |

Notes:
- Commits above are sourced from `REFACTOR_LOG.md` for primary phases and packet commit history for packet files.
- Root-level docs duplicated as stubs are expected by policy (`/docs` is canonical).

## Union File List (Across Scope)

Primary docs/log/index files touched across included phases:
- `REFACTOR_LOG.md`
- `docs/README.md`
- `docs/DOCS_INDEX.md`
- `docs/SCANNER.md`
- `docs/COORDINATES.md`
- `docs/BLUEPRINT_SPEC.md`
- `docs/ai/review_packet_index_phase10.md`
- `docs/ai/review_packet_index_phase11.md`
- `docs/ai/PACKET_EVIDENCE_BUNDLE.md`

Root stub policy files touched during Phase 10 normalization work:
- `ARCHITECTURE.md`
- `COORDINATES.md`
- `SCANNER.md`
- `INPUTS.md`
- `EDITOR_TOOLS.md`
- `BLUEPRINT_SPEC.md`
- `PERSISTENCE.md`
- `DEV_DEBUG.md`
- `LOCALSTORAGE_KEYS.md`

Included per-phase packet files:
- `docs/ai/review_packet_phase10l_1.md`
- `docs/ai/review_packet_phase10m.md`
- `docs/ai/review_packet_phase10n.md`
- `docs/ai/review_packet_phase10o.md`
- `docs/ai/review_packet_phase10p.md`
- `docs/ai/review_packet_phase10q.md`
- `docs/ai/review_packet_phase11q.md`
- `docs/ai/review_packet_phase11r.md`
- `docs/ai/review_packet_phase11s.md`
- `docs/ai/review_packet_phase11t.md`
- `docs/ai/review_packet_phase11u.md`
- `docs/ai/review_packet_phase11v.md`

## Recommended Upload Set
Upload only:
- `REFACTOR_LOG.md`
- `docs/ai/UPLOAD_BUNDLE_PHASE10-11.md`

Optional single-file deep evidence upload:
- `docs/ai/review_packet_bundle_phase10-11_docs.md`

## Pointers
- Full command-level evidence remains in each `docs/ai/review_packet_phase*.md`.
- This bundle is the upload facade and navigation layer for external review.
