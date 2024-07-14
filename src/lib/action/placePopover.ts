const DEFAULT_PLACEMENT = 'bottom'
const DEFAULT_ALIGNMENT = 'center'
const DEFAULT_OFFSET = 8

/**
 * Place Popover action options
 * @param trigger(HTMLElement) - Trigger element
 * @param placement('top' | 'bottom' | 'left' | 'right') - Popover placement, default 'bottom'
 * @param alignment('start'|'end'|'center') - Popover alignment, default 'center'
 * @param offset(number) - Popover offset, default 8
 */
type TriggerOptions = {
  trigger: HTMLElement
  placement?: 'top' | 'bottom' | 'left' | 'right'
  alignment?: 'start' | 'end' | 'center'
  offset?: number
}

type PositionOptions = {
  left: number
  top: number
  offset?: number
}

type Options = TriggerOptions | PositionOptions

export default function placePopover(
  element: HTMLElement,
  options: Options
): SvelteActionReturnType {
  updatePosition(element, options)

  return {
    update(newOptions: Options) {
      updatePosition(element, newOptions)
    },
  }
}

function updatePosition(element: HTMLElement, options: Options) {
  let left = 0
  let top = 0
  let outputLeft = 0
  let outputTop = 0

  const container = element
  container.style.setProperty('position', 'absolute')
  const containerRect = container.getBoundingClientRect()
  const maxLeft = window.innerWidth - containerRect.width - 2
  const maxTop = window.innerHeight - containerRect.height - 2

  if (isPosition(options)) {
    const { left, top, offset = DEFAULT_OFFSET } = options

    outputLeft = left + offset
    outputTop = top + offset
  } else {
    const {
      trigger,
      placement = DEFAULT_PLACEMENT,
      alignment = DEFAULT_ALIGNMENT,
      offset = DEFAULT_OFFSET,
    } = options

    if (trigger) {
      const triggerRect = trigger.getBoundingClientRect()

      const alignEnd = alignment === 'end'
      const alignStart = alignment === 'start'

      const placeLeft = placement === 'left'
      const placeTop = placement === 'top'

      const placeX = placement === 'left' || placement === 'right'
      const placeY = placement === 'top' || placement === 'bottom'

      if (placeX) {
        if (placeLeft) outputLeft = triggerRect.left - offset - containerRect.width
        else outputLeft = triggerRect.left + triggerRect.width + offset
      } else {
        if (alignStart) outputLeft = triggerRect.left
        else if (alignEnd) outputLeft = triggerRect.left - (containerRect.width - triggerRect.width)
        else outputLeft = triggerRect.left + triggerRect.width / 2 - containerRect.width / 2
      }

      if (placeY) {
        if (placeTop) outputTop = triggerRect.top - offset - containerRect.height
        else outputTop = triggerRect.top + triggerRect.height + offset
      } else {
        if (alignStart) outputTop = triggerRect.top
        else if (alignEnd) outputTop = triggerRect.top - (containerRect.height - triggerRect.height)
        else outputTop = triggerRect.top + triggerRect.height / 2 - containerRect.height / 2
      }
    }
  }

  left = Math.min(Math.max(2, outputLeft), maxLeft) + window.scrollX
  top = Math.min(Math.max(2, outputTop), maxTop) + window.scrollY
  container.style.cssText += `left: ${left}px; top: ${top}px;`
}

function isPosition(options: Options): options is PositionOptions {
  return !('trigger' in options)
}
