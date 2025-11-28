# 🎓 Tutorial Completo: Aprender a Usar Sanity CMS

## 📚 Tabla de Contenidos

1. [¿Qué es Sanity?](#qué-es-sanity)
2. [Conceptos Básicos](#conceptos-básicos)
3. [Primeros Pasos](#primeros-pasos)
4. [Usar Sanity Studio](#usar-sanity-studio)
5. [Gestionar Contenido](#gestionar-contenido)
6. [Usar Datos en el Frontend](#usar-datos-en-el-frontend)
7. [Prácticas Recomendadas](#prácticas-recomendadas)

---

## ¿Qué es Sanity?

Sanity es un **CMS Headless** (sistema de gestión de contenido sin interfaz predefinida). Esto significa:

- ✅ **Gestionas contenido** desde una interfaz web (Sanity Studio)
- ✅ **Consumes contenido** desde tu aplicación React mediante API
- ✅ **Totalmente personalizable** - defines tu propia estructura de datos
- ✅ **Tiempo real** - los cambios se reflejan inmediatamente

### Analogía Simple

Imagina que Sanity es como un **Excel en la nube**:
- **Sanity Studio** = La interfaz para editar (como Excel)
- **Schemas** = Las columnas y tipos de datos (como definir que una columna es "número" o "texto")
- **Documents** = Las filas de datos (cada servicio, cliente, etc.)
- **API** = La forma de leer esos datos desde tu app React

---

## Conceptos Básicos

### 1. **Schemas (Esquemas)**
Definen la **estructura** de tus datos. Por ejemplo:
- Un "Servicio" tiene: título, descripción, características
- Un "Cliente" tiene: nombre, logo, URL

**Ya están creados en:** `cms/cms/studio/schemas/`

### 2. **Documents (Documentos)**
Son las **instancias** de tus schemas. Por ejemplo:
- Documento "Servicio Contable" (con sus datos específicos)
- Documento "Cliente INVAP" (con sus datos específicos)

### 3. **References (Referencias)**
Permiten **relacionar** documentos. Por ejemplo:
- El documento "siteSettings" referencia a varios "Servicios"

### 4. **GROQ (Query Language)**
El lenguaje para **consultar** datos desde Sanity. Similar a SQL pero para JSON.

---

## Primeros Pasos

### Paso 1: Instalar Dependencias

```bash
# Desde WSL (Ubuntu)
cd ~/CILS

# Instalar dependencias del proyecto
npm install

# Instalar dependencias de Sanity Studio
cd cms/cms/studio
npm install
```

### Paso 2: Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
VITE_SANITY_PROJECT_ID=81u4pzxo
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01

SANITY_STUDIO_PROJECT_ID=81u4pzxo
SANITY_STUDIO_DATASET=production
SANITY_PROJECT_ID=81u4pzxo
SANITY_DATASET=production
SANITY_API_TOKEN=skE4aeEb2kXTIMoWDEZp0wRAReIjikUa5laiJJPYTJPzOiuc8sRbcRnKou0weW6RYA4ztmGkqEglyw3NRqNXAqS65opFnLr3SQpqplRaJtAuBCecSj2qRdFzRjkSmNfzOa9WqxG7WgCxx88drcbE3glPKX3hvF0iAyjmc4etQYa9RFup53fI
```

### Paso 3: Iniciar Sanity Studio

```bash
# Desde ~/CILS/cms/cms/studio
npm run dev
```

Esto iniciará Sanity Studio en: **http://localhost:3333/studio**

---

## Usar Sanity Studio

### Interfaz Principal

Cuando abres Sanity Studio verás:

1. **Menú lateral izquierdo** - Lista de tipos de contenido (Servicios, Clientes, etc.)
2. **Área central** - Editor de documentos
3. **Barra superior** - Búsqueda, configuración, etc.

### Crear tu Primer Documento

#### 1. Crear un Servicio

1. En el menú lateral, haz clic en **"Servicio"**
2. Haz clic en **"Create new"** (o el botón +)
3. Completa los campos:
   - **Título**: "Contable"
   - **Icono**: Selecciona "contable" del dropdown
   - **Descripción**: Escribe la descripción
   - **Características**: Agrega cada característica (usa el botón +)
   - **Link**: "#contact"
   - **Orden**: 0 (para que aparezca primero)
4. Haz clic en **"Publish"** (arriba a la derecha)

#### 2. Crear un Cliente

1. Haz clic en **"Cliente"** en el menú lateral
2. **"Create new"**
3. Completa:
   - **Nombre**: "INVAP"
   - **Logo**: Haz clic en "Select" y sube una imagen
   - **URL del Cliente**: "https://www.invap.com.ar/"
   - **Destacado**: Marca el checkbox si es destacado
   - **Orden**: 0
4. **"Publish"**

#### 3. Crear la Configuración Principal del Sitio

Este es el documento más importante. Contiene toda la configuración:

1. Haz clic en **"Configuración del Sitio"** (siteSettings)
2. Si no existe, haz clic en **"Create new"**
3. Completa todas las secciones:
   - **Navegación**: Agrega items del menú
   - **Hero Section**: Título, subtítulo, CTAs
   - **Estadísticas**: Agrega cada estadística
   - **About**: Información sobre la empresa
   - **Servicios**: Selecciona los servicios creados (usa el dropdown)
   - **Clientes**: Selecciona los clientes creados
   - Y así sucesivamente...
4. **"Publish"**

**💡 Tip:** Puedes empezar con solo algunos campos y completar el resto después.

---

## Gestionar Contenido

### Editar un Documento Existente

1. Haz clic en el tipo de documento (ej: "Servicio")
2. Haz clic en el documento que quieres editar
3. Modifica los campos
4. **"Publish"** para guardar cambios

### Eliminar un Documento

1. Abre el documento
2. Haz clic en el menú de 3 puntos (⋮) arriba a la derecha
3. Selecciona **"Delete"**
4. Confirma

### Buscar Documentos

Usa la barra de búsqueda en la parte superior para buscar cualquier documento.

### Organizar con Orden

Muchos schemas tienen un campo **"Orden"**. Úsalo para controlar el orden de aparición:
- 0 = Primero
- 1 = Segundo
- 2 = Tercero
- etc.

---

## Usar Datos en el Frontend

### Opción 1: Usar el Hook (Recomendado)

```tsx
import { useSanityConfig } from '../config/site.config';

function MyComponent() {
  const { config, loading, error } = useSanityConfig();
  
  if (loading) {
    return <div>Cargando contenido...</div>;
  }
  
  if (error) {
    console.error('Error:', error);
    // El hook automáticamente usa datos estáticos como fallback
  }
  
  if (!config) {
    return <div>No hay contenido disponible</div>;
  }
  
  // Usar los datos
  return (
    <div>
      <h1>{config.hero.title}</h1>
      <p>{config.hero.subtitle}</p>
      
      <h2>Servicios</h2>
      {config.services.map(service => (
        <div key={service.title}>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### Opción 2: Consulta Directa (Avanzado)

```tsx
import { sanityClient } from '../lib/sanity/client';
import { siteSettingsQuery } from '../lib/sanity/queries';

async function fetchData() {
  const data = await sanityClient.fetch(siteSettingsQuery);
  return data;
}
```

### Ver Datos en Tiempo Real

Los cambios en Sanity Studio se reflejan automáticamente en tu frontend cuando:
1. Publicas un documento en Sanity Studio
2. El frontend hace una nueva consulta (al recargar o con el hook)

---

## Prácticas Recomendadas

### 1. **Siempre Publica los Cambios**
- Los cambios solo se guardan cuando haces clic en **"Publish"**
- Los cambios sin publicar aparecen como **"Draft"** (borrador)

### 2. **Usa el Campo "Orden"**
- Organiza servicios, clientes, etc. con números
- Facilita reorganizar sin editar múltiples documentos

### 3. **Sube Imágenes Optimizadas**
- Sanity optimiza automáticamente las imágenes
- Usa formatos modernos (WebP cuando sea posible)
- Tamaño recomendado: máximo 2MB por imagen

### 4. **Mantén Consistencia**
- Usa el mismo formato para textos similares
- Sigue las convenciones establecidas en los schemas

### 5. **Prueba los Cambios**
- Después de publicar, verifica en el frontend
- Usa el modo de desarrollo para ver cambios en tiempo real

### 6. **Backup Regular**
- Sanity mantiene historial de cambios automáticamente
- Puedes restaurar versiones anteriores desde el menú del documento

---

## Flujo de Trabajo Típico

1. **Abrir Sanity Studio** → `npm run dev` en `cms/cms/studio`
2. **Editar contenido** → Modificar textos, imágenes, etc.
3. **Publicar cambios** → Clic en "Publish"
4. **Verificar en frontend** → Recargar la app React
5. **Repetir** según necesidad

---

## Comandos Útiles

```bash
# Iniciar Sanity Studio
cd ~/CILS/cms/cms/studio
npm run dev

# Build de Sanity Studio (para producción)
npm run build

# Deploy de Sanity Studio (publicar en sanity.io)
npm run deploy
```

---

## Recursos Adicionales

- **Documentación oficial**: https://www.sanity.io/docs
- **GROQ Query Language**: https://www.sanity.io/docs/groq
- **Sanity Vision**: Herramienta en Sanity Studio para probar queries GROQ

---

## Ejercicios Prácticos

### Ejercicio 1: Crear un Servicio Completo
1. Crea un nuevo servicio "Impositiva"
2. Completa todos los campos
3. Agrega al menos 5 características
4. Publícalo

### Ejercicio 2: Agregar un Cliente
1. Crea un nuevo cliente
2. Sube su logo
3. Marca como destacado si corresponde
4. Publícalo

### Ejercicio 3: Actualizar Hero Section
1. Abre "Configuración del Sitio"
2. Modifica el título del Hero
3. Cambia los textos de los CTAs
4. Publica y verifica en el frontend

---

## Solución de Problemas Comunes

### "No puedo ver mis cambios en el frontend"
- ✅ Verifica que publicaste los cambios (no solo guardaste como draft)
- ✅ Recarga la página del frontend
- ✅ Verifica que las variables de entorno están configuradas

### "Error al cargar datos"
- ✅ Verifica que el documento "siteSettings" existe y está publicado
- ✅ Revisa la consola del navegador para errores
- ✅ El sistema usa fallback automático a datos estáticos

### "No puedo subir imágenes"
- ✅ Verifica tu conexión a internet
- ✅ Asegúrate de tener permisos en el proyecto de Sanity
- ✅ Intenta con una imagen más pequeña

---

**¡Feliz aprendizaje! 🎉**

Si tienes dudas, consulta la documentación oficial o revisa los ejemplos en `IMPLEMENTACION_SANITY_DETALLES.md`

