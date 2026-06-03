import { GlobalConfig } from 'payload'

import { revalidateGlobal } from '@/hooks/revalidate'

export const TermsOfUse: GlobalConfig = {
  slug: 'terms-of-use',
  hooks: {
    afterChange: [revalidateGlobal('terms-of-use')],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
      admin: {
        description: 'Page title shown at the top of the terms of use page.',
      },
    },
    {
      name: 'lastUpdated',
      type: 'date',
      required: false,
      admin: {
        description: 'Date the terms of use were last updated, shown to visitors.',
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
        description: 'Full body of the terms of use.',
      },
    },
  ],
}
