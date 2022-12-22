<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<div
  class="block lt-md:(max-w-640px mx-auto)"
  md="grid grid-cols-[1fr_640px_1fr] gap-x-10"
  children="col-start-2"
>
  <section class="mb-10">
    <h1 class="mb-4">Notes</h1>
    <p class="text-fg-secondary">Notes, thoughts, journals, snippets, etc.</p>
  </section>

  <section>
    <ul>
      {#each data.notes as note}
        {@const date = new Date(note.date)}
        {@const month = date.getMonth() + 1}
        <li>
          <a
            class="lev4 !text-fg-secondary py-4 transition flex justify-between items-baseline"
            hover="invert-50 dark:(invert-none brightness-80)"
            href="/note/{note.slug}"
          >
            {note.title}
            <span class="text-xs tabular-nums slashed-zero"
              >{date.getFullYear()}/{month < 10 ? '0' + month.toString() : month}</span
            >
          </a>
        </li>
      {/each}
    </ul>
  </section>
</div>
