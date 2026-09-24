/**
 * Writes the Greek (el) translations from ./translations.ts.
 *
 * Why a Local API script instead of the MCP tools: the MCP plugin strips `id`
 * from array rows, and Payload matches array rows by id when merging locales —
 * so an el update through MCP recreates every row and drops its en values.
 * Here each row keeps its id, so only the el values change.
 *
 * Usage:
 *   npx payload run scripts/i18n-el/translate-el.ts            # dry run (read-only)
 *   APPLY=1 npx payload run scripts/i18n-el/translate-el.ts    # write
 *
 * On --apply, every document is backed up (all locales) to
 * scripts/i18n-el/backup-<timestamp>/ first, and its en content is compared
 * before/after the write; any en difference is reported as an error.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import config from '@payload-config'
import { getPayload, type Payload } from 'payload'

import { globals, products, services } from './translations'

type Obj = Record<string, unknown>

// `payload run` does not forward CLI flags, so APPLY=1 is the reliable switch.
const APPLY = process.argv.includes('--apply') || process.env.APPLY === '1'
const dirname = path.dirname(fileURLToPath(import.meta.url))
const backupDir = path.join(dirname, `backup-${new Date().toISOString().replace(/[:.]/g, '-')}`)

const isObject = (value: unknown): value is Obj =>
  typeof value === 'object' && value !== null && !Array.isArray(value)
const isRichText = (value: unknown): boolean => isObject(value) && 'root' in value

/**
 * Merges an el patch into an el document. Arrays in the patch are keyed by row
 * id; an unknown id is an error rather than a silently added row.
 */
function applyPatch(target: unknown, patch: Obj, at: string): Obj {
  if (target !== undefined && target !== null && !isObject(target)) {
    throw new Error(`Expected an object at ${at}`)
  }
  const out: Obj = { ...(target ?? {}) }

  for (const [key, value] of Object.entries(patch)) {
    const fieldPath = `${at}.${key}`
    const current = out[key]

    if (Array.isArray(current) && isObject(value) && !isRichText(value)) {
      const ids = new Set(current.map((row: Obj) => row.id))
      for (const id of Object.keys(value)) {
        if (!ids.has(id)) throw new Error(`Row ${id} not found at ${fieldPath}`)
      }
      out[key] = current.map((row: Obj) =>
        isObject(value[row.id as string])
          ? applyPatch(row, value[row.id as string] as Obj, `${fieldPath}[${row.id}]`)
          : row,
      )
    } else if (isObject(value) && !isRichText(value)) {
      if (current === undefined || current === null) {
        throw new Error(`No existing value at ${fieldPath} (array rows must already exist)`)
      }
      out[key] = applyPatch(current, value, fieldPath)
    } else {
      out[key] = value
    }
  }
  return out
}

function plainText(value: unknown): string {
  if (typeof value === 'string') return value
  if (!isObject(value)) return value === undefined ? '∅' : JSON.stringify(value)
  const parts: string[] = []
  const walk = (node: unknown) => {
    if (!isObject(node)) return
    if (typeof node.text === 'string') parts.push(node.text)
    if (Array.isArray(node.children)) node.children.forEach(walk)
    if (isObject(node.root)) walk(node.root)
  }
  walk(value)
  return parts.join(' ')
}

const short = (value: unknown) => {
  const s = plainText(value).replace(/\s+/g, ' ')
  return s.length > 70 ? `${s.slice(0, 67)}...` : s
}

