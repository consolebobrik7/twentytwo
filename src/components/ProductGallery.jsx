import ProductCard from './ProductCard'
import { products } from '../data/products'

export default function ProductGallery() {
  return (
    <section
      id="collection"
      className="py-section bg-raw-black"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="section-container">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <span
              className="font-mono uppercase block mb-4"
              style={{ fontSize: '0.65rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)' }}
            >
              Collection 01
            </span>
            <h2
              className="font-inter font-black uppercase leading-none"
              style={{
                fontSize: 'clamp(2rem, 5.5vw, 4.5rem)',
                letterSpacing: '-0.03em',
                color: '#ffffff',
              }}
            >
              Worn Before.
              <br />
              <span style={{ color: '#b52e2e' }}>Worn Better.</span>
            </h2>
          </div>

          <p
            className="font-inter font-light max-w-xs text-sm leading-relaxed md:text-right"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            Three categories. Zero mass production.
            Every piece carries the history of the fabric it came from.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
             style={{ background: 'rgba(255,255,255,0.06)' }}>
          {products.map(p => (
            <ProductCard key={p.slug} {...p} />
          ))}
        </div>

        <p
          className="font-mono uppercase mt-8 text-center"
          style={{ fontSize: '0.58rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)' }}
        >
          All drops are limited. No restocks. No exceptions.
        </p>
      </div>
    </section>
  )
}
