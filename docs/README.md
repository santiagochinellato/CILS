# � Documentación del Proyecto CILS

Bienvenido a la documentación técnica del proyecto. Aquí encontrarás guías detalladas sobre configuración, desarrollo, deployment y funcionalidades específicas.

## � Inicio Rápido

- **[Instalación y Setup](./setup/INSTALLATION.md)**: Guía paso a paso para instalar dependencias y configurar el entorno (WSL/Windows).
- **[Variables de Entorno](./setup/ENVIRONMENT.md)**: Configuración de `.env` y `.env.local`.

## �️ CMS (Sanity.io)

- **[Implementación](./cms/SANITY_IMPLEMENTATION.md)**: Detalles técnicos de la arquitectura, schemas y configuración.
- **[Guía de Uso](./cms/USAGE_GUIDE.md)**: Cómo editar contenido en Sanity Studio.
- **[Subida de Imágenes](./cms/IMAGE_UPLOAD.md)**: Script para subir logos e imágenes masivamente.
- **[Migración de Datos](./cms/MIGRATION_GUIDE.md)**: Cómo poblar el CMS con datos iniciales.
- **[Actualizar Componentes](./cms/COMPONENT_UPDATE.md)**: Guía para desarrolladores sobre cómo conectar componentes React a Sanity.

## 🚀 Deployment

- **[Resumen General](./deployment/OVERVIEW.md)**: Estrategia general de despliegue.
- **[Backend (Render)](./deployment/BACKEND.md)**: Deploy del servidor Node.js en Render.com.
- **[Frontend (Ferozo FTP)](./deployment/FRONTEND.md)**: Deploy del sitio React en hosting compartido (Ferozo) vía FTP.

## 🌟 Funcionalidades

- **[Sistema de Novedades](./features/NEWS_SYSTEM.md)**: Arquitectura del agregador de noticias (NewsAPI + RSS) y lógica de filtrado.
- **[Guía SEO](./features/SEO_GUIDE.md)**: Implementación de meta tags y optimización para buscadores.

## ⚙️ Técnico

- **[Arquitectura Backend](./technical/BACKEND_ARCHITECTURE.md)**: Estructura del servidor, jobs y almacenamiento.
- **[Optimizaciones](./technical/OPTIMIZATIONS.md)**: Mejoras de rendimiento y accesibilidad implementadas.
