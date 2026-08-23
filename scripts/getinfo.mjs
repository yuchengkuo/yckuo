/**
 * getinfo.mjs — asking Cloudinary for an asset's true dimensions, and reading the answer.
 *
 * `fl_getinfo` is a DELIVERY flag: it turns an ordinary delivery URL into a JSON
 * description of the asset instead of the bytes. It needs **no authentication**, which is
 * the whole reason the ratio manifest can be generated at all — this repo's API
 * credentials were revoked and stay revoked.
 *
 * TWO URL SHAPES ARE REQUIRED, and the second one is not discoverable from the first.
 * The image resource type answers directly. The video resource type answers `{}` to the
 * plain URL — EMPTY, NOT AN ERROR, and not a 404 either — so it has to be asked via its
 * first frame (`so_0`, delivered as a still) instead. A generator that trusts the plain
 * video URL records nothing and reports no failure.
 *
 * ONLY `input` DIMENSIONS ARE READ. `fl_getinfo` also returns `output`, which is the
 * result of whatever transformation the URL carried. Reading `output` yields plausible
 * integers that pass every downstream check — the build gate cannot tell a valid ratio
 * from a correct one — while reserving the wrong box for every transformed asset. That
 * single substitution is why `getinfo-selftest.mjs` exists, and why its accept fixtures
 * are recorded from TRANSFORMED deliveries where the two blocks disagree.
 *
 * The parser takes the raw response BODY rather than a parsed object, because the failure
 * modes above arrive as bodies: `{}`, an empty string, an HTML error page.
 */

const CLOUD_NAME = 'yucheng'

/**
 * The delivery URL that answers with `id`'s dimensions.
 *
 * `isVideo` picks the resource type AND the first-frame shape together — they are one
 * decision, not two, because the video resource type is exactly the case the plain URL
 * cannot answer.
 */
export function getInfoUrl(id, isVideo) {
  const base = `https://res.cloudinary.com/${CLOUD_NAME}`
  return isVideo
    ? `${base}/video/upload/fl_getinfo,so_0/${id}.png`
    : `${base}/image/upload/fl_getinfo/${id}`
}

/**
 * The CSS ratio string for one recorded `fl_getinfo` body, e.g. `'3840/3112'`.
 *
 * Not reduced: the manifest records the dimensions the asset actually has, and a reduced
 * pair no longer says which asset it came from.
 *
 * THROWS rather than returning a fallback. A refusal is recoverable — the id is simply
 * absent from the manifest and the build says so by name. A guessed ratio is not: it
 * reserves the wrong box, still shifts the page, and looks deliberate.
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
    /* Naming the output block matters: this is the branch a parser reading `output`
       would have sailed through, and the message is the only place that says so. */
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
