import type { Schema } from '@markdoc/markdoc'

export const widget: Schema = {
  render: 'Widget',
  attributes: { component: { type: String, required: true } },
}
