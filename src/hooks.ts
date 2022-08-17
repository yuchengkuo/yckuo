import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async function ({ event, resolve }) {
  const response = await resolve(event)

  response.headers.set(
    'content-security-policy',
    `default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src * blob: data: media-src 'none'; connect-src *; font-src 'self'`
  )
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=()')

  return response
}
