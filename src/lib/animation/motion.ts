import { createMotionState, createStyleString, type Options } from '@motionone/dom'

export function motion(element: Element, initialOptions: Options = {}) {
  const state = createMotionState(initialOptions)
  const initialStyle = createStyleString(state.getTarget())
  element.setAttribute('style', initialStyle)
  const destroy = state.mount(element)
  state.update(initialOptions)

  return {
    update: (newOptions: Options = {}) => {
      state.update(newOptions)
    },
    destroy,
  }
}
