"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { t } = useLanguage()

  return (
    <footer className="bg-secondary/50 py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="mb-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold gradient-text inline-block"
            >
              {"<Ítalo />"}
            </motion.div>
          </div>
          
          <p className="text-muted-foreground mb-4">
            {t("footerDescription")}
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <span>© {currentYear} {t("madeWith")}</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </motion.div>
            <span>{t("by")} Ítalo</span>
          </div>
          
          <div className="mt-4 text-xs text-muted-foreground">
            <p>{t("builtWith")}</p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer