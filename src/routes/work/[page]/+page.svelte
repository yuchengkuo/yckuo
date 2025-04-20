<script lang="ts">
  import { page } from '$app/state'
  import Content from '$lib/content/Content.svelte'

  let { data } = $props()

  let metaEntries = $derived(Object.entries(data.meta ?? {}))
  let summaryEntries = $derived(Object.entries(data.summary ?? {}))
  let nextProjectIndex =
    1 + (page.data.works as (typeof data)[]).findIndex((p) => p.slug === data.slug)
  /** Assign the first for the last projecy */
  nextProjectIndex = nextProjectIndex === page.data.works.length ? 0 : nextProjectIndex
  const nextProject = page.data.works[nextProjectIndex] as typeof data
</script>

<p class="tagline">{data.tagline}</p>

<!-- Intro -->
{#if data.intro}
  <div class="mb-12">
    {@html data.intro}
  </div>
{/if}

<!-- Summary & Metadata -->
{#if summaryEntries.length || metaEntries.length}
  <div class="prose grid grid-cols-subgrid col-start-1 col-span-6 mb-40">
    <dl aria-label="Work summary">
      {#each summaryEntries as [key, value]}
        <dt>{key}</dt>
        <dd>{@html value}</dd>
      {/each}

      {#each metaEntries as [key, value]}
        <dt>{key}</dt>
        {#if typeof value !== 'string'}
          {#each value as v}
            <dd>{v}</dd>
          {/each}
        {:else}
          <dd>
            {#if value.startsWith('http')}
              {@const label = value.replace(/^(https?):\/\//, '')}
              <a href={value} aria-label="key link: {label}">{label}</a>
            {:else}
              {value}
            {/if}
          </dd>
        {/if}
      {/each}
    </dl>
  </div>
{/if}

<!-- Content -->
<Content content={data.content} />

<!-- Next -->
<section class="mt-20">
  <p class="text-xl">Next → <a href="/{nextProject.slug}">{nextProject.title}</a></p>
</section>

<style>
  .tagline {
    --uno: 'col-start-1 col-span-7 mb-16 lt-sm:my-12 text-xl indent';
  }

  dt {
    --uno: 'capitalize';
  }
</style>
