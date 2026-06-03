import type { CollectionConfig } from 'payload'

export const Messages: CollectionConfig = {
  slug: 'messages',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['firstname', 'lastname', 'email', 'createdAt'],
    group: 'Admin',
    description: 'Messages submitted through the contact page form.',
  },
  access: {
    // Anyone can submit a message from the public contact form.
    create: () => true,
    // Only authenticated admin users can read submissions.
    read: ({ req }) => Boolean(req.user),
    update: () => false,
  },
  fields: [
    {
      name: 'firstname',
      type: 'text',
      required: true,
    },
    {
      name: 'lastname',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
  ],
}
