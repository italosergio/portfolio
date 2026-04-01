import { jsPDF } from "jspdf";
import type { Locale } from "./i18n";

const COLORS = {
  green: [11, 93, 30] as [number, number, number],
  cyan: [8, 145, 178] as [number, number, number],
  dark: [31, 41, 55] as [number, number, number],
  gray: [107, 114, 128] as [number, number, number],
  light: [249, 250, 251] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
};

const t = {
  pt: {
    title: "Portfólio Completo",
    subtitle: "Desenvolvedor Full Stack",
    about: "Sobre",
    aboutText: "Experiência sólida em desenvolvimento de plataformas que transformam dados públicos em ferramentas para políticas públicas sustentáveis. Especializado em mapas interativos, visualização de dados e acessibilidade, atuando com movimentos e organizações focados em mobilidade urbana e impacto social.",
    projects: "Projetos",
    skills: "Stack Tecnológico",
    journey: "Trajetória",
    contact: "Contato",
    download: "Baixar Portfólio PDF",
    values: ["Sustentabilidade", "Ativismo", "Dados Públicos", "Impacto Social"],
    skillAreas: [
      { name: "Plataformas de Dados", tech: "APIs REST, Firebase, Firestore, Node.js, TypeScript" },
      { name: "Mapas Interativos", tech: "MapLibre, GeoJSON, Dados Abertos" },
      { name: "Aplicações Web", tech: "React, Remix, Next.js, React Router, Tailwind CSS" },
      { name: "Qualidade & Entrega", tech: "Vercel, Docker, GitHub Actions, CI/CD, SEO" },
    ],
  },
  en: {
    title: "Full Portfolio",
    subtitle: "Full Stack Developer",
    about: "About",
    aboutText: "Solid experience in platform development that transforms public data into tools for sustainable public policies. Specialized in interactive maps, data visualization and accessibility, working with movements and organizations focused on urban mobility and social impact.",
    projects: "Projects",
    skills: "Tech Stack",
    journey: "Journey",
    contact: "Contact",
    download: "Download Portfolio PDF",
    values: ["Sustainability", "Activism", "Public Data", "Social Impact"],
    skillAreas: [
      { name: "Data Platforms", tech: "REST APIs, Firebase, Firestore, Node.js, TypeScript" },
      { name: "Interactive Maps", tech: "MapLibre, GeoJSON, Open Data" },
      { name: "Web Applications", tech: "React, Remix, Next.js, React Router, Tailwind CSS" },
      { name: "Quality & Delivery", tech: "Vercel, Docker, GitHub Actions, CI/CD, SEO" },
    ],
  },
  es: {
    title: "Portafolio Completo",
    subtitle: "Desarrollador Full Stack",
    about: "Sobre Mí",
    aboutText: "Experiencia sólida en desarrollo de plataformas que transforman datos públicos en herramientas para políticas públicas sostenibles. Especializado en mapas interactivos, visualización de datos y accesibilidad, trabajando con movimientos y organizaciones enfocados en movilidad urbana e impacto social.",
    projects: "Proyectos",
    skills: "Stack Tecnológico",
    journey: "Trayectoria",
    contact: "Contacto",
    download: "Descargar Portafolio PDF",
    values: ["Sostenibilidad", "Activismo", "Datos Públicos", "Impacto Social"],
    skillAreas: [
      { name: "Plataformas de Datos", tech: "APIs REST, Firebase, Firestore, Node.js, TypeScript" },
      { name: "Mapas Interactivos", tech: "MapLibre, GeoJSON, Datos Abiertos" },
      { name: "Aplicaciones Web", tech: "React, Remix, Next.js, React Router, Tailwind CSS" },
      { name: "Calidad & Entrega", tech: "Vercel, Docker, GitHub Actions, CI/CD, SEO" },
    ],
  },
} as const;

