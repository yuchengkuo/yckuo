<script lang="ts">
  import tooltip from '$lib/action/tooltip/action'
  import Head from '$lib/seo/Head.svelte'

  import Book from '../Book.svelte'

  import type { PageServerData } from './$types'

  export let data: PageServerData

  const items = { 'Currently Reading': data.reading, 'Recently Read': data.recent }
</script>

<Head
  title="Reading"
  description="Currently reading and reading goals."
  openGraph={{ url: 'reading' }}
/>

{#each Object.entries(items) as [key, value]}
  <section class="max-w mb-16">
    <p class="mb-6">{key}</p>

    <ul class="grid grid-cols-5 gap-4 lt-sm:grid-cols-3 items-end font-Newsreader">
      {#each value as book (book.id)}
        {@const progress = data.progress.find((p) => p.bookId === book.id)?.progress}
        <Book {book} {progress} />
      {/each}
    </ul>
  </section>
{/each}

<section class="max-w">
  <p class="mb-6">Reading Goal</p>
  <div class="font-Newsreader">
    <h2>2023 Reading Goal</h2>
    <p class="text-fg-muted">{data.goals[0].progress}/{data.goals[0].goal.target}</p>

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

<style>
  section {
    --uno: 'not-last:(mb-24 lt-sm:mb-12)';
  }
</style>
