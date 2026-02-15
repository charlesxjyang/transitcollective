"use client";

import { Bike, Bus, TrainFront, TramFront, Zap, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CrowdsourceProject, ProjectCategory } from "@/types/project";
import { FundingProgressBar } from "./FundingProgressBar";
import { cn } from "@/lib/utils";

const categoryIcons: Record<ProjectCategory, React.ElementType> = {
  bike: Bike,
  bus: Bus,
  rail: TrainFront,
  streetcar: TramFront,
  brt: Zap,
};

interface ProjectCardProps {
  project: CrowdsourceProject;
  selected?: boolean;
  onClick?: () => void;
}

export function ProjectCard({ project, selected, onClick }: ProjectCardProps) {
  const Icon = categoryIcons[project.category];

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full rounded-xl border bg-card p-4 text-left transition-all duration-200 hover:shadow-md",
        selected
          ? "border-transit-orange/40 shadow-md"
          : "border-border hover:border-border/80"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
            style={{
              backgroundColor: project.color + "15",
              color: project.color,
            }}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold">{project.title}</p>
            <p className="text-xs text-muted-foreground">
              {project.city}, {project.state}
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className="shrink-0 capitalize text-[10px]"
          style={{
            borderColor: project.color + "40",
            color: project.color,
          }}
        >
          {project.category}
        </Badge>
      </div>
      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
        {project.description}
      </p>
      <div className="mt-3">
        <FundingProgressBar
          raised={project.raisedAmount}
          goal={project.goalAmount}
          milestones={project.milestones}
          color={project.color}
        />
      </div>
      <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
        <Clock className="h-3 w-3" />
        {project.daysLeft} days left &middot; {project.donorCount} donors
      </div>
    </button>
  );
}
