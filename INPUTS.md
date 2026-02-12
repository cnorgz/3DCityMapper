# 3DCityMapper Inputs (Minimum Docs)

## Supported Start Modes
- Example city mode (legacy/demo content path).
- Blank blueprint mode (empty editable city state).
- Overlay-assisted mode (user uploads overlay and can run scanner placeholder flow).

## Legend Rules (High Level)
- Legend rules define semantic mapping intent from map symbols/colors to city entities.
- Current scanner phases keep legend usage placeholder-only; rules are scaffolding for later inference.

## Constraints And Assumptions
- Uploaded overlays are normalized with max-edge constraints in scanner/image-source flow.
- Coordinate mapping and drift checks depend on normalized dimensions metadata.
- Refactor changes must preserve parity gates (`sceneCounts`, `blueprintCounts`, `overlayDrift`).
