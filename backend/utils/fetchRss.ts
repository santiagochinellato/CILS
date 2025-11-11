import Parser from 'rss-parser';
import { RSS_SOURCES } from '../config/sources';
import { RawItem } from '../types';

const parser = new Parser();

export async function fetchAllRss(): Promise<RawItem[]> {
  const results: RawItem[] = [];
  for (const src of RSS_SOURCES) {
    try {
      const feed = await parser.parseURL(src.url);
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
    } catch (e) {
      console.error('RSS fetch error', src.name, e);
    }
  }
  return results;
}
