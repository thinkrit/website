import { CtaFields } from '@/shared/fields/CtaFields'
import { PageFields } from '@/shared/fields/PageFields'
import { GlobalConfig } from 'payload'

import { revalidateGlobal } from '@/hooks/revalidate'

export const Contact: GlobalConfig = {
  slug: 'contact',
  hooks: {
    afterChange: [revalidateGlobal('contact')],
  },
  fields: [
    {
      name: 'heroSection',
      type: 'group',
      admin: {
        description: 'Primary hero content shown at the top of the contact page.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Main title shown in the contact page hero.',
          },
        },
        {
          name: 'description',
          type: 'richText',
          localized: true,
          required: true,
          admin: {
            description: 'Introductory body copy for the contact page hero.',
          },
        },
        {
          name: 'background',
          type: 'upload',
          relationTo: 'media',
          required: false,
          admin: {
            description: 'Abstract background image displayed behind the contact hero.',
          },
        },
      ],
    },
    {
      name: 'contactSection',
      type: 'group',
      admin: {
        description: 'Contact details and social links shown on the contact page.',
      },
      fields: [
        {
          name: 'header',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Headline for the contact details section.',
          },
        },
        {
          name: 'address',
          type: 'textarea',
          localized: true,
          required: true,
          admin: {
            description: 'Office or mailing address shown on the contact page.',
          },
        },
        {
          name: 'phone',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Phone number shown on the contact page.',
          },
        },
        {
          name: 'email',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Email address shown on the contact page.',
          },
        },
        {
          name: 'social',
          type: 'array',
          admin: {
            description: 'Social profile links shown with the contact details.',
          },
          fields: CtaFields,
        },
        {
          name: 'location',
          type: 'group',
          admin: {
            description: 'Map location shown beside the contact details.',
          },
          fields: [
            {
              name: 'latitude',
              type: 'number',
              required: true,
              admin: {
                description: 'Latitude of the map marker, e.g. 38.0660264.',
              },
            },
            {
              name: 'longitude',
              type: 'number',
              required: true,
              admin: {
                description: 'Longitude of the map marker, e.g. 23.760824.',
              },
            },
            {
              name: 'zoom',
              type: 'number',
              defaultValue: 16,
              min: 1,
              max: 21,
              admin: {
                description: 'Initial map zoom level (1 = world, 21 = building). Defaults to 16.',
              },
            },
            {
              name: 'label',
              type: 'text',
              localized: true,
              admin: {
                description: 'Accessible label / title for the map (e.g. "ThinkRIT office in Metamorfosi").',
              },
            },
            {
              name: 'link',
              type: 'text',
              admin: {
                description: 'Optional Google Maps URL opened when visitors click "View on Google Maps".',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'sendMessageSection',
      type: 'group',
      admin: {
        description: 'Introductory content and labels for the contact form.',
      },
      fields: [
        {
          name: 'header',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Headline shown above the contact form.',
          },
        },
        {
          name: 'tagline',
          type: 'richText',
          localized: true,
          required: true,
          admin: {
            description: 'Supporting copy shown above the contact form.',
          },
        },
        {
          name: 'formLabels',
          type: 'group',
          admin: {
            description: 'Editable labels used by the contact form inputs and submit button.',
          },
          fields: [
            {
              name: 'firstnameLabel',
              type: 'text',
              localized: true,
              required: true,
              admin: {
                description: 'Label for the first name input.',
              },
            },
            {
              name: 'lastnameLabel',
              type: 'text',
              localized: true,
              required: true,
              admin: {
                description: 'Label for the last name input.',
              },
            },
            {
              name: 'emailLabel',
              type: 'text',
              localized: true,
              required: true,
              admin: {
                description: 'Label for the email input.',
              },
            },
            {
              name: 'phoneLabel',
              type: 'text',
              localized: true,
              required: true,
              admin: {
                description: 'Label for the phone input.',
              },
            },
            {
              name: 'messageLabel',
              type: 'text',
              localized: true,
              required: true,
              admin: {
                description: 'Label for the message input.',
              },
            },
            {
              name: 'submitLabel',
              type: 'text',
              localized: true,
              required: true,
              admin: {
                description: 'Text shown on the contact form submit button.',
              },
            },
          ],
        },
      ],
    },
    ...PageFields,
  ],
}
