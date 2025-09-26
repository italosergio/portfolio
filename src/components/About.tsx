"use client"

import { motion } from "framer-motion"
import { Code, Database, Globe, Smartphone } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import AnimatedBackground from "./backgrounds/AnimatedBackground"

const About = () => {
  const { t } = useLanguage()
  
  const skills = [
    {
      icon: <Code className="w-8 h-8" />,
      title: t("frontendDev"),
      description: "React, Next.js, TypeScript, Tailwind CSS"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: t("backendDev"), 
      description: "Node.js, Python, PostgreSQL, MongoDB"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t("webTech"),
      description: "REST APIs, GraphQL, WebSockets"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: t("mobileDev"),
      description: "React Native, Flutter"
    }
  ]

  return (
    <AnimatedBackground variant="about">
      <section id="about" className="py-20 bg-secondary/30 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t("aboutTitle").split(" ")[0]} <span className="gradient-text">{t("aboutTitle").split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("aboutDescription")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative flex justify-center">
              <div className="relative">
                <img 
                  src="/profile.png" 
                  alt="Ítalo - Desenvolvedor Full Stack" 
                  className="w-64 h-64 sm:w-80 sm:h-80 object-contain"
                  style={{
                    maskImage: 'linear-gradient(to bottom, white 70%, transparent 100%)'
                  }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-4">{t("mySpecialties")}</h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <p className="text-muted-foreground text-sm">
                {t("aboutHobbies")}
              </p>
            </motion.div>
            
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4 p-4 rounded-lg glass-morphism backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/30 transition-colors"
              >
                <div className="text-primary">{skill.icon}</div>
                <div>
                  <h4 className="font-semibold mb-2">{skill.title}</h4>
                  <p className="text-muted-foreground">{skill.description}</p>
                </div>
              </motion.div>
            ))}


          </motion.div>
        </div>
      </div>
      </section>
    </AnimatedBackground>
  )
}

export default About