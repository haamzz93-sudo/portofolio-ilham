import { motion } from "framer-motion"

export function FloatingPathsBackground({
  position = 1,
}: {
  position?: number
}) {
  const paths1 = Array.from({ length: 24 }, (_, i) => ({
    id: `p1-${i}`,
    d: `M-${380 - i * 8 * position} -${189 + i * 8}C-${
      380 - i * 8 * position
    } -${189 + i * 8} -${312 - i * 8 * position} ${216 - i * 8} ${
      152 - i * 8 * position
    } ${343 - i * 8}C${616 - i * 8 * position} ${470 - i * 8} ${
      684 - i * 8 * position
    } ${875 - i * 8} ${684 - i * 8 * position} ${875 - i * 8}`,
    width: 2.2 + i * 0.08,
  }))

  const paths2 = Array.from({ length: 20 }, (_, i) => ({
    id: `p2-${i}`,
    d: `M${1100 + i * 10 * position} -${100 + i * 10}C${
      800 + i * 8 * position
    } ${200 + i * 8} ${400 - i * 8 * position} ${400 - i * 8} ${
      100 - i * 8 * position
    } ${700 + i * 8}C-${100 + i * 8 * position} ${900 + i * 8} -${
      300 + i * 8 * position
    } ${1100 + i * 8} -${500 + i * 8 * position} ${1300 + i * 8}`,
    width: 1.8 + i * 0.08,
  }))

  return (
    <div 
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      <svg
        style={{
          width: '100%',
          height: '100%',
          filter: 'drop-shadow(0 0 10px var(--accent-glow))',
        }}
        viewBox="-400 -200 1100 1100"
        preserveAspectRatio="none"
        fill="none"
      >
        {paths1.map((path, idx) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="var(--accent)"
            strokeWidth={path.width}
            strokeOpacity={0.35 + (idx % 6) * 0.08}
            initial={{ pathLength: 0.3, opacity: 0.4 }}
            animate={{
              pathLength: 0.95,
              opacity: 0.8,
            }}
            transition={{
              duration: 12 + (idx % 5) * 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        ))}

        {paths2.map((path, idx) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="var(--accent-hover)"
            strokeWidth={path.width}
            strokeOpacity={0.25 + (idx % 5) * 0.08}
            initial={{ pathLength: 0.25, opacity: 0.35 }}
            animate={{
              pathLength: 0.9,
              opacity: 0.75,
            }}
            transition={{
              duration: 15 + (idx % 5) * 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  )
}
