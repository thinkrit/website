'use server'

import config from '@payload-config'
import { headers } from 'next/headers'
import { getPayload } from 'payload'

import { rateLimit } from '@/lib/rate-limit'

export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

// Field length caps to reject oversized payloads.
const MAX_LENGTHS = {
  firstname: 100,
  lastname: 100,
  email: 254,
  phone: 40,
  message: 5000,
} as const

// Rate limit: at most 5 submissions per IP per 10 minutes.
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 10 * 60 * 1000

// Reject submissions completed in under this many milliseconds: a real human
// cannot fill the form that fast, so it is almost certainly a bot.
const MIN_FILL_MS = 2000

function asString(value: FormDataEntryValue | null): string {
  return typeof value === 'string' ? value.trim() : ''
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function getClientIp(): Promise<string> {
  const headerList = await headers()
  const forwarded = headerList.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]!.trim()
  return headerList.get('x-real-ip')?.trim() || 'unknown'
}

export async function submitContactMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // 1. Honeypot: a hidden field real users never fill. Bots tend to fill every
  //    input. Silently succeed so the bot does not learn it was caught.
  if (asString(formData.get('company'))) {
    return { status: 'success' }
  }

  // 2. Timing check: forms submitted faster than a human could fill them.
  const renderedAt = Number(asString(formData.get('renderedAt')))
  if (Number.isFinite(renderedAt) && renderedAt > 0 && Date.now() - renderedAt < MIN_FILL_MS) {
    return { status: 'success' }
  }

  // 3. Rate limit per client IP.
  const ip = await getClientIp()
  const { success } = rateLimit(`contact:${ip}`, RATE_LIMIT, RATE_WINDOW_MS)
  if (!success) {
    return {
      status: 'error',
      message: 'Too many requests. Please wait a few minutes and try again.',
    }
  }

  const firstname = asString(formData.get('firstname'))
  const lastname = asString(formData.get('lastname'))
  const email = asString(formData.get('email'))
  const phone = asString(formData.get('phone'))
  const message = asString(formData.get('message'))

  // 4. Validation.
  if (!firstname || !lastname || !email || !message) {
    return { status: 'error', message: 'Please fill in all required fields.' }
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' }
  }

  if (
    firstname.length > MAX_LENGTHS.firstname ||
    lastname.length > MAX_LENGTHS.lastname ||
    email.length > MAX_LENGTHS.email ||
    phone.length > MAX_LENGTHS.phone ||
    message.length > MAX_LENGTHS.message
  ) {
    return { status: 'error', message: 'One or more fields are too long.' }
  }

  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'messages',
      data: { firstname, lastname, email, phone, message },
    })

    return { status: 'success' }
  } catch (error) {
    console.error('Failed to submit contact message:', error)
    return { status: 'error', message: 'Something went wrong. Please try again later.' }
  }
}
