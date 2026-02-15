export type AchievementCategory = "invest" | "donate" | "explore";

export interface AchievementCondition {
  type: "total_invested" | "total_donated" | "bonds_purchased" | "projects_funded" | "first_purchase" | "first_donation";
  threshold?: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  condition: AchievementCondition;
}
