export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="bg-raw-black border-t border-raw-slate pt-14 pb-14"
      style={{ paddingBottom: 'calc(3.5rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="section-container">

        {/* Top row — wordmark + nav */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">

          <span
            className="font-inter font-black uppercase"
            style={{ fontSize: '1.1rem', letterSpacing: '-0.02em', color: '#ffffff' }}
          >
            twentytwo<span style={{ color: '#b52e2e' }}>.</span>twentytwo
          </span>

          <nav className="flex flex-wrap gap-6 md:gap-10">
            {[['#collection','Collection'],['#manifesto','Manifesto'],['#faq','FAQ'],['#contact','Contact']].map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={e => { e.preventDefault(); window.__lenis ? window.__lenis.scrollTo(href, { offset: -60 }) : document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }) }}
                className="label-tag hover:text-off-white transition-colors"
              >{label}</a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-raw-slate mb-10" />

        {/* Contact row */}
        <div className="flex flex-col gap-6 sm:flex-row sm:gap-12 mb-10">
          <a
            href="https://instagram.com/twentytwo.twentytwo_"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group"
          >
            <span
              className="font-mono uppercase"
              style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)' }}
            >
              Instagram
            </span>
            <span
              className="font-mono uppercase transition-colors group-hover:text-white"
              style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.6)' }}
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
              style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.35)' }}
            >
              Email
            </span>
            <span
              className="font-mono transition-colors group-hover:text-white break-all"
              style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)' }}
            >
              twentytwo.twentytwo2025@gmail.com
            </span>
          </a>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p
            className="font-mono uppercase"
            style={{ fontSize: '0.55rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.18)' }}
          >
            © {year} twentytwo.twentytwo — All rights reserved.
          </p>
          <p
            className="font-mono uppercase"
            style={{ fontSize: '0.55rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.18)' }}
          >
            Made in Cyprus // Circular Fashion Lab
          </p>
          <p
            className="font-mono uppercase"
            style={{ fontSize: '0.55rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.18)' }}
          >
            Edited by{' '}
            <a
              href="https://hexadev-web.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hexadev-gradient"
            >
              HexaDev Team
            </a>
          </p>
        </div>

      </div>
    </footer>
  )
}
