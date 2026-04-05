import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { rtdb } from "~/lib/firebase";

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
}

export default function AnalyticsPanel() {
  const [views, setViews] = useState<PageView[]>([]);
  const [events, setEvents] = useState<ClickEvent[]>([]);

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
          <div key={i} className="bg-white/5 p-3 rounded-sm text-xs flex justify-between items-start gap-4">
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
