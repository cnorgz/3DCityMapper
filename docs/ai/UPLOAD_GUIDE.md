# Upload Guide (Phase 10/11 Docs Bundle)

## Upload Policy
Prefer uncompressed single markdown bundles. Avoid zip artifacts unless explicitly requested.

## What To Upload

### Minimum
Upload only these two files for SeniorDev review:
- `REFACTOR_LOG.md`
- `docs/ai/UPLOAD_BUNDLE_PHASE10-11.md`

### Optional (deep evidence)
If full packet content is requested in one file, also upload:
- `docs/ai/review_packet_bundle_phase10-11_docs.md`

### Optional (only if explicitly requested)
From repo root:
```bash
bash tools/make_handoff_bundle_phase10-11.sh
```

Expected output path:
- `../handoff_phase10-11.zip`

The script includes only handoff docs and does not modify runtime code.
