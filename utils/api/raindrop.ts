const access_token = process.env.RAINDROP_ACCESS_TOKEN

const RAINDROPS_ENDPOINT = `https://api.raindrop.io/rest/v1/raindrops/`

export async function getBookmarks(collection: string) {
  return fetch(`${RAINDROPS_ENDPOINT}${collection}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}
