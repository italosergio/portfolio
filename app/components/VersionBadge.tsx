import { useState } from "react";
import GlitchText from "~/components/GlitchText";

export const APP_VERSION = "3.3.3";

const changelog = [
  { version: "3.3.3", date: "2026-04-06", desc: "Otimizacao de carregamento para redes lentas" },
  { version: "3.3.2", date: "2026-04-05", desc: "Scroll to top, analytics tabs, mobile event tracking" },
  { version: "3.3.1", date: "2026-04-05", desc: "Glitch effects, audio player, enriched analytics, konami mobile" },
  { version: "3.3.0", date: "2026-04-05", desc: "Pixel scrollbar, Firebase analytics, live cursors, secret code" },
  { version: "3.2.1", date: "2026-04-05", desc: "Responsive stack background para mobile" },
  { version: "3.2.0", date: "2026-04-05", desc: "Secao GitHub Profile, parallax backgrounds, floating icons" },
  { version: "3.1.2", date: "2026-04-01", desc: "Download portfolio PDF no footer" },
  { version: "3.1.1", date: "2026-04-01", desc: "Fix mobile menu z-index e tema claro" },
  { version: "3.1.0", date: "2026-04-01", desc: "Secao Trajetoria com timeline interativa e galeria de fotos" },
  { version: "3.0.2", date: "2026-04-01", desc: "Imagens de perfil, foco em dados/mapas/acessibilidade" },
  { version: "3.0.1", date: "2026-01-23", desc: "Implementacao completa do portfolio v3 com tema dual" },
];

export default function VersionBadge() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-[10px] text-[#6B7280] dark:text-[#94A3B8] font-normal pb-0.5 hover:text-[#10B981] dark:hover:text-[#10B981] transition-colors cursor-pointer"
      >
        <GlitchText>{`v${APP_VERSION}`}</GlitchText>
      </button>

      {open && (
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
        </div>
      )}
    </>
  );
}
