import { Github, Linkedin, Mail, Download, Eye } from "lucide-react";
import { useLanguage } from "~/lib/LanguageContext";
import { useState, useEffect } from "react";
import GlitchText from "~/components/GlitchText";
import VersionBadge from "~/components/VersionBadge";
import type { Locale } from "~/lib/i18n";

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

  useEffect(() => {
    const positions = [
      { left: "92%", top: "15%" },
      { left: "5%", top: "70%" },
      { left: "92%", top: "70%" },
      { left: "45%", top: "85%" },
      { left: "75%", top: "40%" },
      { left: "5%", top: "30%" },
    ];
    const loop = () => {
      setEyePos(positions[Math.floor(Math.random() * positions.length)]);
      setEyeVisible(true);
      setTimeout(() => setEyeVisible(false), 3000);
    };
    const id = setInterval(loop, 8000);
    setTimeout(loop, 2000);
    return () => clearInterval(id);
  }, []);

  const [eyeGlitch, setEyeGlitch] = useState(false);
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
      <div
        className="absolute pointer-events-none transition-opacity duration-1000"
        style={{ left: eyePos.left, top: eyePos.top, opacity: eyeVisible ? 1 : 0 }}
        aria-hidden="true"
      >
        <Eye className="w-8 h-8 text-[#10B981]/30" />
        {eyeGlitch && (
          <>
            <Eye className="absolute inset-0 w-8 h-8 text-[#10B981]" style={{ animation: "glitchColor1 200ms steps(2) forwards" }} />
            <Eye className="absolute inset-0 w-8 h-8 text-[#06B6D4]" style={{ animation: "glitchColor2 200ms steps(2) forwards" }} />
          </>
        )}
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo e Mensagem */}
          <div>
            <a href="#" className="text-2xl font-bold text-[#10B981] hover:scale-105 transition-transform inline-flex items-end gap-1 mb-4">
              <GlitchText>ítalo</GlitchText><span className="text-[#06B6D4]"><GlitchText>{"<dev/>"}</GlitchText></span>
              <span className="relative"><VersionBadge /></span>
            </a>
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
