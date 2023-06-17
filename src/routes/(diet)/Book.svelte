<script lang="ts">
  import Image from '$lib/media/Image.svelte'

  import type { LiteralBook } from '$lib/api/literal'

  export let book: LiteralBook
  export let progress: number = undefined

  const authors = book.authors.map((a) => a.name).join(', ')
</script>

<li>
  <a href="https://literal.club/book/{book.slug}" title="{book.title} by {authors}"
    ><Image id={book.cover} class="!children:rounded-none" widths={[120, 240]} />{#if progress}<span
        style="width: {progress}%;"
      />{/if}</a
  >

  <h3>{book.title}</h3>
  <p>{authors}</p>
</li>

<style>
  li {
    --uno: 'perspective-400';
  }
  a {
    --uno: 'block mb-2 transition transform-gpu relative hover:(translate-z-2 drop-shadow-xl) active:-translate-z-1';
  }
  a::after {
    --uno: 'absolute content-empty w-px top-0 bottom-0 left-1 blur-1 bg-black/24';
  }
  /* Progress */
  span {
    --uno: 'absolute h-0.5 bg-primary';
  }
  h3 {
    --uno: 'text-sm line-clamp-1';
  }
  p {
    --uno: 'text-xs line-clamp-1';
  }
</style>
