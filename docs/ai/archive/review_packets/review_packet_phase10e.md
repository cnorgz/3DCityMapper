# Review Packet — Phase 10e (Minimum Docs Location Normalize)

## Metadata
- branch: refactor/phase10e-docs-dir-normalize
- base_commit: b3db947
- phase_end_commit: 363b3ce
- packet_commit: PENDING (self-reference; see git log)
- focus_paths: docs/ ARCHITECTURE.md COORDINATES.md SCANNER.md INPUTS.md EDITOR_TOOLS.md REFACTOR_LOG.md docs/ai/review_packet_phase10e.md
- probe: NOT RUN (docs-only)

## Fixed Command Evidence

### `command -v rg >/dev/null && echo "rg=1" || echo "rg=0"`
```text
rg=1
```

### `git status -sb`
```text
## refactor/phase10e-docs-dir-normalize
```

### `git rev-parse --short HEAD`
```text
363b3ce
```

### `git log --oneline --decorate -n 20`
```text
363b3ce (HEAD -> refactor/phase10e-docs-dir-normalize) docs(phase10e): normalize minimum docs under /docs
b3db947 (refactor/phase10d_1-log-metadata) docs(ai): add review packet for phase 10d_1
7188087 docs(phase10d_1): backfill phase10d log metadata
89a6bb5 (refactor/phase10d-inputs-editor-doc) docs(ai): add review packet for phase 10d
6d9102f docs(phase10d): add INPUTS.md and EDITOR_TOOLS.md
f36331d (refactor/phase10c-scanner-doc) docs(ai): add review packet for phase 10c
a455f2d docs(phase10c): add SCANNER.md
8156bc4 (refactor/phase10b-coordinates-doc) docs(ai): add review packet for phase 10b
a471ae8 docs(phase10b): add COORDINATES.md
8147ad0 (refactor/phase10a-architecture-doc) docs(ai): add review packet for phase 10a
c4a2688 docs(phase10a): add ARCHITECTURE.md
720fabe (refactor/phase11p_1-log-metadata) docs(ai): add review packet for phase 11p_1
bdaa294 docs(phase11p_1): backfill phase11p log metadata
221a8f7 (refactor/phase11o_1-log-metadata) docs(ai): add review packet for phase 11o_1
3996f6b docs(phase11o_1): backfill phase11o log metadata
835abea (refactor/phase11n_1-log-metadata) docs(ai): add review packet for phase 11n_1
f2175db docs(phase11n_1): backfill phase11n log metadata
a239344 (refactor/phase11m_1-log-metadata) docs(ai): add review packet for phase 11m_1
ef54347 docs(phase11m_1): backfill phase11m log metadata
8b248be (refactor/phase11p-phase11-packet-index) docs(ai): add review packet for phase 11p
```

### `git diff --stat b3db947...363b3ce`
```text
 ARCHITECTURE.md      | 38 +-------------------------------------
 COORDINATES.md       | 27 +--------------------------
 EDITOR_TOOLS.md      | 18 +-----------------
 INPUTS.md            | 16 +---------------
 REFACTOR_LOG.md      |  9 +++++++++
 SCANNER.md           | 29 +----------------------------
 docs/ARCHITECTURE.md | 37 +++++++++++++++++++++++++++++++++++++
 docs/COORDINATES.md  | 26 ++++++++++++++++++++++++++
 docs/EDITOR_TOOLS.md | 17 +++++++++++++++++
 docs/INPUTS.md       | 15 +++++++++++++++
 docs/SCANNER.md      | 28 ++++++++++++++++++++++++++++
 11 files changed, 137 insertions(+), 123 deletions(-)
```

### `git diff --check b3db947...363b3ce`
```text
(no output)
```

### `git diff -U15 b3db947...363b3ce -- docs/ ARCHITECTURE.md COORDINATES.md SCANNER.md INPUTS.md EDITOR_TOOLS.md REFACTOR_LOG.md docs/ai/review_packet_phase10e.md`
```diff
```

## Packet Commit Evidence (Pre-Commit)
### `git diff --stat --cached`
```text
 docs/ai/review_packet_phase10e.md | 91 +++++++++++++++++++++++++++++++++++++++
 1 file changed, 91 insertions(+)
```

### `git diff --check --cached`
```text
(no output)
```

## Carry-Forward
- P0: none
- P1: none
- P2: none
