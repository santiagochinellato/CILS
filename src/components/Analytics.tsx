import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const Analytics: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    // Disparar page_view manual en cambios de ruta
    const path = location.pathname + location.search;
    // @ts-ignore
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      // @ts-ignore
      window.gtag('event', 'page_view', {
        page_path: path,
      });
    }
  }, [location.pathname, location.search]);
  return null;
};
