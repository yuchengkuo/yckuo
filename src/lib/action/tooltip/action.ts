import type { SvelteComponent } from 'svelte'
import TooltipCompnent from './Tooltip.svelte'

interface Options {
  content: string
  Component?: typeof TooltipCompnent
  offset?: number
  placement?: 'top' | 'bottom' | 'left' | 'right'
  alignment?: 'start' | 'end' | 'center'
}

export default function tooltip(element: HTMLElement, options: Options): SvelteActionReturnType {
  let {
    Component = TooltipCompnent,
    content,
    offset = 12,
    placement = 'top',
    alignment = 'center'
  } = options
  let Tooltip: SvelteComponent

  function handleShowTooltip() {
    if (!Tooltip) {
      Tooltip = new Component({
        target: document.body,
        props: { content, trigger: element, offset, placement, alignment }
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
  element.addEventListener('focus', handleShowTooltip)

  element.addEventListener('mouseleave', hadnleHideTooltip)
  element.addEventListener('blur', hadnleHideTooltip)

  return {
    update(newOptions: Options) {
      ;({ Component = TooltipCompnent, content, offset, placement, alignment } = newOptions)
      if (Tooltip) {
        Tooltip.$set({ content })
      }
    },
    destroy() {
      element.removeEventListener('mouseenter', handleShowTooltip)
      element.removeEventListener('focus', handleShowTooltip)
      element.removeEventListener('mouseleave', hadnleHideTooltip)
      element.removeEventListener('blur', hadnleHideTooltip)

      if (Tooltip) {
        Tooltip.$destroy()
        Tooltip = null
      }
    }
  }
}
