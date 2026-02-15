import { create } from "zustand";
import { persist } from "zustand/middleware";
import { achievements } from "@/lib/data/achievements";
import { usePortfolioStore } from "./usePortfolioStore";
import { useDonationStore } from "./useDonationStore";

interface AchievementState {
  unlockedIds: string[];
  lastUnlocked: string | null;
  checkAndUnlock: () => string | null;
  isUnlocked: (id: string) => boolean;
  reset: () => void;
}

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set, get) => ({
      unlockedIds: [],
      lastUnlocked: null,
      checkAndUnlock: () => {
        const portfolio = usePortfolioStore.getState();
        const donations = useDonationStore.getState();
        const { unlockedIds } = get();

        let newUnlock: string | null = null;

        for (const achievement of achievements) {
          if (unlockedIds.includes(achievement.id)) continue;

          let earned = false;
          const { condition } = achievement;

          switch (condition.type) {
            case "first_purchase":
              earned = portfolio.holdings.length > 0;
              break;
            case "total_invested":
              earned = portfolio.totalInvested() >= (condition.threshold ?? 0);
              break;
            case "bonds_purchased":
              earned =
                portfolio.uniqueBondCount() >= (condition.threshold ?? 0);
              break;
            case "first_donation":
              earned = donations.donations.length > 0;
              break;
            case "total_donated":
              earned = donations.totalDonated() >= (condition.threshold ?? 0);
              break;
            case "projects_funded":
              earned =
                donations.uniqueProjectCount() >= (condition.threshold ?? 0);
              break;
          }

          if (earned) {
            newUnlock = achievement.id;
            set((state) => ({
              unlockedIds: [...state.unlockedIds, achievement.id],
              lastUnlocked: achievement.id,
            }));
            break;
          }
        }

        return newUnlock;
      },
      isUnlocked: (id) => get().unlockedIds.includes(id),
      reset: () => set({ unlockedIds: [], lastUnlocked: null }),
    }),
    { name: "transit-achievements" }
  )
);
