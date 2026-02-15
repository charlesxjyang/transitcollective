"use client";

import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { TransitBond } from "@/types/bond";
import { usePortfolioStore } from "@/lib/store/usePortfolioStore";
import { useAchievementStore } from "@/lib/store/useAchievementStore";
import { ConfettiEffect } from "@/components/gamification/ConfettiEffect";
import { AchievementToast } from "@/components/gamification/AchievementToast";
import { CreditRatingBadge } from "./CreditRatingBadge";
import { Check, TrendingUp } from "lucide-react";

const PRESETS = [25, 50, 100, 250, 500, 1000];

interface BuyModalProps {
  bond: TransitBond | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BuyModal({ bond, open, onOpenChange }: BuyModalProps) {
  const [amount, setAmount] = useState(100);
  const [purchased, setPurchased] = useState(false);
  const [fireConfetti, setFireConfetti] = useState(false);
  const [unlockedAchievement, setUnlockedAchievement] = useState<string | null>(
    null
  );
  const addHolding = usePortfolioStore((s) => s.addHolding);
  const checkAchievements = useAchievementStore((s) => s.checkAndUnlock);

  const estimatedYield = bond
    ? bond.yieldMin + ((bond.yieldMax - bond.yieldMin) * amount) / 2000
    : 0;
  const annualReturn = (amount * estimatedYield) / 100;

  const handlePurchase = useCallback(() => {
    if (!bond) return;
    addHolding(bond.id, amount, estimatedYield);
    setPurchased(true);
    setFireConfetti(true);

    setTimeout(() => {
      const newAchievement = checkAchievements();
      if (newAchievement) {
        setUnlockedAchievement(newAchievement);
      }
    }, 500);
  }, [bond, amount, estimatedYield, addHolding, checkAchievements]);

  const handleClose = (open: boolean) => {
    if (!open) {
      setPurchased(false);
      setFireConfetti(false);
      setAmount(100);
      setUnlockedAchievement(null);
    }
    onOpenChange(open);
  };

  if (!bond) return null;

  return (
    <>
      <ConfettiEffect fire={fireConfetti} />
      <AchievementToast
        achievementId={unlockedAchievement}
        onDismiss={() => setUnlockedAchievement(null)}
      />
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="border-border bg-card sm:max-w-md">
          {purchased ? (
            <div className="flex flex-col items-center py-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-transit-teal/20">
                <Check className="h-8 w-8 text-transit-teal" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Bond Purchased!</h3>
              <p className="mt-2 text-muted-foreground">
                You invested ${amount.toLocaleString()} in {bond.agencyAbbrev}{" "}
                bonds at ~{estimatedYield.toFixed(1)}% yield.
              </p>
              <p className="mt-1 text-sm text-transit-teal">
                Est. ${annualReturn.toFixed(2)}/year in interest
              </p>
              <Button
                className="mt-6"
                variant="outline"
                onClick={() => handleClose(false)}
              >
                Done
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  Buy {bond.agencyAbbrev} Bond
                  <CreditRatingBadge rating={bond.rating} />
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-5">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {bond.project}
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    {bond.city}, {bond.state}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">
                      Investment Amount
                    </label>
                    <span className="text-2xl font-bold text-transit-teal">
                      ${amount.toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    value={[amount]}
                    onValueChange={([v]) => setAmount(v)}
                    min={25}
                    max={5000}
                    step={25}
                    className="mt-3"
                  />
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {PRESETS.map((p) => (
                      <Button
                        key={p}
                        variant={amount === p ? "default" : "outline"}
                        size="sm"
                        className="h-7 px-3 text-xs"
                        onClick={() => setAmount(p)}
                      >
                        ${p}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg bg-secondary p-3">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="h-4 w-4 text-transit-teal" />
                    <span className="text-sm font-medium">
                      Estimated Returns
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Est. Yield
                    </span>
                    <span className="font-medium">
                      ~{estimatedYield.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Annual Return
                    </span>
                    <span className="font-medium text-transit-teal">
                      ~${annualReturn.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Maturity</span>
                    <span className="font-medium">
                      {bond.maturityYears} years
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full bg-transit-teal text-primary-foreground hover:bg-transit-teal/90"
                  onClick={handlePurchase}
                >
                  Purchase Bond — ${amount.toLocaleString()}
                </Button>

                <p className="text-center text-[10px] text-muted-foreground/50">
                  Demo only. No real money is being charged.
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
