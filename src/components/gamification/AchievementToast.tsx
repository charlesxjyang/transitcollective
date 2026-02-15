"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy } from "lucide-react";
import { achievements } from "@/lib/data/achievements";

interface AchievementToastProps {
  achievementId: string | null;
  onDismiss: () => void;
}

export function AchievementToast({
  achievementId,
  onDismiss,
}: AchievementToastProps) {
  const [visible, setVisible] = useState(false);
  const achievement = achievementId
    ? achievements.find((a) => a.id === achievementId)
    : null;

  useEffect(() => {
    if (achievementId) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onDismiss, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [achievementId, onDismiss]);

  return (
    <AnimatePresence>
      {visible && achievement && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="fixed top-20 left-1/2 z-[200] -translate-x-1/2"
        >
          <div className="flex items-center gap-3 rounded-xl border border-transit-yellow/30 bg-card px-4 py-3 shadow-[0_0_30px_rgba(251,191,36,0.15)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-transit-yellow/15">
              <Trophy className="h-5 w-5 text-transit-yellow" />
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-transit-yellow">
                Achievement Unlocked
              </p>
              <p className="text-sm font-semibold">{achievement.title}</p>
              <p className="text-xs text-muted-foreground">
                {achievement.description}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
