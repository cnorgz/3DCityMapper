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
