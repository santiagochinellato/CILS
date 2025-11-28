import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'footerConfig',
  title: 'Configuración del Footer',
  type: 'object',
  fields: [
    defineField({
      name: 'about',
      title: 'Sección About',
      type: 'object',
      fields: [
        { name: 'text', type: 'text', title: 'Texto' },
        {
          name: 'socials',
          type: 'array',
          title: 'Redes Sociales',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', type: 'string', title: 'Etiqueta' },
                { name: 'href', type: 'string', title: 'URL' },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'services',
      title: 'Links de Servicios',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Etiqueta' },
            { name: 'href', type: 'string', title: 'URL' },
          ],
        },
      ],
    }),
    defineField({
      name: 'company',
      title: 'Links de Empresa',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Etiqueta' },
            { name: 'href', type: 'string', title: 'URL' },
          ],
        },
      ],
    }),
    defineField({
      name: 'newsletter',
      title: 'Newsletter (Opcional)',
      type: 'object',
      fields: [
        { name: 'headline', type: 'string', title: 'Título' },
        { name: 'legal', type: 'text', title: 'Texto Legal' },
      ],
    }),
    defineField({
      name: 'bottom',
      title: 'Texto Inferior',
      type: 'object',
      fields: [
        { name: 'left', type: 'string', title: 'Izquierda' },
        { name: 'center', type: 'string', title: 'Centro' },
        { name: 'right', type: 'string', title: 'Derecha' },
      ],
    }),
  ],
});

