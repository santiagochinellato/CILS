# Estudio CILS – Web Template System (Vite + React + TS)

Sitio corporativo moderno para Estudio CILS con un sistema de templates configurable. Enfocado en performance, conversión y mantenibilidad.

## ✨ ¿Por qué este stack?
- Vite + React: HMR instantáneo, build optimizado y ecosistema maduro.
- TypeScript: tipado de contenido y componentes para evitar errores.
- Tailwind + SCSS: velocidad en layout + potencia para estilos complejos.
- Framer Motion: animaciones declarativas, suaves y accesibles.
- React Hook Form + Zod (listo): validación robusta si se requiere.

## 📦 Estructura principal
```
src/
  config/           # Design system y contenido
  components/       # Layout + secciones
  hooks/            # Utilidades reusables
  pages/            # Páginas compuestas
  utils/            # Helpers (SEO, animaciones, cn)
```

## 🧩 Sistema de Templates
- Tipos en `src/config/types.ts`.
- Template por defecto: `src/config/templates/corporate.cils.ts`.
- Export activo: `src/config/site.config.ts` (elige el template).

### Crear un nuevo template
1. Duplica `src/config/templates/corporate.cils.ts` como `src/config/templates/landing.minimal.ts` (ver ejemplo incluido).
2. Ajusta textos, hrefs y SEO.
3. Cambia la exportación en `src/config/site.config.ts` si quieres usarlo por defecto.

```ts
// src/config/site.config.ts
import landing from './templates/landing.minimal';
export const siteConfig = landing; // ← activar
```

## 🎨 Design System
- Tokens en `src/config/theme.ts` (colores, tipografías, spacing).
- Tailwind configurado con variables corporativas.

## 🔎 SEO
- Helper `applySeo` en `src/utils/seo.ts` inyecta title, metas y JSON-LD al montar `Home`.
- Metas base en `index.html`; `siteConfig.seo` sobrescribe dinámicamente.

## 🧠 Hooks útiles
- `useStickyHeader` – Header con blur/sombra en scroll.
- `useScrollReveal` – Aparición suave al entrar en viewport.
- `useCounter` – Animación de conteo para métricas.
- `useMediaQuery` – Condiciones responsivas en runtime.

## 🚀 Scripts
```bash
npm run dev      # Desarrollo
npm run build    # Producción
npm run preview  # Preview producción
npm run lint     # Linter
npm run test     # Vitest (placeholder)
```

## 🛡️ Accesibilidad y performance
- Focus visible, contraste de color, labels en inputs.
- Lazy animations y CSS liviano.

## 🛠️ Personalización rápida
- Colores/tipografías: `theme.ts` + `tailwind.config.cjs`.
- Contenido: `site.config.ts` (template activo).
- Secciones: componentes en `src/components/sections`.

## 🗺️ Roadmap siguiente (sugerido)
1. Envío formulario (Formspree/EmailJS/API) + reCAPTCHA v3
2. Tests accesibilidad (axe) + Lighthouse CI automatizado
3. i18n (es/en) vía wrapper de siteConfig por idioma
4. CMS headless (Contentlayer/Sanity) para blog dinámico
5. Testing Vitest: snapshot secciones + hooks
6. Diseño dark mode alterno (toggle tokens)
7. Prefetch inteligente de assets críticos

---
Hecho con React, TypeScript y Tailwind para Estudio CILS.

## 📦 Deploy en Vercel (API serverless)

Pasos rápidos para desplegar frontend + backend en Vercel usando serverless functions:

1. Asegurate de tener el repo en GitHub y haber conectado Vercel al repo.
2. Añadí los secrets en el proyecto de GitHub: `NEWSAPI_KEY`.
  - En GitHub: `Settings > Secrets and variables > Actions > New repository secret`.
  - Nombre: `NEWSAPI_KEY` | Valor: tu clave de NewsAPI.
3. El proyecto ya incluye funciones serverless en `/api/novedades` que leen `backend/data/novedades.json`.
4. Habilitá el workflow de GitHub Actions `.github/workflows/refresh-novedades.yml` para refrescar `backend/data/novedades.json` en los días 1 y 15 (usa `NEWSAPI_KEY` desde secrets).

Comandos útiles localmente:
```bash
# Build frontend
npm run build

# Probar API localmente (requiere node)
node -e "console.log(require('./backend/data/novedades.json').length)"
```

Si preferís que mueva la lógica de refresh directamente a serverless (ejecutar fetchers desde Vercel), avisame y lo adapto; por ahora el enfoque usa GitHub Actions para mantener el JSON en el repo y servirlo desde las funciones.

## NEWSAPI y workflows

1) Ejecutar el workflow manualmente
- En GitHub `Actions > Refresh Novedades` → `Run workflow`.
- Verificar el job `refresh` y el paso `npm run novedades:refresh`.

2) Posibles fallos y solución
- `NEWSAPI_KEY` faltante o inválida → agregar/actualizar el secreto.
- DNS de RSS (p.ej. iProfesional) → ya deshabilitado temporalmente.
- Rate limit de NewsAPI → reintentar más tarde.

3) Validar en producción (Vercel)
- `https://tu-dominio.vercel.app/api/novedades?limit=5`
- `https://tu-dominio.vercel.app/api/novedades/meta`
