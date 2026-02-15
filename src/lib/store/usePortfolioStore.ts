import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PortfolioHolding } from "@/types/portfolio";

interface PortfolioState {
  holdings: PortfolioHolding[];
  addHolding: (bondId: string, amount: number, estimatedYield: number) => void;
  totalInvested: () => number;
  uniqueBondCount: () => number;
  estimatedAnnualYield: () => number;
  reset: () => void;
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      holdings: [],
      addHolding: (bondId, amount, estimatedYield) =>
        set((state) => ({
          holdings: [
            ...state.holdings,
            {
              bondId,
              amount,
              purchaseDate: new Date().toISOString(),
              estimatedYield,
            },
          ],
        })),
      totalInvested: () =>
        get().holdings.reduce((sum, h) => sum + h.amount, 0),
      uniqueBondCount: () =>
        new Set(get().holdings.map((h) => h.bondId)).size,
      estimatedAnnualYield: () => {
        const { holdings } = get();
        if (holdings.length === 0) return 0;
        const totalWeighted = holdings.reduce(
          (sum, h) => sum + h.amount * h.estimatedYield,
          0
        );
        const total = holdings.reduce((sum, h) => sum + h.amount, 0);
        return total > 0 ? totalWeighted / total : 0;
      },
      reset: () => set({ holdings: [] }),
    }),
    { name: "transit-portfolio" }
  )
);
