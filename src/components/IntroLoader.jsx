import { motion } from 'framer-motion'

const ease = [0.215, 0.61, 0.355, 1]

export default function IntroLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.1, ease: [0.215, 0.61, 0.355, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#0d0d0d',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Brand wordmark */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease }}
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(2rem, 6vw, 3.5rem)',
          letterSpacing: '-0.04em',
          textTransform: 'uppercase',
          color: '#ffffff',
          margin: 0,
        }}
      >
        twentytwo<span style={{ color: '#b52e2e' }}>.</span>twentytwo
      </motion.p>

      {/* Sub-label */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.55, ease: 'easeOut' }}
        style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.55rem',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)',
          marginTop: '1rem',
        }}
      >
        Collection 01 — SS26
      </motion.span>

      {/* Progress bar — grows full width over 1.6s */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.6, delay: 0.1, ease: 'linear' }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'rgba(255,255,255,0.15)',
          transformOrigin: 'left',
        }}
      />

      {/* Red accent dot bottom-right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#b52e2e',
            display: 'block',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
        <span
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.45rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.25)',
          }}
        >
          Loading
        </span>
      </motion.div>
    </motion.div>
  )
}
