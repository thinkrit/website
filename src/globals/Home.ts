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
      fields: [
        {
          name: 'header',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'tagline',
          type: 'textarea',
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
          name: 'discoverModeLabel',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'aboutSection',
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
          name: 'cta',
          type: 'group',
          fields: CtaFields,
        },
      ],
    },
    {
      name: 'servicesSection',
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
        // {
        //   name: 'services',
        //   type: 'relationship',
        //   relationTo: 'services',
        //   hasMany: true,
        // },
      ],
    },
    {
      name: 'productsSection',
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
        // {
        //   name: 'products',
        //   type: 'relationship',
        //   relationTo: 'products',
        //   hasMany: true,
        // },
      ],
    },
    {
      name: 'partnersSection',
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
          name: 'partners',
          type: 'relationship',
          relationTo: 'partners',
          hasMany: true,
        },
      ],
    },
    {
      name: 'customersSection',
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
          name: 'customers',
          type: 'relationship',
          relationTo: 'customers',
          hasMany: true,
        },
      ],
    },
    ...PageFields,
  ],
}
