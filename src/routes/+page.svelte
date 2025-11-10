<script lang="ts">
  import Content from '$lib/content/Content.svelte'

  import { formatDate } from '$lib/util'
  import Image from '$lib/media/Image.svelte'

  let { data } = $props()
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<div class="prose">
  <Content content={data.content} />
</div>
<p class="text-tertiary mt-2">
  Updated at <time datetime={data.updated}>{formatDate(data.updated)}</time>
</p>

<p aria-hidden="true" class="text-tertiary mt-24">//</p>

<section id="work">
  <h2>Work</h2>

  <!-- Featured work -->
  {#each data.works.filter((w) => w.featured) as work}
    {@const year = formatDate(work.published ?? '', { year: 'numeric' })}
    <div class="span-full space-y-1 mb-30 lt-md:mb-24 grid-subgrid">
      <a
        class="span-full bg-surface hover:(brightness-90)"
        href={work.slug}
        aria-label={work.title}
        title={work.emoji}
      >
        <Image id={work.thumbnail} loading="eager" />
      </a>
      <h3 class="col-span-full font-medium capitalize">
        <a href={work.slug}>{work.title}</a> <span class="text-tertiary">({year})</span>
      </h3>
      <footer class="col-span-5">
        <p class="text-secondary">{work.tagline}</p>
        {#if work.summary}<p class="text-xs mt-1">» {work.summary.at(0)}</p>{/if}
      </footer>
    </div>
  {/each}

  <!-- Additional work -->
  <p class="span-full text-tertiary mt-12 mb-2">Additional Works</p>
  {#each data.works.filter((w) => !w.featured) as work}
    {@const year = formatDate(work.published ?? '', { year: 'numeric' })}
    <div class="span-full grid-subgrid mb-16 lt-md:mb-10">
      <h3 class="span-full font-medium capitalize">
        {work.title} <span class="text-tertiary">({year})</span>
      </h3>
      {#each work.summary ?? [] as summary}
        <p class="span-full text-secondary">» {summary}</p>
      {/each}
    </div>
  {/each}
</section>

<!-- Projects -->
<section id="projects">
  <h2>Projects</h2>

  <div class="span-full grid-subgrid gap-y-24 lt-md:gap-y-10">
    {#each data.projects as project, i}
      <div class:start-1={i % 2 === 0} class="span-3 space-y-1">
        {#if project.cover}
          <a href={project.slug} class="block bg-surface hover:(brightness-90)">
            <Image id={project.cover} loading="eager" />
          </a>
        {/if}
        <h3>
          <a href={project.slug}>{project.title}</a><span class="text-secondary ml-1">
            ({project.category[0]})</span
          >
        </h3>
        <p class="text-secondary">{project.summary}</p>
      </div>
    {/each}
  </div>
</section>

<style>
  section {
    --uno: 'mt-60 lt-md:mt-40 grid-subgrid col-start-1 col-span-6';
  }

  h2 {
    --uno: 'text-4 leading-6 font-medium mb-4';
  }
</style>
