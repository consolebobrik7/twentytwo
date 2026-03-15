import { motion } from 'framer-motion'

const ease = [0.215, 0.61, 0.355, 1]

// Parent hover state propagates "hover" variant name down to children
const cardVariants = {
  rest:  { y: 0 },
  hover: { y: -6, transition: { duration: 0.4, ease } },
}

const imageVariants = {
  rest:  { scale: 1 },
  hover: { scale: 1.04, transition: { duration: 0.65, ease } },
}

const accentVariants = {
  rest:  { scaleX: 0 },
  hover: { scaleX: 1, transition: { duration: 0.35, ease } },
}

export default function ProductCard({ slug, category, subtitle, description, tags = [], badge }) {
  return (
    <motion.article
      className="group relative bg-raw-black overflow-hidden"
      initial="rest"
      whileHover="hover"
      variants={cardVariants}
      data-cursor
    >

      {/* ── Large image area ── */}
      {/* Replace the motion.div content with <img src="..." className="w-full h-full object-cover" /> */}
      <div
        className="relative overflow-hidden bg-raw-charcoal"
        style={{ aspectRatio: '3 / 4' }}
      >
        {/* Image / placeholder — scales on card hover via variant propagation */}
        <motion.div
          variants={imageVariants}
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),' +
              'linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Center label — remove when real photo is added */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10">
          <span
            className="font-mono uppercase"
            style={{ fontSize: '0.55rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.12)' }}
          >
            {slug}
          </span>
          <span
            className="font-mono uppercase"
            style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.1)' }}
          >
            Photo Coming Soon
          </span>
        </div>

        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4 z-20">
            <span
              className="font-mono uppercase"
              style={{
                fontSize: '0.5rem',
                letterSpacing: '0.18em',
                color: '#b52e2e',
                border: '1px solid rgba(181,46,46,0.35)',
                padding: '0.18rem 0.45rem',
                background: 'rgba(8,8,8,0.7)',
              }}
            >
              {badge}
            </span>
          </div>
        )}

        {/* Hover: description overlay — CSS transition still works on motion.article */}
        <div
          className="absolute inset-0 z-20 flex flex-col justify-end p-6
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.96) 40%, transparent 100%)' }}
        >
          <p
            className="font-inter leading-relaxed"
            style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}
          >
            {description}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map(tag => (
              <span key={tag} className="chip">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Minimal title block ── */}
      <div className="py-5 px-1">
        <div className="flex items-baseline justify-between gap-4">
          <h3
            className="font-inter font-black uppercase"
            style={{ fontSize: '1.15rem', letterSpacing: '-0.01em', color: '#ffffff' }}
          >
            {category}
          </h3>
          <span
            className="font-mono uppercase shrink-0"
            style={{ fontSize: '0.5rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.28)' }}
          >
            {slug}
          </span>
        </div>
        {subtitle && (
          <p
            className="font-mono uppercase mt-1"
            style={{ fontSize: '0.55rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.3)' }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom brand-red accent — animates via Framer variant */}
      <motion.div
        variants={accentVariants}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: '#b52e2e',
          originX: 0,
        }}
      />
    </motion.article>
  )
}
