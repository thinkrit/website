import { PageFields } from '@/shared/fields/PageFields'
import { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
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
      ],
    },
    {
      name: 'featuresSection',
      type: 'group',
      fields: [
        {
          name: 'header',
          type: 'text',
          localized: true,
          required: true,
        },
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
          ],
        },
      ],
    },
    {
      name: 'approachSection',
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
