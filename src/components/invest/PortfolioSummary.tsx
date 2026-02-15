"use client";

import { Wallet, TrendingUp, Layers } from "lucide-react";
import { usePortfolioStore } from "@/lib/store/usePortfolioStore";
import { useAchievementStore } from "@/lib/store/useAchievementStore";
import { AnimatedCounter } from "@/components/gamification/AnimatedCounter";
import { AchievementBadge } from "@/components/gamification/AchievementBadge";
import { achievements } from "@/lib/data/achievements";

export function PortfolioSummary() {
  const totalInvested = usePortfolioStore((s) => s.totalInvested());
  const bondCount = usePortfolioStore((s) => s.uniqueBondCount());
  const avgYield = usePortfolioStore((s) => s.estimatedAnnualYield());
  const isUnlocked = useAchievementStore((s) => s.isUnlocked);

  const investAchievements = achievements.filter(
    (a) => a.category === "invest"
  );

  if (totalInvested === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-4 text-center">
        <Wallet className="mx-auto h-8 w-8 text-muted-foreground/30" />
        <p className="mt-2 text-sm text-muted-foreground">
          Your portfolio is empty
        </p>
        <p className="text-xs text-muted-foreground/60">
          Click a bond marker on the map to start investing
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-border bg-card p-3">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Portfolio
        </h3>
        <div className="mt-2 grid grid-cols-3 gap-2">
          <div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Wallet className="h-3 w-3" />
              <span className="text-[10px]">Invested</span>
            </div>
            <p className="text-lg font-bold text-transit-teal">
              $<AnimatedCounter value={totalInvested} />
            </p>
          </div>
          <div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              <span className="text-[10px]">Avg Yield</span>
            </div>
            <p className="text-lg font-bold">
              <AnimatedCounter value={avgYield} decimals={1} />%
            </p>
          </div>
          <div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Layers className="h-3 w-3" />
              <span className="text-[10px]">Bonds</span>
            </div>
            <p className="text-lg font-bold">
              <AnimatedCounter value={bondCount} />
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-3">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Achievements
        </h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {investAchievements.map((a) => (
            <AchievementBadge
              key={a.id}
              achievement={a}
              unlocked={isUnlocked(a.id)}
              size="sm"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
