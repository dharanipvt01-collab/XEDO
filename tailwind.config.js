/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        xedo: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#2563eb', // Primary
          600: '#1d4ed8',
          700: '#1e40af',
          purple: '#7c3aed', // Secondary
          accent: '#6366f1',
          success: '#16a34a',
          warning: '#f59e0b',
          danger: '#dc2626',
          bg: '#f8fafc',
          text: '#0f172a',
          muted: '#64748b',
          border: '#e2e8f0'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
