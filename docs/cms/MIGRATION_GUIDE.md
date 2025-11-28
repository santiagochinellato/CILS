# 🚀 Migrar Configuración del Sitio a Sanity

## ⚠️ Problema

El documento "Configuración del Sitio" está vacío en Sanity Studio. Necesitas ejecutar la migración completa de datos.

## ✅ Solución: Ejecutar Migración Completa

### Paso 1: Ejecutar la Migración

Desde WSL (Ubuntu):

```bash
cd ~/CILS
npx tsx scripts/migrate-to-sanity.ts
```

**IMPORTANTE:** No uses `--dry-run`, ejecuta la migración real.

### Paso 2: Esperar a que Complete

El script hará lo siguiente en orden:

1. ✅ Migrar Servicios (5)
2. ✅ Migrar Clientes (16)
3. ✅ Migrar Testimonios (2)
4. ✅ Migrar Miembros del Equipo (10)
5. ✅ Migrar Links (5)
6. ✅ **Crear/Actualizar "Configuración del Sitio"** ← Esto es lo importante

### Paso 3: Verificar en Sanity Studio

1. Abre Sanity Studio: `http://localhost:3333/studio`
2. Busca **"Configuración del Sitio"** en el menú lateral
3. Abre el documento
4. Verifica que todas las secciones estén completas:
   - ✅ Navegación
   - ✅ Hero Section
   - ✅ Estadísticas
   - ✅ About
   - ✅ Servicios (5 referencias)
   - ✅ Clientes (16 referencias)
   - ✅ Testimonios (2 referencias)
   - ✅ Equipo (intro + 10 miembros)
   - ✅ Contacto
   - ✅ Footer
   - ✅ SEO
   - ✅ Floating Actions
   - ✅ Links (5 referencias)

5. Si todo está completo, haz clic en **"Publish"** para asegurarte de que esté publicado

## 🔄 Si Ya Ejecutaste la Migración Antes

Si ya ejecutaste la migración pero el documento está vacío, usa `--force`:

```bash
npx tsx scripts/migrate-to-sanity.ts --force
```

Esto forzará la actualización de todos los documentos, incluyendo "Configuración del Sitio".

## 📊 Qué Esperar

Deberías ver algo como esto:

```
🚀 Iniciando migración automática a Sanity...

🔌 Verificando conexión con Sanity...
✅ Conexión exitosa

📦 Migrando servicios...
  ✅ Servicio "Contable" - Creando...
  ✅ Servicio "Impositiva" - Creando...
  ...

📦 Migrando clientes...
  ✅ Cliente "INVAP" - Creando...
  ...

📦 Migrando configuración del sitio...
  ✅ Configuración del sitio migrada

==================================================
📊 Resumen de Migración:
==================================================
  ✅ Creados: 38
  🔄 Actualizados: 1
  ⏭️  Omitidos: 0
==================================================

✅ Migración completada exitosamente!
```

## ⚠️ Si Algo Sale Mal

### Error: "SANITY_API_TOKEN no está configurado"

1. Verifica que el archivo `.env.local` existe
2. Verifica que contiene `SANITY_API_TOKEN=...`
3. Si no existe, créalo (ver `ENV_SETUP.md`)

### Error: "Cliente no encontrado"

- Esto es normal si los clientes aún no existen
- El script creará los clientes primero, luego los asociará

### El documento sigue vacío después de la migración

1. Verifica que el script completó sin errores
2. Recarga Sanity Studio (F5)
3. Busca "Configuración del Sitio" nuevamente
4. Si sigue vacío, ejecuta con `--force`:
   ```bash
   npx tsx scripts/migrate-to-sanity.ts --force
   ```

## ✅ Checklist Post-Migración

Después de ejecutar la migración:

- [ ] Script completó sin errores
- [ ] "Configuración del Sitio" tiene contenido
- [ ] Todas las secciones están completas
- [ ] Documento está publicado en Sanity Studio
- [ ] Puedes ver los datos en el frontend (usando `TestSanityData`)

## 🎯 Siguiente Paso

Una vez que "Configuración del Sitio" esté completo:

1. **Subir imágenes de logos:**
   ```bash
   npx tsx scripts/upload-images-to-sanity.ts
   ```

2. **Verificar en el frontend:**
   - Agrega `TestSanityData` a `Home.tsx`
   - Inicia el frontend: `npm run dev`
   - Verifica que los datos se carguen desde Sanity

---

**¡Ejecuta la migración ahora para poblar "Configuración del Sitio"! 🚀**

