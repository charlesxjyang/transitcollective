"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Train, Wallet, Heart, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePortfolioStore } from "@/lib/store/usePortfolioStore";
import { useDonationStore } from "@/lib/store/useDonationStore";
import { useAchievementStore } from "@/lib/store/useAchievementStore";
import { AnimatedCounter } from "@/components/gamification/AnimatedCounter";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const totalInvested = usePortfolioStore((s) => s.totalInvested());
  const reset = usePortfolioStore((s) => s.reset);
  const resetDonations = useDonationStore((s) => s.reset);
  const resetAchievements = useAchievementStore((s) => s.reset);

  const handleReset = () => {
    reset();
    resetDonations();
    resetAchievements();
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-transit-teal/20">
              <Train className="h-4 w-4 text-transit-teal" />
            </div>
            <span className="text-sm font-semibold tracking-tight">
              Transit Collective
            </span>
          </Link>
          <div className="flex items-center gap-1 rounded-lg bg-secondary p-1">
            <Link
              href="/"
              className={cn(
                "inline-flex h-7 items-center gap-1.5 rounded-md px-3 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === "/" &&
                  "bg-transit-teal/15 text-transit-teal hover:bg-transit-teal/20 hover:text-transit-teal"
              )}
            >
              <Wallet className="h-3.5 w-3.5" />
              Invest
            </Link>
            <Link
              href="/fund"
              className={cn(
                "inline-flex h-7 items-center gap-1.5 rounded-md px-3 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === "/fund" &&
                  "bg-transit-orange/15 text-transit-orange hover:bg-transit-orange/20 hover:text-transit-orange"
              )}
            >
              <Heart className="h-3.5 w-3.5" />
              Fund
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {totalInvested > 0 && (
            <div className="flex items-center gap-1.5 rounded-lg bg-transit-teal/10 px-3 py-1.5">
              <Wallet className="h-3.5 w-3.5 text-transit-teal" />
              <span className="text-xs text-muted-foreground">Portfolio</span>
              <span className="text-sm font-semibold text-transit-teal">
                $<AnimatedCounter value={totalInvested} />
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-7 gap-1.5 px-2 text-xs text-muted-foreground hover:text-destructive"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </Button>
        </div>
      </div>
    </nav>
  );
}
