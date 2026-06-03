import { GlobalConfig } from 'payload'

import { revalidateGlobal } from '@/hooks/revalidate'

export const PrivacyPolicy: GlobalConfig = {
  slug: 'privacy-policy',
  hooks: {
    afterChange: [revalidateGlobal('privacy-policy')],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
      admin: {
        description: 'Page title shown at the top of the privacy policy page.',
      },
    },
    {
      name: 'lastUpdated',
      type: 'date',
      required: false,
      admin: {
        description: 'Date the privacy policy was last updated, shown to visitors.',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyyy',
        },
      },
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      required: true,
      admin: {
        description: 'Full body of the privacy policy.',
      },
    },
  ],
}
