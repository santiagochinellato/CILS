# Implementación de Sanity CMS

## 📋 Resumen Ejecutivo

### 🎯 Objetivo

Migrar todo el contenido estático del sitio web de Estudio CILS a Sanity CMS para permitir gestión de contenido sin necesidad de código.

### 🏗️ Arquitectura

```
┌─────────────────────────────────────────┐
│         Sanity Studio (CMS)             │
│  ┌───────────────────────────────────┐  │
│  │  Schemas (Tipos de Contenido)    │  │
│  │  - siteSettings                   │  │
│  │  - service, client, teamMember    │  │
│  │  - hero, about, contact, etc.     │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
                    │
                    │ API (GROQ)
                    ▼
┌─────────────────────────────────────────┐
│         Frontend React                  │
│  ┌───────────────────────────────────┐  │
│  │  useSanityConfig() Hook           │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  Transform Sanity → Types   │  │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  site.config.ts             │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │  Componentes React                │  │
│  │  (Sin cambios en lógica)          │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## 📁 Estructura de Archivos

```
CILS/
├── cms/
│   └── studio/
│       ├── sanity.config.ts
│       ├── package.json
│       ├── tsconfig.json
│       └── schemas/
│           ├── index.ts
│           ├── siteSettings.ts
│           ├── navigation.ts
│           ├── hero.ts
│           ├── about.ts
│           ├── service.ts
│           ├── client.ts
│           ├── testimonial.ts
│           ├── teamMember.ts
│           ├── link.ts
│           ├── stat.ts
│           └── objects/
│               ├── cta.ts
│               ├── contactInfo.ts
│               ├── footerConfig.ts
│               └── seoMetadata.ts
├── src/
│   ├── lib/
│   │   └── sanity/
│   │       ├── client.ts
│   │       ├── queries.ts
│   │       └── types.ts
│   ├── hooks/
│   │   └── useSanityConfig.ts
│   └── config/
│       └── site.config.ts (modificado)
└── scripts/
    └── migrate-to-sanity.ts
```

## 🔧 Configuración de Sanity Studio

### `cms/studio/sanity.config.ts`

```typescript
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'cils-cms',
  title: 'Estudio CILS CMS',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  basePath: '/studio',
  plugins: [
    deskTool(),
    visionTool(), // Para probar queries GROQ
  ],
  schema: {
    types: schemaTypes,
  },
});
```

## 📝 Ejemplos de Schemas

### `schemas/hero.ts`

```typescript
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      description: 'Texto del badge destacado',
    }),
    defineField({
      name: 'title',
      title: 'Título Principal',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctaPrimary',
      title: 'CTA Principal',
      type: 'cta',
    }),
    defineField({
      name: 'ctaSecondary',
      title: 'CTA Secundario',
      type: 'cta',
    }),
    defineField({
      name: 'trust',
      title: 'Texto de Confianza',
      type: 'string',
      description: 'Ej: "INVAP y +100 empresas confían en nosotros"',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'badge',
    },
  },
});
```

### `schemas/siteSettings.ts` (Documento Principal)

```typescript
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Configuración del Sitio',
  type: 'document',
  fields: [
    defineField({
      name: 'navigation',
      title: 'Navegación',
      type: 'array',
      of: [{ type: 'navigationItem' }],
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'hero',
    }),
    // ... otros campos
  ],
});
```

## 🔌 Cliente Sanity en Frontend

### `src/lib/sanity/client.ts`

```typescript
import { createClient } from '@sanity/client';

if (!import.meta.env.VITE_SANITY_PROJECT_ID) {
  throw new Error('VITE_SANITY_PROJECT_ID is not defined');
}

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
  useCdn: true, // Usar CDN para mejor performance
});
```

### `src/hooks/useSanityConfig.ts`

```typescript
import { useEffect, useState } from 'react';
import { sanityClient } from '../lib/sanity/client';
import { siteSettingsQuery } from '../lib/sanity/queries';
import type { SiteConfig } from '../config/types';
import corporateCils from '../config/templates/corporate.cils';

// Función para transformar datos de Sanity a SiteConfig
function transformSanityToSiteConfig(sanityData: any): SiteConfig {
  return {
    nav: sanityData.navigation || [],
    hero: sanityData.hero || corporateCils.hero,
    // ... mapeo de campos
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
```

## 🔐 Variables de Entorno

### `.env.local` (Frontend)

```env
VITE_SANITY_PROJECT_ID=tu-project-id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
```

### `.env` (Studio y Scripts)

```env
SANITY_STUDIO_PROJECT_ID=tu-project-id
SANITY_STUDIO_DATASET=production
SANITY_PROJECT_ID=tu-project-id
SANITY_DATASET=production
SANITY_API_TOKEN=tu-token-con-permisos-de-escritura
```
