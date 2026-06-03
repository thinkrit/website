type ContactMapProps = {
  latitude: number
  longitude: number
  zoom?: number
  label?: string
  link?: string
}

export function ContactMap({ latitude, longitude, zoom = 16, label, link }: ContactMapProps) {
  const title = label || 'Office location map'
  const coords = `${latitude},${longitude}`
  // Keyless Google Maps embed: shows a marker at the given coordinates without
  // requiring an API key. `z` controls zoom, `output=embed` returns the iframe view.
  const embedSrc = `https://www.google.com/maps?q=${coords}&z=${zoom}&hl=en&output=embed`
  const externalHref = link || `https://www.google.com/maps/search/?api=1&query=${coords}`

  return (
    <div className="relative aspect-[1.18] overflow-hidden rounded-lg bg-zinc-100">
      <iframe
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0 grayscale brightness-100 contrast-110 transition-[filter] duration-300 hover:grayscale-0 hover:brightness-100 hover:contrast-100"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={embedSrc}
        title={title}
      />
      <a
        aria-label="View on Google Maps (opens in new tab)"
        className="absolute bottom-3 right-3 rounded-md bg-white/90 px-3 py-2 text-[11px] font-semibold uppercase leading-none text-zinc-900 shadow-sm backdrop-blur transition hover:bg-white"
        href={externalHref}
        rel="noreferrer"
        target="_blank"
      >
        View on Google Maps
      </a>
    </div>
  )
}
