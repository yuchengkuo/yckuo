<script lang="ts">
  import { beforeUpdate } from 'svelte'
  import { tweened } from 'svelte/motion'

  let x = tweened(-80)
  let y = tweened(-80)
  let button: HTMLElement
  let dark = false

  function handleMousemove(e: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) {
    x.set(e.clientX - button.getBoundingClientRect().x)
    y.set(e.clientY - button.getBoundingClientRect().y)
  }

  beforeUpdate(() => {
    document.documentElement.classList.contains('dark') ? (dark = true) : (dark = false)
  })
</script>

<div
  class="w-full h-full grid place-items-center"
  on:mousemove={handleMousemove}
  on:mouseleave={handleMousemove}
  style="--x: {$x}px; --y: {$y}px; --bg: {dark
    ? 'rgba(225, 225, 225, 0.7)'
    : 'rgba(239, 215, 0, 0.7)'}"
>
  <button
    bind:this={button}
    class="w-fit h-fit px-4 py-1.5 font-575 rounded-lg"
    bg="light-600 dark:dark-400"
    transition="transition duration-300"
    pos="relative"
    active="translate-y-0.5"
  >
    Glow ✨
  </button>
</div>

<style>
  button::before {
    content: '';
    position: absolute;
    pointer-events: none;
    user-select: none;
    inset: 0;
    padding: 1px;
    border-radius: inherit;
    background-image: radial-gradient(
      circle at var(--x) var(--y),
      var(--bg),
      rgba(20, 20, 20, 0.01)
    );
    mask-image: linear-gradient(black, rgba(0, 0, 0, 0.5)), linear-gradient(black, black);
    mask-composite: exclude;
    mask-mode: match-source, match-source;
    mask-position: 0% 0%, 0% 0%;
    mask-size: auto auto;
    mask-origin: content-box, border-box;
    mask-clip: content-box, border-box;
    mask-repeat: repeat, repeat;
    -webkit-mask-image: linear-gradient(black, rgba(0, 0, 0, 0.5)), linear-gradient(black, black);
    -webkit-mask-composite: xor;
    -webkit-mask-position: 0% 0%, 0% 0%;
    -webkit-mask-size: auto auto;
    -webkit-mask-origin: content-box, border-box;
    -webkit-mask-clip: content-box, border-box;
    -webkit-mask-repeat: repeat, repeat;
  }
</style>
