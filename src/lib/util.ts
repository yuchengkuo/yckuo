export function formatDate(date: string | number | Date, options: Intl.DateTimeFormatOptions = {}) {
  if (!Object.keys(options).length) options.dateStyle = 'medium'
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Taipei',
    ...options
  }).format(new Date(date))
}

/**
 * Featured entries first, then the rest, each half keeping its incoming order. This is the
 * homepage's order, so anything that walks entries "in page order" (a next-project link)
 * must sort through this rather than by date.
 */
export function featuredFirst<T extends { data: { featured: boolean } }>(entries: T[]): T[] {
  return [...entries.filter((e) => e.data.featured), ...entries.filter((e) => !e.data.featured)]
}
