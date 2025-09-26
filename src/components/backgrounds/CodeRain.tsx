"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const CodeRain = () => {
  const [columns, setColumns] = useState<number>(0)

  useEffect(() => {
    const updateColumns = () => {
      setColumns(Math.floor(window.innerWidth / 20))
    }
    
    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [])

  const codeChars = [
    '0', '1', '{', '}', '[', ']', '(', ')', '<', '>', '/', '\\',
    '=', '+', '-', '*', '&', '|', '^', '~', '!', '?', ':', ';',
    'function', 'const', 'let', 'var', 'if', 'else', 'for', 'while',
    'class', 'import', 'export', 'return', 'true', 'false', 'null'
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20 z-0">
      {[...Array(columns)].map((_, i) => (
        <div
          key={i}
          className="absolute top-0 font-mono text-xs text-orange-500 dark:text-orange-400"
          style={{ left: `${i * 20}px` }}
        >
          {[...Array(Math.floor(Math.random() * 10) + 5)].map((_, j) => (
            <motion.div
              key={j}
              className="block h-5 leading-5"
              initial={{ y: -100, opacity: 0 }}
              animate={{ 
                y: window.innerHeight + 100, 
                opacity: [0, 1, 1, 0] 
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
            >
              {codeChars[Math.floor(Math.random() * codeChars.length)]}
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default CodeRain