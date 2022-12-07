<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<!-- Only visible in mobile -->
<section class="mb-10">
  <h1 class="mb-4">Notes</h1>
  <p class="text-fg-secondary">Notes, thoughts, journals, snippets, etc.</p>
</section>

<section>
  <ul>
    {#each data.notes as note}
      <li>
        <a
          class="lev4 !text-fg-secondary py-4 transition flex justify-between items-baseline"
          hover="invert-50 dark:(invert-none brightness-80)"
          href="/note/{note.slug}"
        >
          {note.title}
          <span class="text-sm">{new Date(note.date).getFullYear()}</span>
        </a>
      </li>
    {/each}
  </ul>
</section>
