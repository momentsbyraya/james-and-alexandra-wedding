/** Live site URL — set in couple.json or VITE_SITE_URL; Netlify sets URL at build time. */
export const siteUrl = import.meta.env.VITE_SITE_URL || ''

export function absoluteUrl(path) {
  if (!path) return ''
  if (path.startsWith('http')) return path

  const base =
    siteUrl || (typeof window !== 'undefined' ? window.location.origin : '')

  if (!base) return path
  return `${base.replace(/\/$/, '')}${path}`
}
