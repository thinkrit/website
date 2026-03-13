import { GlobalConfig } from 'payload'

export const Layout: GlobalConfig = {
  slug: 'layout',
  admin: {
    group: 'Globals',
  },
  fields: [
    {
      name: 'header',
      type: 'group',
      admin: {
        description: 'The header of the website, which is displayed on all pages.',
      },
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo',
          required: true,
          hasMany: false,
          admin: {
            description: 'The logo of the website. Recommended box: 250x250px.',
          },
        },
        {
          name: 'menu',
          type: 'array',
          label: 'Navigation Menu',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: true,
              localized: true,
              admin: {
                description: 'The label of the navigation item.',
              },
            },
            {
              name: 'type',
              type: 'radio',
              label: 'Type',
              required: true,
              options: [
                { label: 'Link', value: 'link' },
                { label: 'Submenu', value: 'submenu' },
              ],
            },
            {
              name: 'link',
              type: 'text',
              label: 'Link',
              required: false,
              admin: {
                description:
                  'The link of the navigation item. Can be an internal or external link.',
                condition: (data, siblingData) => siblingData?.type === 'link',
              },
            },
            {
              name: 'emphasized',
              type: 'checkbox',
              label: 'Emphasized',
              defaultValue: false,
              admin: {
                description: 'Whether the navigation item should be emphasized.',
                condition: (data, siblingData) => siblingData?.type === 'link',
              },
            },
            {
              name: 'submenu',
              type: 'array',
              label: 'Submenu',
              admin: {
                description: 'The submenu items. Only displayed if the type is "Submenu".',
                condition: (data, siblingData) => siblingData?.type === 'submenu',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Label',
                  required: true,
                  localized: true,
                  admin: {
                    description: 'The label of the submenu item.',
                  },
                },
                {
                  name: 'link',
                  type: 'text',
                  label: 'Link',
                  required: true,
                  admin: {
                    description:
                      'The link of the submenu item. Can be an internal or external link.',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      admin: {
        description: 'The footer of the website, which is displayed on all pages.',
      },
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo',
          required: true,
          hasMany: false,
          admin: {
            description: 'The logo of the website. Recommended box: 250x250px.',
          },
        },
        {
          name: 'copyrightsContent',
          type: 'text',
          label: 'Copyrights Content',
          required: true,
          localized: true,
          admin: {
            description: 'The copyright text for the footer.',
          },
        },
        {
          name: 'servicesLabel',
          type: 'text',
          label: 'Services Label',
          localized: true,
          required: true,
          admin: {
            description: 'The services label for the footer.',
          },
        },
        {
          name: 'productsLabel',
          type: 'text',
          label: 'Products Label',
          required: true,
          localized: true,
          admin: {
            description: 'The products label for the footer.',
          },
        },
        {
          name: 'contactSection',
          type: 'group',
          label: 'Contact Section',
          admin: {
            description: 'The contact section of the footer.',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: true,
              localized: true,
              admin: {
                description: 'The label of the contact section.',
              },
            },
            {
              name: 'header',
              type: 'textarea',
              label: 'Header',
              required: true,
              localized: true,
              admin: {
                description: 'The header of the contact section.',
              },
            },
            {
              name: 'actionLabel',
              type: 'text',
              label: 'Action Label',
              required: true,
              localized: true,
              admin: {
                description: 'The label of the action.',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'general',
      type: 'group',
      label: 'General Settings',
      admin: {
        description: 'General settings for the website.',
        position: 'sidebar',
      },
      fields: [
        {
          name: 'companyName',
          type: 'text',
          label: 'Company Name',
          required: true,
          localized: true,
          admin: {
            description: 'The name of the company, used in the SEO component.',
          },
        },
        {
          name: 'favicon',
          type: 'upload',
          relationTo: 'media',
          label: 'Favicon',
          required: true,
          hasMany: false,
          admin: {
            description: 'The favicon of the website. Recommended box: 32x32px.',
          },
        },
      ],
    },
  ],
}
