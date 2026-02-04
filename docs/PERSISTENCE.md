# Persistence Strategy

## Namespace
- All new keys use: `3dcm:v1:<key>`

## Legacy migrations
- `tadhgCityOverlayCalib` -> `3dcm:v1:overlayCalib:<imageId>`
- `tadhgOverlayPanelCollapsed` -> `3dcm:v1:ui.overlayPanelCollapsed`

## Overlay calibration
- Key format: `overlayCalib:<imageId>`
- Current placeholder imageId: `demo` (until ImageSource is available).

## Uploaded overlay image
- `3dcm:v1:overlay.imageId` (name:size:lastModified)
- `3dcm:v1:overlay.imageData` (data URL)
- `3dcm:v1:overlay.imageMeta` (width/height/name/size/lastModified)

Notes:
- No blobs stored; data URL only.
- Defaults unchanged if no upload is present.
