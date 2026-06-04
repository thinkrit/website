'use client'

import { useState } from 'react'
import { Button } from '@payloadcms/ui'
import { revalidateAllCache } from './action'

export function RevalidateButton() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleClick() {
    setStatus('loading')
    try {
      const result = await revalidateAllCache()
      setStatus(result.success ? 'success' : 'error')
      setTimeout(() => setStatus('idle'), 2000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 2000)
    }
  }

  const label =
    status === 'loading'
      ? 'Revalidating...'
      : status === 'success'
        ? 'Cache Cleared!'
        : status === 'error'
          ? 'Error - Try Again'
          : 'Revalidate Cache'

  return (
    <Button buttonStyle="subtle" size="small" onClick={handleClick} disabled={status === 'loading'}>
      {label}
    </Button>
  )
}
