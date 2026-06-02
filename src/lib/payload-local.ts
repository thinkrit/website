import config from '@payload-config'
import { getPayload } from 'payload'

import type { Locale } from './site-data'

type GlobalSlug = 'shared' | 'home' | 'company' | 'contact'
type CollectionSlug = 'services' | 'products'
type UnknownRecord = Record<string, unknown>

export async function getGlobalDoc(slug: GlobalSlug, locale: Locale): Promise<UnknownRecord | null> {
  try {
    const payload = await getPayload({ config })
    const doc = await payload.findGlobal({
      slug,
      locale,
      depth: 2,
    })

    return doc as unknown as UnknownRecord
  } catch (error) {
    console.warn(`Unable to read Payload global "${slug}". Falling back to local copy.`, error)
    return null
  }
}

export async function getCollectionDoc(
  collection: CollectionSlug,
  slug: string,
  locale: Locale,
): Promise<UnknownRecord | null> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection,
      locale,
      depth: 2,
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    return (result.docs[0] as unknown as UnknownRecord | undefined) ?? null
  } catch (error) {
    console.warn(`Unable to read Payload ${collection} document "${slug}". Falling back to local copy.`, error)
    return null
  }
}

export function fieldRecord(value: unknown): UnknownRecord | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  return value as UnknownRecord
}

export function fieldArray(value: unknown): UnknownRecord[] {
  if (!Array.isArray(value)) return []
  return value.filter((item): item is UnknownRecord => Boolean(fieldRecord(item)))
}

export function fieldText(value: unknown, fallback = ''): string {
  if (typeof value === 'string' && value.trim().length > 0) return value
  const richText = richTextToPlain(value)
  return richText || fallback
}

export function fieldLink(value: unknown): string | null {
  const record = fieldRecord(value)
  if (!record) return null
  if (typeof record.url === 'string') return record.url
  if (typeof record.link === 'string') return record.link
  return null
}

export function mediaUrl(value: unknown, fallback = '/placeholder-panel.svg'): string {
  const record = fieldRecord(value)
  if (!record) return fallback
  if (typeof record.url === 'string') return record.url
  if (typeof record.filename === 'string') return `/api/media/file/${record.filename}`
  return fallback
}

function richTextToPlain(value: unknown): string {
  const record = fieldRecord(value)
  if (!record) return ''
  const root = fieldRecord(record.root)
  if (!root) return ''
  return collectText(root)
    .replace(/\s+\n/g, '\n')
    .replace(/\n\s+/g, '\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim()
}

function collectText(node: UnknownRecord): string {
  let text = typeof node.text === 'string' ? node.text : ''
  const children = node.children
  if (Array.isArray(children)) {
    text += children
      .map((child) => (fieldRecord(child) ? collectText(child) : ''))
      .filter(Boolean)
      .join(node.type === 'paragraph' ? '' : '\n')
  }
  return text
}
