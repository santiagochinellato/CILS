import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'floatingActions',
  title: 'Acciones Flotantes',
  type: 'object',
  fields: [
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'object',
      fields: [
        { name: 'href', type: 'string', title: 'URL de WhatsApp' },
      ],
    }),
    defineField({
      name: 'scrollTop',
      title: 'Botón Scroll to Top',
      type: 'object',
      fields: [
        { name: 'enabled', type: 'boolean', title: 'Habilitado', initialValue: true },
      ],
    }),
  ],
});

