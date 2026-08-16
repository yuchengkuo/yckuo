/* scramble.svelte.ts */
/* Rewrite for Svelte from https://github.com/tol-is/use-scramble */
import type { Action } from 'svelte/action'

/**
 * Types
 */
type RangeOrCharCodes = {
  0: number
  1: number
} & Array<number>

export type ScrambleOptions = {
  /**
   * Text to scramble
   */
  text: string
  /**
   * 0-1 range that determines the scramble speed. A speed of 1 will redraw 60 times a second. A speed of 0 will pause the animation
   * @default 1
   */
  speed?: number
  /**
   * The controller will move forward along the text input and scramble more characters, at a pace of `tick` frames
   * @default 1
   */
  tick?: number
  /**
   * Step forward on every tick
   * @default 1
   */
  step?: number
  /**
   * Chance of scrambling a character, range from 0 to 1, 0 being no chance, and 1 being 100% chance
   * @default 1
   */
  chance?: number
  /**
   * Randomize `seed` characters at random text positions
   * @default 1
   */
  seed?: number
  /**
   * How many times to scramble each character
   * @default 1
   */
  scramble?: number
  /**
   * Characters to avoid scrambling
   * @default [' ']
   */
  ignore?: string[]
  /**
   * Unicode character range for scrambler
   * @default [65, 125]
   */
  range?: RangeOrCharCodes
  /**
   * Set the animation to overdrive mode, and set the unicode character code to use in the animation
   * @default false
   */
  overdrive?: boolean | number
  /**
   * Always start text animation from an empty string
   * @default true
   */
  overflow?: boolean
  /**
   * Auto-play the animation when mounted
   * @default true
   */
  autoplay?: boolean
}

// Custom events for the scramble action
export type ScrambleEvents = {
  scramblestart: CustomEvent<void>
  scrambleend: CustomEvent<void>
  scrambleframe: CustomEvent<{ text: string }>
}

/**
 * Utility functions
 */
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomChar(range: RangeOrCharCodes): string {
  let rand = 0
  if (range.length === 2) {
    rand = getRandomInt(range[0], range[1])
  } else {
    rand = range[getRandomInt(0, range.length - 1)]
  }

  return String.fromCharCode(rand)
}

/**
 * Scramble action implementation
 */
