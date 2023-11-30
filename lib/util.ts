export function formatDate(date: string | number | Date, options: Intl.DateTimeFormatOptions = {}) {
  if (!Object.keys(options).length) options.dateStyle = 'long'
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Taipei',
    ...options,
  }).format(new Date(date))
}
