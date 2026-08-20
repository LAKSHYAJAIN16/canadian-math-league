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
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Alike', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
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
