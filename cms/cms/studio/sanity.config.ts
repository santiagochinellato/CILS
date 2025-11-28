import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'cils-cms',
  title: 'Estudio CILS CMS',
  projectId: '81u4pzxo',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    deskTool(),
    visionTool(), // Para probar queries GROQ
  ],
  schema: {
    types: schemaTypes,
  },
});

