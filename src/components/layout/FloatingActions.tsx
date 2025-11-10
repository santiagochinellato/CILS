import React, { useEffect, useState } from 'react';
import { siteConfig } from '../../config/site.config';

export const FloatingActions: React.FC = () => {
  const { floating } = siteConfig;
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <>
      <a
        href={floating.whatsapp.href}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 w-14 h-14 rounded-full bg-[#25D366] text-white text-3xl grid place-items-center shadow-lg hover:scale-105 transition-transform z-[999]"
        aria-label="WhatsApp"
      >
        ☎
      </a>
      {floating.scrollTop.enabled && showTop && (
        <button
          aria-label="Ir arriba"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-5 w-12 h-12 rounded-full bg-secondary text-white text-xl grid place-items-center shadow-lg hover:-translate-y-1 transition-transform z-[999]"
        >
          ↑
        </button>
      )}
    </>
  );
};
