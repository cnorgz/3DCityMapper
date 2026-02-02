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
