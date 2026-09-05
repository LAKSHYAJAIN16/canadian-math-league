/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Canadian flag red — the one accent color, used at whatever
        // strength the moment calls for (soft tint through full fill).
        redpen: {
          950: '#4A0810',
          900: '#6B0B16',
          800: '#8F0E1D',
          700: '#B41225',
          600: '#DC1F35', // primary brand red
          500: '#E8394C',
          400: '#EF6472',
          300: '#F49AA3',
          200: '#F9C6CB',
          100: '#FCE2E5',
          50: '#FEF3F4',
        },
        blueprint: {
          950: '#4A0810',
          900: '#6B0B16',
          800: '#8F0E1D',
          700: '#B41225',
          600: '#DC1F35',
          500: '#E8394C',
          400: '#EF6472',
          300: '#F49AA3',
          200: '#F9C6CB',
          100: '#FCE2E5',
          50: '#FEF3F4',
        },
        paper: {
          DEFAULT: '#FFFFFF',
          line: '#F1E4E5',
          ink: '#FDF7F7',
        },
        // Warm dark gray — friendlier than pure black.
        graphite: {
          900: '#241E1F',
          700: '#493D3F',
          600: '#6B5B5D',
          400: '#9C8A8C',
          300: '#C9BABB',
        },
        // "Answer Key" world — exam-booklet stock, ink, and one
        // institutional stamp red. Now the sitewide system; redpen/graphite/
        // paper/blueprint above are the retired Friendly Field/Blueprint
        // tokens, kept only so old references don't 404 mid-migration.
        ledger: {
          DEFAULT: '#F5EFDF',
          deep: '#EDE4CC',
          line: '#D9CDA8',
        },
        ink: {
          900: '#211C15',
          700: '#4A4234',
          // Darkened from #7A705C — the original only hit 4.25:1 on ledger,
          // just under WCAG AA's 4.5:1 floor for normal-size text. This
          // clears 5.09:1 on ledger / 4.61:1 on ledger-deep.
          500: '#6D6452',
          300: '#B4A98C',
        },
        stamp: {
          700: '#7E140F',
          600: '#9C1D16',
          500: '#B93227',
          100: '#F2DCD6',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Alike', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgba(36, 30, 31, 0.08), 0 8px 24px -8px rgba(36, 30, 31, 0.10)',
        'soft-lg': '0 4px 16px -4px rgba(36, 30, 31, 0.10), 0 16px 40px -12px rgba(36, 30, 31, 0.14)',
        'red-glow': '0 8px 24px -8px rgba(220, 31, 53, 0.35)',
      },
      keyframes: {
        'redpen-draw': {
          from: { strokeDashoffset: '1' },
          to: { strokeDashoffset: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
