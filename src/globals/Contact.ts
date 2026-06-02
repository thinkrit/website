import { CtaFields } from '@/shared/fields/CtaFields'
import { PageFields } from '@/shared/fields/PageFields'
import { GlobalConfig } from 'payload'

export const Contact: GlobalConfig = {
  slug: 'contact',
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
      name: 'contactSection',
      type: 'group',
      fields: [
        {
          name: 'header',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'address',
          type: 'textarea',
          localized: true,
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'email',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'social',
          type: 'array',
          fields: CtaFields,
        },
      ],
    },
    {
      name: 'sendMessageSection',
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
          name: 'formLabels',
          type: 'group',
          fields: [
            {
              name: 'firstnameLabel',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'lastnameLabel',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'emailLabel',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'phoneLabel',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'messageLabel',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'submitLabel',
              type: 'text',
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
