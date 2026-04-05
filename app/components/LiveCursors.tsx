import { useEffect, useRef, useState } from "react";
import { ref, onValue, set, onDisconnect, remove } from "firebase/database";
import { rtdb } from "~/lib/firebase";
import { Smartphone } from "lucide-react";

interface Cursor {
  x: number;
  y: number;
  ts: number;
  mobile?: boolean;
}

const SESSION_ID = Math.random().toString(36).slice(2, 10);
const COLORS = ["#10B981", "#06B6D4", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];
const IS_MOBILE = typeof navigator !== "undefined" && /Mobi|Android/i.test(navigator.userAgent);

export default function LiveCursors() {
  const [cursors, setCursors] = useState<Record<string, Cursor>>({});
  const myRef = useRef(ref(rtdb, `cursors/${SESSION_ID}`));
  const throttle = useRef(0);
  const [myPos, setMyPos] = useState(0);

  useEffect(() => {
    onDisconnect(myRef.current).remove();

    const unsub = onValue(ref(rtdb, "cursors"), (snap) => {
      const data = snap.val() || {};
      delete data[SESSION_ID];
      const now = Date.now();
      const active: Record<string, Cursor> = {};
      Object.entries(data).forEach(([id, c]) => {
        if (now - (c as Cursor).ts < 15000) active[id] = c as Cursor;
      });
      setCursors(active);
    });

    const onMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - throttle.current < 50) return;
      throttle.current = now;
      const y = parseFloat(((e.clientY + window.scrollY) / document.documentElement.scrollHeight * 100).toFixed(2));
      setMyPos(y);
      set(myRef.current, {
        x: parseFloat(((e.clientX / window.innerWidth) * 100).toFixed(1)),
        y,
        ts: now,
        mobile: false,
      });
    };

    const onScroll = () => {
      if (!IS_MOBILE) return;
      const now = Date.now();
      if (now - throttle.current < 100) return;
      throttle.current = now;
      const centerY = window.scrollY + window.innerHeight / 2;
      const y = parseFloat((centerY / document.documentElement.scrollHeight * 100).toFixed(2));
      setMyPos(y);
      set(myRef.current, { x: 50, y, ts: now, mobile: true });
    };

    if (IS_MOBILE) {
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    } else {
      window.addEventListener("mousemove", onMove);
    }

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      remove(myRef.current);
      unsub();
    };
  }, []);

  const count = Object.keys(cursors).length + 1;

  return (
    <>
      <div className="fixed bottom-4 left-4 z-[9997] flex items-center gap-2 px-3 py-1.5 bg-[#0F172A]/80 backdrop-blur-sm rounded-full border border-white/10">
        <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
        <span className="text-xs font-mono text-[#94A3B8]">{count} online</span>
      </div>

      {/* My own dot */}
      <div
        className="fixed left-0 flex items-center gap-1 transition-all duration-150 pointer-events-none z-[9997]"
        style={{ top: `${myPos}vh` }}
      >
        <div
          className="w-2 h-2 rounded-full shrink-0"
          style={{ background: "#fff", boxShadow: "0 0 6px #fff, 0 0 12px #fff" }}
        />
        {IS_MOBILE && (
          <Smartphone className="w-3 h-3 text-white" style={{ filter: "drop-shadow(0 0 4px #fff)" }} />
        )}
      </div>

      {Object.entries(cursors).map(([id, c], i) => {
        const color = COLORS[i % COLORS.length];
        return (
          <div key={id} className="fixed pointer-events-none z-[9997]">
            <div
              className="fixed left-0 flex items-center gap-1 transition-all duration-300 pointer-events-none"
              style={{ top: `${c.y}vh` }}
            >
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: color, boxShadow: `0 0 6px ${color}, 0 0 12px ${color}` }}
              />
              {c.mobile && (
                <Smartphone className="w-3 h-3" style={{ color, filter: `drop-shadow(0 0 4px ${color})` }} />
              )}
            </div>
            {!c.mobile && (
              <div
                className="fixed transition-all duration-100"
                style={{
                  left: `${c.x}%`,
                  top: `${(c.y / 100) * document.documentElement.scrollHeight - window.scrollY}px`,
                }}
              >
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                  <path d="M0 0L16 12H6L0 20V0Z" fill={color} />
                </svg>
                <span className="text-[10px] ml-1 px-1 rounded-sm text-white" style={{ background: color }}>
                  visitor
                </span>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
