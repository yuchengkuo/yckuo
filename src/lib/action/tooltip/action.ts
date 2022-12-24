import type { SvelteComponent } from 'svelte'
import TooltipCompnent from './Tooltip.svelte'

interface Options {
  content: string
  Component?: typeof TooltipCompnent
  offset?: number
  direction?: 'top' | 'bottom'
}

export default function tooltip(element: HTMLElement, options: Options): SvelteActionReturnType {
  element.style.position = 'relative'

  let { Component = TooltipCompnent, content, offset = 12, direction = 'top' } = options
  let Tooltip: SvelteComponent

  function handleShowTooltip() {
    if (!Tooltip) {
      Tooltip = new Component({
        target: document.body,
        props: { content, trigger: element, offset, direction },
      })
    }
  }

  function hadnleHideTooltip() {
    if (Tooltip) {
      Tooltip.$destroy()
      Tooltip = null
    }
  }

  element.addEventListener('mouseenter', handleShowTooltip)
  element.addEventListener('mouseleave', hadnleHideTooltip)

  return {
    update(newOptions: Options) {
      ;({ Component = TooltipCompnent, content, offset, direction } = newOptions)
      if (Tooltip) {
        Tooltip.$set({ content })
      }
    },
    destroy() {
      element.removeEventListener('mouseenter', handleShowTooltip)
      element.removeEventListener('mouseleave', hadnleHideTooltip)
    },
  }
}
