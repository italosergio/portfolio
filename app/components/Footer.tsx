import { Github, Linkedin, Mail, Download } from "lucide-react";
import { useLanguage } from "~/lib/LanguageContext";
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

  return (
    <footer role="contentinfo" className="relative bg-[#1F2937] dark:bg-[#0F172A] text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo e Mensagem */}
          <div>
            <a href="#" className="text-2xl font-bold text-[#10B981] hover:scale-105 transition-transform inline-flex items-end gap-1 mb-4">
              ítalo<span className="text-[#06B6D4]">&lt;dev/&gt;</span>
              <span className="text-[10px] text-[#94A3B8] font-normal pb-0.5 relative group">
                v3
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  Versão do site
                </span>
              </span>
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
          <p>© {new Date().getFullYear()} Ítalo Sérgio Chaves da Silva. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
