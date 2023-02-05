<script lang="ts">
  import tooltip from '$lib/action/tooltip/action'
  import Image from '$lib/image/Image.svelte'

  import type { PageServerData } from './$types'

  export let data: PageServerData
  const items = { 'Currently Reading': data.reading, 'Recently Read': data.recent }
</script>

<div class="bg-surface rounded-3xl py-12 lt-sm:(p-4 -mx-4)">
  {#each Object.entries(items) as [key, value]}
    <section class="max-w-grid">
      <div class="text-sm font-600 text-right lt-lg:(col-start-2 text-left mb-4)">{key}</div>
      <ul class="col-start-2 grid grid-cols-5 gap-4 lt-sm:grid-cols-3 items-end font-Newsreader">
        {#each value as item}
          <li class="perspective-400">
            <a
              href="https://literal.club/book/{item.slug}"
              class="transition block transform-gpu relative"
              after="absolute content-none w-px top-0 bottom-0 left-1.5 blur-1 bg-black/16"
              hover="translate-z-2 drop-shadow-xl"
              ><Image
                id={item.cover}
                class="bg-surface-subtle drop-shadow-md min-h-32"
                children="rounded-none"
              /></a
            >
            <div class="row-start-2 mt-2">
              <h2 class="text-sm line-clamp-1">{item.title}</h2>
              <p class="text-xs line-clamp-1">{item.authors.map((a) => a.name).join(', ')}</p>
            </div>
          </li>
        {/each}
      </ul>
    </section>
  {/each}

  <section class="max-w-grid">
    <div class="text-sm text-right font-600 lt-lg:(col-start-2 text-left mb-4)">Reading Goal</div>
    <div class="font-Newsreader col-start-2">
      <h2>2023 Reading Goal</h2>
      <p class="text-fg-secondary">{data.goals[0].progress}/{data.goals[0].goal.target}</p>

      <ul class="mt-4 flex flex-wrap gap-2" children="basis-4 shrink-0 h-4 rounded-full">
        {#each new Array(data.goals[0].goal.target) as _, index}
          {@const book = data.booksInGoal[index]?.book ?? null}
          {#if book}
            <div
              class=" bg-rx-grass-9 hover:bg-rx-grass-10 flex justify-center items-center"
              use:tooltip={{
                content: book.title + '—' + book.authors.map((a) => a.name).join(', '),
              }}
            >
              <a href="https://literal.club/book/{book.slug}"
                ><span class="i-ri-check-fill inline-block w-3 h-3 text-white" /></a
              >
            </div>
          {:else}
            <div class="border border-fg-secondary border-dashed" />
          {/if}
        {/each}
      </ul>
    </div>
  </section>
</div>

<style>
  section {
    --uno: not-last:(mb-24 lt-sm:mb-12);
  }
</style>
