import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
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
  title: "Italo - Desenvolvedor Full Stack",
  description: "Portfolio de Italo, desenvolvedor full stack especializado em React, Next.js, Node.js e tecnologias modernas.",
  keywords: ["desenvolvedor", "full stack", "react", "nextjs", "nodejs", "typescript"],
  authors: [{ name: "Italo" }],
  openGraph: {
    title: "Italo - Desenvolvedor Full Stack",
    description: "Portfolio de Italo, desenvolvedor full stack especializado em React, Next.js, Node.js e tecnologias modernas.",
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
        {children}
      </body>
    </html>
  )
}