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
  viewport?: string;
  pixelRatio?: number;
  platform?: string;
  mobile?: boolean;
  timezone?: string;
  online?: boolean;
  cores?: number | null;
  memory?: number | null;
  connection?: { type: string; downlink: number } | null;
  touchPoints?: number;
  colorScheme?: string;
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


function ViewDetailModal({ view, onClose }: { view: PageView; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70" onClick={onClose}>
      <div className="bg-[#1E293B] border border-white/10 rounded-sm p-6 max-w-md w-full mx-4 font-mono text-xs max-h-[80vh] overflow-y-auto" onClick={(ev) => ev.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-[#10B981]">Detalhes do Visitante</h3>
          <button onClick={onClose} className="text-white/50 hover:text-white text-lg">×</button>
        </div>
        <div className="space-y-2">
          <Row label="Página" value={view.path} color="#06B6D4" />
          <Row label="Data" value={new Date(view.timestamp).toLocaleString("pt-BR")} />
          <Row label="Tela" value={view.screen} />
          {view.viewport && <Row label="Viewport" value={view.viewport} />}
          {view.pixelRatio != null && <Row label="Pixel Ratio" value={`${view.pixelRatio}x`} />}
          <Row label="Idioma" value={view.language} />
          {view.platform && <Row label="Plataforma" value={view.platform} />}
          {view.mobile != null && <Row label="Mobile" value={view.mobile ? "Sim" : "Não"} color={view.mobile ? "#F59E0B" : "#94A3B8"} />}
          {view.timezone && <Row label="Fuso horário" value={view.timezone} />}
          {view.online != null && <Row label="Online" value={view.online ? "Sim" : "Não"} color={view.online ? "#10B981" : "#EF4444"} />}
          {view.cores != null && <Row label="CPU Cores" value={`${view.cores}`} />}
          {view.memory != null && <Row label="Memória (GB)" value={`${view.memory}`} />}
          {view.connection && (
            <>
              <Row label="Tipo de conexão" value={view.connection.type} color="#F59E0B" />
              <Row label="Downlink (Mbps)" value={`${view.connection.downlink}`} />
            </>
          )}
          {view.touchPoints != null && <Row label="Touch Points" value={`${view.touchPoints}`} />}
          {view.colorScheme && <Row label="Tema preferido" value={view.colorScheme === "dark" ? "Escuro" : "Claro"} />}
          {view.referrer && <Row label="Referrer" value={view.referrer} />}
          <div className="pt-2 border-t border-white/10">
            <span className="text-[#64748B]">User Agent</span>
            <p className="text-[#94A3B8] mt-1 break-all text-[10px]">{view.userAgent}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsPanel({ onShowHeatmap }: { onShowHeatmap?: () => void }) {
  const [views, setViews] = useState<PageView[]>([]);
  const [events, setEvents] = useState<ClickEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<ClickEvent | null>(null);
  const [selectedView, setSelectedView] = useState<PageView | null>(null);
  const [eventsTab, setEventsTab] = useState<"recent" | "all">("recent");
  const [viewsTab, setViewsTab] = useState<"recent" | "all">("recent");

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

  const eventsByCategory: Record<string, number> = {};
  events.forEach(e => { eventsByCategory[e.category] = (eventsByCategory[e.category] || 0) + 1; });

  const [period, setPeriod] = useState<"day" | "7d" | "30d" | "90d" | "180d" | "365d">("day");

  const [chartMode, setChartMode] = useState<"views" | "clicks">("views");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [selectedBar, setSelectedBar] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
    const source = chartMode === "views" ? views : events;
    const filtered = source.filter(v => v.timestamp >= cutoff);
    const bucketSize = r.ms / r.buckets;
    const counts = Array(r.buckets).fill(0);
    const buckets: Array<typeof source> = Array.from({ length: r.buckets }, () => []);
    filtered.forEach(v => {
      const idx = Math.min(Math.floor((v.timestamp - cutoff) / bucketSize), r.buckets - 1);
      counts[idx]++;
      buckets[idx].push(v as any);
    });
    const max = Math.max(...counts, 1);

    const details = buckets.map((items) => {
      if (items.length === 0) return null;
      const mobile = items.filter((v: any) => v.mobile).length;
      const desktop = items.length - mobile;
      const langs: Record<string, number> = {};
      items.forEach((v: any) => { const l = v.language?.split("-")[0] || "?"; langs[l] = (langs[l] || 0) + 1; });
      const topLang = Object.entries(langs).sort((a, b) => b[1] - a[1])[0]?.[0] || "?";

      if (chartMode === "clicks") {
        const cats: Record<string, number> = {};
        (items as ClickEvent[]).forEach(e => { cats[e.category] = (cats[e.category] || 0) + 1; });
        const topCat = Object.entries(cats).sort((a, b) => b[1] - a[1])[0];
        return { mobile, desktop, topLang, topCat: topCat ? `${topCat[0]} (${topCat[1]})` : null };
      }
      const uniq = new Set(items.map((v: any) => `${v.userAgent}-${v.screen}`)).size;
      return { mobile, desktop, topLang, unique: uniq };
    });

    return { counts, max, labels: Array.from({ length: r.buckets }, (_, i) => r.label(i)), total: filtered.length, details, buckets };
  }, [views, events, period, chartMode]);

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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#10B981]">Analytics</h1>
        <button
          onClick={onShowHeatmap}
          className="px-3 py-1.5 text-xs bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 rounded-sm hover:bg-[#10B981]/30 transition-colors"
        >
          🔥 Mostrar cliques na tela
        </button>
      </div>

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
          <div className="flex items-center gap-3">
            <button
              onClick={() => setChartMode("views")}
              className={`text-sm transition-colors ${chartMode === "views" ? "text-[#10B981]" : "text-[#94A3B8] hover:text-white"}`}
            >
              Visitas
            </button>
            <button
              onClick={() => setChartMode("clicks")}
              className={`text-sm transition-colors ${chartMode === "clicks" ? "text-[#06B6D4]" : "text-[#94A3B8] hover:text-white"}`}
            >
              Cliques
            </button>
            <span className={`text-lg font-bold ml-2 ${chartMode === "views" ? "text-[#10B981]" : "text-[#06B6D4]"}`}>{chartData.total}</span>
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
        <div className="flex items-end gap-[2px] relative" style={{ height: 128 }}>
          {chartData.counts.map((count, i) => {
            return (
              <div
                key={i}
                className={`flex-1 flex flex-col items-center justify-end h-full relative ${count > 0 ? "cursor-pointer" : ""}`}
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)}
                onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
                onClick={() => { if (count > 0) setSelectedBar(i); }}
              >
                <span className="text-[8px] text-[#94A3B8] mb-1">{count || ""}</span>
                <div
                  className={`w-full ${chartMode === "views" ? "bg-[#10B981]" : "bg-[#06B6D4]"} transition-all duration-300 ${hoveredBar === i ? "brightness-150" : ""}`}
                  style={{ height: count ? Math.max((count / chartData.max) * 100, 2) : 1, opacity: count ? 1 : 0.15 }}
                />
                <span className="text-[7px] text-[#64748B] truncate w-full text-center mt-1">{chartData.labels[i]}</span>
              </div>
            );
          })}
        </div>
        {hoveredBar != null && chartData.details[hoveredBar] && (() => {
          const d = chartData.details[hoveredBar]!;
          const count = chartData.counts[hoveredBar];
          return (
            <div
              className="fixed pointer-events-none bg-[#0F172A] border border-white/10 rounded-sm px-3 py-2 text-[10px] text-[#94A3B8] whitespace-nowrap z-[10000] space-y-0.5"
              style={{ left: mousePos.x + 12, top: mousePos.y - 8 }}
            >
              <div className={chartMode === "views" ? "text-[#10B981]" : "text-[#06B6D4]"}>{count} {chartMode === "views" ? "visitas" : "cliques"}</div>
              <div>Desktop: {d.desktop} / Mobile: {d.mobile}</div>
              <div>Idioma principal: {d.topLang}</div>
              {chartMode === "views" && "unique" in d && <div>Unicos: {d.unique}</div>}
              {chartMode === "clicks" && "topCat" in d && d.topCat && <div>Top: {d.topCat}</div>}
            </div>
          );
        })()}
      </div>

      {/* Bar detail modal */}
      {selectedBar != null && chartData.buckets[selectedBar]?.length > 0 && (() => {
        const items = chartData.buckets[selectedBar];
        const d = chartData.details[selectedBar]!;
        const label = chartData.labels[selectedBar];
        const mobileCount = d.mobile;
        const desktopCount = d.desktop;
        const browsers: Record<string, number> = {};
        const languages: Record<string, number> = {};
        items.forEach((v: any) => {
          const ua = v.userAgent || "";
          const b = /Edg/i.test(ua) ? "Edge" : /Chrome/i.test(ua) ? "Chrome" : /Firefox/i.test(ua) ? "Firefox" : /Safari/i.test(ua) ? "Safari" : "Outro";
          browsers[b] = (browsers[b] || 0) + 1;
          const l = v.language?.split("-")[0] || "?";
          languages[l] = (languages[l] || 0) + 1;
        });
        const screens: Record<string, number> = {};
        items.forEach((v: any) => { if (v.screen) screens[v.screen] = (screens[v.screen] || 0) + 1; });

        return (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70" onClick={() => setSelectedBar(null)}>
            <div className="bg-[#1E293B] border border-white/10 rounded-sm p-6 max-w-lg w-full mx-4 font-mono text-xs max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-[#10B981]">{label} — {items.length} {chartMode === "views" ? "visitas" : "cliques"}</h3>
                <button onClick={() => setSelectedBar(null)} className="text-white/50 hover:text-white text-lg">x</button>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 p-3 rounded-sm">
                    <div className="text-lg font-bold text-[#06B6D4]">{desktopCount}</div>
                    <div className="text-[#94A3B8]">Desktop</div>
                  </div>
                  <div className="bg-white/5 p-3 rounded-sm">
                    <div className="text-lg font-bold text-[#F59E0B]">{mobileCount}</div>
                    <div className="text-[#94A3B8]">Mobile</div>
                  </div>
                </div>
                <div>
                  <div className="text-[#64748B] mb-1">Navegadores</div>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(browsers).sort((a, b) => b[1] - a[1]).map(([b, c]) => (
                      <span key={b} className="bg-white/5 px-2 py-1 rounded-sm">{b}: {c}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[#64748B] mb-1">Idiomas</div>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(languages).sort((a, b) => b[1] - a[1]).map(([l, c]) => (
                      <span key={l} className="bg-white/5 px-2 py-1 rounded-sm">{l}: {c}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[#64748B] mb-1">Telas</div>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(screens).sort((a, b) => b[1] - a[1]).map(([s, c]) => (
                      <span key={s} className="bg-white/5 px-2 py-1 rounded-sm">{s}: {c}</span>
                    ))}
                  </div>
                </div>
                {chartMode === "clicks" && (
                  <div>
                    <div className="text-[#64748B] mb-1">Categorias</div>
                    <div className="flex flex-wrap gap-2">
                      {(() => {
                        const cats: Record<string, number> = {};
                        (items as ClickEvent[]).forEach(e => { cats[e.category] = (cats[e.category] || 0) + 1; });
                        return Object.entries(cats).sort((a, b) => b[1] - a[1]).map(([c, n]) => (
                          <span key={c} className="bg-white/5 px-2 py-1 rounded-sm"><span className="text-[#F59E0B]">{c}</span>: {n}</span>
                        ));
                      })()}
                    </div>
                  </div>
                )}
                <div>
                  <div className="text-[#64748B] mb-1">Itens ({items.length})</div>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {items.slice(0, 50).map((v: any, j: number) => (
                      <div key={j} className="bg-white/5 px-2 py-1 rounded-sm flex justify-between">
                        <span>{chartMode === "clicks" ? `${v.category} · ${v.action}` : v.path} {v.mobile ? "mobile" : "desktop"}</span>
                        <span className="text-[#64748B]">{new Date(v.timestamp).toLocaleTimeString("pt-BR")}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

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

      {/* Events */}
      <div className="flex items-center gap-3 mb-3">
        <button onClick={() => setEventsTab("recent")} className={`text-sm ${eventsTab === "recent" ? "text-[#10B981]" : "text-[#94A3B8] hover:text-white"}`}>Últimos eventos</button>
        <button onClick={() => setEventsTab("all")} className={`text-sm ${eventsTab === "all" ? "text-[#10B981]" : "text-[#94A3B8] hover:text-white"}`}>Todos os eventos ({events.length})</button>
      </div>
      <div className="space-y-2 max-h-[30vh] overflow-y-auto mb-8">
        {(eventsTab === "recent" ? events.slice(0, 30) : events).map((e, i) => (
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

      {/* Views */}
      <div className="flex items-center gap-3 mb-3">
        <button onClick={() => setViewsTab("recent")} className={`text-sm ${viewsTab === "recent" ? "text-[#10B981]" : "text-[#94A3B8] hover:text-white"}`}>Últimos acessos</button>
        <button onClick={() => setViewsTab("all")} className={`text-sm ${viewsTab === "all" ? "text-[#10B981]" : "text-[#94A3B8] hover:text-white"}`}>Todos os acessos ({views.length})</button>
      </div>
      <div className="space-y-2 max-h-[50vh] overflow-y-auto">
        {(viewsTab === "recent" ? views.slice(0, 50) : views).map((v, i) => (
          <div
            key={i}
            onClick={() => setSelectedView(v)}
            className="bg-white/5 p-3 rounded-sm text-xs flex justify-between items-start gap-4 cursor-pointer hover:bg-white/10 transition-colors"
          >
            <div>
              <span className="text-[#10B981]">{v.path}</span>
              <span className="text-[#64748B] ml-2">{v.screen}</span>
              <span className="text-[#64748B] ml-2">{v.language}</span>
              {v.mobile != null && <span className="ml-2">{v.mobile ? "📱" : "🖥️"}</span>}
              {v.referrer && <span className="text-[#64748B] ml-2">← {v.referrer}</span>}
            </div>
            <span className="text-[#64748B] shrink-0">
              {new Date(v.timestamp).toLocaleString("pt-BR")}
            </span>
          </div>
        ))}
      </div>

      {/* View detail modal */}
      {selectedView && <ViewDetailModal view={selectedView} onClose={() => setSelectedView(null)} />}
    </div>
  );
}
