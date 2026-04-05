import { useEffect, useRef, useState } from "react";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
];

const KONAMI_MOBILE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
];

const SWIPE_MAP: Record<string, string> = {
  up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight",
};

export function useKonamiCode(callback: () => void) {
  const [keys, setKeys] = useState<string[]>([]);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const swipes = useRef<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys((prev) => {
        const next = [...prev, e.key].slice(-8);
        if (next.join(",") === KONAMI_CODE.join(",")) {
          callback();
          return [];
        }
        return next;
      });
    };

    const onTouchStart = (e: TouchEvent) => {
      touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!touch.current) return;
      const dx = e.changedTouches[0].clientX - touch.current.x;
      const dy = e.changedTouches[0].clientY - touch.current.y;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      if (Math.max(absDx, absDy) < 50) { touch.current = null; return; }
      const dir = absDx > absDy
        ? SWIPE_MAP[dx > 0 ? "right" : "left"]
        : SWIPE_MAP[dy > 0 ? "down" : "up"];
      swipes.current = [...swipes.current, dir].slice(-8);
      if (swipes.current.join(",") === KONAMI_MOBILE.join(",")) {
        swipes.current = [];
        callback();
      }
      touch.current = null;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [callback]);
}
