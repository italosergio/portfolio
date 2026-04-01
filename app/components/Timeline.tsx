import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, Star, ExternalLink, Github } from "lucide-react";
import { useLanguage } from "~/lib/LanguageContext";
import type { Locale } from "~/lib/i18n";

const milestones: Array<{
  year: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  tags?: string[];
  images?: string[];
  hidden?: boolean;
  featured?: boolean;
  links?: { demo?: string; github?: string };
}> = [
  {
    year: "2014–2020",
    title: {
      pt: "Engenharia Elétrica",
      en: "Electrical Engineering",
      es: "Ingeniería Eléctrica",
    },
    description: {
      pt: "5 anos de atuação na área de engenharia elétrica antes de migrar para desenvolvimento de software e mobilidade ativa.",
      en: "5 years working in electrical engineering before transitioning to software development and active mobility.",
      es: "5 años trabajando en ingeniería eléctrica antes de migrar al desarrollo de software y movilidad activa.",
    },
    images: [
      "/trajetoria/engenharia1.jpg",
      "/trajetoria/engenharia2.jpg",
      "/trajetoria/engenharia3.jpg",
      "/trajetoria/engenharia4.jpg",
      "/trajetoria/engenharia5.jpg",
      "/trajetoria/engenharia6.jpg",
      "/trajetoria/engenharia7.jpg",
      "/trajetoria/engenharia8.jpg",
    ],
  },
  {
    year: "2018",
    title: {
      pt: "Ameciclo — Associado e Voluntário",
      en: "Ameciclo — Member and Volunteer",
      es: "Ameciclo — Asociado y Voluntario",
    },
    description: {
      pt: "Entrada no universo da mobilidade urbana como associado da Ameciclo. Participação como voluntário em contagens de ciclistas e atividades de campo.",
      en: "Entry into the urban mobility universe as an Ameciclo member. Participation as a volunteer in cyclist counts and field activities.",
      es: "Entrada al universo de la movilidad urbana como asociado de Ameciclo. Participación como voluntario en conteos de ciclistas y actividades de campo.",
    },
    tags: ["Ameciclo", "Voluntariado"],
    links: { demo: "https://ameciclo.org" },
    images: [
      "/trajetoria/associado.png",
      "/trajetoria/associado1.jpg",
      "/trajetoria/associado2.jpg",
      "/trajetoria/associado3.jpg",
      "/trajetoria/associado4.jpg",
    ],
  },
  {
    year: "2018–2022",
    title: {
      pt: "Formação em Desenvolvimento Web",
      en: "Web Development Training",
      es: "Formación en Desarrollo Web",
    },
    description: {
      pt: "Período de formação e especialização em programação, com foco em desenvolvimento web e criação de plataformas digitais.",
      en: "Training and specialization period in programming, focused on web development and digital platform creation.",
      es: "Período de formación y especialización en programación, con enfoque en desarrollo web y creación de plataformas digitales.",
    },
    images: [
      "/trajetoria/trybe1.jpg",
      "/trajetoria/trybe2.jpg",
      "/trajetoria/trybe3.jpg",
      "/trajetoria/trybe4.jpg",
      "/trajetoria/trybe5.jpg",
      "/trajetoria/trybe6.jpg",
    ],
  },
  {
    year: "2023",
    title: {
      pt: "IDECICLO — Primeiro App de Avaliação Cicloviária do Brasil",
      en: "IDECICLO — First Cycling Infrastructure Evaluation App in Brazil",
      es: "IDECICLO — Primera App de Evaluación Ciclovial de Brasil",
    },
    description: {
      pt: "Convidado para desenvolver o aplicativo que tirou as avaliações de infraestrutura cicloviária do papel e levou para o digital, com georeferenciamento dos trechos avaliados. Atuei também como coletador de dados em campo.",
      en: "Invited to develop the app that took cycling infrastructure evaluations from paper to digital, with georeferencing of evaluated sections. Also worked as a field data collector.",
      es: "Invitado a desarrollar la aplicación que llevó las evaluaciones de infraestructura ciclovial del papel al digital, con georeferenciamiento de los tramos evaluados. También actué como recolector de datos en campo.",
    },
    tags: ["Ameciclo", "App", "Dados", "Georeferenciamento"],
    links: { github: "https://github.com/Ameciclo/auditoria-cicloviaria" },
    images: [
      "/trajetoria/app1.jpg",
      "/trajetoria/app2.jpg",
      "/trajetoria/app3.jpg",
      "/trajetoria/app4.jpg",
    ],
  },
  {
    year: "2023",
    title: {
      pt: "Ciclomputador — Processador de Dados do IDECICLO",
      en: "Ciclomputador — IDECICLO Data Processor",
      es: "Ciclomputador — Procesador de Datos del IDECICLO",
    },
    description: {
      pt: "Desenvolvimento de ferramenta open source para leitura e processamento dos arquivos GPX gerados nas avaliações de campo do IDECICLO, transformando dados brutos de georeferenciamento em JSON estruturado para consumo pela plataforma.",
      en: "Development of an open source tool for reading and processing GPX files generated in IDECICLO field evaluations, transforming raw georeferencing data into structured JSON for platform consumption.",
      es: "Desarrollo de herramienta open source para lectura y procesamiento de archivos GPX generados en las evaluaciones de campo del IDECICLO, transformando datos brutos de georeferenciamiento en JSON estructurado para consumo por la plataforma.",
    },
    tags: ["Ameciclo", "Open Source", "Node.js", "GPX"],
    links: { github: "https://github.com/Ameciclo/ciclomputador" },
    images: ["/trajetoria/ciclomputador.jpg"],
  },
  {
    year: "2023",
    title: {
      pt: "LOA Clima — Plataforma de Monitoramento Orçamentário",
      en: "LOA Clima — Budget Monitoring Platform",
      es: "LOA Clima — Plataforma de Monitoreo Presupuestario",
    },
    description: {
      pt: "Construção da plataforma de monitoramento e diagnóstico de orçamentos estaduais empregados em ações pró-clima, inspirada no Plano Clima (2024–2035) do Governo Federal. Primeiro contato com grandes volumes de dados públicos abertos e início da trajetória com análise, dashboards e visualização de dados.",
      en: "Built the platform for monitoring and diagnosing state budgets allocated to climate actions, inspired by the Federal Government's Climate Plan (2024–2035). First contact with large volumes of open public data and beginning of the journey with analysis, dashboards and data visualization.",
      es: "Construcción de la plataforma de monitoreo y diagnóstico de presupuestos estatales empleados en acciones pro-clima, inspirada en el Plan Clima (2024–2035) del Gobierno Federal. Primer contacto con grandes volúmenes de datos públicos abiertos e inicio de la trayectoria con análisis, dashboards y visualización de datos.",
    },
    tags: ["Ameciclo", "Dados Abertos", "Dashboard"],
    links: { demo: "https://loaclima.ameciclo.org", github: "https://github.com/Ameciclo/raio" },
    images: [
      "/trajetoria/loaclima1.png",
      "/trajetoria/loaclima2.png",
    ],
  },
  {
    year: "2024",
    title: {
      pt: "Fórum Nordestino da Bicicleta — Natal",
      en: "Northeast Bicycle Forum — Natal",
      es: "Foro Nordestino de la Bicicleta — Natal",
    },
    description: {
      pt: "Participação no Fórum Nordestino da Bicicleta em Natal, ministrando oficina de bicipolo e fortalecendo a articulação na rede nacional de ciclomobilidade.",
      en: "Participation in the Northeast Bicycle Forum in Natal, leading a bike polo workshop and strengthening articulation in the national cycling mobility network.",
      es: "Participación en el Foro Nordestino de la Bicicleta en Natal, impartiendo taller de bicipolo y fortaleciendo la articulación en la red nacional de ciclomovilidad.",
    },
    tags: ["Eventos", "Oficinas"],
    images: [
      "/trajetoria/fnebici1.jpg",
      "/trajetoria/fnebici2.jpg",
      "/trajetoria/fnebici3.jpg",
      "/trajetoria/fnebici4.png",
      "/trajetoria/bicipolo.jpg",
      "/trajetoria/bicipolo2.jpg",
      "/trajetoria/bicipolo3.jpg",
    ],
  },
  {
    year: "2024",
    title: {
      pt: "DOM — Diagnóstico Orçamentário Municipal",
      en: "DOM — Municipal Budget Diagnosis",
      es: "DOM — Diagnóstico Presupuestario Municipal",
    },
    description: {
      pt: "Mesmo processo do LOA Clima, agora em âmbito municipal. Aprofundamento no trabalho com dados públicos abertos e construção de plataformas de transparência orçamentária.",
      en: "Same process as LOA Clima, now at the municipal level. Deepening work with open public data and building budget transparency platforms.",
      es: "Mismo proceso que LOA Clima, ahora a nivel municipal. Profundización en el trabajo con datos públicos abiertos y construcción de plataformas de transparencia presupuestaria.",
    },
    tags: ["Ameciclo", "Dados Abertos"],
    links: { demo: "https://dom.ameciclo.org", github: "https://github.com/Ameciclo/dom" },
    images: [
      "/trajetoria/dom1.png",
      "/trajetoria/dom2.png",
      "/trajetoria/dom3.png",
      "/trajetoria/dom4.png",
    ],
  },
  {
    year: "2024",
    title: {
      pt: "14º Fórum Mundial da Bicicleta e Bicicultura Brasília",
      en: "14th World Bicycle Forum and Bicicultura Brasília",
      es: "14º Foro Mundial de la Bicicleta y Bicicultura Brasília",
    },
    description: {
      pt: "Desenvolvimento da plataforma do evento. Participação como coordenador de oficinas: IDECICLO (coleta de dados cicloviários) e Ki-Karro-o-kê? (karaokê temático de ciclomobilidade). Participação em diversas oficinas de formação para mobilidade.",
      en: "Event platform development. Participation as workshop coordinator: IDECICLO (cycling data collection) and Ki-Karro-o-kê? (cycling-themed karaoke). Participation in various mobility training workshops.",
      es: "Desarrollo de la plataforma del evento. Participación como coordinador de talleres: IDECICLO (recolección de datos cicloviales) y Ki-Karro-o-kê? (karaoke temático de ciclomovilidad). Participación en diversos talleres de formación para movilidad.",
    },
    tags: ["WordPress", "Oficinas", "Eventos"],
    links: { demo: "https://bicicultura.org.br" },
    images: [
      "/trajetoria/bicicultura.png",
      "/trajetoria/bicicultura1.png",
      "/trajetoria/bicicultura2.png",
    ],
    hidden: true,
  },
  {
    year: "2024",
    title: {
      pt: "Central Ameciclista — Sistema de Gestão Interno",
      en: "Central Ameciclista — Internal Management System",
      es: "Central Ameciclista — Sistema de Gestión Interno",
    },
    description: {
      pt: "Sistema web integrado ao Telegram para gestão de recursos, empréstimos, biblioteca, inventário e atividades da Ameciclo. Inclui controle de permissões por categoria de usuário, sistema de pagamentos via PIX e integração com Google Sheets e CMS.",
      en: "Web system integrated with Telegram for managing resources, loans, library, inventory and Ameciclo activities. Includes permission control by user category, PIX payment system and integration with Google Sheets and CMS.",
      es: "Sistema web integrado a Telegram para gestión de recursos, préstamos, biblioteca, inventario y actividades de Ameciclo. Incluye control de permisos por categoría de usuario, sistema de pagos vía PIX e integración con Google Sheets y CMS.",
    },
    tags: ["Remix", "Firebase", "Telegram", "TypeScript"],
    links: { demo: "https://ameciclistas.vercel.app", github: "https://github.com/Ameciclo/ameciclistas" },
    hidden: true,
    images: [
      "/trajetoria/ameciclistas0.jpg",
      "/trajetoria/ameciclistas1.jpg",
      "/trajetoria/ameciclistas2.jpg",
      "/trajetoria/ameciclistas3.jpg",
    ],
  },
  {
    year: "2025",
    title: {
      pt: "Ameciclo — Desenvolvedor Full Stack e Ciclodados",
      en: "Ameciclo — Full Stack Developer and Ciclodados",
      es: "Ameciclo — Desarrollador Full Stack y Ciclodados",
    },
    description: {
      pt: "Desenvolvedor responsável pela migração, desenvolvimento e entrega da plataforma de dados da Ameciclo em contrato de 12 meses. Fusão de todas as plataformas (DOM, LOA, Ciclodados) no site principal com arquitetura full stack — front-end, back-end, banco de dados e CMS. Entrega final do Ciclodados: plataforma integrada de visualização com mapas georeferenciados, mecanismos de busca, observatório de sinistros, contagens de ciclistas, perfil ciclista e orçamento público.",
      en: "Developer responsible for the migration, development and delivery of Ameciclo's data platform on a 12-month contract. Merging of all platforms (DOM, LOA, Ciclodados) into the main site with full stack architecture — front-end, back-end, database and CMS. Final delivery of Ciclodados: integrated visualization platform with georeferenced maps, search mechanisms, crash observatory, cyclist counts, cyclist profile and public budget.",
      es: "Desarrollador responsable de la migración, desarrollo y entrega de la plataforma de datos de Ameciclo en contrato de 12 meses. Fusión de todas las plataformas (DOM, LOA, Ciclodados) en el sitio principal con arquitectura full stack — front-end, back-end, base de datos y CMS. Entrega final de Ciclodados: plataforma integrada de visualización con mapas georeferenciados, mecanismos de búsqueda, observatorio de siniestros, conteos de ciclistas, perfil ciclista y presupuesto público.",
    },
    tags: ["Remix", "TypeScript", "Migração", "12 meses"],
    hidden: true,
    featured: true,
    links: { demo: "https://ameciclo.org/dados/ciclodados", github: "https://github.com/Ameciclo/ciclodados" },
    images: [
      "/trajetoria/ciclodados01.jpg",
      "/trajetoria/ciclodados1.jpg",
      "/trajetoria/ciclodados2.jpg",
      "/trajetoria/ciclodados3.png",
      "/trajetoria/ciclodados4.jpg",
      "/trajetoria/ciclodados5.jpg",
      "/trajetoria/ciclodados6.jpg",
      "/trajetoria/ciclodados7.jpg",
      "/trajetoria/ciclodados8.jpg",
      "/trajetoria/ciclodados9.jpg",
      "/trajetoria/ciclodados10.png",
      "/trajetoria/ciclodados12.jpg",
      "/trajetoria/ciclodados33.jpg",
    ],
  },
  {
    year: "2026",
    title: {
      pt: "Bici nos Planos MS — Site Institucional",
      en: "Bici nos Planos MS — Institutional Website",
      es: "Bici nos Planos MS — Sitio Institucional",
    },
    description: {
      pt: "Desenvolvimento do site institucional do coletivo Bici nos Planos MS, com visualização de dados e mapas para advocacy de políticas públicas de mobilidade sustentável.",
      en: "Development of the institutional website for the Bici nos Planos MS collective, with data visualization and maps for sustainable mobility public policy advocacy.",
      es: "Desarrollo del sitio institucional del colectivo Bici nos Planos MS, con visualización de datos y mapas para advocacy de políticas públicas de movilidad sostenible.",
    },
    tags: ["React Router", "TypeScript", "Tailwind CSS", "Em Desenvolvimento"],
    hidden: true,
    links: { demo: "https://bicinosplanosms.vercel.app", github: "https://github.com/Bici-nos-Planos-MS/bicinosplanos-frontend" },
    images: ["/trajetoria/bicinosplanos.png"],
  },
  {
    year: "2026",
    title: {
      pt: "Ciclista, Denuncie!",
      en: "Ciclista, Denuncie!",
      es: "Ciclista, Denuncie!",
    },
    description: {
      pt: "Desenvolvimento de plataforma de mapeamento colaborativo de violência no trânsito contra ciclistas, com autenticação, mapa interativo, moderação e histórico de edições.",
      en: "Development of a collaborative mapping platform for traffic violence against cyclists, with authentication, interactive map, moderation and edit history.",
      es: "Desarrollo de plataforma de mapeo colaborativo de violencia vial contra ciclistas, con autenticación, mapa interactivo, moderación e historial de ediciones.",
    },
    tags: ["React Router", "Firebase", "MapLibre", "Em Desenvolvimento"],
    hidden: true,
    links: { demo: "https://ciclistadenuncie.vercel.app", github: "https://github.com/italosergio/ciclistadenuncie" },
    images: [
      "/trajetoria/ciclistadenuncie0.png",
      "/trajetoria/ciclistadenuncie1.png",
      "/trajetoria/ciclistadenuncie.png",
      "/trajetoria/ciclistadenuncie3.png",
      "/trajetoria/ciclistadenuncie4.png",
      "/trajetoria/ciclistadenuncie5.png",
    ],
  },
];

function ImageCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (expanded) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length, expanded]);

  useEffect(() => {
    if (!expanded) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
      if (e.key === "ArrowRight") setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
      if (e.key === "ArrowLeft") setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [expanded, images.length]);

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <>
      {/* Thumbnail no card */}
      <div
        className="relative mt-3 rounded-sm overflow-hidden cursor-pointer h-40"
        onClick={() => setExpanded(true)}
      >
        {images.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              idx === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {images.length > 1 && (
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === current ? "bg-white w-3" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Galeria expandida */}
      {expanded && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={() => setExpanded(false)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl z-10"
            onClick={() => setExpanded(false)}
            aria-label="Fechar galeria"
          >
            ×
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors z-10"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors z-10"
                aria-label="Próxima foto"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div className="relative max-w-4xl max-h-[85vh] w-full mx-4" onClick={(e) => e.stopPropagation()}>
            {images.map((src, idx) => (
              <img
                key={src}
                src={src}
                alt=""
                className={`max-w-full max-h-[85vh] mx-auto object-contain transition-opacity duration-500 ${
                  idx === current ? "opacity-100 relative" : "opacity-0 absolute inset-0"
                }`}
              />
            ))}
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrent(idx); }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === current ? "bg-white w-4" : "bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Foto ${idx + 1}`}
                />
              ))}
            </div>
          )}

          <span className="absolute top-4 left-4 text-white/50 text-sm">
            {current + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  );
}

