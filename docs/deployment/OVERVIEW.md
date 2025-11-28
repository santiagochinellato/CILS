# 🚀 Guía Rápida de Deployment - CILS

Esta es una guía simplificada para desplegar tu aplicación.

## 📚 Documentación Completa

Para guías detalladas paso a paso, ver:

- **[Resumen General](./docs/README.md)** - Checklist y enlaces rápidos
- **[Deploy Backend](./docs/DEPLOY_BACKEND.md)** - Guía completa de Render.com
- **[Deploy Frontend](./docs/DEPLOY_FRONTEND.md)** - Guía completa de FTP Ferozo
- **[Plan Completo](file:///home/santi/.gemini/antigravity/brain/664bf5a4-bc82-49b4-a349-e2527511e04a/implementation_plan.md)** - Arquitectura y detalles técnicos

---

## ⚡ Quick Start

### Paso 1: Deploy del Backend (Render.com)

1. Ir a https://render.com y crear cuenta con GitHub
2. Crear nuevo Web Service conectando tu repositorio
3. Configurar:
   - **Build Command**: `npm install`
   - **Start Command**: `npx tsx backend/server.ts`
   - **Plan**: Free
4. Agregar variables de entorno:
   - `NEWSAPI_KEY`: tu_api_key
   - `NODE_ENV`: production
5. Copiar la URL generada

**[Ver guía detallada →](./docs/DEPLOY_BACKEND.md)**

---

### Paso 2: Actualizar Frontend con URL del Backend

Editar [`src/config/api.ts`](file:///home/santi/CILS/src/config/api.ts):

```typescript
const PRODUCTION_API_URL = 'https://TU-URL-DE-RENDER.onrender.com';
```

---

### Paso 3: Construir Frontend

```bash
# Opción A: Script automatizado
./scripts/build-frontend.sh

# Opción B: Manual
npm run build
```

---

### Paso 4: Subir a Ferozo vía FTP

**Credenciales:**

- Host: `n7000023.ferozo.com`
- User: `ftp@n7000023.ferozo.com`
- Pass: `tuWEfu91po`

**Método recomendado: FileZilla**

1. Descargar FileZilla
2. Conectar al servidor
3. Navegar a `public_html/`
4. Subir TODO el contenido de `dist/`

**[Ver guía detallada →](./docs/DEPLOY_FRONTEND.md)**

---

## ✅ Verificación

### Backend

```bash
curl https://TU-URL-DE-RENDER.onrender.com/api/novedades
```

Deberías ver un JSON con novedades.

### Frontend

1. Abrir `http://n7000023.ferozo.com` en navegador
2. Navegar a diferentes páginas
3. Verificar que las novedades se carguen correctamente

---

## 🔧 Troubleshooting Rápido

| Problema            | Solución                                               |
| ------------------- | ------------------------------------------------------ |
| Error 404 en rutas  | Verificar que `.htaccess` esté en la raíz del servidor |
| No cargan novedades | Verificar URL del backend en `api.ts`                  |
| Backend lento       | Normal en plan gratuito (se duerme después de 15 min)  |
| Error CORS          | Verificar que backend tenga `app.use(cors())`          |

---

## 📚 Archivos Importantes

- [`public/.htaccess`](file:///home/santi/CILS/public/.htaccess) - Configuración Apache para SPA
- [`src/config/api.ts`](file:///home/santi/CILS/src/config/api.ts) - URLs de API
- [`render.yaml`](file:///home/santi/CILS/render.yaml) - Config de Render.com
- [`.env.template`](file:///home/santi/CILS/.env.template) - Variables de entorno

---

## 🆘 ¿Necesitas ayuda?

Ver la [guía completa de deployment](file:///home/santi/.gemini/antigravity/brain/664bf5a4-bc82-49b4-a349-e2527511e04a/implementation_plan.md) para más detalles.
