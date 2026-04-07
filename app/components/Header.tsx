"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "~/components/ThemeToggle";
import { useLanguage } from "~/lib/LanguageContext";
import GlitchText from "~/components/GlitchText";
import VersionBadge from "~/components/VersionBadge";
import { X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { t } = useLanguage();

  return (
    <>
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav aria-label="Navegação principal" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-20 md:h-24 relative">
          {/* Navegação Esquerda */}
          <div className="hidden md:flex items-center gap-8 absolute left-0">
            <a
              href="#sobre"
              className="text-[#1F2937] dark:text-white hover:text-[#0B5D1E] dark:hover:text-[#10B981] transition-colors font-medium"
            >
              {t.nav.about}
            </a>
            <a
              href="#projetos"
              className="text-[#1F2937] dark:text-white hover:text-[#0B5D1E] dark:hover:text-[#10B981] transition-colors font-medium"
            >
              {t.nav.projects}
            </a>
            <a
              href="#trajetoria"
              className="text-[#1F2937] dark:text-white hover:text-[#0B5D1E] dark:hover:text-[#10B981] transition-colors font-medium"
            >
              {t.nav.journey}
            </a>
          </div>

          {/* Logo e Toggle - Centralizado */}
          <div className="flex flex-col gap-1 items-center">
            <a
              href="#"
              className="text-xl md:text-2xl font-bold text-[#0B5D1E] dark:text-[#10B981] hover:scale-105 transition-transform flex items-end gap-1"
            >
              <GlitchText>ítalo</GlitchText><span className="text-[#06B6D4]"><GlitchText>{"<dev/>"}</GlitchText></span>
              <span className="relative"><VersionBadge /></span>
            </a>
            <ThemeToggle />
          </div>

          {/* Navegação Direita */}
          <div className="hidden md:flex items-center gap-8 absolute right-0">
            <a
              href="#skills"
              className="text-[#1F2937] dark:text-white hover:text-[#0B5D1E] dark:hover:text-[#10B981] transition-colors font-medium"
            >
              {t.nav.skills}
            </a>
            <a
              href="#contato"
              className="px-6 py-2 bg-gradient-to-r from-[#0891B2] to-[#10B981] hover:brightness-110 text-white rounded-sm transition-all font-medium"
            >
              {t.nav.contact}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 text-[#1F2937] dark:text-white absolute right-0"
            aria-label="Abrir menu de navegação"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>

    {/* Mobile Menu - fora do header */}
    {isMobileMenuOpen && (
      <div className="fixed inset-0 z-[60] md:hidden">
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-white dark:bg-[#0F172A] animate-slide-in"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
        >
          <div className="flex flex-col h-full p-8">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="self-end p-2 text-[#1F2937] dark:text-white mb-8"
              aria-label="Fechar menu de navegação"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>

            <nav className="flex flex-col gap-6 flex-1">
              <a
                href="#sobre"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-bold text-[#1F2937] dark:text-white hover:text-[#0B5D1E] dark:hover:text-[#10B981] transition-colors py-3"
              >
                {t.nav.about}
              </a>
              <a
                href="#projetos"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-bold text-[#1F2937] dark:text-white hover:text-[#0B5D1E] dark:hover:text-[#10B981] transition-colors py-3"
              >
                {t.nav.projects}
              </a>
              <a
                href="#skills"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-bold text-[#1F2937] dark:text-white hover:text-[#0B5D1E] dark:hover:text-[#10B981] transition-colors py-3"
              >
                {t.nav.skills}
              </a>
              <a
                href="#trajetoria"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-bold text-[#1F2937] dark:text-white hover:text-[#0B5D1E] dark:hover:text-[#10B981] transition-colors py-3"
              >
                {t.nav.journey}
              </a>
              <a
                href="#contato"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-bold text-[#1F2937] dark:text-white hover:text-[#0B5D1E] dark:hover:text-[#10B981] transition-colors py-3"
              >
                {t.nav.contact}
              </a>
            </nav>

            <div className="mt-auto">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
