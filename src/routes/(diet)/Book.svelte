<script lang="ts">
  import Image from '$lib/media/Image.svelte'

  import type { LiteralBook } from '$lib/api/literal'

  export let book: LiteralBook
  export let progress: number = undefined
</script>

<li class="perspective-400">
  <a
    href="https://literal.club/book/{book.slug}"
    class="transition block transform-gpu relative"
    after="absolute content-none w-px top-0 bottom-0 left-1.5 blur-1 bg-black/16"
    hover="translate-z-2 drop-shadow-xl"
    ><Image
      id={book.cover}
      class="bg-surface-subtle drop-shadow-md"
      children="rounded-none"
      widths={[120, 240]}
    />{#if progress}<span class="absolute h-0.5 bg-primary" style="width: {progress}%;" />{/if}</a
  >
  <div class="row-start-2 mt-2">
    <h2 class="text-sm line-clamp-1">{book.title}</h2>
    <p class="text-xs line-clamp-1">{book.authors.map((a) => a.name).join(', ')}</p>
  </div>
</li>
