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
- Keep evidence bounded to declared focus paths and to `<base_commit>...<phase_end_commit>`.

## Huge Diff Fallback
If `--unified=12` output is too large or sparse, include bounded fallback excerpts from:
- `git show --no-ext-diff --unified=5 <phase_end_commit> -- <focus_paths>`
- `git show --no-ext-diff --unified=0 <phase_end_commit> -- <focus_paths>`

## Canonical Readiness-Gated Probe Snippet (Text Only)
Use this shape in browser console for Mode A capture when probe-enabled URL is open:

```js
const deadline = performance.now() + 1500;
while (performance.now() < deadline) {
  const p = await (typeof window.runRefactorProbe === "function"
    ? window.runRefactorProbe()
    : window.__REFACTOR_PROBE__);
  if (p?.blueprintCounts && Object.values(p.blueprintCounts).some((n) => n > 0)) {
    const s = JSON.stringify(p);
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
    const sha = Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
    console.log({ len: s.length, sha, probe: p });
    break;
  }
  await new Promise((r) => setTimeout(r, 50));
}
```
