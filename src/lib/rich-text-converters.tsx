import { defaultJSXConverters, type JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'

// Maps TextStateFeature color keys to their CSS values.
// Must stay in sync with the TextStateFeature config in payload.config.ts.
const textStateColors: Record<string, string> = {
  red: '#ed1c24',
}

export const richTextConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  text: (args) => {
    const state = (args.node as Record<string, unknown>)['$'] as
      | Record<string, string>
      | undefined
    const color = state?.color ? textStateColors[state.color] : undefined
    const base = (defaultConverters.text as (typeof defaultJSXConverters)['text'])!(args)

    if (color) {
      return <span style={{ color }}>{base}</span>
    }

    return base
  },
})
