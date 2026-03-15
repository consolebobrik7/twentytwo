import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const SPRING = { stiffness: 220, damping: 28, mass: 0.4 }
const ease   = [0.215, 0.61, 0.355, 1]

export default function CustomCursor() {
  const [isTouch,  setIsTouch]  = useState(false)
  const [hovered,  setHovered]  = useState(false)

  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)
  const x    = useSpring(rawX, SPRING)
  const y    = useSpring(rawY, SPRING)

  useEffect(() => {
    // Hide on touch-only devices (phones/tablets with no hover)
    if (window.matchMedia('(hover: none)').matches) {
      setIsTouch(true)
      return
    }

    // Kill the native cursor globally
    document.body.style.cursor = 'none'

    const onMove = (e) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
    }

    // Expand when over any interactive element or [data-cursor] marker
    const onOver = (e) => {
      if (e.target.closest('a, button, [data-cursor]')) {
        setHovered(true)
      } else {
        setHovered(false)
      }
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)

    return () => {
      document.body.style.cursor = ''
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
    }
  }, [rawX, rawY])

  if (isTouch) return null

  return (
    // Outer div: spring-follows mouse, anchored top-left of viewport
    <motion.div
      style={{
        position: 'fixed',
        top:  0,
        left: 0,
        x,
        y,
        pointerEvents: 'none',
        zIndex: 999999,
      }}
    >
      {/* Inner div: CSS-centered on the cursor hotspot, then Framer handles size */}
      <div style={{ transform: 'translate(-50%, -50%)' }}>
        <motion.div
          animate={{
            width:  hovered ? 38 : 10,
            height: hovered ? 38 : 10,
            borderColor: hovered
              ? 'rgba(255,255,255,0.6)'
              : 'rgba(255,255,255,0.35)',
            background: hovered
              ? 'rgba(255,255,255,0.05)'
              : 'rgba(255,255,255,0)',
          }}
          transition={{ duration: 0.25, ease }}
          style={{
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.35)',
          }}
        />
      </div>
    </motion.div>
  )
}
