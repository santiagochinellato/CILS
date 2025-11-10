import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.classList.add('opacity-100', 'translate-y-0');
          observer.unobserve(el);
        }
      });
    }, options ?? { rootMargin: '0px 0px -10% 0px' });

    // estado inicial
    el.classList.add('opacity-0', 'translate-y-6', 'transition-all', 'duration-700');

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return ref;
}
