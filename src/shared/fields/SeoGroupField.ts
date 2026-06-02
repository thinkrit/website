import { Field } from 'payload'

export const SeoGroupField: Field = {
  name: 'seo',
  type: 'group',
  admin: {
    position: 'sidebar',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      required: true,
    },
    {
      name: 'keywords',
      type: 'array',
      fields: [
        {
          name: 'keyword',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
}
