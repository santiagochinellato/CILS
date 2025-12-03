import { createClient } from '@sanity/client';

if (!import.meta.env.VITE_SANITY_PROJECT_ID) {
  // Using fallback configuration when VITE_SANITY_PROJECT_ID is not defined
}

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '81u4pzxo',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
  useCdn: false, // Desactivar CDN para ver cambios al instante
  ignoreBrowserTokenWarning: true, // Suprimir warnings del cliente
  requestTagPrefix: 'cils',
  timeout: 5000, // 5 segundos timeout para evitar cuelgues
});

