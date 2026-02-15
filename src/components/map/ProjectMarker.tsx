"use client";

import { Marker } from "react-map-gl/maplibre";
import { Bike, Bus, TrainFront, TramFront, Zap } from "lucide-react";
import { CrowdsourceProject, ProjectCategory } from "@/types/project";
import { cn } from "@/lib/utils";

const categoryIcons: Record<ProjectCategory, React.ElementType> = {
  bike: Bike,
  bus: Bus,
  rail: TrainFront,
  streetcar: TramFront,
  brt: Zap,
};

interface ProjectMarkerProps {
  project: CrowdsourceProject;
  selected?: boolean;
  onClick?: () => void;
}

export function ProjectMarker({
  project,
  selected,
  onClick,
}: ProjectMarkerProps) {
  const Icon = categoryIcons[project.category];
  const progress = project.raisedAmount / project.goalAmount;

  return (
    <Marker
      longitude={project.coordinates[0]}
      latitude={project.coordinates[1]}
      anchor="center"
      onClick={(e) => {
        e.originalEvent.stopPropagation();
        onClick?.();
      }}
    >
      <button
        className={cn(
          "group relative flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110",
          selected ? "h-12 w-12" : "h-9 w-9"
        )}
      >
        {/* Progress ring */}
        <svg
          className="absolute inset-0 -rotate-90"
          viewBox="0 0 36 36"
          fill="none"
        >
          <circle
            cx="18"
            cy="18"
            r="16"
            stroke="currentColor"
            strokeWidth="2"
            className="text-white/10"
          />
          <circle
            cx="18"
            cy="18"
            r="16"
            stroke={project.color}
            strokeWidth="2.5"
            strokeDasharray={`${progress * 100} ${100 - progress * 100}`}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 4px ${project.color}60)` }}
          />
        </svg>
        <Icon
          className={cn(
            "relative z-10",
            selected ? "h-5 w-5" : "h-4 w-4"
          )}
          style={{ color: project.color }}
        />
        {selected && (
          <span
            className="absolute -bottom-5 whitespace-nowrap rounded bg-card px-1.5 py-0.5 text-[10px] font-medium shadow-lg"
            style={{ color: project.color }}
          >
            {project.city}
          </span>
        )}
      </button>
    </Marker>
  );
}
