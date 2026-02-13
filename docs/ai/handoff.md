# 3DCityMapper Refactor — New Chat Handoff (SeniorDev1 Lead)

## Who I am / why you’re here
I’m **Xav** (project owner). I’m handing you the role of **SeniorDev1 refactor lead/reviewer**.

You manage a **Codex CLI junior dev (Codex 5.2 high)** who executes each refactor phase on a branch, then hands you a **review packet**.
Your job is to **review evidence + accept/fix**, then write the **next Codex prompt**.

## The objective (high-level)
Refactor the monolithic `city-sim.html` into a modular ES-module codebase **without behavior drift**, protected by a **parity probe** + **baseline anchor**. This refactor is a prerequisite for later features (scanner pipeline).

### Product direction (deferred but important)
Current “legacy city” is just an **Example City demo**.

Future intended workflow (not built yet):
1) User draws a map using a standard legend (colors + labels).
2) User uploads image.
3) Scanner (future) produces DraftBlueprint JSON.
4) App renders 3D city from BlueprintModel.
5) User refines via editor tools while viewing the overlay image.
Also supported: **start-from-scratch** (blank blueprint, no scan).

Scanner work is explicitly deferred until refactor stability is achieved.

## Non-negotiables / guardrails
- **No work directly on `master`.** Always branch.
- **Parity-first / extraction-first.** No “cleanup redesigns” unless explicitly listed.
- **Entry point remains `city-sim.html`** (served over HTTP).
- **Overlay drift threshold** remains `epsPx=0.05`.
- **Blueprint mutations converge toward BlueprintModel APIs** (carry-forward is allowed, but tracked).
- **Shared materials** must stay safe (`userData.shared = true` markers).

## Operating model (two-person loop)
- **You (SeniorDev1):** read plan + packets, decide accept/fix, produce next Codex prompt.
- **Codex (junior dev):** implement tasks, run fixed evidence commands, write/commit packet + any required log updates.
- **Me (Xav):** only run manual probe when Codex MCP fails (Mode B fallback). I avoid creating random files in the repo.

## Source-of-truth process
**Plan-first:** Start by reading the current plan:
- `REFACTOR_EXECUTION_PLAN_TIGHT_v7_rev4.md`

Then enforce it. Do **not** let Codex “interpret other docs” over your phase prompt.

### Evidence discipline (important)
Each phase ends with:
- `docs/ai/review_packet_phaseX.md` (or `phaseX_Y` for micro-fixes)

Packets must declare:
- `base_commit`
- `phase_end_commit` (last work commit; packet commit is excluded from phase delta)
- `packet_commit` (may be `PENDING`; see packet self-reference rule in plan)

Evidence must target **`<base>...<phase_end_commit>`** and be bounded by **FOCUS_PATHS**.

## Probe / baseline anchor (what it is, in plain terms)
The probe is a **runtime fingerprint** of the app (mesh/line/group/material counts, blueprint feature counts, overlay drift, renderer info).
We use it to detect refactor drift early.

Important practical note: the app can report **blueprintCounts=0 on first paint** even when data loads fine.
So the plan now requires a **readiness-gated probe** (wait up to 1500ms for blueprint arrays to become non-zero before running the probe).

Also: `/favicon.ico` 404 is **non-signal**.

## Current project status (as of this handoff)
Refactor phases completed through **Phase 6e** (terrain/zones/roads/buildings extractions done) with parity preserved using readiness-gated probing.

Phase 6f is in progress on your side; when it completes, treat the phase packet as the only required artifact to review first.

### Known recurring friction (handled by plan)
- Packet commit self-reference churn → allow `packet_commit: PENDING`; no amend loops.
- MCP probe often fails first try → attempt once, then retry once only if instructed; fallback to Xav Mode B if needed.
- “Hash drift with matching counts” → triage now gates on parity fields (counts/drift), not full SHA stability.
- Huge diffs → strict `FOCUS_PATHS` + excerpted `git show` only.

## What I need you to do in the new chat
1) Read **v7_rev4 plan** first.
2) Review the latest phase packet(s) (starting with Phase 6e, then Phase 6f when available).
3) Decide: accept / request micro-fix / stop-and-triage.
4) If accepted: write the next Codex phase prompt (including any carry-forward P0/P1 items).

## Files to attach in the new chat (minimum capsule)
**Must-have**
- `REFACTOR_EXECUTION_PLAN_TIGHT_v7_rev4.md`
- `REFACTOR_LOG.md`

**Latest accepted phase handoffs**
- `docs/ai/review_packet_phase6d.md`
- `docs/ai/review_packet_phase6d_wip.md` (hash-readiness triage history; optional but useful)
- `docs/ai/review_packet_phase6e.md`

**Phase 6f (when Codex finishes)**
- `docs/ai/review_packet_phase6f.md`
- plus any files listed in that packet’s `FOCUS_PATHS`

**Optional (only if needed to resolve questions)**
- `city-sim.html` (only if a packet indicates drift and you need to inspect wiring)
