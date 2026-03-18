import { Block } from 'payload'

export const Section_04_Block: Block = {
  slug: 'section_04',
  admin: {
    images: {
      thumbnail: '/blocks/section_04.svg',
    },
  },
  fields: [
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
  ],
}
