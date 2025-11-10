import corporateCils from './templates/corporate.cils';
import landingMinimal from './templates/landing.minimal';
export * from './types';

// Selección de template por variable de entorno (default: corporate)
const activeTemplateName = import.meta.env.VITE_TEMPLATE || 'corporate';
export const siteConfig = activeTemplateName === 'minimal' ? landingMinimal : corporateCils;

// Config específica para Home (usa landingMinimal)
export const homeConfig = landingMinimal;

// Config para el resto de páginas (usa corporateCils)
export const pagesConfig = corporateCils;
