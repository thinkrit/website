'use client'

import { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'

import { submitContactMessage, type ContactFormState } from './actions'

export type ContactFormLabels = {
  firstname: string
  lastname: string
  email: string
  phone: string
  message: string
  submit: string
  success: string
}

const initialState: ContactFormState = { status: 'idle' }

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()

  return (
    <button
      className="mt-12 rounded-lg bg-zinc-950 px-7 py-5 text-[13px] font-semibold uppercase leading-none !text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
      disabled={pending}
      type="submit"
    >
      {label}
    </button>
  )
}

export function ContactForm({ labels }: { labels: ContactFormLabels }) {
  const [state, formAction] = useActionState(submitContactMessage, initialState)

  // Captured once via a lazy initializer (runs a single time, keeps render
  // pure). Lets the server reject submissions completed implausibly fast
  // (bots). Not security-critical, just a signal.
  const [renderedAt] = useState(() => String(Date.now()))

  return (
    <form action={formAction} className="max-w-5xl">
      {/* Honeypot: hidden from users, bots tend to fill it. Off-screen rather
          than display:none so bots that skip hidden inputs still see it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden" tabIndex={-1}>
        <label>
          Company
          <input autoComplete="off" name="company" tabIndex={-1} />
        </label>
      </div>
      <input name="renderedAt" type="hidden" value={renderedAt} />

      <div className="grid gap-6 sm:grid-cols-2">
        <input aria-label={labels.firstname} name="firstname" placeholder={labels.firstname} required />
        <input aria-label={labels.lastname} name="lastname" placeholder={labels.lastname} required />
        <input aria-label={labels.email} name="email" placeholder={labels.email} required type="email" />
        <input aria-label={labels.phone} name="phone" placeholder={labels.phone} type="tel" />
        <textarea
          aria-label={labels.message}
          className="min-h-56 sm:col-span-2"
          name="message"
          placeholder={labels.message}
          required
        />
      </div>

      {state.status === 'error' && state.message ? (
        <p className="mt-6 text-sm font-medium text-[var(--think-red)]" role="alert">
          {state.message}
        </p>
      ) : null}
      {state.status === 'success' ? (
        <p className="mt-6 text-sm font-medium text-zinc-950" role="status">
          {labels.success}
        </p>
      ) : null}

      <SubmitButton label={labels.submit} />
    </form>
  )
}