export const scramble: Action<HTMLElement, ScrambleOptions, ScrambleEvents> = (
  node,
  options = { text: '' }
) => {
  // Default options
  const config = {
    speed: 1,
    tick: 1,
    step: 1,
    chance: 1,
    seed: 1,
    scramble: 1,
    ignore: [' '],
    range: [65, 125] as RangeOrCharCodes,
    overdrive: false,
    overflow: true,
    autoplay: true,
    ...options
  }

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  // Animation state
  let rafId: number | null = null
  let elapsedTime = 0
  let stepCount = 0
  let scrambleIndex = 0
  let overdriveIndex = 0
  let control: Array<string | number | null> = []
  let resultText = ''
  let currentText = config.text
  let isPlaying = false

  // Adjusted values for reduced motion preference
  const effectiveStep = prefersReducedMotion ? currentText.length : config.step
  const effectiveChance = prefersReducedMotion ? 0 : config.chance
  const effectiveOverdrive = prefersReducedMotion ? false : config.overdrive

  // Utility functions for the animation
  const setIfNotIgnored = (value: string | number | null, replace: string | number | null) =>
    config.ignore.includes(`${value}`) ? value : replace

  // Animation logic
  function seedForward() {
    if (scrambleIndex === currentText.length) return

    for (let i = 0; i < config.seed; i++) {
      const index = getRandomInt(scrambleIndex, control.length)
      if (typeof control[index] !== 'number' && typeof control[index] !== 'undefined') {
        control[index] = setIfNotIgnored(
          control[index],
          getRandomInt(0, 10) >= (1 - effectiveChance) * 10 ? config.scramble || config.seed : 0
        )
      }
    }
  }

  function stepForward() {
    for (let i = 0; i < effectiveStep; i++) {
      if (scrambleIndex < currentText.length) {
        const currentIdx = scrambleIndex
        const shouldScramble = getRandomInt(0, 10) >= (1 - effectiveChance) * 10

        control[currentIdx] = setIfNotIgnored(
          currentText[scrambleIndex],
          shouldScramble ? config.scramble + getRandomInt(0, Math.ceil(config.scramble / 2)) : 0
        )
        scrambleIndex++
      }
    }
  }

  function resizeControl() {
    if (currentText.length < control.length) {
      control = control.slice(0, currentText.length)
    }
    for (let i = 0; i < effectiveStep; i++) {
      if (control.length < currentText.length) {
        control.push(setIfNotIgnored(currentText[control.length], null))
      }
    }
  }

  function handleOverdrive() {
    if (!effectiveOverdrive) return

    for (let i = 0; i < effectiveStep; i++) {
      const max = Math.max(control.length, currentText.length)
      if (overdriveIndex < max) {
        control[overdriveIndex] = setIfNotIgnored(
          currentText[overdriveIndex],
          String.fromCharCode(
            typeof effectiveOverdrive === 'boolean' ? 95 : (effectiveOverdrive as number)
          )
        )
        overdriveIndex++
      }
    }
  }

  function onTick() {
    stepForward()
    resizeControl()
    seedForward()
  }

  function draw() {
    let outputText = ''

    for (let i = 0; i < control.length; i++) {
      const controlValue = control[i]

      switch (true) {
        // A positive integer value, get a random character
        case typeof controlValue === 'number' && controlValue > 0:
          outputText += getRandomChar(config.range)

          if (i <= scrambleIndex) {
            // Reduce scramble index only if it's past the scrambleIndex
            control[i] = (control[i] as number) - 1
          }
          break

        // A string from the previous text
        case typeof controlValue === 'string' && (i >= currentText.length || i >= scrambleIndex):
          outputText += controlValue
          break

        // Before scramble index, and equal to the string
        case controlValue === currentText[i] && i < scrambleIndex:
          outputText += currentText[i]
          break

        // Scramble has finished
        case controlValue === 0 && i < currentText.length:
          outputText += currentText[i]
          control[i] = currentText[i]
          break

        default:
          outputText += ''
      }
    }

    // Set text
    resultText = outputText
    node.textContent = resultText

    // Dispatch frame event
    node.dispatchEvent(
      new CustomEvent('scrambleframe', {
        detail: { text: resultText },
        bubbles: true
      })
    )

    // Check if animation is complete
    if (resultText === currentText) {
      control = control.slice(0, currentText.length)

      // Dispatch end event
      node.dispatchEvent(new CustomEvent('scrambleend', { bubbles: true }))

      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
      isPlaying = false
    }

    stepCount++
  }

  function animate(timestamp: number) {
    if (!config.speed) return

    handleOverdrive()

    const timeElapsed = timestamp - elapsedTime
    if (timeElapsed > 1000 / (60 * config.speed)) {
      elapsedTime = timestamp

      if (stepCount % config.tick === 0) {
        onTick()
      }

      draw()
    }

    if (isPlaying) {
      rafId = requestAnimationFrame(animate)
    }
  }

  function reset() {
    stepCount = 0
    scrambleIndex = 0
    overdriveIndex = 0
    if (!config.overflow) {
      control = Array(currentText.length)
        .fill(null)
        .map((_, i) => currentText[i])
    } else {
      control = []
    }
  }

  function play() {
    if (isPlaying) return

    isPlaying = true

    if (rafId !== null) {
      cancelAnimationFrame(rafId)
    }

    reset()

    if (!config.overflow) {
      // When overflow is false, we need to reset scrambleIndex to 0
      // so animation will work through the text
      scrambleIndex = 0
      // Also reset characters to be scrambled
      for (let i = 0; i < control.length; i++) {
        const shouldScramble = getRandomInt(0, 10) >= (1 - effectiveChance) * 10
        if (shouldScramble) {
          control[i] = config.scramble
        }
      }
    }

    // Dispatch start event
    node.dispatchEvent(new CustomEvent('scramblestart', { bubbles: true }))

    rafId = requestAnimationFrame(animate)
  }

  function stop() {
    isPlaying = false

    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  }

  function update(newOptions: Partial<ScrambleOptions> = {}) {
    // Update config
    Object.assign(config, newOptions)

    // Handle text change specially
    if (newOptions.text !== undefined && newOptions.text !== currentText) {
      currentText = newOptions.text
      reset()

      // Always restart animation when text changes
      stop()
      play()
    }
  }

  // Set up the scramble action
  $effect(() => {
    // Initial setup
    if (config.autoplay) {
      play()
    } else {
      // Just set the text without animation
      node.textContent = config.text
    }

    // Cleanup function
    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
    }
  })

  // Expose methods to be called from component
  node.scramble = play
  node.stop = stop
  node.reset = reset
  node.update = update

  return {
    // Called when options change
    update(newOptions: ScrambleOptions) {
      update(newOptions)
    }
  }
}

// Add type definitions for the extended HTMLElement
declare global {
  interface HTMLElement {
    scramble?: () => void
    stop?: () => void
    reset?: () => void
    update?: (options: Partial<ScrambleOptions>) => void
  }
}
