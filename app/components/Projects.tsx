import { ExternalLink, Github, Sparkles, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "~/lib/LanguageContext";
import type { Locale } from "~/lib/i18n";

const projects: Array<{
  id: number;
  name: string;
  description: Record<Locale, string>;
  impact: Record<Locale, string>;
  tech: string[];
  image: string;
  links: { demo?: string; github?: string };
  inProgress?: boolean;
  hidden?: boolean;
}> = [
  {
    id: 1,
    name: "Ciclodados",
    description: {
      pt: "Observatório de dados abertos sobre mobilidade urbana com mapas interativos, tabelas dinâmicas e visualização geográfica de pesquisas.",
      en: "Open data observatory on urban mobility with interactive maps, dynamic tables and geographic visualization of research.",
      es: "Observatorio de datos abiertos sobre movilidad urbana con mapas interactivos, tablas dinámicas y visualización geográfica de investigaciones.",
    },
    impact: {
      pt: "Dados públicos transformados em ferramentas para políticas de mobilidade",
      en: "Public data transformed into tools for mobility policies",
      es: "Datos públicos transformados en herramientas para políticas de movilidad",
    },
    tech: ["Remix", "TypeScript", "React", "Tailwind CSS"],
    image: "/projects/ciclodados.png",
    links: { demo: "https://ameciclo.org/dados/ciclodados", github: "https://github.com/Ameciclo/ciclodados" },
  },
  {
    id: 2,
    name: "Ciclista, Denuncie!",
    description: {
      pt: "Mapeamento colaborativo de violência no trânsito com autenticação, mapa interativo, moderação e histórico de edições.",
      en: "Collaborative mapping of traffic violence with authentication, interactive map, moderation and edit history.",
      es: "Mapeo colaborativo de violencia vial con autenticación, mapa interactivo, moderación e historial de ediciones.",
    },
    impact: {
      pt: "Ferramenta de denúncia e conscientização sobre segurança viária",
      en: "Reporting and awareness tool for road safety",
      es: "Herramienta de denuncia y concientización sobre seguridad vial",
    },
    tech: ["React Router", "TypeScript", "Firebase", "Tailwind CSS"],
    image: "/projects/ciclistadenuncie.png",
    links: { demo: "https://ciclistadenuncie.vercel.app", github: "https://github.com/italosergio/ciclistadenuncie" },
    inProgress: true,
  },
  {
    id: 3,
    name: "Ameciclo",
    description: {
      pt: "Migração Next.js → Remix com melhorias de UX, performance, acessibilidade, filtros, busca e adaptação de mapas e tabelas de dados públicos.",
      en: "Next.js → Remix migration with UX, performance, accessibility improvements, filters, search and public data maps/tables adaptation.",
      es: "Migración Next.js → Remix con mejoras de UX, rendimiento, accesibilidad, filtros, búsqueda y adaptación de mapas y tablas de datos públicos.",
    },
    impact: {
      pt: "Múltiplas plataformas de dados unificadas em um observatório interativo",
      en: "Multiple data platforms unified into an interactive observatory",
      es: "Múltiples plataformas de datos unificadas en un observatorio interactivo",
    },
    tech: ["Remix", "TypeScript", "React", "Tailwind CSS"],
    image: "/projects/ameciclo.png",
    links: { demo: "https://ameciclo.org", github: "https://github.com/Ameciclo/ameciclo" },
  },
  {
    id: 4,
    name: "Bici nos Planos MS",
    description: {
      pt: "Plataforma de advocacy com visualização de dados e mapas para políticas públicas de mobilidade sustentável.",
      en: "Advocacy platform with data visualization and maps for sustainable mobility public policies.",
      es: "Plataforma de advocacy con visualización de datos y mapas para políticas públicas de movilidad sostenible.",
    },
    impact: {
      pt: "Ferramenta de articulação e promoção da mobilidade ativa",
      en: "Tool for articulation and promotion of active mobility",
      es: "Herramienta de articulación y promoción de la movilidad activa",
    },
    tech: ["React Router", "TypeScript", "Tailwind CSS"],
    image: "/projects/bicinosplanos.png",
    links: { demo: "https://bicinosplanosms.vercel.app", github: "https://github.com/Bici-nos-Planos-MS/bicinosplanos-frontend" },
    inProgress: true,
  },
  {
    id: 5,
    name: "DOM - Diagnóstico Orçamentário Municipal",
    description: {
      pt: "Plataforma de análise e diagnóstico de orçamentos municipais com dados abertos voltados para mobilidade.",
      en: "Platform for analysis and diagnosis of municipal budgets with open data focused on mobility.",
      es: "Plataforma de análisis y diagnóstico de presupuestos municipales con datos abiertos enfocados en movilidad.",
    },
    impact: {
      pt: "Transparência orçamentária e acompanhamento de investimentos públicos",
      en: "Budget transparency and tracking of public investments",
      es: "Transparencia presupuestaria y seguimiento de inversiones públicas",
    },
    tech: ["React", "Tailwind CSS"],
    image: "/projects/dom.png",
    links: { demo: "https://dom.ameciclo.org", github: "https://github.com/Ameciclo/dom" },
  },
  {
    id: 6,
    name: "Bicicultura Brasília 2024 & 14º Fórum Mundial da Bicicleta",
    description: {
      pt: "Desenvolvimento da plataforma para o 14º Fórum Mundial da Bicicleta e Bicicultura Brasília com gestão de conteúdo e inscrições.",
      en: "Platform development for the 14th World Bicycle and Bicicultura Forum with content management and registrations.",
      es: "Desarrollo de la plataforma para el 14º Foro Mundial de la Bicicleta e Bicicultura con gestión de contenido e inscripciones.",
    },
    impact: {
      pt: "Centenas de participantes inscritos e engajados através da plataforma",
      en: "Hundreds of participants registered and engaged through the platform",
      es: "Cientos de participantes inscritos y comprometidos a través de la plataforma",
    },
    tech: ["WordPress", "Divi", "MySQL"],
    image: "/projects/bicicultura.png",
    links: { demo: "https://bicicultura.org.br" },
  },
  {
    id: 7,
    name: "IDECICLO App",
    description: {
      pt: "Primeiro aplicativo de avaliação de infraestrutura cicloviária do Brasil, com georeferenciamento dos trechos avaliados e coleta de dados em campo.",
      en: "First cycling infrastructure evaluation app in Brazil, with georeferencing of evaluated sections and field data collection.",
      es: "Primera aplicación de evaluación de infraestructura ciclovial de Brasil, con georeferenciamiento de los tramos evaluados y recolección de datos en campo.",
    },
    impact: {
      pt: "Avaliações cicloviárias saíram do papel para o digital",
      en: "Cycling evaluations went from paper to digital",
      es: "Evaluaciones cicloviales pasaron del papel al digital",
    },
    tech: ["React Native", "TypeScript", "GPX"],
    image: "/projects/ideciclo.jpg",
    links: { github: "https://github.com/Ameciclo/auditoria-cicloviaria" },
    hidden: true,
  },
  {
    id: 8,
    name: "Ciclomputador",
    description: {
      pt: "Ferramenta open source para leitura e processamento de arquivos GPX gerados nas avaliações de campo do IDECICLO, transformando dados brutos de georeferenciamento em JSON estruturado.",
      en: "Open source tool for reading and processing GPX files from IDECICLO field evaluations, transforming raw georeferencing data into structured JSON.",
      es: "Herramienta open source para lectura y procesamiento de archivos GPX de las evaluaciones de campo del IDECICLO, transformando datos brutos de georeferenciamiento en JSON estructurado.",
    },
    impact: {
      pt: "Processamento automatizado de dados de avaliação cicloviária",
      en: "Automated processing of cycling evaluation data",
      es: "Procesamiento automatizado de datos de evaluación ciclovial",
    },
    tech: ["Node.js", "TypeScript", "GPX"],
    image: "/trajetoria/ciclomputador.jpg",
    links: { github: "https://github.com/Ameciclo/ciclomputador" },
    hidden: true,
  },
  {
    id: 9,
    name: "Central Ameciclista",
    description: {
      pt: "Sistema web integrado ao Telegram para gestão de recursos, empréstimos, biblioteca, inventário e atividades da Ameciclo com controle de permissões e pagamentos via PIX.",
      en: "Web system integrated with Telegram for managing resources, loans, library, inventory and activities with permission control and PIX payments.",
      es: "Sistema web integrado a Telegram para gestión de recursos, préstamos, biblioteca, inventario y actividades con control de permisos y pagos vía PIX.",
    },
    impact: {
      pt: "Gestão interna da Ameciclo digitalizada e integrada ao Telegram",
      en: "Ameciclo's internal management digitized and integrated with Telegram",
      es: "Gestión interna de Ameciclo digitalizada e integrada a Telegram",
    },
    tech: ["Remix", "Firebase", "Telegram", "TypeScript"],
    image: "/projects/ameciclistas.jpg",
    links: { demo: "https://ameciclistas.vercel.app", github: "https://github.com/Ameciclo/ameciclistas" },
    hidden: true,
  },
];

function ProjectCard({ project, locale, t }: { project: typeof projects[0]; locale: Locale; t: any }) {
  return (
    <article
      aria-labelledby={`project-${project.id}-title`}
      className="group relative bg-[#F9FAFB] dark:bg-[#1E293B] rounded-sm shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
    >
      {project.inProgress && (
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1 bg-[#06B6D4] text-white text-xs font-medium rounded-full">
            {t.projects.inProgress}
          </span>
        </div>
      )}

      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={`Screenshot do projeto ${project.name}`}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F9FAFB] dark:from-[#1E293B] to-transparent opacity-50" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#0B5D1E] to-[#06B6D4] opacity-0 group-hover:opacity-10 transition-opacity" />

      <div className="relative p-6 space-y-4 flex-1 flex flex-col">
        <h3 id={`project-${project.id}-title`} className="text-xl font-bold text-[#1F2937] dark:text-white min-h-[3.5rem]">
          {project.name}
        </h3>

        <p className="text-[#6B7280] dark:text-[#94A3B8] text-sm min-h-[4rem]">
          {project.description[locale]}
        </p>

        <div className="p-3 bg-[#0B5D1E]/5 dark:bg-[#10B981]/5 rounded-sm flex items-start gap-2 min-h-[4rem]">
          <Sparkles className="w-4 h-4 text-[#0B5D1E] dark:text-[#10B981] flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs text-[#0B5D1E] dark:text-[#10B981] font-medium">
            {project.impact[locale]}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-white dark:bg-[#0F172A] text-xs font-medium text-[#6B7280] dark:text-[#94A3B8] rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-3 pt-4 mt-auto">
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver projeto ${project.name} (abre em nova aba)`}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0891B2] to-[#10B981] hover:from-[#06B6D4] hover:to-[#0B5D1E] text-white rounded-sm transition-all text-sm font-medium"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              {t.projects.viewProject}
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub ${project.name} (abre em nova aba)`}
              className="flex items-center gap-2 px-4 py-2 bg-[#24292e] hover:bg-[#1a1e22] text-white rounded-sm transition-all text-sm font-medium"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const { locale, t } = useLanguage();
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? projects : projects.filter((p) => !p.hidden);

  return (
    <section id="projetos" aria-labelledby="projects-title" className="relative py-20 md:py-32 px-4 bg-white dark:bg-[#0F172A]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#0B5D1E]/10 dark:bg-[#10B981]/10 rounded-full mb-6">
            <span className="text-sm font-medium text-[#0B5D1E] dark:text-[#10B981]">
              {t.projects.tag}
            </span>
          </div>
          <h2 id="projects-title" className="text-4xl md:text-5xl font-bold text-[#1F2937] dark:text-white mb-4">
            {t.projects.title}
          </h2>
          <p className="text-lg text-[#6B7280] dark:text-[#94A3B8] max-w-3xl mx-auto">
            {t.projects.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} locale={locale} t={t} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-transparent hover:bg-[#F9FAFB] dark:hover:bg-[#1E293B] text-[#1F2937] dark:text-white border-2 border-[#1F2937] dark:border-white rounded-sm transition-all duration-300 font-medium text-sm"
          >
            {showAll
              ? (locale === "pt" ? "Ver menos" : locale === "en" ? "View less" : "Ver menos")
              : (locale === "pt" ? "Ver mais projetos" : locale === "en" ? "View more projects" : "Ver más proyectos")}
            <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>
    </section>
  );
}
