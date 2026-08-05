/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FAF9F6',
        paperCard: '#F4F3EF',
        paperMuted: '#EFECE6',
        ink: '#111827',
        inkLight: '#4B5563',
        forest: '#0C3B36',
        forestDark: '#072623',
        forestHover: '#124D47',
        trustpilot: '#00B67A',
        line: '#E5E7EB',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}
