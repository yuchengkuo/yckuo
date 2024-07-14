export function getFullUrl(url: URL, query: URLSearchParams) {
  for (const [key, value] of query.entries()) {
    url.searchParams.append(key, value)
  }
  return url.toString()
}
