"use client";

import { Heart, Users, FolderCheck } from "lucide-react";
import { useDonationStore } from "@/lib/store/useDonationStore";
import { useAchievementStore } from "@/lib/store/useAchievementStore";
import { AnimatedCounter } from "@/components/gamification/AnimatedCounter";
import { AchievementBadge } from "@/components/gamification/AchievementBadge";
import { achievements } from "@/lib/data/achievements";

export function CommunityStats() {
  const totalDonated = useDonationStore((s) => s.totalDonated());
  const projectCount = useDonationStore((s) => s.uniqueProjectCount());
  const donationCount = useDonationStore((s) => s.totalDonorContributions());
  const isUnlocked = useAchievementStore((s) => s.isUnlocked);

  const donateAchievements = achievements.filter(
    (a) => a.category === "donate"
  );

  if (totalDonated === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-4 text-center">
        <Heart className="mx-auto h-8 w-8 text-muted-foreground/30" />
        <p className="mt-2 text-sm text-muted-foreground">
          No donations yet
        </p>
        <p className="text-xs text-muted-foreground/60">
          Fund a community transit project to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-border bg-card p-3">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Community Impact
        </h3>
        <div className="mt-2 grid grid-cols-3 gap-2">
          <div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Heart className="h-3 w-3" />
              <span className="text-[10px]">Donated</span>
            </div>
            <p className="text-lg font-bold text-transit-orange">
              $<AnimatedCounter value={totalDonated} />
            </p>
          </div>
          <div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-3 w-3" />
              <span className="text-[10px]">Donations</span>
            </div>
            <p className="text-lg font-bold">
              <AnimatedCounter value={donationCount} />
            </p>
          </div>
          <div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <FolderCheck className="h-3 w-3" />
              <span className="text-[10px]">Projects</span>
            </div>
            <p className="text-lg font-bold">
              <AnimatedCounter value={projectCount} />
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-3">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Achievements
        </h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {donateAchievements.map((a) => (
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
