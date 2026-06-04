import { Field } from 'payload'

export const CtaFields: Field[] = [
  {
    type: 'row',
    fields: [
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
        label: 'Is Absolute URL',
        required: false,
        admin: {
          width: 'auto',
          style: {
            marginTop: '2.5rem',
          },
        },
      },
    ],
  },
]
