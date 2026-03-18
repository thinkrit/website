import { Block } from 'payload'

export const Section_07_Block: Block = {
  slug: 'section_07',
  admin: {
    images: {
      thumbnail: '/blocks/section_07.svg',
    },
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      label: 'Label',
      required: true,
      localized: true,
      admin: {
        description: 'The label for the section block.',
      },
    },
    {
      name: 'header',
      type: 'richText',
      label: 'Header',
      required: true,
      localized: true,
      admin: {
        description: 'The header for the section block.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      required: true,
      localized: true,
      admin: {
        description: 'The content for the section block.',
      },
    },
    {
      name: 'partners',
      type: 'relationship',
      label: 'Partners',
      relationTo: 'partners',
      hasMany: true,
    },
  ],
}
