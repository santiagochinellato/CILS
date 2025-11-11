/**
 * Constantes de la aplicación
 * Centraliza valores mágicos para facilitar mantenimiento
 */

export const ANIMATION_DURATIONS = {
  fast: 200,
  normal: 300,
  slow: 500,
  carousel: 40000,
} as const;

export const Z_INDEX = {
  dropdown: 50,
  sticky: 100,
  overlay: 900,
  modal: 1000,
  floating: 999,
  header: 1000,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const SCROLL_THRESHOLDS = {
  headerSticky: 60,
  showScrollTop: 500,
} as const;

export const TIMEOUTS = {
  loadingScreen: 1500,
  successMessage: 4000,
  debounce: 300,
} as const;

export const ROUTES = {
  home: '/',
  about: '/nosotros',
  services: '/servicios',
  clients: '/clientes',
  news: '/novedades',
  links: '/links',
  contact: '/contacto',
} as const;