const projects: Record<Locale, Array<{ name: string; desc: string; tech: string; links: string }>> = {
  pt: [
    { name: "Ciclodados", desc: "Observatório de dados abertos sobre mobilidade urbana com mapas interativos e visualização geográfica.", tech: "Remix, TypeScript, React, Tailwind CSS", links: "ameciclo.org/dados/ciclodados" },
    { name: "Ciclista, Denuncie!", desc: "Mapeamento colaborativo de violência no trânsito com autenticação e mapa interativo.", tech: "React Router, TypeScript, Firebase, Tailwind CSS", links: "ciclistadenuncie.vercel.app" },
    { name: "Ameciclo", desc: "Migração Next.js → Remix com melhorias de UX, performance e acessibilidade.", tech: "Remix, TypeScript, React, Tailwind CSS", links: "ameciclo.org" },
    { name: "Bici nos Planos MS", desc: "Plataforma de advocacy com visualização de dados para mobilidade sustentável.", tech: "React Router, TypeScript, Tailwind CSS", links: "bicinosplanosms.vercel.app" },
    { name: "DOM", desc: "Plataforma de análise de orçamentos municipais com dados abertos.", tech: "React, Tailwind CSS", links: "dom.ameciclo.org" },
    { name: "Bicicultura Brasília 2024", desc: "Plataforma do 14º Fórum Mundial da Bicicleta.", tech: "WordPress, Divi, MySQL", links: "bicicultura.org.br" },
  ],
  en: [
    { name: "Ciclodados", desc: "Open data observatory on urban mobility with interactive maps and geographic visualization.", tech: "Remix, TypeScript, React, Tailwind CSS", links: "ameciclo.org/dados/ciclodados" },
    { name: "Ciclista, Denuncie!", desc: "Collaborative mapping of traffic violence with authentication and interactive map.", tech: "React Router, TypeScript, Firebase, Tailwind CSS", links: "ciclistadenuncie.vercel.app" },
    { name: "Ameciclo", desc: "Next.js → Remix migration with UX, performance and accessibility improvements.", tech: "Remix, TypeScript, React, Tailwind CSS", links: "ameciclo.org" },
    { name: "Bici nos Planos MS", desc: "Advocacy platform with data visualization for sustainable mobility.", tech: "React Router, TypeScript, Tailwind CSS", links: "bicinosplanosms.vercel.app" },
    { name: "DOM", desc: "Municipal budget analysis platform with open data.", tech: "React, Tailwind CSS", links: "dom.ameciclo.org" },
    { name: "Bicicultura Brasília 2024", desc: "14th World Bicycle Forum platform.", tech: "WordPress, Divi, MySQL", links: "bicicultura.org.br" },
  ],
  es: [
    { name: "Ciclodados", desc: "Observatorio de datos abiertos sobre movilidad urbana con mapas interactivos.", tech: "Remix, TypeScript, React, Tailwind CSS", links: "ameciclo.org/dados/ciclodados" },
    { name: "Ciclista, Denuncie!", desc: "Mapeo colaborativo de violencia vial con autenticación y mapa interactivo.", tech: "React Router, TypeScript, Firebase, Tailwind CSS", links: "ciclistadenuncie.vercel.app" },
    { name: "Ameciclo", desc: "Migración Next.js → Remix con mejoras de UX, rendimiento y accesibilidad.", tech: "Remix, TypeScript, React, Tailwind CSS", links: "ameciclo.org" },
    { name: "Bici nos Planos MS", desc: "Plataforma de advocacy con visualización de datos para movilidad sostenible.", tech: "React Router, TypeScript, Tailwind CSS", links: "bicinosplanosms.vercel.app" },
    { name: "DOM", desc: "Plataforma de análisis de presupuestos municipales con datos abiertos.", tech: "React, Tailwind CSS", links: "dom.ameciclo.org" },
    { name: "Bicicultura Brasília 2024", desc: "Plataforma del 14º Foro Mundial de la Bicicleta.", tech: "WordPress, Divi, MySQL", links: "bicicultura.org.br" },
  ],
};

const journeyItems: Record<Locale, Array<{ year: string; title: string; desc: string }>> = {
  pt: [
    { year: "2014–2020", title: "Engenharia Elétrica", desc: "5 anos de atuação na área antes de migrar para desenvolvimento de software." },
    { year: "2018", title: "Ameciclo — Associado e Voluntário", desc: "Entrada no universo da mobilidade urbana." },
    { year: "2018–2022", title: "Formação em Desenvolvimento Web", desc: "Especialização em programação e desenvolvimento web." },
    { year: "2023", title: "IDECICLO App", desc: "Primeiro app de avaliação cicloviária do Brasil." },
    { year: "2023", title: "LOA Clima", desc: "Plataforma de monitoramento orçamentário pró-clima." },
    { year: "2024", title: "DOM — Diagnóstico Orçamentário Municipal", desc: "Plataformas de transparência orçamentária municipal." },
    { year: "2024", title: "14º Fórum Mundial da Bicicleta", desc: "Desenvolvimento da plataforma e coordenação de oficinas." },
    { year: "2025", title: "Ameciclo — Full Stack Developer", desc: "Contrato de 12 meses: migração e entrega do Ciclodados." },
  ],
  en: [
    { year: "2014–2020", title: "Electrical Engineering", desc: "5 years before transitioning to software development." },
    { year: "2018", title: "Ameciclo — Member and Volunteer", desc: "Entry into the urban mobility universe." },
    { year: "2018–2022", title: "Web Development Training", desc: "Specialization in programming and web development." },
    { year: "2023", title: "IDECICLO App", desc: "First cycling infrastructure evaluation app in Brazil." },
    { year: "2023", title: "LOA Clima", desc: "Climate budget monitoring platform." },
    { year: "2024", title: "DOM — Municipal Budget Diagnosis", desc: "Municipal budget transparency platforms." },
    { year: "2024", title: "14th World Bicycle Forum", desc: "Platform development and workshop coordination." },
    { year: "2025", title: "Ameciclo — Full Stack Developer", desc: "12-month contract: migration and delivery of Ciclodados." },
  ],
  es: [
    { year: "2014–2020", title: "Ingeniería Eléctrica", desc: "5 años antes de migrar al desarrollo de software." },
    { year: "2018", title: "Ameciclo — Asociado y Voluntario", desc: "Entrada al universo de la movilidad urbana." },
    { year: "2018–2022", title: "Formación en Desarrollo Web", desc: "Especialización en programación y desarrollo web." },
    { year: "2023", title: "IDECICLO App", desc: "Primera app de evaluación ciclovial de Brasil." },
    { year: "2023", title: "LOA Clima", desc: "Plataforma de monitoreo presupuestario pro-clima." },
    { year: "2024", title: "DOM — Diagnóstico Presupuestario Municipal", desc: "Plataformas de transparencia presupuestaria." },
    { year: "2024", title: "14º Foro Mundial de la Bicicleta", desc: "Desarrollo de plataforma y coordinación de talleres." },
    { year: "2025", title: "Ameciclo — Desarrollador Full Stack", desc: "Contrato de 12 meses: migración y entrega de Ciclodados." },
  ],
};

