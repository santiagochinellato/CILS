# 🔧 Solución: Error de Referencias Draft en Sanity

## ⚠️ Problema

Error al publicar en Sanity Studio:
```
Document "drafts.4yOCAoC5LuWVSC70PldzJL" cannot be deleted as there are references to it from "siteSettings"
```

## 🔍 Causa

Hay documentos en estado **"draft"** (borrador) que están referenciados desde "Configuración del Sitio". Sanity no permite eliminar o publicar documentos que tienen referencias activas.

## ✅ Solución Automática

He creado un script que corrige esto automáticamente:

```bash
cd ~/CILS
npx tsx scripts/fix-draft-references.ts
```

Este script:
1. ✅ Encuentra todos los documentos en estado draft
2. ✅ Los publica automáticamente
3. ✅ Corrige las referencias en siteSettings
4. ✅ Elimina los drafts

## 🔧 Solución Manual (Alternativa)

Si prefieres hacerlo manualmente en Sanity Studio:

### Paso 1: Encontrar el Documento Draft

1. En Sanity Studio, busca el documento con ID `4yOCAoC5LuWVSC70PldzJL`
2. O revisa todos los documentos de tipo:
   - Servicios
   - Clientes
   - Testimonios
   - Miembros del Equipo
   - Links

### Paso 2: Publicar el Documento Draft

1. Abre el documento que está en estado "draft"
2. Haz clic en **"Publish"** (arriba a la derecha)
3. Repite para todos los documentos en draft

### Paso 3: Publicar siteSettings

1. Abre "Configuración del Sitio"
2. Haz clic en **"Publish"**

## 🎯 Solución Rápida Recomendada

**Ejecuta el script automático:**

```bash
cd ~/CILS
npx tsx scripts/fix-draft-references.ts
```

Luego intenta publicar siteSettings nuevamente en Sanity Studio.

## 📋 Qué Hace el Script

1. **Busca documentos draft:**
   - Servicios en draft
   - Clientes en draft
   - Testimonios en draft
   - Miembros del equipo en draft
   - Links en draft

2. **Publica los documentos:**
   - Convierte cada draft a documento publicado
   - Elimina el draft original

3. **Corrige referencias:**
   - Actualiza siteSettings para que apunte a documentos publicados (no drafts)

4. **Muestra resumen:**
   - Cuántos documentos se publicaron
   - Si hay problemas pendientes

## ⚠️ Si el Error Persiste

1. **Recarga Sanity Studio** (F5)
2. **Ejecuta el script nuevamente**
3. **Verifica manualmente** en Sanity Studio:
   - Ve a "Configuración del Sitio"
   - Revisa las referencias en cada sección
   - Asegúrate de que todas apunten a documentos publicados (no drafts)

## 🔍 Verificar que Funcionó

Después de ejecutar el script:

1. Abre Sanity Studio
2. Busca cualquier documento que antes estaba en draft
3. Verifica que ahora esté publicado (no debería tener el indicador "Draft")
4. Intenta publicar "Configuración del Sitio" nuevamente
5. Debería funcionar sin errores

---

**¡Ejecuta el script para solucionarlo automáticamente! 🚀**

