<script lang="ts">
  import { motion } from '$lib/animation/motion'
  import { outro } from '$lib/animation/out'
  import { spring, type Variants } from 'motion'
  import { onMount, afterUpdate } from 'svelte'

  import { themes } from './themes'

  let dark = false
  let hover = false
  let target: number
  let active = false
  let decolorize = false

  onMount(() => {
    dark = document.documentElement.classList.contains('dark')
  })

  afterUpdate(() => {
    decolorize = document.documentElement.classList.contains('decolorize')
  })

  function setActiveTheme(theme: string) {
    active = true
    document.documentElement.setAttribute('data-theme', theme)
  }

  function setHoverTheme(index: number, theme: string) {
    active = false
    hover = true
    target = index
    document.documentElement.setAttribute('data-theme', theme)
  }

  function resetTheme() {
    hover = false
    !active && document.documentElement.setAttribute('data-theme', 'green')
  }

  // variants not working now
  const paletteVariants: Variants = {
    initial: { y: 8, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    hover: { borderRadius: '12px', padding: '16px', scale: 1.04 },
    press: { scale: 0.98 },
  }

  const infoVariants: Variants = {
    initial: { y: 4, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 4, opacity: 0 },
  }
</script>

<div
  class="bg-surface flex flex-wrap rounded-3xl mt-32 w-full p-6 gap-6 justify-between items-start relative phone:(p-4 justify-center) "
>
  {#each themes.filter((t) => t.dark === dark) as theme, index (theme.name + dark)}
    {@const visible = target === index && hover}
    <palette
      use:motion={{
        initial: { y: 8, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        hover: { borderRadius: '12px', padding: '16px', scale: 1.04 },
        press: { scale: 0.98 },
        transition: {
          easing: spring({ mass: 2, damping: 40, stiffness: 800 }),
          y: { delay: index * 0.015 },
          opacity: { delay: index * 0.015 },
        },
        variants: paletteVariants,
      }}
      data-theme={theme.name}
      class:dark
      class="bg-bg rounded-lg cursor-pointer flex flex-col h-32 shadow p-3 w-32 relative justify-start hover:shadow-lg all:pointer-events-none"
      tabindex="0"
      on:click={() => setActiveTheme(theme.name)}
      on:mouseenter|capture={() => setHoverTheme(index, theme.name)}
      on:focus={() => setHoverTheme(index, theme.name)}
      on:mouseout={resetTheme}
      on:blur={resetTheme}
    >
      <div class="flex w-full gap-1 items-center justify-start children:(w-3 h-3 rounded-full) ">
        <span class="bg-bg border-fg border-1" />
        <span class="bg-fg" />
        {#if theme.colors.fg_secondary}
          <span class="bg-fg-secondary" />
        {/if}
      </div>

      {#if visible}
        <div
          class="flex flex-col mt-auto font-600 text-xs gap-0.5 items-start"
          use:motion={infoVariants}
          out:outro
        >
          <hex class="border-fg rounded-sm text-fg px-1 block">{theme.colors.bg}</hex>
          <hex class="bg-fg rounded-sm text-bg px-1 block">{theme.colors.fg}</hex>
          {#if theme.colors.fg_secondary}
            <hex class="bg-fg-secondary rounded-sm text-bg px-1 block"
              >{theme.colors.fg_secondary}</hex
            >
          {/if}
        </div>

        <word
          use:motion={{
            initial: { y: -4, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            exit: { y: -4, opacity: 0 },
          }}
          out:outro
          class="font-800 text-fg text-xs tracking-tight w-fit top-3 right-4 absolute"
        >
          {theme.label}
        </word>
      {/if}

      <contrast
        use:motion={{ animate: visible && { right: '16px', bottom: '16px' } }}
        class="flex flex-col font-700 text-fg-secondary w-fit right-3 bottom-3 text-0.625rem block absolute items-end"
      >
        <span class="font-Azeret text-xs tracking-tighter">{theme.aa}</span>
        {theme.contrast}
      </contrast>
    </palette>
  {/each}

  {#key dark}
    <button
      use:motion={{
        initial: { y: 8, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        hover: { letterSpacing: '0.025em' },
      }}
      class="font-800 text-sm -top-6 right-6 absolute"
      on:click={() => (dark = !dark)}>{dark ? 'Let the light in' : 'Embrace the drakness'}</button
    >
  {/key}

  {#key [hover, active]}
    <tip
      use:motion={{
        initial: { y: 8, opacity: 0 },
        animate: { y: 0, opacity: 1 },
      }}
      class="font-800 text-xs -top-5 left-6 text-fg-secondary/60 absolute"
    >
      {!hover
        ? 'Hover to discover'
        : active
        ? 'Hooray! 🎉'
        : decolorize
        ? 'Colors are off now, try colorize ↘'
        : 'Click to apply'}
    </tip>
  {/key}
</div>

<style>
  word {
    font-variation-settings: 'slnt' 6;
  }
</style>
