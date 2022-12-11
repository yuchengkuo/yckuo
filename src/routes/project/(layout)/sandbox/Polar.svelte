<script lang="ts">
  import { spring } from 'svelte/motion'
  import { interpolate } from 'popmotion'

  let x = spring(0)
  let y = spring(0)
  let div: HTMLDivElement
  let outer: HTMLDivElement
  let hue = spring(0)
  let sat = spring(0)

  function handleMousemove(e: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) {
    x.set(e.clientX - div.getBoundingClientRect().x)
    y.set(e.clientY - div.getBoundingClientRect().y)
    hue.set(interpolate([0, outer.getBoundingClientRect().width], [0, 360])($x))
    sat.set(interpolate([0, outer.getBoundingClientRect().height], [30, 100])($y))
  }
</script>

<div
  class="w-full h-full grid place-items-center filter blur-md"
  style="--x: {$x}px; --y: {$y}px; --hue: {$hue}; --sat: {$sat}%;"
  bind:this={outer}
  on:mousemove={handleMousemove}
  on:mouseleave={(e) => {
    x.set(e.clientX - div.getBoundingClientRect().x)
    y.set(e.clientY - div.getBoundingClientRect().y)
  }}
>
  <div class="w-28 h-28 rounded-full" bind:this={div} />
</div>

<style>
  div > div {
    background-image: radial-gradient(
        circle at var(--x) var(--y),
        rgba(255, 255, 255, 0.5),
        transparent
      ),
      radial-gradient(
        circle at var(--x) var(--y),
        hsla(var(--hue), var(--sat), 50%, 0.4),
        transparent
      );
  }
</style>
