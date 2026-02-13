# Packet Evidence Bundle (Standard)

Use this bundle for docs/code review packets with deterministic evidence.

## Standard Evidence Command Bundle

```bash
git status -sb
git rev-parse --short HEAD
git log --oneline --decorate -n 25
git diff --stat <base_commit>...<phase_end_commit>
git diff --check <base_commit>...<phase_end_commit>
git show --no-ext-diff --unified=12 <phase_end_commit> -- <focus_paths>
```

## Packet Commit Evidence (Pre-Commit)

```bash
git diff --stat --cached
git diff --check --cached
```

## Rules
- Do not leave diff blocks empty in packets.
- If `--unified=12` output is too large or sparse, include bounded fallback excerpts from:
  - `git show --no-ext-diff --unified=5 <phase_end_commit> -- <focus_paths>`
  - `git show --no-ext-diff --unified=0 <phase_end_commit> -- <focus_paths>`
- Keep evidence bounded to declared focus paths and to `<base_commit>...<phase_end_commit>`.
