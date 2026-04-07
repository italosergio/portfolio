import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export const APP_VERSION = "3.14.0";

const changelog = [
  // 3.14.x — CDRV e correcoes de versionamento
  { version: "3.14.0", date: "2026-04-06", desc: "Processo CDRV documentado, regras de versionamento e modal scroll lock" },
  // 3.13.x — Fix modal VersionBadge
  { version: "3.13.1", date: "2026-04-06", desc: "Reposicionar VersionBadge dentro da logo no Header e Footer" },
  { version: "3.13.0", date: "2026-04-06", desc: "Fix modal flickering com createPortal e scroll lock ao abrir modal" },
  // 3.12.x — Heatmap e integracao
  { version: "3.12.1", date: "2026-04-06", desc: "Atalho de teclado '1' para heatmap, tap oculto no mobile, Esc fecha painel" },
  { version: "3.12.0", date: "2026-04-06", desc: "ClickHeatmap overlay com filtros por periodo e tooltip de eventos" },
  // 3.11.x — AnalyticsPanel interativo
  { version: "3.11.2", date: "2026-04-06", desc: "Modal de detalhe ao clicar em barra do grafico (browsers, idiomas, telas)" },
  { version: "3.11.1", date: "2026-04-06", desc: "Tooltip hover nas barras do grafico com split mobile/desktop" },
  { version: "3.11.0", date: "2026-04-06", desc: "Toggle views/clicks no grafico do AnalyticsPanel" },
  // 3.10.x — Dev mode e VersionBadge
  { version: "3.10.1", date: "2026-04-06", desc: "Secret code 'it4l0' para ativar dev mode e desativar tracking" },
  { version: "3.10.0", date: "2026-04-06", desc: "VersionBadge com changelog modal e historico de versoes" },
  // 3.9.x — Renomear projeto
  { version: "3.9.0", date: "2026-04-06", desc: "Renomear projeto para portfolio-italo" },
  // 3.8.x — Performance
  { version: "3.8.0", date: "2026-04-06", desc: "Otimizacao de carregamento para redes lentas" },
  // 3.7.x — Scroll to top e analytics tabs
  { version: "3.7.2", date: "2026-04-05", desc: "Fix mobile event tracking" },
  { version: "3.7.1", date: "2026-04-05", desc: "Tabs recent/all no painel de analytics" },
  { version: "3.7.0", date: "2026-04-05", desc: "Botao scroll to top" },
  // 3.6.x — Glitch, audio, konami
  { version: "3.6.4", date: "2026-04-05", desc: "Melhorias gerais de UI e typing text" },
  { version: "3.6.3", date: "2026-04-05", desc: "Suporte Konami code no mobile" },
  { version: "3.6.2", date: "2026-04-05", desc: "Analytics enriquecido com dados de dispositivo" },
  { version: "3.6.1", date: "2026-04-05", desc: "Audio player integrado" },
  { version: "3.6.0", date: "2026-04-05", desc: "Efeitos glitch na logo e imagens" },
  // 3.5.x — Firebase, secret code, live cursors
  { version: "3.5.3", date: "2026-04-05", desc: "Event tracking de cliques com coordenadas" },
  { version: "3.5.2", date: "2026-04-05", desc: "Live cursors em tempo real" },
  { version: "3.5.1", date: "2026-04-05", desc: "Secret code para abrir painel de analytics" },
  { version: "3.5.0", date: "2026-04-05", desc: "Firebase analytics com tracking de pageviews" },
  // 3.4.x — Pixel scrollbar, floating icons, contact redesign
  { version: "3.4.2", date: "2026-04-05", desc: "Font smoothing e redesign dos cards de contato" },
  { version: "3.4.1", date: "2026-04-05", desc: "Floating icons na timeline da trajetoria" },
  { version: "3.4.0", date: "2026-04-05", desc: "Pixel scrollbar com trail effect" },
  // 3.3.x — Responsive stack background
  { version: "3.3.1", date: "2026-04-05", desc: "Fix referencia da imagem parallax mobile" },
  { version: "3.3.0", date: "2026-04-05", desc: "Stack background responsivo para mobile" },
  // 3.2.x — GitHub profile, parallax, floating icons
  { version: "3.2.4", date: "2026-04-05", desc: "Melhorias no footer logo e skills" },
  { version: "3.2.3", date: "2026-04-05", desc: "Cards de contato melhorados" },
  { version: "3.2.2", date: "2026-04-05", desc: "Floating icons e parallax backgrounds" },
  { version: "3.2.1", date: "2026-04-05", desc: "Stack background image e skills Leaflet/Mapbox" },
  { version: "3.2.0", date: "2026-04-05", desc: "Secao GitHub Profile" },
  // 3.1.x — Trajetoria, fixes, PDF
  { version: "3.1.2", date: "2026-04-01", desc: "Download portfolio PDF no footer com jsPDF" },
  { version: "3.1.1", date: "2026-04-01", desc: "Fix mobile menu z-index e tema claro" },
  { version: "3.1.0", date: "2026-04-01", desc: "Secao Trajetoria com timeline interativa e galeria de fotos" },
  // 3.0.x — Base v3
  { version: "3.0.3", date: "2026-04-01", desc: "Foco em dados, mapas e acessibilidade" },
  { version: "3.0.2", date: "2026-04-01", desc: "Imagens de perfil e projetos" },
  { version: "3.0.1", date: "2026-01-23", desc: "Implementacao completa do portfolio v3 com tema dual e animacoes" },
  { version: "3.0.0", date: "2026-01-23", desc: "Redesign total — migracao para React Router v7 + TailwindCSS" },
];

export default function VersionBadge() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-[10px] text-[#6B7280] dark:text-[#94A3B8] font-normal pb-0.5 hover:text-[#10B981] dark:hover:text-[#10B981] transition-colors cursor-pointer"
      >
        v{APP_VERSION}
      </button>

      {open && createPortal(
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70" onClick={() => setOpen(false)}>
          <div className="bg-[#1E293B] border border-white/10 rounded-sm p-6 max-w-md w-full mx-4 font-mono text-xs max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-[#10B981]">Historico de Versoes</h3>
              <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white text-lg">x</button>
            </div>
            <div className="space-y-3">
              {changelog.map((entry, i) => (
                <div key={entry.version} className={`flex gap-3 ${i === 0 ? "text-[#10B981]" : "text-[#94A3B8]"}`}>
                  <span className="shrink-0 font-bold w-14">v{entry.version}</span>
                  <span className="shrink-0 text-[#64748B] w-20">{entry.date}</span>
                  <span>{entry.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
