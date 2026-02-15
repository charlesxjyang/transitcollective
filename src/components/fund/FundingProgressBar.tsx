"use client";

import { Milestone } from "@/types/project";

interface FundingProgressBarProps {
  raised: number;
  goal: number;
  milestones: Milestone[];
  color: string;
}

export function FundingProgressBar({
  raised,
  goal,
  milestones,
  color,
}: FundingProgressBarProps) {
  const progress = Math.min((raised / goal) * 100, 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium" style={{ color }}>
          ${raised.toLocaleString()}
        </span>
        <span className="text-muted-foreground">
          ${goal.toLocaleString()} goal
        </span>
      </div>
      <div className="relative h-2.5 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${color}80, ${color})`,
            boxShadow: `0 0 10px ${color}40`,
          }}
        />
        {milestones.map((m) => {
          const pos = (m.amount / goal) * 100;
          return (
            <div
              key={m.amount}
              className="absolute top-1/2 h-3.5 w-0.5 -translate-y-1/2"
              style={{
                left: `${pos}%`,
                backgroundColor: m.reached ? color : "rgba(255,255,255,0.15)",
              }}
            />
          );
        })}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-0.5">
        {milestones.map((m) => (
          <span
            key={m.amount}
            className={`text-[10px] ${
              m.reached ? "text-foreground" : "text-muted-foreground/50"
            }`}
          >
            {m.reached ? "\u2713" : "\u25CB"} {m.label}
          </span>
        ))}
      </div>
    </div>
  );
}
