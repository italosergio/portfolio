import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export const APP_VERSION = "3.14.2";

const REPO = "https://github.com/italosergio/portfolio_v2";

const changelog = [
  { version: "3.14.2", date: "2026-04-06", desc: "Processo CDGV documentado como estrategia padrao de commit", commit: "f24041f" },
  { version: "3.14.1", date: "2026-04-06", desc: "Links para commits do GitHub no modal de versoes", commit: "c5cbe2a" },
  { version: "3.14.0", date: "2026-04-06", desc: "Processo CDRV documentado, regras de versionamento e modal scroll lock", commit: "becc071" },
  { version: "3.13.1", date: "2026-04-06", desc: "Reposicionar VersionBadge dentro da logo no Header e Footer", commit: "88c7757" },
  { version: "3.13.0", date: "2026-04-06", desc: "Fix modal flickering com createPortal e scroll lock ao abrir modal", commit: "8952b9f" },
  { version: "3.12.1", date: "2026-04-06", desc: "Atalho de teclado '1' para heatmap, tap oculto no mobile, Esc fecha painel", commit: "bd7051e" },
  { version: "3.12.0", date: "2026-04-06", desc: "ClickHeatmap overlay com filtros por periodo e tooltip de eventos", commit: "2c1f399" },
  { version: "3.11.2", date: "2026-04-06", desc: "Modal de detalhe ao clicar em barra do grafico (browsers, idiomas, telas)", commit: "bbd93af" },
  { version: "3.11.1", date: "2026-04-06", desc: "Tooltip hover nas barras do grafico com split mobile/desktop", commit: "bbd93af" },
  { version: "3.11.0", date: "2026-04-06", desc: "Toggle views/clicks no grafico do AnalyticsPanel", commit: "bbd93af" },
  { version: "3.10.1", date: "2026-04-06", desc: "Secret code 'it4l0' para ativar dev mode e desativar tracking", commit: "168ad52" },
  { version: "3.10.0", date: "2026-04-06", desc: "VersionBadge com changelog modal e historico de versoes", commit: "6ca2040" },
  { version: "3.9.0", date: "2026-04-06", desc: "Renomear projeto para portfolio-italo", commit: "add4dc3" },
  { version: "3.8.0", date: "2026-04-06", desc: "Otimizacao de carregamento para redes lentas", commit: "df80fb7" },
  { version: "3.7.2", date: "2026-04-05", desc: "Fix mobile event tracking", commit: "06d2a1d" },
  { version: "3.7.1", date: "2026-04-05", desc: "Tabs recent/all no painel de analytics", commit: "06d2a1d" },
  { version: "3.7.0", date: "2026-04-05", desc: "Botao scroll to top", commit: "06d2a1d" },
  { version: "3.6.4", date: "2026-04-05", desc: "Melhorias gerais de UI e typing text", commit: "071a3d5" },
  { version: "3.6.3", date: "2026-04-05", desc: "Suporte Konami code no mobile", commit: "071a3d5" },
  { version: "3.6.2", date: "2026-04-05", desc: "Analytics enriquecido com dados de dispositivo", commit: "071a3d5" },
  { version: "3.6.1", date: "2026-04-05", desc: "Audio player integrado", commit: "071a3d5" },
  { version: "3.6.0", date: "2026-04-05", desc: "Efeitos glitch na logo e imagens", commit: "071a3d5" },
  { version: "3.5.3", date: "2026-04-05", desc: "Event tracking de cliques com coordenadas", commit: "d3d3a9a" },
  { version: "3.5.2", date: "2026-04-05", desc: "Live cursors em tempo real", commit: "d3d3a9a" },
  { version: "3.5.1", date: "2026-04-05", desc: "Secret code para abrir painel de analytics", commit: "d3d3a9a" },
  { version: "3.5.0", date: "2026-04-05", desc: "Firebase analytics com tracking de pageviews", commit: "d3d3a9a" },
  { version: "3.4.2", date: "2026-04-05", desc: "Font smoothing e redesign dos cards de contato", commit: "d30f0d4" },
  { version: "3.4.1", date: "2026-04-05", desc: "Floating icons na timeline da trajetoria", commit: "d30f0d4" },
  { version: "3.4.0", date: "2026-04-05", desc: "Pixel scrollbar com trail effect", commit: "d30f0d4" },
  { version: "3.3.1", date: "2026-04-05", desc: "Fix referencia da imagem parallax mobile", commit: "6c185b9" },
  { version: "3.3.0", date: "2026-04-05", desc: "Stack background responsivo para mobile", commit: "def37d6" },
  { version: "3.2.4", date: "2026-04-05", desc: "Melhorias no footer logo e skills", commit: "93b6a9b" },
  { version: "3.2.3", date: "2026-04-05", desc: "Cards de contato melhorados", commit: "93b6a9b" },
  { version: "3.2.2", date: "2026-04-05", desc: "Floating icons e parallax backgrounds", commit: "93b6a9b" },
  { version: "3.2.1", date: "2026-04-05", desc: "Stack background image e skills Leaflet/Mapbox", commit: "8f0eafb" },
  { version: "3.2.0", date: "2026-04-05", desc: "Secao GitHub Profile", commit: "8f0eafb" },
  { version: "3.1.2", date: "2026-04-01", desc: "Download portfolio PDF no footer com jsPDF", commit: "5b8e902" },
  { version: "3.1.1", date: "2026-04-01", desc: "Fix mobile menu z-index e tema claro", commit: "272dac2" },
  { version: "3.1.0", date: "2026-04-01", desc: "Secao Trajetoria com timeline interativa e galeria de fotos", commit: "dfea762" },
  { version: "3.0.3", date: "2026-04-01", desc: "Foco em dados, mapas e acessibilidade", commit: "51d4e1a" },
  { version: "3.0.2", date: "2026-04-01", desc: "Imagens de perfil e projetos", commit: "d19ecc7" },
  { version: "3.0.1", date: "2026-01-23", desc: "Implementacao completa do portfolio v3 com tema dual e animacoes", commit: "df4408b" },
  { version: "3.0.0", date: "2026-01-23", desc: "Redesign total — migracao para React Router v7 + TailwindCSS", commit: "69e00e7" },
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
              <h3 className="text-sm font-bold text-[#10B981]">Versoes</h3>
              <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white text-lg">x</button>
            </div>
            <div className="space-y-3">
              {changelog.map((entry, i) => (
                <a
                  key={entry.version}
                  href={`${REPO}/commit/${entry.commit}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex gap-3 hover:bg-white/5 rounded-sm px-1 -mx-1 py-0.5 transition-colors ${i === 0 ? "text-[#10B981]" : "text-[#94A3B8]"}`}
                >
                  <span className="shrink-0 font-bold w-14">v{entry.version}</span>
                  <span className="shrink-0 text-[#64748B] w-20">{entry.date}</span>
                  <span className="hover:underline">{entry.desc}</span>
                </a>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
