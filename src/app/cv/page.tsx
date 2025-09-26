"use client"

import { motion } from "framer-motion"
import { Download, ArrowLeft, Mail, Phone, MapPin, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import Link from "next/link"
import Header from "@/components/Header"
import Image from "next/image"

const CVPage = () => {
  const { t } = useLanguage()

  const handleDownloadPDF = () => {
    const link = document.createElement('a')
    link.href = '/cv-italo-desenvolvedor.pdf'
    link.download = 'CV-Italo-Desenvolvedor-FullStack.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <Header />
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Meu <span className="gradient-text">Currículo</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Desenvolvedor Full Stack com 5+ anos de experiência
                </p>
                
                <Button 
                  onClick={handleDownloadPDF}
                  className="modern-button shimmer text-white"
                  size="lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
              
              <div className="flex justify-center md:justify-end">
                <Image
                  src="/profile.png"
                  alt="Ítalo Sérgio"
                  width={256}
                  height={256}
                  className="w-64 h-64 object-contain"
                  style={{
                    maskImage: 'linear-gradient(to bottom, white 70%, transparent 100%)'
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* CV Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-xl p-8 shadow-lg"
          >
            {/* Header */}
            <div className="text-center mb-8 pb-6 border-b border-border">
              <h2 className="text-3xl font-bold mb-2">Ítalo Sérgio</h2>
              <p className="text-xl text-muted-foreground mb-4">Desenvolvedor Full Stack</p>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  italosergio@mail.com
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  +55 (88) 99469-3031
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Brasil
                </div>
                <div className="flex items-center gap-1">
                  <Github className="w-4 h-4" />
                  github.com/italosergio
                </div>
                <div className="flex items-center gap-1">
                  <Linkedin className="w-4 h-4" />
                  linkedin.com/in/italosergio
                </div>
              </div>
            </div>

            {/* Resumo */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-3 gradient-text">Resumo Profissional</h3>
              <p className="text-muted-foreground">
                Desenvolvedor Full Stack com mais de 5 anos de experiência, especializado em criar aplicações web e mobile modernas. 
                Tenho paixão por tecnologia e sempre busco aprender novas ferramentas e metodologias para entregar soluções de alta qualidade. 
                Hoje também trabalho com consultoria e treinamento de pessoas iniciantes na programação.
              </p>
            </div>

            {/* Experiência */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 gradient-text">Experiência Profissional</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold">Desenvolvedor Full Stack - Freelancer</h4>
                  <p className="text-sm text-muted-foreground mb-2">2019 - Presente</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Desenvolvimento de aplicações web com React, Next.js e Remix</li>
                    <li>• Criação de APIs REST com Node.js e Python</li>
                    <li>• Migração e otimização de sistemas legados</li>
                    <li>• Consultoria em arquitetura de software</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold">Colaborador - Ameciclo</h4>
                  <p className="text-sm text-muted-foreground mb-2">2022 - Presente</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Migração do site principal de Next.js para Remix</li>
                    <li>• Desenvolvimento de plataformas de observatório de dados</li>
                    <li>• Integração com APIs governamentais</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 gradient-text">Habilidades Técnicas</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Frontend</h4>
                  <p className="text-sm text-muted-foreground">React, Next.js, TypeScript, Tailwind CSS, Remix.js</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Backend</h4>
                  <p className="text-sm text-muted-foreground">Node.js, Python, Express.js, FastAPI, GraphQL</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Database</h4>
                  <p className="text-sm text-muted-foreground">PostgreSQL, MongoDB, Redis, Prisma, Firebase</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Tools & CMS</h4>
                  <p className="text-sm text-muted-foreground">Git, Docker, AWS, WordPress, Elementor</p>
                </div>
              </div>
            </div>

            {/* Projetos */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 gradient-text">Projetos Destacados</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Ameciclo.org</h4>
                  <p className="text-sm text-muted-foreground">Migração e fusão de plataformas usando Remix, TypeScript e PostgreSQL</p>
                </div>
                
                <div>
                  <h4 className="font-semibold">LOA Clima & DOM Ameciclo</h4>
                  <p className="text-sm text-muted-foreground">Plataformas de observatório de dados orçamentários com React e Node.js</p>
                </div>
                
                <div>
                  <h4 className="font-semibold">LS Tech Digital</h4>
                  <p className="text-sm text-muted-foreground">Site corporativo moderno com Next.js e Framer Motion</p>
                </div>
              </div>
            </div>

            {/* Educação */}
            <div>
              <h3 className="text-xl font-bold mb-4 gradient-text">Formação</h3>
              <div>
                <h4 className="font-semibold">Tecnologia em Desenvolvimento de Software</h4>
                <p className="text-sm text-muted-foreground">Autodidata e cursos especializados</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default CVPage