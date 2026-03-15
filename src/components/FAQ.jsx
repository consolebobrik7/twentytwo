import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.215, 0.61, 0.355, 1]

const faqs = [
  {
    q: 'What exactly is upcycling?',
    a: 'Upcycling means taking existing garments — deadstock denim, discarded fabric, second-hand clothing — and transforming them into something new. No virgin materials, no factory waste. Every piece starts its life somewhere else.',
  },
  {
    q: 'Are all pieces truly one-of-a-kind?',
    a: 'Yes. Because we work with found and reclaimed materials, no two pieces are identical. Once a drop is gone, it\'s gone — we never restock or reproduce.',
  },
  {
    q: 'How do I care for my piece?',
    a: 'Cold wash, gentle cycle, hang dry. Avoid tumble drying — the reworked seams and embroidery last much longer with minimal heat.',
  },
  {
    q: 'Can I order a custom piece?',
    a: 'Yes — DM us on Instagram @twentytwo.twentytwo_ with your idea. We take a limited number of custom orders per month.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit and debit cards via Stripe — Visa, Mastercard, American Express. Payments are processed securely.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Currently we ship within Cyprus. International shipping is coming with Collection 02 — drop your email to be notified.',
  },
]

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.06, ease }}
      style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
      >
        <span
          className="font-inter font-bold"
          style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)', color: '#ffffff', letterSpacing: '-0.01em' }}
        >
          {q}
        </span>
        <span
          className="shrink-0 font-mono transition-transform duration-300"
          style={{
            fontSize: '1.2rem',
            color: open ? '#b52e2e' : 'rgba(255,255,255,0.35)',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            display: 'block',
            lineHeight: 1,
          }}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            style={{ overflow: 'hidden' }}
          >
            <p
              className="font-inter pb-6 leading-relaxed"
              style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', maxWidth: '620px' }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  return (
    <section
      id="faq"
      className="py-section bg-raw-black"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="section-container">

        <div className="flex items-center gap-4 mb-16">
          <span
            className="font-mono uppercase"
            style={{ fontSize: '0.6rem', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.28)' }}
          >
            FAQ
          </span>
          <div className="flex-1" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }} />
        </div>

        <div className="grid md:grid-cols-2 gap-x-20 items-start">
          <div>
            <h2
              className="font-inter font-black uppercase leading-none mb-4"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                letterSpacing: '-0.03em',
                color: '#ffffff',
              }}
            >
              Common<br />
              <span style={{ color: '#b52e2e' }}>Questions.</span>
            </h2>
            <p
              className="font-inter mb-10 md:mb-0"
              style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}
            >
              Can't find what you're looking for?{' '}
              <a
                href="https://instagram.com/twentytwo.twentytwo_"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#ffffff', textDecoration: 'underline', textUnderlineOffset: '3px' }}
              >
                DM us on Instagram.
              </a>
            </p>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            {faqs.map((item, i) => (
              <FAQItem key={i} {...item} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
