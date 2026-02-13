#!/usr/bin/env bash
set -euo pipefail

out_zip="../handoff_phase10-11.zip"

# Recreate zip deterministically from tracked files only.
rm -f "$out_zip"

git archive --format=zip -o "$out_zip" HEAD \
  REFACTOR_LOG.md \
  docs/ai/UPLOAD_BUNDLE_PHASE10-11.md \
  docs/ai/review_packet_bundle_phase10-11_docs.md \
  docs/ai/PACKET_EVIDENCE_BUNDLE.md \
  docs/ai/review_packet_index_phase10.md \
  docs/ai/review_packet_index_phase11.md \
  docs/ai/UPLOAD_GUIDE.md

echo "handoff_bundle=$out_zip"
