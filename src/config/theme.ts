// Design System Tokens para Estudio CILS
export const theme = {
  colors: {
    primary: '#106973',
    secondary: '#307C86',
    accent1: '#7AC3B1',
    accent2: '#A0D4C5',
    background: '#F8FAFB',
    white: '#FFFFFF',
    text: '#2D3748',
    textLight: '#718096'
  },
  fonts: {
    heading: 'Montserrat, sans-serif',
    body: 'Inter, sans-serif',
    stats: 'Poppins, sans-serif'
  },
  typography: {
    h1: { size: 48, weight: 700 },
    h2: { size: 36, weight: 600 },
    h3: { size: 28, weight: 600 },
    h4: { size: 22, weight: 500 },
    body: { size: 16, weight: 400 },
    small: { size: 14, weight: 400 },
    lead: { size: 18, weight: 500 }
  },
  layout: {
    header: { heightDesktop: 80, heightMobile: 64, zIndex: 1000 },
    container: 1120,
    radius: 16,
    spacing: {
      xs: 8,
      sm: 12,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 48
    }
  },
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1440
  },
  shadow: {
    card: '0 8px 24px -4px rgba(0,0,0,0.08)',
    cardHover: '0 20px 40px -8px rgba(0,0,0,0.15)'
  }
};

export type Theme = typeof theme;
