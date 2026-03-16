import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProduct } from '../data/products'

const ease = [0.215, 0.61, 0.355, 1]

function InfoRow({ label, value }) {
  if (!value) return null
  return (
    <div className="flex flex-col gap-1 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <span className="font-mono uppercase" style={{ fontSize: '0.48rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.28)' }}>
        {label}
      </span>
      <span className="font-inter" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
        {value}
      </span>
    </div>
  )
}

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProduct(id)

  // Scroll to top on mount
  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [id])

  if (!product) {
    return (
      <div className="min-h-screen bg-raw-black flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)' }}>
            Product not found
          </p>
          <Link to="/" className="font-mono uppercase block mt-6"
            style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: '#ffffff' }}>
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
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-gutter lg:px-gutter-lg h-12"
        style={{ background: 'rgba(8,8,8,0.92)', backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <Link
          to="/"
          className="font-mono uppercase flex items-center gap-2 group transition-colors"
          style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.4)' }}
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1 inline-block">←</span>
          <span className="group-hover:text-white transition-colors duration-200">Back</span>
        </Link>

        <span className="font-inter font-black uppercase" style={{ fontSize: '0.85rem', letterSpacing: '-0.02em', color: '#ffffff' }}>
          twentytwo<span style={{ color: '#b52e2e' }}>.</span>twentytwo
        </span>

        <span className="font-mono uppercase" style={{ fontSize: '0.5rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)' }}>
          {product.slug}
        </span>
      </div>

      {/* ── Main layout ── */}
      <div className="pt-12 lg:flex lg:items-start">

        {/* Left — image gallery (scrollable) */}
        <motion.div
          className="lg:w-[60%] lg:sticky lg:top-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          {product.images.length > 0 ? (
            <div className="flex flex-col gap-px" style={{ background: 'rgba(255,255,255,0.04)' }}>
              {product.images.map((src, i) => (
                <div key={i} className="relative overflow-hidden bg-raw-charcoal" style={{ aspectRatio: '3 / 4' }}>
                  <img
                    src={src}
                    alt={`${product.category} ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div
              className="flex items-center justify-center"
              style={{ aspectRatio: '3 / 4', background: '#111' }}
            >
              <span className="font-mono uppercase" style={{ fontSize: '0.55rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.15)' }}>
                Photos Coming Soon
              </span>
            </div>
          )}
        </motion.div>

        {/* Right — sticky product info */}
        <motion.div
          className="lg:w-[40%] lg:sticky lg:top-12 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto
                     px-gutter lg:px-10 py-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          style={{ scrollbarWidth: 'none' }}
        >
          {/* Label */}
          <span className="font-mono uppercase block mb-6"
            style={{ fontSize: '0.52rem', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.28)' }}>
            Collection 01 — {product.slug}
          </span>

          {/* Name */}
          <h1 className="font-inter font-black uppercase leading-none mb-2"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em', color: '#ffffff' }}>
            {product.category}
          </h1>

          {/* Subtitle */}
          <p className="font-mono uppercase mb-6"
            style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)' }}>
            {product.subtitle}
          </p>

          {/* Price */}
          {product.price && (
            <p className="font-inter font-bold mb-8"
              style={{ fontSize: '1.5rem', color: '#ffffff', letterSpacing: '-0.02em' }}>
              €{product.price}
            </p>
          )}

          {/* Long description */}
          <p className="font-inter leading-relaxed mb-8"
            style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}>
            {product.longDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {product.tags.map(tag => (
              <span key={tag} className="chip">{tag}</span>
            ))}
          </div>

          {/* Buy button */}
          {product.stripeUrl ? (
            <a
              href={product.stripeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono uppercase w-full text-center block mb-8
                         transition-all duration-200 hover:bg-off-white hover:text-raw-black"
              style={{
                fontSize: '0.6rem', letterSpacing: '0.25em',
                color: '#080808', background: '#ffffff',
                padding: '1rem 2rem',
              }}
            >
              Buy Now — €{product.price}
            </a>
          ) : (
            <div className="font-mono uppercase w-full text-center block mb-8"
              style={{
                fontSize: '0.6rem', letterSpacing: '0.25em',
                color: 'rgba(255,255,255,0.3)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '1rem 2rem',
              }}>
              Coming Soon
            </div>
          )}

          {/* Details */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <InfoRow label="Material" value={product.material} />
            <InfoRow label="Care" value={product.care} />
            <InfoRow label="Dimensions" value={product.dimensions} />
            <InfoRow label="Sustainability" value={product.sustainability} />
          </div>

          {/* Instagram */}
          <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="font-mono uppercase mb-2"
              style={{ fontSize: '0.48rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.25)' }}>
              Custom order?
            </p>
            <a href="https://instagram.com/twentytwo.twentytwo_" target="_blank" rel="noopener noreferrer"
              className="font-mono transition-colors hover:text-white"
              style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>
              DM @twentytwo.twentytwo_
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
