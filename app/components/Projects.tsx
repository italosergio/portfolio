import { ExternalLink, Github, Sparkles } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "Ciclodados",
    description: "Observatório de dados abertos sobre mobilidade urbana com mapas interativos, tabelas dinâmicas e visualização geográfica de pesquisas.",
    impact: "Dados públicos transformados em ferramentas para políticas de mobilidade",
    tech: ["Remix", "TypeScript", "React", "Tailwind CSS"],
    image: "/projects/ciclodados.png",
    links: {
      demo: "https://ameciclo.org/dados/ciclodados",
    },
  },
  {
    id: 2,
    name: "Ciclista Denuncie",
    description: "Mapeamento colaborativo de violência no trânsito com autenticação, mapa interativo, moderação e histórico de edições.",
    impact: "Ferramenta de denúncia e conscientização sobre segurança viária",
    tech: ["React Router", "TypeScript", "Firebase", "Tailwind CSS"],
    image: "/projects/ciclistadenuncie.png",
    links: {
      demo: "https://ciclistadenuncie.vercel.app",
    },
  },
  {
    id: 3,
    name: "Ameciclo",
    description: "Migração Next.js → Remix com melhorias de UX, performance, acessibilidade, filtros, busca e adaptação de mapas e tabelas de dados públicos.",
    impact: "Múltiplas plataformas de dados unificadas em um observatório interativo",
    tech: ["Remix", "TypeScript", "React", "Tailwind CSS"],
    image: "/projects/ameciclo.png",
    links: {
      demo: "https://ameciclo.org",
    },
  },
  {
    id: 4,
    name: "Bici nos Planos MS",
    description: "Plataforma de advocacy com visualização de dados e mapas para políticas públicas de mobilidade sustentável.",
    impact: "Ferramenta de articulação e promoção da mobilidade ativa",
    tech: ["React Router", "TypeScript", "Tailwind CSS"],
    image: "/projects/bicinosplanos.png",
    links: {
      demo: "https://bicinosplanosms.vercel.app",
    },
    inProgress: true,
  },
  {
    id: 5,
    name: "DOM - Diagnóstico Orçamentário Municipal",
    description: "Plataforma de análise e diagnóstico de orçamentos municipais com dados abertos voltados para mobilidade.",
    impact: "Transparência orçamentária e acompanhamento de investimentos públicos",
    tech: ["React", "Tailwind CSS"],
    image: "/projects/dom.png",
    links: {
      demo: "https://dom.ameciclo.org",
    },
  },
  {
    id: 6,
    name: "Bicicultura Brasília 2024 & 14º Fórum Mundial da Bicicleta",
    description: "Desenvolvimento da plataforma para o 14º Fórum Mundial da Bicicleta com gestão de conteúdo e inscrições.",
    impact: "Centenas de participantes inscritos e engajados através da plataforma",
    tech: ["WordPress", "Divi", "MySQL"],
    image: "/projects/bicicultura.png",
    links: {
      demo: "https://bicicultura.org.br",
    },
  },
];

export default function Projects() {
  return (
    <section id="projetos" aria-labelledby="projects-title" className="relative py-20 md:py-32 px-4 bg-white dark:bg-[#0F172A]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#0B5D1E]/10 dark:bg-[#10B981]/10 rounded-full mb-6">
            <span className="text-sm font-medium text-[#0B5D1E] dark:text-[#10B981]">
              Projetos em Destaque
            </span>
          </div>
          <h2 id="projects-title" className="text-4xl md:text-5xl font-bold text-[#1F2937] dark:text-white mb-4">
            Impacto Social através do Código
          </h2>
          <p className="text-lg text-[#6B7280] dark:text-[#94A3B8] max-w-3xl mx-auto">
            Por cidades mais humanas e sustentáveis através do uso da bicicleta.
          </p>
        </div>

        {/* Grid de Projetos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <article
              key={project.id}
              aria-labelledby={`project-${project.id}-title`}
              className="group relative bg-[#F9FAFB] dark:bg-[#1E293B] rounded-sm shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Tag Em Andamento */}
              {project.inProgress && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 bg-[#06B6D4] text-white text-xs font-medium rounded-full">
                    Em Andamento
                  </span>
                </div>
              )}
              
              {/* Imagem do Projeto */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={`Screenshot do projeto ${project.name}`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F9FAFB] dark:from-[#1E293B] to-transparent opacity-50" />
              </div>

              {/* Borda animada */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B5D1E] to-[#06B6D4] opacity-0 group-hover:opacity-10 transition-opacity" />
              
              <div className="relative p-6 space-y-4 flex-1 flex flex-col">
                {/* Nome */}
                <h3 id={`project-${project.id}-title`} className="text-xl font-bold text-[#1F2937] dark:text-white min-h-[3.5rem]">
                  {project.name}
                </h3>

                {/* Descrição */}
                <p className="text-[#6B7280] dark:text-[#94A3B8] text-sm min-h-[4rem]">
                  {project.description}
                </p>

                {/* Impacto */}
                <div className="p-3 bg-[#0B5D1E]/5 dark:bg-[#10B981]/5 rounded-sm flex items-start gap-2 min-h-[4rem]">
                  <Sparkles className="w-4 h-4 text-[#0B5D1E] dark:text-[#10B981] flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-xs text-[#0B5D1E] dark:text-[#10B981] font-medium">
                    {project.impact}
                  </p>
                </div>

                {/* Tech Stack */}
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

                {/* Links */}
                <div className="flex gap-3 pt-4 mt-auto">
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver projeto ${project.name} (abre em nova aba)`}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0891B2] to-[#10B981] hover:from-[#06B6D4] hover:to-[#0B5D1E] text-white rounded-sm transition-all text-sm font-medium"
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    Ver Projeto
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
