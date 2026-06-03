import type { CollectionConfig } from 'payload'

import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'

export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: {
    useAsTitle: 'name',
  },
  hooks: {
    afterChange: [revalidateCollection('partners')],
    afterDelete: [revalidateCollectionDelete('partners')],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Partner name shown across the site and in admin lists.',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Partner logo displayed in partner listings and page sections.',
      },
    },
    {
      name: 'website',
      type: 'text',
      required: true,
      admin: {
        description: 'Partner website URL used for outbound links.',
      },
    },
  ],
}
