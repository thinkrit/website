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
