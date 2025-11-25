import 'dotenv/config';
import { fetchNewsApi } from '../utils/fetchNewsApi';
import { fetchAllRss } from '../utils/fetchRss';
import { normalizeItems, dedupeAndSort } from '../utils/normalize';
import { loadExisting, saveAll } from '../storage/fileStore';

export async function refreshNovedades() {
  const apiKey = process.env.NEWSAPI_KEY || '';
  const [rss, news] = await Promise.all([
    fetchAllRss(),
    fetchNewsApi(apiKey)
  ]);
  const normalized = normalizeItems([...rss, ...news]);
  const existing = loadExisting();
  const merged = dedupeAndSort([...normalized, ...existing]);
  saveAll(merged);
  return { added: normalized.length, total: merged.length };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  // Direct execution
  refreshNovedades().then(r => {
    console.log('Actualización de novedades completada:', r);
  });
}
