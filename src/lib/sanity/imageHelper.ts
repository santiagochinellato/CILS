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
    quality = 85,
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
 * Optimizado para los tamaños reales de visualización con soporte para alta densidad
 */
export function getTeamMemberPhoto(
  source: ImageSource | string | undefined,
  size: 'small' | 'medium' | 'large' = 'medium'
): string {
  const sizeMap = {
    small: { width: 112, height: 112 },    // Auxiliares y pasantes (56px * 2 for retina)
    medium: { width: 160, height: 160 },   // Liderazgo (80px * 2 for retina)
    large: { width: 200, height: 200 }     // Fundadores (100px * 2 for retina)
  };

  const dimensions = sizeMap[size];

  return getSanityImageUrl(source, {
    width: dimensions.width,
    height: dimensions.height,
    quality: 90,
    format: 'webp',
    fit: 'crop'
  });
}
