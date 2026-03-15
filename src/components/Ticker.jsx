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

export default function Ticker({ reverse = false, accent = false }) {
  const row = [...ITEMS, ...ITEMS]

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
        className="flex gap-10 whitespace-nowrap w-max"
        style={{
          animation: reverse
            ? 'ticker 22s linear infinite reverse'
            : 'ticker 22s linear infinite',
        }}
      >
        {row.map((item, i) => (
          <span
            key={i}
            className={`font-mono text-[0.6rem] uppercase tracking-[0.25em]
              ${accent ? 'text-off-white' : 'text-ash/70'}`}
          >
            {item}
            <span className={`ml-10 ${accent ? 'text-off-white/50' : 'text-brand-light/60'}`}>
              ——
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
