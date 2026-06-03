import { Field } from 'payload'
import { SeoGroupField } from './SeoGroupField'

export const PageFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    localized: true,
    required: true,
    admin: {
      description: 'Internal page title used in the admin and page metadata.',
      position: 'sidebar',
    },
  },
  {
    name: 'slug',
    type: 'text',
    required: true,
    admin: {
      description: 'URL slug for this page, without a leading slash.',
      position: 'sidebar',
    },
  },
  SeoGroupField,
]
