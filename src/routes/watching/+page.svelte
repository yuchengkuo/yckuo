<script lang="ts">
  import Head from '$components/Head.svelte'

  import Image from '$lib/image/Image.svelte'

  type Show = {
    [key: string]: string
  }

  let hoverId: number
  let x: number
  let y: number

  export let data: Show[]
</script>

<Head title="Watching · YuCheng Kuo">
  <script>
    document.documentElement.setAttribute('data-theme', 'orange')
  </script>
</Head>

<h1 class="mb-50">Watching</h1>

<section class="*grid">
  <ul
    class="grid gap-x-8 gap-y-16 grid-cols-5 col-span-6 tablet:(grid-cols-4) phone:(grid-cols-2 gap-6) "
  >
    {#each data as show, index (show.id)}
      <li
        class="group"
        on:mouseenter={() => (hoverId = index)}
        on:focus={() => (hoverId = index)}
        on:mouseleave={() => (hoverId = undefined)}
        on:blur={() => (hoverId = undefined)}
        on:mousemove={(e) => {
          x = e.clientX + 8
          y = e.clientY + 8
        }}
        tabindex="0"
      >
        <a
          class="w-full block hover:(scale-101 -translate-y-1 rotate-0.5 shadow-md) active:(scale-99) group-focus:(scale-101 -translate-y-1 rotate-0.5 shadow-md) "
          href={`https://www.themoviedb.org/tv/${show.id}`}
        >
          <Image
            id={show.posterUrl}
            alt=""
            widths={[120, 240, 360]}
            class="rounded-md shadow-smoverflow-hidden aspect-100/66"
          />
        </a>
        <h4 class="mt-4 text-center line-clamp-2">{show.title}</h4>
        <div class="flex flex-col text-fg-secondary text-sm items-center justify-center">
          <time class="font-Azeret ">{show.time.substring(0, 4)}</time>
          <p class="text-xs">{show.status}</p>
        </div>
      </li>
    {/each}
  </ul>
</section>

{#if data[hoverId]}
  <div
    class="rounded-md h-max bg-fg-secondary/84 shadow-lg text-bg p-4 transform w-80 rotate-2 backdrop-blur-lg backdrop-filter fixed pointer-events-none will-change-auto"
    style:left={`${x}px`}
    style:top={`${y}px`}
  >
    {#key hoverId}
      <h4 class="font-575 text-bg mb-1">{data[hoverId].title}</h4>
      <p class="text-base">{data[hoverId].overview}</p>
    {/key}
  </div>
{/if}
