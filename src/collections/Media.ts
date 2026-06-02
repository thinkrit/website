import type { CollectionConfig } from 'payload'

import { revalidateAllAfterChange, revalidateAllAfterDelete } from '@/hooks/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    group: 'Admin',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateAllAfterChange],
    afterDelete: [revalidateAllAfterDelete],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      localized: true,
      required: true,
    },
  ],
  upload: true,
}
