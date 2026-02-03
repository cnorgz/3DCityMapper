# LocalStorage Keys

## 3dcm:v1:overlayCalib:demo
- Purpose: Persist map overlay calibration settings (offsets, rotation, scale, opacity, dimmer, visibility).
- Where used: city-sim.html:950, city-sim.html:6053, city-sim.html:6063
- Notes: Stored as JSON (overlaySettings). `demo` is a placeholder imageId until Phase 4.

## 3dcm:v1:ui.overlayPanelCollapsed
- Purpose: Persist overlay panel collapse state.
- Where used: city-sim.html:951, city-sim.html:6194, city-sim.html:6204
- Notes: Stored as boolean.

## 3dcm:v1:editor.snapGrid
- Purpose: Persist editor snap-to-grid toggle.
- Where used: city-sim.html:952, city-sim.html:7599, city-sim.html:7768

## 3dcm:v1:editor.snapPixels
- Purpose: Persist editor snap-to-pixels toggle.
- Where used: city-sim.html:953, city-sim.html:7601, city-sim.html:7779

## 3dcm:v1:editor.pixelStep
- Purpose: Persist editor pixel snap step.
- Where used: city-sim.html:954, city-sim.html:7603, city-sim.html:7790

## 3dcm:v1:traffic.maxCars
- Purpose: Persist traffic max cars slider.
- Where used: city-sim.html:955, city-sim.html:7605, city-sim.html:7721

## 3dcm:v1:traffic.speedScale
- Purpose: Persist traffic speed scale slider.
- Where used: city-sim.html:956, city-sim.html:7609, city-sim.html:7731

## 3dcm:v1:blueprint.opacity
- Purpose: Persist blueprint preview opacity.
- Where used: city-sim.html:957, city-sim.html:6247, city-sim.html:6278

## 3dcm:v1:blueprint.showLabels
- Purpose: Persist blueprint preview labels toggle.
- Where used: city-sim.html:958, city-sim.html:6251, city-sim.html:6373

# Legacy keys (migrated)

## tadhgCityOverlayCalib
- Purpose: Legacy overlay calibration storage.
- Where used: src/persistence/Migrations.js:4, src/persistence/Migrations.js:19
- Notes: Migrated to 3dcm:v1:overlayCalib:demo on boot if new key missing.

## tadhgOverlayPanelCollapsed
- Purpose: Legacy overlay panel collapse state.
- Where used: src/persistence/Migrations.js:5, src/persistence/Migrations.js:30
- Notes: Migrated to 3dcm:v1:ui.overlayPanelCollapsed on boot if new key missing.
