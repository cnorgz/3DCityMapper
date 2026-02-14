# Research Mode Repo Scan Checklist

## Purpose
When GitHub connector is enabled, scan `cnorgz/3DCityMapper` for cleanliness and readiness for feature iteration.

## 1) Entrypoints
- Confirm `docs/ai/CODEX_README.md`, `docs/ai/ACTIVE_DOCS.md`, and `docs/ai/UPLOAD_BUNDLE_MASTER.md` are coherent.
- Confirm they direct reviewers to canonical docs and avoid archive-first discovery.

## 2) Archive Sanity
- Confirm `docs/ai/archive/` exists.
- Confirm entrypoint docs do not route normal iteration through archive paths.

## 3) Duplicate Docs Policy
- Confirm root stubs and `/docs` canonical files are intentional.
- Confirm root stubs only point forward to `/docs/<NAME>.md`.

## 4) Tooling Behavior
- Check `tools/audit_md_links.sh` behavior is documented.
- Confirm any output artifact side effects are known and non-blocking.

## 5) Size / Noise
- Sample `docs/ai/archive/` volume and confirm no unexpected binary blobs were introduced.
- Verify top-level `docs/ai` remains focused on active entrypoint docs.

## 6) Runtime Parity Baseline
- Confirm probe baseline hash remains:
  `c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa`
- Confirm `overlayDrift.ok=true` with `epsPx=0.05`.
