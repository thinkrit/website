import { GlobalConfig } from 'payload'

import { revalidateGlobal } from '@/hooks/revalidate'

export const Company: GlobalConfig = {
  slug: 'company',
  hooks: {
    afterChange: [revalidateGlobal('company')],
  },
  fields: [
    {
      name: 'heroSection',
      type: 'group',
      admin: {
        description: 'Primary hero content shown at the top of the company page.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Main title shown in the company page hero.',
          },
        },
        {
          name: 'description',
          type: 'richText',
          localized: true,
          required: true,
          admin: {
            description: 'Introductory body copy for the company page hero.',
          },
        },
        {
          name: 'background',
          type: 'upload',
          relationTo: 'media',
          required: false,
          admin: {
            description: 'Abstract background image displayed behind the company hero.',
          },
        },
      ],
    },
    {
      name: 'aboutSection',
      type: 'group',
      admin: {
        description: 'About section content shown on the company page.',
      },
      fields: [
        {
          name: 'header',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Headline for the company about section.',
          },
        },
        {
          name: 'tagline',
          type: 'richText',
          localized: true,
          required: true,
          admin: {
            description: 'Supporting copy for the company about section.',
          },
        },
        {
          name: 'description',
          type: 'richText',
          localized: true,
          required: true,
          admin: {
            description: 'Detailed body copy for the company about section.',
          },
        },
      ],
    },
    {
      name: 'foundersSection',
      type: 'group',
      admin: {
        description: 'Founder profiles and introductory content for the company page.',
      },
      fields: [
        {
          name: 'header',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Headline for the founders section.',
          },
        },
        {
          name: 'tagline',
          type: 'richText',
          localized: true,
          required: true,
          admin: {
            description: 'Supporting copy for the founders section.',
          },
        },
        {
          name: 'founders',
          type: 'array',
          admin: {
            description: 'Founder profiles displayed on the company page.',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              localized: true,
              required: true,
              admin: {
                description: 'Founder name shown on the profile card.',
              },
            },
            {
              name: 'role',
              type: 'text',
              localized: true,
              required: true,
              admin: {
                description: 'Founder role or title shown on the profile card.',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Founder portrait shown on the company page.',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'teamSection',
      type: 'group',
      admin: {
        description: 'Team member profiles and introductory content for the company page.',
      },
      fields: [
        {
          name: 'header',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Headline for the team section.',
          },
        },
        {
          name: 'tagline',
          type: 'richText',
          localized: true,
          required: true,
          admin: {
            description: 'Supporting copy for the team section.',
          },
        },
        {
          name: 'teamMembers',
          type: 'array',
          admin: {
            description: 'Team member profiles displayed on the company page.',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              localized: true,
              required: true,
              admin: {
                description: 'Team member name shown on the profile card.',
              },
            },
            {
              name: 'role',
              type: 'text',
              localized: true,
              required: true,
              admin: {
                description: 'Team member role or title shown on the profile card.',
              },
            },
            {
              name: 'department',
              type: 'text',
              localized: true,
              required: true,
              admin: {
                description: 'Department or practice area shown for this team member.',
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Team member portrait shown on the company page.',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'manifestoSection',
      type: 'group',
      admin: {
        description: 'Manifesto section content shown on the company page.',
      },
      fields: [
        {
          name: 'header',
          type: 'text',
          localized: true,
          required: true,
          admin: {
            description: 'Headline for the manifesto section.',
          },
        },
        {
          name: 'tagline',
          type: 'richText',
          localized: true,
          required: true,
          admin: {
            description: 'Supporting copy for the manifesto section.',
          },
        },
      ],
    },
  ],
}
