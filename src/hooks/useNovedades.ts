import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../config/api';

export interface NovedadItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  image?: string | null;
  publishedAt: string;
  tags: string[];
  region: string | null;
}

// Datos de fallback para cuando el backend falla
const fallbackNovedades: NovedadItem[] = [
  {
    id: '1',
    title: 'Nuevas disposiciones fiscales 2024',
    summary: 'Actualizaciones importantes en materia fiscal y contable.',
    url: '#',
    source: 'AFIP',
    image: null,
    publishedAt: new Date().toISOString(),
    tags: ['Fiscal', 'AFIP'],
    region: 'Nacional'
  },
  {
    id: '2',
    title: 'Cambios en normativa laboral',
    summary: 'Nuevas regulaciones que afectan las relaciones laborales.',
    url: '#',
    source: 'Ministerio de Trabajo',
    image: null,
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    tags: ['Laboral', 'Normativa'],
    region: 'Nacional'
  }
];

interface Options { tag?: string; region?: string; limit?: number }

export function useNovedades(opts: Options = {}) {
  const [data, setData] = useState<NovedadItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (opts.tag) params.set('tag', opts.tag);
    if (opts.region) params.set('region', opts.region);
    if (opts.limit) params.set('limit', String(opts.limit));
    const url = `${API_ENDPOINTS.novedades}?${params.toString()}`;

    let cancelled = false;
    let timeoutId: NodeJS.Timeout;
    
    setLoading(true);
    
    // Timeout de 3 segundos para usar fallback
    timeoutId = setTimeout(() => {
      if (!cancelled) {
        setData(fallbackNovedades.slice(0, opts.limit || 8));
        setError(null);
        setLoading(false);
      }
    }, 3000);
    
    fetch(url)
      .then(async (res) => {
        if (!cancelled) {
          clearTimeout(timeoutId);
          if (!res.ok) {
            // Usar fallback en caso de error HTTP
            setData(fallbackNovedades.slice(0, opts.limit || 8));
            setError(null);
            return;
          }
          const json = await res.json();
          if (json && Array.isArray(json) && json.length > 0) {
            setData(json);
            setError(null);
          } else {
            // Si no hay datos, usar fallback
            setData(fallbackNovedades.slice(0, opts.limit || 8));
            setError(null);
          }
        }
      })
      .catch((e) => {
        if (!cancelled) {
          clearTimeout(timeoutId);
          // En caso de error de red, usar fallback
          setData(fallbackNovedades.slice(0, opts.limit || 8));
          setError(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => { 
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [opts.tag, opts.region, opts.limit]);

  return { data, loading, error };
}
