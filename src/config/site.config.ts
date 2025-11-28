import { useSanityConfigContext } from '../contexts/SanityConfigContext';
import corporateCils from './templates/corporate.cils';
import landingMinimal from './templates/landing.minimal';
export * from './types';

// Exportar hook y context para usar Sanity
export { useSanityConfig } from '../hooks/useSanityConfig';
export { useSanityConfigContext, SanityConfigProvider } from '../contexts/SanityConfigContext';

// Selección de template por variable de entorno (default: corporate)
const activeTemplateName = import.meta.env.VITE_TEMPLATE || 'corporate';

// Configuración estática (fallback)
const staticSiteConfig = activeTemplateName === 'minimal' ? landingMinimal : corporateCils;

// Hook para obtener config (usa Sanity si está disponible, sino fallback estático)
export function useSiteConfig() {
  try {
    const sanityContext = useSanityConfigContext();
    
    // Si hay error, usar estático explícitamente (aunque el context ya debería tener fallback)
    if (sanityContext.error) {
      return staticSiteConfig;
    }
    
    // Si está cargando, el context devuelve el config por defecto (corporateCils)
    // o el último config cargado.
    return sanityContext.config || staticSiteConfig;
  } catch {
    // Si no hay contexto disponible (usado fuera de provider), usar estático
    return staticSiteConfig;
  }
}

// Exportar siteConfig como función que usa el hook (para compatibilidad)
// Los componentes deben usar useSiteConfig() hook en lugar de siteConfig directamente
export const getSiteConfig = () => {
  // Esta función solo se usa en componentes que no pueden usar hooks
  // En esos casos, usar el contexto directamente
  return staticSiteConfig;
};

// Mantener exportaciones estáticas para compatibilidad (pero se recomienda usar useSiteConfig)
export const siteConfig = staticSiteConfig;
export const homeConfig = landingMinimal;
export const pagesConfig = corporateCils;
