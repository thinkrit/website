import { PageFields } from '@/shared/fields/PageFields'
import { CollectionConfig } from 'payload'

import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    afterChange: [revalidateCollection('products')],
    afterDelete: [revalidateCollectionDelete('products')],
  },
  fields: [
    {
      name: 'heroSection',
      type: 'group',
      admin: {
        description: 'Primary hero content shown at the top of the product detail page.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Short product title used in the hero and admin title field.',
          },
        },
        {
          name: 'header',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Main headline for the product hero section.',
          },
        },
        {
          name: 'description',
          type: 'richText',
          localized: true,
          required: true,
          admin: {
            description: 'Introductory body copy for the product hero section.',
          },
        },
        {
          name: 'service',
          type: 'relationship',
          relationTo: 'services',
          required: true,
          hasMany: false,
          admin: {
            description: 'Service category this product belongs to.',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
          admin: {
            description: 'Primary product image displayed in the hero section.',
          },
        },
        {
          name: 'background',
          type: 'upload',
          relationTo: 'media',
          required: false,
          admin: {
            description: 'Abstract background image displayed behind this product hero.',
          },
        },
      ],
    },
    {
      name: 'featuresSection',
      type: 'group',
      admin: {
        description: 'Feature section that highlights key product capabilities.',
      },
      fields: [
        {
          name: 'features',
          type: 'array',
          admin: {
            description: 'List of product features shown in this section.',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
              required: true,
              admin: {
                description: 'Feature title shown in the product feature list.',
              },
            },
            {
              name: 'description',
              type: 'richText',
              localized: true,
              required: true,
              admin: {
                description: 'Description explaining this product feature.',
              },
            },
            {
              name: 'icon',
              type: 'text',
              required: true,
              admin: {
                description: 'Icon identifier used when rendering this feature.',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'howItWorksSection',
      type: 'group',
      admin: {
        description: 'Section explaining how the product works.',
      },
      fields: [
        {
          name: 'header',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Headline for the how-it-works section.',
          },
        },
        {
          name: 'tagline',
          type: 'richText',
          localized: true,
          required: true,
          admin: {
            description: 'Supporting copy for the how-it-works section.',
          },
        },
        {
          name: 'steps',
          type: 'array',
          admin: {
            description: 'Ordered steps that explain the product workflow.',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
              required: true,
              admin: {
                description: 'Step title shown in the product workflow.',
              },
            },
            {
              name: 'description',
              type: 'richText',
              localized: true,
              required: true,
              admin: {
                description: 'Description explaining this product workflow step.',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: false,
              admin: {
                description: 'Optional image displayed with this workflow step.',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'technologiesSection',
      type: 'group',
      admin: {
        description: 'Section describing technologies associated with this product.',
      },
      fields: [
        {
          name: 'header',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Headline for the technologies section.',
          },
        },
        {
          name: 'tagline',
          type: 'richText',
          localized: true,
          required: true,
          admin: {
            description: 'Supporting copy for the technologies section.',
          },
        },
        {
          name: 'description',
          type: 'richText',
          localized: true,
          required: true,
          admin: {
            description: 'Detailed introduction for the technologies section.',
          },
        },
        {
          name: 'technologies',
          type: 'array',
          admin: {
            description: 'Technology entries displayed for this product.',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              localized: true,
              required: true,
              admin: {
                description: 'Technology name shown in the technologies list.',
              },
            },
            {
              name: 'description',
              type: 'richText',
              localized: true,
              required: true,
              admin: {
                description: 'Description explaining this technology entry.',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'focusSection',
      type: 'group',
      admin: {
        description: 'Section describing the areas of focus for this product.',
      },
      fields: [
        {
          name: 'header',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Headline for the product focus section.',
          },
        },
        {
          name: 'tagline',
          type: 'richText',
          localized: true,
          required: true,
          admin: {
            description: 'Supporting copy for the product focus section.',
          },
        },
      ],
    },
    {
      name: 'implementationsSection',
      type: 'group',
      admin: {
        description: 'Implementation examples and case study content for this product.',
      },
      fields: [
        {
          name: 'header',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Headline for the product implementations section.',
          },
        },
        {
          name: 'tagline',
          type: 'richText',
          localized: true,
          required: true,
          admin: {
            description: 'Supporting copy for the product implementations section.',
          },
        },
        {
          name: 'caseStudies',
          type: 'array',
          admin: {
            description: 'Case study entries displayed in the implementations section.',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
              required: true,
              admin: {
                description: 'Case study title shown in the implementations section.',
              },
            },
            {
              name: 'description',
              type: 'richText',
              localized: true,
              required: true,
              admin: {
                description: 'Case study summary shown in the implementations section.',
              },
            },
          ],
        },
      ],
    },
    ...PageFields,
  ],
}
