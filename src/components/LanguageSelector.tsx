"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Globe } from "lucide-react"
import { Button } from "./ui/button"

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState("pt")

  const languages = [
    { code: "pt", name: "Português", flag: "🇧🇷" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" }
  ]

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode)
    setIsOpen(false)
    // Aqui você implementaria a lógica de mudança de idioma
    console.log(`Idioma alterado para: ${langCode}`)
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">
          {languages.find(lang => lang.code === currentLang)?.flag}
        </span>
      </Button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full right-0 mt-2 bg-card border rounded-lg shadow-lg p-2 min-w-[150px] z-50"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-3 py-2 rounded-md hover:bg-accent transition-colors flex items-center gap-2 ${
                currentLang === lang.code ? "bg-accent" : ""
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