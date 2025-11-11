# Backend Novedades

Backend que agrega noticias desde NewsAPI y RSS feeds regionales (Diario Río Negro, Bariloche2000, ANB, El Cordillerano).

## Funciones
- **Fetchers**: NewsAPI y RSS parsers.
- **Normalización**: Estructura unificada, detección de tags y región.
- **Storage**: Archivo JSON local (`backend/data/novedades.json`).
- **Endpoint**: `GET /api/novedades?tag=laboral&region=Bariloche&limit=10`
- **Refresh**: `POST /api/novedades/refresh` o `npm run novedades:refresh` manualmente.
- **Cron**: Configurado para ejecutar diariamente a las 06:00 (ajustar si se desea 1 y 15).

## Instalación
```bash
npm install
```

## Ejecutar backend
```bash
npm run backend:dev
```
(Escucha en puerto 4000 por defecto)

## Variables de entorno (.env)
```
NEWSAPI_KEY=tu_clave_aqui
PORT=4000
```

## Frontend integration
- Hook `useNovedades({ tag, region, limit })` en `src/hooks/useNovedades.ts`
- Componentes `NewsCard` y `Novedades` en `src/components/news/` y `src/components/sections/`
- Página `/novedades` configurada en rutas y nav.

## Cron en producción
Configurar GitHub Actions para ejecución periódica (1 y 15 de cada mes) o usar Vercel Cron.
Ejemplo workflow:
```yaml
name: Refresh Novedades
on:
  schedule:
    - cron: '0 6 1,15 * *' # 06:00 UTC días 1 y 15
jobs:
  refresh:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run novedades:refresh
        env:
          NEWSAPI_KEY: ${{ secrets.NEWSAPI_KEY }}
      - run: git config user.email "actions@github.com" && git config user.name "Bot" && git add backend/data/novedades.json && git commit -m "Actualizar novedades" && git push || echo "No cambios"
```
