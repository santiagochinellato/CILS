import axios from 'axios';
import { RawItem } from '../types';
import { NEWSAPI_QUERIES } from '../config/sources';

const NEWSAPI_URL = 'https://newsapi.org/v2/everything';

export async function fetchNewsApi(apiKey: string): Promise<RawItem[]> {
  if (!apiKey) return [];
  const all: RawItem[] = [];
  for (const q of NEWSAPI_QUERIES) {
    try {
      const params: any = { 
        q: q.q, 
        language: q.language, 
        pageSize: q.pageSize, 
        sortBy: (q as any).sortBy || 'publishedAt',
        apiKey 
      };
      
      // Añadir domains si está configurado
      if ((q as any).domains) {
        params.domains = (q as any).domains;
      }
      
      const res = await axios.get(NEWSAPI_URL, { params });
      const articles = res.data?.articles || [];
      for (const a of articles) {
        all.push({
          title: a.title,
          link: a.url,
          url: a.url,
          description: a.description,
          contentSnippet: a.description,
          publishedAt: a.publishedAt,
          urlToImage: a.urlToImage,
          source: a.source?.name || 'NewsAPI'
        });
      }
    } catch (e) {
      console.error('NewsAPI fetch error', q.q, e);
    }
  }
  return all;
}
