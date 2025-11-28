# 🎯 Ejemplo Práctico: Tu Primera Edición en Sanity

Este es un ejemplo paso a paso para hacer tu primera edición en Sanity.

## 📝 Escenario

Vamos a **cambiar el título del Hero** desde Sanity Studio y verlo reflejado en tu sitio web.

---

## Paso 1: Iniciar Sanity Studio

```bash
# Desde WSL (Ubuntu)
cd ~/CILS/cms/cms/studio
npm run dev
```

Espera a que veas:
```
✔ Sanity Studio is running at http://localhost:3333/studio
```

---

## Paso 2: Abrir Sanity Studio

1. Abre tu navegador
2. Ve a: **http://localhost:3333/studio**
3. Deberías ver la interfaz de Sanity Studio

---

## Paso 3: Crear o Editar "Configuración del Sitio"

### Si es la primera vez:

1. En el menú lateral izquierdo, busca **"Configuración del Sitio"**
2. Si no existe, haz clic en **"Create new"**
3. Si ya existe, haz clic en él para editarlo

### Editar el Hero:

1. Busca la sección **"Hero Section"** en el editor
2. Encuentra el campo **"Título Principal"**
3. Cambia el texto a algo como: **"Tu Socio Estratégico en Gestión Contable"**
4. Completa también:
   - **Badge**: "Más de 10 años en Bariloche"
   - **Subtítulo**: "Soluciones integrales para el crecimiento sostenible"
   - **CTA Principal**:
     - Label: "Solicitar Asesoramiento"
     - URL: "/contacto"
   - **CTA Secundario**:
     - Label: "Conocer Servicios"
     - URL: "/servicios"
   - **Texto de Confianza**: "INVAP y +100 empresas confían en nosotros"

---

## Paso 4: Publicar los Cambios

1. **IMPORTANTE**: Haz clic en el botón **"Publish"** (arriba a la derecha)
2. Espera a ver el mensaje de confirmación
3. Los cambios ahora están guardados en Sanity

---

## Paso 5: Ver los Cambios en tu Sitio

### Opción A: Usar el Hook (Recomendado)

Crea un componente de prueba:

```tsx
// src/components/TestSanity.tsx
import { useSanityConfig } from '../config/site.config';

export const TestSanity = () => {
  const { config, loading, error } = useSanityConfig();
  
  if (loading) {
    return <div>Cargando desde Sanity...</div>;
  }
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  if (!config) {
    return <div>No hay configuración disponible</div>;
  }
  
  return (
    <div style={{ padding: '20px', border: '2px solid blue' }}>
      <h2>Datos desde Sanity:</h2>
      <h3>{config.hero.title}</h3>
      <p>{config.hero.subtitle}</p>
      <p>Badge: {config.hero.badge}</p>
    </div>
  );
};
```

Agrega este componente temporalmente a tu Home:

```tsx
// src/pages/Home.tsx
import { TestSanity } from '../components/TestSanity';

// ... en tu componente
return (
  <>
    <TestSanity /> {/* Componente de prueba */}
    <Header />
    {/* ... resto del código */}
  </>
);
```

### Opción B: Verificar en Consola

Abre la consola del navegador (F12) y ejecuta:

```javascript
// Esto debería mostrar los datos de Sanity
fetch('https://81u4pzxo.api.sanity.io/v2024-01-01/data/query/production?query=*[_type=="siteSettings"][0]')
  .then(r => r.json())
  .then(data => console.log('Sanity Data:', data));
```

---

## Paso 6: Verificar que Funciona

1. **Recarga tu aplicación React** (si está corriendo)
2. Deberías ver el nuevo título del Hero
3. Si no ves cambios:
   - Verifica que publicaste en Sanity Studio (no solo guardaste como draft)
   - Verifica que el hook está funcionando (revisa la consola)
   - Verifica las variables de entorno

---

## 🎓 Siguiente Paso: Agregar un Servicio

Ahora que sabes editar, vamos a **crear un servicio completo**:

### 1. Crear el Servicio

1. En Sanity Studio, haz clic en **"Servicio"** (menú lateral)
2. Haz clic en **"Create new"**
3. Completa:
   - **Título**: "Contable"
   - **Icono**: Selecciona "contable"
   - **Descripción**: "Conocer el rumbo de los negocios es de vital importancia..."
   - **Características**: 
     - Haz clic en "+" para agregar cada una
     - "Estudio y asesoramiento permanente"
     - "Contabilidad Organizada tercerizada"
     - etc.
   - **Link**: "#contact"
   - **Orden**: 0
4. **Publish**

### 2. Agregar el Servicio a la Configuración

1. Abre **"Configuración del Sitio"**
2. Busca la sección **"Servicios"**
3. Haz clic en **"Add item"** o el botón **"+"**
4. Selecciona el servicio "Contable" que acabas de crear
5. **Publish**

### 3. Ver en el Frontend

El servicio ahora debería aparecer en tu página de servicios automáticamente.

---

## 🔍 Entender qué está Pasando

### Flujo de Datos:

```
1. Editas en Sanity Studio
   ↓
2. Publicas (Publish)
   ↓
3. Datos se guardan en Sanity Cloud
   ↓
4. Tu app React consulta Sanity API
   ↓
5. Hook transforma datos a formato esperado
   ↓
6. Componentes muestran los datos
```

### El Hook `useSanityConfig`:

```tsx
// Lo que hace internamente:
1. Consulta Sanity: "Dame la configuración del sitio"
2. Sanity responde con JSON
3. Transforma el JSON al formato SiteConfig
4. Si falla, usa datos estáticos (fallback)
5. Retorna: { config, loading, error }
```

---

## 💡 Tips Importantes

1. **Siempre Publica**: Los cambios sin publicar son "drafts" y no se ven en producción
2. **Orden Importa**: Usa el campo "Orden" para controlar el orden de aparición
3. **Imágenes**: Sube imágenes optimizadas (Sanity las optimiza automáticamente)
4. **Referencias**: Cuando seleccionas un servicio/cliente, estás creando una "referencia"
5. **Fallback**: Si Sanity falla, tu app usa datos estáticos automáticamente

---

## 🐛 Solución de Problemas

### "No veo mis cambios"

✅ Verifica:
- ¿Hiciste clic en "Publish"?
- ¿Recargaste la página del frontend?
- ¿Hay errores en la consola del navegador?

### "Error al cargar datos"

✅ Verifica:
- ¿Existe el documento "siteSettings" en Sanity?
- ¿Está publicado (no es draft)?
- ¿Las variables de entorno están configuradas?

### "El hook siempre muestra loading"

✅ Verifica:
- ¿Sanity Studio está corriendo?
- ¿Las variables de entorno son correctas?
- ¿Hay errores de red en la consola?

---

## 📚 Próximos Pasos

1. ✅ Editar Hero Section
2. ✅ Crear un Servicio
3. ⏭️ Crear un Cliente
4. ⏭️ Agregar un Miembro del Equipo
5. ⏭️ Modificar About Section
6. ⏭️ Actualizar Footer

---

**¡Felicidades! Ya sabes lo básico de Sanity 🎉**

Para más detalles, lee `TUTORIAL_SANITY.md`

