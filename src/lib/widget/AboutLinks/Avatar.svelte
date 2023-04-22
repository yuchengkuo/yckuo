<script lang="ts">
  import { motion } from '$lib/animation/motion'
  import Image from '$lib/media/Image.svelte'
  import { spring } from 'motion'

  let hover = false
  let textWidth = 0
  let width: string

  $: width = (38 + textWidth).toFixed(4) + 'px'
</script>

<div class="drop-shadow-md relative shrink-0 w-14 lt-sm:order-first">
  <Image
    id="about_avatar_cq1ocu"
    alt="YuCheng Kuo"
    aspectRatio="1/1"
    class="bg-bg bg-blend-multiply rounded-xl pointer-events-none overflow-hidden"
  />

  <emoji
    class="rounded-full cursor-pointer flex bg-rx-gray-4 border border-rx-gray-7 shadow-md text-base px-2 -top-3 right-7/10 gap-1 items-center block absolute no-js:hidden"
    role="presentation"
    on:mouseenter={() => (hover = true)}
    on:mouseleave={() => (hover = false)}
    use:motion={{
      animate: { width: hover ? width : '34px' },
      transition: { easing: spring({ mass: 2, damping: 40, stiffness: 400 }) },
    }}
  >
    🍊
    <span
      use:motion={{
        initial: { opacity: 0, x: '10%' },
        animate: hover ? { opacity: 1, x: 0 } : { opacity: 0, x: '10%' },
        transition: { delay: 0.2 },
      }}
      aria-label="hidden"
      bind:clientWidth={textWidth}
      class:invisible={!hover}
      class="font-700 text-xs text-rx-orange-11 block whitespace-nowrap lt-lg:hidden dark:text-orange-300"
      >Nice meeting you :)</span
    >
  </emoji>
</div>
