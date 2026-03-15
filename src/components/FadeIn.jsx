import { motion } from 'framer-motion'

const ease = [0.215, 0.61, 0.355, 1]

/**
 * Wraps any section in a fade-up reveal triggered by scroll.
 * viewport.once: true — animates only once, never replays on scroll-back.
 */
export default function FadeIn({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  )
}
