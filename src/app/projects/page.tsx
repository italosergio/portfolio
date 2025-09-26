"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import Link from "next/link"
import Header from "@/components/Header"

const ProjectsPage = () => {
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
      title: "LOA Clima",
      description: "Plataforma observatório dos dados da lei orçamentária anual do estado de Pernambuco consumindo dados abertos da API do estado.",
      image: "/loaclima.ameciclo.org.png", 
      technologies: ["React", "Node.js", "Chart.js", "API REST"],
      github: "https://github.com/Ameciclo/raio",
      demo: "https://loaclima.ameciclo.org"
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
    <>
      <Header />
      <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >

          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Todos os <span className="gradient-text">Projetos</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("projectsDescription")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl bg-card border hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-secondary rounded-full text-secondary-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      {t("code")}
                    </a>
                  </Button>
                  <Button size="sm" className="gradient-bg text-white" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t("demo")}
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default ProjectsPage