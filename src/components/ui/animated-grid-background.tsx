"use client"

import React, { useId } from "react"
import { motion } from "framer-motion"

interface AnimatedGridBackgroundProps {
  width?: number
  height?: number
  numSquares?: number
  maxOpacity?: number
  duration?: number
  repeatDelay?: number
}

export function AnimatedGridBackground({
  width = 40,
  height = 40,
  numSquares = 80,
  maxOpacity = 0.85,
  duration = 3,
  repeatDelay = 0.5,
}: AnimatedGridBackgroundProps) {
  const id = useId()

  const squares = React.useMemo(() => {
    return Array.from({ length: numSquares }, (_, i) => ({
      id: i,
      col: Math.floor(Math.random() * 50),
      row: Math.floor(Math.random() * 60),
      delay: Math.random() * 4,
    }))
  }, [numSquares])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: -1,
        backgroundColor: 'var(--bg-primary)',
        transition: 'background-color var(--transition-base)',
      }}
    >
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <defs>
          <pattern
            id={id}
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M.5 ${height}V.5H${width}`}
              fill="none"
              stroke="var(--border)"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        {/* Base grid lines */}
        <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />

        {/* Glowing animated squares responsive to active theme accent */}
        {squares.map((sq) => (
          <motion.rect
            key={sq.id}
            width={width - 1}
            height={height - 1}
            x={sq.col * width + 1}
            y={sq.row * height + 1}
            fill="var(--accent-dim)"
            stroke="var(--accent)"
            strokeWidth="1.2"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, maxOpacity, 0] }}
            transition={{
              duration: duration + (sq.id % 3),
              repeat: Infinity,
              repeatDelay: repeatDelay + (sq.id % 2),
              delay: sq.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  )
}
