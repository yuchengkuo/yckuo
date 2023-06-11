<script lang="ts">
  import Image from '$lib/media/Image.svelte'

  import { spring } from 'svelte/motion'
  import { slide } from 'svelte/transition'

  let isVisible = false
  let textWidth = 0
  let width = spring(34, { damping: 1, stiffness: 0.1 })
</script>

<div class="drop-shadow-md relative shrink-0 w-14 lt-sm:order-first">
  <Image
    id="about_avatar_cq1ocu"
    alt="YuCheng Kuo"
    aspectRatio="1/1"
    class="bg-bg bg-blend-multiply rounded-xl pointer-events-none overflow-hidden"
  />

  <emoji
    class="rounded-full cursor-pointer flex bg-rx-gray-4 border border-rx-gray-7 shadow-md text-base px-2 -top-3 left-7/10 gap-1 items-center block absolute no-js:hidden"
    role="presentation"
    on:mouseenter={() => {
      isVisible = true
    }}
    on:mouseleave={() => {
      isVisible = false
    }}
    style="width: {$width}px"
  >
    🍊{#if isVisible}<span
        aria-label="hidden"
        class="font-700 text-xs text-rx-orange-11 block whitespace-nowrap lt-lg:hidden"
        bind:clientWidth={textWidth}
        transition:slide|local={{ axis: 'x', duration: 400 }}
        on:introstart={() => width.set(38 + textWidth)}
        on:outrostart={() => width.set(34)}>Nice meeting you :)</span
      >{/if}
  </emoji>
</div>
