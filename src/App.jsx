import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'

import CustomCursor       from './components/CustomCursor'
import ScrollProgress     from './components/ScrollProgress'
import IntroLoader        from './components/IntroLoader'
import FadeIn             from './components/FadeIn'
import Ticker             from './components/Ticker'
import Navbar             from './components/Navbar'
import Hero               from './components/Hero'
import Manifesto          from './components/Manifesto'
import SustainabilityBar  from './components/SustainabilityBar'
import ProductGallery     from './components/ProductGallery'
import Mission            from './components/Mission'
import FAQ               from './components/FAQ'
import Waitlist           from './components/Waitlist'
import Footer             from './components/Footer'

export default function App() {
  const [loading, setLoading] = useState(true)
  const lenisRef = useRef(null)

  // ── Lenis smooth scroll (desktop only — iOS Safari has native momentum) ──
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const lenis = new Lenis({
      duration:    1.25,
      easing:      (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  // ── Intro loader timing ──────────────────────────────────────────────
  // 2000ms display → AnimatePresence triggers 1.1s fade-out → Hero reveals
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <CustomCursor />
      <ScrollProgress />

      <AnimatePresence>
        {loading && <IntroLoader key="loader" />}
      </AnimatePresence>

      <motion.main
        className="bg-raw-black min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
      >
        <Ticker accent />
        <Navbar />

        {/* Hero gets `ready` so its stagger fires after loader exits */}
        <Hero ready={!loading} />

        <Ticker reverse />

        <FadeIn><Manifesto /></FadeIn>
        <FadeIn delay={0.05}><SustainabilityBar /></FadeIn>
        <FadeIn delay={0.05}><ProductGallery /></FadeIn>
        <FadeIn delay={0.05}><Mission /></FadeIn>
        <FadeIn delay={0.05}><FAQ /></FadeIn>
        <FadeIn delay={0.05}><Waitlist /></FadeIn>
        <FadeIn delay={0.05}><Footer /></FadeIn>
      </motion.main>
    </>
  )
}
