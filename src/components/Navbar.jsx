import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const logo  = '/logo.png'
const ease  = [0.215, 0.61, 0.355, 1]
const links = [
  { label: 'COLLECTION', href: '#collection' },
  { label: 'MANIFESTO',  href: '#manifesto'  },
  { label: 'FAQ',        href: '#faq'        },
  { label: 'CONTACT',    href: '#contact'    },
]

function scrollTo(href) {
  if (window.__lenis) {
    window.__lenis.scrollTo(href, { offset: -80 })
  } else {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      className={`
        fixed top-8 left-0 right-0 z-50
        transition-all duration-200
        ${scrolled ? 'bg-raw-black/96 backdrop-blur' : 'bg-transparent'}
      `}
    >
      <div className={`
        border-b border-dashed transition-colors duration-200
        ${scrolled ? 'border-raw-slate/60' : 'border-transparent'}
        px-gutter lg:px-gutter-lg flex items-center justify-between h-12
      `}>

        {/* Logo */}
        <a href="#" className="flex items-center shrink-0">
          <img src={logo} alt="22.22" className="h-8 w-auto" />
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={e => { e.preventDefault(); scrollTo(l.href) }}
              className="font-mono text-[0.6rem] tracking-[0.2em] text-ash
                         hover:text-off-white transition-colors uppercase"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#collection"
          onClick={e => { e.preventDefault(); scrollTo('#collection') }}
          className="hidden md:inline-block font-mono font-bold uppercase
                     bg-off-white text-raw-black transition-opacity hover:opacity-80"
          style={{ fontSize: '0.58rem', letterSpacing: '0.2em', padding: '0.5rem 1.1rem' }}
        >
          COLLECTION 01
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className={`block h-px w-5 bg-off-white transition-all duration-300
            ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-px w-5 bg-off-white transition-all duration-300
            ${open ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block h-px w-5 bg-off-white transition-all duration-300
            ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile overlay — animated */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease }}
            className="md:hidden fixed inset-0 top-20 bg-raw-black
                       flex flex-col justify-center items-start
                       px-gutter gap-8 z-40"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={e => { e.preventDefault(); scrollTo(l.href); close() }}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.08 * i, ease }}
                className="font-inter font-black text-4xl text-off-white uppercase
                           tracking-tight hover:text-brand-light transition-colors"
                style={{ letterSpacing: '-0.03em' }}
              >
                <span
                  className="font-mono text-base mr-3"
                  style={{ color: 'rgba(255,255,255,0.2)' }}
                >
                  0{i + 1}
                </span>
                {l.label}
              </motion.a>
            ))}

            <motion.a
              href="#collection"
              onClick={e => { e.preventDefault(); scrollTo('#collection'); close() }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.32, ease }}
              className="font-mono font-bold uppercase bg-off-white text-raw-black
                         text-xs tracking-widest px-6 py-3 inline-block"
            >
              COLLECTION 01
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
