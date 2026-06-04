import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from 'lexical'

import { Container, FooterCta, HeroFrame, SectionLabel } from '@/components/site/chrome'
import { richTextConverters } from '@/lib/rich-text-converters'
import { PixelBlastHeroBackground } from '@/components/site/PixelBlastHeroBackground'
import { fieldRecord, fieldText } from '@/lib/payload-local'
import { type Locale } from '@/lib/routing'

type SharedDoc = Record<string, unknown> | null

function formatDate(value: unknown, locale: Locale): string | null {
  if (typeof value !== 'string' && !(value instanceof Date)) return null
  const date = new Date(value as string)
  if (Number.isNaN(date.getTime())) return null
  return new Intl.DateTimeFormat(locale === 'el' ? 'el-GR' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function LegalPage({
  doc,
  locale,
  shared,
}: {
  doc: Record<string, unknown>
  locale: Locale
  shared: SharedDoc
}) {
  const title = fieldText(doc?.title)
  const lastUpdated = formatDate(doc?.lastUpdated, locale)
  const content = fieldRecord(doc?.content) as unknown as SerializedEditorState | null

  return (
    <>
      <HeroFrame background={<PixelBlastHeroBackground />} compact locale={locale} shared={shared}>
        <h1 className="text-balance text-3xl font-medium leading-tight text-zinc-950 sm:text-4xl md:text-6xl">
          {title}
        </h1>
        <div className="self-end border-l border-zinc-200 pl-8 md:max-w-md">
          <SectionLabel label="Legal" />
          {lastUpdated ? (
            <p className="mt-8 text-base leading-relaxed text-zinc-700">
              {locale === 'el' ? 'Τελευταία ενημέρωση' : 'Last updated'}: {lastUpdated}
            </p>
          ) : null}
        </div>
      </HeroFrame>

      <section className="py-24 lg:py-28">
        <Container>
          {content ? (
            <RichText
              className="max-w-3xl text-base leading-loose text-zinc-700 [&_a]:text-(--think-red) [&_a]:underline [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:leading-tight [&_h2]:text-zinc-950 [&_h2]:first:mt-0 [&_h3]:mt-10 [&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-zinc-950 [&_li]:mt-2 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mt-6 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6"
              converters={richTextConverters}
              data={content}
            />
          ) : null}
        </Container>
      </section>

      <FooterCta locale={locale} shared={shared} />
    </>
  )
}
