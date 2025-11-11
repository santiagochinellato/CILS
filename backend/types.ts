export interface RawItem {
  title: string;
  link: string;
  pubDate?: string;
  isoDate?: string;
  contentSnippet?: string;
  content?: string;
  enclosure?: { url?: string };
  creator?: string;
  source?: string; // For NewsAPI provider name
  url?: string; // NewsAPI uses url
  description?: string; // NewsAPI
  publishedAt?: string; // NewsAPI
  urlToImage?: string; // NewsAPI
}

export interface NovedadItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  image?: string | null;
  publishedAt: string; // ISO
  tags: string[];
  region: string | null;
}

export interface FetchContext {
  now: Date;
}
