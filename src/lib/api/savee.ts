const BASE_URL = 'https://savee.it/api/graphql/'

export function getItems() {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `{
          userByUsername(username: "yuchengkuo") {
            items(limit: 20) {
              items {
                _id
                url
                name
                pageURL
                asset {
                  _id
                  image {
                    thumbnail
                    width
                    ratio
                  }
                }
              }
            }
          }
        }`,
    }),
  })
}
