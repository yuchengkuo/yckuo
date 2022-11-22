<script lang="ts">
  import { onMount } from 'svelte'
  import { animate, inView, spring } from 'motion'
  import throttle from 'lodash.throttle'
  import Snd from 'snd-lib'

  import Image from '$lib/image/Image.svelte'
  import { motion } from '$lib/animation/motion'

  import type { Image as ImageType } from '$contentlayer'

  export let images: ImageType[]
  let className = ''
  export { className as class }

  let imgEl: HTMLDivElement
  let snd: Snd

  onMount(() => {
    snd = new Snd()
    snd.load(Snd.KITS.SND03)
  })

  onMount(() =>
    inView(imgEl, () => {
      if (images && images.length > 1)
        animate(imgEl, { rotateZ: [0, 1, 0] }, { delay: 4, easing: 'ease-out' })
    })
  )

  async function swapEffect() {
    if (!imgEl || !images) return
    if (images.length === 1) return

    snd.play(Snd.SOUNDS.SWIPE)

    const el = Array.from(imgEl.children)
    const target = el.length - 1
    const offsetX = el[target].clientWidth * 0.9
    const offsetY = -el[target].clientHeight * 0.4
    const scale = 0.8
    const rotateZ = Math.floor(Math.random() * 20 - 10) % 10

    await animate(
      el[target],
      { x: [0, offsetX], y: [0, offsetY], z: [0, -99], scale: [1, scale] },
      { easing: spring({ damping: 400, stiffness: 1600 }) }
    ).finished

    images.splice(0, 0, images.splice(-1, 1)[0])
    images = images

    await animate(
      el[target],
      { x: [offsetX, 0], y: [offsetY, 0], scale: [scale, 1], rotateZ: [null, rotateZ] },
      { easing: spring({ damping: 20 }) }
    ).finished
  }

  const swap = throttle(swapEffect, 700, { trailing: false })
</script>

<div
  class="cursor-pointer h-fit grid place-items-center children:(col-start-1 row-start-1) "
  use:motion={{
    hover: { scale: 1.01, rotateZ: 1 },
    transition: { easing: 'ease-out' },
  }}
  on:mouseup={swap}
  bind:this={imgEl}
  data-splitbee-event="Swap stack"
>
  {#each images ?? [] as img (img.id)}
    {@const deg = Math.floor(Math.random() * 20 - 10) % 8}
    {@const { id, alt, aspectRatio = '', blurDataUrl = '', isVideo } = img}
    <Image
      {id}
      {alt}
      {aspectRatio}
      {blurDataUrl}
      {isVideo}
      class="rounded-sm w-full sm:w-240px lg:w-320px z-10 shadow-md transform rotate-{deg} {className}"
    />
  {/each}
</div>
