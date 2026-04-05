import { useEffect, useRef } from "react";
import { Map, BarChart3, Globe, Shield } from "lucide-react";
import { useLanguage } from "~/lib/LanguageContext";
import type { Locale } from "~/lib/i18n";

const areas: Array<{
  icon: typeof Map;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  tech: string[];
}> = [
  {
    icon: BarChart3,
    title: {
      pt: "Plataformas de Dados",
      en: "Data Platforms",
      es: "Plataformas de Datos",
    },
    description: {
      pt: "Coleta, tratamento e visualização de dados públicos para apoiar políticas urbanas e transparência.",
      en: "Collection, processing and visualization of public data to support urban policies and transparency.",
      es: "Recolección, tratamiento y visualización de datos públicos para apoyar políticas urbanas y transparencia.",
    },
    tech: ["APIs REST", "Firebase", "Firestore", "Node.js", "TypeScript"],
  },
  {
    icon: Map,
    title: {
      pt: "Mapas Interativos",
      en: "Interactive Maps",
      es: "Mapas Interactivos",
    },
    description: {
      pt: "Visualização geográfica de dados com mapas colaborativos, filtros dinâmicos e camadas de informação.",
      en: "Geographic data visualization with collaborative maps, dynamic filters and information layers.",
      es: "Visualización geográfica de datos con mapas colaborativos, filtros dinámicos y capas de información.",
    },
    tech: ["MapLibre", "Leaflet", "Mapbox", "GeoJSON", "Dados Abertos"],
  },
  {
    icon: Globe,
    title: {
      pt: "Aplicações Web",
      en: "Web Applications",
      es: "Aplicaciones Web",
    },
    description: {
      pt: "Interfaces responsivas, acessíveis e multilíngues com foco em performance e experiência do usuário.",
      en: "Responsive, accessible and multilingual interfaces focused on performance and user experience.",
      es: "Interfaces responsivas, accesibles y multilingües con enfoque en rendimiento y experiencia del usuario.",
    },
    tech: ["React", "Remix", "Next.js", "React Router", "Tailwind CSS"],
  },
  {
    icon: Shield,
    title: {
      pt: "Qualidade & Entrega",
      en: "Quality & Delivery",
      es: "Calidad & Entrega",
    },
    description: {
      pt: "Deploy contínuo, testes, acessibilidade (a11y), internacionalização (i18n) e co-design com usuários.",
      en: "Continuous deployment, testing, accessibility (a11y), internationalization (i18n) and co-design with users.",
      es: "Despliegue continuo, pruebas, accesibilidad (a11y), internacionalización (i18n) y co-diseño con usuarios.",
    },
    tech: ["Vercel", "Docker", "GitHub Actions", "CI/CD", "SEO"],
  },
];

export default function Skills() {
  const { locale, t } = useLanguage();
  const bgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      const bg = bgRef.current;
      if (!section || !bg) return;
      const offset = section.getBoundingClientRect().top * -0.3;
      bg.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} id="skills" aria-labelledby="skills-title" className="relative py-20 md:py-32 px-4 overflow-hidden">
      <div
        ref={bgRef}
        className="absolute -inset-20"
        style={{ backgroundImage: "url('/stack-background.png')", backgroundSize: "cover", backgroundPosition: "center top 50px" }}
      />
      <div className="absolute inset-0 bg-[#F9FAFB]/30 dark:bg-[#1E293B]/40" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#0B5D1E]/10 dark:bg-[#10B981]/10 rounded-full mb-6">
            <span className="text-sm font-medium text-[#0B5D1E] dark:text-[#10B981]">
              {t.skills.tag}
            </span>
          </div>
          <h2 id="skills-title" className="text-4xl md:text-5xl font-bold text-white mb-4 keep-white">
            {t.skills.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {areas.map((area) => (
            <div
              key={area.title.pt}
              className="group p-6 bg-white dark:bg-[#0F172A] rounded-sm shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <area.icon className="w-6 h-6 text-[#0B5D1E] dark:text-[#10B981]" aria-hidden="true" />
                <h3 className="text-lg font-bold text-[#1F2937] dark:text-white">
                  {area.title[locale]}
                </h3>
              </div>
              <p className="text-sm text-[#6B7280] dark:text-[#94A3B8] mb-4">
                {area.description[locale]}
              </p>
              <div className="flex flex-wrap gap-2">
                {area.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-[#0B5D1E]/10 dark:bg-[#10B981]/10 text-[#0B5D1E] dark:text-[#10B981] rounded-sm text-xs font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
