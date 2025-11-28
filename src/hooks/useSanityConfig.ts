import { useEffect, useState } from 'react';
import { sanityClient } from '../lib/sanity/client';
import { siteSettingsQuery } from '../lib/sanity/queries';
import type { SiteConfig } from '../config/types';
import corporateCils from '../config/templates/corporate.cils';

// Función para transformar datos de Sanity a SiteConfig
function transformSanityToSiteConfig(sanityData: any): SiteConfig {
  if (!sanityData) {
    return corporateCils;
  }

  // Transformar JSON-LD: convertir "context" -> "@context" y "type" -> "@type"
  let seo = sanityData.seo || corporateCils.seo;
  if (sanityData.seo?.jsonLd) {
    const jsonLd = { ...sanityData.seo.jsonLd };
    // Transformar campos con @
    if (jsonLd.context) {
      jsonLd['@context'] = jsonLd.context;
      delete jsonLd.context;
    }
    if (jsonLd.type) {
      jsonLd['@type'] = jsonLd.type;
      delete jsonLd.type;
    }
    // Transformar address si existe
    if (jsonLd.address?.type) {
      jsonLd.address['@type'] = jsonLd.address.type;
      delete jsonLd.address.type;
    }
    seo = {
      ...sanityData.seo,
      jsonLd,
    };
  }

  // Transformar datos de Sanity al formato esperado
  return {
    nav: sanityData.navigation || corporateCils.nav,
    hero: sanityData.hero || corporateCils.hero,
    stats: sanityData.stats || corporateCils.stats,
    about: sanityData.about || corporateCils.about,
    services: sanityData.services || corporateCils.services,
    clients: sanityData.clients || corporateCils.clients,
    testimonials: sanityData.testimonials || corporateCils.testimonials,
    blog: corporateCils.blog, // Mantener por ahora
    contact: sanityData.contact || corporateCils.contact,
    footer: sanityData.footer || corporateCils.footer,
    floating: sanityData.floating || corporateCils.floating,
    seo: seo,
    team: sanityData.team || corporateCils.team,
    links: sanityData.links || corporateCils.links,
  };
}

export function useSanityConfig() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchConfig() {
      try {
        setLoading(true);
        const data = await sanityClient.fetch(siteSettingsQuery);
        const transformed = transformSanityToSiteConfig(data);
        setConfig(transformed);
        setError(null);
      } catch (err) {
        console.error('Error fetching Sanity config:', err);
        setError(err as Error);
        // Fallback a datos estáticos
        setConfig(corporateCils);
      } finally {
        setLoading(false);
      }
    }

    fetchConfig();
  }, []);

  return { config, loading, error };
}

