import {
  createMotionState,
  createStyleString,
  type Options,
  type VariantDefinition,
} from '@motionone/dom'

export function motion(
  element: Element,
  initialOptions: Options & { exit?: VariantDefinition } = {}
): SvelteActionReturnType {
  const state = createMotionState(initialOptions)
  state.setActive('exit', false)
  const initialStyle = createStyleString(state.getTarget())
  element.setAttribute('style', initialStyle)
  const destroy = state.mount(element)
  state.update(initialOptions)

  return {
    update: (newOptions: Options & { exit?: VariantDefinition } = {}) => {
      state.update(newOptions)
    },
    destroy,
  }
}
