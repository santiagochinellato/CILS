import React, { useEffect, useState, useCallback } from 'react';
import { siteConfig } from '../../config/site.config';
import { Icon } from '../ui/Icon';

export const FloatingActions: React.FC = () => {
  const { floating } = siteConfig;
  const [showTop, setShowTop] = useState(false);
  
  const handleScroll = useCallback(() => {
    setShowTop(window.scrollY > 500);
  }, []);
  
  useEffect(() => {
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]);
  
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  return (
    <>
      <a
        href={floating.whatsapp.href}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 w-14 h-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-lg hover:scale-110 transition-transform z-[999] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        aria-label="Contactar por WhatsApp"
      >
        <Icon name="whatsapp" size={28} context="footer" />
      </a>
      {floating.scrollTop.enabled && showTop && (
        <button
          aria-label="Volver arriba"
          onClick={scrollToTop}
          className="fixed bottom-24 right-5 w-14 h-14 rounded-full bg-secondary text-white grid place-items-center shadow-lg hover:-translate-y-1 hover:scale-110 transition-all z-[999] focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
        >
          <Icon name="chevronUp" size={24} context="footer" />
        </button>
      )}
    </>
  );
};
