"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Globe } from "lucide-react"
import { Button } from "./ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import { Language } from "@/lib/translations"

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage } = useLanguage()

  const languages = [
    { code: "pt" as Language, name: "Português", flag: "🇧🇷" },
    { code: "en" as Language, name: "English", flag: "🇺🇸" },
    { code: "es" as Language, name: "Español", flag: "🇪🇸" }
  ]

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-8 h-8 p-0"
      >
        <span className="text-sm">
          {languages.find(lang => lang.code === language)?.flag}
        </span>
      </Button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full right-0 mt-2 bg-card border rounded-lg shadow-lg p-2 min-w-[120px] z-[60]"
          style={{ position: 'fixed', top: '60px', right: '16px' }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-3 py-2 rounded-md hover:bg-accent transition-colors flex items-center gap-2 ${
                language === lang.code ? "bg-accent" : ""
              }`}
            >
              <span>{lang.flag}</span>
              <span className="text-sm">{lang.name}</span>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default LanguageSelector