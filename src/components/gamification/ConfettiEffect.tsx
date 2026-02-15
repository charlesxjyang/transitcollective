"use client";

import { useCallback, useEffect, useRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import type { CreateTypes as TCanvasConfettiInstance } from "canvas-confetti";

interface ConfettiEffectProps {
  fire: boolean;
  onComplete?: () => void;
}

export function ConfettiEffect({ fire, onComplete }: ConfettiEffectProps) {
  const confettiRef = useRef<TCanvasConfettiInstance | null>(null);
  const hasFired = useRef(false);

  const handleInit = useCallback(
    ({ confetti }: { confetti: TCanvasConfettiInstance }) => {
      confettiRef.current = confetti;
    },
    []
  );

  useEffect(() => {
    if (fire && !hasFired.current && confettiRef.current) {
      hasFired.current = true;
      const confetti = confettiRef.current;

      const colors = ["#2dd4bf", "#fb923c", "#fbbf24", "#34d399", "#a855f7"];

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors,
        ticks: 200,
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.65 },
          colors,
          ticks: 200,
        });
      }, 150);

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.65 },
          colors,
          ticks: 200,
        });
      }, 300);

      setTimeout(() => {
        hasFired.current = false;
        onComplete?.();
      }, 2000);
    }
  }, [fire, onComplete]);

  return (
    <ReactCanvasConfetti
      onInit={handleInit}
      style={{
        position: "fixed",
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 100,
      }}
    />
  );
}
