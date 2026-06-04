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
      admin: {
        description: 'Primary site logo used in shared navigation and branding.',
      },
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Browser favicon used for the site.',
      },
    },
    {
      name: 'siteTitle',
      type: 'text',
      required: true,
      admin: {
        description: 'Default site title used for branding and metadata.',
      },
    },
    {
      name: 'header',
      type: 'group',
      admin: {
        description: 'Shared header navigation shown across the site.',
      },
      fields: [
        {
          name: 'links',
          type: 'array',
          admin: {
            description: 'Top-level navigation links shown in the site header.',
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  localized: true,
                  required: true,
                  admin: {
                    description: 'Navigation label shown in the header.',
                  },
                },
                {
                  name: 'link',
                  type: 'text',
                  required: false,
                  admin: {
                    description: 'Destination path or URL for this header link.',
                  },
                },
                {
                  name: 'primary',
                  type: 'checkbox',
                  label: 'Is Primary Action',
                  required: false,
                  admin: {
                    width: 'auto',
                    style: {
                      marginTop: '2.5rem',
                    },
                  },
                },
              ],
            },

            {
              name: 'subLinks',
              type: 'array',
              required: false,
              admin: {
                description: 'Dropdown or nested navigation links under this header item.',
              },
              fields: CtaFields,
            },
          ],
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      admin: {
        description: 'Shared footer content shown across the site.',
      },
      fields: [
        {
          name: 'top',
          type: 'group',
          admin: {
            description: 'Top footer reach-out section with headline, tagline, and CTA.',
          },
          fields: [
            {
              name: 'header',
              type: 'text',
              localized: true,
              required: true,
              admin: {
                description: 'Headline shown in the top footer section.',
              },
            },
            {
              name: 'tagline',
              type: 'textarea',
              localized: true,
              required: true,
              admin: {
                description: 'Supporting tagline shown in the top footer section.',
              },
            },
            {
              name: 'cta',
              type: 'group',
              admin: {
                description: 'Call to action shown in the top footer section.',
              },
              fields: CtaFields,
            },
            {
              name: 'background',
              type: 'upload',
              relationTo: 'media',
              required: false,
              admin: {
                description:
                  'Abstract background image displayed behind the footer reach-out section.',
              },
            },
          ],
        },
        {
          name: 'middle',
          type: 'group',
          admin: {
            description: 'Middle footer section with logo and grouped navigation links.',
          },
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Logo displayed in the middle footer section.',
              },
            },
            {
              name: 'linkGroups',
              type: 'array',
              admin: {
                description: 'Grouped footer navigation columns.',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  localized: true,
                  required: true,
                  admin: {
                    description: 'Heading shown above this footer link group.',
                  },
                },
                {
                  name: 'links',
                  type: 'array',
                  admin: {
                    description: 'Links displayed inside this footer group.',
                  },
                  fields: CtaFields,
                },
              ],
            },
          ],
        },
        {
          name: 'bottom',
          type: 'group',
          admin: {
            description: 'Bottom footer bar with copyright text and legal links.',
          },
          fields: [
            {
              name: 'copyright',
              type: 'text',
              localized: true,
              required: true,
              admin: {
                description: 'Copyright text shown in the bottom footer bar.',
              },
            },
            {
              name: 'links',
              type: 'array',
              admin: {
                description: 'Legal or utility links shown in the bottom footer bar.',
              },
              fields: CtaFields,
            },
          ],
        },
      ],
    },
  ],
}
