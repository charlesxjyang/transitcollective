"use client";

import { useState, useCallback, useMemo } from "react";
import { TransitMap } from "@/components/map/TransitMap";
import { ProjectMarker } from "@/components/map/ProjectMarker";
import { ProjectCard } from "@/components/fund/ProjectCard";
import { ProjectDetailPanel } from "@/components/fund/ProjectDetailPanel";
import { DonateModal } from "@/components/fund/DonateModal";
import { CommunityStats } from "@/components/fund/CommunityStats";
import { projects } from "@/lib/data/projects";
import { ProjectCategory } from "@/types/project";
import { Button } from "@/components/ui/button";
import { Bike, Bus, TrainFront, TramFront, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const categories: { value: ProjectCategory | "all"; label: string; icon: React.ElementType }[] = [
  { value: "all", label: "All", icon: Zap },
  { value: "bike", label: "Bike", icon: Bike },
  { value: "bus", label: "Bus", icon: Bus },
  { value: "rail", label: "Rail", icon: TrainFront },
  { value: "streetcar", label: "Streetcar", icon: TramFront },
  { value: "brt", label: "BRT", icon: Zap },
];

export default function FundPage() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [donateProjectId, setDonateProjectId] = useState<string | null>(null);
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");

  const filteredProjects = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter]
  );

  const selectedProject =
    projects.find((p) => p.id === selectedProjectId) ?? null;
  const donateProject =
    projects.find((p) => p.id === donateProjectId) ?? null;

  const handleSelectProject = useCallback((id: string) => {
    setSelectedProjectId((prev) => (prev === id ? null : id));
  }, []);

  const handleDonate = useCallback(() => {
    if (selectedProjectId) {
      setDonateProjectId(selectedProjectId);
      setDonateModalOpen(true);
    }
  }, [selectedProjectId]);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      {/* Map */}
      <div className="relative h-[50vh] shrink-0">
        <TransitMap>
          {filteredProjects.map((project) => (
            <ProjectMarker
              key={project.id}
              project={project}
              selected={project.id === selectedProjectId}
              onClick={() => handleSelectProject(project.id)}
            />
          ))}
        </TransitMap>
      </div>

      {/* Cards below */}
      <div className="flex-1 overflow-y-auto border-t border-border bg-background">
        <div className="mx-auto max-w-3xl px-6 py-4">
          <CommunityStats />

          <div className="mt-4">
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Community Projects
            </h2>
            <div className="mt-2 flex flex-wrap gap-1">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Button
                    key={cat.value}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "h-7 gap-1 rounded-full px-2.5 text-xs",
                      filter === cat.value
                        ? "bg-transit-orange/15 text-transit-orange hover:bg-transit-orange/20 hover:text-transit-orange"
                        : ""
                    )}
                    onClick={() => setFilter(cat.value)}
                  >
                    <Icon className="h-3 w-3" />
                    {cat.label}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="mt-3 space-y-3">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                selected={project.id === selectedProjectId}
                onClick={() => handleSelectProject(project.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <ProjectDetailPanel
        project={selectedProject}
        onClose={() => setSelectedProjectId(null)}
        onDonate={handleDonate}
      />

      <DonateModal
        project={donateProject}
        open={donateModalOpen}
        onOpenChange={setDonateModalOpen}
      />
    </div>
  );
}
