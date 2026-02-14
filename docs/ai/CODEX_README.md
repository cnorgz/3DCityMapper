# CODEX README

## Read-first
- `docs/ai/ACTIVE_DOCS.md`
- `docs/ai/UPLOAD_BUNDLE_MASTER.md`
- `REFACTOR_LOG.md`
- `docs/ARCHITECTURE.md`
- `docs/SCANNER.md`
- `docs/BLUEPRINT_SPEC.md`
- `docs/INPUTS.md`
- `docs/EDITOR_TOOLS.md`
- `docs/COORDINATES.md`

## Avoid Unless Asked
- `docs/ai/archive/**` (historical review packets and audit outputs)

## Runtime Entrypoint
- `city-sim.html` is the served entrypoint.
- Probe URL: `http://localhost:8000/city-sim.html?refactorProbe=1`
- `epsPx=0.05`
- Baseline `sha256` must remain:
  `c903e9090c94a0c891c95deaf7b740528ec2e7f6e03c706cc644935416c0fbaa`
