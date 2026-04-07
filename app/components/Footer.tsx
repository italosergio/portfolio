import { Github, Linkedin, Mail, Download, Eye, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "~/lib/LanguageContext";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import GlitchText from "~/components/GlitchText";

const KonamiArrows = () => (
  <span className="inline-flex items-center gap-px">
    {[ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight].map((I,i) => <I key={i} className="w-2.5 h-2.5" strokeWidth={3} />)}
  </span>
);
import VersionBadge from "~/components/VersionBadge";
import type { Locale } from "~/lib/i18n";

// Pixel dragon egg — 8x10 grid, 3px per pixel
const EGG_PIXELS = [
  "..1221..",
  ".122221.",
  "12313221",
  "23131312",
  "23113132",
  "23131312",
  "12313221",
  ".123221.",
  "..1221..",
  "...11...",
];
const EGG_COLORS: Record<string, string> = { "1": "#10B981", "2": "#059669", "3": "#06B6D4" };

function DragonEgg() {
  return (
    <div className="w-8 h-8 flex items-center justify-center">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 3px)", gap: 0 }}>
        {EGG_PIXELS.flatMap((row, y) =>
          row.split("").map((c, x) => (
            <div key={`${y}-${x}`} style={{ width: 3, height: 3, background: EGG_COLORS[c] || "transparent" }} />
          ))
        )}
      </div>
    </div>
  );
}

const downloadLabel: Record<Locale, string> = {
  pt: "Baixar Portfólio PDF",
  en: "Download Portfolio PDF",
  es: "Descargar Portafolio PDF",
};

function DownloadButton({ locale }: { locale: Locale }) {
  const handleDownload = async () => {
    const { generatePortfolioPdf } = await import("~/lib/generatePortfolioPdf");
    generatePortfolioPdf(locale);
  };

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#0891B2] to-[#10B981] hover:brightness-110 text-white rounded-sm transition-all text-xs font-medium"
      aria-label={downloadLabel[locale]}
    >
      <Download className="w-4 h-4" aria-hidden="true" />
      {downloadLabel[locale]}
    </button>
  );
}

