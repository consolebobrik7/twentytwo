import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProduct } from '../data/products'

const ease = [0.215, 0.61, 0.355, 1]

function InfoRow({ label, value }) {
  if (!value) return null
  return (
    <div className="flex flex-col gap-1 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <span className="font-mono uppercase"
        style={{ fontSize: '0.55rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.28)' }}>
        {label}
      </span>
      <span className="font-inter"
        style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
        {value}
      </span>
    </div>
  )
}

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProduct(id)
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0)
    setActiveImg(0)
  }, [id])

  if (!product) {
    return (
      <div className="min-h-screen bg-raw-black flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono uppercase"
            style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)' }}>
            Product not found
          </p>
          <Link to="/" className="font-mono uppercase block mt-6"
            style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: '#ffffff' }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className="min-h-screen bg-raw-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease }}
    >
      {/* ── Top bar ── */}
      <div
        className="fixed top-8 left-0 right-0 z-50 flex items-center justify-between px-gutter lg:px-gutter-lg h-12"
        style={{ background: 'rgba(8,8,8,0.92)', backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <Link to="/"
          className="font-mono uppercase flex items-center gap-2 group transition-colors min-w-[60px]"
          style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.4)' }}
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1 inline-block">←</span>
          <span className="group-hover:text-white transition-colors duration-200">Back</span>
        </Link>

        <span className="font-inter font-black uppercase"
          style={{ fontSize: '0.85rem', letterSpacing: '-0.02em', color: '#ffffff' }}>
          twentytwo<span style={{ color: '#b52e2e' }}>.</span>twentytwo
        </span>

        <span className="font-mono uppercase min-w-[60px] text-right"
          style={{ fontSize: '0.5rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)' }}>
          {product.slug}
        </span>
      </div>

      {/* ── Main layout — mobile: stack, desktop: sticky-left / scrolling-right ── */}
      <div className="pt-20 lg:flex lg:items-start">

        {/* Left — sticky image gallery, always fits viewport */}
        <motion.div
          className="lg:sticky lg:top-20 lg:w-[58%] lg:h-[calc(100vh-5rem)] flex flex-col"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
        >
          {product.images.length > 0 ? (
            /* Gallery: active image large (left 2/3), others stacked (right 1/3) */
            <div className="flex gap-px flex-1 min-h-0">
              {/* Active / main image */}
              <div className="bg-raw-charcoal overflow-hidden" style={{ flex: 2 }}>
                <img
                  src={product.images[activeImg]}
                  alt={`${product.category} ${activeImg + 1}`}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-contain transition-opacity duration-300"
                />
              </div>

              {/* Other images stacked */}
              {product.images.length > 1 && (
                <div className="flex flex-col gap-px" style={{ flex: 1 }}>
                  {product.images.map((src, i) => {
                    if (i === activeImg) return null
                    return (
                      <button
                        key={i}
                        onClick={() => setActiveImg(i)}
                        aria-label={`View image ${i + 1}`}
                        className="overflow-hidden flex-1 min-h-0"
                        style={{ opacity: 0.6, transition: 'opacity 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '0.6'}
                      >
                        <img src={src} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 min-h-0 flex items-center justify-center bg-raw-charcoal"
              style={{ minHeight: '50vh' }}
            >
              <span className="font-mono uppercase"
                style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.15)' }}>
                Photos Coming Soon
              </span>
            </div>
          )}
        </motion.div>

        {/* Right — scrolls with page, info always accessible */}
        <motion.div
          className="lg:w-[42%] px-gutter lg:px-10 py-8 lg:py-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          {/* Label */}
          <span className="font-mono uppercase block mb-5"
            style={{ fontSize: '0.55rem', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.28)' }}>
            Collection 01 — {product.slug}
          </span>

          {/* Name */}
          <h1 className="font-inter font-black uppercase leading-none mb-2"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', letterSpacing: '-0.03em', color: '#ffffff' }}>
            {product.category}
          </h1>

          {/* Subtitle */}
          <p className="font-mono uppercase mb-5"
            style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)' }}>
            {product.subtitle}
          </p>

          {/* Price */}
          {product.price && (
            <p className="font-inter font-bold mb-6"
              style={{ fontSize: '1.75rem', color: '#ffffff', letterSpacing: '-0.02em' }}>
              €{product.price}
            </p>
          )}

          {/* Long description */}
          <p className="font-inter leading-relaxed mb-6"
            style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}>
            {product.longDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-7">
            {product.tags.map(tag => (
              <span key={tag} className="chip">{tag}</span>
            ))}
          </div>

          {/* Buy button */}
          {product.stripeUrl ? (
            <a href={product.stripeUrl} target="_blank" rel="noopener noreferrer"
              className="font-mono uppercase w-full text-center block mb-8
                         transition-all duration-200 hover:bg-off-white hover:text-raw-black"
              style={{
                fontSize: '0.65rem', letterSpacing: '0.25em',
                color: '#080808', background: '#ffffff',
                padding: '1.1rem 2rem',
              }}>
              Buy Now — €{product.price}
            </a>
          ) : (
            <div className="font-mono uppercase w-full text-center block mb-8"
              style={{
                fontSize: '0.65rem', letterSpacing: '0.25em',
                color: 'rgba(255,255,255,0.3)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '1.1rem 2rem',
              }}>
              Coming Soon
            </div>
          )}

          {/* Details */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <InfoRow label="Material"     value={product.material} />
            <InfoRow label="Care"         value={product.care} />
            <InfoRow label="Dimensions"   value={product.dimensions} />
            <InfoRow label="Sustainability" value={product.sustainability} />
          </div>

          {/* Instagram CTA */}
          <div className="mt-7 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="font-mono uppercase mb-2"
              style={{ fontSize: '0.52rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.25)' }}>
              Custom order?
            </p>
            <a href="https://instagram.com/twentytwo.twentytwo_" target="_blank" rel="noopener noreferrer"
              className="font-mono transition-colors hover:text-white"
              style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>
              DM @twentytwo.twentytwo_
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
