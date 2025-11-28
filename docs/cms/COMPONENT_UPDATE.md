# 🔧 Actualizar Componentes para Usar Sanity

## ⚠️ Problema

Los componentes están usando `siteConfig` estático en lugar de los datos de Sanity, por eso no se ve el contenido del CMS.

## ✅ Solución Aplicada

1. ✅ Creado `SanityConfigProvider` - Context que provee datos de Sanity
2. ✅ Envuelto `App.tsx` con el Provider
3. ✅ Creado hook `useSiteConfig()` para usar en componentes
4. ✅ Actualizado `Hero.tsx` como ejemplo

## 📝 Componentes que Necesitan Actualización

Necesitas actualizar estos componentes para usar `useSiteConfig()`:

### Componentes Principales:
- [x] `Hero.tsx` - ✅ Ya actualizado
- [ ] `About.tsx`
- [ ] `StatsBar.tsx`
- [ ] `Clients.tsx`
- [ ] `Services.tsx`
- [ ] `Team.tsx`
- [ ] `Testimonials.tsx`
- [ ] `Contact.tsx`
- [ ] `Links.tsx`
- [ ] `Header.tsx`
- [ ] `Footer.tsx`
- [ ] `FloatingActions.tsx`
- [ ] `ClientCarousel.tsx`
- [ ] `ContactInfo.tsx`
- [ ] `ContactMap.tsx`
- [ ] `AboutMore.tsx`
- [ ] `Blog.tsx`

## 🔄 Cómo Actualizar Cada Componente

### Antes:
```tsx
import { siteConfig } from '../../config/site.config';

export const MyComponent: React.FC = () => {
  const data = siteConfig.hero;
  // ...
};
```

### Después:
```tsx
import { useSiteConfig } from '../../config/site.config';

export const MyComponent: React.FC = () => {
  const siteConfig = useSiteConfig();
  const data = siteConfig.hero;
  // ...
};
```

## 🚀 Solución Rápida: Script de Actualización

Puedo crear un script que actualice todos los componentes automáticamente, o puedes hacerlo manualmente componente por componente.

## ✅ Verificación

Después de actualizar los componentes:

1. Inicia el frontend: `npm run dev`
2. Abre: `http://localhost:5173/es`
3. Deberías ver los datos desde Sanity
4. Agrega `TestSanityData` temporalmente para verificar

---

**¿Quieres que actualice todos los componentes automáticamente?**

