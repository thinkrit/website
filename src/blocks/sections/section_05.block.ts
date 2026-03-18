import { Block } from 'payload'

export const Section_05_Block: Block = {
  slug: 'section_05',
  admin: {
    images: {
      thumbnail: '/blocks/section_05.svg',
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
      name: 'items',
      type: 'array',
      label: 'Items',
      required: true,
      fields: [
        {
          name: 'header',
          type: 'text',
          label: 'Header',
          required: true,
          localized: true,
          admin: {
            description: 'The header for the item.',
          },
        },
        {
          name: 'content',
          type: 'richText',
          label: 'Content',
          required: true,
          localized: true,
          admin: {
            description: 'The content for the item.',
          },
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link',
          required: true,
          admin: {
            description: 'The link for the item.',
          },
        },
      ],
    },
  ],
}
