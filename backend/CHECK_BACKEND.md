# Diagnóstico del Error HTTP 500 en Novedades

## Problema identificado

El error `Error al cargar novedades: Error: HTTP 500` ocurre cuando:

1. **El servidor backend NO está corriendo** en el puerto 4000
2. El frontend intenta hacer fetch a `/api/novedades` pero no hay nadie escuchando
3. Vite proxy redirige a `localhost:4000` pero falla

## Solución

### Paso 1: Verificar si el backend está corriendo

```bash
curl http://localhost:4000/api/novedades?limit=1
```

**Si devuelve "Connection refused"**: el backend NO está corriendo.

### Paso 2: Iniciar el servidor backend

En una terminal separada, ejecutar:

```bash
cd /home/santi/CILS
npm run backend:dev
```

Deberías ver:
```
Backend novedades escuchando en puerto 4000
```

### Paso 3: Verificar que funciona

```bash
curl http://localhost:4000/api/novedades?limit=1
```

Debería devolver JSON con noticias.

### Paso 4: Iniciar el frontend

En OTRA terminal (manteniendo el backend corriendo):

```bash
cd /home/santi/CILS
npm run dev
```

## Configuración de desarrollo

Para desarrollo local, necesitas **DOS terminales simultáneas**:

**Terminal 1 - Backend:**
```bash
npm run backend:dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## Scripts útiles

### Verificar estado del backend
```bash
curl http://localhost:4000/api/novedades/meta
```

### Ver logs del backend
El backend muestra logs en la terminal donde se ejecutó `npm run backend:dev`

### Refrescar noticias manualmente
```bash
curl -X POST http://localhost:4000/api/novedades/refresh
```

## Mejoras aplicadas

Agregué manejo de errores a todos los endpoints del backend para que devuelvan detalles específicos del error en lugar de crashes silenciosos.

Si el backend crashea, ahora verás el error específico en:
1. La consola del backend
2. La respuesta JSON del endpoint

## Producción

Para producción, considera usar PM2 o similar para mantener el backend corriendo:

```bash
npm install -g pm2
pm2 start npm --name "cils-backend" -- run backend:dev
pm2 save
```
