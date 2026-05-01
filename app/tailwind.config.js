/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        page:   '#0a0e1a',
        panel:  '#0e1424',
        panel2: '#0b1020',
        ink:    '#ffffff',
        ink2:   '#c8cfdc',
        ink3:   '#8892a8',
        gold:   '#c9a87c',
        goldL:  '#e7cfa3',
        cream:  '#fbe7c4',
      },
      fontFamily: {
        sans:    ['Inter', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 0 1px rgba(201,168,122,0.25), 0 20px 60px -20px rgba(201,168,122,0.25)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
