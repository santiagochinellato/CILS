# ✅ Verificación Post-Migración - Pasos 3 y 4

## 📋 Paso 3: Revisar y Ajustar la Configuración del Sitio

### 3.1 Abrir Sanity Studio

```bash
cd ~/CILS/cms/cms/studio
npm run dev
```

Abre: **http://localhost:3333/studio**

### 3.2 Verificar Documentos Creados

En Sanity Studio, verifica que existen:

- ✅ **Servicios** (5 documentos)
  - Contable
  - Impositiva
  - Laboral
  - Societaria
  - Otros servicios

- ✅ **Clientes** (16 documentos)
  - INVAP (destacado)
  - INVAP Ingeniería
  - Biotis
  - Carelhue
  - El Casco
  - Girasoles
  - Goye
  - Hayland
  - Interpracsys
  - Morales
  - Onelli
  - Pasteur
  - PintArg
  - Romag
  - RX
  - Emergencias 911

- ✅ **Testimonios** (2 documentos)
  - INVAP
  - Empresa Regional

- ✅ **Miembros del Equipo** (10 documentos)
  - Javier Chinellato
  - Nieves Rodriguez
  - María Teresa Vizgarra
  - Lorena Jauregui
  - Luciano Lobo
  - Natalia Zuber
  - Salustiano Pastrana
  - Daniela Torres
  - Maria Sol Slica
  - Catalina Pagliaro

- ✅ **Links** (5 documentos)
  - Consulta CAI
  - Búsqueda CUIT Online
  - Constancia Inscripción AFIP
  - App Retenciones CILS
  - Consulta CAE

- ✅ **Configuración del Sitio** (1 documento)
  - Este es el documento principal que contiene toda la configuración

### 3.3 Revisar "Configuración del Sitio"

1. Haz clic en **"Configuración del Sitio"** en el menú lateral
2. Verifica que todas las secciones estén completas:
   - ✅ Navegación (items del menú)
   - ✅ Hero Section (título, subtítulo, CTAs)
   - ✅ Estadísticas (4 stats)
   - ✅ About (badge, título, párrafos, features, tabs)
   - ✅ Servicios (debe tener 5 referencias)
   - ✅ Clientes (debe tener 16 referencias)
   - ✅ Testimonios (debe tener 2 referencias)
   - ✅ Equipo (intro + 10 miembros)
   - ✅ Contacto (información completa)
   - ✅ Footer (configuración completa)
   - ✅ SEO (metadata completa)
   - ✅ Floating Actions (WhatsApp, scrollTop)
   - ✅ Links (5 referencias)

3. Si falta algo, completa los campos vacíos

4. **IMPORTANTE**: Haz clic en **"Publish"** para guardar los cambios

### 3.4 Subir Imágenes (Opcional pero Recomendado)

#### Logos de Clientes:

1. Abre cada **Cliente** en Sanity Studio
2. En el campo **"Logo"**, haz clic en **"Select"**
3. Sube el logo correspondiente desde `public/images/logosClientes/`
4. Guarda y publica

#### Fotos de Miembros del Equipo:

1. Abre cada **Miembro del Equipo** en Sanity Studio
2. En el campo **"Imagen"**, haz clic en **"Select"**
3. Sube la foto correspondiente desde `public/images/equipo/`
4. Guarda y publica

---

## 📋 Paso 4: Verificar que Todo se Vea Correcto en el Frontend

### 4.1 Iniciar el Frontend

```bash
cd ~/CILS
npm run dev
```

Abre: **http://localhost:5173/es**

### 4.2 Verificar que los Datos se Carguen desde Sanity

#### Opción A: Usar el Hook en un Componente de Prueba

Crea un componente temporal para verificar:

