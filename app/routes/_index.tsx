import type { MetaFunction } from "react-router";
import { useState, useCallback, useEffect, useRef } from "react";
import { ThemeProvider } from "~/lib/ThemeContext";
import { LanguageProvider, useLanguage } from "~/lib/LanguageContext";
import Header from "~/components/Header";
import About from "~/components/About";
import Projects from "~/components/Projects";
import Skills from "~/components/Skills";
import Timeline from "~/components/Timeline";
import Contact from "~/components/Contact";
import GitHubProfile from "~/components/GitHubProfile";
import Footer from "~/components/Footer";
import BikeAnimation from "~/components/BikeAnimation";
import MatrixRain from "~/components/MatrixRain";
import Toast from "~/components/Toast";
import { useKonamiCode } from "~/lib/useKonamiCode";
import { useSecretCode } from "~/lib/useSecretCode";
import { trackPageView, initClickTracking, setDevMode, isDevMode } from "~/lib/analytics";
import LanguageSelector from "~/components/LanguageSelector";
import PixelScrollbar from "~/components/PixelScrollbar";
import AudioPlayer from "~/components/AudioPlayer";
import ScrollToTop from "~/components/ScrollToTop";
import AnalyticsPanel from "~/components/AnalyticsPanel";
import LiveCursors from "~/components/LiveCursors";
import GlitchText from "~/components/GlitchText";
import ClickHeatmap from "~/components/ClickHeatmap";
import { useNetworkStatus } from "~/lib/useNetworkStatus";

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

function TypingText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, 50);
    return () => clearInterval(id);
  }, [text]);

  return (
    <span className="text-[9px] text-[#10B981]/60 font-mono" style={{ textShadow: "0 0 4px rgba(16,185,129,0.3)" }}>
      {displayed}
      <span className={`${done ? "animate-pulse" : ""} ml-px`}>▌</span>
    </span>
  );
}

function KonamiHint() {
  const zones = [
    { left: "3%", top: "8%" },
    { left: "55%", top: "8%" },
    { left: "3%", top: "45%" },
    { left: "55%", top: "45%" },
    { left: "3%", top: "75%" },
    { left: "55%", top: "75%" },
  ];
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const loop = () => {
      setIdx(Math.floor(Math.random() * zones.length));
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    };
    loop();
    const id = setInterval(loop, 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="absolute pointer-events-none z-10 font-mono text-[10px] sm:text-lg text-[#10B981] tracking-widest transition-opacity duration-700 select-none whitespace-nowrap"
      style={{ left: zones[idx].left, top: zones[idx].top, opacity: visible ? 0.4 : 0, maxWidth: "90vw" }}
    >
      ↑↑↓↓←→←→
    </div>
  );
}

