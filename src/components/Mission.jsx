import { useRef, useEffect, useState } from 'react'
import { useInView, animate } from 'framer-motion'

// Animated number — counts from 0 to `to` when scrolled into view
function CountUp({ to, suffix = '', duration = 2 }) {
  const ref           = useRef(null)
  const isInView      = useInView(ref, { once: true, margin: '-80px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!isInView || to === 0) return
    const controls = animate(0, to, {
      duration,
      ease: [0.215, 0.61, 0.355, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    })
    return controls.stop
  }, [isInView, to, duration])

  return <span ref={ref}>{to === 0 ? 0 : val}{suffix}</span>
}

const stats = [
  { display: '0L',   label: 'Water Used Per Piece',  to: 0,   suffix: 'L'  },
  { display: '100%', label: 'Upcycled Denim',         to: 100, suffix: '%'  },
  { display: '200+', label: 'Garments Reworked',      to: 200, suffix: '+'  },
  { display: '0',    label: 'New Fabric Sourced',     to: 0,   suffix: ''   },
]

const steps = [
  {
    number: '01',
    title:  'Source',
    body:   'We hunt op-shops, clothing bins, and surplus markets for quality second-hand denim, tees, and fabric offcuts.',
  },
  {
    number: '02',
    title:  'Rework',
    body:   'Each piece is cut, patched, overdyed, or reconstructed by hand. No two items are identical.',
  },
  {
    number: '03',
    title:  'Release',
    body:   "Limited drops. Once it's gone, it's gone. No restocks. No reprints. That's the point.",
  },
]

export default function Mission() {
  return (
    <section id="mission" className="py-section bg-raw-black">
      <div className="section-container">

        <span className="label-tag block mb-10">The Mission</span>

        <h2 className="font-inter font-bold text-display-lg uppercase
                       text-off-white leading-none mb-16 max-w-2xl">
          Fashion shouldn't cost the earth.
          <span className="text-brand-light"> Literally.</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left — process steps */}
          <div className="space-y-10">
            {steps.map(step => (
              <div key={step.number} className="flex gap-6">
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <span className="font-mono text-label text-brand-light">{step.number}</span>
                  <div className="w-px flex-1 bg-raw-slate min-h-[3rem]" />
                </div>
                <div className="pb-4">
                  <h3 className="font-inter font-semibold text-xl text-off-white uppercase
                                 tracking-wide mb-2">
                    {step.title}
                  </h3>
                  <p className="font-inter font-light text-ash leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right — animated impact stats */}
          <div className="flex flex-col justify-center gap-10 lg:pl-8
                          lg:border-l lg:border-raw-slate">
            {stats.map(stat => (
              <div key={stat.display} className="group">
                <div className="font-mono font-bold text-display-md text-off-white
                                group-hover:text-brand-light transition-colors duration-300">
                  <CountUp to={stat.to} suffix={stat.suffix} />
                </div>
                <div className="label-tag mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

        </div>

        {/* Sustainability Impact strip */}
        <div
          className="mt-20 pt-10 flex flex-wrap items-center justify-between gap-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <span
            className="font-mono uppercase"
            style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.28)' }}
          >
            Sustainability Impact
          </span>
          <div className="flex flex-wrap gap-8 md:gap-14">
            {[
              { to: 0,   suffix: 'L', label: 'Water Used'     },
              { to: 100, suffix: '%', label: 'Upcycled Denim'  },
              { to: 0,   suffix: '',  label: 'Virgin Fabric'   },
            ].map((item) => (
              <div key={item.label} className="flex items-baseline gap-2">
                <span
                  className="font-inter font-black"
                  style={{ fontSize: '1.4rem', letterSpacing: '-0.03em', color: '#ffffff' }}
                >
                  <CountUp to={item.to} suffix={item.suffix} duration={1.6} />
                </span>
                <span
                  className="font-mono uppercase"
                  style={{ fontSize: '0.55rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)' }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
