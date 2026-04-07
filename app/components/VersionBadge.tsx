import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export const APP_VERSION = "3.16.4";

const REPO = "https://github.com/italosergio/portfolio_v2";

type Entry = { version: string; date: string; desc: string; commit?: string; egg?: string };

const changelog: Entry[] = [
  { version: "3.16.4", date: "2026-04-07", desc: "Cursor do dev aparece laranja neon para outros visitantes", commit: "6f822d6" },
  { version: "3.16.3", date: "2026-04-07", desc: "Label com nome seguindo o cursor do mouse no dev mode", commit: "53c6c64" },
  { version: "3.16.2", date: "2026-04-07", desc: "Cursor proprio laranja neon no dev mode", commit: "a9d3094" },
  { version: "3.16.1", date: "2026-04-07", desc: "Nome do dev no cursor ao ativar dev mode (it4l0)", commit: "88c69ac" },
  { version: "3.16.0", date: "2026-04-06", desc: "Easter eggs no console, efeito cortina no MatrixRain e modal de eggs no changelog", commit: "b27aa7d" },
  { version: "3.15.4", date: "2026-04-06", desc: "Dicas de easter eggs no hover do olho no footer", commit: "53f5ace" },
  { version: "3.15.3", date: "2026-04-06", desc: "Efeito glitch no icone de olho do footer", commit: "d34933e" },
  { version: "3.15.2", date: "2026-04-06", desc: "Icone de olho flutuante com fade in/out no footer", commit: "5819f50" },
  { version: "3.15.1", date: "2026-04-06", desc: "Texto secreto 'explore' abaixo do copyright no footer", commit: "08f6fb2" },
  { version: "3.15.0", date: "2026-04-06", desc: "Keyframe glitchIcon para animacao de icones", commit: "27bf97c" },
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
  { version: "3.4.20", date: "2026-04-05", desc: "Sequencia secreta de direcoes", egg: "↑↑↓↓←→←→ — O lendario Konami Code. Digite essa sequencia no teclado (ou faca os swipes no mobile) para ativar o Bike Mode: chuva de caracteres Matrix cobre a tela enquanto bicicletas cruzam em todas as direcoes. Quando a cortina digital se dissolve, o painel secreto de Analytics e revelado por tras." },
  { version: "3.4.2", date: "2026-04-05", desc: "Font smoothing e redesign dos cards de contato", commit: "d30f0d4" },
  { version: "3.4.1", date: "2026-04-05", desc: "Floating icons na timeline da trajetoria", commit: "d30f0d4" },
  { version: "3.4.0", date: "2026-04-05", desc: "Pixel scrollbar com trail effect", commit: "d30f0d4" },
  { version: "3.3.3", date: "2026-04-05", desc: "Cursor fantasma multiplayer", egg: "Cursores de outros visitantes aparecem em tempo real na tela. Cada cursor tem uma cor unica e se move suavemente. Voce nunca esta sozinho neste portfolio — outros olhos estao explorando ao mesmo tempo." },
  { version: "3.3.1", date: "2026-04-05", desc: "Fix referencia da imagem parallax mobile", commit: "6c185b9" },
  { version: "3.3.0", date: "2026-04-05", desc: "Stack background responsivo para mobile", commit: "def37d6" },
  { version: "3.2.7", date: "2026-04-05", desc: "Modo invisivel do desenvolvedor", egg: "Digite 'it4l0' (com o numero 4 no lugar do a e 0 no lugar do o) em qualquer lugar da pagina. O tracking de analytics e desativado e um badge 'dev mode' aparece no canto. Digite novamente para reativar. Passe o mouse em 'italo' no header ou footer para ver a dica." },
  { version: "3.2.4", date: "2026-04-05", desc: "Melhorias no footer logo e skills", commit: "93b6a9b" },
  { version: "3.2.3", date: "2026-04-05", desc: "Cards de contato melhorados", commit: "93b6a9b" },
  { version: "3.2.2", date: "2026-04-05", desc: "Floating icons e parallax backgrounds", commit: "93b6a9b" },
  { version: "3.2.1", date: "2026-04-05", desc: "Stack background image e skills Leaflet/Mapbox", commit: "8f0eafb" },
  { version: "3.2.0", date: "2026-04-05", desc: "Secao GitHub Profile", commit: "8f0eafb" },
  { version: "3.1.5", date: "2026-04-01", desc: "Mapa de calor oculto", egg: "Pressione a tecla '1' no teclado (ou toque na letra 'c' de 'Tecnologia' no mobile) para revelar um heatmap de todos os cliques dos visitantes. Pontos verdes brilhantes mostram onde cada pessoa clicou, com tooltip detalhado ao passar o mouse." },
  { version: "3.1.2", date: "2026-04-01", desc: "Download portfolio PDF no footer com jsPDF", commit: "5b8e902" },
  { version: "3.1.1", date: "2026-04-01", desc: "Fix mobile menu z-index e tema claro", commit: "272dac2" },
  { version: "3.1.0", date: "2026-04-01", desc: "Secao Trajetoria com timeline interativa e galeria de fotos", commit: "dfea762" },
  { version: "3.0.5", date: "2026-04-01", desc: "Painel de controle secreto", egg: "Existe um codigo secreto de direcoes (diferente do Konami) que abre e fecha um painel completo de Analytics. Visualize pageviews, eventos, graficos por periodo, dispositivos e muito mais. O acesso e exclusivo para quem conhece a sequencia." },
  { version: "3.0.4", date: "2026-04-01", desc: "O olho que tudo ve", egg: "Um icone de olho aparece e desaparece aleatoriamente no footer. Passe o mouse para receber dicas cripticas sobre os easter eggs escondidos. No mobile, toque nele para ver a mensagem. Ele sabe mais do que parece." },
  { version: "3.0.3", date: "2026-04-01", desc: "Foco em dados, mapas e acessibilidade", commit: "51d4e1a" },
  { version: "3.0.2", date: "2026-04-01", desc: "Imagens de perfil e projetos", commit: "d19ecc7" },
  { version: "3.0.1", date: "2026-01-23", desc: "Implementacao completa do portfolio v3 com tema dual e animacoes", commit: "df4408b" },
  { version: "3.0.0", date: "2026-01-23", desc: "Redesign total — migracao para React Router v7 + TailwindCSS", commit: "69e00e7" },
];

