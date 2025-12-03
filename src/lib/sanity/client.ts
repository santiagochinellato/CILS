import { createClient } from '@sanity/client';

if (!import.meta.env.VITE_SANITY_PROJECT_ID) {
  if (import.meta.env.DEV) {
    console.warn('VITE_SANITY_PROJECT_ID is not defined. Using fallback configuration.');
  }
}

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '81u4pzxo',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
  useCdn: false, // Desactivar CDN para ver cambios al instante
});

