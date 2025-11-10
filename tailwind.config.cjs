/**** Tailwind Config ****/ 
const colors = {
  primary: '#106973',
  secondary: '#307C86',
  accent1: '#7AC3B1',
  accent2: '#A0D4C5',
  background: '#F8FAFB',
  white: '#FFFFFF',
  text: '#2D3748',
  textLight: '#718096'
};

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors,
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif']
      },
      boxShadow: {
        card: '0 8px 24px -4px rgba(0,0,0,0.08)',
        cardHover: '0 20px 40px -8px rgba(0,0,0,0.15)'
      }
    }
  },
  plugins: []
};
