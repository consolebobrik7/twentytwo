import { useScroll, useSpring, motion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{
        scaleX,
        position: 'fixed',
        top: '2rem',        /* sits flush below the pinned Ticker (≈ 2rem tall) */
        left: 0,
        right: 0,
        height: '1px',
        background: '#b52e2e',
        transformOrigin: 'left',
        zIndex: 55,          /* below Ticker z-[60] so Ticker always on top */
        pointerEvents: 'none',
      }}
    />
  )
}
