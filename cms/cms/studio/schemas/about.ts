import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'about',
  title: 'Sección About',
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paragraphs',
      title: 'Párrafos',
      type: 'array',
      of: [{ type: 'text', rows: 3 }],
    }),
    defineField({
      name: 'features',
      title: 'Características',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'pillars',
      title: 'Pilares',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Los 4 pilares del estudio',
    }),
    defineField({
      name: 'tabs',
      title: 'Tabs (Misión, Visión, etc.)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Título' },
            { name: 'content', type: 'text', title: 'Contenido', rows: 5 },
          ],
        },
      ],
    }),
  ],
});

