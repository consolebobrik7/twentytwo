import { motion } from 'framer-motion'
import FadeIn            from '../components/FadeIn'
import Ticker            from '../components/Ticker'
import Navbar            from '../components/Navbar'
import Hero              from '../components/Hero'
import Manifesto         from '../components/Manifesto'
import SustainabilityBar from '../components/SustainabilityBar'
import ProductGallery    from '../components/ProductGallery'
import Mission           from '../components/Mission'
import FAQ               from '../components/FAQ'
import Waitlist          from '../components/Waitlist'
import Footer            from '../components/Footer'

const ease = [0.215, 0.61, 0.355, 1]

export default function Home({ ready }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease }}
    >
      <Ticker accent />
      <Navbar />
      <Hero ready={ready} />
      <Ticker reverse />
      <FadeIn><Manifesto /></FadeIn>
      <FadeIn delay={0.05}><SustainabilityBar /></FadeIn>
      <FadeIn delay={0.05}><ProductGallery /></FadeIn>
      <FadeIn delay={0.05}><Mission /></FadeIn>
      <FadeIn delay={0.05}><FAQ /></FadeIn>
      <FadeIn delay={0.05}><Waitlist /></FadeIn>
      <FadeIn delay={0.05}><Footer /></FadeIn>
    </motion.div>
  )
}
