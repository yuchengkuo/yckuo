import {
  createMotionState,
  createStyleString,
  type MotionState,
  type Options,
  type VariantDefinition,
} from '@motionone/dom'
import { getContext, setContext } from 'svelte'
import { contextKey } from './context'

export function motion(
  element: Element,
  initialOptions: Options & { exit?: VariantDefinition } = {}
): SvelteActionReturnType {
  const parentState = getContext<MotionState | undefined>(contextKey)

  const state = createMotionState(initialOptions, parentState)

  const initialStyle = createStyleString(state.getTarget())
  element.setAttribute('style', initialStyle)

  setContext(contextKey, state)

  const destroy = state.mount(element)
  state.update(initialOptions)

  return {
    update: (newOptions: Options & { exit?: VariantDefinition } = {}) => {
      state.update(newOptions)
    },
    destroy,
  }
}
