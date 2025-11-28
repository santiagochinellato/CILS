# 📸 Guía: Subir Imágenes a Sanity

## 🎯 Objetivo

Subir automáticamente las imágenes de logos de clientes y otras imágenes del sitio a Sanity CMS.

## 📋 Imágenes a Subir

### Logos de Clientes
- ✅ 18 logos en `public/images/logosClientes/`
- Se asociarán automáticamente con los documentos de clientes en Sanity

### Logos del Sitio (Opcional)
- `cilsLogo.png` - Logo principal
- `cilsLogoWhite.png` - Logo blanco
- `favicon-w16.png` - Favicon 16x16
- `favicon-w32.png` - Favicon 32x32

## 🚀 Uso del Script

### Opción 1: Solo Logos de Clientes (Recomendado)

```bash
cd ~/CILS
npx tsx scripts/upload-images-to-sanity.ts --logos
```

O simplemente:

```bash
npx tsx scripts/upload-images-to-sanity.ts
```

### Opción 2: Todas las Imágenes

```bash
npx tsx scripts/upload-images-to-sanity.ts --all
```

## 📝 Qué Hace el Script

1. **Lee las imágenes** de `public/images/logosClientes/`
2. **Sube cada imagen** a Sanity Assets
3. **Asocia automáticamente** cada logo con su cliente correspondiente
4. **Muestra un resumen** de imágenes subidas y asociadas

## ✅ Mapeo de Archivos a Clientes

El script mapea automáticamente:

- `invap.png` → INVAP
- `invapIng.png` → INVAP Ingeniería
- `biotis.png` → Biotis
- `carelhue.png` → Carelhue
- `elcasco.png` → El Casco
- `girasoles.png` → Girasoles
- `goye.png` → Goye
- `hayland.png` → Hayland
- `interpracsys.png` → Interpracsys
- `morales.png` → Morales
- `onelli.png` → Onelli
- `pasteur.png` → Pasteur
- `pintArg.png` → PintArg
- `romag.png` → Romag
- `rx.png` → RX
- `911.png` → Emergencias 911
- `delsur.png` → Delsur

**Nota:** Algunos archivos como `images (1).png` y `Proyecto nuevo.png` se omitirán automáticamente.

## 🔍 Verificar Resultados

### En Sanity Studio:

1. Abre Sanity Studio: `http://localhost:3333/studio`
2. Ve a **"Cliente"** en el menú lateral
3. Abre cualquier cliente (ej: INVAP)
4. Verifica que el campo **"Logo"** tenga una imagen

### En el Frontend:

1. Inicia el frontend: `npm run dev`
2. Ve a la página de clientes
3. Verifica que los logos se muestren correctamente

## ⚠️ Notas Importantes

1. **El script requiere que los clientes ya existan** en Sanity
   - Si no has ejecutado la migración de datos, hazlo primero:
   ```bash
   npx tsx scripts/migrate-to-sanity.ts
   ```

2. **Si un cliente no se encuentra**, el logo se subirá pero no se asociará
   - Puedes asociarlo manualmente en Sanity Studio
   - El script mostrará el Asset ID para referencia

3. **Imágenes duplicadas** se omitirán automáticamente

4. **El proceso puede tardar** varios minutos dependiendo del número de imágenes

## 🐛 Solución de Problemas

### "Cliente no encontrado en Sanity"

- Verifica que ejecutaste la migración de datos primero
- Verifica que el nombre del cliente en Sanity coincide exactamente con el mapeo
- Puedes asociar el logo manualmente en Sanity Studio

### "Error subiendo imagen"

- Verifica que el archivo existe y es accesible
- Verifica que el token de Sanity tiene permisos de escritura
- Verifica que hay espacio disponible en tu proyecto de Sanity

### "Las imágenes no se muestran en el frontend"

- Verifica que los clientes tienen el logo asociado en Sanity
- Verifica que la query GROQ incluye `logo.asset->url`
- Recarga la página del frontend

## 📊 Resumen del Proceso

```
1. Script lee imágenes de public/images/logosClientes/
   ↓
2. Sube cada imagen a Sanity Assets
   ↓
3. Busca el cliente correspondiente en Sanity
   ↓
4. Asocia el logo con el cliente
   ↓
5. Muestra resumen de éxito/errores
```

## ✅ Checklist

- [ ] Ejecutar migración de datos primero (si no lo has hecho)
- [ ] Ejecutar script de subida de imágenes
- [ ] Verificar en Sanity Studio que los logos están asociados
- [ ] Verificar en el frontend que los logos se muestran
- [ ] Revisar y asociar manualmente cualquier logo que no se asoció automáticamente

---

**¡Listo para subir imágenes! 📸**

