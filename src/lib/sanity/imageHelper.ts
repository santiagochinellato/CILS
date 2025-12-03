import { createImageUrlBuilder } from '@sanity/image-url';
import { sanityClient } from './client';

const builder = createImageUrlBuilder(sanityClient);

// Tipo simplificado para soportar referencias de Sanity o strings
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ImageSource = any;

/**
 * Helper para obtener URLs optimizadas de imágenes de Sanity
 * con formato WebP, tamaño específico y calidad ajustada
 */
export function getSanityImageUrl(
  source: ImageSource | string | undefined,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
    fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
  } = {}
): string {
  if (!source) return '';

  // Si es una ruta local, retornarla directamente
  if (typeof source === 'string' && (source.startsWith('/') || source.startsWith('images/'))) {
    return source;
  }

  const {
    width = 400,
    height = 400,
    quality = 75,
    format = 'webp',
    fit = 'crop'
  } = options;

  try {
    let url = builder
      .image(source)
      .width(width)
      .height(height)
      .fit(fit)
      .quality(quality)
      .url();
    
    // Asegurar que tenga el parámetro fm=webp para formato WebP
    if (format === 'webp' && !url.includes('fm=webp')) {
      url += (url.includes('?') ? '&' : '?') + 'fm=webp';
    }
    
    return url;
  } catch (error) {
    // Error processing Sanity image silently handled
    return typeof source === 'string' ? source : '';
  }
}

/**
 * Helper específico para fotos del equipo
 * Optimizado para los tamaños reales de visualización
 */
export function getTeamMemberPhoto(
  source: ImageSource | string | undefined,
  size: 'small' | 'medium' | 'large' = 'medium'
): string {
  const sizeMap = {
    small: { width: 56, height: 56 },    // Auxiliares y pasantes
    medium: { width: 80, height: 80 },   // Liderazgo
    large: { width: 100, height: 100 }   // Fundadores
  };

  const dimensions = sizeMap[size];

  return getSanityImageUrl(source, {
    width: dimensions.width,
    height: dimensions.height,
    quality: 80,
    format: 'webp',
    fit: 'crop'
  });
}
