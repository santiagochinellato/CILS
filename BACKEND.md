# Backend de Novedades - Estudio CILS

## Descripción general
Sistema de agregación de noticias externas para la sección Novedades del sitio corporativo. Integra NewsAPI y feeds RSS locales/regionales, normaliza datos, detecta tags y región, y almacena en archivo JSON local.

## Componentes

### 1. Fetchers
- **NewsAPI** (`backend/utils/fetchNewsApi.ts`): Consulta NewsAPI con queries predefinidas (impuestos, contable, laboral, societaria).
- **RSS** (`backend/utils/fetchRss.ts`): Parser de RSS para fuentes regionales (Diario Río Negro, Bariloche2000, ANB, El Cordillerano).

### 2. Normalización (`backend/utils/normalize.ts`)
- Unifica estructura de datos de distintas fuentes.
- **Detección de tags**: Utiliza diccionario de keywords (laboral, impositivo, contable, societaria).
- **Detección de región**: Identifica Bariloche, Patagonia, o Argentina nacional.
- **Deduplicación**: Por URL y hash de título; conserva la más reciente.
- **Ordenamiento**: Por fecha de publicación descendente.

### 3. Storage (`backend/storage/fileStore.ts`)
- Persistencia en archivo `backend/data/novedades.json`.
- Funciones `loadExisting()` y `saveAll()`.
- Escalable a base de datos (Supabase/Mongo/Firestore) reemplazando el módulo.

### 4. Jobs (`backend/jobs/refresh.ts`)
- Script autónomo: `npm run novedades:refresh`.
- Ejecutable por cron o GitHub Actions.
- Merge de nuevas novedades con existentes, deduplicación y almacenamiento.

### 5. Server (`backend/server.ts`)
- **Endpoints**:
  - `GET /api/novedades?tag=laboral&region=Bariloche&limit=10`: Consulta filtrada.
  - `GET /api/novedades/meta`: Resumen de tags y regiones disponibles.
  - `POST /api/novedades/refresh`: Trigger manual de actualización.
- **Cron interno**: Configurado para actualizar diariamente a las 06:00 local (ajustar según necesidad).
- **Middleware**: CORS habilitado para frontend.

## Frontend integration

### Hook: `useNovedades`
- **Ubicación**: `src/hooks/useNovedades.ts`
- **Uso**:
  ```tsx
  const { data, loading, error } = useNovedades({ tag: 'laboral', limit: 8 });
  ```
- **Parámetros**: `tag`, `region`, `limit`.
- **Estado**: Datos normalizados, loading, error.

### Componentes
- **NewsCard** (`src/components/news/NewsCard.tsx`): Tarjeta de novedad individual con imagen, tags, región, fecha.
- **Novedades** (`src/components/sections/Novedades.tsx`): Grid de novedades con filtros opcionales.

### Página `/novedades`
- **Ubicación**: `src/pages/NovedadesPage.tsx`
- **Integrada en nav corporativa**: `corporate.cils.ts` incluye entrada "Novedades" en nav.
- **Ruta**: Configurada en `App.tsx`.

### Proxy Vite
- `vite.config.ts` configura proxy `/api` → `http://localhost:4000` para desarrollo.
- En producción, servir backend en mismo dominio o configurar CORS adecuadamente.

## Configuración

### Variables de entorno (`.env`)
```bash
NEWSAPI_KEY=tu_api_key_aqui
PORT=4000
```

### Taxonomía (`backend/config/taxonomy.ts`)
- **TAGS_DICTIONARY**: Mapeo de tags a keywords para clasificación.
- **REGIONES**: Mapeo de regiones a keywords para detección geográfica.

### Fuentes (`backend/config/sources.ts`)
- **NEWSAPI_QUERIES**: Queries predefinidas para NewsAPI.
- **RSS_SOURCES**: Array de feeds RSS con nombre y URL.

## Ejecución

### Desarrollo
```bash
# Backend en puerto 4000
npm run backend:dev

# Frontend en puerto 5173 (con proxy)
npm run dev
```

### Actualización manual
```bash
npm run novedades:refresh
```

### Producción
- **Deploy backend**: Vercel serverless, Cloudflare Workers, o Node tradicional.
- **Deploy frontend**: Vercel/Netlify con proxy configurado o backend en misma instancia.
- **Cron**: GitHub Actions, Vercel Cron, o similar para ejecutar `novedades:refresh` periódicamente.

## Escalabilidad

### Storage alternativo
- Reemplazar `fileStore.ts` con módulo de base de datos (Supabase, MongoDB, Firestore).
- Mantener interfaz `loadExisting()` y `saveAll()`.

### Fuentes adicionales
- Agregar nuevas queries en `NEWSAPI_QUERIES`.
- Agregar nuevos RSS en `RSS_SOURCES`.

### Filtros avanzados
- Extender endpoint para búsqueda por texto, rango de fechas, ordenamiento.
- UI con filtros en componente `Novedades`.

## Mantenimiento

### Ajustar cron
- Editar `backend/server.ts` línea del `cron.schedule()` para frecuencia deseada.
- Ejemplo día 1 y 15: `'0 6 1,15 * *'`.

### Logs y errores
- Errores de fetch se logean en consola pero no interrumpen el flujo.
- Considerar logging externo (Sentry, LogRocket) para producción.

### Actualización de keywords
- Editar `backend/config/taxonomy.ts` para agregar/modificar tags y regiones.

## Notas finales
- **API Key NewsAPI**: Guardada en `.env`, nunca comitear al repositorio (incluida en `.gitignore`).
- **RSS feeds regionales**: Algunos feeds tienen errores de formato (no-RSS estándar); el sistema continúa con las fuentes válidas.
- **Deduplicación**: Por defecto conserva la versión más reciente de cada noticia; ajustar lógica en `normalize.ts` si se desea otro comportamiento.

---

**Autor**: Sistema automatizado de integración backend/frontend para sitio corporativo Estudio CILS.
**Fecha**: 10 de noviembre, 2025.
