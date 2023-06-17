<script lang="ts">
  import tooltip from '$lib/action/tooltip/action'

  import type { LiteralBook } from '$lib/api/literal'

  export let book: LiteralBook
</script>

{#if book}
  <li
    class:active={book}
    use:tooltip={{
      content: book.title + '—' + book.authors.map((a) => a.name).join(', '),
    }}
  >
    <a href="https://literal.club/book/{book.slug}"><i class="i-ri-check-fill" /></a>
  </li>
{:else}
  <li />
{/if}

<style>
  li {
    --uno: 'size-4 rounded-full border border-fg-muted border-dashed';
  }
  li.active {
    --uno: 'bg-primary hover:brightness-90 active:brightness-80 transition duration-200 flex justify-center items-center border-none';
  }
  i {
    --uno: 'size-3.5 shadow-sm text-bg';
  }
</style>
