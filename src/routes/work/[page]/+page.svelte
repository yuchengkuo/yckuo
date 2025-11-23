<script lang="ts">
  import Content from '$lib/content/Content.svelte'
  import { formatDate } from '$lib/util'

  let { data } = $props()

  let metaEntries = $derived(Object.entries(data.meta ?? {}))
  let summaryEntries = $derived(data.summary ?? [])

  let nextProject = $derived.by(() => {
    const featured = data.works.filter((w) => w.featured)
    const index = featured.findIndex((w) => w.slug === data.slug)
    return featured[index + 1 === featured.length ? 0 : index + 1]
  })
</script>

<!-- Heading -->
<h1 class="text-9 leading-8 lt-md:(text-7 leading-8) font-bold mt-48 span-full">{data.title}</h1>
<p class="span-5 mb-60 mt-2 lt-md:mt-1 text-secondary">
  {data.tagline}
</p>

<!-- Summary -->

<dl class="mb-16 span-8">
  <dt>Key Impact</dt>
  {#each summaryEntries as summary}
    <dd>{summary}</dd>
  {/each}
</dl>

<!-- Metadata -->
{#if metaEntries.length}
  <dl class="grid-subgrid mb-24" aria-label="Project metadata">
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
{/if}

<!-- Content -->
<Content content={data.content} />
<p class="mt-6 text-tertiary">
  Updated at <time datetime={data.updated}>{formatDate(data.updated)}</time>
</p>

<!-- Next -->
<section class="mt-32 span-full">
  <p class="text-secondary mb-1">Next Project:</p>
  <a class="text-4xl lt-md:text-2xl font-bold" href="/{nextProject.slug}">{nextProject.title}</a>
</section>

<style>
  dt {
    --uno: 'capitalize span-1 text-secondary';
  }

  dd {
    --uno: 'start-2 span-5';
  }
</style>
