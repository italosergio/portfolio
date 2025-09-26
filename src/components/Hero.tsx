"use client"

import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "./ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import AnimatedBackground from "./backgrounds/AnimatedBackground"

const Hero = () => {
  const { t } = useLanguage()
  
  return (
    <AnimatedBackground variant="hero">
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">

      <div className="container mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {t("heroTitle")}{" "}
            <span className="gradient-text">Ítalo</span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {t("heroSubtitle")}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button size="lg" className="gradient-bg text-white glow-effect" asChild>
              <a href="#projects">{t("viewProjects")}</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#contact">{t("getInTouch")}</a>
            </Button>
          </motion.div>

          <motion.div
            className="flex justify-center space-x-4 sm:space-x-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.a
              href="https://github.com/italosergio"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="p-3 rounded-full bg-secondary hover:bg-accent transition-colors"
            >
              <Github className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/italosergio"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -5 }}
              className="p-3 rounded-full bg-secondary hover:bg-accent transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="mailto:italosergio@mail.com"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="p-3 rounded-full bg-secondary hover:bg-accent transition-colors"
            >
              <Mail className="w-6 h-6" />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </div>
      </section>
    </AnimatedBackground>
  )
}

export default Hero