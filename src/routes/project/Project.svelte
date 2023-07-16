<script lang="ts">
  import { page } from '$app/stores'

  import Image from '$lib/media/Image.svelte'
  import { formatDate } from '$lib/util'

  import type { Project } from '$contentlayer'

  export let project: Project
</script>

<li>
  <a href={project.link || `/project/${project.slug}`}>
    <main>
      <time class="block text-xs text-fg-muted"
        >{formatDate(project.time, { year: 'numeric', month: 'long' })}</time
      >

      <div class="flex justify-between items-baseline">
        <h2 class="text-base">
          {project.title}
          {#if project.link}↗{/if}
        </h2>
      </div>
      <p class="text-fg-muted">{project.excerpt}</p>

      <div class="flex gap-2 mt-2 lt-sm:gap-1">
        {#each project.tag ?? [''] as tag}
          {@const index = $page.data.tags.findIndex((t) => t[0] === tag)}
          {@const hue = (360 / $page.data.tags.length) * index + 160}
          <p style="--tag: 88% 0.035 {hue}; --ontag: 28% 0.15 {hue};" class="tag shrink-0">{tag}</p>
        {/each}
      </div>

      {#if project.image}
        <div class="mt-4 flex gap-4 lt-sm:gap-2">
          {#each project.image as img}
            <Image {...img} class="basis-[calc(25%-12px)] grow shrink-0" widths={[600, 1600]} />
          {/each}
        </div>
      {/if}
    </main>
  </a>
</li>

<style>
  li {
    --uno: 'not-last:(mb-10 lt-sm:mb-4)';
  }
  main {
    --uno: 'bg-surface shadow-sm rounded-lg p-4 -m-4 lt-sm:(p-3 -m-3)';
    --uno: 'transition border border-transparent hover:(bg-surface-muted border-border-muted) active:bg-bg-muted';
  }
</style>
