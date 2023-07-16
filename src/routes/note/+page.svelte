<script lang="ts">
  import Intro from '../Intro.svelte'

  import { formatDate } from '$lib/util'

  import type { PageData } from './$types'

  export let data: PageData
</script>

<Intro route={data.routes.find((r) => r.label === 'Notes')} />

<div>
  <section>
    <ul>
      {#each data.notes as note}
        {@const date = formatDate(note.time)}
        <li>
          <a href="/note/{note.slug}">
            <h2 class="text-base">{note.title}</h2>
            <time class="text-xs">{date}</time>
          </a>
        </li>
      {/each}
    </ul>
  </section>
</div>

<style>
  div{
    --uno: 'max-w-grid py-5 children:col-start-2';
  }
  ul {
    --uno: 'divide-y divide-border';
  }
  li {
    --uno: 'border-dashed';
  }
  a {
    --uno: 'py-3 transition flex justify-between items-baseline';
    --uno: 'hover:text-fg-muted active:(text-fg scale-99.5)';
  }
</style>
