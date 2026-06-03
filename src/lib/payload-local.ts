import config from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'

import {
  collectionDocTag,
  collectionListTag,
  globalTag,
  type CollectionSlug,
  type GlobalSlug,
} from './cache-tags'
import type { Locale } from './routing'

type UnknownRecord = Record<string, unknown>

export type LinkItem = {
  label: string
  url: string
  absolute?: boolean
}

export type LinkGroup = {
  label: string
  links: LinkItem[]
}

export type ServiceCard = {
  title: string
  description: string
  slug: string
  tone: 'red' | 'dark' | 'gray'
}

export type Feature = {
  title: string
  description: string
  icon?: string
}

export type Step = {
  title: string
  description: string
  image?: string
}

export type CaseStudy = {
  title: string
  description: string
}

export type Person = {
  name: string
  role: string
  department?: string
  image?: string
}

export async function getGlobalDoc(slug: GlobalSlug, locale: Locale): Promise<UnknownRecord | null> {
  'use cache'
  // Cache indefinitely (expire: never). Busted only when revalidateTag is
  // called for this tag from a Payload hook (see hooks/revalidate.ts).
  cacheLife('max')
  cacheTag(globalTag(slug))

  try {
    const payload = await getPayload({ config })
    const doc = await payload.findGlobal({
      slug,
      locale,
      depth: 2,
    })

    return doc as unknown as UnknownRecord
  } catch (error) {
    console.warn(`Unable to read Payload global "${slug}".`, error)
    return null
  }
}

export async function requireGlobalDoc(slug: GlobalSlug, locale: Locale): Promise<UnknownRecord> {
  const doc = await getGlobalDoc(slug, locale)
  if (!doc) throw new Error(`Missing Payload global "${slug}" for locale "${locale}".`)
  return doc
}

export async function getCollectionDoc(
  collection: CollectionSlug,
  slug: string,
  locale: Locale,
): Promise<UnknownRecord | null> {
  'use cache'
  cacheLife('max')
  // Bust on a change to this specific doc, or any bulk change to the collection.
  cacheTag(collectionDocTag(collection, slug), collectionListTag(collection))

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
    console.warn(`Unable to read Payload ${collection} document "${slug}".`, error)
    return null
  }
}

export async function requireCollectionDoc(
  collection: CollectionSlug,
  slug: string,
  locale: Locale,
): Promise<UnknownRecord> {
  const doc = await getCollectionDoc(collection, slug, locale)
  if (!doc) throw new Error(`Missing Payload ${collection} document "${slug}" for locale "${locale}".`)
  return doc
}

export async function getCollectionDocs(collection: CollectionSlug, locale: Locale): Promise<UnknownRecord[]> {
  'use cache'
  cacheLife('max')
  cacheTag(collectionListTag(collection))

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection,
      locale,
      depth: 2,
      limit: 100,
      sort: 'createdAt',
    })

    return result.docs as unknown as UnknownRecord[]
  } catch (error) {
    console.warn(`Unable to read Payload ${collection} documents.`, error)
    return []
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

export function requiredText(value: unknown, fieldName: string): string {
  const text = fieldText(value)
  if (!text) throw new Error(`Missing required Payload text field "${fieldName}".`)
  return text
}

export function fieldNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return null
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
