export function formatDate(date: string | number | Date, options: Intl.DateTimeFormatOptions = {}) {
  if (!Object.keys(options).length) options.dateStyle = 'medium'
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Taipei',
    ...options
  }).format(new Date(date))
}

/**
 * Featured entries first (each half keeping its incoming order), then the rest. This is
 * the browsing order the homepage renders works and projects in — two stacked blocks, not
 * one date-merged list — so anything that walks entries in "page order" (e.g. a
 * next-project link) must sort through this, not the raw collection order, or the two
 * will disagree the moment a featured and a non-featured entry interleave by date.
 */
export function featuredFirst<T extends { data: { featured: boolean } }>(entries: T[]): T[] {
  return [...entries.filter((e) => e.data.featured), ...entries.filter((e) => !e.data.featured)]
}
