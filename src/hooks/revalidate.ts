import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'
import { revalidateTag } from 'next/cache'

import {
  collectionDocTag,
  collectionListTag,
  globalTag,
  type CollectionSlug,
  type GlobalSlug,
} from '@/lib/cache-tags'

// Pages built from Payload content are cached indefinitely by the Next.js data
// layer (see lib/payload-local.ts). These hooks are what actually invalidate
// that cache: on every create/update/delete we revalidate the matching tags so
// the affected pages rebuild on their next request.
//
// Set `context.disableRevalidate` on an operation to skip revalidation (useful
// for bulk imports/seeding where you revalidate once at the end).

// Invalidate a cache tag. The 'max' profile matches cacheLife('max') used by
// the cached reads in lib/payload-local.ts (Next.js 16 requires the profile arg).
function bust(tag: string): void {
  revalidateTag(tag, 'max')
}

/** afterChange hook for a global. Invalidates `global:<slug>`. */
export function revalidateGlobal(slug: GlobalSlug): GlobalAfterChangeHook {
  return ({ doc, req: { payload, context } }) => {
    if (!context.disableRevalidate) {
      payload.logger.info(`Revalidating tag ${globalTag(slug)}`)
      bust(globalTag(slug))
    }
    return doc
  }
}

/**
 * afterChange hook for a collection. Invalidates the collection list tag (any
 * page that lists this collection) and the per-document tag for both the new
 * slug and, if it changed, the previous slug.
 */
export function revalidateCollection(slug: CollectionSlug): CollectionAfterChangeHook {
  return ({ doc, previousDoc, req: { payload, context } }) => {
    if (!context.disableRevalidate) {
      payload.logger.info(`Revalidating tag ${collectionListTag(slug)}`)
      bust(collectionListTag(slug))

      const docSlug = typeof doc?.slug === 'string' ? doc.slug : undefined
      if (docSlug) bust(collectionDocTag(slug, docSlug))

      const prevSlug = typeof previousDoc?.slug === 'string' ? previousDoc.slug : undefined
      if (prevSlug && prevSlug !== docSlug) bust(collectionDocTag(slug, prevSlug))
    }
    return doc
  }
}

// Media is embedded into globals and collection lists via populated
// relationships (depth: 2), so a media change can affect any page. These tags
// cover every cached read in lib/payload-local.ts.
const ALL_GLOBALS: GlobalSlug[] = ['shared', 'home', 'company', 'contact', 'privacy-policy', 'terms-of-use']
const ALL_COLLECTIONS: CollectionSlug[] = ['services', 'products', 'partners', 'customers']

function revalidateEverything(payload: { logger: { info: (msg: string) => void } }): void {
  payload.logger.info('Revalidating all content tags (media change)')
  for (const slug of ALL_GLOBALS) bust(globalTag(slug))
  for (const slug of ALL_COLLECTIONS) bust(collectionListTag(slug))
}

/** afterChange hook that invalidates every content tag (used by Media). */
export const revalidateAllAfterChange: CollectionAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) revalidateEverything(payload)
  return doc
}

/** afterDelete hook that invalidates every content tag (used by Media). */
export const revalidateAllAfterDelete: CollectionAfterDeleteHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) revalidateEverything(payload)
  return doc
}

/** afterDelete hook for a collection. Invalidates list + the deleted doc's tag. */
export function revalidateCollectionDelete(slug: CollectionSlug): CollectionAfterDeleteHook {
  return ({ doc, req: { payload, context } }) => {
    if (!context.disableRevalidate) {
      payload.logger.info(`Revalidating tag ${collectionListTag(slug)} (delete)`)
      bust(collectionListTag(slug))

      const docSlug = typeof doc?.slug === 'string' ? doc.slug : undefined
      if (docSlug) bust(collectionDocTag(slug, docSlug))
    }
    return doc
  }
}