function addPage(doc: jsPDF, y: number, margin: number): number {
  if (y > 270) {
    doc.addPage();
    return margin;
  }
  return y;
}

export function generatePortfolioPdf(locale: Locale) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210;
  const M = 18;
  const content = W - M * 2;
  const i = t[locale];
  let y = 0;

  // Header
  doc.setFillColor(...COLORS.dark);
  doc.rect(0, 0, W, 52, "F");

  doc.setTextColor(...COLORS.white);
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text("Ítalo Sérgio Chaves da Silva", M, 22);

  doc.setFontSize(13);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(148, 163, 184);
  doc.text(i.subtitle, M, 31);

  doc.setFontSize(9);
  doc.text("italosergio1@gmail.com  |  github.com/italosergio  |  linkedin.com/in/italosergio  |  italosergio.com.br", M, 42);

  y = 62;

  // About
  doc.setTextColor(...COLORS.green);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(i.about, M, y);
  y += 3;
  doc.setDrawColor(...COLORS.green);
  doc.setLineWidth(0.5);
  doc.line(M, y, M + 30, y);
  y += 7;

  doc.setTextColor(...COLORS.dark);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const aboutLines = doc.splitTextToSize(i.aboutText, content);
  doc.text(aboutLines, M, y);
  y += aboutLines.length * 5 + 4;

  doc.setFontSize(9);
  doc.setTextColor(...COLORS.cyan);
  doc.text(i.values.join("  •  "), M, y);
  y += 12;

  // Skills
  y = addPage(doc, y, M);
  doc.setTextColor(...COLORS.green);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(i.skills, M, y);
  y += 3;
  doc.setDrawColor(...COLORS.green);
  doc.line(M, y, M + 30, y);
  y += 7;

  for (const area of i.skillAreas) {
    y = addPage(doc, y, M);
    doc.setTextColor(...COLORS.dark);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(area.name, M, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.gray);
    doc.text(area.tech, M + 2, y);
    y += 7;
  }
  y += 4;

  // Projects
  y = addPage(doc, y, M);
  doc.setTextColor(...COLORS.green);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(i.projects, M, y);
  y += 3;
  doc.setDrawColor(...COLORS.green);
  doc.line(M, y, M + 30, y);
  y += 7;

  for (const p of projects[locale]) {
    y = addPage(doc, y, M);
    doc.setTextColor(...COLORS.dark);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(p.name, M, y);
    y += 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.gray);
    const descLines = doc.splitTextToSize(p.desc, content);
    doc.text(descLines, M + 2, y);
    y += descLines.length * 4 + 2;

    doc.setTextColor(...COLORS.cyan);
    doc.setFontSize(8);
    doc.text(`${p.tech}  —  ${p.links}`, M + 2, y);
    y += 8;
  }

  // Journey
  doc.addPage();
  y = M;
  doc.setTextColor(...COLORS.green);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(i.journey, M, y);
  y += 3;
  doc.setDrawColor(...COLORS.green);
  doc.line(M, y, M + 30, y);
  y += 7;

  for (const item of journeyItems[locale]) {
    y = addPage(doc, y, M);

    doc.setFillColor(...COLORS.green);
    doc.circle(M + 2, y - 1, 1.5, "F");

    doc.setTextColor(...COLORS.cyan);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(item.year, M + 6, y);

    doc.setTextColor(...COLORS.dark);
    doc.setFontSize(10);
    doc.text(item.title, M + 6, y + 5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.gray);
    const lines = doc.splitTextToSize(item.desc, content - 8);
    doc.text(lines, M + 6, y + 10);
    y += 10 + lines.length * 4 + 6;
  }

  // Contact
  y = addPage(doc, y + 4, M);
  doc.setTextColor(...COLORS.green);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(i.contact, M, y);
  y += 3;
  doc.setDrawColor(...COLORS.green);
  doc.line(M, y, M + 30, y);
  y += 7;

  doc.setTextColor(...COLORS.dark);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const contacts = [
    "Email: italosergio1@gmail.com",
    "WhatsApp: +55 88 99469-3031",
    "LinkedIn: linkedin.com/in/italosergio",
    "GitHub: github.com/italosergio",
  ];
  for (const c of contacts) {
    doc.text(c, M, y);
    y += 6;
  }

  doc.save("italo-sergio-portfolio.pdf");
}
