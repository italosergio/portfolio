import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { rtdb } from "~/lib/firebase";

interface ClickEvent {
  clickX?: number;
  clickY?: number;
  scrollY?: number;
  viewport?: string;
  screen?: string;
  mobile?: boolean;
  timestamp?: number;
  language?: string;
  userAgent?: string;
  category?: string;
  action?: string;
  label?: string | null;
}

interface Dot {
  x: number;
  y: number;
  event: ClickEvent;
}

const periods = [
  { key: "24h", label: "24h", ms: 86400000 },
  { key: "72h", label: "72h", ms: 259200000 },
  { key: "7d", label: "7d", ms: 604800000 },
  { key: "30d", label: "30d", ms: 2592000000 },
  { key: "90d", label: "90d", ms: 7776000000 },
  { key: "180d", label: "180d", ms: 15552000000 },
  { key: "360d", label: "360d", ms: 31104000000 },
  { key: "3a", label: "3a", ms: 94608000000 },
  { key: "5a", label: "5a", ms: 157680000000 },
] as const;

function parseUA(ua: string) {
  if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) return "Chrome";
  if (/Edg/i.test(ua)) return "Edge";
  if (/Firefox/i.test(ua)) return "Firefox";
  if (/Safari/i.test(ua)) return "Safari";
  return "Outro";
}

export default function ClickHeatmap({ onClose }: { onClose: () => void }) {
  const [allEvents, setAllEvents] = useState<ClickEvent[]>([]);
  const [period, setPeriod] = useState("30d");
  const [hovered, setHovered] = useState<Dot | null>(null);
  const [pageH, setPageH] = useState(1);
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    setPageH(document.documentElement.scrollHeight);
    const unsub = onValue(ref(rtdb, "events"), (snap) => {
      const data = snap.val();
      if (!data) return;
      const all = Object.values(data) as ClickEvent[];
      setAllEvents(all.filter(
        (e) => e.clickX != null && e.clickY != null && e.scrollY != null && e.mobile === isMobile
      ));
      setPageH(document.documentElement.scrollHeight);
    });
    return unsub;
  }, [isMobile]);

  const cutoff = Date.now() - (periods.find(p => p.key === period)?.ms ?? 2592000000);
  const filtered = allEvents.filter(e => (e.timestamp ?? 0) >= cutoff);

  const dots: Dot[] = filtered.map((e) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    return {
      x: (e.clickX! / 100) * vw,
      y: (e.scrollY! / 100) * pageH + (e.clickY! / 100) * vh,
      event: e,
    };
  });

  return (
    <div className="absolute inset-0 pointer-events-none z-[9999]" style={{ height: pageH }}>
      {/* Top bar */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[10000] pointer-events-auto flex flex-col items-center gap-2 bg-black/30 border border-[#10B981]/20 rounded-sm px-4 py-2 font-mono text-xs backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="text-[#10B981]">🔥 {dots.length} cliques ({isMobile ? "mobile" : "desktop"})</span>
          <button onClick={onClose} className="text-white/60 hover:text-white">✕ Fechar</button>
        </div>
        <div className="flex flex-wrap gap-1">
          {periods.map(p => (
            <button
              key={p.key}
              onClick={() => setPeriod(p.key)}
              className={`px-1.5 py-0.5 rounded-sm transition-colors ${
                period === p.key ? "bg-[#10B981] text-black" : "bg-white/10 text-[#94A3B8] hover:bg-white/20"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dots */}
      {dots.map((d, i) => (
        <div
          key={i}
          className="absolute w-4 h-4 rounded-full pointer-events-auto cursor-pointer"
          style={{
            left: d.x,
            top: d.y,
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, #10B981 0%, transparent 70%)",
            boxShadow: "0 0 8px 2px #10B981, 0 0 16px 4px rgba(16,185,129,0.4)",
          }}
          onMouseEnter={() => setHovered(d)}
          onMouseLeave={() => setHovered(null)}
        />
      ))}

      {/* Tooltip */}
      {hovered && (
        <div
          className="absolute z-[10001] pointer-events-none bg-[#0F172A]/95 border border-[#10B981]/30 rounded-sm px-3 py-2 font-mono text-[10px] text-[#94A3B8] space-y-0.5 backdrop-blur-sm"
          style={{ left: hovered.x + 12, top: hovered.y - 8 }}
        >
          {hovered.event.timestamp && <div className="text-[#10B981]">{new Date(hovered.event.timestamp).toLocaleString("pt-BR")}</div>}
          {hovered.event.category && <div><span className="text-[#F59E0B]">{hovered.event.category}</span> · {hovered.event.action}</div>}
          {hovered.event.label && <div className="text-[#06B6D4]">{hovered.event.label}</div>}
          {hovered.event.viewport && <div>Viewport: {hovered.event.viewport}</div>}
          {hovered.event.screen && <div>Tela: {hovered.event.screen}</div>}
          {hovered.event.language && <div>Idioma: {hovered.event.language}</div>}
          {hovered.event.userAgent && <div>Navegador: {parseUA(hovered.event.userAgent)}</div>}
        </div>
      )}
    </div>
  );
}
