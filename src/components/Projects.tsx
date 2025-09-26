"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "./ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import Link from "next/link"

const Projects = () => {
  const { t } = useLanguage()
  const projects = [
    {
      title: "Ameciclo.org",
      description: "Colaboração no desenvolvimento e migração do site do framework Next para Remix e fusão de plataformas loaclima, dom e dados em ameciclo.org.",
      image: "/ameciclo.org.png",
      technologies: ["Remix", "TypeScript", "Tailwind CSS", "PostgreSQL"],
      github: "https://github.com/Ameciclo/ameciclo",
      demo: "https://ameciclo.org",
      featured: true
    },

    {
      title: "DOM Ameciclo",
      description: "Plataforma de observatório de dados orçamentários em âmbito estadual, similar ao LOA Clima mas com foco estadual.",
      image: "/dom.ameciclo.org.png",
      technologies: ["React", "Node.js", "PostgreSQL", "Chart.js"],
      github: "https://github.com/Ameciclo/dom",
      demo: "https://dom.ameciclo.org"
    },
    {
      title: "LS Tech Digital",
      description: "Site estilo linktree para empresa de Marketing Digital com design moderno e responsivo.",
      image: "/lstechdigital.com.br.png",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/italosergio/lstech-linkinbio",
      demo: "https://www.lstechdigital.com.br"
    },
    {
      title: "Bicicultura.org.br",
      description: "Portal de conteúdo sobre cultura da bicicleta com artigos, notícias e recursos educativos.",
      image: "/bicicultura.org.br.png",
      technologies: ["WordPress", "PHP", "MySQL", "Elementor"],
      github: "#",
      demo: "https://bicicultura.org.br"
    }
  ]

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t("projectsTitle").split(" ")[0]} <span className="gradient-text">{t("projectsTitle").split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("projectsDescription")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group relative overflow-hidden rounded-lg bg-card border hover:shadow-xl transition-all duration-300 ${
                project.featured ? "md:col-span-2 lg:col-span-3" : ""
              }`}
            >
              <div className={`${project.featured ? "md:flex md:items-center" : ""}`}>
                <div className={`relative overflow-hidden ${project.featured ? "md:w-1/2" : ""}`}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className={`w-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out ${
                      project.featured ? "aspect-video" : "aspect-[4/3]"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/30 to-transparent group-hover:from-white/50 group-hover:via-white/20 dark:from-black/70 dark:via-black/30 dark:to-transparent dark:group-hover:from-black/50 dark:group-hover:via-black/20 transition-all duration-200"></div>
                </div>
                
                <div className={`p-4 ${project.featured ? "md:w-1/2 md:p-8" : ""}`}>
                  <h3 className={`font-bold mb-2 group-hover:text-primary transition-colors ${
                    project.featured ? "text-xl mb-3" : "text-lg"
                  }`}>
                    {project.title}
                  </h3>
                  <p className={`text-muted-foreground mb-3 text-sm ${
                    project.featured ? "mb-4 text-base" : ""
                  }`}>
                    {project.description}
                  </p>
                  
                  <div className={`flex flex-wrap gap-1 mb-3 ${
                    project.featured ? "gap-2 mb-4" : ""
                  }`}>
                    {project.technologies.slice(0, project.featured ? 4 : 3).map((tech) => (
                      <span
                        key={tech}
                        className={`bg-secondary rounded-md text-secondary-foreground ${
                          project.featured ? "px-3 py-1 text-sm" : "px-2 py-1 text-xs"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className={`flex gap-2 ${
                    project.featured ? "gap-3" : ""
                  }`}>
                    <Button variant="outline" size="sm" className={`${
                      project.featured ? "text-sm px-4 py-2 h-10" : "text-xs px-3 py-1 h-8"
                    }`} asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className={`mr-1 ${
                          project.featured ? "w-4 h-4" : "w-3 h-3"
                        }`} />
                        {t("code")}
                      </a>
                    </Button>
                    <Button size="sm" className={`modern-button text-white ${
                      project.featured ? "text-sm px-4 py-2 h-10" : "text-xs px-3 py-1 h-8"
                    }`} asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className={`mr-1 ${
                          project.featured ? "w-4 h-4" : "w-3 h-3"
                        }`} />
                        {t("demo")}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" className="modern-button shimmer text-white" asChild>
            <Link href="/projects">{t("viewAllProjects")}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects