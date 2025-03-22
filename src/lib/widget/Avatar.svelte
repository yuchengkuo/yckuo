<script lang="ts">
  import Image from '$lib/media/Image.svelte'

  import { spring } from 'svelte/motion'
  import { slide } from 'svelte/transition'

  let isVisible = $state(false)
  let textWidth = $state(0)
  let width = spring(30, { damping: 1, stiffness: 0.1 })
</script>

<div>
  <Image
    id="about_avatar_cq1ocu"
    alt="Avatar of YuCheng Kuo"
    aspectRatio="1/1"
    class="rounded-xl pointer-events-none overflow-hidden"
  />

  <emoji
    role="presentation"
    onmouseenter={() => (isVisible = true)}
    onmouseleave={() => (isVisible = false)}
    style="width: {$width}px"
  >
    🍊{#if isVisible}<span
        aria-label="hidden"
        bind:clientWidth={textWidth}
        transition:slide|local={{ axis: 'x', duration: 400 }}
        onintrostart={() => width.set(40 + textWidth)}
        onoutrostart={() => width.set(30)}>Nice meeting you :)</span
      >{/if}
  </emoji>
</div>

<style>
  div {
    --uno: 'drop-shadow relative shrink-0 w-14';
  }
  emoji {
    --uno: 'absolute -top-3 left-7/10 text-xs no-js:hidden';
    --uno: 'drop-shadow flex gap-1 items-center px-1.5 py-1';
    --uno: 'bg-surface border border-border rounded-full cursor-pointer';
  }
  span {
    --uno: 'block font-700 text-xs text-rx-orange-11 whitespace-nowrap lt-lg:hidden';
  }
</style>
