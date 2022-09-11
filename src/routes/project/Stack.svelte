<script lang="ts">
  import { onMount } from 'svelte'
  import { animate, inView, spring } from 'motion'
  import throttle from 'lodash.throttle'

  import Image from '$lib/image/Image.svelte'
  import { motion } from '$lib/animation/motion'

  export let images: string[]

  let imgEl: HTMLDivElement

  onMount(() =>
    inView(imgEl, () => {
      animate(imgEl, { rotateZ: [0, 1, 0] }, { delay: 4, easing: 'ease-out' })
    })
  )

  async function swapEffect() {
    if (!imgEl || !images) return
    if (images.length === 1) return

    const el = Array.from(imgEl.children)
    const target = el.length - 1
    const offsetX = el[target].clientWidth * 0.9
    const offsetY = -el[target].clientHeight * 0.4
    const scale = 0.8

    await animate(
      el[target],
      { x: [0, offsetX], y: [0, offsetY], z: [0, -99], scale: [1, scale] },
      { easing: spring({ damping: 400, stiffness: 1600 }) }
    ).finished

    images.splice(0, 0, images.splice(-1, 1)[0])
    images = images

    await animate(
      el[target],
      { x: [offsetX, 0], y: [offsetY, 0], scale: [scale, 1] },
      { easing: spring({ damping: 20 }) }
    ).finished
  }

  const swap = throttle(swapEffect, 700, { trailing: false })
</script>

<div
  class="cursor-pointer w-fit grid place-items-center children:(col-start-1 row-start-1) "
  use:motion={{
    hover: { scale: 1.01, rotateZ: 1 },
    transition: { easing: 'ease-out' },
  }}
  on:mouseup={swap}
  bind:this={imgEl}
>
  {#each images ?? [] as id (id)}
    {@const deg = Math.floor(Math.random() * 20 - 10) % 10}
    <div>
      <Image
        class="rounded-sm h-160px z-10 shadow-md transform aspect-video rotate-[{deg}deg] bg-surafce phone:(h-fit) "
        {id}
        alt=""
      />
    </div>
  {/each}
</div>
