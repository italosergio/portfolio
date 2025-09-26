"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"

const Skills = () => {
  const { t } = useLanguage()
  
  const skillCategories = [
    {
      title: t("frontend"),
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Remix"
      ]
    },
    {
      title: t("backend"), 
      skills: [
        "Node.js",
        "Python",
        "Express",
        "FastAPI",
        "GraphQL"
      ]
    },
    {
      title: t("database"),
      skills: [
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "Prisma",
        "Firebase"
      ]
    },
    {
      title: t("toolsCMS"),
      skills: [
        "Git",
        "Docker",
        "AWS",
        "WordPress",
        "Elementor"
      ]
    }
  ]

  return (
    <section id="skills" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t("skillsTitle").split(" ")[0]} <span className="gradient-text">{t("skillsTitle").split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("skillsDescription")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold mb-6 text-center gradient-text">
                {category.title}
              </h3>
              
              <div className="grid grid-cols-1 gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                    viewport={{ once: true }}
                    className="bg-secondary/50 rounded-lg p-3 text-center font-medium hover:bg-accent/50 transition-colors"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">5+</div>
              <div className="text-sm text-muted-foreground">{t("yearsExp")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">50+</div>
              <div className="text-sm text-muted-foreground">{t("projectsCompleted")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">100+</div>
              <div className="text-sm text-muted-foreground">{t("happyClients")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">35+</div>
              <div className="text-sm text-muted-foreground">{t("technologies")}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills