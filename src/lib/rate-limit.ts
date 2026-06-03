// Lightweight in-memory fixed-window rate limiter.
//
// NOTE: state lives in the process memory, so limits are per server instance
// and reset on cold start. This is a reasonable first line of defense for a
// low-traffic contact form, but for strict, cross-instance guarantees back it
// with a shared store (Upstash / Vercel KV / Redis).

type Bucket = {
  count: number
  resetAt: number
}

const buckets = new Map<string, Bucket>()

// Opportunistically drop expired buckets so the map does not grow unbounded.
function sweep(now: number) {
  if (buckets.size < 5000) return
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key)
  }
}

export type RateLimitResult = {
  success: boolean
  remaining: number
  resetAt: number
}

/**
 * Allow at most `limit` requests per `windowMs` for a given `key`.
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now()
  sweep(now)

  const existing = buckets.get(key)

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs
    buckets.set(key, { count: 1, resetAt })
    return { success: true, remaining: limit - 1, resetAt }
  }

  if (existing.count >= limit) {
    return { success: false, remaining: 0, resetAt: existing.resetAt }
  }

  existing.count += 1
  return { success: true, remaining: limit - existing.count, resetAt: existing.resetAt }
}
