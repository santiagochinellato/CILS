# 📤 Guía Paso a Paso - Deploy del Frontend a Ferozo

## Prerequisitos

✅ Backend desplegado en Render.com y URL copiada
✅ Frontend construido con `npm run build`

---

## Opción 1: FileZilla (Recomendado - Interfaz Gráfica)

### Paso 1: Descargar e Instalar FileZilla

1. Ve a: **https://filezilla-project.org/download.php?type=client**
2. Descarga la versión para tu sistema operativo
3. Instala FileZilla

### Paso 2: Conectar al servidor FTP

1. Abre FileZilla
2. En la barra superior, completa:
   - **Host**: `n7000023.ferozo.com`
   - **Username**: `ftp@n7000023.ferozo.com`
   - **Password**: `tuWEfu91po`
   - **Port**: `21`
3. Click en **"Quickconnect"** o **"Conexión rápida"**

### Paso 3: Navegar a la carpeta correcta

En el panel derecho (servidor remoto):

- Busca la carpeta `public_html` o `www` o `httpdocs`
- Haz doble click para entrar

### Paso 4: Subir archivos

1. En el panel izquierdo (local), navega a: `/home/santi/CILS/dist/`
2. **Selecciona TODO el contenido** dentro de `dist/` (NO la carpeta dist en sí)
3. Arrastra y suelta al panel derecho (carpeta `public_html`)
4. Espera a que termine la transferencia

### Paso 5: Verificar

Asegúrate de que estos archivos estén en el servidor:

- ✅ `.htaccess`
- ✅ `index.html`
- ✅ Carpeta `assets/`
- ✅ Otros archivos del build

---

## Opción 2: Línea de Comandos (lftp)

### Paso 1: Instalar lftp

```bash
sudo apt-get install lftp  # Ubuntu/Debian
# o
sudo yum install lftp      # CentOS/RHEL
```

### Paso 2: Conectar y subir

```bash
cd /home/santi/CILS

lftp -u ftp@n7000023.ferozo.com,tuWEfu91po n7000023.ferozo.com <<EOF
cd public_html
mirror -R dist/ ./
bye
EOF
```

---

## Opción 3: Script Automatizado

Puedes crear un script para automatizar el upload:

```bash
#!/bin/bash
# upload-to-ferozo.sh

HOST="n7000023.ferozo.com"
USER="ftp@n7000023.ferozo.com"
PASS="tuWEfu91po"
LCD="/home/santi/CILS/dist"
RCD="public_html"

lftp -f "
open $HOST
user $USER $PASS
lcd $LCD
cd $RCD
mirror --reverse --delete --verbose
bye
"
```

Guárdalo y ejecútalo:

```bash
chmod +x upload-to-ferozo.sh
./upload-to-ferozo.sh
```

---

## ⚠️ Puntos Importantes

### 1. Estructura correcta en el servidor

**❌ INCORRECTO:**

```
public_html/
└── dist/
    ├── index.html
    ├── assets/
    └── .htaccess
```

**✅ CORRECTO:**

```
public_html/
├── index.html
├── assets/
├── .htaccess
└── ...
```

### 2. Verificar .htaccess

El archivo `.htaccess` es crucial para que funcione el routing de React Router.

Si no se subió automáticamente:

1. Verifica que esté en `dist/.htaccess` localmente
2. Súbelo manualmente
3. Asegúrate de que los archivos ocultos estén visibles en FileZilla:
   - Server → Force showing hidden files

### 3. Permisos de archivos

Los archivos deben tener permisos correctos:

- Archivos: `644`
- Carpetas: `755`

En FileZilla, click derecho → File permissions

---

## ✅ Verificación Post-Deploy

### 1. Verificar que el sitio carga

Abre en tu navegador:

```
http://n7000023.ferozo.com
```

Deberías ver la página principal de CILS.

### 2. Verificar routing

Navega a diferentes páginas:

- `/novedades`
- `/about`
- `/contacto`

Luego **refresca la página** (F5). Si no da error 404, el routing funciona correctamente.

### 3. Verificar carga de novedades

1. Ve a la página de Novedades
2. Abre DevTools (F12)
3. Ve a la pestaña Network
4. Deberías ver una llamada a tu backend de Render.com
5. Las novedades deberían cargarse correctamente

### 4. Verificar en móvil

Abre el sitio en tu teléfono para verificar responsive design.

---

## 🔧 Troubleshooting

### Error 404 en rutas

**Problema**: Al refrescar `/novedades` da error 404

**Solución**:

1. Verifica que `.htaccess` esté en la raíz de `public_html`
2. Verifica que el servidor Apache tenga `mod_rewrite` habilitado
3. Contacta a Ferozo si persiste el problema

### No cargan las novedades

**Problema**: La página carga pero las novedades no aparecen

**Solución**:

1. Abre DevTools → Console
2. Busca errores CORS
3. Verifica que la URL del backend en `src/config/api.ts` sea correcta
4. Verifica que el backend de Render.com esté funcionando

### Archivos no se actualizan

**Problema**: Hiciste cambios pero no se ven en el sitio

**Solución**:

1. Limpia caché del navegador (Ctrl + Shift + R)
2. Verifica que subiste los archivos correctos
3. Espera 1-2 minutos para propagación de caché

---

## 📝 Checklist Final

- [ ] FileZilla instalado y conectado
- [ ] Navegado a `public_html`
- [ ] Subido todo el contenido de `dist/`
- [ ] Verificado que `.htaccess` esté presente
- [ ] Sitio carga correctamente
- [ ] Routing funciona (sin error 404)
- [ ] Novedades se cargan desde backend
- [ ] Probado en móvil

---

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
