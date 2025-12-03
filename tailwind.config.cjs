/**** Tailwind Config ****/ 
const colors = {
  primary: '#106973',
  secondary: '#307C86',
  accent1: '#7AC3B1',
  accent2: '#5FB59F', // Cambiado de #A0D4C5 a #5FB59F para mejor contraste con text-primary
  background: '#F8FAFB',
  white: '#FFFFFF',
  text: '#2D3748',
  textLight: '#5A6474' // Cambiado para mejor contraste (4.5:1 en fondo blanco)
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
