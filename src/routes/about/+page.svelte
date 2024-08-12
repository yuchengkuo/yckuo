<script lang="ts">
  import Content from '$lib/content/Content.svelte'
  import Expand from '$lib/content/Expand.svelte'
  import { formatDate } from '$lib/util.js'
  import { onMount } from 'svelte'
  import Conditional from './Conditional.svelte'

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
    Updated on <time datetime={data.updated}>{formatDate(data.updated)}</time>
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
    <dl>
      {#each Object.entries(arr) as [hidden, items]}
        <Conditional
          condition={Boolean(hidden === 'hidden' && items.length)}
          wrapper={Expand}
          class="contents"
        >
          <div class="grid col-span-full grid-cols-subgrid">
            {#each items as { key, url, label }}
              <dt class="text-fg-muted">{key}</dt>
              <dd>
                {#if url}
                  <a href={url}>{label}</a>
                {:else}
                  {label.replace('%NOW%', now)}
                {/if}
              </dd>
            {/each}
          </div>
        </Conditional>
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
  nav {
    --uno: 'lt-md:(grid-cols-4 mb-10 p-4 bg-surface-muted rounded-4)';
    --uno: 'h-fit grid md:(col-start-10 col-end--1 row-start-1 grid-cols-subgrid)';
  }

  nav > dl {
    --uno: 'grid grid-cols-subgrid col-span-full';
  }

  nav > dl dd {
    --uno: 'col-start-2 col-end--1 mb-1.5';
  }

  nav > p {
    --uno: 'col-span-full not-first:(mt-14 lt-sm:mt-6) mb-2 uppercase font-mono text-2.5 font-semibold';
  }
</style>
