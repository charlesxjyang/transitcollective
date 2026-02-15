"use client";

import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CrowdsourceProject } from "@/types/project";
import { useDonationStore } from "@/lib/store/useDonationStore";
import { useAchievementStore } from "@/lib/store/useAchievementStore";
import { ConfettiEffect } from "@/components/gamification/ConfettiEffect";
import { AchievementToast } from "@/components/gamification/AchievementToast";
import { Check, Heart } from "lucide-react";

const PRESETS = [10, 25, 50, 100, 250];

interface DonateModalProps {
  project: CrowdsourceProject | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DonateModal({ project, open, onOpenChange }: DonateModalProps) {
  const [amount, setAmount] = useState(25);
  const [donated, setDonated] = useState(false);
  const [fireConfetti, setFireConfetti] = useState(false);
  const [unlockedAchievement, setUnlockedAchievement] = useState<string | null>(
    null
  );
  const addDonation = useDonationStore((s) => s.addDonation);
  const checkAchievements = useAchievementStore((s) => s.checkAndUnlock);

  const handleDonate = useCallback(() => {
    if (!project) return;
    addDonation(project.id, amount);
    setDonated(true);
    setFireConfetti(true);

    setTimeout(() => {
      const newAchievement = checkAchievements();
      if (newAchievement) {
        setUnlockedAchievement(newAchievement);
      }
    }, 500);
  }, [project, amount, addDonation, checkAchievements]);

  const handleClose = (open: boolean) => {
    if (!open) {
      setDonated(false);
      setFireConfetti(false);
      setAmount(25);
      setUnlockedAchievement(null);
    }
    onOpenChange(open);
  };

  if (!project) return null;

  return (
    <>
      <ConfettiEffect fire={fireConfetti} />
      <AchievementToast
        achievementId={unlockedAchievement}
        onDismiss={() => setUnlockedAchievement(null)}
      />
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="border-border bg-card sm:max-w-md">
          {donated ? (
            <div className="flex flex-col items-center py-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-transit-orange/20">
                <Heart className="h-8 w-8 text-transit-orange" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">
                Thank You!
              </h3>
              <p className="mt-2 text-muted-foreground">
                You donated ${amount.toLocaleString()} to {project.title} in{" "}
                {project.city}.
              </p>
              <p className="mt-1 text-sm text-transit-orange">
                You&apos;re making transit better for everyone
              </p>
              <Button
                className="mt-6"
                variant="outline"
                onClick={() => handleClose(false)}
              >
                Done
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>
                  Donate to {project.title}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">
                  {project.city}, {project.state} &middot;{" "}
                  {Math.round(
                    (project.raisedAmount / project.goalAmount) * 100
                  )}
                  % funded
                </p>

                <div>
                  <label className="text-sm font-medium">
                    Choose an amount
                  </label>
                  <div className="mt-3 grid grid-cols-5 gap-2">
                    {PRESETS.map((p) => (
                      <Button
                        key={p}
                        variant={amount === p ? "default" : "outline"}
                        className={`h-12 text-base ${
                          amount === p
                            ? "bg-transit-orange text-accent-foreground hover:bg-transit-orange/90"
                            : ""
                        }`}
                        onClick={() => setAmount(p)}
                      >
                        ${p}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg bg-secondary p-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Your donation
                    </span>
                    <span className="font-semibold text-transit-orange">
                      ${amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-1 flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      New total raised
                    </span>
                    <span className="font-medium">
                      $
                      {(
                        project.raisedAmount + amount
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full bg-transit-orange text-accent-foreground hover:bg-transit-orange/90"
                  onClick={handleDonate}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Donate ${amount.toLocaleString()}
                </Button>

                <p className="text-center text-[10px] text-muted-foreground/50">
                  Demo only. No real money is being charged.
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