export default function Footer() {
  const { locale, t } = useLanguage();
  const [eyeVisible, setEyeVisible] = useState(false);
  const [eyePos, setEyePos] = useState({ left: "50%", top: "50%" });
  const [showEgg, setShowEgg] = useState(false);

  useEffect(() => {
    const positions = [
      { left: "92%", top: "15%" },
      { left: "5%", top: "70%" },
      { left: "92%", top: "70%" },
      { left: "45%", top: "85%" },
      { left: "75%", top: "40%" },
      { left: "5%", top: "30%" },
    ];
    let flip = false;
    const loop = () => {
      setEyePos(positions[Math.floor(Math.random() * positions.length)]);
      setShowEgg(flip);
      flip = !flip;
      setEyeVisible(true);
      setTimeout(() => setEyeVisible(false), 3000);
    };
    const id = setInterval(loop, 8000);
    setTimeout(loop, 2000);
    return () => clearInterval(id);
  }, []);

  const [eyeGlitch, setEyeGlitch] = useState(false);
  const [hint, setHint] = useState(() => "este olho ve mais do que voce imagina");
  const [mobileHint, setMobileHint] = useState("");
  const [mobileHintFading, setMobileHintFading] = useState(false);
  const hints = [
    "os classicos nunca morrem... ↑↑↓↓",
    "algumas direcoes levam a lugares ocultos",
    "digite o nome do criador... do seu jeito",
    "o numero 1 revela o invisivel",
    "nem todo toque e acidental",
    "a versao conta mais do que parece",
    "este olho ve mais do que voce imagina",
    "voce nao esta sozinho aqui",
    "se algo se mover... nao foi o vento",
  ];
  const pickHint = () => hints[Math.floor(Math.random() * hints.length)];
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const trigger = () => {
      setEyeGlitch(true);
      setTimeout(() => setEyeGlitch(false), 200);
      timeout = setTimeout(trigger, [1000, 2000, 3000][Math.floor(Math.random() * 3)]);
    };
    timeout = setTimeout(trigger, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <footer role="contentinfo" className="relative bg-[#1F2937] dark:bg-[#0F172A] text-white py-12 px-4 overflow-hidden">
      {mobileHint && createPortal(
        <div
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10000] pointer-events-none"
        >
          <div className="relative px-6 py-4 bg-[#0F172A] border border-[#10B981]/30 rounded-sm font-mono text-sm text-[#10B981] text-center">
            {mobileHint}
            <div className="absolute inset-0 flex items-center justify-center px-6 py-4 text-[#10B981]" style={{ animation: "glitchColor1 200ms steps(2) forwards" }}>{mobileHint}</div>
            <div className="absolute inset-0 flex items-center justify-center px-6 py-4 text-[#06B6D4]" style={{ animation: "glitchColor2 200ms steps(2) forwards" }}>{mobileHint}</div>
            {mobileHintFading && (
              <>
                <div className="absolute inset-0 flex items-center justify-center px-6 py-4 text-[#10B981]" style={{ animation: "glitchColor1 200ms steps(2) forwards" }}>{mobileHint}</div>
                <div className="absolute inset-0 flex items-center justify-center px-6 py-4 text-[#06B6D4]" style={{ animation: "glitchColor2 200ms steps(2) forwards" }}>{mobileHint}</div>
              </>
            )}
          </div>
        </div>,
        document.body
      )}
      <div
        className="absolute pointer-events-auto transition-opacity duration-1000 group cursor-default z-20"
        style={{ left: eyePos.left, top: eyePos.top, opacity: eyeVisible ? 1 : 0 }}
        aria-hidden="true"
        onMouseEnter={() => setHint(pickHint())}
        onClick={() => {
          if (mobileHint) return;
          const h = pickHint();
          setMobileHint(h);
          setMobileHintFading(false);
          setTimeout(() => setMobileHintFading(true), 4000);
          setTimeout(() => { setMobileHint(""); setMobileHintFading(false); }, 5000);
        }}
      >
        <Eye className={`w-8 h-8 text-[#10B981]/30 ${showEgg ? "hidden" : ""}`} />
        {showEgg && <DragonEgg />}
        {eyeGlitch && !showEgg && (
          <>
            <Eye className="absolute inset-0 w-8 h-8 text-[#10B981]" style={{ animation: "glitchColor1 200ms steps(2) forwards" }} />
            <Eye className="absolute inset-0 w-8 h-8 text-[#06B6D4]" style={{ animation: "glitchColor2 200ms steps(2) forwards" }} />
          </>
        )}
        {eyeGlitch && showEgg && (
          <>
            <div className="absolute inset-0 text-[#10B981]" style={{ animation: "glitchColor1 200ms steps(2) forwards" }}><DragonEgg /></div>
            <div className="absolute inset-0 text-[#06B6D4]" style={{ animation: "glitchColor2 200ms steps(2) forwards" }}><DragonEgg /></div>
          </>
        )}
        <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 bg-[#0F172A]/90 border border-[#10B981]/20 rounded-sm text-[10px] text-[#10B981] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          {hint}
        </span>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo e Mensagem */}
          <div>
            <span className="text-2xl font-bold text-[#10B981] hover:scale-105 transition-transform inline-flex items-end gap-1 mb-4 cursor-default">
              <GlitchText hoverText="it4l0">ítalo</GlitchText><span className="text-[#06B6D4]"><GlitchText hoverText={<KonamiArrows />}>{"<dev/>"}</GlitchText></span>
              <span className="relative"><VersionBadge /></span>
            </span>
            <p className="text-[#94A3B8] text-sm mb-4">
              {t.footer.built} 💚 {t.footer.and} {t.footer.purpose}
            </p>
            <DownloadButton locale={locale} />
          </div>

          {/* Navegação */}
          <div>
            <h3 className="font-bold mb-4">Navegação</h3>
            <nav aria-label="Navegação do rodapé" className="flex flex-col gap-2">
              <a href="#sobre" className="text-[#94A3B8] hover:text-[#10B981] transition-colors">
                {t.nav.about}
              </a>
              <a href="#projetos" className="text-[#94A3B8] hover:text-[#10B981] transition-colors">
                {t.nav.projects}
              </a>
              <a href="#skills" className="text-[#94A3B8] hover:text-[#10B981] transition-colors">
                {t.nav.skills}
              </a>
              <a href="#trajetoria" className="text-[#94A3B8] hover:text-[#10B981] transition-colors">
                {t.nav.journey}
              </a>
              <a href="#contato" className="text-[#94A3B8] hover:text-[#10B981] transition-colors">
                {t.nav.contact}
              </a>
            </nav>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="font-bold mb-4">Conecte-se</h3>
            <div className="flex gap-4" role="list" aria-label="Redes sociais">
              <a
                href="https://github.com/italosergio"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-[#10B981] rounded-sm transition-colors"
                aria-label="GitHub - Ítalo Sérgio (abre em nova aba)"
              >
                <Github className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/in/italosergio/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-[#06B6D4] rounded-sm transition-colors"
                aria-label="LinkedIn - Ítalo Sérgio (abre em nova aba)"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="mailto:italosergio1@gmail.com"
                className="p-2 bg-white/10 hover:bg-[#10B981] rounded-sm transition-colors"
                aria-label="Email - italosergio1@gmail.com"
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-center text-sm text-[#94A3B8]">
          <p>© {new Date().getFullYear()} Ítalo Sérgio Chaves da Silva - Desenvolvedor de Software. Todos os direitos reservados.</p>
          <p className="mt-3 text-[10px] text-[#64748B]/50 tracking-widest">nem tudo que esta aqui e visivel. explore.</p>
        </div>
      </div>
    </footer>
  );
}
