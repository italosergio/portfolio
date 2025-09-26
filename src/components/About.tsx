"use client"

import { motion } from "framer-motion"
import { Code, Database, Globe, Smartphone } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

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
    <section id="about" className="py-20 bg-secondary/30">
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
              <div className="w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-br from-blue-900 to-indigo-800 dark:from-blue-400 dark:to-indigo-400 rounded-full opacity-20 dark:opacity-10 absolute -top-4 -left-4"></div>
              <div className="w-64 h-64 sm:w-80 sm:h-80 bg-secondary rounded-full flex items-center justify-center relative overflow-hidden">
                <img 
                  src="/profile.png" 
                  alt="Ítalo - Desenvolvedor Full Stack" 
                  className="w-full h-full object-cover"
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
            <h3 className="text-2xl font-bold mb-6">{t("mySpecialties")}</h3>
            
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4 p-4 rounded-lg bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="text-primary">{skill.icon}</div>
                <div>
                  <h4 className="font-semibold mb-2">{skill.title}</h4>
                  <p className="text-muted-foreground">{skill.description}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <p className="text-muted-foreground">
                {t("aboutHobbies")}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About