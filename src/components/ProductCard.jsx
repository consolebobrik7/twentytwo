import { useState } from 'react'
import { motion } from 'framer-motion'

const ease = [0.215, 0.61, 0.355, 1]

const cardVariants = {
  rest:  { y: 0 },
  hover: { y: -6, transition: { duration: 0.4, ease } },
}

const accentVariants = {
  rest:  { scaleX: 0 },
  hover: { scaleX: 1, transition: { duration: 0.35, ease } },
}

export default function ProductCard({ slug, category, subtitle, description, tags = [], badge, images = [], price, stripeUrl }) {
  const [current, setCurrent] = useState(0)

  function prev(e) {
    e.stopPropagation()
    setCurrent(i => (i - 1 + images.length) % images.length)
  }
  function next(e) {
    e.stopPropagation()
    setCurrent(i => (i + 1) % images.length)
  }

  return (
    <motion.article
      className="group relative bg-raw-black overflow-hidden"
      initial="rest"
      whileHover="hover"
      variants={cardVariants}
      data-cursor
    >

      {/* ── Image area ── */}
      <div
        className="relative overflow-hidden bg-raw-charcoal"
        style={{ aspectRatio: '3 / 4' }}
      >
        {images.length > 0 ? (
          <>
            <img
              src={images[current]}
              alt={category}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'opacity 0.3s ease',
              }}
            />

            {/* Arrows — visible on hover if multiple images */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-30
                             opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{
                    background: 'rgba(8,8,8,0.6)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#fff',
                    width: 28,
                    height: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                  }}
                >
                  ‹
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-30
                             opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{
                    background: 'rgba(8,8,8,0.6)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#fff',
                    width: 28,
                    height: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                  }}
                >
                  ›
                </button>

                {/* Dot indicators */}
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-30">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={e => { e.stopPropagation(); setCurrent(i) }}
                      style={{
                        width: i === current ? 16 : 4,
                        height: 4,
                        background: i === current ? '#ffffff' : 'rgba(255,255,255,0.35)',
                        border: 'none',
                        padding: 0,
                        transition: 'all 0.25s ease',
                        cursor: 'pointer',
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),' +
                  'linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10">
              <span className="font-mono uppercase"
                style={{ fontSize: '0.55rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.12)' }}>
                {slug}
              </span>
              <span className="font-mono uppercase"
                style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.1)' }}>
                Photo Coming Soon
              </span>
            </div>
          </>
        )}

        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4 z-20">
            <span className="font-mono uppercase" style={{
              fontSize: '0.5rem', letterSpacing: '0.18em', color: '#b52e2e',
              border: '1px solid rgba(181,46,46,0.35)', padding: '0.18rem 0.45rem',
              background: 'rgba(8,8,8,0.7)',
            }}>
              {badge}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div
          className="absolute inset-0 z-20 flex flex-col justify-end p-6
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.96) 40%, transparent 100%)' }}
        >
          <p className="font-inter leading-relaxed"
            style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
            {description}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map(tag => (
              <span key={tag} className="chip">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Title + price + buy button ── */}
      <div className="py-5 px-1">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-inter font-black uppercase"
            style={{ fontSize: '1.15rem', letterSpacing: '-0.01em', color: '#ffffff' }}>
            {category}
          </h3>
          <div className="flex items-center gap-3 shrink-0">
            {price && (
              <span className="font-mono font-bold"
                style={{ fontSize: '0.85rem', color: '#ffffff' }}>
                €{price}
              </span>
            )}
            <span className="font-mono uppercase"
              style={{ fontSize: '0.5rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.28)' }}>
              {slug}
            </span>
          </div>
        </div>

        {subtitle && (
          <p className="font-mono uppercase mt-1"
            style={{ fontSize: '0.55rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.3)' }}>
            {subtitle}
          </p>
        )}

        {stripeUrl && (
          <a
            href={stripeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="btn-primary inline-block mt-4 w-full text-center"
            style={{ fontSize: '0.58rem' }}
          >
            BUY NOW — €{price}
          </a>
        )}
      </div>

      {/* Bottom accent */}
      <motion.div
        variants={accentVariants}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '1px', background: '#b52e2e', originX: 0,
        }}
      />
    </motion.article>
  )
}
