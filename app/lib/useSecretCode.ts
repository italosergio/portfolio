import { useEffect, useRef } from "react";

const SECRET_CODE = (import.meta.env.VITE_SECRET_CODE || "").split(",");

const SWIPE_MAP: Record<string, string> = {
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
};

export function useSecretCode(callback: () => void) {
  const keys = useRef<string[]>([]);
  const touch = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const check = (input: string) => {
      keys.current = [...keys.current, input].slice(-SECRET_CODE.length);
      if (keys.current.join(",") === SECRET_CODE.join(",")) {
        keys.current = [];
        callback();
      }
    };

    const onKey = (e: KeyboardEvent) => check(e.key);

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
      if (absDx > absDy) {
        check(SWIPE_MAP[dx > 0 ? "right" : "left"]);
      } else {
        check(SWIPE_MAP[dy > 0 ? "down" : "up"]);
      }
      touch.current = null;
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [callback]);
}
