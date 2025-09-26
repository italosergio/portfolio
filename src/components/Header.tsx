"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "./ui/button"
import LanguageSelector from "./LanguageSelector"
import ThemeToggle from "./ThemeToggle"
import { useLanguage } from "@/contexts/LanguageContext"
import { usePathname } from "next/navigation"
import Link from "next/link"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()
  const pathname = usePathname()
  
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: t("home"), href: isHomePage ? "#home" : "/#home" },
    { name: t("about"), href: isHomePage ? "#about" : "/#about" },
    { name: t("projects"), href: isHomePage ? "#projects" : "/#projects" },
    { name: t("skills"), href: isHomePage ? "#skills" : "/#skills" },
    { name: t("contact"), href: isHomePage ? "#contact" : "/#contact" }
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-lg" : "bg-background/60 backdrop-blur-sm"
      }`}
    >
      <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between w-full min-w-0">
          <Link href={isHomePage ? "#home" : "/"} className="flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-lg sm:text-xl md:text-2xl font-bold gradient-text cursor-pointer"
            >
              {"<Ítalo />"}
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
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
            <Button className="modern-button shimmer text-white" asChild>
              <a href="/cv">
                {t("downloadCV")}
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-1 flex-shrink-0">
            <div className="flex items-center">
              <ThemeToggle />
              <LanguageSelector />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-1 flex-shrink-0"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mobile-menu"
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
            <Button className="modern-button shimmer text-white mt-4 w-full text-sm" asChild>
              <a href="/cv">
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