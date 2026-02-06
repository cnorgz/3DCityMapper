# Purpose
Bring Phase 6g packet into `v7_rev4` compliance with no code changes.

# Audit Target Metadata
- base_commit: `d072929`
- phase_end_commit: `09f1f12`
- packet_commit: `PENDING` (self-reference; authoritative SHA is in `git log`)

# Determinism
```sh
command -v rg >/dev/null && echo "rg=1" || echo "rg=0"
```
```text
rg=1
```

# Fixed Evidence
```sh
git status -sb
```
```text
## refactor/phase6g_1-packet-compliance
```

```sh
git rev-parse --short HEAD
```
```text
1cb8f19
```

```sh
git log --oneline --decorate -n 20
```
```text
1cb8f19 (HEAD -> refactor/phase6g_1-packet-compliance, refactor/phase6g-city-renderer) docs(ai): add review packet for phase 6g
09f1f12 docs(phase6g): record readiness-gated probe
ad10aa8 refactor(phase6g): extract CityRenderer orchestrator
d072929 (refactor/phase6f_2-track-handoff) docs(ai): track SeniorDev1 handoff doc
2d24954 (refactor/phase6f_1-packet-compliance) docs(ai): add review_packet_phase6f_1 (rev4 compliance addendum)
484754e (refactor/phase6f-props-debug) docs: archive v7_rev3 plan
ffbefde docs(ai): add review packet for phase 6f
607c47c docs(phase6f): record readiness-gated probe
dd1b545 refactor(phase6f): extract props + debug layers
5883f96 (refactor/phase6e-building-layer) docs(ai): add review packet for phase 6e
7223a3b docs(phase6e): record probe baseline match
5508bec refactor(phase6e): extract building generator + layer
3f545a7 (refactor/phase6d-road-layer-triage2) docs(ai): add review packet for phase 6d
2a8625b docs(phase6d): record decision hash + parity fields
5ee91fd refactor(phase6d): extract road generator + layer
01c319c docs(ai): update phase6d wip with rev3 triage evidence
88dc9e4 docs(ai): update phase6d wip with patch-applied drift
0fe1f6b docs(ai): update phase6d wip with clean-tree probe
5210325 (refactor/phase6d-road-layer) docs(probe): record probe hash volatility + decision hash
dcedc42 docs(ai): add phase6d WIP probe hash drift evidence
```

# Missing Evidence as of phase_end_commit `09f1f12`
```sh
git diff --stat d072929...09f1f12 -- city-sim.html src/render/CityRenderer.js REFACTOR_LOG.md
```
```text
 REFACTOR_LOG.md            | 11 +++++++
 city-sim.html              | 71 ++++++++++++++++++++++++----------------------
 src/render/CityRenderer.js | 15 ++++++++++
 3 files changed, 63 insertions(+), 34 deletions(-)
```

```sh
git diff --check d072929...09f1f12 -- city-sim.html src/render/CityRenderer.js REFACTOR_LOG.md
```
```text
(no output)
```

```sh
git show 09f1f12:src/render/CityRenderer.js
```
```js
export function buildLegacyCity({
  buildPhase1,
  buildPhase2,
  onPhase1Done,
  onPhase2Done,
  delayMs = 0
}) {
  buildPhase1();
  if (typeof onPhase1Done === 'function') onPhase1Done();

  setTimeout(async () => {
    await buildPhase2();
    if (typeof onPhase2Done === 'function') onPhase2Done();
  }, delayMs);
}
```

# Carry-Forward Issues
- `P0 blockers`: None.
- `P1 fold-forward`:
  - Locator: `docs/ai/review_packet_phase6g.md` (`# Git evidence` / `git diff --check ...` block)
  - Acceptance: packet diffcheck blocks contain actual `git diff --check` output or explicit `(no output)`, never diffstat text.
  - Locator: `REFACTOR_EXECUTION_PLAN_TIGHT_v7_rev4.md` (`§8.4` packet structure)
  - Acceptance: every packet ends with explicit `P0/P1/P2` carry-forward section with locator + acceptance line.
- `P2 notes`:
  - Locator: packet diff command scope
  - Acceptance: audit diffstat/diffcheck exclude packet file unless the packet itself is the phase target.

# Packet Commit Evidence (pre-commit)
```sh
git diff --stat --cached
```
```text
 docs/ai/review_packet_phase6g_1.md | 119 +++++++++++++++++++++++++++++++++++++
 1 file changed, 119 insertions(+)
```

```sh
git diff --check --cached
```
```text
```
