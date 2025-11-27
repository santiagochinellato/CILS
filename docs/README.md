# 🚀 Resumen de Deployment - CILS

## 📋 Orden de Deployment

1. **Backend primero** → Render.com
2. **Actualizar config** → URL del backend
3. **Build frontend** → `npm run build`
4. **Frontend después** → Ferozo FTP

---

## 🔗 Enlaces Rápidos

- [Guía Backend (Render.com)](./DEPLOY_BACKEND.md)
- [Guía Frontend (Ferozo FTP)](./DEPLOY_FRONTEND.md)
- [Plan Completo](../.gemini/antigravity/brain/664bf5a4-bc82-49b4-a349-e2527511e04a/implementation_plan.md)

---

## ⚡ Comandos Rápidos

### Build Frontend

```bash
# Opción 1: Script automatizado
./scripts/build-frontend.sh

# Opción 2: Manual
npm run build
```

### Verificar Backend

```bash
curl https://TU-URL.onrender.com/api/novedades
```

---

## 📝 Checklist General

### Backend (Render.com)

- [ ] Cuenta creada en Render.com
- [ ] Repositorio conectado
- [ ] Web Service configurado
- [ ] Variables de entorno agregadas (`NEWSAPI_KEY`)
- [ ] Deploy exitoso
- [ ] URL copiada

### Frontend (Configuración)

- [ ] URL del backend actualizada en `src/config/api.ts`
- [ ] Build ejecutado (`npm run build`)
- [ ] Carpeta `dist/` generada
- [ ] `.htaccess` presente en `dist/`

### Frontend (FTP)

- [ ] Conectado a FTP de Ferozo
- [ ] Archivos subidos a `public_html/`
- [ ] `.htaccess` verificado
- [ ] Sitio accesible

### Verificación

- [ ] Backend responde en `/api/novedades`
- [ ] Frontend carga correctamente
- [ ] Routing funciona (sin 404)
- [ ] Novedades se cargan
- [ ] Probado en móvil

---

## 🆘 Ayuda Rápida

| Problema                   | Ver                                                                                          |
| -------------------------- | -------------------------------------------------------------------------------------------- |
| Error en deploy de backend | [DEPLOY_BACKEND.md](./DEPLOY_BACKEND.md#-troubleshooting)                                    |
| Error 404 en rutas         | [DEPLOY_FRONTEND.md](./DEPLOY_FRONTEND.md#error-404-en-rutas)                                |
| No cargan novedades        | [DEPLOY_FRONTEND.md](./DEPLOY_FRONTEND.md#no-cargan-las-novedades)                           |
| Problemas con FTP          | [DEPLOY_FRONTEND.md](./DEPLOY_FRONTEND.md#opción-1-filezilla-recomendado---interfaz-gráfica) |

---

## 📞 Credenciales

### Ferozo FTP

```
Host: n7000023.ferozo.com
User: ftp@n7000023.ferozo.com
Pass: tuWEfu91po
Port: 21
```

### Render.com

- URL: https://render.com
- Conectar con GitHub

### NewsAPI

- URL: https://newsapi.org
- Necesitas API key (gratis)

---

## 💰 Costos

- **Render.com**: $0/mes (Free tier)
- **Ferozo**: Ya tienes cuenta
- **NewsAPI**: $0/mes (100 req/día)
- **TOTAL**: **$0/mes**

---

## 🎯 URLs Finales

Una vez desplegado:

- **Frontend**: http://n7000023.ferozo.com
- **Backend**: https://[tu-servicio].onrender.com
- **API Novedades**: https://[tu-servicio].onrender.com/api/novedades
