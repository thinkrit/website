import { Field } from 'payload'

export const CtaFields: Field[] = [
  {
    name: 'label',
    type: 'text',
    localized: true,
    required: true,
    admin: {
      description: 'Text shown for this call-to-action link.',
    },
  },
  {
    name: 'url',
    type: 'text',
    required: true,
    admin: {
      description: 'Destination path or URL for this call to action.',
    },
  },
  {
    name: 'absolute',
    type: 'checkbox',
    required: false,
    admin: {
      description: 'Enable when the destination is a full external URL.',
    },
  },
]
