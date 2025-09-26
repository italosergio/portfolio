"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface AnimatedBackgroundProps {
  variant: "hero" | "about" | "projects" | "skills" | "contact"
  children: React.ReactNode
}

const AnimatedBackground = ({ variant, children }: AnimatedBackgroundProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const renderBackground = () => {
    switch (variant) {
      case "hero":
        return (
          <>
            {/* Floating Code Elements */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-orange-500/20 dark:text-orange-400/30 font-mono text-sm select-none"
                  initial={{ 
                    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                    y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                    opacity: 0
                  }}
                  animate={{
                    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                    y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                    opacity: [0, 0.7, 0],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 20 + Math.random() * 10,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                >
                  {["</>", "{}", "[]", "=>", "&&", "||", "!=", "==="][i % 8]}
                </motion.div>
              ))}
            </div>

            {/* Gradient Orbs with Parallax */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/30 to-blue-600/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl"
              animate={{
                x: mousePosition.x * 0.02,
                y: mousePosition.y * 0.02,
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl"
              animate={{
                x: mousePosition.x * -0.03,
                y: mousePosition.y * 0.01,
                scale: [1.2, 1, 1.2]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-orange-400/30 to-orange-600/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl"
              animate={{
                x: mousePosition.x * 0.01,
                y: mousePosition.y * -0.02,
                scale: [1, 1.3, 1]
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />

            {/* Binary Rain */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-orange-500 font-mono text-xs"
                  style={{ left: `${(i * 5) % 100}%` }}
                  animate={{
                    y: [-100, (typeof window !== 'undefined' ? window.innerHeight : 800) + 100],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 8 + Math.random() * 4,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                >
                  {Math.random() > 0.5 ? "1" : "0"}
                </motion.div>
              ))}
            </div>
          </>
        )

      case "about":
        return (
          <>
            {/* Circuit Board Pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1000 1000">
              <defs>
                <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M10,10 L90,10 L90,90 L10,90 Z" fill="none" stroke="currentColor" strokeWidth="1"/>
                  <circle cx="10" cy="10" r="3" fill="currentColor"/>
                  <circle cx="90" cy="90" r="3" fill="currentColor"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit)" className="text-orange-500"/>
            </svg>

            {/* Floating Geometric Shapes */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-20 h-20 border border-orange-500/20 rounded-lg"
                style={{
                  left: `${20 + (i * 10) % 60}%`,
                  top: `${20 + (i * 15) % 60}%`
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              />
            ))}

            {/* Parallax Gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-blue-600/10"
              animate={{
                x: mousePosition.x * 0.01,
                y: mousePosition.y * 0.01
              }}
            />
          </>
        )

      case "projects":
        return (
          <>
            {/* Code Window Mockups */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-32 h-20 bg-gray-900/20 dark:bg-gray-100/10 rounded border border-orange-500/20 backdrop-blur-sm"
                style={{
                  left: `${10 + (i * 15) % 80}%`,
                  top: `${10 + (i * 20) % 70}%`
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 8 + i,
                  repeat: Infinity,
                  delay: i * 0.8
                }}
              >
                <div className="w-full h-2 bg-orange-500/30 rounded-t"></div>
                <div className="p-2 space-y-1">
                  <div className="w-3/4 h-1 bg-orange-400/40 rounded"></div>
                  <div className="w-1/2 h-1 bg-blue-400/40 rounded"></div>
                  <div className="w-2/3 h-1 bg-orange-400/40 rounded"></div>
                </div>
              </motion.div>
            ))}

            {/* Network Connections */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
              {[...Array(10)].map((_, i) => (
                <motion.line
                  key={i}
                  x1={`${Math.random() * 100}%`}
                  y1={`${Math.random() * 100}%`}
                  x2={`${Math.random() * 100}%`}
                  y2={`${Math.random() * 100}%`}
                  stroke="url(#gradient)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                />
              ))}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.5"/>
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.5"/>
                </linearGradient>
              </defs>
            </svg>
          </>
        )

      case "skills":
        return (
          <>
            {/* Tech Icons Floating */}
            <div className="absolute inset-0 overflow-hidden">
              {["⚛️", "🔧", "💻", "🚀", "⚡", "🎯", "🔥", "💡"].map((icon, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl opacity-20"
                  style={{
                    left: `${15 + (i * 12) % 70}%`,
                    top: `${20 + (i * 15) % 60}%`
                  }}
                  animate={{
                    y: [0, -30, 0],
                    rotate: [0, 180, 360],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{
                    duration: 6 + i,
                    repeat: Infinity,
                    delay: i * 0.7
                  }}
                >
                  {icon}
                </motion.div>
              ))}
            </div>

            {/* Progress Bars Animation */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1 bg-gradient-to-r from-orange-500/30 to-blue-600/30 rounded"
                style={{
                  left: `${10 + (i * 8) % 80}%`,
                  top: `${15 + (i * 7) % 70}%`,
                  width: `${20 + Math.random() * 40}px`
                }}
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 0.6, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
          </>
        )

      case "contact":
        return (
          <>
            {/* Message Bubbles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-16 h-10 bg-orange-500/20 dark:bg-orange-400/30 rounded-full backdrop-blur-sm"
                style={{
                  left: `${20 + (i * 10) % 60}%`,
                  top: `${25 + (i * 12) % 50}%`
                }}
                animate={{
                  x: [0, 20, 0],
                  y: [0, -15, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 5 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.6
                }}
              >
                <div className="w-full h-full flex items-center justify-center text-xs opacity-60">
                  💬
                </div>
              </motion.div>
            ))}

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-15">
              <motion.path
                d="M100,100 Q300,50 500,100 T900,100"
                fill="none"
                stroke="url(#contactGradient)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <defs>
                <linearGradient id="contactGradient">
                  <stop offset="0%" stopColor="#f97316"/>
                  <stop offset="50%" stopColor="#2563eb"/>
                  <stop offset="100%" stopColor="#f97316"/>
                </linearGradient>
              </defs>
            </svg>
          </>
        )

      default:
        return null
    }
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {renderBackground()}
      </div>
      {children}
    </div>
  )
}

export default AnimatedBackground