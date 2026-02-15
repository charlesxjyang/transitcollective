import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DonationRecord } from "@/types/portfolio";

interface DonationState {
  donations: DonationRecord[];
  addDonation: (projectId: string, amount: number) => void;
  totalDonated: () => number;
  uniqueProjectCount: () => number;
  totalDonorContributions: () => number;
  reset: () => void;
}

export const useDonationStore = create<DonationState>()(
  persist(
    (set, get) => ({
      donations: [],
      addDonation: (projectId, amount) =>
        set((state) => ({
          donations: [
            ...state.donations,
            {
              projectId,
              amount,
              donationDate: new Date().toISOString(),
            },
          ],
        })),
      totalDonated: () =>
        get().donations.reduce((sum, d) => sum + d.amount, 0),
      uniqueProjectCount: () =>
        new Set(get().donations.map((d) => d.projectId)).size,
      totalDonorContributions: () => get().donations.length,
      reset: () => set({ donations: [] }),
    }),
    { name: "transit-donations" }
  )
);
