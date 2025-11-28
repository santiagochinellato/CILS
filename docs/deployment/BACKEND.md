# 🚀 Guía Paso a Paso - Deploy del Backend

## Paso 1: Crear cuenta en Render.com

1. Abre tu navegador y ve a: **https://render.com**
2. Click en **"Get Started for Free"** o **"Sign Up"**
3. **Recomendado**: Usa **"Sign up with GitHub"** (es más rápido y permite auto-deploy)
4. Autoriza Render.com a acceder a tus repositorios

---

## Paso 2: Crear Web Service

1. Una vez logueado, click en **"New +"** (botón azul arriba a la derecha)
2. Selecciona **"Web Service"**
3. Si es tu primera vez, te pedirá conectar GitHub:
   - Click **"Connect GitHub"**
   - Autoriza Render.com
   - Puedes dar acceso a todos los repos o solo al de CILS

4. **Busca y selecciona tu repositorio** `CILS` en la lista

---

## Paso 3: Configurar el servicio

Completa el formulario con estos valores:

### Información básica:

- **Name**: `cils-backend` (o el nombre que prefieras)
- **Region**: `Oregon (US West)` (o el más cercano a Argentina)
- **Branch**: `main` (o tu rama principal)
- **Root Directory**: _dejar vacío_

### Build & Deploy:

- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npx tsx backend/server.ts`

### Plan:

- Selecciona **"Free"** ($0/month)

---

## Paso 4: Configurar Variables de Entorno

Antes de hacer deploy, necesitas agregar las variables de entorno:

1. Scroll down hasta la sección **"Environment Variables"**
2. Click en **"Add Environment Variable"**
3. Agrega estas 2 variables:

**Variable 1:**

- **Key**: `NODE_ENV`
- **Value**: `production`

**Variable 2:**

- **Key**: `NEWSAPI_KEY`
- **Value**: `[TU_API_KEY_DE_NEWSAPI]`

> ⚠️ **IMPORTANTE**: Si no tienes un API key de NewsAPI:
>
> 1. Ve a https://newsapi.org/register
> 2. Regístrate gratis (100 requests/día)
> 3. Copia tu API key

---

## Paso 5: Deploy

1. Click en **"Create Web Service"** (botón azul al final)
2. Render.com comenzará a:
   - Clonar tu repositorio
   - Instalar dependencias (`npm install`)
   - Iniciar el servidor
3. **Espera 2-3 minutos** mientras se completa el deploy
4. Verás logs en tiempo real del proceso

---

## Paso 6: Verificar el Deploy

Una vez que veas **"Your service is live 🎉"**:

1. **Copia la URL** que aparece arriba (algo como: `https://cils-backend.onrender.com`)
2. Abre esa URL en tu navegador agregando `/api/novedades`:
   ```
   https://TU-URL.onrender.com/api/novedades
   ```
3. Deberías ver un JSON con las novedades

---

## Paso 7: Guardar la URL

**Copia la URL completa** (sin el `/api/novedades` al final) porque la necesitarás para configurar el frontend.

Ejemplo: `https://cils-backend-abc123.onrender.com`

---

## ✅ Checklist de Verificación

- [ ] Cuenta creada en Render.com
- [ ] Repositorio conectado
- [ ] Web Service creado
- [ ] Variables de entorno configuradas
- [ ] Deploy completado exitosamente
- [ ] URL del backend copiada
- [ ] Endpoint `/api/novedades` funciona

---

## 🆘 Troubleshooting

### Error: "Build failed"

- Verifica que el `Build Command` sea exactamente: `npm install`
- Revisa los logs para ver qué dependencia falló

### Error: "Deploy failed"

- Verifica que el `Start Command` sea: `npx tsx backend/server.ts`
- Asegúrate de que `NEWSAPI_KEY` esté configurada

### El servicio se inicia pero no responde

- Verifica que el puerto esté configurado correctamente en `backend/server.ts`
- Render.com asigna automáticamente el puerto via `process.env.PORT`

---

## 📝 Siguiente Paso

Una vez que tengas la URL del backend funcionando, el siguiente paso es:

1. Actualizar `src/config/api.ts` con tu URL de Render
2. Construir el frontend
3. Subir a Ferozo

**¿Listo para continuar?** Avísame cuando tengas la URL del backend.
