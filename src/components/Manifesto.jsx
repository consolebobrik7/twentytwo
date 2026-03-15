import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.215, 0.61, 0.355, 1]

// Splits text into words, each word animates in with stagger
function StaggerText({ text, color, style = {} }) {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const words    = text.split(' ')

  return (
    <span ref={ref} style={{ display: 'inline', ...style }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.22em' }}>
          <motion.span
            style={{ display: 'inline-block', color }}
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : {}}
            transition={{ duration: 0.65, delay: i * 0.07, ease }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      className="py-section bg-raw-black"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="section-container">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span
            className="font-mono uppercase"
            style={{ fontSize: '0.6rem', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.28)' }}
          >
            The Manifesto
          </span>
          <div className="flex-1" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }} />
        </div>

        {/* Centered brand statement */}
        <div className="max-w-4xl mx-auto text-center mb-20">

          {/* Eyebrow */}
          <motion.p
            className="font-inter font-black uppercase mb-6"
            style={{
              fontSize: 'clamp(1.1rem, 2.2vw, 1.75rem)',
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.35)',
              lineHeight: 1,
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease }}
          >
            twentytwo.twentytwo
          </motion.p>

          {/* Main quote — word-by-word stagger */}
          <h2
            className="font-inter font-black"
            style={{
              fontSize: 'clamp(1.75rem, 4.5vw, 3.75rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              color: '#ffffff',
            }}
          >
            <StaggerText text="Deconstructing the past to stitch a" color="#ffffff" />
            {' '}
            <StaggerText text="conscious future." color="#b52e2e" />
          </h2>

          {/* Sub-line */}
          <motion.p
            className="font-inter mt-8 mx-auto"
            style={{
              fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.45)',
              maxWidth: '540px',
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
          >
            Second-hand fabric, first-class design.
          </motion.p>
        </div>

        {/* Sustainability metrics row */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-px"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          {[
            { value: '0%',   label: 'New Cotton Used'  },
            { value: '100%', label: 'Reworked Fabric'  },
            { value: '0L',   label: 'Water Consumed'   },
            { value: '0',    label: 'Virgin Materials' },
          ].map((item, i) => (
            <motion.div
              key={item.value}
              className="bg-raw-black flex flex-col justify-center items-center text-center py-10 px-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease }}
            >
              <span
                className="font-inter font-black block"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em', color: '#ffffff', lineHeight: 1 }}
              >
                {item.value}
              </span>
              <span
                className="font-mono uppercase block mt-3"
                style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)' }}
              >
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
