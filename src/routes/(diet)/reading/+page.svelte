<script lang="ts">
  import tooltip from '$lib/action/tooltip/action'
  import Head from '$lib/seo/Head.svelte'

  import Book from '../Book.svelte'

  import type { PageServerData } from './$types'
  import BookDot from './BookDot.svelte'

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
    <h2 class="text-base font-normal mb-6">{key}</h2>

    <ul class="grid grid-cols-5 gap-4 lt-sm:grid-cols-3 items-end font-Newsreader">
      {#each value as book (book.id)}
        {@const progress = data.progress.find((p) => p.bookId === book.id)?.progress}
        <Book {book} {progress} />
      {/each}
    </ul>
  </section>
{/each}

<section class="max-w font-Newsreader">
  <h2>2023 Reading Goal</h2>
  <p class="text-fg-muted">{data.goals[0].progress}/{data.goals[0].goal.target}</p>

  <ul class="mt-4 flex flex-wrap gap-2" children="shrink-0">
    {#each new Array(data.goals[0].goal.target) as _, index}
      {@const book = data.booksInGoal[index]?.book ?? null}
      <BookDot {book} />
    {/each}
  </ul>
</section>
