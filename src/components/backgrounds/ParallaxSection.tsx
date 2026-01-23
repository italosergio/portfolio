"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  speed?: number
}

const ParallaxSection = ({ children, className = "", speed = 0.5 }: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="relative z-10">
        {children}
      </motion.div>
      
      {/* Parallax Background Elements */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "50%"]) }}
      >
        {/* Floating Tech Elements */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-orange-500/10 dark:text-orange-400/20 font-mono text-lg select-none"
              style={{
                left: `${10 + (i * 8) % 80}%`,
                top: `${10 + (i * 12) % 80}%`
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                delay: i * 0.8
              }}
            >
              {["</>", "{}", "[]", "=>", "&&", "||", "!=", "===", "fn", "var", "let", "const"][i]}
            </motion.div>
          ))}
        </div>

        {/* Gradient Mesh */}
        <div className="absolute inset-0 gradient-mesh opacity-30" />
        
        {/* Circuit Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.3"/>
              <stop offset="50%" stopColor="#2563eb" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.3"/>
            </linearGradient>
          </defs>
          {[...Array(8)].map((_, i) => (
            <motion.path
              key={i}
              d={`M${i * 125},0 L${i * 125},100% M0,${i * 100} L100%,${i * 100}`}
              stroke="url(#circuitGradient)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5
              }}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  )
}

export default ParallaxSection