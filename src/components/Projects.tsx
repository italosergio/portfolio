"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "./ui/button"

const Projects = () => {
  const projects = [
    {
      title: "E-commerce Platform",
      description: "Plataforma completa de e-commerce com painel administrativo, sistema de pagamentos e gestão de estoque.",
      image: "/api/placeholder/400/250",
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      github: "https://github.com/seu-usuario/projeto1",
      demo: "https://projeto1-demo.com",
      featured: true
    },
    {
      title: "Task Management App",
      description: "Aplicativo de gerenciamento de tarefas com colaboração em tempo real e notificações push.",
      image: "/api/placeholder/400/250", 
      technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
      github: "https://github.com/seu-usuario/projeto2",
      demo: "https://projeto2-demo.com"
    },
    {
      title: "Weather Dashboard",
      description: "Dashboard interativo de clima com previsões detalhadas e mapas meteorológicos.",
      image: "/api/placeholder/400/250",
      technologies: ["Vue.js", "Python", "FastAPI", "Chart.js"],
      github: "https://github.com/seu-usuario/projeto3",
      demo: "https://projeto3-demo.com"
    },
    {
      title: "Social Media Analytics",
      description: "Ferramenta de análise de redes sociais com relatórios automatizados e insights em tempo real.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "D3.js", "Express", "Redis"],
      github: "https://github.com/seu-usuario/projeto4",
      demo: "https://projeto4-demo.com"
    }
  ]

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Meus <span className="gradient-text">Projetos</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Aqui estão alguns dos projetos que desenvolvi, demonstrando minhas 
            habilidades em diferentes tecnologias e áreas de desenvolvimento.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group relative overflow-hidden rounded-xl bg-card border hover:shadow-2xl transition-all duration-300 ${
                project.featured ? "md:col-span-2" : ""
              }`}
            >
              <div className={`${project.featured ? "md:flex" : ""}`}>
                <div className={`relative overflow-hidden ${project.featured ? "md:w-1/2" : ""}`}>
                  <div className="aspect-video bg-gradient-to-br from-purple-400 to-pink-400 opacity-80"></div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                </div>
                
                <div className={`p-6 ${project.featured ? "md:w-1/2 md:flex md:flex-col md:justify-center" : ""}`}>
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
                        Código
                      </a>
                    </Button>
                    <Button size="sm" className="gradient-bg text-white" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
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
          <Button variant="outline" size="lg">
            Ver Todos os Projetos
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects