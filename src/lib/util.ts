export function formatDate(date: string | number | Date, options: Intl.DateTimeFormatOptions = {}) {
  if (!options) options.dateStyle = 'medium'
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Taipei',
    ...options,
  }).format(new Date(date))
}
