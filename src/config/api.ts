/**
 * API Configuration
 * 
 * Configures the base URL for API calls based on environment
 * - Development: Uses Vite proxy to localhost:4000
 * - Production: Uses deployed backend URL
 */

// TODO: Replace with your actual Render.com backend URL after deployment
const PRODUCTION_API_URL = 'https://cils-backend.onrender.com';

export const API_BASE_URL = import.meta.env.PROD 
  ? PRODUCTION_API_URL
  : '/api';

export const API_ENDPOINTS = {
  novedades: `${API_BASE_URL}/novedades`,
  novedadesMeta: `${API_BASE_URL}/novedades/meta`,
  novedadesRefresh: `${API_BASE_URL}/novedades/refresh`,
} as const;
