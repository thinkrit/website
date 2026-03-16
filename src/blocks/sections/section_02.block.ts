import { Block } from 'payload'

export const Section_02_Block: Block = {
  slug: 'section_02',
  admin: {
    images: {
      thumbnail: '/blocks/section_02.svg',
    },
  },
  fields: [
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
      name: 'discoverMoreLabel',
      type: 'text',
      label: 'Discover More Label',
      required: true,
      localized: true,
      admin: {
        description: 'The label for the discover more button.',
      },
    },
  ],
}
