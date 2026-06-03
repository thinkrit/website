import { PageFields } from '@/shared/fields/PageFields'
import { CollectionConfig } from 'payload'

import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    afterChange: [revalidateCollection('services')],
    afterDelete: [revalidateCollectionDelete('services')],
  },
  fields: [
    {
      name: 'heroSection',
      type: 'group',
      admin: {
        description: 'Primary hero content shown at the top of the service detail page.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Short service title used in the hero and admin title field.',
          },
        },
        {
          name: 'header',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Main headline for the service hero section.',
          },
        },
        {
          name: 'description',
          type: 'richText',
          localized: true,
          required: true,
          admin: {
            description: 'Introductory body copy for the service hero section.',
          },
        },
        {
          name: 'background',
          type: 'upload',
          relationTo: 'media',
          required: false,
          admin: {
            description: 'Abstract background image displayed behind this service hero.',
          },
        },
      ],
    },
    {
      name: 'featuresSection',
      type: 'group',
      admin: {
        description: 'Feature section that highlights what this service provides.',
      },
      fields: [
        {
          name: 'header',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Headline for the service features section.',
          },
        },
        {
          name: 'features',
          type: 'array',
          admin: {
            description: 'List of service features shown in this section.',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
              required: true,
              admin: {
                description: 'Feature title shown in the feature list.',
              },
            },
            {
              name: 'description',
              type: 'richText',
              localized: true,
              required: true,
              admin: {
                description: 'Description explaining this service feature.',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'approachSection',
      type: 'group',
      admin: {
        description: 'Section describing the delivery approach for this service.',
      },
      fields: [
        {
          name: 'header',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Headline for the service approach section.',
          },
        },
        {
          name: 'tagline',
          type: 'richText',
          localized: true,
          required: true,
          admin: {
            description: 'Supporting copy for the service approach section.',
          },
        },
        {
          name: 'steps',
          type: 'array',
          admin: {
            description: 'Ordered approach steps shown for this service.',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
              required: true,
              admin: {
                description: 'Step title shown in the approach sequence.',
              },
            },
            {
              name: 'description',
              type: 'richText',
              localized: true,
              required: true,
              admin: {
                description: 'Description explaining this approach step.',
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
        description: 'Section describing the areas of focus for this service.',
      },
      fields: [
        {
          name: 'header',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Headline for the service focus section.',
          },
        },
        {
          name: 'tagline',
          type: 'richText',
          localized: true,
          required: true,
          admin: {
            description: 'Supporting copy for the service focus section.',
          },
        },
      ],
    },
    {
      name: 'implementationsSection',
      type: 'group',
      admin: {
        description: 'Implementation examples and case study content for this service.',
      },
      fields: [
        {
          name: 'header',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Headline for the service implementations section.',
          },
        },
        {
          name: 'tagline',
          type: 'richText',
          localized: true,
          required: true,
          admin: {
            description: 'Supporting copy for the service implementations section.',
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
