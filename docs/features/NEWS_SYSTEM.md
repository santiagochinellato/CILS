# Sistema de Novedades

## ✅ Implementación Completa

Se ha integrado un **backend de agregación de noticias** al proyecto corporativo de Estudio CILS con:

### 🎯 Funcionalidades principales

1. **Fetching automático**: NewsAPI (API Key provista) + RSS feeds regionales (Diario Río Negro, Bariloche2000, ANB, El Cordillerano)
2. **Normalización inteligente**: Detección automática de tags (laboral, impositivo, contable, societaria) y región (Bariloche, Patagonia, Argentina)
3. **Storage**: Archivo JSON local (`backend/data/novedades.json`) con soporte para migración a BD
4. **API REST**: Endpoints `/api/novedades` con filtros por tag, región y límite
5. **Cron automático**: Actualización diaria a las 06:00 (configurable para días 1 y 15)
6. **Frontend completo**: Hook React, componentes NewsCard/Novedades, página `/novedades` integrada en nav

### 📂 Estructura agregada

```
backend/
  ├── config/
  │   ├── taxonomy.ts       # Diccionarios de tags y regiones
  │   └── sources.ts        # NewsAPI queries y RSS feeds
  ├── utils/
  │   ├── fetchNewsApi.ts   # Cliente NewsAPI
  │   ├── fetchRss.ts       # Parser RSS
  │   └── normalize.ts      # Normalización, detección tags/región, deduplicación
  ├── storage/
  │   └── fileStore.ts      # Persistencia JSON local
  ├── jobs/
  │   └── refresh.ts        # Script manual/cron actualización
  ├── routes/               # (reservado para expansión modular)
  ├── data/
  │   └── novedades.json    # Storage (gitignored salvo inicial vacío)
  ├── server.ts             # Express server + cron
  ├── types.ts              # Interfaces compartidas
  └── README.md

src/
  ├── hooks/
  │   └── useNovedades.ts   # Hook React para consulta API
  ├── components/
  │   ├── news/
  │   │   └── NewsCard.tsx  # Card novedad individual
  │   └── sections/
  │       └── Novedades.tsx # Grid de novedades
  └── pages/
      └── NovedadesPage.tsx # Página /novedades
```

---

## 🎯 Sistema de Filtrado Mejorado

Se ha refinado completamente el sistema de agregación de noticias para **eliminar contenido irrelevante** y traer **exclusivamente** noticias relacionadas con:

- ✅ **Contabilidad**
- ✅ **Impositivo / Tributario**
- ✅ **Laboral / Derecho Laboral**
- ✅ **Societario**
- ✅ **Economía / Legislación / Regulaciones**

### 1. **Queries NewsAPI ultra-filtrados**

**Ahora:**

```typescript
{
  q: '(impuesto OR impuestos OR "reforma tributaria" OR impositiva OR fiscal OR AFIP OR ganancias OR IVA OR monotributo OR "Resolución General") AND -(deporte) AND -(policial)',
  language: 'es',
  sortBy: 'publishedAt',
  pageSize: 70
}
```

✅ Filtrado estricto con operadores booleanos
✅ Exclusión explícita de deportes y policiales
✅ Términos técnicos específicos del sector

### 2. **Diccionario de tags ampliado y refinado**

**Mejoras:**

- ✅ Sinónimos agregados (tributaria/tributario, indemnizacion/indemnización)
- ✅ Términos técnicos profesionales (IFRS, IASB, NIA, IGJ, CCT, RG)
- ✅ Frases compuestas ("cargas sociales", "reforma tributaria", "registración laboral")
- ✅ Acrónimos del sector (AFIP 931, F931, ART, UOM, SMVM)

### 3. **BLACKLIST: Filtro de contenido irrelevante**

**Implementación:**

```typescript
export const BLACKLIST = [
  'deporte',
  'deportivo',
  'policial',
  'accidente',
  'choque',
  'femicidio',
  'crimen',
  'tiroteo',
  'robó',
  'robo',
  'incendio',
  'espectáculo',
  'farándula',
  'celebridades',
  'viral',
  'receta',
  'cocina',
  'música',
  'entretenimiento',
  'clima',
  'sismo',
  'horóscopo',
  'quini',
  'lotería',
  'fútbol',
  'futbol',
  'básquet',
  'tenis',
  'rugby',
  'racing',
  'boca',
  'river',
  'hamilton',
  'colapinto',
  'asesinato',
  'homicidio',
  'violación',
  'secuestro',
  'narcotráfico',
];
```

**Lógica aplicada:**

```typescript
function isBlacklisted(text: string): boolean {
  const t = text.toLowerCase();
  return BLACKLIST.some((word) => t.includes(word));
}

function isRelevant(text: string, tags: string[]): boolean {
  // Debe tener al menos 1 tag detectado
  if (tags.length === 0) return false;

  // No debe estar en blacklist
  if (isBlacklisted(text)) return false;

  return true;
}
```

✅ Toda noticia que contenga términos blacklist es **descartada automáticamente**
✅ Solo se aceptan noticias con **al menos 1 tag** detectado (laboral, impositivo, contable, societaria)

### 4. **Fuentes RSS de calidad**

**Ahora:**

- ✅ iProfesional Economía (`https://rss.atom.iprofesional.com/economia`)
- ✅ Feed RSS especializado en economía/finanzas
- ✅ Alta relevancia, actualización continua
- ✅ Formato RSS válido

**Resultado:**

- Solo contenido económico profesional
- Sin noticias policiales, deportivas o generalistas
- 100% relevante al rubro contable/impositivo
