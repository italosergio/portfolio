import { useEffect, useState, useMemo } from "react";
import { ref, onValue } from "firebase/database";
import { rtdb } from "~/lib/firebase";

function Row({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-[#64748B]">{label}</span>
      <span className="text-right" style={{ color: color || "#94A3B8" }}>{value}</span>
    </div>
  );
}

interface PageView {
  path: string;
  timestamp: number;
  userAgent: string;
  referrer: string | null;
  language: string;
  screen: string;
}

interface ClickEvent {
  category: string;
  action: string;
  label: string | null;
  timestamp: number;
  path: string;
  clickX?: number;
  clickY?: number;
  scrollY?: number;
  viewport?: string;
  screen?: string;
  mobile?: boolean;
  language?: string;
  userAgent?: string;
}

export default function AnalyticsPanel() {
  const [views, setViews] = useState<PageView[]>([]);
  const [events, setEvents] = useState<ClickEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<ClickEvent | null>(null);

  useEffect(() => {
    const unsub1 = onValue(ref(rtdb, "pageviews"), (snap) => {
      const data = snap.val();
      if (!data) return;
      const list = Object.values(data) as PageView[];
      setViews(list.sort((a, b) => b.timestamp - a.timestamp));
    });
    const unsub2 = onValue(ref(rtdb, "events"), (snap) => {
      const data = snap.val();
      if (!data) return;
      const list = Object.values(data) as ClickEvent[];
      setEvents(list.sort((a, b) => b.timestamp - a.timestamp));
    });
    return () => { unsub1(); unsub2(); };
  }, []);

  const today = views.filter(v => new Date(v.timestamp).toDateString() === new Date().toDateString()).length;
  const unique = new Set(views.map(v => `${v.userAgent}-${v.screen}`)).size;

  // Group events by category
  const eventsByCategory: Record<string, number> = {};
  events.forEach(e => { eventsByCategory[e.category] = (eventsByCategory[e.category] || 0) + 1; });

  const [period, setPeriod] = useState<"day" | "7d" | "30d" | "90d" | "180d" | "365d">("day");

  const chartData = useMemo(() => {
    const now = Date.now();
    const ranges: Record<string, { ms: number; buckets: number; label: (i: number) => string }> = {
      day: { ms: 86400000, buckets: 24, label: (i) => `${i}h` },
      "7d": { ms: 604800000, buckets: 7, label: (i) => { const d = new Date(now - (6 - i) * 86400000); return `${d.getDate()}/${d.getMonth() + 1}`; } },
      "30d": { ms: 2592000000, buckets: 30, label: (i) => { const d = new Date(now - (29 - i) * 86400000); return `${d.getDate()}`; } },
      "90d": { ms: 7776000000, buckets: 12, label: (i) => { const d = new Date(now - (11 - i) * 604800000); return `S${Math.ceil(d.getDate() / 7)}`; } },
      "180d": { ms: 15552000000, buckets: 6, label: (i) => { const d = new Date(now - (5 - i) * 2592000000); return d.toLocaleString("pt-BR", { month: "short" }); } },
      "365d": { ms: 31536000000, buckets: 12, label: (i) => { const d = new Date(now - (11 - i) * 2592000000); return d.toLocaleString("pt-BR", { month: "short" }); } },
    };
    const r = ranges[period];
    const cutoff = now - r.ms;
    const filtered = views.filter(v => v.timestamp >= cutoff);
    const bucketSize = r.ms / r.buckets;
    const counts = Array(r.buckets).fill(0);
    filtered.forEach(v => {
      const idx = Math.min(Math.floor((v.timestamp - cutoff) / bucketSize), r.buckets - 1);
      counts[idx]++;
    });
    const max = Math.max(...counts, 1);
    return { counts, max, labels: Array.from({ length: r.buckets }, (_, i) => r.label(i)), total: filtered.length };
  }, [views, period]);

  const periods = [
    { key: "day", label: "Hoje" },
    { key: "7d", label: "7d" },
    { key: "30d", label: "30d" },
    { key: "90d", label: "90d" },
    { key: "180d", label: "180d" },
    { key: "365d", label: "365d" },
  ] as const;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 text-white font-mono">
      <h1 className="text-3xl font-bold text-[#10B981] mb-6">Analytics</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white/5 p-4 rounded-sm">
          <div className="text-2xl font-bold text-[#10B981]">{views.length}</div>
          <div className="text-xs text-[#94A3B8]">Total views</div>
        </div>
        <div className="bg-white/5 p-4 rounded-sm">
          <div className="text-2xl font-bold text-[#06B6D4]">{today}</div>
          <div className="text-xs text-[#94A3B8]">Hoje</div>
        </div>
        <div className="bg-white/5 p-4 rounded-sm">
          <div className="text-2xl font-bold text-[#F59E0B]">{unique}</div>
          <div className="text-xs text-[#94A3B8]">Visitantes únicos (aprox)</div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white/5 p-4 rounded-sm mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-sm text-[#94A3B8]">Visitas</span>
            <span className="text-lg font-bold text-[#10B981] ml-2">{chartData.total}</span>
          </div>
          <div className="flex gap-1">
            {periods.map(p => (
              <button
                key={p.key}
                onClick={() => setPeriod(p.key)}
                className={`px-2 py-1 text-[10px] font-mono rounded-sm transition-colors ${
                  period === p.key ? "bg-[#10B981] text-black" : "bg-white/5 text-[#94A3B8] hover:bg-white/10"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-end gap-[2px]" style={{ height: 128 }}>
          {chartData.counts.map((count, i) => (
            <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
              <span className="text-[8px] text-[#94A3B8] mb-1">{count || ""}</span>
              <div
                className="w-full bg-[#10B981] transition-all duration-300"
                style={{ height: count ? Math.max((count / chartData.max) * 100, 2) : 1, opacity: count ? 1 : 0.15 }}
              />
              <span className="text-[7px] text-[#64748B] truncate w-full text-center mt-1">{chartData.labels[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Event stats */}
      <h2 className="text-sm text-[#94A3B8] mb-3">Eventos por categoria</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {Object.entries(eventsByCategory).map(([cat, count]) => (
          <div key={cat} className="bg-white/5 p-3 rounded-sm">
            <div className="text-lg font-bold text-[#10B981]">{count}</div>
            <div className="text-xs text-[#94A3B8]">{cat}</div>
          </div>
        ))}
      </div>

      {/* Recent events */}
      <h2 className="text-sm text-[#94A3B8] mb-3">Últimos eventos</h2>
      <div className="space-y-2 max-h-[30vh] overflow-y-auto mb-8">
        {events.slice(0, 30).map((e, i) => (
          <div key={i} onClick={() => setSelectedEvent(e)} className="bg-white/5 p-3 rounded-sm text-xs flex justify-between items-start gap-4 cursor-pointer hover:bg-white/10 transition-colors">
            <div>
              <span className="text-[#F59E0B]">{e.category}</span>
              <span className="text-[#06B6D4] ml-2">{e.action}</span>
              {e.label && <span className="text-[#94A3B8] ml-2">{e.label}</span>}
            </div>
            <span className="text-[#64748B] shrink-0">
              {new Date(e.timestamp).toLocaleString("pt-BR")}
            </span>
          </div>
        ))}
      </div>

      {/* Event detail modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70" onClick={() => setSelectedEvent(null)}>
          <div className="bg-[#1E293B] border border-white/10 rounded-sm p-6 max-w-md w-full mx-4 font-mono text-xs" onClick={(ev) => ev.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-[#10B981]">Detalhes do Evento</h3>
              <button onClick={() => setSelectedEvent(null)} className="text-white/50 hover:text-white text-lg">×</button>
            </div>
            <div className="space-y-2">
              <Row label="Categoria" value={selectedEvent.category} color="#F59E0B" />
              <Row label="Ação" value={selectedEvent.action} color="#06B6D4" />
              {selectedEvent.label && <Row label="Label" value={selectedEvent.label} />}
              <Row label="Data" value={new Date(selectedEvent.timestamp).toLocaleString("pt-BR")} />
              <Row label="Página" value={selectedEvent.path} />
              {selectedEvent.clickX != null && (
                <Row label="Posição do clique" value={`${selectedEvent.clickX}% x ${selectedEvent.clickY}%`} />
              )}
              {selectedEvent.scrollY != null && (
                <Row label="Scroll da página" value={`${selectedEvent.scrollY}%`} />
              )}
              {selectedEvent.viewport && <Row label="Viewport" value={selectedEvent.viewport} />}
              {selectedEvent.screen && <Row label="Tela" value={selectedEvent.screen} />}
              {selectedEvent.mobile != null && <Row label="Mobile" value={selectedEvent.mobile ? "Sim" : "Não"} />}
              {selectedEvent.language && <Row label="Idioma" value={selectedEvent.language} />}
              {selectedEvent.userAgent && (
                <div className="pt-2 border-t border-white/10">
                  <span className="text-[#64748B]">User Agent</span>
                  <p className="text-[#94A3B8] mt-1 break-all text-[10px]">{selectedEvent.userAgent}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Recent views */}
      <h2 className="text-sm text-[#94A3B8] mb-3">Últimos acessos</h2>
      <div className="space-y-2 max-h-[50vh] overflow-y-auto">
        {views.slice(0, 50).map((v, i) => (
          <div key={i} className="bg-white/5 p-3 rounded-sm text-xs flex justify-between items-start gap-4">
            <div>
              <span className="text-[#10B981]">{v.path}</span>
              <span className="text-[#64748B] ml-2">{v.screen}</span>
              <span className="text-[#64748B] ml-2">{v.language}</span>
              {v.referrer && <span className="text-[#64748B] ml-2">← {v.referrer}</span>}
            </div>
            <span className="text-[#64748B] shrink-0">
              {new Date(v.timestamp).toLocaleString("pt-BR")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
