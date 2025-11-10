import type { SEO } from '../config/types';

export function applySeo(seo: SEO) {
  if (typeof document === 'undefined') return;
  const { title, description, keywords, canonical, jsonLd } = seo;
  document.title = title;
  setMeta('description', description);
  if (keywords?.length) setMeta('keywords', keywords.join(', '));
  if (canonical) setLink('canonical', canonical);
  if (jsonLd) injectJsonLd(jsonLd);
}

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function injectJsonLd(data: Record<string, any>) {
  let el = document.getElementById('jsonld-seo');
  if (!el) {
    el = document.createElement('script');
    el.setAttribute('id', 'jsonld-seo');
    el.setAttribute('type', 'application/ld+json');
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}
