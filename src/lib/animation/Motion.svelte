<script lang="ts">
  import { setContext, getContext, onMount, afterUpdate } from 'svelte'
  import { get_current_component } from 'svelte/internal'
  import {
    createMotionState,
    createStyleString,
    type AnimationOptionsWithOverrides,
    type MotionState,
    type Variants,
    type VariantDefinition,
    type InViewOptions,
  } from '@motionone/dom'

  import { contextKey } from './context'
  import { forwardEventsBuilder } from './forwardEvent'
  import { intro, outro } from './out'

  type Props = {
    tag?: string
    initial?: VariantDefinition
    animate?: VariantDefinition
    exit?: VariantDefinition
    hover?: VariantDefinition
    press?: VariantDefinition
    inView?: VariantDefinition
    inViewOptions?: InViewOptions
    variants?: Variants
    transition?: AnimationOptionsWithOverrides
  }

  type $$Props = svelteHTML.HTMLProps<'div', Props>

  export let tag = 'div'
  export let initial: VariantDefinition = null
  export let animate: VariantDefinition = null
  export let exit: VariantDefinition = null
  export let hover: VariantDefinition = null
  export let press: VariantDefinition = null
  export let inView: VariantDefinition = null
  export let inViewOptions: InViewOptions = null
  export let variants: Variants = null
  export let transition: AnimationOptionsWithOverrides = null

  let element: HTMLElement

  const forwardEvents = forwardEventsBuilder(get_current_component())

  const parentState = getContext<MotionState | undefined>(contextKey)

  const state = createMotionState(
    {
      initial,
      animate,
      // @ts-ignore
      exit,
      hover,
      press,
      inView,
      inViewOptions,
      variants,
      transition,
    },
    parentState
  )

  const initialStyle = createStyleString(state.getTarget())
  // const targetStyle = createStyleString(animate as MotionKeyframes)

  setContext(contextKey, state)

  onMount(() => {
    const destroy = state.mount(element)
    state.setActive('exit', false)
    return destroy
  })

  afterUpdate(() => {
    state.update({
      initial,
      animate,
      // @ts-ignore
      exit,
      hover,
      press,
      inView,
      inViewOptions,
      variants,
      transition,
    })
  })
</script>

<svelte:element
  this={tag}
  bind:this={element}
  style={initialStyle}
  use:forwardEvents
  in:intro
  out:outro
  {...$$restProps}
>
  <slot />
</svelte:element>

<!-- <noscript>
  <svelte:element this={tag} style={targetStyle} use:forwardEvents {...$$restProps}>
    <slot />
  </svelte:element>
</noscript> -->
