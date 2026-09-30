/**
 * `fl_getinfo` turns a delivery URL into a JSON description of the asset, and needs no
 * authentication — which is why the ratio manifest can be generated at all: this repo's
 * API credentials are revoked.
 *
 * The video resource type answers `{}` to the plain URL — not an error, not a 404 — so a
 * video is asked via its first frame (`so_0`) instead.
 *
 * Only `input` is read. `output` is the transformed size: plausible integers that pass
 * every downstream check and reserve the wrong box. `getinfo-selftest.mjs` records its
 * accept fixtures from transformed deliveries, where the two disagree.
 */

const CLOUD_NAME = 'yucheng'

export function getInfoUrl(id, isVideo) {
  const base = `https://res.cloudinary.com/${CLOUD_NAME}`
  return isVideo
    ? `${base}/video/upload/fl_getinfo,so_0/${id}.png`
    : `${base}/image/upload/fl_getinfo/${id}`
}

/**
 * Takes the raw response body, since the failures arrive as bodies: `{}`, an empty string,
 * an HTML error page. Returns an unreduced CSS ratio, e.g. `'3840/3112'` — the asset's
 * real dimensions. Throws rather than guessing: an unrecorded id fails the build by name,
 * a wrong ratio ships.
 */
export function ratioFromGetInfo(body, label = 'fl_getinfo response') {
  let payload
  try {
    payload = JSON.parse(body)
  } catch {
    throw new Error(`${label}: not JSON — ${JSON.stringify(String(body).slice(0, 80))}`)
  }

  const input = payload && typeof payload === 'object' ? payload.input : undefined
  if (!input || typeof input !== 'object') {
    const hadOutput = payload && typeof payload === 'object' && payload.output
    throw new Error(
      `${label}: no \`input\` block` +
        (hadOutput
          ? ' — only `output`, which is the TRANSFORMED size, not the asset. Refusing rather than recording the wrong box.'
          : '. The video resource type answers `{}` to a plain URL; ask it via the first frame (`fl_getinfo,so_0`).')
    )
  }

  for (const name of ['width', 'height']) {
    const value = input[name]
    if (!Number.isInteger(value) || value <= 0)
      throw new Error(`${label}: input.${name} is ${JSON.stringify(value)}, not a positive integer`)
  }

  return `${input.width}/${input.height}`
}
