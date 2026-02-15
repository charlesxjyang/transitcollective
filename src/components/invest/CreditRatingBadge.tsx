"use client";

import { Badge } from "@/components/ui/badge";
import { CreditRating } from "@/types/bond";

const ratingColors: Record<string, string> = {
  AAA: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "AA+": "bg-teal-500/15 text-teal-400 border-teal-500/30",
  AA: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  "AA-": "bg-sky-500/15 text-sky-400 border-sky-500/30",
  "A+": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  A: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
  "A-": "bg-violet-500/15 text-violet-400 border-violet-500/30",
  "BBB+": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  BBB: "bg-orange-500/15 text-orange-400 border-orange-500/30",
};

interface CreditRatingBadgeProps {
  rating: CreditRating;
}

export function CreditRatingBadge({ rating }: CreditRatingBadgeProps) {
  const colorClass = ratingColors[rating.grade] ?? ratingColors["A"];

  return (
    <Badge variant="outline" className={`${colorClass} text-[10px] font-semibold`}>
      {rating.grade} ({rating.agency})
    </Badge>
  );
}
