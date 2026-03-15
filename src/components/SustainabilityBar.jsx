const metrics = [
  '0L WATER USED',
  '100% REWORKED TEXTILES',
  'CYPRUS-BASED',
]

export default function SustainabilityBar() {
  return (
    <div
      className="bg-raw-black"
      style={{
        borderTop:    '1px solid rgba(255,255,255,0.07)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div className="section-container">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-y-3 py-4">
          {metrics.map((item, i) => (
            <div key={item} className="flex items-center gap-5">
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.28em',
                  color: 'rgba(255,255,255,0.45)',
                }}
              >
                {item}
              </span>
              {i < metrics.length - 1 && (
                <span
                  className="font-mono hidden md:inline"
                  style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.15)' }}
                >
                  //
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
