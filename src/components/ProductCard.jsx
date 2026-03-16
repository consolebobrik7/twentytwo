import { useState } from 'react'
import { motion } from 'framer-motion'

const ease = [0.215, 0.61, 0.355, 1]

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
      className="group relative bg-raw-black flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease }}
      data-cursor
    >

      {/* ── Image container ── */}
      <div
        className="relative overflow-hidden bg-raw-charcoal"
        style={{ aspectRatio: '3 / 4' }}
      >
        {images.length > 0 ? (
          <img
            src={images[current]}
            alt={category}
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
              style={{ fontSize: '0.5rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.12)' }}>
              {slug}
            </span>
            <span className="font-mono uppercase"
              style={{ fontSize: '0.5rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.08)' }}>
              Photo Coming Soon
            </span>
          </div>
        )}

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="font-mono uppercase" style={{
              fontSize: '0.48rem', letterSpacing: '0.18em', color: '#b52e2e',
              border: '1px solid rgba(181,46,46,0.35)', padding: '0.15rem 0.4rem',
              background: 'rgba(8,8,8,0.75)',
            }}>
              {badge}
            </span>
          </div>
        )}

        {/* Image arrows */}
        {images.length > 1 && (
          <>
            <button onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10
                         opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{
                background: 'rgba(8,8,8,0.55)', border: '1px solid rgba(255,255,255,0.12)',
                color: '#fff', width: 26, height: 26,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem',
              }}>‹</button>
            <button onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10
                         opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{
                background: 'rgba(8,8,8,0.55)', border: '1px solid rgba(255,255,255,0.12)',
                color: '#fff', width: 26, height: 26,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem',
              }}>›</button>

            {/* Dots */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
              {images.map((_, i) => (
                <button key={i} onClick={e => { e.stopPropagation(); setCurrent(i) }}
                  style={{
                    width: i === current ? 14 : 4, height: 4,
                    background: i === current ? '#ffffff' : 'rgba(255,255,255,0.3)',
                    border: 'none', padding: 0, cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }} />
              ))}
            </div>
          </>
        )}

        {/* Quick view — appears on hover at bottom of image */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300
                     flex items-center justify-center py-2.5"
          style={{ background: 'rgba(8,8,8,0.72)', borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <span className="font-mono uppercase"
            style={{ fontSize: '0.48rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.7)' }}>
            Quick View
          </span>
        </div>
      </div>

      {/* ── Info below image ── */}
      <div className="flex flex-col flex-1 pt-4 pb-5 px-1">

        {/* Name + price row */}
        <div className="flex items-baseline justify-between gap-2 mb-1">
          <h3
            className="font-mono uppercase transition-colors duration-300"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            <span className="group-hover:text-white transition-colors duration-300">
              {category}
            </span>
          </h3>
          {price && (
            <span className="font-mono shrink-0"
              style={{ fontSize: '0.7rem', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.4)' }}>
              <span className="group-hover:text-white transition-colors duration-300">
                €{price}
              </span>
            </span>
          )}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <p className="font-mono uppercase mb-2"
            style={{ fontSize: '0.52rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.25)' }}>
            {subtitle}
          </p>
        )}

        {/* Description */}
        <p className="font-mono leading-relaxed mb-3 flex-1"
          style={{ fontSize: '0.58rem', letterSpacing: '0.04em', color: 'rgba(255,255,255,0.3)', lineHeight: 1.7 }}>
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.map(tag => (
            <span key={tag} className="chip">{tag}</span>
          ))}
        </div>

        {/* Buy button */}
        {stripeUrl && (
          <a
            href={stripeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="font-mono uppercase text-center w-full py-2.5
                       transition-all duration-200 hover:bg-off-white hover:text-raw-black"
            style={{
              fontSize: '0.52rem',
              letterSpacing: '0.25em',
              color: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(255,255,255,0.15)',
              display: 'block',
            }}
          >
            Buy Now — €{price}
          </a>
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
