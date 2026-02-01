export const COLORS = {
  sea: 0x4a8cb8,
  seaDeep: 0x3a7ca8,
  beach: 0xe8d8a8,
  land: 0xd4c4a4,
  road: 0x505050,
  sidewalk: 0x808080,
  residential: 0xc85858,      // Q - Red
  office: 0xe8c858,           // B - Yellow
  commercial: 0x5878b8,       // ZC - Blue
  garden: 0x58a858,           // J - Green
  hospital: 0x888898,         // H - Grey
  restaurant: 0xd88888,       // R - Pink/Red
  police: 0x8b6b4b,           // PO - Brown
  parking: 0xe89848,          // PK - Orange
  mairie: 0xa88b6b,           // MA - Brown
  hotel: 0x387848,            // H★ - Dark Green
  stadium: 0xe8e8e8,          // S - White
  transport: 0x88c888,        // T - Light Green
  utilities: 0x707070,        // D - Grey
  cinema: 0xb898c8,           // Ci - Purple
  fairground: 0xc8a878,       // ff - Tan
  port: 0x6898b8              // P - Blue-grey
};

export const LEGEND_LINE_COLORS = {
  Q: 0xff3b3b,
  B: 0xffe85c,
  ZC: 0x2f7dff,
  J: 0x30ff7a,
  H: 0xc0c6d0,
  R: 0xff5fa3,
  PO: 0xb0723f,
  PK: 0xffb347,
  MA: 0xc08a62,
  'H★': 0x32c46a,
  S: 0xffffff,
  T: 0x9bffb0,
  D: 0xb0b0b0,
  Ci: 0xd07bff,
  ff: 0xffc06a,
  P: 0x7fbfff,
  '⚡': 0xfff04d,
  '💧': 0x5fd0ff
};

export const LEGEND_TYPE_MAP = {
  Q: { label: 'Residential (Quartiers)', type: 'residential', color: LEGEND_LINE_COLORS.Q, height: 22, buildable: true },
  B: { label: 'Offices (Bureaux)', type: 'office', color: LEGEND_LINE_COLORS.B, height: 32, buildable: true },
  ZC: { label: 'Commercial Zone', type: 'commercial', color: LEGEND_LINE_COLORS.ZC, height: 26, buildable: true },
  J: { label: 'Gardens/Parks (Jardins)', type: 'park', color: LEGEND_LINE_COLORS.J, height: 0, buildable: false },
  H: { label: 'Hospital (Hôpital)', type: 'hospital', color: LEGEND_LINE_COLORS.H, height: 30, buildable: true },
  R: { label: 'Restaurant', type: 'restaurant', color: LEGEND_LINE_COLORS.R, height: 14, buildable: true },
  PO: { label: 'Police Station', type: 'police', color: LEGEND_LINE_COLORS.PO, height: 18, buildable: true },
  PK: { label: 'Parking', type: 'parking', color: LEGEND_LINE_COLORS.PK, height: 6, buildable: true },
  MA: { label: 'Town Hall (Mairie)', type: 'mairie', color: LEGEND_LINE_COLORS.MA, height: 28, buildable: true },
  'H★': { label: 'Hotel', type: 'hotel', color: LEGEND_LINE_COLORS['H★'], height: 40, buildable: true },
  S: { label: 'Stadium (Stade)', type: 'stadium', color: LEGEND_LINE_COLORS.S, height: 12, buildable: false },
  T: { label: 'Transport/Train', type: 'transport', color: LEGEND_LINE_COLORS.T, height: 16, buildable: true },
  D: { label: 'Déchetterie', type: 'utilities', color: LEGEND_LINE_COLORS.D, height: 14, buildable: true },
  Ci: { label: 'Cinema', type: 'cinema', color: LEGEND_LINE_COLORS.Ci, height: 18, buildable: true },
  ff: { label: 'Fairground', type: 'fairground', color: LEGEND_LINE_COLORS.ff, height: 10, buildable: false },
  P: { label: 'Port', type: 'port', color: LEGEND_LINE_COLORS.P, height: 14, buildable: true },
  '⚡': { label: 'Electric Station', type: 'electric', color: LEGEND_LINE_COLORS['⚡'], height: 18, buildable: true },
  '💧': { label: 'Water Treatment', type: 'water', color: LEGEND_LINE_COLORS['💧'], height: 16, buildable: true }
};

export const ALLOWED_TYPE_CODES = new Set(Object.keys(LEGEND_TYPE_MAP));

export const POI_COLORS = {
  METRO_STATION: 0x2f7bff,
  TRAIN_STATION: 0xffffff,
  HYPERLOOP_NODE: 0x00ffd5,
  PORT: 0x55a6ff,
  WIND_TURBINE: 0xaad1ff,
  ECOLE: 0xffc857,
  SKYSCRAPER: 0xffcc33,
  TRAFFIC_LIGHT: 0xff3b3b
};

export const ROAD_LINE_STYLES = {
  ROAD_MAJOR: { width: 18, color: 0x2b2b2b, outline: 0xffffff, dash: true, yOffset: 0 },
  ROAD_MINOR: { width: 12, color: 0x333333, outline: 0xffffff, dash: true, yOffset: 0 },
  PATH: { width: 4, color: 0x777777, outline: 0xcccccc, dash: false, yOffset: 0.08 },
  FOOTPATH: { width: 4, color: 0x777777, outline: 0xcccccc, dash: false, yOffset: 0.08 }
};

export const TRANSIT_STYLES = {
  METRO: { color: 0x2f7bff, radius: 2.2 },
  TRAIN: { color: 0xc0c0c0, radius: 2.6 },
  HYPERLOOP: { color: 0x00ffd5, radius: 1.8 }
};
