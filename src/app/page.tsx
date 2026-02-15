"use client";

import { useState, useCallback, useMemo } from "react";
import { TransitMap } from "@/components/map/TransitMap";
import { TransitLineLayer } from "@/components/map/TransitLineLayer";
import { BondMarker } from "@/components/map/BondMarker";
import { BondCard } from "@/components/invest/BondCard";
import { BondDetailPanel } from "@/components/invest/BondDetailPanel";
import { BuyModal } from "@/components/invest/BuyModal";
import { PortfolioSummary } from "@/components/invest/PortfolioSummary";
import { bonds } from "@/lib/data/bonds";
import { CreditRatingGrade } from "@/types/bond";
import { Button } from "@/components/ui/button";
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react";
import { cn } from "@/lib/utils";

type SortField = "community" | "rating" | "yield";
type SortDir = "asc" | "desc";

const ratingOrder: Record<CreditRatingGrade, number> = {
  AAA: 1,
  "AA+": 2,
  AA: 3,
  "AA-": 4,
  "A+": 5,
  A: 6,
  "A-": 7,
  "BBB+": 8,
  BBB: 9,
};

export default function InvestPage() {
  const [selectedBondId, setSelectedBondId] = useState<string | null>(null);
  const [buyBondId, setBuyBondId] = useState<string | null>(null);
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [sortField, setSortField] = useState<SortField>("community");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const sortedBonds = useMemo(() => {
    const sorted = [...bonds].sort((a, b) => {
      switch (sortField) {
        case "community":
          return a.communityInvested - b.communityInvested;
        case "rating":
          return ratingOrder[a.rating.grade] - ratingOrder[b.rating.grade];
        case "yield":
          return a.yieldMax - b.yieldMax;
      }
    });
    return sortDir === "desc" ? sorted.reverse() : sorted;
  }, [sortField, sortDir]);

  const selectedBond = bonds.find((b) => b.id === selectedBondId) ?? null;
  const buyBond = bonds.find((b) => b.id === buyBondId) ?? null;

  const handleSelectBond = useCallback((id: string) => {
    setSelectedBondId((prev) => (prev === id ? null : id));
  }, []);

  const handleBuy = useCallback(() => {
    if (selectedBondId) {
      setBuyBondId(selectedBondId);
      setBuyModalOpen(true);
    }
  }, [selectedBondId]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const SortIcon = sortDir === "desc" ? ArrowDownWideNarrow : ArrowUpWideNarrow;

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      {/* Map */}
      <div className="relative h-[50vh] shrink-0">
        <TransitMap>
          <TransitLineLayer />
          {bonds.map((bond) => (
            <BondMarker
              key={bond.id}
              bond={bond}
              selected={bond.id === selectedBondId}
              onClick={() => handleSelectBond(bond.id)}
            />
          ))}
        </TransitMap>
      </div>

      {/* Cards below */}
      <div className="flex-1 overflow-y-auto border-t border-border bg-background">
        <div className="mx-auto max-w-3xl px-6 py-4">
          <PortfolioSummary />
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Transit Bonds ({bonds.length})
              </h2>
              <div className="flex items-center gap-1">
                <span className="mr-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                  Sort
                </span>
                {(
                  [
                    { field: "community" as SortField, label: "Community" },
                    { field: "rating" as SortField, label: "Rating" },
                    { field: "yield" as SortField, label: "Yield" },
                  ] as const
                ).map(({ field, label }) => (
                  <Button
                    key={field}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "h-6 gap-1 rounded-full px-2 text-[10px]",
                      sortField === field
                        ? "bg-transit-teal/15 text-transit-teal hover:bg-transit-teal/20 hover:text-transit-teal"
                        : ""
                    )}
                    onClick={() => handleSort(field)}
                  >
                    {label}
                    {sortField === field && <SortIcon className="h-2.5 w-2.5" />}
                  </Button>
                ))}
              </div>
            </div>
            <div className="mt-3 space-y-3">
              {sortedBonds.map((bond) => (
                <BondCard
                  key={bond.id}
                  bond={bond}
                  selected={bond.id === selectedBondId}
                  onClick={() => handleSelectBond(bond.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <BondDetailPanel
        bond={selectedBond}
        onClose={() => setSelectedBondId(null)}
        onBuy={handleBuy}
      />

      <BuyModal
        bond={buyBond}
        open={buyModalOpen}
        onOpenChange={setBuyModalOpen}
      />
    </div>
  );
}
