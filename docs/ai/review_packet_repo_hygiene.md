# Review Packet — Repo Hygiene (Codex Search-Noise Reduction)

## Purpose
Archive historical high-noise AI packet artifacts without deleting history, so future iteration work can focus on active entrypoint docs.

## Scope
- Docs-only repository organization.
- No runtime JS/HTML behavior changes.
- All history preserved via `git mv` into archive paths.

## What Moved
- `docs/ai/review_packet_phase*.md` moved to `docs/ai/archive/review_packets/`.
- `docs/ai/review_packet_bundle*.md` and `docs/ai/review_packet_index_phase*.md` moved to `docs/ai/archive/review_packets/`.
- `docs/ai/audit_md_links_*.txt` moved to `docs/ai/archive/audit_outputs/`.
- Older `docs/ai/UPLOAD_BUNDLE_PHASE*.md` moved to `docs/ai/archive/upload_bundles/`.
  - kept active at top-level: `docs/ai/UPLOAD_BUNDLE_MASTER.md`, `docs/ai/UPLOAD_BUNDLE_PHASE15_FINAL.md`.

## Active Top-Level Entry Docs Kept
- `docs/ai/UPLOAD_BUNDLE_MASTER.md`
- `docs/ai/UPLOAD_GUIDE.md`
- `docs/ai/REFACTOR_COMPLETE_v7_rev4.md`
- `docs/ai/REFACTOR_STATUS.md`
- `docs/ai/HANDOFF_PROMPT_FINAL.md`
- `docs/ai/HANDOFF_PROMPT_SeniorDev.md`
- `docs/ai/MERGE_CHECKLIST_PHASE15.md`
- `docs/ai/ACTIVE_DOCS.md` (new)

## New Entry Doc
- `docs/ai/ACTIVE_DOCS.md`
  - Gives the minimal read-first list for future feature work.
  - Explicitly says to ignore `docs/ai/archive/` unless requested.

## Link Audit
- command: `bash tools/audit_md_links.sh docs/ai/archive/audit_outputs/audit_md_links_phase12.txt`
- result: PASS

## Notes
- This is archive/restructure only; no content deletion.
- This branch is intended for PR review; no automatic merge performed.
