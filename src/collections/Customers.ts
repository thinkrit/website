import type { CollectionConfig } from 'payload'

import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'

export const Customers: CollectionConfig = {
  slug: 'customers',
  admin: {
    useAsTitle: 'name',
  },
  hooks: {
    afterChange: [revalidateCollection('customers')],
    afterDelete: [revalidateCollectionDelete('customers')],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Customer name shown across the site and in admin lists.',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Customer logo displayed in customer listings and page sections.',
      },
    },
    {
      name: 'website',
      type: 'text',
      required: true,
      admin: {
        description: 'Customer website URL used for outbound links.',
      },
    },
  ],
}
