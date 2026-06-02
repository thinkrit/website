import { CtaFields } from '@/shared/fields/CtaFields'
import { GlobalConfig } from 'payload'

import { revalidateGlobal } from '@/hooks/revalidate'

export const Shared: GlobalConfig = {
  slug: 'shared',
  hooks: {
    afterChange: [revalidateGlobal('shared')],
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'siteTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'header',
      type: 'group',
      fields: [
        {
          name: 'links',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'primary',
              type: 'checkbox',
              required: false,
            },
            {
              name: 'link',
              type: 'text',
              required: false,
            },
            {
              name: 'subLinks',
              type: 'array',
              required: false,
              fields: CtaFields,
            },
          ],
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      fields: [
        {
          name: 'top',
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
              name: 'cta',
              type: 'group',
              fields: CtaFields,
            },
          ],
        },
        {
          name: 'middle',
          type: 'group',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'linkGroups',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  localized: true,
                  required: true,
                },
                {
                  name: 'links',
                  type: 'array',
                  fields: CtaFields,
                },
              ],
            },
          ],
        },
        {
          name: 'bottom',
          type: 'group',
          fields: [
            {
              name: 'copyright',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'links',
              type: 'array',
              fields: CtaFields,
            },
          ],
        },
      ],
    },
  ],
}
