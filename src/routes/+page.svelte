<script lang="ts">
  import Content from '$lib/content/Content.svelte'

  import { formatDate } from '$lib/util'
  import Image from '$lib/media/Image.svelte'

  let { data } = $props()
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<h1 class="text-5 mb-10">YuCheng Kuo is a Product Designer based in Taiwan.</h1>

<div class="prose layout-measure">
  <Content content={data.content} />
</div>
<p class="text-tertiary mt-5 font-mono text-xs">
  Updated at <time datetime={data.updated}>{formatDate(data.updated)}</time>
</p>

<section id="work">
  <h2>Work</h2>

  <!-- Featured work -->
  {#each data.works.filter((w) => w.featured) as work, i}
    {@const year = formatDate(work.published ?? '', { year: 'numeric' })}
    {@const small = (i % 4) + 1 === 2 || (i % 4) + 1 === 3}
    <div
      class={[
        small ? 'span-full md:span-4' : 'span-full',
        'mb-20 lt-md:mb-24 grid-subgrid content-start'
      ]}
    >
      <a
        class="span-full bg-surface hover:(brightness-90)"
        href={work.slug}
        aria-label={work.title}
        title={work.emoji}
      >
        <Image id={work.thumbnail} loading="eager" />
      </a>
      <h3 class="col-span-full font-medium capitalize mt-3 mb-2 md:(mt-6 mb-4)">
        <a href={work.slug}>{work.title}</a>
        <span class="text-tertiary font-mono text-xs">[{year}]</span>
      </h3>
      <footer class="col-span-5 font-mono text-xs">
        <p class="text-secondary">> {work.tagline}</p>
        {#if work.summary}<p class="text-xs mt-3">» {work.summary.at(0)}</p>{/if}

        <a class="inline-block mt-3 md:mt-5 button-primary" href={work.slug}>READ →</a>
      </footer>
    </div>
  {/each}

  <!-- Additional work -->
  <p class="span-full text-tertiary my-6 md:my-12">Additional Works</p>

  {#each data.works.filter((w) => !w.featured) as work}
    {@const year = formatDate(work.published ?? '', { year: 'numeric' })}
    <div class="span-full grid-subgrid mb-16 lt-md:mb-10">
      <h3 class="span-full font-medium capitalize mb-3">
        {work.title} <span class="text-tertiary font-mono text-xs">[{year}]</span>
      </h3>
      {#each work.summary ?? [] as summary}
        <p class="span-full text-secondary font-mono text-xs not-last:(mb-1 md:mb-2)">
          > {summary}
        </p>
      {/each}
    </div>
  {/each}
</section>

<!-- Projects -->
<section id="projects">
  <h2>Projects</h2>

  {#each [...data.projects.filter((p) => p.featured), ...data.projects.filter((p) => !p.featured)] as project}
    {#if project.featured}
      <div class="span-full grid-subgrid md:mb-20 mb-24">
        {#if project.cover}
          <a
            href={project.slug}
            class="span-full block bg-surface mb-3 md:mb-6 hover:(brightness-90)"
          >
            <Image id={project.cover} loading="eager" />
          </a>
        {/if}

        {@render projectText(project)}
      </div>
    {:else}
      <div class="span-full md:span-4 mb-16">
        {@render projectText(project)}
      </div>
    {/if}
  {/each}

  {#snippet projectText(project: (typeof data.projects)[0])}
    <h3 class="col-span-full font-medium capitalize mb-2 md:mb-4">
      <a href={project.slug}>{project.title}</a><span class="text-tertiary font-mono text-xs ml-1">
        ({project.category[0]})</span
      >
    </h3>
    <p class="span-5 text-secondary font-mono text-xs mb-4">
      > {project.summary}
    </p>

    <div class="span-full flex gap-3 children:(inline-block)">
      {#if project.link}
        <a href={project.link} class="button-primary">View ↗</a>
      {/if}
      <a href={project.slug} class="button-secondary">Read →</a>
    </div>
  {/snippet}
</section>

<style>
  section {
    --uno: 'mt-60 lt-md:mt-40 grid-subgrid layout-content';
  }

  h2 {
    --uno: 'text-4 leading-6 font-medium mb-6 md:mb-12';
    --uno: 'after:(content-['/'] ml-2 font-mono text-xs text-tertiary)';
  }
</style>
