export type ProjectCategory = "bike" | "bus" | "rail" | "streetcar" | "brt";

export interface Milestone {
  amount: number;
  label: string;
  reached: boolean;
}

export interface CrowdsourceProject {
  id: string;
  title: string;
  city: string;
  state: string;
  category: ProjectCategory;
  description: string;
  goalAmount: number;
  raisedAmount: number;
  donorCount: number;
  milestones: Milestone[];
  daysLeft: number;
  coordinates: [number, number]; // [lng, lat]
  color: string;
}
