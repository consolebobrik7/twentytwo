import { useState } from 'react'

export default function Waitlist() {
  const [email, setEmail]         = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError]         = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Enter a valid email address.')
      return
    }

    try {
      const res = await fetch('https://formspree.io/f/xreyayyg', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify({ email }),
      })

      if (res.ok) {
        setSubmitted(true)
        setError('')
      } else {
        setError('Something went wrong. Try again.')
      }
    } catch {
      setError('No connection. Try again.')
    }
  }

  return (
    <section
      id="contact"
      className="py-section bg-raw-black relative overflow-hidden"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Subtle brand glow */}
      <div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full
                   bg-brand opacity-[0.07] blur-3xl pointer-events-none"
      />

      <div className="section-container relative z-10">

        <span
          className="font-mono uppercase block mb-10"
          style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.35)' }}
        >
          Collection 01 — Now Live
        </span>

        <h2
          className="font-inter font-black uppercase leading-none mb-6 max-w-xl"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            letterSpacing: '-0.03em',
            color: '#ffffff',
          }}
        >
          Get Notified
          <br />
          <span style={{ color: '#b52e2e' }}>First.</span>
        </h2>

        <p
          className="font-inter font-light mb-12 max-w-md leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem' }}
        >
          22 pieces. Hand-reworked. Once they're gone, they're gone — no restocks, ever.
          Drop your email to hear about new collections before anyone else.
        </p>

        {/* CTA — view collection */}
        <a
          href="#collection"
          onClick={e => { e.preventDefault(); window.__lenis ? window.__lenis.scrollTo('#collection', { offset: -60 }) : document.querySelector('#collection')?.scrollIntoView({ behavior: 'smooth' }) }}
          className="font-inter font-bold uppercase inline-block mb-12 w-full sm:w-auto text-center
                     transition-opacity duration-150 hover:opacity-85"
          style={{
            backgroundColor: '#ffffff',
            color: '#080808',
            fontSize: '0.75rem',
            letterSpacing: '0.22em',
            padding: '1rem 2.5rem',
          }}
        >
          VIEW COLLECTION 01
        </a>

        <div
          className="mb-12"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        />

        {/* Email form */}
        {submitted ? (
          <div
            className="max-w-md px-6 py-5"
            style={{ border: '1px solid rgba(181,46,46,0.4)', background: 'rgba(139,26,26,0.08)' }}
          >
            <p
              className="font-inter font-bold uppercase mb-1"
              style={{ color: '#ffffff', letterSpacing: '0.1em', fontSize: '0.85rem' }}
            >
              You're on the list.
            </p>
            <p
              className="font-inter font-light"
              style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem' }}
            >
              We'll hit your inbox before anyone else hears about it.
            </p>
          </div>
        ) : (
          <div className="max-w-md">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0">
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                placeholder="your@email.com"
                className="flex-1 text-off-white font-inter text-sm px-4
                           placeholder:text-white/25 focus:outline-none transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  minHeight: '3rem',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.3)'}
                onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
              />
              <button
                type="submit"
                className="font-inter font-bold uppercase whitespace-nowrap
                           transition-opacity hover:opacity-85 mt-px sm:mt-0"
                style={{
                  background: '#ffffff',
                  color: '#080808',
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  padding: '0 1.75rem',
                  minHeight: '3rem',
                }}
              >
                NOTIFY ME
              </button>
            </form>
            {error && (
              <p
                className="mt-2 font-mono"
                style={{ fontSize: '0.65rem', color: '#c4622d', letterSpacing: '0.1em' }}
              >
                {error}
              </p>
            )}
          </div>
        )}

        {/* Contact links */}
        <div className="flex flex-col sm:flex-row gap-6 mt-12">
          <a
            href="https://instagram.com/twentytwo.twentytwo_"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group"
          >
            <span
              className="font-mono uppercase"
              style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.28)' }}
            >
              Instagram
            </span>
            <span
              className="font-mono transition-colors group-hover:text-white"
              style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.55)' }}
            >
              @twentytwo.twentytwo_
            </span>
          </a>
          <a
            href="mailto:twentytwo.twentytwo2025@gmail.com"
            className="flex items-center gap-3 group"
          >
            <span
              className="font-mono uppercase"
              style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.28)' }}
            >
              Email
            </span>
            <span
              className="font-mono transition-colors group-hover:text-white break-all"
              style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.55)' }}
            >
              twentytwo.twentytwo2025@gmail.com
            </span>
          </a>
        </div>

      </div>
    </section>
  )
}
