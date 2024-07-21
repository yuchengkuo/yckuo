import { mountedStates, type Options } from '@motionone/dom'

const defaults = {
  delay: 0,
  duration: 0.3
}

export function intro(element: HTMLElement): SvelteTransitionReturnType {
  const state = mountedStates.get(element)

  if (!state) return { duration: 0 }

  state.setActive('exit', false)

  return {
    duration: 0
  }
}

export function outro(element: HTMLElement): SvelteTransitionReturnType {
  const state = mountedStates.get(element)

  if (!state) return { duration: 0 }

  state.setActive('exit', true)

  return {
    duration: calcDuration(state.getOptions())
  }
}

//@ts-expect-error exit is in Options
function calcDuration({ transition = {}, exit }: Options) {
  let maxDuration = 0

  if (!exit || typeof exit === 'string') return maxDuration

  if (!transition) return defaults.delay + defaults.duration * 1000

  for (const key in exit) {
    const { delay = defaults.delay, duration = defaults.duration } = transition[key]
      ? transition[key]
      : transition
    if (typeof delay === 'number') maxDuration = Math.max(maxDuration, delay + duration)
  }

  return maxDuration * 1000
}
