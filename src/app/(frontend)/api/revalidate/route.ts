import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

import { globalTag, collectionListTag } from '@/lib/cache-tags'
import { ALL_GLOBALS, ALL_COLLECTIONS } from '@/hooks/revalidate'

export async function POST(request: Request) {
  try {
    const header = request.headers.get('authorization') ?? ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : ''

    if (!token || token !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    for (const slug of ALL_GLOBALS) revalidateTag(globalTag(slug), 'max')
    for (const slug of ALL_COLLECTIONS) revalidateTag(collectionListTag(slug), 'max')

    return NextResponse.json({ revalidated: true })
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
