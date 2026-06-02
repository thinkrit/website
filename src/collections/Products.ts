import { PageFields } from '@/shared/fields/PageFields'
import { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  fields: [
    {
      name: 'heroSection',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'header',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          localized: true,
          required: true,
        },
        {
          name: 'service',
          type: 'relationship',
          relationTo: 'services',
          required: true,
          hasMany: false,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
      ],
    },
    {
      name: 'featuresSection',
      type: 'group',
      fields: [
        {
          name: 'features',
          type: 'array',
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'description',
              type: 'richText',
              localized: true,
              required: true,
            },
            {
              name: 'icon',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'howItWorksSection',
      type: 'group',
      fields: [
        {
          name: 'header',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'tagline',
          type: 'richText',
          localized: true,
          required: true,
        },
        {
          name: 'steps',
          type: 'array',
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'description',
              type: 'richText',
              localized: true,
              required: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: false,
            },
          ],
        },
      ],
    },
    {
      name: 'technologiesSection',
      type: 'group',
      fields: [
        {
          name: 'header',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'tagline',
          type: 'richText',
          localized: true,
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          localized: true,
          required: true,
        },
        {
          name: 'technologies',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'description',
              type: 'richText',
              localized: true,
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'focusSection',
      type: 'group',
      fields: [
        {
          name: 'header',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'tagline',
          type: 'richText',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'implementationsSection',
      type: 'group',
      fields: [
        {
          name: 'header',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'tagline',
          type: 'richText',
          localized: true,
          required: true,
        },
        {
          name: 'caseStudies',
          type: 'array',
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'description',
              type: 'richText',
              localized: true,
              required: true,
            },
          ],
        },
      ],
    },
    ...PageFields,
  ],
}
