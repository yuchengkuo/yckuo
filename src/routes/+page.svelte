<script lang="ts">
  import { spring } from 'motion'
  import Markdoc from 'sveltejs-markdoc'

  import Head from '$lib/seo/Head.svelte'
  import motion from '$lib/animation'
  import { fadeup } from '$lib/animation/keyframes'

  import type { PageData } from './$types'

  export let data: PageData

  const easing = spring({ mass: 1, damping: 20 })
</script>

<Head>
  <script>
    document.documentElement.removeAttribute('data-theme')
  </script>
</Head>

<section class="flex flex-col min-h-screen pb-40">
  <div
    class="*grid gap-y-0 items-start no-js:children:(opacity-100) children:(col-start-1 col-span-3 mb-8 opacity-0) tablet:children:(col-span-5) "
  >
    <h1 use:motion={{ keyframes: fadeup, options: { easing, delay: 0.3 } }}>YuCheng Kuo</h1>
    <div use:motion={{ keyframes: fadeup, options: { easing, delay: 0.4 } }} class="text-lg">
      <Markdoc content={data.overview.markdown} />
    </div>

    <nav
      use:motion={{ keyframes: fadeup, options: { easing, delay: 0.7 } }}
      class="flex flex-wrap font-Azeret font-400 text-sm gap-2 justify-between uppercase"
    >
      <a sveltekit:prefetch href="/about">About</a>
      <a sveltekit:prefetch href="/project">Project</a>
      <a sveltekit:prefetch href="/bookmark">Bookmark</a>
      <a sveltekit:prefetch href="/listening">Listening</a>
      <a sveltekit:prefetch href="/watching">Watching</a>
    </nav>
  </div>
</section>

<section class="*grid phone:(gap-y-20) children:col-span-2 tablet:children:(col-span-full) ">
  <div id="projects">
    <h2>Projects</h2>

    {#each data.projects as project}
      <div class="not-last:mb-12">
        <h3>{project.title}</h3>
        <p class="mt-2 text-fg-secondary text-lg">
          {project.excerpt}
        </p>
        <a
          class="font-Azeret mt-4 text-fg-secondary text-sm w-fit block"
          href={project.link ? project.link : `/project/${project.slug}`}
          >{project.link ? 'link ↗' : 'more ->'}</a
        >
      </div>
    {/each}

    <a href="/project">All →</a>
  </div>

  <div class="col-start-4 tablet:(col-start-1) phone:mt-20">
    <h2>{data.work.title}</h2>

    <Markdoc content={data.work.markdown} />
  </div>
</section>

<style>
  section h2 {
    @apply mb-6;
  }
</style>
