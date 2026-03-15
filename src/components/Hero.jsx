import { motion } from 'framer-motion'

const logo = '/logo.png'
const ease  = [0.215, 0.61, 0.355, 1]

// Container staggering child blocks (label → headline → rule+tagline → CTAs → strip)
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

// Each top-level block slides up + fades in
const blockVariants = {
  hidden:   { opacity: 0, y: 22 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
}

// Headline lines have their own inner stagger
const headlineContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const lineVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.7, ease } },
}

export default function Hero({ ready }) {
  return (
    <section
      className="relative min-h-screen overflow-hidden flex flex-col"
      style={{ backgroundColor: '#080808' }}
    >

      {/* ── LOGO ─────────────────────────────────────────────────────────
          Why this filter chain works:
          1. contrast(1.8)   — CSS contrast maps any value below ~0.28 to pure black.
                               Near-black logo edges (e.g. #0a0a0a) become #000000.
          2. brightness(1.1) — lifts the patchwork and safety-pin textures above the
                               blacks so they read with full detail.
          3. mix-blend-mode: screen + #050505 background:
                               pure black source + any backdrop = backdrop.
                               The rectangle is mathematically impossible to see.
          4. mask-image circle gradient — feathers the outer edge for a natural fade.
      ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-4vw',
          top: '50%',
          transform: 'translateY(-50%) rotate(-1.5deg)',
          zIndex: 10,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <img
          src={logo}
          alt=""
          style={{
            width: 'clamp(400px, 62vw, 820px)',
            display: 'block',
            mixBlendMode: 'screen',
            filter: 'contrast(1.8) brightness(1.1) saturate(1.15)',
            maskImage:
              'radial-gradient(circle, black 55%, rgba(0,0,0,0.6) 72%, transparent 88%)',
            WebkitMaskImage:
              'radial-gradient(circle, black 55%, rgba(0,0,0,0.6) 72%, transparent 88%)',
          }}
        />
      </div>

      {/* ── CONTENT ── */}
      <motion.div
        className="relative flex flex-col flex-1 section-container"
        style={{ zIndex: 20 }}
        variants={containerVariants}
        initial="hidden"
        animate={ready ? 'visible' : 'hidden'}
      >

        {/* Live indicator — fades in as part of container stagger */}
        <motion.div
          variants={blockVariants}
          className="absolute top-24 right-0 flex flex-col items-end gap-2"
        >
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full bg-brand-light"
              style={{ animation: 'pulse 2s ease-in-out infinite' }}
            />
            <span
              className="font-mono uppercase"
              style={{ fontSize: '0.5rem', letterSpacing: '0.45em', color: 'rgba(181,46,46,0.75)' }}
            >
              LIVE
            </span>
          </div>
          <span
            className="font-mono uppercase"
            style={{ fontSize: '0.52rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.28)' }}
          >
            DROP 01 // 22 PIECES TOTAL
          </span>
        </motion.div>

        {/* Category label */}
        <motion.div variants={blockVariants} className="pt-24 lg:pt-32">
          <span
            className="font-mono uppercase inline-block"
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.35em',
              color: 'rgba(255,255,255,0.4)',
              border: '1px solid rgba(255,255,255,0.12)',
              padding: '0.4rem 0.75rem',
            }}
          >
            Upcycled Fashion — Cyprus
          </span>
        </motion.div>

        {/* ── HEADLINE — staggered lines ── */}
        <div className="flex-1 flex flex-col justify-center py-16 lg:py-0 max-w-2xl">

          <motion.h1
            variants={headlineContainerVariants}
            className="font-inter font-black uppercase"
            style={{
              fontSize: 'clamp(4.5rem, 10.5vw, 10rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.035em',
              color: '#ffffff',
            }}
          >
            <motion.span variants={lineVariants} className="block">SECOND</motion.span>
            <motion.span variants={lineVariants} className="block" style={{ color: 'rgba(255,255,255,0.4)' }}>HAND</motion.span>
            <motion.span variants={lineVariants} className="block">FIRST</motion.span>
            <motion.span variants={lineVariants} className="block" style={{ color: '#b52e2e' }}>CLASS.</motion.span>
          </motion.h1>

          {/* Rule */}
          <motion.div variants={blockVariants} className="flex items-center gap-4 my-8 max-w-xs">
            <div className="flex-1" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />
            <span
              className="font-mono uppercase"
              style={{ fontSize: '0.5rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.2)' }}
            >
              SS26 // 22.22
            </span>
            <div className="flex-1" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={blockVariants}
            className="font-mono uppercase mb-10 max-w-xs leading-relaxed"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.35)',
            }}
          >
            Upcycled into something worth wearing.
            <br />
            <span style={{ color: 'rgba(255,255,255,0.18)' }}>Hand-reworked. Cyprus made.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div variants={blockVariants} className="flex flex-wrap items-center gap-8">
            <a
              href="#collection"
              data-cursor
              className="font-inter font-bold uppercase inline-block active:scale-[0.98]"
              style={{
                backgroundColor: '#ffffff',
                color: '#080808',
                fontSize: '0.75rem',
                letterSpacing: '0.25em',
                padding: '1rem 2.75rem',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#ffffff'
                e.currentTarget.style.outline = '1px solid rgba(255,255,255,0.5)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#ffffff'
                e.currentTarget.style.color = '#080808'
                e.currentTarget.style.outline = 'none'
              }}
            >
              VIEW COLLECTION
            </a>

            <a
              href="#manifesto"
              className="font-mono uppercase inline-flex items-center gap-3 transition-colors duration-150"
              style={{ fontSize: '0.62rem', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.35)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
            >
              <span
                className="inline-block"
                style={{ width: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.2)' }}
              />
              MANIFESTO
            </a>
          </motion.div>
        </div>

        {/* ── BOTTOM STRIP ── */}
        <motion.div
          variants={blockVariants}
          className="py-3 flex flex-wrap items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-6 md:gap-10">
            {['CYPRUS BASED', 'UPCYCLED ORIGINALS', 'LIMITED DROP 01'].map((item, i) => (
              <span key={item} className="flex items-center gap-4">
                <span
                  className="font-mono uppercase"
                  style={{ fontSize: '0.52rem', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.25)' }}
                >
                  {item}
                </span>
                {i < 2 && (
                  <span className="font-mono" style={{ fontSize: '0.52rem', color: 'rgba(255,255,255,0.12)' }}>
                    //
                  </span>
                )}
              </span>
            ))}
          </div>
          <span
            className="font-mono uppercase"
            style={{ fontSize: '0.52rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.12)' }}
          >
            © 2026 TWENTYTWO.TWENTYTWO
          </span>
        </motion.div>

      </motion.div>
    </section>
  )
}
