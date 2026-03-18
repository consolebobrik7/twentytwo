/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'raw-black':    '#080808',
        'raw-dark':     '#0d0d0d',
        'raw-charcoal': '#141414',
        'raw-slate':    '#252525',
        'raw-border':   '#1e1e1e',
        // warm accent — pulled from the logo patchwork reds
        'brand':        '#8b1a1a',
        'brand-light':  '#b52e2e',
        'brand-fade':   '#c97070',
        // text
        'off-white':    '#ede9e3',
        'chalk':        '#d9d4cc',
        'ash':          '#7a756e',
        'rust':         '#c4622d',
      },
      fontFamily: {
        inter:   ['Inter', 'system-ui', 'sans-serif'],
        grotesk: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono:    ['"Space Mono"', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 10vw, 8rem)', { lineHeight: '0.92', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.5rem, 7vw, 5.5rem)',  { lineHeight: '0.95', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.75rem, 4vw, 3rem)',   { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'label':      ['0.6875rem',                   { lineHeight: '1',    letterSpacing: '0.15em' }],
      },
      spacing: {
        'section':    '7rem',
        'gutter':     '1.25rem',
        'gutter-lg':  '4rem',
      },
      maxWidth: {
        'content': '1200px',
      },
      borderWidth: {
        '0.5': '0.5px',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
