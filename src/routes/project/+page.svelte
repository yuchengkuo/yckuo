<script lang="ts">
  import Head from '$lib/seo/Head.svelte'
  import Image from '$lib/media/Image.svelte'
  import { tagColors } from '$lib/config'
  import Header from '../Header.svelte'

  export let data: LayoutServerData

  import type { LayoutServerData } from './$types'
</script>

<Head
  title="Projects"
  description="Experiments, fun works and explorations."
  openGraph={{ url: 'project' }}
/>

<Header
  title="Projects"
  desc="Experiments, fun works and explorations. These are mostly personal projects that are for learning and practicing."
/>

<div class="max-w">
  <ul class="mt-20 lt-sm:mt-10">
    {#each data.allProjects as project}
      <li class="not-last:(mb-10 lt-sm:mb-4) relative">
        <time class="text-xs text-fg-secondary absolute top-5 right-[105%] whitespace-nowrap"
          >{project.time}</time
        >
        <a class="block" href={project.link || `/project/${project.slug}`}>
          <div
            class="rounded-lg transition p-4 -m-4 lt-sm:(p-3 -m-3) bg-surface border border-border-subtle relative shadow-sm"
            hover="bg-surface-subtle"
          >
            <div class="flex justify-between items-baseline">
              <h2 class="text-base">
                {project.title}
                {#if project.link}↗{/if}
              </h2>
            </div>
            <p class="text-fg-secondary">
              {project.excerpt}
            </p>

            <div class="flex gap-2 mt-2 lt-sm:gap-1">
              {#each project.tag ?? [''] as tag}
                {@const index = Object.keys(Object.fromEntries(data.tags)).indexOf(tag)}
                <p class="{tagColors[index] || 'tag-gray'} shrink-0">{tag}</p>
              {/each}
              <p />
            </div>

            {#if project.image}
              <div class="mt-4 flex gap-4 lt-sm:gap-2">
                {#each project.image as img}
                  <Image
                    {...img}
                    class="basis-[calc(25%-12px)] grow shrink-0"
                    widths={[600, 1600]}
                  />
                {/each}
              </div>
            {/if}
          </div>
        </a>
      </li>
    {/each}
  </ul>
</div>
