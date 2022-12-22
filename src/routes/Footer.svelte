<script lang="ts">
  import { Confetti } from 'svelte-confetti'

  import tooltip from '$lib/action/tooltip/action'
  import useTheme from '$lib/theme/useTheme'

  let showConfetti = false

  const { dark, colorized, toggleMode, toggleColor } = useTheme()
</script>

<footer
  class="max-w-640px mx-auto flex flex-wrap items-baseline justify-between border-t border-border"
  text="xs fg-secondary"
  gap="3 sm:6"
  p="t-20 b-20 md:b-40"
  m="t-20"
>
  <p class="font-675 text-base tracking-tight flex-grow">YuCheng Kuo</p>
  <button
    class="text-xs uppercase attr no-js:hidden"
    on:click={toggleMode}
    use:tooltip={{ content: $dark ? 'Light on 💡' : 'Light off 🌙' }}
    data-splitbee-event="Toogle Theme">{$dark ? 'lighten' : 'darken'}</button
  >
  <button
    class="font-475 uppercase relative attr no-js:hidden"
    on:click={() => {
      toggleColor()
      showConfetti = $colorized
    }}
    use:tooltip={{ content: $colorized ? 'Tune down the colors' : 'Colorize me' }}
    data-splitbee-event="Toggle Color"
    >{$colorized ? 'Decolorize' : 'Colorize'}
    {#if showConfetti}
      <div class="top-1/2 left-1/2 absolute">
        <Confetti
          colorArray={[`rgb(var(--colors-fg))`, `rgb(var(--colors-fg-secondary))`]}
          duration="1500"
        />
      </div>
    {/if}
  </button>
  <p class="font-Azeret font-475 tracking-tighter slashed-zero">v3 (C)2019-2022</p>
</footer>

<style>
  button {
    --uno: font-Azeret;
  }
  p {
    font-feature-settings: 'calt' on;
  }
</style>
