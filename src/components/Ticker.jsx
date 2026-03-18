const ITEMS = [
  'UPCYCLED DENIM',
  'REWORKED IN CYPRUS',
  '22.22',
  'ANTI FAST-FASHION',
  'HAND-CUT',
  'ONE OF ONE',
  'ZERO NEW FABRIC',
  'SLOW DROP',
]

// Repeat enough times so the strip is always wider than the viewport
const ROW = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS]

export default function Ticker({ reverse = false, accent = false }) {
  return (
    <div
      className={`
        overflow-hidden border-b-2 border-dashed py-2 select-none
        ${accent
          ? 'bg-brand border-brand/60'
          : 'bg-raw-charcoal border-raw-slate/50'}
      `}
    >
      <div
        className="flex whitespace-nowrap w-max will-change-transform"
        style={{
          animation: `ticker ${reverse ? '28s' : '22s'} linear infinite ${reverse ? 'reverse' : ''}`,
        }}
      >
        {ROW.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={`font-mono text-[0.6rem] uppercase tracking-[0.25em] px-5
              ${accent ? 'text-off-white' : 'text-ash/70'}`}
          >
            {item}
            <span className={`ml-5 ${accent ? 'text-off-white/40' : 'text-brand-light/60'}`}>
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
