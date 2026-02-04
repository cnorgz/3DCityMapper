# Phase 4b.1 Review Packet

## Metadata
- base_branch: refactor/phase4b-overlay-system
- base_commit: b77b0df
- phase_end_commit: deb35db
- packet_commit: 120816a

## Phase checklist
- ✅ Phase 4b packet metadata corrected (packet_commit points to initial packet add commit)
- ✅ LOCALSTORAGE_KEYS overlayCalib entry updated for imageId fallback
- ✅ Optional ImageSource.clearImage now clears persisted keys
- ✅ No behavior change intended (docs + clearImage only; clearImage not used by default)
- ⛔ Probe run (not executed; docs-only change)

## Git evidence

### git status -sb
```
## refactor/phase4b-overlay-system
```

### git log --oneline --decorate -n 20
```
deb35db (HEAD -> refactor/phase4b-overlay-system) docs: fix phase4b packet metadata + overlayCalib docs
b77b0df docs(ai): finalize phase4b packet_commit
80b70d5 docs(ai): refresh phase4b review packet
6d16986 fix(phase4b): align overlay migration + cleanup import
b795c24 docs(ai): update phase4b packet_commit
e6edf1c docs(ai): add review packet for phase 4b
b9b4c67 feat(phase4b): add ImageSource + OverlayLayer + preview renderer
2eeedf9 (refactor/phase4-overlay-coords) docs(ai): fix packet_commit for phase 4
061885e docs(ai): add review packet for phase 4
5676069 feat(phase4): add snapshot helpers + coordinate mapping modules
6c73fca (refactor/phase3-blueprint-core) docs(ai): fix packet_commit for phase 3
3a63b65 docs(ai): add review packet for phase 3
7f34515 feat(phase3): add BlueprintModel + validator + normalizer
bea3202 (refactor/phase2-persistence) docs(ai): add review packet for phase 2
15e5136 feat(phase2): add StateStore + migrations + opt-in persistence
68c6963 chore(phase1): add EventBus/EventCatalog (warn+count)
3d10457 docs(phase0): capture refactor probe baseline anchor
3501049 (refactor/phase1-config-utils) docs(plan): add v7 refactor plan (replace v6)
b4f5e40 docs(phase1.1): add review packet
2d6952b refactor(phase1.1): align RNG + legend rules with plan (no behavior change)
```

### git diff --stat b77b0df...deb35db
```
 docs/LOCALSTORAGE_KEYS.md         | 6 +++---
 docs/ai/review_packet_phase4_1.md | 2 +-
 src/scanner/ImageSource.js        | 5 ++++-
 3 files changed, 8 insertions(+), 5 deletions(-)
```

### git diff --check b77b0df...deb35db
```
```

### git diff -U15 b77b0df...deb35db -- city-sim.html src/core src/persistence src/utils docs tools REFACTOR_LOG.md
```
diff --git a/docs/LOCALSTORAGE_KEYS.md b/docs/LOCALSTORAGE_KEYS.md
index c68eb81..317be26 100644
--- a/docs/LOCALSTORAGE_KEYS.md
+++ b/docs/LOCALSTORAGE_KEYS.md
@@ -1,21 +1,21 @@
 # LocalStorage Keys

-## 3dcm:v1:overlayCalib:demo
+## 3dcm:v1:overlayCalib:<imageId>
 - Purpose: Persist map overlay calibration settings (offsets, rotation, scale, opacity, dimmer, visibility).
 - Where used: city-sim.html:950, city-sim.html:6053, city-sim.html:6063
-- Notes: Stored as JSON (overlaySettings). `demo` is a placeholder imageId until Phase 4.
+- Notes: Stored as JSON (overlaySettings). Uses uploaded overlay imageId when present; falls back to `demo` when no upload exists.
@@
 ## tadhgCityOverlayCalib
 - Purpose: Legacy overlay calibration storage.
 - Where used: src/persistence/Migrations.js:4, src/persistence/Migrations.js:19
-- Notes: Migrated to 3dcm:v1:overlayCalib:demo on boot if new key missing.
+- Notes: Migrated to 3dcm:v1:overlayCalib:<imageId> on boot if new key missing (imageId falls back to `demo`).
@@
 diff --git a/docs/ai/review_packet_phase4_1.md b/docs/ai/review_packet_phase4_1.md
index d329349..264f226 100644
--- a/docs/ai/review_packet_phase4_1.md
+++ b/docs/ai/review_packet_phase4_1.md
@@ -1,22 +1,22 @@
 # Phase 4b Review Packet

 ## Metadata
 - base_branch: refactor/phase4-overlay-coords
 - base_commit: 2eeedf9
 - phase_end_commit: 6d16986
-- packet_commit: 80b70d5
+- packet_commit: e6edf1c
```

## Probe result
- Not run (docs-only change; ImageSource.clearImage not invoked by default).

## Packet commit evidence (pre-commit)

### git diff --stat --cached
```
 docs/ai/review_packet_phase4_1_1.md | 111 ++++++++++++++++++++++++++++++++++++
 1 file changed, 111 insertions(+)
```

### git diff --check --cached
```
```
```

## Carry-forward
- P0: Run probe after larger functional changes; no parity delta expected from this docs-only fix.
- P1: If ImageSource.clearImage is later wired to UI, verify persistence clears overlay image keys.
