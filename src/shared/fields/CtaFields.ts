import { Field } from 'payload'

export const CtaFields: Field[] = [
  {
    name: 'label',
    type: 'text',
    localized: true,
    required: true,
  },
  {
    name: 'url',
    type: 'text',
    required: true,
  },
  {
    name: 'absolute',
    type: 'checkbox',
    required: false,
  },
]
