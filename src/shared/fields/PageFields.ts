import { Field } from 'payload'
import { SeoGroupField } from './SeoGroupField'

export const PageFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    localized: true,
    required: true,
    admin: {
      position: 'sidebar',
    },
  },
  {
    name: 'slug',
    type: 'text',
    required: true,
    admin: {
      position: 'sidebar',
    },
  },
  SeoGroupField,
]
