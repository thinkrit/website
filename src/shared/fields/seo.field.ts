import { Field } from 'payload'

export const SeoField: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO',
  admin: {
    description: 'Search Engine Optimization (SEO) settings for the page.',
    position: 'sidebar',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'SEO Title',
      required: true,
      localized: true,
      admin: {
        description: 'The SEO title for the page, used in search engine results and browser tabs.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'SEO Description',
      required: true,
      localized: true,
      admin: {
        description: 'The SEO description for the page, used in search engine results.',
      },
    },
    {
      name: 'metaImage',
      type: 'upload',
      label: 'SEO Meta Image',
      relationTo: 'media',
      required: true,
      admin: {
        description:
          'The image used for SEO purposes, such as when sharing the page on social media.',
      },
    },
  ],
}
