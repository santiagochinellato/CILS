# Configuración de Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:

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

**IMPORTANTE:** 
- El archivo `.env.local` ya está en `.gitignore` y no se subirá al repositorio
- No compartas el token públicamente
- El token tiene permisos de escritura, úsalo con cuidado

