"use client";

import { Users } from "lucide-react";
import { TransitBond } from "@/types/bond";
import { CreditRatingBadge } from "./CreditRatingBadge";
import { cn } from "@/lib/utils";

function formatCommunityInvested(amount: number): string {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
  return `$${amount}`;
}

interface BondCardProps {
  bond: TransitBond;
  selected?: boolean;
  onClick?: () => void;
}

export function BondCard({ bond, selected, onClick }: BondCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full rounded-xl border bg-card p-4 text-left transition-all duration-200 hover:shadow-md",
        selected
          ? "border-transit-teal/40 shadow-md"
          : "border-border hover:border-border/80"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
            style={{
              backgroundColor: bond.color + "15",
              color: bond.color,
            }}
          >
            {bond.agencyAbbrev.length > 4
              ? bond.agencyAbbrev.slice(0, 4)
              : bond.agencyAbbrev}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold">{bond.project}</p>
            <p className="text-xs text-muted-foreground">
              {bond.agency} &middot; {bond.city}, {bond.state}
            </p>
          </div>
        </div>
        <CreditRatingBadge rating={bond.rating} />
      </div>
      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
        {bond.description}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Yield</p>
            <p className="text-sm font-semibold text-transit-teal">
              {bond.yieldMin}–{bond.yieldMax}%
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Maturity</p>
            <p className="text-sm font-medium">{bond.maturityYears}yr</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Issue</p>
            <p className="text-sm font-medium">{bond.totalIssueSize}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
            <Users className="h-2.5 w-2.5" />
            Community
          </div>
          <p className="text-sm font-semibold text-transit-orange">
            {formatCommunityInvested(bond.communityInvested)}
          </p>
        </div>
      </div>
    </button>
  );
}
