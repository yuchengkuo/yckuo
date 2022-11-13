<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<!-- Only visible in mobile -->
<section class="mb-12 md:hidden">
  <h1 class="mb-1">Notes</h1>
  <p class="text-fg-secondary">Notes, thoughts, journals, snippets, etc.</p>
</section>

<section class="md:hidden">
  {#each data.notes as note}
    <a class="text-lg py-3 block" href="/note/{note.slug}">
      {note.title}
    </a>
  {/each}
</section>
