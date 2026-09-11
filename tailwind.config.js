/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#FAF5F0',
          100: '#F5E6D3',
          200: '#E8CDA8',
          300: '#D4A574',
          400: '#B8834A',
          500: '#6F4E37',
          600: '#5A3E2B',
          700: '#422D1F',
          800: '#2B1D14',
          900: '#1A110B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace']
      }
    }
  },
  plugins: []
};
