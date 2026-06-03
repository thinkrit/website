import { Field } from 'payload'

export const SeoGroupField: Field = {
  name: 'seo',
  type: 'group',
  admin: {
    description: 'Search metadata used by browsers, social previews, and search engines.',
    position: 'sidebar',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
      admin: {
        description: 'SEO title shown in browser tabs and search result previews.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      required: true,
      admin: {
        description: 'SEO summary shown in search result and social sharing previews.',
      },
    },
    {
      name: 'keywords',
      type: 'array',
      admin: {
        description: 'Optional keywords that describe the page topic.',
      },
      fields: [
        {
          name: 'keyword',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Single SEO keyword or phrase.',
          },
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Image used for social sharing previews when this page is shared.',
      },
    },
  ],
}
