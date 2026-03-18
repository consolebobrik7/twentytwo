import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'

import CustomCursor   from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import IntroLoader    from './components/IntroLoader'
import Ticker         from './components/Ticker'

const Home          = lazy(() => import('./pages/Home'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))

// IntroLoader only shows once per browser session
const hasVisited = sessionStorage.getItem('__22_visited')

function AnimatedRoutes({ ready }) {
  const location = useLocation()
  return (
    <Suspense fallback={null}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home ready={ready} />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  )
}

function AppInner() {
  const [loading, setLoading] = useState(!hasVisited)
  const lenisRef = useRef(null)

  // Lenis smooth scroll (desktop only)
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const lenis = new Lenis({
      duration:    1.25,
      easing:      (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis
    window.__lenis = lenis

    let rafId
    function raf(time) { lenis.raf(time); rafId = requestAnimationFrame(raf) }
    rafId = requestAnimationFrame(raf)

    return () => { cancelAnimationFrame(rafId); lenis.destroy() }
  }, [])

  // Intro loader — only on first visit
  useEffect(() => {
    if (hasVisited) return
    const t = setTimeout(() => {
      setLoading(false)
      sessionStorage.setItem('__22_visited', '1')
    }, 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      {/* Global fixed ticker — always pinned at the very top */}
      <div className="fixed top-0 left-0 right-0 z-[60]">
        <Ticker accent />
      </div>

      <CustomCursor />
      <ScrollProgress />

      <AnimatePresence>
        {loading && <IntroLoader key="loader" />}
      </AnimatePresence>

      <motion.div
        className="bg-raw-black min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
      >
        <AnimatedRoutes ready={!loading} />
      </motion.div>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
