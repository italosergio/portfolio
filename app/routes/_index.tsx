import type { MetaFunction } from "react-router";
import { useState, useCallback } from "react";
import { ThemeProvider } from "~/lib/ThemeContext";
import { LanguageProvider, useLanguage } from "~/lib/LanguageContext";
import Header from "~/components/Header";
import About from "~/components/About";
import Projects from "~/components/Projects";
import Skills from "~/components/Skills";
import Timeline from "~/components/Timeline";
import Contact from "~/components/Contact";
import Footer from "~/components/Footer";
import BikeAnimation from "~/components/BikeAnimation";
import MatrixRain from "~/components/MatrixRain";
import Toast from "~/components/Toast";
import { useKonamiCode } from "~/lib/useKonamiCode";
import LanguageSelector from "~/components/LanguageSelector";

export const meta: MetaFunction = () => {
  return [
    { title: "Ítalo Sérgio - Desenvolvedor Full Stack com Propósito" },
    { name: "description", content: "5 anos transformando dados em políticas públicas sustentáveis" },
  ];
};

export default function Index() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <PageContent />
      </ThemeProvider>
    </LanguageProvider>
  );
}

function PageContent() {
  const { t } = useLanguage();
  const [showBikes, setShowBikes] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useKonamiCode(
    useCallback(() => {
      setShowBikes(true);
      setFadeOut(false);
      setToast("Bike Mode Ativado! 🚴");
      setTimeout(() => setFadeOut(true), 9000);
      setTimeout(() => setShowBikes(false), 10000);
    }, [])
  );

  return (
    <>
      <Header />
      <LanguageSelector />
      {showBikes && (
        <div className={`transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
          <MatrixRain />
          <BikeAnimation />
        </div>
      )}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      <div className="min-h-screen bg-white dark:bg-[var(--bg)]">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden px-4">
        {/* Grid Pixelado Animado - Verde */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `
                linear-gradient(rgba(11, 93, 30, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(11, 93, 30, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        {/* Elementos Laterais - Backend (código) */}
        <div className="theme-back-only absolute inset-0 overflow-hidden pointer-events-none">
          {/* Esquerda */}
          <div className="absolute left-2 sm:left-4 top-1/4 text-[#0B5D1E]/30 dark:text-[#10B981]/30 font-mono text-xs sm:text-sm space-y-2">
            <div>{'{ function() {'}</div>
            <div className="ml-4">{'return true;'}</div>
            <div>{'} }'}</div>
            <div className="mt-4">{'<div />'}</div>
            <div className="mt-4">{'=> () =>'}</div>
          </div>
          <div className="absolute left-4 sm:left-8 bottom-1/4 text-[#06B6D4]/30 font-mono text-xs sm:text-sm space-y-2">
            <div>{'const x = 0;'}</div>
            <div>{'if (x) { }'}</div>
            <div className="mt-4">{'[ ]'}</div>
          </div>
          {/* Direita */}
          <div className="absolute right-2 sm:right-4 top-1/3 text-[#0B5D1E]/30 dark:text-[#10B981]/30 font-mono text-xs sm:text-sm space-y-2">
            <div>{'async () => {}'}</div>
            <div className="mt-4">{'</>'}</div>
            <div className="mt-4">{'import { }'}</div>
          </div>
          <div className="absolute right-4 sm:right-8 bottom-1/3 text-[#06B6D4]/30 font-mono text-xs sm:text-sm space-y-2">
            <div>{'export default'}</div>
            <div className="mt-4">{'/* ... */'}</div>
            <div className="mt-4">{'className=""'}</div>
          </div>
        </div>

        {/* Elementos Laterais - Frontend (formas circulares) */}
        <div className="theme-front-only absolute inset-0 overflow-hidden pointer-events-none hidden">
          {/* Esquerda */}
          <div className="absolute left-4 sm:left-8 top-1/4 w-40 sm:w-56 h-40 sm:h-56 bg-[#0891B2]/25 rounded-full blur-2xl" />
          <div className="absolute left-8 sm:left-16 top-1/2 w-32 sm:w-44 h-32 sm:h-44 bg-[#06B6D4]/30 rounded-full blur-xl" />
          <div className="absolute left-2 sm:left-4 bottom-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-[#0E7490]/20 rounded-full blur-3xl" />
          <div className="absolute left-10 sm:left-20 top-2/3 w-28 sm:w-36 h-28 sm:h-36 bg-[#22D3EE]/25 rounded-full blur-2xl" />
          {/* Direita */}
          <div className="absolute right-4 sm:right-8 top-1/3 w-44 sm:w-60 h-44 sm:h-60 bg-[#06B6D4]/25 rounded-full blur-2xl" />
          <div className="absolute right-6 sm:right-12 top-2/3 w-36 sm:w-48 h-36 sm:h-48 bg-[#0891B2]/30 rounded-full blur-xl" />
          <div className="absolute right-2 sm:right-4 bottom-1/4 w-40 sm:w-52 h-40 sm:h-52 bg-[#22D3EE]/20 rounded-full blur-2xl" />
          <div className="absolute right-10 sm:right-20 top-1/2 w-32 sm:w-40 h-32 sm:h-40 bg-[#0E7490]/25 rounded-full blur-3xl" />
        </div>

        {/* Gradiente sutil de fundo - Verde para Azul */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B5D1E]/5 via-transparent to-[#06B6D4]/5" />

        {/* Conteúdo Hero */}
        <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
          {/* Badge - Topo */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0B5D1E]/10 dark:bg-[#10B981]/10 rounded-full border border-[#0B5D1E]/20 dark:border-[#10B981]/20">
              <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse" />
              <span className="text-[10px] font-medium text-[#0B5D1E] dark:text-[#10B981]">
                {t.hero.available}
              </span>
            </div>
          </div>

          {/* Título Principal */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-5 tracking-tight" style={{ fontFamily: 'Karla, sans-serif' }}>
            <span className="block text-[#1F2937] dark:text-white mb-2">
              {t.hero.title1}
            </span>
            <span className="block bg-gradient-to-r from-[#0B5D1E] via-[#10B981] to-[#06B6D4] bg-clip-text text-transparent">
              {t.hero.title2}
            </span>
          </h1>
          
          {/* Subtítulo */}
          <p className="text-base sm:text-lg md:text-xl mb-8 text-[#6B7280] dark:text-[#94A3B8] max-w-3xl mx-auto leading-relaxed">
            {t.hero.subtitle} <strong className="text-[#0B5D1E] dark:text-[#10B981]">{t.hero.subtitleBold1}</strong> {t.hero.subtitleAnd} <strong className="text-[#0B5D1E] dark:text-[#10B981]">{t.hero.subtitleBold2}</strong> {t.hero.subtitleEnd}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#projetos"
              className="hero-cta-primary group px-6 py-2.5 bg-gradient-to-r from-[#0891B2] to-[#10B981] hover:brightness-110 text-white rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 font-medium flex items-center gap-2 text-sm"
            >
              {t.hero.cta1}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#contato"
              className="px-6 py-2.5 bg-transparent hover:bg-[#F9FAFB] dark:hover:bg-[#1E293B] text-[#1F2937] dark:text-white border-2 border-[#1F2937] dark:border-white rounded-sm transition-all duration-300 font-medium text-sm"
            >
              {t.hero.cta2}
            </a>
          </div>
        </div>

        {/* Links Discretos de Projetos - Fundo do Hero */}
        <div className="absolute bottom-14 sm:bottom-20 left-0 right-0 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[9px] sm:text-[10px] text-[#6B7280] dark:text-[#94A3B8] px-4 max-w-full">
          <span className="opacity-60">{t.hero.projectsLabel}</span>
          <a 
            href="https://ameciclo.org/dados/ciclodados" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#0B5D1E] dark:hover:text-[#10B981] transition-colors underline decoration-dotted underline-offset-4 whitespace-nowrap"
          >
            Ciclodados
          </a>
          <span className="opacity-30">|</span>
          <a 
            href="https://ameciclo.org" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#0B5D1E] dark:hover:text-[#10B981] transition-colors underline decoration-dotted underline-offset-4 whitespace-nowrap"
          >
            Ameciclo
          </a>
          <span className="opacity-30">|</span>
          <a 
            href="https://dom.ameciclo.org" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#0B5D1E] dark:hover:text-[#10B981] transition-colors underline decoration-dotted underline-offset-4 whitespace-nowrap"
          >
            DOM
          </a>
          <span className="opacity-30">|</span>
          <a 
            href="https://ciclistadenuncie.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#0B5D1E] dark:hover:text-[#10B981] transition-colors underline decoration-dotted underline-offset-4 whitespace-nowrap"
          >
            Ciclista, Denuncie!
          </a>
          <span className="opacity-30">|</span>
          <a 
            href="https://bicinosplanosms.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#0B5D1E] dark:hover:text-[#10B981] transition-colors underline decoration-dotted underline-offset-4 whitespace-nowrap"
          >
            Bici nos Planos MS
          </a>
          <span className="opacity-30">|</span>
          <a 
            href="https://ciclistadenuncie.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#0B5D1E] dark:hover:text-[#10B981] transition-colors underline decoration-dotted underline-offset-4 whitespace-nowrap"
          >
            Ciclista, Denuncie!
          </a>
          <span className="opacity-30">|</span>
          <a 
            href="https://bicicultura.org.br" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#0B5D1E] dark:hover:text-[#10B981] transition-colors underline decoration-dotted underline-offset-4 whitespace-nowrap"
          >
            Bicicultura 2024
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-5 h-5 text-[#6B7280] dark:text-[#94A3B8]"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Seção Sobre */}
      <About />

      {/* Seção Projetos */}
      <Projects />

      {/* Seção Skills */}
      <Skills />

      {/* Seção Trajetória */}
      <Timeline />

      {/* Seção Contato */}
      <Contact />
    </div>

    {/* Footer */}
    <Footer />
    </>
  );
}
