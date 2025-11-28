# ⚡ Quick Start - Sanity CMS (5 minutos)

## � Inicio Rápido

### 1. Instalar (desde WSL)

```bash
cd ~/CILS
npm install
cd cms/cms/studio && npm install
```

### 2. Configurar Variables

Crea `.env.local` en la raíz:

```env
VITE_SANITY_PROJECT_ID=81u4pzxo
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
```

### 3. Iniciar Sanity Studio

```bash
cd ~/CILS/cms/cms/studio
npm run dev
```

Abre: **http://localhost:3333/studio**

### 4. Crear Primer Documento

1. En Sanity Studio, haz clic en **"Configuración del Sitio"**
2. Haz clic en **"Create new"**
3. Completa al menos:
   - **Hero** → Título y subtítulo
   - **Navegación** → Agrega 2-3 items
4. Haz clic en **"Publish"** (arriba derecha)

### 5. Usar en Componente React

```tsx
import { useSanityConfig } from '../config/site.config';

function MyComponent() {
  const { config, loading } = useSanityConfig();

  if (loading) return <div>Cargando...</div>;

  return <h1>{config?.hero.title}</h1>;
}
```

---

# 📦 Comandos de Instalación Detallados

## ⚠️ Importante: Ejecutar desde WSL

Como estás usando WSL (Windows Subsystem for Linux), necesitas ejecutar los comandos desde la terminal de WSL, no desde PowerShell de Windows.

## 🚀 Opción 1: Usar Terminal WSL

1. Abre **Ubuntu** (o tu distribución WSL) desde el menú de Windows
2. Navega al directorio del proyecto:

   ```bash
   cd ~/CILS
   ```

3. Instala dependencias del proyecto principal:

   ```bash
   npm install
   ```

4. Instala dependencias de Sanity Studio:
   ```bash
   cd cms/cms/studio
   npm install
   ```

## 🚀 Opción 2: Usar VS Code con WSL

Si usas VS Code:

1. Abre VS Code
2. Presiona `Ctrl + Shift + P` (o `Cmd + Shift + P` en Mac)
3. Escribe: `WSL: Connect to WSL`
4. Abre la terminal integrada (`` Ctrl + ` ``)
5. Ejecuta los comandos desde ahí

## 🚀 Opción 3: Desde PowerShell con `wsl`

Puedes ejecutar comandos de WSL directamente desde PowerShell:

```powershell
# Instalar dependencias del proyecto principal
wsl -d Ubuntu -e bash -c "cd ~/CILS && npm install"

# Instalar dependencias de Sanity Studio
wsl -d Ubuntu -e bash -c "cd ~/CILS/cms/cms/studio && npm install"
```

O de forma más simple, abre una sesión de WSL:

```powershell
wsl
```

Y luego ejecuta los comandos normalmente:

```bash
cd ~/CILS
npm install
cd cms/cms/studio
npm install
```

## 📋 Checklist de Instalación

- [ ] Abrir terminal WSL (Ubuntu)
- [ ] Navegar a `~/CILS`
- [ ] Ejecutar `npm install` (instala `groq` y otras dependencias)
- [ ] Navegar a `cms/cms/studio`
- [ ] Ejecutar `npm install` (instala Sanity Studio)

## ✅ Verificar Instalación

Después de instalar, verifica que todo esté correcto:

```bash
# Desde ~/CILS
npm list groq @sanity/client

# Desde ~/CILS/cms/cms/studio
npm list sanity @sanity/vision
```

## 🎯 Siguiente Paso

Una vez instaladas las dependencias:

1. **Configurar variables de entorno** (crear `.env.local` - ver `ENVIRONMENT.md`)
2. **Iniciar Sanity Studio:**
   ```bash
   cd ~/CILS/cms/cms/studio
   npm run dev
   ```

## 🔧 Solución de Problemas

### Error: "npm: command not found"

- Asegúrate de estar en una terminal WSL (Ubuntu), no en PowerShell
- Verifica que Node.js esté instalado: `node --version`
- Si no está instalado: `sudo apt update && sudo apt install nodejs npm`

### Error: "Permission denied"

- Usa `sudo` si es necesario (aunque generalmente no debería ser necesario para `npm install` en el directorio del usuario)

### Error: "Cannot find module"

- Asegúrate de haber ejecutado `npm install` en ambos directorios
- Verifica que estás en el directorio correcto
