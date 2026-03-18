import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const ease = [0.215, 0.61, 0.355, 1]

export default function ProductCard({ id, slug, category, subtitle, description, tags = [], badge, images = [], price, stripeUrl }) {
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()

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
      className="group relative bg-raw-black flex flex-col cursor-pointer"
      onClick={() => id && navigate(`/product/${id}`)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease }}
      data-cursor
    >

      {/* ── Image container ── */}
      <div
        className="relative overflow-hidden bg-raw-charcoal aspect-[4/3] sm:aspect-[3/4]"
      >
        {images.length > 0 ? (
          <img
            src={images[current]}
            alt={category}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover
                       transition-transform duration-700 ease-out
                       group-hover:scale-105"
          />
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),' +
                'linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          >
            <span className="font-mono uppercase"
              style={{ fontSize: '0.55rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.12)' }}>
              {slug}
            </span>
            <span className="font-mono uppercase"
              style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.1)' }}>
              Photo Coming Soon
            </span>
          </div>
        )}

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="font-mono uppercase" style={{
              fontSize: '0.5rem', letterSpacing: '0.18em', color: '#b52e2e',
              border: '1px solid rgba(181,46,46,0.35)', padding: '0.15rem 0.4rem',
              background: 'rgba(8,8,8,0.75)',
            }}>
              {badge}
            </span>
          </div>
        )}

        {/* Image arrows — always visible on mobile, hover-only on desktop */}
        {images.length > 1 && (
          <>
            <button onClick={prev} aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10
                         opacity-100 md:opacity-0 md:group-hover:opacity-100
                         transition-opacity duration-200 flex items-center justify-center"
              style={{
                background: 'rgba(8,8,8,0.6)', border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff', width: 40, height: 40, fontSize: '1.1rem',
              }}>‹</button>
            <button onClick={next} aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10
                         opacity-100 md:opacity-0 md:group-hover:opacity-100
                         transition-opacity duration-200 flex items-center justify-center"
              style={{
                background: 'rgba(8,8,8,0.6)', border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff', width: 40, height: 40, fontSize: '1.1rem',
              }}>›</button>

            {/* Dots */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
              {images.map((_, i) => (
                <button key={i}
                  onClick={e => { e.stopPropagation(); setCurrent(i) }}
                  aria-label={`View image ${i + 1} of ${images.length}`}
                  className="flex items-center justify-center"
                  style={{ width: 24, height: 24, background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}
                >
                  <span style={{
                    display: 'block',
                    width: i === current ? 16 : 5,
                    height: 4,
                    background: i === current ? '#ffffff' : 'rgba(255,255,255,0.35)',
                    transition: 'all 0.25s ease',
                  }} />
                </button>
              ))}
            </div>
          </>
        )}

        {/* View Details — hover only */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10
                     opacity-0 group-hover:opacity-100
                     transition-opacity duration-300
                     flex items-center justify-center py-3"
          style={{ background: 'rgba(8,8,8,0.75)', borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <span className="font-mono uppercase"
            style={{ fontSize: '0.52rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.75)' }}>
            View Details →
          </span>
        </div>
      </div>

      {/* ── Info below image ── */}
      <div className="flex flex-col flex-1 pt-4 pb-5 px-1">

        {/* Name + price */}
        <div className="flex items-baseline justify-between gap-2 mb-1.5">
          <h3 className="font-mono uppercase transition-colors duration-300 text-white/60 group-hover:text-white"
            style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}>
            {category}
          </h3>
          {price && (
            <span className="font-mono shrink-0 transition-colors duration-300 text-white/40 group-hover:text-white"
              style={{ fontSize: '0.75rem', letterSpacing: '0.08em' }}>
              €{price}
            </span>
          )}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <p className="font-mono uppercase mb-2"
            style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.28)' }}>
            {subtitle}
          </p>
        )}

        {/* Description */}
        <p className="font-inter leading-relaxed mb-3 flex-1"
          style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.65 }}>
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.map(tag => (
            <span key={tag} className="chip">{tag}</span>
          ))}
        </div>

        {/* Buy button */}
        {stripeUrl ? (
          <a
            href={stripeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="font-mono uppercase text-center w-full
                       transition-all duration-200 hover:bg-off-white hover:text-raw-black"
            style={{
              fontSize: '0.58rem', letterSpacing: '0.25em',
              color: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(255,255,255,0.15)',
              padding: '0.85rem',
              display: 'block',
            }}
          >
            Buy Now — €{price}
          </a>
        ) : (
          <span
            className="font-mono uppercase text-center w-full block"
            style={{
              fontSize: '0.58rem', letterSpacing: '0.25em',
              color: 'rgba(255,255,255,0.22)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '0.85rem',
            }}
          >
            View Details →
          </span>
        )}
      </div>

      {/* Bottom red accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px origin-left
                   scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
        style={{ background: '#b52e2e' }}
      />
    </motion.article>
  )
}
