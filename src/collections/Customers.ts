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
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'website',
      type: 'text',
      required: true,
    },
  ],
}
