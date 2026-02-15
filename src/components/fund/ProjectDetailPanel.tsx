"use client";

import { Clock, Users, Bike, Bus, TrainFront, TramFront, Zap } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CrowdsourceProject, ProjectCategory } from "@/types/project";
import { FundingProgressBar } from "./FundingProgressBar";

const categoryIcons: Record<ProjectCategory, React.ElementType> = {
  bike: Bike,
  bus: Bus,
  rail: TrainFront,
  streetcar: TramFront,
  brt: Zap,
};

interface ProjectDetailPanelProps {
  project: CrowdsourceProject | null;
  onClose: () => void;
  onDonate: () => void;
}

export function ProjectDetailPanel({
  project,
  onClose,
  onDonate,
}: ProjectDetailPanelProps) {
  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="border-border bg-card sm:max-w-lg">
        {project && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3">
                {(() => {
                  const Icon = categoryIcons[project.category];
                  return (
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: project.color + "15",
                        color: project.color,
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  );
                })()}
                <div>
                  <DialogTitle className="text-base">
                    {project.title}
                  </DialogTitle>
                  <p className="text-sm text-muted-foreground">
                    {project.city}, {project.state}
                  </p>
                </div>
              </div>
            </DialogHeader>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            <FundingProgressBar
              raised={project.raisedAmount}
              goal={project.goalAmount}
              milestones={project.milestones}
              color={project.color}
            />

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-secondary p-3">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="text-xs">Time Left</span>
                </div>
                <p className="mt-1 text-lg font-semibold">
                  {project.daysLeft} days
                </p>
              </div>
              <div className="rounded-lg bg-secondary p-3">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Users className="h-3.5 w-3.5" />
                  <span className="text-xs">Donors</span>
                </div>
                <p className="mt-1 text-lg font-semibold">
                  {project.donorCount.toLocaleString()}
                </p>
              </div>
            </div>

            <Button
              className="w-full bg-transit-orange text-white hover:bg-transit-orange/90"
              onClick={onDonate}
            >
              Donate to Project
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
