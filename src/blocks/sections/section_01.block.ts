import { Block } from 'payload'

export const Section_01_Block: Block = {
  slug: 'section_01',
  admin: {
    images: {
      thumbnail: '/blocks/section_01.svg',
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
      name: 'content',
      type: 'richText',
      label: 'Content',
      required: true,
      localized: true,
      admin: {
        description: 'The content text for the section block.',
      },
    },
    {
      name: 'action',
      type: 'group',
      label: 'Action',
      admin: {
        description: 'The action button for the section block.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Action Label',
          required: true,
          localized: true,
          admin: {
            description: 'The label for the action button.',
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'Action URL',
          required: true,
          admin: {
            description: 'The URL the action button will link to.',
          },
        },
      ],
    },
  ],
}
