"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "./ui/button"
import LanguageSelector from "./LanguageSelector"
import ThemeToggle from "./ThemeToggle"
import { useLanguage } from "@/contexts/LanguageContext"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: t("home"), href: "#home" },
    { name: t("about"), href: "#about" },
    { name: t("projects"), href: "#projects" },
    { name: t("skills"), href: "#skills" },
    { name: t("contact"), href: "#contact" }
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-lg" : "bg-background/60 backdrop-blur-sm"
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold gradient-text"
          >
            {"<Ítalo />"}
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ scale: 1.1 }}
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                {item.name}
              </motion.a>
            ))}
            <ThemeToggle />
            <LanguageSelector />
            <Button className="gradient-bg text-white" asChild>
              <a href="https://drive.google.com/file/d/1UMO-Zxa0N_8MbGmQo0_ItnOoGuAu7heA/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                {t("downloadCV")}
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <LanguageSelector />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-4"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-2 text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <Button className="gradient-bg text-white mt-4 w-full" asChild>
              <a href="https://drive.google.com/file/d/1UMO-Zxa0N_8MbGmQo0_ItnOoGuAu7heA/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                {t("downloadCV")}
              </a>
            </Button>
          </motion.div>
        )}
      </nav>
    </motion.header>
  )
}

export default Header