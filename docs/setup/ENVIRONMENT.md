# 🔧 Crear archivo .env.local

El archivo `.env.local` está protegido, así que necesitas crearlo manualmente.

## 📝 Pasos

### Opción 1: Desde WSL (Recomendado)

1. Abre una terminal WSL (Ubuntu)
2. Navega al proyecto:
   ```bash
   cd ~/CILS
   ```

3. Crea el archivo:
   ```bash
   cat > .env.local << 'EOF'
   # Sanity Configuration
   VITE_SANITY_PROJECT_ID=81u4pzxo
   VITE_SANITY_DATASET=production
   VITE_SANITY_API_VERSION=2024-01-01

   # Sanity Studio (para scripts y migración)
   SANITY_STUDIO_PROJECT_ID=81u4pzxo
   SANITY_STUDIO_DATASET=production
   SANITY_PROJECT_ID=81u4pzxo
   SANITY_DATASET=production
   SANITY_API_TOKEN=skE4aeEb2kXTIMoWDEZp0wRAReIjikUa5laiJJPYTJPzOiuc8sRbcRnKou0weW6RYA4ztmGkqEglyw3NRqNXAqS65opFnLr3SQpqplRaJtAuBCecSj2qRdFzRjkSmNfzOa9WqxG7WgCxx88drcbE3glPKX3hvF0iAyjmc4etQYa9RFup53fI
   EOF
   ```

4. Verifica que se creó:
   ```bash
   cat .env.local
   ```

### Opción 2: Desde VS Code

1. Abre VS Code en el proyecto
2. Crea un nuevo archivo llamado `.env.local` en la raíz
3. Copia y pega este contenido:

```env
# Sanity Configuration
VITE_SANITY_PROJECT_ID=81u4pzxo
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01

# Sanity Studio (para scripts y migración)
SANITY_STUDIO_PROJECT_ID=81u4pzxo
SANITY_STUDIO_DATASET=production
SANITY_PROJECT_ID=81u4pzxo
SANITY_DATASET=production
SANITY_API_TOKEN=skE4aeEb2kXTIMoWDEZp0wRAReIjikUa5laiJJPYTJPzOiuc8sRbcRnKou0weW6RYA4ztmGkqEglyw3NRqNXAqS65opFnLr3SQpqplRaJtAuBCecSj2qRdFzRjkSmNfzOa9WqxG7WgCxx88drcbE3glPKX3hvF0iAyjmc4etQYa9RFup53fI
```

### Opción 3: Desde PowerShell (si estás en Windows)

```powershell
# Desde PowerShell, ejecuta WSL
wsl

# Luego en WSL:
cd ~/CILS
nano .env.local
# Pega el contenido y guarda con Ctrl+X, luego Y, luego Enter
```

## ✅ Verificar

Después de crear el archivo, verifica que funciona:

```bash
# Desde WSL
cd ~/CILS
npx tsx scripts/migrate-to-sanity.ts --dry-run
```

Deberías ver:
```
🚀 Iniciando migración automática a Sanity...
🔍 MODO DRY-RUN: No se realizarán cambios reales
🔌 Verificando conexión con Sanity...
✅ Conexión exitosa
```

## ⚠️ Importante

- El archivo `.env.local` ya está en `.gitignore` y no se subirá al repositorio
- No compartas el token públicamente
- El token tiene permisos de escritura

