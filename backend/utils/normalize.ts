import { RawItem, NovedadItem } from '../types';
import { TAGS_DICTIONARY, REGIONES, BLACKLIST, ALLOWED_SOURCES } from '../config/taxonomy';
import crypto from 'crypto';

function textOr(str?: string | null) {
  return (str || '').toString();
}

function pickDate(item: RawItem): string {
  const s = item.publishedAt || item.isoDate || item.pubDate;
  const d = s ? new Date(s) : new Date();
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

function detectTags(text: string): string[] {
  const t = text.toLowerCase();
  const tags: string[] = [];
  for (const [tag, keywords] of Object.entries(TAGS_DICTIONARY)) {
    if (keywords.some(k => t.includes(k))) tags.push(tag);
  }
  return Array.from(new Set(tags));
}

function detectRegion(text: string): string | null {
  const t = text.toLowerCase();
  for (const [region, keywords] of Object.entries(REGIONES)) {
    if (keywords.some(k => t.includes(k))) return region;
  }
  return null;
}

function firstImage(item: RawItem): string | null {
  if (item.urlToImage) return item.urlToImage;
  if (item.enclosure?.url) return item.enclosure.url;
  // Could parse HTML content for <img> or og:image later
  return null;
}

function makeId(url: string, title: string): string {
  return crypto.createHash('sha256').update(url + '|' + title).digest('hex').slice(0, 16);
}

function isBlacklisted(text: string): boolean {
  const t = text.toLowerCase();
  return BLACKLIST.some(word => t.includes(word));
}

function isAllowedSource(source: string): boolean {
  const s = source.toLowerCase();
  return ALLOWED_SOURCES.some(allowed => s.includes(allowed));
}

function isRelevant(text: string, tags: string[], source: string): boolean {
  // Debe tener al menos 1 tag detectado
  if (tags.length === 0) return false;
  
  // No debe estar en blacklist
  if (isBlacklisted(text)) return false;
  
  // Debe ser de fuente argentina permitida
  if (!isAllowedSource(source)) return false;
  
  return true;
}

export function normalizeItems(raw: RawItem[]): NovedadItem[] {
  const out: NovedadItem[] = [];
  for (const r of raw) {
    const url = r.link || r.url || '';
    const title = textOr(r.title);
    if (!url || !title) continue;
    
    const summary = textOr(r.contentSnippet || r.description || '').trim();
    const baseText = `${title} ${summary}`.toLowerCase();
    const source = textOr(r.source || 'RSS/News');
    
    // Detectar tags y región
    const tags = detectTags(baseText);
    const region = detectRegion(baseText);
    
    // FILTRO DE RELEVANCIA: descartar si no es relevante o fuente no argentina
    if (!isRelevant(baseText, tags, source)) {
      continue; // Saltear esta noticia
    }
    const publishedAt = pickDate(r);
    const image = firstImage(r);
    const id = makeId(url, title);
    
    out.push({ id, title, summary, url, source, image: image || null, publishedAt, tags, region });
  }
  return out;
}

export function dedupeAndSort(items: NovedadItem[]): NovedadItem[] {
  const map = new Map<string, NovedadItem>();
  for (const it of items) {
    const key = it.id || it.url;
    const prev = map.get(key);
    if (!prev) map.set(key, it);
    else {
      // keep the most recent
      if (new Date(it.publishedAt) > new Date(prev.publishedAt)) map.set(key, it);
    }
  }
  // Also dedupe by URL if different IDs
  const urlMap = new Map<string, NovedadItem>();
  for (const it of map.values()) {
    if (!urlMap.has(it.url)) urlMap.set(it.url, it);
    else {
      const prev = urlMap.get(it.url)!;
      if (new Date(it.publishedAt) > new Date(prev.publishedAt)) urlMap.set(it.url, it);
    }
  }
  return Array.from(urlMap.values()).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}
