import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { ThemeProvider } from "@/contexts/ThemeContext"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Ítalo - Desenvolvedor Full Stack",
  description: "Portfolio de Ítalo, desenvolvedor full stack com 5+ anos de experiência especializado em React, Next.js, Node.js e tecnologias modernas.",
  keywords: ["desenvolvedor", "full stack", "react", "nextjs", "nodejs", "typescript", "remix", "wordpress", "elementor"],
  authors: [{ name: "Ítalo" }],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: "Ítalo - Desenvolvedor Full Stack",
    description: "Portfolio de Ítalo, desenvolvedor full stack com 5+ anos de experiência especializado em React, Next.js, Node.js e tecnologias modernas.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}