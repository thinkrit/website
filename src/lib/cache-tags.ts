// Cache tag helpers shared between the Next.js data layer (lib/payload-local.ts)
// and the Payload revalidation hooks (hooks/revalidate.ts).
//
// Pages are cached indefinitely (no time-based revalidation). They are only
// rebuilt when a Payload create/update/delete invalidates the matching tag.

export type GlobalSlug = 'shared' | 'home' | 'company' | 'contact' | 'privacy-policy' | 'terms-of-use'
export type CollectionSlug = 'services' | 'products' | 'partners' | 'customers' | 'media'

/** Tag for a single global, e.g. `global:home`. */
export function globalTag(slug: GlobalSlug): string {
  return `global:${slug}`
}

/** Tag for a collection's list reads, e.g. `collection:services`. */
export function collectionListTag(slug: CollectionSlug): string {
  return `collection:${slug}`
}

/** Tag for a single document read by slug, e.g. `doc:products:my-product`. */
export function collectionDocTag(slug: CollectionSlug, docSlug: string): string {
  return `doc:${slug}:${docSlug}`
}
