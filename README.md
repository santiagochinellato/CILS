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