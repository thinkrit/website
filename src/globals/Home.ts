import { CtaFields } from '@/shared/fields/CtaFields'
import { PageFields } from '@/shared/fields/PageFields'
import { GlobalConfig } from 'payload'

import { revalidateGlobal } from '@/hooks/revalidate'

export const Home: GlobalConfig = {
  slug: 'home',
  hooks: {
    afterChange: [revalidateGlobal('home')],
  },
  fields: [
    {
      name: 'heroSection',
      type: 'group',
      admin: {
        description: 'Primary hero content shown at the top of the home page.',
      },
      fields: [
        {
          name: 'header',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Main headline shown in the home page hero.',
          },
        },
        {
          name: 'tagline',
          type: 'textarea',
          localized: true,
          required: true,
          admin: {
            description: 'Short supporting tagline shown in the home page hero.',
          },
        },
        {
          name: 'description',
          type: 'richText',
          localized: true,
          required: true,
          admin: {
            description: 'Introductory body copy for the home page hero.',
          },
        },
        {
          name: 'discoverModeLabel',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Label shown for the discover mode control in the hero.',
          },
        },
      ],
    },
    {
      name: 'aboutSection',
      type: 'group',
      admin: {
        description: 'Introductory about section shown on the home page.',
      },
      fields: [
        {
          name: 'header',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Headline for the home page about section.',
          },
        },
        {
          name: 'tagline',
          type: 'richText',
          localized: true,
          required: true,
          admin: {
            description: 'Supporting copy for the home page about section.',
          },
        },
        {
          name: 'description',
          type: 'richText',
          localized: true,
          required: true,
          admin: {
            description: 'Detailed body copy for the home page about section.',
          },
        },
        {
          name: 'cta',
          type: 'group',
          admin: {
            description: 'Call to action shown in the home page about section.',
          },
          fields: CtaFields,
        },
      ],
    },
    {
      name: 'servicesSection',
      type: 'group',
      admin: {
        description: 'Section introducing services on the home page.',
      },
      fields: [
        {
          name: 'header',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Headline for the home page services section.',
          },
        },
        {
          name: 'tagline',
          type: 'richText',
          localized: true,
          required: true,
          admin: {
            description: 'Supporting copy for the home page services section.',
          },
        },
        {
          name: 'services',
          type: 'relationship',
          relationTo: 'services',
          hasMany: true,
          admin: {
            description: 'Select and order the services to display in this section.',
          },
        },
      ],
    },
    {
      name: 'productsSection',
      type: 'group',
      admin: {
        description: 'Section introducing products on the home page.',
      },
      fields: [
        {
          name: 'header',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Headline for the home page products section.',
          },
        },
        {
          name: 'tagline',
          type: 'richText',
          localized: true,
          required: true,
          admin: {
            description: 'Supporting copy for the home page products section.',
          },
        },
        {
          name: 'products',
          type: 'relationship',
          relationTo: 'products',
          hasMany: true,
          admin: {
            description: 'Select and order the products to display in this section.',
          },
        },
      ],
    },
    {
      name: 'partnersSection',
      type: 'group',
      admin: {
        description: 'Section introducing featured partners on the home page.',
      },
      fields: [
        {
          name: 'header',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Headline for the home page partners section.',
          },
        },
        {
          name: 'tagline',
          type: 'richText',
          localized: true,
          required: true,
          admin: {
            description: 'Supporting copy for the home page partners section.',
          },
        },
        {
          name: 'description',
          type: 'richText',
          localized: true,
          required: true,
          admin: {
            description: 'Detailed body copy for the home page partners section.',
          },
        },
        {
          name: 'partners',
          type: 'relationship',
          relationTo: 'partners',
          hasMany: true,
          admin: {
            description: 'Partners selected for display in this home page section.',
          },
        },
      ],
    },
    {
      name: 'customersSection',
      type: 'group',
      admin: {
        description: 'Section introducing featured customers on the home page.',
      },
      fields: [
        {
          name: 'header',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Headline for the home page customers section.',
          },
        },
        {
          name: 'tagline',
          type: 'richText',
          localized: true,
          required: true,
          admin: {
            description: 'Supporting copy for the home page customers section.',
          },
        },
        {
          name: 'description',
          type: 'richText',
          localized: true,
          required: true,
          admin: {
            description: 'Detailed body copy for the home page customers section.',
          },
        },
        {
          name: 'customers',
          type: 'relationship',
          relationTo: 'customers',
          hasMany: true,
          admin: {
            description: 'Customers selected for display in this home page section.',
          },
        },
      ],
    },
    ...PageFields,
  ],
}