/** Lists `path: old → new` for every leaf in the patch. */
function describe(patch: Obj, current: unknown, at: string, lines: string[]) {
  for (const [key, value] of Object.entries(patch)) {
    const fieldPath = at ? `${at}.${key}` : key
    const existing = isObject(current) ? current[key] : undefined
    if (Array.isArray(existing) && isObject(value) && !isRichText(value)) {
      for (const [id, rowPatch] of Object.entries(value)) {
        const row = existing.find((r: Obj) => r.id === id)
        describe(rowPatch as Obj, row, `${fieldPath}[${id}]`, lines)
      }
    } else if (isObject(value) && !isRichText(value)) {
      describe(value, existing, fieldPath, lines)
    } else {
      const unchanged = JSON.stringify(existing) === JSON.stringify(value)
      lines.push(`  ${unchanged ? '=' : '~'} ${fieldPath}: ${short(existing)}  →  ${short(value)}`)
    }
  }
}

const withoutTimestamps = (doc: Obj) => {
  const { updatedAt: _updatedAt, ...rest } = doc
  return JSON.stringify(rest)
}

type Target = {
  label: string
  read: (locale: 'all' | 'el' | 'en', fallbackLocale: false | 'en') => Promise<Obj>
  write: (data: Obj) => Promise<unknown>
  patch: Obj
}

function targets(payload: Payload): Target[] {
  const context = { disableRevalidate: true }
  const list: Target[] = []

  for (const [slug, patch] of Object.entries(globals)) {
    list.push({
      label: `global:${slug}`,
      patch,
      read: (locale, fallbackLocale) =>
        payload.findGlobal({ slug: slug as never, locale, fallbackLocale, depth: 0 }) as Promise<Obj>,
      write: (data) =>
        payload.updateGlobal({ slug: slug as never, locale: 'el', data: data as never, depth: 0, context }),
    })
  }

  for (const [collection, docs] of [
    ['services', services],
    ['products', products],
  ] as const) {
    for (const [id, patch] of Object.entries(docs)) {
      list.push({
        label: `${collection}:${id}`,
        patch,
        read: (locale, fallbackLocale) =>
          payload.findByID({ collection, id, locale, fallbackLocale, depth: 0 }) as Promise<Obj>,
        write: (data) =>
          payload.update({ collection, id, locale: 'el', data: data as never, depth: 0, context }),
      })
    }
  }
  return list
}

async function run() {
  const payload = await getPayload({ config })
  console.log(APPLY ? 'Mode: APPLY (writing el values)\n' : 'Mode: DRY RUN (no writes; pass --apply to write)\n')
  if (APPLY) fs.mkdirSync(backupDir, { recursive: true })

  let failures = 0

  for (const target of targets(payload)) {
    try {
      const elStrict = await target.read('el', false)
      const elWithFallback = await target.read('el', 'en')

      const merged = applyPatch(elWithFallback, target.patch, target.label)
      const data = Object.fromEntries(Object.keys(target.patch).map((key) => [key, merged[key]]))

      const lines: string[] = []
      describe(target.patch, elStrict, '', lines)
      console.log(`${target.label} (${lines.filter((l) => l.includes('~')).length} changes)`)
      console.log(lines.join('\n'))

      if (!APPLY) continue

      const all = await target.read('all', false)
      fs.writeFileSync(
        path.join(backupDir, `${target.label.replace(':', '_')}.json`),
        JSON.stringify(all, null, 2),
      )

      const enBefore = withoutTimestamps(await target.read('en', false))
      await target.write(data)
      const enAfter = withoutTimestamps(await target.read('en', false))

      if (enBefore !== enAfter) {
        failures++
        console.error(`  ✗ en content CHANGED for ${target.label} — restore from ${backupDir}`)
      } else {
        console.log('  ✓ written; en unchanged')
      }
    } catch (error) {
      failures++
      console.error(`  ✗ ${target.label}: ${error instanceof Error ? error.message : String(error)}`)
    }
    console.log('')
  }

  if (APPLY) console.log(`Backups: ${backupDir}`)
  console.log(failures ? `Finished with ${failures} failure(s).` : 'Finished without errors.')
  process.exit(failures ? 1 : 0)
}

// Top-level await: `payload run` exits once the module finishes evaluating.
try {
  await run()
} catch (error) {
  console.error(error)
  process.exit(1)
}
