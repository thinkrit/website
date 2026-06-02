import { GlobalConfig } from 'payload'

import { revalidateGlobal } from '@/hooks/revalidate'

export const Company: GlobalConfig = {
  slug: 'company',
  hooks: {
    afterChange: [revalidateGlobal('company')],
  },
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
          name: 'description',
          type: 'richText',
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
      ],
    },
    {
      name: 'foundersSection',
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
          name: 'founders',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'role',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'teamSection',
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
          name: 'teamMembers',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'role',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'department',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'manifestoSection',
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
  ],
}
