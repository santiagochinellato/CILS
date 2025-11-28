# 📤 Instrucciones de Upload - Carpeta /es/

## ✅ Build Completado

El frontend está listo para subir a la carpeta `/es/` en Ferozo.

---

## 📂 Estructura en Ferozo

Tu sitio quedará así:

```
public_html/
├── es/                    ← AQUÍ va el nuevo sitio React
│   ├── .htaccess
│   ├── index.html
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── assets/
│   ├── icons/
│   └── images/
├── panel/                 ← Mantener (admin antiguo)
├── webmail/               ← Mantener
├── clientes/              ← Mantener
└── otros archivos...      ← Mantener
```

---

## 🔌 Paso 1: Conectar a Ferozo

En FileZilla:

```
Host:     n7000023.ferozo.com
Username: ftp@n7000023.ferozo.com
Password: tuWEfu91po
Port:     21
```

Click en **"Quickconnect"**

---

## 📂 Paso 2: Navegar a la Carpeta /es/

En el **panel derecho** (servidor remoto):

1. Busca la carpeta `public_html`
2. Entra a `public_html`
3. Busca la carpeta `es`
4. **IMPORTANTE**: Haz backup del contenido actual de `/es/` si es necesario

---

## 🗑️ Paso 3: Limpiar Carpeta /es/ (Opcional)

Si quieres reemplazar completamente el WordPress:

**Opción A: Borrar todo** (recomendado)

- Selecciona todo dentro de `/es/`
- Click derecho → Delete

**Opción B: Hacer backup primero**

- Renombra la carpeta `es` a `es_backup`
- Crea una nueva carpeta `es`

---

## ⬆️ Paso 4: Subir Archivos

### En el panel izquierdo (local):

1. Navega a: `/home/santi/CILS/dist/`

### Subir TODO:

1. Selecciona TODO dentro de `dist/` (Ctrl + A)
2. Arrastra al panel derecho (carpeta `/es/`)
3. Espera a que termine (1-3 minutos)

---

## ✅ Paso 5: Verificar

Asegúrate de que estos archivos estén en `/es/`:

```
es/
├── .htaccess          ← CRÍTICO
├── index.html
├── robots.txt
├── sitemap.xml
├── assets/
├── icons/
└── images/
```

---

## 🌐 Paso 6: Probar el Sitio

Abre tu navegador:

```
https://estudiocils.com.ar/es/
```

Deberías ver el nuevo sitio React.

---

## 🧪 Verificación Completa

1. **Sitio carga** ✅
2. **Navega a /es/novedades** ✅
3. **Refresca la página** (F5) - NO debe dar 404 ✅
4. **Verifica novedades se cargan** ✅
5. **Prueba en móvil** ✅

---

## 📊 URLs Finales

- **Sitio nuevo**: https://estudiocils.com.ar/es/
- **Sitemap**: https://estudiocils.com.ar/es/sitemap.xml
- **Robots**: https://estudiocils.com.ar/es/robots.txt
- **Backend API**: https://cils-backend.onrender.com/api/novedades

---

## ⚠️ Troubleshooting

### Error 404 en rutas

- Verifica que `.htaccess` esté en `/es/`
- Verifica que tenga `RewriteBase /es/`

### Assets no cargan (CSS/JS)

- Verifica que `index.html` tenga `<base href="/es/">`
- Limpia caché del navegador (Ctrl + Shift + R)

### No cargan novedades

- Abre DevTools (F12) → Console
- Verifica llamadas al backend
- Verifica que no haya errores CORS

---

¡Listo para subir! 🚀
