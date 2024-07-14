<script lang="ts">
  import Content from '$lib/content/Content.svelte'
  import Expand from '$lib/content/Expand.svelte'
  import { formatDate } from '$lib/util.js'
  import { onMount } from 'svelte'

  export let data

  let now: string = formatTime(Date.now())
  function formatTime(date: number) {
    return formatDate(date, { timeStyle: 'medium', hour12: false })
  }

  onMount(() => {
    const timer = setInterval(() => {
      now = formatTime(Date.now())
    }, 10)

    return () => clearInterval(timer)
  })
</script>

<svelte:head>
  <title>About — YuCheng Kuo</title>
</svelte:head>

<h1>{data.title}</h1>

<article class="mb-16 lt-sm:mb-10">
  {@html data.description}

  <p class="text-sm text-fg-subtle mt-8">
    Updated on {formatDate(data.updated)}
  </p>

  <h2>Work</h2>
  <dl>
    {#each data.works as work}
      <dt>
        <div>
          <a class="text-fg" href={work.url}>{work.title}</a>
          <small class="inline-block">{work.time}</small>
        </div>
      </dt>
      <dd>{work.area}</dd>
      <dd>{@html work.description}</dd>
    {/each}
  </dl>
</article>

<nav>
  {#each Object.entries(data.connect) as [title, arr]}
    <p>
      {title}
    </p>
    <dl class="col-span-full grid grid-cols-subgrid">
      {#each arr as { key, label, url }}
        <dt class="text-fg-muted">{key}</dt>
        <dd class="col-start-2 col-end--1 mb-1.5">
          {#if url}
            <a href={url}>{label}</a>
          {:else}
            {label.replace('%NOW%', now)}
          {/if}
        </dd>
      {/each}
    </dl>
  {/each}
</nav>

<div class="prose">
  <Content content={data.content} />

  <Expand>
    <Content content={data.expand} />
  </Expand>
</div>

<style>
  h1 {
    --uno: 'font-serif italic text-lg col-start-1 row-start-1';
  }

  nav {
    --uno: 'h-fit grid md:(col-start-10 col-end--1 row-start-1 grid-cols-subgrid)';
    --uno: 'lt-md:(grid-cols-4 mb-10 p-4 bg-surface-muted rounded-4)';

    & > p {
      --uno: 'col-span-full not-first:(mt-14 lt-sm:mt-6) mb-2 uppercase font-mono text-2.5 font-semibold';
    }
  }
</style>
