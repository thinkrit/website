import { Section_02_Block } from '@/blocks/sections/section_02.block'
import { Section_01_Block } from '@/blocks/sections/section_01.block'
import { GlobalConfig } from 'payload'
import { SeoField } from '@/shared/fields/seo.field'
import { Section_03_Block } from '@/blocks/sections/section_03.block'
import { Section_04_Block } from '@/blocks/sections/section_04.block'
import { Section_05_Block } from '@/blocks/sections/section_05.block'
import { Section_06_Block } from '@/blocks/sections/section_06.block'
import { Section_07_Block } from '@/blocks/sections/section_07.block'

export const Home: GlobalConfig = {
  slug: 'home',
  admin: {
    group: 'Globals',
  },
  fields: [
    {
      name: 'sections',
      type: 'blocks',
      label: 'Sections',
      required: true,
      blocks: [
        Section_01_Block,
        Section_02_Block,
        Section_03_Block,
        Section_04_Block,
        Section_05_Block,
        Section_06_Block,
        Section_07_Block,
      ],
      admin: {
        description: 'The sections of the home page, consisting of various blocks.',
      },
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      admin: {
        description: 'The slug of the home page.',
        position: 'sidebar',
      },
    },
    SeoField,
  ],
}
