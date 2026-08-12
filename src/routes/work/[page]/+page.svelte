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
<div class="md:(grid-subgrid) layout-content">
  <h1 class="text-8 leading-10 lt-md:(text-7 leading-8) font-medium span-full">
    {data.title}
  </h1>
  <p class="span-5 mb-30 mt-2 lt-md:mt-1 font-mono text-secondary text-xs leading-5">
    {data.tagline}
  </p>
</div>

<!-- Summary -->
<dl class="layout-content grid-subgrid mb-16 font-mono text-xs prose">
  <dt class="text-secondary">Key Impact</dt>

  <dd class="span-full">
    <ul>
      {#each summaryEntries as summary}
        <li>{summary}</li>
      {/each}
    </ul>
  </dd>
</dl>

<!-- Metadata -->
<section class="grid-subgrid layout-full mb-24 prose">
  {#if metaEntries.length}
    <dl aria-label="Project metadata">
      {#each metaEntries as [key, value]}
        <dt>
          {key}
        </dt>
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
</section>

<!-- Content -->
<Content content={data.content} />
<p class="mt-6 text-tertiary font-mono text-xs">
  Updated at <time datetime={data.updated}>{formatDate(data.updated)}</time>
</p>

<!-- Next -->
<!-- Bleeds past the content column to the right edge on desktop -->
<section class="mt-32 layout-content md:end--1">
  <a href="/{nextProject.slug}" class="button-primary inline-block mb-4">Next →</a>
  <p class="text-8 leading-10 lt-md:(text-7 leading-8) font-medium span-full">
    {nextProject.title}
  </p>
</section>
