# 🔧 Solución: Variables de Entorno

## Problema

El script no encuentra las variables de entorno porque `dotenv` por defecto busca `.env`, no `.env.local`.

## ✅ Solución Aplicada

He actualizado el script para que cargue `.env.local` primero, y luego `.env` como fallback.

## 📝 Crear el archivo .env.local

**Desde WSL (Ubuntu):**

```bash
cd ~/CILS

# Crear el archivo
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

# Verificar que se creó
cat .env.local
```

## 🧪 Probar

Después de crear el archivo:

```bash
npx tsx scripts/migrate-to-sanity.ts --dry-run
```

Deberías ver:
```
🚀 Iniciando migración automática a Sanity...
🔍 MODO DRY-RUN: No se realizarán cambios reales
🔌 Verificando conexión con Sanity...
✅ Conexión exitosa
```

## 🔍 Verificar que el archivo existe

```bash
ls -la ~/CILS/.env.local
```

Deberías ver el archivo listado.

## ⚠️ Si sigue sin funcionar

1. Verifica que el archivo existe:
   ```bash
   cat ~/CILS/.env.local
   ```

2. Verifica que el token está completo (debe terminar en `...fI`)

3. Prueba ejecutar el script con variables de entorno explícitas:
   ```bash
   export SANITY_API_TOKEN="skE4aeEb2kXTIMoWDEZp0wRAReIjikUa5laiJJPYTJPzOiuc8sRbcRnKou0weW6RYA4ztmGkqEglyw3NRqNXAqS65opFnLr3SQpqplRaJtAuBCecSj2qRdFzRjkSmNfzOa9WqxG7WgCxx88drcbE3glPKX3hvF0iAyjmc4etQYa9RFup53fI"
   export SANITY_PROJECT_ID="81u4pzxo"
   export SANITY_DATASET="production"
   npx tsx scripts/migrate-to-sanity.ts --dry-run
   ```

