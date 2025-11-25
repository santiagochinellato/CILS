import Parser from 'rss-parser';
import { RSS_SOURCES } from '../config/sources';
import { RawItem } from '../types';

const parser = new Parser();

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url: string, attempts = 3): Promise<any> {
  let lastErr: any = null;
  for (let i = 0; i < attempts; i++) {
    try {
      return await parser.parseURL(url);
    } catch (e) {
      lastErr = e;
      const wait = 500 * Math.pow(2, i); // exponential backoff: 500ms, 1000ms, 2000ms
      console.warn(`RSS fetch attempt ${i + 1} failed for ${url}. Retrying in ${wait}ms...`);
      await delay(wait);
    }
  }
  throw lastErr;
}

export async function fetchAllRss(): Promise<RawItem[]> {
  const results: RawItem[] = [];
  for (const src of RSS_SOURCES) {
    try {
      const feed = await fetchWithRetry(src.url, 3);
      if (feed && Array.isArray(feed.items)) {
        for (const item of feed.items) {
          results.push({
            title: item.title || '',
            link: item.link || '',
            pubDate: item.pubDate,
            isoDate: (item as any).isoDate,
            contentSnippet: item.contentSnippet,
            content: item.content,
            enclosure: item.enclosure,
            source: src.name
          });
        }
      }
    } catch (e) {
      console.error('RSS fetch failed after retries for', src.name, src.url, e && e.message ? e.message : e);
    }
  }
  return results;
}