function ParallaxSection({ children }: { children: React.ReactNode }) {
  const bgRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { quality } = useNetworkStatus();

  useEffect(() => {
    const handleScroll = () => {
      const wrapper = wrapperRef.current;
      const bg = bgRef.current;
      if (!wrapper || !bg) return;
      const offset = wrapper.getBoundingClientRect().top * -0.3;
      bg.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={wrapperRef} className="relative overflow-hidden bg-[#F9FAFB] dark:bg-[#1E293B]">
      {quality !== "low" && (
        <div
          ref={bgRef}
          className="absolute -inset-20 opacity-20"
          style={{ backgroundImage: "url('/stack-background-mobile.png')", backgroundSize: "cover", backgroundPosition: "top" }}
        />
      )}
      {children}
    </div>
  );
}

function PageContent() {
  const { t } = useLanguage();
  const [showBikes, setShowBikes] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);

  const toggleHeatmap = useCallback(() => {
    setShowHeatmap(h => !h);
  }, []);

  // Esc closes analytics panel
  useEffect(() => {
    if (!showAnalytics) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setShowAnalytics(false); document.body.style.overflow = ""; }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showAnalytics]);

  // Key "1" to toggle heatmap (desktop)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "1" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const tag = (e.target as HTMLElement).tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        toggleHeatmap();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toggleHeatmap]);

  // "it4l0" dev mode — disables tracking
  const [devActive, setDevActive] = useState(false);

  const devBuf = useRef("");
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      devBuf.current += e.key;
      if (devBuf.current.length > 10) devBuf.current = devBuf.current.slice(-10);
      if (devBuf.current.endsWith("it4l0")) {
        const next = !isDevMode();
        setDevMode(next);
        setDevActive(next);
        setToast(next ? "Dev mode: tracking desativado" : "Tracking reativado");
        devBuf.current = "";
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useSecretCode(useCallback(() => setShowAnalytics(a => {
    const next = !a;
    document.body.style.overflow = next ? "hidden" : "";
    return next;
  }), []));

  const tracked = useRef(false);
  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackPageView("/");
    initClickTracking();
    if (!(window as any).__egg) {
      (window as any).__egg = true;
      console.log(`%c
              ████████
           ███▓▓▓▓▓▓▓▓███
         ██▓▓▓▓▓▓▓▓▓▓▓▓▓▓██
        █▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█
       █▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█
      █▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█
      █░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░█
      █░░░░░▓▓▓▓▓▓▓▓▓▓▓▓░░░░░█
      █░░░░░░░░░░░░░░░░░░░░░░█
       █░░░░░░░░░░░░░░░░░░░░█
        █░░░░░░░░░░░░░░░░░░█
         ██░░░░░░░░░░░░░░██
           ███░░░░░░░░███
              ████████
`, "color: #06B6D4; font-size: 16px; line-height: 1.1; font-family: monospace;");
      console.log("%c🥚", "font-size: 14px; padding: 8px 0;");
    }
  }, []);

  useKonamiCode(
    useCallback(() => {
      setShowBikes(true);
      setFadeOut(false);
      setShowAnalytics(true);
      document.body.style.overflow = "hidden";
      setToast("Bike Mode Ativado! 🚴");
      setTimeout(() => setFadeOut(true), 9000);
      setTimeout(() => setShowBikes(false), 10000);
    }, [])
  );

  return (
    <>
      <PixelScrollbar />
      <AudioPlayer />
      <ScrollToTop />
      <Header />
      {devActive && (
        <div className="fixed top-24 right-4 z-[9997] px-2 py-1 bg-[#F59E0B]/20 border border-[#F59E0B]/30 rounded-sm font-mono text-[10px] text-[#F59E0B] backdrop-blur-sm">
          dev mode
        </div>
      )}
      <LanguageSelector />
      {showBikes && (
        <>
          <MatrixRain fadeOut={fadeOut} />
          <div className={`transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
            <BikeAnimation />
          </div>
        </>
      )}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      <div className="min-h-screen bg-white dark:bg-[var(--bg)]">
        {/* Hero Section */}
        <section className="relative flex items-center justify-center overflow-hidden px-4" style={{ height: "100dvh" }}>
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
            <span className="block text-[#1F2937] dark:text-white mb-2 relative">
              <GlitchText>{t.hero.title1}</GlitchText>
              {/* Mobile: tap the "c" in "Tecnologia" to toggle heatmap */}
              <span
                className="absolute sm:hidden"
                style={{ left: "2.1ch", top: 0, width: "1ch", height: "100%" }}
                onClick={toggleHeatmap}
                aria-hidden="true"
              />
            </span>
            <span className="block">
              <GlitchText className="bg-gradient-to-r from-[#0B5D1E] via-[#10B981] to-[#06B6D4] bg-clip-text text-transparent">{t.hero.title2}</GlitchText>
            </span>
          </h1>
          
          {/* Subtítulo */}
          <p className="text-base sm:text-lg md:text-xl mb-8 text-[#6B7280] dark:text-[#94A3B8] max-w-3xl mx-auto leading-relaxed">
            {t.hero.subtitle} <strong className="text-[#0B5D1E] dark:text-[#10B981]">{t.hero.subtitleBold1}</strong> {t.hero.subtitleAnd} <strong className="text-[#0B5D1E] dark:text-[#10B981]">{t.hero.subtitleBold2}</strong> {t.hero.subtitleEnd}
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center gap-2 mt-24">
            <a
              href="#sobre"
              onClick={(e) => { e.preventDefault(); const el = document.getElementById("sobre"); if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 80; window.scrollTo({ top, behavior: "smooth" }); } }}
              className="hero-cta-primary group px-6 py-2.5 bg-[#0F172A] hover:bg-[#1E293B] text-[#10B981] rounded-sm shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all duration-300 font-medium flex items-center gap-2 text-sm border border-[#10B981]/30 btn-glitch"
            >
              {t.hero.cta3}
              <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
            <TypingText text="clique para uma experiência mais imersiva" />
          </div>
        </div>

        {/* Links Discretos de Projetos - Fundo do Hero */}
        <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[9px] sm:text-[10px] text-[#6B7280] dark:text-[#94A3B8] px-4 max-w-full">
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

        {/* Konami hint */}
        <KonamiHint />

      </section>

      {/* Seção Sobre */}
      <About />

      {/* Seção Projetos */}
      <Projects />

      {/* Seção Skills */}
      <Skills />

      {/* Seção Trajetória */}
      <Timeline />

      {/* Seção Contato + GitHub */}
      <ParallaxSection>
        <Contact />
        <GitHubProfile />
      </ParallaxSection>
    </div>

    {/* Footer */}
    <Footer />
    <LiveCursors name={devActive ? "italo" : undefined} />

    {/* Analytics overlay */}
    {showAnalytics && (
      <div data-analytics-panel className="fixed top-0 left-0 right-0 bottom-0 z-[9998] bg-[#0F172A] overflow-y-auto" style={{ height: "100lvh" }}>
        <button onClick={() => { setShowAnalytics(false); document.body.style.overflow = ""; }} className="fixed top-4 right-4 text-white/70 hover:text-white text-3xl z-10">×</button>
        <AnalyticsPanel onShowHeatmap={() => { setShowAnalytics(false); document.body.style.overflow = ""; setShowHeatmap(true); }} />
      </div>
    )}

    {/* Click heatmap over real page */}
    {showHeatmap && <ClickHeatmap onClose={() => setShowHeatmap(false)} />}
    </>
  );
}
