import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'team',
  title: 'Equipo',
  type: 'object',
  fields: [
    defineField({
      name: 'intro',
      title: 'Introducción',
      type: 'object',
      fields: [
        { name: 'heading', type: 'string', title: 'Título' },
        {
          name: 'text',
          title: 'Párrafos',
          type: 'array',
          of: [{ type: 'text', rows: 3 }],
        },
        {
          name: 'why',
          title: 'Razones (Why)',
          type: 'array',
          of: [{ type: 'text', rows: 2 }],
        },
      ],
    }),
    defineField({
      name: 'staff',
      title: 'Miembros del Equipo',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'teamMember' }] }],
    }),
  ],
});