export default function VersionBadge() {
  const [open, setOpen] = useState(false);
  const [eggModal, setEggModal] = useState<Entry | null>(null);
  const [eggPhase, setEggPhase] = useState<"enter" | "visible" | "leave">("enter");
  const [eggData, setEggData] = useState<Entry | null>(null);

  const openEgg = (entry: Entry) => {
    setEggData(entry);
    setEggPhase("enter");
    setEggModal(entry);
    setTimeout(() => setEggPhase("visible"), 600);
  };

  const closeEgg = () => {
    setEggPhase("leave");
    setTimeout(() => { setEggModal(null); setEggData(null); }, 600);
  };

  useEffect(() => {
    document.body.style.overflow = open || eggModal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open, eggModal]);

  useEffect(() => {
    if (!eggModal || eggPhase !== "visible") return;
    const t = setTimeout(closeEgg, 15000);
    return () => clearTimeout(t);
  }, [eggModal, eggPhase]);

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
              {changelog.map((entry, i) => entry.egg ? (
                <button
                  key={entry.version}
                  onClick={() => openEgg(entry)}
                  className={`flex gap-3 hover:bg-white/5 rounded-sm px-1 -mx-1 py-0.5 transition-colors text-left w-full text-[#94A3B8]`}
                >
                  <span className="shrink-0 font-bold w-14">v{entry.version}</span>
                  <span className="shrink-0 text-[#64748B] w-20">{entry.date}</span>
                  <span className="hover:underline">{entry.desc}</span>
                </button>
              ) : (
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

      {eggModal && createPortal(
        <div
          className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/80"
          onClick={closeEgg}
        >
          <div
            className="relative bg-[#0F172A] border border-[#10B981]/30 rounded-sm p-6 max-w-sm w-full mx-4 font-mono text-sm text-[#10B981] text-center space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-lg font-bold">v{eggModal.version}</div>
            <span className="inline-block px-3 py-1 bg-[#06B6D4]/10 border border-[#06B6D4]/30 rounded-sm text-[10px] text-[#06B6D4] pointer-events-none select-none">{"<voce achou um Egg/>"}</span>
            <div className="text-[#94A3B8] text-xs leading-relaxed">{eggModal.egg}</div>
            <div className="text-[8px] text-[#64748B] animate-pulse">desaparece em 15s</div>
            {eggPhase !== "visible" && (
              <>
                <div className="absolute inset-0 text-[#10B981]" style={{ animation: "glitchColor1 200ms steps(2) infinite" }} />
                <div className="absolute inset-0 text-[#06B6D4]" style={{ animation: "glitchColor2 200ms steps(2) infinite" }} />
                <div className="absolute inset-0" style={{ animation: "glitch 100ms steps(2) infinite" }} />
              </>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
