import {
  createMotionState,
  createStyleString,
  type Options,
  type VariantDefinition,
} from '@motionone/dom'

export function motion(
  element: HTMLElement | SVGElement,
  initialOptions: Options & { exit?: VariantDefinition } = {}
): SvelteActionReturnType {
  const state = createMotionState(initialOptions)

  const initialStyle = createStyleString(state.getTarget())
  element.style.cssText += initialStyle

  const destroy = state.mount(element)
  state.update(initialOptions)

  return {
    update: (newOptions: Options & { exit?: VariantDefinition } = {}) => {
      state.update(newOptions)
    },
    destroy,
  }
}
