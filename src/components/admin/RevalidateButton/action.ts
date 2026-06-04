'use server'

import { revalidateTag } from 'next/cache'
import { globalTag, collectionListTag } from '@/lib/cache-tags'
import { ALL_GLOBALS, ALL_COLLECTIONS } from '@/hooks/revalidate'

export async function revalidateAllCache(): Promise<{ success: boolean }> {
  try {
    for (const slug of ALL_GLOBALS) {
      revalidateTag(globalTag(slug), 'max')
    }
    for (const slug of ALL_COLLECTIONS) {
      revalidateTag(collectionListTag(slug), 'max')
    }
    return { success: true }
  } catch {
    return { success: false }
  }
}
