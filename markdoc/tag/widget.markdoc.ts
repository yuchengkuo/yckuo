import type { Schema } from 'npm:@markdoc/markdoc'

export const widget: Schema = {
  render: 'Widget',
  attributes: { component: { type: String, required: true } },
}
