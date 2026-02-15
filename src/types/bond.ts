export type CreditRatingAgency = "S&P" | "Fitch" | "KBRA" | "Moody's";
export type CreditRatingGrade = "AAA" | "AA+" | "AA" | "AA-" | "A+" | "A" | "A-" | "BBB+" | "BBB";

export interface CreditRating {
  grade: CreditRatingGrade;
  agency: CreditRatingAgency;
}

export type TransitMode = "subway" | "light-rail" | "commuter-rail" | "brt" | "bus" | "streetcar";

export interface TransitBond {
  id: string;
  agency: string;
  agencyAbbrev: string;
  city: string;
  state: string;
  project: string;
  description: string;
  rating: CreditRating;
  yieldMin: number;
  yieldMax: number;
  maturityYears: number;
  minimumInvestment: number;
  totalIssueSize: string;
  transitMode: TransitMode;
  color: string;
  communityInvested: number; // total $ invested via Transit Collective
  coordinates: [number, number]; // [lng, lat]
}
