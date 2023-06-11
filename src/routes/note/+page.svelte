<script lang="ts">
  import Intro from '../Intro.svelte'

  import { formatDate } from '$lib/util'

  import type { PageData } from './$types'

  export let data: PageData
</script>

<Intro route={data.routes.find((r) => r.label === 'Notes')} />

<div class="lt-md:(block max-w)" md="max-w-grid py-5" children="col-start-2">
  <section>
    <ul class="divide-y divide-border">
      {#each data.notes as note}
        {@const date = formatDate(note.time)}
        <li class="border-dashed">
          <a
            class="py-3 transition flex justify-between items-baseline"
            hover="invert-50 dark:(invert-none brightness-80)"
            href="/note/{note.slug}"
          >
            <h2 class="text-base">{note.title}</h2>
            <time class="text-xs">{date}</time>
          </a>
        </li>
      {/each}
    </ul>
  </section>
</div>
