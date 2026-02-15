"use client";

import { TrendingUp, Calendar, Banknote, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TransitBond } from "@/types/bond";
import { CreditRatingBadge } from "./CreditRatingBadge";

interface BondDetailPanelProps {
  bond: TransitBond | null;
  onClose: () => void;
  onBuy: () => void;
}

export function BondDetailPanel({ bond, onClose, onBuy }: BondDetailPanelProps) {
  return (
    <Dialog open={!!bond} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="border-border bg-card sm:max-w-lg">
        {bond && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold"
                  style={{
                    backgroundColor: bond.color + "15",
                    color: bond.color,
                  }}
                >
                  {bond.agencyAbbrev.length > 4
                    ? bond.agencyAbbrev.slice(0, 4)
                    : bond.agencyAbbrev}
                </div>
                <div>
                  <DialogTitle className="text-base">
                    {bond.project}
                  </DialogTitle>
                  <p className="text-sm text-muted-foreground">
                    {bond.agency} &middot; {bond.city}, {bond.state}
                  </p>
                </div>
              </div>
            </DialogHeader>

            <div className="mt-1">
              <CreditRatingBadge rating={bond.rating} />
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {bond.description}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-secondary p-3">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span className="text-xs">Yield Range</span>
                </div>
                <p className="mt-1 text-lg font-semibold text-transit-teal">
                  {bond.yieldMin}–{bond.yieldMax}%
                </p>
              </div>
              <div className="rounded-lg bg-secondary p-3">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span className="text-xs">Maturity</span>
                </div>
                <p className="mt-1 text-lg font-semibold">
                  {bond.maturityYears} years
                </p>
              </div>
              <div className="rounded-lg bg-secondary p-3">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Banknote className="h-3.5 w-3.5" />
                  <span className="text-xs">Total Issue</span>
                </div>
                <p className="mt-1 text-lg font-semibold">
                  {bond.totalIssueSize}
                </p>
              </div>
              <div className="rounded-lg bg-secondary p-3">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Users className="h-3.5 w-3.5" />
                  <span className="text-xs">Community Invested</span>
                </div>
                <p className="mt-1 text-lg font-semibold text-transit-orange">
                  ${bond.communityInvested.toLocaleString()}
                </p>
              </div>
            </div>

            <Button
              className="w-full bg-transit-teal text-primary-foreground hover:bg-transit-teal/90"
              onClick={onBuy}
            >
              Buy Fractional Bond
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