export default function Timeline() {
  const { locale } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const visibleMilestones = milestones;

  const handleToggle = () => {
    if (showAll && sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollTo = window.scrollY + rect.top + 300;
      window.scrollTo({ top: scrollTo, behavior: "smooth" });
    }
    setShowAll(!showAll);
  };

  return (
    <section id="trajetoria" aria-labelledby="timeline-title" ref={sectionRef} className="relative py-20 md:py-32 px-4 bg-white dark:bg-[#0F172A]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#0B5D1E]/10 dark:bg-[#10B981]/10 rounded-full mb-6">
            <span className="text-sm font-medium text-[#0B5D1E] dark:text-[#10B981]">
              {locale === "pt" ? "Trajetória" : locale === "en" ? "Journey" : "Trayectoria"}
            </span>
          </div>
          <h2 id="timeline-title" className="text-4xl md:text-5xl font-bold text-[#1F2937] dark:text-white mb-4">
            {locale === "pt" ? "Da Engenharia à Mobilidade" : locale === "en" ? "From Engineering to Mobility" : "De la Ingeniería a la Movilidad"}
          </h2>
          <p className="text-lg text-[#6B7280] dark:text-[#94A3B8] max-w-2xl mx-auto">
            {locale === "pt"
              ? "Uma trajetória construída entre código, dados e as ruas — pedalando todos os dias e conectando tecnologia com quem vive e transforma a mobilidade urbana."
              : locale === "en"
                ? "A journey built between code, data and the streets — cycling every day and connecting technology with those who live and transform urban mobility."
                : "Una trayectoria construida entre código, datos y las calles — pedaleando todos los días y conectando tecnología con quienes viven y transforman la movilidad urbana."}
          </p>
        </div>

        <div className={`relative ${!showAll ? "max-h-48 overflow-hidden" : ""}`}>
          {!showAll && (
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-[#0F172A] to-transparent z-[5] pointer-events-none" />
          )}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0B5D1E] via-[#10B981] to-[#06B6D4]" />

          <div className="space-y-12">
            {visibleMilestones.map((m, i) => (
              <div
                key={i}
                className={`relative flex items-start gap-6 md:gap-12 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 bg-[#10B981] rounded-full ring-4 ring-white dark:ring-[#0F172A] z-10" />
                <div className="w-12 shrink-0 md:hidden" />

                <div className={`flex-1 md:w-[calc(50%-3rem)] ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="group p-5 bg-[#F9FAFB] dark:bg-[#1E293B] rounded-sm shadow-lg hover:shadow-xl transition-all">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-0.5 bg-[#0B5D1E]/15 dark:bg-[#10B981]/15 text-[#0B5D1E] dark:text-[#10B981] text-xs font-bold rounded-sm">
                        {m.year}
                      </span>
                      {m.featured && (
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" aria-label="Projeto destaque" />
                      )}
                    </div>
                    <h3 className="text-base font-bold text-[#1F2937] dark:text-white mb-2">
                      {m.title[locale]}
                    </h3>
                    <p className="text-sm text-[#6B7280] dark:text-[#94A3B8] leading-relaxed">
                      {m.description[locale]}
                    </p>
                    {m.tags && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {m.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-[#06B6D4]/10 dark:bg-[#22D3EE]/10 text-[#06B6D4] dark:text-[#22D3EE] text-[10px] font-medium rounded-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {m.images && <ImageCarousel images={m.images} />}
                    {m.links && (
                      <div className="flex gap-2 mt-3">
                        {m.links.demo && (
                          <a
                            href={m.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-[#0891B2] to-[#10B981] hover:brightness-110 text-white btn-keep-white rounded-sm transition-all text-xs font-medium"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Site
                          </a>
                        )}
                        {m.links.github && (
                          <a
                            href={m.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1 bg-[#24292e] hover:bg-[#1a1e22] text-white btn-keep-white rounded-sm transition-all text-xs font-medium"
                          >
                            <Github className="w-3 h-3" />
                            GitHub
                          </a>
                        )}
                      </div>
                    )}
                    {!m.images && m.links && <div className="hidden" />}
                  </div>
                </div>

                <div className="hidden md:block flex-1" />
              </div>
            ))}

            {/* Continuidade */}
            {showAll && (
            <div className="relative flex items-start gap-6 md:gap-12 md:flex-row">
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-[#0B5D1E] to-[#06B6D4] rounded-full ring-4 ring-white dark:ring-[#0F172A] z-10 animate-pulse" />
              <div className="w-12 shrink-0 md:hidden" />
              <div className="flex-1 md:w-[calc(50%-3rem)] md:pr-12">
                <p className="text-sm text-[#6B7280] dark:text-[#94A3B8] italic">
                  {locale === "pt"
                    ? "Novas histórias estão se construindo..."
                    : locale === "en"
                      ? "New stories are being built..."
                      : "Nuevas historias se están construyendo..."}
                </p>
              </div>
              <div className="hidden md:block flex-1" />
            </div>
            )}
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={handleToggle}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-transparent hover:bg-[#F9FAFB] dark:hover:bg-[#1E293B] text-[#1F2937] dark:text-white border-2 border-[#1F2937] dark:border-white rounded-sm transition-all duration-300 font-medium text-sm"
          >
            {showAll
              ? (locale === "pt" ? "Ver menos" : locale === "en" ? "View less" : "Ver menos")
              : (locale === "pt" ? "Ver trajetória completa" : locale === "en" ? "View full journey" : "Ver trayectoria completa")}
            <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>
    </section>
  );
}
