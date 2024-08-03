<script lang="ts">
  import Content from '$lib/content/Content.svelte'
  import Image from '$lib/media/Image.svelte'

  import { formatDate } from '$lib/util.js'

  export let data

  $: metaEntries = Object.entries(data.meta ?? {})
  $: summaryEntries = Object.entries(data.summary ?? {})
</script>

<header
  class="col-start-1 row-start-1 col-span-3 grid grid-cols-subgrid content-start"
  aria-label="Work details"
>
  <h1>{data.title}</h1>

  <!-- Meta -->
  <dl class="meta">
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
    <dt>Updated</dt>
    <dd><time datetime={data.updated}>{formatDate(data.updated)}</time></dd>
  </dl>
</header>

<!-- Image -->
<div class="row-start-1 col-end--1">
  <Image id={data.cover} aspectRatio="16/10" />

  <p class="tagline">{data.tagline}</p>
</div>

<!-- Summary -->
{#if summaryEntries.length}
  <dl class="sum" aria-label="Work summary">
    {#each Object.entries(data.summary) as [key, value]}
      <div>
        <dt>{key}</dt>
        <dd>{@html value}</dd>
      </div>
    {/each}
  </dl>
{/if}

<!-- Content -->
<Content content={data.content} />

<style>
  h1 {
    --uno: 'font-serif italic font-450 text-lg';
  }

  dl.meta {
    --uno: 'col-span-full mt-16 lt-sm:my-8 grid grid-cols-4 md:grid-cols-subgrid';

    & dt {
      --uno: 'col-start-1 text-fg-muted capitalize';
    }

    & dd {
      --uno: 'col-start-2 col-span-full mb-2';
    }

    & dd:has(+ dd) {
      --uno: 'mb-0';
    }
  }

  .tagline {
    --uno: 'col-span-full my-16 lt-sm:my-12 text-xl indent';
  }

  dl.sum {
    --uno: 'col-end--2 grid lt-sm:gap-8 grid-cols-2 md:grid-cols-subgrid mb-12';

    & > div {
      --uno: 'col-span-3 md:(even:col-start-5)';
    }

    & dt {
      --uno: 'text-fg-muted capitalize';
    }
  }
</style>
