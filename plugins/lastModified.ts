import { Site } from 'lume/core.ts'

/**
 * Plugin to add lastModified property do page data.
 */
export default function () {
  return function (site: Site) {
    site.preprocess('*', (page) => {
      const {
        src: { lastModified },
      } = page

      page.data['lastModified'] = lastModified
    })
  }
}
