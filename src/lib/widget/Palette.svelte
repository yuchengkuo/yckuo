<script lang="ts">
  import { motion } from '$lib/animation/motion'
  import useTheme, { type ThemeNames } from '$lib/theme/useTheme'
  import { spring, type Variants } from 'motion'

  import { themes } from '../theme/themes'

  let hover = false
  let target: number
  let active = false

  const { dark, colorized, toggleMode, setTheme } = useTheme()

  function setActiveTheme(theme: ThemeNames) {
    active = true
    setTheme(theme)
  }

  function setHoverTheme(index: number, theme: ThemeNames) {
    active = false
    hover = true
    target = index
    setTheme(theme)
  }

  function resetTheme() {
    hover = false
    !active && document.documentElement.setAttribute('data-theme', 'about')
  }

  // variants not working now
  const paletteVariants: Variants = {
    initial: { y: 8, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    hover: { borderRadius: '12px', padding: '16px', scale: 1.04 },
    press: { scale: 0.98 },
  }
</script>

<div
  class="bg-surface flex flex-wrap m-auto rounded-3xl mt-32 max-w-768px p-6 gap-6 justify-between items-start relative lt-sm:(p-4 grid grid-cols-2)"
>
  {#each themes.filter((t) => t.dark === $dark) as theme, index (theme.name + $dark)}
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
      data-splitbee-event="Switch Theme"
      data-splitbee-theme={theme.name}
      class:dark={$dark}
      class="bg-bg rounded-lg cursor-pointer grid grid-cols-2 gap-0 h-32 shadow p-3 w-32 relative justify-start hover:shadow-lg all:pointer-events-none lt-sm:(w-full h-auto aspect-square)"
      tabindex="0"
      role="button"
      on:click={() => setActiveTheme(theme.name)}
      on:keypress={() => setActiveTheme(theme.name)}
      on:mouseenter={() => setHoverTheme(index, theme.name)}
      on:mouseleave={resetTheme}
      on:focus={() => setHoverTheme(index, theme.name)}
    >
      <div class="flex gap-1 justify-start" children="w-3 h-3 rounded-full">
        <span class="bg-bg border-fg border-1" />
        <span class="bg-fg" />
        {#if theme.colors.fg_secondary}
          <span class="bg-fg-secondary" />
        {/if}
      </div>
    </palette>
  {/each}

  {#key $dark}
    <button
      use:motion={{
        initial: { y: 8, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        hover: { letterSpacing: '0.025em' },
      }}
      class="font-800 text-sm font-Uncut -top-6 right-6 absolute lt-sm:right-4"
      on:click={toggleMode}>{$dark ? 'Light On' : 'Light Off'}</button
    >
  {/key}

  {#key [hover, active]}
    <tip
      use:motion={{
        initial: { y: 8, opacity: 0 },
        animate: { y: 0, opacity: 1 },
      }}
      class="font-800 text-xs -top-5 left-6 text-fg-secondary/60 absolute lt-sm:left-4"
    >
      {#if !hover}
        <span class="lt-sm:hidden">Hover to discover</span>
        <span class="sm:hidden">Click to apply</span>
      {:else if active}
        Hooray! 🎉
      {:else if !$colorized}
        Colors are off now, try colorize ↘
      {:else}
        Click to apply
      {/if}
    </tip>
  {/key}
</div>