```tsx
// src/components/TestSanityData.tsx
import { useSanityConfig } from '../config/site.config';

export const TestSanityData = () => {
  const { config, loading, error } = useSanityConfig();
  
  if (loading) {
    return (
      <div style={{ padding: '20px', background: '#f0f0f0', margin: '20px' }}>
        <h2>🔄 Cargando datos desde Sanity...</h2>
      </div>
    );
  }
  
  if (error) {
    return (
      <div style={{ padding: '20px', background: '#fee', margin: '20px' }}>
        <h2>❌ Error cargando desde Sanity:</h2>
        <p>{error.message}</p>
        <p style={{ marginTop: '10px', color: '#666' }}>
          Usando datos estáticos como fallback...
        </p>
      </div>
    );
  }
  
  if (!config) {
    return (
      <div style={{ padding: '20px', background: '#fee', margin: '20px' }}>
        <h2>⚠️ No hay configuración disponible</h2>
      </div>
    );
  }
  
  return (
    <div style={{ padding: '20px', background: '#efe', margin: '20px', border: '2px solid green' }}>
      <h2>✅ Datos cargados desde Sanity!</h2>
      <div style={{ marginTop: '15px' }}>
        <h3>Hero:</h3>
        <p><strong>Título:</strong> {config.hero.title}</p>
        <p><strong>Subtítulo:</strong> {config.hero.subtitle}</p>
      </div>
      <div style={{ marginTop: '15px' }}>
        <h3>Servicios:</h3>
        <p>{config.services.length} servicios encontrados</p>
        <ul>
          {config.services.slice(0, 3).map(s => (
            <li key={s.title}>{s.title}</li>
          ))}
        </ul>
      </div>
      <div style={{ marginTop: '15px' }}>
        <h3>Clientes:</h3>
        <p>{config.clients.length} clientes encontrados</p>
      </div>
      <div style={{ marginTop: '15px' }}>
        <h3>Equipo:</h3>
        <p>{config.team?.staff.length || 0} miembros encontrados</p>
      </div>
    </div>
  );
};
```

Agrega temporalmente a `Home.tsx`:

```tsx
// src/pages/Home.tsx
import { TestSanityData } from '../components/TestSanityData';

export const Home: React.FC = () => {
  // ...
  return (
    <>
      <TestSanityData /> {/* Componente de prueba */}
      <Header />
      {/* ... resto */}
    </>
  );
};
```

#### Opción B: Verificar en la Consola del Navegador

1. Abre las **DevTools** (F12)
2. Ve a la pestaña **Console**
3. Deberías ver mensajes de carga de Sanity
4. Si hay errores, aparecerán aquí

#### Opción C: Verificar Network Tab

1. Abre las **DevTools** (F12)
2. Ve a la pestaña **Network**
3. Recarga la página
4. Busca requests a `api.sanity.io`
5. Verifica que las respuestas sean exitosas (200)

### 4.3 Verificar Secciones Específicas

Revisa que cada sección muestre los datos correctos:

- ✅ **Hero Section**: Título, subtítulo, CTAs
- ✅ **Stats Bar**: 4 estadísticas
- ✅ **About Section**: Textos y tabs
- ✅ **Services**: Lista de servicios
- ✅ **Clients**: Logos de clientes (si subiste imágenes)
- ✅ **Team**: Miembros del equipo (si subiste imágenes)
- ✅ **Footer**: Links y textos correctos

### 4.4 Probar Edición en Tiempo Real

1. Abre Sanity Studio
2. Edita el título del Hero
3. Haz clic en **"Publish"**
4. Recarga el frontend
5. Verifica que el cambio se refleje

---

## 🔍 Checklist de Verificación

### Sanity Studio:
- [ ] Todos los documentos están creados
- [ ] "Configuración del Sitio" está completa
- [ ] Todas las referencias están conectadas
- [ ] Documento "siteSettings" está publicado

### Frontend:
- [ ] El hook `useSanityConfig` carga sin errores
- [ ] Los datos se muestran correctamente
- [ ] Las imágenes se cargan (si las subiste)
- [ ] Los cambios en Sanity se reflejan en el frontend
- [ ] No hay errores en la consola

### Funcionalidad:
- [ ] Hero muestra el título correcto
- [ ] Servicios se listan correctamente
- [ ] Clientes se muestran (con o sin imágenes)
- [ ] Equipo se muestra (con o sin imágenes)
- [ ] Footer tiene los links correctos
- [ ] Navegación funciona

---

## 🐛 Solución de Problemas

### "No se cargan los datos"

1. Verifica que el documento "siteSettings" existe y está publicado
2. Revisa la consola del navegador para errores
3. Verifica las variables de entorno en `.env.local`
4. El sistema usa fallback automático a datos estáticos

### "Las imágenes no se muestran"

1. Verifica que subiste las imágenes en Sanity Studio
2. Asegúrate de que las imágenes están publicadas
3. Revisa que las rutas en la query GROQ sean correctas

### "Los cambios no se reflejan"

1. Asegúrate de hacer clic en **"Publish"** en Sanity Studio
2. Recarga la página del frontend
3. Verifica que no hay cache (Ctrl+Shift+R)

---

## ✅ Siguiente Paso

Una vez verificado todo:

1. **Remueve el componente de prueba** (`TestSanityData`)
2. **Actualiza componentes** para usar `useSanityConfig` si lo deseas
3. **O mantén el sistema actual** que usa datos estáticos con fallback a Sanity

¡Todo listo! 🎉

