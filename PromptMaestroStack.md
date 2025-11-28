# 🧙‍♂️ Prompt Maestro & Guía de Stack

Este documento contiene una guía y un "Prompt Maestro" diseñado para instruir a una IA (como yo) para crear un proyecto desde cero utilizando el stack tecnológico moderno y robusto que hemos implementado en CILS.

---

## 🛠️ El Stack "CILS Modern"

Este stack está optimizado para sitios corporativos de alto rendimiento, fácil mantenimiento y gestión de contenido amigable.

1.  **Frontend**: React + Vite + TypeScript
    - _Por qué_: Velocidad, tipado seguro, ecosistema maduro.
2.  **Estilos**: Tailwind CSS + Framer Motion
    - _Por qué_: Desarrollo rápido, diseño consistente, animaciones fluidas.
3.  **CMS**: Sanity.io (Headless)
    - _Por qué_: Gestión de contenido en tiempo real, schemas flexibles, excelente DX.
4.  **Backend (Opcional/BFF)**: Node.js + Express
    - _Por qué_: Para lógica de servidor ligera (proxies, agregadores, cron jobs) que no cabe en el frontend.
5.  **Deployment**: Vercel/Render (Back) + Hosting Estático/FTP (Front)
    - _Por qué_: Flexibilidad para desplegar en cualquier infraestructura.

---

## 🤖 Prompt Maestro

Copia y pega el siguiente prompt para iniciar un nuevo proyecto con esta arquitectura.

```markdown
# Rol

Actúa como un Arquitecto de Software Senior y Desarrollador Full Stack experto en React, TypeScript y Headless CMS.

# Objetivo

Crear un sitio web corporativo moderno, performante y autoadministrable desde cero.

# Stack Tecnológico Requerido

- **Core**: Vite + React + TypeScript
- **Estilos**: Tailwind CSS (configurado con tokens de diseño) + Framer Motion (para animaciones)
- **CMS**: Sanity.io (Headless CMS) para gestión de TODO el contenido (textos, imágenes, navegación, SEO).
- **Estructura**: Monorepo o estructura organizada donde el CMS vive en una carpeta `/cms` o `/studio`.

# Requerimientos Funcionales

1. **Arquitectura de Contenido**:
   - Crea schemas en Sanity para: `siteSettings` (globales), `pages` (landing pages), `navigation`, `hero`, `services`, `team`, `testimonials`.
   - El frontend debe consumir estos datos mediante un hook personalizado `useSanityConfig` o similar, con fallback a datos estáticos si falla la API.
2. **Componentes**:
   - Diseña componentes modulares (Atomic Design o similar).
   - Usa Tailwind para estilos responsivos y Dark Mode.
3. **SEO**:
   - Implementa metatags dinámicos basados en la configuración del CMS.
4. **Performance**:
   - Optimización de imágenes (Sanity Image Pipeline).
   - Lazy loading de rutas y componentes pesados.

# Entregables Esperados

1. **Estructura de Directorios**: Define una estructura clara (ej: `src/lib/sanity`, `src/components`, `src/hooks`).
2. **Configuración**: Archivos de configuración clave (`tailwind.config.js`, `sanity.config.ts`, `vite.config.ts`).
3. **Código Base**:
   - Cliente de Sanity configurado.
   - Hook de consumo de datos.
   - Componente `App` principal integrando el CMS.
4. **Guía de Inicio**: Instrucciones para instalar, configurar variables de entorno (`.env`) y correr el proyecto.

# Estilo de Código

- Usa TypeScript estricto.
- Prefiere Functional Components y Hooks.
- Usa Zod para validación de datos si es necesario.
- Código limpio, comentado y organizado.
```

---

## 📚 Guía de Implementación Manual

Si prefieres construirlo paso a paso, sigue este orden:

### 1. Inicialización del Proyecto

```bash
# Crear proyecto Vite
npm create vite@latest mi-proyecto -- --template react-ts
cd mi-proyecto
npm install

# Instalar Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Instalar librerías clave
npm install framer-motion lucide-react clsx tailwind-merge
```

### 2. Integración de Sanity CMS

```bash
# Crear carpeta para el estudio
mkdir cms && cd cms
npm create sanity@latest
# Sigue el wizard: selecciona "Clean project" con TypeScript
```

### 3. Conexión Frontend-CMS

En el root del proyecto (frontend):

```bash
npm install @sanity/client groq @sanity/image-url
```

Crea `src/lib/sanity.ts`:

```typescript
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});
```

### 4. Desarrollo de Schemas

En `cms/schemas`, define tus tipos de contenido. Ejemplo `hero.ts`:

```typescript
export default {
  name: 'hero',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Título' },
    { name: 'image', type: 'image', title: 'Imagen de Fondo' },
  ],
};
```

### 5. Consumo de Datos

Crea un hook `useSanity.ts` para hacer fetch de los datos usando GROQ y tiparlos correctamente.

### 6. Deployment

1.  **CMS**: Ejecuta `npm run deploy` dentro de la carpeta `cms` (hosting gratuito de Sanity).
2.  **Frontend**: Configura las variables de entorno en Vercel/Netlify y despliega el repositorio.
