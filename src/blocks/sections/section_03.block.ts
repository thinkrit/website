import { Block } from 'payload'

export const Section_03_Block: Block = {
  slug: 'section_03',
  admin: {
    images: {
      thumbnail: '/blocks/section_03.svg',
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
        description: 'A short label for the section block, used for identification purposes.',
      },
    },
    {
      name: 'header',
      type: 'richText',
      label: 'Header',
      required: true,
      localized: true,
      admin: {
        description: 'The header text for the section block.',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Items',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
          localized: true,
          admin: {
            description: 'The item title.',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
          localized: true,
          admin: {
            description: 'The item description.',
          },
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon',
          required: true,
          admin: {
            description: 'The icon identifier for the item.',
          },
        },
        {
          name: 'actionUrl',
          type: 'text',
          label: 'Action URL',
          required: true,
          localized: true,
          admin: {
            description: 'The URL linked from the item action.',
          },
        },
      ],
    },
  ],
}
