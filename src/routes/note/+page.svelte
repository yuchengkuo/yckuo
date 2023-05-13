<script lang="ts">
  import Header from '../Header.svelte'
  import { formatDate } from '$lib/util'

  export let data: PageData

  import type { PageData } from './$types'
</script>

<Header title="Notes" desc="Random notes. Documenting things that I learned for now." />

<div class="lt-md:(block max-w)" md="max-w-grid" children="col-start-2">
  <section>
    <ul>
      {#each data.notes as note}
        {@const date = formatDate(note.date)}
        <li>
          <a
            class="py-3 transition flex justify-between items-baseline"
            hover="invert-50 dark:(invert-none brightness-80)"
            href="/note/{note.slug}"
          >
            <h2 class="text-base">{note.title}</h2>
            <time class="text-sm">{date}</time>
          </a>
        </li>
      {/each}
    </ul>
  </section>
</div>
