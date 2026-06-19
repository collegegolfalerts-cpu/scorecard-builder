export type ScoreIndicator = 'none' | 'albatross' | 'eagle' | 'birdie' | 'bogey' | 'double-bogey';
export type OutputFormat = '1080x1440' | '1080x1920';
export type CardLayout =
  | 'classic'
  | 'split'
  | 'full-bleed'
  | 'banner'
  | 'diagonal'
  | 'broadcast'
  | 'magazine';

export interface HoleScore {
  score: number;
  indicator: ScoreIndicator;
}

export interface CustomFont {
  id: string;
  name: string;
  family: string;
  dataUrl: string;
}

export interface ScorecardData {
  playerFirstName: string;
  playerLastName: string;
  tournamentName: string;
  roundName: string;
  totalScore: number;
  relativeToPar: string;

  holes: HoleScore[];
  frontTotal: number;
  backTotal: number;
  autoCalcTotals: boolean;

  photoUrl: string | null;
  logoUrl: string | null;

  primaryColor: string;
  backgroundColor: string;
  tournamentColor: string;
  birdieColor: string;
  bogeyColor: string;
  eagleColor: string;
  parColor: string;
  doubleBogeyColor: string;
  albatrossColor: string;

  firstNameFont: string;
  firstNameSize: number;
  firstNameX: number;
  firstNameYPct: number;

  lastNameFont: string;
  lastNameSize: number;
  lastNameXPct: number;

  scoreFont: string;
  scoreSize: number;
  scoreRight: number;
  scoreTopPct: number;

  tournamentFont: string;
  tournamentSize: number;
  roundSize: number;

  lowerPanelYPct: number;
  photoYPosition: number;
  layout: CardLayout;

  outputFormat: OutputFormat;
}
