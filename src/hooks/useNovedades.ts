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
    setLoading(true);
    fetch(url)
      .then(async (res) => {
        if (!res.ok) {
          // Manejo silencioso de errores HTTP para evitar console errors
          return { error: `HTTP ${res.status}` };
        }
        return res.json();
      })
      .then((json) => {
        if (!cancelled) {
          if (json.error) {
            setError(json.error);
            setData(null);
          } else {
            setData(json);
            setError(null);
          }
        }
      })
      .catch((e) => {
        if (!cancelled) {
          // Error silencioso, no usamos console.error
          setError('Error de conexión');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true };
  }, [opts.tag, opts.region, opts.limit]);

  return { data, loading, error };
}
