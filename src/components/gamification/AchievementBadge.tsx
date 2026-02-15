"use client";

import {
  Ticket,
  Banknote,
  Landmark,
  GitBranch,
  MapPin,
  Heart,
  Trophy,
  Users,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Achievement } from "@/types/achievement";

const iconMap: Record<string, React.ElementType> = {
  ticket: Ticket,
  banknote: Banknote,
  landmark: Landmark,
  "git-branch": GitBranch,
  "map-pin": MapPin,
  heart: Heart,
  trophy: Trophy,
  users: Users,
};

interface AchievementBadgeProps {
  achievement: Achievement;
  unlocked: boolean;
  size?: "sm" | "md";
}

export function AchievementBadge({
  achievement,
  unlocked,
  size = "md",
}: AchievementBadgeProps) {
  const Icon = iconMap[achievement.icon] ?? Ticket;

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1",
        size === "sm" ? "w-14" : "w-20"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-full border-2 transition-all",
          size === "sm" ? "h-10 w-10" : "h-14 w-14",
          unlocked
            ? "border-transit-yellow bg-transit-yellow/15 text-transit-yellow shadow-[0_0_12px_rgba(251,191,36,0.3)]"
            : "border-border bg-secondary text-muted-foreground/40"
        )}
      >
        {unlocked ? (
          <Icon className={size === "sm" ? "h-4 w-4" : "h-6 w-6"} />
        ) : (
          <Lock className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />
        )}
      </div>
      <span
        className={cn(
          "text-center leading-tight",
          size === "sm" ? "text-[9px]" : "text-[10px]",
          unlocked ? "text-foreground" : "text-muted-foreground/50"
        )}
      >
        {achievement.title}
      </span>
    </div>
  );
}
